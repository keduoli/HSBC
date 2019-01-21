import React from 'react'
import styled from 'styled-components'

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
const InvoiceTitSpan = styled.span`
  display:inline-block;
  width:90px;
`;
class Deduction extends React.Component{
  render(){
    const {scanData} = this.props;
    return(
      <Border>
        <InvoiceFont>增值税专用发票</InvoiceFont>
        <p style={{marginBottom:8}}>
          <span style={{marginRight:15}}>发票代码：<ConSpan>{scanData.fpdm}</ConSpan></span>
          <span style={{marginRight:15}}>发票号码：<ConSpan>{scanData.fphm}</ConSpan></span>
          <span style={{marginRight:15}}>校 验 码：<ConSpan>{scanData.jym}</ConSpan></span>
          <span style={{marginRight:15}}>开票日期：<ConSpan>{scanData.kprq}</ConSpan></span>
          <span style={{marginRight:15}}>机器编号：<ConSpan>{scanData.jqbh}</ConSpan></span>
        </p>
        <Sections>
          <div style={{overflow:'hidden',display:'flex',borderBottom:'1px solid #a0a0a0'}}>
            <LeftBody>
              <LeftAspect>
                购<div style={{height:1}}></div><br />买<div style={{height:1}}></div><br />方
              </LeftAspect>
              <RightAspect style={{borderRight:'1px solid #a0a0a0'}}>
                <p><InvoiceTitSpan>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;称 :</InvoiceTitSpan><ConSpan>{scanData.gfmc}</ConSpan></p>
                <p><InvoiceTitSpan>纳税人识别号：</InvoiceTitSpan><ConSpan>{scanData.gfsbh}</ConSpan></p>
                <p><InvoiceTitSpan style={{float:'left'}}>地&nbsp;址、&nbsp;电&nbsp;话 :</InvoiceTitSpan><ConSpan>{scanData.gfdzdh}</ConSpan></p>
                <p><InvoiceTitSpan>开户行及账户：</InvoiceTitSpan><ConSpan>{scanData.gfyhzh}</ConSpan></p>
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
              scanData.details.length > 0 && scanData.details.map((item,index)=>{
                return(
                  <div key={index} style={{display:'flex'}}>
                    <EachCol style={{width:'25%',textAlign:'left'}}><ConSpan>{item.hwmc}</ConSpan></EachCol>
                    <EachCol style={{width:'10%',textAlign:'right'}}><ConSpan>{item.ggxh}</ConSpan></EachCol>
                    <EachCol style={{width:'5%',textAlign:'right'}}><ConSpan>{item.dw}</ConSpan></EachCol>
                    <EachCol style={{width:'12%',textAlign:'right'}}><ConSpan>{item.sl}</ConSpan></EachCol>
                    <EachCol style={{width:'15%',textAlign:'right'}}><ConSpan>{item.dj}</ConSpan></EachCol>
                    <EachCol style={{width:'15%',textAlign:'right'}}><ConSpan>{item.je}</ConSpan></EachCol>
                    <EachCol style={{width:'5%',textAlign:'right'}}><ConSpan>{item.slv?`${item.slv}%`:''}</ConSpan></EachCol>
                    <EachCol style={{borderRight:'0',flexGrow:1,textAlign:'right'}}><ConSpan>{item.se}</ConSpan></EachCol>
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
              <EachCol style={{width:'15%',textAlign:'right'}}><ConSpan>{scanData.fpje?`￥${scanData.fpje}`:''}</ConSpan></EachCol>
              <EachCol style={{width:'5%'}}/>
              <EachCol style={{borderRight:0,flexGrow:1,textAlign:'right'}}><ConSpan>{scanData.fpse?`￥${scanData.fpse}`:''}</ConSpan></EachCol>
            </div>
            <div style={{display:'flex',borderTop:'1px solid #a0a0a0'}}>
              <EachCol style={{width:'25%'}}>价&nbsp;税&nbsp;合&nbsp;计&nbsp;(&nbsp;大&nbsp;写&nbsp;)&nbsp;</EachCol>
              <EachCol style={{flexGrow:1,borderRight:0,textAlign:'left'}}><ConSpan style={{marginLeft:15}}>ⓧ&nbsp;&nbsp;{scanData.cn_jshj}</ConSpan></EachCol>
              <EachCol style={{borderRight:0,width:'30%',textAlign:'left'}}>(&nbsp;小&nbsp;&nbsp;&nbsp;写&nbsp;)<ConSpan style={{marginLeft:15}}>{scanData.jshj?`￥${scanData.jshj}`:''}</ConSpan></EachCol>
            </div>
          </div>
          <div style={{overflow:'hidden',display:'flex',borderTop:'1px solid #a0a0a0'}}>
            <LeftBody>
              <LeftAspect>
                销<br /><div style={{height:5}}></div>售<br /><div style={{height:5}}></div>方
              </LeftAspect>
              <RightAspect style={{borderRight:'1px solid #a0a0a0'}}>
                <p><InvoiceTitSpan>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;称 :</InvoiceTitSpan><ConSpan>{scanData.xfmc}</ConSpan></p>
                <p><InvoiceTitSpan>纳税人识别号：</InvoiceTitSpan><ConSpan>{scanData.xfsbh}</ConSpan></p>
                <p><InvoiceTitSpan style={{float:'left'}}>地&nbsp;址、&nbsp;电&nbsp;话 :</InvoiceTitSpan><ConSpan>{scanData.xfdzdh}</ConSpan></p>
                <p><InvoiceTitSpan>开户行及账户：</InvoiceTitSpan><ConSpan>{scanData.xfyhzh}</ConSpan></p>
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
    )
  }
}

export default Deduction;
