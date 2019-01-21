import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'

import { SpecialCheckPage } from 'components'
import { message } from 'antd';

const SpecialCheckPageContainer = props => <SpecialCheckPage {...props} />;

const mapStateToProps = state => ({
  customerList: fromData.getData(state,actions.RQ.CUSTOMER_LIST),
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
});
const mapDispatchToProps = dispatch => ({
  getCustomerList: (param,callback) => dispatch(actions.request(actions.RQ.CUSTOMER_LIST,"/ajax/customer/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  checkSpecial: (param,callback) => dispatch(actions.request(actions.RQ.SPECIAL_INVOICE,"/ajax/invoice/special",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg)
      callback?callback():""
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpecialCheckPageContainer)







