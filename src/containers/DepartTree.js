import React from 'react'
import { connect } from 'react-redux'
import { fromData } from 'store/selectors'
import * as actions from 'store/actions'
import {message} from 'antd'

import { DepartTree } from 'components'

class DepartTreeContainer extends React.Component {
  componentWillMount() {
    this.props.getList();
  };
  getLoop = (data) => {
    if(data.length > 0){
      const result = data.filter((item)=>item.parent_id === undefined);
      if(result.length > 0){
        this.setNewData(result[0],data);
        return [result[0]];
      }
    }
  };
  setNewData = (obj,departmentList) => {
    if(departmentList){
      obj.children = [];
      let id = obj.id;
      let filter = departmentList.filter((d)=>d.parent_id === id);
      if(filter.length > 0){
        obj.children = [...obj.children,...filter.map((res)=>{
          res.children=[];
          this.setNewData(res,departmentList);
          return res;
        })];
      }
    }
  };
  render() {
    if(this.props.departList.length > 0){
      const treeData = this.getLoop(this.props.departList);
      return <DepartTree {...this.props} departData={treeData}/>
    }else{
      return <div/>
    }
  }
}

const mapStateToProps = state => ({
  departList: fromData.getData(state,actions.RQ.DEPART_TREE),
});

const mapDispatchToProps = dispatch => ({
  getList: () => dispatch(actions.request(actions.RQ.DEPART_TREE,"/ajax/org/department/list",{
  })),
  addDepart:(param,callBack) => dispatch(actions.request(actions.RQ.DEPART_ADD,"/ajax/org/department/increase",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  departSelect: (callback) => dispatch(actions.request(actions.RQ.DEPART_SELECT,"/ajax/org/department/list",{
    success:(res)=>{
      callback?callback(res):""
    }
  })),
  editDepart:(param,callBack) => dispatch(actions.request(actions.RQ.DEPART_EDIT,"/ajax/org/edit",{
    params:param,
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
  deleteDepart:(ids,callBack) => dispatch(actions.request(actions.RQ.DEPART_DELETE,"/ajax/org/department/delete",{
    params:{id:ids},
    method:'post',
    success:(res)=>{
      message.success(res.msg);
      callBack?callBack():'';
    }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartTreeContainer)
