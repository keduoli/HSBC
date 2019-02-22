import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'
import {message} from 'antd'

import { LoginPage } from 'components'

const LoginPageContainer = props => <LoginPage {...props} />;

const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => ({
    loginFnc:(param,callback) => dispatch(actions.request(actions.RQ.USER_LOGIN,"/ajax/user/login",{
      params:param,
      method:'post',
      success:(res)=>{
        callback(res.data);
      }
    })),
    
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer)
