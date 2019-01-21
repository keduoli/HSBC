import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'

import { ManagerPage } from 'components'
import { message } from 'antd';

const ManagerPageContainer = props => <ManagerPage {...props} />;

const mapStateToProps = state => ({
  adminList: fromData.getData(state,actions.RQ.ADMIN_LIST),
  infoList: fromData.getData(state,actions.RQ.GET_INFO),
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
});
const mapDispatchToProps = dispatch => ({
  getData:(callback) => dispatch(actions.request(actions.RQ.ADMIN_LIST,"/ajax/admin/list/get",{
    success:(res)=>{
      callback?callback(res):""
    }
  })),
  addAdmin:(params,callback) => dispatch(actions.request(actions.RQ.ADD_ADMIN,"/ajax/admin/add",{
    params:params,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callback?callback():""
    }
  })),
  editAdmin:(params,callback) => dispatch(actions.request(actions.RQ.EDIT_ADMIN,"/ajax/admin/edit",{
    params:params,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callback?callback():""
    }
  })),
  deteleAdmin:(params,callback) => dispatch(actions.request(actions.RQ.DELETE_ADMIN,"/ajax/admin/delete",{
    params:params,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callback?callback():""
    }
  })),
  getInfo:(params,callback) => dispatch(actions.request(actions.RQ.GET_INFO,"/ajax/user/info/get",{
    params:params,
    success:(res)=>{
      callback?callback(res):""
    },
    error:(res)=>{
      callback?callback(res):""
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerPageContainer)