import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'
import { message } from 'antd'

import { UserManagePage } from 'components'

const UserManagePageContainer = props => <UserManagePage {...props} />;

const mapStateToProps = state => ({
  loading:fromData.getLoad(state,actions.RQ.CUSTOMER_LIST),
  customerList: fromData.getData(state,actions.RQ.CUSTOMER_LIST),
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
});
const mapDispatchToProps = dispatch => ({
  getCustomerList: (param,callback) => dispatch(actions.request(actions.RQ.CUSTOMER_LIST,"/ajax/customer/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  getCustomerId: (param,callback) => dispatch(actions.request(actions.RQ.CUSTOMER_ID,"/ajax/customer/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  addFnc:(param,callBack) => dispatch(actions.request(actions.RQ.CUSTOMER_ADD,"/ajax/customer/increase",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  getCustomerDetail: (id,callback) => dispatch(actions.request(actions.RQ.CUSTOMER_DEATIL,"/ajax/customer/detail",{
    params:{id:id},
    method:'post',
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  editFnc:(param,callBack) => dispatch(actions.request(actions.RQ.CUSTOMER_EDIT,"/ajax/customer/edit",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  exportCustomer:(param,callBack) => dispatch(actions.request(actions.RQ.CUSTOMER_EXPORT,"/ajax/customer/export/list",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      window.location.href = '/attachment/download/'+res.data;
    }
  })),
  delFnc:(param,callBack) => dispatch(actions.request(actions.RQ.CUSTOMER_DELETE,"/ajax/customer/delete",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagePageContainer)







