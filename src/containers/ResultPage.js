import React from 'react';
import { connect } from 'react-redux';
import { fromData } from 'store/selectors';
import * as actions from 'store/actions';
import { message } from 'antd';
import { ResultPage } from 'components'

const ResultPageContainer = props => <ResultPage {...props} />;

const mapStateToProps = state => ({
  resultList: fromData.getData(state,actions.RQ.RESULT_LIST),
  resultLoad: fromData.getLoad(state,actions.RQ.RESULT_LIST),
  exportUrl: fromData.getData(state,actions.RQ.EXPORT_RESULT),
  detailList:fromData.getData(state,actions.RQ.DEDUCTION_DETAIL),
  settingsList: fromData.getData(state,actions.RQ.SETTINGS_GET),
  confirmList: fromData.getData(state,actions.RQ.DEDUCTION_COMFIRM),
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
});
const mapDispatchToProps = dispatch => ({
  getData: (param,callBack) => dispatch(actions.request(actions.RQ.RESULT_LIST,"/deduction/result",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack(res):'';
    },
    error: (res)=>{
      callBack?callBack(res):'';
      if(res.code===23014){
        message.error(res.msg)
      }else if(res.code === 20008){
        return;
      }
    }
  })),
  exportResult: (param,callBack) => dispatch(actions.request(actions.RQ.EXPORT_RESULT,"/deduction/result/export",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack():'';
      if(res.data){
        if(res){
          window.location.href=res.data.url;
        }
      }
    },
  })),
  deductionConfirm:(param,callBack) => dispatch(actions.request(actions.RQ.DEDUCTION_COMFIRM,"/deduction/batch/confirm",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack(res):'';
    }
  })),
  deductionReceive:(param,callBack) => dispatch(actions.request(actions.RQ.DEDUCTION_RECEIVE,"/deduction/invoice/receive",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack(res):'';
    }
  })),
  getDetail: (param,callBack) => dispatch(actions.request(actions.RQ.DEDUCTION_DETAIL,"/deduction/invoice/detail",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack(res):'';
    }
  })),
  getPhoneSend: (param,callBack) => dispatch(actions.request(actions.RQ.PHONESEND_GET,"/deduction/telephone/code/send",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack(res):'';
    }
  })),
  getBunding: (param,callBack,errorCK) => dispatch(actions.request(actions.RQ.PHONESEND_BUNDING,"/deduction/telephone/code/verify",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack(res):'';
    },
    error:(res)=>{
      errorCK?errorCK(res):'';
    },
  })),
  deductionFnc:(param,callBack) => dispatch(actions.request(actions.RQ.DEDUCTION_BATCH,"/deduction/batch",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack():'';
    }
  })),
  settingsFnc:(param,callBack) => dispatch(actions.request(actions.RQ.SETTINGS_FNC,"/deduction/settings",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack():'';
    }
  })),
  settingsGet:(callBack) => dispatch(actions.request(actions.RQ.SETTINGS_GET,"/deduction/settings/get",{
    method:'post',
    success:(res)=>{
      callBack?callBack(res):'';
    },
    error:(res)=>{
      callBack?callBack(res):'';
      if(res.code === 20008){
        return;
      }else{
        message.error(res.msg)
      }
    },
  })),
  transferFnc:(param,callBack) => dispatch(actions.request(actions.RQ.TRANSFER_FNC,"/deduction/invoice/transfer",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callBack?callBack(res):'';
    },
  })),
});
export default connect(mapStateToProps, mapDispatchToProps)(ResultPageContainer)
