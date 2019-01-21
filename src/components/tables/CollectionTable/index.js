import React from 'react';
import { Table, Button, Pagination, Modal, message, Radio, Checkbox } from 'antd';
import styled from 'styled-components';
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const RadioGroupCon = styled.div`
  overflow:hidden;
  font-size:12px;
  margin:10px 0 0 40px;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:40px;
  color:#fff;
  display:inline-block;
  line-height:40px;
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
const RadioTab = styled.div`
  float:left;
  margin-right:8px;
  width:72px;
  text-align:right;
`;
class CollectionTable extends React.Component{
  state={
    selectedRowKeys:'',
    showModal:'',
    page:1,
    size:10,
    target_id:'',
    addComanyModal:'',
    companyRowKeys:'',
    confirmModal:'',
    editModal:'',
    source:'',
    tax_type:'',
  }
  onSelectChange = (selectedRowKeys,selectedRows) => {
    this.setState({selectedRowKeys})
  }
  onCompanyChange =  (selectedRowKeys,selectedRows) => {
    this.setState({companyRowKeys:selectedRowKeys},()=>{
      this.addComany()
    })
  }
  sourceChange = (e) => {
    this.setState({source:e.target.value},()=>{
      this.editFnc()
    })
  }
  typeChange = (e) => {
    this.setState({tax_type:e})
  }
  editFnc = () => {
    this.setState({
      editModal:<Modal title={<TitleSpan>编辑提示</TitleSpan>}
                       style = {{textAlign:'center',top:55}}
                       visible
                       width={400}
                       onCancel={()=>{
                         this.setState({editModal:'',tax_type:'',source:''})
                       }}
                       footer={null}>
                  <div style={{overflow:'hidden',marginBottom:20}}>
                    <RadioGroupCon>
                      <RadioTab>发票来源：</RadioTab>
                      <RadioGroup style={{float:'left'}} onChange={this.sourceChange}>
                        <Radio value='0'>在线开具</Radio>
                        {this.props.navList.plugin.monitor && <Radio value='1'>客户端采集</Radio>}
                      </RadioGroup>
                    </RadioGroupCon>
                    {
                      this.state.source!=='1'&&
                      <RadioGroupCon>
                        <RadioTab>发票类型：</RadioTab>
                        <CheckboxGroup className='scoure-check' onChange={this.typeChange}>
                          <Checkbox value='2'>电子发票</Checkbox>
                          <Checkbox value='1'>纸质发票</Checkbox>
                        </CheckboxGroup>
                      </RadioGroupCon>
                    }
                  </div>
                  <div style={{overflow:'hidden',display:'flex',justifyContent:'center'}}>
                    <Button style={{float:'left',marginRight:20}} onClick={()=>this.setState({editModal:'',tax_type:'',source:''})}>取消</Button>
                    <Button type='primary' style={{float:'left'}} onClick={()=>{
                      const param = {
                        source:this.state.source,
                        tax_type:'',
                        target_ids:this.state.selectedRowKeys+'',
                      }
                      if(this.state.source === ''){
                        message.warning("请选择发票来源");return;
                      }
                      if(this.state.source !== '1'){
                        if(this.state.tax_type === ''){
                          message.warning("请选择开具类型");return;
                        }
                        param['tax_type'] = this.state.tax_type+"";
                      }else{
                        delete param['tax_type']
                      }
                      this.props.editFnc(param,()=>{
                        this.refreshData()
                        this.setState({editModal:'',tax_type:'',source:''})
                      })
                    }}>保存</Button>
                  </div>
                </Modal>
    })
  }
  seeContacts = (res) => {
    const columns = [{
      title: '人员名称',
      key:'realname',
      dataIndex: 'realname',
    },{
      title: '电话',
      key:'telephone',
      dataIndex: 'telephone',
      render:(text)=><div>{text?text:'---'}</div>
    }]
    this.setState({showModal:<Modal title={<TitleSpan>企业人员</TitleSpan>}
                                    style = {{textAlign:'center',top:55}}
                                    visible
                                    width={400}
                                    onCancel={()=>{
                                      this.setState({showModal:'',target_id:""})
                                    }}
                                    footer={null}>
                                <Table columns={columns}
                                       dataSource={res.rows}
                                       pagination={false}
                                       rowKey={(r,i)=>(i)}/>
                                <div style={{overflow:'hidden',marginTop:10}}>
                                  <Pagination total={res.count}
                                              style={{float:'right'}}
                                              current={this.state.page}
                                              defaultPageSize={6}
                                              onChange={(page, pageSize)=>{
                                                this.setState({page:page})
                                                this.props.getContactList({
                                                  target_id:this.state.target_id,
                                                  page:page,
                                                  size:6
                                                },(res)=>{
                                                  this.seeContacts(res)
                                                })
                                              }}
                                  />
                                </div>
                             </Modal>})
  }
  componentWillReceiveProps(nextProps){
    const { page,tax_number,name,source,state } = this.props.state;
    const next = nextProps.state;
    if(next.page !== page || next.tax_number !== tax_number || next.name !== name || next.source !== source || next.state !== state){
      const param = {
        page:next.page,
        tax_number:next.tax_number,
        name:next.name,
        size:10,
        source:next.source,
        state:next.state,
      }
      this.props.getData(param)
    }
  }
  refreshData = () => {
    const {state} = this.props;
    const param={
      tax_number:state.tax_number,
      name:state.name,
      size:10,
      page:state.page,
      state:state.state,
      source:state.source,
    };
    this.setState({selectedRowKeys:[]});
    this.props.getData(param);
  }
  render(){
    const columns = [{
      title: '企业名称',
      key:'name',
      dataIndex: 'name',
    },{
      title: '纳税人识别号',
      key:'tax_number',
      dataIndex: 'tax_number',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '发票来源',
      key:'source',
      dataIndex: 'source',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '可开具发票种类',
      key:'tax_type',
      dataIndex: 'tax_type',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '采集客户端状态',
      key:'state',
      dataIndex: 'state',
      render:(text,record,index)=>{
        return  (
          <div>
            {text === '未登录' && <div style={{color:'#D0021B'}}>{text}</div>}
            {text === '登录中' && <div style={{color:'#2397CA'}}>{text}</div>}
          </div>
        )
      }
    },{
      title: '企业联系人',
      key:'fpqh',
      dataIndex: 'fpqh',
      render:(text,record)=>{
        return <div style={{color:'#4A90E2',cursor:'pointer'}} onClick={()=>{
          this.setState({
            target_id:record.id,
            page:1,
          })
          this.props.getContactList({
            target_id:record.id,
            page:1,
            size:6
          },(res)=>{
            this.seeContacts(res)
          })
        }}>查看</div>
      }
    }]
    const { monitorList,loading } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return(
        <div style={{overflow:'hidden'}}>
          <div style={{width:'100%',overflow:'hidden',height:50,lineHeight:'50px'}}>
            <div style={{float:'left',fontSize:12,color:'#666666'}}>采用客户端采集方式的公司将无法在费耘网页端开具纸质和电子发票</div>
            <Button type='primary' style={{margin:'11px 15px 0 15px',float:'right'}} onClick={()=>this.refreshData()}>刷新</Button>
          </div>
          <div className="invoice-manage-table" style={{marginBottom:60}}>
            <Table columns={columns} 
                   rowSelection={rowSelection}
                   selectedRowKeys={selectedRowKeys}
                   loading={loading}
                   dataSource={monitorList&&monitorList.rows}
                   pagination={false}
                   rowKey='id'
            />
          </div>
          <BottomPage style={{left:this.props.collectionStop?'75px':'210px'}}>
            <Button type='primary' disabled={selectedRowKeys.length===0} onClick={this.editFnc}>编辑</Button>
            <Pagination total={monitorList&&monitorList.count}
                        style={{float:'right'}}
                        current={this.props.state.page}
                        onChange={(page, pageSize)=>{
                          this.props.setPageFnc(page);
                        }}
            />
          </BottomPage>
          {this.state.showModal}
          {this.state.editModal}
          {this.state.confirmModal}
        </div>
    )
  }
}

export default CollectionTable
