import React from 'react'
import {NavTitle,FrameworkFrom} from 'components'
import styled from 'styled-components'
import { Table,Button,Input } from 'antd';
const FrameworkLeft = styled.div`
  float:left;
  width:40%;
  overflow:hidden;
  background:#F7FBFF;
  height:80vh;
`;
const FrameworkRight = styled.div`
  float:right;
  overflow:auto;
  background:#fff;
  height:80vh;
  width:58%;
`;
const FrameTitle = styled.div`
  font-size: 14px;
  color: #333333;
  height:70px;
  line-height:70px;
  border-left:3px solid #2397CA;
  box-sizing:border-box;
  padding:0 45px 0 21px;
  font-weight:600;
  background:#fff;
`;
const FrameList = styled.div`
  margin-top:20px;
  background:#fff;
  height:100%;
  width:100%;
  position:relative;
`;
const FrameListTitle = styled.div`
  height:50px;
  line-height:50px;
  font-size: 14px;
  color: #333333;
  font-weight:600;
  padding-left:23px;
  border-bottom:1px solid #F1F3F5;
`;
const EditInput = styled(Input)`
   float:left;
   display:block;
   width:150px;
`;
const EditCon = styled.div`
   float:right;
   font-size:13px;
   color:#0662EE;
   cursor:pointer;
`;
const TableCon = styled(Table)`
  height:80%;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 5px;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #a0a0a0;
    border-left: 2px solid transparent;
  }
`;
class FrameworkPage extends React.Component{
  state={
    frameList:"",
    showEdit:false,
    addFrame:false,
    record:"",
    rootCompany:false,
    company_name:''
  }
  componentWillMount(){
    this.props.getList((res)=>{
      this.setState({frameList:res.data})
    })
  }
  addFrame = () => {
    this.setState({showEdit:true,addFrame:true,record:""})
  }
  refreshList = () => {
    this.props.getList((res)=>{
      this.setState({frameList:res.data,showEdit:false,record:""})
    })
  }
  onChange = (e) => {
    this.setState({company_name:e.target.value})
  }
  render(){
    const columns = [{
      title:'全部公司',
      dataIndex: 'name',
      key: 'name',
      width:'25%',
    }]
    return(
      <div>
        <NavTitle title="集团设置"
                  submeun='组织架构'/>
        <FrameworkLeft style={{width:this.state.showEdit === false ? '100%':'40%',transition:'all .2s'}}>
          <FrameTitle>
             <div style={{float:'left'}}><div style={{float:'left'}}>集团名称：</div>
              {
                this.state.showEditRoot === true ? 
                <div style={{overflow:'hidden',float:'left',marginTop:21}}>
                  <EditInput onChange={this.onChange} defaultValue={this.state.frameList!==""&&this.state.frameList.root_company.name}/>
                  <div style={{overflow:'hidden',float:'left'}}>
                    <Button style={{float:'left',marginLeft:10}} type='primary' onClick={()=>{
                      const param = {
                        company_name:this.state.company_name===""?this.state.frameList.root_company.name:this.state.company_name,
                        department_id:this.state.frameList.root_company.id
                      }
                      this.props.editCompany(param,()=>{
                        this.setState({showEditRoot:false})
                        this.refreshList()
                        this.props.getNavList()
                      })
                    }}>保存</Button>
                    <Button style={{float:'left',marginLeft:10}} onClick={()=>{
                      this.setState({showEditRoot:false})
                    }}>取消</Button>
                  </div>
                </div>
                :
                <span>{this.state.frameList!==""&&this.state.frameList.root_company.name}</span>
              }
            </div>
            <EditCon onClick={()=>{
              this.setState({showEditRoot:true})
            }}>{this.state.showEditRoot===true?"":"编辑"}</EditCon>
          </FrameTitle>
          <FrameList>
            <TableCon  columns={columns}
                       rowKey="id"
                       pagination={false}
                       onRowClick={(record)=>{
                         this.setState({showEdit:false},()=>{
                           this.setState({showEdit:true,record:record,addFrame:false,rootCompany:false})
                         })
                       }}
                       dataSource={this.state.frameList.child_company}/>
            <Button style={{zIndex:100,position:'fixed',left:0,right:0,bottom:30,width:103,height:30,margin:'0 auto'}} type='primary' onClick={this.addFrame}>新增子公司</Button>
          </FrameList>
        </FrameworkLeft>
        {
          this.state.showEdit === true && 
          <FrameworkRight style={{width:this.state.showEdit === false ?'0%':'58%',transition:'all .2s'}}>
            <FrameworkFrom cancel={()=>this.setState({showEdit:false,record:""})}
                           addCompany={this.props.addCompany}
                           ref={ref=>this.FrameworkFrom=ref}
                           refreshList={this.refreshList}
                           addFrame={this.state.addFrame}
                           record={this.state.record}
                           rootCompany={this.state.rootCompany}
                           getNavList={this.props.getNavList}
                           editCompany={this.props.editCompany}
                           delCompany={this.props.delCompany}/>
          </FrameworkRight>
        }
      </div>
    )
  }
}
export default FrameworkPage