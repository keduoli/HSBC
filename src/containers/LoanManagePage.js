import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'
import { message } from 'antd'

import { LoanManagePage } from 'components'

const LoanManagePageContainer = props => <LoanManagePage {...props} />;

const mapStateToProps = state => ({
  loading:fromData.getLoad(state,actions.RQ.DRAWDOWN_LIST),
  drawdownList: fromData.getData(state,actions.RQ.DRAWDOWN_LIST),
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
  customerList: fromData.getData(state,actions.RQ.CUSTOMER_LIST),
  copyData: fromData.getCheckSecond(state,fromData.COPY_OPENING),
  tabData: fromData.getTabData(state,actions.TAB_DATA),
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
});
const mapDispatchToProps = dispatch => ({
  tabChange:(value) => dispatch(actions.tabChange(value)),
  getDrawdownList: (param,callback) => dispatch(actions.request(actions.RQ.DRAWDOWN_LIST,"/ajax/drawdown/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  getDrawdownId: (param,callback) => dispatch(actions.request(actions.RQ.DRAWDOWN_ID,"/ajax/drawdown/list",{
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
  setInvId: (res)=>{
    dispatch(actions.checkSecond(fromData.SET_INVOICEID,res));
  },
  getCustomerList: (param,callback) => dispatch(actions.request(actions.RQ.CUSTOMER_LIST,"/ajax/customer/list",{
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
  drawdownLinkInvoice: (param,callback) => dispatch(actions.request(actions.RQ.DRAWDOWN_LINK_INVOICE,"/ajax/drawdown/invoice/link",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callback?callback(res.data):""
    }
  })),
  drawdownUnlinkInvoice: (param,callback) => dispatch(actions.request(actions.RQ.DRAWDOWN_UNLINK_INVOICE,"/ajax/drawdown/invoice/unlink",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callback?callback(res.data):""
    }
  })),
  drawdownLinkContract: (param,callback) => dispatch(actions.request(actions.RQ.DRAWDOWN_LINK_CONTRACT,"/ajax/drawdown/contract/link",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callback?callback(res.data):""
    }
  })),
  drawdownUnlinkContract: (param,callback) => dispatch(actions.request(actions.RQ.DRAWDOWN_UNLINK_CONTRACT,"/ajax/drawdown/contract/unlink",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callback?callback(res.data):""
    }
  })),
  getDrawdownDetail: (id,callback) => dispatch(actions.request(actions.RQ.DRAWDOWN_DEATIL,"/ajax/drawdown/detail",{
    params:{id:id},
    method:'post',
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  getLinkContractList: (param,callback) => dispatch(actions.request(actions.RQ.CONTRACTLIST_LINK_LIST,"/ajax/contract/link/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  drawdownAction: (param,callback) => dispatch(actions.request(actions.RQ.DRAWDOWN_ACTION,"/ajax/drawdown/action",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callback?callback(res.data):""
    }
  })),
  drawdownCheck: (id,callback) => dispatch(actions.request(actions.RQ.DRAWDOWN_CHECK,"/ajax/drawdown/check",{
    params:{id:id},
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callback?callback(res.data):""
    }
  })),
  addFnc:(param,callBack) => dispatch(actions.request(actions.RQ.DRAWDOWN_ADD,"/ajax/drawdown/increase",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  getCustomerDetail: (id,callback) => dispatch(actions.request(actions.RQ.CUSTOMER_DEATIL,"/ajax/customer/detail",{
    params:{id:id},
    method:'post',
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  editFnc:(param,callBack) => dispatch(actions.request(actions.RQ.DRAWDOWN_EDIT,"/ajax/drawdown/edit",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  drawdownWithdraw:(param,callBack) => dispatch(actions.request(actions.RQ.DRAWDOWN_WITHDRAW,"/ajax/drawdown/withdraw",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  exportDrawdown:(param,callBack) => dispatch(actions.request(actions.RQ.DRAWDOWN_EXPORT,"/ajax/drawdown/export/list",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      window.location.href = '/attachment/download/'+res.data;
    }
  })),
  exportDetail:(param,callBack) => dispatch(actions.request(actions.RQ.DRAWDOWN_EXPORT_DETAIL,"/ajax/drawdown/export/detail",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      window.location.href = '/attachment/download/'+res.data;
    }
  })),
  exportCheckFnc:(param,callBack) => dispatch(actions.request(actions.RQ.DRAWDOWN_EXPORT_CHECK,"/ajax/drawdown/export/check",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      window.location.href = '/attachment/download/'+res.data;
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoanManagePageContainer)







