import React from 'react'
import {Input,Form,Button,Modal,Radio,Select,DatePicker,message } from 'antd'
import styled from 'styled-components'
import moment from 'moment';
const {Option} = Select;
const InputLabel = styled.span`
  width:90px;
  float:left;
  line-height:32px;
  text-align:right;
`;
const GroupWrap = styled.div`
  overflow:hidden;
  padding:0 30px;
`;
const RightTab = styled.div`
  display:inline-block;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const FormLeftCon = styled.div`
  float:left;
  overflow:hidden;
  width:50%;
`;
const FromSetCon = styled.div`
  overflow:hidden;
`;
const FormRightCon = styled.div`
  float:right;
  overflow:hidden;
  width:50%;
`;
const RedSpan = styled.span`
  color:red;
`;
const BottomCon = styled.div`
  overflow:hidden;
  margin:0 auto;
`;
const FilButton = styled(Button)`
  width:105px;
  height:30px;
`;
const FormItem = Form.Item;
class LoanModalMack extends React.Component{
  state={
		currency:this.props.edit?this.props.record.currency:undefined,
		debt_account:'',
		dd_date:'',
		debt_num:this.props.edit?this.props.record.debt_num:''
  };
  componentWillMount(){

  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
				values['cus_id'] = this.props.customerList.list.filter((el)=>el.cus_num == values['cus_num'])[0].id;
				delete values['cus_num'];
				const rangeValue = values['dd_date'];
				if(rangeValue){
					values['dd_date'] = rangeValue.format('YYYY-MM-DD');
				}else{
					values['dd_date'] = '';
				}
				if(this.state.currency){
					if(!/^[A-Z]{3}$/.test(this.state.currency)){
						message.error('币种只能是三位大写字母');return;
					}
					if(!values['dd_amount']){
						message.error('放款金额不能为空');return;
					}
					values['currency'] = this.state.currency;
				}
				if(values['dd_amount'] && !this.state.currency){
					message.error('币种不能为空');return;
				}
				if(this.props.edit){
					values['id'] = this.props.record.id;
					this.props.editFnc(values,()=>{
						this.props.cancel();
						this.props.refreshData();
					})
				}else{
					this.props.addFnc(values,()=>{
						this.props.cancel();
						this.props.refreshData();
					})
				}
      }
    })
  }
  render(){
		const { getFieldDecorator } = this.props.form;
		const { record } = this.props;
    return(
    <Modal title={<TitleSpan>{this.props.title}</TitleSpan>}
           style = {{textAlign:'center',top:40}}
           visible
           onCancel={this.props.cancel}
           width={420}
           maskClosable={false}
           footer={null}
    >
      <Form>
        <FromSetCon>
					<GroupWrap>
						<InputLabel><RedSpan> * </RedSpan>客户编号</InputLabel>
						<RightTab>
							<FormItem>
							{getFieldDecorator('cus_num',{
								initialValue:this.props.edit&&record.cus_num,
								rules:[{
									required: true, message: '客户编号不能为空',whitespace:true,
								}]
							})(
								<Select style={{width:200}} 
												placeholder="请输入客户编号" 
												showSearch
												optionFilterProp="children"
												disabled={this.props.edit}
												onChange={(e)=>{
													const cus_id = this.props.customerList.list.filter((el)=>el.cus_num == e)[0].id;
													this.props.getCustomerDetail(cus_id,(res)=>{
														this.props.form.setFieldsValue({cus_name:res.cus_name})
													})
												}}>
									{
										this.props.customerList.list.map((item)=>{
											return <Option key={item.cus_num+""}>{item.cus_num}</Option>
										})
									}
								</Select>
							)}
							</FormItem>
						</RightTab>
					</GroupWrap>
					<GroupWrap>
						<InputLabel><RedSpan> * </RedSpan>客户名称</InputLabel>
						<RightTab>
							<FormItem>
							{getFieldDecorator('cus_name',{
								initialValue:this.props.edit&&record.cus_name,
								rules: [{
									validator: (rule, value, callback)=>{
										if(!value){
											callback('客户名称不能为空');
										}else if(value.length>30){
											callback('客户名称不能超过30位');
										}
										callback();
									},
								}],
							})(
								<Input disabled={this.props.edit&&!(record.state==0||record.state==1)} style={{width:200}} placeholder="请输入客户名称"/>
							)}
							</FormItem>
						</RightTab>
					</GroupWrap>
					<GroupWrap>
						<InputLabel>货款账号</InputLabel>
						<RightTab>
							<FormItem>
							{getFieldDecorator('debt_account',{
								initialValue:this.props.edit&&record.debt_account,
								rules: [{
									validator: (rule, value, callback)=>{
										if(value){
											if(value.length>20){
												callback('货款账号不能超过20位');
											}
										}
										callback();
									},
								}],
							})(
								<Input onChange={(e)=>{
									this.setState({debt_account:e.target.value},()=>{
										if(this.state.dd_date!=='' && this.state.debt_account!=='' ){
											this.props.form.setFieldsValue({debt_num:this.state.debt_account+this.state.dd_date})
										}else{
											this.props.form.setFieldsValue({debt_num:''})
										}
									})
								}} disabled={this.props.edit&&record.state!==0} style={{width:200}} placeholder="请输入货款账号"/>
							)}
							</FormItem>
						</RightTab>
					</GroupWrap>
					<GroupWrap>
						<InputLabel>放款日期</InputLabel>
						<RightTab>
							<FormItem>
							{getFieldDecorator('dd_date',{
								initialValue:this.props.edit&&record.dd_date&&moment(record.dd_date, 'YYYYMMDD'),
							})(
								<DatePicker
									style={{width:200,float:'right'}}
									size='large'
									disabled={this.props.edit&&record.state!==0}
									onChange={(n,m)=>{
										this.setState({dd_date:n?n.format('YYYYMMDD'):''},()=>{
											if(this.state.debt_account!=='' && this.state.dd_date!==''){
												this.props.form.setFieldsValue({debt_num:this.state.debt_account+this.state.dd_date})
											}else{
												this.props.form.setFieldsValue({debt_num:''})
											}
										})
									}}
								/>
							)}
							</FormItem>
						</RightTab>
					</GroupWrap>
					<GroupWrap>
						<InputLabel>放款金额</InputLabel>
						<RightTab>
							<Input defaultValue={this.state.currency}
										 disabled={this.props.edit&&record.state!==0}
										 onChange={(e)=>{
											this.setState({currency:e.target.value})
										 }} 
										 style={{float:'left',width:40,height:32,marginRight:10}}
										 />
							<FormItem style={{float:'left'}}>
							{getFieldDecorator('dd_amount',{
								initialValue:this.props.edit&&record.dd_amount,
								rules: [{
									validator: (rule, value, callback)=>{
										if(value){
											if(value.length>20){
												callback('放款不能超过20位');
											}else if(!/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(value)){
												callback('只能输入正数且最多两位小数');
											}
										}
										callback();
									},
								}],
							})(
								<Input disabled={this.props.edit&&record.state!==0} style={{width:150}} placeholder="请输入放款金额"/>
							)}
							</FormItem>
						</RightTab>
					</GroupWrap>
					<GroupWrap>
						<InputLabel>借据编号</InputLabel>
						<RightTab>
							<FormItem>
							{getFieldDecorator('debt_num',{
								initialValue:this.props.edit&&record.debt_num,
								rules: [{
									validator: (rule, value, callback)=>{
										if(value){
											if(value.length>30){
												callback('借据编号不能超过30位');
											}
										}
										callback();
									},
								}],
							})(
								<Input disabled={true} style={{width:200}} placeholder="请输入借据编号"/>
							)}
							</FormItem>
						</RightTab>
					</GroupWrap>
					<GroupWrap>
						<InputLabel>放款备注1</InputLabel>
						<RightTab>
							<FormItem>
							{getFieldDecorator('memo1',{
								initialValue:this.props.edit&&record.memo1,
								rules: [{
									validator: (rule, value, callback)=>{
										if(value){
											if(value.length>80){
												callback('放款备注1不能超过80位');
											}
										}
										callback();
									},
								}],
							})(
								<Input style={{width:200}} placeholder="请输入放款备注1"/>
							)}
							</FormItem>
						</RightTab>
					</GroupWrap>
					<GroupWrap>
						<InputLabel>放款备注2</InputLabel>
						<RightTab>
							<FormItem>
							{getFieldDecorator('memo2',{
								initialValue:this.props.edit&&record.memo2,
								rules: [{
									validator: (rule, value, callback)=>{
										if(value){
											if(value.length>80){
												callback('放款备注2不能超过80位');
											}
										}
										callback();
									},
								}],
							})(
								<Input style={{width:200}} placeholder="请输入放款备注2"/>
							)}
							</FormItem>
						</RightTab>
					</GroupWrap>
        </FromSetCon>
        <BottomCon>
          <GroupWrap>
            <FilButton onClick={this.props.cancel} style={{marginRight:20}}>取消</FilButton>
            <FilButton onClick={this.handleSubmit} type='primary'>确定</FilButton>
          </GroupWrap>
        </BottomCon>
      </Form>
    </Modal>
    )
  }
}
const LoanModal = Form.create()(LoanModalMack);
export default LoanModal;
