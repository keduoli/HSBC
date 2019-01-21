import React from 'react';
import { connect } from 'react-redux';
import { fromData } from 'store/selectors';
import * as actions from 'store/actions';
import { message } from 'antd';
import { APISettingPage } from 'components'

const APISettingPageContainer = props => <APISettingPage {...props} />;

const mapStateToProps = state => ({
  ipallowedList: fromData.getData(state,actions.RQ.IPALLOWED_LIST),
  loading: fromData.getLoad(state,actions.RQ.IPALLOWED_LIST),
  parametersData: fromData.getData(state,actions.RQ.PARAMETERS_GET),
});
const mapDispatchToProps = dispatch => ({
  getData: (param,callBack) => dispatch(actions.request(actions.RQ.IPALLOWED_LIST,"/ajax/ipallowed/list",{
    params:param,
    success:(res)=>{
      callBack?callBack(res):'';
    }
  })),
  addFnc:(param,callBack) => dispatch(actions.request(actions.RQ.IPALLOWED_ADD,"/ajax/ipallowed/add",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success((res.msg));
      callBack?callBack():'';
    },
    error:(res)=>{
      if(res.code == 10002){
        message.warning('IP地址输入不正确')
      }else{
        message.error(res.msg)
      }
    }
  })),
  editFnc:(param,callBack) => dispatch(actions.request(actions.RQ.IPALLOWED_EDIT,"/ajax/ipallowed/edit",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success((res.msg));
      callBack?callBack():'';
    },
    error:(res)=>{
      if(res.code == 10002){
        message.warning('IP地址输入不正确')
      }else{
        message.error(res.msg)
      }
    }
  })),
  delFnc:(param,callBack) => dispatch(actions.request(actions.RQ.IPALLOWED_DEL,"/ajax/ipallowed/del",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success((res.msg));
      callBack?callBack():'';
    }
  })),
  getParameters:() => dispatch(actions.request(actions.RQ.PARAMETERS_GET,"/ajax/api/parameters",{})),
});
export default connect(mapStateToProps, mapDispatchToProps)(APISettingPageContainer)
