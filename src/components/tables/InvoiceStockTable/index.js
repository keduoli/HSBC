import React from 'react';
import { Table, Button, Pagination, Modal, Input, message } from 'antd';
import styled from 'styled-components';
import { RegisterModal } from 'components'
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
const FilButton = styled(Button)`
  width:105px;
  height:30px;
  float:right;
  margin-left:20px;
`;
const EditSpan = styled.span`
  color: #108ee9;
  margin-right: 10px;
  cursor: pointer;
`;
const DeleteSpan = styled.span`
  cursor: pointer;
`;
class InvoicesQueryTable extends React.Component{
  state={
    waringModal:'',
    registerModal:'',
    quota:'',
    selectId:'',
    deleteModal:''
  }
  showRegisterModal = () => {
    this.setState({
      registerModal:<RegisterModal cancel={()=>this.setState({registerModal:''})}
                                   addRepertroy={this.props.addRepertroy}
                                   refreshData={this.refreshData}
                                   title='新增发票购入登记'
                                   settingList={this.props.settingList}/>
    })
  }
  showWaringModal = () => {
    this.setState({waringModal:<Modal  title={<TitleSpan>发票库存预警设置</TitleSpan>}
                                        style = {{textAlign:'center',top:200}}
                                        onCancel={()=>this.setState({waringModal:''})}
                                        visible
                                        width={800}
                                        maskClosable={false}
                                        footer={null}>
                                  <div style={{margin:'10px 0 40px',textAlign:'center'}}>
                                    剩余张数：<Input defaultValue={this.props.settingList[0].quota} placeholder='请输入正整数' onChange={(e)=>this.setState({quota:e.target.value})} style={{width:200}}/>
                                    <div style={{marginTop:20,color:"#FF7E7E",fontSize:13}}>注：当发票剩余量低于您输入的设定值，在发票开具页面将会向您提醒</div>
                                  </div>
                                  <div>
                                    <Button onClick={()=>{this.setState({waringModal:''})}} style={{marginRight:20}}>取消</Button>
                                    <Button type="primary" onClick={()=>{
                                      const reg = /^[1-9]\d*$/;
                                      if(this.state.quota === '' ){
                                        message.warning("请输入剩余张数");return;
                                      }
                                      if(!reg.test(this.state.quota)){
                                        message.warning("请输入正整数");return;
                                      }
                                      const param = {
                                        quota:this.state.quota
                                      }
                                      this.props.addQuota(param,()=>{
                                        this.props.showSetting()
                                        this.setState({waringModal:''})
                                      })
                                    }}>确定</Button>
                                  </div>
                                  </Modal>})
  }
  componentWillReceiveProps(nextProps){
    const { buy_time,page,size,category } = this.props.state;
    const next = nextProps.state;
    if(next.buy_time !== buy_time || next.page !== page || next.category !== category){
      const param = {
        buy_time:next.buy_time,
        page:next.page,
        category:next.category,
        size:10,
      }
      this.props.getData(param)
    }
  }
  refreshData = () => {
    const {state} = this.props;
    const param={
      buy_time:state.buy_time,
      page:state.page,
      category:state.category,
      size:10,
    };
    this.props.getData(param);
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
      title: '领购日期',
      key:'buy_time',
      dataIndex: 'buy_time',
    },{
      title: '分机号',
      key:'disk_num',
      dataIndex: 'disk_num',
    },{
      title: '操作',
      key:'action',
      render:(text, record, index)=>(
          <p>
            <EditSpan onClick={()=>{
              this.setState({
                registerModal:<RegisterModal cancel={()=>this.setState({registerModal:''})}
                                             editRepertroy={this.props.editRepertroy}
                                             refreshData={this.refreshData}
                                             record={record}
                                             edit={true}
                                             title='编辑发票库存'
                                             settingList={this.props.settingList}/>
              })
            }}>编辑</EditSpan>
            <DeleteSpan onClick={()=>{
              this.setState({
                deleteModal:<Modal  title={<TitleSpan>删除提示</TitleSpan>}
                                    style = {{textAlign:'center',top:100}}
                                    visible
                                    width={400}
                                    onCancel={()=>this.setState({deleteModal:''})}
                                    maskClosable={false}
                                    footer={null}>
                                <div style={{marginBottom:30}}>确定删除该条发票库存信息么？</div>
                                <Button style={{marginRight:30}} onClick={()=>this.setState({deleteModal:''})}>取消</Button>
                                <Button type="primary" onClick={()=>{
                                  const param = {
                                    repertoryid:record.id
                                  }
                                  this.props.delRepertroy(param,()=>{
                                    this.setState({deleteModal:''})
                                    this.refreshData()
                                  })
                                }}>确定</Button>
                            </Modal>
              })
            }}>删除</DeleteSpan>
          </p>
        )
    }]
    const { repertroyList,loading } = this.props;
    return(
        <div style={{margin:'15px 0 20px 0'}}>
          <div style={{overflow:'hidden',marginBottom:15}}>
            <FilButton type='primary' onClick={()=>this.showRegisterModal()}>购入登记</FilButton>
            <FilButton type='primary' onClick={this.showWaringModal}>库存预警设置</FilButton>
          </div>
          <div className="invoice-manage-table">
            <Table columns={columns} 
                   dataSource={repertroyList.rows}
                   loading={loading}
                   pagination={false}
                   rowKey='id'
                   />
          </div>
          <BottomPage style={{left:this.props.collectionStop?'75px':'210px'}}>
            <Pagination total={repertroyList.count}
                        style={{float:'right'}}
                        current={this.props.state.page}
                        onChange={(page, pageSize)=>{
                          this.props.setPageFnc(page);
                        }}
            />
          </BottomPage>
          {this.state.waringModal}
          {this.state.registerModal}
          {this.state.deleteModal}
        </div>
    )
  }
}

export default InvoicesQueryTable
