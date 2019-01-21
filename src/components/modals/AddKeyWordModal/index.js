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
class AddKeyWordModal extends React.Component{
  state={keyWordVal:'',companyList:[],checkList:'',companyList2:[]}
  componentDidMount(){
    if(!this.props.isadd){
      this.setState({keyWordVal:this.props.record.hwmc})
      const arr2 = [];
      for(let i in this.props.record.companys){
        arr2.push(this.props.record.companys[i].id)
      }
      this.setState({companyList2:arr2,checkList:arr2+""})
    }
    
    const companyList = this.props.navList.son_company;
    const arr = []
    for(let i in companyList){
      arr.push({
        label:companyList[i].name,
        value:companyList[i].id,
      })
    }
    this.setState({companyList:arr})
  }
  checkOnchange = (checkList) => {
    this.setState({checkList:checkList+""})
  }
  submit = () => {
    const {checkList,keyWordVal} = this.state;
    const {record,isadd,addkeyword,editkeyword} = this.props;
    if(keyWordVal.length>this.props.limit){
      message.warning("关键词字数不能超过"+this.props.limit+"个");return;
    }
    if(isadd){
      addkeyword(keyWordVal,checkList);
    }else{
      editkeyword(record.id,keyWordVal,checkList)
    }
  }
  render() {
    const { title,closeModal,record,isadd,keys,place,navList } = this.props;
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
                     const len = e.target.value.length;
                     this.setState({keyWordVal:e.target.value})
                   }}
                   />
          </div>
          {
            navList.plugin.consortium===true&& this.props.navList.company_id === this.props.navList.root_company[0].id?
            <div style={{marginTop:20,overflow:'hidden'}} className='modal_check'>
              <div style={{float:'left',overflow:'hidden',width:"25%",textAlign:'right',marginRight:18}}>应用于子公司</div>
              <div style={{float:'left',overflow:'hidden',width:"60%"}}>
                {
                  this.state.companyList.length>0 && 
                  <CheckboxGroup options={this.state.companyList} defaultValue={!isadd?this.state.companyList2:[]} onChange={this.checkOnchange}/>
                }
              </div>
            </div>
            :
            ""
          }
          <BtnConDiv>
            <Button style={{marginRight:'20px'}} onClick={()=>{closeModal()}}>取消</Button>
            <Button type="primary" onClick={this.submit}>确定</Button>
          </BtnConDiv>
          </Modal>
      </div>
    )
  }
}
export default AddKeyWordModal
