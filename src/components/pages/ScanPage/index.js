import React from 'react'
import {NavTitle,ScanMask,ScanLoading,ManualInput,WaitScan} from 'components'
import {ScanSuccess,ScanError} from 'containers'
import {Button,Icon} from 'antd'
import styled from 'styled-components'

const ScanContent = styled.div`
  min-height:83vh;
  background:#F7FBFF;
  padding-bottom:10px;
`;
const TipCon = styled.div`
  padding:60px;
  text-align:center;
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
  background:url(images/erroricon.png) no-repeat;
  margin:0 auto 20px;
`;
const ScrollWarp = styled.div`
  overflow:hidden;
  background:#FEE7E7;
  height:30px;
  line-height:30px;
  font-size:13px;
  color:#FA3838;
  transition: all .3s;
  position:absolute;
  width:90vw;
  left:0;
  top:4px;
  z-index:500;
`;
const ScrollCon = styled.div`
  position:absolute;
  transition: all .3s;
  left:0;
`;
class ScanPage extends React.Component{
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
    errorList:[]
  };
  componentWillMount(){
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
      scanSuccess:<ScanSuccess showScan={this.backCheckFun}
                               scanData={res}
      />
    });
  };
  showManualSuccess = (res) => {
    if(!this.props.canShowResult){
      return;
    }
    this.setState({
      loading:false,
      manualScanSuccess:<ScanSuccess showScan={this.backCheckFun}
                                     scanData={res}/>
    });
  };
  showScanError = (res,msg) => {
    if(!this.props.canShowResult){
      return;
    }
    this.setState({
      loading:false,
      scanError:<ScanError showScan={this.backCheckFun}
                           scanData={res}
                           param={this.props.scanParam}
                           showLoading={this.showLoadingFnc}
                           showScanSuccess={this.showScanSuccess}
                           scanAgainFnc={this.scanAgainFnc}
                           showScanError={this.showScanError}
                           showTips={this.showTipFnc}
                           invoiceCheck={this.props.invoiceCheck}
                           msg={msg}/>
    })
  };
  showManualError = (res,msg) => {
    if(!this.props.canShowResult){
      return;
    }
    this.setState({
      loading:false,
      manualScanError:<ScanError showScan={this.backCheckFun}
                                 scanData={res}
                                 param={this.props.manualParam}
                                 showLoading={this.showLoadingFnc}
                                 showScanSuccess={this.showManualSuccess}
                                 scanAgainFnc={this.manualAgainFnc}
                                 showScanError={this.showManualError}
                                 showTips={this.showTipFnc}
                                 invoiceCheck={this.props.manualCheck}
                                 msg={msg}
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
  scanAgainFnc = (res) => {
    if(!this.props.canShowResult){
      return;
    }
    this.setState({
      loading:false,
      showAgain:<ScanSuccess scanData={res}
                             scanAgain={true}
                             showScan={this.backCheckFun}
      />
    });
  };
  manualAgainFnc = (res) => {
    if(!this.props.canShowResult){
      return;
    }
    this.setState({
      loading:false,
      showAgain:<ScanSuccess scanData={res}
                             scanAgain={true}
                             showScan={this.backCheckFun}
      />
    });
  };
  backCheckFun = () => {
    this.props.changeShowResult(false);
    this.setState({
      loading:false,
      scan:true,
      manual:true,
      scanSuccess:'',
      scanError:'',
      manualScanSuccess:'',
      manualScanError:'',
      showTip:'',
      showAgain:'',
      scanDiff:''
    });
  };
  changeCanShow = () => {
    this.props.changeShowResult(true);
  };
  render(){
    return(
      <div>
        {
          this.state.errorList && this.state.errorList.length>0 &&
          <ScrollWarp id='scroll-warp'>
            <ScrollCon id='scroll-con' style={{width:620*this.state.errorList.length}}>
              {
                this.state.errorList.map((item)=>{
                  return <div key={item.id} style={{float:'left',paddingLeft:20,width:600}}><Icon type="sound" style={{marginRight:8}}/>{item.message}</div>
                })
              }
            </ScrollCon>
          </ScrollWarp>
        }
        <NavTitle submeun="扫描录入"
                  title='发票录入'/>
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
          />}
          {this.state.scan && <WaitScan showManual={this.showManualFnc}
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
          {this.state.scanSuccess}
          {this.state.scanError}
          {this.state.manualScanSuccess}
          {this.state.manualScanError}
          {this.state.showTip}
          {this.state.showAgain}
          {this.state.scanDiff}
        </ScanContent>
      </div>
    )
  }
}
export default ScanPage;
