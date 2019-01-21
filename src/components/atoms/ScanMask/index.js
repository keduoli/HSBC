import React from 'react'
import styled from 'styled-components'
import {Button} from 'antd'

const Mask = styled.div`
  background:red;
  margin-left:12px;
  margin-top:-10px;
  width:720px;
  height:600px;
  float:left;
`;
const GroupMask = styled.div`
  position:absolute;
  background-color: #f5f5f5;
  background-color: rgba(237,237,237,1);
  left:0;
  top:0;
  width:100%;
  height:100%;
  z-index: 1000;
`;
const FontModal = styled.div`
  position:relative;
  top:200px;
  width:500px;
  margin:0 auto;
  text-align:center;
  z-index:1001;
`;
const TipFont = styled.p`
  font-size:18px;
  margin-bottom:50px;
`;
const GroupTipFont = styled.p`
  font-size:14px;
  color:#000000;
  margin-bottom:50px;
`;
const GroupFont = styled.h1`
	position:absolute;
	left:0;
	right:0;
	top:-110px;
`;
class ScanMask extends React.Component{
  render(){
    const {showScan,showManual} = this.props;
    return(
    	this.props.group===true ? 
    	<GroupMask>
        <FontModal>
        	<GroupFont>集团模式</GroupFont>
          <GroupTipFont>请确认扫描设备已连接到我的电脑或手动录入</GroupTipFont>
          <Button style={{marginRight:'20px'}} onClick={showManual}>手动录入</Button>
          <Button type="primary" onClick={showScan}>确认已连接</Button>
        </FontModal>
      </GroupMask> :
      <Mask>
        <FontModal>
          <TipFont>请确认扫描设备已连接到我的电脑或手动录入</TipFont>
          <Button style={{marginRight:'20px'}} onClick={showManual}>手动录入</Button>
          <Button onClick={showScan}>确认已连接</Button>
        </FontModal>
      </Mask>
    )
  }
}
export default ScanMask;
