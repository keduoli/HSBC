import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'

import { InvoicesQueryPage } from 'components'
import { message } from 'antd';

const InvoicesQueryPageContainer = props => <InvoicesQueryPage {...props} />;

const mapStateToProps = state => ({
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
  companyList: fromData.getData(state,actions.RQ.COMPANY_LIST),
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
  outInvoiceList: fromData.getData(state,actions.RQ.OUTINVOICE_LIST),
  loading: fromData.getLoad(state,actions.RQ.OUTINVOICE_LIST),
  electronicData: fromData.getData(state,actions.RQ.ELECTRONIC_VERIFY),
  detailData: fromData.getData(state,actions.RQ.OUTINVOICE_DETAIL),
  gfmcList: fromData.getData(state,actions.RQ.GFMC_LIST),
  settingList: fromData.getData(state,actions.RQ.OUTINVOICE_SETTING_SHOW),
});
const mapDispatchToProps = dispatch => ({
  getData:(param,callback) => dispatch(actions.request(actions.RQ.OUTINVOICE_LIST,"/ajax/income/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  getCompanyList: (callback) => {dispatch(actions.request(actions.RQ.COMPANY_LIST,"/ajax/company/info",{
    success:(res)=>{
      callback(res.data)
    }
  }))},
  getDetail:(id,callback) => dispatch(actions.request(actions.RQ.OUTINVOICE_DETAIL,"/ajax/income/detail",{
    params:{outinvoice_id:id},
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  getFjhList: (callBack) => dispatch(actions.request(actions.RQ.FJH_LIST,"/ajax/income/fjh/list",{
    success:(res)=>{
      callBack?callBack(res.data):'';
    },
    error:()=>{
      
    }
  })),
  paperAction:(param,callback) => dispatch(actions.request(actions.RQ.PAPER_ACTION,"/ajax/income/paper/action",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callback?callback(res.data):""
    }
  })),
  eleSetred:(param,callback) => dispatch(actions.request(actions.RQ.ELECT_SETRED,"/ajax/income/electronic/setred",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callback?callback(res.data):""
    }
  })),
  copyOpening: (res)=>{
    dispatch(actions.checkSecond(fromData.COPY_OPENING,res));
  },
  getGfmcList:(param) => dispatch(actions.request(actions.RQ.GFMC_LIST,"/ajax/gfmc/list",{
    params:param,
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
  showSetting: (callBack) => dispatch(actions.request(actions.RQ.OUTINVOICE_SETTING_SHOW,"/ajax/income/setting",{
    success:(res)=>{
      callBack?callBack(res.data[0]):'';
    },
    error:(res)=>{
      callBack?callBack(res.code):'';
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesQueryPageContainer)







