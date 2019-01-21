import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'
import {message} from 'antd'

import { UploadPage } from 'components'

const UploadPageContainer = props => <UploadPage {...props} />;

const mapStateToProps = state => ({
  // homeData: fromData.getData(state,actions.RQ.HOME_DATA),
  folderList: fromData.getData(state,actions.RQ.FOLDER_LIST),
  folderListLoading:fromData.getLoad(state,actions.RQ.FOLDER_LIST),
  folderDetail:fromData.getData(state,actions.RQ.FOLDER_DETAIL),
  folderDetailLoading:fromData.getLoad(state,actions.RQ.FOLDER_DETAIL),
});
const mapDispatchToProps = dispatch => ({
  getFolderList:(param) => dispatch(actions.request(actions.RQ.FOLDER_LIST,"/pc/upload/folders/get",{params:param})),
  getFolderDetail:(param,callBack) => dispatch(actions.request(actions.RQ.FOLDER_DETAIL,"/pc/upload/list/get",{
    params:param,
    success:(res)=>{
      callBack?callBack():'';
    },
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
  deleteFile:(param,callBack) => dispatch(actions.request(actions.RQ.FOLDER_DETAIL,"/pc/upload/file/del", {
        params:param,
        method:'post',
        success:(res)=>{
          message.success(res.msg);
          callBack();
        },
      },
    )),
  checkAllFile:(param,callBack) => dispatch(actions.request(actions.RQ.CHECK_ALL_FILE,"/pc/invoice/ocr/folder", {
      params:param,
      method:'post',
      success:(res)=>{
        callBack?callBack():'';
      },
      error:(res) => {
        message.error(res.msg)
      }
    },
  )),
  checkEachFile:(param,callBack) => dispatch(actions.request(actions.RQ.CHECK_EACH_FILE,"/pc/invoice/ocr/file", {
      params:param,
      method:'post',
      success:(res)=>{
        callBack?callBack():'';
      },
      error:(res) => {
        message.error(res.msg)
      }
    },
  )),
  deleteFolder:(param,callBack) => dispatch(actions.request(actions.RQ.FOLDER_DELETE,"/pc/upload/folder/del", {
        params:param,
        method:'post',
        success:(res)=>{
          message.success(res.msg);
          callBack();
        },
      },
    )),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadPageContainer)
