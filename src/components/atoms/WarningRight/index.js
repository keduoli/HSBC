import React from 'react'
import styled from 'styled-components'
import { Icon,Input,Select } from 'antd'
const { Option } = Select;
const WarningBoss = styled.div`
	background:#fff;
	float:left;
	height:77vh;
	width:22%;
	margin-left:5%;
`;
const WarningTitle = styled.div`
	height:18.5%;
	background:url(images/warning.png) no-repeat center;
	background-size:cover;
	text-align:center;
	line-height:108px;
	font-size:12px;
	color:#fff;
	width:100%;
`;
const WarningCon = styled.div`
	padding:20px 8px 0 8px;
	font-size:12px;
	color:#fff;
`;
const WarningLi = styled.li`
	line-height: 25px;
	color: #232323;
	margin-bottom:15px;
`;
const WarningSpan = styled.span`
	background: #2397CA;
	display:inline-block;
	height:5px;
	width:5px;
	border-radius:50%;
	margin-right:8px;
	margin-bottom:3px;
`;
const AttachGrop = styled.div`
  margin-bottom:15px;
  text-align:left;
  margin-left:5px;
  overflow:hidden;
`;
const AttachCell = styled.div`
	margin-bottom:10px;
	color:#000;
`;
class WarningRight extends React.Component {
	state ={
    cusId:this.props.cusId,
    conId:this.props.conId,
    ddId:this.props.ddId,
	}
	render(){
		const {getDrawdownList,getContractList,customerList,drawdownList,contractList,navList} = this.props;
		return(
			<WarningBoss>
				<WarningTitle>
					<Icon type="exclamation-circle" style={{marginRight:10}} />操作提示
				</WarningTitle>
				<WarningCon>
					<AttachGrop>
						<AttachCell style={{float:"left"}}>添加备注：</AttachCell>
						<Input.TextArea rows={4}
														style={{width:180,float:'right'}}
														value={this.props.memo}
														onChange={(e)=>{
															this.props.setMemo(e.target.value);
														}}
						/>
					</AttachGrop>
					{
						navList && navList.role.indexOf('drawdown') > -1 && 
						<AttachGrop>
							<AttachCell style={{float:"left"}}>客户编号：</AttachCell>
							<Select style={{width:180,float:'right'}}
											allowClear
											showSearch
											optionFilterProp="children"
											value={this.state.cusId}
											placeholder='请选择关联客户'
											onChange={(e)=>{
												if(!!e){
													this.setState({cusId:e},()=>{
														const cus_num = customerList.list.filter((el)=>el.id==e)[0].cus_num;
														getContractList({cus_num:cus_num,state:'0'})
														getDrawdownList({cus_num:cus_num,state:'0,1'})
														this.props.setCusId(e)
													})
												}else{
													this.setState({cusId:null,conId:null,ddId:null},()=>{													
														this.props.setCusId(null)
														this.props.setConId(null)
														this.props.setDdId(null)
													})
												}
											}}>
								{
									customerList.list.map((item)=>{
										return <Option key={item.id}>{item.cus_num}</Option>
									})
								}
							</Select>
						</AttachGrop>
					}
					{
						navList && navList.role.indexOf('drawdown') > -1 && 
						<AttachGrop>
							<AttachCell style={{float:"left"}}>合同编号：</AttachCell>
							<Select style={{width:180,float:'right'}}
											allowClear
											showSearch
											optionFilterProp="children"
											disabled={!this.state.cusId || !!this.state.ddId}
											placeholder='请选择关联合同'
											value={this.state.conId}
											onChange={(e)=>{
												this.setState({conId:e},()=>{
													this.props.setConId(e)
												})
											}}>
								{
										contractList.list.map((item)=>{
											return <Option key={item.id}>{item.con_num}</Option>
										})
								}
							</Select>
						</AttachGrop>
					}
					{
						navList && navList.role.indexOf('drawdown') > -1 && 
						<AttachGrop>
							<AttachCell style={{float:"left"}}>放款流水号：</AttachCell>
							<Select style={{width:180,float:'right'}}
											allowClear
											showSearch
											optionFilterProp="children"
											value={this.state.ddId}
											disabled={!this.state.cusId || !!this.state.conId}
											placeholder='请选择关联放款流水号'
											onChange={(e)=>{
												this.setState({ddId:e},()=>{
													this.props.setDdId(e)
												})
											}}>
								{
									drawdownList.list.map((item)=>{
										return <Option key={item.id}>{item.sys_num}</Option>
									})
								}
							</Select>
						</AttachGrop>
					}
					<ul>
						<WarningLi>
							<WarningSpan></WarningSpan>连续录入模式下，扫描发票二维码后将自动提交发票信息并返回录入状态。
						</WarningLi>
						<WarningLi>
							<WarningSpan></WarningSpan>在显示查验结果时，您可以按下“空格键”暂停录入。
						</WarningLi>
						<WarningLi>
							<WarningSpan></WarningSpan>点击“提交”按钮或再次点击“空格”键恢复连续录入。
						</WarningLi>
					</ul>
				</WarningCon>
			</WarningBoss>
		)
	}
}

export default WarningRight;