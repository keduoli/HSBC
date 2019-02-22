import React from 'react';
import { Table,Button,Modal,Pagination } from 'antd';
import {OcrManual,OcrImageScale,WaitInvoiceHandle} from 'components';
import styled from 'styled-components';

const BottomPage = styled.div`
  background:#f7f7f7;
  position:fixed;
  bottom:0px;
  right:0px;
  padding:16px 18px;
  z-index:100;
  overflow:hidden;
  -webkit-transition: all .2 ease;
  transition: all .2s ease;
`;
const LeftImageCon = styled.div`
  width:800px;
  height:450px;
  position:relative;
  background:#616264;
  float:left;
`;
const PdfDiv = styled.div`
  width:100px;
  height:50px;
  display:inline-block;
  text-align:center;
  line-height:50px;
  background:#66abe3;
  color:#fff;
`;
const ErrorBackground = styled.div`
  width:56px;
  height:56px;
  background:url(images/error.png) no-repeat;
  margin:100px auto 20px;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:100px;
  color:#fff;
  display:inline-block;
  line-height:100px;
`;
class WaitConfirmTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedRowKeys:[],
      showDetailModal:null,
      showInvoiceModal:'',
      imageId:'',
      record:'',
      val:false,
      checkModal:'',
      loading:false,
    };
    this.columns = [{
      title: '发票图像',
      dataIndex: 'attachmentId',
      key:'attachmentId',
      width:'10%',
      render:(text,record,index)=>{
        return <img src={'/ajax/invoice/attachment/ocr/'+text} width="100px" height="50px" style={{display:'block'}}/>
      }
    }, {
      title: '发票信息',
      dataIndex: 'fpxx',
      key:'fpxx',
      width:'35%',
      render:(text,record,index)=>
        <span>
          <span style={{marginRight:15}}>发票代码：{record.fpdm}</span>
          <span>发票号码：{record.fphm}</span>
        </span>
    }, {
      title: '文件名',
      dataIndex: 'fileName',
      key:'fileName',
      width:'20%',
    },{
      title: '上传时间',
      dataIndex: 'uploadTime',
      key:'uploadTime',
      width:'15%',
    },{
      title: '查验状态',
      dataIndex: 'status',
      key:'status',
      width:'15%',
    },{
      key:'action',
      render:(text,record,index)=>
        <Button 
                onClick={(e)=>{
                  e.stopPropagation();
                  this.setState({imageId:record.id,record:record,val:false});
                  this.setState({showDetailModal:()=>this.showDetailModalFnc(record)})
                }}
        >查看详情</Button>,
      width:'10%'
    }];
  };
  componentWillReceiveProps(nextProps){
    const {pageNum, status, fphm, fpdm, select_all} = this.props.state;
    const next = nextProps.state;
    if(next.pageNum !== pageNum || next.select_all !== select_all || next.status !== status || next.fphm !== fphm || next.fpdm !== fpdm ){
      const param={
        size:10,
        page:next.pageNum,
        status:next.status,
        fphm:next.fphm,
        fpdm:next.fpdm,
        select_all:next.select_all,
      };
      this.props.getWaitList(param);
      if(next.pageNum !== pageNum){
        return null;
      }else{
        this.setState({selectedRowKeys:[]});
      }
    }
  };
  showDetailModalFnc = (record) => {
    return (
      <Modal
        visible
        onCancel={()=>{this.setState({showDetailModal:null,kprq:''})}}
        width={1200}
        footer={null}
      >
        <div style={{width:'100%'}}>
          <div style={{overflow:'hidden',margin:'0 auto',padding:'10px',width:1200}}>
            <p style={{textAlign:'center',marginBottom:10,width:800}}>
              {
                record.reason_status === 1 && "查验失败"
              }
              {
                record.reason_status === 2 && "等待查验"
              }
              {
                record.reason_status === 3 && "无法查验"
              }
            </p>
            <LeftImageCon>
              <OcrImageScale
                path={'/ajax/invoice/attachment/ocr/'+record.attachmentId}
              />
            </LeftImageCon>
            <div style={{float:'left',marginLeft:60}}>
              <OcrManual ocrData={record}
                         invoiceCode={record.fpdm}
                         waitConfirm={true}
                         getVal={(val)=>{
                           this.setState({val:val})
                         }}
                         val={this.state.val}
                         showSuccess={this.showInvoiceHandle}
                         showError={this.showInvoiceError}
                         goCheck={this.props.goCheck}
                         changeWaitParam={this.props.changeWaitParam}
                         cancelCheckFnc={this.deleteWaitCheck}
              />
            </div>
          </div>
        </div>
      </Modal>
    )
  };
  deleteWaitCheck = (id,type) => {
    const param = {
      ids:id,
    };
    this.props.waitCheckAction(param,()=>{
      type?this.setState({showInvoiceModal:''}):this.setState({showDetailModal:null});
      this.setState({selectedRowKeys:[]});
      this.props.getWaitListFnc();
      this.props.clearCheck();
    })
  };
  showInvoiceHandle = (res,type) => {
    const {navList,linkUserList,formSaveScan,saveScan,goCheck,waitParam,customerList,drawdownList,contractList,getDrawdownList,getContractList} = this.props;
    this.setState({
      showDetailModal:null,
      showInvoiceModal:<WaitInvoiceHandle
        imageId={this.state.imageId}
        detailList={res.data}
        goBack={(val)=>{
          this.setState({showInvoiceModal:null,showDetailModal:()=>this.showDetailModalFnc(this.state.record)})
        }}
        cancelFnc={()=>{this.setState({showInvoiceModal:null})}}
        msg={res.msg}
        navList={navList}
        scanAgain={!!type}
        showInvoiceHandle={()=>this.showInvoiceHandle(res,type)}
        memo={this.state.record.memo}
        state={this.state.record}
        getDrawdownList={getDrawdownList}
        getContractList={getContractList}
        customerList={customerList}
        drawdownList={drawdownList}
        contractList={contractList}
        tag_ids={this.state.record.tag_ids}
        departUserList={linkUserList}
        formSaveScan={formSaveScan}
        saveScan={saveScan}
        showSuccess={this.showInvoiceHandle}
        showError={this.showInvoiceError}
        goCheck={goCheck}
        waitParam={waitParam}
        deleteWaitInvoice={()=>{
          this.deleteWaitCheck(this.state.imageId,2)
        }}
        cancelFnc={this.saveWaitInvoice}
      />
    });
  };
  checkRadiuo = (res) => {
    this.setState({selectedRowKeys:res.ids})
  }
  clearRadiuo = () => {
    this.setState({selectedRowKeys:[]})
  }
  showInvoiceError = (res) => {
    this.setState({
      showDetailModal:null,
      showInvoiceModal:<Modal
        visible
        onCancel={()=>{this.setState({showInvoiceModal:''})}}
        width={1000}
        footer={null}
      >
        <div style={{textAlign:'center'}}>
          <ErrorBackground/>
          <p style={{fontSize:15}}>错误提示</p>
          <p style={{margin:30}}>{res.msg}</p>
          <Button onClick={()=>{this.setState({showInvoiceModal:''})}} style={{marginBottom:80,marginRight:20}}>返回</Button>
          <Button type='primary' onClick={()=>{this.setState({showInvoiceModal:'',showDetailModal:()=>this.showDetailModalFnc(this.state.record)})}} style={{marginBottom:80,marginRight:20}}>再次查验</Button>
          <Button type='primary' onClick={()=>{this.deleteWaitCheck(this.state.imageId,2)}} style={{marginBottom:80}}>删除</Button>
        </div>
      </Modal>
    })
  };
  saveWaitInvoice = () =>{
    this.setState({showInvoiceModal:''});
    this.props.getWaitListFnc();
  };
  selectChange = (selectedRowKeys, selectedRows) => {
    this.setState({selectedRowKeys});
  };
  deleteList = () => {
    const param = {
      ids:this.state.selectedRowKeys.join(","),
    };
    this.props.waitCheckAction(param,()=>{
      this.setState({selectedRowKeys:[]});
      this.props.getWaitListFnc();
      this.props.clearCheck();
    });
  };
  rowClickFun = (record, index, event) => {
    this.setState({imageId:record.id,val:false,record:record});
    this.setState({showDetailModal:()=>this.showDetailModalFnc(record)});
  };
  ocrAlignFnc = () => {
    this.setState({loading:true})
    this.props.ocrCheckFnc({ids:this.state.selectedRowKeys.join(',')},(res)=>{
      this.setState({loading:false,checkModal:<Modal title={<TitleSpan>查验提示</TitleSpan>}
                                       visible
                                       footer={null}
                                       style={{textAlign:'center'}}
                                       onCancel={()=>this.setState({checkModal:''})}
                                     >
                                    <div style={{lineHeight:2}}>共{this.state.selectedRowKeys.length}张发票，有效发票{res.valid}张，{res.success}张查验成功，{res.fail}张查验失败</div>
                                    <Button style={{marginTop:20}} onClick={()=>this.setState({checkModal:''})}>收起</Button>
                                </Modal>})
    },()=>{
      this.setState({loading:false})
    })
  }
  render(){
    const {selectedRowKeys} = this.state;
    const columns = this.columns;
    const rowSelection = {
      selectedRowKeys,
      onChange:this.selectChange,
    };
    const {loading,waitList} = this.props;
    const hasSelect = selectedRowKeys.length > 0;
    return(
      <div style={{marginBottom:60}}>
        <div className="wait-table">
          <Table rowSelection={rowSelection}
                 columns={columns}
                 dataSource={waitList.list}
                 loading={loading}
                 onRowClick={this.rowClickFun}
                 pagination={false}
                 rowKey="id"
          />
        </div>
        <BottomPage style={{left:this.props.collectionStop?'75px':'210px'}}>
          <Button type="primary"
                  style={{marginRight:20}}
                  onClick={this.deleteList}
                  disabled={!hasSelect}
          >删除</Button>
          <Button type="primary"
                  style={{marginRight:20}}
                  onClick={this.ocrAlignFnc}
                  disabled={!hasSelect}
                  loading={this.state.loading}
          >重新查验</Button>
          {
            hasSelect? <span style={{color:"#337ab7"}}>已选中&nbsp;{selectedRowKeys.length}&nbsp;条</span>:''
          }
          <Pagination
                      total={waitList.total}
                      style={{float:'right',marginRight:30}}
                      current={this.props.state.pageNum}
                      onChange={(page, pageSize)=>{
                        this.props.setPage(page);
                      }}
          />
        </BottomPage>
        {this.state.showDetailModal && this.state.showDetailModal()}
        {this.state.showInvoiceModal}
        {this.state.checkModal}
      </div>
    )
  }
}
export default WaitConfirmTable;
