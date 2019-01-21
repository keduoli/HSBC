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
class DrawInvoiceLinkFilterMake extends React.Component{
  disabledDate = (current) => {
    return current.valueOf() > Date.now();
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.props.searchFnc(values);
      }
    })
  }
  clearFnc = () => {
    this.props.form.resetFields();
    this.props.clearAllFnc()
  }
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
    return(
        <Form className="ant-advanced-search-form invoice_filter" style={{borderLeft:'3px solid #2397CA',background: '#fff',padding:'10px 0 0 5px'}}>
          {
            !this.props.drawdownUnlinkInvoice &&
            <Row gutter={5}>
                <Col span={8} key={1}>
                  <FormItem {...formItemLayout} label='合同编码'>
                    {getFieldDecorator(`con_num`,{
                      rules: [{
                        validator: (rule, value, callback)=>{
                          if(value){
                            if(value.length>20){
                              callback('合同编码不能超过20位');
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
                <Col span={8} key={2}>
                  <FormItem {...formItemLayout} label='购方名称'>
                    {getFieldDecorator(`gfmc`,{
                      rules: [{
                        validator: (rule, value, callback)=>{
                          if(value){
                            if(value.length>30){
                              callback('购方名称不能超过30位');
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
                <Col span={8} key={4}>
                  <FormItem {...formItemLayout} label='销方名称'>
                    {getFieldDecorator(`xfmc`,{
                      rules: [{
                        validator: (rule, value, callback)=>{
                          if(value){
                            if(value.length>30){
                              callback('销方名称不能超过30位');
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
          }  
          <Row gutter={5}>
            <Col span={8} key={5}>
              <FormItem {...formItemLayout} label='发票代码'>
                {getFieldDecorator(`fpdm`,{
                  rules: [{
                    validator: (rule, value, callback)=>{
                      if(value){
                        if(value.length>20){
                          callback('发票代码不能超过20位');
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
            <Col span={8} key={6}>
              <FormItem {...formItemLayout} label='发票号码'>
                {getFieldDecorator(`fphm`,{
                  rules: [{
                    validator: (rule, value, callback)=>{
                      if(value){
                        if(value.length>20){
                          callback('发票号码不能超过20位');
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
            <Col span={8} key={3} style={{float:'right'}}>
              <Button type='primary' style={{margin:'0 15px 0 15px',float:'right'}} onClick={this.handleSubmit}>搜索</Button>
              {
                this.props.showInfo && 
                <Button style={{float:'right'}} onClick={this.clearFnc}>清空</Button>
              }
            </Col>
          </Row>
        </Form>
    )
  }
}

const DrawInvoiceLinkFilter = Form.create()(DrawInvoiceLinkFilterMake);
export default DrawInvoiceLinkFilter
