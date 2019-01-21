import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'
import { message } from 'antd'

import { SaleSettingPage } from 'components'

const SaleSettingPageContainer = props => <SaleSettingPage {...props} />;

const mapStateToProps = state => ({
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
  departUserList: fromData.getData(state,actions.RQ.DEPART_USER),
  applicantList: fromData.getData(state,actions.RQ.APPLICANTLIST_LIST),
  settingList: fromData.getData(state,actions.RQ.OUTINVOICE_SETTING_SHOW),
  loading:fromData.getLoad(state,actions.RQ.APPLICANTLIST_LIST),
});
const mapDispatchToProps = dispatch => ({
  setSetting: (param,callBack) => dispatch(actions.request(actions.RQ.OUTINVOICE_SETTING,"/ajax/income/setting/edit",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  getList: (param) => dispatch(actions.request(actions.RQ.DEPART_USER,"/ajax/user/list",{
    params:param,
  })),
  getApplicantList: (param,callBack) => dispatch(actions.request(actions.RQ.APPLICANTLIST_LIST,"/ajax/income/applicant/list",{
    params:param,
    success:(res)=>{
      callBack?callBack():'';
    }
  })),
  getNavList: (callback) => dispatch(actions.request(actions.RQ.NAV_BAR,"/ajax/homepage",{
    success:()=>{
      callback?callback():""
    }
  })),
  showSetting: (callBack) => dispatch(actions.request(actions.RQ.OUTINVOICE_SETTING_SHOW,"/ajax/income/setting",{
    success:(res)=>{
      callBack?callBack(res.data[0]):'';
    },
    error:(res)=>{
      callBack?callBack(res.data):'';
    }
  })),
  addApplicant: (param,callBack) => dispatch(actions.request(actions.RQ.ADD_APPLICANT,"/ajax/income/applicant/add",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaleSettingPageContainer)







