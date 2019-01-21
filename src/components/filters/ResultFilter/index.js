import React from 'react';
import { Form, Row, Col, Button, DatePicker, Select, Modal, Collapse, Icon, message, Input  } from 'antd';
import moment from 'moment';
const Panel = Collapse.Panel;
const { RangePicker,MonthPicker } = DatePicker;
const FormItem = Form.Item;
const {Option} = Select;
class ResultFilterMake extends React.Component{
  state={
    showProcessModal:'',
    isSucess:false,
    isShow:false,
    isExport:"",
    isDown:false,
  }
  handleSearch = (e) => {
		e.preventDefault();
		this.setState({isShow:true})
    this.props.form.validateFields((err, values) => {
			const income_month = values['income_month'];
			const dedu_area = values['dedu_area'];
			const kprq_area = values['kprq_area'];
			if(dedu_area){
        if(dedu_area.length > 0){
					values['dedu_area'] = [dedu_area[0].format('YYYY-MM-DD'), dedu_area[1].format('YYYY-MM-DD')];
          values['dedu_area'] = values['dedu_area'].join(',');
        }
      }else{
        values['dedu_area'] = '';
			}

			if(kprq_area){
        if(kprq_area.length > 0){
					values['kprq_area'] = [kprq_area[0].format('YYYY-MM-DD'), kprq_area[1].format('YYYY-MM-DD')];
          values['kprq_area'] = values['kprq_area'].join(',');
        }
      }else{
        values['kprq_area'] = '';
			}
			
			if(income_month){
				values['income_month'] = income_month.format('YYYY-MM');
      }else{
        values['income_month'] = '';
      }
			this.props.setSearch(values)
    });
	};
	clearSearchFnc = () => {
		this.props.form.resetFields();
		this.props.clearState();
		this.setState({isShow:false})
	};
	exportFnc = () => {
		const param = this.props.state;
		this.props.exportResult(param)
	}
	disabledDate = (current) => {
    return current.valueOf() > Date.now();
  };
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
    return(
      <Form className="ant-advanced-search-form" style={{borderLeft:'3px solid #2397CA',background: '#fff',paddingTop:10,marginBottom:20}}>
				<Row gutter={5}>
					<Col span={8} key={1}>
							<FormItem {...formItemLayout} label='发票代码'>
							{getFieldDecorator(`fpdm`)(
								<Input/>
							)}
							</FormItem>
					</Col>
					<Col span={8} key={2}>
						<FormItem {...formItemLayout} label='发票号码'>
						{getFieldDecorator(`fphm`)(
							<Input/>
						)}
						</FormItem>
					</Col>
					<Col span={8} key={3}>
						<FormItem {...formItemLayout} label='开票日期'>
						{getFieldDecorator(`kprq_area`)(
								<RangePicker
								disabledDate={this.disabledDate}
								style={{width:'100%'}}
								size='large'
								/>
						)}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={5}>
					<Col span={8} key={4}>
							<FormItem {...formItemLayout} label='销方名称'>
							{getFieldDecorator(`xfmc`)(
								<Input/>
							)}
							</FormItem>
					</Col>
					<Col span={8} key={12}>
							<FormItem {...formItemLayout} label='税款所属期'>
							{getFieldDecorator(`income_month`)(
								<MonthPicker
									style={{width:'100%'}}
									size='large'
									disabledDate={this.disabledDate}
									/>
							)}
							</FormItem>
					</Col>
					<Col span={8} key={1}>
							<FormItem {...formItemLayout} label='认证结果'>
							{getFieldDecorator(`result`)(
								<Select
									placeholder="请选择"
									allowClear={true}
									size='large'
								>
									<Option key='2'>不通过</Option>
									<Option key='0'>未认证</Option>
									<Option key='1'>认证通过</Option>
								</Select>
							)}
							</FormItem>
					</Col>
				</Row>
				<Row gutter={5}>
					<Col span={8} key={2}>
							<FormItem {...formItemLayout} label='认证状态'>
							{getFieldDecorator(`status`)(
								<Select
								placeholder="请选择"
								allowClear={true}
								size='large'
							>
								<Option key='0'>未认证</Option>
								<Option key='1'>待发送认证</Option>
								<Option key='2'>认证中</Option>
								<Option key='3'>已认证</Option>
								<Option key='4'>待确认</Option>
								<Option key='9'>不需认证</Option>
							</Select>
							)}
							</FormItem>
					</Col>
					<Col span={8} key={3}>
						<FormItem {...formItemLayout} label='认证日期'>
						{getFieldDecorator(`dedu_area`)(
								<RangePicker
								style={{width:'100%'}}
								size='large'
								disabledDate={this.disabledDate}
								/>
						)}
						</FormItem>
				</Col>
				<Col span={7} key={5}>
						{
							this.state.isShow === true ? 
							<div style={{float:'left',marginLeft:40,fontSize:13}}>
								<span>共有 {this.props.resultList.total_count} 条</span>
								<Button onClick={this.exportFnc} style={{marginLeft:10}}>导出</Button>
							</div>
							:
							''
						}
						<div style={{float:'right',overflow:'hidden',width:150}}>
							<Button style={{float:'left',marginLeft:20}} onClick={this.handleSearch} type="primary">搜索</Button>
							{
								this.state.isShow === true && 
							<Button onClick={this.clearSearchFnc} style={{float:'right',marginLeft:10}}>清空</Button>
							}
						</div>
				</Col>
				</Row>
      </Form>
    )
  }
}

const ResultFilter = Form.create()(ResultFilterMake);
export default ResultFilter
