import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'

import { ApplyRecordPage } from 'components'
import { message } from 'antd';

const ApplyRecordPageContainer = props => <ApplyRecordPage {...props} />;

const mapStateToProps = state => ({
  outInvoiceList: fromData.getData(state,actions.RQ.APPLY_LIST),
  loading: fromData.getLoad(state,actions.RQ.APPLY_LIST),
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
  companyList: fromData.getData(state,actions.RQ.COMPANY_LIST),
});
const mapDispatchToProps = dispatch => ({
  getData:(param,callback) => dispatch(actions.request(actions.RQ.APPLY_LIST,"/ajax/income/applyrecord/list",{
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
  getGoodList:(param,callback) => dispatch(actions.request(actions.RQ.GOODS_LIST,"/ajax/goods/list",{
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
  getApplyDetail: (param,callBack) => dispatch(actions.request(actions.RQ.APPLY_DETAIL,"/ajax/income/applyrecord/detail",{
    params:param,
    success:(res)=>{
      callBack?callBack(res.data):'';
    },
  })),
  copyOpening: (res)=>{
    dispatch(actions.checkSecond(fromData.COPY_OPENING,res));
  },
  applyAction: (param,callBack) => dispatch(actions.request(actions.RQ.APPLY_ACTION,"/ajax/income/apply/action",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callBack?callBack(res):'';
    },
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplyRecordPageContainer)







