import React from 'react';
import {Button, Icon, Table, Input, Popconfirm, Modal, Pagination} from 'antd';
import styled from 'styled-components';
import { AddApiModal } from 'components';

const confirm = Modal.confirm;
const AddButton = styled(Button)`
	position:absolute;
	right:30px;
	z-index:100;
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
class APISettingTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '序号',
			dataIndex: 'xh',
			width: '10%',
    },{
      title: 'IP地址',
			dataIndex: 'ip',
    },{
      title: '操作',
      dataIndex: 'operation',
			width: '30%',
      render: (text, record) => {
        return (
							<div>
								<Icon type='delete' style={{cursor:'pointer',fontSize:16,marginRight:15}} onClick={() => {
										this.showConfirm(record)
								}}/>
								<Icon
									type="edit"
									onClick={()=>this.editFnc(record)}
									style={{cursor:'pointer',fontSize:16}}
								/> 
							</div>
				)
      },
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
												<p>您确定要删除这条IP地址么?</p>
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
			addModal:<AddApiModal title='新增IP地址'
														closeModal={()=>{this.setState({addModal:''})}}
														addFnc={this.props.addFnc}
														refreshData={this.refreshData}
								/>
		})
	}
	editFnc = (record) => {
		this.setState({
			addModal:<AddApiModal title='编辑IP地址'
														closeModal={()=>{this.setState({addModal:''})}}
														editFnc={this.props.editFnc}
														edit={true}
														record={record}
														refreshData={this.refreshData}
								/>
		})
	}
	componentWillReceiveProps(next){
		let dataSource = [];
		const ipallowedList = next.ipallowedList.data;
		for(let i in ipallowedList){
			ipallowedList[i].key = ipallowedList[i].id;			//修改dataSource列表；
			ipallowedList[i].xh = parseInt(i)+1;
			dataSource.push(ipallowedList[i])
		}
		this.setState({dataSource})
	}
  refreshData = (bl) => {
    const state = this.state;
    const param={
      size:10,
      page:bl?state.page-1:state.page,
		};
    this.props.getData(param);
  }
  componentWillUpdate(nextProps,nextState){
    const { page } = nextState;
		if(page!==this.state.page){
        this.props.getData({
          page:page,
          size:10,
        })
    }
	}
	render() {
		const parametersData = this.props.parametersData;
		const { dataSource } = this.state;
		const { ipallowedList } = this.props;
		const columns = this.columns;
		return (
			<div style={{height:'100%',position:'relative',paddingBottom:40}}>
				<AddButton onClick={this.handleAdd} disabled={ipallowedList.count>=10} type='primary'>添加IP白名单</AddButton>
				<Table dataSource={dataSource} loading={this.props.loading} columns={columns} pagination={false}/>
				<Pagination total={ipallowedList.count}
										style={{float:'right',marginTop:20}}
										current={this.state.page}
										onChange={(page, pageSize)=>{
											this.setState({page:page})
										}}/>
				{this.state.addModal}
				{this.state.delModal}
			</div>
		)
	}
}

export default APISettingTable;