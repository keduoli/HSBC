import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'
import { message } from 'antd'

import { PollingPage } from 'components'

const PollingPageContainer = props => <PollingPage {...props} />;

const mapStateToProps = state => ({
  invoiceList: fromData.getData(state,actions.RQ.INVOICE_POLLING_LIST),
  loading:fromData.getLoad(state,actions.RQ.INVOICE_POLLING_LIST),
  pollingLoading:fromData.getLoad(state,actions.RQ.POLLINGTASK_LIST),
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
  xfmcList: fromData.getData(state,actions.RQ.XFMC_LIST),
  bankList: fromData.getData(state,actions.RQ.BANK_LIST),
  historyData: fromData.getData(state,actions.RQ.POLLING_HISTORY),
  entryUserList: fromData.getData(state,actions.RQ.LINK_USER),
  getExportUrl: fromData.getData(state,actions.RQ.EXPORT_ACTION),
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
  pollingTaskList: fromData.getData(state,actions.RQ.POLLINGTASK_LIST),
  pollingDetail: fromData.getData(state,actions.RQ.POLLING_DETAIL_LIST),
  detailLoading:fromData.getLoad(state,actions.RQ.POLLING_DETAIL_LIST),
  routeData: fromData.getCheckSecond(state,fromData.CHANGE_ROUTE),
});
const mapDispatchToProps = dispatch => ({
  getData:(param,callBack) => dispatch(actions.request(actions.RQ.INVOICE_POLLING_LIST,"/ajax/polling/list",{
    params:param,
    success:(res)=>{
      callBack?callBack(res):'';
    },
  })),
  changeRoute: (res)=>{
    dispatch(actions.checkSecond(fromData.CHANGE_ROUTE,res));
  },
  invMemoFnc:(param,callBack) => dispatch(actions.request(actions.RQ.INVOICE_SETMEMO,"/ajax/invoice/setMemo",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  getPollingDetail:(param,callBack) => dispatch(actions.request(actions.RQ.POLLING_DETAIL_LIST,"/ajax/polling/detail/list",{
    params:param,
    success:(res)=>{
      callBack?callBack(res):'';
    },
  })),
  getPollingTask:(param) => dispatch(actions.request(actions.RQ.POLLINGTASK_LIST,"/ajax/invoice/polling/task/list",{
    params:param,
  })),
  addPollingTask:(param,callBack) => dispatch(actions.request(actions.RQ.ADD_POLLING,"/ajax/invoice/polling/task/add",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callBack?callBack(res):'';
    },
  })),
  editPollingTask:(param,callBack) => dispatch(actions.request(actions.RQ.EDIT_POLLING,"/ajax/invoice/polling/task/update",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callBack?callBack(res):'';
    },
  })),
  deletePollingTask:(param,callBack) => dispatch(actions.request(actions.RQ.DELETE_POLLING,"/ajax/invoice/polling/task/delete",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callBack?callBack(res):'';
    },
  })),
  getXfmcList:(param) => dispatch(actions.request(actions.RQ.XFMC_LIST,"/ajax/invoice/xfmc/list",{
    params:param,
  })),
  getBankList:(param) => dispatch(actions.request(actions.RQ.BANK_LIST,"/ajax/polling/bankList",{
    params:param,
  })),
  PollingFnc:(param,callBack) => dispatch(actions.request(actions.RQ.INVOICE_POLLING,"/ajax/polling/polInvoice",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack(res):'';
    },
    error:(res)=>{
      callBack?callBack(res):'';
    },
  })),
  pollingDetailFnc:(param,callBack) => dispatch(actions.request(actions.RQ.POLAGIAN_POLLING,"/ajax/polling/polagian",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack(res):'';
    },
    error:(res)=>{
      callBack?callBack(res):'';
    },
  })),
  handlePolling:(param,callBack) => dispatch(actions.request(actions.RQ.POLLING_HANDLE,"/ajax/polling/handle",{
    params:param,
    success:(res)=>{
      callBack(res);
    }
  })),
  getDetail:(param,callBack) => dispatch(actions.request(actions.RQ.INVOICE_DETAIL,"/ajax/invoice/detail",{
    params:{invoice_id:param},
    success:(res)=>{
      callBack(res);
    }
  })),
  getHistoryData:(param,callBack) => dispatch(actions.request(actions.RQ.POLLING_HISTORY,"/ajax/polling/history",{
    params:param,
    success:(res)=>{
      callBack?callBack(res):''
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
  exportAction:(param,callBack) => dispatch(actions.request(actions.RQ.EXPORT_ACTION,"/ajax/invoice/export",{
    params:param,
    method:'post',
    success:(res)=>{
      // message.success(res.msg);
      callBack?callBack():'';
      if(res.data){
        if(res.data.path){
          window.location.href=res.data.path;
        }
      }
    }
  })),
  getUserList: () => dispatch(actions.request(actions.RQ.LINK_USER,"/ajax/user/list",{
    params:{is_link:1},
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(PollingPageContainer)
