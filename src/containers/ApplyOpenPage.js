import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'
import { message } from 'antd'

import { ApplyOpenPage } from 'components'

const ApplyOpenPageContainer = props => <ApplyOpenPage {...props} />;

const mapStateToProps = state => ({
  companyList: fromData.getData(state,actions.RQ.COMPANY_LIST),
  repertroyList: fromData.getData(state,actions.RQ.REPERTROY_LIST),
  repertroyloading: fromData.getLoad(state,actions.RQ.REPERTROY_LIST),
  electronicData: fromData.getData(state,actions.RQ.ELECTRONIC_VERIFY),
  copyData: fromData.getCheckSecond(state,fromData.COPY_OPENING),
  settingList: fromData.getData(state,actions.RQ.OUTINVOICE_SETTING_SHOW),
});
const mapDispatchToProps = dispatch => ({
  getCompanyList: (callback) => {dispatch(actions.request(actions.RQ.COMPANY_LIST,"/ajax/company/info",{
    success:(res)=>{
      callback(res.data)
    }
  }))},
  getData:(param,callback) => dispatch(actions.request(actions.RQ.GOODS_LIST,"/ajax/goods/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  searchFnc:(param,callback) => {dispatch(actions.request(actions.RQ.SEARCH_FNC,"/search",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):''
    }
  }))},
  saveApply: (param,callBack) => dispatch(actions.request(actions.RQ.APPLY_ACTION,"/ajax/income/apply/action",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callBack?callBack(res):'';
    },
  })),
  getTypeFnc: (callBack) => dispatch(actions.request(actions.RQ.ELECTRONIC_VERIFY,"/ajax/income/issuestatus",{
    success:(res)=>{
      callBack?callBack(res.data):'';
    }
  })),
  getCodingList: (param,callBack) => dispatch(actions.request(actions.RQ.CODING_LIST,"/ajax/tax/list",{
    params:param,
    success:(res)=>{
      callBack?callBack(res.data):'';
    }
  })),
  getFjhList: (callBack) => dispatch(actions.request(actions.RQ.FJH_LIST,"/ajax/income/fjh/list",{
    success:(res)=>{
      callBack?callBack(res.data):'';
    }
  })),
  getDetail:(id,callback) => dispatch(actions.request(actions.RQ.OUTINVOICE_DETAIL,"/ajax/income/detail",{
    params:{outinvoice_id:id},
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  showSetting: (callBack) => dispatch(actions.request(actions.RQ.OUTINVOICE_SETTING_SHOW,"/ajax/income/setting",{
    success:(res)=>{
      callBack?callBack(res.data[0]):'';
    },
    error:(res)=>{
      callBack?callBack(res.code):'';
    }
  })),
  copyOpening: (res)=>{
    dispatch(actions.checkSecond(fromData.COPY_OPENING,res));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplyOpenPageContainer)







