import React from 'react'
import {Button,Modal,message,Icon  } from 'antd'
import styled from 'styled-components'

const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const SetTitle = styled.p`
  font-size:12px;
  font-weight:600;
`;
const SetCon = styled.div`
  margin:10px 0 40px 0;
`;
const SetSpan = styled.span`
  background:#2397CA;
  color:#fff;
  font-size:12px;
  display:inline-block;
  padding:3px 5px;
  border-radius:2px;
  margin:0 10px 10px 0;
  cursor:pointer;
`;
const NoSetSpan = styled.span`
  color:#2397CA;
  font-size:12px;
  display:inline-block;
  border:1px solid #2397CA;
  padding:3px 5px;
  border-radius:2px;
  margin:0 10px 10px 0;
  cursor:pointer;
`;
class SetExportModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      useList:this.props.useList,
      hideList:this.props.hideList
    }
  }
  handleHide = (e) => {
    for(let i in this.state.useList){
        if(this.state.useList[i].id == e.target.id){
            let sor = this.state.hideList;
            sor.push(this.state.useList[i]);
            let arr = this.state.useList;
            arr.splice(i,1);
            this.setState({
                useList : arr,
                hideList : sor
            })
        }
    }
	}
	handleShow = (e) => {
			for(let i in this.state.hideList){
					if(this.state.hideList[i].id == e.target.id){
							let arr = this.state.useList;
							arr.push(this.state.hideList[i]);
							let sor = this.state.hideList;
							sor.splice(i,1);
							this.setState({
									useList : arr,
									hideList : sor
							})
					}
			}
  }
  handleSet = () => {
    const { useList,hideList } = this.state;
    this.props.setItem(useList);
  }
  render(){
    return(
      <Modal title={<TitleSpan>设置导出字段</TitleSpan>}
            style = {{top:100}}
            visible
            width={700}
            onCancel={()=>{this.props.cancel()}}
            maskClosable={false}
            footer={null}
      > 
        <div style={{margin:'0 20px'}}>
          <SetTitle>点击取消选择你不需要的导出字段</SetTitle>
          <SetCon>
            {
              this.state.useList.map((item)=>{
                return <SetSpan id={item.id} onClick={this.handleHide} key={item.id}>{item.name}</SetSpan>
              })
            }
          </SetCon>
          <SetTitle>点击选择你需要的导出的字段</SetTitle>
          <SetCon>
            {
              this.state.hideList.map((item)=>{
                return <NoSetSpan id={item.id} onClick={this.handleShow} key={item.id}>{item.name}</NoSetSpan>
              })
            }
          </SetCon>
        </div>
        <div style={{overflow:"hidden",margin:'0 auto',textAlign:'center'}}>
            <Button style={{marginRight:30}} onClick={()=>this.props.cancel()}>取消</Button>
            <Button type="primary" onClick={this.handleSet}>确定</Button>
        </div>            
      </Modal>
    )
  }
}
export default SetExportModal;
