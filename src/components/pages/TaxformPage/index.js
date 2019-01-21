import React from 'react'
import {NavTitle,TaxformFilter,TaxformConA,TaxformConB,TaxformConC,AddCallModal} from 'components'
import styled from 'styled-components';
import { Spin } from 'antd'

const SwitchLog = styled.div`
  background:#fff;
  padding:20px 0 0 10px;
  overflow:hidden;
  width: 100%;
  margin-bottom:15px;
`;
const ChangeMask = styled.div`
  position:absolute;
  top:0;
  bottom:0;
  right:0;
  left:0;
  background:#f7f7f7;
  z-index:10000;
  opacity:0.5;
`;
const MaskSpin = styled(Spin)`
  position:absolute;
  top:20%;
  bottom:0;
  right:0;
  left:0;
`;
class TaxformPage extends React.Component{
  getPreMonth = () => {
      const now = new Date();
      const date =now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
      let arr = date.split('-');
      let year = arr[0]; 
      let month = arr[1]; 
      let day = arr[2]; 
      let days = new Date(year, month, 0);
      days = days.getDate(); 
      let year2 = year;
      let month2 = parseInt(month) - 1;
      if (month2 == 0) {
          year2 = parseInt(year2) - 1;                          //获取当前时间的上一个月
          month2 = 12;
      }
      let day2 = day;
      let days2 = new Date(year2, month2, 0);
      days2 = days2.getDate();
      if (day2 > days2) {
          day2 = days2;
      }
      if (month2 < 10) {
          month2 = '0' + month2;
      }
      let t2 = year2 + '-' + month2
      return t2;
  }
  state={
    income_month:this.getPreMonth(),
    code:"",
    report_type:1,
    showModal:<AddCallModal cancelModal={()=>{
                                  this.setState({showModal:''})
                                }}
                            getBunding={this.props.getBunding}
                            getPhoneSend={this.props.getPhoneSend}
                            title="绑定手机号"
                            succModal={()=>{
                                  this.setState({showModal:''})
                                  const param = {
                                    income_month : this.getPreMonth(),
                                    report_type : 1,
                                  }
                                  this.props.settingsGet();
                                  this.props.getData(param)}}
                                />
  }
  componentWillMount(){
    const param = {
      income_month : this.getPreMonth(),
      report_type : 1,
    }
    this.props.settingsGet();
    this.props.getData(param,(res)=>{
      this.setState({code:res.code})
    })
  }
  loadTaxformData = () => {
    const param = {
      report_type:this.state.report_type,
      income_month:this.state.income_month,
    };
    this.props.getData(param);
  };
  check_tittle_index = (index) => {
    return index===this.state.report_type ? "log-title active" : "log-title";
  };
  render(){
    const {getData,taxformList,exportTaxform,exportUrl,settingsList} = this.props;
    return(
      <div>
        <NavTitle title="认证抵扣"
                  submeun='报表'/>
        {
          this.state.code === 20008 ?
          <div>
            {this.state.showModal}
          </div>
          :
          <div>
            <SwitchLog>
              <ul>
              {
                settingsList && settingsList.reports.find((item)=>item === 1) &&
                <li onClick={() => {
                  if(this.state.report_type === 1)return;
                  this.setState({
                    report_type : 1,
                  },()=>{this.loadTaxformData()});
                }}
                    className={ this.check_tittle_index(1) }
                >增值税纳税申报表附列资料表</li>
              }
              {
                settingsList && settingsList.reports.find((item)=>item === 2) &&
                <li onClick={() => {
                  if(this.state.report_type === 2)return;
                  this.setState({
                    report_type : 2,
                  },()=>{this.loadTaxformData()});
                }}
                    className={ this.check_tittle_index(2) }
                >申报抵扣发票统计表</li>
              }
              {
                settingsList && settingsList.reports.find((item)=>item === 3) &&
                <li onClick={() => {
                  if(this.state.report_type === 3)return;
                  this.setState({
                    report_type : 3,
                  },()=>{this.loadTaxformData()});
                }}
                    className={ this.check_tittle_index(3) }
                >发票清单</li>
              }
              </ul>
            </SwitchLog>
            <div style={{position:'relative'}}>    
            <TaxformFilter getData={getData}
                          SetIncomeMonth={(val)=>{
                            this.setState({income_month:val})
                          }}
                          report_type={this.state.report_type}
                          settingsList={settingsList}
                          exportTaxform={exportTaxform}
                          taxformList={taxformList}
                          exportUrl={exportUrl}
                          getPreMonth={this.getPreMonth}/>  
              {
                this.props.loading&& 
                <ChangeMask>
                  <MaskSpin style={{opacity:1}} size="large"/>
                </ChangeMask>
              }
              {
                this.state.report_type===1&&<TaxformConA taxformList={taxformList}/>
              }
              {
                this.state.report_type===2&&<TaxformConB taxformList={taxformList}/>
              }
              {
                this.state.report_type===3&&<TaxformConC taxformList={taxformList}/>
              }
            </div>
          </div>
        }
      </div>
    )
  }
} 

export default TaxformPage;
