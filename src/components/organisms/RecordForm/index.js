import React from 'react'
import styled from 'styled-components'
import {Input,Form,Button,DatePicker,message,Select,Checkbox } from 'antd'
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const ManualTitle = styled.p`
  text-align:center;
  font-size:15px;
  margin-bottom:30px;
`;
const ManualCon = styled.div`
  margin:0 auto;
  width:900px;
  padding-top:80px;
`;
const InputLabel = styled.span`
  width:100px;
  line-height:32px;
  display:block;
  padding-right:12px;
  font-size: 12px;
  color: #232323;
  margin-bottom:8px;
`;
const GroupWrap = styled.div`
  overflow:hidden;
  height:100px;
  float:left;
  width:50%;
  padding-bottom:15px;
`;
const RightTab = styled.div`
  float:left;
`;
const MustLabel = styled.span`
  float:left;
  margin-left:15px;
  line-height:32px;
  font-size: 12px;
  color: #2397CA;
  height:32px;
`;
const Before = styled.span`
  display:inline-block;
  width: 5px;
  height: 5px;
  margin-right:5px;
  background: #2397CA;
  border-radius:50%;
  margin-bottom: 2px;
`;
class RecordFormMake extends React.Component{
  constructor(props){
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        if(values.kprq){
          values.kprq = values.kprq.format('YYYYMMDD');
        }
        if(values.tag_ids){
          values.tag_ids = values.tag_ids.join(',');
        }
        if(this.props.navList.role===1){
          values.owner_id = this.props.navList.user_id
        }else{
          values.owner_id = values.owner_id?values.owner_id:'';
        }
        values.memo = values.memo?values.memo:'';
        let memo = values.memo;
        memo=memo.replace(/\n/g,"")
        memo=memo.replace(/\r/g,"")
        const str = values.memo.split('');
          for(let i in str){
            if(str[i] == '|' || str[i] == '&' || str[i] == ';' || str[i] == '$' || str[i] == '%' || str[i] == '<' || str[i] == '>' ||
              str[i] == '(' || str[i] == ')' || str[i] == '+' || str[i] == '\\'){
                message.error("其他备注不能包含非法字符");return;
              }
          }
        this.props.recordAddFnc(values,this.props.form.resetFields());
      }
    });
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    const { linkUserList,navList } = this.props;
    return(
      <ManualCon>
        <Form>
          <div style={{overflow:"hidden"}}>
          <GroupWrap>
            <InputLabel><Before/>发票代码：</InputLabel>
            <div style={{overflow:"hidden"}}>
              <RightTab>
                <FormItem hasFeedback>
                  {getFieldDecorator('fpdm', {
                    rules: [{
                      validator: (rule, value, callback)=>{
                        const reg = /^[0-9]*$/;
                        if(!value){
                          callback('发票代码不能为空');
                        }
                        if(!reg.test(value)){
                          callback('发票代码只能是数字');
                        }else{
                          if((value+'').length>12){
                            callback('发票代码不能超过12位');
                          }
                        }
                        callback();
                      },
                    }],
                  })(
                    <Input style={{width:300,marginLeft:15}} placeholder="请输入发票代码"/>
                  )}
                </FormItem>
              </RightTab>
              <MustLabel>*必填</MustLabel>
            </div>
          </GroupWrap>
          <GroupWrap>
            <InputLabel><Before/>发票号码：</InputLabel>
            <div style={{overflow:"hidden"}}>
            <RightTab>
              <FormItem hasFeedback>
                {getFieldDecorator('fphm', {
                  rules: [{
                    required: true, message: '发票号码不能为空',whitespace:true,
                  }, {
                    pattern: /^[0-9]{8}$/, message: '发票号码只能是8位的数字',
                  }],
                })(
                  <Input style={{width:300,marginLeft:15}} placeholder="请输入8位发票号码"/>
                )}
              </FormItem>
            </RightTab>
            <MustLabel>*必填</MustLabel>
            </div>
          </GroupWrap>
          <GroupWrap>
            <InputLabel><Before/>开票日期：</InputLabel>
            <div style={{overflow:"hidden"}}>
            <RightTab>
              <FormItem hasFeedback>
                {getFieldDecorator('kprq', {
                  initialValue:moment(new Date(), 'YYYYMMDD'),
                  rules: [{
                    required: true, message: '开票日期不能为空',
                  }],
                })(
                  <DatePicker style={{width:300,marginLeft:15}}
                              format="YYYYMMDD"
                              disabledDate={(current)=>{
                                return current && current.valueOf() > Date.now();
                              }}
                              placeholder="请输入YYYYMMDD"
                              allowClear={false}/>
                )}
              </FormItem>
            </RightTab>
            <MustLabel>*必填</MustLabel>
            </div>
          </GroupWrap>
          <GroupWrap>
            <InputLabel><Before/>价税合计：</InputLabel>
            <div style={{overflow:"hidden"}}>
            <RightTab>
              <FormItem hasFeedback>
                {getFieldDecorator('jshj', {
                  rules: [{
                    required: true, message: '价税合计不能为空',whitespace:true,
                  }, {
                    pattern: /^[0-9]+\.?[0-9]*$/, message: '价税合计只能是数字或小数',
                  }],
                })(
                  <Input style={{width:300,marginLeft:15}} placeholder="请输入价税合计"/>
                )}
              </FormItem>
            </RightTab>
            <MustLabel>*必填</MustLabel>
            </div>
          </GroupWrap>
          <GroupWrap>
            <InputLabel><Before/>其他备注：</InputLabel>
            <div style={{overflow:"hidden"}}>
            <RightTab>
              <FormItem>
                {getFieldDecorator('memo')(
                  <Input style={{width:300,marginLeft:15}} placeholder="请输入备注"/>
                )}
              </FormItem>
            </RightTab>
            <MustLabel />
            </div>
          </GroupWrap>
          </div>
          <FormItem>
            <Button type="primary" style={{marginTop:90}} onClick={this.handleSubmit}>录入</Button>
          </FormItem>
        </Form>
      </ManualCon>
    )
  }
}
const RecordForm = Form.create()(RecordFormMake);
export default RecordForm;

