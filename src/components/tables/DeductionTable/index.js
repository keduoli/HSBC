import React from 'react';
import styled from 'styled-components';
import { Table,Pagination,Button,Modal,message } from 'antd'
import { ExpandDeduction,AddCallModal,DeductionModal,DeclareModal } from 'components'

const confirm = Modal.confirm;
const BottomPage = styled.div`
  background:#f7f7f7;
  position:fixed;
  bottom:0px;
	right:0px;
	z-index:100;
  padding:16px 18px;
  -webkit-transition: all .2 ease;
  transition: all .2s ease;
`;
const MoneySpan = styled.span`
	color:#337ab7;
	margin-left:20px;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
class DeductionTable extends React.Component {
    constructor(props){
			super(props);
			this.state={
				sortedInfo: {columnKey: "kprq", field: "kprq", order: "descend"},
				dataSource:[],
				show:true,
				invoice_ids:"",
				total_count:0,
				visible:false,
				rows:'',
				showDetail:'',
				selectJeTotal:'',
				selectAmount:'',
				showModal:'',
				length:'',
				selectedRowKeys:[],
				selectArr:'',
				invoice_info:[],
				isDown:false,
				showDeductionModal:"",
				signShow:'',
				isCollectAll:'',
				allDeduction:false,
				allJe:'',
				allSe:'',
				declareModal:''
			}
			this.selectAmountArr=[]
		}
		componentWillReceiveProps(nextProps){
			const {rec_time,order_name,order_value,fpdm,fphm,inv_start_time,inv_end_time,xfmc,page,size,area,rec_status,inv_status} = this.props.state;
			const next = nextProps.state;
			if(next.rec_time!==rec_time||next.inv_status!==inv_status||next.rec_status!==rec_status||next.area!==area ||next.order_name!==order_name ||next.order_value!==order_value||next.fpdm!==fpdm||next.fphm!==fphm||next.inv_start_time!==inv_start_time||next.inv_end_time!==inv_end_time||next.xfmc!==xfmc||next.page!==page||next.size!==size){
				const param={
					fpdm:next.fpdm,
					fphm:next.fphm,
					area:next.area,
					inv_start_time:next.inv_start_time,
					inv_end_time:next.inv_end_time,
					xfmc:next.xfmc,
					page:next.page,
					size:next.size,
					rec_time:next.rec_time,
					rec_status:next.rec_status,
					inv_status:next.inv_status,
					order:JSON.stringify({'order_name':next.order_name,'order_value':next.order_value}),
				};
				this.props.getData(param);
			}
			if(nextProps.deductionList){
				this.setState({dataSource:nextProps.deductionList.invoices,total_count:nextProps.deductionList.total_count})
			}
		};
		clearSorter = () => {
			this.setState({selectedRowKeys:[],allDeduction:false,selectArr:[],length:[],sortedInfo: {columnKey: "kprq", field: "kprq", order: "descend"}})
		}
		clearCheck = () => {
			this.setState({selectedRowKeys:[]})
		}
		showModal = () => {
			if(this.state.selectArr.indexOf(1) >= 0 || this.state.selectArr.indexOf(2) >= 0|| this.state.selectArr.indexOf(3) >= 0|| this.state.selectArr.indexOf(4) >= 0){
				message.error("只有发票状态为正常的发票才可以认证");return;
			}
			this.setState({showModal:<AddCallModal 
																	cancelModal={()=>{this.setState({showModal:''})}}
																	deduction={true}
																	title="验证手机号"
																	deductionSet={()=>this.props.settingsList.is_declaration===null?this.declare():this.deduction(null)}
																	deductionList={this.props.deductionList}
																	getBunding={this.props.getBunding}
																	getPhoneSend={this.props.getPhoneSend}
																	/>})
		}
		declare = () => {
			this.setState({
				showModal:'',
				declareModal:<DeclareModal cancelModal={()=>this.setState({declareModal:''})}
																	 settingsFnc={this.props.settingsFnc}
																	 settingsList={this.props.settingsList}
																	 deduction={(val)=>this.deduction(val)}
																	 settingsGet={this.props.settingsGet}
																	 />
			})
		}
		deduction = (val) => {
			this.setState({ showModal:"",
											declareModal:"",
											showDeductionModal:<DeductionModal 
																						cancelModal={()=>{this.setState({showDeductionModal:''})}}
																						title="认证确认"
																						confirmList={this.props.confirmList}
																						val={val!==null?val:this.props.settingsList.is_declaration}
																						deductionConfirm={this.props.deductionConfirm}
																						settingsList={this.props.settingsList}
																						income_month={this.props.settingsList.income_month}
																						length={this.state.length}
																						invoice_info={this.state.invoice_info}
																						invoice_ids={this.state.invoice_ids}
																						allDeduction={this.state.allDeduction}
																						selectedRowKeys={this.state.selectedRowKeys}
																						deductionFnc={this.props.deductionFnc}
																						clearState={this.props.clearState}
																						getData={this.props.getData}
																					/>
			})
		}
		signFnc = () => {
			this.setState({
				signShow:<Modal
										visible
										title={<TitleSpan>签收提示</TitleSpan>}
										onOk={this.handleSignOk}
										width={400}
										style={{textAlign:'center'}}
										onCancel={this.handleSignCancel}
										footer={[
											<Button key="back" onClick={this.handleSignCancel}>返回</Button>,
											<Button key="submit" type="primary" onClick={this.handleSignOk}>
												签收
											</Button>
										]}
									>
										<p>本次共勾选{this.state.length}张票，仅对其中未签收发票进行签收。</p>
									</Modal>
			})
		}
		handleSignOk = () => {
			const param = {
				invoice_ids:this.state.invoice_ids,
				is_receive:1,
			}
			this.props.deductionReceive(param,()=>{
				this.refreshData()
			})
			this.setState({signShow:''})
		}
		refreshData=()=>{
			const {state} = this.props;
			const param={
				fpdm:state.fpdm,
				fphm:state.fphm,
				area:state.area,
				inv_start_time:state.inv_start_time,
				inv_end_time:state.inv_end_time,
				xfmc:state.xfmc,
				page:state.page,
				size:state.size,
				rec_status:state.rec_status,
				rec_time:state.rec_time,
				inv_status:state.inv_status,
				order:JSON.stringify({'order_name':state.order_name,'order_value':state.order_value}),
			};
			this.selectAmountArr = [];
			this.props.changeCheck()
			this.clearSorter()
			this.setState({selectedRowKeys:[],selectArr:[],selectAmount:'',length:'',selectJshj:0,selectJeTotal:'',selectSeTotal:'',showJeCount:0,showSeCount:0});
			this.props.getData(param);
		};
		handleSignCancel = () => {
			this.setState({signShow:''})
		}
		checkRadiuo = (res) => {
			this.setState({selectedRowKeys:res.ids,allDeduction:true},()=>{
				this.setState({
					allJe:res.jehj,
					allSe:res.sehj,
				})
			})
		}
		invoiceDetail = (res,record) => {
			return (
				<ExpandDeduction detailList={res.data}
												 record={record}
												 settingsList={this.props.settingsList}
												 refreshData={this.refreshData}
												 getDetail={this.props.getDetail}
												 isCollectAll={this.state.isCollectAll}
												 deductionReceive={this.props.deductionReceive}
												 cancelFnc={()=>{this.setState({showDetail:''})}}													
				/>
			)
		}
		error3 = () => {
			Modal.warning({
				title: <div style={{color:'white',marginBottom:30}}>操作提示</div>,
				className: 'blue',
				content: (
					<div style={{fontSize:13,lineHeight:2,marginTop:35}}>
						<p>当前企业未开通获取发票认证功能</p>
						<p>如需此功能，请联系客服开通。</p>
						<p>400-9922-752</p>
					</div>
				),
			});
		}
		onSelectChange = (selectedRowKeys, selectedRows) => {
			this.setState({ selectedRowKeys},()=>{
				this.setState({length:this.state.selectedRowKeys.length })
			})
			const findPage = this.selectAmountArr.find((i)=> i.page === this.props.state.page);
			if(findPage){
				findPage.data = selectedRows;
			}else{
				const pageData = {
					page:this.props.state.page,
					data:selectedRows,
				};
				this.selectAmountArr = [...this.selectAmountArr,pageData];
			}
			let arr = [];
			let amount = 0;
			let jeTotal = 0;
			let invoice_info = [];
			this.selectAmountArr.map((el)=>{
				el.data.map((item)=>{
					arr.push(item.inv_status);
					if(item.je){
						amount += parseFloat(new Number(item.je));
					}
					if(item.se){
						jeTotal += parseFloat(new Number(item.se));
					}
					if(item.fphm){
						invoice_info.push({fphm:item.fphm,fpdm:item.fpdm,id:item.id})
					}
				});
			});
			const invoice_ids = selectedRowKeys+"";
			this.setState({selectArr:arr,invoice_ids,invoice_info,selectJeTotal:amount.toFixed(2),selectAmount:jeTotal.toFixed(2)})
		}
    render(){
			const { deductionLoad,settingsList } = this.props;
			const { selectedRowKeys } = this.state;
			const rowSelection = {
				selectedRowKeys,
				onChange: this.onSelectChange,
				onSelect: (record, selected) => {
					 if(selected===false){
						 this.setState({
							 allJe:this.state.allJe-record.je,
							 allSe:this.state.allSe-record.se,
							})
					 }else{
						this.setState({
							allJe:this.state.allJe+Number(record.je),
							allSe:this.state.allSe+Number(record.se),
						 })
					 }
				},
				onSelectAll: (selected, selectedRows,changeRows) => {
					var se = 0,je = 0;
					for(let i in changeRows){
						se = se+Number(changeRows[i].se);
						je = je+Number(changeRows[i].je);
					}
					if(selected===false){
						this.setState({
							allJe:this.state.allJe-je,
							allSe:this.state.allSe-se,
						 })
					}else{
					 this.setState({
						 allJe:this.state.allJe+Number(je),
						 allSe:this.state.allSe+Number(se),
						})
					}
				}
			};
			let {sortedInfo} = this.state;
    	sortedInfo = sortedInfo || {};
			const columns=[{
				title: '开票日期',
				dataIndex:'kprq',
				key:'kprq',
				sorter: true,
				sortOrder: sortedInfo.columnKey === 'kprq' && sortedInfo.order,
				width:'10%'
			},{
				title: '发票代码',
				dataIndex:'fpdm',
				key:'fpdm',
				sorter: true,
      	sortOrder: sortedInfo.columnKey === 'fpdm' && sortedInfo.order,
				width:'10%'
			},{
				title: '发票号码',
				dataIndex:'fphm',
				key:'fphm',
				sorter: true,
      	sortOrder: sortedInfo.columnKey === 'fphm' && sortedInfo.order,
				width:'10%'
			},{
				title: '销方名称',
				dataIndex:'xfmc',
				key:'xfmc',
				sorter: true,
      	sortOrder: sortedInfo.columnKey === 'xfmc' && sortedInfo.order,
				width:'20%'
			},{
				title: '金额',
				dataIndex:'je',
				key:'je',
				sorter: true,
      	sortOrder: sortedInfo.columnKey === 'je' && sortedInfo.order,
				width:'10%'
			},{
				title: '税额',
				dataIndex:'se',
				key:'se',
				sorter: true,
      	sortOrder: sortedInfo.columnKey === 'se' && sortedInfo.order,
				width:'10%'
			},{
				title: '签收状态',
				dataIndex:'is_received',
				key:'is_received',
				render:(text)=>{
					if(text===0){
						return <div>未签收</div>
					}else{
						return <div>已签收</div>
					}
				},
				width:'10%'
			},{
				title: '签收日期',
				dataIndex:'rec_time',
				key:'rec_time',
				sorter: true,
				sortOrder: sortedInfo.columnKey === 'rec_time' && sortedInfo.order,
				render:(text,record)=>{
					if(record.is_received===0){   
						return <div>---</div>
					}else{
						return <div>{record.rec_time}</div>
					}
				},
				width:'10%'
			},{
				title: '发票状态',
				dataIndex:'inv_status',
				key:'inv_status',
				sorter: true,
				sortOrder: sortedInfo.columnKey === 'inv_status' && sortedInfo.order,
				render: (text)=>{
					return(
						<div>
							{text===0  && <div style={{width:"50px",background:'#00A9B3',color:"#fff",textAlign:'center',borderRadius:2}}>正常</div>}
							{text===1  && <div style={{width:"50px",background:'#FF7F7F',color:"#fff",textAlign:'center',borderRadius:2}}>失控</div>}
							{text===2  && <div style={{width:"50px",background:'#FAC000',color:"#fff",textAlign:'center',borderRadius:2}}>作废</div>}
							{text===3  && <div style={{width:"50px",background:'rgb(255, 105, 105)',color:"#fff",textAlign:'center',borderRadius:2}}>红冲</div>}
							{text===4  && <div style={{width:"50px",background:'#FF7F7F',color:"#fff",textAlign:'center',borderRadius:2}}>异常</div>}
					  </div>
					)
				},
				width:'10%'
			}]
			return(
				<div style={{background: '#fff',marginBottom:50}} className="deductionTable">
					<Table 
						columns={columns}
						dataSource={this.state.dataSource}
						rowKey="id"
						pagination={false}
						rowSelection={rowSelection}
						loading={deductionLoad}
						scroll={{y:'65vh'}}
						onRowClick={(record)=>{
							if(settingsList.is_collect_all === true){
								if(record.is_collect_all === true){
									this.props.getDetail({id:record.id},(res)=>{
										this.setState({showDetail:this.invoiceDetail(res,record)})
									});
								}else{
									this.props.getDetail({id:record.id},(res)=>{
										this.setState({
																	 isCollectAll:<div style={{fontSize:13,lineHeight:2,marginTop:35}}>
																									<p>暂时无法获取此发票全票面信息，请稍后再试。</p>
																								</div>
																	},()=>{
																		this.setState({showDetail:this.invoiceDetail(res,record)})
																	})
									});
								}
							}else{
								this.props.getDetail({id:record.id},(res)=>{
									this.setState({
										isCollectAll:<div style={{fontSize:13,lineHeight:2,marginTop:35}}>
																		 <p>当前企业未开通获取发票全票面信息功能</p>
																		 <p>如需此功能，请联系客服开通。</p>
																		 <p>400-9922-752</p>
																	 </div>
																	},()=>{
																		this.setState({showDetail:this.invoiceDetail(res,record)})
																	 })
								});
							}
						}}
						onChange={(pagination, filters, sorter)=>{
							if(sorter.field){
								const val = sorter.order === "ascend" ? 1: -1;
								this.setState({sortedInfo:sorter},()=>{this.props.setOrderFnc(sorter.field,val)});
							}
						}}
					/>
					<BottomPage style={{left:this.props.collectionStop?'75px':'210px'}}>
						<div style={{float:'right',marginLeft:15,overflow:'hidden',fontSize:12,marginTop:5}}>
							共{this.state.total_count}条 / 每页50条
						</div>
						<Pagination total={this.state.total_count}
												style={{float:'right',background: '#F7FBFF'}}
												defaultPageSize={50}
												current={this.props.state.page}
												onChange={(page,pageSize)=>{
													this.props.changePage(page)
												}}
						/>
						<Button disabled={!this.state.selectedRowKeys.length>0} onClick={this.showModal} type="primary">认证</Button>
						{
							this.state.allDeduction===false&&<Button disabled={!this.state.selectedRowKeys.length>0} style={{marginLeft:20}} onClick={this.signFnc} type="primary">签收</Button>
						}
						{
							this.state.selectedRowKeys.length>0 ? <MoneySpan>已勾选{this.state.selectedRowKeys.length}张发票</MoneySpan>:''
						}
						{
							this.state.length>0&&this.state.allDeduction===false ? <MoneySpan>金额&nbsp;&nbsp;总计：￥{this.state.selectJeTotal}</MoneySpan>:''
						}
						{
							this.state.length>0&&this.state.allDeduction===false ? <MoneySpan>税额&nbsp;&nbsp;总计：￥{this.state.selectAmount}</MoneySpan>:''
						}
						{
							this.state.allDeduction===true&&this.state.selectedRowKeys.length>0 && <MoneySpan>金额&nbsp;&nbsp;总计：￥{Number(this.state.allJe).toFixed(2)}</MoneySpan>
						}
						{
							this.state.allDeduction===true&&this.state.selectedRowKeys.length>0 && <MoneySpan>税额&nbsp;&nbsp;总计：￥{Number(this.state.allSe).toFixed(2)}</MoneySpan>
						}
					</BottomPage>
					{this.state.showDetail}
					{this.state.showModal}
					{this.state.showDeductionModal}
					{this.state.signShow}
					{this.state.declareModal}
				</div>
			)
    }
}


export default DeductionTable