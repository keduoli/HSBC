import React from 'react';
import { connect } from 'react-redux';
import { fromData } from 'store/selectors';
import * as actions from 'store/actions';
import { message } from 'antd';

import { OcrPage } from 'components'

const RecordPageContainer = props => <OcrPage {...props}/>;

const mapStateToProps = state => ({
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
  linkUserList: fromData.getData(state,actions.RQ.LINK_USER),
  ocrReturn:fromData.getData(state,actions.RQ.OCR_RETURN),
  waitList:fromData.getData(state,actions.RQ.WAIT_CONFIRM_LIST),
  loading:fromData.getLoad(state,actions.RQ.WAIT_CONFIRM_LIST),
  waitParam: fromData.getCheckSecond(state,fromData.WAIT_CHECK),
  customerList: fromData.getData(state,actions.RQ.CUSTOMER_LIST),
  drawdownList: fromData.getData(state,actions.RQ.DRAWDOWN_LIST),
  contractList: fromData.getData(state,actions.RQ.CONTRACT_LIST),
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
});
const mapDispatchToProps = dispatch => ({
  getUserList: () => dispatch(actions.request(actions.RQ.LINK_USER,"/ajax/user/list",{
    params:{is_link:1},
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
  ocrCheckFnc:(param,callback,errorCb) => dispatch(actions.request(actions.RQ.OCR_CHECK,"/ajax/ocr/check",{
    params:param,
    method:'post',
    success:(res)=>{
      callback(res.data);
    },
    error:()=>{
      message.success(res.msg);
      errorCb();
    }
  })),
  invMemoFnc:(param,callBack) => dispatch(actions.request(actions.RQ.INVOICE_SETMEMO,"/ajax/invoice/setMemo",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  recordAddFnc: (param,callback) => dispatch(actions.request(actions.RQ.RECORD_ADD,"/ajax/invoice/add",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callback();
    }
  })),
  formAttUpload:(param,callBack) => dispatch(actions.request(actions.RQ.OCR_UPLOAD,"/ajax/invoice/ocr",{
    params:param,
    method:'post',
    success:()=>{
      callBack?callBack():'';
    },
    error:()=>{
      return null;
    }
  })),
  goCheck:(param,success,error,again) => dispatch(actions.request(actions.RQ.MANUAL_CHECK,"/ajax/invoice/manualCheck",{
    params:param,
    method:'post',
    success:(res)=>{
      success(res);
    },
    error:(res)=>{
      if(res.data){
        if(res.code===10032){
          again?again(res):'';
        }else{
          error?error(res):'';
        }
      }
    }
  })),
  getDetail:(param,callBack) => dispatch(actions.request(actions.RQ.INVOICE_DETAIL,"/ajax/invoice/detail",{
    params:{invoice_id:param},
    success:(res)=>{
      callBack(res);
    }
  })),
  invoiceAction:(param,callBack) => dispatch(actions.request(actions.RQ.INVOICE_ACTION,"/ajax/invoice/action",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  getWaitList:(param,callBack) => dispatch(actions.request(actions.RQ.WAIT_CONFIRM_LIST,"/ajax/ocr/list",{
    params:param,
    success:(res)=>{
      callBack?callBack(res.data):'';
    }
  })),
  saveScan:(param,callBack) => dispatch(actions.request(actions.RQ.INVOICE_SAVE,"/ajax/invoice/save",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  formSaveScan:(formData,callBack) => dispatch(actions.request(actions.RQ.INVOICE_SAVE,"/ajax/invoice/save",{
    formData:formData,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  waitCheckAction:(param,callBack) => dispatch(actions.request(actions.RQ.WAIT_CONFIRM_HANDLE,"/ajax/ocr/delete",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  changeWaitParam: (obj)=>{
    dispatch(actions.checkSecond(fromData.WAIT_CHECK,obj));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordPageContainer)
