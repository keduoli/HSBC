import React from 'react'
import styled from 'styled-components'
import { Button,Modal } from 'antd';
import { DrawInvoiceLinkModal,DrawContractLinkModal } from 'components';
import { withRouter } from 'react-router';
import { zhMoney } from './../../util';
const DrawdownLeft = styled.div`
  height:100%;
  overflow:auto;
  float:left;
  width:33%;
	box-sizing:border-box;
	border-right:2px solid #f5f5f5;
`;
const DrawdownWapper = styled.div`
  overflow:hidden;
  padding:10px 0;
  width:100%;
  font-size:12px;
`;
const DrawdownLable = styled.div`
  width:18%;
  text-align:right;
  color:#908989;
  margin-right:8%;
  float:left;
`;
const DrawdownCeLable = styled.div`
  width:42%;
  text-align:right;
  color:#908989;
  margin-right:5%;
  float:left;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const DrawdownItem = styled.div`
  float:left;
`;
const DrawdownCenter = styled.div`
  height:100%;
  overflow:auto;
  float:left;
  width:40%;
  box-sizing:border-box;
  border-right:2px solid #f5f5f5;
`;
const DrawdownRight = styled.div`
  height:100%;
  overflow:auto;
  float:left;
  width:27%;
  padding:5px 10px;
  box-sizing:border-box;
`;
const DrawdownGroup = styled.div`
  margin:10px 0 30px 10px;
`;
const DrawdownTitle = styled.div`
	font-size:12px;
  margin:10px;
  overflow:hidden;
`;
const DrawdownLog = styled.div`
  overflow:auto;
  border:2px solid #f5f5f5;
  width:100%;
  padding:10px;
  box-sizing:border-box;
`;
const DrawDownLogWapper = styled.div`
  overflow:hidden;
  margin-bottom:20px;
`;
const LogFont = styled.div`
  font-size:12px;
  line-height:20px;
