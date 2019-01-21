import React from 'react';
import { Input,Form,Button,Radio,Icon,Checkbox,Row,Col,Select } from 'antd';
import styled from 'styled-components';
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

const LableCon = styled.div`
  font-size:12px;
  margin-bottom:12px;
`;
const GroupWarp = styled.div`
  overflow:hidden;
  margin-top:41px;
`;
const RadioGroupCon = styled.div`
  overflow:hidden;
  font-size:12px;
  margin-top:10px;
`;
const RadioTab = styled.div`
  float:left;
  margin-right:8px;
  width:72px;
  text-align:right;
`;
const BottomCon = styled.div`
  overflow:hidden;
  width:100%;
`;
const BottomBtn = styled(Button)`
  width:105px;
  height:30px;
  margin-top:50px;
  margin-left:30%;
`;
const SaleSetCon = styled.div`
  background:#fff;
  padding:0 0 50px 28px;
  overflow:hidden;
  position:relative;
`;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
class SaleSetFormMake extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      rate:[],
      ratepayer_type:'',
      show:false,
      limit_appreciation:'',
      limit_general:'',
      rateList:[],
      source:'',
    }
    this.arr = [];
    this.samll = [{
      value:'1',
      title:'3%'
    },{
      value:'2',
      title:'0%'
    },{
      value:'3',
      title:'免税'
    },{
      value:'4',
      title:'不征税'
    }];
  };
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if(!err){
        if(this.state.source === 1){
          const param = {
            source:1
          }
          this.props.setSetting(param,()=>{
            this.props.getNavList()
          })
          return;
        }
        this.arr = [];
        if(values['ratepayer_type'] === '0'){
          for(let i in values['rate']){
            this.arr.push("1"+values['rate'][i])
          }
        }else{
          for(let i in values['rate']){
            this.arr.push("2"+values['rate'][i])
          }
        }
        values['tax_type'] = values['tax_type'].join(',');
        delete values['limit_general'];
        delete values['ratepayer_type'];
        values['rate'] = this.arr.join(",")
        this.props.setSetting(values,()=>{
          this.props.getNavList()
        })
        this.arr = []
      }
    })
  }
  componentWillMount(){
    this.props.showSetting((res)=>{
      if(res){
        if(res.tax_rate){
          let arr = res.tax_rate.split(',');
          for(let i in arr){
            this.state.rate.push(arr[i].split("")[1])
            if(arr[i].split("")[0] === '1'){
              this.setState({ratepayer_type:'0'})
            }else{
              this.setState({ratepayer_type:'1'})
            }
          }
        }
        this.state.source = res.source;
      }
      this.setState({})
      this.setState({show:true})
    })
  }
  rateChange = (e) => {
    this.setState({ratepayer_type:e.target.value,rate:[]})
  }
  handleChange = (e) => {
    this.setState({source:e.target.value})
  }
  render(){
    const { getFieldDecorator,isFieldsTouched } = this.props.form;
    const { showSetting,setSetting,settingList } = this.props;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return(
      <Form className='sale-form'>
        {
          this.state.show === true &&
        <SaleSetCon>
          <GroupWarp>
            <LableCon>选择销项发票来源</LableCon>
            <FormItem>
              {getFieldDecorator(`source`,{
                initialValue:settingList&&settingList[0].source,
                rules: [{
                  required: true, message: '发票来源不能为空',
                }],
              })(
                <RadioGroup onChange={this.handleChange}>
                  <Radio value={0}>在线开具</Radio>
                  {this.props.navList.plugin.monitor && <Radio value={1}>客户端采集</Radio>}
                </RadioGroup>
              )}
            </FormItem>
          </GroupWarp>
          {
            (this.props.navList.role == 3 || this.props.navList.role == 7 || this.props.navList.role == 9 ||this.props.navList.role == 21 )&&
            <GroupWarp>
              <LableCon>选择开票人</LableCon>
              <FormItem>
                {getFieldDecorator(`kprid`,{
                  initialValue:settingList&&settingList[0].kprid!==null&&settingList[0].kprid+'',
                  rules: [{
                    required: true, message: '开票人不能为空',
                  }],
                })(
                  <Select style={{width:220}} 
                          placeholder="请选择"
                          showSearch
                          allowClear = {true}
                          size='large'
                          optionFilterProp="children">
                    {
                      this.props.departUserList.rows.map((item)=>{
                        return <Option value={item.id+''} key={item.id}>{item.realname}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
            </GroupWarp>
          }
          {
            this.state.source !== 1 &&
            <div>
              <GroupWarp>
                <LableCon>开具类型</LableCon>
                <FormItem>
                  {getFieldDecorator(`tax_type`,{
                    initialValue:settingList&&settingList[0].tax_type!==null?(settingList[0].tax_type===0?['1','2']:(settingList[0].tax_type+"").split(',')):[],
                    rules: [{
                      required: true, message: '开具类型不能为空',
                    }],
                  })(
                    <CheckboxGroup>
                      <Checkbox value='2'>电子发票</Checkbox>
                      <Checkbox value='1'>纸质发票</Checkbox>
                    </CheckboxGroup>
                  )}
                </FormItem>
              </GroupWarp>
              <GroupWarp>
                <LableCon>选择税控盘</LableCon>
                <FormItem>
                  {getFieldDecorator(`tax_disc`,{
                    initialValue:settingList&&settingList[0].tax_control_type,
                    rules: [{
                      required: true, message: '税控盘不能为空',
                    }],
                  })(
                    <RadioGroup>
                      <Radio value={0}>金税盘</Radio>
                      <Radio value={1}>税控盘</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </GroupWarp>
              <GroupWarp>
                <LableCon>税率设置</LableCon>
                <RadioGroupCon>
                  <RadioTab>纳税人类型：</RadioTab>
                  <FormItem style={{float:'left',paddingTop:3}}>
                    {getFieldDecorator(`ratepayer_type`,{
                      initialValue:this.state.ratepayer_type,
                      rules: [{
                        required: true, message: '纳税人类型不能为空',
                      }],
                    })(
                      <RadioGroup onChange={this.rateChange}>
                        <Radio value='0'>小规模纳税人</Radio>
                        <Radio value='1'>一般纳税人</Radio>
                      </RadioGroup>
                    )}
                  </FormItem>
                </RadioGroupCon>
                <RadioGroupCon>
                  <RadioTab>税率：</RadioTab>
                  {
                    this.state.ratepayer_type === '0' ?
                    <FormItem style={{float:'left',paddingTop:3,width:320}}>
                      {getFieldDecorator(`rate`,{
                        initialValue:this.state.rate,
                        rules: [{
                          required: true, message: '税率不能为空',
                        }],
                      })(
                        <CheckboxGroup>
                          <Row>
                            <Col span={5} key='1'><Checkbox value='1'>3%</Checkbox></Col>
                            <Col span={5} key='2'><Checkbox value='2'>0%</Checkbox></Col>
                            <Col span={5} key='3'><Checkbox value='3'>免税</Checkbox></Col>
                            <Col span={5} key='4'><Checkbox value='4'>不征税</Checkbox></Col>
                          </Row>
                        </CheckboxGroup>
                      )}
                    </FormItem>
                    :
                    <FormItem style={{float:'left',paddingTop:3,width:320}}>
                      {getFieldDecorator(`rate`,{
                        initialValue:this.state.rate,
                        rules: [{
                          required: true, message: '税率不能为空',
                        }],
                      })(
                        <CheckboxGroup>
                          <Row>
                            <Col span={5} key='1'><Checkbox value='1'>3%</Checkbox></Col>
                            <Col span={5} key='2'><Checkbox value='2'>0%</Checkbox></Col>
                            <Col span={5} key='3'><Checkbox value='3'>免税</Checkbox></Col>
                            <Col span={5} key='4'><Checkbox value='4'>不征税</Checkbox></Col>
                          </Row>
                          <Row style={{marginTop:10}}>
                            <Col span={5} key='5'><Checkbox value='5'>4%</Checkbox></Col>
                            <Col span={5} key='6'><Checkbox value='6'>5%</Checkbox></Col>
                            <Col span={5} key='7'><Checkbox value='7'>6%</Checkbox></Col>
                            <Col span={5} key='8'><Checkbox value='8'>10%</Checkbox></Col>
                          </Row>
                          <Row style={{marginTop:10}}>
                            <Col span={5} key='9'><Checkbox value='9'>11%</Checkbox></Col>
                            <Col span={5} key='10'><Checkbox value='0'>16%</Checkbox></Col>
                            <Col span={5} key='11'><Checkbox value='$'>17%</Checkbox></Col>
                          </Row>
                        </CheckboxGroup>
                      )}
                    </FormItem>
                  }
                </RadioGroupCon>
              </GroupWarp>
            </div>
          }
          {/*<GroupWarp>
            <LableCon>发票剩余量预警</LableCon>
            <RadioGroup defaultValue={1}>
              <Radio style={radioStyle} value={1}>启用</Radio>
              剩余<Input/>张提醒
              <Radio style={radioStyle} value={2}>不启用</Radio>
            </RadioGroup>
          </GroupWarp>*/}
          <BottomCon>
            <BottomBtn onClick={this.handleSubmit} type='primary'>保存设置</BottomBtn>
          </BottomCon>
        </SaleSetCon>
        }
      </Form>
    )
  }
}
const SaleSetForm = Form.create()(SaleSetFormMake);
export default SaleSetForm;
