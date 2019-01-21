import React from 'react';
import { Input,Form,Button,Radio,Icon,Checkbox } from 'antd';
import styled from 'styled-components';
import { CompanyConnect } from 'containers';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const InputLabel = styled.span`
  width:100px;
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
`;
const RightTab = styled.div`
  display:inline-block;
  margin-left:57px;
`;
const ScanSetCon = styled.div`
  float:left;
  width:35%;
  overflow:hidden;
  height:73vh;
  background:#fff;
`;
const CompanySetCon = styled.div`
  float:left;
  width:100%;
  margin-right:3%;
  overflow:hidden;
  height:73vh;
  background:#fff;
  border-left:3px solid #2397CA;
  position:relative;
  z-index:2;
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
const ButtomBtn = styled.div`
  position:fixed;
  right:50px;
  bottom:50px;
  z-index:500;
`;
class CompanyFormMake extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      role:"",
      telePhone:[],
      teleValue:'',
      teleWarning:'',
    }
    this.arr = [];
  };
  componentWillMount(){
    this.props.getCompanyList((res)=>{
      if(res.telephone){
        this.setState({telePhone:res.telephone.split(";")},()=>{
          this.arr = this.state.telePhone
        })
      }
    });
  };
  componentWillReceiveProps(next){
    this.setState({role:next.navList.role})
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {navList} = this.props;
    this.props.form.validateFields((err, values) => {
      if(!err){
        values['telephone'] = this.state.telePhone.join(";");
        if(values['tax_type']){
          values['tax_type'] = values['tax_type'].join(',');
        }
        this.props.companyEdit(values,()=>{
          navList.company=values.name;
          this.props.getCompanyList(()=>{
            this.setState({teleValue:'',teleWarning:'',})
          });
          this.setState({navList:navList})
        });
      }
    });
  };
  teleChange = (e) => {
    if(e.keyCode === 13){
      this.arr = this.state.telePhone;
      let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
      if(e.target.value === ''){
        this.setState({teleWarning:'手机号码不能为空'});return;
      }
      // let str = e.target.value;
      // for(let i in str){
      //   if(str[i] === ' '){
      //     this.setState({teleWarning:'手机号码不能为空'});return;
      //   }
      // }
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
  render(){
    const { getFieldDecorator,isFieldsTouched } = this.props.form;
    const {companyList} = this.props;
    return(
      <Form>
        <CompanySetCon>
          <Label>企业信息设置</Label>
          <ComContent>
            <GroupWrap>
              <InputLabel>企&nbsp; 业&nbsp; 名&nbsp; 称：</InputLabel>
              <RightTab>
                <Input style={{display:'none'}} placeholder="请输入企业名称" name="gsmc" autoComplete="off"/>
                <FormItem hasFeedback>
                  {getFieldDecorator('name', {
                    initialValue:companyList.name,
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
                    <Input disabled={this.state.role===1} style={{width:400,height:40,color:'#2397CA'}} placeholder="请输入企业名称" name="gsmc" autoComplete="off"/>
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel>纳税人识别号：</InputLabel>
              <RightTab>
                <FormItem hasFeedback>
                  {getFieldDecorator('tax_number', {
                    initialValue:companyList.tax_number,
                    rules: [{
                      pattern: /^[A-Za-z0-9]{1,20}$/, message: '纳税人识别号只能是数字或字母，长度为20及以下'
                    }],
                  })(
                    <Input disabled={this.state.role===1} style={{width:400,height:40,color:'#2397CA'}} placeholder="请输入长度小于18位的纳税人识别号"/>
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel>地&emsp;&emsp;&emsp;&emsp;址：</InputLabel>
              <RightTab>
                <FormItem hasFeedback>
                  {getFieldDecorator('address', {
                    initialValue:companyList.address,
                    rules: [{
                      validator: (rule, value, callback)=>{
                        if(value && value.length>40){
                          callback('地址不能超过40位');
                        }
                        callback();
                      },
                    }],
                  })(
                    <Input disabled={this.state.role===1} style={{width:400,height:40,color:'#2397CA'}} placeholder="请输入地址"/>
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel>电&emsp;&emsp;&emsp;&emsp;话：</InputLabel>
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
              <InputLabel>开&emsp;户&emsp;行：</InputLabel>
              <RightTab>
                <FormItem hasFeedback>
                  {getFieldDecorator('account_bank', {
                    initialValue:companyList.account_bank,
                    rules: [{
                      validator: (rule, value, callback)=>{
                        if(value && value.length>40){
                          callback('开户行不能超过40位');
                        }
                        callback();
                      },
                    }],
                  })(
                    <Input disabled={this.state.role===1} style={{width:400,height:40,color:'#2397CA'}} placeholder="请输入开户行"/>
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel>账&emsp;&emsp;&emsp;号：</InputLabel>
              <RightTab>
                <FormItem hasFeedback>
                  {getFieldDecorator('account_number', {
                    initialValue:companyList.account_number,
                    rules: [{
                      pattern: /^[0-9]{1,32}$/, message: '账号只能是数字且长度小于32位'
                    }],
                  })(
                    <Input disabled={this.state.role===1} style={{width:400,height:40,color:'#2397CA'}} placeholder="请输入账号"/>
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
          </ComContent>
        </CompanySetCon>
        {/*<Label>企业文化设置</Label>
        <ComContent style={{marginBottom:20}}>
          <div>
            <LogoLabel>企业LOGO：</LogoLabel>
            <span>莫某某LOGO</span>
          </div>
          <div>
            <LogoLabel/>
            <span>要求：图片尺寸200px*200px,小于500K</span> 
          </div>
        </ComContent>*/}
        {
          this.state.role!=1&&
          <ButtomBtn>
            <Button type="primary" onClick={this.handleSubmit} style={{marginTop:38,marginRight:20,float:'right'}}>保存设置</Button>
          </ButtomBtn>
        }
      </Form>
    )
  }
}
const CompanyForm = Form.create()(CompanyFormMake);
export default CompanyForm;
