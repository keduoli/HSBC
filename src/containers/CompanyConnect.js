import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'
import {message} from 'antd';

import { CompanyForm } from 'components'

const CompanyContainer = props => <CompanyForm {...props} />

const mapStateToProps = state => ({
  companyList: fromData.getData(state,actions.RQ.COMPANY_LIST),
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
});

const mapDispatchToProps = dispatch => ({
  getCompanyList: (callback) => {dispatch(actions.request(actions.RQ.COMPANY_LIST,"/ajax/company/info",{
    success:(res)=>{
      callback(res.data)
    }
  }))},
  companyEdit: (values,callBack) =>{dispatch(actions.request(actions.RQ.COMPANY_EDIT,"/ajax/company/edit",{
    params:values,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack();
    }
  }))}
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyContainer)

