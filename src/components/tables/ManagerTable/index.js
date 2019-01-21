import React from 'react';
import { Table,Pagination,Icon,Button,Modal } from 'antd';
import { ManagerModal } from 'components'
import styled from 'styled-components';

const ManagerTitle = styled.div`
  font-size: 14px;
  color: #333333;
  height:56px;
  border-bottom:1px solid #F1F3F5;
  line-height:56px;
  font-weight:600;
  padding-left:1%;
  box-sizing:border-box;
`;
const BottomCon = styled.div`
  float:right;
  margin-right:20px;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:100px;
  color:#fff;
  display:inline-block;
  line-height:100px;
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
class ManagerTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dataSource:[],
      modal:'',
      showDetale:'',
    };
  };
  componentWillMount(){
    this.props.getData((res)=>{
      this.setState({dataSource:res.data})
    })
  }
  showModal = () => {
    this.setState({
      modal:<ManagerModal cancel={()=>{this.setState({modal:''})}}
                          addAdmin={this.props.addAdmin}
                          navList={this.props.navList}
                          getInfo={this.props.getInfo}
                          refreshTable={this.refreshTable}/>
    })
  }
  refreshTable = () => {
    this.props.getData((res)=>{
      this.setState({dataSource:res.data})
    })
  }
  deleteAdmin = (record) =>{
    const param = {
      user_id:record.user_id
    }
    this.props.deteleAdmin(param,()=>{
      this.setState({showDetale:''})
      this.refreshTable()
    })
  }
  render(){
    const columns = [{
      title: '用户名',
      dataIndex: 'realname',
      key: 'realname',
      width:'25%',
    },{
      title: '账号',
      dataIndex: 'username',
      key: 'username',
    },{
      title: '操作',
      dataIndex: 'show',
      key: 'show',
      render: (text,record)=>{
        return(
          <div style={{overflow:'hidden'}}>
            <Icon type="edit"
                  style={{cursor:'pointer',fontSize:15,marginRight:24}} 
                  onClick={(e)=>{
                  }}/>
            <Icon type="delete"
                  style={{cursor:'pointer',fontSize:15}} 
                  onClick={(e)=>{
                    e.stopPropagation();
                    this.setState({
                      showDetale:<Modal title={<TitleSpan>删除提示</TitleSpan>}
                                        style = {{textAlign:'center',top:100}}
                                        visible
                                        width={450}
                                        onCancel={()=>this.setState({showDetale:''})}
                                        maskClosable={false}
                                        footer={null}> 
                                    <div style={{marginBottom:30}}>{record.user_id===this.props.navList.user_id?"无法删除自己":"此操作将会在集团与全部子公司内删除该用户，请谨慎操作！"}</div>
                                    <Button style={{marginRight:30}} onClick={()=>this.setState({showDetale:''})}>取消</Button>
                                    <Button disabled={record.user_id===this.props.navList.user_id} type="primary" onClick={()=>this.deleteAdmin(record)}>确定</Button>
                                 </Modal>
                    })
                  }}/>
          </div>
        )
      }
    }]

    return(
      <div style={{height:'100%',display:'flex',flexDirection:'column'}}>
        <ManagerTitle>
          <div style={{float:'left'}}>管理员</div>
          <BottomCon>
            <Button type="primary" onClick={()=>{
              this.showModal()
            }}>新增管理员</Button>
          </BottomCon>
        </ManagerTitle>
        <TableCon columns={columns}
               rowKey="user_id"
               pagination={false}
               dataSource={this.state.dataSource}
               onRowClick={(record)=>{
                 this.props.showDetail(record)
               }}
        />
        {this.state.modal}
        {this.state.showDetale}
      </div>
    )
  }
}
export default ManagerTable;

