import React from 'react';
import { Table,Pagination,Button,message,Modal } from 'antd';
import {AddKeyWordModal} from 'components';
import styled from 'styled-components';
const confirm = Modal.confirm;
const BtnConDiv = styled.div`
  height: 40px;
`;
const TableConDiv = styled.div`
  padding: 10px 10px 0 10px;
  background: #fff;
`;
const AddAreaDiv = styled.div`
  width: 392px;
  height: 120px;
  border: 1px dashed #3887ff;
  border-radius: 16px;
  text-align: center;
  line-height: 120px;
  color: #3887ff;
  margin: 0 auto;
  cursor: pointer;
`;
const AreaConDiv = styled.div`
  height: 100%;
  width: 100%;
  background: #fff;
  padding: 100px 0;
`;
const EditSpan = styled.span`
  color: #108ee9;
  margin-right: 10px;
  cursor: pointer;
`;
const DeleteSpan = styled.span`
  cursor: pointer;
`;
const BottomPage = styled.div`
  background:#f7f7f7;
  position:fixed;
  bottom:0px;
  right:0px;
  padding:16px 18px;
	overflow:hidden;
  -webkit-transition: all .2 ease;
  transition: all .2s ease;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const CompanysDiv = styled.div`
  border-radius:4px;
  background:#EBEBEB;
  float:left;
  padding:2px;
  margin:0 10px 5px 0;
