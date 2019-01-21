import React from 'react'
import styled from 'styled-components'
import {Input,Form,Button,DatePicker,message  } from 'antd'
import moment from 'moment';

const FormItem = Form.Item;
const InputLabel = styled.span`
  width:65px;
  line-height:32px;
  font-size:12px;
  float:left;
`;
const GroupWrap = styled.div`
  overflow:hidden;
`;
const RightTab = styled.div`
  display:inline-block;
`;
class OcrManualMake extends React.Component{
  constructor(props){
    super(props);
    let type;
    let val;
    if(this.props.val!==false){
      val = this.props.val.fpdm;
    }else{
      val = props.invoiceCode;
    }
    if(val){
      const fplx=this.getInvoiceType(val);
      if((fplx==="01"||fplx==="02"||fplx==="03")){
        if(fplx==="02"){
          type = "01";
        }else if(fplx==="03"){
          type = "03";
        }else if(fplx==="04"){
          type = "04";
        }else{
          type = "01";
        }
      }else if(fplx==="04"||fplx==="10"||fplx==="11"||fplx==="12"){
        type = "00";
      }else{
        type = "01";
      }
    }else{
      type = "01";
    }
    console.log(type)
    this.state={
      loading:false,
      invoiceType:type,
      error:'',
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
  adm = (val) => {
    if (!val) { 
      return  false 
    } 
    let fpdm = false; 
    let title = ""; 
    let placeholder = ""; 
    let text = {}; 
    let num = parseInt(val, 10); 
    let numLen = val.length; 
    //校验时间 
    let yearNum = parseInt(new Date().getFullYear().toString().substr(2, 2), 10); 
    if (isNaN(num)) { 
      return  false 
    } 
    if (numLen !== 10 && numLen !== 12) { 
      return  false 
    } 
    //10位的情况判断第八位 
    let fpdmVal = parseInt(val.charAt(7), 10); 
    let fpdmVala = parseInt(val.charAt(0), 10); 
    let fpdmValb = val.substr(10, 2); 
    let fpdmYear1 = parseInt(val.substr(4, 2), 10); 
    let fpdmYear2 = parseInt(val.substr(5, 2), 10); 
    let testYear1 = fpdmYear1 <= yearNum; 
    let testYear2 = fpdmYear2 <= yearNum; 
    if (numLen == 10) { 
      if (testYear1 && fpdmVala < 7) { 
        if (fpdmVal === 3 || fpdmVal === 6) { 
        console.log("普通发票"); 
        return  true 
        } else if (fpdmVal === 1 || fpdmVal === 2 || fpdmVal === 5 || fpdmVal === 7) { 
          return  true 
        } else { 
        return  false 
        } 
      } else { 
        return  false 
      } 
    } 
    //12位判断 
    if (numLen == 12) { 
      if (testYear2 && fpdmVala < 7) { 
        if (fpdmVala === 0) { 
          if (fpdmValb === "11") { 
            return  true 
          } else if (fpdmValb === "06" || fpdmValb === "12" || fpdmValb === "04" || fpdmValb === "05") { 
            console.log("普票") 
            return  true 
          } else if (fpdmValb === "07") { 
            return  true 
          }else if (fpdmValb === "17") { 
            return  true 
          } else { 
            return  false 
          } 
        } 
      if (fpdmVala !== 0 && fpdmVal === 2) { 
        return  true 
      }; 
      } else { 
        return  false 
      } 
        } else { 
        return false
      } 
  }
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
    const {ocrData,memo,changeWaitParam} = this.props;
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.setState({loading:true});
        if(values.kprq){
          values.KPRR = values.kprq;
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
        const dateTime2 = (year - 1) + month +  day;
        if(dateTime === values.kprq){
          this.setState({loading:false});
          message.warning('今天开具的发票，请次日录入');return;
        }
        if(dateTime2 >= values.kprq){
          this.setState({loading:false});
          message.warning('只能查询一年内的发票');return;
        }
        if(!this.props.waitConfirm){
          values.pic_id = ocrData.pic_id;
          values.filename = ocrData.filename;
          values.memo = memo;
          values.image_id = ocrData.image_id;
          values.rubbish = 1;
        }else{
          values.image_id = ocrData.id;
        }
        if(values.jym && values.jym.length === 20){
          values.jym = values.jym.substring(14);
        }
        if(values.bhje){
          values.je = values.bhje;
          delete values.bhje;
        }
        if(values.cjhj){
          values.je = values.cjhj;
          delete values.cjhj;
        }
        if(!this.props.waitConfirm){
          this.props.goCheck(values,(res)=>{
            this.props.showSuccess(res);
            this.setState({loading:false});
            this.props.addIndex();
          },(res)=>{
            this.props.showSuccess(res);
            this.setState({loading:false});
            this.props.addIndex();
          },(res)=>{
            this.props.showSuccess(res);
            this.setState({loading:false});
            this.props.addIndex();
          });
        }
        if(this.props.waitConfirm){
          changeWaitParam?changeWaitParam(values):'';
          this.props.goCheck(values,(res)=>{
            this.props.showSuccess(res);
            this.props.getVal(values)
            this.setState({loading:false});
          },(res)=>{
            this.setState({loading:false});
            this.props.getVal(values)
            this.props.showError(res);
          },(res)=>{
            this.setState({loading:false});
            this.props.getVal(values)
            this.props.showSuccess(res,1)
          });
        }
      }
    });
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    const {ocrData,cancelCheckFnc,addIndex,waitConfirm,waitCheckAction,waitList} = this.props;
    return(
      <Form>
        {
          !waitConfirm &&
          <p style={{textAlign:'center',fontSize:15,margin:'30px 0 45px'}}>发票信息</p>
        }
        {
          waitConfirm &&
          <p style={{fontSize:15,margin:'30px 0 20px'}}>发票信息</p>
        }
        <div style={{width:waitConfirm?250:330,margin:'0 auto'}}>
          <GroupWrap>
            <InputLabel>发票代码：</InputLabel>
            <RightTab>
              <FormItem hasFeedback>
                {getFieldDecorator('fpdm', {
                  initialValue:this.props.val===false?(ocrData.fpdm?ocrData.fpdm:''):this.props.val.fpdm,
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
                  <Input style={{width:waitConfirm?180:260}}
                         placeholder="请输入发票代码"
                         maxLength="12"
                         size="default"
                         onChange={(e)=>{
                           const val = e.target.value;
                           const fplx=this.getInvoiceType(val);
                           console.log(fplx)
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
                  initialValue:this.props.val===false?(ocrData.fphm?ocrData.fphm:''):this.props.val.fphm,
                  rules: [{
                    required: true, message: '发票号码不能为空',whitespace:true,
                  }, {
                    pattern: /^[0-9]{8}$/, message: '发票号码只能是8位的数字'
                  }],
                })(
                  <Input style={{width:waitConfirm?180:260}} placeholder="请输入8位发票号码" size="default" maxLength="8"/>
                )}
              </FormItem>
            </RightTab>
          </GroupWrap>
          <GroupWrap>
            <InputLabel>开票日期：</InputLabel>
            <RightTab>
              <FormItem hasFeedback>
                {getFieldDecorator('kprq', {
                  initialValue:this.props.val===false?(ocrData.kprq?moment(ocrData.kprq, 'YYYYMMDD'):undefined):moment(this.props.val.KPRR,'YYYYMMDD'),
                  rules: [{
                    required: true, message: '开票日期不能为空',
                  }],
                })(
                  <DatePicker style={{width:waitConfirm?180:260}}
                              size="default"
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
            this.state.invoiceType === '00' &&
            <GroupWrap>
              <InputLabel>校验码：</InputLabel>
              <RightTab>
                <FormItem hasFeedback>
                  {getFieldDecorator('jym', {
                    initialValue:this.props.val===false?(ocrData.jym && ocrData.jym.length === 20?ocrData.jym.substring(14):ocrData.jym):this.props.val.jym,
                    rules: [{
                      required: true, message: '校验码不能为空',whitespace:true,
                    },{
                      pattern: /^([a-zA-Z0-9]{6}|[a-zA-Z0-9]{20})$/, message: '校验码格式错误'
                    }],
                  })(
                    <Input style={{width:waitConfirm?180:260}} placeholder="请输入发票校验码后6位" size="default"/>
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
          }
          {
            this.state.invoiceType === '01' &&
            <GroupWrap>
              <InputLabel>税前金额：</InputLabel>
              <RightTab>
                <FormItem hasFeedback>
                  {getFieldDecorator('je', {
                    initialValue:this.props.val===false?(ocrData.je?ocrData.je:''):this.props.val.je,
                    rules: [{
                      required:true, message:'税前金额不能为空',whitespace:true,
                    },{
                      pattern: /^-?[0-9]+\.?[0-9]*$/, message: '金额格式错误'
                    }],
                  })(
                    <Input style={{width:waitConfirm?180:260}} placeholder="请输入税前金额"/>
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
          }
          {
            this.state.invoiceType === '03' &&
            <GroupWrap>
              <InputLabel>不含税价：</InputLabel>
              <RightTab>
                <FormItem hasFeedback>
                  {getFieldDecorator('bhje', {
                    initialValue:this.props.val===false?(ocrData.je?ocrData.je:''):this.props.val.je,
                    rules: [{
                      required:true, message:'不含税价不能为空',whitespace:true,
                    }, {
                      pattern: /^[0-9]+\.?[0-9]*$/, message: '不含税价只能是数字或小数'
                    }],
                  })(
                    <Input style={{width:waitConfirm?180:260}} placeholder="请输入不含税价"/>
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
          }
          {
            this.state.invoiceType === '02' &&
            <GroupWrap>
              <InputLabel>车价合计：</InputLabel>
              <RightTab>
                <FormItem hasFeedback>
                  {getFieldDecorator('cjhj', {
                    initialValue:this.props.val===false?(ocrData.je?ocrData.je:''):this.props.val.cjhe,
                    rules: [{
                      required:true, message:'车价合计不能为空',whitespace:true,
                    }, {
                      pattern: /^[0-9]+\.?[0-9]*$/, message: '车价合计只能是数字或小数'
                    }],
                  })(
                    <Input style={{width:waitConfirm?180:260}} placeholder="请输入车价合计"/>
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
          }
          <FormItem>
            {
              waitConfirm &&
              <div>
                <Button style={{marginRight:30,width:80}}
                        onClick={()=>{
                          cancelCheckFnc(ocrData.id);
                        }}
                >删除</Button>
                <Button type="primary"
                        onClick={this.handleSubmit}
                        loading={this.state.loading}
                >重新查验</Button>
              </div> 
            }
            {
              !waitConfirm &&
              <div style={{textAlign:'center'}}>
                <a href="javascript:;"
                   onClick={()=>{
                    cancelCheckFnc(ocrData.pic_id);
                    addIndex();
                   }}
                   style={{marginRight:20,fontSize:14}}
                >跳过此张>></a>
                <Button style={{marginRight:20}}
                        onClick={()=>{
                          const value = this.props.form.getFieldsValue();
                          value.image_id = ocrData.image_id;
                          value.finished = 0;
                          if(value.kprq){
                            value.kprq = value.kprq.format('YYYYMMDD');
                          }else{
                            value.kprq = '';
                          }
                          if(value.bhje){
                            value.je = value.bhje;
                            delete value.bhje;
                          }
                          waitCheckAction(value,()=>{
                            waitList.count = waitList.count + 1;
                            this.setState({waitList});
                            this.props.addWaitInvoice();
                            addIndex();
                          })
                        }}
                >稍后查验</Button>
                <Button type="primary"
                        style={{width:80}}
                        onClick={this.handleSubmit}
                        loading={this.state.loading}
                >查验</Button>
              </div>
            }
          </FormItem>
        </div>
      </Form>
    )
  }
}
const OcrManual = Form.create()(OcrManualMake);
export default OcrManual;

