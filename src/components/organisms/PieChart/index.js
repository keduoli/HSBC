import React from 'react';
import styled from 'styled-components';
import { DatePicker,Tabs } from 'antd';
import ReactHighcharts from 'react-highcharts';
import moment from 'moment';
const { MonthPicker } = DatePicker;
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const TabPane = Tabs.TabPane;
const BalanceCon = styled.div`
	width:20%;
	background:#fff;
	overflow:hidden;
	height:100%;
	margin-right:1%;
`;
const ChartCon = styled.div`
	flex:1;
	background:#fff;
	overflow:hidden;
	height:100%;
`;
const CharTitle = styled.div`
	font-size:12px;
	margin:10px 0 0 15px;
	font-weight:600;
`;
const ChartLen = styled.div`
	width:150px;
	height:10px;
	margin-top:44px;
	border-radius:3px;
	margin-left:13px;
	background:#ECECEC;
	float:left;
`;
const ChartLi = styled.div`
	height:100%;
	width:20%;
	background:#FF9A9A;
	border-radius:2px;
`;
const ChartLi2 = styled.div`
	height:100%;
	width:30%;
	margin-left:20%;
	background:#FAC000;
	border-radius:2px;
`;
const ChartLi3 = styled.div`
	height:100%;
	width:50%;
	float:right;
	background:#2397CA;
	border-radius:2px;
`;
const ChartNum = styled.div`
	float:right;
	margin-right:15px;
	padding:2px;
	border-radius:2px;
	color:#fff;
	font-size:12px;
	background:#FF9A9A;
	margin-top:35px;
`;
const SpanTop = styled.div`
	display:inline-block;
	height:10px;
	width:10px;
	borderRadius:50%;
`;
const ScanTitle = styled.li`
	float:left;
	font-size: 12px;
	color: #2397CA;
	width:20%;
	margin-top:15px;
`;
const ScanLi = styled.li`
	color:#000;
	padding:6% 0;
	font-weight:100;
	border-top:1px solid #EBEBEB;
`;
const MonthFormat = 'YYYYMM';
class PieChart extends React.Component {
	state={
		invoiceData:{},
		nowMonth:"",
		select_type:'0',
		year_month:'',
		quota:0,
	}
	disabledDate = (current) => {
		return current.valueOf() > Date.now();
	};
	onChange = (date, dateString) => {
		this.setState({year_month:dateString})
		const param = {
			year_month:dateString,
			select_type:this.state.select_type,
		}
		this.props.getInvoiceData(param)
	}
	componentWillMount(){
		const now = new Date();
		const date =now.getFullYear()+""+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1);
		this.setState({nowMonth:date,year_month:date})
		const param = {
			year_month:date,
			select_type:this.state.select_type,
		}
		this.props.getInvoiceData(param)
		this.props.getQuota((res)=>{
			this.setState({quota:res.data.quota})
		})
	}
	onTabChange = (key) => {
		this.setState({select_type:key},()=>{
			const param = {
				year_month:this.state.year_month,
				select_type:this.state.select_type,
			}
			this.props.getInvoiceData(param)
		})
	}
	render(){
		const { homeData,invoiceData } = this.props;
		const config = {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
        animation:{
            duration: 1000
        },
				spacing : [0, 0 , 0, 0]
			},
			title: {
					floating:false,
					text: ''
			},
			tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			credits:{
				text:"",
				position:{
					align:"right",
					verticalAlign:"bottom"
				}
			},
			plotOptions: {
					series: {
						animation:{
								duration: 1000
						},
					},
					pie: {
							allowPointSelect: true,
							cursor: 'pointer',
							dataLabels: {
									enabled: false,
									format: '<b>{point.name}</b>: {point.percentage:.1f} %',
									style: {
											color:  'black'
									}
							},
					}
			},
			series: [{
					type: 'pie',
					innerSize: '80%',
					name: '占比',
					data: [
							['电子发票',this.props.invoiceData.e_invoice.count===null?0:invoiceData.e_invoice.count],
							['暂无',(this.props.invoiceData.s_invoice.count===0&&
								this.props.invoiceData.c_invoice.count===0&&
								this.props.invoiceData.e_invoice.count===0&&
								this.props.invoiceData.traffic_invoice.count===0&&
								this.props.invoiceData.car_invoice.count===0&&
								this.props.invoiceData.usedcar_invoice.count===0)?1:0],
							['普通发票',this.props.invoiceData.c_invoice.count===null?0:invoiceData.c_invoice.count],
							['专用发票',this.props.invoiceData.s_invoice.count===null?0:invoiceData.s_invoice.count],
							['通行费发票',this.props.invoiceData.traffic_invoice.count===null?0:invoiceData.traffic_invoice.count],
							['机动车发票',this.props.invoiceData.car_invoice.count===null?0:invoiceData.car_invoice.count],
							['二手车发票',this.props.invoiceData.usedcar_invoice.count===null?0:invoiceData.usedcar_invoice.count],
					]
			}]
		}
		return (
			<div style={{overflow:'hidden',height:'100%',display:"flex"}} className='homepage'>
				<BalanceCon>
					<CharTitle>发票查询余额</CharTitle>
					<p style={{textAlign:'center',fontSize:45,fontWeight:600,lineHeight:'37vh'}}>{this.state.quota}</p>
				</BalanceCon>
				{/*<BalanceCon>
					<CharTitle>
						发票认证期限预警
						<span style={{float:'right',fontWeight:100,marginRight:15}}>全部</span>
					</CharTitle>
					<div style={{overflow:'hidden'}}>
						<div style={{overflow:'hidden'}}>
							<ChartLen><ChartLi></ChartLi></ChartLen>
							<ChartNum>100</ChartNum>
						</div>
						<div style={{overflow:'hidden'}}>
							<ChartLen><ChartLi2></ChartLi2></ChartLen>
							<ChartNum style={{background:'#FAC000'}}>100</ChartNum>
						</div>
						<div style={{overflow:'hidden'}}>
							<ChartLen><ChartLi3></ChartLi3></ChartLen>
							<ChartNum style={{background:'#2397CA'}}>100</ChartNum>
						</div>
					</div>
				</BalanceCon>*/}
				<ChartCon>
					<CharTitle>
						<div style={{overflow:'hidden'}}>
							<div style={{overflow:'hidden',float:"left"}}>
								进项发票数据统计
								<span style={{fontWeight:100}}>(根据{this.state.select_type=='0'?'开票日期':'提交日期'}统计）</span>
							</div>
							<div style={{overflow:'hidden',float:"left",marginLeft:134}}>
								<Tabs
										onChange={this.onTabChange}
										activeKey={this.state.select_type}
										hideAdd={true}	
										size="samll"
								>
									<TabPane tab='根据开票日期统计' key='0'></TabPane>
									<TabPane tab='根据提交日期统计' key='1'></TabPane>
								</Tabs>
							</div>
							<div style={{overflow:'hidden',float:"right",marginRight:55}}>
								<span style={{lineHeight:'28px',color:"#9B9B9B"}}>发票{this.state.select_type=='0'?'开票日期':'提交日期'}所在月份：</span>
								<MonthPicker  placeholder="请选择月份" 
															disabledDate={this.disabledDate}
															format={MonthFormat}
															allowClear={false}
															style={{marginLeft:5}}
															defaultValue={moment(this.state.nowMonth,"YYYY-MM")}
															onChange={this.onChange}/>
							</div>
						</div>
						<div className="Pie" style={{overflow:'hidden',width:'25%',float:"left"}}>
							<div style={{display:'block'}}>
								<ReactHighcharts  config = {config}/>
							</div>
							<div style={{overflow:'hidden'}}>
								<div style={{overflow:'hidden',float:'left',marginRight:"20%",textAlign:"left"}}>
									<div style={{marginTop:8}}>
										<SpanTop style={{background:"#90ed7d"}}></SpanTop>
										<span style={{marginLeft:3}}>普通发票</span>
									</div>
									<div style={{marginTop:8}}>
										<SpanTop style={{background:"#f7a35c"}}></SpanTop>
										<span style={{marginLeft:3}}>专用发票</span>
									</div>
									<div style={{marginTop:8}}>
										<SpanTop style={{background:"rgb(228, 211, 84)"}}></SpanTop>
										<span style={{marginLeft:3}}>二手车发票</span>
									</div>
									<div style={{marginTop:8}}>
										<SpanTop style={{background:"rgb(241, 92, 128)"}}></SpanTop>
										<span style={{marginLeft:3}}>机动车发票</span>
									</div>
								</div>
								<div style={{overflow:'hidden',float:'left',marginRight:"10%",textAlign:"left"}}>
									<div style={{marginTop:8}}>
										<SpanTop style={{background:"#7cb5ec"}}></SpanTop>
										<span style={{marginLeft:3}}>电子发票</span>
									</div>
									<div style={{marginTop:8}}>
										<SpanTop style={{background:"rgb(128, 133, 233)"}}></SpanTop>
										<span style={{marginLeft:3}}>通行费发票</span>
									</div>
									<div style={{marginTop:8}}>
										<SpanTop style={{background:"#434348"}}></SpanTop>
										<span style={{marginLeft:3}}>暂无</span>
									</div>
								</div>
							</div>
						</div>
						<div style={{overflow:'hidden',width:'70%',float:"left",marginLeft:"2%"}}>
							<ul>
								<ScanTitle><div style={{paddingBottom:15}}>发票类型</div>
									<ul>
										<ScanLi>普通发票</ScanLi>
										<ScanLi>专用发票</ScanLi>
										<ScanLi>电子发票</ScanLi>
										<ScanLi>机动车发票</ScanLi>
										<ScanLi>通行费发票</ScanLi>
										<ScanLi>二手车发票</ScanLi>
										<ScanLi style={{color:'#2397CA',fontWeight:600}}>合计</ScanLi>
									</ul>
								</ScanTitle>
								<ScanTitle><div style={{paddingBottom:15}}>统计张数</div>
									<ul>
										<ScanLi>{invoiceData.c_invoice.count===null?0:invoiceData.c_invoice.count}</ScanLi>
										<ScanLi>{invoiceData.s_invoice.count===null?0:invoiceData.s_invoice.count}</ScanLi>
										<ScanLi>{invoiceData.e_invoice.count===null?0:invoiceData.e_invoice.count}</ScanLi>
										<ScanLi>{invoiceData.car_invoice.count===null?0:invoiceData.car_invoice.count}</ScanLi>
										<ScanLi>{invoiceData.traffic_invoice.count===null?0:invoiceData.traffic_invoice.count}</ScanLi>
										<ScanLi>{invoiceData.usedcar_invoice.count===null?0:invoiceData.usedcar_invoice.count}</ScanLi>
										<ScanLi>{invoiceData.sum&&invoiceData.sum.count}</ScanLi>
									</ul>
								</ScanTitle>
								<ScanTitle><div style={{paddingBottom:15}}>金额合计</div>
									<ul>
										<ScanLi>{Number(invoiceData.c_invoice.je===null?0:invoiceData.c_invoice.je).toFixed(2)}</ScanLi>
										<ScanLi>{Number(invoiceData.s_invoice.je===null?0:invoiceData.s_invoice.je).toFixed(2)}</ScanLi>
										<ScanLi>{Number(invoiceData.e_invoice.je===null?0:invoiceData.e_invoice.je).toFixed(2)}</ScanLi>
										<ScanLi>{Number(invoiceData.car_invoice.je===null?0:invoiceData.car_invoice.je).toFixed(2)}</ScanLi>
										<ScanLi>{Number(invoiceData.traffic_invoice.je===null?0:invoiceData.traffic_invoice.je).toFixed(2)}</ScanLi>
										<ScanLi>{Number(invoiceData.usedcar_invoice.je===null?0:invoiceData.usedcar_invoice.je).toFixed(2)}</ScanLi>
										<ScanLi>{invoiceData.sum&&Number(invoiceData.sum.je).toFixed(2)}</ScanLi>
									</ul>
								</ScanTitle>
								<ScanTitle><div style={{paddingBottom:15}}>税额合计</div>
									<ul>
										<ScanLi>{Number(invoiceData.c_invoice.se===null?0:invoiceData.c_invoice.se).toFixed(2)}</ScanLi>
										<ScanLi>{Number(invoiceData.s_invoice.je===null?0:invoiceData.s_invoice.se).toFixed(2)}</ScanLi>
										<ScanLi>{Number(invoiceData.e_invoice.je===null?0:invoiceData.e_invoice.se).toFixed(2)}</ScanLi>
										<ScanLi>{Number(invoiceData.car_invoice.je===null?0:invoiceData.car_invoice.se).toFixed(2)}</ScanLi>
										<ScanLi>{Number(invoiceData.traffic_invoice.je===null?0:invoiceData.traffic_invoice.se).toFixed(2)}</ScanLi>
										<ScanLi>{Number(invoiceData.usedcar_invoice.je===null?0:invoiceData.usedcar_invoice.se).toFixed(2)}</ScanLi>
										<ScanLi>{invoiceData.sum&&Number(invoiceData.sum.se).toFixed(2)}</ScanLi>
									</ul>
								</ScanTitle>
								<ScanTitle><div style={{paddingBottom:15}}>合计</div>
									<ul>
										<ScanLi>{Number(invoiceData.c_invoice.jshj===null?0:invoiceData.c_invoice.jshj).toFixed(2)}</ScanLi>
										<ScanLi>{Number(invoiceData.s_invoice.jshj===null?0:invoiceData.s_invoice.jshj).toFixed(2)}</ScanLi>
										<ScanLi>{Number(invoiceData.e_invoice.jshj===null?0:invoiceData.e_invoice.jshj).toFixed(2)}</ScanLi>
										<ScanLi>{Number(invoiceData.car_invoice.jshj===null?0:invoiceData.car_invoice.jshj).toFixed(2)}</ScanLi>
										<ScanLi>{Number(invoiceData.traffic_invoice.jshj===null?0:invoiceData.traffic_invoice.jshj).toFixed(2)}</ScanLi>
										<ScanLi>{Number(invoiceData.usedcar_invoice.jshj===null?0:invoiceData.usedcar_invoice.jshj).toFixed(2)}</ScanLi>
										<ScanLi>{invoiceData.sum&&Number(invoiceData.sum.jshj).toFixed(2)}</ScanLi>
									</ul>
								</ScanTitle>
							</ul>
						</div>
					</CharTitle>
				</ChartCon>
			</div>
		)
	}
}

export default PieChart;