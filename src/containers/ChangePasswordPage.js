import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'
import {message} from 'antd'

import { ChangePasswordPage } from 'components'

const ChangePasswordPageContainer = props => <ChangePasswordPage {...props} />;

const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => ({
  changePassword: (param) => dispatch(actions.request(actions.RQ.CHANGE_PASSWORD,"/ajax/user/password/change",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      window.location.assign("/login");
    },
  }))
});

export default connect(null, mapDispatchToProps)(ChangePasswordPageContainer)






