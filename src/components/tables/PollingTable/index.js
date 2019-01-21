import React from 'react';
import { Table,Button,Modal,Checkbox,message,Input,Tooltip,Pagination } from 'antd';
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
class PollingTable extends React.Component{
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
      sortedInfo: {columnKey: "sub_time", field: "sub_time", order: "descend"},
			commls: [],
      pollingWaring:'',
      pollingFont:<div style={{overflow:'hidden',margin:'0 auto',textAlign:'center',fontSize:13,lineHeight:2}}>
                      发票统计中...
                  </div>
    };
    this.selectAmountArr = [];
  };
  componentWillReceiveProps(nextProps){
    const {polling_id,jshj_min,jshj_max,effect_way,page,zfbz,is_polling, xfmc, state, time_area, keyword, special_types, einvoice_types, is_success, tag_ids, entry_id, sub_time,order_name,order_value,goRefresh,fplc} = this.props.state;
    const next = nextProps.state;
    if(next.polling_id!==polling_id || next.effect_way!==effect_way || next.jshj_min!==jshj_min || next.jshj_max!==jshj_max || next.is_polling!==is_polling || next.zfbz !== zfbz ||next.xfmc !== xfmc ||next.page !== page || next.state !== state || next.time_area !== time_area || next.keyword !== keyword || next.special_types !== special_types || next.einvoice_types !== einvoice_types || next.is_success !== is_success || next.tag_ids !== tag_ids || next.entry_id !== entry_id || next.sub_time !== sub_time || next.order_name !== order_name || next.order_value !== order_value || next.goRefresh === true || next.fplc !== fplc){
      const param={
        size:10,
        page:next.page,
        state:next.state,
        time_area:next.time_area,
        keyword:next.keyword,
        special_types:next.special_types,
        einvoice_types:next.einvoice_types,
        is_success:next.is_success,
        tag_ids:next.tag_ids,
        entry_id:next.entry_id,
        sub_time:next.sub_time,
        fplc:next.fplc,
        xfmc:next.xfmc,
				zfbz:next.zfbz,
				is_polling:next.is_polling,
				polling:true,
        polling_id:next.polling_id,
        jshj_max:next.jshj_max,
        jshj_min:next.jshj_min,
        effect_way:next.effect_way,
        order:JSON.stringify({'order_name':next.order_name,'order_value':next.order_value}),
      };
      this.props.getData(param);
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
  invoiceDetail = (res) => {
    return (
      <ExpandInvoice detailList={res.data}
                     invoiceAction={this.props.invoiceAction}
                     memoEdit={true}
                     invMemoFnc={this.props.invMemoFnc}
                     refreshData={this.refreshData}
                     cancelFnc={()=>{this.setState({showDetail:''})}}
                     showScaleFnc={this.picScaleFnc}  
      />
    )
	};
	showPolling = () => {
		const param = {
			time_area:this.props.state.time_area,
      is_polling:this.props.state.is_polling,
      jshj_min:this.props.state.jshj_min,
      jshj_max:this.props.state.jshj_max,
      xfmc:this.props.state.xfmc,
      effect_way:this.props.state.effect_way,
    }
    this.setState({pollingWaring:<Modal title={<TitleSpan>查验提示</TitleSpan>}
                                        visible
                                        footer={null}
                                        onCancel={this.handleWaringCancel}
                                      >
                                    {this.state.pollingFont}  
                                  </Modal>
                                  })
		this.props.PollingFnc(param,(res)=>{  
			if(res.code===0){
        this.setState({
          pollingFont:<div style={{overflow:'hidden',margin:'0 auto',textAlign:'center',fontSize:13,lineHeight:2}}>
                        <p>本次轮询查验发票共计{this.props.invoiceList.total}张 ，仅对未作废的发票进行轮询</p>
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
				this.setState({pollingFont:<div style={{overflow:'hidden',margin:'0 auto',textAlign:'center',fontSize:13,lineHeight:2}}>
																		 <p>本次轮询查验发票共计{this.props.invoiceList.total}张</p>
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
	}
	handleWaringCancel = () => {
    this.setState({pollingWaring:'',
                   pollingFont:<div style={{overflow:'hidden',margin:'0 auto',textAlign:'center',fontSize:13,lineHeight:2}}>
                                  发票统计中...
                              </div>})
	}
  picScaleFnc = (result) => {
    const res = result.filter((obj)=>obj.thumb_path !== "");
    this.setState({
      showPicScale:<PictureScaleModal onCancel={()=>{this.setState({showPicScale:''})}}
                                      items={res}
    />})
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
    this.setState({selectArr:arr,selectAmount:zhMoney(amount),selectJshj:amount,selectSeTotal:zhMoney(seTotal),selectJeTotal:zhMoney(jeTotal),showJeCount:jeTotal,showSeCount:seTotal});
  };
	refreshData=()=>{
    const {state} = this.props;
    const param={
      size:10,
      page:state.page,
      state:state.state,
      time_area:state.time_area,
      keyword:state.keyword,
      special_types:state.special_types,
      einvoice_types:state.einvoice_types,
      is_success:state.is_success,
      tag_ids:state.tag_ids,
      entry_id:state.entry_id,
      sub_time:state.sub_time,
      fplc:state.fplc,
      xfmc:state.xfmc,
      zfbz:state.zfbz,
      jshj_max:state.jshj_max,
      jshj_min:state.jshj_min,
      effect_way:state.effect_way,
			is_polling:state.is_polling,
			polling_id:state.polling_id,
      order:JSON.stringify({'order_name':state.order_name,'order_value':state.order_value}),
    };
    this.selectAmountArr = [];
    this.setState({selectedRowKeys:[],selectArr:[],selectAmount:'',selectJshj:0,selectJeTotal:'',selectSeTotal:'',showJeCount:0,showSeCount:0});
    this.props.getData(param);
  };
  handleWaringClick = () => {
    this.setState({pollingWaring:'',
                    pollingFont:<div style={{overflow:'hidden',margin:'0 auto',textAlign:'center',fontSize:13,lineHeight:2}}>
                                    发票统计中...
                                </div>})
    this.refreshData()
    this.props.getHistoryData()
  }
  clearSorter = () => {
		this.setState({sortedInfo:{columnKey: "sub_time", field: "sub_time", order: "descend"}});
		this.refreshData()
	};
  render(){
    const {selectedRowKeys,selectJshj,showJeCount,showSeCount} = this.state;
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
    const rowSelection = {
      selectedRowKeys,
      onChange:this.selectChange,
    };
    const {invoiceList,loading} = this.props;
    const hasSelect = selectedRowKeys.length > 0;
    const hasJshj = selectJshj !== 0;
    const hasJe = showJeCount !== 0;
    const hasSe = showSeCount !== 0;
    return(
      <div style={{marginBottom:60}}>
        <div className="invoice-manage-table">
          <Table columns={columns}
                 dataSource={invoiceList.list}
                 loading={loading}
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
					<Button style={{float:"left",marginRight:30}}
									onClick={this.showPolling}
									type="primary"
									disabled={!invoiceList.total>0}
									>
						开始轮询
					</Button>
          {
						this.props.showInfo&&this.props.total===true&&invoiceList.total>0 ? 
            <div style={{overflow:"hidden",float:"left"}}>
              <span style={{color:"#337ab7",marginRight:20}}>共&nbsp;{invoiceList.total}&nbsp;条</span>
							<span style={{color:"#337ab7",marginRight:20}}>金额&nbsp;&nbsp;总计：￥{invoiceList.sum_result&&invoiceList.sum_result.total_je}</span>
							<span style={{color:"#337ab7",marginRight:20}}>税额&nbsp;&nbsp;总计：￥{invoiceList.sum_result&&invoiceList.sum_result.total_se}</span>
							<span style={{color:"#337ab7"}}>价税合计&nbsp;&nbsp;总计：￥{invoiceList.sum_result&&invoiceList.sum_result.total_jshj}</span>
						</div>
						:''
          }
          <Pagination total={invoiceList.total}
                      style={{float:'right',marginRight:30}}
                      current={this.props.state.page}
                      onChange={(page, pageSize)=>{
                        this.props.setPageFnc(page);
                      }}
          />
        </BottomPage>
        {this.state.showDetail}
				{this.state.showPicScale}
				{this.state.pollingWaring}
      </div>
    )
  }
}
export default PollingTable;
