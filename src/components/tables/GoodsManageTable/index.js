import React from 'react';
import { Table,Button,Pagination,Modal  } from 'antd';
import styled from 'styled-components';
import { GoodsModal } from 'components';
const EditSpan = styled.span`
  color: #108ee9;
  margin-right: 10px;
  cursor: pointer;
`;
const DeleteSpan = styled.span`
  cursor: pointer;
`;
const DianSpan = styled.span`
  width:18px;
  height:18px;
  float:left;
  background:url(images/invoice.png) no-repeat 0 0;
`;
const PuSpan = styled.span`
  width:18px;
  height:18px;
  float:left;
  background:url(images/invoice.png) no-repeat -36px 0;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:100px;
  color:#fff;
  display:inline-block;
  line-height:100px;
`;
const ZhiSpan = styled.span`
  width:18px;
  height:18px;
  float:left;
  background:url(images/invoice.png) no-repeat -18px 0;
`;
const ZhuanSpan = styled.span`
  width:18px;
  height:18px;
  float:left;
  background:url(images/invoice.png) no-repeat -54px 0;
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
class GoodsManageTable extends React.Component{
  state={
    selectedRowKeys:[],
    editGoodsModal:'',
    deleteModal:''
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys})
  }
  editFnc = (record) => {
    this.setState({editGoodsModal:<GoodsModal cancel={()=>this.setState({editGoodsModal:''})}
                                              record={record}
                                              title='编辑商品管理'
                                              refresh={this.refreshData}
                                              settingList={this.props.settingList}
                                              codingLoad={this.props.codingLoad}
                                              getCodingList={this.props.getCodingList}
                                              editGoods={this.props.editGoods}
                                              edit={true}/>})
  }
  componentWillReceiveProps(nextProps){
    const { tax_code,tax_type,name,code,rate,spec,price,unit,tax_mark,page } = this.props.state;
    const next = nextProps.state;
    if(next.tax_code !== tax_code || next.page !== page || next.tax_type !== tax_type || next.name !== name
      || next.code !== code || next.rate !== rate || next.spec !== spec || next.price !== price || next.unit !== unit || next.tax_mark !== tax_mark
    ){
      const param = {
        tax_code:next.tax_code,
        tax_type:next.tax_type,
        name:next.name,
        code:next.code,
        rate:next.rate,
        spec:next.spec,
        price:next.price,
        units:next.units,
        tax_mark:next.tax_mark,
        size:10,
        page:next.page,
      }
      this.props.getData(param)
    }
  }
  deletFnc = (record) => {
    this.setState({
      deleteModal:<Modal  title={<TitleSpan>删除提示</TitleSpan>}
                          style = {{textAlign:'center',top:200}}
                          closable={false}
                          visible
                          width={400}
                          maskClosable={false}
                          footer={null}
                    >
                    <div style={{margin:'10px 0 40px'}}>
                      确定删除商品信息？
                    </div>
                    <div>
                      <Button onClick={()=>{this.setState({deleteModal:''})}} style={{marginRight:20}}>取消</Button>
                      <Button type="primary" onClick={()=>{
                        const param = {
                          goods_id:record.id
                        }
                        this.props.delGoods(param,()=>{
                          const len = this.props.goodsList.data.length;
                          const page = this.props.state.page;
                          if(len===1&&page>1){
                            this.refreshData(true);
                          }else{
                            this.refreshData();
                          }
                          this.setState({deleteModal:''})
                        });
                      }}>确定</Button>
                    </div>
                    </Modal>
    })
  }
  refreshData = (del) => {
    const {state} = this.props;
    let page;
    if(del === true){
      page = state.page - 1;
    }else{
      page = state.page
    }
    const param={
      tax_code:state.tax_code,
      tax_type:state.tax_type,
      name:state.name,
      code:state.code,
      rate:state.rate,
      spec:state.spec,
      price:state.price,
      unit:state.unit,
      tax_mark:state.tax_mark,
      size:10,
      page:state.page,
    };
    this.setState({selectedRowKeys:[]});
    this.props.getData(param);
  }
  render(){
    const columns = [{
      title: '序号',
      key:'xh',
      dataIndex: 'xh',
      render:(text,record,index)=>{
        return <div>{index+1}</div>
      }
    },{
      title: '商品名称',
      key:'name',
      dataIndex: 'name',
    },{
      title: '税收分类编码',
      key:'merge_code',
      dataIndex: 'merge_code',
    },{
      title: '税收分类名称',
      key:'goods_serv_tittle',
      dataIndex: 'goods_serv_tittle',
    },{
      title: '企业商品编号',
      key:'company_code',
      dataIndex: 'company_code',
    },{
      title: '税率',
      key:'rate',
      dataIndex: 'rate',
    },{
      title: '规格型号',
      key:'spec',
      dataIndex: 'spec',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '计量单位',
      key:'unit',
      dataIndex: 'unit',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '单价',
      key:'price',
      dataIndex: 'price',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '含税标志',
      key:'tax_mark',
      dataIndex: 'tax_mark',
      render:(text)=>{
        return<div>
                {text===0 &&'否'} 
                {text===1 &&'是'} 
                {text===null&&'---'} 
              </div>
      }
    },{
      title: '操作',
      key:'action',
      dataIndex: 'action',
      render:(text,record)=>{
        return <div>
                  <EditSpan onClick={()=>this.editFnc(record)}>编辑</EditSpan>
                  <DeleteSpan onClick={()=>this.deletFnc(record)}>删除</DeleteSpan>
               </div>
      }
    }]
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const { goodsList } = this.props;
    return(
        <div style={{margin:'30px 0 60px 0'}}>
          <div className="invoice-manage-table">
            <Table columns={columns}
                   dataSource={goodsList&&goodsList.data}
                   pagination={false}
                   loading={this.props.loading}
                   rowKey='id'
                   />
          </div>
          <BottomPage style={{left:this.props.collectionStop?'75px':'210px'}}>
            <Pagination total={goodsList&&goodsList.count}
                        style={{float:'right'}}
                        current={this.props.state.page}
                        onChange={(page, pageSize)=>{
                          this.props.setPageFnc(page);
                        }}
            />
          </BottomPage>
          {this.state.editGoodsModal}
          {this.state.deleteModal}
        </div>
    )
  }
}

export default GoodsManageTable
