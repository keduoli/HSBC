import React from 'react';
import styled from 'styled-components';
import { Table,Pagination,Button,Modal,Checkbox,Radio,message } from 'antd'
import { ExpandDeduction,AddCallModal,DeductionModal,DeclareModal } from 'components'
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const BottomPage = styled.div`
  background:#f7f7f7;
  position:fixed;
  bottom:0px;
  right:0px;
  padding:16px 18px;
  z-index:100;
  -webkit-transition: all .2 ease;
  transition: all .2s ease;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
class ResultTable extends React.Component {
    constructor(props){
			super(props);
			this.state={
				sortedInfo: {columnKey: "kprq", field: "kprq", order: "descend"},
				dataSource:[],
				show:true,
				invoice_ids:"",
				total_count:0,
				exportUrl:'',
				succ:false,
				showDetail:'',
				selectJeTotal:'',
				selectAmount:'',
				showModal:'',
				length:'',
				selectedRowKeys:[],
				selectArr:'',
				invoice_info:[],
				isCollectAll:'',
				turnoutModal:'',
				transfer_reason:'',
				confirmArr:'',
				showModal:"",
				declareModal:"",
				showDeductionModal:'',
			}
			this.selectAmountArr=[]
		}
		componentWillReceiveProps(nextProps){
			const {page,size,order_name,order_value,income_month,fpdm,fphm,xfmc,status,result,dedu_area,kprq_area} = this.props.state;
			const next = nextProps.state;
			if(next.order_name!==order_name ||next.order_value!==order_value||next.result!==result||next.status!==status||next.dedu_area!==dedu_area
				|| next.income_month!==income_month || next.fpdm!==fpdm||next.xfmc!==xfmc|| next.page!==page|| next.size!==size||next.kprq_area!==kprq_area||
				next.fphm!==fphm
			){
				const param={
					income_month:next.income_month,
					fpdm:next.fpdm,
					fphm:next.fphm,
					xfmc:next.xfmc,
					status:next.status,
					result:next.result,
					dedu_area:next.dedu_area,
					kprq_area:next.kprq_area,
					page:next.page,
					size:next.size,
					order:JSON.stringify({'order_name':next.order_name,'order_value':next.order_value}),
				};
				this.props.getData(param);
			}
			if(nextProps.resultList){
				this.setState({dataSource:nextProps.resultList.invoices,total_count:nextProps.resultList.total_count})
			}
		};
		refreshData=()=>{
			const {state} = this.props;
			const param={
				income_month:state.income_month,
				fpdm:state.fpdm,
				fphm:state.fphm,
				xfmc:state.xfmc,
				status:state.status,
				result:state.result,
				dedu_area:state.dedu_area,
				kprq_area:state.kprq_area,
				page:state.page,
				size:state.size,
				order:JSON.stringify({'order_name':state.order_name,'order_value':state.order_value}),
			};
			this.selectAmountArr = [];
			this.setState({selectedRowKeys:[],confirmArr:'',transfer_reason:'',selectArr:[],selectAmount:'',length:'',selectJshj:0,selectJeTotal:'',selectSeTotal:'',showJeCount:0,showSeCount:0});
			this.props.getData(param);
		};
		showModal = () => {
			if(this.state.selectArr.indexOf(1) >= 0 || this.state.selectArr.indexOf(2) >= 0|| this.state.selectArr.indexOf(3) >= 0|| this.state.selectArr.indexOf(4) >= 0){
				message.error("只有发票状态为正常的发票才可以认证");return;
			}
			this.setState({showModal:<AddCallModal 
																	cancelModal={()=>{this.setState({showModal:''})}}
																	deduction={true}
																	title="验证手机号"
																	deductionSet={()=>this.props.settingsList.is_declaration===null?this.declare():this.deduction(null)}
																	deductionList={this.props.resultList}
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
		invoiceDetail = (res,record) => {
			return (
				<ExpandDeduction detailList={res.data}
												 record={record}
												 result={true}
												 confirmList={this.props.confirmList}
												 settingsFnc={this.props.settingsFnc}
												 settingsGet={this.props.settingsGet}
												 settingsList={this.props.settingsList}
												 isCollectAll={this.state.isCollectAll}
												 deductionReceive={this.props.deductionReceive}
												 deductionConfirm={this.props.deductionConfirm}
												 invoice_info={this.state.invoice_info}
												 resultList={this.props.resultList}
												 getBunding={this.props.getBunding}
												 getPhoneSend={this.props.getPhoneSend}
												 clearState={this.props.clearState}
												 refreshData={this.refreshData}
												 getDetail={this.props.getDetail}
												 deductionFnc={this.props.deductionFnc}
												 getData={this.props.getData}
												 cancelFnc={()=>{this.setState({showDetail:''})}}													
				/>
			)
		}
		clearSorter = () => {
			this.setState({selectedRowKeys:[],selectArr:[],length:[],sortedInfo: {columnKey: "kprq", field: "kprq", order: "descend"}})
		}
		clearCheck = () => {
			this.setState({selectedRowKeys:[]})
		}
		exportFnc = () => {
			this.props.exportResult({invoice_ids:this.state.invoice_ids});
		}
		trunoutChange = (e) => {
			this.setState({transfer_reason:e.target.value})
		}
		transferCancel = () => {
			const param = {
				invoice_ids: this.state.selectedRowKeys.join(',')
			}
			this.props.transferCancel(param,()=>{
				this.refreshData()
			})
		}
		turnoutTax = () => {
			this.setState({turnoutModal:<Modal title={<TitleSpan>进项税转出原因</TitleSpan>}
																				 style = {{top:100}}
																				 visible
																				 width={330}
																			 	 onCancel={()=>this.setState({turnoutModal:'',transfer_reason:''})}
																				 maskClosable={false}
																				 footer={null}>
																			<div  style={{marginLeft:40}}>
																				<RadioGroup onChange={this.trunoutChange}>
																					<Radio style={{marginTop:8}} value={14}>免税项目用</Radio><br/>
																					<Radio style={{marginTop:8}} value={15}>非应税项目用、集体福利、个人消费</Radio><br/>
																					<Radio style={{marginTop:8}} value={16}>非正常损失</Radio><br/>
																					<Radio style={{marginTop:8}} value={17}>简易计税方法征税项目用</Radio><br/>
																					<Radio style={{marginTop:8}} value={18}>免抵退税办法不得抵扣的进项税额</Radio><br/>
																					<Radio style={{marginTop:8}} value={19}>纳税检查调减进项税额</Radio><br/>
																					<Radio style={{marginTop:8}} value={20}>红字专用发票通知单注明的进项税额</Radio><br/>
																					<Radio style={{marginTop:8}} value={21}>上期留抵税额抵减欠税</Radio><br/>
																					<Radio style={{marginTop:8}} value={22}>上期留抵税额退税</Radio><br/>
																					<Radio style={{marginTop:8}} value={23}>其他</Radio><br/>
																				</RadioGroup>
																			</div>
																			<div style={{overflow:"hidden",margin:'0 auto',textAlign:'center',marginTop:20}}>
																				<Button onClick={()=>this.setState({turnoutModal:'',transfer_reason:''})} style={{marginRight:30}}>取消</Button>
																				<Button type="primary" onClick={()=>{
																					if(this.state.transfer_reason === ''){
																						message.error("请选择转出原因");return;
																					}
																					if(this.state.confirmArr.indexOf(0) >= 0 || this.state.confirmArr.indexOf(2) >= 0){
																						message.error("只有认证通过的发票才可以转出");return;
																					}
																					const param = {
																						invoice_ids: this.state.selectedRowKeys.join(','),
																						transfer_reason: this.state.transfer_reason
																					}
																					this.props.transferFnc(param,()=>{
																						this.setState({turnoutModal:''})
																						this.refreshData()
																					})
																				}}>确定</Button>
																			</div>
																	</Modal>})
		}
		onSelectChange = (selectedRowKeys, selectedRows) => {
				const invoice_ids = selectedRowKeys+"";
				this.setState({invoice_ids, selectedRowKeys,length:selectedRowKeys.length });
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
				let arr2 = [];
				this.selectAmountArr.map((el)=>{
					el.data.map((item)=>{
						arr.push(item);
						arr2.push(item.confirm_result)
						if(item.je){
							amount += parseFloat(new Number(item.je));
						}
						if(item.se){
							jeTotal += parseFloat(new Number(item.se));
						}
						if(item.fphm){
							invoice_info.push({fphm:item.fphm,fpdm:item.fpdm})
						}
					});
				});
				this.setState({confirmArr:arr2,selectArr:arr,invoice_ids,invoice_info,selectJeTotal:amount.toFixed(2),selectAmount:jeTotal.toFixed(2)})
		}
    render(){
			const {resultLoad,settingsList} = this.props;
			const { selectedRowKeys } = this.state;
			const rowSelection = {
				selectedRowKeys,
				onChange: this.onSelectChange,
			};
			let {sortedInfo} = this.state;
    	sortedInfo = sortedInfo || {};
			const columns=[{
				title: '认证结果',
				dataIndex:'confirm_result',
				key:'confirm_result',
				sorter: true,
				sortOrder: sortedInfo.columnKey === 'confirm_result' && sortedInfo.order,
				width:"8%",
				render:(text)=>{
					return (
						<div>
							{text===0  && <div style={{width:"60px",background:'#FAC000',color:"#fff",textAlign:'center',borderRadius:2}}>未认证</div>}
							{text===1  && <div style={{width:"60px",background:'#00A9B3',color:"#fff",textAlign:'center',borderRadius:2}}>认证通过</div>}
							{text===2  && <div style={{width:"60px",background:'#FF7F7F',color:"#fff",textAlign:'center',borderRadius:2}}>不通过</div>}
						</div>
					)
				}
			},{
				title: '认证状态',
				dataIndex:'confirm_status',
				key:'confirm_status',
				sorter: true,
				sortOrder: sortedInfo.columnKey === 'confirm_status' && sortedInfo.order,
				width:"8%",
				render:(text)=>{
					return(
						<div style={{textAlign:'center'}}>
							{text===0 && <div>未认证</div>}
							{text===1 && <div>待发送认证</div>}
							{text===2 && <div>认证中</div>}
							{text===3 && <div>已认证</div>}
							{text===4 && <div>待确认</div>}
							{text===9 && <div>不需认证</div>}
						</div>
					)
				}
			},{
				title: '认证日期',
				dataIndex:'confirm_date',
				key:'confirm_date',
				sorter: true,
				sortOrder: sortedInfo.columnKey === 'confirm_date' && sortedInfo.order,
				width:"7%",
				render: (text)=>{
					if(typeof(text) === 'string'){
						const date = text.split('T');
						return(
							<div>{date[0]}</div>
						)
					}else{
						return(
							<div>---</div>
						)
					}
				}
			},{
				title: '认证来源',
				dataIndex:'is_dedu_dkt',
				key:'is_dedu_dkt',
				width:"7%",
				render: (text)=>{
					return <div>
										{text == 0 && '国税认证'}
										{text == 1 && '费耘认证'}
										{text == null && '--'}
								 </div>
				}
			},{
				title: '税款所属期',
				dataIndex:'income_month',
				key:'income_month',
				sorter: true,
				sortOrder: sortedInfo.columnKey === 'income_month' && sortedInfo.order,
				width:"8%"
			},{
				title: '开票日期',
				dataIndex:'kprq',
				key:'kprq',
				sorter: true,
				sortOrder: sortedInfo.columnKey === 'kprq' && sortedInfo.order,
				width:"7%"
			},{
				title: '发票类型',
				dataIndex:'inv_type',
				key:'inv_type',
				sorter: true,
				sortOrder: sortedInfo.columnKey === 'inv_type' && sortedInfo.order,
				width:"7%",
				render: (text) => {
					return(
						<div>
							{text===1 && <div>专用发票</div>}
							{text===3 && <div>机动车票</div>}
							{text===14 && <div>通行费票</div>}
						</div>
					)
				}
			},{
				title: '发票代码',
				dataIndex:'fpdm',
				key:'fpdm',
				sorter: true,
				sortOrder: sortedInfo.columnKey === 'fpdm' && sortedInfo.order,
				width:"7%"
			},{
				title: '发票号码',
				dataIndex:'fphm',
				key:'fphm',
				sorter: true,
				sortOrder: sortedInfo.columnKey === 'fphm' && sortedInfo.order,
				width:"7%"
			},{
				title: '发票状态',
				dataIndex:'inv_status',
				key:'inv_status',
				sorter: true,
				sortOrder: sortedInfo.columnKey === 'inv_status' && sortedInfo.order,
				width:"7%",
				render: (text) => {
					return(
						<div>
							{text===0  && <div style={{width:"50px",background:'#00A9B3',color:"#fff",textAlign:'center',borderRadius:2}}>正常</div>}
							{text===1  && <div style={{width:"50px",background:'#FF7F7F',color:"#fff",textAlign:'center',borderRadius:2}}>失控</div>}
							{text===2  && <div style={{width:"50px",background:'#FAC000',color:"#fff",textAlign:'center',borderRadius:2}}>作废</div>}
							{text===3  && <div style={{width:"50px",background:'#FAC000',color:"#fff",textAlign:'center',borderRadius:2}}>红冲</div>}
							{text===4  && <div style={{width:"50px",background:'#FF7F7F',color:"#fff",textAlign:'center',borderRadius:2}}>异常</div>}
						</div>
					)
				}
			},{
				title: '销方名称',
				dataIndex:'xfmc',
				key:'xfmc',
				sorter: true,
				sortOrder: sortedInfo.columnKey === 'xfmc' && sortedInfo.order,
				width:"8%"
			},{
				title: '金额',
				dataIndex:'je',
				key:'je',
				sorter: true,
				sortOrder: sortedInfo.columnKey === 'je' && sortedInfo.order,
				width:"6%"
			},{
				title: '税额',
				dataIndex:'se',
				key:'se',
				sorter: true,
				sortOrder: sortedInfo.columnKey === 'se' && sortedInfo.order,
				width:"7%"
			}]
			return(
				<div style={{background: '#fff',marginBottom:50}}>
					<Table columns={columns}
								 dataSource={this.state.dataSource}
								 rowKey="id"
								 loading={resultLoad}
								 scroll={{ y:'68vh'}}
								 rowSelection={rowSelection}
								 pagination={false}
								 onChange={(pagination, filters, sorter)=>{
									if(sorter.field){
										const val = sorter.order === "ascend" ? 1: -1;
										this.setState({sortedInfo:sorter},()=>{this.props.setOrderFnc(sorter.field,val)});
									}
								}}
								onRowClick={(record)=>{
									if(settingsList.is_collect_all === true){
										if(record.is_collect_all === true){
											this.props.getDetail({id:record.id},(res)=>{
												this.setState({showDetail:this.invoiceDetail(res,record)})
											});
										}else{
											this.props.getDetail({id:record.id},(res)=>{
												this.setState({isCollectAll:<div style={{fontSize:13,lineHeight:2,marginTop:35}}>
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
					/>
					<BottomPage style={{left:this.props.collectionStop?'75px':'210px'}}>
						<div style={{float:'right',marginLeft:15,overflow:'hidden',fontSize:12,marginTop:5}}>
							共{this.state.total_count}条 / 每页50条
						</div>
						<Pagination total={this.state.total_count}
												style={{float:'right',background: '#F7FBFF'}}
												defaultPageSize={50}
												current={this.props.state.page}
												onChange={(page, pageSize)=>{
													const param={
														page:page,
													}
													this.props.changePage(param)
												}}
												onShowSizeChange={(current, pageSize)=>{
													const param={
														page:current,
														size:pageSize,
													}
													this.props.changePage(param)
												}}
						/>
						{
							this.props.turn ? 
							<Button disabled={!this.state.selectedRowKeys.length>0} onClick={this.transferCancel} type="primary">取消进项税转出</Button>
							:
							<div style={{float:'left'}}>
								<Button disabled={!this.state.selectedRowKeys.length>0} style={{marginRight:20}} onClick={this.exportFnc} type="primary">导出</Button>
								<Button disabled={!this.state.selectedRowKeys.length>0} style={{marginRight:20}} onClick={this.turnoutTax} type="primary" type="primary">进项税转出</Button>
								{
									this.props.state.result == 2 && <Button disabled={!this.state.selectedRowKeys.length>0} onClick={this.showModal} type="primary">再次认证</Button>
								}
							</div>
						}
						{
							this.state.length>0 ? <span style={{color:"#337ab7",marginLeft:20}}>已勾选{this.state.length}张发票</span>:''
						}
						{
							this.state.length>0 ? <span style={{color:"#337ab7",marginLeft:20}}>金额&nbsp;&nbsp;总计：￥{this.state.selectJeTotal}</span>:''
						}
						{
							this.state.length>0 ? <span style={{color:"#337ab7",marginLeft:20}}>税额&nbsp;&nbsp;总计：￥{this.state.selectAmount}</span>:''
						}
					</BottomPage>
					{this.state.showDetail}
					{this.state.turnoutModal}
					{this.state.showModal}
					{this.state.declareModal}
					{this.state.showDeductionModal}
				</div>
			)
    }
}


export default ResultTable