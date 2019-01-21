import React from 'react';
import { Button,message, Modal, Input, Form } from 'antd';
import styled from 'styled-components';

const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const InputLabel = styled.span`
  width:90px;
  float:left;
  line-height:32px;
	text-align:right;
	margin-right:50px;
`;
const GroupWrap = styled.div`
  overflow:hidden;
	padding:0 10px;
	margin-left:20px;
`;
const RedSpan = styled.span`
  color:red;
`;
const RightTab = styled.div`
  display:inline-block;
`;
const BottomCon = styled.div`
  overflow:hidden;
	margin:0 auto;
	display:flex;
	justify-content:center;
`;
const FilButton = styled(Button)`
  width:105px;
  height:30px;
`;
const FormItem = Form.Item;
const { TextArea } = Input;
class CustomerModalMack extends React.Component{
		state={
			edit:false
		}
		handleSubmit = (e) => {
			e.preventDefault();
			this.props.form.validateFields((err, values) => {
				if(!err){
					values['id'] = this.props.record.id;
					this.props.editFnc(values,()=>{
						this.setState({edit:false})
						this.props.refreshData()
					})
				}
			})
		}
		render(){
			const { getFieldDecorator } = this.props.form;
			const { record } = this.props;
			return (
				<Modal  title={<TitleSpan>客户详情</TitleSpan>}
								style = {{top:70}}
								visible
								width={600}
								onCancel={this.props.cancel}
								maskClosable={false}
								footer={null}>
					<Form style={{width:'100%'}}>
						<div style={{padding:20,overflow:'hidden'}}>
							<GroupWrap>
								<InputLabel><RedSpan> * </RedSpan>客户编号</InputLabel>
								<RightTab>
									<FormItem>
									{getFieldDecorator('cus_num',{
										initialValue:record.cus_num,
										rules:[{
											required: true, message: '客户编号不能为空',whitespace:true,
										}]
									})(
										<Input disabled={true} style={{width:200}} placeholder="请输入客户编号"/>
									)}
									</FormItem>
								</RightTab>
							</GroupWrap>
							<GroupWrap>
								<InputLabel><RedSpan> * </RedSpan>客户名称</InputLabel>
								<RightTab>
									<FormItem>
									{getFieldDecorator('cus_name',{
										initialValue:record.cus_name,
										rules: [{
											validator: (rule, value, callback)=>{
												if(!value){
													callback('客户名称不能为空');
												}else if(value.length>30){
													callback('客户名称不能超过30位');
												}
												callback();
											},
										}]
									})(
										<Input disabled={!this.state.edit} style={{width:200}} placeholder="请输入客户名称"/>
									)}
									</FormItem>
								</RightTab>
							</GroupWrap>
							<GroupWrap>
								<InputLabel><RedSpan> * </RedSpan>所属分行</InputLabel>
								<RightTab>
									<FormItem>
									{getFieldDecorator('bank',{
										initialValue:record.bank,
										rules:[{
											required: true, message: '所属分行不能为空',whitespace:true,
										},{
											pattern: /^[A-Z]{3}$/, message: '所属分行只能是3位大写英文字母'
										}]
									})(
										<Input disabled={!this.state.edit} style={{width:200}} placeholder="请输入所属分行"/>
									)}
									</FormItem>
								</RightTab>
							</GroupWrap>
							<GroupWrap>
								<InputLabel>客户公司税号</InputLabel>
								<RightTab>
									<FormItem>
									{getFieldDecorator('cus_tax_num',{
										initialValue:record.tax_num,
										rules: [{
											validator: (rule, value, callback)=>{
												if(value){
													if(value.length>20){
														callback('客户公司税号不能超过20位');
													}
												}
												callback();
											},
										}],
									})(
										<Input disabled={!this.state.edit} style={{width:200}} placeholder="请输入客户公司税号"/>
									)}
									</FormItem>
								</RightTab>
							</GroupWrap>
							<GroupWrap>
								<InputLabel>客户曾用名</InputLabel>
								<RightTab>
									<FormItem>
									{getFieldDecorator('cus_used_name',{
										initialValue:record.cus_used_name,
										rules: [{
											validator: (rule, value, callback)=>{
												if(value){
													if(value.length>30){
														callback('客户曾用名不能超过30位');
													}
												}
												callback();
											},
										}],
									})(
										<Input disabled={!this.state.edit} style={{width:200}} placeholder="请输入客户曾用名"/>
									)}
									</FormItem>
								</RightTab>
							</GroupWrap>
							<GroupWrap>
								<InputLabel>客户备注1</InputLabel>
								<RightTab>
									<FormItem>
									{getFieldDecorator('memo1',{
										initialValue:record.memo1,
										rules: [{
											validator: (rule, value, callback)=>{
												if(value){
													if(value.length>80){
														callback('客户备注1不能超过80位');
													}
												}
												callback();
											},
										}],
									})(
										<TextArea rows={2}
															disabled={!this.state.edit}
															style={{width:300}}
										/>
									)}
									</FormItem>
								</RightTab>
							</GroupWrap>
							<GroupWrap>
								<InputLabel>客户备注2</InputLabel>
								<RightTab>
									<FormItem>
									{getFieldDecorator('memo2',{
										initialValue:record.memo2,
										rules: [{
											validator: (rule, value, callback)=>{
												if(value){
													if(value.length>80){
														callback('客户备注2不能超过80位');
													}
												}
												callback();
											},
										}],
									})(
										<TextArea rows={2}
										disabled={!this.state.edit}
															style={{width:300}}
										/>
									)}
									</FormItem>
								</RightTab>
							</GroupWrap>
							<GroupWrap>
								<InputLabel>客户备注3</InputLabel>
								<RightTab>
									<FormItem>
									{getFieldDecorator('memo3',{
										initialValue:record.memo3,
										rules: [{
											validator: (rule, value, callback)=>{
												if(value){
													if(value.length>80){
														callback('客户备注3不能超过80位');
													}
												}
												callback();
											},
										}],
									})(
										<TextArea rows={2}
										disabled={!this.state.edit}
															style={{width:300}}
										/>
									)}
									</FormItem>
								</RightTab>
							</GroupWrap>
						</div>
						<BottomCon>
								{
									this.state.edit?
									<FilButton onClick={this.handleSubmit} type='primary'>保存</FilButton>
									:
									<p>
										<FilButton onClick={this.props.cancel} style={{marginRight:20}}>返回</FilButton>
										<FilButton onClick={()=>this.setState({edit:true})} type='primary'>编辑</FilButton>
									</p>
								}
						</BottomCon>
					</Form>
				</Modal>   
			)
		}
}

const CustomerModal = Form.create()(CustomerModalMack);
export default CustomerModal;