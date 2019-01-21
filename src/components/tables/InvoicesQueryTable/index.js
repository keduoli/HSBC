import React from 'react';
import { Table, Button, Pagination, message, Modal, Select } from 'antd';
import styled from 'styled-components';
import { RedFlushingModal,InvoiceModal } from 'components';
import { apiUrl } from 'config';
import { withRouter } from 'react-router';
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
class InvoicesQueryTable extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedRowKeys:[],
      selectArr:'',
      redFlushingModal:'',
      showDetail:'',
      selectAll:[],
      selectZfbz:[],
      selectKjzt:[]
    }
    this.selectAmountArr = [];
  }
  onSelectChange = (selectedRowKeys,selectedRows) => {
    const findPage = this.selectAmountArr.find((i)=> i.page === this.props.state.page);
    if(findPage){
      findPage.data = selectedRows;
    }else{
      const pageData = {
        page:this.props.state.page,
        data:selectedRows,
      };
      this.selectAmountArr = [...this.selectAmountArr,pageData];
    }
    let arr = [];
    let all = [];
    let zfbz = [];
    let kjzt = [];
    this.selectAmountArr.map((el)=>{
      el.data.map((item)=>{
        arr.push(item.fpzl)
        all.push(item);
        zfbz.push(item.zfbz)
        kjzt.push(item.kjzt)
      })
    })
    this.setState({selectedRowKeys,selectArr:arr,selectAll:all,selectZfbz:zfbz,selectKjzt:kjzt})
  }
  componentWillReceiveProps(nextProps){
    const { fpdm,fphm,xfmc,time_area,source,kp_state,ch_state,fpzl,zfbz,je,gfmc,page,department_ids } = this.props.state;
    const next = nextProps.state;
    if(next.xfmc !== xfmc || next.source !== source || next.department_ids !== department_ids || next.fpdm !== fpdm || next.fphm !== fphm || next.time_area !== time_area || next.kp_state !== kp_state || next.ch_state !== ch_state || next.fpzl !== fpzl || next.zfbz !== zfbz || next.je !== je || next.gfmc !== gfmc || next.page !== page){
      const param = {
        fpdm:next.fpdm,
        fphm:next.fphm,
        time_area:next.time_area,
        kp_state:next.kp_state,
        ch_state:next.ch_state,
        fpzl:next.fpzl,
        zfbz:next.zfbz,
        je:next.je,
        gfmc:next.gfmc,
        page:next.page,
        size:10,
        department_ids:next.department_ids,
        xfmc:next.xfmc,
        source:next.source,
      };
      this.props.getData(param)
    }
  }
  refreshData = () => {
    const {state} = this.props;
    const param = {
      fpdm:state.fpdm,
      fphm:state.fphm,
      time_area:state.time_area,
      kp_state:state.kp_state,
      ch_state:state.ch_state,
      fpzl:state.fpzl,
      zfbz:state.zfbz,
      je:state.je,
      gfmc:state.gfmc,
      size:10,
      page:state.page,
      department_ids:state.department_ids,
      xfmc:state.xfmc,
      source:state.source,
    };
    this.props.getData(param)
    this.setState({selectedRowKeys:[],selectArr:[],selectAll:[],selectZfbz:[],selectKjzt:[]});
  }
  redFlushing = (scan) => {
    if(!scan){
      if(this.state.selectKjzt.indexOf(1) >= 0 || this.state.selectKjzt.indexOf(3) >= 0){
        message.warning("只有开具成功的发票才可以冲红");return;
      }
      if(this.state.selectArr.length>1){
        message.error("每次只能冲红一张发票");return;
      }
      if(this.state.selectAll[0].hczt !== 0){
        message.error("只有未冲红的发票才能冲红");return;
      }
      if(this.state.selectArr[0].zfbz === 1){
        message.error("已作废的发票不能冲红");return;
      }
    }
    if(!this.props.electronicData || this.props.electronicData[0].fjzt === '离线'){
      Modal.error({
        title: '开具失败',
        content: '税控盘状态不在线，请检查税控盘',
      });return;
    }
    this.setState({redFlushingModal:<RedFlushingModal cancel={()=>this.setState({redFlushingModal:''})}
                                                      selectArr={scan?scan.fpzl:this.state.selectArr[0]}
                                                      selectAll={scan?scan:this.state.selectAll[0]}
                                                      getDetail={this.props.getDetail}
                                                      companyList={this.props.companyList}
                                                      selectedRowKeys={scan?scan.id:this.state.selectedRowKeys}
                                                      paperAction={this.props.paperAction}
                                                      eleSetred={this.props.eleSetred}
                                                      refreshData={this.refreshData}
                                                      />})
  }
  invoiceDetail = (res) => {
    return <InvoiceModal  scanData={res}
                          invoiceAction={this.props.invoiceAction}
                          refreshData={this.refreshData}
                          navList={this.props.navList}
                          electronicData={this.props.electronicData}
                          redFlushing={()=>this.redFlushing(res)}
                          exportAction={this.props.exportAction}
                          paperAction={this.props.paperAction}
                          settingList={this.props.settingList?this.props.settingList[0]:''}
                          companyList={this.props.companyList?this.props.companyList:''}
                          cancelFnc={()=>{this.setState({showDetail:''})}}
                      />
  }
  render(){
    const columns = [{
      title: '序号',
      key:'xh',
      dataIndex: 'xh',
      width:'50px', 
      fixed: 'left' ,
      render:(text,record,index)=>{
        return <div>{index+1}</div>
      }
    },{
      title: '发票类型',
      key:'fpzl',
      dataIndex: 'fpzl',
      width:'100px', 
      fixed: 'left',
      render:(text,record,index)=>{
        return  (
          <div>
            {
             ( text === '10' || text === '14' ) && 
             <div>
              <p style={{overflow:'hidden',float:'left'}}>
                <DianSpan/>
              </p>
             </div> 
            }
            {
             ( text === '04' || text === '11' ) && 
             <div>
              <p style={{overflow:'hidden',float:'left',marginRight:10}}>
                <PuSpan/>
              </p>
             </div> 
            }
            {
             ( text === '01' || text === '02' || text === '03' ) && 
             <div>
              <p style={{overflow:'hidden',float:'left'}}>
                <ZhuanSpan/>
              </p>
             </div> 
            }
          </div>
        )
      }
    },{
      title: '发票来源',
      key:'source',
      dataIndex: 'source',
      width:'100px',
      render:(text)=>{
        return(
          <div>
            {text === null && '---'}
            {text === 'pc' && '采集'}
            {text === 'manual' && '手工填开'}
          </div>
        )
      }
    },{
      title: '发票流水号',
      key:'number',
      dataIndex: 'number',
      width:'100px'
    },{
      title: '购方名称',
      key:'gfmc',
      dataIndex: 'gfmc',
      width:'100px',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '发票代码',
      key:'fpdm',
      dataIndex: 'fpdm',
      width:'100px',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '发票号码',
      key:'fphm',
      dataIndex: 'fphm',
      width:'100px',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '开票日期',
      key:'kprq',
      dataIndex: 'kprq',
      width:'100px',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '税额',
      key:'se',
      dataIndex: 'se',
      width:'100px',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '价税合计',
      key:'jshj',
      dataIndex: 'jshj',
      width:'100px',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '开具人',
      key:'kprmc',
      dataIndex: 'kprmc',
      width:'100px',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '开具类型',
      key:'kjlx',
      dataIndex: 'kjlx',
      width:'100px',
      render:(text)=><div>{text?text===2?'红票':'蓝票':'---'}</div>
    },{
      title: '开具状态',
      key:'kjzt',
      dataIndex: 'kjzt',
      width:'100px',
      render:(text)=>{
        return <div>
                {text === 0 && '待开具'}
                {text === 1 && '开具中'}
                {text === 2 && '开具成功'}
                {text === 3 && '开具失败'}
                {text === null && '---'}
              </div>
      }
    },{
      title: '冲红状态',
      key:'hczt',
      dataIndex: 'hczt',
      width:'100px',
      render:(text)=>{
        return <div>
                {text === 0 && '未冲红'}
                {text === 1 && <div style={{color:'red',fontWeight:600}}>已冲红</div>}
                {text === 2 && '冲红中'}
                {text === 3 && '冲红失败'}
                {text === null && '---'}
                {text === -1 && '---'}
               </div>
      }
    },{
      title: '作废标志',
      key:'zfbz',
      dataIndex: 'zfbz',
      width:'100px',
      render:(text,record,index)=>{
        if(record.fpzl === ('10' || '14')){
          return <div>---</div>
        }else{
          if(record.zfbz === 0){
            return (
              <div>未作废</div>
            )
          }else if(record.zfbz ===  1){
            return (
              <div style={{color:"red",fontWeight:1000}}>已作废</div>
            )
          }
        }
      }
    },{
      title: '收票人手机号',
      key:'sprsjh',
      dataIndex: 'sprsjh',
      width:'100px',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '收票人邮箱',
      key:'spryx',
      dataIndex: 'spryx',
      width:'100px',
      render:(text)=><div>{text?text:'---'}</div>
    }]
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const disable = selectedRowKeys.length === 0;
    const { navList,getData,outInvoiceList,loading } = this.props;
    if(navList.admin_level === 0 && navList.plugin.consortium === true && navList.company_id === navList.root_company[0].id){
      columns.push({
        title: '销方名称',
        key:'xfmc',
        dataIndex: 'xfmc',
        width:'100px',
        render:(text)=><div>{text?text:'---'}</div>
      })
    }
    return(
        <div style={{margin:'30px 0 30px 0'}}>
          <div className="invoice-manage-table query-table">
            <Table columns={columns} 
                   rowSelection={rowSelection}
                   loading={loading}
                   scroll={{ x: 1750,y:'73vh' }}
                   dataSource={outInvoiceList.outinvoices}
                   pagination={false}
                   rowKey='id'
                   onRowClick={(record)=>{
                     if(record.kjzt === 1 || record.kjzt === 3){
                       message.warning("只有开具成功的发票才可以查看");return;
                     }
                    this.props.getDetail(record.id,(res)=>{
                      this.setState({showDetail:this.invoiceDetail(res)})
                    })
                  }}/>
          </div>
          <BottomPage style={{left:this.props.collectionStop?'75px':'210px'}}>
            <Button type="primary"
                    disabled={disable}
                    onClick={()=>{
                      if(this.state.selectKjzt.indexOf(1) >= 0 || this.state.selectKjzt.indexOf(3) >= 0){
                        message.warning("只有开具成功的发票才可以导出");return;
                      }
                      this.props.exportAction({outinvoice_ids:this.state.selectedRowKeys.join(','),export_type:"excel"},()=>{
                        this.refreshData()
                      })
                    }}
                    style={{marginRight:10,float:"left"}}>
                    导出
            </Button>
            {
              navList.admin_level === 0 && navList.plugin.consortium === true && navList.company_id === navList.root_company[0].id ?
              ''
              :
              <div>
                <Button type="primary"
                        disabled={disable}
                        style={{marginRight:10,float:"left"}}
                        onClick={()=>{
                          if(this.props.settingList[0].source == 1){
                            message.error("客户端采集状态不能重开发票");return;
                          }
                          if(this.state.selectArr.length>1){
                            message.error("每次只能重开一张发票");return;
                          }
                          if(this.state.selectAll[0].hczt === 1){
                            message.error("已冲红的发票不能重开");return;
                          }
                          this.props.getDetail(this.state.selectedRowKeys+'',(res)=>{
                            this.props.copyOpening(res)
                            if(this.state.selectAll[0].fpzl === ( '10' || '14')){
                              this.props.router.push("/eleopening");
                            }else{
                              this.props.router.push("/papopening");
                            }
                          })
                        }}>
                        复制重开
                </Button>
                <Button type="primary"
                        disabled={disable}
                        onClick={()=>this.redFlushing()}
                        style={{marginRight:10,float:"left"}}>
                        冲红
                </Button>
                <Button type="primary"
                        disabled={disable}
                        style={{marginRight:10,float:"left"}}
                        onClick={()=>{
                          if(this.state.selectKjzt.indexOf(1) >= 0 || this.state.selectKjzt.indexOf(3) >= 0){
                            message.warning("只有开具成功的发票才可以作废");return;
                          }
                          if(this.state.selectArr.length>1){
                            message.error("每次只能作废一张发票");return;
                          }else if(this.state.selectArr[0] === ('10'||'14')){
                            message.error("只能对纸票进行作废操作");return;
                          }
                          if(this.props.settingList[0].tax_control_type === 1){
                            message.error("税控盘不能进行作废操作");return;
                          }
                          if(this.state.selectZfbz.indexOf(1) === 0){
                            message.error("已作废的发票不能进行作废操作");return;
                          }
                          window.invoiceSdk.cancel(
                            'localhost:15678',
                            this.props.companyList&&this.props.companyList.tax_number,
                            this.props.settingList[0].tax_control_type === 1? 'BW_dGVzdHRlc3Q':'dGVzdHRlc3Q',
                            {
                                data: {
                                    InfoKind: this.state.selectAll[0].fpzl === ('04'||'11')?'102':'100',
                                    InvoiceCode: this.state.selectAll[0].fpdm,
                                    InvoiceNo: this.state.selectAll[0].fphm,
                                }
                            }
                          )
                          .then((res)=>{
                            if(res.body.data.Msg === '6011-发票作废成功 [,]'){
                              this.props.paperAction({outinvoice_id:this.state.selectedRowKeys+'',action:2},()=>{
                                this.refreshData()
                              })
                            }else{
                                Modal.error({
                                title: '作废失败',
                                content: res.body.data.Msg,
                              });
                            }
                          })
                        }}>
                        作废
                </Button>
              </div>
            }
            <Button type="primary"
                    disabled={disable}
                    style={{marginRight:10,float:"left"}}
                    onClick={()=>{
                      if(this.state.selectKjzt.indexOf(1) >= 0 || this.state.selectKjzt.indexOf(3) >= 0){
                        message.warning("只有开具成功的发票才可以下载");return;
                      }
                      if(this.state.selectArr.indexOf('01') >= 0||this.state.selectArr.indexOf('02') >= 0||this.state.selectArr.indexOf('03') >= 0||this.state.selectArr.indexOf('04') >= 0||this.state.selectArr.indexOf('11') >= 0){
                        message.error("纸票不能做下载操作");return;
                      }
                      this.props.exportAction({outinvoice_ids:this.state.selectedRowKeys.join(','),export_type:'pdf'},()=>{
                        this.refreshData()
                      })
                    }}>
                    下载
            </Button>
            <Pagination total={outInvoiceList.count}
                        style={{float:'right'}}
                        current={this.props.state.page}
                        onChange={(page, pageSize)=>{
                          this.props.setPageFnc(page);
                        }}
            />
          </BottomPage>
          {this.state.redFlushingModal}
          {this.state.showDetail}
        </div>
    )
  }
}

export default withRouter(InvoicesQueryTable)
