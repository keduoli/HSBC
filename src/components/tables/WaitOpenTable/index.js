import React from 'react';
import {Button, Icon, Table, Input, Popconfirm, Modal, Pagination} from 'antd';
import styled from 'styled-components';
import { AddApiModal } from 'components';

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
class WaitOpenTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '申请时间',
			dataIndex: 'create_time',
			width: '10%',
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
    }];
    this.state = {
      dataSource: [],
			count: 1,
			show: true,
			page:1,
			addModal:'',
			delModal:'',
    };
	}
	showConfirm = (record) => {
		this.setState({
			delModal:<Modal title={<TitleSpan>删除提示</TitleSpan>}
											visible
											width={360}
											closable={false}
											footer={null}
											>
											<div style={{width:'100%',overflow:'hidden',textAlign: 'center',fontSize:13}}>
												<p>您确定要删除这条ip地址么?</p>
												<p>{record.ip}</p>
											</div>
											<BtnConDiv>
												<Button style={{marginRight:'20px'}} onClick={()=>this.setState({delModal:''})}>取消</Button>
												<Button type="primary" onClick={()=>{
													this.props.delFnc({target_id:record.id},()=>{
														this.setState({delModal:''})
														if(this.state.dataSource.length === 1){
															this.refreshData(true)
															this.setState({page:this.state.page-1})
														}else{
															this.refreshData(false)
														}
													})
												}}>确定</Button>
											</BtnConDiv>
										</Modal>
		})
	}	
  handleAdd = () => {
		this.setState({
			addModal:<AddApiModal title='新增ip地址'
														closeModal={()=>{this.setState({addModal:''})}}
														addFnc={this.props.addFnc}
														refreshData={this.refreshData}
								/>
		})
	}
	editFnc = (record) => {
		this.setState({
			addModal:<AddApiModal title='编辑ip地址'
														closeModal={()=>{this.setState({addModal:''})}}
														editFnc={this.props.editFnc}
														edit={true}
														record={record}
														refreshData={this.refreshData}
								/>
		})
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
	render() {
		const { outInvoiceList } = this.props;
		const columns = this.columns;
		return (
			<div style={{height:'100%',position:'relative',paddingBottom:40}}>
				<Table dataSource={outInvoiceList.rows}
							 loading={this.props.loading}
							 columns={columns}
							 pagination={false}
							 rowKey='id'/>
        <BottomPage style={{left:this.props.collectionStop?'75px':'210px'}}>
					<Pagination total={outInvoiceList.count}
											style={{float:'right'}}
											current={this.props.state.page}
											onChange={(page, pageSize)=>{
												this.props.setPage(page)
											}}/>
				</BottomPage>
				{this.state.addModal}
				{this.state.delModal}
			</div>
		)
	}
}

export default WaitOpenTable;