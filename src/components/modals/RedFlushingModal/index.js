import React from 'react'
import {Input,Form,Button,Modal,Radio,Select,message } from 'antd'
import styled from 'styled-components'

const RadioGroup = Radio.Group;
const {Option} = Select;
const { TextArea } = Input;
const InputLabel = styled.span`
  width:60%;
  float:left;
  text-align:left;
`;
const GroupWrap = styled.div`
  overflow:hidden;
  margin-top:20px;
`;
const RightTab = styled.div`
  float:left;
  width:40%;
  text-align:right;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
  text-align:center;
`;
const FromSetCon = styled.div`
  overflow:hidden;
  font-size:12px;
  width:90%;
  margin:0 auto;
`;
const BottomCon = styled.div`
  overflow:hidden;
  margin:0 auto;
  margin-top:20px;
`;
const FilButton = styled(Button)`
  width:105px;
  height:30px;
`;
const WarningFont = styled.div`
  color:#FF5454;
  text-align:left;
`;
const FormItem = Form.Item;
class RedFlushingModalMack extends React.Component{
  state={
    
  };
  getNextMonth = (date) => {
    let arr = date.split('-');
    let year = arr[0]; //获取当前日期的年份
    let month = arr[1]; //获取当前日期的月份
    let day = arr[2]; //获取当前日期的日
    let days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    let year2 = year;
    let month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
    }
    let day2 = day;
    let days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    return month2>arr[1]
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        const selectArr = this.props.selectArr;
        values['hczt'] = this.props.selectAll.hczt;
        if(selectArr === ('10'||'14')){
          values['outinvoice_id'] = this.props.selectedRowKeys+''
          this.props.eleSetred(values,()=>{
            this.props.cancel()
            this.props.refreshData()
          })
        }else{
          if(this.getNextMonth(this.props.selectAll.kprq)){
            message.error("当月开具的发票次月才可以冲红");return;
          }
          values['action'] = 3;
          values['outinvoice_id'] = this.props.selectedRowKeys+'';
          values['is_special'] = selectArr+'';
          this.props.getDetail(this.props.selectedRowKeys+'',(res)=>{
            let papDetail = [];
            const details = res.invoice_details;
            for(let i in details){
              let j = Number(i)+1;
              let ZeroTax;
              if(details[i].slv === '3'){
                ZeroTax = ''
              }else if(details[i].slv === '0%'){
                ZeroTax = '3'
              }else if(details[i].slv === '免税'){
                ZeroTax = '1'
              }else if(details[i].slv === '不征税'){
                ZeroTax = '2'
              }
              papDetail.push({
                'ListGoodsName' : details[i].hwmc,
                'ListTaxItem' : '1',
                'ListTaxRate' : details[i].slv==='3%'?'3':'0',
                'ListStandard' : details[i].ggxh,
                'ListUnit' : details[i].dw,
                'ListNumber' : details[i].sl,
                'ListPrice' : -details[i].dj,
                'ListAmount' : -details[i].je,
                'ListTaxAmount' : -details[i].se,
                'ListPriceKind' : '0',
                'GoodsNoVer' : '10.0',
                'GoodsTaxNo' : '3041012',
                'TaxPre' : '0',
                "ZeroTax": ZeroTax,
                'CropGoodsNo' : '1111'
              })
              if(details[i].zkje !== '' ){
                papDetail.push({
                  'ListGoodsName' : '折扣行数1('+details[i].sale.zkl+'%)',
                  //商品税率
                  "ListTaxRate": details[i].slv==='1'?'3':'0',
                  //金额
                  "ListAmount": -details[i].sale.zkje,
                  //税额
                  "ListTaxAmount": -details[i].sale.zkje*(details[i].slv==='1'?0.03:0),
                  //含税价标志
                  "ListPriceKind": "1",
                })
              }
            }
            let invoice_details = {};
            for(let n in papDetail){
              let m = Number(n)+1;
              invoice_details["Item$i_"+m] = papDetail[n]; 
            }
            window.invoiceSdk.invoice(
              'localhost:15678',
              this.props.companyList&&this.props.companyList.tax_number,
              this.props.settingList[0].tax_control_type === 1? 'BW_dGVzdHRlc3Q':'dGVzdHRlc3Q',
              {
                "data": {
                  'main' : {
                    "IndentNo": "11111",
                    "InfoKind": res.fpzl==='04'?'102':'100',
                    "InfoClientTaxCode": res.gfsbh,
                    "InfoClientName": res.gfmc,
                    "InfoClientBankAccount": res.gfyhzh,
                    "InfoClientAddressPhone": res.gfdzdh,
                    "InfoTaxRate": res.invoice_details[0].slv,
                    "InfoNotes": '对应正数 发票代码 '+ res.fpdm +'号码'+ res.fphm,
                    "InfoInvoicer": res.kprmc,
                    "InfoChecker": res.fhrmc,
                    "InfoCashier": res.skrmc,
                    "InfoSellerBankAccount": res.xfyhzh,
                    "InfoSellerAddressPhone": res.xfdzdh,
                    "IsList": "0",
                    "InfoMobileNo": "",
                    "IsImmPrint": '0',
                    "IsAutoPrint": '1',
                  },
                  "detail": invoice_details
                }
              }
            )
            .then((res)=>{
              if(res.body.data.Ret === '0'){
                this.props.paperAction(values,()=>{
                  this.props.cancel()
                  this.props.refreshData()
                })
              }else{
                Modal.error({
                  title: '开具失败',
                  content: res.body.data.Msg,
                });
              }
            })
          })
        }
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { cancel,selectArr,selectAll } = this.props;
    return(
    <Modal title={<TitleSpan>开具红字发票
      {selectArr === ('10'||'14')&& '(增值税普通电子发票）'}
      {selectArr === ('04'||'11')&& '(增值税普通发票）'}
      {selectArr === ('01'||'02'||'03')&& '(增值税专业发票）'}
    </TitleSpan>}
           style = {{textAlign:'center',top:100}}
           visible
           onCancel={this.props.cancel}
           width={400}
           maskClosable={false}
           footer={null}
    >
      <Form>
        <FromSetCon>
          <WarningFont>
            提示：开具红字发票的金额为原发票价税合计金额的负值，一旦开具原发票将作废，请知晓！
          </WarningFont>
          <GroupWrap>
            <RightTab>购方名称：</RightTab>
            <InputLabel>{selectAll.gfmc?selectAll.gfmc:'---'}</InputLabel>
          </GroupWrap>
          <GroupWrap>
            <RightTab>购方纳税人识别号：</RightTab>
            <InputLabel>{selectAll.gfsbh?selectAll.gfsbh:'---'}</InputLabel>
          </GroupWrap>
          <GroupWrap>
            <RightTab>原发票代码：</RightTab>
            <InputLabel>{selectAll.fpdm?selectAll.fpdm:'---'}</InputLabel>
          </GroupWrap>
          <GroupWrap>
            <RightTab>原发票号码：</RightTab>
            <InputLabel>{selectAll.fphm?selectAll.fphm:'---'}</InputLabel>
          </GroupWrap>
          <GroupWrap>
            <RightTab>原发票种类：</RightTab>
            <InputLabel>
              {selectArr === ('10'||'14')&& '增值税普通电子发票'}
              {selectArr === ('04'||'11')&& '增值税普通发票'}
              {selectArr === ('01'||'02'||'03')&& '增值税专业发票'}
            </InputLabel>
          </GroupWrap>
          <GroupWrap>
            <RightTab>红票价税合计金额：</RightTab>
            <InputLabel>{selectAll.jshj?selectAll.jshj:'---'}</InputLabel>
          </GroupWrap>
          {
            selectArr === ('01'||'02'||'03') &&
            <GroupWrap>
              <RightTab>冲红申请开具通知单号：</RightTab>
              <InputLabel>
                <FormItem>
                {getFieldDecorator('redcode',{
                  rules:[{
                    required: true, message: '通知单号不能为空',whitespace:true,
                  }]
                })(
                  <Input style={{width:'100%'}} />
                )}
                </FormItem>
              </InputLabel>
            </GroupWrap>
          }
          <GroupWrap>
            <RightTab>冲红原因：</RightTab>
            <InputLabel>
              <FormItem>
              {getFieldDecorator('reason',{
                rules:[{
                  required: true, message: '冲红原因不能为空',whitespace:true,
                }]
              })(
                <TextArea style={{width:'100%',height:50}}/>
              )}
              </FormItem>
            </InputLabel>
          </GroupWrap>
        </FromSetCon>
        <BottomCon>
          <GroupWrap>
            <FilButton onClick={this.props.cancel} style={{marginRight:20}}>取消</FilButton>
            <FilButton onClick={this.handleSubmit} type='primary'>确定开具</FilButton>
          </GroupWrap>
        </BottomCon>
      </Form>
    </Modal>
    )
  }
}
const RedFlushingModal = Form.create()(RedFlushingModalMack);
export default RedFlushingModal;
