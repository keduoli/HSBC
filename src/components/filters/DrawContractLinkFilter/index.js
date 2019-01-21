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
class DrawContractLinkFilterMake extends React.Component{
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
				const rangeValue = values['time'];
				if(rangeValue){
					if(rangeValue.length > 0){
						values['start_con_date'] = rangeValue[0].format('YYYY-MM-DD');
						values['end_con_date'] = rangeValue[1].format('YYYY-MM-DD');
            if(rangeValue[1].valueOf()-rangeValue[0].valueOf()>(365*3*24*3600*1000)){
              message.error("合同日期区间不能超过三年");return;
            }
					}
				}else{
					values['start_con_date'] = '';
					values['end_con_date'] = '';
				}
				delete values['time'];
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
                <FormItem {...formItemLayout} label='合同日期'>
                {getFieldDecorator(`time`)(
                <RangePicker
                    size='large'
                  />
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

const DrawContractLinkFilter = Form.create()(DrawContractLinkFilterMake);
export default DrawContractLinkFilter
