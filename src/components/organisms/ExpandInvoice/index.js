import React from 'react'
import styled from 'styled-components'
import {Invoices,ExpandAttach,InvoiceError,VehicleInvoice,TollInvoice,UsedCarInvoice} from 'components'
import {Modal} from 'antd'

const ExpandCons = styled.div`
  overflow:hidden;
  padding:13px;
  font-size:12px;
`;
const InvoiceLeft = styled.div`
  width:75%;
`;
const InvoiceRight = styled.div`
  width:25%;
  padding-left:15px;
`;
class ExpandInvoice extends React.Component{
  render(){
    const {detailList,showScaleFnc,invMemoFnc,memoEdit,refreshData,noMemo,navList} = this.props;
    return(
      <Modal style = {{top:100}}
             visible
             onCancel={this.props.cancelFnc}
             width={'75%'}
             footer={null}
      >
        <ExpandCons>
          {
            ((!detailList.xfmc && !detailList.is_car) || (!detailList.xhdwmc && detailList.is_car > 0)) &&
              <p style={{textAlign:'center'}}>{detailList.err_reason}</p>
          }
          <div style={{display:'flex',overflow:'hidden'}}>
            <InvoiceLeft>
              {
                (detailList.fpzl== '04' || detailList.fpzl== '10'|| detailList.fpzl== '98'|| detailList.fpzl== '99' || detailList.fpzl== '01' || detailList.fpzl== '11') &&
                <Invoices navList={navList} scanData={detailList} print={true}/>
              }
              {
                detailList.fpzl===null && <InvoiceError scanData={detailList}/>
              }
              {
                detailList.fpzl=== '03' &&
                <VehicleInvoice scanData={detailList} print={true}/>
              }
              {
                detailList.fpzl=== '14' && 
                <TollInvoice deduction={false} scanData={detailList} print={true}/>
              }
              {
                detailList.fpzl=== '15' && 
                <UsedCarInvoice deduction={false} scanData={detailList} print={true}/>
              }
            </InvoiceLeft>
            <InvoiceRight>
              <ExpandAttach detailList={detailList}
                            noMemo={noMemo}
                            showRepeat={true}
                            res={this.props.res?this.props.res:''}
                            navList={navList?navList:""}
                            invMemoFnc={invMemoFnc}
                            showScaleFnc={showScaleFnc}
                            memoEdit={memoEdit}
                            cancelFnc={this.props.cancelFnc}
                            showDetele={this.props.showDetele?this.props.showDetele:""}
                            saveScan={this.props.saveScan?this.props.saveScan:""}
                            refreshData={refreshData?refreshData:""}
                            getDetail={this.props.getDetail?this.props.getDetail:""}
              />
            </InvoiceRight>
          </div>
        </ExpandCons>
      </Modal>
    )
  }
}

export default ExpandInvoice;