`;
class BlackListTable extends React.Component{
  constructor(props){
    super(props);
    this.state={
      addModal:'',
      showDeleteModal:''
    }
    this.delId = null;
    this.groupColumns = [{
      title: '关键词',
      dataIndex: 'hwmc',
      key:'id',
      width:'20%',
    },{
      title: '应用子公司',
      dataIndex: 'companys',
      key:'companys',
      render:(text,record)=>{
        return(
          <div>
            {
              record.companys.map((item,index)=>{
                return (
                  <CompanysDiv key={index}>
                    {item.name}
                  </CompanysDiv>
                )
              })
            }
          </div>
        )
      },
      width:'50%',
    },{
      title: '操作',
      key:'action',
      render:(text, record, index)=>
      (<p><EditSpan onClick={()=>{this.setState({
        addModal:<AddKeyWordModal title="编辑货物黑名单"
                                  record={record}
                                  limit={15}
                                  keys="关键词"
                                  navList={this.props.navList}
                                  closeModal={()=>{this.setState({addModal:''})}}
                                  editkeyword={(id,val,checkList)=>this.editKeyWord(id,val,checkList)}
                                  />
      })}}>编辑</EditSpan>
      <DeleteSpan onClick={()=>{this.setState({showDeleteModal:this.delKeyWord(record.id)})}}
        >删除</DeleteSpan></p>)
    }];
    this.columns = [{
      title: '关键词',
      dataIndex: 'hwmc',
      key:'id',
      width:'60%',
    },{
      title: '操作',
      key:'action',
      render:(text, record, index)=>
      (<p><EditSpan onClick={()=>{this.setState({
        addModal:<AddKeyWordModal title="编辑货物黑名单"
                                  record={record}
                                  limit={15}
                                  keys="关键词"
                                  navList={this.props.navList}
                                  closeModal={()=>{this.setState({addModal:''})}}
                                  editkeyword={(id,val)=>this.editKeyWord(id,val)}
                                  />
      })}}>编辑</EditSpan>
      <DeleteSpan onClick={()=>{this.setState({showDeleteModal:this.delKeyWord(record.id)})}}
        >删除</DeleteSpan></p>)
    }];
  }
  delKeyWord = (id) =>{
    const {delFnc,getData,blackList,setPageFnc} = this.props;
    const {page} = this.props.state;
    return(
      <Modal title={<TitleSpan>删除提示</TitleSpan>}
             style = {{textAlign:'center',top:200}}
             closable={false}
             visible
             width={400}
             maskClosable={false}
             footer={null}
      >
        <div style={{margin:'20px 0 30px',fontSize:13,lineHeight:2}}>
          <p>确定要删除这条关键词吗？</p>
        </div>
        <div>
          <Button onClick={()=>{this.setState({showDeleteModal:''})}} style={{marginRight:20}}>取消</Button>
          <Button type="primary"
                  onClick={()=>{
                    const params = {
                      target_id:id,
                      category:1,
                    }
                    const len = blackList.rows.length;
                    if(len==1&&page>1){
                      delFnc(params,()=>{
                        const page = page-1;
                        const param = {
                          size:10,
                          page:page,
                          category:1,
                        }
                        setPageFnc(page)
                        getData(param);
                        this.setState({showDeleteModal:''});
                      })
                    }else{
                      delFnc(params,()=>{
                        const param = {
                          size:10,
                          page:page,
                          category:1,
                        }
                        getData(param);
                        this.setState({showDeleteModal:''});
                      })
                    }
                  }}
          >确定</Button>
        </div>
      </Modal>
    )
  }
  componentWillReceiveProps(nextProps){
    const {page} = this.props.state;
    const next = nextProps.state;
    if(next.page !== page){
      const param={
        size:10,
        page:next.page,
        category:1,
      };
      this.props.getData(param);
      if(next.page !== page){
        return null;
      }
    }
  }
  addKeyWord = (val,checkList) => {
    let params;
    if(!val){message.warning('关键词不能为空'); return;}
    if(this.props.navList.plugin.consortium===true && this.props.navList.company_id === this.props.navList.root_company[0].id){
      if(checkList===""){message.warning('应用于子公司至少选择一个'); return;}else{
        params = {
          category:1,
          keyword:val,
          department_ids:checkList,
        }
      }
    }else{
      params = {
        category:1,
        keyword:val
      }
    }
    this.props.addFnc(params,()=>{
      this.setState({addModal:''});
      const param = {
        size:10,
        page:this.props.state.page,
        category:1,
      }
      this.props.getData(param)
    })
  };
  editKeyWord = (id,val,checkList) => {
    let params;
    if(!val){message.warning('关键词不能为空'); return;}
    if(this.props.navList.plugin.consortium===true&& this.props.navList.company_id === this.props.navList.root_company[0].id){
      if(checkList===""){message.warning('应用于子公司至少选择一个'); return;}else{
        params = {
          target_id:id,
          keyword:val,
          department_ids:checkList,
          category:1,
        }
      }
    }else{
      params = {
        target_id:id,
        keyword:val,
        category:1,
      }
    }
    this.props.editFnc(params,()=>{
      this.setState({addModal:''});
      const param = {
        size:10,
        page:this.props.state.page,
        category:1,
      }
      this.props.getData(param)
    })
  }
  addBlackList = () => {
    this.setState({
      addModal:<AddKeyWordModal title="新增货物黑名单"
                                keys="关键词"
                                place="请输入黑名单关键词"
                                isadd={true}
                                limit={15}
                                navList={this.props.navList}
                                closeModal={()=>{this.setState({addModal:''})}}
                                addkeyword={(val,checkList)=>this.addKeyWord(val,checkList)}
                                />
    })
  };
  render(){
    const { blackList,loading,setPageFnc,navList } =this.props;
    const columns = this.columns;
    return(
      <div className="blacklist_table_con">
        <BtnConDiv>
          <Button type="primary"
                  style={{float:"right",marginRight:10}}
                  onClick={()=>this.addBlackList()}>+  新增货物黑名单</Button>
        </BtnConDiv>
        <TableConDiv>
          <Table
                rowKey="id"
                dataSource={blackList.rows}
                columns={navList.plugin.consortium===true&& this.props.navList.company_id === this.props.navList.root_company[0].id?this.groupColumns:columns}
                locale={{emptyText:''}}
                pagination={false}
                loading={loading}
                >
          </Table>
        </TableConDiv>
          {
            blackList.rows.length==0&&<AreaConDiv>
                <AddAreaDiv onClick={()=>this.addBlackList()}>+  点击新增货物黑名单</AddAreaDiv>
              </AreaConDiv>
          }
          {
            blackList.rows.length!==0&&<BottomPage style={{left:this.props.collectionStop?'75px':'210px'}}>
              <Pagination total={blackList.count}
                          style={{float:'right',marginRight:30}}
                          current={this.props.state.page}
                          onChange={(page, pageSize)=>{setPageFnc(page)}}
              />
            </BottomPage>
          }
        {this.state.addModal}
        {this.state.showDeleteModal}
      </div>
    )
  }
}
export default BlackListTable
