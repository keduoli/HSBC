import React from 'react'
import {Input,Form,Button,Modal,Select,message,DatePicker } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
const {Option} = Select;
const dateFormat = 'YYYY-MM-DD';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const InputLabel = styled.span`
  width:72px;
  float:left;
  line-height:32px;
  margin-left:10px;
`;
const WarningDiv = styled.div`
  font-size:12px;
  height:12px;
  color:red;
  width:250px;
`;
const GroupWrap = styled.div`
  overflow:hidden;
  padding:0 30px;
`;
const RightTab = styled.div`
  display:inline-block;
  float:right;
  margin-right:10px;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
class PollingSetModalMack extends React.Component {
  state={
    waringPrompt:'',
    maxMoney:this.props.edit?this.props.record.jshj_max===null?'':this.props.record.jshj_max:'',
    minMoney:this.props.edit?this.props.record.jshj_min===null?'':this.props.record.jshj_min:'',
    moneyOk:this.props.edit?(this.props.record.jshj_min !== null || this.props.record.jshj_max !== null ):false,
    key:this.props.edit?this.props.record.timer_period:'4',
    hour:[],
    week:[],
    month:[],
    showtimer:true,
    value:'1',
    timer_day:'1'
  };
  componentDidMount(){
    let hour = [];
    let week = [];
    let month = [];
    for(let h = 1;h<=24;h++){
      hour.push(h)
    }
    for(let w = 1;w<=7;w++){
      week.push(w)
    }
    for(let m = 1;m<=28;m++){
      month.push(m)
    }
    this.setState({hour,week,month})
    this.setState({timer_day:this.props.edit?this.props.record.timer_day:'1'})
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(this.state.waringPrompt!=='')return;
      if(!values['kprq_area'] && !values['xfmc'] && this.state.moneyOk == false){
        message.error('销方名称、开票日期、价税金额区间必选其一');return;
      }
      const rangeValue = values['kprq_area'];;
      if(rangeValue){
        if(rangeValue.length > 0){
          values['kprq_area'] = [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')];
          values['kprq_area'] = values['kprq_area'].join(',');
        }
      }else{
        values['kprq_area'] = '';
      }
      values['timer_day'] = this.state.timer_day;
      values['jshj_min'] = this.state.minMoney;
      values['jshj_max'] = this.state.maxMoney;
      if(this.props.edit===true){
        values['id']=this.props.record.id;
        this.props.editPollingTask(values,()=>{
          this.props.getPollingTask({page:this.props.page})
          this.props.cancel()
        })
      }else{
        this.props.addPollingTask(values,()=>{
          this.props.getPollingTask({page:this.props.page})
          this.props.cancel()
        })
      }
    })
  }
  minChange = (e) => {
    const minMoney = e.target.value;
    const reg = /^[1-9]{1}\d{0,9}$/;
    this.setState({minMoney})
    if(minMoney!==''){
      if(!reg.test(minMoney)){
        this.setState({waringPrompt:'只能输入不超过十位的正整数',moneyOk:false});
      }else if(this.state.maxMoney!=='' && Number(minMoney)>Number(this.state.maxMoney)){
        this.setState({waringPrompt:'最小金额不能大于最大金额',moneyOk:false});
      }else if(this.state.maxMoney!=='' && !reg.test(this.state.maxMoney)){
        this.setState({waringPrompt:'只能输入不超过十位的正整数',moneyOk:false});
      }else{
        this.setState({waringPrompt:'',moneyOk:true})
      }
    }else{
      if(reg.test(this.state.maxMoney)){
        this.setState({waringPrompt:'',moneyOk:true})
      }else{
        this.setState({waringPrompt:'',moneyOk:false})
      }
    }
  }
  maxChange = (e) => {
    const maxMoney = e.target.value;
    const reg = /^[1-9]{1}\d{0,9}$/;
    this.setState({maxMoney})
    if(maxMoney!==''){
      if(!reg.test(maxMoney)){
        this.setState({waringPrompt:'只能输入不超过十位的正整数',moneyOk:false});
      }else if(this.state.minMoney!=='' && Number(maxMoney)<Number(this.state.minMoney)){
        this.setState({waringPrompt:'最大金额不能小于最小金额',moneyOk:false});
      }else if(this.state.minMoney!=='' && !reg.test(this.state.minMoney)){
        this.setState({waringPrompt:'只能输入不超过十位的正整数',moneyOk:false});
      }else{
        this.setState({waringPrompt:'',moneyOk:true})
      }
    }else{
      if(reg.test(this.state.minMoney)){
        this.setState({waringPrompt:'',moneyOk:true})
      }else{
        this.setState({waringPrompt:'',moneyOk:false})
      }
    }
  }
  disabledDate = (current) => {
    return current.valueOf() > Date.now();
  };
  setDszq = (key) => {
    this.setState({key,timer_day:'1',showtimer:false},()=>{
      this.setState({showtimer:true})
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { record } = this.props;
    return(
        <Modal title={<TitleSpan>新增定时任务</TitleSpan>}
          style = {{textAlign:'center',top:5}}
          visible
          width={450}
          onCancel={()=>this.props.cancel()}
          maskClosable={false}
          footer={null}>
        <Form>
          <GroupWrap>
            <InputLabel>销方名称</InputLabel>
            <RightTab>
              <FormItem>
                {getFieldDecorator('xfmc',{
                  initialValue:this.props.edit?record.xfmc:''
                })(
                  <Select
                    showSearch
                    placeholder="请选择"
                    allowClear = {true}
                    size='large'
                    style={{width:250}}
                    optionFilterProp="children"
                  >
                    {
                      this.props.xfmcList.length>0 && this.props.xfmcList.map((value,index) => {
                        return <Option key={index} value={value}>{value==='None'?"空":value}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
            </RightTab>
          </GroupWrap>
          <GroupWrap>
            <InputLabel>开票日期</InputLabel>
            <RightTab>
              <FormItem>
                {getFieldDecorator('kprq_area',{
                  initialValue:this.props.edit&&record.kprq_begin?[moment(record.kprq_begin, dateFormat), moment(record.kprq_end, dateFormat)]:'',
                })(
                  <RangePicker
                    style={{width:250}}
                    size='large'
                    disabledDate={this.disabledDate}
                  />
                )}
              </FormItem>
            </RightTab>
          </GroupWrap>
          <GroupWrap>
            <InputLabel>价税金额区间</InputLabel>
            <RightTab>
              <FormItem>
                <div style={{overflow:'hidden',width:250}}>
                  <Input style={{float:'left',width:'40%'}} onChange={this.minChange} value={this.state.minMoney}/>
                  <span style={{width:'20%',textAlign:'center',float:'left'}}>~</span>     
                  <Input style={{float:'right',width:'40%'}} value={this.state.maxMoney} onChange={this.maxChange}/>
                </div>
                <WarningDiv>{this.state.waringPrompt}</WarningDiv>
              </FormItem>
            </RightTab>
          </GroupWrap>
          <GroupWrap>
            <InputLabel>生效方式</InputLabel>
            <RightTab>
              <FormItem>
                {getFieldDecorator('effect_way',{
                  initialValue:this.props.edit?record.effect_way+"":'-1'
                })(
                  <Select style={{width:250}}>
                      <Option key='-1'>所有</Option>
                      <Option key='1'>任一</Option>
                  </Select>
                )}
              </FormItem>
            </RightTab>
          </GroupWrap>
          <GroupWrap>
            <InputLabel>轮询状态</InputLabel>
            <RightTab>
              <FormItem>
                {getFieldDecorator('is_polling',{
                  initialValue:this.props.edit?record.is_polling+"":'2'
                })(
                  <Select style={{width:250}}>
                    <Option key='2'>全部</Option>
                    <Option key='1'>已轮询</Option>
                    <Option key='0'>未轮询</Option>
                  </Select>
                )}
              </FormItem>
            </RightTab>
          </GroupWrap>
          <GroupWrap>
            <InputLabel>定时周期</InputLabel>
            <RightTab>
              <FormItem>
                {getFieldDecorator('timer_period',{
                  initialValue:this.props.edit?record.timer_period:'4'
                })(
                  <Select onChange={this.setDszq} style={{width:250}}>
                    <Option key='4'>--</Option>
                    <Option key='d'>日</Option>
                    <Option key='w'>周</Option>
                    <Option key='m'>月</Option>
                  </Select>
                )}
              </FormItem>
            </RightTab>
          </GroupWrap>
          <GroupWrap>
            <InputLabel>周期时间</InputLabel>
            <RightTab>
              {
                this.state.key==='4' &&  this.state.showtimer=== true && 
                <FormItem>
                  {getFieldDecorator('timer_day',{
                    initialValue:this.props.edit?this.state.timer_day:'1'
                  })(
                    <Select disabled={this.state.key==='4'} style={{width:250}} dropdownClassName='polling_set'>
                      <Option key='1'>--</Option>
                    </Select>
                  )}
                </FormItem>
              }
              {
                this.state.key==='d' && this.state.showtimer=== true && 
                <FormItem>
                  {getFieldDecorator('timer_day',{
                    initialValue:this.props.edit?this.state.timer_day:'1',
                  })(
                    <Select onSelect={(value)=>{
                      this.setState({timer_day:value})
                    }} disabled={this.state.key==='4'} style={{width:250}} dropdownClassName='polling_set'>
                      {
                        this.state.hour.map((num)=>{
                          return <Option key={num}>{num}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              }
              {
                this.state.key==='w' &&  this.state.showtimer=== true && 
                <FormItem>
                  {getFieldDecorator('timer_day',{
                    initialValue:this.props.edit?this.state.timer_day:'1'
                  })(
                    <Select onSelect={(value)=>this.setState({timer_day:value})} disabled={this.state.key==='4'} style={{width:250}} dropdownClassName='polling_set'>
                      {
                        this.state.week.map((num)=>{
                          return <Option key={num}>{num}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              }
              {
                this.state.key==='m' &&  this.state.showtimer=== true && 
                <FormItem>
                  {getFieldDecorator('timer_day',{
                    initialValue:this.props.edit?this.state.timer_day:'1'
                  })(
                    <Select onSelect={(value)=>this.setState({timer_day:value})} disabled={this.state.key==='4'} style={{width:250}} dropdownClassName='polling_set'>
                      {
                        this.state.month.map((num)=>{
                          return <Option key={num}>{num}</Option>
                        })
                      }
                      <Option key='last'>月末</Option>
                    </Select>
                  )}
                </FormItem>
              }
            </RightTab>
          </GroupWrap>
          <GroupWrap style={{marginBottom:30}}>
            <Button style={{marginRight:30}} onClick={this.props.cancel}>取消</Button>
            <Button disabled={this.state.key==='4'} type='primary' onClick={this.handleSubmit}>保存设置</Button>
          </GroupWrap>
        </Form>
      </Modal>
    )
  }
}


const PollingSetModal = Form.create()(PollingSetModalMack);
export default PollingSetModal;