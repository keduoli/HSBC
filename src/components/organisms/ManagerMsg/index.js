import React from 'react'
import styled from 'styled-components'
import { Icon,Checkbox,Button,Radio,message,Input,Form } from 'antd'
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const ManagerTitle = styled.div`
  font-size: 14px;
  color: #333333;
  height:56px;
  border-bottom:1px solid #F1F3F5;
  padding-top:21px;
  font-weight:600;
  padding-left:2%;
  box-sizing:border-box;
`;
const ManagerTop = styled.div`
  margin-top:20px;
`;
const ManagerCon = styled.div`
  margin-top:20px;
`;
const InputLabel = styled.span`
  width:70px;
  line-height:32px;
  float:left;
  font-size:13px;
  color:#333;
  font-weight:600;
`;
const GroupWrap = styled.div`
  overflow:hidden;
  margin-left:21px;
`;
const RightTab = styled.div`
  display:inline-block;
  margin-left:17px;
`;
const BottomCon = styled.div`
  margin-top:10px;
  display:flex;
  position:fixed;
  bottom:15px;
  right:150px;
  z-index:100;
  justify-content:center;
  overflow:hidden;
`;
const CloseIcon = styled(Icon)`
 float:right;
 font-size:20px;
 cursor:pointer;
 margin-right:15px;
`;
const CheckCon = styled.div`
  overflow:hidden;
  display:flex;
  justify-content:space-around;
  margin-top:30px;
`;
const ManagerBoss = styled.div`
  position:relative;
  overflow:hidden;
  height:100%;
  width:100%;
`;
const CompanyName = styled.span`
   display:inline-block;
   font-weight:600;
`;
const CheckGroupCon = styled.div`
  overflow:hidden;
  float:right;
  margin-right:30px;
`;
const ManagerCheckCon = styled.div`
  margin-top:30px;
  margin-left:75px;
  height:30vh;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 5px;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #a0a0a0;
    border-left: 2px solid transparent;
  }
`;
class ManagerMsg extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      show:false,
      record:{
        relateds:[]
      },
      disabled:'',
      roles:[],
      arr:[],
      show:false,
      is_admin:"",
      is_cashier:"",
      user_id:"",
      is_admin_ids:"",
      is_cashier_ids:"",
      showCheckbox:true,
      telephone:''
    }
    this.arr = [];
    this.all=[];
    this.defaultAdmin = [];
    this.defaultCashier = [];
    this.defaultAll = [];
  }
  onChange = (checkedValues) => {
    const roles = [];
    const is_admin = [];
    const is_cashier = [];
    for(let i in checkedValues){
      const arr = checkedValues[i].split(",");
      roles.push(arr)
    }
    for(let j in roles){
      if(roles[j][1]==="管理员"){
        is_admin.push(roles[j][0])
      }else{
        is_cashier.push(roles[j][0])
      }
    }
    this.setState({
      is_admin_ids:is_admin+"",
      is_cashier_ids:is_cashier+"",
    })
  }
  onAdminChange = (e) => {
    if(e.target.checked===true){
      this.setState({
        is_admin:1,
        arr:this.defaultAll,
        is_admin_ids:'',
        is_cashier_ids:'',
      })
    }else{
      if(this.state.is_cashier === 1){
        this.setState({
          is_admin:0,
        })
      }else{
        this.setState({
          is_admin:0,
          arr:[],
          showCheckbox:false
        },()=>{
          this.setState({showCheckbox:true})
        })
      }
    }
  }
  onCashierChange = (e) => {
    if(e.target.checked===true){
      this.setState({
        is_cashier:1,
        arr:this.defaultAll,
        is_admin_ids:'',
        is_cashier_ids:'',
      })
    }else{
      if(this.state.is_admin === 1){
        this.setState({
          is_cashier:0,
        })
      }else{
        this.setState({
          is_cashier:0,
          arr:[],
          showCheckbox:false
        },()=>{
          this.setState({showCheckbox:true})
        })
      }
    }
  }
  submitFnc = () => {
    const param = {
      user_id:this.state.user_id,
      is_admin:this.state.is_admin,
      is_cashier:this.state.is_cashier,
      is_admin_ids:this.state.is_admin_ids,
      is_cashier_ids:this.state.is_cashier_ids,
      username:this.state.username,
      realname:this.state.realname,
      telephone:this.state.telephone,
    }
    if(this.state.username===''){
      message.warning("账号不能为空");return;
    }
    if(this.state.telephone===''){
      message.warning("手机号码不能为空");return;
    }
    if(!(/^[0-9]{11}$/).test(this.state.telephone)){
      message.warning("手机号码必须为11位的数字");return;
    }
    if(this.state.realname===''){
      message.warning("用户名不能为空");return;
    }
    if((window.location.href.indexOf('xcar.feeclouds.com')===-1 && window.location.href.indexOf('https://hfnf.feeclouds.com')===-1) && !(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/).test(this.state.username)){
      message.warning("账号必须为邮箱");return;
    }
    if(!(/^[a-zA-Z0-9\.\-_@]{1,32}$/).test(this.state.username)){
      message.warning("员工账号只能是数字或字母，长度为32及以下");return;
    }
    if(this.state.is_admin===0&&this.state.is_cashier===0&&this.state.is_admin_ids===''&&this.state.is_cashier_ids===''){
      message.warning("至少选择一项管理员权限");return;
    }else{
      this.props.editAdmin(param,()=>{
        this.props.refreshTable()
        this.props.cancel()
      })
    }
  }
  componentWillMount(){
    this.setState({
      record:this.props.record
    },()=>{
      this.setState({
        is_admin:this.state.record.is_admin,
        is_cashier:this.state.record.is_cashier,
        user_id:this.state.record.user_id,
        realname:this.state.record.realname,
        username:this.state.record.username,
        telephone:this.state.record.telephone,
      })
      for(let i in this.state.record.relateds){
          this.defaultAdmin.push(this.state.record.relateds[i].department_id+",管理员");
          this.defaultCashier.push(this.state.record.relateds[i].department_id+",财务");
          this.defaultAll.push(this.state.record.relateds[i].department_id+",财务");
          this.defaultAll.push(this.state.record.relateds[i].department_id+",管理员");
          if(this.state.record.relateds[i].is_admin===1){
            this.arr.push(this.state.record.relateds[i].department_id+",管理员")
          }
          if(this.state.record.relateds[i].is_cashier===1){
            this.arr.push(this.state.record.relateds[i].department_id+",财务")
          }
      }
      const roles = [];
      const is_admin = [];
      const is_cashier = [];
      for(let i in this.arr){
        const arr = this.arr[i].split(",");
        roles.push(arr)
      }
      for(let j in roles){
        if(roles[j][1]==="管理员"){
          is_admin.push(roles[j][0])
        }else{
          is_cashier.push(roles[j][0])
        }
      }
      this.setState({
        is_admin_ids:is_admin+"",
        is_cashier_ids:is_cashier+"",
      },()=>{
        if(this.state.is_admin === 1 || this.state.is_cashier === 1){
          this.setState({arr:this.defaultAll})
        }
      })
      this.setState({arr:this.arr},()=>{
        this.setState({show:true})
      })
    })
  }
  render(){
    const {record} = this.state;
    return(
      <ManagerBoss>
      {
        this.state.show === true && 
        <div style={{width:'100%',position:'relative'}}>
          <ManagerTitle>
            <span style={{float:'right'}}></span>管理员信息
            <CloseIcon type="close" onClick={()=>this.props.cancel()}/>
          </ManagerTitle>
          <GroupWrap style={{marginTop:20}}>
            <InputLabel>用户名：</InputLabel>
            <RightTab>
              <Input defaultValue={this.state.realname} onChange={(e)=>{
                this.setState({realname:e.target.value})
              }} style={{width:200}}/>
            </RightTab>
          </GroupWrap>
          <GroupWrap>
            <InputLabel>账号：</InputLabel>
            <RightTab>
              <Input defaultValue={this.state.username} onChange={(e)=>{
                this.setState({username:e.target.value})
              }} style={{width:200}}/>
            </RightTab>
          </GroupWrap>
          <GroupWrap>
            <InputLabel>手机号码：</InputLabel>
            <RightTab>
              <Input defaultValue={this.state.telephone} onChange={(e)=>{
                this.setState({telephone:e.target.value})
              }} style={{width:200}}/>
            </RightTab>
          </GroupWrap>
          <ManagerTop>
            <span style={{marginLeft:30,fontWeight:600}}>集团角色</span>
            {
              record.relateds.length>0 &&
              <CheckCon>
                <Checkbox disabled={this.props.navList.user_id===record.user_id} defaultChecked={record.is_admin===1?true:false} onChange={this.onAdminChange}>管理员</Checkbox>
                <Checkbox disabled={this.props.navList.user_id===record.user_id} defaultChecked={record.is_cashier===1?true:false} onChange={this.onCashierChange}>财务</Checkbox>
              </CheckCon>
            }
          </ManagerTop>
          {
            this.state.showCheckbox === true && 
            <ManagerCon>
              <span style={{marginLeft:30,fontWeight:600}}>关联公司</span>
              <ManagerCheckCon>
              {
                (this.state.is_admin === 1 || this.state.is_cashier === 1) ?
                <CheckboxGroup onChange={this.onChange} value={this.state.arr}>
                  {
                    record.relateds.length>0 && record.relateds.map((item,index)=>{
                      return <div key={index} style={{overflow:'hidden',marginBottom:20}}>
                                <CompanyName>{item.name}</CompanyName>
                                <CheckGroupCon>
                                  <Checkbox disabled={true} value={item.department_id+",管理员"}>管理员</Checkbox>
                                  <Checkbox disabled={true} value={item.department_id+",财务"}>财务</Checkbox>
                                </CheckGroupCon>
                              </div>
                    })
                  }
                </CheckboxGroup>
                :
                <CheckboxGroup onChange={this.onChange} defaultValue={this.state.arr}>
                {
                  record.relateds.length>0 && record.relateds.map((item,index)=>{
                    return <div key={index} style={{overflow:'hidden',marginBottom:20}}>
                              <CompanyName>{item.name}</CompanyName>
                              <CheckGroupCon>
                                <Checkbox disabled={this.props.navList.user_id===record.user_id} value={item.department_id+",管理员"}>管理员</Checkbox>
                                <Checkbox disabled={this.props.navList.user_id===record.user_id} value={item.department_id+",财务"}>财务</Checkbox>
                              </CheckGroupCon>
                            </div> 
                  })
                }
              </CheckboxGroup>
              }
              </ManagerCheckCon>
            </ManagerCon>
          }
          {
            this.props.navList.user_id!==record.user_id &&
            <BottomCon>
              <Button style={{marginRight:30}} onClick={()=>{
                this.props.showDetail(this.props.record)
              }}>重置</Button>
              <Button type='primary' onClick={this.submitFnc}>保存</Button>
            </BottomCon>
          }
        </div>
      }
      </ManagerBoss>
    )
  }
}
export default ManagerMsg