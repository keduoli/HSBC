import React from 'react'
import {NavTitle,LoanManageFilter,LoanManageTable,DrawdownCon} from 'components'
import styled from 'styled-components'
import { Icon } from 'antd'
const CloseIcon = styled(Icon)`
  float:right;
  margin-right:15px;
  margin-top:25px;
  font-size:20px;
  cursor:pointer;
  display:inline-block;
`;
class LoanManagePage extends React.Component{
  state = {
    showInfo:false,
    size:10,
    page:1,
    debt_account:'',
    cus_name:'',
    cus_num:'',
    start_dd_date:'',
    end_dd_date:'',
    num:'',
    memo:'',
    state:'',
    max_dd_amount:'',
    min_dd_amount:'',
    drawdownDetail:'',
    showDetail:false,
    showTable:false,
    showCheck:true,
    is_select_id:'',
    order:JSON.stringify({'order_name':'','order_value':''}),
    order_name:'',
    order_value:'',
    time:'',
  }
  clearFnc = () => {
    this.props.copyOpening(false)
    this.table.clearRadiuo();
    this.setState({
      size:10,
      page:1,
      debt_account:'',
      cus_name:'',
      cus_num:'',
      start_dd_date:'',
      end_dd_date:'',
      num:'',
      memo:'',
      state:'',
      max_dd_amount:'',
      min_dd_amount:'',
      showInfo:false,
      showTable:false,
      showCheck:true,
      is_select_id:'',
      order:JSON.stringify({'order_name':'','order_value':''}),
      order_name:'',
      order_value:'',
      time:'',
    })
  }
  searchFnc = (values) => {
    this.props.copyOpening(false)
    this.setState({showTable:true},()=>{
      this.setState({
        showInfo:true,
        debt_account:values['debt_account'],
        cus_name:values['cus_name'],
        cus_num:values['cus_num'],
        start_dd_date:values['start_dd_date'],
        end_dd_date:values['end_dd_date'],
        num:values['num'],
        memo:values['memo'],
        state:values['state'],
        max_dd_amount:values['max_dd_amount'],
        min_dd_amount:values['min_dd_amount'],
        time:values['time'],
      })
    })
  }
  componentWillMount(){
    this.props.getCustomerList();
  }
  showDetail = (res) => {
    this.props.copyOpening(false)
    this.setState({drawdownDetail:res,changeClassName:true,showDetail:true})
  }
  showBack = () => {
		return <CloseIcon type="close"
                      onClick={()=>{
                        this.props.copyOpening(false)
                        this.setState({
                          changeClassName:false,
                        });
                        setTimeout(() => {
                          this.setState({showDetail:false,drawdownDetail:''},()=>{
                            this.table.refreshData()
                          });
                        },500);
                      }}/>
  };
  checkInvoice = () => {
    const param = {
      page:1,
      size:10,
      debt_account:this.state.debt_account,
      cus_name:this.state.cus_name,
      cus_num:this.state.cus_num,
      start_dd_date:this.state.start_dd_date,
      end_dd_date:this.state.end_dd_date,
      num:this.state.num,
      memo:this.state.memo,
      state:this.state.state,
      max_dd_amount:this.state.max_dd_amount,
      min_dd_amount:this.state.min_dd_amount,
      is_select_id:1,
      order:JSON.stringify({'order_name':this.state.order_name,'order_value':this.state.order_value}),
    }
    if(this.state.showCheck === true){
      this.props.getDrawdownId(param,(res)=>{
        this.table.checkRadiuo(res)
        this.setState({showCheck:false})
      })
    }else{
      this.table.clearRadiuo()
      this.setState({showCheck:true})
    }
  }
  componentWillReceiveProps(next){
    if(next.copyData!==false){
      this.setState({
        page:1,
        size:10,
        num:next.copyData,
        showTable:true,
        showInfo:true,
        debt_account:'',
        cus_name:'',
        cus_num:'',
        start_dd_date:'',
        end_dd_date:'',
        memo:'',
        state:'',
        max_dd_amount:'',
        min_dd_amount:'',
        showDetail:false,
        changeClassName:false,
        drawdownDetail:'',
        showCheck:true,
        is_select_id:'',
        order:JSON.stringify({'order_name':'','order_value':''}),
        order_name:'',
        order_value:'',
        time:'',
      })
      this.filter&&this.filter.resetFields();
    }
  }
  render(){
    const { drawdownList,tabData,tabChange,navList,exportCheckFnc,setContract,setInvId,getDrawdownList,getLinkContractList,getInvoiceList,drawdownLinkInvoice,drawdownUnlinkInvoice,drawdownLinkContract,drawdownUnlinkContract,editFnc,exportDetail,exportDrawdown,drawdownAction,drawdownWithdraw,drawdownCheck,loading,collectionStop,customerList,addFnc,getCustomerDetail,getDrawdownDetail } = this.props;
    return(
      <div style={{display:'block',position:"relative"}}>
      {
        !this.state.showDetail?
        <div>
          <NavTitle title="放款管理"/>
          <LoanManageFilter showInfo={this.state.showInfo}
                            searchFnc={this.searchFnc}
                            state={this.state}
                            showCheck={this.state.showCheck}
                            checkInvoice={this.checkInvoice}
                            ref={ref=>this.filter = ref}
                            clearAllFnc={this.clearFnc}/>
          <LoanManageTable state={this.state}
                            getDrawdownList={getDrawdownList}
                            drawdownList={drawdownList}
                            addFnc={addFnc}
                            editFnc={editFnc}
                            ref={ref=>this.table = ref}
                            exportDetail={exportDetail}
                            exportDrawdown={exportDrawdown}
                            drawdownWithdraw={drawdownWithdraw}
                            getDrawdownDetail={getDrawdownDetail}
                            customerList={customerList}
                            showTable={this.state.showTable}
                            getCustomerDetail={getCustomerDetail}
                            collectionStop={collectionStop}
                            loading={loading}
                            showDetail={this.showDetail}
                            setOrderFnc={(name,val)=>{
                              this.setState({order_name:name,order_value:val})
                            }}
                            setPageFnc={(page)=>this.setState({page})}/>
        </div>
        :
        <div style={{display:'block',position:"relative"}}>
          <NavTitle title="放款管理"
                    submeun='放款详情'
                    back={this.showBack}/>
          <div className={this.state.changeClassName?"wait-table-container":"wait-table-out"}>
            <DrawdownCon drawdownDetail={this.state.drawdownDetail}
                         drawdownCheck={drawdownCheck}
                         setInvId={setInvId}
                         tabData={tabData}
                         navList={navList}
                         tabChange={tabChange}
                         drawdownUnlinkContract={drawdownUnlinkContract}
                         drawdownLinkContract={drawdownLinkContract}
                         drawdownLinkInvoice={drawdownLinkInvoice}
                         drawdownUnlinkInvoice={drawdownUnlinkInvoice}
                         getLinkContractList={getLinkContractList}
                         getInvoiceList={getInvoiceList}
                         showDetail={this.showDetail}
                         exportCheckFnc={exportCheckFnc}
                         setContract={setContract}
                         getDrawdownDetail={getDrawdownDetail}
                         drawdownAction={drawdownAction}/>
          </div>
        </div>
      }
      </div>
    )
  }
}

export default LoanManagePage;
