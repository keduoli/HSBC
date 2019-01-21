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
class CodeOpeningFilterMake extends React.Component{
  disabledDate = (current) => {
    return current.valueOf() > Date.now();
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const rangeValue = values['ordertime'];
      if(rangeValue){
        if(rangeValue.length > 0){
          values['ordertime'] = [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')];
          values['ordertime'] = values['ordertime'].join(',');
        }
      }else{
        values['ordertime'] = '';
      }
      this.props.searchFnc(values);
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
          <Row gutter={5}>
            <Col span={8} key={1}>
              <FormItem {...formItemLayout} label='订单日期'>
                {getFieldDecorator(`ordertime`)(
                  <RangePicker
                    style={{width:'100%'}}
                    size='large'
                    disabledDate={this.disabledDate}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={8} key={2}>
              <FormItem {...formItemLayout} label='订单号'>
                {getFieldDecorator(`orderno`)(
                  <Input placeholder='请输入订单号'/>
                )}
              </FormItem>
            </Col>
            <Col span={8} key={4}>
              <FormItem {...formItemLayout} label='订单状态'>
                {getFieldDecorator(`kjzt`)(
                  <Select placeholder='请选择订单状态' 
                          allowClear={true}>
                    <Option key={0}>待开具</Option>
                    <Option key={1}>开具中</Option>
                    <Option key={2}>开具成功</Option>
                    <Option key={3}>开具失败</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={5}>
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

const CodeOpeningFilter = Form.create()(CodeOpeningFilterMake);
export default CodeOpeningFilter
