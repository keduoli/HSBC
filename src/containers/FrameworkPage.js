import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'
import { message } from 'antd';
import { FrameworkPage } from 'components'

const FrameworkPageContainer = props => <FrameworkPage {...props} />;

const mapStateToProps = state => ({
  PriseList: fromData.getData(state,actions.RQ.PRISE_LIST),
});
const mapDispatchToProps = dispatch => ({
  getList:(callback) => dispatch(actions.request(actions.RQ.PRISE_LIST,"/ajax/company/list/get",{
    success:(res)=>{
      callback?callback(res):""
    }
  })),
  getNavList: (callback) => dispatch(actions.request(actions.RQ.NAV_BAR,"/ajax/homepage",{
    success:()=>{
      callback?callback():""
    }
  })),
  addCompany:(param,callback) => dispatch(actions.request(actions.RQ.ADD_COMPOMPANY,"/ajax/child/company/add",{
    method:"post",
    params:param,
    success:(res)=>{
      message.success(res.msg)
      callback?callback(res):""
    }
  })),
  delCompany:(param,callback) => dispatch(actions.request(actions.RQ.DEL_COMPOMPANY,"/ajax/child/company/del",{
    method:"post",
    params:param,
    success:(res)=>{
      message.success(res.msg)
      callback?callback(res):""
    }
  })),
  editCompany:(param,callback) => dispatch(actions.request(actions.RQ.EDIT_COMPOMPANY,"/ajax/child/company/edit",{
    method:"post",
    params:param,
    success:(res)=>{
      message.success(res.msg)
      callback?callback(res):""
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(FrameworkPageContainer)