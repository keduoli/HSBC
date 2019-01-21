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
    kpje:'=',
    jshj:'=',
  } 
  disabledDate = (current) => {
    return current.valueOf() > Date.now();
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const rangeValue = values['time_area'];
      if(values['ch_state']){
        if(values['kp_state'] === '1' || values['kp_state'] === '3'){
          message.error("只有选择开具成功才可以选择冲红状态");return;
        } 
      }
      if(rangeValue){
        if(rangeValue.length > 0){
          values['time_area'] = [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')];
          values['time_area'] = values['time_area'].join(',');
        }
      }else{
        values['time_area'] = '';
      }
      if(values['zfbz'] === '2'){
        values['zfbz'] = '';
      }
      if(values['je']){
        values['je'] = this.state.kpje+values['je'];
      }
      if(values['fpzl']){
        values['fpzl'] = values['fpzl']+'';
      }
      this.props.searchFnc(values);
    })
  }
  clearSearchFnc = () => {
    this.props.form.resetFields();
    this.props.clearFnc();
  };
  exportAll = () => {
    const param = this.props.state;
    if(param.kp_state!=='2'){
      message.warning("只有开具成功的发票可以导出");return;
    }
    this.props.exportAction(param)
  }
  kpjeChange = (e) => {
    this.setState({kpje:e})
  }
  jshjChange = (e) => {
    this.setState({jshj:e})
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
    const { navList } = this.props;
    return(
        <Form className="ant-advanced-search-form invoice_filter" style={{borderLeft:'3px solid #2397CA',background: '#fff',padding:'10px 0 0 5px'}}>
          <Row gutter={5}>
            <Col span={8} key={1}>
              <FormItem {...formItemLayout} label='开具时间区间'>
                {getFieldDecorator(`time_area`)(
                  <RangePicker
                    style={{width:'100%'}}
                    size='large'
                    disabledDate={this.disabledDate}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={8} key={2}>
              <FormItem {...formItemLayout} label='发票类型'>
                {getFieldDecorator(`fpzl`)(
                  <Select
                    placeholder="请选择"
                    allowClear={true}
                    size='large'
                  >
                    <Option key='01,02,03'>专用发票</Option>
                    <Option key='10,14'>电子发票</Option>
                    <Option key='04,14'>普通发票</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8} key={3}>
              <FormItem {...formItemLayout} label='购方名称'>
                {getFieldDecorator(`gfmc`)(
                  <Select
                    showSearch
                    placeholder="请选择"
                    allowClear = {true}
                    size='large'
                    optionFilterProp="children"
                  >
                    {
                      this.props.gfmcList && this.props.gfmcList.length>0 && this.props.gfmcList.map((value,index) => {
                        return <Option key={index} value={value}>{value==='None'?"空":value}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={5}>
            <Col span={8} key={4}>
              <FormItem {...formItemLayout} label='发票号码'>
                {getFieldDecorator(`fphm`)(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col span={8} key={5}>
              <FormItem {...formItemLayout} label='发票代码'>
                {getFieldDecorator(`fpdm`)(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col span={8} key={6}>
              <FormItem {...formItemLayout} label='开票金额'>
                <Select style={{width:'20%',float:'left'}}
                        value={this.state.kpje}
                        onChange={this.kpjeChange}>
                  <Option key='='>=</Option>
                  <Option key='>'>{'>'}</Option>
                  <Option key='<'>{'<'}</Option>
                </Select>
                {getFieldDecorator(`je`)(
                  <Input style={{float:'right',width:'80%',height:32}}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={5}>
            <Col span={8} key={7}>
              <FormItem {...formItemLayout} label='开票状态'>
                {getFieldDecorator(`kp_state`)(
                  <Select
                    placeholder="请选择"
                    allowClear={true}
                    size='large'
                  >
                    <Option key='1'>开具中</Option>
                    <Option key='2'>开具成功</Option>
                    <Option key='3'>开具失败</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8} key={8}>
              <FormItem {...formItemLayout} label='冲红状态'>
                {getFieldDecorator(`ch_state`)(
                  <Select
                    placeholder="请选择"
                    allowClear={true}
                    size='large'
                  >
                    <Option key='0'>未冲红</Option>
                    <Option key='1'>已冲红</Option>
                    <Option key='2'>冲红中</Option>
                    <Option key='3'>冲红失败</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8} key={9}>
              <FormItem {...formItemLayout} label='作废状态'>
                {getFieldDecorator(`zfbz`)(
                  <Select
                    placeholder="请选择"
                    size='large'
                    allowClear={true}
                  >
                    <Option key={1}>已作废</Option>
                    <Option key={0}>未作废</Option>
                    <Option key={2}>全部</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={5} style={{paddingBottom:10}}>
            <Col span={8} key={11}>
              <FormItem {...formItemLayout} label='发票来源'>
                {getFieldDecorator(`source`)(
                  <Select
                    placeholder="请选择"
                    size='large'
                    allowClear={true}
                  > 
                    <Option key='manual'>手工填开</Option>
                    <Option key='pc'>采集</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            {
              navList.admin_level === 0 && navList.plugin.consortium === true && navList.company_id === navList.root_company[0].id ?
              <Col span={8} key={10}>
                <FormItem {...formItemLayout} label='销方名称'>
                  {getFieldDecorator(`xfmc`)(
                    <Select
                      placeholder="请选择"
                      size='large'
                      allowClear={true}
                    >
                      {
                        navList.son_company.map((item)=>{
                          return <Option key={item.name} value={item.name}>{item.name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
              :
              ''
            }
            <FilButton type='primary' style={{float:'right',marginRight:20}} onClick={this.handleSubmit}>搜索</FilButton>
            {
              this.props.showInfo &&
              <FilButton style={{float:'right',marginRight:20}} onClick={this.clearSearchFnc}>清空</FilButton>
            }
            {
              this.props.showInfo &&
              <FilButton style={{float:'right',marginRight:20}} onClick={this.exportAll}>全部导出</FilButton>
            }
          </Row>
        </Form>
    )
  }
}

const InvoicesQueryFilter = Form.create()(InvoicesQueryFilterMake);
export default InvoicesQueryFilter
