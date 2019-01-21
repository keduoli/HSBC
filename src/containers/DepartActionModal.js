import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'
import {message} from 'antd'

import { DepartActionModal } from 'components'

const DepartActionContainer = props => <DepartActionModal {...props} />;

const mapStateToProps = state => ({
  departSelect: fromData.getData(state,actions.RQ.DEPART_SELECT),
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
});
const mapDispatchToProps = dispatch => ({
  addFnc:(param,callBack) => dispatch(actions.request(actions.RQ.DEPART_USER_ADD,"/ajax/user/add",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success((res.msg));
      callBack?callBack():'';
    }
  })),
  editFnc:(param,callBack) => dispatch(actions.request(actions.RQ.USER_EDIT,"/ajax/user/edit",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success((res.msg));
      callBack?callBack():'';
    }
  })),
  getDepartSelect: (callback) => dispatch(actions.request(actions.RQ.DEPART_SELECT,"/ajax/department/list",{
    params:{is_visible:1},
    success:()=>{
      callback?callback():''
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartActionContainer)



