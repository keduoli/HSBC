import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'

import { WaitOpenPage } from 'components'

const WaitOpenPageContainer = props => <WaitOpenPage {...props} />;

const mapStateToProps = state => ({
  outInvoiceList: fromData.getData(state,actions.RQ.APPLY_LIST),
  loading: fromData.getLoad(state,actions.RQ.APPLY_LIST),
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
});
const mapDispatchToProps = dispatch => ({
  getData:(param,callback) => dispatch(actions.request(actions.RQ.APPLY_LIST,"/ajax/income/applyrecord/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaitOpenPageContainer)







