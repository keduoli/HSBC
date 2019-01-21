import React from 'react';
import { Table, Button, Pagination, message, Modal, Select } from 'antd';
import styled from 'styled-components';
import { LoanModal } from 'components'
import { zhMoney } from './../../util';

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
class LoanManageTable extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedRowKeys:[],
      loanModal:'',
      selectedRows:'',
      drawdownWithdrawModal:'',
      sortedInfo: {columnKey: "", field: "", order: ""},
    }
    this.selectAmountArr = [];
  }
  componentWillReceiveProps(nextProps){
    const {page,debt_account,cus_name,showInfo,cus_num,order_name,order_value,start_dd_date,end_dd_date,num,memo,state,max_dd_amount,min_dd_amount } = this.props.state;
    const next = nextProps.state;
    if(next.page !== page || showInfo!==next.showInfo || order_name!== next.order_name|| order_value!== next.order_value || debt_account !== next.debt_account || cus_name !== next.cus_name || cus_num !== next.cus_num || min_dd_amount !== next.min_dd_amount
      || memo !== next.memo || start_dd_date !== next.start_dd_date || end_dd_date !== next.end_dd_date || num !== next.num || max_dd_amount !== next.max_dd_amount
      || state !== next.state){
      const param = {
        size:10,
        page:next.page,
        debt_account:next.debt_account,
        cus_name:next.cus_name,
        cus_num:next.cus_num,
        start_dd_date:next.start_dd_date,
        end_dd_date:next.end_dd_date,
        num:next.num,
        memo:next.memo,
        state:next.state,
        order:JSON.stringify({'order_name':next.order_name,'order_value':next.order_value}),
        max_dd_amount:next.max_dd_amount,
        min_dd_amount:next.min_dd_amount,
      };
      this.props.getDrawdownList(param)
    }
  }
  refreshData = () => {
    const {state} = this.props;
    const param = {
      size:10,
      page:state.page,
      debt_account:state.debt_account,
      cus_name:state.cus_name,
      cus_num:state.cus_num,
      start_dd_date:state.start_dd_date,
      end_dd_date:state.end_dd_date,
      num:state.num,
      memo:state.memo,
      state:state.state,
      max_dd_amount:state.max_dd_amount,
      min_dd_amount:state.min_dd_amount,
      order:JSON.stringify({'order_name':state.order_name,'order_value':state.order_value}),
    };
    this.props.getDrawdownList(param)
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
  onSelectChange = (selectedRowKeys,selectedRows) => {
    this.setState({selectedRowKeys,selectedRows})
  }
  addLoanModal = () => {
    return <LoanModal title='新增放款信息'
                      customerList={this.props.customerList}
                      refreshData={this.refreshData}
                      getCustomerDetail={this.props.getCustomerDetail}
                      addFnc={this.props.addFnc}
                      getCustomerList={this.props.getCustomerList}
                      cancel={()=>this.setState({loanModal:''})}/>
  }
  editLoanModal = () => {
    return <LoanModal title='编辑放款信息'
                      edit={true}
                      customerList={this.props.customerList}
                      refreshData={this.refreshData}
                      record={this.state.selectedRows[0]}
                      getCustomerDetail={this.props.getCustomerDetail}
                      editFnc={this.props.editFnc}
                      getCustomerList={this.props.getCustomerList}
                      cancel={()=>this.setState({loanModal:''})}/>
  }
  drawdownWithdrawFnc = () => {
    this.setState({drawdownWithdrawModal:<Modal   title={<TitleSpan>操作提示</TitleSpan>}
                                                style = {{textAlign:'center',top:200}}
                                                onCancel={()=>this.setState({drawdownWithdrawModal:''})}
                                                visible
                                                width={400}
                                                maskClosable={false}
                                                footer={null}
                                          >
                                          <div style={{margin:'10px 0 40px'}}>
                                            确定要撤销放款么？
                                          </div>
                                          <div>
                                            <Button onClick={()=>{this.setState({drawdownWithdrawModal:''})}} style={{marginRight:20}}>取消</Button>
                                            <Button type="primary" onClick={()=>{
                                              const param = {
                                                ids:this.state.selectedRowKeys.join(','),
                                              };
                                              this.props.drawdownWithdraw(param,()=>{
                                                this.refreshData()
                                                this.setState({drawdownWithdrawModal:''})
                                              });
                                            }}>确定</Button>
                                          </div>
                                          </Modal>})
  }
  render(){
    let {sortedInfo} = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [{
      title: '放款日期',
      key:'dd_date',
      dataIndex: 'dd_date',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'dd_date' && sortedInfo.order,
      render:(text)=><div>{text?text:'---'}</div>
    },{
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
      title: '货款账号',
      key:'debt_account',
      dataIndex: 'debt_account',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'debt_account' && sortedInfo.order,
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '放款额度',
      key:'dd_amount',
      dataIndex: 'dd_amount',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'dd_amount' && sortedInfo.order,
      render:(text)=><div>{text?zhMoney(text):'---'}</div>
    },{
      title: '放款状态',
      key:'state',
      dataIndex: 'state',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'state' && sortedInfo.order,
      render:(text)=>{
        return(
          <div>
          {text=='0' && '未放款'}
          {text=='1' && '已放款待补交'}
          {text=='2' && '放款完成'}
          {text=='3' && '放款取消'}
          </div>
        )
      }
    },{
      title: '直接关联放款发票数',
      key:'inv_count',
      dataIndex: 'inv_count',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'inv_count' && sortedInfo.order,
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '直接关联放款发票金额',
      key:'inv_amount',
      dataIndex: 'inv_amount',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'inv_amount' && sortedInfo.order,
      render:(text)=><div>{text?zhMoney(text):'---'}</div>
    },{
      title: '关联合同数量',
      key:'con_count',
      dataIndex: 'con_count',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'con_count' && sortedInfo.order,
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '关联合同总金额',
      key:'con_amount',
      dataIndex: 'con_amount',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'con_amount' && sortedInfo.order,
      render:(text)=><div>{text?zhMoney(text):'---'}</div>
    }];
    const { drawdownList,loading } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return(
        <div style={{overflow:'hidden',width:'100%'}}>
          <div style={{margin:'10px 0 60px 0'}}>
            <div style={{overflow:'hidden',marginBottom:10}}>
              <Button type='primary' onClick={()=>this.setState({loanModal:this.addLoanModal()})} style={{float:'right'}}>新增放款信息</Button>
            </div>
            {
              this.props.showTable && 
              <Table pagination={false}
                     rowKey='id'
                     columns={columns}
                     rowSelection={rowSelection}
                     selectedRowKeys={selectedRowKeys}
                     loading={loading}
                     dataSource={drawdownList.list}
                     onChange={(pagination, filters, sorter)=>{
                       if(sorter.field){
                         const val = sorter.order === "ascend" ? 1: -1;
                         this.setState({sortedInfo:sorter},()=>{
                           this.props.setOrderFnc(sorter.field,val);
                          });
                       }
                     }}
                     onRowClick={(record)=>{
                      this.props.getDrawdownDetail(record.id,(res)=>{
                        this.props.showDetail(res)
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
                      this.props.exportDrawdown(param,()=>{
                        this.refreshData()
                      });
                    }}
                    type="primary"
                    disabled={selectedRowKeys.length==0}
                    >
              导出列表信息
            </Button>
            <Button style={{float:"left",marginRight:20}}
                    onClick={()=>{
                      const param = {
                        id:this.state.selectedRowKeys.join(','),
                      };
                      this.props.exportDetail(param,()=>{
                        this.refreshData()
                      });
                    }}
                    type="primary"
                    disabled={selectedRowKeys.length!==1}
                    >
              导出放款详情
            </Button>
            <Button style={{float:"left",marginRight:20}}
                    onClick={this.drawdownWithdrawFnc}
                    type="primary"
                    disabled={selectedRowKeys.length==0}
                    >
              撤销
            </Button>
            <Button style={{float:"left",marginRight:20}}
                    onClick={()=>this.setState({loanModal:this.editLoanModal()})}
                    type="primary"
                    disabled={selectedRowKeys.length!==1}
                    >
              编辑
            </Button>
            {
              this.props.showTable && 
              <Pagination total={drawdownList.count}
                          style={{float:'right'}}
                          current={this.props.state.page}
                          onChange={(page, pageSize)=>{
                            this.props.setPageFnc(page);
                          }}/>
                        }
          </BottomPage>
          {this.state.loanModal}
          {this.state.drawdownWithdrawModal}
        </div>
    )
  }
}

export default LoanManageTable
