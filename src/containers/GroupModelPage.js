import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'

import { GroupModelPage } from 'components'

const GroupModelPageContainer = props => <GroupModelPage {...props} />;

const mapStateToProps = state => ({
  scanParam: fromData.getCheckSecond(state,fromData.CHECK_SCAN),
  manualParam: fromData.getCheckSecond(state,fromData.CHECK_MANUAL),
  canShowResult: fromData.getCheckSecond(state,fromData.CAN_SHOW_RESULT),
  consortiumResult: fromData.getData(state,actions.RQ.LINK_CONSORTIUM),
  targetCity: fromData.getCheckSecond(state,actions.TARGET_CITY),
});
const mapDispatchToProps = dispatch => ({
  invoiceCheck: (param,success,error,tip,scanAgain) => dispatch(actions.request(actions.RQ.INVOICE_CHECK,"/ajax/invoice/scanCheck",{
    params:param,
    method:'post',
    success:(res)=>{
      success(res.data);
    },
    error:(res)=>{
      if(res.data){
        if(res.code === 20509 || res.code === 20511 || res.code === 20510){
          scanAgain(res.data,res.msg);
        }else{
          error(res.data,res.msg);
        }
      }else{
        tip(res.msg);
      }
    }
  })),
  manualCheck: (param,success,error,tip,scanAgain) => dispatch(actions.request(actions.RQ.MANUAL_CHECK,"/ajax/invoice/manualCheck",{
    params:param,
    method:'post',
    success:(res)=>{
      success(res.data);
    },
    error:(res)=>{
      if(res.data){
        if(res.code===20509 || res.code === 20511 || res.code === 20510){
          scanAgain(res.data,res.msg);
        }else{
          error(res.data,res.msg);
        }
      }else{
        tip(res.msg)
      }
    }
  })),
  changeContent: (obj)=>{
    dispatch(actions.checkSecond(fromData.CHECK_SCAN,obj));
  },
  changeManual: (obj)=>{
    dispatch(actions.checkSecond(fromData.CHECK_MANUAL,obj));
  },
  changeShowResult: (res)=>{
    dispatch(actions.checkSecond(fromData.CAN_SHOW_RESULT,res));
  },
  getUserList: () => dispatch(actions.request(actions.RQ.LINK_USER,"/ajax/user/list",{
    params:{is_link:1},
  })),
  getConsortiumShow: (params,callBack) => dispatch(actions.request(actions.RQ.LINK_CONSORTIUM,"/ajax/consortium/get",{
    params:params,
    success: () => {
    	callBack()
    }
  }
  )),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupModelPageContainer)
