import React from 'react'
import {Input,Form,Button,Modal,message,Icon,DatePicker,Select,Radio} from 'antd'
import styled from 'styled-components'
import moment from 'moment';
const RadioGroup = Radio.Group;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const RedSpan = styled.span`
  color:#ff7e7e;
  font-weight:600;
`;
const HeaderCon = styled.div`
  margin-bottom:30px;
  margin-left: 30px;
`;
const RadioCon = styled.div`
  margin-left: 30px;
`;
class DeclareModal extends React.Component{
  state = {
    topMonth:'',
    value:false,
    setMonth:''
  }
  componentWillMount(){
    this.getPreMonth(moment(new Date()).format('YYYY-MM-DD'))
  }
  getPreMonth = (date) => {  
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
    this.setState({topMonth:t2,setMonth:t2})
  }
  onChange = (e) => {
    this.setState({value:e.target.value},()=>{
      if(e.target.value === false){
        this.setState({})
      }else{
        this.setState({setMonth:moment(new Date()).format('YYYY-MM')})
      }
    })
  }
  setDeclaration = () => {
    this.props.settingsFnc({is_declaration:this.state.value},()=>{
      this.props.settingsGet(()=>{
        this.props.deduction(this.state.value)
      })
    })
  }
  render(){
    return(
      <Modal title={<TitleSpan>提示</TitleSpan>}
             style = {{top:100,}}
             visible
             width={400}
             onCancel={()=>{this.props.cancelModal()}}
             maskClosable={false}
             footer={null}>
        <HeaderCon>
          请您选择是否已完成税款所属期 <RedSpan>{this.state.topMonth}</RedSpan> 的增值税申报工作
        </HeaderCon>
        <RadioCon>
          <RadioGroup onChange={this.onChange} value={this.state.value}>
            <Radio value={false}>未完成申报</Radio>
            <div style={{margin:'10px 0 20px 0'}}>可以继续完成税款所属期 {this.state.topMonth} 的认证</div>
            <Radio value={true}>已完成申报</Radio>
            <div style={{margin:'10px 0 20px 0'}}>可以继续完成税款所属期 {moment(new Date()).format('YYYY-MM')} 的认证</div>
          </RadioGroup>
        </RadioCon>
        <div style={{overflow:"hidden",margin:'0 auto',textAlign:'center'}}>
            <Button onClick={this.props.cancelModal} style={{marginRight:30}}>取消</Button>
            <Button type="primary" onClick={this.setDeclaration}>确定</Button>
        </div>  
      </Modal>
    )
  }
}

export default DeclareModal; 