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
class CollectionFilterMake extends React.Component{
  state={
    kpje:'='
  } 
  disabledDate = (current) => {
    return current.valueOf() > Date.now();
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.searchFnc(values);
    })
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
          <Row gutter={5}>
            <Col span={8} key={1}>
              <FormItem {...formItemLayout} label='企业名称'>
                {getFieldDecorator(`name`)(
                  <Input placeholder='请输入企业名称'/>
                )}
              </FormItem>
            </Col>
            <Col span={8} key={2}>
              <FormItem {...formItemLayout1} label='纳税人识别号'>
                {getFieldDecorator(`tax_number`)(
                  <Input placeholder='请输入纳税人识别号'/>
                )}
              </FormItem>
            </Col>
            <Col span={8} key={3}>
              <Button type='primary' style={{margin:'0 15px 0 15px',float:'left'}} onClick={this.handleSubmit}>搜索</Button>
              {
                this.props.showInfo && 
                <Button type='primary' style={{float:'left'}} onClick={()=>this.props.clearFnc()}>清空</Button>
              }
            </Col>
          </Row>
          <Row gutter={5}>
            <Col span={8} key={4}>
              <FormItem {...formItemLayout} label='发票来源'>
                {getFieldDecorator(`source`)(
                  <Select placeholder='请选择'>
                    <Option key='0'>在线开具</Option>
                    <Option key='1'>客户端采集</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8} key={5}>
              <FormItem {...formItemLayout1} label='客户端状态'>
                {getFieldDecorator(`state`)(
                  <Select placeholder='请选择'>
                    <Option key='0'>未登录</Option>
                    <Option key='1'>登录中</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
    )
  }
}

const CollectionFilter = Form.create()(CollectionFilterMake);
export default CollectionFilter
