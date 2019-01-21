import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'

import { CodeOpeningPage } from 'components'
import { message } from 'antd';

const CodeOpeningPageContainer = props => <CodeOpeningPage {...props} />;

const mapStateToProps = state => ({
  orderList: fromData.getData(state,actions.RQ.ORDER_LIST),
  loading: fromData.getLoad(state,actions.RQ.ORDER_LIST),
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
});
const mapDispatchToProps = dispatch => ({
  getData: (param,callback) => dispatch(actions.request(actions.RQ.ORDER_LIST,"/ajax/income/order/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeOpeningPageContainer)







