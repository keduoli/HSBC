import React from 'react'
import {NavTitle,FolderFileTable} from 'components'
import { Icon,Table,Modal,Button} from 'antd';
import styled from 'styled-components'
import moment from 'moment';
const RefreshBtn = styled.div`
  display:inline-block;
  margin-left:4px;
`;
const RefreshIcon = styled(Icon)`
  cursor:pointer;
  margin-left:20px;
  &:hover{
    color:#2476f8;
  }
  &:active{
    color:rgb(211,211,211);
  }
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const TableContent = styled.div`
  background:#fff;
  padding:10px;
  min-height:80vh;
`;
const FolderImg = styled.span`
  display:inline-block;
  width:26px;
  height:22px;
  margin:0 10px -5px 0;
  background:url("images/fileIcon.png") no-repeat;
`;
const FolderName = styled.a`
  cursor:pointer;
  color:#333;
  &:hover{
    color:#333;
    text-decoration:underline!important;
  }
`;
const NoChecked = styled.span`
  color: #F6B400;
`;
const DelFolder = styled.span`
  color: #ff7171;
  cursor: pointer;
`;
const DelTip = styled.p`
  font-size: 15px;
  font-weight: 700;
`;
const SuccessIcon = styled.p`
  display: inline-block;
  width:56px;
  height:56px;
  background:url(images/success.png) no-repeat;
  margin:0 auto 10px;
