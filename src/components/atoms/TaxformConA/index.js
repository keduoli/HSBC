import React from 'react'
import styled from 'styled-components';
const TitleCon = styled.div`
	text-align:center;
	height:13vh;
	padding-top:19px;
	width:98%;
	margin:0 auto;
	padding-bottom:19px;
`;
const TableCon = styled.div`
	width:98%;
	margin:0 auto;
	overflow:hidden;
	border:1px solid #EBEBEB;
	font-size:14px;
	text-align:center;
`;
const LiCon = styled.li`
	width:16.25%;
	float:left;
	border-left:1px solid #EBEBEB;
`;
const LiConT = styled.li`
	width:48.75%;
	float:left;
	border-left:1px solid #EBEBEB;
`;
const UlCon = styled.ul`
	border-bottom:1px solid #EBEBEB;
	width:100%;
	line-height:35px;
	font-size:13px;
	overflow:hidden;
`;
const LiFirst = styled.li`
	width:35%;
	float:left;
	border-right:1px solid #EBEBEB;
`;
class TaxformConA extends React.Component{
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
						<TitleCon>
							<h3 style={{fontWeight:600}}>增值税纳税申报表附列资料表(二）</h3>
							<p style={{fontSize:14}}>(本期进项税额明细）</p>
							<div style={{fontSize:13}}>
								<div style={{float:'left'}}>税款所属时间：{taxformList.incomeMonthBeginDate} - {taxformList.incomeMonthEndDate}</div>
								<div style={{float:'right'}}>纳税人识别号：{taxformList.taxno}</div>
								<div style={{float:'right',marginRight:20}}>纳税人名称：{taxformList.taxname}</div>
							</div>
						</TitleCon>
						<TableCon>   
							<div style={{height:46,lineHeight:"46px",borderBottom:"1px solid #EBEBEB",fontWeight:600}}>一 、 申 报 抵 扣 的 进 项 税 额</div>
							<div style={{width:'100%'}}>
								<UlCon>
									<LiFirst>项目</LiFirst>
									<LiCon>栏次</LiCon>
									<LiCon>份数</LiCon>
									<LiCon>金额</LiCon>
									<LiCon>税额</LiCon>
								</UlCon>
								<UlCon>
									<LiFirst>(一）认证相符的税控增值税专用发票</LiFirst>
									<LiCon>1=2+3</LiCon>
									<LiCon>{taxformList.count}</LiCon>
									<LiCon>{taxformList.invCostSum}</LiCon>
									<LiCon>{taxformList.invVatSum}</LiCon>
								</UlCon>
								<UlCon>
									<LiFirst>其中：本期认证相符且本期申报抵扣</LiFirst>
									<LiCon>2</LiCon>
									<LiCon>{taxformList.count}</LiCon>
									<LiCon>{taxformList.invCostSum}</LiCon>
									<LiCon>{taxformList.invVatSum}</LiCon>
								</UlCon>
								<UlCon>
									<LiFirst>前期认证相符且本期申报抵扣</LiFirst>
									<LiCon>3</LiCon>
									<LiCon>--</LiCon>
									<LiCon>--</LiCon>
									<LiCon>--</LiCon>
								</UlCon>
								<UlCon>
									<LiFirst>当期认证相符且本期申报抵扣</LiFirst>
									<LiCon>12=1+4+11</LiCon>
									<LiCon>{taxformList.count}</LiCon>
									<LiCon>{taxformList.invCostSum}</LiCon>
									<LiCon>{taxformList.invVatSum}</LiCon>
								</UlCon>
							</div>
							<div style={{height:50,lineHeight:"50px",borderBottom:"1px solid #EBEBEB",fontWeight:600}}>二 、 进 项 税 额 转 出 额</div>
							<UlCon>
								<LiFirst>项目</LiFirst>
								<LiCon>栏次</LiCon>
								<LiConT>税额</LiConT>
							</UlCon>
							<UlCon>
								<LiFirst>本期进项转出额</LiFirst>
								<LiCon>13=14至23之和</LiCon>
								<LiConT>{taxformList.transferVatSum}</LiConT>
							</UlCon>
							<UlCon>
								<LiFirst>其中：免税项目用</LiFirst>
								<LiCon>14</LiCon>
								<LiConT>{taxformList.transferVatSum14}</LiConT>
							</UlCon>
							<UlCon>
								<LiFirst>非应税项目用、集体福利、个人消费</LiFirst>
								<LiCon>15</LiCon>
								<LiConT>{taxformList.transferVatSum15}</LiConT>
							</UlCon>
							<UlCon>
								<LiFirst>非正常损失</LiFirst>
								<LiCon>16</LiCon>
								<LiConT>{taxformList.transferVatSum16}</LiConT>
							</UlCon>
							<UlCon>
								<LiFirst>简易计税方法征税项目用</LiFirst>
								<LiCon>17</LiCon>
								<LiConT>{taxformList.transferVatSum17}</LiConT>
							</UlCon>
							<UlCon>
								<LiFirst>免抵退税方法不得抵扣的进项税额</LiFirst>
								<LiCon>18</LiCon>
								<LiConT>{taxformList.transferVatSum18}</LiConT>
							</UlCon>
							<UlCon>
								<LiFirst>纳税检查调减进项税额</LiFirst>
								<LiCon>19</LiCon>
								<LiConT>{taxformList.transferVatSum19}</LiConT>
							</UlCon>
							<UlCon>
								<LiFirst>红字专用发票通知单注明的进项税额</LiFirst>
								<LiCon>20</LiCon>
								<LiConT>{taxformList.transferVatSum20}</LiConT>
							</UlCon>
							<UlCon>
								<LiFirst>上期留抵税额抵减欠税</LiFirst>
								<LiCon>21</LiCon>
								<LiConT>{taxformList.transferVatSum21}</LiConT>
							</UlCon>
							<UlCon>
								<LiFirst>上期留抵税额退税</LiFirst>
								<LiCon>22</LiCon>
								<LiConT>{taxformList.transferVatSum22}</LiConT>
							</UlCon>
							<UlCon>
								<LiFirst>其他应作进项税额转出的情形</LiFirst>
								<LiCon>23</LiCon>
								<LiConT>{taxformList.transferVatSum23}</LiConT>
							</UlCon>
						</TableCon>
					</div>
				}
      </div>
    )
  }
}

export default TaxformConA;
