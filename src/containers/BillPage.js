import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'
import { message } from 'antd'

import { BillPage } from 'components'

const BillPageContainer = props => <BillPage {...props} />;

const mapStateToProps = state => ({
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
  billList: fromData.getData(state,actions.RQ.BILL_LIST),
  loading:fromData.getLoad(state,actions.RQ.BILL_LIST),
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
});
const mapDispatchToProps = dispatch => ({
  getNavList: (callback) => dispatch(actions.request(actions.RQ.NAV_BAR,"/ajax/homepage",{
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  getBillList: (param,callback) => dispatch(actions.request(actions.RQ.BILL_LIST,"/ajax/invoice/bill",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  exportBillFnc: (param,callback) => dispatch(actions.request(actions.RQ.EXPORT_BILL,"/ajax/invoice/bill",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
      if(res.data){
        window.location.href='/attachment/download/'+res.data;
      }
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(BillPageContainer)
