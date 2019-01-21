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
class DrawContractLinkTable extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedRowKeys:[],
			selectedRows:'',
			contractList:this.props.contractList,
			loading:false,
			showWaring:'',
			changeArr:[],
			total_je:0,
			selectArr:[],
			id:''
		}
  }
  componentWillReceiveProps(nextProps){
		const {page,con_num,start_con_date,end_con_date } = this.props.state;
		const next = nextProps.state;
    if(next.page !== page || con_num !== next.con_num || start_con_date !== next.start_con_date || end_con_date !== next.end_con_date){
			let param;
			if(!this.props.drawdownUnlinkContract){
				param = {
					size:10,
					page:next.page,
					con_num:next.con_num,
					start_con_date:next.start_con_date,
					end_con_date:next.end_con_date,
					cus_id:this.props.cus_id,
				};
			}else{
				param = {
					size:10,
					page:next.page,
					con_num:next.con_num,
					start_con_date:next.start_con_date,
					end_con_date:next.end_con_date,
					unlink_dd_id:this.props.dd_id
				};
			}
			this.setState({loading:true})
      this.props.getLinkContractList(param,(res)=>{
				this.setState({contractList:res,loading:false})
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
				total_je = Number(total_je)+Number(selectedRows[i].left_amount);
				selectArr.push({id:selectedRows[i].id,used_amount:selectedRows[i].left_amount})
			}
		}
    this.setState({selectedRows,total_je,selectArr})
	}
	linkDrFnc = () => {
		for(let i in this.state.selectArr){
			for(let j in this.state.changeArr){
				if(this.state.selectArr[i].id == this.state.changeArr[j].id && this.state.changeArr[j].font!==''){
					if(!this.props.drawdownUnlinkContract){
						message.error('只能输入不大于未使用金额的数字');return;
					}else{
						message.error('只能输入不大于当前合同已关联金额的数字');return;
					}
				}
			}
		}
		if(!this.props.drawdownUnlinkContract){
			const param = {
				links:JSON.stringify(this.state.selectArr),
				id:this.props.dd_id,
			}
			this.props.drawdownLinkContract(param,()=>{
				this.props.showDetail()
				this.props.cancel()
			})
		}else{
			const param = {
				links:JSON.stringify(this.state.selectArr),
				id:this.props.dd_id,
			}
			this.props.drawdownUnlinkContract(param,()=>{
				this.props.showDetail()
				this.props.cancel()
			})
		}
	}
  refreshData = () => {
    const {state} = this.props;
    let param;
		if(!this.props.drawdownUnlinkContract){
			param = {
				size:10,
				page:state.page,
				cus_num:state.cus_num,
				start_con_date:state.start_con_date,
				cus_name:state.cus_name,
				end_con_date:state.end_con_date,
				cus_id:this.props.cus_id,
			};
		}else{
			param = {
				size:10,
				page:state.page,
				cus_num:state.cus_num,
				start_con_date:state.start_con_date,
				cus_name:state.cus_name,
				end_con_date:state.end_con_date,
				unlink_dd_id:this.props.dd_id,
			};
		}
		this.setState({loading:true})
    this.props.getLinkContractList(param,(res)=>{
			this.setState({contractList:res,loading:false})
		})
    this.setState({selectedRowKeys:[],selectedRows:''});
  }
  render(){
		const unLinkColumns = [{
			title: '合同日期',
      key:'con_date',
      dataIndex: 'con_date',
			render:(text)=><div>{text?text:'---'}</div>,
			width:'30%',
    },{
      title: '合同编号',
      key:'con_num',
      dataIndex: 'con_num',
      render:(text)=><div>{text?text:'---'}</div>,
			width:'30%',
    },{
      title: '合同已关联金额',
      key:'used_amount',
      dataIndex: 'used_amount',
			width:'40%',
      render:(text,record)=>{
				const used_amount = this.state.changeArr.filter((el)=>el.id == record.id).length>0&&this.state.changeArr.filter((el)=>el.id == record.id)[0].used_amount;
				return <div>
								<Input defaultValue={used_amount?used_amount:text} onChange={(e)=>{
									let font = '';
									if(!/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(e.target.value) || e.target.value>text){
										font = '只能输入不大于当前合同已关联金额的数字';
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
      title: '合同编号',
      key:'con_num',
      dataIndex: 'con_num',
			render:(text)=><div>{text?text:'---'}</div>,
			width:'15%',
    },{
      title: '合同日期',
      key:'con_date',
      dataIndex: 'con_date',
      render:(text)=><div>{text?text:'---'}</div>,
			width:'15%',
    },{
      title: '销方名称',
      key:'xfmc',
      dataIndex: 'xfmc',
			render:(text)=><div>{text?text:'---'}</div>,
			width:'24%'
    },{
      title: '未关联金额/合同金额',
      key:'con_amount',
      dataIndex: 'con_amount',
      render:(text,record)=>{
				return <div>
								{zhMoney(record.left_amount)+'/'+zhMoney(text)}
							</div>
			},
			width:'20%',
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
										font = '只能输入不大于未关联金额的数字';
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
			width:'26%',
		}];
    const { selectedRowKeys,contractList,loading } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
		}
    return(
			<div style={{overflow:'hidden',width:'100%',position:'relative'}}>
        <div style={{margin:'10px 0 60px 0',minHeight:400}}>
					<Table pagination={false}
									rowKey='id'
									rowSelection={rowSelection}
									scroll={{ y:'400px'}}
									selectedRowKeys={selectedRowKeys}
									columns={!this.props.drawdownUnlinkContract?columns:unLinkColumns}
									loading={loading}
									dataSource={contractList.list}
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
							已勾选合同{selectedRowKeys.length}份，关联金额共计{this.state.total_je}元
						</div>
					}
					<Pagination total={contractList.count}
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

export default DrawContractLinkTable
