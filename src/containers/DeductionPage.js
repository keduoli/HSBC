import React from 'react';
import { connect } from 'react-redux';
import { fromData } from 'store/selectors';
import * as actions from 'store/actions';
import { message } from 'antd';
import { DeductionPage } from 'components'

const DeductionPageContainer = props => <DeductionPage {...props} />;

const mapStateToProps = state => ({
  deductionList: fromData.getData(state,actions.RQ.DEDUCTION_LIST),
  deductionLoad:fromData.getLoad(state,actions.RQ.DEDUCTION_LIST),
  detailList:fromData.getData(state,actions.RQ.DEDUCTION_DETAIL),
  settingsList: fromData.getData(state,actions.RQ.SETTINGS_GET),
  confirmList: fromData.getData(state,actions.RQ.DEDUCTION_COMFIRM),
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
});
const mapDispatchToProps = dispatch => ({
  getData: (param,callBack) => dispatch(actions.request(actions.RQ.DEDUCTION_LIST,"/deduction/invoice",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack(res):'';
    },
    error: (res)=>{
      callBack?callBack(res):'';
      if(res.code !== 20008){
        message.error(res.msg);
      }else{
        return;
      }
    }
  })),
  getWarnTime:(callBack,errorBack) => dispatch(actions.request(actions.RQ.DEDUCTION_RECEIVE,"/deduction/invoice/warn",{
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
  deductionCheck:(param,callBack) => dispatch(actions.request(actions.RQ.DEDUCTION_CHECK,"/deduction/all/ids",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack(res):'';
    }
  })),
  deductionConfirm:(param,callBack) => dispatch(actions.request(actions.RQ.DEDUCTION_COMFIRM,"/deduction/batch/confirm",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack(res):'';
    }
  })),
  settingsFnc:(param,callBack) => dispatch(actions.request(actions.RQ.SETTINGS_FNC,"/deduction/settings",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack():'';
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
  getDetail: (param,callBack) => dispatch(actions.request(actions.RQ.DEDUCTION_DETAIL,"/deduction/invoice/detail",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack(res):'';
    }
  })),
  settingsGet:(callBack) => dispatch(actions.request(actions.RQ.SETTINGS_GET,"/deduction/settings/get",{
    method:'post',
    success:(res)=>{
      callBack?callBack(res):'';
    },
    error:(res)=>{
      callBack?callBack(res):'';
      if(res.code !== 20008){
        message.error(res.msg)
      }else{
        return;
      }
    },
  })),
});
export default connect(mapStateToProps, mapDispatchToProps)(DeductionPageContainer)