import React from 'react'
import {Input,Form,Button,Modal,Radio,Select,DatePicker,message } from 'antd'
import styled from 'styled-components'
import moment from 'moment';
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
class ContractModalMack extends React.Component{
  state={
		currency:this.props.edit?this.props.record.currency:undefined
  };
  componentWillMount(){

  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
				if(this.state.currency){
					if(!/^[A-Z]{3}$/.test(this.state.currency)){
						message.error('币种只能是三位大写字母');return;
					}
					if(!values['con_amount']){
						message.error('放款金额不能为空');return;
					}
					values['currency'] = this.state.currency;
				}
				if(values['con_amount'] && !this.state.currency){
					message.error('币种不能为空');return;
				}
				values['cus_id'] = this.props.customerList.list.filter((el)=>el.cus_num == values['cus_num'])[0].id;
				delete values['cus_num'];
				const rangeValue = values['con_date'];
				if(rangeValue){
					values['con_date'] = rangeValue.format('YYYY-MM-DD');
				}else{
					values['con_date'] = '';
				}
				if(this.props.edit){
					values['id'] = this.props.record.id;
					this.props.editFnc(values,()=>{
						this.props.refreshData()
						this.props.cancel()
					});
				}else{
					this.props.addFnc(values,()=>{
						this.props.refreshData()
						this.props.cancel()
					});
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
												allowClear
												showSearch
												disabled={this.props.edit}
												optionFilterProp="children"
												onChange={(e)=>{
													const cus_name = this.props.customerList.list.filter((el)=>el.cus_num == e)[0].cus_name;
													this.props.form.setFieldsValue({gfmc:cus_name})
												}}
												>
									{
										this.props.customerList.list.map((item)=>{
											return <Option key={item.cus_num}>{item.cus_num}</Option>
										})
									}
								</Select>
							)}
							</FormItem>
						</RightTab>
					</GroupWrap>
					<GroupWrap>
						<InputLabel><RedSpan> * </RedSpan>合同编号</InputLabel>
						<RightTab>
							<FormItem>
							{getFieldDecorator('con_num',{
								initialValue:this.props.edit&&record.con_num,
								rules: [{
									validator: (rule, value, callback)=>{
										if(!value){
											callback('合同编号不能为空');
										}else if(value.length>20){
											callback('合同编号不能超过20位');
										}
										callback();
									},
								}]
							})(
								<Input style={{width:200}} placeholder="请输入合同编号"/>
							)}
							</FormItem>
						</RightTab>
					</GroupWrap>
					<GroupWrap>
						<InputLabel><RedSpan> * </RedSpan>购方名称</InputLabel>
						<RightTab>
							<FormItem>
							{getFieldDecorator('gfmc',{
								initialValue:this.props.edit&&record.gfmc,
								rules: [{
									validator: (rule, value, callback)=>{
										if(!value){
											callback('购方名称不能为空');
										}else if(value.length>30){
											callback('购方名称不能超过30位');
										}
										callback();
									},
								}]
							})(
								<Input style={{width:200}} placeholder="请输入购方名称"/>
							)}
							</FormItem>
						</RightTab>
					</GroupWrap>
					<GroupWrap>
						<InputLabel><RedSpan> * </RedSpan>销方名称</InputLabel>
						<RightTab>
							<FormItem>
							{getFieldDecorator('xfmc',{
								initialValue:this.props.edit&&record.xfmc,
								rules: [{
									validator: (rule, value, callback)=>{
										if(!value){
											callback('销方名称不能为空');
										}else if(value.length>30){
											callback('销方名称不能超过30位');
										}
										callback();
									},
								}]
							})(
								<Input style={{width:200}} placeholder="请输入销方名称"/>
							)}
							</FormItem>
						</RightTab>
					</GroupWrap>
					<GroupWrap>
						<InputLabel><RedSpan> * </RedSpan>合同金额</InputLabel>
						<RightTab>
							<Input value={this.state.currency} onChange={(e)=>this.setState({currency:e.target.value})} style={{float:'left',width:40,height:32,marginRight:10}}/>
							<FormItem style={{float:'left'}}>
							{getFieldDecorator('con_amount',{
								initialValue:this.props.edit&&record.con_amount,
								rules: [{
									validator: (rule, value, callback)=>{
										if(!value){
											callback('合同金额不能为空');
										}else if(value.length>20){
											callback('合同金额不能超过20位');
										}else if(!/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(value)){
											callback('只能输入正数且最多两位小数');
										}
										callback();
									},
								}],
							})(
								<Input style={{width:150}} placeholder="请输入合同金额"/>
							)}
							</FormItem>
						</RightTab>
					</GroupWrap>
					<GroupWrap>
						<InputLabel>合同日期</InputLabel>
						<RightTab>
							<FormItem>
								{getFieldDecorator('con_date',{
									initialValue:this.props.edit&&record.con_date&&moment(record.con_date, 'YYYYMMDD'),
								})(
									<DatePicker
										style={{width:200,float:'right'}}
										size='large'
									/>
								)}
							</FormItem>
						</RightTab>
					</GroupWrap>
					<GroupWrap>
						<InputLabel>合同备注1</InputLabel>
						<RightTab>
							<FormItem>
							{getFieldDecorator('memo1',{
								initialValue:this.props.edit&&record.memo1,
								rules: [{
									validator: (rule, value, callback)=>{
										if(value){
											if(value.length>80){
												callback('合同备注1不能超过80位');
											}
										}
										callback();
									},
								}]
							})(
								<Input style={{width:200}} placeholder="请输入合同备注1"/>
							)}
							</FormItem>
						</RightTab>	
					</GroupWrap>
					<GroupWrap>
						<InputLabel>合同备注2</InputLabel>
						<RightTab>
							<FormItem>
							{getFieldDecorator('memo2',{
								initialValue:this.props.edit&&record.memo2,
								rules: [{
									validator: (rule, value, callback)=>{
										if(value){
											if(value.length>80){
												callback('合同备注2不能超过80位');
											}
										}
										callback();
									},
								}]
							})(
								<Input style={{width:200}} placeholder="请输入合同备注2"/>
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
const ContractModal = Form.create()(ContractModalMack);
export default ContractModal;
