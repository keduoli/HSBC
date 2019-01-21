import React from 'react';
import styled from 'styled-components';
import { DatePicker  } from 'antd';
import moment from 'moment';
const { MonthPicker } = DatePicker;
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const MonthFormat = 'YYYYMM';
const BalanceTitle = styled.div`
  height:50px;
  width:100%;
  color: #333333;
  line-height:50px;
  border-bottom:1px solid #F1F3F5;
  padding:0 20px;
  box-sizing:border-box;
`;
const BalanceNum = styled.div`
  height:96px;
`;
const BalanceCon = styled.div`
  border-left:3px solid #2397CA;
  overflow:hidden;
  width:48%;
  margin-bottom:20px;
  height:352px;
  background:#fff;
`;
const BalanceBoss = styled.div`
  position:relative;
  overflow:hidden;
  width:100%;
  height:100%;
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  padding-top:50px;
  box-sizing:border-box;
`;
const BalanceBefore = styled.span`
  height:10px;
  width:10px;
  background:#EA5C5D;
  border-radius:100%;
  display:inline-block;
  margin-right:8px;
`;
class ScanBalance extends React.Component {
	state={
		invoiceData:[],
		nowMonth:"",
	}
	disabledDate = (current) => {
		return current.valueOf() > Date.now();
  };
	onChange = (date, dateString) => {
		const param = {
			year_month:dateString
		}
		// this.props.getInvoiceData(param,(res)=>{
    //   this.setState({invoiceData:res.data})
    // })
	}
	componentWillMount(){
		const now = new Date();
		const date =now.getFullYear()+""+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1);
		this.setState({nowMonth:date})
		const param = {
			year_month:date
		}
		// this.props.getInvoiceData(param,(res)=>{
    //   this.setState({invoiceData:res.data})
    // })
	}
	render(){
    const { homeData } = this.props;
		return (
			<BalanceBoss>    
        <div style={{position:'absolute',right:10,top:10}}>
          <span style={{fontSize:12,color:"#9B9B9B"}}>发票开票日期所在月份：</span>
          <MonthPicker  placeholder="请选择月份" 
                        disabledDate={this.disabledDate}
                        format={MonthFormat}
                        allowClear={false}
                        defaultValue={moment(this.state.nowMonth,"YYYY-MM")}
                        onChange={this.onChange}/>
        </div>
        {
          this.state.invoiceData.length>0 && this.state.invoiceData.map((item,index)=>{
            return <BalanceCon key={index}>
                    <BalanceTitle>
                      <div style={{fontSize:16,fontWeight:600,float:'left'}}>{item.name}</div>
                    </BalanceTitle>
                    <div style={{overflow:'hidden',padding:'0 20px'}}>
                      <BalanceNum style={{borderBottom:'1px solid #F1F3F5'}}>
                        <div style={{height:41,lineHeight:"41px",fontSize:14,color:'#333'}}>
                          <BalanceBefore></BalanceBefore>
                          <span>专用发票</span>
                        </div>
                        <div style={{height:55}}>
                          <div style={{float:'left',height:42,marginLeft:18}}>
                            <span style={{lineHeight:"42px",fontSize:30,color:"#333"}}>{item.counts.s_invoice.count}</span>
                            <span style={{fontSize:12,color:"#9B9B9B"}}>&nbsp; &nbsp;张</span>
                          </div>
                          <div style={{float:'left',height:42,marginLeft:63}}>
                            <div style={{fontSize:12,color:"#9B9B9B"}}>金额</div>
                            <span style={{fontSize:12,color:"#333333"}}>{item.counts.s_invoice.je===null?0:item.counts.s_invoice.je}</span>
                          </div>
                          <div style={{float:'left',height:42,marginLeft:63}}>
                            <div style={{fontSize:12,color:"#9B9B9B"}}>税额</div>
                            <span style={{fontSize:12,color:"#333333"}}>{item.counts.s_invoice.se===null?0:item.counts.s_invoice.se}</span>
                          </div>
                        </div>
                      </BalanceNum>
                      <BalanceNum style={{borderBottom:'1px solid #F1F3F5'}}>
                        <div style={{height:41,lineHeight:"41px",fontSize:14,color:'#333'}}>
                          <BalanceBefore style={{background:"#48D865"}}></BalanceBefore>
                          <span>普通发票</span>
                        </div>
                        <div style={{height:55}}>
                          <div style={{float:'left',height:42,marginLeft:18}}>
                            <span style={{lineHeight:"42px",fontSize:30,color:"#333"}}>{item.counts.c_invoice.count}</span>
                            <span style={{fontSize:12,color:"#9B9B9B"}}>&nbsp; &nbsp;张</span>
                          </div>
                          <div style={{float:'left',height:42,marginLeft:63}}>
                            <div style={{fontSize:12,color:"#9B9B9B"}}>金额</div>
                            <span style={{fontSize:12,color:"#333333"}}>{item.counts.c_invoice.je===null?0:item.counts.c_invoice.je}</span>
                          </div>
                          <div style={{float:'left',height:42,marginLeft:63}}>
                            <div style={{fontSize:12,color:"#9B9B9B"}}>税额</div>
                            <span style={{fontSize:12,color:"#333333"}}>{item.counts.c_invoice.se===null?0:item.counts.c_invoice.se}</span>
                          </div>
                        </div>
                      </BalanceNum>
                      <BalanceNum style={{borderBottom:'1px solid #F1F3F5'}}>
                        <div style={{height:41,lineHeight:"41px",fontSize:14,color:'#333'}}>
                          <BalanceBefore style={{background:"#b648d8"}}></BalanceBefore>
                          <span>电子发票</span>
                        </div>
                        <div style={{height:55}}>
                          <div style={{float:'left',height:42,marginLeft:18}}>
                            <span style={{lineHeight:"42px",fontSize:30,color:"#333"}}>{item.counts.s_invoice.count}</span>
                            <span style={{fontSize:12,color:"#9B9B9B"}}>&nbsp; &nbsp;张</span>
                          </div>
                          <div style={{float:'left',height:42,marginLeft:63}}>
                            <div style={{fontSize:12,color:"#9B9B9B"}}>金额</div>
                            <span style={{fontSize:12,color:"#333333"}}>{item.counts.s_invoice.je===null?0:item.counts.s_invoice.je}</span>
                          </div>
                          <div style={{float:'left',height:42,marginLeft:63}}>
                            <div style={{fontSize:12,color:"#9B9B9B"}}>税额</div>
                            <span style={{fontSize:12,color:"#333333"}}>{item.counts.s_invoice.se===null?0:item.counts.s_invoice.se}</span>
                          </div>
                        </div>
                      </BalanceNum>
                    </div>
                  </BalanceCon>
          })
        }
			</BalanceBoss>
		)
	}
}

export default ScanBalance;