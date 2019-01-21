import React from 'react'
import styled from 'styled-components'
import {Modal,Button,Select,message} from 'antd'
import { num_format,DX } from './../../util'
import { apiUrl } from 'config';
import 'whatwg-fetch';
import { withRouter } from 'react-router';
const Option = Select.Option;
const ExpandCons = styled.div`
  overflow:hidden;
  padding:13px;
  font-size:12px;
`;
const InvoiceLeft = styled.div`
  width:75%;
  float:left;
`;
const InvoiceRight = styled.div`
  width:25%;
  padding-left:15px;
  float:left;
`;
const Border = styled.div`
  width:100%;
  padding:10px;
  position:relative;
`;
const Sections = styled.div`
  border:1px solid #a0a0a0;
  overflow:hidden;
  width:100%;
`;
const LeftAspect = styled.div`
  text-align:center;
  padding:25px 15px 15px;
`;
const RightAspect = styled.div`
  flex-grow:1;
  border-left:1px solid #a0a0a0;
  padding:15px;
  line-height:1.8;
`;
const EachCol = styled.div`
  text-align:center;
  line-height:2;
  border-right:1px solid #a0a0a0;
  word-break:break-all;
`;
const TabLabel = styled.div`
  position:absolute;
  left:50%;
  top:50%;
  margin-top:-77px;
  margin-left:-101px;
  color:rgb(226,159,159);
  font-size:80px;
  transform: scale(1,2)
`;
const InvoiceFont = styled.p`
  font-size:16px;
  color: #FF7E7E;
  text-align:center;
  line-height:3;
`;
const ConSpan = styled.span`
  color:#2397CA;
  display: inline-block;
  max-width: 374px;
`;
const LeftBody = styled.div`
  width:65%;
  display:flex;
`;
const RightBody = styled.div`
  width:35%;
  display:flex;
`;
const InvoiceTitSpan = styled.div`
  float:left; 
  width:90px;
`;
const ConSpan2 = styled.div`
  color:#2397CA;
  float:left;
  width: 310px;
`;
const OutCon = styled.div`
  display:flex;
  padding:10px;
`;
const BottonBtn = styled(Button)`
  height:30px;
  text-align:center;
`;
const EleImg = styled.img`
  width:100%
`;
const HeaderTitle = styled.div`
  position:absolute;
  width:280px;
  height:77px;
  left:0;
  right:0;
  margin:0 auto;
  top:16px;
`;
const TitleFont1 = styled.div`
  width:100%;
  height:35px;
  text-align:center;
  line-height:35px;
  font-size: 24px;
  font-weight:600;
  border-bottom:1px solid #979797;
`;
const TitleFont2 = styled.div`
  width:100%;
  height:25px;
  text-align:center;
  line-height:25px;
  font-size: 12px;
  border-top:1px solid #979797;
  margin-top:5px;
`;
const EachContent = styled.div`
  max-height:280px;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 3px;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #a0a0a0;
    border-left: 2px solid transparent;
  }
`;
const RecordContent = styled.div`
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 5px;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #a0a0a0;
    border-left: 2px solid transparent;
  }
`;
const LogSpan = styled.span`
  margin-right:15px;
`;
class ApplyDetailModal extends React.Component{
  state={
    hsbz:'2',
    edit:false,
  }
  hsbzChange = (e) => {
    this.setState({hsbz:e})
  }
  getNextMonth = () => {
    let myDate = new Date();
    return myDate.getFullYear()+'年'+(myDate.getMonth()+1)+'月'+myDate.getDate()+'日'
  }
  applyAction = (action) => {
    if(action!=='edit'){
      this.props.applyAction({apply_id:this.props.scanData.issue_data},()=>{
        this.props.cancel();
        this.props.refreshData()
      })
    }else{
      this.setState({edit:true})
    }
  }
  render(){
    const scanData = this.props.scanData.issue_data;
    const {logs,state} = this.props.scanData;
    return(
      <Modal style = {{top:50}}
             visible
             onCancel={this.props.cancelFnc}
             width={'75%'}
             footer={null}
      >
        {
          this.state.edit == true ?
          <div></div>
          :
          <ExpandCons>
            <InvoiceLeft>
              <div style={{overflow:'hidden'}}>
                <Border>
                  {
                    scanData.fpzl == '10' &&
                    <HeaderTitle>
                      <TitleFont1>增值税电子普通发票</TitleFont1>
                      <TitleFont2></TitleFont2>
                    </HeaderTitle>
                  }
                  {
                    scanData.fpzl == '01' && 
                    <HeaderTitle>
                      <TitleFont1>增值税专用发票</TitleFont1>
                      <TitleFont2></TitleFont2>
                    </HeaderTitle>
                  }
                  {
                    scanData.fpzl == '04' && 
                    <HeaderTitle>
                      <TitleFont1>增值税普通发票</TitleFont1>
                      <TitleFont2></TitleFont2>
                    </HeaderTitle>
                  }
                  <Select defaultValue='2' 
                          style={{width:100,marginBottom:20}}
                          onChange={this.hsbzChange}
                          value={this.state.hsbz}>
                    <Option key='1'>含税</Option>
                    <Option key='2'>不含税</Option>
                  </Select>
                  {
                    scanData.hczt === "1" &&
                    <span style={{color:'red'}}>销项负数</span>
                  }
                  <p style={{marginBottom:8}}>
                    <span style={{float:'right'}}>开票日期：<ConSpan>{this.getNextMonth()}</ConSpan></span>
                  </p>
                  <Sections>
                    <div style={{overflow:'hidden',display:'flex',borderBottom:'1px solid #a0a0a0'}}>
                      <LeftBody>
                        <LeftAspect>
                          购<div style={{height:1}}></div><br />买<div style={{height:1}}></div><br />方
                        </LeftAspect>
                        <RightAspect style={{borderRight:'1px solid #a0a0a0'}}>
                          <div><InvoiceTitSpan>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;称 :</InvoiceTitSpan><ConSpan>{scanData.gfmc}</ConSpan></div>
                          <div><InvoiceTitSpan>纳税人识别号：</InvoiceTitSpan><ConSpan>{scanData.gfsbh}</ConSpan></div>
                          <div><InvoiceTitSpan style={{float:'left'}}>地&nbsp;址、&nbsp;电&nbsp;话 :</InvoiceTitSpan><ConSpan>{(scanData.gfdz?scanData.gfdz:'')+''+(scanData.gfdh?scanData.gfdh:'')}</ConSpan></div>
                          <div><InvoiceTitSpan>开户行及账户：</InvoiceTitSpan><ConSpan>{(scanData.gfyh?scanData.gfyh:'')+''+(scanData.gfzh?scanData.gfzh:'')}</ConSpan></div>
                        </RightAspect>
                      </LeftBody>
                      <RightBody>
                        <LeftAspect>
                          密<div style={{height:1}}></div><br />码<div style={{height:1}}></div><br />区
                        </LeftAspect>
                        <RightAspect>
                        </RightAspect>
                      </RightBody>
                    </div>
                    <div style={{overflow:'hidden'}}>
                      <div style={{display:'flex'}}>
                        <EachCol style={{width:'25%'}}>货物或应税劳务、服务名称</EachCol>
                        <EachCol style={{width:'10%'}}>规&nbsp;格&nbsp;型&nbsp;号</EachCol>
                        <EachCol style={{width:'5%'}}>单&nbsp;位</EachCol>
                        <EachCol style={{width:'12%'}}>数&nbsp;&nbsp;量</EachCol>
                        <EachCol style={{width:'15%'}}>单&nbsp;&nbsp;&nbsp;&nbsp;价</EachCol>
                        <EachCol style={{width:'15%'}}>金&nbsp;&nbsp;&nbsp;&nbsp;额</EachCol>
                        <EachCol style={{width:'5%'}}>税&nbsp;&nbsp;率</EachCol>
                        <EachCol style={{borderRight:'0',flexGrow:1}}>税&nbsp;&nbsp;额</EachCol>
                      </div>
                      <EachContent>
                        {
                          scanData.invoice_detail && scanData.invoice_detail.length > 0 && scanData.invoice_detail.map((item,index)=>{
                            let rate;
                            if(item.slv === '1' || item.slv === '2' || item.slv === '0'){
                              rate = 0.00
                            }else{
                              rate = Number(item.slv)/100;
                            }
                            return(
                              <div key={index}>
                                <div style={{display:'flex'}}>
                                  <EachCol style={{width:'25%',textAlign:'left'}}><ConSpan>{item.hwmc}</ConSpan></EachCol>
                                  <EachCol style={{width:'10%',textAlign:'right'}}><ConSpan>{item.ggxh}</ConSpan></EachCol>
                                  <EachCol style={{width:'5%',textAlign:'right'}}><ConSpan>{item.dw}</ConSpan></EachCol>
                                  <EachCol style={{width:'12%',textAlign:'right'}}><ConSpan>{item.sl}</ConSpan></EachCol>
                                  <EachCol style={{width:'15%',textAlign:'right'}}><ConSpan>{this.state.hsbz === '2'?item.dj:num_format((item.dj*(1+rate)))}</ConSpan></EachCol>
                                  <EachCol style={{width:'15%',textAlign:'right'}}><ConSpan>{this.state.hsbz === '2'?item.je:(Number(item.je)+Number(item.se))}</ConSpan></EachCol>
                                  <EachCol style={{width:'5%',textAlign:'right'}}><ConSpan>{item.slv?item.slv==='1'?'免税':item.slv==='2'?'不征税':`${item.slv}%`:''}</ConSpan></EachCol>
                                  <EachCol style={{borderRight:'0',flexGrow:1,textAlign:'right'}}><ConSpan>{item.se}</ConSpan></EachCol>
                                </div>
                                {
                                  item.zkje &&
                                  <div style={{display:'flex'}}>
                                    <EachCol style={{width:'25%',textAlign:'left'}}><ConSpan>{item.hwmc}</ConSpan></EachCol>
                                    <EachCol style={{width:'10%',textAlign:'right'}}><ConSpan></ConSpan></EachCol>
                                    <EachCol style={{width:'5%',textAlign:'right'}}><ConSpan></ConSpan></EachCol>
                                    <EachCol style={{width:'12%',textAlign:'right'}}><ConSpan></ConSpan></EachCol>
                                    <EachCol style={{width:'15%',textAlign:'right'}}><ConSpan></ConSpan></EachCol>
                                    <EachCol style={{width:'15%',textAlign:'right'}}><ConSpan>{this.state.hsbz === '2'?-item.zkje:(item.zkje-(item.zkse))}</ConSpan></EachCol>
                                    <EachCol style={{width:'5%',textAlign:'right'}}><ConSpan>{item.slv?item.slv==='2'?'免税':item.slv==='2'?'不征税':`${item.slv}%`:''}</ConSpan></EachCol>
                                    <EachCol style={{borderRight:'0',flexGrow:1,textAlign:'right'}}><ConSpan>{item.zkse}</ConSpan></EachCol>
                                  </div>
                                }
                              </div>
                            )
                          })
                        }
                      </EachContent>
                      <div style={{display:'flex'}}>
                        <EachCol style={{width:'25%'}}>合&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计</EachCol>
                        <EachCol style={{width:'10%'}} />
                        <EachCol style={{width:'5%'}} />
                        <EachCol style={{width:'12%'}} />
                        <EachCol style={{width:'15%'}} />
                        <EachCol style={{width:'15%',textAlign:'right'}}><ConSpan>{scanData.je?this.state.hsbz === '2'?`￥${scanData.je}`:`￥${Number(scanData.je)+Number(scanData.se)}`:''}</ConSpan></EachCol>
                        <EachCol style={{width:'5%'}}/>
                        <EachCol style={{borderRight:0,flexGrow:1,textAlign:'right'}}><ConSpan>{scanData.se?`￥${scanData.se}`:''}</ConSpan></EachCol>
                      </div>
                      <div style={{display:'flex',borderTop:'1px solid #a0a0a0'}}>
                        <EachCol style={{width:'25%'}}>价&nbsp;税&nbsp;合&nbsp;计&nbsp;(&nbsp;大&nbsp;写&nbsp;)&nbsp;</EachCol>
                        <EachCol style={{flexGrow:1,borderRight:0,textAlign:'left'}}><ConSpan style={{marginLeft:15}}>ⓧ&nbsp;&nbsp;{DX(scanData.jshj)}</ConSpan></EachCol>
                        <EachCol style={{borderRight:0,width:'30%',textAlign:'left'}}>(&nbsp;小&nbsp;&nbsp;&nbsp;写&nbsp;)<ConSpan style={{marginLeft:15}}>{scanData.jshj?`￥${scanData.jshj}`:''}</ConSpan></EachCol>
                      </div>
                    </div>
                    <div style={{overflow:'hidden',display:'flex',borderTop:'1px solid #a0a0a0'}}>
                      <LeftBody>
                        <LeftAspect>
                          销<br /><div style={{height:5}}></div>售<br /><div style={{height:5}}></div>方
                        </LeftAspect>
                        <RightAspect style={{borderRight:'1px solid #a0a0a0'}}>
                          <div style={{overflow:'hidden'}}><InvoiceTitSpan>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;称 :</InvoiceTitSpan><ConSpan2>{scanData.xfmc}</ConSpan2></div>
                          <div style={{overflow:'hidden'}}><InvoiceTitSpan>纳税人识别号：</InvoiceTitSpan><ConSpan2>{scanData.xfsbh}</ConSpan2></div>
                          <div style={{overflow:'hidden'}}><InvoiceTitSpan style={{float:'left'}}>地&nbsp;址、&nbsp;电&nbsp;话 :</InvoiceTitSpan><ConSpan2>{scanData.xfdz} {scanData.xfdh}</ConSpan2></div>
                          <div style={{overflow:'hidden'}}><InvoiceTitSpan>开户行及账户：</InvoiceTitSpan><ConSpan2>{scanData.xfyh} {scanData.xfzh}</ConSpan2></div>
                        </RightAspect>
                      </LeftBody>
                      <RightBody>
                        <LeftAspect>
                          备<div style={{height:10}}></div><br />注
                        </LeftAspect>
                        <RightAspect>
                          <ConSpan>{scanData.bz}</ConSpan>
                        </RightAspect>
                      </RightBody>
                    </div>
                  </Sections>
                </Border>
                {
                  this.props.ele && 
                  <div>
                    <OutCon>
                      <div style={{marginRight:20}}>
                        收票人邮箱：{scanData.spryx}
                      </div>
                      <div>
                        收票人手机: {scanData.sprsjh?scanData.sprsjh:'---'}
                      </div>
                    </OutCon>
                  </div>
                }
              </div>
            </InvoiceLeft>
            <InvoiceRight>
              <p style={{marginTop:58,color:'#a9a9a9'}}>操作记录：</p>
              <RecordContent>
                {
                  logs.length> 0 && logs.map((item,index)=>{
                    return(
                      <p key={index}>
                        <LogSpan>{item.create_time}</LogSpan>
                        <LogSpan>{item.realname}</LogSpan>
                        <LogSpan>{item.action_cn}</LogSpan>
                      </p>
                    )
                  })
                }
              </RecordContent>
            </InvoiceRight>
          </ExpandCons>
        }
        <div style={{overflow:'hidden',display:'flex',justifyContent:'space-around',width:'50%',margin:'20px 25%'}}>
          {state == 1 && <Button onClick={()=>this.applyAction(4)}>删除</Button>}
          <Button onClick={this.props.cancelFnc}>返回</Button>
          {state == 1 && <Button onClick={()=>this.applyAction('edit')}>编辑</Button>}
          {state == 1 && <Button onClick={()=>this.applyAction(2)}>提交审核</Button>}
          {state == 3 && <Button onClick={()=>this.applyAction(4)}>撤回</Button>}
        </div>
      </Modal>
    )
  }
}

export default withRouter(ApplyDetailModal);

