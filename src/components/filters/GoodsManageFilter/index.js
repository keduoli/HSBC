import React from 'react';
import { Form, Row, Col, Button, DatePicker, Select, Modal, Collapse, Icon, message,Input  } from 'antd';
import { GoodsModal } from 'components';
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
class GoodsManageFilterMake extends React.Component{
  state={
    addGoodsModal:''
  } 
  disabledDate = (current) => {
    return current.valueOf() > Date.now();
  };
  addGoods = () => {
    this.setState({addGoodsModal:<GoodsModal cancel={()=>this.setState({addGoodsModal:''})}
                                             navList={this.props.navList}
                                             title='新增商品管理'
                                             codingLoad={this.props.codingLoad}
                                             settingList={this.props.settingList}
                                             refresh={this.props.refresh}
                                             getCodingList={this.props.getCodingList}
                                             codingList={this.props.codingList}
                                             addGoods={this.props.addGoods}/>})
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.props.searchFnc(values)
      }
    })
  }
  clearFnc = () => {
    this.props.form.resetFields();
    this.props.clearFnc()
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
              <FormItem {...formItemLayout} label='税收分类编码'>
                {getFieldDecorator(`tax_code`)(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col span={8} key={2}>
              <FormItem {...formItemLayout} label='企业商品编号'>
                {getFieldDecorator(`code`)(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col span={8} key={3}>
              <FormItem {...formItemLayout} label='商品名称'>
                {getFieldDecorator(`name`)(
                  <Input/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={5}>
            <Col span={8} key={4}>
              <FormItem {...formItemLayout} label='税收分类名称'>
                {getFieldDecorator(`tax_name`)(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col span={8} key={5}>
              <FormItem {...formItemLayout} label='计量单位'>
                {getFieldDecorator(`units`)(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col span={8} key={6}>
              <FormItem {...formItemLayout} label='单价'>
                {getFieldDecorator(`price`)(
                  <Input onBlur={(e)=>{
                    this.props.form.setFieldsValue({
                      ['price']:Number(e.target.value).toFixed(2)
                    })
                  }}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={5}>
            <Col span={8} key={7}>
              <FormItem {...formItemLayout} label='含税价标志'>
                {getFieldDecorator(`tax_mark`)(
                  <Select placeholder='请选择含税价标志' 
                  allowClear={true}>
                    <Option value='1'>是</Option>
                    <Option value='0'>否</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8} key={8}>
              <FormItem {...formItemLayout} label='税率'>
                {getFieldDecorator(`rate`)(
                  <Select placeholder='请选择税率' 
                  allowClear={true}>
                    <Option value='3%'>3%</Option>
                    <Option value='0%'>0%</Option>
                    <Option value='免税'>免税</Option>
                    <Option value='不征税'>不征税</Option>
                    <Option value='4%'>4%</Option>
                    <Option value='5%'>5%</Option>
                    <Option value='6%'>6%</Option>
                    <Option value='10%'>10%</Option>
                    <Option value='11%'>11%</Option>
                    <Option value='16%'>16%</Option>
                    <Option value='17%'>17%</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8} key={9}>
              <FilButton type='primary' onClick={this.handleSubmit} style={{float:'right',marginRight:20}}>搜索</FilButton>
              {
                this.props.showInfo &&
                <FilButton style={{float:'right',marginRight:20}} onClick={this.clearFnc}>清空</FilButton>
              }
            </Col>
          </Row>
          <Row gutter={5} style={{paddingBottom:10}}>
            <Col span={8} key={10} style={{float:'right',marginRight:20}}>
              <FilButton type='primary' style={{float:'right'}} onClick={this.addGoods}>新增</FilButton>
            </Col>
          </Row>
          {this.state.addGoodsModal}
        </Form>
    )
  }
}

const GoodsManageFilter = Form.create()(GoodsManageFilterMake);
export default GoodsManageFilter
