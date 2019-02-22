import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'
import { message } from 'antd'

import { InvoicePage } from 'components'

const InvoicePageContainer = props => <InvoicePage {...props} />;

const mapStateToProps = state => ({
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
  invoiceList: fromData.getData(state,actions.RQ.INVOICE_LIST),
  loading:fromData.getLoad(state,actions.RQ.INVOICE_LIST),
  entryUserList: fromData.getData(state,actions.RQ.LINK_USER),
  getExportUrl: fromData.getData(state,actions.RQ.EXPORT_ACTION),
  xfmcList: fromData.getData(state,actions.RQ.XFMC_LIST),
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
  tagsList: fromData.getData(state,actions.RQ.TAGS_LIST),
  copyData: fromData.getCheckSecond(state,fromData.COPY_OPENING),
  invDdid: fromData.getCheckSecond(state,fromData.SET_INVOICEID),
  customerList: fromData.getData(state,actions.RQ.CUSTOMER_LIST),
  tabData: fromData.getTabData(state,actions.TAB_DATA),
});
const mapDispatchToProps = dispatch => ({
  getNavList: (callback) => dispatch(actions.request(actions.RQ.NAV_BAR,"/ajax/homepage",{
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
  pollingFnc:(param,callBack) => dispatch(actions.request(actions.RQ.PLOBYIDS_POLLING,"/ajax/polling/ploByIds",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack(res):'';
    },
    error:(res)=>{
      callBack?callBack(res):'';
    },
  })),
  copyOpening: (res)=>{
    dispatch(actions.checkSecond(fromData.COPY_OPENING,res));
  },
  setInvId: (res)=>{
    dispatch(actions.checkSecond(fromData.SET_INVOICEID,res));
  },
  getInvoiceList: (param,callback) => dispatch(actions.request(actions.RQ.INVOICE_LINK_LIST,"/ajax/invoice/link/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  exportAllFnc: (param,callback) => dispatch(actions.request(actions.RQ.INVOICE_EXPORT_ALL,"/ajax/invoice/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
      if(res.data){
        window.location.href='/attachment/download/'+res.data;
      }
    }
  })),
  getContractList: (param,callback) => dispatch(actions.request(actions.RQ.CONTRACT_LIST,"/ajax/contract/list",{
    params:param,
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
  linkDrawdown: (param,callback) => dispatch(actions.request(actions.RQ.LINK_DRAWDOWN,"/ajax/drawdown/invoice/link",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callback?callback(res.data):""
    }
  })),
  unLinkContract: (param,callback) => dispatch(actions.request(actions.RQ.UN_LINK_CONTRACT,"/ajax/invoice/unlink/contract",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callback?callback(res.data):""
    }
  })),
  unLinkDrawdown: (param,callback) => dispatch(actions.request(actions.RQ.UN_LINK_DRAWDOWN,"/ajax/invoice/unlink/drawdown",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callback?callback(res.data):""
    }
  })),
  linkCustomer: (param,callback) => dispatch(actions.request(actions.RQ.LINK_CUSTOMER,"/ajax/invoice/link/customer",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callback?callback(res.data):""
    }
  })),
  getData:(param,callback) => dispatch(actions.request(actions.RQ.INVOICE_LIST,"/ajax/invoice/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  getXfmcList:(param) => dispatch(actions.request(actions.RQ.XFMC_LIST,"/ajax/invoice/xfmc/list",{
    params:param,
  })),
  getDetail:(param,callBack) => dispatch(actions.request(actions.RQ.INVOICE_DETAIL,"/ajax/invoice/detail",{
    params:{invoice_id:param},
    success:(res)=>{
      callBack?callBack(res):'';
    }
  })),
  invoiceAction:(param,callBack) => dispatch(actions.request(actions.RQ.INVOICE_ACTION,"/ajax/invoice/action",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  invDeleteFnc:(param,callBack) => dispatch(actions.request(actions.RQ.INVOICE_DELETE,"/ajax/invoice/delete",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  invMemoFnc:(param,callBack) => dispatch(actions.request(actions.RQ.INVOICE_SETMEMO,"/ajax/invoice/setMemo",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  saveScan:(param,callBack) => dispatch(actions.request(actions.RQ.INVOICE_SAVE,"/ajax/invoice/save",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack();
    }
  })),
  exportAction:(param,callBack) => dispatch(actions.request(actions.RQ.EXPORT_ACTION,"/ajax/invoice/export",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack(res.code):'';
      if(res.data){
        window.location.href='/attachment/download/'+res.data;
      }
    },
    error:(res)=>{
      message.error(res.msg);
      callBack?callBack(res.code):'';
    }
  })),
  exportPdfFnc:(param,callBack) => dispatch(actions.request(actions.RQ.EXPORT_PDF,"/ajax/invoice/pdf",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack(res.code):'';
      if(res.data){
        window.location.href='/attachment/download/'+res.data;
      }
    }
  })),
  getUserList: (param,callback) => dispatch(actions.request(actions.RQ.LINK_USER,"/ajax/user/list",{
    params:param,
    success:()=>{

    }
  })),
  getDrawdownList: (param,callback) => dispatch(actions.request(actions.RQ.DRAWDOWN_LIST,"/ajax/drawdown/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  changeRoute: (res)=>{
    dispatch(actions.checkSecond(fromData.CHANGE_ROUTE,res));
  },
  tabChange:(value) => dispatch(actions.tabChange(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoicePageContainer)
