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
const RefreshBtn = styled.div`
  display:inline-block;
  margin-left:20px;
`;
const RefreshIcon = styled(Icon)`
  cursor:pointer;
  &:hover{
    color:#2476f8;
  }
  &:active{
    color:rgb(211,211,211);
  }
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
  showRefreshBtn = () => {
    return(
        <RefreshBtn>
          <RefreshIcon type="sync" onClick={()=>{
            const param = {
              page:this.state.page,
              size:10,
              time_area:this.state.time_area,
              keyword:this.state.keyword,
              action_user:this.state.action_user,
            };
            this.props.getLogList(param);
          }}/>
        </RefreshBtn>
      )
  };
  render(){
    return(
      <div>
        <NavTitle title="企业设置"
                  refreshBtn={this.showRefreshBtn}
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



