import React from 'react'
import styled from 'styled-components'
import { Select, Button, message } from 'antd';
const LogImg = styled.div`
    display:block;
    width:264px;
    height:80px;
    margin:120px auto 80px;
    background:url(./images/logo.png) no-repeat center;
    background-size:100% 100%;
`;
const InputLabel = styled.span`
  width:70px;
  line-height:32px;
  float:left;
`;
const Label = styled.p`
  height:40px;
  line-height:40px;
  padding-left:30px;
  font-size:14px;
  font-weight:700;
  margin-top:5px;
  margin-bottom:30px;
`;
const GroupWrap = styled.div`
	overflow:hidden;
	margin-top:30px;
`;
const RightTab = styled.div`
  display:inline-block;
  margin-left:42px;
`;
class LoginPage extends React.Component{
	state={
		cname:'',
		roles:'',
	}
  render(){
    return(
      <div>
        <LogImg/>
        <div style={{margin:'0 auto',width:520}}>
            <GroupWrap>
              <InputLabel>部门名称：</InputLabel>
              <RightTab>
									<Select style={{width:400}} 
													placeholder="请选择" 
													onChange={(e)=>{
														this.setState({cname:e})
													}}>
										<Select.Option key='CDT'>CDT</Select.Option>
										<Select.Option key='GTRF'>GTRF</Select.Option>
										<Select.Option key='PSV'>PSV</Select.Option>
										<Select.Option key='CRD'>CRD</Select.Option>
									</Select>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel>权限：</InputLabel>
              <RightTab>
									<Select style={{width:400}} placeholder="请选择"
													onChange={(e)=>{
														this.setState({roles:e})
													}}>
										<Select.Option key='User'>User</Select.Option>
										<Select.Option key='adminUser'>adminUser</Select.Option>
										<Select.Option key='Supervisor'>Supervisor</Select.Option>
										<Select.Option key='adminUser,User'>adminUser,User</Select.Option>
										<Select.Option key='adminUser,Supervisor'>adminUser,Supervisor</Select.Option>
									</Select>
              </RightTab>
						</GroupWrap>
						<Button style={{width:100,textAlign:'center',marginLeft:210,marginTop:60}} onClick={()=>{
							if(this.state.cname == ''){
								message.error("部门名称不能为空");return;
							}
							if(this.state.roles == ''){
								message.error("权限不能为空");return;
							}
							const param = {
								cname:this.state.cname,
								roles:this.state.roles,
							}
							this.props.loginFnc(param,()=>{
								window.location.href = '/home'
							})
						}} type='primary'>确定</Button>
        </div>
      </div>
    )
  }
}

export default LoginPage;
