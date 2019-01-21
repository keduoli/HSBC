import React from 'react'
import { Table,Button,Modal,Select,message } from 'antd'
import {DepartActionModal} from 'containers'
import styled from 'styled-components'

const {Option} = Select;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
class DepartTable extends React.Component{
  constructor(props){
    super(props);
    this.columns = [{
      title: '序号',
      dataIndex: 'index',
      key:'index',
      render:(text,record,index)=>index+1,
    }, {
      title: '部门',
      dataIndex: 'department_name',
      key:'department_name',
    }, {
      title: '员工姓名',
      dataIndex: 'realname',
      key:'realname',
    }, {
      title: '角色',
      dataIndex: 'role',
      key:'role',
    }];
    this.state={
      moveModal:'',
      editModal:'',
      selectedRowKeys:[],
      selectDepart:'',
      showLeave:'',
      arr:[]
    }
  };
  componentWillMount(){
    const param = {
      id:'',
      page:1,
      size:10,
    };
    this.props.getList(param);
  };
  componentDidMount(){
    this.props.departSelect((res)=>{
      let arr = res.data;
      this.setState({arr})
    })
  }
  moveFnc = ()=>{
    return(
      <Modal title={<TitleSpan>移动员工到</TitleSpan>}
             style = {{textAlign:'center',top:200}}
             closable={false}
             visible
             width={400}
             maskClosable={false}
             footer={null}
      >
        <div style={{margin:'30px 0 50px'}}>
          <Select
            placeholder="请选择"
            showSearch={true}
            style={{width:'80%'}}
            defaultValue={this.state.selectDepart?`${this.state.selectDepart}`:undefined}
            onChange={(value)=>{
              this.setState({selectDepart:value})
            }}
            optionFilterProp='children'
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {
              this.state.arr.length>0 && this.state.arr.map((item)=>{
                return <Option key={item.id}>{item.name}</Option>
              })
            }
          </Select>
          <p style={{width:'80%',margin:'15px auto 0',color:"#a0a0a0"}}>提示：只能移动在职员工，离职员工将保持原部门不变。</p>
        </div>
        <div>
          <Button onClick={()=>{this.setState({moveModal:''})}} style={{marginRight:20}}>取消</Button>
          <Button type="primary"
                  onClick={()=>{
                    const ids = this.state.selectedRowKeys.join(",");
                    const did = this.state.selectDepart;
                    if(!did){
                      message.warning('您还没有选择部门');return;
                    }
                    const param = {
                      ids:ids,
                      department_id:did,
                    };
                    this.props.moveUser(param,()=>{
                      this.setState({selectDepart:'',moveModal:''});
                      this.props.getDepartList();
                      this.props.updateTable();
                    })
                  }}
          >确定</Button>
        </div>
      </Modal>
    )
  };
  componentWillReceiveProps(nextProps){
    const {departUserList} = this.props;
    if(nextProps.departUserList !== departUserList)this.setState({selectedRowKeys:[]});
    if(this.props.departSelectList!==nextProps.departSelectList){
      let arr = nextProps.departSelectList;
      this.setState({arr})
    }
  }
  render(){
    const {departUserList,loading} = this.props;
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({selectedRowKeys});
      }
    };
    const columns = this.columns;
    return(
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          pagination={{total:departUserList.count,current:this.props.pageNum}}
          dataSource={departUserList.list}
          loading={loading}
          rowKey="id"
          onChange={(pagination, filters, sorter)=>{
            this.props.updatePage(pagination.current);
          }}
          footer={()=>{
            return (
              <div>
                <Button style={{marginRight:20}}
                        disabled={this.props.isLink === '0' || this.state.selectedRowKeys.length === 0}
                        onClick={()=>{this.setState({moveModal:this.moveFnc()})}}>移动到</Button>
              </div>
            )
          }}
        />
        {this.state.moveModal}
        {this.state.editModal}
        {this.state.showLeave}
      </div>
    )
  }
}
export default DepartTable;
