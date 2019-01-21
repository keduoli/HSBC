import React,{ Component } from 'react'
import styled from 'styled-components'
import { Table,Button,Modal,Checkbox,message,Input,Tooltip,Pagination,Spin } from 'antd';

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
	margin:10px 0 0 25px;
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
class UploadHistoryTable extends Component{
  constructor(props){
    super(props);
    this.state = {
			size:10,
			page:1,
			loading:false,
    };
	};1
	setPageFnc = (page) => {
		this.setState({loading:true,page:page})
	}
	componentWillUpdate(nextProps,nextState){
		const { page, size } = nextState;
		if(page!==this.state.page){
			let param;
			param = {
					page:page,
					size:10,
			}
			this.props.getCheckHistory(param,()=>{
				this.setState({loading:false})
			});
		}
	}
  render(){
		const historyData = this.props.historyData;
    return(
      <div style={{background:'#F7FBFF'}}>
				{
					this.state.loading === true && 
					<LoadingShow>
						<SpinLoad size="large" spinning={this.state.loading}/>
					</LoadingShow>
				}
				<div style={{marginBottom:60}}>
					<div className="invoice-manage-table" style={{fontSize:13}}>
						{
							historyData && 
								historyData.list.map((item,index)=>{
									return <HistoryCon key={item.id}>
													<div style={{marginBottom:10,float:"left"}}>
														<HistoryTitle2>
															<div style={{fontSize:20,fontWeight:600}}>
																{item.create_time.split(' ')[0]}
															</div>
															<div>
																{item.create_time.split(' ')[1]}
															</div>
															<div>
																操作人：{item.realName?item.realName:'---'}
															</div>
														</HistoryTitle2>
													</div>
													<HistoryRight>
														<div>
                              <div style={{float:'left',marginTop:18}}>
                                <div style={{float:'left',lineHeight:'20px'}}>
                                  <SuccImg></SuccImg>
                                  <div style={{float:'left',marginLeft:15,marginTop:6,overflow:"hidden"}}>
                                    <div style={{color:'#9e9e9e'}}>查验成功</div>
                                    <div><HistoryFont style={{color:"#01A853"}}> {item.success_num} </HistoryFont>张</div>
                                  </div>
                                </div>
                                <div style={{float:'left',lineHeight:'20px'}}>
                                  <ErrorImg></ErrorImg>
                                  <div style={{float:'left',marginLeft:15,marginTop:6}}>
                                    <div style={{color:'#9e9e9e'}}>查验失败</div>
                                    <div><HistoryFont style={{color:"#EC7975"}}> {item.failed_num} </HistoryFont>张</div>
                                  </div>
                                </div>
                              </div>
															<Button id={item.create_time} 
																			type='primary' 
																			onClick={(e)=>{window.location.href = '/ajax/excel/export/'+item.id}} 
																			style={{float:'right',marginTop:26,marginRight:20}}
																			>导出历史
                              </Button>
                            </div>
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

export default UploadHistoryTable;