import React from 'react'
import {Input,Form,Button,Modal,Radio,Select,DatePicker } from 'antd'
import styled from 'styled-components'
import { InvoiceLinkFilter,InvoiceLinkTable} from 'components';
const TitleSpan = styled.span`
  fontSize:13px;
  height:100px;
  color:#fff;
  display:inline-block;
  line-height:100px;
`;
class InvoiceLinkModal extends React.Component{
  state={
		page:1,
		size:10,
		con_num:'',
		gfmc:'',
		xfmc:'',
		fpdm:'',
		fphm:'',
    invoiceList:this.props.invoiceList,
    con_id:this.props.id,
    inv_ids:this.props.inv_ids,
    selectList:[]
  };
  clearFnc = () => {
    this.setState({
      size:10,
      page:1,
      showInfo:false,
      con_num:'',
      gfmc:'',
      xfmc:'',
      fpdm:'',
      fphm:'',
    })
  }
  searchFnc = (values) => {
		this.setState({
			showInfo:true,
			con_num:values['con_num'],
			gfmc:values['gfmc'],
			xfmc:values['xfmc'],
			fpdm:values['fpdm'],
			fphm:values['fphm'],
		})
  }
  componentWillMount(){
    if(!this.props.contract){
      const param = {cus_num:this.props.record[0].cus_num};
      if(this.props.invoiceLink == 'contract'){
        this.props.getContractList(param,(res)=>{
          this.setState({selectList:res.list})
        })
      }else if(this.props.invoiceLink == 'drawdown'){
        this.props.getDrawdownList(param,(res)=>{
          this.setState({selectList:res.list})
        })
      }
    }
  }
  render(){
		const { getInvoiceList,cancel,linkContract,linkDrawdown,getContractDetail,invoiceLink,unLinkContract } = this.props;
		const { invoiceList,selectList } = this.state;
    return(
    <Modal title={<TitleSpan>{this.props.title}</TitleSpan>}
           style = {{textAlign:'center',top:40}}
           visible
           onCancel={cancel}
           width={1000}
           maskClosable={false}
           footer={null}
    > 
      {
        !this.props.invoiceLink&&
        <InvoiceLinkFilter showInfo={this.state.showInfo}
                           searchFnc={this.searchFnc}
                           unLinkContract={unLinkContract}
                           clearAllFnc={this.clearFnc}/>
      }
			<InvoiceLinkTable state={this.state}
												getInvoiceList={getInvoiceList}
                        invoiceList={invoiceList}
                        invoiceLink={invoiceLink}
                        refreshInvoiceData={this.props.refreshData}
                        linkDrawdown={linkDrawdown}
                        cancel={this.props.cancel}
                        unLinkContract={unLinkContract}
                        getContractDetail={getContractDetail}
                        showDetail={this.props.showDetail}
                        dd_id={this.props.dd_id}
                        cus_id={this.props.cus_id}
                        refreshData={this.refreshData}
                        id={this.props.id}
                        selectList={selectList}
												linkContract={linkContract}
												cancel={cancel}
												setPageFnc={(page)=>this.setState({page})}/>
    </Modal>
    )
  }
}
export default InvoiceLinkModal;
