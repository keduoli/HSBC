import React from 'react'
import {Input,Form,Button,Modal,Radio,Select,DatePicker } from 'antd'
import styled from 'styled-components'
import { DrawContractLinkFilter,DrawContractLinkTable} from 'components';
const TitleSpan = styled.span`
  fontSize:13px;
  height:100px;
  color:#fff;
  display:inline-block;
  line-height:100px;
`;
class DrawContractLinkModal extends React.Component{
  state={
		page:1,
		size:10,
		con_num:'',
		start_con_date:'',
		end_con_date:'',
    contractList:this.props.contractList,
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
			start_con_date:'',
			end_con_date:'',
    })
  }
  searchFnc = (values) => {
		this.setState({
			showInfo:true,
			con_num:values['con_num'],
			start_con_date:values['start_con_date'],
			end_con_date:values['end_con_date'],
		})
  }
  render(){
		const { getLinkContractList,cancel,drawdownUnlinkContract,drawdownLinkContract,showDetail } = this.props;
		const { contractList } = this.state;
    return(
    <Modal title={<TitleSpan>{this.props.title}</TitleSpan>}
           style = {{textAlign:'center',top:40}}
           visible
           onCancel={cancel}
           width={1000}
           maskClosable={false}
           footer={null}
    > 
			<DrawContractLinkFilter  showInfo={this.state.showInfo}
															 searchFnc={this.searchFnc}
															 drawdownUnlinkContract={drawdownUnlinkContract}
															 clearAllFnc={this.clearFnc}/>
			<DrawContractLinkTable state={this.state}
														 getLinkContractList={getLinkContractList}
														 contractList={contractList}
														 drawdownLinkContract={drawdownLinkContract}
														 drawdownUnlinkContract={drawdownUnlinkContract}
														 showDetail={showDetail}
														 dd_id={this.props.dd_id}
														 cus_id={this.props.cus_id}
														 cancel={cancel}
														 setPageFnc={(page)=>this.setState({page})}/>
    </Modal>
    )
  }
}
export default DrawContractLinkModal;
