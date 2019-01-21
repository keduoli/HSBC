import React from 'react'
import {Input,Form,Button,Modal,message,Icon,Table,Tree,Radio,Pagination} from 'antd'
import styled from 'styled-components'
import moment from 'moment';
const RadioGroup = Radio.Group;
const Search = Input.Search;
const TreeNode = Tree.TreeNode;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const SwitchLog = styled.div`
  background:#fff;
  overflow:hidden;
  width: 96%;
  margin: 0 auto;
  margin-top:30px;
  border-bottom: 1px solid #CCCCCC;
`;
const GoodCon = styled.div`
  overflow:hidden;
  width: 96%;
  margin: 0 auto;
`;
const HeaderSearch = styled.div`
  height:62px;
  width:100%;
  padding:0 14px;
`;
const CodingCon = styled.div`
  height:310px;
  width:100%;
  border: 1px solid #CCCCCC;
  display:flex;
`;
const CodingTree = styled.div`
  width:225px;
  height:100%;
  border-right:1px solid #CCCCCC;
  overflow:auto;
  padding:5px 10px;
`;
const CodingRight = styled.div`
  height:100%;
  overflow:auto;
  flex:1;
`;
const CodingTitle = styled.div`
  height:38px;
  line-height:38px;
  border-bottom:1px solid #CCCCCC;
`;
class CodingModal extends React.Component{
  state = {
    codingData:[],
    selectId:'',
    key:'',
    coding:'',
    page:1,
    size:10,
    search_good:'',
    keyword:'',
    goodsList:{count:0,data:[]},
    list_type:1,
    selectedRows:'',
    selectedRowKeys:[],
    loading:false,
    treeData: [
      { title: '所有编码',key:'null',children:[
        { title: '货物', key: 1 },
        { title: '劳务', key: 3801 },
        { title: '销售服务', key: 3811 },
        { title: '无形资产', key: 4163 },
        { title: '不动产', key: 4179 },
        { title: '未发生销售行为的不征税项目', key: 4193 },
      ]}
    ],
  }
  componentWillMount(){
    if(this.props.allGood === true){
      this.setState({loading:true})
      this.props.getData({page:1,size:6},(res)=>{
        this.setState({goodsList:res,loading:false})
      })
    }else{
      this.setState({list_type:2})
    }
  }
  onLoadData = (treeNode) => {
    return new Promise((resolve) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      let code_id = treeNode.props.dataRef.key==='null'?'':treeNode.props.dataRef.key;
      this.props.getCodingList({target_id:code_id,page:1,size:10,keyword:this.state.keyword},(res)=>{
        let treeData = [];
        for(let i in res.sonrows){
          if(res.sonrows[i].id !== code_id){
            treeData.push({
              title: res.sonrows[i].goods_labour_map,
              key: res.sonrows[i].id
            })
          }
        }
        treeNode.props.dataRef.children = treeData;
        this.setState({
          treeData: [...this.state.treeData],
        });
        resolve();
      })
    });
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });
  }
  componentWillUpdate(nextProps,nextState){
    const { page, size, search_good,keyword } = nextState;
		if(page!==this.state.page || search_good!==this.state.search_good || keyword!==this.state.keyword){
      if(this.state.list_type === 2){
        this.props.getCodingList({keyword:keyword,target_id:this.state.key[0]!=='null'?this.state.key+'':'',page:page,size:10},(res)=>{
          this.setState({codingData:res})
        })
      }else{
        this.setState({loading:true})
        this.props.getData({
          page:page,
          size:6,
          search_good:search_good,
        },(res)=>{
          this.setState({goodsList:res,loading:false})
        })
      }
		}
  }
  onSelect = (selectedKeys, info) => {
    if(info.selected){
      this.setState({key:selectedKeys},()=>{
        this.props.getCodingList({target_id:this.state.key[0]!=='null'?this.state.key+'':'',page:1,size:10,keyword:this.state.keyword},(res)=>{
          this.setState({codingData:res})
        })
      });
    }
  }
  setSelect = (record) => {
    this.setState({selectId:record.id,coding:record})
  }
  handleSearch = (val) => {
    this.setState({keyword:val})
  }
  selectCoding = () => {
    if(this.state.list_type === 2){
      if(this.state.coding === ''){
        message.warning("请选择税收分类编码");return;
      }
      this.props.getCoding(this.state.coding)
    }else{
      if(this.state.selectedRows.length===0){
        message.warning("请选择商品信息");return;
      }
      if(this.state.selectedRows.length>1){
        message.warning("只能选择一条商品信息");return;
      }
      this.props.getCoding(this.state.selectedRows[0])
    }
    this.props.cancel()
  }
  onSelectChange = (selectedRowKeys,selectedRows) => {
    this.setState({selectedRowKeys,selectedRows})
  }
  check_tittle_index = (index) => {
    return index===this.state.list_type ? "log-title active" : "log-title";
  };
  render(){
    const columns = [{
      title: '编码',
      dataIndex: 'code',
      width:'50px',
    },{
      title: '合并编码',
      dataIndex: 'merge_code',
      width:'120px',
    },{
      title: '货物和劳动名称',
      dataIndex: 'goods_labour_map',
      width:'120px',
    },{
      title: '税收分类简称',
      dataIndex: 'goods_serv_tittle',
      width:'90px',
    },{
      title: '说明',
      dataIndex: 'memo',
    }]
    const goodColumns = [{
      title: '企业商品编号',
      key:'company_code',
      dataIndex: 'company_code',
    },{
      title: '商品名称',
      key:'name',
      dataIndex: 'name',
    },{
      title: '规格型号',
      key:'spec',
      dataIndex: 'spec',
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
      title: '税率',
      key:'rate',
      dataIndex: 'rate',
    }]
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      hideDefaultSelections:true,
      type:'radio',
      onChange: this.onSelectChange,
    }
    return(
      <Modal title={<TitleSpan>{this.props.allGood?'选择商品信息':'税收分类编码'}</TitleSpan>}
             style = {{top:100}}
             visible
             className='coding-modal'
             width={830}
             onCancel={()=>{this.props.cancel()}}
             maskClosable={false}
             footer={null}>
        { 
          this.props.allGood && <SwitchLog>
            <ul style={{float:'left'}}>
              <li onClick={() => {
                if(this.state.list_type === 1)return;
                this.setState({
                  list_type : 1,
                  page:1,
                  size:10,
                  selectedRows:'',
                  selectedRowKeys:[],
                });
              }}
                  className={ this.check_tittle_index(1) }
              >常用商品</li>
              <li onClick={() => {
                if(this.state.list_type === 2)return;
                this.setState({
                  list_type : 2,
                  page:1,
                  size:10,
                  selectedRows:'',
                  selectedRowKeys:[],
                });
              }}
                  className={ this.check_tittle_index(2) }
              >全部税收分类编码</li>
            </ul>
            { this.state.list_type === 1 && <Search onSearch={(val)=>this.setState({search_good:val})} placeholder='请输入商品名称／商品编号' style={{width:230,float:'right'}}/>}
          </SwitchLog>
        }
        {
          this.state.list_type === 1 &&
          <GoodCon>
            <Table columns={goodColumns} 
                   rowSelection={rowSelection}
                   dataSource={this.state.goodsList.data}
                   pagination={false}
                   loading={this.state.loading}
                   onRowClick={(record)=>{
                     this.setState({selectedRowKeys:[record.id],selectedRows:[record]})
                   }}
                   rowKey='id'/>
            <div style={{overflow:'hidden',position:'relative'}}>
              <div style={{overflow:"hidden",margin:'0 auto',textAlign:'center',padding:'15px 0'}}>
                <Button onClick={this.props.cancel} style={{marginRight:30}}>取消</Button>
                <Button type="primary" onClick={this.selectCoding}>选择</Button>
              </div>
              <Pagination total={this.state.goodsList.count}
                          size="small"
                          defaultPageSize={6}
                          style={{position:'absolute',right:15,top:20}}
                          current={this.state.page}
                          onChange={(page, pageSize)=>{
                            this.setState({page:page})
                          }}
                />
            </div>
          </GoodCon>
        }
        {
          this.state.list_type === 2 &&
          <div>
            <HeaderSearch>
              <Search onSearch={this.handleSearch} style={{width:'100%',height:34,marginTop:14}} placeholder="输入搜索编码"/>
            </HeaderSearch>
            <CodingCon>
              <CodingTree>
                <Tree showLine
                      loadData={this.onLoadData} 
                      defaultExpandedKeys={['null']} 
                      onSelect={this.onSelect}
                      selectedKeys={[`${this.state.key}`]}>
                  {this.renderTreeNodes(this.state.treeData)}
                </Tree>
              </CodingTree>
              <CodingRight style={{overflow:'auto'}}>
                <Table columns={columns}
                      dataSource={this.state.codingData.rows}
                      bordered
                      loading={this.props.codingLoad}
                      rowClassName={(record,index)=>{
                        return(record.id==this.state.selectId?'selectrow':'')
                      }}
                      onRowClick={(record)=>{
                        this.setSelect(record)
                      }}
                      rowKey='code'
                      pagination={false}/>
              </CodingRight>
            </CodingCon>
            <div style={{overflow:'hidden',position:'relative'}}>
              <div style={{overflow:"hidden",margin:'0 auto',textAlign:'center',padding:'15px 0'}}>
                <Button onClick={this.props.cancel} style={{marginRight:30}}>取消</Button>
                <Button type="primary" onClick={this.selectCoding}>选择</Button>
              </div>
              <Pagination total={this.state.codingData.count}
                          size="small"
                          style={{position:'absolute',right:15,top:20}}
                          current={this.state.page}
                          onChange={(page, pageSize)=>{
                            this.setState({page:page})
                          }}
                />
            </div>
          </div> 
        }
      </Modal>
    )
  }
}

export default CodingModal; 