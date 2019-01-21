import React from 'react'
import styled from 'styled-components'
import { Button,Tooltip } from 'antd'
import { zhMoney } from './../../util';
const Border = styled.div`
  width:100%;
  padding:10px;
  position:relative;
`;
const Pointicon = styled.span`
  display:inline-block;
  background:url(images/point-icon.png) no-repeat center;
  background-size:13px;
  width:13px;
  height:13px;
  margin:3px 0 0 1px;
  cursor:pointer;
`;
const Sections = styled.div`
  border:1px solid #a0a0a0;
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
  border-left:1px solid #a0a0a0;
  padding:15px;
  overflow:hidden;
  height:100%;
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
class Invoices extends React.Component{
  print = () => {
    const printHtml = document.getElementById('section-to-print').innerHTML;
    document.getElementById('print-con').style.display = 'block';
    const newWindow =  document.getElementById('print-con');
    document.getElementById('app').style.display = 'none';
    document.getElementsByClassName('ant-modal-content')[0].style.display = 'none';
    newWindow.innerHTML = printHtml;
    window.print();
    document.getElementById('print-con').style.display = 'none';
    document.getElementsByClassName('ant-modal-content')[0].style.display = 'block';
    document.getElementById('app').style.display = 'block';
  }
  render(){
    const {scanData} = this.props;
    return(
      <div style={{overflow:'hidden'}}>
        <div id="section-to-print">
          <Border>
            {
              scanData.check_time &&
              <span>查验时间：<span style={{color:'#6a6a6a'}}>{scanData.check_time}</span>{this.props.print && <Button className='no-print' style={{marginLeft:10}} type='primary' onClick={()=>this.print()}>打印</Button>}</span>
            }
            {
              scanData.title &&
              <InvoiceFont>{scanData.title}</InvoiceFont>
            }
            {
              scanData.zfbz === "Y" &&
              <TabLabel>作&nbsp;&nbsp;废</TabLabel>
            }
            <div style={{marginBottom:8,width:'100%',overflow:'hidden'}}>
              <div style={{marginRight:15,float:'left'}}><span style={{display:'inline-block'}}>发票代码：</span><ConSpan style={{display:'inline-block'}}>{scanData.fpdm}</ConSpan></div>
              <div style={{marginRight:15,float:'left'}}><span style={{display:'inline-block'}}>发票号码：</span><ConSpan style={{display:'inline-block'}}>{scanData.fphm}</ConSpan></div>
              <div style={{marginRight:15,float:'left'}}><span style={{display:'inline-block'}}>校 验 码：</span><ConSpan style={{display:'inline-block'}}>{scanData.jym}</ConSpan></div>
              <div style={{marginRight:15,float:'left'}}><span style={{display:'inline-block'}}>开票日期：</span><ConSpan style={{display:'inline-block'}}>{scanData.kprq}</ConSpan></div>
              <div style={{marginRight:15,float:'left'}}><span style={{display:'inline-block'}}>机器编号：</span><ConSpan style={{display:'inline-block'}}>{scanData.jqbh}</ConSpan></div>
            </div>
            <Sections>
              <div style={{overflow:'hidden',display:'flex',borderBottom:'1px solid #a0a0a0'}}>
                <LeftBody>
                  <LeftAspect>
                    购<div style={{height:1}}></div><br />买<div style={{height:1}}></div><br />方
                  </LeftAspect>
                  <RightAspect style={{borderRight:'1px solid #a0a0a0'}}>
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
                  <EachCol style={{width:'15%'}}>单&nbsp;&nbsp;&nbsp;&nbsp;价</EachCol>
                  <EachCol style={{width:'15%'}}>金&nbsp;&nbsp;&nbsp;&nbsp;额</EachCol>
                  <EachCol style={{width:'5%'}}>税&nbsp;&nbsp;率</EachCol>
                  <EachCol style={{borderRight:'0',flexGrow:1}}>税&nbsp;&nbsp;额</EachCol>
                </div>
                {
                  scanData.invoice_details && scanData.invoice_details.length > 0 && scanData.invoice_details.map((item,index)=>{
                    return(
                      <div key={index} style={{display:'flex'}}>
                        <EachCol style={{width:'25%',textAlign:'left'}}>
                          <ConSpan>
                            {item.hwmc}
                            {item.hwmccode===1 && <Tooltip placement="topLeft" title={'商品分类疑似错误，正确应为：'+item.hwmcdata}><Pointicon/></Tooltip>}
                          </ConSpan>
                        </EachCol>
                        <EachCol style={{width:'10%',textAlign:'right'}}><ConSpan>{item.ggxh}</ConSpan></EachCol>
                        <EachCol style={{width:'5%',textAlign:'right'}}><ConSpan>{item.dw}</ConSpan></EachCol>
                        <EachCol style={{width:'12%',textAlign:'right'}}><ConSpan>{item.sl}</ConSpan></EachCol>
                        <EachCol style={{width:'15%',textAlign:'right'}}><ConSpan>{zhMoney(item.dj)}</ConSpan></EachCol>
                        <EachCol style={{width:'15%',textAlign:'right'}}><ConSpan>{zhMoney(item.je)}</ConSpan></EachCol>
                        <EachCol style={{width:'5%',textAlign:'right'}}><ConSpan>{item.slv?item.slv==='免税'?item.slv:`${item.slv}%`:''}</ConSpan></EachCol>
                        <EachCol style={{borderRight:'0',flexGrow:1,textAlign:'right'}}><ConSpan>{zhMoney(item.se)}</ConSpan></EachCol>
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
                <div style={{display:'flex',borderTop:'1px solid #a0a0a0'}}>
                  <EachCol style={{width:'25%'}}>价&nbsp;税&nbsp;合&nbsp;计&nbsp;(&nbsp;大&nbsp;写&nbsp;)&nbsp;</EachCol>
                  <EachCol style={{flexGrow:1,borderRight:0,textAlign:'left'}}><ConSpan style={{marginLeft:15}}>ⓧ&nbsp;&nbsp;{scanData.cn_jshj}</ConSpan></EachCol>
                  <EachCol style={{borderRight:0,width:'30%',textAlign:'left'}}>(&nbsp;小&nbsp;&nbsp;&nbsp;写&nbsp;)<ConSpan style={{marginLeft:15}}>{scanData.jshj?`￥${zhMoney(scanData.jshj)}`:''}</ConSpan></EachCol>
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
        </div>
      </div>
    )
  }
}

export default Invoices;
