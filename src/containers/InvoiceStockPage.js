import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'

import { InvoiceStockPage } from 'components'
import { message } from 'antd';

const InvoiceStockPageContainer = props => <InvoiceStockPage {...props} />;

const mapStateToProps = state => ({
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
  repertroyList: fromData.getData(state,actions.RQ.REPERTROY_LIST),
  loading:fromData.getLoad(state,actions.RQ.REPERTROY_LIST),
  settingList: fromData.getData(state,actions.RQ.OUTINVOICE_SETTING_SHOW),
});
const mapDispatchToProps = dispatch => ({
  getData:(param,callback) => dispatch(actions.request(actions.RQ.REPERTROY_LIST,"/ajax/repertroy/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  showSetting: (callBack) => dispatch(actions.request(actions.RQ.OUTINVOICE_SETTING_SHOW,"/ajax/income/setting",{
    success:(res)=>{
      callBack?callBack(res.data[0]):'';
    },
    error:()=>{

    }
  })),
  addRepertroy:(param,callback) => dispatch(actions.request(actions.RQ.ADD_REPERTROY,"/ajax/repertory/add",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callback?callback(res.data):""
    }
  })),
  editRepertroy:(param,callback) => dispatch(actions.request(actions.RQ.EDIT_REPERTROY,"/ajax/repertory/edit",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callback?callback(res.data):""
    }
  })),
  delRepertroy:(param,callback) => dispatch(actions.request(actions.RQ.DEL_REPERTROY,"/ajax/repertory/del",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callback?callback(res.data):""
    }
  })),
  addQuota:(param,callback) => dispatch(actions.request(actions.RQ.ADD_QUOTA,"/ajax/income/add/quota",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callback?callback(res.data):""
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceStockPageContainer)







