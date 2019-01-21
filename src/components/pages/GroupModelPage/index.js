import React from 'react'
import {ScanMask,ScanLoading,ManualInput,WaitScan,NavTitle } from 'components'
import {ScanSuccess,ScanError} from 'containers'
import {Button} from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router'

const ScanContent = styled.div`
  min-height:83vh;
  background:#F7FBFF;
  padding-bottom:10px;
`;
const GroupContent = styled.div`
  
`;
const TipCon = styled.div`
  padding:60px;
  text-align:center;
  background:#fff;
`;
const TipTitle = styled.p`
  font-size:16px;
  margin-bottom:30px;
`;
const TipText = styled.p`
  margin-bottom:40px;
`;
const Background = styled.div`
  width:56px;
  height:56px;
  background:url(images/error.png) no-repeat;
  margin:0 auto 20px;
`;
class GroupModelPage extends React.Component{
  state = {
    showMask:true,
    manual:true,
    scan:true,
    loading:false,
    scanSuccess:'',
    scanError:'',
    manualScanSuccess:'',
    manualScanError:'',
    showTip:'',
    showAgain:'',
    scanDiff:'',
    checkWay:'',
  };
  componentDidMount(){
    this.props.getUserList();
  };
  showScanFnc = () => {
    this.props.changeShowResult(true);
    this.setState({
      showMask:false,
      scan:true,
      manual:true,
      showAgain:'',
      scanSuccess:'',
      scanError:'',
      manualScanSuccess:'',
      manualScanError:'',
      showTip:'',
      checkWay:'scan',
    })
  };
  showManualFnc = () => {
    this.props.changeShowResult(true);
    this.setState({
      showMask:false,
      scan:true,
      manual:true,
      showAgain:'',
      scanSuccess:'',
      scanError:'',
      manualScanSuccess:'',
      manualScanError:'',
      showTip:'',
      checkWay:'manual',
    })
  };
  showLoadingFnc = () => {
    this.setState({
      scan:false,
      manual:false,
      loading:true,
      showAgain:'',
      scanSuccess:'',
      scanError:'',
      manualScanSuccess:'',
      manualScanError:'',
      showTip:'',
    })
  };
  showScanSuccess = (res) => {
    const {canShowResult} = this.props;
    if(!canShowResult){
      return;
    }
    this.setState({
      loading:false,
      scanSuccess:() =><ScanSuccess showScan={()=>{this.setState({scanSuccess:'',scan:true,manual:true})}}
                               scanData={res}
                               showGroup={true}
                               targetCity={this.props.targetCity}
                               getTargetCity={this.props.getTargetCity}
                               consortiumResult={this.props.consortiumResult}
                               getConsortiumShow={this.props.getConsortiumShow}
      />
    });
  };
  showManualSuccess = (res) => {
    if(!this.props.canShowResult){
      return;
    }
    this.setState({
      loading:false,
      manualScanSuccess:() =><ScanSuccess showScan={()=>{this.setState({manualScanSuccess:'',manual:true,scan:true})}}
                                     scanData={res}
                                     showGroup={true}
                                     targetCity={this.props.targetCity}
                                     getTargetCity={this.props.getTargetCity}
                                     consortiumResult={this.props.consortiumResult}
                               			 getConsortiumShow={this.props.getConsortiumShow}
      />
    });
  };
  showScanError = (res,msg) => {
    if(!this.props.canShowResult){
      return;
    }
    this.setState({
      loading:false,
      scanError:() =><ScanError showScan={()=>{this.setState({scanError:'',scan:true,manual:true})}}
                           scanData={res}
                           param={this.props.scanParam}
                           getTargetCity={this.props.getTargetCity}
                           showLoading={this.showLoadingFnc}
                           showScanSuccess={this.showScanSuccess}
                           scanAgainFnc={this.scanAgainFnc}
                           showScanError={this.showScanError}
                           showTips={this.showTipFnc}
                           invoiceCheck={this.props.invoiceCheck}
                           msg={msg}
                           showGroup={true}
                           targetCity={this.props.targetCity}
                           consortiumResult={this.props.consortiumResult}
                           getConsortiumShow={this.props.getConsortiumShow}
      />
    })
  };
  showManualError = (res,msg) => {
    if(!this.props.canShowResult){
      return;
    }
    this.setState({
      loading:false,
      manualScanError:() =><ScanError showScan={()=>{this.setState({manualScanError:'',manual:true,scan:true})}}
                                 scanData={res}
                                 getTargetCity={this.props.getTargetCity}
                                 param={this.props.manualParam}
                                 showLoading={this.showLoadingFnc}
                                 showScanSuccess={this.showManualSuccess}
                                 scanAgainFnc={this.manualAgainFnc}
                                 showScanError={this.showManualError}
                                 showTips={this.showTipFnc}
                                 invoiceCheck={this.props.manualCheck}
                                 msg={msg}
                                 showGroup={true}
                                 targetCity={this.props.targetCity}
	                               consortiumResult={this.props.consortiumResult}
	                               getConsortiumShow={this.props.getConsortiumShow}
      />
    })
  };
  showTipFnc = (text,type) => {
    if(!this.props.canShowResult){
      return;
    }
    this.setState({
      loading:false,
      showTip:<TipCon>
        <Background/>
        <TipTitle>错误提示</TipTitle>
        <TipText>
          {text}
        </TipText>
        <Button onClick={()=>{
          if(type){
            this.setState({showTip:'',manual:true,scan:true})
          }else{
            this.setState({showTip:'',scan:true,manual:true})
          }
        }}>返回录入</Button>
      </TipCon>
    });
  };
  scanAgainFnc = (res,msg) => {
    if(!this.props.canShowResult){
      return;
    }
    this.setState({
      loading:false,
      showAgain:()=><ScanSuccess scanData={res}
                             scanAgain={true}
                             showGroup={true}
                             msg={msg}
                             targetCity={this.props.targetCity}
                             getTargetCity={this.props.getTargetCity}
                             consortiumResult={this.props.consortiumResult}
                             getConsortiumShow={this.props.getConsortiumShow}
                             showScan={()=>{this.setState({showAgain:'',scan:true,manual:true})}}
      />
    });
  };
  manualAgainFnc = (res,msg) => {
    if(!this.props.canShowResult){
      return;
    }
    this.setState({
      loading:false,
      showAgain:()=><ScanSuccess scanData={res}
                             scanAgain={true}
                             showGroup={true}
                             msg={msg}
                             targetCity={this.props.targetCity}
                             getTargetCity={this.props.getTargetCity}
                             consortiumResult={this.props.consortiumResult}
                             getConsortiumShow={this.props.getConsortiumShow}
                             showScan={()=>{this.setState({showAgain:'',manual:true,scan:true})}}
      />
    });
  };
  backCheckFun = () => {
    const {checkWay} = this.state;
    this.props.changeShowResult(false);
    this.setState({loading:false,scan:true,manual:true,scanSuccess:"",scanError:"",manualScanSuccess:'',manualScanError:'',showTip:"",showAgain:"",scanDiff:""});
  };
  changeCanShow = () => {
    this.props.changeShowResult(true);
  };
  render(){
    return(
      <GroupContent>
      <NavTitle title='发票录入'/>
        <ScanContent>
          {this.state.manual && <ManualInput showScan={this.showScanFnc}
                                             showLoadingFnc={this.showLoadingFnc}
                                             showScanSuccess={this.showManualSuccess}
                                             showScanError={this.showManualError}
                                             showTips={this.showTipFnc}
                                             scanAgainFnc={this.manualAgainFnc}
                                             manualCheck={this.props.manualCheck}
                                             changeManual={this.props.changeManual}
                                             changeCanShow={this.changeCanShow}
                                             showGroup={true}
          />}
          {this.state.scan && <WaitScan showManual={this.showManualFnc}
          															showGroup={true}
                                        showLoading={this.showLoadingFnc}
                                        showScanSuccess={this.showScanSuccess}
                                        scanAgainFnc={this.scanAgainFnc}
                                        showScanError={this.showScanError}
                                        showTips={this.showTipFnc}
                                        changeContent={this.props.changeContent}
                                        invoiceCheck={this.props.invoiceCheck}
                                        changeCanShow={this.changeCanShow}
          />}
          {this.state.loading && <ScanLoading backCheckFun={this.backCheckFun}/>}
          {this.state.scanSuccess && this.state.scanSuccess()}
          {this.state.scanError && this.state.scanError()}
          {this.state.manualScanSuccess && this.state.manualScanSuccess()}
          {this.state.manualScanError && this.state.manualScanError()}
          {this.state.showTip}
          {this.state.showAgain && this.state.showAgain()}
          {this.state.scanDiff}
        </ScanContent>
      </GroupContent>
    )
  }
}
export default GroupModelPage;