`;
class UploadPage extends React.Component{
  constructor(props){
    super(props);
    this.columns = [{
      title: '监控文件夹名称',
      dataIndex: 'folder_id',
      render:(text,record,index)=><p><FolderImg/><FolderName href="javascript:;" onClick={()=>{this.rowClickFun(record)}}>{record.folder_name}</FolderName></p>,
      width:'50%',
    }, {
      title: '文件数(张）',
      dataIndex: 'total',
      key:'total',
      render:(text,record,index)=>{
        return(
          <div>
            <span style={{display:'inline-block',width:150}}>{record.total}</span>
          </div>
        )
      },
      width:'20%',
    }, {
      title: '未查验文件数(张）',
      dataIndex: 'total',
      key:'unChecked',
      render:(text,record,index)=>{
        return(
          <div>
            {
              record.uncheck > 0 && !this.state.folderChecking.find((el)=>el === record.folder_id) ?
							<NoChecked>{record.uncheck}</NoChecked>
							:
							<span style={{display:'inline-block',width:150,color:"#2397CA"}}>0</span>
            }
          </div>
        )
      },
      width:'20%',
    },{
      title: '操作',
      dataIndex: 'realname',
      key:'realname',
      render:(text,record,index)=>{
        const {folderChecking} = this.state;
        if(folderChecking.length > 0){
          if(folderChecking.find((el)=>el === record.folder_id)){
            return <span>
                      <span style={{color:'#108ee9'}}>查验中 <Icon style={{color:'#108ee9'}} type="loading"/></span>
                    </span>
          }else{
            if(record.uncheck > 0){
              return <span>
                        <a href="javascript:;" onClick={()=>{this.folderCheck(record.folder_id)}}>查验全部</a>
                        <DelFolder  style={{marginLeft:'10px'}} onClick={()=>{this.setState({showDeleteModal:this.deleteFolder(record.folder_id)})}}>删除</DelFolder>
                     </span>
            }else{
              return <DelFolder onClick={()=>{this.setState({showDeleteModal:this.deleteFolder(record.folder_id)})}}>删除</DelFolder>
            }
          }
        }else{
          if(record.uncheck > 0){
            return <span>
                        <a href="javascript:;" onClick={()=>{this.folderCheck(record.folder_id)}}>查验全部</a>
                        <DelFolder style={{marginLeft:'10px'}} onClick={()=>{this.setState({showDeleteModal:this.deleteFolder(record.folder_id)})}}>删除</DelFolder>
                  </span>
          }else{
						return 	<span>
													<a href="javascript:;" style={{color:"gray"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </a>
													<DelFolder style={{marginLeft:'10px'}} onClick={()=>{this.setState({showDeleteModal:this.deleteFolder(record.folder_id)})}}>删除</DelFolder>
										</span>
          }
        }
      },
      width:'10%',
    }];
    this.state={
      subTitle:'',
      time_area:'',
      file_state:'10',
      folderPageNum:1,
      detailPageNum:1,
      folderChecking:[],
      folderId:null,
      showDeleteModal:'',
      checkSuccModal:'',
    };
  };
  deleteFolder = (id) => {
    const folderPageNum = this.state.folderPageNum;
    return(
      <Modal title={<TitleSpan>删除提示</TitleSpan>}
             style = {{textAlign:'center',top:200}}
             closable={false}
             visible
             width={400}
             maskClosable={false}
             footer={null}
      >
        <div style={{margin:'20px 0 30px',fontSize:13,lineHeight:2.5}}>
          <DelTip>确定删除当前文件夹吗？</DelTip>
          <p style={{color:'#ff7171'}}>删除文件夹可能导致查验中的发票无法正常查验</p>
          <p style={{color:'#ff7171'}}>请谨慎操作！</p>
        </div>
        <div>
          <Button onClick={()=>{this.setState({showDeleteModal:''})}} style={{marginRight:20}}>取消</Button>
          <Button type="primary"
                  onClick={()=>{
                    const param = {
                      folder_id:id
                    }
                    this.props.deleteFolder(param,()=>{this.loadPageData(folderPageNum);this.setState({showDeleteModal:''});});
                  }}
          >确定</Button>
        </div>
      </Modal>
    )
  };
  folderCheck = (id) => {
    if(id){
      this.setState(({ folderChecking }) => ({
        folderChecking: [...folderChecking, id],
      }));
      const dateNow = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      const param = {
        folder_id:id,
        user_batch:dateNow,
      };
      this.props.checkAllFile(param,()=>{
        this.setState({folderChecking:[]});
        this.loadPageData();
      });

    }else{
      const {folderId} = this.state;
      this.setState(({ folderChecking }) => ({
        folderChecking: [...folderChecking, folderId],
      }));
      const dateNow = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      const param = {
        folder_id:folderId,
        user_batch:dateNow,
      };
      this.props.checkAllFile(param);
      this.refreshDetailTable1();
    }

  };
  showSearch = () => {
    return <Button type='primary' style={{float:'right',marginRight:20,marginTop:30}}><Icon type='download'/>&nbsp;<a style={{color:"#fff"}} href="http://public.feeclouds.com/pc/FeeClouds_Setup.exe" target="_blank">下载客户端</a></Button>
  };
  showRefreshBtn = () => {
    return(
      <RefreshBtn>
        {
          !this.state.subTitle&&
        <RefreshIcon type="sync"
                     onClick={()=>{
                       const {subTitle,folderPageNum} = this.state;
                       if(subTitle){
                         this.refreshDetailTable();
                       }else{
                         this.loadPageData(folderPageNum);
                       }
                     }}
        />
        }
      </RefreshBtn>
    )
  };
  componentWillMount(){
    this.loadPageData(1);
  };
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  loadPageData = (num) => {
    const param = {
      page:num,
      size:10,
    };
    this.props.getFolderList(param);
  };
  rowClickFun = (row) => {
    this.tableFilterRef.resetFilter();
    const {folderDetail} = this.props;
    const refreshDetailTable = this.refreshDetailTable;
    this.setState({
      subTitle:row.folder_name,
      time_area:'',
      file_state:'10',
      detailPageNum:1,
      folderId:row.folder_id,
    });
    const param = {
      folder_id:row.folder_id,
      time_area:'',
      file_state:'10',
      page:1,
      size:10,
    };
    this.props.getFolderDetail(param,()=>{
      if(folderDetail.checking>0){
        this.timer = setInterval(()=>refreshDetailTable(),5000);
      }
    });
  };
  refreshDetailTable1 = () => {
    const {subTitle,time_area,file_state,detailPageNum,folderId} = this.state;
    const refreshDetailTable2 = this.refreshDetailTable2;
    const param = {
      folder_name:subTitle,
      time_area:time_area,
      file_state:file_state,
      page:detailPageNum,
      size:10,
      folder_id:folderId
    };
    this.props.getFolderDetail(param,()=>{
      this.timer = setInterval(()=>refreshDetailTable2(),5000);
    });
  };
  refreshDetailTable2 = () => {
    const {subTitle,time_area,file_state,detailPageNum,folderId} = this.state;
    const refreshDetailTable = this.refreshDetailTable;
    const {folderDetail} = this.props;
    const param = {
      folder_name:subTitle,
      time_area:time_area,
      file_state:file_state,
      page:detailPageNum,
      size:10,
      folder_id:folderId
    };
    this.props.getFolderDetail(param);
    if(folderDetail.checking == 0){
      clearInterval(this.timer);
      this.setState({checkSuccModal:this.showCheckSuccModal()})
    }
  };
  refreshDetailTable = () => {
    const {subTitle,time_area,file_state,detailPageNum,folderId} = this.state;
    const {folderDetail} = this.props;
    const timer = this.timer;
    const param = {
      folder_name:subTitle,
      time_area:time_area,
      file_state:file_state,
      page:detailPageNum,
      size:10,
      folder_id:folderId
    };
    this.props.getFolderDetail(param);
    clearInterval(timer);
  };
  showCheckSuccModal = () => {
    return (
      <Modal title={<TitleSpan></TitleSpan>}
             style = {{textAlign:'center',top:200}}
             closable={false}
             visible
             width={400}
             maskClosable={false}
             footer={null}
      >
        <div style={{margin:'20px 0 30px',fontSize:13,lineHeight:2.5}}>
          <SuccessIcon/>
          <p>本次查验已完成</p>
        </div>
        <div>
          <Button type="primary" onClick={()=>{this.setState({checkSuccModal:''})}}>确认</Button>
        </div>
      </Modal>
    )
  };
  showBack = () => {
    return <a href="javascript:;"
              style={{marginRight:15,marginTop:2,display:"inline-block",float:"left"}}
              onClick={()=>{
                this.backFolder()
              }}
          >&nbsp;&nbsp;&lt;返回</a>
  }
  backFolder = () => {
    this.setState({subTitle:'',folderChecking:[]});
    this.loadPageData(this.state.folderPageNum);
  };
  setPageFun = (num) => {
    this.setState({detailPageNum:num})
  };
  searchFileFnc = (val) => {
    this.setState({
      detailPageNum:1,
      file_state:val.file_state,
      time_area:val.time_area,
    })
  };
  clearFileFnc = () => {
    this.setState({
      detailPageNum:1,
      file_state:'10',
      time_area:'',
    });
  };
  render(){
    const columns = this.columns;
    const {folderListLoading,folderList} = this.props;
    return(
      <div>
        <NavTitle submeun="文件管理"
                  title="发票录入"
                  search={this.showSearch}
                  refreshBtn={this.showRefreshBtn}
                  back={this.state.subTitle?this.showBack:''}
        />
        <TableContent style={{display:this.state.subTitle?'none':'block',borderLeft:'3px solid #2397CA'}}>
          <Table columns={columns}
                 dataSource={folderList.rows}
                 loading={folderListLoading}
                 pagination={{total:folderList.count,current:this.state.folderPageNum}}
                 onRowDoubleClick={(record)=>{
                   this.rowClickFun(record)
                 }}
                 onChange={(pagination, filters, sorter)=>{
                   this.setState({folderPageNum:pagination.current});
                   this.loadPageData(pagination.current);
                 }}
                 rowKey="folder_id"
          />
        </TableContent>
        <div style={{display:this.state.subTitle?'block':'none'}}>
          <FolderFileTable
            ref={ref=>this.tableFilterRef = ref}
            {...this.props}
            state={this.state}
            setPageFun={this.setPageFun}
            searchFile={this.searchFileFnc}
            clearFile={this.clearFileFnc}
            refreshDetail={this.refreshDetailTable}
            folderCheckFnc={this.folderCheck}
          />
        </div>
        {this.state.showDeleteModal}
        {this.state.checkSuccModal}
      </div>
    )
  }
}

export default UploadPage
