import React from 'react';
import {Button, Icon, Table, Input, Popconfirm, Modal, Pagination} from 'antd';
import styled from 'styled-components';
import { ApplyDetailModal } from 'components';

const confirm = Modal.confirm;
const AddButton = styled(Button)`
	position:absolute;
	right:30px;
	z-index:500;
	top:-50px;
`;
const APITable = styled(Table)`
	height:80%;
	width:1280px;
	padding:10px 0 0 10px;
  border:1px solid #f5f5f5;
	border-left:3px solid  #2397CA;
`;
const IconFont = styled(Icon)`
	cursor:pointer;
	font-size:14px;
	margin-left:8px;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
  text-align:center;
`;
const BtnConDiv = styled.div`
  margin-top: 30px;
  text-align: center;
`;
const BottomPage = styled.div`
  background:#f7f7f7;
  position:fixed;
  bottom:0px;
  right:0px;
  height:60px;
  z-index:100;
  padding:20px 20px 0 20px;
  box-sizing:border-box;
	overflow:hidden;
  -webkit-transition: all .2 ease;
  transition: all .2s ease;
`;
class ApplyRecordTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '申请时间',
			dataIndex: 'create_time',
    },{
      title: '申请人',
			dataIndex: 'realname',
    },{
      title: '购方名称',
      dataIndex: 'gfmc',
    },{
      title: '购方纳税人识别号',
      dataIndex: 'gfsbh',
    },{
      title: '金额',
      dataIndex: 'je',
    },{
      title: '税额',
      dataIndex: 'se',
    },{
      title: '价税合计',
      dataIndex: 'jshj',
    },{
      title: '状态',
			dataIndex: 'state',
			render:(text)=>{
				return<div>
					{text == 1 && '已保存'}
					{text == 2 && '申请中'}
					{text == 3 && '已开票'}
				</div>
			}
    }];
    this.state = {
			showDetail:''
    };
	}
	componentWillReceiveProps(nextProps){
		const {size,page,gfmc,gfsbh,time_area,status} = this.props.state;
			const next = nextProps.state;
			if(next.page!==page || next.gfmc!==gfmc || next.gfsbh!==gfsbh || next.time_area!==time_area || next.status!==status ){
				const param={
					gfmc:next.gfmc,
					gfsbh:next.gfsbh,
					status:next.status,
					result:next.result,
					time_area:next.time_area,
					page:next.page,
					size:next.size,
				};
				this.props.getData(param);
			}
	}
  refreshData = (bl) => {
    const state = this.state;
    const param={
      size:10,
      page:state.page,
      status:state.status,
      gfmc:state.gfmc,
      gfsbh:state.gfsbh,
      time_area:state.time_area,
		};
    this.props.getData(param);
	}
	applyDetail = (res) => {
		return <ApplyDetailModal scanData={res} 
														 applyAction={this.props.applyAction}
														 refreshData={this.refreshData}
														 copyOpening={this.props.copyOpening}
														 companyList={companyList}
														 getCompanyList={getCompanyList}
														 getGoodList={getGoodList}
														 searchFnc={searchFnc}
														 getTypeFnc={getTypeFnc}
														 getCodingList={getCodingList}
														 cancelFnc={()=>this.setState({showDetail:''})}/>
	}
	render() {
		const { outInvoiceList } = this.props;
		const columns = this.columns;
		return (
			<div style={{height:'100%',position:'relative',paddingBottom:40}}>
				<Table dataSource={outInvoiceList.rows}
							 loading={this.props.loading}
							 columns={columns}
							 pagination={false}
							 onRowClick={(record)=>{
								 this.props.getApplyDetail({apply_id:record.id},(res)=>{
									 this.setState({showDetail:this.applyDetail(res)})
								 })
							 }}
							 rowKey='id'/>
        <BottomPage style={{left:this.props.collectionStop?'75px':'210px'}}>
					<Pagination total={outInvoiceList.count}
											style={{float:'right'}}
											current={this.props.state.page}
											onChange={(page, pageSize)=>{
												this.props.setPage(page)
											}}/>
				</BottomPage>
				{this.state.showDetail}
			</div>
		)
	}
}

export default ApplyRecordTable;