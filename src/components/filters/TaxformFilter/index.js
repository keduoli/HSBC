import React from 'react';
import { Form, Row, Col, Button, DatePicker, Select} from 'antd';
import {AddCallModal } from 'components'
import moment from 'moment';
const { RangePicker,MonthPicker } = DatePicker;
const FormItem = Form.Item;
const {Option} = Select;
class TaxformFilterMake extends React.Component{
  state={
    taxformList:'',
    exportUrl:'',
    income_month:this.props.getPreMonth(),
    showModal:'',
    target:'',
    loading:'',
	}
  handleSearch = () => {
    const param = {
      income_month:this.state.income_month,
      report_type:this.props.report_type,
    }
    this.props.getData(param)
  };
  handleExport = () => {
    this.setState({loading:true})
    const param = {
      income_month:this.state.income_month,
      report_type:this.props.report_type,
    }
    if(this.props.report_type===2){
      var newTab=window.open('about:blank');
    } 
    this.props.exportTaxform(param,(res)=>{
      this.setState({loading:false})
      if(res){
        if(this.props.report_type===2){  
          newTab.location.href = res.data;
        }else{
          window.location.href = res.data;
        }
      }
    })
  };
  componentWillReceiveProps(next){
    this.setState({taxformList:next.taxformList})
  }
  onChange = (date,dateString) => {
    this.props.SetIncomeMonth(dateString)
    this.setState({income_month:dateString})
  }
  disabledDate = (current) => {
    return current.valueOf() > Date.now();
  };
  render(){
		const { getFieldDecorator } = this.props.form;
    const defaultMonth = this.props.getPreMonth();
		const dateFormat = 'YYYY-MM';
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
    return(
      <Form className="ant-advanced-search-form" style={{background: '#fff',paddingTop:10,marginBottom:20}}>
				<Row gutter={5}>
					<Col span={6} key={1}>
						<FormItem {...formItemLayout} label='税款所属期' style={{marginLeft:10}}>
							<MonthPicker
								style={{width:'100%'}}
								size='large'
                format={dateFormat}
                onChange={this.onChange}
                disabledDate={this.disabledDate}
                defaultValue={moment(defaultMonth)}
                format={dateFormat}
							/>
						</FormItem>
					</Col>
					<Col span={4} key={5}>
						<Button onClick={this.handleSearch} style={{marginLeft:60}} type="primary">搜索</Button>
					</Col>
					<Col span={3} key={6} style={{float:"right"}}>
            <Button loading={this.state.loading} style={{marginLeft:60}} type="primary" onClick={this.handleExport}>导出</Button>
					</Col>
        </Row>
        {this.state.showModal}
        {this.state.target}
      </Form>
    )
  }
}

const TaxformFilter = Form.create()(TaxformFilterMake);
export default TaxformFilter
