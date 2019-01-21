import React from 'react';
import { Table,Button,Pagination,Modal,Checkbox } from 'antd';
import styled from 'styled-components';
const TitleSpan = styled.span`
  fontSize:13px;
  height:100px;
  color:#fff;
  display:inline-block;
  line-height:100px;
`;
const ErSpan = styled.span`
  width:8px;
  height:8px;
  border-radius:50%;
  background:red;
  display:inline-block;
  margin-right:5px;
`;
const SuSpan = styled.span`
  width:8px;
  height:8px;
  border-radius:50%;
  background:#25c325;
  display:inline-block;
  margin-right:5px;
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
class MessageTable extends React.Component{
  state={
    selectedRowKeys:[],
  }
  componentWillReceiveProps(nextProps){
    const { page,is_read } = this.props.state;
    const next = nextProps.state;
    if( next.page !== page || next.is_read !== is_read){
      const param = {
        page:next.page,
        size:10,
        is_read:next.is_read,
      }
      this.props.getMessage(param)
    }
  }
  refreshData = () => {
    const {state} = this.props;
    const param = {
      page:state.page,
      size:10,
      is_read:state.is_read,
    };
    this.props.getMessage(param)
    this.setState({selectedRowKeys:[]})
  }
  onSelectChange = (selectedRowKeys,selectedRows) => {
    this.setState({selectedRowKeys})
  }
  deleteFnc = () => {
    this.setState({
      deleteModal:<Modal  title={<TitleSpan>删除确认</TitleSpan>}
                          style = {{textAlign:'center',top:200}}
                          visible
                          width={400}
                          onCancel={()=>this.setState({deleteModal:''})}
                          footer={null}>
                      <div>
                        <div style={{margin:'0 0 15px 50px',textAlign:'center',fontSize:13}}>删除后消息将无法恢复，您确定要删除吗？</div>
                        <div style={{overflow:'hidden',display:'flex',justifyContent:'center'}}>
                          <Button style={{float:'left',marginRight:20}} onClick={()=>this.setState({deleteModal:''})}>取消</Button>
                          <Button type='primary' style={{float:'left'}} onClick={()=>{
                            const param = {
                              list_id:this.state.selectedRowKeys.join(','),
                              action:1
                            }
                            this.props.messageAction(param,()=>{
                              this.refreshData()
                              this.setState({deleteModal:''})
                            })
                          }}>确定</Button>
                        </div>
                      </div>
                  </Modal>
    })
  }
  showDetail = (record) => {
    this.setState({
      detailModal:<Modal  title={<TitleSpan>消息详情</TitleSpan>}
                          style={{top:100}}
                          visible
                          width={400}
                          onCancel={()=>this.setState({detailModal:''})}
                          footer={null}>
                      <div>
                        <div style={{marginBottom:20,textAlign:'center',fontSize:13}}>进项发票自动签收失败</div>
                        <div style={{margin:'0 0 15px 50px',fontSize:13}}>失败原因：{record.error_msg?record.error_msg:'---'}</div>
                        <div style={{margin:'0 0 15px 50px',fontSize:13}}>发票代码：{record.fpdm}</div>
                        <div style={{margin:'0 0 15px 50px',fontSize:13}}>发票号码：{record.fphm}</div>
                        <div style={{margin:'0 0 15px 50px',fontSize:13}}>开票日期：{record.kprq&&record.kprq.split(" ")[0]}</div>
                        <div style={{margin:'0 0 15px 50px',fontSize:13}}>税前金额：{record.je}</div>
                        <div style={{margin:'0 0 15px 50px',fontSize:13}}>操作人：{record.user_name}</div>
                        <div style={{margin:'0 0 15px 50px',fontSize:13}}>操作时间：{record.scan_date}</div>
                        <div style={{margin:'10px 0 25px 50px',fontSize:13}}>
                          温馨提示：<br/>
                          1、请您次日再次尝试手动签收发票<br/>
                          2、检查该发票是否为可认证发票
                        </div>
                        <div style={{overflow:'hidden',display:'flex',justifyContent:'center'}}>
                          <Button style={{float:'left',marginRight:20}} onClick={()=>this.setState({detailModal:''})}>返回</Button>
                          <Button type='primary' style={{float:'left'}} onClick={()=>{
                            const param = {
                              list_id:record.id,
                              action:1  
                            }
                            this.props.messageAction(param,()=>{
                              this.refreshData()
                              this.setState({detailModal:''})
                            })
                          }}>删除</Button>
                        </div>
                      </div>
                  </Modal>
    })
  }
  checkChange = (e) => {
    if(e.target.checked === true){
      this.props.setReadFnc(1)
      this.props.setPageFnc(1)
    }else{
      this.props.setReadFnc('')
      this.props.setPageFnc(1)
    }
  }
  render(){
    const columns = [{
      title: '费耘消息',
      key:'info',
      dataIndex: 'info',
      render:(text,record)=>{
        return(
          <div style={{width:'100%',height:'100%'}}>{record.is_read === 1 ? <ErSpan/> : <SuSpan/>}进项发票签收失败，发票代码{record.fpdm}，发票号码{record.fphm}。</div>
        )
      }
    },{
      title: '操作时间',
      key:'scan_date',
      dataIndex: 'scan_date',
    }]
    const { loading,messageList } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return(
        <div style={{margin:'30px 0 60px 0'}}>
          <div style={{overflow:'hidden',width:'100%',marginBottom:15}}><Checkbox onChange={this.checkChange} style={{float:'right'}}>未读</Checkbox></div>
          <div className="invoice-manage-table">
            <Table columns={columns}
                   pagination={false}
                   dataSource={messageList.rows}
                   rowClassName={(record, index)=>{
                    return (record.is_read === 0 ? 'not-click':'')
                   }}
                   selectedRowKeys={selectedRowKeys}
                   rowSelection={rowSelection}
                   loading={loading}
                   onRowClick={(record)=>{
                     this.showDetail(record)
                   }}
                   rowKey='id'
                   />
          </div>
          <BottomPage style={{left:0}}>
            <Button type="primary"
                    style={{marginRight:10,float:"left"}}
                    disabled={selectedRowKeys.length === 0}
                    onClick={()=>{
                      const param = {
                        list_id:selectedRowKeys.join(','),
                        action:0
                      }
                      this.props.messageAction(param,()=>{
                        this.refreshData()
                      })
                    }}
            >标为已读</Button>
            <Button style={{marginRight:10,float:"left"}}
                    disabled={selectedRowKeys.length === 0}
                    onClick={()=>{
                      this.deleteFnc()
                    }}
            >删除</Button>
            <Pagination total={messageList.count}
                        style={{float:'right'}}
                        current={this.props.state.page}
                        onChange={(page, pageSize)=>{
                          this.props.setPageFnc(page);
                        }}
            />
          </BottomPage>
          {this.state.detailModal}
          {this.state.deleteModal}
        </div>
    )
  }
}

export default MessageTable
