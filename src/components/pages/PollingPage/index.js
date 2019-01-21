import React from 'react'
import {NavTitle,PollingTable,PollingFilter,WaitHistoryTable,PollingDetailTable,PollingSetTable} from 'components'
import { Input,Icon,Badge,Modal,Button,Table } from 'antd'
import styled from 'styled-components'

const TableContent = styled.div`
  background:#fff;
  padding:10px;
  min-height:70vh;
	position:relative;
	margin-top:15px;
`;
const WaitSpan = styled.a`
  color:#fff;
  &:hover{
    color:#f5f5f5;
  }
`;
const WaitBtn = styled.span`
  float:right;
  height:40px;
  line-height:40px;
  padding:0 10px;
  background:#2397CA;
  margin-right:2.5rem;
  cursor:pointer;
  font-size:12px;
`;
const Search = Input.Search;
class PollingPage extends React.Component{
  state={
		showInfo:false,
		showDetailInfo:false,
    page:1,
    state:'',
    time_area:'',
    keyword:'',
    special_types:'',
    einvoice_types:'',
    is_success:1,
    tag_ids:'',
    searchVal:'',
    entry_id:'',
    sub_time:'',
    order_name:'',
    order_value:'',
    fplc:'',
    xfmc:'',
    zfbz:'',
    goRefresh:false,
		isDown:false,
		polling:true,
		is_polling:"2",
		showWaitList:false,
		changeClassName:true,
		noWaitData:"",
		showDetailList:false,
		changeDetailClassName:true,
		polling_id:'',
		detailList:'',
		showCheck:true,
		showPollingSet:false,
		showTable:false,
		jshj_min:'',
		jshj_max:'',
		effect_way:-1,
		handle:'',
		bank:'',
	};
	showWait = () => {
		const {historyData} = this.props;
    return (
			<WaitBtn onClick={this.goToWait}>
        <Badge count={historyData.total} style={{top:'-22px'}} overflowCount={10}>
          <WaitSpan href="javascript:;">轮询历史记录</WaitSpan>
        </Badge>
      </WaitBtn>
    )
	};
	showSetPolling = () => {
    return (
			<WaitBtn onClick={this.goToSet}>
        <Badge style={{top:'-22px'}}>
          <WaitSpan href="javascript:;">定时轮询设置</WaitSpan>
        </Badge>
      </WaitBtn>
    )
	};
	goToSet = () => {
			this.clearAllFnc()
			this.setState({showPollingSet:true,showWaitList:true,changeClassName:true,page:1});
	}
	goToWait = (res) => {
			const historyData = res.data?res.data:this.props.historyData;
			this.clearAllFnc()
			if(historyData &&  historyData.total > 0){
				this.setState({showWaitList:true,changeClassName:true,page:1},()=>{
						const param = {
							size:10,
							page:1,
						}
						this.props.getHistoryData(param)
				});
			}else{
				this.setState({noWaitData:<Modal style = {{textAlign:'center',top:150}}
																				closable={false}
																				visible
																				width={400}
																				maskClosable={false}
																				footer={null}
				>
					<p style={{fontSize:14,padding:'20px 0'}}>暂无轮询历史记录</p>
					<Button type="primary"
									onClick={()=>{
										this.setState({noWaitData:''});
									}}
					>确定</Button>
				</Modal>})
			}
	}
  componentWillMount(){
		this.props.getXfmcList()
		this.props.getHistoryData()
		this.props.getPollingTask()
		this.props.getBankList()
	};
	showBack = () =>{
		return <Icon type="close" style={{float:'right',marginRight:15,marginTop:25,fontSize:20,cursor:'pointer',display:"inline-block"}}
															onClick={()=>{
																this.setState({
																	changeClassName:false,
																	showTable:false,
																});
																this.clearState()
																setTimeout(() => {
																	this.setState({showWaitList:false,showPollingSet:false});
																},500);
															}}/>
	};
	clearState = () => {
		this.setState({
			showInfo:false,
      searchVal:'',
      keyword:'',
      state:'',
      time_area:'',
      special_types:'',
      einvoice_types:'',
      is_success:1,
      tag_ids:'',
      entry_id:'',
      sub_time:'',
      order_name:'',
      order_value:'',
      goRefresh:true,
      fplc:'',
      xfmc:'',
      zfbz:'',
			polling:true,
			polling_id:'',
			is_polling:"2",
			page:1,
			effect_way:-1,
			jshj_min:'',
			jshj_max:'',
			handle:'',
			bank:'',
    });
	}
  clearAllFnc = () => {
    this.setState({
			showInfo:false,
      searchVal:'',
      keyword:'',
      page:1,
      state:'',
      time_area:'',
      special_types:'',
      einvoice_types:'',
      is_success:1,
      tag_ids:'',
      entry_id:'',
      sub_time:'',
      order_name:'',
      order_value:'',
      goRefresh:true,
      fplc:'',
      xfmc:'',
      zfbz:'',
			polling:true,
			polling_id:'',
			is_polling:"2",
			showTable:false,
			effect_way:-1,
			jshj_min:'',
			jshj_max:'',
			handle:'',
			bank:'',
    });
    this.filter&&this.filter.resetFields();
	};
	clearDetailFnc = () => {
		this.setState({
			showDetailInfo:false,
      is_success:2,
      zfbz:'',
			state:'',
			bank:'',
			handle:'',
		});
    this.filter.resetFields();
		this.PollingDetailTable.clearSorter();
	}
  searchAllFnc = (val) => {
		this.setState({showTable:true},()=>{
			this.setState({
				keyword:this.state.searchVal,
				showInfo:true,
				state:val.state,
				time_area:val.time_area,
				special_types:val['special_types'],
				einvoice_types:val['einvoice_types'],
				is_success:val.is_success,
				tag_ids:val.tag_ids,
				page:1,
				entry_id:this.state.entry_id,
				sub_time:val.sub_time,
				fplc:val.fplc,
				xfmc:val.xfmc,
				zfbz:val.zfbz,
				is_polling:val.is_polling,
				state:val.state,
				jshj_min:val.jshj_min,
				jshj_max:val.jshj_max,
				effect_way:val.effect_way,
			})
		})
	};
	searchDetailFnc = (val) => {
		this.PollingDetailTable.clearRadiuo()
    this.setState({
			zfbz:val.zfbz,
			is_success:val.is_success,
			showDetailInfo:true,
      state:val.state,
			showCheck:true,
			handle:val.handle,
			bank:val.bank,
    })
	};
	showDetailBack = ()=>{
		return <Icon  type="close" style={{float:'right',marginRight:15,fontSize:20,cursor:'pointer',marginTop:25,display:"inline-block"}}
									onClick={()=>{
										this.setState({
											changeDetailClassName:false,
											showCheck:true,
										});
										setTimeout(() => {
											this.setState({showDetailList:false},()=>{	
												this.clearState()
											});
										},500);
									}}/>
	}
  checkInvoice = () => {
    const param = {
			size:this.state.size,
			page:this.state.page,
			zfbz:this.state.zfbz,
			is_polling:this.state.is_polling,
			polling_id:this.state.polling_id,
			select_all:1,
			is_success:this.state.is_success,
      state:this.state.state,
			handle:this.state.handle,
			bank:this.state.bank,
		}
		if(this.state.showCheck === true){
      this.props.getPollingDetail(param,(res)=>{
        this.PollingDetailTable.checkRadiuo(res)
        this.setState({showCheck:false})
      })
    }else{
      this.PollingDetailTable.clearRadiuo()
      this.setState({showCheck:true})
    }
	}
  componentWillReceiveProps(next){
    if(next.routeData){
			this.props.changeRoute(false)
			this.props.getHistoryData({},(res)=>{
				this.goToWait(res)
			})
    }
  }
  render(){
		const {pollingLoading,navList,invMemoFnc,bankList,handlePolling,detailLoading,getPollingDetail,pollingDetail,invoiceList,getHistoryData,historyData,exportAction,invoiceAction,PollingFnc,getPollingTask,pollingTaskList,addPollingTask,editPollingTask,deletePollingTask} = this.props;		return(
			<div>
				{
					this.state.showWaitList === false && 
					<div style={{position:"relative"}}>
					<NavTitle
						title="发票管理"
						submeun='轮询查验'
						search={this.showWait}
						setSearch={this.showSetPolling}
					/>
					<PollingFilter ref={ref=>this.filter = ref}
												clearAllFnc={this.clearAllFnc}
												showInfo={this.state.showInfo}
												state={this.state}
												bankList={bankList}
												xfmcList={this.props.xfmcList}
												searchFnc={this.searchAllFnc}/>
					<TableContent>
						{this.state.showTable === true ? 
						<PollingTable invoiceList={invoiceList}
													PollingFnc={PollingFnc}
													total={true}
													invMemoFnc={invMemoFnc}
													showWaitList={this.state.showWaitList}
													showInfo={this.state.showInfo}
													getHistoryData={this.props.getHistoryData}
													invoiceAction={invoiceAction}
													loading={this.props.loading}
													collectionStop={this.props.collectionStop}
													getDetail={this.props.getDetail}
													state={this.state}
													ref={ref=>this.pollingTable = ref}
													navList={this.props.navList}
													getData={this.props.getData}
													setRefresh={()=>{
														this.setState({goRefresh:false})
													}}
													setPageFnc={(page)=>{
														this.setState({page:page})
													}}
													setOrderFnc={(name,val)=>{
														this.setState({order_name:name,order_value:val})
													}}
						/>:<Table/>}
					</TableContent>
				</div>
				}
				{
					this.state.showPollingSet &&
					<div style={{display:'block',position:"relative"}}>
							<NavTitle
								submeun="定时轮询设置"
								title="轮询查验"
								back={this.showBack}
							/>
							<div className={this.state.changeClassName?"wait-table-container":"wait-table-out"}>
								<PollingSetTable xfmcList={this.props.xfmcList}
																 loading={pollingLoading}
																 collectionStop={this.props.collectionStop}
																 getPollingTask={getPollingTask}
																 page={this.state.page}
																 setPageFnc={(page)=>this.setState({page:page})}
																 pollingTaskList={pollingTaskList}
																 addPollingTask={addPollingTask}
																 editPollingTask={editPollingTask}
																 deletePollingTask={deletePollingTask}
								/>
							</div>
						</div>
				}
				{
          this.state.showWaitList && this.state.showPollingSet === false &&
					<div>
						<div style={{display:this.state.showDetailList?'none':'block',position:"relative"}}>
							<NavTitle
								submeun="轮询历史记录"
								title="轮询查验"
								back={this.showBack}
							/>
							<div className={this.state.changeClassName?"wait-table-container":"wait-table-out"}>
								<WaitHistoryTable getHistoryData={getHistoryData}
																	historyData={historyData}
																	getChildFont={this.getChildFont}
																	collectionStop={this.props.collectionStop}
																	changeDetailShow={(val) =>{
																		 this.setState({showDetailList:true,
 																										changeDetailClassName:true},()=>{
																											 	this.setState({
																													time_area:val.time_area,
																													is_polling:val.is_polling,
																													polling_id:val.polling_id,
																													is_success:val.is_success,
																													zfbz:val.zfbz,
																													state:val.state,
																													handle:val.handle,
																													bank:val.bank,
																													page:1,
																													size:10,
																												 })
																										 })
																	}}
								/>
							</div>
						</div>
						{
							this.state.showDetailList === true && 
							<div>
								<NavTitle
									submeun="轮询历史记录"
									title="轮询查验"
									childFont='轮询历史详情'
									back={this.showDetailBack}
								/>
								<div className={this.state.changeDetailClassName?"wait-table-container":"wait-table-out"}>
									<PollingFilter 	ref={ref=>this.filter = ref}
																	detail={true}
																	state={this.state}
																	bankList={bankList}
																	clearDetailFnc={this.clearDetailFnc}
																	showCheck={this.state.showCheck}
																	checkInvoice={this.checkInvoice}
																	showDetailInfo={this.state.showDetailInfo}
																	searchDetailFnc={this.searchDetailFnc}/>
									<TableContent>
										<PollingDetailTable invoiceList={invoiceList}
																				collectionStop={this.props.collectionStop}
																				exportAction={exportAction}
																				handlePolling={handlePolling}
																				PollingFnc={PollingFnc}
																				invMemoFnc={this.props.invMemoFnc}
																				getPollingDetail={getPollingDetail}
																				pollingDetailFnc={this.props.pollingDetailFnc}
																				pollingDetail={pollingDetail}
																				loading={this.props.loading}
																				getDetail={this.props.getDetail}
																				state={this.state}
																				detailLoading={detailLoading}
																				ref={ref=>this.PollingDetailTable = ref}
																				navList={this.props.navList}
																				getData={this.props.getData}
																				invoiceAction={invoiceAction}
																				changeCheck={()=>{
																					this.setState({showCheck:true})
																				}}
																				setRefresh={()=>{
																					this.setState({goRefresh:false})
																				}}
																				setPageFnc={(page)=>{
																					this.setState({page:page})
																				}}
																				setOrderFnc={(name,val)=>{
																					this.setState({order_name:name,order_value:val})
																				}}/>
									</TableContent>
								</div>
							</div>
						}
          </div>
				}
				{this.state.noWaitData}
			</div>
    )
  }
}

export default PollingPage
