import React from 'react'
import styled from 'styled-components'
import {Modal,Button,Select,message} from 'antd'
import { num_format,DX } from './../../util'
import { apiUrl } from 'config';
const Option = Select.Option;
const ExpandCons = styled.div`
  overflow:hidden;
  padding:13px;
  font-size:12px;
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
  justify-content:space-between;
  padding:10px;
`;
const BottonBtn = styled(Button)`
  height:30px;
  text-align:center;
`;
const EleImg = styled.img`
  width:100%
`;
class invoiceModal extends React.Component{
  state={
    hsbz:'2'
  }
  hsbzChange = (e) => {
    this.setState({hsbz:e})
  }
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
    });
  }
  getNextMonth = (date) => {
    let arr = date.split('-');
    let year = arr[0]; //获取当前日期的年份
    let month = arr[1]; //获取当前日期的月份
    let day = arr[2]; //获取当前日期的日
    let days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    let year2 = year;
    let month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
    }
    let day2 = day;
    let days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    return month2>arr[1]
  }
  render(){
    const {invoiceAction,refreshData,navList,scanData} = this.props;
    return(
      <Modal style = {{top:50}}
             visible
             onCancel={this.props.cancelFnc}
             width={'75%'}
             footer={null}
      > 
      {
        scanData.fpzl === ( '10' || '14') ?
        <ExpandCons>
          <EleImg src={this.props.scanData.file_path}/>
          <div>
            <div style={{float:'left',marginLeft:20}}>收票人手机号：{scanData.sprsjh?scanData.sprsjh:''}</div>
            <div style={{float:'left'}}>收票人邮箱：{scanData.spryx?scanData.spryx:''}</div>
          </div>
          {
            navList.admin_level === 0 && navList.plugin.consortium === true && navList.company_id === navList.root_company[0].id ?
            ''
            :
            <div style={{display:'flex',justifyContent:'center',marginTop:20,overflow:'hidden'}}>
              {
                scanData.hczt === 1 ?
                ''
                :
                <BottonBtn type='primary' style={{marginRight:20}} onClick={()=>{
                  if(this.props.scanData.hczt !== 0){
                    message.error("只有未冲红的发票才能冲红");return;
                  }
                  if(this.props.scanData.zfbz === 1){
                    message.error("已作废的发票不能冲红");return;
                  }
                  if(!this.props.electronicData || this.props.electronicData[0].fjzt === '离线'){
                    Modal.error({
                      title: '开具失败',
                      content: '税控盘状态不在线，请检查税控盘',
                    });return;
                  }
                  this.props.redFlushing(scanData)
                }}>冲红</BottonBtn>
              }
              <BottonBtn type='primary' onClick={()=>{
                this.props.exportAction({outinvoice_ids:scanData.id,export_type:'pdf'})
              }}>下载发票</BottonBtn>
            </div>
          }
        </ExpandCons>
        :
        <ExpandCons>
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
                    scanData.zfbz === 1 &&
                    <TabLabel>作&nbsp;&nbsp;废</TabLabel>
                  }
                  {
                    scanData.hczt === 1 &&
                    <TabLabel>已&nbsp;冲&nbsp;红</TabLabel>
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
                  <p style={{marginBottom:8,display:'flex',justifyContent:'space-between'}}>
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
                          <div><InvoiceTitSpan>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;称 :</InvoiceTitSpan><ConSpan>{scanData.gfmc}</ConSpan></div>
                          <div><InvoiceTitSpan>纳税人识别号：</InvoiceTitSpan><ConSpan>{scanData.gfsbh}</ConSpan></div>
                          <div><InvoiceTitSpan style={{float:'left'}}>地&nbsp;址、&nbsp;电&nbsp;话 :</InvoiceTitSpan><ConSpan>{scanData.gfdzdh}</ConSpan></div>
                          <div><InvoiceTitSpan>开户行及账户：</InvoiceTitSpan><ConSpan>{scanData.gfyhzh}</ConSpan></div>
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
                                item.zkje!=='' &&
                                <div style={{display:'flex'}}>
                                  <EachCol style={{width:'25%',textAlign:'left'}}><ConSpan>{item.hwmc}</ConSpan></EachCol>
                                  <EachCol style={{width:'10%',textAlign:'right'}}><ConSpan></ConSpan></EachCol>
                                  <EachCol style={{width:'5%',textAlign:'right'}}><ConSpan></ConSpan></EachCol>
                                  <EachCol style={{width:'12%',textAlign:'right'}}><ConSpan></ConSpan></EachCol>
                                  <EachCol style={{width:'15%',textAlign:'right'}}><ConSpan></ConSpan></EachCol>
                                  <EachCol style={{width:'15%',textAlign:'right'}}><ConSpan>{this.state.hsbz === '2'?item.zkje:(item.zkje-(-item.zkse))}</ConSpan></EachCol>
                                  <EachCol style={{width:'5%',textAlign:'right'}}><ConSpan>{item.slv?item.slv==='2'?'免税':item.slv==='2'?'不征税':`${item.slv}%`:''}</ConSpan></EachCol>
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
                        <EachCol style={{width:'15%',textAlign:'right'}}><ConSpan>{scanData.je?this.state.hsbz === '2'?`￥${Number(scanData.je).toFixed(2)}`:`￥${(Number(scanData.je)+Number(scanData.se)).toFixed(2)}`:''}</ConSpan></EachCol>
                        <EachCol style={{width:'5%'}}/>
                        <EachCol style={{borderRight:0,flexGrow:1,textAlign:'right'}}><ConSpan>{scanData.se?`￥${Number(scanData.se).toFixed(2)}`:''}</ConSpan></EachCol>
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
                <div>
                  <OutCon>
                    <div>
                      收款人：{scanData.skrmc}
                    </div>
                    <div>
                      复核人: {scanData.fhrmc}
                    </div>
                    <div>
                      开票人：{scanData.kprmc}
                    </div>
                    <div>
                      销售方: (章）
                    </div>
                  </OutCon>
                  {
                    navList.admin_level === 0 && navList.plugin.consortium === true && navList.company_id === navList.root_company[0].id ?
                    ''
                    :
                    <div style={{display:'flex',justifyContent:'center'}}>
                    {
                      this.getNextMonth(scanData.kprq) ? 
                      <BottonBtn type='primary' onClick={()=>{
                        if(this.props.scanData.zfbz === 1){
                          message.error("已作废的发票不能作废");return;
                        }
                        if(this.props.settingList.tax_control_type === 1){
                          message.error("税控盘不能进行作废操作");return;
                        }
                        window.invoiceSdk.cancel(
                          'localhost:15678',
                          this.props.companyList&&this.props.companyList.tax_number,
                          this.props.settingList.tax_control_type === 1? 'BW_dGVzdHRlc3Q':'dGVzdHRlc3Q',
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
                          if(res.body.data.Msg === '6011-发票作废成功 [,]'){
                            this.props.paperAction({outinvoice_id:scanData.id,action:2},()=>{
                              this.props.refreshData()
                              this.props.cancelFnc()
                            })
                          }else{
                              Modal.error({
                              title: '作废失败',
                              content: res.body.data.Msg,
                            });
                          }
                        })
                      }}>作废</BottonBtn>
                      :
                      scanData.hczt === 1 ?
                      ''
                      :
                      <BottonBtn type='primary' onClick={()=>{
                        if(this.props.scanData.hczt !== 0){
                          message.error("只有未冲红的发票才能冲红");return;
                        }
                        if(this.props.scanData.zfbz === 1){
                          message.error("已作废的发票不能冲红");return;
                        }
                        this.props.redFlushing(scanData)
                      }}>冲红</BottonBtn>
                    }
                    <BottonBtn style={{marginLeft:20}} type='primary' onClick={()=>{
                      if(this.props.settingList.tax_control_type === 1){
                        message.error('税控盘暂不支持打印');return;
                      }else{
                        this.print()
                      }
                    }}>打印</BottonBtn>
                    </div>
                  }
                </div>
              </div>
            </InvoiceLeft>
          </div>
        </ExpandCons>
      }
      </Modal>
    )
  }
}

export default invoiceModal;

