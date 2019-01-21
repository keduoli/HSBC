import React from 'react'
import styled from 'styled-components'
import {Invoices,InvoiceError,InvoiceAttached,ExpandAttach,VehicleInvoice,UsedCarInvoice} from 'components'
import {Modal} from 'antd'

const ExpandCons = styled.div`
  overflow:hidden;
  padding:13px;
  font-size:12px;
`;
const InvoiceLeft = styled.div`
  width:70%;
`;
const InvoiceRight = styled.div`
  width:30%;
`;
const ErrorBackground = styled.p`
  width:56px;
  height:56px;
  background:url(images/error.png) no-repeat;
  margin:10px auto 20px;
`;
const ReasonCon = styled.div`
  color:red;
  font-size:12px;
  line-height:16px;
  margin:15px 0 30px 0;
  overflow:hidden;
`;
class WaitInvoiceHandle extends React.Component{
  state = {
    showPicScale:'',
    reason:[],
    checkList:[]
  };
  picScaleFnc = (res) => {
    const result = res.filter((obj)=>obj.thumb_path !== "");
    this.setState({
      showPicScale:<PictureScaleModal onCancel={()=>{this.setState({showPicScale:''})}}
                                      items={result}
      />})
  };
  componentWillMount(){
    if(this.props.tag_ids){
      let arr = [];
      let sor = this.props.tag_ids.split(",");
      for(let i in sor){
        arr.push(Number(sor[i]))
      }
      this.setState({checkList:arr})
    }
    const {detailList} = this.props;
    if(detailList.reason && detailList.reason!==''){
      let reason = detailList.reason.split(";")
      this.setState({reason:reason})
    }
  }
  render(){
    const {detailList,msg,departUserList,navList,saveScan,formSaveScan,cancelFnc,imageId,deleteWaitInvoice,showSuccess,showError,goCheck,waitParam} = this.props;
    return(
      <Modal style={{top:100}}
             visible
             key={detailList.invoice_id}
             onCancel={this.props.cancelFnc}
             width={1200}
             footer={null}
      >
        <ExpandCons>
          {
            (this.props.scanAgain || (!detailList.xfmc && !detailList.is_car) || (!detailList.xhdwmc && detailList.is_car > 0)) &&
            <div><ErrorBackground/>
            <p style={{textAlign:'center'}}>{msg}</p>
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
          </div>
          }
          <div style={{display:'flex',overflow:'hidden'}}>
            <InvoiceLeft>
              {
                (detailList.fpzl=== '04' || detailList.fpzl=== '10' || detailList.fpzl=== '01' || detailList.fpzl=== '11') &&
                <Invoices navList={navList} scanData={detailList}/>
              }
              {
                detailList.fpzl=== '03' &&
                <VehicleInvoice scanData={detailList}/>
              }
              {
                (!detailList.fpzl=== '03' || detailList.fpzl === '') &&
                <InvoiceError scanData={detailList}/>
              }
              {
                detailList.fpzl === '14' &&
                <TollInvoice deduction={false} scanData={detailList}/>
              }
              {
                detailList.fpzl === '15' &&
                <UsedCarInvoice deduction={false} scanData={detailList}/>
              }
            </InvoiceLeft>
            <InvoiceRight>
              {
                this.props.scanAgain ?
                  <ExpandAttach detailList={detailList}
                                scanAgain={this.props.scanAgain}
                                showScan={deleteWaitInvoice}
                                navList={navList}
                                res=''
                                showRepeat={false}
                                showScaleFnc={this.picScaleFnc}
                  />
                  :
                  <InvoiceAttached scanData={detailList}
                                   navList={navList}
                                   goBack={this.props.goBack}
                                   imageId={imageId}
                                   memo={this.props.memo}
                                   checkList={this.state.checkList}
                                   waitConfirm={true}
                                   saveScan={saveScan}
                                   scanError={!detailList.xfmc}
                                   formSaveScan={formSaveScan}
                                   departUserList={departUserList}
                                   showScan={cancelFnc}
                                   deleteWaitInvoice={deleteWaitInvoice}
                                   ocrCheckSecond={goCheck}
                                   param={waitParam}
                                   showScanSuccess={showSuccess}
                                   showScanError={showError}
                  />
              }
            </InvoiceRight>
          </div>
        </ExpandCons>
      </Modal>
    )
  }
}

export default WaitInvoiceHandle;
