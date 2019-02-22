import React from 'react'
import {NavTitle,ContractManageFilter,ContractManageTable,ContractCon} from 'components'
import { Icon } from 'antd'
import styled from 'styled-components'
const CloseIcon = styled(Icon)`
  float:right;
  margin-right:15px;
  margin-top:25px;
  font-size:20px;
  cursor:pointer;
  display:inline-block;
`;
const RefreshBtn = styled.div`
  display:inline-block;
  margin-left:20px;
`;
const RefreshIcon = styled(Icon)`
  cursor:pointer;
  &:hover{
    color:#2476f8;
  }
  &:active{
    color:rgb(211,211,211);
  }
`;
class ContractManagePage extends React.Component{
  state = {
    size:10,
    page:1,
    showInfo:false,
    con_num:'',
    cus_num:'',
    gfmc:'',
    xfmc:'',
    start_con_date:'',
    memo1:'',
    state:'',
    end_con_date:'',
    showDetail:false,
    contractDetail:'',
    showTable:false,
    showCheck:true,
    dd_id:'',
    order:JSON.stringify({'order_name':'','order_value':''}),
    order_name:'',
    order_value:'',
    min_con_amount:'',
    max_con_amount:'',
    time:'',
  }
  clearFnc = () => {
    this.props.setContract(false)
    this.table.clearRadiuo();
    this.setState({
      size:10,
      page:1,
      showInfo:false,
      con_num:'',
      cus_num:'',
      gfmc:'',
      xfmc:'',
      start_con_date:'',
      memo1:'',
      state:'',
      end_con_date:'',
      contractDetail:'',
      showTable:false,
      dd_id:'',
      showCheck:true,
      order:JSON.stringify({'order_name':'','order_value':''}),
      order_name:'',
      order_value:'',
      min_con_amount:'',
      max_con_amount:'',
      time:'',
    })
  }
  searchFnc = (values) => {
    this.props.setContract(false)
    this.setState({showTable:true},()=>{
      this.setState({
        showInfo:true,
        con_num:values['con_num'],
        cus_num:values['cus_num'],
        gfmc:values['gfmc'],
        xfmc:values['xfmc'],
        start_con_date:values['start_con_date'],
        memo1:values['memo1'],
        state:values['state'],
        end_con_date:values['end_con_date'],
        min_con_amount:values['min_con_amount'],
        max_con_amount:values['max_con_amount'],
        time:values['time'],
      })
    })
  }
  showBack = () => {
		return <CloseIcon type="close"
                      onClick={()=>{
                        this.setState({
                          changeClassName:false,
                        });
                        setTimeout(() => {
                          this.setState({showDetail:false,contractDetail:''},()=>{
                            this.table.refreshData()
                          });
                        },500);
                      }}/>
	};
  componentWillMount(){
    this.props.getCustomerList();
  }
  componentWillReceiveProps(next){
    if(next.setConId!==false){
      this.setState({
        page:1,
        size:10,
        dd_id:next.setConId,
        showInfo:true,
        con_num:'',
        cus_num:'',
        gfmc:'',
        xfmc:'',
        start_con_date:'',
        memo1:'',
        state:'',
        end_con_date:'',
        contractDetail:'',
        showTable:true,
        showCheck:true,
        showDetail:false,
        order:JSON.stringify({'order_name':'','order_value':''}),
        order_name:'',
        order_value:'',
        min_con_amount:'',
        max_con_amount:'',
        time:'',
      })
      this.filter&&this.filter.resetFields();
    }
  }
  checkInvoice = () => {
    const param = {
      page:1,
      size:10,
      gfmc:this.state.gfmc,
      con_num:this.state.con_num,
      cus_num:this.state.cus_num,
      start_con_date:this.state.start_con_date,
      end_con_date:this.state.end_con_date,
      memo1:this.state.memo1,
      state:this.state.state,
      xfmc:this.state.xfmc,
      is_select_id:1,
      order:JSON.stringify({'order_name':this.state.order_name,'order_value':this.state.order_value}),
      min_con_amount:this.state.min_con_amount,
      max_con_amount:this.state.max_con_amount,
    }
    if(this.state.showCheck === true){
      this.props.getContractId(param,(res)=>{
        this.table.checkRadiuo(res)
        this.setState({showCheck:false})
      })
    }else{
      this.table.clearRadiuo()
      this.setState({showCheck:true})
    }
  }
  showDetail = (res) => {
    this.props.setContract(false)
    this.setState({contractDetail:res,changeClassName:true,showDetail:true})
  }
  showRefreshBtn = () => {
    return(
        <RefreshBtn>
          <RefreshIcon type="sync" onClick={()=>{
            const param = {
              page:this.state.page,
              size:10,
              gfmc:this.state.gfmc,
              con_num:this.state.con_num,
              cus_num:this.state.cus_num,
              start_con_date:this.state.start_con_date,
              end_con_date:this.state.end_con_date,
              memo1:this.state.memo1,
              state:this.state.state,
              xfmc:this.state.xfmc,
              is_select_id:0,
              order:JSON.stringify({'order_name':this.state.order_name,'order_value':this.state.order_value}),
              min_con_amount:this.state.min_con_amount,
              max_con_amount:this.state.max_con_amount,
            };
            this.props.getContractList(param);
          }}/>
        </RefreshBtn>
      )
  };
  render(){
    const { contractList,tabData,setInvId,tabChange,getInvoiceList,copyOpening,getDrawdownList,unLinkContract,linkLoading,exportContract,delFnc,linkContract,invoiceList,getContractList,addFnc,collectionStop,loading,customerList,getContractDetail,editFnc } = this.props;
    return(
      <div>
        <div style={{display:'block',position:"relative"}}>
        {
          !this.state.showDetail?
          <div>
            <NavTitle title="合同管理"
                      refreshBtn={this.showRefreshBtn}
                      submeun={this.state.showDetail&&'合同详情'}/>
            <ContractManageFilter showInfo={this.state.showInfo}
                                  searchFnc={this.searchFnc}
                                  customerList={customerList}
                                  showCheck={this.state.showCheck}
                                  checkInvoice={this.checkInvoice}
                                  ref={ref=>this.filter = ref}
                                  state={this.state}
                                  clearAllFnc={this.clearFnc}/>
            <ContractManageTable state={this.state}
                                 collectionStop={collectionStop}
                                 loading={loading}
                                 ref={ref=>this.table = ref}
                                 showTable={this.state.showTable}
                                 editFnc={editFnc}
                                 exportContract={exportContract}
                                 delFnc={delFnc}
                                 getContractDetail={getContractDetail}
                                 customerList={customerList}
                                 contractList={contractList}
                                 showDetail={this.showDetail}
                                 getContractList={getContractList}
                                 addFnc={addFnc}
                                 setOrderFnc={(name,val)=>{
                                   this.setState({order_name:name,order_value:val})
                                 }}
                                 setPageFnc={(page)=>this.setState({page})}/>
          </div>
          :
          <div style={{display:'block',position:"relative"}}>
            <NavTitle title="合同管理"
                      submeun='合同详情'
                      back={this.showBack}/>
            <div className={this.state.changeClassName?"wait-table-container":"wait-table-out"}>
              <ContractCon contractDetail={this.state.contractDetail}
                           getInvoiceList={getInvoiceList}
                           unLinkContract={unLinkContract}
                           tabData={tabData}
                           setInvId={setInvId}
                           tabChange={tabChange}
                           linkLoading={linkLoading}
                           showDetail={this.showDetail}
                           copyOpening={copyOpening}
                           getContractDetail={getContractDetail}
                           linkContract={linkContract}
                           invoiceList={invoiceList}/>
            </div>
          </div>
        }
        </div>
      </div>
    )
  }
}

export default ContractManagePage;
