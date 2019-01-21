import React from 'react'
import {Input,Form,Button,Modal,Radio,Select,DatePicker } from 'antd'
import styled from 'styled-components'
import { CodingModal } from 'components'
import moment from 'moment';
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const {Option} = Select;
const Search = Input.Search;
const dateFormat = 'YYYY-MM-DD';
const InputLabel = styled.span`
  width:90px;
  float:left;
  line-height:32px;
  text-align:right;
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
const FormLeftCon = styled.div`
  float:left;
  overflow:hidden;
  width:50%;
`;
const FromSetCon = styled.div`
  overflow:hidden;
`;
const FormRightCon = styled.div`
  float:right;
  overflow:hidden;
  width:50%;
`;
const RedSpan = styled.span`
  color:red;
`;
const BottomCon = styled.div`
  overflow:hidden;
  margin:0 auto;
`;
const FilButton = styled(Button)`
  width:105px;
  height:30px;
`;
const FormItem = Form.Item;
class RegisterModalMack extends React.Component{
  state={
    begin:'',
    end:'',
    type:'',
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        values['buy_time'] = values['buy_time'].format('YYYY-MM-DD');
        if(this.props.edit){
          values['repertoryid'] = this.props.record.id;
          this.props.editRepertroy(values,()=>{
            this.props.refreshData();
            this.props.cancel()
          })
        }else{
          this.props.addRepertroy(values,()=>{
            this.props.refreshData();
            this.props.cancel()
          })
        }
      }
    })
  }
  adm = (val) => {
    if (!val) { 
      return  false 
    } 
    let fpdm = false; 
    let title = ""; 
    let placeholder = ""; 
    let text = {}; 
    let num = parseInt(val, 10); 
    let numLen = val.length; 
    //校验时间 
    let yearNum = parseInt(new Date().getFullYear().toString().substr(2, 2), 10); 
    if (isNaN(num)) { 
      return  false 
    } 
    if (numLen !== 10 && numLen !== 12) { 
      return  false 
    } 
    //10位的情况判断第八位 
    let fpdmVal = parseInt(val.charAt(7), 10); 
    let fpdmVala = parseInt(val.charAt(0), 10); 
    let fpdmValb = val.substr(10, 2); 
    let fpdmYear1 = parseInt(val.substr(4, 2), 10); 
    let fpdmYear2 = parseInt(val.substr(5, 2), 10); 
    let testYear1 = fpdmYear1 <= yearNum; 
    let testYear2 = fpdmYear2 <= yearNum; 
    if (numLen == 10) { 
      if (testYear1 && fpdmVala < 7) { 
        if (fpdmVal === 3 || fpdmVal === 6) { 
        console.log("普通发票"); 
        return  true 
        } else if (fpdmVal === 1 || fpdmVal === 2 || fpdmVal === 5 || fpdmVal === 7) { 
          return  true 
        } else { 
        return  false 
        } 
      } else { 
        return  false 
      } 
    } 
    //12位判断 
    if (numLen == 12) { 
      if (testYear2 && fpdmVala < 7) { 
        if (fpdmVala === 0) { 
          if (fpdmValb === "11") { 
            return  true 
          } else if (fpdmValb === "06" || fpdmValb === "12" || fpdmValb === "04" || fpdmValb === "05") { 
            console.log("普票") 
            return  true 
          } else if (fpdmValb === "07") { 
            return  true 
          }else if (fpdmValb === "17") { 
            return  true 
          } else { 
            return  false 
          } 
        } 
      if (fpdmVala !== 0 && fpdmVal === 2) { 
        return  true 
      }; 
      } else { 
        return  false 
      } 
        } else { 
        return false
      } 
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { cancel,record } = this.props;
    return(
    <Modal title={<TitleSpan>{this.props.title}</TitleSpan>}
           style = {{textAlign:'center',top:100}}
           visible
           onCancel={this.props.cancel}
           width={700}
           maskClosable={false}
           footer={null}
    >
      <Form>
        <FromSetCon>
          <FormLeftCon>
            <GroupWrap>
              <InputLabel><RedSpan> * </RedSpan>发票种类</InputLabel>
              <RightTab>
                <FormItem>
                {getFieldDecorator('category',{
                  initialValue:this.props.record&&this.props.record.category,
                  rules:[{
                    required: true, message: '发票种类不能为空',
                  }]
                })(
                  <Select
                    placeholder="请选择发票种类"
                    allowClear={true}
                    style={{width:175}}
                    size='large'
                    onChange={(val)=>{
                      this.setState({type:val})
                      this.props.form.resetFields(['amount'])
                      // const limit = this.props.settingList[0].limits.split(",");
                      // if(val === '04' || val === '10'){
                      //    if(limit[0].split("")[1] === '1'){
                      //     this.props.form.setFieldsValue({amount:9999.99})
                      //    }else if(limit[0].split("")[1] === '2'){
                      //     this.props.form.setFieldsValue({amount:99999.99})
                      //    }else if(limit[0].split("")[1] === '3'){
                      //     this.props.form.setFieldsValue({amount:999999.99})
                      //    }else if(limit[0].split("")[1] === '4'){
                      //     this.props.form.setFieldsValue({amount:9999999.99})
                      //    }
                      // }else{
                      //   if(limit[1].split("")[1] === '1'){
                      //     this.props.form.setFieldsValue({amount:99999.99})
                      //     }else if(limit[1].split("")[1] === '2'){
                      //     this.props.form.setFieldsValue({amount:999999.99})
                      //     }
                      // }
                    }}
                  >
                    <Option key='04'>普通发票</Option>
                    <Option key='01'>专用发票</Option>
                    <Option key='10'>电子发票</Option>
                  </Select>
                )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel><RedSpan> * </RedSpan>开票限额</InputLabel>
              <RightTab>
                <FormItem>
                {getFieldDecorator('amount',{
                  initialValue:this.props.record&&this.props.record.amount,
                  rules:[{
                    required: true, message: '开票限额不能为空',
                  }]
                })(
                  <Select disabled={this.state.type==''} style={{width:175}} placeholder="请输入该种类发票开票限额">
                    {this.state.type!=='01' &&<Option key='9999.99'>万元版</Option>}
                     <Option key='99999.99'>十万元版</Option>
                     <Option key='999999.99'>百万元版</Option>
                  </Select>
                )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel><RedSpan> * </RedSpan>发票代码</InputLabel>
              <RightTab>
                <FormItem>
                {getFieldDecorator('code',{
                  initialValue:this.props.record&&this.props.record.code,
                  rules:[{
                    validator: (rule, value, callback)=>{
                      const reg = /^[0-9]*$/;
                      if(!value){
                        callback('发票代码不能为空');
                      }
                      if(!reg.test(value)){
                        callback('发票代码错误');
                      }else{
                        if(!this.adm(value)){
                          callback('发票代码错误');
                        }
                      }
                      callback();
                    }
                  }]
                })(
                  <Input style={{width:175}} placeholder="请输入发票代码"/>
                )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel><RedSpan> * </RedSpan>发票起始号码</InputLabel>
              <RightTab>
                <FormItem>
                {getFieldDecorator('begin',{
                  initialValue:this.props.record&&this.props.record.num_begin,
                  rules:[{
                    validator: (rule, value, callback)=>{
                      const reg = /^[0-9]{8}$/;
                      if(!value){
                        callback('发票起始号码不能为空');
                      }
                      if(!reg.test(value)){
                        callback('发票起始号码错误');
                      }else{
                        if(this.state.end!=='' && this.state.end<=value){
                          callback('发票起始号码必须小于终止号码');
                        }
                      }
                      callback();
                    }
                  }]
                })(
                  <Input onChange={(e)=>{
                    if((/^[0-9]{8}$/).test(e.target.value)){
                      this.setState({begin:e.target.value},()=>{
                        if((/^[0-9]{8}$/).test(this.state.end) && this.state.begin<this.state.end){
                          this.props.form.setFieldsValue({quantity:this.state.end - this.state.begin+1})
                        }
                      })
                    }
                  }} style={{width:175}} placeholder="请输入发票起始号码"/>
                )}
                </FormItem>
              </RightTab>
            </GroupWrap>
          </FormLeftCon>
          <FormRightCon>
            <GroupWrap>
              <InputLabel><RedSpan> * </RedSpan>发票终止号码</InputLabel>
              <RightTab>
                <FormItem>
                {getFieldDecorator('end',{
                  initialValue:this.props.record&&this.props.record.num_end,
                  rules:[{
                    validator: (rule, value, callback)=>{
                      const reg = /^[0-9]{8}$/;
                      if(!value){
                        callback('发票终止号码不能为空');
                      }
                      if(!reg.test(value)){
                        callback('发票终止号码错误');
                      }else{
                        if(this.state.begin!=='' && value<=this.state.begin){
                          callback('发票终止号码必须大于起始号码');
                        }
                      }
                      callback();
                    }
                  }]
                })(
                  <Input onChange={(e)=>{
                    if((/^[0-9]{8}$/).test(e.target.value)){
                      this.setState({end:e.target.value},()=>{
                        if((/^[0-9]{8}$/).test(this.state.begin) && this.state.begin<this.state.end){
                          this.props.form.setFieldsValue({quantity:this.state.end - this.state.begin+1})
                        }
                      })
                    }
                  }} style={{width:175}} placeholder="请输入发票终止号码"/>
                )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel><RedSpan> * </RedSpan>领购张数</InputLabel>
              <RightTab>
                <FormItem>
                {getFieldDecorator('quantity',{
                  initialValue:this.props.record&&this.props.record.quantity,
                  rules:[{
                    required: true, message: '领购张数不能为空',
                  }]
                })(
                  <Input disabled style={{width:175}} placeholder="请输入领购张数"/>
                )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel><RedSpan> * </RedSpan>领购日期</InputLabel>
              <RightTab>
                <FormItem>
                {getFieldDecorator('buy_time',{
                  initialValue:this.props.record&&moment(this.props.record.buy_time, dateFormat),
                  rules:[{
                    required: true, message: '购买日期不能为空',
                  }]
                })(
                  <DatePicker
                    style={{width:175}}
                    size='large'
                    disabledDate={this.disabledDate}
                  />
                )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel><RedSpan> * </RedSpan>分机号</InputLabel>
              <RightTab>
                <FormItem>
                {getFieldDecorator('disk_num',{
                  initialValue:this.props.record&&this.props.record.disk_num,
                  rules:[{
                    required: true, message: '分机号不能为空',
                  }]
                })(
                  <Input style={{width:175}} placeholder="请输入分机号"/>
                )}
                </FormItem>
              </RightTab>
            </GroupWrap>
          </FormRightCon>
        </FromSetCon>
        <div style={{margin:'20px 0',color:'gray'}}>
          注：开票限额是由税务机关给贵企业设定的发票开具最高金额，例：如果企业的普通发票为万元版，则发票限额应为9999.99。
        </div>
        <BottomCon>
          <GroupWrap>
            <FilButton onClick={this.props.cancel} style={{marginRight:20}}>取消</FilButton>
            <FilButton onClick={this.handleSubmit} type='primary'>保存</FilButton>
          </GroupWrap>
        </BottomCon>
      </Form>
    {this.state.codingModal}
    </Modal>
    )
  }
}
const RegisterModal = Form.create()(RegisterModalMack);
export default RegisterModal;
