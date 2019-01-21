import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'

import { ActionLogPage } from 'components'

const LogPageContainer = props => <ActionLogPage {...props} />;

const mapStateToProps = state => ({
  logList: fromData.getData(state,actions.RQ.LOG_LIST),
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
  loading:fromData.getLoad(state,actions.RQ.LOG_LIST),
  actionUserList:fromData.getData(state,actions.RQ.ACTION_USER),
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
});
const mapDispatchToProps = dispatch => ({
  getLogList:(param) => dispatch(actions.request(actions.RQ.LOG_LIST,"/ajax/log/list",{params:param})),
  getActionUser:() => dispatch(actions.request(actions.RQ.ACTION_USER,"/ajax/org/user/list",{})),
  getNavList: (callback) => dispatch(actions.request(actions.RQ.NAV_BAR,"/ajax/homepage",{
    success:(res)=>{
      callback?callback(res):""
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogPageContainer)








