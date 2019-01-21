import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'
import {message} from 'antd'

import { ScanSuccess } from 'components'

const ScanSuccessContainer = props => <ScanSuccess {...props} />;

const mapStateToProps = state => ({
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
  departUserList: fromData.getData(state,actions.RQ.LINK_USER),
  customerList: fromData.getData(state,actions.RQ.CUSTOMER_LIST),
  drawdownList: fromData.getData(state,actions.RQ.DRAWDOWN_LIST),
  contractList: fromData.getData(state,actions.RQ.CONTRACT_LIST),
});
const mapDispatchToProps = dispatch => ({
  saveScan:(param,callBack) => dispatch(actions.request(actions.RQ.INVOICE_SAVE,"/ajax/invoice/save",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack();
    }
  })),
  getUserList: (params,callback) => dispatch(actions.request(actions.RQ.LINK_USER,"/ajax/user/list",{
    params:params,
    success:(res)=>{
      callback?callback(res):""
    }
  })),
  formSaveScan:(formData,callBack,errCb) => dispatch(actions.request(actions.RQ.INVOICE_SAVE,"/ajax/invoice/save",{
    formData:formData,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack();
    },
    error:(res)=>{
      message.success(res.msg);
      errCb();
    }
  })),
  getCustomerList: (param,callback) => dispatch(actions.request(actions.RQ.CUSTOMER_LIST,"/ajax/customer/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  getDrawdownList: (param,callback) => dispatch(actions.request(actions.RQ.DRAWDOWN_LIST,"/ajax/drawdown/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  getContractList: (param,callback) => dispatch(actions.request(actions.RQ.CONTRACT_LIST,"/ajax/contract/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScanSuccessContainer)





