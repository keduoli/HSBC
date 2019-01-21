import React from 'react'
import { Table,Button,Modal,Select,message,Input } from 'antd'
import {DepartActionModal} from 'containers'
import styled from 'styled-components'

const Option = Select.Option;
const Search = Input.Search;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const RightTop = styled.div`
  background:#fff;
  margin-bottom:10px;
  padding:10px;
  overflow:hidden;
`;
const TopLeft = styled.div`
  float:left;
`;
const TopRight = styled.div`
  float:right;
`;
class SaleSetTable extends React.Component{
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
      title: '是否为销售',
      dataIndex: 'is_use',
      key:'is_use',
      render:text=>text===1?'是':<span style={{color:'#a0a0a0'}}>否</span>,
    }, {
      title: '员工账号',
      dataIndex: 'email',
      key:'email',
      render:(text,record,index)=>{
        return(
          <span>
            {
              record.is_login === 0?'':text
            }
          </span>
        )
      },
    }];
    this.state={
      addModal:'',
      keyword:'',
      page:1,
      size:10,
      selectedRowKeys:[]
    }
  };
  addFnc = () => {
    return(
      <Modal title={<TitleSpan>设为销售</TitleSpan>}
             style = {{textAlign:'center',top:200}}
             closable={false}
             visible
             width={400}
             maskClosable={false}
             footer={null}
      >
        <div style={{margin:'30px 0 50px'}}>
          <p style={{width:'80%',margin:'15px auto 0',color:"#a0a0a0",fontSize:16}}>您正在将{this.state.selectedRowKeys.length}名员工设为销售,设为销售后只能申请开票</p>
        </div>
        <div>
          <Button onClick={()=>{this.setState({addModal:''})}} style={{marginRight:20}}>取消</Button>
          <Button type="primary"
                  onClick={()=>{
                    const ids = this.state.selectedRowKeys.join(",");
                    const param = {target_ids:ids};
                    this.props.addApplicant(param,()=>{
                      this.setState({addModal:''});
                      this.updateTable();
                    })
                  }}
          >确定</Button>
        </div>
      </Modal>
    )
  }
  updateTable = () => {
    const param={
      keyword:this.state.keyword,
      size:10,
      page:this.state.page,
    };
    this.setState({selectedRowKeys:[]})
    this.props.getApplicantList(param);
  }
  componentWillUpdate(nextProps,nextState){
    const { page, size,keyword } = nextState;
		if(page!==this.state.page){
      const param={
        keyword:this.state.keyword,
        size:10,
        page:this.state.page,
      };
      this.props.getApplicantList(param);
		}
  }
  render(){ 
    const {applicantList,loading} = this.props;
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
        <RightTop>
          <TopRight>
            <Search
              placeholder="请输入员工姓名/邮箱进行搜索"
              style={{ width:250,marginRight:20 }}
              value={this.state.keyword}
              onChange={(e)=>{this.setState({keyword:e.target.value})}}
              onSearch={value =>{
                this.setState({page:1});
                const param={
                  keyword:value,
                  size:10,
                  page:1,
                };
                this.props.getApplicantList(param);
              }}
            />
          </TopRight>
        </RightTop>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          pagination={{total:applicantList.count,current:this.state.page}}
          dataSource={applicantList.rows}
          loading={loading}
          rowKey="id"
          onChange={(pagination, filters, sorter)=>{
            this.setState({page:pagination.current});
          }}
          footer={()=>{
            return (
              <div>
                <Button style={{marginRight:20}}
                        disabled={this.state.selectedRowKeys.length === 0}
                        onClick={()=>{this.setState({addModal:this.addFnc()})}}>设为销售</Button>
              </div>
            )
          }}
        />
        {this.state.addModal}
      </div>
    )
  }
}
export default SaleSetTable;
