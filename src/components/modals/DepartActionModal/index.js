import React from 'react'
import {Input,Form,Button,Modal,Radio,Select } from 'antd'
import styled from 'styled-components'

const RadioGroup = Radio.Group;
const {Option} = Select;
const InputLabel = styled.span`
  width:60px;
  float:left;
  line-height:32px;
`;
const GroupWrap = styled.div`
  overflow:hidden;
  padding:0 30px;
`;
const RightTab = styled.div`
  display:inline-block;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const FormItem = Form.Item;
class DepartActionModalMack extends React.Component{
  state={
    isApp:this.props.edit?`${this.props.record.is_login}`:'1',
    arr:[],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        if(this.props.edit){
          values.target_id = this.props.record.id;
          this.props.editFnc(values,()=>{
            this.props.updateTable();
            this.props.getDepartSelect(()=>{
              this.props.refresh()
            })
          });
        }else{
          this.props.addFnc(values,()=>{
            this.props.updateTable();
            this.props.getDepartSelect(()=>{
              this.props.refresh()
            })
          });
        }
      }
    });
  };
  componentDidMount(){
    const arr = this.props.departSelect;
    const companyList = []
    for(let i in arr){
      if(arr[i].id === this.props.navList.root_company[0].id){

      }else{
        companyList.push(arr[i])
      }
    }
    this.setState({arr:companyList,edit:this.props.edit})
  }
  passwordChange = (e) => {
    if(e.keyCode === 8){
      this.setState({edit:false})
    }
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const {title,cancelModal} = this.props;
    return(
    <Modal title={<TitleSpan>{title}</TitleSpan>}
           style = {{textAlign:'center',top:100}}
           closable={false}
           visible
           width={400}
           maskClosable={false}
           footer={null}
    >
      <Form>
        <GroupWrap>
          <span style={{marginRight:10}}>是否允许员工登录APP</span>
          <RightTab>
            <FormItem>
              {getFieldDecorator('is_login', {
                initialValue: this.props.edit?`${this.props.record.is_login}`:'1'
              })(
                <RadioGroup onChange={(e)=>{this.setState({isApp:e.target.value})}}>
                  <Radio value="1">是</Radio>
                  <Radio value="0">否</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </RightTab>
        </GroupWrap>
        <GroupWrap>
          <InputLabel>员工姓名</InputLabel>
          <RightTab>
            <FormItem hasFeedback>
              {getFieldDecorator('realname', {
                initialValue: this.props.edit?this.props.record.realname:'',
                rules: [{
                  required: true, message: '员工姓名不能为空',
                }],
              })(
                <Input style={{width:230}} placeholder="请输入员工姓名" autoComplete="off"/>
              )}
            </FormItem>
          </RightTab>
        </GroupWrap>
        {
          this.state.isApp === "1" &&
          <div>
            <GroupWrap>
              <InputLabel>员工账号</InputLabel>
              <RightTab>
                <FormItem hasFeedback>
                  {getFieldDecorator('username', { 
                    initialValue: this.props.edit?this.props.record.is_login === 0?'':this.props.record.email:'',
                    rules: [(window.location.href.indexOf('xcar.feeclouds.com')===-1&&window.location.href.indexOf('https://hfnf.feeclouds.com')===-1)?{
                      type: 'email', message: '员工账号必须为邮箱',
                    }:'',{
                      required: true, message: '员工账号不能为空',
                    },(window.location.href.indexOf('xcar.feeclouds.com')>-1||window.location.href.indexOf('https://hfnf.feeclouds.com')>-1)?{
                      pattern: /^[a-zA-Z0-9\.\-_@]{1,32}$/, message: '员工账号只能是数字或字母，长度为32及以下'
                    }:''],
                  })(
                    <Input style={{width:230}} placeholder="请输入员工账号" autoComplete="off"/>
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel>登录密码</InputLabel>
              <RightTab>
                <FormItem hasFeedback>
                  {getFieldDecorator('password', {
                    initialValue: this.state.edit?'******':'',
                    rules: [{
                      required: true, message: '登录密码不能为空',
                    }],
                  })(
                    <Input style={{width:230}}
                            name="psw"
                            onKeyDown={this.passwordChange}
                            placeholder="请输入登录密码"
                            type="text"
                            autoComplete="off"
                    />
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>
          </div>
        }
        <GroupWrap>
          <InputLabel>所属部门</InputLabel>
          <RightTab>
            <FormItem>
              {getFieldDecorator('department_id', {
                initialValue: this.props.edit?this.props.record.department_id.toString():this.props.departId?`${this.props.departId}`:`${this.props.departSelect[0].id}`,
              })(
                <Select
                  placeholder="请选择"
                  style={{width:230}}
                  showSearch={true}
                  optionFilterProp='children'
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {
                    this.state.arr.map((item)=>{
                      return <Option key={item.id}>{item.name}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </RightTab>
        </GroupWrap>
        {
          this.state.isApp === '1'&&
          <GroupWrap>
            <InputLabel>员工角色</InputLabel>
            <RightTab>
              <FormItem>
                {getFieldDecorator('role', {
                  initialValue: this.props.edit?`${this.props.record.role}`:'2',
                })(
                  <Select
                    placeholder="请选择"
                    style={{width:230}}
                  >
                    <Option value="2">管理员</Option>
                    <Option value="4">财务</Option>
                    <Option value="1">员工</Option>
                  </Select>
                )}
              </FormItem>
            </RightTab>
          </GroupWrap>
        }
        {this.state.isApp === "0" && <div style={{height:168}}/>}
        <FormItem>
          <Button style={{marginRight:30}} onClick={cancelModal}>取消</Button>
          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
        </FormItem>
      </Form>
    </Modal>
    )
  }
}
const DepartActionModal = Form.create()(DepartActionModalMack);
export default DepartActionModal;
