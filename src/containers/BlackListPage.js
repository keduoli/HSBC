import React from 'react';
import { connect } from 'react-redux';
import { fromData } from 'store/selectors';
import * as actions from 'store/actions';
import { message } from 'antd';
import { BlackListPage } from 'components'

const BlackListPageContainer = props => <BlackListPage {...props} />;

const mapStateToProps = state => ({
  blackList: fromData.getData(state,actions.RQ.BLACKLIST_GET),
  loading:fromData.getLoad(state,actions.RQ.BLACKLIST_GET),
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
});
const mapDispatchToProps = dispatch => ({
  getData:(param) => dispatch(actions.request(actions.RQ.BLACKLIST_GET,"/ajax/blacklist/get",{
    params:param,
  })),
  addFnc:(param,callBack) => dispatch(actions.request(actions.RQ.BLACKLIST_ADD,"/ajax/blacklist/add",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success((res.msg));
      callBack?callBack():'';
    }
  })),
  getNavList: (callback) => dispatch(actions.request(actions.RQ.NAV_BAR,"/ajax/homepage",{
    success:(res)=>{
      callback?callback(res):""
    }
  })),
  setCheckBlack: (param) => dispatch(actions.request(actions.RQ.IS_BLACK,"/ajax/invoice/IsCheckBlack",{
    params:param,
    success:(res)=>{
      message.success(res.msg);
    }
  })),
  editFnc:(param,callBack) => dispatch(actions.request(actions.RQ.BLACKLIST_EDIT,"/ajax/blacklist/edit",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success((res.msg));
      callBack?callBack():'';
    }
  })),
  delFnc:(param,callBack) => dispatch(actions.request(actions.RQ.BLACKLIST_DEL,"/ajax/blacklist/del",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success((res.msg));
      callBack?callBack():'';
    }
  })),
});
export default connect(mapStateToProps, mapDispatchToProps)(BlackListPageContainer)
