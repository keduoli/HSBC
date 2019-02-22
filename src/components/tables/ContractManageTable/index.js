import React from 'react';
import { Table, Button, Pagination,Modal  } from 'antd';
import styled from 'styled-components';
import { ContractModal } from 'components';
import { zhMoney } from './../../util';
const TitleSpan = styled.span`
  fontSize:13px;
  height:100px;
  color:#fff;
  display:inline-block;
  line-height:100px;
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
class ContractManageTable extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedRowKeys:[],
      contractModal:'',
      showDetail:'',
      selectedRows:'',
      deleteModal:'',
      sortedInfo: {columnKey: "", field: "", order: ""},
    }
    this.selectAmountArr = [];
  }
  componentWillReceiveProps(nextProps){
    const {page,con_num,cus_num,dd_id,gfmc,xfmc,showInfo,min_con_amount,max_con_amount,start_con_date,memo1,state,end_con_date,order_name,order_value } = this.props.state;
    const next = nextProps.state;
    if(next.page !== page || showInfo!==next.showInfo ||next.max_con_amount !== max_con_amount || next.min_con_amount !== min_con_amount ||order_name!== next.order_name|| order_value!== next.order_value|| next.dd_id !== dd_id || con_num !== next.con_num || cus_num !== next.cus_num || gfmc !== next.gfmc || xfmc !== next.xfmc 
      || start_con_date !== next.start_con_date || memo1 !== next.memo1 || state !== next.state || end_con_date !== next.end_con_date){
      const param = {
        size:10,
        page:next.page,
        con_num:next.con_num,
        cus_num:next.cus_num,
        gfmc:next.gfmc,
        xfmc:next.xfmc,
        start_con_date:next.start_con_date,
        memo1:next.memo1,
        min_con_amount:next.min_con_amount,
        max_con_amount:next.max_con_amount,
        state:next.state,
        dd_id:next.dd_id,
        end_con_date:next.end_con_date,
        order:JSON.stringify({'order_name':next.order_name,'order_value':next.order_value}),
      };
      this.props.getContractList(param)
    }
  }
  refreshData = () => {
    const {state} = this.props;
    const param = {
      size:10,
      page:state.page,
      con_num:state.con_num,
      cus_num:state.cus_num,
      gfmc:state.gfmc,
      xfmc:state.xfmc,
      con_amount:state.con_amount,
      start_con_date:state.start_con_date,
      memo1:state.memo1,
      state:state.state,
      min_con_amount:state.min_con_amount,
      max_con_amount:state.max_con_amount,
      dd_id:state.dd_id,
      end_con_date:state.end_con_date,
      order:JSON.stringify({'order_name':state.order_name,'order_value':state.order_value}),
    };
    this.props.getContractList(param)
    this.setState({selectedRowKeys:[],selectedRows:''});
  }
  onSelectChange = (selectedRowKeys,selectedRows) => {
    this.setState({selectedRowKeys,selectedRows})
  }
  addContractModal = () => {
    return <ContractModal title='新增合同'
                          addFnc={this.props.addFnc}
                          customerList={this.props.customerList}
                          refreshData={this.refreshData}
                          cancel={()=>this.setState({contractModal:''})}/>
  }
  editContractModal = () => {
    return <ContractModal title='编辑合同'
                          editFnc={this.props.editFnc}
                          edit={true}
                          record={this.state.selectedRows[0]}
                          customerList={this.props.customerList}
                          refreshData={this.refreshData}
                          cancel={()=>this.setState({contractModal:''})}/>
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
                                删除后将解除与发票关联，确认删除？
                                </div>
                                <div>
                                  <Button onClick={()=>{this.setState({deleteModal:''})}} style={{marginRight:20}}>取消</Button>
                                  <Button type="primary" onClick={()=>{
                                    const param = {
                                      ids:this.state.selectedRowKeys.join(','),
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
      title: '合同编号',
      key:'con_num',
      dataIndex: 'con_num',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'con_num' && sortedInfo.order,
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '购方名称',
      key:'gfmc',
      dataIndex: 'gfmc',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'gfmc' && sortedInfo.order,
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '销方名称',
      key:'xfmc',
      dataIndex: 'xfmc',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'xfmc' && sortedInfo.order,
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '合同日期',
      key:'con_date',
      dataIndex: 'con_date',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'con_date' && sortedInfo.order,
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '合同金额',
      key:'con_amount',
      dataIndex: 'con_amount',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'con_amount' && sortedInfo.order,
      render:(text)=><div>{text?zhMoney(text):'---'}</div>
    },{
      title: '关联发票数量',
      key:'inv_count',
      dataIndex: 'inv_count',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'inv_count' && sortedInfo.order,
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '关联发票总金额',
      key:'inv_amount',
      dataIndex: 'inv_amount',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'inv_amount' && sortedInfo.order,
      render:(text)=><div>{text?zhMoney(text):'---'}</div>
    },{
      title: '合同关联放款金额',
      key:'dd_amount',
      dataIndex: 'dd_amount',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'dd_amount' && sortedInfo.order,
      render:(text)=><div>{text?zhMoney(text):'---'}</div>
    },{
      title: '借据编号',
      key:'debt_nums',
      dataIndex: 'debt_nums',
      render:(text)=>{
        return <div>
                {
                  text&&text.length>0?
                  <div>
                  {
                    text.map((item,index)=>{
                      return <div key={index}>{item}</div>
                    })
                  }
                  </div>:
                  '---'
                }
               </div>
      }
    }];
    const { contractList,loading,getDrawdownDetail } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return(
        <div style={{overflow:'hidden',width:'100%'}}>
          <div style={{margin:'10px 0 60px 0'}}>
            <div style={{overflow:'hidden',marginBottom:10}}>
              <Button type='primary' onClick={()=>this.setState({contractModal:this.addContractModal()})} style={{float:'right'}}>新增合同</Button>
            </div>
            {
              this.props.showTable && 
              <Table pagination={false}
                     rowKey='id'
                     columns={columns}
                     rowSelection={rowSelection}
                     selectedRowKeys={selectedRowKeys}
                     loading={loading}
                     dataSource={contractList.list}
                     onChange={(pagination, filters, sorter)=>{
                       if(sorter.field){
                         const val = sorter.order === "ascend" ? 1: -1;
                         this.setState({sortedInfo:sorter},()=>{
                           this.props.setOrderFnc(sorter.field,val);
                          });
                       }
                     }}
                     onRowClick={(record)=>{
                       this.props.getContractDetail(record.id,(res)=>{
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
                      this.props.exportContract(param,()=>{
                        this.refreshData()
                      });
                    }}
                    type="primary"
                    disabled={selectedRowKeys.length===0}
                    >
              导出
            </Button>
            <Button style={{float:"left",marginRight:20}}
                    onClick={()=>this.setState({contractModal:this.editContractModal()})}
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
              <Pagination total={contractList.count}
                          style={{float:'right'}}
                          current={this.props.state.page}
                          onChange={(page)=>{
                            this.props.setPageFnc(page);
                          }}/>
                      }
          </BottomPage>
          {this.state.contractModal}
          {this.state.deleteModal}
        </div>
    )
  }
}

export default ContractManageTable
