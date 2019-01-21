import React from 'react'
import {Input,Form,Button,Modal,message } from 'antd'
import styled from 'styled-components'
const InputLabel = styled.span`
  width:60px;
  float:left;
  line-height:32px;
`;
const GroupWrap = styled.div`
  overflow:hidden;
  padding:0 30px;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const GroupBom = styled.div`
	margin-top:60px;
`;
const FormItem = Form.Item;
class AddCallModalMack extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      loadFont:"获取验证码",
      num:30,
    }
    this.fate=null;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        if(this.props.getBunding){
          if(values['phone']){
            const param={
              telephone:values['phone'],
              code:values['code']
            }
            this.props.getBunding(param,()=>{
              clearInterval(this.fate)
              if(this.props.succModal){
                this.props.succModal();
                if(this.props.deductionSet){
                  this.props.deductionSet()
                }
              }
            },(res)=>{
              message.error(res.msg)
            })
          }else{
            const param={
              is_dedu:true,
              code:values['code']
            }
            this.props.getBunding(param,()=>{
              clearInterval(this.fate)
              if(this.props.deductionSet){
                this.props.deductionSet()
              }
            },(res)=>{
              message.error(res.msg)
            })
          }
        }
      }
    });
  };
  componentWillUnmount(){ 
    this.setState = (state,callback)=>{
      return;
    }
  }
  showLoading = (e) => {
    e.preventDefault();
    if(this.props.deduction === true){
      if(this.props.getPhoneSend){
        const param = {
          is_dedu:true,
        }
        this.props.getPhoneSend(param)
      }
      this.setState({loading:true,loadFont:this.state.num+"秒后可重新获取"})
        this.fate = setInterval(()=>{
          this.setState({num:this.state.num-1},()=>{
            this.setState({loadFont:this.state.num+"秒后可重新获取"})
            if(this.state.num===0){
              clearInterval(this.fate)
              this.setState({loading:false,loadFont:"获取验证码",num:30})
            }
        })},1000)
    }else{
      this.props.form.validateFields(['phone'],(err, values) => {
        if(!err){
          if(this.props.getPhoneSend){
            const param = {
              telephone:values['phone']
            }
            this.props.getPhoneSend(param)
          }
          this.setState({loading:true,loadFont:this.state.num+"秒后可重新获取"})
          this.fate = setInterval(()=>{
            this.setState({num:this.state.num-1},()=>{
              this.setState({loadFont:this.state.num+"秒后可重新获取"})
              if(this.state.num===0){
                this.setState({loading:false,loadFont:"获取验证码",num:30})
                clearInterval(this.fate)
              }
          })},1000)
        }
      });
    }
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
    <Modal title={<TitleSpan>{this.props.title}</TitleSpan>}
           style = {{top:100}}
           closable={false}
           visible
           width={400}
           maskClosable={false}
           footer={null}
    > 
      {
        this.props.deduction===true?
        <div>
          <div style={{marginLeft:33,marginTop:33,color: '#2397CA',fontSize:12}}>为保证认证操作的安全性，请验证当前操作为本人操作</div>
          <div style={{margin:"8px 0 20px 33px",color: '#2397CA',fontWeight:600,fontSize:13}}>验证手机号：{this.props.deductionList.telephone}</div>
        </div>
        :
        <div style={{marginLeft:33,marginTop:33,color: '#2397CA',fontWeight:600}}>使用进项管理功能需要先绑定手机号</div>
      }
      <Form>
        {
          this.props.deduction===true?
          ""
          :
          <GroupWrap>
            <div style={{marginTop:20}}>手机号</div>
            <div style={{marginTop:13}}>
              <FormItem>
                {getFieldDecorator('phone',{
                  rules: [{
                    required:true, message:'手机号码不能为空'
                  },{
                    pattern:/^[1][3,4,5,7,8][0-9]{9}$/, message: '手机号码不合法'
                  }],
                })(
                  <Input placeholder="请输入手机号码"/>
                )}
              </FormItem>
            </div>
          </GroupWrap>
        }
				<GroupWrap>
          <div style={{marginTop:13}}>验证码</div>
          <div style={{marginTop:13}}>
            <FormItem>
              {getFieldDecorator('code',{
								rules: [{
									required:true, message:'验证码不能为空'
								}],
							})(
                <Input style={{width:110}} placeholder="请输入验证码"/>
							)}
							<Button type="primary" style={{marginLeft:30}} loading={this.state.loading} onClick={this.showLoading}>{this.state.loadFont}</Button>
            </FormItem>
          </div>
				</GroupWrap>
				<GroupBom>
					<FormItem style={{textAlign:'center'}}>
						<Button style={{marginRight:30}} onClick={this.props.cancelModal}>取消</Button>
						<Button type="primary" onClick={this.handleSubmit}>{this.props.deduction===true?"确定":"绑定"}</Button>
					</FormItem>
				</GroupBom>
      </Form>
    </Modal>
    )
  }
}
const AddCallModal = Form.create()(AddCallModalMack);
export default AddCallModal;
