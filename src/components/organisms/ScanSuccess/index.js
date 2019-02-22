import React from 'react'
import styled from 'styled-components'
import {InvoiceAttached,GroupAttached,Invoices,ExpandAttach,PictureScaleModal,VehicleInvoice,TollInvoice,UsedCarInvoice} from 'components'

const SuccessCon = styled.div`
  padding:10px;
  overflow:hidden;
  background:#F7FBFF;
`;
const SuccessTitle = styled.p`
  font-size:14px;
  margin-bottom:50px;
  text-align:center;
  float:left;
  margin-top: -10px;
`;
const InvoiceCons = styled.div`
  margin:0 auto;
  font-size:12px;
`;
const InvoiceLeft = styled.div`
  float:left;
  width:68%;
  margin-bottom:50px;
  background:#fff;
  overflow:hidden;
`;
const InvoiceRight = styled.div`
  float:left;
  width:30%;
  background:#fff;
  margin-left:2%;
`;
const Background = styled.div`
  width:45px;
  height:45px;
  background:url(images/succicon.png) no-repeat;
  float:left;
  margin:10px;
  margin-top:20px;
`;
const ScanAgain = styled.div`
  width:45px;
  height:45px;
  background:url(images/erroricon.png) no-repeat;
  float:left;
  margin:10px;
  margin-top:20px;
`;
const SuccTi = styled.div`
  height:110px;
  line-height:110px;
`;
class ScanSuccess extends React.Component{
  state = {
    showPicScale:'',
  };
  componentWillMount(){
    this.props.getCustomerList()
  }
  render(){
    const {showScan,navList,saveScan,formSaveScan,departUserList,customerList,drawdownList,contractList,getDrawdownList,getContractList} = this.props;
    const scanData = this.props.scanData.invoice;
    const {id} = this.props.scanData;
    scanData.invoice_details = this.props.scanData.invoice_detail;
    return(
      <SuccessCon>
        <InvoiceCons>
          <InvoiceLeft>
            {
              (scanData.fpzl== '04' || scanData.fpzl== '10' || scanData.fpzl== '01' || scanData.fpzl== '11') &&
              <Invoices scanData={scanData}/>
            }
            {
              scanData.fpzl=== '03' &&
              <VehicleInvoice scanData={scanData}/>
            }
            {
              scanData.fpzl === '14' &&
              <TollInvoice deduction={false} scanData={scanData}/>
            }
            {
              scanData.fpzl === '15' &&
              <UsedCarInvoice deduction={false} scanData={scanData}/>
            }
          </InvoiceLeft>
          <InvoiceRight>
            <SuccTi>
              <div style={{width:140,margin:'10px auto',overflow:'hidden'}}>
                {
                  this.props.scanAgain ? <ScanAgain/>:<Background/>
                }
                <SuccessTitle>{this.props.scanAgain?<span style={{fontSize:14,color:'#FF7E7E'}}>重复录入</span>:<span style={{fontSize:14,color:'#2397CA'}}>查验成功</span>}</SuccessTitle>
              </div>
            </SuccTi>
            {
              this.props.scanAgain ?
                <ExpandAttach detailList={scanData}
                              scanAgain={this.props.scanAgain}
                              showScan={showScan}
                              showGroup={this.props.showGroup}
                              navList={navList}
                              memoEdit={false}
                              id={id}
                              showRepeat={false}
                              res={this.props.res?this.props.res:''}
                              msg={this.props.msg}
                              targetCity={this.props.targetCity}
                              getTargetCity={this.props.getTargetCity}
                              showScaleFnc={this.picScaleFnc}
                />
                : 
                <InvoiceAttached showScan={showScan}
                                 scanData={scanData}
                                 navList={navList}
                                 saveScan={saveScan}
                                 id={id}
                                 getDrawdownList={getDrawdownList}
                                 getContractList={getContractList}
                                 customerList={customerList}
                                 drawdownList={drawdownList}
                                 contractList={contractList}
                                 memo={this.props.memo}
                                 state={this.props.state}
                                 checkList={this.props.checkList}
                                 changeSucState={this.props.changeSucState}
                                 formSaveScan={formSaveScan}
                                 departUserList={departUserList}
                                 scanAgain={this.props.scanAgain}
                />
            }
          </InvoiceRight>
        </InvoiceCons>
        {this.state.showPicScale}
      </SuccessCon>
    )
  }
  picScaleFnc = (res) => {
    const result = res.filter((obj)=>obj.thumb_path !== "");
    this.setState({
      showPicScale:<PictureScaleModal onCancel={()=>{this.setState({showPicScale:''})}}
                                      items={result}/>})
  };
}

export default ScanSuccess;


