import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'

import { ImportCheckPage } from 'components'

const ImportCheckPageContainer = props => <ImportCheckPage {...props} />;

const mapStateToProps = state => ({
  checkHistory: fromData.getData(state,actions.RQ.CHECK_HISTORY),
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
  customerList: fromData.getData(state,actions.RQ.CUSTOMER_LIST),
  drawdownList: fromData.getData(state,actions.RQ.DRAWDOWN_LIST),
  contractList: fromData.getData(state,actions.RQ.CONTRACT_LIST),
  tabData: fromData.getTabData(state,actions.TAB_DATA),
});
const mapDispatchToProps = dispatch => ({
  tabChange:(value) => dispatch(actions.tabChange(value)),
  getCheckHistory:(param,callBack) => dispatch(actions.request(actions.RQ.CHECK_HISTORY,"/ajax/excel/history",{
    params:param,
    success:(res)=>{
      callBack?callBack(res):'';
    }
  })),
  exportCheckHistory:(param,callBack) => dispatch(actions.request(actions.RQ.EXPORT_CHECK_HISTORY,"/ajax/excel/export",{
    params:param,
    success:(res)=>{
      callBack?callBack(res):'';
    }
  })),
  getCustomerList: (param,callback) => dispatch(actions.request(actions.RQ.CUSTOMER_LIST,"/ajax/customer/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  getDrawdownList: (param,callback) => dispatch(actions.request(actions.RQ.DRAWDOWN_LIST,"/ajax/drawdown/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  getContractList: (param,callback) => dispatch(actions.request(actions.RQ.CONTRACT_LIST,"/ajax/contract/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportCheckPageContainer)








