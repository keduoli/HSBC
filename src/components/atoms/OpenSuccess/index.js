import React from 'react'
import styled from 'styled-components'
import {Modal,Button} from 'antd'
import { num_format,DX } from './../../util'
import { Link } from 'react-router'

const ExpandCons = styled.div`
  overflow:hidden;
  padding:13px;
  font-size:12px;
  width:98%;
  margin: 0 auto;
  border: 1px solid #EBEBEB;
`;
const ExpandHeader = styled.div`

`;
const BottomCon = styled.div`
  display:flex;
  justify-content:center;
  overflow:hidden;
  margin-top:30px;
`;
const Background = styled.div`
  width:45px;
  height:45px;
  background:url(images/succicon.png) no-repeat;
  float:left;
  margin-right:20px;
`;
const HeaderCon = styled.div`
  line-height:45px;
  overflow:hidden;
  margin:0 auto;
  margin-top:45px;
  color: #2397CA;
`;
const InvoiceLeft = styled.div`
  width:75%;
`;
const InvoiceRight = styled.div`
  width:25%;
  padding-left:15px;
`;
const Border = styled.div`
  width:100%;
  padding:10px;
  position:relative;
`;
const Sections = styled.div`
  border:1px solid #EBEBEB;
  overflow:hidden;
  width:100%;
`;
const LeftAspect = styled.div`
  text-align:center;
  padding:25px 15px 15px;
  float:left;
  overflow:hidden;
  height:100%;
`;
const RightAspect = styled.div`
  flex-grow:1;
  border-left:1px solid #EBEBEB;
  padding:15px;
  overflow:hidden;
  height:100%;
  line-height:1.8;
`;
const EachCol = styled.div`
  text-align:center;
  line-height:2;
  border-right:1px solid #EBEBEB;
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
  justify-content:space-between;
  padding:10px;
`;
const BottonBtn = styled(Button)`
  margin:0 auto;
  height:30px;
  text-align:center;
`;
const EleImg = styled.img`
  width:100%
`;
class OpenSuccess extends React.Component{
  print = () => {
    const {scanData,companyList,settingList} = this.props;
    Modal.confirm({
      title: '打印提示',
      content: (
        <div>
          <p>发票号码：{scanData.fphm}</p>
          <p>发票代码：{scanData.fpdm}</p>
          <p>请确认打印机上的纸质空白发票代码与号码是否和系统一致</p>
        </div>
      ),
      okText:'确定打印',
      cancelText:'取消打印',
      onOk() {
        window.invoiceSdk.print(
          'localhost:15678',
          companyList&&companyList.tax_number,
          settingList.tax_control_type === 1? 'BW_dGVzdHRlc3Q':'dGVzdHRlc3Q',
          {
              data:{
                InfoKind: scanData.fpzl === ('04'||'11')?'102':'100',
                InvoiceCode: scanData.fpdm,
                InvoiceNo: scanData.fphm,
                IsAutoPrint: '1'
            }
          }
        )
        .then((res)=>{
        })
      },
      onCancel() {
        
      }
    });
  }
  render(){
    const {scanData} = this.props;
    return(
      <div>
        {
          scanData.fpzl === ( '10' || '14') ?
          <div>
            <ExpandHeader>
              <HeaderCon>
                <div style={{display:'flex',justifyContent:'center'}}>
                  <Background/>开具成功
                </div>
              </HeaderCon>
            </ExpandHeader>
            <ExpandCons>
              <EleImg src={this.props.scanData.file_path}/>
            </ExpandCons>
            <BottomCon>
              <Button style={{marginRight:20}} onClick={()=>this.props.cancel()}>继续开具</Button>
              <Button type='primary'><Link to='/invoicesquery'>查看发票</Link></Button>
            </BottomCon>
          </div>
          :
        <div style={{background:'#fff',overflow:'hidden',padding:13,width:'98%',margin:'0 auto'}}>
          <ExpandHeader>
            <HeaderCon>
              <div style={{display:'flex',justifyContent:'center'}}>
                <Background/>开具成功
              </div>
              <div style={{textAlign:'center',width:'100%',lineHeight:'61px',fontSize:13}}>打印发票请对比发票号码是否与打印纸一致</div>
            </HeaderCon>
          </ExpandHeader>
          <ExpandCons id="section-to-print">
            <div style={{display:'flex',overflow:'hidden'}}>
              <InvoiceLeft style={{width:'100%'}}>
                <div style={{overflow:'hidden'}}>
                  <Border>
                    {
                      scanData.check_time &&
                      <span>查验时间：<span style={{color:'#6a6a6a'}}>{scanData.check_time}</span></span>
                    }
                    {
                      scanData.title &&
                      <InvoiceFont>{scanData.title}</InvoiceFont>
                    }
                    {
                      scanData.zfbz === "Y" &&
                      <TabLabel>作&nbsp;&nbsp;废</TabLabel>
                    }
                    <div style={{marginBottom:8,width:'100%',overflow:'hidden',display:'flex',justifyContent:'space-between'}}>
                      <div style={{marginRight:15,float:'left'}}><span style={{display:'inline-block'}}>发票代码：</span><ConSpan style={{display:'inline-block'}}>{scanData.fpdm}</ConSpan></div>
                      <div style={{marginRight:15,float:'left'}}><span style={{display:'inline-block'}}>发票号码：</span><ConSpan style={{display:'inline-block'}}>{scanData.fphm}</ConSpan></div>
                      <div style={{marginRight:15,float:'left'}}><span style={{display:'inline-block'}}>校 验 码：</span><ConSpan style={{display:'inline-block'}}>{scanData.jym}</ConSpan></div>
                      <div style={{marginRight:15,float:'left'}}><span style={{display:'inline-block'}}>开票日期：</span><ConSpan style={{display:'inline-block'}}>{scanData.kprq}</ConSpan></div>
                      <div style={{marginRight:15,float:'left'}}><span style={{display:'inline-block'}}>机器编号：</span><ConSpan style={{display:'inline-block'}}>{scanData.jqbh}</ConSpan></div>
                    </div>
                    <Sections>
                      <div style={{overflow:'hidden',display:'flex',borderBottom:'1px solid #EBEBEB'}}>
                        <LeftBody>
                          <LeftAspect>
                            购<div style={{height:1}}></div><br />买<div style={{height:1}}></div><br />方
                          </LeftAspect>
                          <RightAspect style={{borderRight:'1px solid #EBEBEB'}}>
                            <div style={{overflow:'hidden'}}><InvoiceTitSpan>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;称 :</InvoiceTitSpan><ConSpan>{scanData.gfmc}</ConSpan></div>
                            <div style={{overflow:'hidden'}}><InvoiceTitSpan>纳税人识别号：</InvoiceTitSpan><ConSpan>{scanData.gfsbh}</ConSpan></div>
                            <div style={{overflow:'hidden'}}><InvoiceTitSpan style={{float:'left'}}>地&nbsp;址、&nbsp;电&nbsp;话 :</InvoiceTitSpan><ConSpan>{scanData.gfdzdh}</ConSpan></div>
                            <div style={{overflow:'hidden'}}><InvoiceTitSpan>开户行及账户：</InvoiceTitSpan><ConSpan>{scanData.gfyhzh}</ConSpan></div>
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
                          <EachCol style={{width:'15%'}}>单价(不含税)</EachCol>
                          <EachCol style={{width:'15%'}}>金额(不含税)</EachCol>
                          <EachCol style={{width:'5%'}}>税&nbsp;&nbsp;率</EachCol>
                          <EachCol style={{borderRight:'0',flexGrow:1}}>税&nbsp;&nbsp;额</EachCol>
                        </div>
                        {
                          scanData.invoice_details && scanData.invoice_details.length > 0 && scanData.invoice_details.map((item,index)=>{
                            return(
                              <div key={index}>
                                <div style={{display:'flex'}}>
                                  <EachCol style={{width:'25%',textAlign:'left'}}><ConSpan>{item.hwmc}</ConSpan></EachCol>
                                  <EachCol style={{width:'10%',textAlign:'right'}}><ConSpan>{item.ggxh}</ConSpan></EachCol>
                                  <EachCol style={{width:'5%',textAlign:'right'}}><ConSpan>{item.dw}</ConSpan></EachCol>
                                  <EachCol style={{width:'12%',textAlign:'right'}}><ConSpan>{item.sl}</ConSpan></EachCol>
                                  <EachCol style={{width:'15%',textAlign:'right'}}><ConSpan>{item.dj}</ConSpan></EachCol>
                                  <EachCol style={{width:'15%',textAlign:'right'}}><ConSpan>{item.je}</ConSpan></EachCol>
                                  <EachCol style={{width:'5%',textAlign:'right'}}><ConSpan>{item.slv?item.slv==='1'?'免税':item.slv==='2'?'不征税':`${item.slv}%`:''}</ConSpan></EachCol>
                                  <EachCol style={{borderRight:'0',flexGrow:1,textAlign:'right'}}><ConSpan>{item.se}</ConSpan></EachCol>
                                </div>
                                {
                                  item.zkje!=='' &&
                                  <div style={{display:'flex'}}>
                                    <EachCol style={{width:'25%',textAlign:'left'}}><ConSpan>{item.hwmc}</ConSpan></EachCol>
                                    <EachCol style={{width:'10%',textAlign:'right'}}><ConSpan></ConSpan></EachCol>
                                    <EachCol style={{width:'5%',textAlign:'right'}}><ConSpan></ConSpan></EachCol>
                                    <EachCol style={{width:'12%',textAlign:'right'}}><ConSpan></ConSpan></EachCol>
                                    <EachCol style={{width:'15%',textAlign:'right'}}><ConSpan></ConSpan></EachCol>
                                    <EachCol style={{width:'15%',textAlign:'right'}}><ConSpan>{item.zkje}</ConSpan></EachCol>
                                    <EachCol style={{width:'5%',textAlign:'right'}}><ConSpan>{item.slv?item.slv==='1'?'免税':item.slv==='2'?'不征税':`${item.slv}%`:''}</ConSpan></EachCol>
                                    <EachCol style={{borderRight:'0',flexGrow:1,textAlign:'right'}}><ConSpan>{item.zkse}</ConSpan></EachCol>
                                  </div>
                                }
                              </div>
                            )
                          })
                        }
                        <div style={{display:'flex'}}>
                          <EachCol style={{width:'25%'}}>合&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计</EachCol>
                          <EachCol style={{width:'10%'}} />
                          <EachCol style={{width:'5%'}} />
                          <EachCol style={{width:'12%'}} />
                          <EachCol style={{width:'15%'}} />
                          <EachCol style={{width:'15%',textAlign:'right'}}><ConSpan>{scanData.je?`￥${scanData.je}`:''}</ConSpan></EachCol>
                          <EachCol style={{width:'5%'}}/>
                          <EachCol style={{borderRight:0,flexGrow:1,textAlign:'right'}}><ConSpan>{scanData.se?`￥${scanData.se}`:''}</ConSpan></EachCol>
                        </div>
                        <div style={{display:'flex',borderTop:'1px solid #EBEBEB'}}>
                          <EachCol style={{width:'25%'}}>价&nbsp;税&nbsp;合&nbsp;计&nbsp;(&nbsp;大&nbsp;写&nbsp;)&nbsp;</EachCol>
                          <EachCol style={{flexGrow:1,borderRight:0,textAlign:'left'}}><ConSpan style={{marginLeft:15}}>ⓧ&nbsp;&nbsp;{DX(scanData.jshj)}</ConSpan></EachCol>
                          <EachCol style={{borderRight:0,width:'30%',textAlign:'left'}}>(&nbsp;小&nbsp;&nbsp;&nbsp;写&nbsp;)<ConSpan style={{marginLeft:15}}>{scanData.jshj?`￥${scanData.jshj}`:''}</ConSpan></EachCol>
                        </div>
                      </div>
                      <div style={{overflow:'hidden',display:'flex',borderTop:'1px solid #EBEBEB'}}>
                        <LeftBody>
                          <LeftAspect>
                            销<br /><div style={{height:5}}></div>售<br /><div style={{height:5}}></div>方
                          </LeftAspect>
                          <RightAspect style={{borderRight:'1px solid #EBEBEB'}}>
                            <div style={{overflow:'hidden'}}><InvoiceTitSpan>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;称 :</InvoiceTitSpan><ConSpan2>{scanData.xfmc}</ConSpan2></div>
                            <div style={{overflow:'hidden'}}><InvoiceTitSpan>纳税人识别号：</InvoiceTitSpan><ConSpan2>{scanData.xfsbh}</ConSpan2></div>
                            <div style={{overflow:'hidden'}}><InvoiceTitSpan style={{float:'left'}}>地&nbsp;址、&nbsp;电&nbsp;话 :</InvoiceTitSpan><ConSpan2>{scanData.xfdzdh}</ConSpan2></div>
                            <div style={{overflow:'hidden'}}><InvoiceTitSpan>开户行及账户：</InvoiceTitSpan><ConSpan2>{scanData.xfyhzh}</ConSpan2></div>
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
                  <div style={{overflow:'hidden'}}>
                    <OutCon>
                      <div style={{overflow:'hidden'}}>
                        收款人：{scanData.skrmc}
                      </div>
                      <div style={{overflow:'hidden'}}>
                        复核人: {scanData.fhrmc}
                      </div>
                      <div style={{overflow:'hidden'}}>
                        开票人：{scanData.kprmc}
                      </div>
                      <div style={{overflow:'hidden'}}>
                        销售方: (章）
                      </div>
                    </OutCon>
                  </div>
                </div>
              </InvoiceLeft>
            </div>
          </ExpandCons>
          <BottomCon>
            <Button style={{marginRight:20}} onClick={()=>this.props.cancel()}>再次开具</Button>
            {this.props.settingList.tax_control_type !== 1 && <Button type='primary' onClick={()=>this.print()}>立即打印</Button>}
            {this.props.settingList.tax_control_type === 1 && <Button type='primary'><Link to='/invoicesquery'>查看发票</Link></Button>}
          </BottomCon>
        </div>
      }
      </div>
    )
  }
}

export default OpenSuccess;

