import React from 'react';
import { Table, Button, Pagination, message, Modal, Select } from 'antd';
import styled from 'styled-components';
import { UserModal,CustomerModal } from 'components';

const DianSpan = styled.span`
  width:18px;
  height:18px;
  float:left;
  background:url(images/invoice.png) no-repeat 0 0;
`;
const PuSpan = styled.span`
  width:18px;
  height:18px;
  float:left;
  background:url(images/invoice.png) no-repeat -36px 0;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:100px;
  color:#fff;
  display:inline-block;
  line-height:100px;
`;
const ZhiSpan = styled.span`
  width:18px;
  height:18px;
  float:left;
  background:url(images/invoice.png) no-repeat -18px 0;
`;
const ZhuanSpan = styled.span`
  width:18px;
  height:18px;
  float:left;
  background:url(images/invoice.png) no-repeat -54px 0;
`;
const BottomPage = styled.div`
  background:#f7f7f7;
  position:fixed;
  bottom:0px;
  right:0px;
  height:60px;
  z-index:100;
  padding:20px 20px 0 20px;
  box-sizing:border-box;
	overflow:hidden;
  -webkit-transition: all .2 ease;
  transition: all .2s ease;
`;
class UserManageTable extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedRowKeys:[],
      userModal:'',
      selectedRows:'',
      deleteModal:'',
      sortedInfo: {columnKey: "", field: "", order: ""},
    }
    this.selectAmountArr = [];
  }
  componentWillReceiveProps(nextProps){
    const {page,cus_num,bank,name,tax_num,memo1,order_name,order_value } = this.props.state;
    const next = nextProps.state;
    if(next.page !== page || order_name!== next.order_name|| order_value!== next.order_value || cus_num !== next.cus_num || bank !== next.bank || name !== next.name || tax_num !== next.tax_num || memo1 !== next.memo1){
      const param = {
        size:10,
        page:next.page,
        cus_num:next.cus_num,
        bank:next.bank,
        name:next.name,
        order:JSON.stringify({'order_name':next.order_name,'order_value':next.order_value}),
        tax_num:next.tax_num,
        memo1:next.memo1,
      };
      this.props.getCustomerList(param)
    }
  }
  onSelectChange = (selectedRowKeys,selectedRows) => {
    this.setState({selectedRowKeys,selectedRows})
  }
  refreshData = () => {
    const {state} = this.props;
    const param = {
      size:10,
      page:state.page,
      cus_num:state.cus_num,
      bank:state.bank,
      name:state.name,
      tax_num:state.tax_num,
      memo1:state.memo1,
      order:JSON.stringify({'order_name':state.order_name,'order_value':state.order_value}),
    };
    this.props.getCustomerList(param)
    this.setState({selectedRowKeys:[],selectedRows:''});
  }
  clearRadiuo = () => {
    this.setState({selectedRowKeys:[],selectedRows:''});
  }
  checkRadiuo = (res) => {
    const key = [];
    for(let i in res.list){
      key.push(res.list[i].id)
    }
    this.setState({selectedRowKeys:key})
  }
  addUserModal = () => {
    return <UserModal title='新增客户'
                      addFnc={this.props.addFnc} 
                      customerList={this.props.customerList}
                      refreshData={this.refreshData}
                      cancel={()=>this.setState({userModal:''})}/>
  }
  editUserModal = () => {
    return <UserModal title='编辑客户'
                      editFnc={this.props.editFnc} 
                      record={this.state.selectedRows[0]}
                      customerList={this.props.customerList}
                      edit={true}
                      refreshData={this.refreshData}
                      cancel={()=>this.setState({userModal:''})}/>
  }
  showDetail = (res) => {
    return <CustomerModal cancel={()=>this.setState({customerModal:''})}
                          editFnc={this.props.editFnc}
                          refreshData={this.refreshData}
                          record={res}/>
  }
  deleteFnc = () => {
    this.setState({deleteModal:<Modal title={<TitleSpan>删除提示</TitleSpan>}
                                      style = {{textAlign:'center',top:200}}
                                      onCancel={()=>this.setState({deleteModal:''})}
                                      visible
                                      width={400}
                                      maskClosable={false}
                                      footer={null}
                                >
                                <div style={{margin:'10px 0 40px'}}>
                                  确定要删除选中的客户么？
                                </div>
                                <div>
                                  <Button onClick={()=>{this.setState({deleteModal:''})}} style={{marginRight:20}}>取消</Button>
                                  <Button type="primary" onClick={()=>{
                                    const param = {
                                      cus_ids:this.state.selectedRowKeys.join(','),
                                    };
                                    this.props.delFnc(param,()=>{
                                      this.refreshData()
                                      this.setState({deleteModal:''})
                                    });
                                  }}>确定</Button>
                                </div>
                                </Modal>})
  }
  render(){
    let {sortedInfo} = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [{
      title: '客户编号',
      key:'cus_num',
      dataIndex: 'cus_num',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'cus_num' && sortedInfo.order,
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '客户名称',
      key:'cus_name',
      dataIndex: 'cus_name',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'cus_name' && sortedInfo.order,
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '所属分行',
      key:'bank',
      dataIndex: 'bank',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'bank' && sortedInfo.order,
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '创建时间',
      key:'create_time',
      dataIndex: 'create_time',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'create_time' && sortedInfo.order,
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '客户公司税号',
      key:'tax_num',
      dataIndex: 'tax_num',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'tax_num' && sortedInfo.order,
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '客户备注1',
      key:'memo1',
      dataIndex: 'memo1',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'memo1' && sortedInfo.order,
      render:(text)=><div>{text?text:'---'}</div>
    }];
    const { customerList,loading } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return(
      <div style={{overflow:'hidden',width:'100%'}}>
        <div style={{margin:'10px 0 60px 0'}}>
          <div style={{overflow:'hidden',marginBottom:10}}>
            <Button type='primary' onClick={()=>this.setState({userModal:this.addUserModal()})} style={{float:'right'}}>新增客户</Button>
          </div>
          {
            this.props.showTable &&
            <Table pagination={false}
                   rowKey='id'
                   rowSelection={rowSelection}
                   selectedRowKeys={selectedRowKeys}
                   columns={columns}
                   loading={loading}
                   dataSource={customerList.list}
                   onChange={(pagination, filters, sorter)=>{
                     if(sorter.field){
                       const val = sorter.order === "ascend" ? 1: -1;
                       this.setState({sortedInfo:sorter},()=>{
                         this.props.setOrderFnc(sorter.field,val);
                        });
                     }
                   }}
                   onRowClick={(record)=>{
                    this.props.getCustomerDetail(record.id,(res)=>{
                      this.setState({customerModal:this.showDetail(res)})
                    })
                   }}/>
          }
        </div>
        <BottomPage style={{left:this.props.collectionStop?'75px':'210px'}}>
          <Button style={{float:"left",marginRight:20}}
                  onClick={()=>{
                    const param = {
                      ids:this.state.selectedRowKeys.join(','),
                    };
                    this.props.exportCustomer(param,()=>{
                      this.refreshData()
                    });
                  }}
                  type="primary"
                  disabled={selectedRowKeys.length===0}
                  >
            导出
          </Button>
          <Button style={{float:"left",marginRight:20}}
                  onClick={()=>this.setState({userModal:this.editUserModal()})}
                  type="primary"
                  disabled={selectedRowKeys.length!==1}
                  >
            编辑
          </Button>
          <Button style={{float:"left",marginRight:20}}
                  onClick={this.deleteFnc}
                  type="primary"
                  disabled={selectedRowKeys.length===0}
                  >
            删除
          </Button>
          {
            this.props.showTable &&
            <Pagination total={customerList.count}
                        style={{float:'right'}}
                        current={this.props.state.page}
                        onChange={(page, pageSize)=>{
                          this.props.setPageFnc(page);
                        }}/>
                      }
        </BottomPage>
        {this.state.userModal}
        {this.state.customerModal}
        {this.state.deleteModal}
      </div>
    )
  }
}

export default UserManageTable
