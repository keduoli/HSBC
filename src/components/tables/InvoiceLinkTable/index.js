import React from 'react';
import { Table, Button, Pagination, message, Modal, Select,Input } from 'antd';
import styled from 'styled-components';
import { zhMoney } from './../../util';
const TitleSpan = styled.span`
  fontSize:13px;
  height:100px;
  color:#fff;
  display:inline-block;
  line-height:100px;
`;
const BottomPage = styled.div`
  background:#f7f7f7;
  position:absolute;
  bottom:0px;
	right:0px;
	width:100%;
  height:60px;
  z-index:100;
  padding:20px 20px 0 20px;
  box-sizing:border-box;
	overflow:hidden;
  -webkit-transition: all .2 ease;
  transition: all .2s ease;
`;
class InvoiceLinkTable extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedRowKeys:[],
			selectedRows:'',
			invoiceList:this.props.invoiceList,
			loading:false,
			showWaring:'',
			changeArr:[],
			total_je:0,
			selectArr:[],
			id:''
		}
  }
  componentWillReceiveProps(nextProps){
    const {page,con_num,gfmc,cus_name,xfmc,fpdm,fphm } = this.props.state;
    const next = nextProps.state;
    if(next.page !== page || con_num !== next.con_num || gfmc !== next.gfmc || cus_name !== next.cus_name || xfmc !== next.xfmc || fpdm !== next.fpdm || fphm !== next.fphm){
			let param;
			if(this.props.invoiceLink){
				param = {
					size:10,
					page:next.page,
					con_num:next.con_num,
					gfmc:next.gfmc,
					cus_name:next.cus_name,
					xfmc:next.xfmc,
					fpdm:next.fpdm,
					fphm:next.fphm,
					inv_ids:next.inv_ids,
				};
			}else{
				if(!this.props.unLinkContract){
					param = {
						size:10,
						page:next.page,
						con_num:next.con_num,
						gfmc:next.gfmc,
						cus_name:next.cus_name,
						xfmc:next.xfmc,
						fpdm:next.fpdm,
						fphm:next.fphm,
						cus_id:this.props.cus_id,
					};
				}else{
					param = {
						size:10,
						page:next.page,
						con_num:next.con_num,
						gfmc:next.gfmc,
						cus_name:next.cus_name,
						xfmc:next.xfmc,
						fpdm:next.fpdm,
						fphm:next.fphm,
						unlink_con_id:next.con_id,
						unlink_dd_id:this.props.dd_id
					};
				}
			}
			this.setState({loading:true})
      this.props.getInvoiceList(param,(res)=>{
				this.setState({invoiceList:res,loading:false})
			})
    }
  }
  onSelectChange = (selectedRowKeys,selectedRows) => {
		this.setState({selectedRowKeys})
		this.setTotal(JSON.parse(JSON.stringify(selectedRows)))
	}
	setTotal = (selectedRows) => {
		let total_je = 0;
		let selectArr = [];
		for(let i in selectedRows){
			if(this.state.changeArr.length>0&&this.state.changeArr.filter((el)=>el.id == selectedRows[i].id).length>0){
				const changeVal = this.state.changeArr.filter((el)=>el.id == selectedRows[i].id)[0];
				total_je = Number(total_je)+Number(changeVal.used_amount);
				selectArr.push({id:changeVal.id,used_amount:changeVal.used_amount})
			}else{
				if(!this.props.unLinkContract){
					total_je = Number(total_je)+Number(selectedRows[i].left_amount);
					selectArr.push({id:selectedRows[i].id,used_amount:selectedRows[i].left_amount})
				}else{
					total_je = Number(total_je)+Number(selectedRows[i].used_amount);
					selectArr.push({id:selectedRows[i].id,used_amount:selectedRows[i].used_amount})
				}
			}
		}
    this.setState({selectedRows,total_je,selectArr})
	}
	linkDrFnc = () => {
		if(!this.props.invoiceLink){
			for(let i in this.state.selectArr){
				for(let j in this.state.changeArr){
					if(this.state.selectArr[i].id == this.state.changeArr[j].id && this.state.changeArr[j].font!==''){
						message.error('只能输入不大于未使用金额的数字');return;
					}
				}
			}
			if(!this.props.unLinkContract){
				const param = {
					links:JSON.stringify(this.state.selectArr),
					con_id:this.props.id,
					dd_id:this.props.dd_id,
				}
				this.props.linkContract(param,()=>{
					this.props.getContractDetail(this.props.id,(res)=>{
						this.props.showDetail(res)
						this.props.cancel()
					})
				})
			}else{
				const param = {
					links:JSON.stringify(this.state.selectArr),
					con_id:this.props.id,
					dd_id:this.props.dd_id,
				}
				this.props.unLinkContract(param,()=>{
					this.props.getContractDetail(this.props.id,(res)=>{
						this.props.showDetail(res)
						this.props.cancel()
					})
				})
			}
		}else{
			for(let j in this.state.changeArr){
				if(this.state.changeArr[j].font!==''){
					message.error('只能输入不大于未使用金额的数字');return;
				}
			}
			if(this.state.id == ''){
				message.error(this.props.invoiceLink == 'contract'?'请选择关联合同编号':'请选择关联放款流水号');return;
			}
			const invoiceList = JSON.parse(JSON.stringify(this.props.invoiceList.list));
			const links = [];
			for(let i in invoiceList){
				for(let j in this.state.changeArr){
					if(invoiceList[i].id == this.state.changeArr[j].id){
						invoiceList[i].left_amount = this.state.changeArr[j].used_amount;
					}
				}
				links.push({id:invoiceList[i].id,used_amount:invoiceList[i].left_amount})
			}
			if(this.props.invoiceLink == 'contract'){
				const param = {
					links:JSON.stringify(links),
					con_id:this.state.id,
				}
				this.props.linkContract(param,()=>{
					this.props.cancel();
					this.props.refreshInvoiceData();
				})
			}else{
				const param = {
					links:JSON.stringify(links),
					id:this.state.id,
				}
				this.props.linkDrawdown(param,()=>{
					this.props.cancel();
					this.props.refreshInvoiceData();
				})
			}
		}
	}
  refreshData = () => {
    const {state} = this.props;
    let param;
			if(this.props.invoiceLink){
				param = {
					size:10,
					page:state.page,
					con_num:state.con_num,
					gfmc:state.gfmc,
					cus_name:state.cus_name,
					xfmc:state.xfmc,
					fpdm:state.fpdm,
					fphm:state.fphm,
					inv_ids:state.inv_ids,
				};
			}else{
				if(!this.props.unLinkContract){
					param = {
						size:10,
						page:state.page,
						con_num:state.con_num,
						gfmc:state.gfmc,
						cus_name:state.cus_name,
						xfmc:state.xfmc,
						fpdm:state.fpdm,
						fphm:state.fphm,
						con_id:state.con_id,
						cus_id:this.props.cus_id,
					};
				}else{
					param = {
						size:10,
						page:state.page,
						con_num:state.con_num,
						gfmc:state.gfmc,
						cus_name:state.cus_name,
						xfmc:state.xfmc,
						fpdm:state.fpdm,
						fphm:state.fphm,
						con_id:state.con_id,
						dd_id:this.props.dd_id,
					};
				}
			}
		this.setState({loading:true})
    this.props.getInvoiceList(param,(res)=>{
			this.setState({invoiceList:res,loading:false})
		})
    this.setState({selectedRowKeys:[],selectedRows:''});
  }
  render(){
		const unLinkColumns = [{
			title: '发票代码',
      key:'fpdm',
      dataIndex: 'fpdm',
			render:(text)=><div>{text?text:'---'}</div>,
			width:'30%',
    },{
      title: '发票号码',
      key:'fphm',
      dataIndex: 'fphm',
      render:(text)=><div>{text?text:'---'}</div>,
			width:'30%',
    },{
      title: '发票关联金额',
      key:'used_amount',
      dataIndex: 'used_amount',
			width:'40%',
      render:(text,record)=>{
				const used_amount = this.state.changeArr.filter((el)=>el.id == record.id).length>0&&this.state.changeArr.filter((el)=>el.id == record.id)[0].used_amount;
				return <div>
								<Input defaultValue={used_amount?used_amount:text} onChange={(e)=>{
									let font = '';
									if(!/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(e.target.value) || e.target.value>text){
										font = '只能输入不大于当前发票关联金额的数字';
									}else if(!/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(e.target.value)){
										font = '最多只能输入两位小数';
									}else{
										font = '';
									}
									if(this.state.selectedRows.length>0&&this.state.selectedRows.filter((el)=>el.id == record.id).length>0){
										this.state.selectedRows.filter((el)=>el.id == record.id)[0].used_amount = e.target.value;
									}
									if(this.state.changeArr.length>0){
										if(this.state.changeArr.filter((el)=>el.id == record.id).length>0){
											this.state.changeArr.filter((el)=>el.id == record.id)[0].used_amount = e.target.value;
											this.state.changeArr.filter((el)=>el.id == record.id)[0].font = font;
										}else{
											this.state.changeArr.push({id:record.id,used_amount:e.target.value,font:font})
										}
									}else{
										this.state.changeArr.push({id:record.id,used_amount:e.target.value,font:font,})
									}
									this.setState({},()=>{
										this.setTotal(this.state.selectedRows)
									})
								}}/>
								<div style={{color:'rgb(255, 126, 126)',fontSize:12,marginTop:3}}>{this.state.changeArr.filter((el)=>el.id == record.id).length>0&&this.state.changeArr.filter((el)=>el.id == record.id)[0].font}</div>
							</div>
			},
    }]
    const columns = [{
      title: '发票代码',
      key:'fpdm',
      dataIndex: 'fpdm',
			render:(text)=><div>{text?text:'---'}</div>,
			width:'13%',
    },{
      title: '发票号码',
      key:'fphm',
      dataIndex: 'fphm',
      render:(text)=><div>{text?text:'---'}</div>,
			width:'12%',
    },{
      title: '销方名称',
      key:'xfmc',
      dataIndex: 'xfmc',
			render:(text)=><div>{text?text:'---'}</div>,
			width:'24%'
    },{
      title: '开票日期',
      key:'kprq',
      dataIndex: 'kprq',
      render:(text)=><div>{text?text:'---'}</div>,
			width:'16%',
    },{
      title: '未使用金额/发票金额',
      key:'total_amount',
      dataIndex: 'total_amount',
      render:(text,record)=>{
				return <div>
								{zhMoney(record.left_amount)+'/'+zhMoney(text)}
							</div>
			},
			width:'18%',
    },{
      title: '关联金额',
      key:'left_amount',
      dataIndex: 'left_amount',
      render:(text,record)=>{
				const used_amount = this.state.changeArr.filter((el)=>el.id == record.id).length>0&&this.state.changeArr.filter((el)=>el.id == record.id)[0].used_amount;
				return <div>
								<Input defaultValue={used_amount?used_amount:text} onChange={(e)=>{
									let font = '';
									if(!/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(e.target.value) || e.target.value>record.left_amount){
										font = '只能输入不大于未使用金额的数字';
									}else if(!/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(e.target.value)){
										font = '最多只能输入两位小数';
									}else{
										font = '';
									}
									if(this.state.selectedRows.length>0&&this.state.selectedRows.filter((el)=>el.id == record.id).length>0){
										this.state.selectedRows.filter((el)=>el.id == record.id)[0].left_amount = e.target.value;
									}
									if(this.state.changeArr.length>0){
										if(this.state.changeArr.filter((el)=>el.id == record.id).length>0){
											this.state.changeArr.filter((el)=>el.id == record.id)[0].used_amount = e.target.value;
											this.state.changeArr.filter((el)=>el.id == record.id)[0].font = font;
										}else{
											this.state.changeArr.push({id:record.id,used_amount:e.target.value,font:font})
										}
									}else{
										this.state.changeArr.push({id:record.id,used_amount:e.target.value,font:font,})
									}
									this.setState({},()=>{
										this.setTotal(this.state.selectedRows)
									})
								}}/>
								<div style={{color:'rgb(255, 126, 126)',fontSize:12,marginTop:3}}>{this.state.changeArr.filter((el)=>el.id == record.id).length>0&&this.state.changeArr.filter((el)=>el.id == record.id)[0].font}</div>
							</div>
			},
			width:'16%',
		}];
    const invoiceLinkColumns = [{
      title: '发票代码',
      key:'fpdm',
      dataIndex: 'fpdm',
			render:(text)=><div>{text?text:'---'}</div>,
			width:'20%'
    },{
      title: '发票号码',
      key:'fphm',
      dataIndex: 'fphm',
      render:(text)=><div>{text?text:'---'}</div>,
			width:'20%'
    },{
      title: '未使用金额/发票金额',
      key:'total_amount',
      dataIndex: 'total_amount',
      render:(text,record)=>{
				return <div>
								{zhMoney(record.left_amount)+'/'+zhMoney(text)}
							</div>
			},
			width:'30%'
    },{
      title: '关联金额',
      key:'left_amount',
      dataIndex: 'left_amount',
			width:'30%',
      render:(text,record)=>{
				const used_amount = this.state.changeArr.filter((el)=>el.id == record.id).length>0&&this.state.changeArr.filter((el)=>el.id == record.id)[0].used_amount;
				return <div>
								<Input defaultValue={used_amount?used_amount:text} onChange={(e)=>{
									let font = '';
									if(!/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(e.target.value) || e.target.value>record.left_amount){
										font = '只能输入不大于未使用金额的数字';
									}else if(!/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(e.target.value)){
										font = '最多只能输入两位小数';
									}else{
										font = '';
									}
									if(this.state.selectedRows.length>0&&this.state.selectedRows.filter((el)=>el.id == record.id).length>0){
										this.state.selectedRows.filter((el)=>el.id == record.id)[0].left_amount = e.target.value;
									}
									if(this.state.changeArr.length>0){
										if(this.state.changeArr.filter((el)=>el.id == record.id).length>0){
											this.state.changeArr.filter((el)=>el.id == record.id)[0].used_amount = e.target.value;
											this.state.changeArr.filter((el)=>el.id == record.id)[0].font = font;
										}else{
											this.state.changeArr.push({id:record.id,used_amount:e.target.value,font:font})
										}
									}else{
										this.state.changeArr.push({id:record.id,used_amount:e.target.value,font:font})
									}
									this.setState({},()=>{
										this.setTotal(this.state.selectedRows)
									})
								}}/>
								<div style={{color:'rgb(255, 126, 126)',fontSize:12,marginTop:3}}>{this.state.changeArr.filter((el)=>el.id == record.id).length>0&&this.state.changeArr.filter((el)=>el.id == record.id)[0].font}</div>
							</div>
			},
		}];
    const { selectedRowKeys,invoiceList,loading } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
		}
    return(
			<div style={{overflow:'hidden',width:'100%',position:'relative'}}>
				{
					this.props.invoiceLink == 'contract' &&
					<div style={{margin:'20px 10px',width:'100%',overflow:'hidden'}}>
						<div style={{float:'left',fontSize:12,marginLeft:10,lineHeight:'25px'}}>关联合同编号：</div>
						<Select style={{float:"left",width:200}}
										placeholder='请选择' 
										onChange={(val)=>{
											this.setState({id:val})
										}}>
							{
								this.props.selectList.map((item)=>{
									return <Select.Option key={item.id}>{item.con_num}</Select.Option>
								})
							}
						</Select>
					</div>
				}
				{
					this.props.invoiceLink == 'drawdown' &&
					<div style={{margin:'20px 10px',width:'100%',overflow:'hidden'}}>
						<div style={{float:'left',fontSize:12,marginLeft:10,lineHeight:'25px'}}>关联放款流水号：</div>
						<Select style={{float:"left",width:200}} 
										placeholder='请选择'
										onChange={(val)=>{
											this.setState({id:val})
										}}>
							{
								this.props.selectList.map((item)=>{
									return <Select.Option key={item.id}>{item.sys_num}</Select.Option>
								})
							}
						</Select>
					</div>
				}
        <div style={{margin:'10px 0 60px 0',minHeight:400}}>
					<Table pagination={false}
									rowKey='id'
									rowSelection={!this.props.invoiceLink?rowSelection:false}
									scroll={{ y:'400px'}}
									selectedRowKeys={selectedRowKeys}
									columns={this.props.invoiceLink?invoiceLinkColumns:(!this.props.unLinkContract?columns:unLinkColumns)}
									loading={loading}
									dataSource={invoiceList.list}
									/>
				</div>
				<BottomPage>
					<Button onClick={this.props.cancel} style={{float:'left',marginRight:20}}>返回</Button>
					<Button onClick={this.linkDrFnc}
									style={{float:'left',marginRight:20}}
									type='primary'
									disabled={selectedRowKeys.length==0&&!this.props.invoiceLink}>
						确定
					</Button>
					{
						selectedRowKeys.length>0 &&
						<div style={{float:'left',fontSize:12,marginTop:5}}>
							已勾选发票{selectedRowKeys.length}张，关联金额共计{Number(this.state.total_je).toFixed(2)}元
						</div>
					}
					<Pagination total={invoiceList.count}
											style={{float:'right'}}
											current={this.props.state.page}
											onChange={(page)=>{
												this.props.setPageFnc(page);
											}}/>
        </BottomPage>
      </div>
    )
  }
}

export default InvoiceLinkTable
