import React from 'react'
import {Input,Form,Button,Modal,Radio,Select } from 'antd'
import styled from 'styled-components'
import { CodingModal } from 'components'
const RadioGroup = Radio.Group;
const {Option} = Select;
const Search = Input.Search;
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
class GoodsModalMack extends React.Component{
  state={
    codingModal:'',
    coding:{
      merge_code:'',
      goods_labour_map:'',
    },
    rateList:[],
  };
  componentWillMount(){
    if(this.props.settingList){
      const arr = this.props.settingList[0].tax_rate.split(",")
      for(let i in arr){
        this.state.rateList.push(arr[i].split("")[1])
      }
      this.setState({})
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        if(values['price']){
          values['price'] = Number(values['price']).toFixed(2)+'';
        }
        if(this.props.edit){
          values['goods_id'] = this.props.record.id;
          delete values['tax_code']
          delete values['tax_type']
          values['tax_id'] = this.state.coding.code?this.state.coding.id:this.props.record.tax_id;
          this.props.editGoods(values,()=>{
            this.props.refresh()
            this.props.cancel()
          })
        }else{
          delete values['tax_code']
          delete values['tax_type']
          values['tax_id'] = this.state.coding.id;
          this.props.addGoods(values,()=>{
            this.props.refresh()
            this.props.cancel()
          })
        }
      }
    })
  }
  setCodingModal = () => {
    this.setState({codingModal:<CodingModal cancel={()=>this.setState({codingModal:''})}
                                            codingList={this.props.codingList}
                                            codingLoad={this.props.codingLoad}
                                            getCoding={(coding)=>this.setState({coding:coding},()=>{
                                              this.props.form.setFieldsValue({
                                                ['tax_code']:this.state.coding.merge_code,
                                                ['tax_type']:this.state.coding.goods_serv_tittle,
                                                ['name']:this.state.coding.goods_labour_map
                                              })
                                            })}
                                            getCodingList={this.props.getCodingList}/>})
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
              <InputLabel><RedSpan> * </RedSpan>税收分类编码</InputLabel>
              <RightTab>
                <FormItem>
                {getFieldDecorator('tax_code',{
                  initialValue:this.props.edit?record.merge_code:this.state.coding.merge_code,
                  rules:[{
                    required: true, message: '税收分类编码不能为空',whitespace:true,
                  }]
                })(
                  <Search onSearch={this.setCodingModal} onClick={this.setCodingModal} style={{width:155}} placeholder="请输入税收分类编码"/>
                )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel><RedSpan> * </RedSpan>税收分类名称</InputLabel>
              <RightTab>
                <FormItem>
                {getFieldDecorator('tax_type',{
                  initialValue:this.props.edit?record.goods_serv_tittle:this.state.coding.goods_serv_tittle,
                  rules:[{
                    required: true, message: '税收分类名称不能为空',whitespace:true,
                  }]
                })(
                  <Input disabled style={{width:155}} placeholder="请输入税收分类名称"/>
                )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel><RedSpan> * </RedSpan>商品名称</InputLabel>
              <RightTab>
                <FormItem>
                {getFieldDecorator('name',{
                  initialValue:this.props.edit?record.name:'',
                  rules:[{
                    required: true, message: '商品名称名称不能为空',whitespace:true,
                  }]
                })(
                  <Input style={{width:155}} placeholder="请输入商品名称"/>
                )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel><RedSpan> * </RedSpan>企业商品编号</InputLabel>
              <RightTab>
                <FormItem>
                {getFieldDecorator('code',{
                  initialValue:this.props.edit?record.company_code:'',
                  rules:[{
                    required: true, message: '企业商品编号不能为空',whitespace:true,
                  }]
                })(
                  <Input style={{width:155}} placeholder="请输入企业商品编号"/>
                )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel>享受税收优惠</InputLabel>
              <RightTab>
                <FormItem>
                {getFieldDecorator('discount',{
                  initialValue:this.props.edit&&record.discounts_type!==null?record.discounts_type+'':undefined,
                })(
                  <Select style={{width:155}} placeholder='请选择' 
                  allowClear={true}>
                    <Option value='0'>否</Option>
                    <Option value='1'>是</Option>
                  </Select>
                )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel>优惠政策类型</InputLabel>
              <RightTab>
                <FormItem>
                {getFieldDecorator('discounts_type',{
                  initialValue:this.props.edit&&record.discounts_type!==null?record.discounts_type+'':undefined,
                })(
                  <Select style={{width:155}} placeholder='请选择' 
                  allowClear={true}>
                    <Option value='1'>免税</Option>
                    <Option value='0'>不征税</Option>
                  </Select>
                )}
                </FormItem>
              </RightTab>
            </GroupWrap>
          </FormLeftCon>
          <FormRightCon>
            <GroupWrap>
              <InputLabel>规格型号</InputLabel>
              <RightTab>
                <FormItem>
                {getFieldDecorator('spec',{
                  initialValue:this.props.edit?record.spec:'',
                })(
                  <Input style={{width:155}} placeholder="请输入规格型号"/>
                )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel>计量单位</InputLabel>
              <RightTab>
                <FormItem>
                {getFieldDecorator('unit',{
                  initialValue:this.props.edit?record.unit:'',
                })(
                  <Input style={{width:155}} placeholder="请输入计量单位"/>
                )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel>单价</InputLabel>
              <RightTab>
                <FormItem>
                {getFieldDecorator('price',{
                  initialValue:this.props.edit?record.price:''
                })(
                  <Input onBlur={(e)=>{
                    this.props.form.setFieldsValue({
                      ['price']:Number(e.target.value).toFixed(2)
                    })
                  }} style={{width:155}} placeholder="请输入单价"/>
                )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel><RedSpan> * </RedSpan>含税价标志</InputLabel>
              <RightTab>
                <FormItem>
                {getFieldDecorator('tax_mark',{
                  initialValue:this.props.edit&&record.tax_mark+'',
                  rules:[{
                    required: true, message: '含税价标志不能为空',whitespace:true,
                  }]
                })(
                  <Select style={{width:155}} placeholder='请选择含税价标志'>
                    <Option value='1'>是</Option>
                    <Option value='0'>否</Option>
                  </Select>
                )}
                </FormItem>
              </RightTab>
            </GroupWrap>
            <GroupWrap>
              <InputLabel><RedSpan> * </RedSpan>税率</InputLabel>
              <RightTab>
                <FormItem>
                {getFieldDecorator('rate',{
                  initialValue:this.props.edit&&record.rate,
                  rules:[{
                    required: true, message: '税率不能为空',whitespace:true,
                  }]
                })(
                  <Select style={{width:155}} placeholder='请选择税率'>
                    { this.state.rateList.find((el)=>el === '1') && <Option value='3%'>3%</Option> }
                    { this.state.rateList.find((el)=>el === '2') && <Option value='0%'>0%</Option> }
                    { this.state.rateList.find((el)=>el === '3') && <Option value='免税'>免税</Option> }
                    { this.state.rateList.find((el)=>el === '4') && <Option value='不征税'>不征税</Option> }
                    { this.state.rateList.find((el)=>el === '5') && <Option value='4%'>4%</Option> }
                    { this.state.rateList.find((el)=>el === '6') && <Option value='5%'>5%</Option> }
                    { this.state.rateList.find((el)=>el === '7') && <Option value='6%'>6%</Option> }
                    { this.state.rateList.find((el)=>el === '8') && <Option value='10%'>10%</Option> }
                    { this.state.rateList.find((el)=>el === '9') && <Option value='11%'>11%</Option> }
                    { this.state.rateList.find((el)=>el === '0') && <Option value='16%'>16%</Option> }
                    { this.state.rateList.find((el)=>el === '$') && <Option value='17%'>17%</Option> }
                  </Select>
                )}
                </FormItem>
              </RightTab>
            </GroupWrap>
          </FormRightCon>
        </FromSetCon>
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
const GoodsModal = Form.create()(GoodsModalMack);
export default GoodsModal;
