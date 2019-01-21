import React from 'react';
import styled from 'styled-components';
import { DatePicker,Select  } from 'antd';
import ReactHighcharts from 'react-highcharts';
import moment from 'moment';
const { MonthPicker } = DatePicker;
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;

const BalanceCon = styled.div`
	width:20%;
	background:#fff;
	overflow:hidden;
	height:100%;
	margin-right:1%;
`;
const ChartDiv = styled.div`
	-webkit-transition: all .3s ease-in-out;
	transition: all .3s ease-in-out;
	margin-top:15px;
`;
const ChartCon = styled.div`
	flex:60%;
	background:#fff;
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
	padding:15px 0;
	font-weight:100;
	border-top:1px solid #EBEBEB;
`;
const MonthFormat = 'YYYYMM';
class GroupPieChart extends React.Component {
	state={
		nowMonth:"",
		year:[],
		checkData:"",
	}
	disabledDate = (current) => {
		return current.valueOf() > Date.now();
	};
	onChange = (value) => {
		const param = {
			year:value
		}
    this.props.getData(param)
  }
	componentWillMount(){
    const now = new Date();
	const date1 =now.getFullYear();
    const param = {
			year:date1
		}
    this.props.getData(param)
    const arr=[]
    for(let i=0,l=parseInt(date1)-2017;i<=l;i++){
      arr.push(parseInt(date1)-i)
    }
    this.setState({year:arr})
	}
	render(){
		const config = {
      chart: {
        type: 'column'
      },
      title: {
		  text: '',
      },
      subtitle: {
          text: '数量(显示每月查验发票量）',
          align: 'left'
      },
      xAxis: {
          categories:{}
      },
      yAxis: {
          title: {
              text: ''
          }
      },
      legend: {
          enabled: false
      },
      plotOptions: {
          series: {
              borderWidth: 0,
              dataLabels: {
                  enabled: true,
                  format: '{point.y:.0f}次'
              }
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span><b>{point.y:.0f}</b>'
      },
      credits:{
        text:"",
        href:"http://101.200.85.193",
        position:{
          align:"right",
          verticalAlign:"bottom"
        }
      },
      series: [{
          name: '查验数量',
          colorByPoint: true,
          data: []
      }]
    };
    const {homeData,getData} = this.props;
    config.series[0].data=homeData.monthNo;
    config.xAxis.categories = homeData.countNo;
		return (
			<div style={{overflow:'hidden',height:'100%',display:"flex"}} className='group_chart'>
				<BalanceCon>
					<CharTitle>发票查询余额</CharTitle>
					<p style={{textAlign:'center',fontSize:45,fontWeight:600,lineHeight:'31vh'}}>{homeData.quota}</p>
				</BalanceCon>
				<ChartCon>
					<ChartDiv>
						<div style={{overflow:'hidden',float:"left",margin:'10px 0 0 10px',fontSize:12,fontWeight:600,color:"#333",position:'relative',zIndex:20}}>发票查验统计</div>
						<div style={{overflow:'hidden',float:"right",marginRight:0,position:'relative',zIndex:20}}>
							<Select defaultValue={this.state.year[0]+""} style={{ width: 120,marginTop:10 }} onChange={this.onChange}>
								{
									this.state.year.map((item)=>{
										return <Option key={item} value={item+""}>{item}</Option>
									})
								}
							</Select>
						</div>
						<ReactHighcharts config = {config}/>
					</ChartDiv>
				</ChartCon>
			</div>
		)
	}
}

export default GroupPieChart;