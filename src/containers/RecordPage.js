import React from 'react';
import { connect } from 'react-redux';
import { fromData } from 'store/selectors';
import * as actions from 'store/actions';
import { message } from 'antd';

import { RecordPage } from 'components'

const RecordPageContainer = props => <RecordPage {...props} />;

const mapStateToProps = state => ({
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
  linkUserList: fromData.getData(state,actions.RQ.LINK_USER),
});
const mapDispatchToProps = dispatch => ({
  getUserList: () => dispatch(actions.request(actions.RQ.LINK_USER,"/ajax/user/list",{
    params:{is_link:1},
  })),
  recordAddFnc: (param,callback) => dispatch(actions.request(actions.RQ.RECORD_ADD,"/ajax/invoice/add",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callback();
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordPageContainer)




