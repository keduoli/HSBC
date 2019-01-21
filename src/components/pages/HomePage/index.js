import React from 'react'
import {NavTitle,HighChart,PieChart,GroupPieChart,ScanBalance} from 'components'
import styled from 'styled-components'

const AmountSpan = styled.span`
  color:#2476F8;
  font-size:18px;
  font-weight:700;
  line-height:40px;
  float:left;
`;
const Label = styled.span`
  margin-left:30px;
  font-size:12px;
  line-height:40px;
  float:left;
  margin-right:20px;
  font-weight:700;
`;
const HomeContent = styled.div`
  margin-top:10px;
  height:auto;
  background:#fff;
  padding:0px 50px;
`;
const HomeTop = styled.div`
  height:100%;
  background:#fff;
  height:60vh;
  display:flex;
  justify-content:center;
  align-items:center;
`;
const DownContent = styled.div`
  margin-top:10px;
  height:70vh;
  background:#fff;
  padding:0px 50px;
  padding-top:12vh;
`;
const DownBtn = styled.div`
  background:url(images/Group6.png) no-repeat;
  width:475px;
  height:370px;
  text-align:center;
  position:relative;
  margin:0 auto;
`;
const DownFont = styled.div`
  position:absolute;
  bottom:0;
  left:0;
  right:0;
  color:#41a3d0;
`;
const HomeImg = styled.img`
  width:500px;
  height:280px;
`;
class HomePage extends React.Component{
  render(){
    const {homeData,invoiceData,getData,getInvoiceData,navList,getQuota} = this.props;
    return(
        <div>
          <NavTitle
            title="首页"
          />
          <HomeTop>
            <HomeImg src='images/home.jpg'/>
          </HomeTop>
        </div>
    )
  }
}
export default HomePage