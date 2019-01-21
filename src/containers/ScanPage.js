import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'

import { ScanPage } from 'components'

const ScanPageContainer = props => <ScanPage {...props} />;

const mapStateToProps = state => ({
  scanParam: fromData.getCheckSecond(state,fromData.CHECK_SCAN),
  manualParam: fromData.getCheckSecond(state,fromData.CHECK_MANUAL),
  canShowResult: fromData.getCheckSecond(state,fromData.CAN_SHOW_RESULT),
  errorList: fromData.getData(state,actions.RQ.ERROR_MESSAGE),
});
const mapDispatchToProps = dispatch => ({
  getError: (callback) => dispatch(actions.request(actions.RQ.ERROR_MESSAGE,"/ajax/errorarea/list",{
    success:(res)=>{
      callback?callback(res):'';
    },
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
  manualCheck: (param,success,error,tip,scanAgain) => dispatch(actions.request(actions.RQ.MANUAL_CHECK,"/ajax/invoice/manualCheck",{
    params:param,
    method:'post',
    success:(res)=>{
      success(res.data);
    },
    error:(res)=>{
      if(res.data){
        if(res.code===10032){
          scanAgain(res.data);
        }else{
          error(res.data,res.msg);
        }
      }else{
        tip(res.msg)
      }
    }
  })),
  changeContent: (obj)=>{
    dispatch(actions.checkSecond(fromData.CHECK_SCAN,obj));
  },
  changeManual: (obj)=>{
    dispatch(actions.checkSecond(fromData.CHECK_MANUAL,obj));
  },
  changeShowResult: (res)=>{
    dispatch(actions.checkSecond(fromData.CAN_SHOW_RESULT,res));
  },
  getUserList: () => dispatch(actions.request(actions.RQ.LINK_USER,"/ajax/user/list",{
    params:{is_link:1},
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScanPageContainer)
