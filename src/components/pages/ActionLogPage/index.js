import React from 'react';
import {NavTitle,ActionLogFilter,LogTable} from 'components';
import {Upload,message,Icon,Progress,Tooltip,Modal,Button,Input,Badge,Tabs} from 'antd';
import styled from 'styled-components';
import { apiUrl } from 'config';

const LogContent = styled.div`
  background:#fff;
  padding:15px;
  min-height:70vh;
`;
const SwitchLog = styled.div`
  background:#fff;
  padding:20px 0 0 10px;
  overflow:hidden;
  width: 100%;
  margin-bottom:15px;
`;
class ActionLogPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      time_area:'',
      keyword:'',
      action_user:'',
      page:1,
      showInfo:false,
      navList:''
    };
  }
  componentWillMount(){
    this.props.getActionUser();
    this.loadTableData();
  };
  loadTableData = () => {
    this.setState({showInfo:false})
    const param = {
      time_area:this.state.time_area,
      keyword:this.state.keyword,
      action_user:this.state.action_user,
      page:this.state.page,
      size:10,
    };
    this.props.getLogList(param);
  };
  setPage = (page) => {
    this.setState({page:page})
  };
  searchLogFnc = (val) => {
    this.setState({
      time_area:val.time_area,
      keyword:val.keyword,
      action_user:val.action_user,
      page:1,
      showInfo:true,
    })
  };
  clearLogFnc = () => {
    this.setState({
      time_area:'',
      keyword:'',
      action_user:'',
      showInfo:false,
    });
  }
  render(){
    return(
      <div>
        <NavTitle title="企业设置"
                  submeun='操作日志'/>
        <ActionLogFilter
          {...this.props}
          showInfo={this.state.showInfo}
          searchLog={this.searchLogFnc}
          clearLog={this.clearLogFnc}
        />
        <LogContent>
          <LogTable
            {...this.props}
            state={this.state}
            setPage={this.setPage}
          />
        </LogContent>
      </div>
    )
  }
}
export default ActionLogPage;



