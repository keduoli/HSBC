import React from 'react';
import { Form, Row, Col, Button, DatePicker, Select, Modal, Collapse, Icon, message ,Input } from 'antd';
import moment from 'moment';
import { InvoiceExportModal } from 'components';
import styled from 'styled-components';
const Panel = Collapse.Panel;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const {Option} = Select;
const WarningDiv = styled.div`
  font-size:12px;
  height:12px;
  color:red;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:100px;
  color:#fff;
  display:inline-block;
  line-height:100px;
`;
class PollingFilterMake extends React.Component{
  state={
    showProcessModal:'',
    isSucess:false,
    isShow:false,
    showErrorModal:'',
    waringPrompt:'',
    maxMoney:'',
    minMoney:'',
    moneyOk:false,
  }
  minChange = (e) => {
    const minMoney = e.target.value;
    const reg = /^[1-9]{1}\d{0,9}$/;
    this.setState({minMoney})
    if(minMoney!==''){
      if(!reg.test(minMoney)){
        this.setState({waringPrompt:'只能输入不超过十位的正整数',moneyOk:false});
      }else if(this.state.maxMoney!=='' && Number(minMoney)>Number(this.state.maxMoney)){
        this.setState({waringPrompt:'最小金额不能大于最大金额',moneyOk:false});
      }else if(this.state.maxMoney!=='' && !reg.test(this.state.maxMoney)){
        this.setState({waringPrompt:'只能输入不超过十位的正整数',moneyOk:false});
      }else{
        this.setState({waringPrompt:'',moneyOk:true})
      }
    }else{
      if(reg.test(this.state.maxMoney)){
        this.setState({waringPrompt:'',moneyOk:true})
      }else{
        this.setState({waringPrompt:'',moneyOk:false})
      }
    }
  }
  maxChange = (e) => {
    const maxMoney = e.target.value;
    const reg = /^[1-9]{1}\d{0,9}$/;
    this.setState({maxMoney})
    if(maxMoney!==''){
      if(!reg.test(maxMoney)){
        this.setState({waringPrompt:'只能输入不超过十位的正整数',moneyOk:false});
      }else if(this.state.minMoney!=='' && Number(maxMoney)<Number(this.state.minMoney)){
        this.setState({waringPrompt:'最大金额不能小于最小金额',moneyOk:false});
      }else if(this.state.minMoney!=='' && !reg.test(this.state.minMoney)){
        this.setState({waringPrompt:'只能输入不超过十位的正整数',moneyOk:false});
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
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(this.state.waringPrompt!=='')return;
      const rangeValue = values['time_area'];
      if(rangeValue){
        if(rangeValue.length > 0){
          values['time_area'] = [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')];
          values['time_area'] = values['time_area'].join(',');
        }
      }else{
        values['time_area'] = '';
      }
      if(values.zfbz==="1"){
        values.zfbz=''
      }
      if(values['state']){
        if(values['state'].length > 0){
          values['state'] = values['state'].join(",");
        }
      }else{
        values['state'] = '';
      }
      if( values['time_area'] === '' && values['xfmc'] === undefined && this.state.moneyOk == false &&this.props.detail !== true){
        this.setState({
          showErrorModal:<Modal	title={<TitleSpan>操作提示</TitleSpan>}
                                visible
                                footer={null}
                                width={400}
                                onCancel={this.handleCancel}>
                          <div style={{overflow:'hidden',margin:'0 auto',textAlign:'center',fontSize:13,lineHeight:2}}>
                            <p>销方名称、开票日期、价税金额区间必选其一</p>
                            <Button style={{marginTop:20}} onClick={this.handleCancel}>确定</Button>
                          </div>
                        </Modal>
        })
      }else{
        if(this.props.detail === true){
          this.props.searchDetailFnc(values);
        }else{
          values['jshj_min'] = this.state.minMoney;
          values['jshj_max'] = this.state.maxMoney;
          this.props.searchFnc(values);
        }
      }
    });
  };
  handleCancel = () =>{
    this.setState({showErrorModal:""})
  }
  clearSearchFnc = () => {
    this.setState({
      waringPrompt:'',
      maxMoney:'',
      minMoney:'',
      moneyOk:false,
    })
		this.props.form.resetFields();
		this.props.clearAllFnc()
  };
  clearDetailSearchFnc = () => {
    this.props.form.resetFields();
		this.props.clearDetailFnc()
  };
  disabledDate = (current) => {
    return current.valueOf() > Date.now();
  };
  render(){
    const { getFieldDecorator } = this.props.form;
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
    return(
      <Form className="ant-advanced-search-form" style={{borderLeft:'3px solid #2397CA',background: '#fff',paddingTop:10}}>
					{
            this.props.detail===true?
            <div>
            <Row gutter={5}>
              <Col span={6} key={14}>
                  <FormItem {...formItemLayout} label='作废标识'>
                    {getFieldDecorator(`zfbz`,{
                      initialValue:this.props.state.zfbz===undefined?'1':this.props.state.zfbz+'',
                    })(
                      <Select
                        placeholder="请选择"
                        size='large'
                        allowClear={true}
                      >
                        <Option key='Y'>已作废</Option>
                        <Option key='N'>未作废</Option>
                        <Option key='1'>全部</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6} key={15}>
                  <FormItem {...formItemLayout} label='查验结果'>
                    {getFieldDecorator(`is_success`,{
                      initialValue:this.props.state.is_success+'',
                    })(
                      <Select
                        placeholder="请选择"
                        onChange={this.handleChange}
                        size = 'large'
                      >
                        <Option key='1'>查验成功</Option>
                        <Option key='0'>查验失败</Option>
                        <Option key='2'>全部</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6} key={22}>
                  <FormItem {...formItemLayout} label='状态'>
                    {getFieldDecorator(`state`)(
                      <Select
                        mode="multiple"
                        placeholder="请选择"
                        showSearch={false}
                        allowClear = {true}
                        size = 'large'
                      >
                        <Option key='2'>已提交</Option>
                        <Option key='3'>已导出</Option>
                        <Option key='4'>已删除</Option>
                        <Option key='6'>已归档</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={6} key={16}>
                  <Button type="primary"  style={{float:"left",marginLeft:20}} onClick={this.handleSearch}>搜索</Button>
                  {
                    this.props.showDetailInfo && <Button  style={{marginLeft:20,float:"left"}} onClick={this.clearDetailSearchFnc}>清空</Button>
                  }
                  {
                    this.props.showDetailInfo && <Button  style={{marginLeft:20,float:"left"}} onClick={()=>{
                      this.props.checkInvoice()
                    }}>{this.props.showCheck===true?'勾选全部':'取消勾选'}</Button>
                  }
                </Col>
                </Row>
                <Row gutter={5}>
                  <Col span={6} key={24}>
                    <FormItem {...formItemLayout} label='所属分行'>
                      {getFieldDecorator(`bank`)(
                        <Select
                          showSearch
                          placeholder="请选择"
                          allowClear = {true}
                          size='large'
                          optionFilterProp="children"
                        >
                          {
                            this.props.bankList.length>0 && this.props.bankList.map((value,index) => {
                              return <Option key={index} value={value}>{value==='None'?"空":value}</Option>
                            })
                          }
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={6} key={23}>
                    <FormItem {...formItemLayout} label='处理状态'>
                      {getFieldDecorator(`handle`)(
                        <Select
                          placeholder="请选择"
                          allowClear = {true}
                          size = 'large'
                        >
                          <Option key='1'>已处理</Option>
                          <Option key='0'>未处理</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </div>
						:
						<div>
              <Row gutter={5}>
                <Col span={7} key={3}>
                  <FormItem {...formItemLayout} label='销方名称'>
                    {getFieldDecorator(`xfmc`)(
                      <Select
                        showSearch
                        placeholder="请选择"
                        allowClear = {true}
                        size='large'
                        optionFilterProp="children"
                      >
                        {
                          this.props.xfmcList.length>0 && this.props.xfmcList.map((value,index) => {
                            return <Option key={index} value={value}>{value==='None'?"空":value}</Option>
                          })
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={7} key={1}>
                  <FormItem {...formItemLayout} label='开票日期'>
                    {getFieldDecorator(`time_area`)(
                      <RangePicker
                        style={{width:'100%'}}
                        size='large'
                        disabledDate={this.disabledDate}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={9} key={5}>
                  <FormItem {...formItemLayout} label='价税合计区间'>
                    <div style={{overflow:'hidden'}}>
                      <Input style={{float:'left',width:'40%'}} onChange={this.minChange} value={this.state.minMoney}/>
                      <span style={{width:'20%',textAlign:'center',float:'left'}}>~</span>     
                      <Input style={{float:'right',width:'40%'}} value={this.state.maxMoney} onChange={this.maxChange}/>
                    </div>
                    <WarningDiv>{this.state.waringPrompt}</WarningDiv>
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={5}>
                <Col span={7} key={6}>
                  <FormItem {...formItemLayout} label='生效方式'>
                      {getFieldDecorator(`effect_way`,{
                        initialValue:'-1',
                      })(
                        <Select>
                            <Option key='-1'>所有</Option>
                            <Option key='1'>任一</Option>
                        </Select>
                      )}
                      </FormItem>
                </Col>
                <Col span={7} key={2}>
                  <FormItem {...formItemLayout} label='轮询状态'>
                      {getFieldDecorator(`is_polling`,{
                        initialValue:'2',
                      })(
                          <Select>
                            <Option key='2'>全部</Option>
                            <Option key='1'>已轮询</Option>
                            <Option key='0'>未轮询</Option>
                          </Select>
                      )}
                      </FormItem>
                </Col>
                <Col span={7} key={4}>
                  <Button type="primary"  style={{marginLeft:'25%',float:"left"}} onClick={this.handleSearch}>搜索</Button>
                  {
                    this.props.showInfo && <Button  style={{marginLeft:"20px",float:"left"}} onClick={this.clearSearchFnc}>清空</Button>
                  }
                </Col>
              </Row>
						</div>
					}
        {this.state.showErrorModal}
      </Form>
    )
  }
}

const PollingFilter = Form.create()(PollingFilterMake);
export default PollingFilter
