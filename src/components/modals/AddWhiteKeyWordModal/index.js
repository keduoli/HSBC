import React from 'react'
import {Input,Modal,Button,message,Checkbox } from 'antd'
import styled from 'styled-components'
const CheckboxGroup = Checkbox.Group;
const LabelSpan = styled.div`
  margin-right: 15px;
  width:20%;
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
class AddWhiteKeyWordModal extends React.Component{
  state={keyWordVal:''}
  componentDidMount(){
    if(!this.props.isadd){
      this.setState({keyWordVal:this.props.record.hwmc})
    }
  }
  submit = () => {
    const {checkList,keyWordVal} = this.state;
    const {record,isadd,addkeyword,editkeyword} = this.props;
    if(keyWordVal.length>32){
      message.warning("关键词字数不能超过"+this.props.limit+"个");return;
    }
    if(isadd){
      addkeyword(keyWordVal);
    }else{
      editkeyword(record.id,keyWordVal)
    }
  }
  render() {
    const { title,closeModal,record,isadd,keys,place } = this.props;
    return(
      <div className="blacklist_modal_con">
        <Modal
          title={<TitleSpan>{title}</TitleSpan>}
          visible
          width={360}
          closable={false}
          footer={null}
          >
          <div>
            <LabelSpan>{keys}</LabelSpan>
            <Input style={{width:'70%',display:'inline-block',margin:"0 auto"}}
                   placeholder={place}
                   defaultValue={!isadd?record.hwmc:''}
                   ref={ref=>this.input=ref}
                   onChange={(e)=>{
                     const len = e.target.value.length
                     this.setState({keyWordVal:e.target.value})
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
export default AddWhiteKeyWordModal
