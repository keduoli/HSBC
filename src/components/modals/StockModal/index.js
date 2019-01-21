
import React from 'react'
import {Button,Modal,message,Icon,Table,Tree,Radio,Pagination,Select,Checkbox,Input} from 'antd'
import styled from 'styled-components'
import { InvoiceStockTable } from 'components'
import { Link } from 'react-router'
const Search = Input.Search;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
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
  background:#fff;
  position:relative;
  bottom:0px;
  right:0px;
  height:60px;
  z-index:100;
  padding:20px 20px 0 20px;
  box-sizing:border-box;
	overflow:hidden;
  -webkit-transition: all .2 ease;
  transition: all .2s ease;
  left:0;
`;
class StockModal extends React.Component{
  state = {
    showInfo:false,
    buy_time:'',
    page:1,
    size:10,
    selectId:'',
    category:this.props.pap?'04,01':'10',
    selectedRowKeys:[],
    record:[],
    disk_num:'',
    repertroyList:this.props.repertroyList,
    loading:false
  }
  componentWillUpdate(nextProps,nextState){
    const { buy_time,page,size,category,disk_num } = nextState;
    const next = this.state;
    if(next.buy_time !== buy_time || next.page !== page || next.category !== category || next.disk_num !== disk_num){
      const param = {
        buy_time:buy_time,
        page:page,
        category:category,
        size:10,
        disk_num:disk_num
      }
      this.setState({loading:true})
      this.props.getData(param,(res)=>{
        this.setState({repertroyList:res,loading:false})
      })
    }
  }
  onSelectChange = (selectedRowKeys,selectedRows) => {
    this.setState({record:selectedRows,selectedRowKeys:selectedRowKeys})
  }
  setStock = () => {
    const _this = this;
    if(this.state.record.length === 0){
      message.warning("请选择发票库存");return;
    }
    if(this.props.settingList[0] && this.props.settingList[0].tax_rate){
      let arr = this.props.settingList[0].tax_rate.split(',');
      for(let i in arr){
        if(arr[i].split("")[0] === '1' && (this.state.record[0].category == '01' || this.state.record[0].category == '02' || this.state.record[0].category == '03')){
          message.warning("小规模纳税人不能开具专票");return;
        }
      }
    }
    if(this.props.settingList && this.props.settingList[0].quota && this.state.record[0].num_end - this.state.record[0].num_begin < this.props.settingList[0].quota){
      Modal.error({
        title: '发票预警',
        content: (
          <div>
            <p>当前发票类型余量不足{this.props.settingList[0].quota}张，请尽快购买，如有问题，请更新费耘发票库存</p>
          </div>
        ),
        okText:'知道了',
        onOk() {
          _this.props.setStock(_this.state.record)
          _this.props.cancelModal()
        }
      })
    }else{
      this.props.setStock(this.state.record)
      this.props.cancelModal()
    }
  }
  setSelect = (record) => {
    this.setState({selectId:record.id})
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
      title: '发票种类',
      key:'category',
      dataIndex: 'category',
      render:(text,record,index)=>{
        return  (
          <div>
            {
             ( text === '10' || text === '14' ) && 
             <div>
              <p style={{overflow:'hidden',float:'left'}}>
                <DianSpan/>
              </p>
             </div> 
            }
            {
             ( text === '04' || text === '11' ) && 
             <div>
              <p style={{overflow:'hidden',float:'left',marginRight:10}}>
                <PuSpan/>
              </p>
             </div> 
            }
            {
             ( text === '01' || text === '02' || text === '03' ) && 
             <div>
              <p style={{overflow:'hidden',float:'left'}}>
                <ZhuanSpan/>
              </p>
             </div> 
            }
          </div>
        )
      }
    },{
      title: '开票限额',
      key:'amount',
      dataIndex: 'amount',
      render:(text)=>{
        return <div>{text-0.01}</div>
      }
    },{
      title: '发票代码',
      key:'code',
      dataIndex: 'code',
    },{
      title: '起始号码',
      key:'num_begin',
      dataIndex: 'num_begin',
    },{
      title: '终止号码',
      key:'num_end',
      dataIndex: 'num_end',
    },{
      title: '领购张数',
      key:'quantity',
      dataIndex: 'quantity',
    },{
      title: '剩余张数',
      key:'remainder',
      dataIndex: 'remainder',
    },{
      title: '购买日期',
      key:'buy_time',
      dataIndex: 'buy_time',
    },{
      title: '分机号',
      key:'disk_num',
      dataIndex: 'disk_num',
    }];
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      hideDefaultSelections:true,
      type:'radio',
      onChange: this.onSelectChange,
    }
    const { repertroyList,getData,loading } = this.state;
    return (
      <Modal  title={<TitleSpan>选择发票库存</TitleSpan>}
              style = {{top:100}}
              visible
              className='coding-modal'
              width={1200}
              onCancel={this.props.cancelModal}
              maskClosable={false}
              footer={null}>
        <div style={{padding:20}}>
          <div style={{overflow:'hidden',paddingBottom:10}}>
            <Search style={{width:180,float:'right'}}
                    placeholder='请输入分机号'
                    onSearch={(value)=>this.setState({disk_num:value})}
                    onPressEnter={(e)=>this.setState({disk_num:e.target.value})}/>
          </div>
          <div className="invoice-manage-table">
            <Table columns={columns} 
                  dataSource={repertroyList.rows}
                  loading={loading}
                  pagination={false}
                  rowSelection={rowSelection}
                  selectedRowKeys={selectedRowKeys}
                  onRowClick={(record)=>{
                    this.setSelect(record)
                    this.setState({record:[record],selectedRowKeys:[record.id]})
                  }}
                  rowKey='id'
                  />
          </div>
          <div style={{overflow:'hidden',lineheight:2,padding:'20px 5px',color:'#FF7E7E'}}>
            注：<br/>
            1、该发票代码与起始号码根据发票库存信息推算<br/>
            2、如与实际信息不符，不用担心，发票开具出来后将自动更新发票信息和库存信息<br/>
            3、建议开票软件中的库存信息与费耘保持一致
          </div>
          <div style={{overflow:'hidden',width:'100%',display:'flex',justifyContent:'space-between'}}>
            <div/>
            <div>
              <Button type='primary' style={{width:115,marginRight:20}} onClick={this.props.cancelModal}><Link to='invoicesstock'>新增库存</Link></Button>
              <Button type='primary' style={{width:115}} onClick={this.setStock}>确定</Button>
            </div>
            <Pagination total={repertroyList.count}
                        size="small"
                        style={{float:'right'}}
                        current={this.state.page}
                        onChange={(page, pageSize)=>{
                          this.setState({page:page})
                        }}
            />
          </div>
        </div>
      </Modal>      
    )
  }
}

export default StockModal;
      