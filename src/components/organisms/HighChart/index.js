import React from 'react';
import ReactHighcharts from 'react-highcharts';
import styled from 'styled-components';
import { Select } from 'antd';
const Option = Select.Option;

const ChartDiv = styled.div`
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    margin-top:15px;
`;
const MonthFormat = 'YYYYMM';
class HighChart extends React.Component{
  constructor(props,context){
    super(props,context);
    this.state={
      checkData:"",
      year:[],
    }
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
		const date =now.getFullYear();
    const param = {
			year:date
		}
    this.props.getData(param)
    const arr=[]
    for(let i=0,l=parseInt(date)-2017;i<=l;i++){
      arr.push(parseInt(date)-i)
    }
    this.setState({year:arr})
  }
  render(){
    const config = {
      chart: {
        type: 'column',
        animation:{
            duration: 1000
        }
      },
      title: {
          text: ''
      },
      subtitle: {
          text: '查验量统计(显示每月查验发票量）',
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
              },
              animation: true
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
    return <ChartDiv>
              <div style={{overflow:'hidden',float:"right",marginRight:0}}>
                <Select defaultValue={this.state.year[0]+""} style={{ width: 120,marginTop:10 }} onChange={this.onChange}>
                  {
                    this.state.year.map((item)=>{
                      return <Option key={item} value={item+""}>{item}</Option>
                    })
                  }
                </Select>
              </div>
              <ReactHighcharts config={config}/>
            </ChartDiv>
  }
}

export default HighChart
