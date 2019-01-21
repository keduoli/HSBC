import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'

import { CollectionPage } from 'components'
import { message } from 'antd';

const CollectionPageContainer = props => <CollectionPage {...props} />;

const mapStateToProps = state => ({
  monitorList: fromData.getData(state,actions.RQ.MONITOR_LIST),
  loading: fromData.getLoad(state,actions.RQ.MONITOR_LIST),
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
  contactList: fromData.getData(state,actions.RQ.CONTACT_LIST),
});
const mapDispatchToProps = dispatch => ({
  getData: (param,callback) => dispatch(actions.request(actions.RQ.MONITOR_LIST,"/ajax/income/monitor/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  editFnc: (param,callback) => dispatch(actions.request(actions.RQ.MONITOR_EDIT,"/ajax/income/monitor/edit",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callback?callback(res.data):""
    }
  })),
  getContactList: (param,callback) => dispatch(actions.request(actions.RQ.CONTACT_LIST,"/ajax/income/contact/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPageContainer)







