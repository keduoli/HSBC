import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'
import {message} from 'antd'

import { DepartTable } from 'components'

const DepartUser = props => <DepartTable {...props} />;

const mapStateToProps = state => ({
  departUserList: fromData.getData(state,actions.RQ.DEPART_USER),
  loading:fromData.getLoad(state,actions.RQ.DEPART_USER),
  departList: fromData.getData(state,actions.RQ.DEPART_TREE),
  departSelectList: fromData.getData(state,actions.RQ.DEPART_SELECT),
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
});
const mapDispatchToProps = dispatch => ({
  getList: (param) => dispatch(actions.request(actions.RQ.DEPART_USER,"/ajax/org/user/list",{
    params:param,
  })),
  moveUser: (param,callBack) => dispatch(actions.request(actions.RQ.USER_MOVE,"/ajax/user/move",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  departSelect: (callback) => dispatch(actions.request(actions.RQ.DEPART_SELECT,"/ajax/org/department/list",{
    success:(res)=>{
      callback?callback(res):""
    }
  })),
  getDepartList: (callback) => dispatch(actions.request(actions.RQ.DEPART_TREE,"/ajax/org/department/list",{
    success:()=>{
      callback?callback():''
    }
  })),
  deleteUser: (param,callBack) => dispatch(actions.request(actions.RQ.USER_DELETE,"/ajax/delete/user",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartUser)


