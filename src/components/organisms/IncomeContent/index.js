import React from 'react';
import styled from 'styled-components';
import { Input,Form,Button,Radio,DatePicker,Select,Modal,Icon } from 'antd';
import moment from 'moment';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
const formItemLayout1 = {
  labelCol: {
    xs: { span: 100 },
    sm: { span: 50 },
  },
  wrapperCol: {
    xs: { span: 100 },
    sm: { span: 50 },
  },
};
const RadioGroup = Radio.Group;
const GroupWrap = styled.div`
	overflow:hidden;
	margin-top:20px;
`;
const ComContent = styled.div`
  background:#fff;
  padding:20px;
`;
const InputLabel = styled.p`
  width:150px;
  line-height:32px;
  float:left;
`;
const RightTab = styled.div`
  display:inline-block;
`;
const BeforeSpan = styled.span`
	display:inline-block;
	background:#2397CA;
	width:5px;
	height:5px;
	border-radius:50%;
	margin-right:5px;
	margin-bottom: 2px;
`;
const PhoneDiv = styled.div`
	font-size: 13px;
	color: #222222;
	margin-top:66px;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:100px;
  color:#fff;
  display:inline-block;
  line-height:100px;
`;
const FormItem = Form.Item;
const { MonthPicker } = DatePicker;
const MonthFormat = 'YYYY-MM';
const Option = Select.Option;
class IncomeContentMake extends React.Component {
		state={
			settingsList:'',
			showSginModal:'',
			warn_day:'',
			is_auto_receive:'',
			disabled:true,
			value: 1,
		}
		disabledDate = (current) => {
			return current.valueOf() > Date.now();
		};
		handleChange = (val) => {
			if(Number(val) === 1){
				this.setState({
					showSginModal:<Modal	title={<TitleSpan>修改提示</TitleSpan>}
																visible
																footer={null}
																onCancel={this.handleCancel}>
													<div style={{overflow:'hidden',margin:'0 auto',textAlign:'center',fontSize:13,lineHeight:2}}>
														<p>开启自动签收功能将会自动签收在费耘中录入的发票</p>
														<p>同时将【发票管理】中的“已提交”、“已导入”状态的进项发票进行自动签收</p>
														<p>同步发票过程耗时较长，请耐心等待</p>
														<Button style={{marginTop:20}} onClick={()=>{
															const param={
																is_auto_receive:Number(val),
															}
															this.setState({is_auto_receive:Number(val)})
															this.props.settingsFnc(param,()=>{
																this.props.settingsGet((res)=>{
																	this.setState({settingsList:res.data})
																})
															})
															this.setState({showSginModal:''})
														}}>确定</Button>
													</div>
												</Modal>
				})
			}else{
				this.setState({
					showSginModal:<Modal	title={<TitleSpan>修改提示</TitleSpan>}
																visible
																footer={null}
																onCancel={this.handleCancel}>
													<div style={{overflow:'hidden',margin:'0 auto',textAlign:'center',fontSize:13,lineHeight:2}}>
														<p>关闭自动签收功能后</p>
														<p>录入到费耘系统的可认证发票将不再自动签收</p>
														<Button style={{marginTop:20}} onClick={()=>{
															const param={
																is_auto_receive:Number(val),
															}
															this.setState({is_auto_receive:Number(val)})
															this.props.settingsFnc(param,()=>{
																this.props.settingsGet((res)=>{
																	this.setState({settingsList:res.data})
																})
															})
															this.setState({showSginModal:''})
														}}>确定</Button>
													</div>
												</Modal>
				})
			}
		}
		handleCancel = () => {
			this.setState({showSginModal:''})
			this.props.settingsGet()
		}
		componentDidMount(){
			if(this.props.settingsList.warn_day === null){
				this.setState({value:1,disabled:true})
			}else{
				this.setState({value:2,disabled:false})
			}
		}
		componentWillReceiveProps(next){
			this.setState({is_auto_receive:this.props.settingsList.is_auto_receive})
		}
		onChange = (e) => {
			this.setState({
				value: e.target.value,
			});
			if(e.target.value===2){
				this.setState({disabled:false})
			}
			if(e.target.value===1){
				this.setState({disabled:true},()=>{
					this.props.settingsFnc({warn_day:0,is_auto_receive:this.state.is_auto_receive})
				})
			}
		}
    render(){
				const { getFieldDecorator } = this.props.form;
				const { settingsList,income_month } = this.state;
        return(
            <div>
							<Form style={{paddingLeft:114,borderLeft:'3px solid #2397CA',background: '#fff'}}>
								<ComContent>
									<GroupWrap>
										<InputLabel><BeforeSpan/> 是 否 自 动 签 收</InputLabel>
										<RightTab>
											<FormItem
													{...formItemLayout}
													hasFeedback
													style={{width:300,marginLeft:76}}
												>
												{
													this.props.settingsList2 &&
													<Select value={settingsList.is_auto_receive?settingsList.is_auto_receive+"":this.props.settingsList2.is_auto_receive+""} style={{width:300}} onChange={this.handleChange}>
														<Option value="1">是</Option>
														<Option value="0">否</Option>
													</Select>
												}
											</FormItem>
										</RightTab>
									</GroupWrap>
									<GroupWrap>
										<InputLabel><BeforeSpan/> 发 票 预 警 期 限</InputLabel>
										<RightTab>
											<RadioGroup style={{margin:'6px 0 30px 76px',float:'left'}} onChange={this.onChange} value={this.state.value}>
												<Radio value={1}>关</Radio>
												<Radio value={2}>开</Radio>
											</RadioGroup>
											{
												this.state.value === 2 &&
												<div style={{float:'left'}}>
													<FormItem
															style={{width:190,float:'left'}}
														>
														{getFieldDecorator('yjts', {
															initialValue:this.props.settingsList?this.props.settingsList.warn_day:'',
															rules: [{
																validator: (rule, value, callback)=>{
																	const reg = /^[0-9]*$/;
																	if(!value){
																		callback('发票预警期限不能为空');
																	}
																	if(!reg.test(value)){
																		callback('发票预警期限只能是整数');
																	}else{
																		if(value>360 || value<1){
																			callback('发票预警期限只能是1到360的整数');
																		}
																	}
																	callback();
																},
															}],
														})(
															<div>
																<Input defaultValue={this.props.settingsList?this.props.settingsList.warn_day:''} style={{width:130}} disabled={this.state.disabled} onChange={(e)=>{
																	this.setState({warn_day:e.target.value})
																}} placeholder='请输入发票预警期限'/>
																<span>&nbsp;&nbsp;&nbsp;&nbsp;天</span>
															</div>
														)}
													</FormItem>
													<Icon type="check" style={{cursor:'pointer',fontSize:20,margin:'5px 0 10px 10px',float:'left',display:'block'}} onClick={()=>{
														this.props.form.validateFields((err, values) => {
															if(!err){
																if(!(/^[0-9]*$/).test(this.state.warn_day))return;
																this.props.settingsFnc({warn_day:this.state.warn_day,is_auto_receive:this.state.is_auto_receive})
															}
														});
													}}/>
												</div>
											}
										</RightTab>
									</GroupWrap>
									<GroupWrap>
										<InputLabel><BeforeSpan/>&nbsp;可&nbsp;用&nbsp;报&nbsp;表</InputLabel>
										<RightTab>
											<FormItem
												{...formItemLayout1}
												hasFeedback
												style={{width:700,marginLeft:76}}
											>
												{
													this.props.settingsList &&
													<div style={{overflow:'hidden'}}>
														{
															this.props.settingsList.reports.find((item)=>item === 1) &&	<Button disabled style={{float:'left'}}>增值税纳税申报表附列资料表</Button>
														}
														{
															this.props.settingsList.reports.find((item)=>item === 2) &&	<Button disabled style={{margin:'0 10px',float:'left'}}>申报抵扣发票统计表</Button>
														}
														{
															this.props.settingsList.reports.find((item)=>item === 3) &&	<Button disabled style={{float:'left'}}>发票清单</Button>
														}
													</div>
												}
											</FormItem>
										</RightTab>
									</GroupWrap>
									<GroupWrap>
										<InputLabel><BeforeSpan/> 是&nbsp;否&nbsp;自&nbsp;动&nbsp;采&nbsp;集</InputLabel>
										<RightTab>
											<FormItem
												{...formItemLayout}
												hasFeedback
												validateStatus="success"
												style={{width:600,marginLeft:76}}
											>
												{
													this.props.settingsList &&
													<Input disabled placeholder={this.props.settingsList.is_sync===true?"是":"否"} id="success" />
												}
											</FormItem>
										</RightTab>
									</GroupWrap>
									<GroupWrap>
										<InputLabel><BeforeSpan/>是&nbsp;否&nbsp;获&nbsp;取&nbsp;全&nbsp;票&nbsp;面</InputLabel>
										<RightTab>
											<FormItem
												{...formItemLayout}
												hasFeedback
												validateStatus="success"
												style={{width:600,marginLeft:76}}
											>	
												{
													this.props.settingsList &&
													<Input disabled placeholder={this.props.settingsList.is_collect_all===true?"是":"否"} id="success" />
												}
											</FormItem>
										</RightTab>
									</GroupWrap>
								{/*<GroupWrap>
									<InputLabel><BeforeSpan/>&nbsp;是&nbsp;否&nbsp;认&nbsp;证</InputLabel>
									<RightTab>
										<FormItem
											{...formItemLayout}
											hasFeedback
											validateStatus="success"
											style={{width:600,marginLeft:76}}
										>
											<Input disabled placeholder={settingsList.is_dedu===true?"是":"否"} id="success" />
										</FormItem>
									</RightTab>
								</GroupWrap>*/}
								</ComContent>
								<ComContent>
									<PhoneDiv>暂不支持认证抵扣自定义设置，如有需要，请联系客服400-9922-752。</PhoneDiv>
								</ComContent>
							</Form>
							{this.state.showSginModal}
            </div>
        )
    }
}

const IncomeContent = Form.create()(IncomeContentMake);
export default IncomeContent;