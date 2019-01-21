import React from 'react'
import styled from 'styled-components'

const Border = styled.div`
  width:100%;
  padding:10px;
  position:relative;
`;
const InvoiceFont = styled.p`
  margin-top:20px;
  font-size:16px;
  color:#fc6051;
  text-align:center;
  line-height:3;
`;
class InvoiceError extends React.Component{
  state = {
    invoiceType:''
  }
  componentWillMount(){
    if(this.props.scanData.err_reason === '其它发票录入无详情'){
      return;
    }
    const fplx=this.getInvoiceType(this.props.scanData.fpdm);
    if((fplx==="01"||fplx==="02"||fplx==="03")){
      if(fplx==="02"){
        this.setState({invoiceType:'01'});
      }else if(fplx==="03"){
        this.setState({invoiceType:'03'});
      }else{
        this.setState({invoiceType:'01'});
      }
    }else if(fplx==="04"||fplx==="10"||fplx==="11"||fplx==="12"||fplx==="13"){
      this.setState({invoiceType:'00'});
    }else if(fplx==='14'){
      this.setState({invoiceType:'02'});
    }else{
      this.setState({invoice:'01'});
    }
  }
  getInvoiceType = (a) => {
    let b;
    let c="99";
    let d;
    if(a.length===12){
      b=a.substring(7,8);
      d=a.substring(0,1);
      if (c === "99") {  //增加判断，判断是否为新版电子票
        if (a.charAt(0) === '0' && a.substring(10,12) === '11') {
          c="10";
        }
        if (a.charAt(0) === '0' && (a.substring(10,12) === '06' || a.substring(10,12) === '07')) {  //判断是否为卷式发票  第1位为0且第11-12位为06或07
          c="11";
        }
        if (a.charAt(0) === '0' && (a.substring(10,12) === '04' || a.substring(10,12) === '05') && d==='0') { //判断新式普票
         
          c="12";
        }
        if (a.charAt(0) === '0' && a.substring(10,12) === '12' && d==='0') { //判断是否为通行费票
          c="13";
        }
        if (a.charAt(0) === '0' && a.substring(10,12) === '17' && d==='0') { //判断是否为二手车票
          c="14";
        }
      }
      if(c==="99"){ //如果还是99，且第8位是2，则是机动车发票
        if (b==='2' && a.charAt(0) !== '0') {
          c="03";
        }
      }
    }else if(a.length===10){
      b=a.substring(7,8);
      if(b==='1'||b==='5'){
        c="01";
      }else if(b==='6'||b==='3'){
        c="04";
      }else if(b==='7'||b==='2'){
        c="02";
      }
    }
    return c;
  };
  render(){
    const {scanData} = this.props;
    return(
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
          !scanData.title && ( scanData.is_special === 2 || scanData.is_einvoice === 2 ) &&
          <InvoiceFont>其他发票</InvoiceFont>
        }
        <ul className="invoice-error-table">
          <li>  
            <span className="invoice-error-th">发票代码</span>
            <span className="invoice-error-td">{scanData.fpdm}</span>
          </li>
          <li>
            <span className="invoice-error-th">发票号码</span>
            <span className="invoice-error-td">{scanData.fphm}</span>
          </li>
          <li>
            <span className="invoice-error-th">开票日期</span>
            <span className="invoice-error-td">{scanData.kprq}</span>
          </li>
          <li style={{borderBottom:'0'}}>
            <span className="invoice-error-th">
              {this.state.invoiceType === '00' && '校验码'}
              {this.state.invoiceType === '01' && '税前金额'}
              {this.state.invoiceType === '03' && '不含税价'}
              {this.state.invoiceType === '02' && '车价合计'}
              {this.state.invoiceType === '' && '价税合计'}
            </span>
            <span className="invoice-error-td">{this.state.invoiceType === ''?scanData.jshj:scanData.variable}</span>
          </li>
        </ul>
      </Border>
    )
  }
}

export default InvoiceError;
