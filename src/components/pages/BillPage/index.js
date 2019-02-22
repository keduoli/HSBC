import React from 'react'
import {NavTitle,BillTable} from 'components'
import { Icon } from 'antd'
import styled from 'styled-components'
const RefreshBtn = styled.div`
  display:inline-block;
  margin-left:20px;
`;
const RefreshIcon = styled(Icon)`
  cursor:pointer;
  &:hover{
    color:#2476f8;
  }
  &:active{
    color:rgb(211,211,211);
  }
`;
class BillPage extends React.Component{
  state={
    billDate:''
  }
  componentWillMount(){
    const now = new Date();
    const date =now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
    let arr = date.split('-');
    let year = arr[0]; 
    let month = arr[1]; 
    let day = arr[2]; 
    let days = new Date(year, month, 0);
    days = days.getDate(); 
    let year2 = year;
    let month2 = parseInt(month);
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
    let t2 = year2 + '-' + month2;
    this.setState({billDate:t2})
    this.props.getBillList({billDate:t2,export:0,page:1,size:10});
  }
  showRefreshBtn = () => {
    return(
        <RefreshBtn>
          <RefreshIcon type="sync" onClick={()=>{
            this.table.refreshData();
          }}/>
        </RefreshBtn>
      )
  };
  render(){
    const { collectionStop,loading,getBillList,exportBillFnc,billList } = this.props;
    return(
        <div style={{display:'block',position:"relative"}}>
            <NavTitle title="企业设置"
                      refreshBtn={this.showRefreshBtn}
                      submeun='账单'/>
            <BillTable state={this.state}
                        collectionStop={collectionStop}
                        loading={loading}
                        billDate={this.state.billDate}
                        billList={billList}
                        exportBillFnc={exportBillFnc}
                        getBillList={getBillList}
                        ref={ref=>this.table = ref}/>
          </div>
    )
  }
}

export default BillPage;
