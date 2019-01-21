import React from 'react'
import {Input,Form,Button,Modal,Radio,Select,DatePicker } from 'antd'
import styled from 'styled-components'
import { DrawInvoiceLinkFilter,DrawInvoiceLinkTable} from 'components';
const TitleSpan = styled.span`
  fontSize:13px;
  height:100px;
  color:#fff;
  display:inline-block;
  line-height:100px;
`;
class DrawInvoiceLinkModal extends React.Component{
  state={
		page:1,
		size:10,
		con_num:'',
		gfmc:'',
		xfmc:'',
		fpdm:'',
		fphm:'',
    invoiceList:this.props.invoiceList,
    unlink_dd_id:this.props.unlink_dd_id,
    cus_id:this.props.cus_id,
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
  render(){
		const { getInvoiceList,cancel,drawdownLinkInvoice,drawdownUnlinkInvoice,showDetail } = this.props;
		const { invoiceList } = this.state;
    return(
    <Modal title={<TitleSpan>{this.props.title}</TitleSpan>}
           style = {{textAlign:'center',top:40}}
           visible
           onCancel={cancel}
           width={1000}
           maskClosable={false}
           footer={null}
    > 
			<DrawInvoiceLinkFilter  showInfo={this.state.showInfo}
															searchFnc={this.searchFnc}
															drawdownUnlinkInvoice={drawdownUnlinkInvoice}
															clearAllFnc={this.clearFnc}/>
			<DrawInvoiceLinkTable state={this.state}
														getInvoiceList={getInvoiceList}
														invoiceList={invoiceList}
														drawdownLinkInvoice={drawdownLinkInvoice}
														drawdownUnlinkInvoice={drawdownUnlinkInvoice}
														cancel={this.props.cancel}
														showDetail={showDetail}
														dd_id={this.props.dd_id}
														cus_id={this.props.cus_id}
														cancel={cancel}
														setPageFnc={(page)=>this.setState({page})}/>
    </Modal>
    )
  }
}
export default DrawInvoiceLinkModal;
