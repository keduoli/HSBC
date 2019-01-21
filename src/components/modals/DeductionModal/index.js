import React from 'react'
import {Input,Form,Button,Modal,message,Icon,DatePicker,Select  } from 'antd'
import styled from 'styled-components'
import moment from 'moment';

const { MonthPicker } = DatePicker;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const SigninDiv = styled.div`
  overflow:hidden;
  margin:0 auto;
  width:100%;
  text-align:left;
  height:30px;
  padding-left:15px;
  line-height:30px;
  background:#f7f7f7;
  font-size:13px;
  border-radius:5px;
  margin-top:10px;
`;
const SignSpan = styled.span`
  font-Weight:600;
  font-Size:15px;
`;
class DeductionModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isDown:false,
      comfirmList:"",
      errorLength:0,
      mouth:[moment(new Date()).format('YYYY-MM')],
      income_month:moment(new Date()).format('YYYY-MM'),
      topMonth:'',
      showSelect:false
    }
  }
  onChange = (val) => {
    this.setState({
      income_month:val
    })
    let param;
    if(this.props.allDeduction===true){
      param = {
        // area:this.props.values['area'],
        // fpdm:this.props.values['fpdm'],
        // fphm:this.props.values['fphm'],
        // xfmc:this.props.values['xfmc'],
        // rec_status:this.props.values['rec_status'],
        invoice_ids:this.props.selectedRowKeys+'',
        dedu_income_month:val,
      }
    }else{
      param = {
        invoice_ids:this.props.invoice_ids,
        dedu_income_month:val
      }
    }
    this.props.deductionConfirm(param,(res)=>{
      this.setState({comfirmList:res.data})
      let errorLength=0;
      for(let i in res.data.errors){
        errorLength+=Number(res.data.errors[i].count)
      }
      this.setState({errorLength})
    })
  }
  deduction = () => {
    const { invoice_ids, deductionFnc, clearState, getData, cancelModal, allDeduction, selectedRowKeys} = this.props;
    //const success_info = [];
    // for(let i in this.props.invoice_info){
    //   for(let j in this.state.comfirmList.success_ids){
    //     if(this.props.invoice_info[i].id === this.state.comfirmList.success_ids[j]){
    //       success_info.push({fphm:this.props.invoice_info[i].fphm,fpdm:this.props.invoice_info[i].fpdm})
    //     }
    //   }
    // }
    // const invoice_info = JSON.stringify(success_info);
    if(this.state.comfirmList.success_ids.length>0){
      let param;
      if(this.props.allDeduction === true){
        param = {
          // area:this.props.values['area'],
          // fpdm:this.props.values['fpdm'],
          // fphm:this.props.values['fphm'],
          // xfmc:this.props.values['xfmc'],
          // rec_status:this.props.values['rec_status'],
          invoice_ids:selectedRowKeys+'',
          dedu_income_month:this.state.income_month,
        }
      }else{
        const success_ids = this.state.comfirmList.success_ids+"";
        param = {
          invoice_ids:success_ids,
          //invoice_info:invoice_info,
          dedu_income_month:this.state.income_month,
        }
      }
      deductionFnc(param,()=>{
        clearState()
        getData()
        cancelModal()
      })
    }else{
      message.warning("选中发票无法进行认证")
    }
  }
  componentWillMount(){
    this.getPreMonth(moment(new Date()).format('YYYY-MM-DD'),()=>{
      if(this.props.allDeduction===true){
        this.setState({
          length:this.props.selectedRowKeys.length
        })
      }else{
        this.setState({
          length:this.props.length
        })
      }
      const param = {
        invoice_ids:this.props.selectedRowKeys+'',
        dedu_income_month:this.state.income_month,
      }
      this.props.deductionConfirm(param,(res)=>{
        this.setState({comfirmList:res.data})
        let errorLength=0;
        for(let i in res.data.errors){
          errorLength+=Number(res.data.errors[i].count)
        }
        this.setState({errorLength})
      })
    })
  }
  getPreMonth = (date,callback) => {  
      let arr = date.split('-');  
      let year = arr[0];
      let month = arr[1]; 
      let day = arr[2];  
      let days = new Date(year, month, 0);  
      days = days.getDate();  
      let year2 = year;  
      let month2 = parseInt(month) - 1;  
      if (month2 == 0) {  
          year2 = parseInt(year2) - 1;  
          month2 = 12;  
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
      let t2 = year2 + '-' + month2;
      this.setState({
        topMonth:t2,
        income_month:this.props.val === true ? moment(new Date()).format('YYYY-MM') : t2
      },()=>{
        callback();
      })
      if(moment(new Date()).format('DD')<=15){
        if(this.props.settingsList.is_declaration === true || this.props.val === true){
          this.setState({
            mouth:[moment(new Date()).format('YYYY-MM'),t2],
          })
        }else{
          this.setState({
            mouth:[t2,moment(new Date()).format('YYYY-MM')],
          })
        }
      }
  }
  render(){
    const { comfirmList } = this.state;
    return(
      <Modal title={<TitleSpan>{this.props.title}</TitleSpan>}
            style = {{top:100}}
            visible
            onCancel={()=>{this.props.cancelModal()}}
            maskClosable={false}
            footer={null}
      > 
        <div style={{overflow:"hidden",margin:'0 auto',width:"100%",textAlign:"left",fontSize:13,textAlign:'center'}}>
          <div>当前税款所属期为
          {
            this.state.showSelect === false ?
            <SignSpan>
              {
                this.props.val === true ?  
                <span>{moment(new Date()).format('YYYY-MM')}  <span onClick={()=>this.setState({showSelect:true})} style={{color:'#108ee9',cursor:'pointer'}}>更改</span></span>
                : 
                <span>{this.state.topMonth}  <span onClick={()=>this.setState({showSelect:true})} style={{color:'#108ee9',cursor:'pointer'}}>更改</span></span>
              }
            </SignSpan>
            :
            <Select defaultValue={this.state.mouth[0]} style={{marginLeft:10, width: 120 }} onChange={this.onChange}>
              {
                this.state.mouth.map((item,index)=>{
                  return <Select.Option key={Math.random()} value={item+""}>{item}</Select.Option>
                })
              }
            </Select>
          }
             ， 共勾选 
            <SignSpan>{this.state.length}</SignSpan> 张
          </div>
          <div>总金额：<SignSpan>{comfirmList.total_cost}</SignSpan>，税额：<SignSpan>{comfirmList.total_vat}</SignSpan></div>
        </div>
        <SigninDiv>
          <div>
            其中已签收发票 <SignSpan style={{color:'#35AEE3'}}>{comfirmList.rec_count}</SignSpan> 张，
            未签收 <SignSpan style={{color:'red'}}> {this.state.length-comfirmList.rec_count} </SignSpan>张
          </div>
        </SigninDiv>
        <SigninDiv>
          <div>
            其中可认证发票为 <SignSpan style={{color:'#35AEE3'}}>{comfirmList.dedu_count}</SignSpan> 张，
            总金额： <SignSpan> {comfirmList.total_dedu_cost} </SignSpan>，税额：<SignSpan>{comfirmList.total_dedu_vat}</SignSpan>
          </div>
        </SigninDiv>
        {
         this.state.errorLength>0 &&
        <SigninDiv style={{borderRadius:0}}>
            其中不可认证发票为 <SignSpan style={{color:'red'}}>{this.state.errorLength}</SignSpan> 张，
            总金额 <SignSpan> {(comfirmList.total_cost-comfirmList.total_dedu_cost).toFixed(2)} </SignSpan>，税额：<SignSpan>{(comfirmList.total_vat-comfirmList.total_dedu_vat).toFixed(2)}</SignSpan>
          <span>
            <Icon style={{float:"right",fontSize:18,fontWeight:600,cursor:'pointer',lineHeight:'30px',marginRight:15}} type={this.state.isDown===true?"down":'up'} onClick={()=>{this.setState({isDown:!this.state.isDown})}}/>
          </span>
        </SigninDiv>
        }
        <SigninDiv style={{position:'relative',
                      borderRadius:0,
                      marginTop:0,
                      height:this.state.isDown===false?0:40*this.state.comfirmList.errors.length,
                      transition:'all .2s ease'
                    }}>
            {
              this.state.comfirmList.errors&&this.state.comfirmList.errors.map((item)=>{
                return <div key={Math.random()} style={{marginTop:10}}>
                          {item.msg}:<SignSpan style={{color:'red'}}> {item.count} </SignSpan>张，
                          总金额：<SignSpan>{item.total_cost}</SignSpan>，税额：<SignSpan>{item.total_vat}</SignSpan>
                        </div>
              })
            }
        </SigninDiv>
        <p style={{margin:'15px 10px 15px 0'}}>认证后可前往认证结果查询页发票查看认证结果</p>
        <div style={{overflow:"hidden",margin:'0 auto',textAlign:'center'}}>
            <Button onClick={this.props.cancelModal} style={{marginRight:30}}>取消</Button>
            <Button type="primary" onClick={this.deduction}>确定</Button>
        </div>            
      </Modal>
    )
  }
}
export default DeductionModal;
