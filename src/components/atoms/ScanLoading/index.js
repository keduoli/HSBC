import React from 'react';
import styled from 'styled-components';
import {Button} from 'antd';

const ScanLoadDiv = styled.div`
  width:128px;
  height:128px;
  margin:0 auto 20px;
  background:url(images/scan-load.gif) no-repeat;
`;
class ScanLoading extends React.Component{
  constructor(prop){
    super(prop);
    this.state={
      date:300,
    };
    this.timer = '';
  }
  componentDidMount(){
    let t = 300;
    this.timer = setInterval(()=>{
      t--;
      if(t === 0){
        clearInterval(this.timer);
        this.timer = null;
      }else{
        this.setState({date:t});
      }
    },1000);
  };
  componentWillUnmount(){
    clearInterval(this.timer);
    this.timer = null;
  }
  cancelFun = () => {
    this.props.backCheckFun();
  };
  render(){
    return(
      <div style={{paddingTop:'100px',textAlign:'center',fontSize:18,lineHeight:2,background:"#fff",height:"70vh"}}>
        <ScanLoadDiv/>
        <p style={{marginBottom:20}}>发票查验中，预计等待{this.state.date}s...</p>
        <p><Button onClick={this.cancelFun}>取消查验</Button></p>
      </div>
    )
  }
}
export default ScanLoading;
