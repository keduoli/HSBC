import React from 'react'
import {Input,Modal,Button,message,Progress } from 'antd'
import styled from 'styled-components'
const CountSpan = styled.span`
  color: #49a9ee;
`;
const TextConDiv = styled.div`
  margin-top: 10px;
`;
const SuccessDiv = styled.div`
  margin: 10px 0;
  text-align:center;
`;
const TextConP = styled.p`
  margin-top:10px;
  font-size: 14px;
`;
const TextConDec = styled.p`
  font-size: 12px;
  margin-top: 10px;
  color: #a9a9a9;
`;
const Background = styled.p`
  display: inline-block;
  width:56px;
  height:56px;
  background:url(images/success.png) no-repeat;
  margin:0 auto 10px;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
class InvoiceExportModal extends React.Component{
  state={
    second:0,
    progress:0,
    showSucess:false,
    isTimeoutSuccess:false,
  }
  componentDidMount(){
    this.timer = setInterval(()=>this.tick(),1000);
    this.timer1 = setInterval(()=>this.progress(),1000);
  }
  componentWillUnmount(){
    clearInterval(this.timer);
    clearInterval(this.timer1);
  }
  tick = () => {
    const setState = this.setState.bind(this);
    const {second,progress}=this.state;
    const {isSucess} = this.props.state;
    let timeNum = second+1;
    if(isSucess){clearInterval(this.timer)}
    setState({second:timeNum});
  }
  progress = () =>{
    const setState = this.setState.bind(this);
    const {progress,second}=this.state;
    const {isSucess} = this.props.state;
    var num = 3;
    if(progress>=36){
      num=1;
    }
    if(progress>=66){
      num=3;
    }
    let peocessNum = progress+num;
    setState({progress:peocessNum});
    if(!isSucess&&peocessNum>=99){
      setTimeout(()=>{setState({progress:99});},3000)
    }
    if(isSucess){
      clearInterval(this.timer1);
      this.setState({progress:100});
    }
  }
  componentWillReceiveProps(next){
    if(next.state.isSucess===true){
      setTimeout(()=>{this.setState({isTimeoutSuccess:true})},1000)
    }
  }
  render(){
    const {closeModal,state,Allcount,exportFile,exportUrl} = this.props;
    const {second,progress,needTime} = this.state;
    return(
      <div>
        <Modal
          title={<TitleSpan>{state.isSucess?'数据导出成功':'数据导出中'}</TitleSpan>}
          visible
          closable={state.isSucess}
          onCancel={closeModal}
          maskClosable={false}
          footer={null}
          >
          {
              !this.state.isTimeoutSuccess&&<div>
                  <Progress
                    style={{marginTop:'30px'}}
                    percent={progress}
                    status="active" />
                  <TextConDiv>
                    共{Allcount}张，已导出<CountSpan>{Math.ceil(Allcount*(progress/100))}</CountSpan>张，已耗时{second}秒
                  </TextConDiv>
                </div>
          }
          {
             this.state.isTimeoutSuccess&&<SuccessDiv>
                  <Background/>
                  <TextConP>成功导出数据<CountSpan>{Allcount}</CountSpan>条，耗时<CountSpan>{second}秒</CountSpan></TextConP>
                  <TextConDec>如未下载可点击下载文件进行下载</TextConDec>
                  <Button style={{marginTop:'10px'}}
                          type="primary"
                          onClick={()=>{window.location.href=exportUrl.path}}
                          >下载文件</Button>
              </SuccessDiv>
          }
        </Modal>
      </div>
    )
  }
}
export default InvoiceExportModal;
