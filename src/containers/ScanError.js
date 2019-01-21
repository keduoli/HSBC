import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'
import {message} from 'antd'
import { ScanError } from 'components'

const ScanErrorContainer = props => <ScanError {...props} />;

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
  formSaveScan:(formData,callBack) => dispatch(actions.request(actions.RQ.INVOICE_SAVE,"/ajax/invoice/save",{
    formData:formData,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack();
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

export default connect(mapStateToProps, mapDispatchToProps)(ScanErrorContainer)
