import React from 'react';
import { Table,Button,Modal,Checkbox,message,Input,Tooltip,Pagination,Spin } from 'antd';
import {ExpandInvoice,PictureScaleModal} from 'components';
import styled from 'styled-components';

const BottomPage = styled.div`
  background:#f7f7f7;
  position:fixed;
  bottom:0px;
  right:0px;
  padding:16px 18px;
	overflow:hidden;
  -webkit-transition: all .2 ease;
  transition: all .2s ease;
`;
const LoadingShow = styled.div`
	position:fixed;
	top:0;
	bottom:0;
	left:0;
	right:0;
	z-index:20;
	opacity:0.5;
	background:#fff;
`;
const SpinLoad = styled(Spin)`
	position:absolute;
	left:55%;
	top:50%;
	z-index:30;
`;
const HistoryCon = styled.div`
	margin-top:10px;
	overflow:hidden;
	background:#fff;
	display:flex;
	cursor:pointer;
	&:hover{
		background:#ECF6FD;
	}
	transition:all .2s;
`;
const HistoryFont = styled.span`
	font-size:18px;
	font-weight:600;
`;
const HistoryTitle1 = styled.div`
	overflow:hidden;
	float:left;
	line-height:100px;
	margin-left:30px;
`;
const HistoryTitle2 = styled.div`
	overflow:hidden;
	float:left;
	lineHeight:25px;
	textAlign:left;
	padding-right:60px;
	margin-left:30px;
	height:75px;
	margin-top:12px;
	border-right:1px solid #e9e9e9;
`;
const HistoryRight = styled.div`
	margin-left:30px;
	overflow:hidden;
	padding:5px;
	float:left;
	flex:1;
	height:90px;
	line-height:30px;
	font-size:12px;
`;
const UpdateCon = styled.span`
	color:#9e9e9e;
`;
const SuccImg = styled.div`
	float:left;
	background:url(images/Hsucc.png) no-repeat center;
	background-size:cover;
	height:35px;
	width:35px;
	margin-top:10px;
`;
const ErrorImg = styled.div`
	float:left;
	background:url(images/Herror.png) no-repeat center;
	background-size:cover;
	height:35px;
	width:35px;
	margin-top:10px;
	margin-left:25px;
`;
const VoidImg = styled.div`
	float:left;
	background:url(images/Hvoid.png) no-repeat center;
	background-size:cover;
	height:35px;
	width:35px;
	margin-top:10px;
	margin-left:25px;
`;
const WaitImg = styled.div`
	float:left;
	background:url(images/Hwait.png) no-repeat center;
	background-size:cover;
	height:35px;
	width:35px;
	margin-top:10px;
`;
class WaitHistoryTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {
			size:10,
			page:1,
			changeClassName:true,
			showWaitList:false,
			loading:false,
    };
	};1
	setPageFnc = (page) => {
		this.setState({loading:true,page:page})
	}
	componentWillUpdate(nextProps,nextState){
		const { page, size } = nextState;
		if(page!==this.state.page){
			const param = {
				page:page,
				size:10,
			}
			this.props.getHistoryData(param,()=>{
				this.setState({loading:false})
			});
		}
	}
  render(){
		const { historyData } = this.props;
    return(
			<div style={{background:'#F7FBFF'}}>
				{
					this.state.loading === true && 
					<LoadingShow>
						<SpinLoad size="large" spinning={this.state.loading}/>
					</LoadingShow>
				}
				<div style={{marginBottom:60,display:this.state.showWaitList?'none':'block',position:"relative"}}>
					<div className="invoice-manage-table" style={{fontSize:13}}>
						{
							historyData.list && 
								historyData.list.map((item,index)=>{
									return <HistoryCon key={item.id} onClick={(e)=>{
																													e.stopPropagation();
																													if(Number(item.is_polling)!==0){
																														const param = {
																																is_polling:item.category,
																																time_area:item.begin_date+","+item.end_date,
																																polling_id:item.id,
																																is_success:2,
																															}
																															this.props.changeDetailShow(param)
																														}	
																													}} >
													<div style={{marginBottom:10,float:"left"}}>
														<HistoryTitle2>
															<div style={{fontSize:20,fontWeight:600}}>
																{item.polling_time.split(' ')[0]}
															</div>
															<div>
																{item.polling_time.split(' ')[1]}
															</div>
															<div>
																操作人：{item.realName?item.realName:'---'}
															</div>
														</HistoryTitle2>
													</div>
													<HistoryRight>
															<div>
																开票日期：{item.begin_date?item.begin_date:'---'} 至 {item.end_date?item.end_date:'---'}，
																价税合计区间：{item.jshj_min?item.jshj_min:'---'} 至 {item.jshj_max?item.jshj_max:'---'}，
																生效方式：{item.effect_way===-1&&'所有'}{item.effect_way===1&&'任一'}{item.effect_way===null&&'---'}，
																共轮询发票<HistoryFont> {item.total} </HistoryFont>张
																<UpdateCon>{item.update_time?'(数据最后更新时间：'+item.update_time+')':''}</UpdateCon>
															</div>
															{
																Number(item.is_polling)!==0 ?
																<div>
																		<div style={{float:'left'}}>
																			<div style={{float:'left',lineHeight:'20px'}} onClick={(e)=>{
																				e.stopPropagation();
																				const param = {
																						is_polling:2,
																						time_area:item.begin_date+","+item.end_date,
																						polling_id:item.id,
																						is_success:1,
																					}
																					this.props.changeDetailShow(param)
																				}	
																			}>
																				<SuccImg></SuccImg>
																				<div style={{float:'left',marginLeft:15,marginTop:6,overflow:"hidden"}}>
																					<div style={{color:'#9e9e9e'}}>正常发票</div>
																					<div><HistoryFont style={{color:"#01A853"}}> {item.normal} </HistoryFont>张</div>
																				</div>
																			</div>
																			<div style={{float:'left',lineHeight:'20px'}} onClick={(e)=>{
																				e.stopPropagation();
																				const param = {
																						is_polling:2,
																						time_area:item.begin_date+","+item.end_date,
																						polling_id:item.id,
																						is_success:0,
																					}
																					this.props.changeDetailShow(param)
																				}	
																			}>
																				<ErrorImg></ErrorImg>
																				<div style={{float:'left',marginLeft:15,marginTop:6}}>
																					<div style={{color:'#9e9e9e'}}>失败发票</div>
																					<div><HistoryFont style={{color:"#EC7975"}}> {item.failure} </HistoryFont>张</div>
																				</div>
																			</div>
																			<div style={{float:'left',lineHeight:'20px'}} onClick={(e)=>{
																				e.stopPropagation();
																				const param = {
																						is_polling:2,
																						time_area:item.begin_date+","+item.end_date,
																						polling_id:item.id,
																						is_success:2,
																						zfbz:'Y',
																					}
																					this.props.changeDetailShow(param)
																				}	
																			}>
																				<VoidImg></VoidImg>
																				<div style={{float:'left',marginLeft:15,marginTop:6}}>
																					<div style={{color:'#9e9e9e'}}>已作废发票</div>
																					<div><HistoryFont> {item.invalid} </HistoryFont>张</div>
																				</div>
																			</div>
																		</div>
																		<a id={item.begin_date+","+item.end_date} onClick={(e)=>{
																				e.preventDefault();
																				const param = {
																					is_polling:2,
																					time_area:item.begin_date+","+item.end_date,
																					polling_id:item.id,
																				}
																				this.props.changeDetailShow(param)
																		}} 
																			style={{float:'right',color:'#2397CA'}}
																			href="javascript:;"
																			>查看详情
																		</a>
																</div>
																:
																<div>
																	<div>
																		<WaitImg></WaitImg>
																		<div style={{float:'left',marginLeft:15,lineHeight:4.5}}>
																			发票正在轮询中，请稍后查看轮询查验结果
																		</div>
																	</div>
																	<a
																		style={{float:'right',color:'#2397CA'}}
																		href="javascript:;"
																		>轮询中...
																	</a>
																</div>
															}
													</HistoryRight>
												</HistoryCon>
								})
						}
					</div>
					<BottomPage style={{left:this.props.collectionStop?'75px':'210px'}}>
						<Pagination total={historyData.total}
												style={{float:'right',marginRight:30}}
												current={this.state.page}
												onChange={(page, pageSize)=>{
													this.setPageFnc(page);
												}}
							/>
					</BottomPage>
				</div>
			</div>
    )
  }
}
export default WaitHistoryTable;
