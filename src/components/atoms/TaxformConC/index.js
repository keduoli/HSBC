import React from 'react'
import styled from 'styled-components';
import { Table } from 'antd';

const PdfBoss = styled.div`
	width:90%;
	margin:0 auto;
`;
class TaxformConC extends React.Component{
	state={
		taxformList:{}
	}
	componentWillReceiveProps(next){
		this.setState({taxformList:next.taxformList})
	}
  render(){
		const { taxformList } = this.state;
		const columns = [{
				title: '序号',
				dataIndex: 'index',
				key: 'index',
			},{
				title: '发票代码',
				dataIndex: 'fpdm',
				key: 'fpdm',
			},{
				title: '发票号码',
				dataIndex: 'fphm',
				key: 'fphm',
			},{
				title: '开票日期',
				dataIndex: 'kprq',
				key: 'kprq',
			},{
				title: '销方名称',
				dataIndex: 'xfmc',
				key: 'xfmc',
			},{
				title: '金额',
				dataIndex: 'je',
				key: 'je',
			},{
				title: '税额',
				dataIndex: 'se',
				key: 'se',
			},{
				title: '认证方式',
				dataIndex: 'confirm_method',
				key: 'confirm_method',
			},{
				title: '认证日期',
				dataIndex: 'confirm_date',
				key: 'confirm_date',
			},{
				title: '发票状态',
				dataIndex: 'inv_status',
				key: 'inv_status',
			},{
				title: '发票类型',
				dataIndex: 'inv_type',
				key: 'inv_type'
			},
		];
    return(
      <div style={{background:"#fff",marginTop:"10px"}}>
				{
					taxformList&&
					<div>
						<PdfBoss>
							<h3 style={{textAlign:'center',paddingTop:6,fontWeight:600}}>发票清单</h3>
							<div style={{overflow:'hidden'}}>
								<div style={{float:'left',marginTop:20}}>纳税人识别号：{taxformList.gfsbh} </div>
								<div style={{float:'left',margin:'20px 0 0 50px'}}>税款所属期：{taxformList.income_month} </div>
								<div style={{float:'right',marginTop:20}}>单位：元</div>
							</div>
							<div style={{marginTop:30}}>
								<Table columns={columns}
											 rowKey="index"
											 pagination={false}
											 dataSource={taxformList.list}
											 bordered
											 />
							</div>
						</PdfBoss>
					</div>
				}
      </div>
    )
  }
}

export default TaxformConC;