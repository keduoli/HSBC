import React from 'react'
import styled from 'styled-components'
import {Input,Form,Button,DatePicker,message } from 'antd'

const FormItem = Form.Item;
const ManualTitle = styled.p`
  text-align:center;
  margin-left:5px;
  font-size:15px;
  margin-bottom:40px;
  font-weight:600;
`;
const ManualCon = styled.div`
  background:#fff;
  width:40%;
  padding-top:40px;
  height:77vh;
  float:right;
  margin-right:23px;
`;
const InputLabel = styled.span`
  width:100px;
  line-height:32px;
  float:left;
`;
const GroupWrap = styled.div`
  overflow:hidden;
`;
const RightTab = styled.div`
  display:inline-block;
`;
class ManualInputMake extends React.Component{
  constructor(props){
    super(props);
    this.state={
      invoice:"01",
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
        if (a.charAt(0) === '0' && (a.substring(10,12) === '04' || a.substring(10,12) === '05') && d==='0') { //判断是否为新式普票
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
  adm = (a) => {
    let b=/^1|0\d{11}$|^\d{6}[1-9]\d{2}0$/;
    let e=b.test(a);
    if(e === true && this.bc(a) && this.getInvoiceType(a) !== "99"){
      return true;
    }else{
      return false;
    }
  };
  bc = (a) => {
    let b;
    let d=new Date();
    let e=d.getFullYear();
    let f=e.toString();
    let g=f.substring(2);
    if(a.length===12){
      b=a.substring(5,7);
    }else{
      b=a.substring(4,6);
    }
    if(b<='00'|| b>g){
      return false;
    }
    return true;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        if(values.kprq){
          values.kprq = values.kprq.format('YYYYMMDD');
        }
        const now = new Date();
        const year = now.getFullYear();
        let month =(now.getMonth() + 1).toString();
        let day = (now.getDate()).toString();
        if (month.length === 1) {
          month = "0" + month;
        }
        if (day.length === 1) {
          day = "0" + day;
        }
        const dateTime = year + month +  day;
        if(dateTime === values.kprq){
          message.warning('今天开具的发票，请次日录入');return;
        }
        if(values.cjhj){
          values.je = values.cjhj;
          delete values.cjhj;
        }
        if(values.jym && values.jym.length === 20){
          values.jym = values.jym.substring(14);
        }
        if(values.bhje){
          values.je = values.bhje;
          delete values.bhje;
        }
        if(this.props.showGroup === true){
        	values.is_group = 1
        }
        this.props.changeManual(values);
        this.props.changeCanShow();
        this.props.showLoadingFnc();
        this.props.manualCheck(values,(res)=>{
          this.props.showScanSuccess(res);
        },(res,msg)=>{
          this.props.showScanError(res,msg);
        },(res)=>{
          this.props.showTips(res,1);
        },(res,msg)=>{
          this.props.scanAgainFnc(res,msg);
        })
      }
    });
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    const {showScan} = this.props;
    return(
      <ManualCon>
        <div style={{width:"410px",margin:"0 auto"}}>
        <ManualTitle>手动录入</ManualTitle>
        <Form>
          <GroupWrap>
            <InputLabel>发票代码：</InputLabel>
            <RightTab>
              <FormItem>
                {getFieldDecorator('fpdm', {
                  rules: [{
                    validator: (rule, value, callback)=>{
                      const reg = /^[0-9]*$/;
                      if(!value){
                        callback('发票代码不能为空');
                      }
                      if(!reg.test(value)){
                        callback('发票代码错误');
                      }else{
                        if(!this.adm(value)){
                          callback('发票代码错误');
                        }
                      }
                      callback();
                    },
                  }],
                })(
                  <Input style={{width:300}}
                         placeholder="请输入发票代码"
                         maxLength="12"
                         onChange={(e)=>{
                           const val = e.target.value;
                           const fplx=this.getInvoiceType(val);
                           //"00"普通发票  "01" 专用发票  “03” 机动车票  “00”通行费后两位为12
                           if((fplx==="01"||fplx==="02"||fplx==="03")){
                             if(fplx==="02"){
                               this.setState({invoice:'01'});
                             }else if(fplx==="03"){
                               this.setState({invoice:'03'});
                             }else{
                               this.setState({invoice:'01'});
                             }
                           }else if(fplx==="04"||fplx==="10"||fplx==="11"||fplx==="12"||fplx==="13"){
                             this.setState({invoice:'00'});
                           }else if(fplx==='14'){
                            this.setState({invoice:'02'});
                           }else{
                             this.setState({invoice:'01'});
                           }
                         }}
                  />
                )}
              </FormItem>
            </RightTab>
          </GroupWrap>
          <GroupWrap>
            <InputLabel>发票号码：</InputLabel>
            <RightTab>
              <FormItem hasFeedback>
                {getFieldDecorator('fphm', {
                  rules: [{
                    required: true, message: '发票号码不能为空',whitespace:true,
                  }, {
                    pattern: /^[0-9]{8}$/, message: '发票号码只能是8位的数字'
                  }],
                })(
                  <Input style={{width:300}} placeholder="请输入8位发票号码" maxLength="8"/>
                )}
              </FormItem>
            </RightTab>
          </GroupWrap>
          <GroupWrap>
            <InputLabel>开票日期：</InputLabel>
            <RightTab>
              <FormItem hasFeedback>
                {getFieldDecorator('kprq', {
                  rules: [{
                    required: true, message: '开票日期不能为空',
                  }],
                })(
                  <DatePicker style={{width:300}}
                              format="YYYYMMDD"
                              disabledDate={(current)=>{
                                return current && current.valueOf() > Date.now();
                              }}
                              placeholder="请输入YYYYMMDD"
                              allowClear={false}/>
                )}
              </FormItem>
            </RightTab>
          </GroupWrap>
          {
            this.state.invoice === "00" &&
            <GroupWrap>
              <InputLabel>校验码后6位：</InputLabel>
              <RightTab>
                <FormItem hasFeedback>
                  {getFieldDecorator('jym', {
                    rules: [{
                      required: true, message: '校验码不能为空',whitespace:true,
                    }, {
                      pattern: /^([a-zA-Z0-9]{6}|[a-zA-Z0-9]{20})$/, message: '校验码格式错误'
                    }],
                  })(
                    <Input style={{width:300}}
                           placeholder="请输入发票校验码后6位"
                    />
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
          }
          {
            this.state.invoice === "01" &&
            <GroupWrap>
              <InputLabel>税前金额：</InputLabel>
              <RightTab>
                <FormItem hasFeedback>
                  {getFieldDecorator('je', {
                    rules: [{
                      required:true, message:'税前金额不能为空',whitespace:true,
                    }, {
                      pattern: /^-?[0-9]+\.?[0-9]*$/, message: '金额格式错误'
                    }],
                  })(
                    <Input style={{width:300}} placeholder="请输入税前金额"/>
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
          }
          {
            this.state.invoice === "03" &&
            <GroupWrap>
              <InputLabel>不含税价：</InputLabel>
              <RightTab>
                <FormItem hasFeedback>
                  {getFieldDecorator('bhje', {
                    rules: [{
                      required:true, message:'不含税价不能为空',whitespace:true,
                    }, {
                      pattern: /^[0-9]+\.?[0-9]*$/, message: '不含税价只能是数字或小数'
                    }],
                  })(
                    <Input style={{width:300}} placeholder="请输入不含税价"/>
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
          }
          {
            this.state.invoice === '02' &&
            <GroupWrap>
              <InputLabel>车价合计：</InputLabel>
              <RightTab>
                <FormItem hasFeedback>
                  {getFieldDecorator('cjhj', {
                    rules: [{
                      required:true, message:'车价合计不能为空',whitespace:true,
                    }, {
                      pattern: /^[0-9]+\.?[0-9]*$/, message: '车价合计只能是数字或小数'
                    }],
                  })(
                    <Input style={{width:300}} placeholder="请输入车价合计"/>
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
          }
          <div style={{textAlign:'center'}}>
            <FormItem>
              <div style={{margin:"0 auto"}}>
                <Button type="primary" size='large' style={{marginTop:70}} onClick={this.handleSubmit}>查验</Button>
              </div>
            </FormItem>
          </div>
        </Form>
        </div>
      </ManualCon>
    )
  }
}
const ManualInput = Form.create()(ManualInputMake);
export default ManualInput;
