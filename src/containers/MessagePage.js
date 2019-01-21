import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'

import { MessagePage } from 'components'
import { message } from 'antd';

const MessagePageContainer = props => <MessagePage {...props} />;

const mapStateToProps = state => ({
  messageList: fromData.getData(state,actions.RQ.MESSAGE_LIST),
  loading:fromData.getLoad(state,actions.RQ.MESSAGE_LIST),
});
const mapDispatchToProps = dispatch => ({
  getMessage: (param,callback) => dispatch(actions.request(actions.RQ.MESSAGE_LIST,"/ajax/export/signfail/list",{
    params:param,
    success:()=>{
      callback?callback():""
    }
  })),
  messageAction: (param,callback) => dispatch(actions.request(actions.RQ.MESSAGE_ACTION,"/ajax/export/signfail/update",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callback?callback():""
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagePageContainer)







