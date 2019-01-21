import React from 'react'
import { Table,Button,Modal,Tooltip,Popover} from 'antd'
import {FolderFilter,ExpandInvoice} from 'components'
import styled from 'styled-components'
import {Link} from 'react-router';
import moment from 'moment';

const FileBar = styled.div`
  height:55px;
  background:#fff;
  padding:0 20px 0 10px;
  marginBottom:34px;
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
  min-height:75vh;
`;
const FileImg = styled.span`
  display:inline-block;
  width:21px;
  height:24px;
  margin:0 10px -5px 0;
  background:url("images/IMG.png") no-repeat;
  background-size:contain;
`;
const PdfImg = styled.span`
  display:inline-block;
  width:21px;
  height:24px;
  margin:0 10px -5px 0;
  background:url("images/PDF.png") no-repeat;
  background-size:contain;
`;
const DeleteBtn = styled.a`
  color:#8b8b8b;
  margin-right:30px;
  display: inline-block;
  margin-left: 10px;
  &:hover{
    text-decoration:underline!important;
  }
`;
const ItemSpan = styled.span`
  background: #FF7E7E;
  border-radius: 2px;
	padding: 0 8px;
	color:#fff;
`;
const SuccSpan = styled.span`
  display:block;
  background: #2397CA;
  border-radius: 2px;
	padding: 0 8px;
	color:#fff;
`;
const WaitSpan = styled.span`
  display:block;
  background: #EEAE00;
  border-radius: 2px;
	padding: 0 8px;	
	color:#fff;
`;
const ItemErrSpan = styled.span`
  float: left;
  width: 13px;
  height: 13px;
  margin-right: 5px;
  margin-top: 2px;
  background: url('images/error-icon.png') no-repeat;
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
const SubTitleSpan = styled.div`
  float:left;
  margin-left:58px;
  font-size: 14px;
  color: #222222;
  font-weight:600;
`;
const WaringTitle = styled.p`
  textAlign:right;
  marginTop:7px;
  fontSize:12px;
  float:left;
