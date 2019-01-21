import React from 'react'
import {Input,Modal,Button,message,Checkbox } from 'antd'
import styled from 'styled-components'
const CheckboxGroup = Checkbox.Group;
const LabelSpan = styled.div`
  margin-right: 15px;
  width:25%;
  text-align:right;
  float:left;
  line-height:28px;
`;
const BtnConDiv = styled.div`
  margin-top: 30px;
  text-align: center;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
  text-align:center;
`;
class AddApiModal extends React.Component{
  state={apiValue:this.props.edit?this.props.record.ip:''}
  submit = () => {
    const apiValue = this.state.apiValue;
		if(apiValue === ""){
      message.warning('IP地址输入不能为空');return;
		}
    if(this.props.edit){
      this.props.editFnc({ip:apiValue,target_id:this.props.record.id},()=>{
        this.props.refreshData()
        this.props.closeModal()
      })
    }else{
      this.props.addFnc({ip:apiValue},() => {
        this.props.closeModal()
        this.props.refreshData()
      })
    }
  }
  render() {
    const { title,closeModal } = this.props;
    return(
      <div className="blacklist_modal_con">
        <Modal
          title={<TitleSpan>{title}</TitleSpan>}
          visible
          width={360}
          closable={false}
          footer={null}
          >
          <div style={{width:'100%',overflow:'hidden',textAlign: 'center'}}>
            <Input style={{width:'70%',margin:"0 auto"}}
                   value={this.state.apiValue}
                   onChange={(e)=>{
                     this.setState({apiValue:e.target.value})
                   }}
                   />
          </div>
          <BtnConDiv>
            <Button style={{marginRight:'20px'}} onClick={()=>{closeModal()}}>取消</Button>
            <Button type="primary" onClick={this.submit}>确定</Button>
          </BtnConDiv>
          </Modal>
      </div>
    )
  }
}
export default AddApiModal
