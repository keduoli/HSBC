import React from 'react'
import {NavTitle,ScanLoading,WaitScan,WarningRight} from 'components'
import {ScanSuccess,ScanError} from 'containers'
import {Button} from 'antd'
import styled from 'styled-components'

const ScanContent = styled.div`
  min-height:77vh;
  margin-right:20px;
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
const BeginDiv = styled.div`
  padding:10px 0;
  width:200px;
  border-radius:25px;
  background:rgba(0,0,0,.5);
  color:#fff;
  position:fixed;
  font-size:16px;
  left:0;
  right:0;
  bottom:20px;
  margin:auto;
  text-align:center;
`;
class SuccessivePage extends React.Component{
  state = {
    scan:true,
    loading:false,
    scanSuccess:'',
    scanError:'',
    showTip:'',
    showAgain:'',
    scanDiff:'',
    canSuccessive:true,
    showBegin:true,
    memo:'',
    cusId:null,
    conId:null,
    ddId:null,
    checkList:[]
  };
  componentDidMount(){
    
  };
  showScanFnc = () => {
    this.setState({
      scan:true,
      showAgain:'',
      scanSuccess:'',
      scanError:'',
      showTip:'',
    })
  };
  showLoadingFnc = () => {
    this.setState({
      scan:false,
      loading:true,
      showAgain:'',
      scanSuccess:'',
      scanError:'',
      showTip:'',
    })
  };
  componentWillMount(){
    this.props.getCustomerList()
  }
  showScanSuccess = (res) => {
    const {saveScan} = this.props;
    if(!this.props.canContinuation){
      return;
    }
    this.setState({
      loading:false,
      scanSuccess:<div>
                    <ScanSuccess showScan={()=>{this.setState({scanSuccess:'',scan:true})}}
                                 scanData={res}
                                 memo={this.state.memo}
                                 state={this.state}
                                 checkList={this.state.checkList}
                                 getDrawdownList={this.props.getDrawdownList}
                                 getContractList={this.props.getContractList}
                                 customerList={this.props.customerList}
                                 drawdownList={this.props.drawdownList}
                                 contractList={this.props.contractList}
                                 getCustomerList={this.props.getCustomerList}
                                 changeSucState={()=>{this.setState({canSuccessive:true})}}
                    />
                    <BeginDiv>按“空格”键暂停或继续</BeginDiv>
                  </div>
    },()=>{
      console.log('1')
      document.onkeydown = (e)=>{
        if(e.keyCode === 32){
          if(this.state.canSuccessive){
            this.setState({canSuccessive:false,showBegin:false});
            return null;
          }else{
            this.setState({canSuccessive:true});
            document.onkeydown = null;
            const param = {
              id:res.id,
              memo:this.state.memo,
              ddId:this.state.ddId,
              cusId:this.state.cusId,
              conId:this.state.conId,
            };
            saveScan(param,()=>this.setState({scanSuccess:'',scan:true}))
          }
        }
      };
      setTimeout(()=>{
        if(this.state.canSuccessive){
          const param = {
            id:res.id,
            memo:this.state.memo,
            ddId:this.state.ddId,
            cusId:this.state.cusId,
            conId:this.state.conId,
          };
          saveScan(param,()=>this.setState({scanSuccess:'',scan:true}))
        }
      },1000);
    });
  };
  showScanError = (res,msg) => {
    if(!this.props.canContinuation){
      return;
    }
    const {saveScan} = this.props;
    this.setState({
      loading:false,
      scanError:<div>
                  <ScanError showScan={()=>{this.setState({scanError:'',scan:true})}}
                             scanData={res}
                             changeSucState={()=>{this.setState({canSuccessive:true})}}
                             containuation={true}
                             msg={msg}
                             getDrawdownList={this.props.getDrawdownList}
                             getContractList={this.props.getContractList}
                             customerList={this.props.customerList}
                             drawdownList={this.props.drawdownList}
                             contractList={this.props.contractList}
                             getCustomerList={this.props.getCustomerList}
                             state={this.state}
                  />
                  <BeginDiv>按“空格”键暂停或继续</BeginDiv>
                </div>
    },()=>{
      document.onkeydown = (e)=>{
        if(e.keyCode === 32){
          if(this.state.canSuccessive){
            this.setState({canSuccessive:false,showBegin:false});
            return null;
          }else{
            this.setState({canSuccessive:true});
            document.onkeydown = null;
            const param = {
              id:res.id,
              memo:this.state.memo,
              ddId:this.state.ddId,
              cusId:this.state.cusId,
              conId:this.state.conId,
            };
            saveScan(param,()=>this.setState({scanError:'',scan:true}))
          }
        }
      };
      setTimeout(()=>{
        if(this.state.canSuccessive){
          const param = {
            id:res.id,
            memo:this.state.memo,
            ddId:this.state.ddId,
            cusId:this.state.cusId,
            conId:this.state.conId,
          };
          saveScan(param,()=>this.setState({scanError:'',scan:true}))
        }
      },1000);
    })
  };
  showTipFnc = (text) => {
    if(!this.props.canContinuation){
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
          this.setState({showTip:'',scan:true});
        }}>返回录入</Button>
      </TipCon>
    },()=>{
      setTimeout(() => {
        this.setState({showTip:'',scan:true});
      },1000);
    });
  };
  scanAgainFnc = (res) => {
    if(!this.props.canContinuation){
      return;
    }
    this.setState({
      loading:false,
      showAgain:<ScanSuccess scanData={res}
                             scanAgain={true}
                             getDrawdownList={this.props.getDrawdownList}
                             getContractList={this.props.getContractList}
                             customerList={this.props.customerList}
                             drawdownList={this.props.drawdownList}
                             contractList={this.props.contractList}
                             getCustomerList={this.props.getCustomerList}
                             showScan={()=>{this.setState({showAgain:'',scan:true})}}
      />
    },()=>{
      setTimeout(() => {
        this.setState({showAgain:'',scan:true});
      },1000);
    });
  };
  changeCanShow = () => {
    this.props.changeContinuation(true);
  };
  backCheckFun = () => {
    this.props.changeContinuation(false);
    this.setState({loading:false,scan:true});
  };
  render(){
    const { getDrawdownList,getContractList,customerList,drawdownList,contractList } = this.props;
    return(
      <div>
        <NavTitle submeun="连续扫描"
                  title="发票录入"/>
        <ScanContent style={{borderLeft:'3px solid #2397CA'}}>
          {this.state.scan && <WaitScan showLoading={this.showLoadingFnc}
                                        successive={true}
                                        showScanSuccess={this.showScanSuccess}
                                        scanAgainFnc={this.scanAgainFnc}
                                        showScanError={this.showScanError}
                                        showTips={this.showTipFnc}
                                        invoiceCheck={this.props.invoiceCheck}
                                        changeCanShow={this.changeCanShow}
          />}
          {this.state.scan && <WarningRight navList={this.props.navList}
                                            memo={this.state.memo}
                                            cusId={this.state.cusId}
                                            conId={this.state.conId}
                                            ddId={this.state.ddId}
                                            getDrawdownList={getDrawdownList}
                                            getContractList={getContractList}
                                            customerList={customerList}
                                            drawdownList={drawdownList}
                                            contractList={contractList}
                                            checkList={this.state.checkList}
                                            setMemo={(val)=>this.setState({memo:val})}
                                            setCusId={(val)=>this.setState({cusId:val})}
                                            setConId={(val)=>this.setState({conId:val})}
                                            setDdId={(val)=>this.setState({ddId:val})}
                                            setCheckbox={(val)=>this.setState({checkList:val})}/>}
          {this.state.loading && <ScanLoading backCheckFun={this.backCheckFun}/>}
          {this.state.scanSuccess}
          {this.state.scanError}
          {this.state.showTip}
          {this.state.showAgain}
          {this.state.scanDiff}
        </ScanContent>
      </div>
    )
  }
}
export default SuccessivePage;
