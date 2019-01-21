import React from 'react';
import { Table, Button, Pagination, message, Modal, Select } from 'antd';
import styled from 'styled-components';
import { apiUrl } from 'config';

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
class CodeOpeningTable extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedRowKeys:[],
    }
    this.selectAmountArr = [];
  }
  componentWillReceiveProps(nextProps){
    const {page,kjzt,orderno,ordertime } = this.props.state;
    const next = nextProps.state;
    if(next.page !== page || kjzt !== next.kjzt || orderno !== next.orderno || ordertime !== ordertime){
      const param = {
        size:10,
        page:next.page,
        kjzt:next.kjzt,
        orderno:next.orderno,
        ordertime:next.ordertime,
      };
      this.props.getData(param)
    }
  }
  refreshData = () => {
    const {state} = this.props;
    const param = {
      size:10,
      page:state.page,
      kjzt:state.kjzt,
      orderno:state.orderno,
      ordertime:state.ordertime,
    };
    this.props.getData(param)
    this.setState({selectedRowKeys:[]});
  }
  render(){
    const columns = [{
      title: '序号',
      key:'xh',
      dataIndex: 'xh',
      render:(text,record,index)=>{
        return <div>{index+1}</div>
      }
    },{
      title: '发票序列号',
      key:'number',
      dataIndex: 'number',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '订单号',
      key:'orderno',
      dataIndex: 'orderno',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '订单日期',
      key:'ordertime',
      dataIndex: 'ordertime',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '商品名称',
      key:'name',
      dataIndex: 'name',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '订单金额',
      key:'jshj',
      dataIndex: 'jshj',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '发票开具状态',
      key:'kjzt',
      dataIndex: 'kjzt',
      render:(text)=>{
        return <div>
                {text === 0 && '待开具'}
                {text === 1 && '开具中'}
                {text === 2 && '开具成功'}
                {text === 3 && '开具失败'}
                {text === null && '---'}
              </div>
      }
    }];
    const { orderList,loading } = this.props;
    return(
        <div style={{overflow:'hidden',width:'100%'}}>
          <div style={{margin:'30px 0 60px 0'}}>
            <Table pagination={false}
                   rowKey='id'
                   columns={columns}
                   loading={loading}
                   dataSource={orderList.orders}/>
          </div>
          <BottomPage style={{left:this.props.collectionStop?'75px':'210px'}}>
            <Pagination total={orderList.count}
                        style={{float:'right'}}
                        current={this.props.state.page}
                        onChange={(page, pageSize)=>{
                          this.props.setPageFnc(page);
                        }}/>
          </BottomPage>
        </div>
    )
  }
}

export default CodeOpeningTable
