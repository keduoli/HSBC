import React from 'react'
import styled from 'styled-components';

const PdfBoss = styled.div`
	width:90%;
	margin:0 auto;
`;
const PdfFont = styled.span`
	color:#108ee9
`;
const PdfSect = styled.div`
	margin-top:20px;
	font-size:13px;
`;
const PdfTable = styled.table`
	width:100%;
	border-collapse:collapse;
`;
const PdfTd2 = styled.td`
	height:40px;
	line-height: 40px;
	font-size: 12px;
	text-align: center;
	border:1px solid #000;
	width:220px;
`;
const PdfTd = styled.td`
	height:40px;
	line-height: 40px;
	font-size: 12px;
	text-align: center;
	border:1px solid #000;
`;
const ThPdfTd = styled.td`
	background: #4B587B;
	color: #fff;
	font-weight:600;
	height:40px;
	line-height: 40px;
	font-size: 12px;
	text-align: center;
	text-align: center;
	border:1px solid #000;
`;
const PdfSplit = styled.div`
	border: 1px solid #f5f5f5;
	width: 100%;
	margin: 10px 0;
`;
const OutDiv = styled.div`
	border-top:80px #4B587B solid;
	width:0px;
	height:0px;
	border-left:220px #fff solid; 
	position:relative;
`;
const OutDivTop = styled.div`
	display:block;
	position:absolute;
	top:-80px;
	left:-90px;
	color:#fff;
`;
const OutDivBom = styled.div`
	display:block;
	position:absolute;
	top:-40px;
	left:-180px;
`;
class TaxformConB extends React.Component{
	state={
		taxformList:{}
	}
	componentWillReceiveProps(next){
		this.setState({taxformList:next.taxformList})
	}
  render(){
		const { taxformList } = this.state;
    return(
      <div style={{background:"#fff",marginTop:"10px"}}>
				{
					taxformList&&
					<div>
						<PdfBoss>
							<h3 style={{textAlign:'center',paddingTop:6,fontWeight:600}}>申报抵扣发票统计表 —— 当期(报表更新时间：{taxformList.confirm_time})</h3>
							<div style={{fontSize:13,display:'flex',justifyContent:'space-between',marginTop:20}}>
								<div>纳税人名称：{taxformList.depart_name}</div>
								<div>纳税人识别号：{taxformList.taxno}</div>
								<div>认证月份：{taxformList.income_month}</div>
								<div>单位：(份 、元）</div>
							</div>
							<PdfSplit></PdfSplit>
							<div>
								<div>
									<PdfTable>
										<thead>
											<tr>
												<ThPdfTd rowSpan="2">
													<OutDiv>
														<OutDivTop>认证方式</OutDivTop>
														<OutDivBom style={{color:"#000"}}>发票类型</OutDivBom>
													</OutDiv>
												</ThPdfTd>
												<ThPdfTd colSpan='3'>勾选认证</ThPdfTd>
												<ThPdfTd colSpan='3'>扫描认证</ThPdfTd>
												<ThPdfTd colSpan='3'>合计</ThPdfTd>
											</tr>
											<tr>
												<ThPdfTd>份数</ThPdfTd>
												<ThPdfTd>金额</ThPdfTd>
												<ThPdfTd>税额</ThPdfTd>
												<ThPdfTd>份数</ThPdfTd>
												<ThPdfTd>金额</ThPdfTd>
												<ThPdfTd>税额</ThPdfTd>
												<ThPdfTd>份数</ThPdfTd>
												<ThPdfTd>金额</ThPdfTd>
												<ThPdfTd>税额</ThPdfTd>
											</tr>
										</thead> 
										<tbody>
											{
												taxformList.valid_invoices&&taxformList.valid_invoices.map((item)=>{
													return <tr key={item.inv_type_id}>
																	<PdfTd>{item.inv_type}</PdfTd>
																	<PdfTd>{item.count}</PdfTd>
																	<PdfTd>{item.cost}</PdfTd>
																	<PdfTd>{item.vat}</PdfTd>
																	<PdfTd>0</PdfTd>
																	<PdfTd>0.00</PdfTd>
																	<PdfTd>0.00</PdfTd>
																	<PdfTd>{item.count}</PdfTd>
																	<PdfTd>{item.cost}</PdfTd>
																	<PdfTd>{item.vat}</PdfTd>
																</tr>
												})
											}
											<tr>
												<PdfTd2>合计</PdfTd2>
												<PdfTd>{taxformList.valid_check_count}</PdfTd>
												<PdfTd>{taxformList.valid_total_cost}</PdfTd>
												<PdfTd>{taxformList.valid_total_vat}</PdfTd>
												<PdfTd>0</PdfTd>
												<PdfTd>0.00</PdfTd>
												<PdfTd>0.00</PdfTd>
												<PdfTd>{taxformList.valid_check_count}</PdfTd>
												<PdfTd>{taxformList.valid_total_cost}</PdfTd>
												<PdfTd>{taxformList.valid_total_vat}</PdfTd>
											</tr>
										</tbody>
									</PdfTable>
								</div>
								<PdfSplit></PdfSplit>
								<div style={{color:'red',fontSize:12}}>
									注：<br/>
									1、本统计表包括指定税款所属期内所有勾选认证和扫描认证的发票。<br/>
									2、新增勾选认证和扫描认证数据会触发报表更新。<br/>
									3、当天勾选认证数据会准实时在本统计表中体现，当天扫描认证数据会第二天在本统计表中体现，请您关注统计表上方的“报表更新时间”。<br/>
									4、若勾选认证栏显示的发票数量少于确认勾选模块中查询到的当期累计确认发票数量，可能是由于同一张发票既勾选认证、又扫描认证了，系统去重导致。<br/>
								</div>
								<h4 style={{textAlign:'right',marginTop:15,paddingBottom:50}}>打印日期：{taxformList.print_end_date} </h4>
								</div>
						</PdfBoss>
					</div>
				}
      </div>
    )
  }
}

export default TaxformConB;