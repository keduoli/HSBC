import React from 'react';
import { Table, Button, Pagination,Modal,DatePicker,Form, Checkbox  } from 'antd';
import styled from 'styled-components';
const { MonthPicker } = DatePicker;
import moment from 'moment';
const FormItem = Form.Item;

const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const TitleFont = styled.div`
	line-height:50px;
	height:50px;
	width；100%;
	border-bottom:1px solid #e9e9e9;
	font-size:12px;
`;
const BillFilter = styled.div`
	overflow:hidden;
	border-bottom:1px solid #e9e9e9;
	padding-top:15px;
`;
const TotalCon = styled.div`
	overflow:hidden;
	height:30px;
	line-height:30px;
	font-size:12px;
	display:flex;
	justify-content:space-between;
	padding:0 13px;
`;
const BottomPage = styled.div`
  background:#f7f7f7;
  position:fixed;
  bottom:0px;
  right:0px;
  z-index:100;
  padding:10px 20px 10px 20px;
  box-sizing:border-box;
	overflow:hidden;
  -webkit-transition: all .2 ease;
  transition: all .2s ease;
`;
class BillTable extends React.Component{
		state={
			page:1,
			size:10,
			billDate:this.props.billDate,
			isCharge:'',
			date:''
		}
		disabledDate = (current) => {
			return current.valueOf() > Date.now();
		};
		refreshData = () => {
			const param = {
				page:this.state.page,
				size:10,
				billDate:this.state.billDate,
				isCharge:this.state.isCharge,
				export:0,
			}
			this.props.getBillList(param)
		}
		componentWillUpdate(nextProps,nextState){
			const { page, billDate,isCharge, } = nextState;
			if(page!==this.state.page || billDate!==this.state.billDate || isCharge!==this.state.isCharge){
				const param = {
					page:page,
					size:10,
					billDate:billDate,
					isCharge:isCharge,
					export:0,
				}
				this.props.getBillList(param)
			}
		}
    render(){
			const columns = [{
				title: '序号',
				key:'xh',
				dataIndex: 'xh',
				render:(text,record,index)=>{
					return <div>{index+1}</div>
				}
			},{
				title: '查验时间',
				dataIndex: 'check_time',
				key:'check_time',
			},{
				title: '发票代码',
				dataIndex: 'fpdm',
				key:'fpdm',
			},{
				title: '发票号码',
				dataIndex: 'fphm',
				key:'fphm',
			},{
				title: '查验结果',
				dataIndex: 'msg',
				key:'msg',
			},{
				title: '查验方式',
				dataIndex: 'check_style',
				key:'check_style',
			},{
				title: '是否扣费',
				dataIndex: 'is_charge',
				key:'is_charge',
			}]
			const formItemLayout = {
				labelCol: {
					xs: { span: 10 },
					sm: { span: 8 },
					lg: { span: 6 },
				},
				wrapperCol: {
					xs: { span: 10 },
					sm: { span: 16 },
					lg: { span: 18 },
				},
			};
			return <div style={{background:'#fff',padding:'0 30px',marginBottom:60}}>
							<TitleFont>账单结算</TitleFont>
							<BillFilter>
								<div style={{overflow:'hidden'}}>
									<FormItem {...formItemLayout} label='所属月份' style={{width:300,float:'left'}}>
										<MonthPicker
											style={{width:'100%'}}
											size='large'
											format='YYYY-MM'
											allowClear={false}
											disabledDate={this.disabledDate}
											defaultValue={moment(this.props.billDate)}
											onChange={(date,dateString)=>{
												this.setState({date:dateString})
											}}
										/>
									</FormItem>
									<Button type='primary' style={{float:'left',marginLeft:20}} onClick={()=>{
										this.setState({billDate:this.state.date})
									}}>搜索</Button>
								</div>
								<TotalCon>
									<div>总查验数量：<span style={{marginLeft:20}}>{this.props.billList.bill_count}</span></div>
									<div>付费查验数量：<span style={{marginLeft:20}}>{this.props.billList.charge_count}</span></div>
									<div>查验单价：<span style={{marginLeft:20}}>{this.props.billList.price}</span></div>
									<div>结算金额：<span style={{marginLeft:20}}>{this.props.billList.bill_amount}</span></div>
								</TotalCon>
							</BillFilter>
							<TitleFont>
								<div style={{float:'left'}}>账单明细</div>
								<Checkbox style={{float:'right',marginRight:20}} onChange={(e)=>{
									if(e.target.checked){
										this.setState({isCharge:1})
									}else{
										this.setState({isCharge:''})
									}
								}}>仅显示扣费信息</Checkbox>
							</TitleFont>
							<Table columns={columns}
										dataSource={this.props.billList.list}
										pagination={false}
										bordered
										loading={this.props.loading}
										rowKey={(r,i)=>(i)}/>
							<BottomPage style={{left:this.props.collectionStop?'75px':'210px'}}>
								<Button type="primary"
												style={{marginRight:5,float:"left"}}
												disabled={this.props.billList.total==0}
												onClick={()=>{
													const param = {
														billDate:this.state.billDate,
														isCharge:this.state.isCharge,
														export:1,
													}
													this.props.exportBillFnc(param)
												}}
								>导出</Button>
								<Pagination total={this.props.billList.total}
														style={{float:'right'}}
														current={this.state.page}
														onChange={(page)=>{
															this.setState({page})
														}}/>
							</BottomPage>
						</div>
		}
}

export default BillTable;