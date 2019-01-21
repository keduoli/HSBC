import React from 'react';
import { Table, Button, Pagination,Modal  } from 'antd';
import styled from 'styled-components';

const ItemErrSpan = styled.span`
  float: left;
  width: 13px;
  height: 13px;
  margin-right: 5px;
  margin-top: 2px;
  background: url('images/error-icon.png') no-repeat;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const ItemSpan = styled.span`
  display:block;
`;

const ZhuanSpan = styled.span`
  width:18px;
  height:18px;
  float:left;
  background:url(images/invoice.png) no-repeat -54px 0;
`;
const PuSpan = styled.span`
  width:18px;
  height:18px;
  float:left;
  background:url(images/invoice.png) no-repeat -36px 0;
`;
const ItemPointSpan = styled.span`
  float: left;
  width: 16px;
  height: 16px;
  margin-left: 5px;
  margin-top: 2px;
  background: url('images/point-icon.png') no-repeat;
  cursor: pointer;
`;
class PdfTable extends React.Component{
    render(){
			const columns = [{
				title: '序号',
				key:'xh',
				dataIndex: 'xh',
				width:'5%',
				render:(text,record,index)=>{
					return <div>{index+1}</div>
				}
			},{
				title: '文件状态',
				key:'zt',
				dataIndex: 'zt',
				width:'10%',
				render:(text,record,index)=>{
					return <div>
										{
											record.state == 6 &&
											<span>上传成功</span>
										}
										{
											record.state == 4 &&
											<span style={{marginRight:'25%'}}>无法识别</span>
										}
										{
											(record.state == 1 || record.state == 2 || record.state == 3) &&
											<span>查验失败</span>
										}
										{
											(record.state == 0) &&
											<span>查验成功</span>
										}
									</div>
				}
			},{
				title: '文件名',
				key:'fileName',
				dataIndex: 'fileName',
				width:'15%',
			},{
				title: '页码',
				key:'pageCount',
				dataIndex: 'pageCount',
				width:'8%',
			},{
				title: '发票类型',
				key:'fpzl',
				dataIndex: 'fpzl',
				width:'10%',
				render:(text,record,index)=>{
					return <div>
									{
										(text=='04' || text=='11') ?
										<PuSpan/>:""
									}
									{
										(text=='01' || text=='02') ?
										<ZhuanSpan/>:""
									}
								 </div>
				}
			},{
				title: '查验结果',
				key:'state',
				dataIndex: 'state',
				width:'12%',
				render:(text,record,index)=>{
					return <div>
										{
											(text == 1 || text == 2 || text == 3) &&
												<ItemSpan style={{float:'left'}}><ItemErrSpan/>查验失败</ItemSpan>
										}
										{
											text == 0 &&
											<span>
												{
													record.reason?
													<span>
														<ItemErrSpan/>
														{record.reason}
													</span>
													:
													<span style={{marginRight:8}}>成功录入</span>
												}
											</span>
										}
										{
											text == 3 && 
											<span>
												<ItemErrSpan/>
												{record.reason}
											</span>
										}
								</div>
				}
			},{
				title: '备注',
				key:'bz',
				dataIndex: 'bz',
				width:'12%',
				render:(text,record,index)=>{
					return <div>

								</div>
				}
			},{
				title: '录入时间',
				key:'time',
				dataIndex: 'time',
				render:(text,record,index)=>{
					return <div>{text}</div>
				}
			},{
				title: '操作',
				key:'action',
				dataIndex: 'action',
				width:'8%',
				render:(text,record,index)=>{
					return <div>
										{record.state == 0 &&
											<span>
												<a href="javascript:;" onClick={()=>{
													this.props.getDetailFnc(record.id);
												}}>查看详情</a>
											</span>
										}
										{
											(record.state == 1 || record.state == 2 || record.state == 3) &&
											<a href="javascript:;" onClick={this.props.goToWait}>待确认</a>
										}
									</div>
				}
			}]
			return <div>
							<Table columns={columns}
										dataSource={this.props.data}
										pagination={false}
										style={{width:'96%',marginLeft:'2%'}}
										scroll={{ y: 400 }}
										rowKey={(r,i)=>(i)}/>
						</div>
		}
}

export default PdfTable;