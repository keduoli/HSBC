import React from 'react';
import { connect } from 'react-redux';
import { fromData } from 'store/selectors';
import * as actions from 'store/actions';
import { message } from 'antd';
import { WhiteListPage } from 'components'

const WhiteListPageContainer = props => <WhiteListPage {...props} />;

const mapStateToProps = state => ({
  whiteList: fromData.getData(state,actions.RQ.BLACKLIST_GET),
  loading:fromData.getLoad(state,actions.RQ.BLACKLIST_GET),
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
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
export default connect(mapStateToProps, mapDispatchToProps)(WhiteListPageContainer)
