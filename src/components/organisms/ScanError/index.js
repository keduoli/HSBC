import React from 'react'
import styled from 'styled-components'
import {InvoiceAttached,GroupAttached,Invoices,InvoiceError} from 'components'

const ErrorCon = styled.div`
  padding:20px;
`;
const ErrorTitle = styled.p`
  font-size:15px;
  margin-bottom:20px;
  text-align:center;
`;
const ErrorLeft = styled.div`
  float:left;
  width:70%;
`;
const ErrorRight = styled.div`
  float:left;
  width:30%;
  padding-left:15px;
`;
const Backgrounds = styled.div`
  width:56px;
  height:56px;
  background:url(images/error.png) no-repeat;
  margin:0 auto 20px;
`;
const ReasonCon = styled.div`
  color:red;
  font-size:12px;
  line-height:16px;
  margin:15px 0 30px 0;
  overflow:hidden;
`;
class ScanError extends React.Component{
  state={
    reason:[]
  }
  componentWillMount(){
    const {scanData} = this.props;
    if(scanData.reason && scanData.reason!==''){
      let reason = scanData.reason.split(";")
      this.setState({reason:reason})
    }
  }
  render(){
    const {saveScan,formSaveScan,scanData,navList,departUserList,msg} = this.props;
    return(
      <ErrorCon>
        <Backgrounds/>
        <ErrorTitle>{msg}</ErrorTitle>
        {
          this.state.reason.length>0 &&
          <ReasonCon>
            <div style={{float:'left',width:'43%',textAlign:'right'}}>可能原因：</div>
            <div style={{float:'left',width:'50%'}}>
              {
                this.state.reason.length === 1 ?
                this.state.reason.map((item,index)=>{
                  return <div key={index+1}>{item}</div>
                })
                :
                this.state.reason.map((item,index)=>{
                  return <div key={index+1}>{index+1}.{item}</div>
                })
              }
            </div>
          </ReasonCon>
        }
        <div style={{overflow:'hidden',width:'70rem',margin:'0 auto',fontSize:12}}>
          <ErrorLeft>
            <InvoiceError scanData={scanData}/>
          </ErrorLeft>
          <ErrorRight>
              <InvoiceAttached showScan={this.props.showScan}
	                             navList={navList}
	                             showGroup={this.props.showGroup}
	                             getTargetCity={this.props.getTargetCity}
	                             scanData={scanData}
                               saveScan={saveScan}
                               scanError={true}
                               msg={msg}
	                             containuation={this.props.containuation}
	                             changeSucState={this.props.changeSucState}
	                             formSaveScan={formSaveScan}
	                             {...this.props}
	                             departUserList={departUserList}
            />
          </ErrorRight>
        </div>
      </ErrorCon>
    )
  }
}

export default ScanError;
