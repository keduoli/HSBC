import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'

import { SuccessivePage } from 'components'

const SuccessivePageContainer = props => <SuccessivePage {...props} />;

const mapStateToProps = state => ({
  canContinuation: fromData.getCheckSecond(state,fromData.CAN_CONTINUATION),
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
  customerList: fromData.getData(state,actions.RQ.CUSTOMER_LIST),
  drawdownList: fromData.getData(state,actions.RQ.DRAWDOWN_LIST),
  contractList: fromData.getData(state,actions.RQ.CONTRACT_LIST),
});
const mapDispatchToProps = dispatch => ({
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
  invoiceCheck: (param,success,error,tip,scanAgain) => dispatch(actions.request(actions.RQ.INVOICE_CHECK,"/ajax/invoice/scanCheck",{
    params:param,
    method:'post',
    success:(res)=>{
      success(res.data);
    },
    error:(res)=>{
      if(res.data){
        if(res.code === 10032){
          scanAgain(res.data);
        }else{
          error(res.data,res.msg);
        }
      }else{
        tip(res.msg);
      }
    }
  })),
  changeContinuation: (res)=>{
    dispatch(actions.checkSecond(fromData.CAN_CONTINUATION,res));
  },
  getUserList: () => dispatch(actions.request(actions.RQ.LINK_USER,"/ajax/user/list",{
    params:{is_link:1},
  })),
  saveScan:(param,callBack) => dispatch(actions.request(actions.RQ.INVOICE_SAVE,"/ajax/invoice/save",{
    params:param,
    method:'post',
    success:()=>{
      callBack();
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuccessivePageContainer)
