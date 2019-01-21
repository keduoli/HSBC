import React from 'react'
import {Input,Form,Button,Modal,Radio,Select } from 'antd'
import styled from 'styled-components'
import { CodingModal } from 'components'
const RadioGroup = Radio.Group;
const {Option} = Select;
const Search = Input.Search;
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
class UserModalMack extends React.Component{
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
				if(this.props.edit){
					values['id'] = this.props.record.id;
					this.props.editFnc(values,()=>{
						this.props.cancel()
						this.props.refreshData()
					})
				}else{
					this.props.addFnc(values,()=>{
						this.props.cancel()
						this.props.refreshData()
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
								rules: [{
									validator: (rule, value, callback)=>{
										if(!value){
											callback('客户编号不能为空');
										}else if(value.length>20){
											callback('客户编号不能超过20位');
										}
										callback();
									},
								}],
							})(
								<Input disabled={this.props.edit} style={{width:200}} placeholder="请输入客户编号"/>
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
								<Input style={{width:200}} placeholder="请输入客户名称"/>
							)}
							</FormItem>
						</RightTab>
					</GroupWrap>
					<GroupWrap>
						<InputLabel><RedSpan> * </RedSpan>所属分行</InputLabel>
						<RightTab>
							<FormItem>
							{getFieldDecorator('bank',{
								initialValue:this.props.edit&&record.bank,
								rules:[{
									required: true, message: '所属分行不能为空',whitespace:true,
								},{
									pattern: /^[A-Z]{3}$/, message: '所属分行只能是3位大写英文字母'
								}]
							})(
								<Input style={{width:200}} placeholder="请输入所属分行"/>
							)}
							</FormItem>
						</RightTab>
					</GroupWrap>
					<GroupWrap>
						<InputLabel>客户公司税号</InputLabel>
						<RightTab>
							<FormItem>
							{getFieldDecorator('cus_tax_num',{
								initialValue:this.props.edit&&record.tax_num,
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
								<Input style={{width:200}} placeholder="请输入客户公司税号"/>
							)}
							</FormItem>
						</RightTab>
					</GroupWrap>
					<GroupWrap>
						<InputLabel>客户曾用名</InputLabel>
						<RightTab>
							<FormItem>
							{getFieldDecorator('cus_used_name',{
								initialValue:this.props.edit&&record.cus_used_name,
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
								<Input style={{width:200}} placeholder="请输入客户曾用名"/>
							)}
							</FormItem>
						</RightTab>
					</GroupWrap>
					<GroupWrap>
						<InputLabel>客户备注1</InputLabel>
						<RightTab>
							<FormItem>
							{getFieldDecorator('memo1',{
								initialValue:this.props.edit&&record.memo1,
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
								<Input style={{width:200}} placeholder="客户备注1"/>
							)}
							</FormItem>
						</RightTab>
					</GroupWrap>
					<GroupWrap>
						<InputLabel>客户备注2</InputLabel>
						<RightTab>
							<FormItem>
							{getFieldDecorator('memo2',{
									initialValue:this.props.edit&&record.memo2,
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
								<Input style={{width:200}} placeholder="客户备注2"/>
							)}
							</FormItem>
						</RightTab>
					</GroupWrap>
					<GroupWrap>
						<InputLabel>客户备注3</InputLabel>
						<RightTab>
							<FormItem>
							{getFieldDecorator('memo3',{
								initialValue:this.props.edit&&record.memo3,
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
								<Input style={{width:200}} placeholder="客户备注3"/>
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
const UserModal = Form.create()(UserModalMack);
export default UserModal;
