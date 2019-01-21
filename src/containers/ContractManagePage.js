import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'
import { message } from 'antd'

import { ContractManagePage } from 'components'

const ContractManagePageContainer = props => <ContractManagePage {...props} />;

const mapStateToProps = state => ({
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
  loading:fromData.getLoad(state,actions.RQ.CONTRACT_LIST),
  contractList: fromData.getData(state,actions.RQ.CONTRACT_LIST),
  customerList: fromData.getData(state,actions.RQ.CUSTOMER_LIST),
  invoiceList: fromData.getData(state,actions.RQ.INVOICE_LINK_LIST),
  linkLoading:fromData.getLoad(state,actions.RQ.INVOICE_LINK_LIST),
  copyData: fromData.getCheckSecond(state,fromData.COPY_OPENING),
  setConId: fromData.getCheckSecond(state,fromData.SET_CONTRACT),
  tabData: fromData.getTabData(state,actions.TAB_DATA),
});
const mapDispatchToProps = dispatch => ({
  tabChange:(value) => dispatch(actions.tabChange(value)),
  getContractList: (param,callback) => dispatch(actions.request(actions.RQ.CONTRACT_LIST,"/ajax/contract/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  setInvId: (res)=>{
    dispatch(actions.checkSecond(fromData.SET_INVOICEID,res));
  },
  getContractId: (param,callback) => dispatch(actions.request(actions.RQ.CONTRACT_ID,"/ajax/contract/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  copyOpening: (res)=>{
    dispatch(actions.checkSecond(fromData.COPY_OPENING,res));
  },
  setContract: (res)=>{
    dispatch(actions.checkSecond(fromData.SET_CONTRACT,res));
  },
  getDrawdownList: (param,callback) => dispatch(actions.request(actions.RQ.DRAWDOWN_LIST,"/ajax/drawdown/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  getInvoiceList: (param,callback) => dispatch(actions.request(actions.RQ.INVOICE_LINK_LIST,"/ajax/invoice/link/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  getCustomerList: (param,callback) => dispatch(actions.request(actions.RQ.CUSTOMER_LIST,"/ajax/customer/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  getContractDetail: (id,callback) => dispatch(actions.request(actions.RQ.CONTRACT_DEATIL,"/ajax/contract/detail",{
    params:{con_id:id},
    method:'post',
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  linkContract: (param,callback) => dispatch(actions.request(actions.RQ.LINK_CONTRACT,"/ajax/contract/invoice/link",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callback?callback(res.data):""
    }
  })),
  unLinkContract: (param,callback) => dispatch(actions.request(actions.RQ.LINK_UN_CONTRACT,"/ajax/contract/invoice/unlink",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callback?callback(res.data):""
    }
  })),
  addFnc:(param,callBack) => dispatch(actions.request(actions.RQ.CONTRACT_ADD,"/ajax/contract/increase",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  editFnc:(param,callBack) => dispatch(actions.request(actions.RQ.CONTRACT_EDIT,"/ajax/contract/edit",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  exportContract:(param,callBack) => dispatch(actions.request(actions.RQ.CONTRACT_EXPORT,"/ajax/contract/export/list",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      window.location.href = '/attachment/download/'+res.data;
    }
  })),
  delFnc:(param,callBack) => dispatch(actions.request(actions.RQ.CONTRACT_DELETE,"/ajax/contract/delete",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractManagePageContainer)







