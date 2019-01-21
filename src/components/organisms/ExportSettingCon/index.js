import React from 'react';
import { Input,Form,Button,Radio,Icon } from 'antd';
import styled from 'styled-components';
import { SetExportModal } from 'components'

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const InputLabel = styled.span`
  width:150px;
  line-height:32px;
  float:left;
`;
const Label = styled.p`
  height:30px;
  line-height:30px;
  padding-left:20px;
  font-size:14px;
  font-weight:700;
  margin-top:15px;
  margin-bottom:10px;
`;
const ComContent = styled.div`
  background:#fff;
  padding:20px 20px ;
`;
const GroupWrap = styled.div`
  overflow:hidden;
  font-size:12px;
  margin-top:100px;
`;
const RightTab = styled.div`
  display:inline-block;
  margin-left:15px;
`;
const ScanSetCon = styled.div`
  float:left;
  width:35%;
  overflow:hidden;
  background:#fff;
`;
const ScanExportSetCon = styled.div`
  float:left;
  width:60%;
  margin-left:3%;
  overflow:hidden;
  height:68vh;
  background:#fff;
  position:relative;
  z-index:2;
`;
const SetCon = styled.div`
  margin-top:15px;
  width:80%;
`;
const SetSpan = styled.span`
  background:#2397CA;
  color:#fff;
  font-size:12px;
  display:inline-block;
  padding:3px 5px;
  border-radius:2px;
  margin:0 10px 10px 0;
`;
const SetButton = styled(Button)`
  border:1px solid #2397CA;
  color:#2397CA;
  margin-top:15px;
`;
const ButtomBtn = styled.div`
  position:fixed;
  right:50px;
  bottom:50px;
  z-index:500;
`;
class ExportSettingConMake extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      role:"",
      companyList:'',
      itemList:[],
      useList:[],
      hideList:[],
    }
  };
  componentWillReceiveProps(next){
    this.setState({role:next.navList.role})
  }
  componentWillMount(){
    this.props.getCompanyList((res)=>{
      this.setState({companyList:res})
    })
    this.getExportItem()
  }
  getExportItem = () => {
    this.props.getExportItem((res)=>{
      this.setState({useList:res.use})
      let use = res.use;
      let all = res.all;
      let arr = []
      for(let i in all){
        for(let j in use){
          if(all[i].id===use[j].id){
            all.splice(i,1)
          }
        }
      }
      this.setState({hideList:all})
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {navList} = this.props;
    const items =[];
    for(let i in this.state.useList){
      items.push(this.state.useList[i].id)
    }
    this.props.form.validateFields((err, values) => {
      values['export_items'] = items.join(",")
      if(!err){
        this.props.invoiceEdit(values,()=>{
          navList.company=values.name;
        });
      }
    });
  };
  setExport = () => {
    this.setState({
      setExportModal:<SetExportModal cancel={()=>this.setState({setExportModal:''},()=>{
                                        this.getExportItem()
                                     })}
                                     hideList={this.state.hideList}
                                     useList={this.state.useList}
                                     setItem={(useList)=>{this.setState({useList},()=>{
                                        this.setState({setExportModal:''})
                                     })}}/>
    })
  }
  render(){
    const { getFieldDecorator,isFieldsTouched } = this.props.form;
    const { companyList } = this.state;
    return(
      <Form>
        <ScanSetCon>
          <Label>发票录入设置</Label>
          <ComContent>
            <FormItem>
              <div style={{marginBottom:10}}>发票抬头不一致禁止录入：</div>
              {getFieldDecorator('forbid_diff_name', {
                initialValue: companyList.forbid_diff_name===null?0:companyList.forbid_diff_name,
              })(
                <RadioGroup>
                  <Radio disabled={this.state.role===1} value={1}>启用</Radio><br/>
                  <Radio disabled={this.state.role===1} value={0}>不启用</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem>
              <div style={{marginBottom:10}}>纳税人识别号不一致禁止录入：</div>
              {getFieldDecorator('forbid_diff_tax', {
                initialValue: companyList.forbid_diff_tax===null?0:companyList.forbid_diff_tax,
              })(
                <RadioGroup>
                  <Radio disabled={this.state.role===1} value={1}>启用(禁止纳税人识别号为空和不一致的发票录入）</Radio><br/>
                  <Radio disabled={this.state.role===1} value={2}>启用(仅禁止有纳税人识别号且不一致的发票录入）</Radio><br/>
                  <Radio disabled={this.state.role===1} value={0}>不启用</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem>
              <div style={{marginBottom:10}}>专用发票信息校验：</div>
              {getFieldDecorator('forbid_diff_special', {
                initialValue: companyList.forbid_diff_special===null?0:companyList.forbid_diff_special,
              })(
                <RadioGroup>
                  <Radio disabled={this.state.role===1} value={1}>启用(禁止地址、电话、开户行、账号不一致的发票录入）</Radio><br/>
                  <Radio disabled={this.state.role===1} value={0}>不启用</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem>
              <div>发票强制更新：</div>
              <div style={{marginBottom:10,fontSize:12,color:"gray"}}>*启用后,每次查验支持更新发票状态(如是否作废）,所有发票查验都将计费</div>
              {getFieldDecorator('force_update', {
                initialValue: companyList.force_update===null?0:companyList.force_update,
              })(
                <RadioGroup>
                  <Radio disabled={this.state.role===1} value={1}>启用</Radio><br/>
                  <Radio disabled={this.state.role===1} value={0}>不启用</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </ComContent>
        </ScanSetCon>
        <ScanExportSetCon>
          <Label>发票导出设置</Label>
          <ComContent>
            <p style={{fontSize:12}}>已设置发票导出字段：</p>
            <SetCon>
              {
                this.state.useList.map((item)=>{
                  return <SetSpan key={item.id}>{item.name}</SetSpan>
                })
              }
            </SetCon>
            <SetButton onClick={this.setExport}>修改字段设置</SetButton>
            {/*<GroupWrap>
              <InputLabel>发票导出最大支持条数：</InputLabel>
              <RightTab>
                <Input style={{display:'none'}} placeholder="请输入最大条数" name="gsmc" autoComplete="off"/>
                <FormItem>
                  {getFieldDecorator('name', {
                    rules: [{
                      validator:(rule, value, callback)=>{
                        const reg = /^[0-9]*$/;
                        if(!value){
                          callback('最大条数不能为空');
                        }
                        if(!reg.test(value)){
                          callback('最大条数只能是整数');
                        }
                        callback();
                      },
                    }],
                  })(
                    <Input disabled={this.state.role===1} style={{width:150,color:'#2397CA'}} placeholder="请输入最大条数" name="gsmc" autoComplete="off"/>
                  )}
                </FormItem>
              </RightTab>
            </GroupWrap>*/}
          </ComContent>
        </ScanExportSetCon>
        {
          this.state.role!==1&&
          <ButtomBtn>
            <Button type="primary" onClick={this.handleSubmit} style={{marginTop:38,marginRight:20,float:'right'}}>保存设置</Button>
          </ButtomBtn>
        }
        {this.state.setExportModal}
      </Form>
    )
  }
}
const ExportSettingCon = Form.create()(ExportSettingConMake);
export default ExportSettingCon;
