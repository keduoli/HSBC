import React from 'react';
import { Form, Row, Col, Button, DatePicker, Select, Modal, Collapse, Icon, message, Input  } from 'antd';
import moment from 'moment';
const Panel = Collapse.Panel;
const { RangePicker,MonthPicker } = DatePicker;
const FormItem = Form.Item;
const {Option} = Select;
class WaitOpenFilterMake extends React.Component{
  state={
  }
  handleSearch = (e) => {
		e.preventDefault();
		this.setState({isShow:true})
    this.props.form.validateFields((err, values) => {
			const time_area = values['time_area'];

			if(time_area){
        if(time_area.length > 0){
					values['time_area'] = [time_area[0].format('YYYY-MM-DD'), time_area[1].format('YYYY-MM-DD')];
          values['time_area'] = values['time_area'].join(',');
        }
      }else{
        values['time_area'] = '';
			}
			this.props.setSearch(values)
    });
	};
	clearSearchFnc = () => {
		this.props.form.resetFields();
		this.props.clearState();
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
      <Form className="ant-advanced-search-form" style={{borderLeft:'3px solid #2397CA',background: '#fff',paddingTop:10,marginBottom:20}}>
				<Row gutter={5}>
					<Col span={8} key={1}>
							<FormItem {...formItemLayout} label='申请时间'>
							{getFieldDecorator(`fpdm`)(
								<RangePicker
                  disabledDate={this.disabledDate}
                  style={{width:'100%'}}
                  size='large'
                  />
							)}
							</FormItem>
					</Col>
					<Col span={8} key={2}>
						<FormItem {...formItemLayout} label='购方名称'>
						{getFieldDecorator(`gfmc`)(
							<Input/>
						)}
						</FormItem>
					</Col>
					<Col span={8} key={3}>
						<FormItem {...formItemLayout} label='购方税号'>
						{getFieldDecorator(`gfsbh`)(
              <Input/>
						)}
						</FormItem>
					</Col>
				</Row>
				<Row gutter={5}>
					<Col span={8} key={4}>
							<FormItem {...formItemLayout} label='状态'>
                {getFieldDecorator(`status`)(
                  <Select>
                    <Option key={1}>已保存</Option>
                    <Option key={2}>申请中</Option>
                    <Option key={3}>已开票</Option>
                  </Select>
                )}
							</FormItem>
					</Col>
          <Col span={7} key={5}>
            <div style={{float:'left',overflow:'hidden',width:150,marginLeft:25}}>
              <Button style={{float:'left',marginLeft:20}} onClick={this.handleSearch} type="primary">搜索</Button>
              {
                this.props.showInfo === true && 
              <Button onClick={this.clearSearchFnc} style={{float:'right',marginLeft:10}}>清空</Button>
              }
            </div>
          </Col>
				</Row>
      </Form>
    )
  }
}

const WaitOpenFilter = Form.create()(WaitOpenFilterMake);
export default WaitOpenFilter