`;
class DrawdownCon extends React.Component{
  state={
    drawdownActionModal:'',
    check_results:null,
  }
  drawdownActionFnc = (action) => {
    if(action == 1 || action == 2){
      this.props.drawdownCheck(this.props.drawdownDetail.id,()=>{
        this.props.getDrawdownDetail(this.props.drawdownDetail.id,(res)=>{
          this.props.showDetail(res)
          this.setResults()
          if(res.check_results[0].type == 0){
            this.setState({drawdownActionModal:<Modal   title={<TitleSpan>操作提示</TitleSpan>}
                                                        style = {{textAlign:'center',top:200}}
                                                        onCancel={()=>this.setState({drawdownActionModal:''})}
                                                        visible
                                                        width={400}
                                                        maskClosable={false}
                                                        footer={null}
                                                  >
                                                  <div style={{margin:'10px 0 40px'}}>
                                                    校验不通过，是否继续操作？
                                                  </div>
                                                  <div>
                                                    <Button onClick={()=>{this.setState({drawdownActionModal:''})}} style={{marginRight:20}}>取消</Button>
                                                    <Button type="primary" onClick={()=>{
                                                      const param = {
                                                        action_id:action,
                                                        id:this.props.drawdownDetail.id,
                                                      };
                                                      this.props.drawdownAction(param,()=>{
                                                        this.props.getDrawdownDetail(this.props.drawdownDetail.id,(res)=>{
                                                          this.props.showDetail(res)
                                                          this.setState({drawdownActionModal:''})
                                                        })
                                                      });
                                                    }}>确定</Button>
                                                  </div>
                                                  </Modal>})
          }else{
            this.showResultModal(action)
          }
        })
      })
    }else{
      this.showResultModal(action)
    }
  }
  showResultModal = (action) => {
    this.setState({drawdownActionModal:<Modal   title={<TitleSpan>操作提示</TitleSpan>}
                                                style = {{textAlign:'center',top:200}}
                                                onCancel={()=>this.setState({drawdownActionModal:''})}
                                                visible
                                                width={400}
                                                maskClosable={false}
                                                footer={null}
                                          >
                                          <div style={{margin:'10px 0 40px'}}>
                                            确定执行此操作么？
                                          </div>
                                          <div>
                                            <Button onClick={()=>{this.setState({drawdownActionModal:''})}} style={{marginRight:20}}>取消</Button>
                                            <Button type="primary" onClick={()=>{
                                              const param = {
                                                action_id:action,
                                                id:this.props.drawdownDetail.id,
                                              };
                                              this.props.drawdownAction(param,()=>{
                                                this.props.getDrawdownDetail(this.props.drawdownDetail.id,(res)=>{
                                                  this.props.showDetail(res)
                                                  this.setState({drawdownActionModal:''})
                                                })
                                              });
                                            }}>确定</Button>
                                          </div>
                                          </Modal>})
  }
	setResults = () => {
    const check_results = JSON.parse(JSON.stringify(this.props.drawdownDetail.check_results));
    for(let i in check_results){
      for(let j in check_results[i].details){
        if(check_results[i].details[j].type == 1){
          check_results[i].group1 = check_results[i].group1?check_results[i].group1:[];
          check_results[i].group1.push(check_results[i].details[j])
        }else if(check_results[i].details[j].type == 2){
          check_results[i].group2 = check_results[i].group2?check_results[i].group2:[];
          check_results[i].group2.push(check_results[i].details[j])
        }else if(check_results[i].details[j].type == 3){
          check_results[i].group3 = check_results[i].group3?check_results[i].group3:[];
          check_results[i].group3.push(check_results[i].details[j])
        }else if(check_results[i].details[j].type == 4){
          check_results[i].group4 = check_results[i].group4?check_results[i].group4:[];
          check_results[i].group4.push(check_results[i].details[j])
        }else if(check_results[i].details[j].type == 5){
          check_results[i].group5 = check_results[i].group5?check_results[i].group5:[];
          check_results[i].group5.push(check_results[i].details[j])
        }else if(check_results[i].details[j].type == 6){
          check_results[i].group6 = check_results[i].group6?check_results[i].group6:[];
          check_results[i].group6.push(check_results[i].details[j])
        }else if(check_results[i].details[j].type == 7){
          check_results[i].group7 = check_results[i].group7?check_results[i].group7:[];
          check_results[i].group7.push(check_results[i].details[j])
        }else if(check_results[i].details[j].type == 8){
          check_results[i].group8 = check_results[i].group8?check_results[i].group8:[];
          check_results[i].group8.push(check_results[i].details[j])
        }else if(check_results[i].details[j].type == 9){
          check_results[i].group9 = check_results[i].group9?check_results[i].group9:[];
          check_results[i].group9.push(check_results[i].details[j])
        }
      }
    }
    this.setState({check_results})
	}
  componentWillMount = () => {
    this.setResults()
	}
	showContractModal = (title) => {
		let param;
		if(title == '删减已关联合同'){
			param={page:1,size:10,unlink_dd_id:this.props.drawdownDetail.id};
		}else{
			param={page:1,size:10,cus_id:this.props.drawdownDetail.cus_id};
		}
		this.props.getLinkContractList(param,(res)=>{
			this.setState({showContractModal:this.getConLink(res,title)})
		})
	}
	getConLink = (res,title) => {
		return <DrawContractLinkModal getLinkContractList={this.props.getLinkContractList}
																	contractList={res}
																	title={title}
																	dd_id={this.props.drawdownDetail.id}
																	cus_id={this.props.drawdownDetail.cus_id}
																	drawdownUnlinkContract={title=='删减已关联合同'?this.props.drawdownUnlinkContract:null}
																	drawdownLinkContract={this.props.drawdownLinkContract}
																	showDetail={this.showDetail}
																	cancel={()=>this.setState({showContractModal:''})}/>
	}
	showModal = (title) => {
		let param;
		if(title == '删减关联发票'){
			param={page:1,size:10,unlink_dd_id:this.props.drawdownDetail.id};
		}else{
			param={page:1,size:10,cus_id:this.props.drawdownDetail.cus_id};
		}
		this.props.getInvoiceList(param,(res)=>{
			this.setState({showInvoiceModal:this.getInvLink(res,title)})
		})
	}
	showDetail = () => {
		this.props.getDrawdownDetail(this.props.drawdownDetail.id,(res)=>{
			this.props.showDetail(res)
			this.setResults()
		})
	}
	getInvLink = (res,title) => {
			return <DrawInvoiceLinkModal getInvoiceList={this.props.getInvoiceList}
																	invoiceList={res}
																	title={title}
																	dd_id={this.props.drawdownDetail.id}
																	cus_id={this.props.drawdownDetail.cus_id}
																	drawdownUnlinkInvoice={title=='删减关联发票'?this.props.drawdownUnlinkInvoice:null}
																	drawdownLinkInvoice={this.props.drawdownLinkInvoice}
																	showDetail={this.showDetail}
																	cancel={()=>this.setState({showInvoiceModal:''})}/>
	}
  render(){
    const { drawdownDetail,drawdownCheck } = this.props;
    return(
      <div style={{height:'75vh',width:'100%',background:"#fff",padding:'25px 15px',boxSizing:'border-box'}}> 
        <DrawdownLeft className='custom-list'>
          <DrawdownWapper>
            <DrawdownLable>客户编号</DrawdownLable>
            <DrawdownItem>{drawdownDetail.cus_num?drawdownDetail.cus_num:'---'}</DrawdownItem>
          </DrawdownWapper>
          <DrawdownWapper>
            <DrawdownLable>客户名称</DrawdownLable>
            <DrawdownItem>{drawdownDetail.cus_name?drawdownDetail.cus_name:'---'}</DrawdownItem>
          </DrawdownWapper>
          <DrawdownWapper>
            <DrawdownLable>放款日期</DrawdownLable>
            <DrawdownItem>{drawdownDetail.dd_date?drawdownDetail.dd_date:'---'}</DrawdownItem>
          </DrawdownWapper>
          <DrawdownWapper>
            <DrawdownLable>货款账号</DrawdownLable>
            <DrawdownItem>{drawdownDetail.debt_account?drawdownDetail.debt_account:'---'}</DrawdownItem>
          </DrawdownWapper>
          <DrawdownWapper>
            <DrawdownLable>借据编号</DrawdownLable>
            <DrawdownItem>{drawdownDetail.debt_num?drawdownDetail.debt_num:'---'}</DrawdownItem>
          </DrawdownWapper>
          <DrawdownWapper>
            <DrawdownLable>放款流水号</DrawdownLable>
            <DrawdownItem>{drawdownDetail.sys_num?drawdownDetail.sys_num:'---'}</DrawdownItem>
          </DrawdownWapper>
          <DrawdownWapper>
            <DrawdownLable>放款金额</DrawdownLable>
            <DrawdownItem>{drawdownDetail.dd_amount?zhMoney(drawdownDetail.dd_amount):'---'}</DrawdownItem>
          </DrawdownWapper>
          <DrawdownWapper>
            <DrawdownLable>备注1</DrawdownLable>
            <DrawdownItem>{drawdownDetail.memo1?drawdownDetail.memo1:'---'}</DrawdownItem>
          </DrawdownWapper>
          <DrawdownWapper>
            <DrawdownLable>备注2</DrawdownLable>
            <DrawdownItem>{drawdownDetail.memo2?drawdownDetail.memo1:'---'}</DrawdownItem>
          </DrawdownWapper>
          <DrawdownWapper>
            <DrawdownLable>放款状态</DrawdownLable>
            <DrawdownItem>
              <div style={{marginRight:5,float:'left'}}>
                {drawdownDetail.state=='0' && '未放款'}
                {drawdownDetail.state=='1' && '已放款待补交'}
                {drawdownDetail.state=='2' && '放款完成'}
                {drawdownDetail.state=='3' && '放款取消'}
              </div>
              {
                this.props.navList && this.props.navList.role.indexOf('supervisor') > -1 &&
                <div style={{float:'left'}}>
                  {
                    drawdownDetail.state=='0' && 
                    <div style={{marginTop:'-4px',float:'left'}}>
                      <Button type='primary' style={{marginRight:5}} onClick={()=>this.drawdownActionFnc(2)}>确认已放款待补交</Button>
                      <Button type='primary' onClick={()=>this.drawdownActionFnc(1)}>确认已完成</Button>
                    </div>
                  }
                  {
                    drawdownDetail.state=='1' && 
                    <div style={{marginTop:'-4px',float:'left'}}>
                      <Button type='primary' onClick={()=>this.drawdownActionFnc(1)}>确认已完成</Button>
                    </div>
                  }
                  {
                    drawdownDetail.state=='2' && 
                    <div style={{marginTop:'-4px',float:'left'}}>
                      <Button type='primary' onClick={()=>this.drawdownActionFnc(4)}>解锁</Button>
                    </div>
                  }
                </div>
              }
            </DrawdownItem>
          </DrawdownWapper>
          <DrawdownWapper>
            <DrawdownLable>放款信息校验</DrawdownLable>
            {
              drawdownDetail.state!='3' && drawdownDetail.state!='2' && 
              <DrawdownItem >
                <Button onClick={()=>drawdownCheck(drawdownDetail.id,()=>{
                  this.props.getDrawdownDetail(this.props.drawdownDetail.id,(res)=>{
                    this.props.showDetail(res)
                    this.setResults()
                  })
                })} type='primary' style={{margin:'-4px 15px 0 0',float:'left'}}>校验</Button>
              </DrawdownItem>
            }
          </DrawdownWapper>
        </DrawdownLeft>
        <DrawdownCenter className='custom-list'>
          <DrawdownGroup>
            <DrawdownWapper>
              <DrawdownCeLable>关联合同</DrawdownCeLable>
              <DrawdownItem>
                {drawdownDetail.con_summary.count?drawdownDetail.con_summary.count:'---'}
                <Button style={{margin:'-5px 0 0 20px',float:'right'}} onClick={()=>{
                  const list = this.props.tabData.list;
                  let a = list.find(el=>el.key==='contract');
                  if(!a){
                      list.push({title:'合同管理',key:'contract'})
                      this.props.tabChange({list:list,activeKey:'contract'})
                  }else{
                      this.props.tabChange({list:list,activeKey:'contract'})
                  }
                  this.props.router.push("/contract");
                  this.props.setContract(drawdownDetail.id)
								}}>查看详情</Button>
              </DrawdownItem>
            </DrawdownWapper>
            <DrawdownWapper>
              <DrawdownCeLable>合同总金额</DrawdownCeLable>
              <DrawdownItem>{drawdownDetail.con_summary.amount?zhMoney(drawdownDetail.con_summary.amount):'---'}</DrawdownItem>
            </DrawdownWapper>
            <DrawdownWapper>
							<DrawdownCeLable>本次使用合同金额</DrawdownCeLable>
              <DrawdownItem>
                {drawdownDetail.con_summary.used_amount?zhMoney(drawdownDetail.con_summary.used_amount):'---'}
                {drawdownDetail.state!==2&&drawdownDetail.state!==3&&<Button type='primary' onClick={()=>this.showContractModal('删减已关联合同')} style={{margin:'-5px 0 0 10px',float:'right'}}>删减</Button>}
                {drawdownDetail.state!==2&&drawdownDetail.state!==3&&<Button type='primary' onClick={()=>this.showContractModal('添加关联合同')} style={{margin:'-5px 0 0 10px',float:'right'}}>添加</Button>}
              </DrawdownItem>
            </DrawdownWapper>
          </DrawdownGroup>
          <DrawdownGroup>
            <DrawdownWapper>
              <DrawdownCeLable>直接关联放款发票数</DrawdownCeLable>
              <DrawdownItem>
                {drawdownDetail.inv_summary.count?drawdownDetail.inv_summary.count:'---'}
                <Button style={{margin:'-5px 0 0 20px',float:'right'}} onClick={()=>{
                  const list = this.props.tabData.list;
                  let a = list.find(el=>el.key==='invoice');
                  if(!a){
                      list.push({title:'发票管理',key:'invoice'})
                      this.props.tabChange({list:list,activeKey:'invoice'})
                  }else{
                      this.props.tabChange({list:list,activeKey:'invoice'})
                  }
                  this.props.router.push("/invoice");
                  this.props.setInvId(drawdownDetail.id);
								}}>查看详情</Button>
              </DrawdownItem>
            </DrawdownWapper>
            <DrawdownWapper>
              <DrawdownCeLable>发票总金额</DrawdownCeLable>
              <DrawdownItem>{drawdownDetail.inv_summary.amount?zhMoney(drawdownDetail.inv_summary.amount):'---'}</DrawdownItem>
            </DrawdownWapper>
            <DrawdownWapper>
              <DrawdownCeLable>本次使用发票金额</DrawdownCeLable>
              <DrawdownItem>
                {drawdownDetail.inv_summary.used_amount?zhMoney(drawdownDetail.inv_summary.used_amount):'---'}
                {drawdownDetail.state!==2&&drawdownDetail.state!==3&&<Button type='primary' onClick={()=>this.showModal('删减关联发票')} style={{margin:'-5px 0 0 10px',float:'right'}}>删减</Button>}
                {drawdownDetail.state!==2&&drawdownDetail.state!==3&&<Button type='primary' onClick={()=>this.showModal('添加关联发票')} style={{margin:'-5px 0 0 10px',float:'right'}}>添加</Button>}
              </DrawdownItem>
            </DrawdownWapper>
          </DrawdownGroup>
          <DrawdownGroup>
            <DrawdownWapper>
              <DrawdownCeLable>关联合同中的发票数</DrawdownCeLable>
              <DrawdownItem>
                {drawdownDetail.con_inv_summary.count?drawdownDetail.con_inv_summary.count:'---'}
              </DrawdownItem>
            </DrawdownWapper>
            <DrawdownWapper>
              <DrawdownCeLable>关联合同中的已关联发票金额</DrawdownCeLable>
              <DrawdownItem>{drawdownDetail.con_inv_summary.amount?zhMoney(drawdownDetail.con_inv_summary.amount):'---'}</DrawdownItem>
            </DrawdownWapper>
            <DrawdownWapper>
              <DrawdownCeLable>关联合同中已关联的发票本次使用金额</DrawdownCeLable>
              <DrawdownItem>{drawdownDetail.con_inv_summary.used_amount?zhMoney(drawdownDetail.con_inv_summary.used_amount):'---'}</DrawdownItem>
            </DrawdownWapper>
          </DrawdownGroup>
        </DrawdownCenter>
        <DrawdownRight className='custom-list'>
          <DrawdownTitle>
            <div style={{float:'left',lineHeight:'28px'}}>校验记录</div>
            <Button style={{float:'right'}} type='primary' onClick={()=>{
              this.props.exportCheckFnc({id:drawdownDetail.id})
            }}>导出校验记录</Button>
          </DrawdownTitle>
          <DrawdownLog style={{height:'60%'}} className='custom-list'>
            {
              this.state.check_results && this.state.check_results.map((item,index)=>{
                return <DrawDownLogWapper key={index}>
                          <LogFont>{item.create_time}&nbsp;{item.username}&nbsp;执行了校验,校验结果{item.msg}</LogFont>
                          {
                            item.type == 0 &&
                            <div style={{overflow:'hidden'}}>
                              {
                                item.group1 && 
                                <div style={{overflow:'hidden',margin:'10px 0'}}>
                                  <LogFont >以下{item.group1[0].msg}</LogFont>
                                  {
                                    item.group1.map((item,index)=>{
                                      return <LogFont key={index}>
                                              {index+1})&nbsp;{item.fpdm&&<span>发票代码号码为：{item.fpdm}&nbsp;&nbsp;&nbsp;{item.fphm}</span>}
                                              {item.con_num&&<span>&nbsp;&nbsp;合同编号为{item.con_num}</span>}
                                              {item.sys_num&&<span>&nbsp;&nbsp;放款流水号为{item.sys_num}</span>}
                                            </LogFont>
                                    })
                                  }
                                </div>
                              }
                              {
                                item.group2 && 
                                <div style={{overflow:'hidden',margin:'10px 0'}}>
                                  <LogFont >以下{item.group2[0].msg}</LogFont>
                                  {
                                    item.group2.map((item,index)=>{
                                      return <LogFont key={index}>
																			{index+1})&nbsp;{item.fpdm&&<span>发票代码号码为：{item.fpdm}&nbsp;&nbsp;&nbsp;{item.fphm}</span>}
																			{item.con_num&&<span>&nbsp;&nbsp;合同编号为{item.con_num}</span>}
																			{item.sys_num&&<span>&nbsp;&nbsp;放款流水号为{item.sys_num}</span>}
																		</LogFont>
                                    })
                                  }
                                </div>
                              }
                              {
                                item.group3 && 
                                <div style={{overflow:'hidden',margin:'10px 0'}}>
                                  <LogFont>以下{item.group3[0].msg}</LogFont>
                                  {
                                    item.group3.map((item,index)=>{
                                      return <LogFont key={index}>
																			{index+1})&nbsp;{item.fpdm&&<span>发票代码号码为：{item.fpdm}&nbsp;&nbsp;&nbsp;{item.fphm}</span>}
																			{item.con_num&&<span>&nbsp;&nbsp;合同编号为{item.con_num}</span>}
																			{item.sys_num&&<span>&nbsp;&nbsp;放款流水号为{item.sys_num}</span>}
																		</LogFont>
                                    })
                                  }
                                </div>
                              }
                              {
                                item.group4 && 
                                <div style={{overflow:'hidden',margin:'10px 0'}}>
                                  <LogFont>以下{item.group4[0].msg}</LogFont>
                                  {
                                    item.group4.map((item,index)=>{
                                      return <LogFont key={index}>
																			{index+1})&nbsp;{item.fpdm&&<span>发票代码号码为：{item.fpdm}&nbsp;&nbsp;&nbsp;{item.fphm}</span>}
																			{item.con_num&&<span>&nbsp;&nbsp;合同编号为{item.con_num}</span>}
																			{item.sys_num&&<span>&nbsp;&nbsp;放款流水号为{item.sys_num}</span>}
																		</LogFont>
                                    })
                                  }
                                </div>
                              }
                              {
                                item.group5 && 
                                <div style={{overflow:'hidden',margin:'10px 0'}}>
                                  <LogFont>以下{item.group5[0].msg}</LogFont>
                                  {
                                    item.group5.map((item,index)=>{
                                      return <LogFont key={index}>
																			{index+1})&nbsp;{item.fpdm&&<span>发票代码号码为：{item.fpdm}&nbsp;&nbsp;&nbsp;{item.fphm}</span>}
																			{item.con_num&&<span>&nbsp;&nbsp;合同编号为{item.con_num}</span>}
																			{item.sys_num&&<span>&nbsp;&nbsp;放款流水号为{item.sys_num}</span>}
																		</LogFont>
                                    })
                                  }
                                </div>
                              }
                              {
                                item.group6 && 
                                <div style={{overflow:'hidden',margin:'10px 0'}}>
                                  <LogFont>以下{item.group6[0].msg}</LogFont>
                                  {
                                    item.group6.map((item,index)=>{
                                      return <LogFont key={index}>
																			{index+1})&nbsp;{item.fpdm&&<span>发票代码号码为：{item.fpdm}&nbsp;&nbsp;&nbsp;{item.fphm}</span>}
																			{item.con_num&&<span>&nbsp;&nbsp;合同编号为{item.con_num}</span>}
																			{item.sys_num&&<span>&nbsp;&nbsp;放款流水号为{item.sys_num}</span>}
																		</LogFont>
                                    })
                                  }
                                </div>
                              }
                              {
                                item.group7 && 
                                <div style={{overflow:'hidden',margin:'10px 0'}}>
                                  <LogFont>以下{item.group7[0].msg}</LogFont>
                                  {
                                    item.group7.map((item,index)=>{
                                      return <LogFont key={index}>
																			{index+1})&nbsp;{item.fpdm&&<span>发票代码号码为：{item.fpdm}&nbsp;&nbsp;&nbsp;{item.fphm}</span>}
																			{item.con_num&&<span>&nbsp;&nbsp;合同编号为{item.con_num}</span>}
																			{item.sys_num&&<span>&nbsp;&nbsp;放款流水号为{item.sys_num}</span>}
																		</LogFont>
                                    })
                                  }
                                </div>
                              }
                              {
                                item.group8 && 
                                <div style={{overflow:'hidden',margin:'10px 0'}}>
                                  <LogFont>以下{item.group8[0].msg}</LogFont>
                                  {
                                    item.group8.map((item,index)=>{
                                      return <LogFont key={index}>
																			{index+1})&nbsp;{item.fpdm&&<span>发票代码号码为：{item.fpdm}&nbsp;&nbsp;&nbsp;{item.fphm}</span>}
																			{item.con_num&&<span>&nbsp;&nbsp;合同编号为{item.con_num}</span>}
																			{item.sys_num&&<span>&nbsp;&nbsp;放款流水号为{item.sys_num}</span>}
																		</LogFont>
                                    })
                                  }
                                </div>
                              }
                              {
                                item.group9 && 
                                <div style={{overflow:'hidden',margin:'10px 0'}}>
                                  <LogFont>以下{item.group9[0].msg}</LogFont>
                                  {
                                    item.group9.map((item,index)=>{
                                      return <LogFont key={index}>
																			{index+1})&nbsp;{item.fpdm&&<span>发票代码号码为：{item.fpdm}&nbsp;&nbsp;&nbsp;{item.fphm}</span>}
																			{item.con_num&&<span>&nbsp;&nbsp;合同编号为{item.con_num}</span>}
																			{item.sys_num&&<span>&nbsp;&nbsp;放款流水号为{item.sys_num}</span>}
																		</LogFont>
                                    })
                                  }
                                </div>
                              }
                            </div>
                          }
                       </DrawDownLogWapper>
              })
            }
          </DrawdownLog>
					<DrawdownTitle>操作记录</DrawdownTitle>
					<DrawdownLog style={{height:'23%'}} className='custom-list'>
						{
							drawdownDetail.logs&&drawdownDetail.logs.map((item,index)=>{
								return <LogFont key={index}>{item.create_time}&nbsp;&nbsp;{item.username}&nbsp;&nbsp;{item.msg}</LogFont>
							})
						}
					</DrawdownLog>
        </DrawdownRight>
				{this.state.drawdownActionModal}
				{this.state.showInvoiceModal}
				{this.state.showContractModal}
      </div>
    )
  }
}

export default withRouter(DrawdownCon);
