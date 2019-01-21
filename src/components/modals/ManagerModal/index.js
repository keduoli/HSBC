import React from 'react'
import {Input,Form,Button,Modal,Radio,Select,Checkbox,message } from 'antd'
import styled from 'styled-components'

const CheckboxGroup = Checkbox.Group;
const {Option} = Select;
const InputLabel = styled.span`
  width:60px;
  float:left;
  line-height:32px;
  margin-left:50px;
`;
const GroupWrap = styled.div`
  overflow:hidden;
  padding:0 10px;
`;
const RightTab = styled.div`
  display:inline-block;
  float:right;
  margin-right:50px;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const CompanyName = styled.div`
  float:left;
  font-weight:600;
  text-align:left;
  margin-left:70px;
`;
const CheckCon = styled.div`
  overflow:hidden;
  display:flex;
  justify-content:space-around;
`;
const FormItem = Form.Item;
class ManagerModalMack extends React.Component{
  state={
    disabled:false,
    is_admin:0,
    is_cashier:0,
    is_admin_ids:'',
    is_cashier_ids:'',
    realname:"",
    showError:"",
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        values['is_admin'] = this.state.is_admin;
        values['is_cashier'] = this.state.is_cashier;
        values['is_admin_ids'] = this.state.is_admin_ids;
        values['is_cashier_ids'] = this.state.is_cashier_ids;
        if(this.state.is_admin === 0 && this.state.is_cashier === 0 && this.state.is_admin_ids === '' && this.state.is_cashier_ids === ''){
          message.warning("至少选择一项权限");return;
        }
        this.props.addAdmin(values,()=>{
          this.props.cancel()
          this.props.refreshTable()
        })
      }
    });
  };
  disabledChange = (e) => {
    this.setState({disabled:e.target.checked})
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
        disabled:true,
        is_admin_ids:"",
        is_cashier_ids:"",
      })
    }else{
      this.setState({
        is_admin:0
      },()=>{
        if(this.state.is_cashier === 0){
          this.setState({disabled:false})
        }
      })
    }
  }
  onCashierChange = (e) => {
    if(e.target.checked===true){
      this.setState({
        is_cashier:1,
        disabled:true,
        is_admin_ids:"",
        is_cashier_ids:"",
      })
    }else{
      this.setState({
        is_cashier:0
      },()=>{
        if(this.state.is_admin === 0){
          this.setState({disabled:false})
        }
      })
    }
  }
  getUsername = (e) => {
    let val = e.target.value;
    this.props.getInfo({account:val},(res)=>{
      if(res.code===20009){
        this.setState({showError:<div>该用户已是集团管理员，请勿重复添加。</div>})
      }else if(res.code===20002){
        this.setState({showError:''})
      }else if(res.code===10002){

      }else if(res.code===20013){
        this.setState({showError:<div>{res.msg}</div>})
      }else{
        this.setState({showError:'',realname:res.data.realname})
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
    <Modal title={<TitleSpan>新增管理员</TitleSpan>}
           style = {{textAlign:'center',top:100}}
           visible
           width={700}
           onCancel={()=>this.props.cancel()}
           maskClosable={false}
           footer={null}
    >
      <Input type="text" style={{display:'none'}}/>
      <Input type="password" style={{display:'none'}}/>
      <Input type="password" style={{display:'none'}}/>
      <Form>
        <GroupWrap>
          <InputLabel>账号</InputLabel>
          <RightTab>
            <FormItem hasFeedback>
              {getFieldDecorator('username', {
                rules: [{
                  required: true, message: '账号不能为空',
                }, {
                  pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '账号必须为邮箱号'
                }],
              })(
                <Input type="text" style={{width:230}} placeholder="输入账号或新建" autoComplete="new-password" onBlur={this.getUsername}/>
              )}
            </FormItem>
          </RightTab>
        </GroupWrap>
        <GroupWrap>
          <InputLabel>手机号码</InputLabel>
          <RightTab>
            <FormItem hasFeedback>
              {getFieldDecorator('telephone', {
                rules: [{
                  required: true, message: '手机号码不能为空',
                }, {
                  pattern: /^[0-9]{11}$/, message: '手机号码必须为11位的数字'
                }],
              })(
                <Input type="text" style={{width:230}} placeholder="输入手机号码" autoComplete="new-password"/>
              )}
            </FormItem>
          </RightTab>
        </GroupWrap>
        {this.state.showError}
        <div>
          {
            this.state.showError === '' && 
            <div>
              <GroupWrap>
                <InputLabel>姓名</InputLabel>
                <RightTab>
                  <FormItem hasFeedback>
                    {getFieldDecorator('realname', {
                      initialValue:this.state.realname,
                      rules: [{
                        required: true, message: '姓名不能为空',
                      }],
                    })(
                      <Input disabled={this.state.realname===""?false:true} style={{width:230}} autoComplete="new-password"/>
                    )}
                  </FormItem>
                </RightTab>
              </GroupWrap>
            {
              this.state.realname==="" &&
              <GroupWrap>
                <InputLabel>初始密码</InputLabel>
                <RightTab>
                  <FormItem hasFeedback>
                    {getFieldDecorator('password', {
                      rules: [{
                        required: true, message: '初始密码不能为空',
                      }],
                    })(
                      <Input type="password" style={{width:230}} autoComplete="new-password"/>
                    )}
                  </FormItem>
                </RightTab>
              </GroupWrap>
            }
            <GroupWrap>
              <InputLabel style={{marginRight:10}}>角色</InputLabel>
              <RightTab>
                <FormItem>
                  <CheckCon>
                    <Checkbox style={{marginRight:30}} onChange={this.onAdminChange}>集团管理员</Checkbox>
                    <Checkbox onChange={this.onCashierChange}>集团财务</Checkbox>
                  </CheckCon>
                </FormItem>
              </RightTab>
            </GroupWrap>
            {
              this.state.disabled === false && 
              <GroupWrap>
                <InputLabel style={{marginRight:10}}>关联公司</InputLabel>
                <div style={{width:'100%',overflow:'hidden'}}>
                  <FormItem>
                    <CheckboxGroup onChange={this.onChange} style={{marginTop:10,overflow:'hidden'}}>
                      {
                        this.props.navList.son_company && this.props.navList.son_company.map((item,index)=>{
                          return (
                            <div key={index} style={{overflow:'hidden',marginBottom:5}}>
                              <CompanyName>{item.name}</CompanyName>
                              <div style={{overflow:'hidden',float:"right",marginRight:30}}>
                                <Checkbox value={item.id+",管理员"}>管理员</Checkbox>
                                <Checkbox value={item.id+",财务"}>财务</Checkbox>
                              </div>
                            </div>
                          )
                        })
                      }
                    </CheckboxGroup>
                  </FormItem>
                </div>
              </GroupWrap>
            }
            <FormItem>
              <Button style={{marginRight:30}} onClick={this.props.cancel}>取消</Button>
              <Button type="primary" onClick={this.handleSubmit}>确定</Button>
            </FormItem>
            </div>
          }
        </div>
      </Form>
    </Modal>
    )
  }
}
const ManagerModal = Form.create()(ManagerModalMack);
export default ManagerModal;
