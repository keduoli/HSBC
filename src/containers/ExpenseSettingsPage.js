import React from 'react';
import { connect } from 'react-redux';
import { fromData } from 'store/selectors';
import * as actions from 'store/actions';
import { message } from 'antd';
import { ExpenseSettingsPage } from 'components'

const ExpenseSettingsPageContainer = props => <ExpenseSettingsPage {...props} />;

const mapStateToProps = state => ({
  settingsList: fromData.getData(state,actions.RQ.SETTINGS_GET),
});
const mapDispatchToProps = dispatch => ({
  settingsGet:(callBack) => dispatch(actions.request(actions.RQ.SETTINGS_GET,"/deduction/settings/get",{
    method:'post',
    success:(res)=>{
      callBack?callBack(res):'';
    },
    error:(res)=>{
      callBack?callBack(res):'';
      if(res.code===23014){
        message.error(res.msg)
      }else if(res.code === 20008){
        return;
      }
    },
  })),
  settingsFnc:(param,callBack) => dispatch(actions.request(actions.RQ.SETTINGS_FNC,"/deduction/settings",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success((res.msg));
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
});
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseSettingsPageContainer)
