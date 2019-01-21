import React from 'react';
import { Table,Button,Modal,Checkbox,message,Input,Tooltip,Pagination,Dropdown,Menu } from 'antd';
import {ExpandInvoice,PictureScaleModal,CookieJs} from 'components';
import { zhMoney } from '../../util';
import styled from 'styled-components';

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
  padding:16px 18px;
	overflow:hidden;
  z-index:100;
  -webkit-transition: all .2 ease;
  transition: all .2s ease;
`;
class PollingDetailTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      MackShow:'',
      selectedRowKeys:[],
      tagVal:[],
      showDetail:'',
      showPicScale:'',
      selectArr:[],
      selectAmount:'',
      memoShow:'',
      selectJshj:0,
      selectJeTotal:'',
      selectSeTotal:'',
      showJeCount:0,
      showSeCount:0,
      allJe:0,
      allSe:0,
      allJshj:0,
      length:0,
      showAll:false,
      sortedInfo: {columnKey: "sub_time", field: "sub_time", order: "descend"},
      commls: [],
      pollingWaring:'',
      exportLoading:false,
      pollingFont:<div style={{overflow:'hidden',margin:'0 auto',textAlign:'center',fontSize:13,lineHeight:2}}>
                      发票统计中...
                  </div>
    };
    this.selectAmountArr = [];
  };
  componentWillReceiveProps(nextProps){
    const {polling_id,select_all,handle,bank,page,zfbz,is_polling, xfmc, state, time_area, keyword, special_types, einvoice_types, is_success, tag_ids, entry_id, sub_time,order_name,order_value,goRefresh,fplc} = this.props.state;
    const next = nextProps.state;
    if(next.bank!==bank || next.handle !== handle ||next.polling_id!==polling_id || next.select_all!==select_all || next.is_polling!==is_polling || next.zfbz !== zfbz ||next.xfmc !== xfmc ||next.page !== page || next.state !== state || next.time_area !== time_area || next.keyword !== keyword || next.special_types !== special_types || next.einvoice_types !== einvoice_types || next.is_success !== is_success || next.tag_ids !== tag_ids || next.entry_id !== entry_id || next.sub_time !== sub_time || next.order_name !== order_name || next.order_value !== order_value || next.goRefresh === true || next.fplc !== fplc){
      const param={
        time_area:next.time_area,
        is_polling:next.is_polling,
        polling_id:next.polling_id,
        is_success:next.is_success,
        zfbz:next.zfbz,
        state:next.state,
        page:next.page,
        handle:next.handle,
        size:10,
        bank:next.bank,
        order:JSON.stringify({'order_name':next.order_name,'order_value':next.order_value}),
      };
      this.props.getPollingDetail(param);
      if(next.goRefresh === true){
        this.props.setRefresh();
      }
      if(next.page !== page){
        return null;
      }else{
        this.selectAmountArr = [];
        this.setState({selectedRowKeys:[],selectArr:[],selectAmount:'',selectJshj:0,selectJeTotal:'',selectSeTotal:'',showJeCount:0,showSeCount:0});
      }
    }
  };
  showPolling = () => {
		const param = {
      ids:this.state.selectedRowKeys.join(","),
      polling_id:this.props.state.polling_id,
    }
    this.setState({pollingWaring:<Modal title={<TitleSpan>查验提示</TitleSpan>}
                                        visible
                                        footer={null}
                                        onCancel={this.handleWaringCancel}
                                      >
                                    {this.state.pollingFont}
                                  </Modal>
                                  },()=>{
                                    this.props.pollingDetailFnc(param,(res)=>{
                                      if(res.code===0){
                                        this.setState({pollingFont:
                                                                  <div style={{overflow:'hidden',margin:'0 auto',textAlign:'center',fontSize:13,lineHeight:2}}>
                                                                    <p>本次轮询查验发票共计{this.state.selectedRowKeys.length}张 ，仅对未作废的发票进行轮询</p>
                                                                    <p>可稍后查看历史记录</p>
                                                                    <Button style={{marginTop:20}} onClick={this.handleWaringClick}>收起</Button>
                                                                  </div>
                                        },()=>{
                                          this.setState({pollingWaring:<Modal title={<TitleSpan>查验提示</TitleSpan>}
                                                                              visible
                                                                              footer={null}
                                                                              onCancel={this.handleWaringCancel}
                                                                            >
                                                                          {this.state.pollingFont}
                                                                        </Modal>
                                                                        })
                                        })
                                      }else if(res.code===20404){
                                        this.setState({pollingFont:
                                                                  <div style={{overflow:'hidden',margin:'0 auto',textAlign:'center',fontSize:13,lineHeight:2}}>
                                                                    <p>本次轮询查验发票共计{this.props.pollingDetail.total}张</p>
                                                                    <p>后台剩余查验使用发票余额不足，请及时充值</p>
                                                                    <p>详情请联系客服：400-9922-752</p>
                                                                  </div>
                                                                  },()=>{
                                                                    this.setState({pollingWaring:<Modal title={<TitleSpan>查验提示</TitleSpan>}
                                                                                                        visible
                                                                                                        footer={null}
                                                                                                        onCancel={this.handleWaringCancel}
                                                                                                      >
                                                                                                    {this.state.pollingFont}
                                                                                                  </Modal>
                                                                                                  })
                                                                  })
                                      }else{
                                        message.error(res.msg)
                                      }
                                    })
                                  })
		
	}
	handleWaringCancel = () => {
		this.setState({pollingWaring:''})
  }
  handleWaringClick = () => {
    this.setState({pollingWaring:'',pollingFont:<div style={{overflow:'hidden',margin:'0 auto',textAlign:'center',fontSize:13,lineHeight:2}}>
                                                    发票统计中...
                                                </div>})
    this.refreshData()
  }
  invoiceDetail = (res) => {
    return (
      <ExpandInvoice detailList={res.data}
                     invoiceAction={this.props.invoiceAction}
                     memoEdit={true}
                     invMemoFnc={this.props.invMemoFnc}
                     navList={this.props.navList}
                     refreshData={this.refreshData}
                     cancelFnc={()=>{this.setState({showDetail:''})}}
                     showScaleFnc={this.picScaleFnc}
      />
    )
  };
  clearSorter = () => {
		this.setState({selectedRowKeys:[],selectArr:[],selectAmount:'',selectJshj:0,selectJeTotal:'',selectSeTotal:'',showJeCount:0,showSeCount:0});
  }
  clearRadiuo = () => {
    this.setState({selectedRowKeys:[],length:0,showAll:false,selectArr:[],selectAmount:'',selectJshj:0,selectJeTotal:'',selectSeTotal:'',showJeCount:0,showSeCount:0});
  }
  picScaleFnc = (result) => {
    const res = result.filter((obj)=>obj.thumb_path !== "");
    this.setState({
      showPicScale:<PictureScaleModal onCancel={()=>{this.setState({showPicScale:''})}}
                                      items={res}
    />})
  };
	showMemoFnc = () => {
    return(
      <Modal title={<TitleSpan>设置其他备注</TitleSpan>}
             style = {{textAlign:'center',top:200}}
             closable={false}
             visible
             width={400}
             maskClosable={false}
             footer={null}
      >
        <div style={{margin:'10px 0 40px'}}>
          <p style={{marginBottom:20,fontSize:13,color:'#999'}}>发票原有的其他备注将被覆盖</p>
          其他备注：<Input placeholder="请输入其他备注" style={{width:280,marginLeft:10}} ref={ref=>this.memoInput = ref}/>
        </div>
        <div>
          <Button onClick={()=>{this.setState({memoShow:''})}} style={{marginRight:20}}>取消</Button>
          <Button type="primary" onClick={()=>{
            if(this.state.selectArr.indexOf(6) >= 0){
              message.error("已归档的发票不能设置其他备注");return;
            }
            let memoVal = this.memoInput.refs.input.value;
            memoVal=memoVal.replace(/\n/g,"")
            memoVal=memoVal.replace(/\r/g,"")
            const str = memoVal.split('');
            for(let i in str){
              if(str[i] == '|' || str[i] == '&' || str[i] == ';' || str[i] == '$' || str[i] == '%' || str[i] == '<' || str[i] == '>' ||
                str[i] == '(' || str[i] == ')' || str[i] == '+' || str[i] == '\\'){
                  message.error("其他备注不能包含非法字符");return;
                }
            }
            const param={
              invoice_ids:this.state.selectedRowKeys.join(","),
              memo:memoVal?memoVal:'',
            };
            this.props.invMemoFnc(param,()=>{
              this.setState({memoShow:''});
              this.refreshData();
            });
          }}>确定</Button>
        </div>
      </Modal>
    )
  };
	selectChange = (selectedRowKeys, selectedRows) => {
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
    let amount = 0;
    let jeTotal = 0;
    let seTotal = 0;
    this.selectAmountArr.map((el)=>{
      el.data.map((item)=>{
        arr.push(item.state);
        if(item.jshj){
          amount += parseFloat(new Number(item.jshj));
        }
        if(item.je){
          jeTotal += parseFloat(new Number(item.je));
        }
        if(item.se){
          seTotal += parseFloat(new Number(item.se));
        }
      });
    });
    this.setState({selectedRowKeys});
    this.setState({selectArr:arr,length:selectedRowKeys.length,selectAmount:zhMoney(amount),selectJshj:amount,selectSeTotal:zhMoney(seTotal),selectJeTotal:zhMoney(jeTotal),showJeCount:jeTotal,showSeCount:seTotal});
  };
	refreshData=()=>{
    const {state} = this.props;
    const param={
      time_area:state.time_area,
      is_polling:state.is_polling,
      polling_id:state.polling_id,
      is_success:state.is_success,
      zfbz:state.zfbz,
      state:state.state,
      page:state.page,
      size:10,
      handle:state.handle,
      bank:state.bank,
      order:JSON.stringify({'order_name':state.order_name,'order_value':state.order_value}),
    };
    this.selectAmountArr = [];
    this.props.changeCheck()
    this.setState({selectedRowKeys:[],length:0,showAll:false,selectArr:[],selectAmount:'',selectJshj:0,selectJeTotal:'',selectSeTotal:'',showJeCount:0,showSeCount:0});
    this.props.getPollingDetail(param);
  };
  checkRadiuo = (res) => {
    if(res.data.invoice_ids){
      this.setState({showAll:true,selectedRowKeys:res.data.invoice_ids,allJe:res.data.total_je,allSe:res.data.total_se,allJshj:res.data.total_jshj})
    }
  }
  render(){
    let {sortedInfo} = this.state;
    const columns = [{
      title: '发票代码',
      key:'fpdm',
      dataIndex: 'fpdm'
    },{
      title: '发票号码',
      key:'fphm',
      dataIndex: 'fphm'
    },{
      title: '开票日期',
      dataIndex: 'kprq',
      key:'kprq',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'kprq' && sortedInfo.order
    },{
      title: '销方名称',
      dataIndex:'xfmc',
      key:'xfmc',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'xfmc' && sortedInfo.order,
      render:(text,record,index)=>{
        if(record.is_car > 0){
          return (
            <Tooltip title={record.xhdwmc?record.xhdwmc:'--'} placement="topLeft"><div style={{width:'160px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{record.xhdwmc?record.xhdwmc:'--'}</div></Tooltip>
          )
        }else{
          return (
            <Tooltip title={record.xfmc?record.xfmc:'--'} placement="topLeft"><div style={{width:'160px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{record.xfmc?record.xfmc:'--'}</div></Tooltip>
          )
        }
      }
    },{
      title: '销方税号',
      key:'xfsbh',
      dataIndex: 'xfsbh',
      render:text=><span>{text?text:'--'}</span>
    },{
      title: '税额',
      key:'se',
      dataIndex: 'se',
      render:text=><span>{text?text:'--'}</span>
    },{
      title: '金额',
      dataIndex:'je',
      key:'je',
      render:text=><span>{text?text:'--'}</span>
    },{
      title: '价税合计',
      dataIndex: 'jshj',
      key:'jshj',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'jshj' && sortedInfo.order,
      render:text=><span>{text?text:'--'}</span>
    },{
      title: '作废标识',
      dataIndex: 'zfbz',
      key:'zfbz',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'zfbz' && sortedInfo.order,
      render:(text,record,index)=>{
        if(record.zfbz === "N"){
          return (
            <div>未作废</div>
          )
        }else if(record.zfbz ===  "Y"){
          return (
            <div style={{color:"red",fontWeight:1000}}>已作废</div>
          )
        }else{
          return (
            <div>- - -</div>
          )
        }
      }
    },{
      title: '状态',
      dataIndex: 'state',
      key:'state'
    },{
      title: '处理状态',
      dataIndex: 'handle',
      key:'handle',
      render:text=><span>{text?text:'--'}</span>
    },{
      title: '所属分行',
      dataIndex: 'bank',
      key:'bank',
      render:text=><span>{text?text:'--'}</span>
    },{
      title: '轮询状态',
      dataIndex: 'polling_times',
      key:'polling_times',
      render:(text,record,index)=>{
        if(text===null || text<=0){
          return <div style={{color:"red"}}>未轮询</div>
        }else{
          return <div style={{color:"#35AEE3"}}>已轮询</div>
        }
      }  
    }];
		sortedInfo = sortedInfo || {};
		const {selectedRowKeys,selectJshj,showJeCount,showSeCount} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange:this.selectChange,
      onSelect: (record, selected) => {
        if(selected===false){
          this.setState({
            allJe:this.state.allJe-record.je,
            allSe:this.state.allSe-record.se,
            allJshj:this.state.allJshj-record.jshj
           })
        }else{
         this.setState({
           allJe:this.state.allJe+Number(record.je),
           allSe:this.state.allSe+Number(record.se),
           allJshj:this.state.allJshj+Number(record.jshj),
          })
        }
     },
     onSelectAll: (selected, selectedRows,changeRows) => {
        var se = 0,je = 0,jshj = 0;
        for(let i in changeRows){
          se = se+Number(changeRows[i].se);
          je = je+Number(changeRows[i].je);
          jshj = jshj+Number(changeRows[i].jshj);
        }
        if(selected===false){
          this.setState({
            allJe:this.state.allJe-je,
            allSe:this.state.allSe-se,
            allJshj:this.state.allJshj-jshj,
            })
        }else{
          this.setState({
            allJe:this.state.allJe+Number(je),
            allSe:this.state.allSe+Number(se),
            allJshj:this.state.allJshj+Number(jshj),
          })
        }
      }
    };
    const menu = (
      <Menu onClick={this.ckeckArchives}>
        <Menu.Item key="0">归档</Menu.Item>
        <Menu.Item key="1">取消归档</Menu.Item>
      </Menu>
    );
    const {pollingDetail,detailLoading} = this.props;
    const hasSelect = selectedRowKeys.length > 0;
    return(
      <div style={{marginBottom:60}}>
        <div className="invoice-manage-table">
					<Table columns={columns}
								 rowSelection={rowSelection}
                 dataSource={pollingDetail.list}
                 loading={detailLoading}
                 onRowClick={(record)=>{
                   this.props.getDetail(record.invoiceId,(res)=>{
                     this.setState({showDetail:this.invoiceDetail(res)})
                   })
                 }}
                 onChange={(pagination, filters, sorter)=>{
                   if(sorter.field){
                     const val = sorter.order === "ascend" ? 1: -1;
                     this.setState({sortedInfo:sorter},()=>{
                        this.props.setOrderFnc(sorter.field,val);
                      });
                   }
                 }}
                 pagination={false}
                 rowKey="invoiceId"
          />
        </div>
				<BottomPage style={{left:this.props.collectionStop?'75px':'210px'}}>
            <Button style={{float:"left",marginRight:5}}
                    onClick={this.showPolling}
                    disabled={!hasSelect}
                    type="primary">
                    重新查验
            </Button>
            <Button type="primary"
                  style={{marginRight:5}}
                  disabled={!hasSelect}
                  onClick={()=>{
                    if(this.state.selectArr.indexOf(1) >= 0 || this.state.selectArr.indexOf(4) >= 0|| this.state.selectArr.indexOf(6) >= 0){
                      message.error('只有已提交、已导出的发票才能导出');return;
                    }
                    const param={
                      invoice_ids:selectedRowKeys.join(","),
                    };
                    this.setState({exportLoading:true})
                    this.props.exportAction(param,()=>{
                      this.setState({exportLoading:false})
                      this.refreshData();
                    });
                  }}
                  loading={this.state.exportLoading}
						>导出</Button>
						<Button disabled={!hasSelect}
										style={{marginRight:5}}
										onClick={()=>{
											this.setState({memoShow:this.showMemoFnc()})
										}}
            >设置其他备注</Button>
						<Button disabled={!hasSelect}
										style={{marginRight:5}}
										onClick={()=>{
                      const param={
                        invoice_ids:selectedRowKeys.join(","),
                      };
                      this.props.handlePolling(param,()=>{
                        this.refreshData();
                      })
										}}
            >标记处理</Button>
            {
              this.state.selectedRowKeys.length!==0 && <span style={{color:"#337ab7",marginRight:5}}>共&nbsp;&nbsp;{this.state.selectedRowKeys.length}&nbsp;&nbsp;条</span>
            }
						{
              this.state.length>0&&this.state.showAll===false  ? <span style={{color:"#337ab7",marginRight:5}}>金额&nbsp;&nbsp;总计：￥{this.state.selectJeTotal}</span>:''
            } 
            {
              this.state.length>0&&this.state.showAll===false  ? <span style={{color:"#337ab7",marginRight:5}}>税额&nbsp;&nbsp;总计：￥{this.state.selectSeTotal}</span>:''
            }
            {
              this.state.length>0&&this.state.showAll===false  ? <span style={{color:"#337ab7"}}>价税合计&nbsp;&nbsp;总计：￥{this.state.selectAmount}</span>:''
            }
            {
              this.state.showAll===true && this.state.selectedRowKeys.length!==0 && <span style={{color:"#337ab7",marginRight:5}}>金额&nbsp;&nbsp;总计：￥{Number(this.state.allJe).toFixed(2)}</span>
            }
            {
              this.state.showAll===true && this.state.selectedRowKeys.length!==0 &&<span style={{color:"#337ab7",marginRight:5}}>税额&nbsp;&nbsp;总计：￥{Number(this.state.allSe).toFixed(2)}</span>
            }
            {
              this.state.showAll===true && this.state.selectedRowKeys.length!==0 && <span style={{color:"#337ab7"}}>价税合计&nbsp;&nbsp;总计：￥{Number(this.state.allJshj).toFixed(2)}</span>
            }
          <Pagination total={pollingDetail.total}
                      style={{float:'right',marginRight:30}}
                      current={this.props.state.page}
                      onChange={(page, pageSize)=>{
                        this.props.setPageFnc(page);
                      }}
          />
        </BottomPage>
        {this.state.MackShow}
        {this.state.showDetail}
        {this.state.showPicScale}
        {this.state.memoShow}
        {this.state.pollingWaring}
      </div>
    )
  }
}
export default PollingDetailTable;
