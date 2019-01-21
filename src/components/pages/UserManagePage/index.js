import React from 'react'
import {NavTitle,UserManageFilter,UserManageTable} from 'components'

class UserManagePage extends React.Component{
  state = {
    showInfo:false,
    page:1,
    size:10,
    cus_num:'',
    bank:'',
    name:'',
    tax_num:'',
    memo1:'',
    showTable:false,
    showCheck:true,
    is_select_id:'',
    order:JSON.stringify({'order_name':'','order_value':''}),
    order_name:'',
    order_value:'',
  }
  clearFnc = () => {
    this.table.clearRadiuo()
    this.setState({
      showInfo:false,
      page:1,
      size:10,
      cus_num:'',
      bank:'',
      name:'',
      tax_num:'',
      memo1:'',
      showTable:false,
      showCheck:true,
      is_select_id:'',
      order_name:'',
      order_value:'',
    })
  }
  searchFnc = (values) => {
    this.setState({showTable:true},()=>{
      this.setState({
        showInfo:true,
        cus_num:values['cus_num'],
        bank:values['bank'],
        name:values['name'],
        tax_num:values['tax_num'],
        memo1:values['memo1'],
      })
    })
  }
  checkInvoice = () => {
    const param = {
      size:10,
      page:1,
      size:10,
      cus_num:this.state.cus_num,
      bank:this.state.bank,
      name:this.state.name,
      tax_num:this.state.tax_num,
      memo1:this.state.memo1,
      is_select_id:1,
      order:JSON.stringify({'order_name':this.state.order_name,'order_value':this.state.order_value}),
    }
    if(this.state.showCheck === true){
      this.props.getCustomerId(param,(res)=>{
        this.table.checkRadiuo(res)
        this.setState({showCheck:false})
      })
    }else{
      this.table.clearRadiuo()
      this.setState({showCheck:true})
    }
  }
  render(){
    const { getCustomerList,customerList,exportCustomer,delFnc,loading,collectionStop,addFnc,editFnc,getCustomerDetail } = this.props;
    return(
      <div>
        <NavTitle title="客户管理"/>
        <UserManageFilter showInfo={this.state.showInfo}
                           searchFnc={this.searchFnc}
                           showCheck={this.state.showCheck}
                           checkInvoice={this.checkInvoice}
                           clearAllFnc={this.clearFnc}/>
        <UserManageTable  state={this.state}
                          addFnc={addFnc}
                          editFnc={editFnc}
                          exportCustomer={exportCustomer}
                          delFnc={delFnc}
                          ref={ref=>this.table = ref}
                          getCustomerList={getCustomerList}
                          customerList={customerList}
                          showTable={this.state.showTable}
                          getCustomerDetail={getCustomerDetail}
                          collectionStop={collectionStop}
                          loading={loading}
                          setOrderFnc={(name,val)=>{
                            this.setState({order_name:name,order_value:val})
                          }}
                          setPageFnc={(page)=>this.setState({page})}/>
      </div>
    )
  }
}

export default UserManagePage;
