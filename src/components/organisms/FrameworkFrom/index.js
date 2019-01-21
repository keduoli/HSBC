import React from 'react';
import { Input,Form,Button,Radio,Icon,Modal,Checkbox } from 'antd';
import styled from 'styled-components';
import { CompanyConnect } from 'containers';

const RadioGroup = Radio.Group;
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
const InputLabel = styled.span`
  width:100px;
  line-height:32px;
  float:left;
  font-size:13px;
  color:#333;
  font-weight:600;
`;
const Label = styled.p`
  height:40px;
  line-height:40px;
  padding-left:41px;
  font-size:14px;
  font-weight:700;
  margin-top:18px;
  margin-bottom:45px;
`;
const ComContent = styled.div`
  background:#fff;
  padding:20px;
`;
const LogoLabel = styled.span`
  width:85px;
  display:inline-block;
`;
const GroupWrap = styled.div`
  overflow:hidden;
  margin-left:21px;
`;
const RightTab = styled.div`
  display:inline-block;
  margin-left:57px;
`;
const ScanSetCon = styled.div`
  float:left;
  width:35%;
  overflow:hidden;
  height:68vh;
  background:#fff;
`;
const BottomCon = styled.div`
  display:flex;
  overflow:hidden;
  justify-content: center;
  margin:0 auto;
`;
const CloseIcon = styled(Icon)`
 float:right;
 font-size:20px;
 cursor:pointer;
 margin-right:15px;
`;
const FrameInput = styled(Input)`
  width:400px;
  height:40px;
  color:#2397CA;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:100px;
  color:#fff;
  display:inline-block;
  line-height:100px;
`;
const PhoneCon = styled.div`
  overflow:hidden;
  width:400px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
`;
const PhoneInput = styled(Input)`
  height:38px;
  border:none;
  width:200px;
  float:left;
`;
const TeleSpan = styled.span`
  padding:0 5px;
  margin:5px 5px 5px 5px;
  font-size:12px;
  line-height:30px;
  background:#d9d9d9;
  display:block;
  max-width:300px;
  float:left;
  border-radius:5px;
`;
const WaringSpan = styled.span`
  color:#f04134;
  font-size:12px;
  height:24px;
  display:block;
  line-height:24px;
`;
class FrameworkFormMake extends React.Component{
  constructor(props){
    super(props);
    this.state={
      showDeteleModal:'',
      telePhone:[],
      teleValue:'',
      teleWarning:'',
    }
    this.arr = [];
  };
  componentWillMount(){
    this.setState({telePhone:this.props.addFrame===false?this.props.record.telephone?this.props.record.telephone.split(";"):[]:[]},()=>{
      this.arr = this.props.addFrame===false?this.state.telePhone:[];
    })
  };
  componentWillReceiveProps(next){
    if(this.props.record.telephone !== next.record.telephone){
      this.setState({telePhone:next.addFrame===false?next.record.telephone?next.record.telephone.split(";"):[]:[]},()=>{
        this.arr = next.addFrame===false?this.state.telePhone:[];
      })
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values['telephone'] = this.state.telePhone.join(";");
      if(!err){
        this.props.addCompany(values,()=>{
          this.props.refreshList()
          this.props.getNavList()
        })
      }
    });
  };
  editCompany = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        values["department_id"] = this.props.record.id;
        values['telephone'] = this.state.telePhone.join(";");
        if(!err){
          this.props.editCompany(values,()=>{
            this.props.refreshList()
            this.props.getNavList()
          })
        }
    });
  }
  teleChange = (e) => {
    if(e.keyCode === 13){
      this.arr = this.state.telePhone;
      let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
      if(e.target.value === ''){
        this.setState({teleWarning:'手机号码不能为空'});return;
      }
      let str = e.target.value;
      for(let i in str){
        if(str[i] === ' '){
          this.setState({teleWarning:'手机号码不能为空'});return;
        }
      }
      if(e.target.value.length >= 20){
        this.setState({teleWarning:'手机号码不能超过21位'});return;
      }
      if(e.target.value.indexOf(';') >= 0){
        this.setState({teleWarning:'手机号码中含有非法字符'});return;
      }
      if(reg.test(e.target.value)){
        this.setState({teleWarning:'手机号码不能包含汉字'});return;
      }
      this.arr.push(e.target.value)
      this.setState({
        telePhone:this.arr,
        teleValue:'',
        teleWarning:'',
      })
    }
  }
  delCompany = () => {
    this.setState({
      showDeteleModal:<Modal  title={<TitleSpan>删除提示</TitleSpan>}
                            style = {{textAlign:'center',top:100}}
                            visible
                            width={400}
                            onCancel={()=>this.setState({showDeteleModal:''})}
                            maskClosable={false}
                            footer={null}>
                        <div style={{marginBottom:30}}>确定删除当前子公司？</div>
                        <Button style={{marginRight:30}} onClick={()=>this.setState({showDeteleModal:''})}>取消</Button>
                        <Button type="primary" onClick={()=>{
                          this.props.delCompany({department_id:this.props.record.id},()=>{
                            this.props.refreshList()
                            this.props.getNavList()
                          })
                        }}>确定</Button>
                    </Modal>
    })
  }
  render(){
    const { getFieldDecorator,isFieldsTouched } = this.props.form;
    const { record } = this.props;
    return(
      <Form onSubmit={this.handleSubmit} style={{height:'100%',position:'relative'}}>
          <ManagerTitle>
            企业信息设置
            <CloseIcon type="close" onClick={()=>this.props.cancel()}/>
          </ManagerTitle>
          <ComContent>
            <GroupWrap>
              <InputLabel>企业名称：</InputLabel>
              <RightTab>
                <Input style={{display:'none'}} placeholder="请输入企业名称" name="gsmc" autoComplete="off"/>
                <FormItem hasFeedback>
                  {getFieldDecorator('company_name', {
                    initialValue:this.props.addFrame===false?record.name:"",
                    rules: [{
                      validator: (rule, value, callback)=>{
                        if(!value){
                          callback('企业名称不能为空');
                        }else if(value.length>40){
                          callback('企业名称不能超过40位');
                        }
                        callback();
                      },
                    }],
                  })(
                    <FrameInput placeholder="请输入企业名称" name="gsmc" autoComplete="off"/>
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel>纳税人识别号：</InputLabel>
              <RightTab>
                <FormItem hasFeedback>
                  {getFieldDecorator('tax_number', {
                    initialValue:this.props.addFrame===false?record.tax_number:"",
                    rules: [{
                      pattern: /^[A-Za-z0-9]{1,20}$/, message: '纳税人识别号只能是数字或字母，长度为20及以下'
                    }],
                  })(
                    <Input disabled={this.props.rootCompany===true} style={{width:400,height:40,color:'#2397CA'}} placeholder=  "请输入长度小于18位的纳税人识别号"/>
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel>地址：</InputLabel>
              <RightTab>
                <FormItem hasFeedback>
                  {getFieldDecorator('address', {
                    initialValue:this.props.addFrame===false?record.address:"",
                    rules: [{
                      validator: (rule, value, callback)=>{
                        if(value && value.length>40){
                          callback('地址不能超过40位');
                        }
                        callback();
                      },
                    }],
                  })(
                    <FrameInput disabled={this.props.rootCompany===true} placeholder="请输入地址"/>
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel>电话：</InputLabel>
              <RightTab>
                <PhoneCon onClick={()=>{
                  if(document.getElementById("PhoneInput")){
                    document.getElementById("PhoneInput").focus()
                  }
                }}>
                  <div style={{float:'left'}}>
                    {
                      this.state.telePhone.map((item,index)=>{
                        return <TeleSpan key={index}>{item}<Icon title='删除' type="close" style={{marginLeft:3,cursor:'pointer',fontSize:14,fontWeight:600}} onClick={()=>{
                          this.arr.splice(index,1);
                          this.setState({telePhone:this.arr})
                        }}/></TeleSpan>
                      })
                    }
                  </div>
                  <div>
                    {
                      this.state.telePhone.length<3 && 
                      <PhoneInput ref={ref=>this.PhoneInput = ref} id='PhoneInput' onChange={(e)=>{
                        let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
                        if(e.target.value === ' '){
                          this.setState({teleWarning:'手机号码不能为空',teleValue:e.target.value});return;
                        }
                        if(reg.test(e.target.value)){
                          this.setState({teleWarning:'手机号码不能包含汉字',teleValue:e.target.value});return;
                        }
                        if(e.target.value.length >= 20){
                          this.setState({teleWarning:'手机号码不能超过21位',teleValue:e.target.value});return;
                        }
                        this.setState({teleWarning:'',teleValue:e.target.value})
                      }} value={this.state.teleValue} placeholder="电话按回车键保存分割" onKeyDown={this.teleChange}/>
                    }
                  </div>
                </PhoneCon>
                <WaringSpan>{this.state.teleWarning}</WaringSpan>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel>开户行：</InputLabel>
              <RightTab>
                <FormItem hasFeedback>
                  {getFieldDecorator('bank_name', {
                    initialValue:this.props.addFrame===false?record.account_bank:"",
                    rules: [{
                      validator: (rule, value, callback)=>{
                        if(value && value.length>40){
                          callback('开户行不能超过40位');
                        }
                        callback();
                      },
                    }],
                  })(
                    <FrameInput disabled={this.props.rootCompany===true} placeholder="请输入开户行"/>
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel>账号：</InputLabel>
              <RightTab>
                <FormItem hasFeedback>
                  {getFieldDecorator('bank_number', {
                    initialValue:this.props.addFrame===false?record.account_number:"",
                    rules: [{
                      pattern: /^[0-9]{1,32}$/, message: '账号只能是数字且长度小于32位'
                    }],
                  })(
                    <FrameInput disabled={this.props.rootCompany===true} placeholder=  "请输入账号"/>
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
          </ComContent>
          {
            this.props.addFrame === true?
            <BottomCon>
              <Button style={{marginRight:30}} onClick={this.props.cancel}>取消</Button>
              <Button type="primary" onClick={this.handleSubmit}>保存</Button>
            </BottomCon>
            :
            <BottomCon>
              <Button style={{marginRight:30}} onClick={this.delCompany}>删除</Button>
              <Button type="primary" onClick={this.editCompany}>保存</Button>
            </BottomCon>
          }
          {this.state.showDeteleModal}
      </Form>
    )
  }
}
const FrameworkForm = Form.create()(FrameworkFormMake);
export default FrameworkForm;
