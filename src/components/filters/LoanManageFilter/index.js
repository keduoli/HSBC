import React from 'react';
import { Form, Row, Col, Button, DatePicker, Select, Modal, Collapse, Icon, message,Input  } from 'antd';
import moment from 'moment';
import styled from 'styled-components'
const dateFormat = 'YYYY-MM-DD';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const {Option} = Select;
const FilButton = styled(Button)`
  width:105px;
  height:30px;
`;
const WarningDiv = styled.div`
  font-size:12px;
  height:12px;
  color:red;
`;
class LoanManageFilterMake extends React.Component{
  state={
    waringPrompt:'',
    maxMoney:this.props.state.max_dd_amount,
    minMoney:this.props.state.min_dd_amount,
    moneyOk:false,
  }
  disabledDate = (current) => {
    return current.valueOf() > Date.now();
  };
  minChange = (e) => {
    const minMoney = e.target.value;
    const reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
    this.setState({minMoney})
    if(minMoney!==''){
      if(!reg.test(minMoney)){
        this.setState({waringPrompt:'只能输入正数且最多两位小数',moneyOk:false});
      }else if(this.state.maxMoney!=='' && Number(minMoney)>Number(this.state.maxMoney)){
        this.setState({waringPrompt:'最小金额不能大于最大金额',moneyOk:false});
      }else if(this.state.maxMoney!=='' && !reg.test(this.state.maxMoney)){
        this.setState({waringPrompt:'只能输入正数且最多两位小数',moneyOk:false});
      }else if(this.state.maxMoney!=='' && this.state.maxMoney.length>20){
        this.setState({waringPrompt:'放款金额不能超过20位',moneyOk:false});
      }else if(minMoney.length>20){
        this.setState({waringPrompt:'放款金额不能超过20位',moneyOk:false});
      }else{
        this.setState({waringPrompt:'',moneyOk:true})
      }
    }else{
      if(reg.test(this.state.maxMoney)) {
        this.setState({waringPrompt:'',moneyOk:true})
      }else{
        this.setState({waringPrompt:'',moneyOk:false})
      }
    }
  }
  maxChange = (e) => {
    const maxMoney = e.target.value;
    const reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
    this.setState({maxMoney})
    if(maxMoney!==''){
      if(!reg.test(maxMoney)){
        this.setState({waringPrompt:'只能输入正数且最多两位小数',moneyOk:false});
      }else if(this.state.minMoney!=='' && Number(maxMoney)<Number(this.state.minMoney)){
        this.setState({waringPrompt:'最大金额不能小于最小金额',moneyOk:false});
      }else if(this.state.minMoney!=='' && !reg.test(this.state.minMoney)){
        this.setState({waringPrompt:'只能输入正数且最多两位小数',moneyOk:false});
      }else if(this.state.minMoney!=='' && this.state.minMoney.length>20){
        this.setState({waringPrompt:'放款金额不能超过20位',moneyOk:false});
      }else if(maxMoney.length>20){
        this.setState({waringPrompt:'放款金额不能超过20位',moneyOk:false});
      }else{
        this.setState({waringPrompt:'',moneyOk:true})
      }
    }else{
      if(reg.test(this.state.minMoney)){
        this.setState({waringPrompt:'',moneyOk:true})
      }else{
        this.setState({waringPrompt:'',moneyOk:false})
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        if(this.state.waringPrompt!=='')return;
        const rangeValue = values['time'];
        if(rangeValue){
          if(rangeValue.length > 0){
            values['start_dd_date'] = rangeValue[0].format('YYYY-MM-DD');
            values['end_dd_date'] = rangeValue[1].format('YYYY-MM-DD');
            if(rangeValue[1].valueOf()-rangeValue[0].valueOf()>(365*3*24*3600*1000)){
              message.error("放款日期区间不能超过三年");return;
            }
          }
        }else{
          values['start_dd_date'] = '';
          values['end_dd_date'] = '';
        }
        values['min_dd_amount'] = this.state.minMoney;
        values['max_dd_amount'] = this.state.maxMoney;
        this.props.searchFnc(values)
      }
    })
  }
  clearFnc = () => {
    this.props.form.resetFields();
    this.props.clearAllFnc()
    this.setState({
      waringPrompt:'',
      maxMoney:'',
      minMoney:'',
      moneyOk:false,
    })
  }
  disabledDate = (current) => {
    return current.valueOf() > Date.now();
  };
  render(){
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 }, 
        sm: { span: 8 },
        lg: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        lg: { span: 18 },
      },
    };
    const formItemLayout1 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        lg: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        lg: { span: 16 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    const { state } = this.props;
    return(
        <Form className="ant-advanced-search-form invoice_filter" style={{borderLeft:'3px solid #2397CA',background: '#fff',padding:'10px 0 0 5px'}}>
          <Row gutter={5}>
            <Col span={5} key={1}>
              <FormItem {...formItemLayout1} label='客户名称'>
                {getFieldDecorator(`cus_name`,{
                  initialValue:state.cus_name,
                  rules: [{
                    validator: (rule, value, callback)=>{
                      if(value){
                        if(value.length>30){
                          callback('客户名称不能超过30位');
                        }
                      }
                      callback();
                    },
                  }],
                })(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col span={6} key={2}>
              <FormItem {...formItemLayout} label='客户编号'>
                {getFieldDecorator(`cus_num`,{
                  initialValue:state.cus_num,
                  rules: [{
                    validator: (rule, value, callback)=>{
                      if(value){
                        if(value.length>20){
                          callback('客户编号不能超过20位');
                        }
                      }
                      callback();
                    },
                  }],
                })(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col span={6} key={4}>
              <FormItem {...formItemLayout} label='货款账号'>
                {getFieldDecorator(`debt_account`,{
                  initialValue:state.debt_account,
                  rules: [{
                    validator: (rule, value, callback)=>{
                      if(value){
                        if(value.length>20){
                          callback('货款账号不能超过20位');
                        }
                      }
                      callback();
                    },
                  }],
                })(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col span={7} key={5}>
              <FormItem {...formItemLayout} label='放款备注1'>
                {getFieldDecorator(`memo`,{
                  initialValue:state.memo,
                  rules: [{
                    validator: (rule, value, callback)=>{
                      if(value){
                        if(value.length>80){
                          callback('放款备注1不能超过80位');
                        }
                      }
                      callback();
                    },
                  }],
                })(
                  <Input/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={5}>
            <Col span={5} key={6}>
              <FormItem {...formItemLayout1} label='放款状态'>
                {getFieldDecorator(`state`,{
                  initialValue:state.state,
                })(
                  <Select>
                    <Option key='0'>未放款</Option>
                    <Option key='1'>已放款待补交</Option>
                    <Option key='2'>放款完成</Option>
                    <Option key='3'>放款取消</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={6} key={7}>
              <FormItem {...formItemLayout} label='放款日期'>
                {getFieldDecorator(`time`,{
                  initialValue:state.time!==''&&state.time,
                })(
                  <RangePicker
                    size='large'
                  />
                )}
              </FormItem>
            </Col>
            <Col span={6} key={8}>
              <FormItem {...formItemLayout} label='放款金额'>
                <div style={{overflow:'hidden'}}>
                  <Input placeholder='请输入最低值' style={{float:'left',width:'45%'}} onChange={this.minChange} value={this.state.minMoney}/>
                  <span style={{width:'10%',textAlign:'center',float:'left'}}>~</span>     
                  <Input placeholder='请输入最高值' style={{float:'right',width:'45%'}} value={this.state.maxMoney} onChange={this.maxChange}/>
                </div>
                <WarningDiv>{this.state.waringPrompt}</WarningDiv>
              </FormItem>
            </Col>
            <Col span={7} key={9}>
              <FormItem {...formItemLayout} label='放款流水号'>
                {getFieldDecorator(`num`,{
                  initialValue:this.props.state.num!==''?this.props.state.num:'',
                  rules: [{
                    validator: (rule, value, callback)=>{
                      if(value){
                        if(value.length>30){
                          callback('放款流水号不能超过30位');
                        }
                      }
                      callback();
                    },
                  }],
                })(
                  <Input/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={5}>
            <Col span={6} key={3} style={{float:'right',marginBottom:15}}>
              <Button type='primary' style={{margin:'0 15px 0 15px',float:'right'}} onClick={this.handleSubmit}>搜索</Button>
              {
                this.props.showInfo && 
                <Button style={{float:'right'}} onClick={this.clearFnc}>清空</Button>
              }
              {
                this.props.showInfo &&
                <Button onClick={()=>{
                  this.props.checkInvoice();
                }} style={{margin:'0 15px 0 15px',float:'right'}}>{this.props.showCheck===true?'勾选全部':'取消勾选'}</Button>
              }
            </Col>
          </Row>
        </Form>
    )
  }
}

const LoanManageFilter = Form.create()(LoanManageFilterMake);
export default LoanManageFilter
