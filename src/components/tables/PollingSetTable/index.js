import React, { Component } from 'react';
import styled from 'styled-components'
import { Table,Button,Pagination,Modal } from 'antd';
import {PollingSetModal} from 'components';
const BtnConDiv = styled.div`
  height: 40px;
`;
const TableConDiv = styled.div`
  padding: 10px 10px 30px 10px;
  background: #fff;
`;
const AddAreaDiv = styled.div`
  width: 392px;
  height: 120px;
  border: 1px dashed #3887ff;
  border-radius: 16px;
  text-align: center;
  line-height: 120px;
  color: #3887ff;
  margin: 0 auto;
  cursor: pointer;
`;
const AreaConDiv = styled.div`
  height: 100%;
  width: 100%;
  background: #fff;
  padding: 100px 0;
`;
const EditSpan = styled.span`
  color: #108ee9;
  margin-right: 10px;
  cursor: pointer;
`;
const DeleteSpan = styled.span`
  cursor: pointer;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const BottomPage = styled.div`
  background:#f7f7f7;
  position:fixed;
  bottom:0px;
  right:0px;
  padding:16px 18px;
  overflow:hidden;
  -webkit-transition: all .2 ease;
  transition: all .2s ease;
`;
class PollingSetTable extends Component {
  constructor(props){
    super(props);
    this.state={
      pollingModal:'',
      deleteModal:''
    }
    this.columns = [{
      title: '销方名称',
      key:'xfmc',
      render:(text)=>{
        return <div>{text.xfmc?text.xfmc:'---'}</div>
      }
    },{
      title: '开票日期',
      key:'kprq',
      render:(text)=>{
        return <div>{text.kprq_begin?text.kprq_begin:'---'}至{text.kprq_end?text.kprq_end:'---'}</div>
      }
    },{
      title: '价税区间',
      key:'jsqj',
      render:(text)=>{
        return <div>{text.jshj_min?text.jshj_min:'---'}至{text.jshj_max?text.jshj_max:'---'}</div>
      }
    },{
      title: '生效方式',
      key:'sqfs',
      render:(text)=>{
        return <div>
                {text.effect_way===1&&'任一'}
                {text.effect_way===-1&&'所有'}
                {text.effect_way===null&&'---'}
                </div>
      }
    },{
      title: '轮询状态',
      key:'lxzt',
      render:(text)=>{
        return <div>
                {text.is_polling===2&&"全部"}
                {text.is_polling===1&&"已轮询"}
                {text.is_polling===0&&"未轮询"}
                </div>
      }
    },{
      title: '定时周期',
      key:'timer_period',
      render:(text)=>{
        return <div>
                {text.timer_period==='d'&&'日'}
                {text.timer_period==='m'&&'月'}
                {text.timer_period==='w'&&'周'}
               </div>
      }
    },{
      title: '周期时间',
      key:'zqsj',
      render:(text)=>{
        return(
          <div>{text.timer_day==='last'?'月末':text.timer_day}</div>
        )
      },
    },{
      title: '操作',
      key:'action',
      render: (text, record) => {
        return (<p><EditSpan onClick={()=>this.setState({
                              pollingModal:<PollingSetModal cancel={()=>this.setState({pollingModal:''})}
                                                            xfmcList={this.props.xfmcList}
                                                            page={this.state.page}
                                                            record={record}
                                                            edit={true}
                                                            editPollingTask={this.props.editPollingTask}
                                                            addPollingTask={this.props.addPollingTask}
                                                            getPollingTask={this.props.getPollingTask}
                                          />
        })}>编辑</EditSpan>
        <DeleteSpan onClick={()=>this.deletePolling(record)}>删除</DeleteSpan></p>)
      },
    }];
  }
  deletePolling = (record) => {
    this.setState({
      deleteModal:<Modal title={<TitleSpan>删除提示</TitleSpan>}
                        style = {{textAlign:'center',top:200}}
                        closable={false}
                        visible
                        width={400}
                        maskClosable={false}
                        footer={null}
                  >
                  <div style={{margin:'20px 0 30px',fontSize:13,lineHeight:2}}>
                    <p>确定要删除这条定时任务吗？</p>
                  </div>
                  <div>
                    <Button onClick={()=>{this.setState({deleteModal:''})}} style={{marginRight:20}}>取消</Button>
                    <Button type="primary"
                            onClick={()=>{
                              const params = {
                                id:record.id,
                              }
                              const len = this.props.pollingTaskList.list.length;
                              if(len==1&&this.props.page>1){
                                this.props.deletePollingTask(params,()=>{
                                  const page = this.props.page-1;
                                  const param = {
                                    page:page,
                                  }
                                  this.props.getPollingTask(param);
                                  this.setState({deleteModal:''});
                                })
                              }else{
                                this.props.deletePollingTask(params,()=>{
                                  const param = {
                                    page:this.props.page
                                  }
                                  this.props.getPollingTask(param);
                                  this.setState({deleteModal:''});
                                })
                              }
                            }}
                    >确定</Button>
                  </div>
                  </Modal>
    })
  }
  setPollingModal = () => {
    this.setState({
      pollingModal:<PollingSetModal cancel={()=>this.setState({pollingModal:''})}
                                    xfmcList={this.props.xfmcList}
                                    page={this.props.page}
                                    addPollingTask={this.props.addPollingTask}
                                    getPollingTask={this.props.getPollingTask}
                  />
    })
  }
  componentWillReceiveProps(next){
    if(this.props.page!==next.page){
      this.props.getPollingTask({page:next.page})
    }
  }
  render(){
    const {pollingTaskList,loading} = this.props;
    return(
      <div className="blacklist_table_con">
        <BtnConDiv>
          <Button type="primary"
                  style={{float:"right",marginRight:10}}
                  onClick={this.setPollingModal}
                  >+  添加定时任务</Button>
        </BtnConDiv>
        <TableConDiv>
          <Table  rowKey="id"
                  columns={this.columns}
                  dataSource={pollingTaskList.list}
                  loading={loading}
                  pagination={false}
                  >
          </Table>
        </TableConDiv>
				<BottomPage style={{left:this.props.collectionStop?'75px':'210px'}}>
          <Pagination style={{float:'right',marginRight:30}}
                      total={pollingTaskList.total}
                      count={this.state.page}
                      onChange={(page, pageSize)=>this.props.setPageFnc(page)}
                      />
        </BottomPage>
        {this.state.pollingModal}
        {this.state.deleteModal}
      </div>
    )
  }
}

export default PollingSetTable;