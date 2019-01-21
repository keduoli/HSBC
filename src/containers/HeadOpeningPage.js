import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'

import { HeadOpeningPage } from 'components'
import { message } from 'antd';

const HeadOpeningPageContainer = props => <HeadOpeningPage {...props} />;

const mapStateToProps = state => ({
  headerList: fromData.getData(state,actions.RQ.HEADER_LIST),
  loading: fromData.getLoad(state,actions.RQ.HEADER_LIST),
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
});
const mapDispatchToProps = dispatch => ({
  getCode: (callback) => dispatch(actions.request(actions.RQ.HEADER_CODE,"/ajax/invoice/title/qrcode",{
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  copyOpening: (res)=>{
    dispatch(actions.checkSecond(fromData.COPY_OPENING,res));
  },
  getData: (param,callback) => dispatch(actions.request(actions.RQ.HEADER_LIST,"/ajax/invoice/title/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  deleteFnc: (param,callback) => dispatch(actions.request(actions.RQ.DELETE_FNC,"/ajax/invoice/title/delete",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callback?callback(res.data):""
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeadOpeningPageContainer)







