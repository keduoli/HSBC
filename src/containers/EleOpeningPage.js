import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'
import { message } from 'antd';

import { EleOpeningPage } from 'components'

const EleOpeningPageContainer = props => <EleOpeningPage {...props} />;

const mapStateToProps = state => ({
  companyList: fromData.getData(state,actions.RQ.COMPANY_LIST),
  codingLoad: fromData.getLoad(state,actions.RQ.CODING_LIST),
  goodsList: fromData.getData(state,actions.RQ.GOODS_LIST),
  loading: fromData.getLoad(state,actions.RQ.GOODS_LIST),
  electronicData: fromData.getData(state,actions.RQ.ISSUE_TYPE),
  copyData: fromData.getCheckSecond(state,fromData.COPY_OPENING),
  repertroyList: fromData.getData(state,actions.RQ.REPERTROY_LIST),
  settingList: fromData.getData(state,actions.RQ.OUTINVOICE_SETTING_SHOW),
});
const mapDispatchToProps = dispatch => ({
  getCompanyList: (callback) => {dispatch(actions.request(actions.RQ.COMPANY_LIST,"/ajax/company/info",{
    success:(res)=>{
      callback(res.data)
    }
  }))},
  getRepertroyList:(param,callback) => dispatch(actions.request(actions.RQ.REPERTROY_LIST,"/ajax/repertroy/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  rpaOpen: (param,callBack) => dispatch(actions.request(actions.RQ.SAVE_ISSSUE,"/ajax/income/invoice/issue",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack(res):'';
    },
  })),
  getTypeFnc: (param,callBack) => dispatch(actions.request(actions.RQ.ISSUE_TYPE,"/ajax/income/issuestatus",{
    params:param,
    success:(res)=>{
      callBack?callBack(res.data):'';
    }
  })),
  searchFnc:(param,callback) => {dispatch(actions.request(actions.RQ.SEARCH_FNC,"/search",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):''
    }
  }))},
  copyOpening: (res)=>{
    dispatch(actions.checkSecond(fromData.COPY_OPENING,res));
  },
  getCodingList: (param,callBack) => dispatch(actions.request(actions.RQ.CODING_LIST,"/ajax/tax/list",{
    params:param,
    success:(res)=>{
      callBack?callBack(res.data):'';
    }
  })),
  getData:(param,callback) => dispatch(actions.request(actions.RQ.GOODS_LIST,"/ajax/goods/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  saveEler: (param,callBack) => dispatch(actions.request(actions.RQ.SAVE_ELER,"/ajax/income/electronic/issue",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callBack?callBack(res):'';
    },
  })),
  getFjhList: (callBack) => dispatch(actions.request(actions.RQ.FJH_LIST,"/ajax/income/fjh/list",{
    success:(res)=>{
      callBack?callBack(res.data):'';
    },
    error:()=>{
      
    }
  })),
  getElectronic: (callBack) => dispatch(actions.request(actions.RQ.ELECTRONIC_VERIFY,"/ajax/income/electronic/verify",{
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
  exportAction:(param,callBack) => dispatch(actions.request(actions.RQ.EXPORT_OUTLINE,"/ajax/income/export",{
    params:param,
    method:'post',
    success:(res)=>{
      callBack?callBack(res.code):'';
      if(res.data){
        if(res.data.path){
          window.location.href=res.data.path;
        }
      }
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EleOpeningPageContainer)







