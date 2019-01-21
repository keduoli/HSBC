import React from 'react'
import {Modal,Input,Button,Form} from 'antd'
import styled from 'styled-components'
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const InputLabel = styled.span`
  width:72px;
  float:left;
  line-height:32px;
  margin-left:25px;
`;
const GroupWrap = styled.div`
  overflow:hidden;
  padding:0 30px;
`;
const RightTab = styled.div`
  display:inline-block;
  float:right;
  margin-right:25px;
`;
const FormItem = Form.Item;
class SaleModalMack extends React.Component{
  state={
    zkl:'',
    zkje:'',
    zkse:'',
    rate:'',
    rate_cn:'',
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        values['checked'] = false;
        values['zkje'] = -values['zkje'];
        values['zkse'] = -values['zkse'];
        this.props.getSale(values)
        this.props.cancel()
        this.props.setJehj()
      }
    })
  }
  componentWillMount(){
    let rate = this.props.data.slv;
    if(rate === '1'){
      this.state.rate = 0.03;
      this.state.rate_cn = '3%';
    }else if(rate === '5'){
      this.state.rate = 0.04
      this.state.rate_cn = '4%';
    }else if(rate === '6'){
      this.state.rate = 0.05
      this.state.rate_cn = '5%';
    }else if(rate === '7'){
      this.state.rate = 0.06
      this.state.rate_cn = '6%';
    }else if(rate === '8'){
      this.state.rate = 0.10
      this.state.rate_cn = '10%';
    }else if(rate === '9'){
      this.state.rate = 0.11
      this.state.rate_cn = '11%';
    }else if(rate === '0'){
      this.state.rate = 0.16
      this.state.rate_cn = '16%';
    }else if(rate === '$'){
      this.state.rate = 0.17
      this.state.rate_cn = '17%';
    }else if(rate === '2'){
      this.state.rate = 0;
      this.state.rate_cn = '0%';
    }else if(rate === '3'){
      this.state.rate = 0;
      this.state.rate_cn = '免税';
    }else if(rate === '4'){
      this.state.rate = 0;
      this.state.rate_cn = '不征税';
    }
    this.setState({})
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { data } = this.props;
    return(
      <Modal title={<TitleSpan>折扣行</TitleSpan>}
          style = {{textAlign:'center',top:100}}
          visible
          width={450}
          onCancel={()=>this.props.cancel()}
          maskClosable={false}
          footer={null}>
        <Form>
          <GroupWrap>
            <InputLabel>折扣行名称</InputLabel>
            <RightTab>
              <FormItem>
                {getFieldDecorator('zkhmc',{
                  initialValue:data.hwmc
                })(
                  <Input disabled style={{width:200}}/>
                )}
              </FormItem>
            </RightTab>
          </GroupWrap>
          <GroupWrap>
            <InputLabel>原商品金额</InputLabel>
            <RightTab>
              <FormItem>
                {getFieldDecorator('yspje',{
                  initialValue:data.je
                })(
                  <Input disabled style={{width:200}}/>
                )}
              </FormItem>
            </RightTab>
          </GroupWrap>
          <GroupWrap>
            <InputLabel>原商品税率</InputLabel>
            <RightTab>
              <FormItem>
                {getFieldDecorator('yspsl',{
                  initialValue:this.state.rate_cn
                })(
                  <Input disabled style={{width:200}}/>
                )}
              </FormItem>
            </RightTab>
          </GroupWrap>
          <GroupWrap>
            <InputLabel>折扣率</InputLabel>
            <RightTab style={{marginRight:7}}>
              <FormItem>
                {getFieldDecorator('zkl',{
                  initialValue:'',
                  rules:[{
                      validator: (rule, value, callback)=>{
                        const reg = /^(\d*)\.?\d{1,3}$/;
                        if(!value){
                          callback('折扣率不能为空');
                        }
                        if(!reg.test(value)){
                          callback('折扣率只能为数字(保留三位小数）');
                        }else{
                          if(value>=100){
                            callback('折扣率只能小于100');
                          }
                        }
                        callback();
                      }
                  }]
                })(
                  <Input style={{width:200}} onChange={(e)=>{
                    if((/^(\d*)\.?\d{1,3}$/).test(e.target.value) === true){
                      this.props.form.setFieldsValue({
                        zkl:Number(e.target.value).toFixed(3),
                        zkje:Number(data.je*(e.target.value/100)).toFixed(2),
                        zkse:Number(Number(data.je*(e.target.value/100)).toFixed(2)*this.state.rate).toFixed(2)
                      })
                    }
                  }}/>
                )}
                <span>&nbsp;&nbsp;%</span>
              </FormItem>
            </RightTab>
          </GroupWrap>
          <GroupWrap>
            <InputLabel>折扣金额</InputLabel>
            <RightTab>
              <FormItem>
                {getFieldDecorator('zkje',{
                  initialValue:'',
                  rules:[{
                    validator: (rule, value, callback)=>{
                      const reg = /^(\d*)\.?\d{1,3}$/;
                      if(!value){
                        callback('折扣金额不能为空');
                      }
                      if(!reg.test(value)){
                        callback('折扣金额只能为数字(保留三位小数）');
                      }
                      callback();
                    }
                  }]
                })(
                  <Input style={{width:200}} onChange={(e)=>{
                    if((/^(\d*)\.?\d{1,3}$/).test(e.target.value) === true){
                      this.props.form.setFieldsValue({
                        zkje:e.target.value,
                        zkl:Number((e.target.value/data.je)*100).toFixed(3),
                        zkse:Number(e.target.value*this.state.rate).toFixed(2)
                      })
                    }
                  }}/>
                )}
              </FormItem>
            </RightTab>
          </GroupWrap>
          <GroupWrap>
            <InputLabel>折扣税额</InputLabel>
            <RightTab>
              <FormItem>
                {getFieldDecorator('zkse',{
                  initialValue:''
                })(
                  <Input disabled style={{width:200}}/>
                )}
              </FormItem>
            </RightTab>
          </GroupWrap>
          <GroupWrap style={{margin:'20px 0 20px 0'}}>
            <Button style={{marginRight:30}} onClick={this.props.cancel}>取消</Button>
            <Button type='primary' onClick={this.handleSubmit}>确定</Button>
          </GroupWrap>
        </Form>
      </Modal>
    )
  }
}

const SaleModal = Form.create()(SaleModalMack);
export default SaleModal;
