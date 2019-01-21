import React from 'react';
import { Form, Row, Col, Button, DatePicker, Select, Modal, Collapse, Icon, message, Input  } from 'antd';
import moment from 'moment';
import { AddCallModal,DeductionModal } from 'components';
const Panel = Collapse.Panel;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const {Option} = Select;
class DeductionFilterMake extends React.Component{
  state={
    showProcessModal:'',
    isSucess:false,
    isShow:false,
    isExport:"",
    isDown:false,
    showModal:'',
    showDeductionModal:'',
    values:'',
    showBtn:true,
    kprq_start:'',
    kprq_end:''
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const rangeValue = values['area'];
      const recValue = values['rec_time']
			const fphm = values['fphm'];
			const fpdm = values['fpdm'];
			const xfmc = values['xfmc'];
			if(rangeValue){
        if(rangeValue.length > 0){
					values['area'] = [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')];
          values['area'] = values['area'].join(',');
        }
      }else{
        values['area'] = '';
      }
      if(recValue){
        if(recValue.length > 0){
					values['rec_time'] = [recValue[0].format('YYYY-MM-DD'), recValue[1].format('YYYY-MM-DD')];
          values['rec_time'] = values['rec_time'].join(',');
        }
      }else{
        values['rec_time'] = '';
      }
      this.props.setSearch(values);
      this.setState({values})
    });
  };
  disabledDate = (current) => {
    return current.valueOf() > Date.now();
  };
	clearSearchFnc = () => {
    this.props.form.resetFields();
    this.setState({kprq_start:'',kprq_end:''})
    this.props.clearState()
  };
  showCheck = () => {
    this.props.checkDeduction();
    this.setState({showBtn:false})
  }
  showModal = () => {
    this.setState({showModal:<AddCallModal 
                                cancelModal={()=>{this.setState({showModal:''})}}
                                deduction={true}
                                title="验证手机号"
                                deductionSet={this.deduction}
                                deductionList={this.props.deductionList}
                                getBunding={this.props.getBunding}
                                getPhoneSend={this.props.getPhoneSend}
                                />})
  }
  deduction = () => {
    this.setState({ showModal:"",
                    showDeductionModal:<DeductionModal 
                                          cancelModal={()=>{this.setState({showDeductionModal:''})}}
                                          title="认证确认"
                                          batch={true}
                                          confirmList={this.props.confirmList}
                                          values={this.state.values}
                                          deductionConfirm={this.props.deductionConfirm}
                                          income_month={this.props.settingsList.income_month}
                                          length={this.state.length}
                                          invoice_info={this.state.invoice_info}
                                          invoice_ids={this.state.invoice_ids}
                                          deductionFnc={this.props.deductionFnc}
                                          clearState={this.props.clearState}
                                          deductionList={this.props.deductionList}
                                          getData={this.props.getData}
                                        />
    })
  }
  render(){
    const icon = <Icon style={{color:"#108ee9"}} type="down" />
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
    const dateFormat = 'YYYY-MM-DD';
    return(
      <div style={{overflow:'hidden'}}>
      {
        this.props.settingsList && this.props.settingsList.warn_day!==null && 
        <div style={{fontSize:12,color:'red',margin:5}}>
          {this.props.yjsj.expired_count}  张发票即将超过认证最后期限，
          <span style={{cursor:'pointer',color:'#108ee9'}} onClick={()=>{
            this.props.form.resetFields();
            this.props.clearState()
            this.setState({kprq_start:this.props.yjsj.kprq_start,kprq_end:this.props.yjsj.kprq_end},()=>{
              let area1 = [this.props.yjsj.kprq_start,this.props.yjsj.kprq_end];
              let area = area1.join(",")
              this.props.changeKprq(area)
            })
          }}>查看详情</span>
        </div>
      }
      <Form className="ant-advanced-search-form" style={{borderLeft:'3px solid #2397CA',background: '#fff',paddingTop:10,marginBottom:10}}>
				<Row gutter={5}>
					<Col span={6} key={1}>
							<FormItem {...formItemLayout} label='发票代码'>
							{getFieldDecorator(`fpdm`)(
								<Input/>
							)}
							</FormItem>
					</Col>
					<Col span={6} key={2}>
							<FormItem {...formItemLayout} label='发票号码'>
							{getFieldDecorator(`fphm`)(
								<Input/>
							)}
							</FormItem>
					</Col>
					<Col span={6} key={3}>
							<FormItem {...formItemLayout} label='开票日期'>
							{getFieldDecorator(`area`,{
                initialValue:(this.state.kprq_start===''||this.state.kprq_end==='')?'':[moment(this.state.kprq_start, dateFormat), moment(this.state.kprq_end, dateFormat)],
                })(
                  <RangePicker
                  disabledDate={this.disabledDate}     
									style={{width:'100%'}}
									size='large'
									/>
							)}
							</FormItem>
					</Col>
					<Col span={6} key={7}>
							<FormItem {...formItemLayout} label='发票状态'>
							{getFieldDecorator(`inv_status`,{
                initialValue:'0',
                })(
                  <Select
                    placeholder="请选择"
                    allowClear={true}
                    size='large'
                  >
                    <Option key='0'>正常</Option>
                    <Option key='1'>失控</Option>
                    <Option key='2'>作废</Option>
                    <Option key='3'>红冲</Option>
                    <Option key='4'>异常</Option>
                  </Select>
							)}
							</FormItem>
					</Col>
        </Row>
        <Row>
          <Col span={6} key={4}>
              <FormItem {...formItemLayout} label='销方名称'>
              {getFieldDecorator(`xfmc`)(
                <Input/>
              )}
              </FormItem>
          </Col>
          <Col span={6} key={6}>
              <FormItem {...formItemLayout} label='是否签收'>
              {getFieldDecorator(`rec_status`)(
                <Select
                  placeholder="请选择"
                  allowClear={true}
                  size='large'
                >
                  <Option key='0'>未签收</Option>
                  <Option key='1'>已签收</Option>
                </Select>
              )}
              </FormItem>
          </Col>
          <Col span={6} key={7}>
              <FormItem {...formItemLayout} label='签收日期'>
              {getFieldDecorator(`rec_time`)(
                <RangePicker
                  disabledDate={this.disabledDate}     
									style={{width:'100%'}}
									size='large'
									/>
              )}
              </FormItem>
          </Col>
          <Col span={3} key={9} style={{marginLeft:30}}>
            <Button onClick={this.handleSearch} style={{marginLeft:10,float:"left"}} type="primary">搜索</Button>
            {
              this.props.showInfo && 
              <Button onClick={this.clearSearchFnc} style={{marginLeft:20,float:"left"}}>清空</Button>
            }
					</Col>
        </Row>
        {this.state.showModal}
        {this.state.showDeductionModal}
      </Form>
      <div style={{marginBottom:10}}>
        {
          this.props.showInfo && 
          <div style={{marginLeft:20,marginTop:5,fontSize:12,marginBottom:10,overflow:'hidden',float:"left"}}>共{this.props.deductionList.total_count}条发票信息</div>
        }
        {
          this.props.showInfo && this.props.showAllCheck &&
          <Button type="primary" onClick={this.props.checkInvoice} style={{marginLeft:20,float:"left"}}>{this.props.showCheck===true?'勾选全部':'取消勾选'}</Button>
        }
      </div>
      </div>
    )
  }
}

const DeductionFilter = Form.create()(DeductionFilterMake);
export default DeductionFilter