`;
class FolderFileTable extends React.Component{
  constructor(props){
    super(props);
    this.columns = [{
      title: '文件名',
      dataIndex: 'name',
      key:'name',
      render:text=><p>{text.lastIndexOf('.pdf') > 0 ?<PdfImg/>:<FileImg/>}<span>{text}</span></p>,
      width:'25%'
    },{
      title: '发票类型',
      dataIndex: 'invoice_type',
      key:'',
      render:(text,record,index)=>{
        return(
          <span>
            { record.state.invoice_type==0?<PuSpan/>:""}
            { record.state.invoice_type==1?<ZhuanSpan/>:""}
        </span>
        )
      },
      width:'7%'
    },{
      title: '联次',
      dataIndex: 'fplc',
      key:'',
      render:(text,record,index)=>{
        return(
          <span>
          {
            record.state.invoice_type==0&&this.switchFplc(record.state.invoice_type,record.fplc)
          }
          {
            record.state.invoice_type==1&&this.switchFplc(record.state.invoice_type,record.fplc)
          }
          {
            record.state.fplc_related&&<Popover content={'此发票其他联次已于'+record.state.fplc_related.time+'录入'+record.state.fplc_related.name}
              title={null}
              placement="top"
              overlayStyle={{minWidth:'200px'}}>
              <span style={{cursor:'pointer',marginLeft:'5px'}}>此发票其他联次已录入过</span>
            </Popover>
          }
          </span>
        )
      },
      width:'18%'
    },{
      title: '上传时间',
      dataIndex: 'create_time',
      key:'create_time',
      width:'15%'
    },{
      title: '发票状态',
      dataIndex: 'state',
      key:'state',
      render:(text,record) => {
        if(text.forbidens.length > 0){
          if(text.forbidens.find((item)=>item.id ===6 )){
            return <ItemSpan>发票抬头或纳税人识别号不一致</ItemSpan>
          }else if(text.forbidens.find((item)=>item.id ===5 )){
            return <div>
              <ItemSpan>重复录入</ItemSpan>
             {/*<span style={{marginLeft:8,color:'blue',cursor:'pointer'}} onClick={()=>this.getDetailFnc(record.id)}>查看详情</span>*/}
            </div>
          }else if(text.forbidens.find((item)=>item.id ===10 )){
            return <ItemSpan>销方单位为黑名单企业</ItemSpan>
          }else if(text.forbidens.find((item)=>item.id ===7 )){
            return <ItemSpan>发票详情含货物黑名单信息</ItemSpan>
          }
        }else{
          if(text.state_msg === "查验成功" && text.state_msg === "查验成功(白名单)"){
            return <SuccSpan style={{float:'left'}}>{text.state_msg}</SuccSpan>
          }else{
            return <WaitSpan style={{float:'left'}}>{text.state_msg}</WaitSpan>
          }
        }
      },
      width:'18%'
    }, {
      title: '操作',
      dataIndex: 'action',
      key:'action',
      render:(text,record,index)=>{
            {
              const state_msg = record.state.state_msg;
              if(state_msg == "未查验"){
                return <span>
                          <a href="javascript:;" onClick={()=>{this.checkFun(record.id)}}>查验</a>
                          <DeleteBtn href="javascript:;" onClick={()=>{this.setState({showDeleteModal:this.deleteFile(record)})}}>删除</DeleteBtn>
                      </span>
              }else if(state_msg == "等待查验" || state_msg == "查验失败"){
                return <span>
                          <Link to="/ocr">待确认发票</Link>
                      </span>
              }else if(state_msg === "查验成功") {
                return <span>
                          <Link to="/invoice">发票管理</Link>
                      </span>
              }else{
                return <span>--</span>
              }
            }
      },
      width:'15%'
    }];
    this.state={
      showDeleteModal:'',
      checking:false,
      checkAll:false,
      checkTime:'',
      haveTime:'',
      showDetail:''
    }
  };
  getDetailFnc = (invoiceId) => {
    this.props.getDetail(invoiceId,(res)=>{
      this.setState({showDetail:this.invoiceDetail(res)})
    });
  };
  invoiceDetail = (res) => {
    return (
      <ExpandInvoice detailList={res.data}
                     invoiceAction={this.props.invoiceAction}
                     memoEdit={false}
                     cancelFnc={()=>{this.setState({showDetail:null})}}
                     showScaleFnc={this.picScaleFnc}
                     state={9}
      />
    )
  };
  switchFplc = (type,fplc) => {
    if(type==0&&fplc==1){
      return "记账联";
    };
    if(type==0&&fplc==2){
      return "发票联";
    };
    if((type==1&&fplc==0)||(type==0&&fplc==0)){
      return "未知联";
    };
    if(type==1&&fplc==1){
      return "记账联";
    };
    if(type==1&&fplc==2){
      return "抵扣联";
    };
    if(type==1&&fplc==3){
      return "发票联";
    };
  };
  inTimeOn = () => {
    const {checkTime,haveTime} = this.state;
    let times = '';
    const dateNow = new Date();
    const timers = dateNow.getTime();
    if(checkTime){
      const result = timers - haveTime;
      if(result > 60000){
        times = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        this.setState({checkTime:times,haveTime:timers});
      }else{
        times = checkTime;
        this.setState({checkTime:times,haveTime:timers});
      }
    }else{
      const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      times = date;
      this.setState({checkTime:date,haveTime:timers});
    }
    return times;
  };
  checkFun = (id) => {
    const time = this.inTimeOn();
    const param = {
      attachment_id:id,
      user_batch:time,
    };
    this.props.checkEachFile(param,()=>{
    this.props.refreshDetail();
    });
    this.props.refreshDetail();
  };
  deleteFile = (record) => {
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
          <p>删除发票仅删除费耘系统中的发票图像，不会删除本地文件</p>
          <p>删除文件后，本地文件中相同名称的文件不会再次上传</p>
        </div>
        <div>
          <Button onClick={()=>{this.setState({showDeleteModal:''})}} style={{marginRight:20}}>取消</Button>
          <Button type="primary"
                  onClick={()=>{
                    const attachmentId = record.id;
                    const param = {attachment_id:attachmentId};
                    this.props.deleteFile(param,()=>{this.props.refreshDetail();this.setState({showDeleteModal:''});});
                  }}
          >确定</Button>
        </div>
      </Modal>
    )
  };
  componentWillReceiveProps(nextProps){
    const {time_area,file_state,detailPageNum,folderId} = this.props.state;
    const next = nextProps.state;
    if(next.time_area !== time_area || next.file_state !== file_state || next.detailPageNum !== detailPageNum || next.folderId !== folderId){
      const param={
        size:10,
        page:next.detailPageNum,
        file_state:next.file_state,
        time_area:next.time_area,
        folder_name:next.subTitle,
        folder_id:next.folderId
      };
      this.props.getFolderDetail(param);
    }
  };
  checkAll = () => {
    this.props.folderCheckFnc();
    this.setState({checkAll:true});
  };
  resetFilter = () => {
    this.filterRef.resetFields();
  };
  render(){
    const {folderDetail,folderDetailLoading,state,searchFile,clearFile} = this.props;
    const columns = this.columns;
    return(
      <div>
        <FileBar>
          <div style={{lineHeight:'55px',float:'left',borderLeft:'3px solid #2397CA',width:"100%"}}>
            <SubTitleSpan>{this.props.state.subTitle}</SubTitleSpan>
            <div style={{float:"right",marginRight:65}}>
              <span style={{fontSize:13,color:'#000',marginRight:37,marginLeft:15}}>已上传 <span style={{fontSize:14,fontWeight:600}}>{folderDetail.total}</span> 张发票</span>
              <span style={{fontSize:13,color:'#000',marginRight:18}}>未查验 <span style={{fontSize:14,fontWeight:600}}>{this.state.checkAll?0:folderDetail.uncheck}</span> 张</span>
              {
                state.folderChecking.find((el)=>el === state.folderId) && folderDetail.checking > 0?
                  <Button type="primary" loading={true}>查验中</Button>
                  :
                  <span>
                    {folderDetail.uncheck>0?<Button onClick={this.checkAll}>查验全部</Button>:''}
                </span>
              }
            </div>
          </div>
          <div style={{float:'right',overflow:'hidden'}}>
            <WaringTitle style={{marginRight:18}}><Link style={{display:"inline-block",color:"#2397CA"}} to="/invoice">点击查看查验成功发票</Link></WaringTitle>
            <WaringTitle><Link style={{display:"inline-block",color:"#2397CA"}} to="/ocr">点击查看查验失败 / 无法识别发票</Link></WaringTitle>
          </div>
        </FileBar>
        <FolderFilter style={{marginBottom:10}} searchFile={searchFile} ref={ref=>this.filterRef = ref} clearFile={clearFile}/>
        <TableContent>
          <Table
            columns={columns}
            pagination={{total:folderDetail.count,current:state.detailPageNum}}
            dataSource={folderDetail.rows}
            loading={folderDetailLoading}
            rowKey="id"
            onChange={(pagination, filters, sorter)=>{
              this.props.setPageFun(pagination.current);
            }}
          />
        </TableContent>
        {this.state.showDeleteModal}
        {this.state.showDetail}
      </div>
    )
  }
}
export default FolderFileTable;
