import React from 'react';
import { connect } from 'react-redux';
import { fromData } from 'store/selectors';
import * as actions from 'store/actions';
import { message } from 'antd';
import { TaxformPage } from 'components'

const TaxformPageContainer = props => <TaxformPage {...props} />;
const mapStateToProps = state => ({
  taxformList: fromData.getData(state,actions.RQ.TAXFORM_LIST),
  exportUrl: fromData.getData(state,actions.RQ.EXPORT_TAXFORM),
  settingsList: fromData.getData(state,actions.RQ.SETTINGS_GET),
  loading:fromData.getLoad(state,actions.RQ.TAXFORM_LIST),
});
const mapDispatchToProps = dispatch => ({
  getData: (param,callBack) => dispatch(actions.request(actions.RQ.TAXFORM_LIST,"/deduction/report",{
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
  exportTaxform: (param,callBack) => dispatch(actions.request(actions.RQ.EXPORT_TAXFORM,"/deduction/report/export",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack(res):'';
    },
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
});
export default connect(mapStateToProps, mapDispatchToProps)(TaxformPageContainer)
