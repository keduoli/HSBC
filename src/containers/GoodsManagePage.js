import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'

import { GoodsManagePage } from 'components'
import { message } from 'antd';

const GoodsManagePageContainer = props => <GoodsManagePage {...props} />;

const mapStateToProps = state => ({
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
  goodsList: fromData.getData(state,actions.RQ.GOODS_LIST),
  loading: fromData.getLoad(state,actions.RQ.GOODS_LIST),
  codingList: fromData.getData(state,actions.RQ.CODING_LIST),
  codingLoad: fromData.getLoad(state,actions.RQ.CODING_LIST),
  settingList: fromData.getData(state,actions.RQ.OUTINVOICE_SETTING_SHOW),
});
const mapDispatchToProps = dispatch => ({
  getData:(param,callback) => dispatch(actions.request(actions.RQ.GOODS_LIST,"/ajax/goods/list",{
    params:param,
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  addGoods: (param,callBack) => dispatch(actions.request(actions.RQ.GOODS_ADD,"/ajax/goods/add",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  showSetting: (callBack) => dispatch(actions.request(actions.RQ.OUTINVOICE_SETTING_SHOW,"/ajax/income/setting",{
    success:(res)=>{
      callBack?callBack(res.data[0]):'';
    },
    error:(res)=>{
      callBack?callBack(res.code):'';
    }
  })),
  editGoods: (param,callBack) => dispatch(actions.request(actions.RQ.GOODS_EDIT,"/ajax/goods/edit",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  delGoods: (param,callBack) => dispatch(actions.request(actions.RQ.GOODS_DEL,"/ajax/goods/delete",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  getCodingList: (param,callBack) => dispatch(actions.request(actions.RQ.CODING_LIST,"/ajax/tax/list",{
    params:param,
    success:(res)=>{
      callBack?callBack(res.data):'';
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoodsManagePageContainer)







