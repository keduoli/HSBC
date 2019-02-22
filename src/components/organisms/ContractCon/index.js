import React from 'react';
import styled from 'styled-components';
import { Button,Tooltip } from 'antd';
import { InvoiceLinkModal } from 'components';
import { withRouter } from 'react-router';
import { zhMoney } from './../../util';
const ContractBs = styled.div`
	height:75vh;
	width:100%;
	padding:20px;
	background:#fff;
`;
const ContractLeftCon = styled.div`
	width:50%;
	height:100%;
	float:left;
	box-sizing:border-box;
	overflow:auto;
	border-right:1px solid #f5f5f5;
`;
const ContractRightCon = styled.div`
	width:50%;
	height:100%;
	float:left;
	box-sizing:border-box;
	overflow:auto;
`;
const ContLableCon = styled.div`
	width:40%;
	float:left;
	height:90%;
	margin:5% 6% 0 0;
`;
const ContWapperCon = styled.div`
	width:48%;
	float:left;
	height:90%;
	margin-top:5%;
`;
const LableSpan = styled.div`
	color:#908989;
	font-size:12px;
	margin-bottom:25px;
	text-align:right;
`;
const LableRightSpan = styled.div`
	color:#908989;
	text-align:right;
	width:35%;
	float:left;
	margin-right:5%;
`;
const RightWapper = styled.div`
	font-size:12px;
	margin-bottom:5px;
	overflow:hidden;
	height:28px;
	line-height:28px;
`;
const ItemRightCon = styled.div`
	width:60%;
	float:left;
`;
const ItemCon = styled.div`
	font-size:12px;
	margin-bottom:25px;
`;
const TableCon = styled.div`
	width:85%;
	border:1px solid #d8c4c4;
`;
const TableHeader = styled.div`
	font-size:12px;
	line-height:20px;
	height:20px;
	background:#e4e6e8;
`;
const TableFont=styled.div`
	width:33%;
	text-align:center;
	float:left;
	height:100%;
	overflow:hidden;
`;
const TableTooltip = styled(Tooltip)`
	width:33%;
	text-align:center;
	float:left;
`;
const TableBody = styled.div`
	font-size:12px;
	line-height:20px;
	height:20px;
`;
class ContractCon extends React.Component{
  state={
		showInvoiceModal:''
	}
	showModal = (dd_id,title) => {
		const ddid = dd_id;
		let param;
		if(title == '删减关联发票'){
			param={page:1,size:10,unlink_con_id:this.props.contractDetail.id,unlink_dd_id:ddid}
		}else{
			param={page:1,size:10,cus_id:this.props.contractDetail.cus_id}
		}
		this.props.getInvoiceList(param,(res)=>{
			this.setState({showInvoiceModal:this.getInvLink(res,ddid,title)})
		})
	}
	getInvLink = (res,dd_id,title) => {
			return <InvoiceLinkModal getInvoiceList={this.props.getInvoiceList}
															 invoiceList={res}
															 dd_id={dd_id}
															 title={title}
															 getContractDetail={this.props.getContractDetail}
															 unLinkContract={title=='删减关联发票'?this.props.unLinkContract:null}
															 id={this.props.contractDetail.id}
															 contract={true}
															 cus_id={this.props.contractDetail.cus_id}
															 showDetail={this.props.showDetail}
															 linkLoading={this.props.linkLoading}
															 linkContract={this.props.linkContract}
															 cancel={()=>this.setState({showInvoiceModal:''})}/>
	}
  render(){
		const { contractDetail } = this.props;
    return(
      <ContractBs>
				<ContractLeftCon className='custom-list'>
					<ContLableCon>
						<LableSpan>客户编号</LableSpan>
						<LableSpan>销方名称</LableSpan>
						<LableSpan>合同编号</LableSpan>
						<LableSpan>购方名称</LableSpan>
						<LableSpan>合同金额</LableSpan>
						<LableSpan>合同日期</LableSpan>
						<LableSpan>关联发票数</LableSpan>
						<LableSpan>关联发票总金额</LableSpan>
						<LableSpan>关联放款金额</LableSpan>
						<LableSpan>关联放款信息</LableSpan>
					</ContLableCon>
					<ContWapperCon>
						<ItemCon>{contractDetail.cus_num?contractDetail.cus_num:'---'}</ItemCon>
						<ItemCon>{contractDetail.xfmc?contractDetail.xfmc:'---'}</ItemCon>
						<ItemCon>{contractDetail.con_num?contractDetail.con_num:'---'}</ItemCon>
						<ItemCon>{contractDetail.gfmc?contractDetail.gfmc:'---'}</ItemCon>
						<ItemCon>{contractDetail.con_amount?zhMoney(contractDetail.con_amount):'---'}</ItemCon>
						<ItemCon>{contractDetail.con_date?contractDetail.con_date:'---'}</ItemCon>
						<ItemCon>{contractDetail.inv_count?contractDetail.inv_count:'---'}</ItemCon>
						<ItemCon>{contractDetail.inv_amount?zhMoney(contractDetail.inv_amount):'---'}</ItemCon>
						<ItemCon>{contractDetail.dd_amount?zhMoney(contractDetail.dd_amount):'---'}</ItemCon>
						<TableCon>
							<TableHeader>
								<TableFont>借据编号</TableFont>
								<TableFont>放款流水号</TableFont>
								<TableFont>放款状态</TableFont>
							</TableHeader>
							{
								contractDetail.drawdowns.map((item,index)=>{
									return <TableBody key={index}>
													<TableTooltip title={item.debt_num?item.debt_num:'---'} placement="topLeft"><TableFont>{item.debt_num?item.debt_num:'---'}</TableFont></TableTooltip>
													<TableTooltip title={item.num?item.num:'---'} placement="topLeft"><TableFont>{item.num?item.num:'---'}</TableFont></TableTooltip>
													<TableFont>
														{item.state=='0' && '未放款'}
														{item.state=='1' && '已放款待补交'}
														{item.state=='2' && '放款完成'}
														{item.state=='3' && '放款取消'}
													</TableFont>
												 </TableBody>
								})
							}
						</TableCon>
					</ContWapperCon>
				</ContractLeftCon>
				<ContractRightCon className='custom-list'>
				{
					contractDetail.drawdowns.map((item,index)=>{
						return <div key={index} style={{margin:'20px 0 35px 0',overflow:'hidden'}}>
											{
												item.state!=='3' &&  
												<div style={{overflow:'hidden'}}>
													<RightWapper>
														<LableRightSpan>借据编号</LableRightSpan>
														<ItemRightCon>
															{item.debt_num?item.debt_num:'---'}
															<Button style={{marginRight:170,float:'right'}} onClick={()=>{
																const list = this.props.tabData.list;
																let a = list.find(el=>el.key==='invoice');
																if(!a){
																		list.push({title:'发票查询',key:'invoice'})
																		this.props.tabChange({list:list,activeKey:'invoice'})
																}else{
																		this.props.tabChange({list:list,activeKey:'invoice'})
																}
																this.props.setInvId(item.dd_id+','+contractDetail.id)
																this.props.router.push("/invoice");
															}}>查看详情</Button>
														</ItemRightCon>
													</RightWapper>
													<RightWapper>
														<LableRightSpan>放款流水号</LableRightSpan>
														<ItemRightCon>{item.num?item.num:'---'}</ItemRightCon>
													</RightWapper>
													<RightWapper>
														<LableRightSpan>发票已关联合同金额</LableRightSpan>
														<ItemRightCon>{item.total_amount?zhMoney(item.total_amount):'---'}</ItemRightCon>
													</RightWapper>
													<RightWapper>
														<LableRightSpan>关联发票数</LableRightSpan>
														<ItemRightCon>
															{item.inv_count?item.inv_count:'---'}
															{item.state != '2' && item.state != '3' && <Button type='primary' onClick={()=>this.showModal(item.dd_id,'删减关联发票')} style={{marginRight:120,float:'right'}}>删减</Button>}
															{item.state != '2' && item.state != '3' && <Button type='primary' onClick={()=>this.showModal(item.dd_id,'添加关联发票')} style={{marginRight:30,float:'right'}}>添加</Button>}
														</ItemRightCon>
													</RightWapper>
												</div>
											}
									 </div>
					})
				}
				</ContractRightCon>
				{this.state.showInvoiceModal}
      </ContractBs>
    )
  }
}

export default withRouter(ContractCon);
