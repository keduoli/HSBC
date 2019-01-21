import React from 'react'
import {NavTitle} from 'components'
import styled from 'styled-components'
import {Input,Button,message} from 'antd'

const ChangeDiv = styled.div`
  width:100%;
  padding-top:30px;
  min-height:86vh;
  background:#fff;
  text-align:center;
  position:relative;
`;
const LoginLogo = styled.div`
  width:264px;
  height:80px;
  margin:0 auto 40px;
  background:url(images/logo.png) no-repeat center; 
  background-size:100% 100%;
`;
const GropPass = styled.div`
  margin-bottom:15px;
`;
const CloundFooter = styled.div`
  width:100%;
  height:212px;
  bottom:0;
  left:0;
  background:url(images/clound.png) no-repeat;
  background-size:100% auto;
  @media screen and (min-height: 800px) {
    position:absolute;
  }
`;
class ChangePassWordPage extends React.Component{
  state={
    oldError:'',
  };
  componentDidMount(){
    if(window.location.href.indexOf('www.feeclouds.com')===-1){
      document.getElementById("logo").style.background = 'url()';
    }
  }
  render(){
    return(
      <div>
        <NavTitle title="修改密码"/>
        <ChangeDiv>
          <LoginLogo id='logo'/>
          <p style={{fontSize:20,marginBottom:20}}>修改密码</p>
          <GropPass>
            <p style={{fontSize:15}}>旧密码</p>
            <Input style={{width:300}} placeholder="请输入旧密码" type="password" ref={ref=>this.oldPsw = ref}/>
          </GropPass>
          <GropPass>
            <p style={{fontSize:15}}>新密码</p>
            <Input style={{width:300}} placeholder="请输入新密码" type="password" ref={ref=>this.newPsw = ref}/>
          </GropPass>
          <GropPass>
            <p style={{fontSize:15}}>确认密码</p>
            <Input style={{width:300}} placeholder="请再次输入新密码" type="password" ref={ref=>this.againPsw = ref}/>
          </GropPass>
          <div style={{overflow:'hidden',margin:'40px auto 70px',width:300}}>
            <Button style={{width:130,float:'left'}} onClick={()=>{window.history.back();}}>返回</Button>
            <Button type="primary"
                    style={{width:130,float:'right'}}
                    onClick={()=>{
                      const oldPsw = this.oldPsw.refs.input.value;
                      const newPsw = this.newPsw.refs.input.value;
                      const againPsw = this.againPsw.refs.input.value;
                      if(!oldPsw){
                        message.warning('请输入旧密码');return;
                      }
                      if(!newPsw){
                        message.warning('请输入新密码');return;
                      }
                      if(!againPsw){
                        message.warning('请再次输入新密码');return;
                      }
                      if(newPsw !== againPsw){
                        message.warning('两次输入的密码不一致');return;
                      }
                      const param = {
                        old_password:oldPsw,
                        new_password:againPsw,
                      }
                      this.props.changePassword(param);
                    }}
            >确定</Button>
          </div>
          <CloundFooter/>
        </ChangeDiv>
      </div>
    )
  }
}

export default ChangePassWordPage
