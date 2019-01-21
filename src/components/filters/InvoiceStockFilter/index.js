import React from 'react';
import { Form, Row, Col, Button, DatePicker, Select, Modal, Collapse, Icon, message,Input  } from 'antd';
import moment from 'moment';
import { InvoiceExportModal } from 'components';
import styled from 'styled-components'
const dateFormat = 'YYYY-MM-DD';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const {Option} = Select;
const FilButton = styled(Button)`
  width:105px;
  height:30px;
`;
class InvoicesQueryFilterMake extends React.Component{
  state={
    
  }
  handleSumbit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.searchFnc(values)
    })
  }
  clearFnc = () => {
    this.props.clearAllFnc();
    this.props.form.resetFields();
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
          <Col span={8} key={2}>
            <FormItem {...formItemLayout} label='领购日期'>
              {getFieldDecorator(`buy_time`)(
                <DatePicker
                    style={{width:'100%'}}
                    size='large'
                  />
              )}
            </FormItem>
          </Col>
            <Col span={8} key={1}>
              <FormItem {...formItemLayout} label='发票种类'>
                {getFieldDecorator(`category`)(
                  <Select
                    placeholder="请选择"
                    allowClear={true}
                    size='large'
                  >
                    <Option key='04'>普通发票</Option>
                    <Option key='01'>专用发票</Option>
                    <Option key='10'>电子发票</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8} key={3}>
              <FilButton type='primary' style={{float:'left'}} onClick={this.handleSumbit}>搜索</FilButton>
              {
                this.props.showInfo &&
                <FilButton style={{float:'left',marginLeft:20}} onClick={this.clearFnc}>清空</FilButton>
              }
            </Col>
          </Row>
        </Form>
    )
  }
}

const InvoicesQueryFilter = Form.create()(InvoicesQueryFilterMake);
export default InvoicesQueryFilter
