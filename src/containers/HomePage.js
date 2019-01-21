import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'

import { HomePage } from 'components'

const HomePageContainer = props => <HomePage {...props} />;

const mapStateToProps = state => ({
  homeData: fromData.getData(state,actions.RQ.HOME_DATA),
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
  invoiceData: fromData.getData(state,actions.RQ.HOMEINVOICE_DATA),
  checkData: fromData.getData(state,actions.RQ.HOMECHECK_DATA),
});
const mapDispatchToProps = dispatch => ({
  getData:(params) => dispatch(actions.request(actions.RQ.HOME_DATA,"/ajax/invoice/week",{
    params:params,
  })),
  getInvoiceData:(params,callback) => dispatch(actions.request(actions.RQ.HOMEINVOICE_DATA,"/ajax/invoice/data/counts",{
    params:params,
    success:(res)=>{
      callback?callback(res):""
    }
  })),
  getQuota:(callback) => dispatch(actions.request(actions.RQ.INVOICE_QUOTA,"/ajax/invoice/quota",{
    success:(res)=>{
      callback?callback(res):""
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer)







