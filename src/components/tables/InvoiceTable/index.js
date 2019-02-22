import React from 'react';
import { Table, Button, Modal, Checkbox, message, Input, Tooltip, Pagination, Dropdown, Menu, Select } from 'antd';
import {ExpandInvoice,PictureScaleModal,CookieJs,InvoiceLinkModal} from 'components';
import { zhMoney } from '../../util';
import styled from 'styled-components';
import { withRouter } from 'react-router';
const { Option }  = Select;
const DianSpan = styled.span`
  width:18px;
  height:18px;
  background:url(images/invoice.png) no-repeat 0 0;
`;
const TypeSpan = styled.div`
  height:18px;
  color:#fff;
  text-align:center;
  font-size:12px;
  padding: 1px 1px;
  line-height:17px;
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
  background:url(images/invoice.png) no-repeat -18px 0;
`;
const ZhuanSpan = styled.span`
  width:18px;
  height:18px;
  background:url(images/invoice.png) no-repeat -54px 0;
`;
const BottomPage = styled.div`
  background:#f7f7f7;
  position:fixed;
  bottom:0px;
  right:0px;
  z-index:100;
  padding:10px 10px 0 10px;
  box-sizing:border-box;
	overflow:hidden;
  -webkit-transition: all .2 ease;
  transition: all .2s ease;
`;
class InvoiceTable extends React.Component{
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
      selectJeTotal:'',
      selectSeTotal:'',
      selectJshj:0,
      showJeCount:0,
      showSeCount:0,
      allJe:0,
      allSe:0,
      allJshj:0,
      length:0,
      deteleModal:'',
      showAll:false,
      selectAll:[],
      sortedInfo: {columnKey: "sub_time", field: "sub_time", order: "descend"},
      commls: [],
      exportLoading:false,
      exportImagesLoading:false,
      showInvoiceModal:'',
      cus_id:'',
      cus_name:'---',
      pollingWaring:'',
      pollingFont:<div style={{overflow:'hidden',margin:'0 auto',textAlign:'center',fontSize:13,lineHeight:2}}>
                      发票统计中...
                  </div>
    };
    this.selectAmountArr = [];
  };
  refreshTableTitle = () => {
    let {sortedInfo} = this.state;
    sortedInfo = sortedInfo || {};
    const { showFilter } = this.props.state;
    return [{
      title: '发票序号',
      dataIndex: 'number',
      key:'number',
      sorter: showFilter,
      sortOrder: sortedInfo.columnKey === 'number' && sortedInfo.order,
      render:text=><span>{text?text:'--'}</span>,
      width:'10%',
    },{
      title: '备注',
      dataIndex: 'bz',
      key:'bz',
      render:text=><span>{text?text:'--'}</span>,
      width:'10%',
    },{
      title: '关联状态',
      dataIndex: 'fkzt',
      key:'fkzt',
      render:text=><span>{text?text:'--'}</span>,
      width:'10%',
    },{
      title: '关联客户编号',
      dataIndex: 'cus_num',
      key:'cus_num',
      render:text=><span>{text?text:'--'}</span>,
      width:'10%',
    },{
      title: '关联借据编号',
      dataIndex: 'drawdowns',
      key:'drawdowns',
      render:(text)=>{
        return <div>
                {
                  text.length>0?
                  <div>
                    {
                      text.map((item,index)=>{
                        return <div key={index}>{item}</div>
                      })
                    }
                  </div>
                  :
                  <div>---</div>
                }
               </div>
      },
      width:'10%',
    },{
      title: '关联合同编号',
      dataIndex: 'contracts',
      key:'contracts',
      render:(text)=>{
        return <div>
                {
                  text.length>0?
                  <div>
                    {
                      text.map((item,index)=>{
                        return <div key={index}>{item}</div>
                      })
                    }
                  </div>
                  :
                  <div>---</div>
                }
               </div>
      },
      width:'10%',
    },{
      title: '开票日期',
      dataIndex: 'kprq',
      key:'kprq',
      sorter: showFilter,
      sortOrder: sortedInfo.columnKey === 'kprq' && sortedInfo.order,
      width:'10%',
    },{
      title: '价税合计',
      dataIndex: 'jshj',
      key:'jshj',
      sorter: showFilter,
      sortOrder: sortedInfo.columnKey === 'jshj' && sortedInfo.order,
      render:text=><span>{text?zhMoney(text):'--'}</span>,
      width:'10%',
    },{
      title: '作废标识',
      dataIndex: 'zfbz',
      key:'zfbz',
      sorter: showFilter,
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
      },
      width:'10%',
    },{
      title: '联次',
      dataIndex: 'lc',
      key:'lc',
      render:(text,record,index) => {
        if(record.is_special===0 && record.fplc!==null ){
          let arr = record.fplc.split(",")
          return (
            <div>
              {
                arr.map((value,index) => {
                  return(
                    <div key={index}>
                      { parseInt(value)===0 && "未知联" }
                      { parseInt(value)===1 && "记账联" }
                      { parseInt(value)===2 && "发票联" }
                    </div>
                  )
                })
              }
            </div>
          )
        }else if(record.is_special===1 && record.fplc!==null ){
          let arr = record.fplc.split(",")
          return (
            <div>
              {
                arr.map((value,index) => {
                  return (
                    <div key={index}>
                    { parseInt(value)===0 && "未知联" }
                    { parseInt(value)===1 && "记账联" }
                    { parseInt(value)===2 && "抵扣联" }
                    { parseInt(value)===3 && "发票联" }
                    </div>
                  )
                })
              }
            </div>
          )
        }else{
          return <div>---</div>
        }
      },
      width:'10%',
    },{
      title: '提交日期',
      dataIndex: 'sub_time',
      key:'sub_time',
      sorter: showFilter,
      sortOrder: sortedInfo.columnKey === 'sub_time' && sortedInfo.order,
      render:text=><span>{text?text:'--'}</span>,
      width:'10%',
    },{
      title: '发票类型',
      dataIndex: 'fpzl',
      key:'fpzl',
      render:(text)=>{
        return  (
          <div style={{overflow:'hidden',width:50}}>
            {(text === '04' || text === '11' || text === '98') && <TypeSpan style={{background:"#90ed7d"}}>普票</TypeSpan>}
            {(text === '01' || text === '02' || text === '99') && <TypeSpan style={{background:"#f7a35c"}}>专票</TypeSpan>}
            {text === '10' && <TypeSpan style={{background:"#7cb5ec"}}>电票</TypeSpan>}
            {text === '14' && <TypeSpan style={{background:"rgb(128, 133, 233)"}}>通行费</TypeSpan>}
            {text === '03' && <TypeSpan style={{background:"rgb(241, 92, 128)"}}>机动车</TypeSpan>}
            {text === '15' && <TypeSpan style={{background:"rgb(228, 211, 84)"}}>二手车</TypeSpan>}
          </div>
        )
      },
      width:'10%',
    },{
      title: '发票代码',
      key:'fpdm',
      dataIndex: 'fpdm',
      width:'10%',
    },{
      title: '税额',
      key:'se',
      dataIndex: 'se',
      render:text=><span>{text?zhMoney(text):'--'}</span>,
      width:'10%',
    },{
      title: '发票号码',
      key:'fphm',
      dataIndex: 'fphm',
      width:'10%',
    },{
      title: '销售方税号',
      key:'xfsbh',
      dataIndex: 'xfsbh',
      render:text=><span>{text?text:'--'}</span>,
      width:'10%',
    },{
      title:'销售方开户行/账户',
      key:'xfyhzh',
      dataIndex: 'xfyhzh',
      width:'10%',
      render:text=><span>{text?text:'--'}</span>,
    },{
      title: '销售方地址/电话',
      key:'xfdzdh',
      dataIndex: 'xfdzdh',
      width:'10%',
      render:(text) => {
        if(text!== null){
          const arr = text.split(" ")
          return (
            <div>
              {arr[0]}<br/>{arr[1]}
            </div>
          )
        }
      },
    },{
      title: '机器编号',
      key:'jqbh',
      dataIndex: 'jqbh',
      render:text=><span>{text?text:'--'}</span>,
      width:'10%',
    },{
      title: '销售方名称',
      dataIndex:'xfmc',
      key:'xfmc',
      sorter: showFilter,
      width:'10%',
      sortOrder: sortedInfo.columnKey === 'xfmc' && sortedInfo.order,
      render:(text,record,index)=>{
        if(record.is_car > 0){
          return (
            <Tooltip title={record.xhdwmc?record.xhdwmc:'--'} placement="topLeft"><div style={{width:'80px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{record.xhdwmc?record.xhdwmc:'--'}</div></Tooltip>
          )
        }else{
          return (
            <Tooltip title={record.xfmc?record.xfmc:'--'} placement="topLeft"><div style={{width:'80px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{record.xfmc?record.xfmc:'--'}</div></Tooltip>
          )
        }
      },
    },{
      title: '金额',
      dataIndex:'je',
      key:'je',
      render:text=><span>{text?zhMoney(text):'--'}</span>,
      width:'10%',
    },{
      title: '购买方名称',
      dataIndex:'gfmc',
      key:'gfmc',
      sorter: showFilter,
      width:'10%',
      sortOrder: sortedInfo.columnKey === 'gfmc' && sortedInfo.order,
      render:text=><span>{text?text:'--'}</span>,
    },{
      title: '购买方税号',
      dataIndex:'gfsbh',
      key:'gfsbh',
      render:text=><span>{text?text:'--'}</span>,
      width:'10%',
    },{
      title: '购买方地址/电话',
      dataIndex:'gfdzdh',
      key:'gfdzdh',
      width:'10%',
      render:text=><span>{text?text:'--'}</span>,
    },{
      title: '购买方开户行及账户',
      dataIndex:'gfyhzh',
      key:'gfyhzh',
      width:'10%',
      render:text=><span>{text?text:'--'}</span>,
    },{
      title: '录入员工及部门',
      dataIndex:'entry_id',
      key:'entry_id',
      sorter: showFilter,
      width:'10%',
      sortOrder: sortedInfo.columnKey === 'entry_id' && sortedInfo.order,
      render:(text,record,index)=>{
        return (
          <div>
            {
              (!record.dep_name && !record.realname) ?
                <span>--</span>:
                <div>
                  <p>{record.realname}{record.is_dismiss=='1'&&'(已离职)'}</p>
                  <p>{record.dep_name}</p>
                </div>
            }
          </div>
        )
      },
    },{
      title: '其他备注',
      dataIndex: 'memo',
      key:'memo',
      sorter: showFilter,
      sortOrder: sortedInfo.columnKey === 'memo' && sortedInfo.order,
      render:(text)=><Tooltip title={text?text:'--'} placement="topLeft"><div>{text?text:'--'}</div></Tooltip>,
      width:"10%",
    },{
      title: '状态',
      dataIndex: 'state_cn',
      key:'state_cn',
      width:"10%",
    }];
  }
  showMemoFnc = () => {
    return(
      <Modal title={<TitleSpan>设置其他备注</TitleSpan>}
             style = {{textAlign:'center',top:200}}
             closable={false}
             visible
             width={400}
             onCancel={()=>{this.setState({memoShow:''})}}
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
  customerFnc = (res) => {
    this.setState({customerModal:<Modal   title={<TitleSpan>发票关联客户</TitleSpan>}
                    style = {{textAlign:'center',top:200}}
                    closable={false}
                    visible
                    width={400}
                    maskClosable={false}
                    footer={null}
                >
                <div style={{margin:'10px 0 40px'}}>
                  <div style={{overflow:'hidden',marginBottom:20}}>
                    <div style={{float:'left',width:'33%',textAlign:'right',marginRight:10,lineHeight:'25px',fontSize:12}}>客户编号：</div>
                    <Select style={{float:'left',width:'200px',textAlign:'left'}}
                            allowClear
                            showSearch
                            optionFilterProp="children"
                            onChange={(val)=>{
                              let cus_id = val;
                              let cus_name = res.list.filter((el)=>el.id == val)[0].cus_name;
                              this.setState({cus_name,cus_id},()=>{
                                this.customerFnc(res)
                              })
                            }}>
                      {
                        res.list.map((item)=>{
                          return <Option key={item.id}>{item.cus_num}</Option>
                        })
                      }
                    </Select>
                  </div>
                  <div style={{overflow:'hidden',marginBottom:20}}>
                    <div style={{float:'left',width:'33%',textAlign:'right',marginRight:10,lineHeight:'25px',fontSize:12}}>客户名称：</div>
                    <div style={{float:'left',textAlign:'left',lineHeight:'25px',fontSize:12}}>
                      {this.state.cus_name}
                    </div>
                  </div>
                </div>
                <div>
                <Button onClick={()=>{this.setState({customerModal:'',cus_id:'',cus_name:'---'})}} style={{marginRight:20}}>取消</Button>
                <Button type="primary" onClick={()=>{
                  if(this.state.cus_id == ''){
                    message.error("请选择关联客户编号");return;
                  }
                  const param = {
                    cus_id:this.state.cus_id,
                    ids:this.state.selectedRowKeys.join(',')
                  }
                  this.props.linkCustomer(param,()=>{
                    this.refreshData();
                    this.setState({customerModal:'',cus_id:'',cus_name:'---'})
                  });
                }}>确定</Button>
                </div>
                </Modal>})
  }
  unLinkConFnc = () => {
    return <Modal  title={<TitleSpan>取消关联合同</TitleSpan>}
                  style = {{textAlign:'center',top:200}}
                  closable={false}
                  visible
                  width={400}
                  maskClosable={false}
                  footer={null}
              >
              <div style={{margin:'10px 0 40px'}}>
                点击确认，将取消关联未放款或已放款待补交状态的所有合同，是否确认？
              </div>
              <div>
              <Button onClick={()=>{this.setState({unLinkModal:''})}} style={{marginRight:20}}>取消</Button>
              <Button type="primary" onClick={()=>{
                this.props.unLinkContract({inv_ids:this.state.selectedRowKeys.join(',')},()=>{
                  this.refreshData();
                  this.setState({unLinkModal:''})
                });
              }}>确定</Button>
              </div>
              </Modal>
  }
  unLinkDraFnc = () => {
    return <Modal  title={<TitleSpan>取消关联放款</TitleSpan>}
                  style = {{textAlign:'center',top:200}}
                  closable={false}
                  visible
                  width={400}
                  maskClosable={false}
                  footer={null}
              >
              <div style={{margin:'10px 0 40px'}}>
              点击确认，将取消关联未放款和已放款待补交状态的所有放款，是否确认？
              </div>
              <div>
              <Button onClick={()=>{this.setState({unLinkModal:''})}} style={{marginRight:20}}>取消</Button>
              <Button type="primary" onClick={()=>{
                this.props.unLinkDrawdown({inv_ids:this.state.selectedRowKeys.join(',')},()=>{
                  this.refreshData();
                  this.setState({unLinkModal:''})
                });
              }}>确定</Button>
              </div>
              </Modal>
  }
  showDetele = (val) => {
    this.setState({
      deteleModal:<Modal  title={<TitleSpan>彻底删除提示</TitleSpan>}
                          style = {{textAlign:'center',top:200}}
                          closable={false}
                          visible
                          width={400}
                          maskClosable={false}
                          footer={null}
                    >
                    <div style={{margin:'10px 0 40px'}}>
                      确定彻底删除发票？<br/>
                      彻底删除将从发票管理中移除此发票
                    </div>
                    <div>
                      <Button onClick={()=>{this.setState({deteleModal:''})}} style={{marginRight:20}}>取消</Button>
                      <Button type="primary" onClick={()=>{
                        let param;
                        if(val){
                          param={
                            invoice_ids:val,
                            action:5,
                          };
                        }else{
                          if(this.state.selectArr.indexOf(3) >= 0 || this.state.selectArr.indexOf(4) >= 0){
                            message.error('只有已提交、已保存的发票才能删除');return;
                          }
                          param={
                            invoice_ids:this.state.selectedRowKeys.join(","),
                            action:5,
                          };
                        }
                        this.props.invoiceAction(param,()=>{
                          this.refreshData();
                          this.setState({deteleModal:'',showDetail:''})
                        });
                      }}>确定</Button>
                    </div>
                  </Modal>
    })
  }
  componentWillReceiveProps(nextProps){
    const {cus_num,fpdm,fphm,fkzt,dd_id,con_id,gfmc,es_search,jshj_min,jshj_max,create_time,page,zfbz,fpzl,xfmc, state, time_area,select_all,keyword, is_success,  entry_id, sub_time,order_name,order_value,goRefresh,fplc} = this.props.state;
    const next = nextProps.state;
    if(next.fpdm!==fpdm||next.fphm!==fphm||next.con_id!==con_id||next.fkzt!==fkzt||next.gfmc!==gfmc||next.cus_num!==cus_num||next.es_search!==es_search||next.dd_id!==dd_id|| next.jshj_max!==jshj_max || next.jshj_min!==jshj_min ||next.create_time !== create_time || next.zfbz !== zfbz ||next.xfmc !== xfmc ||next.page !== page || next.state !== state || next.time_area !== time_area || next.keyword !== keyword || next.fpzl !== fpzl || next.is_success !== is_success || next.entry_id !== entry_id || next.sub_time !== sub_time || next.order_name !== order_name || next.order_value !== order_value || next.goRefresh === true || next.fplc !== fplc){
      const param={
        size:10,
        page:next.page,
        state:next.state,
        time_area:next.time_area,
        keyword:next.keyword,
        fpzl:next.fpzl,
        is_success:next.is_success,
        entry_id:next.entry_id,
        sub_time:next.sub_time,
        fplc:next.fplc,
        xfmc:next.xfmc,
        zfbz:next.zfbz,
        jshj_max:next.jshj_max,
        jshj_min:next.jshj_min,
        create_time:next.create_time,
        es_search:next.es_search,
        dd_id:next.dd_id,
        order:JSON.stringify({'order_name':next.order_name,'order_value':next.order_value}),
        select_all:next.select_all,
        cus_num:next.cus_num,
        fpdm:next.fpdm,
        fphm:next.fphm,
        fkzt:next.fkzt,
        gfmc:next.gfmc,
        con_id:next.con_id,
        export:'0',
      };
      this.props.getData(param);
      if(next.goRefresh === true){
        this.props.setRefresh();
      }
      if(next.page !== page){
        return null;
      }else{
        this.selectAmountArr = [];
        this.setState({selectedRowKeys:[],selectAll:[],selectArr:[],selectAmount:'',selectJshj:0,selectJeTotal:'',selectSeTotal:'',showJeCount:0,showSeCount:0});
      }
    }
  };
  refreshData=()=>{
    const {state} = this.props;
    const param={
      size:10,
      page:state.page,
      state:state.state,
      time_area:state.time_area,
      keyword:state.keyword,
      fpzl:state.fpzl,
      is_success:state.is_success,
      entry_id:state.entry_id,
      sub_time:state.sub_time,
      fplc:state.fplc,
      xfmc:state.xfmc,
      zfbz:state.zfbz,
      jshj_max:state.jshj_max,
      jshj_min:state.jshj_min,
      dd_id:state.dd_id,
      order:JSON.stringify({'order_name':state.order_name,'order_value':state.order_value}),
      department_ids:state.department_ids,
      select_all:'',
      create_time:state.create_time,
      es_search:state.es_search,
      cus_num:state.cus_num,
      fpdm:state.fpdm,
      fphm:state.fphm,
      fkzt:state.fkzt,
      gfmc:state.gfmc,
      con_id:state.con_id,
      export:'0',
    };
    this.selectAmountArr = [];
    this.clearSorter();
    this.props.changeCheck()
    this.setState({selectedRowKeys:[],length:0,selectAll:[],showAll:false,selectArr:[],selectAmount:'',selectJshj:0,selectJeTotal:'',selectSeTotal:'',showJeCount:0,showSeCount:0});
    this.props.getData(param);
  };
  invoiceDetail = (res) => {
    return (
      <ExpandInvoice detailList={res.data}
                     invoiceAction={this.props.invoiceAction}
                     memoEdit={true}
                     res={this.props.res}
                     navList={this.props.navList}
                     showDetele={this.showDetele}
                     getDetail={this.props.getDetail}
                     saveScan={this.props.saveScan}
                     showMemoFnc={this.showMemoFnc}
                     invMemoFnc={this.props.invMemoFnc}
                     invoiceAction={this.props.invoiceAction}
                     refreshData={this.refreshData}
                     cancelFnc={()=>{this.setState({showDetail:''})}}
                     showScaleFnc={this.picScaleFnc}
      />
    )
  };
  picScaleFnc = (result,index) => {
    const res = result.filter((obj)=>obj.thumb_path !== "");
    this.setState({
      showPicScale:<PictureScaleModal onCancel={()=>{this.setState({showPicScale:''})}}
                                      items={res}
                                      index={index}
    />})
  };
  printFnc = () => {
    document.getElementById('section-table-print').style.display = 'block';
    const printHtml = document.getElementById('section-table-print').innerHTML;
    document.getElementById('print-table-con').style.display = 'block';
    const newWindow =  document.getElementById('print-table-con');
    newWindow.innerHTML = printHtml;
    document.getElementById('app').style.display = 'none';
    window.print();
    document.getElementById('print-table-con').style.display = 'none';
    document.getElementById('section-table-print').style.display = 'none';
    document.getElementById('app').style.display = 'block';
  }
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
    let all = []
    this.selectAmountArr.map((el)=>{
      el.data.map((item)=>{
        arr.push(item.state);
        all.push(item);
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
    this.setState({selectAll:all,selectedRowKeys,selectArr:arr,length:selectedRowKeys.length,selectAmount:zhMoney(amount),selectJshj:amount,selectSeTotal:zhMoney(seTotal),selectJeTotal:zhMoney(jeTotal),showJeCount:jeTotal,showSeCount:seTotal});
  };
	showPolling = () => {
		const param = {
      invoice_ids:this.state.selectedRowKeys.join(','),
    }
    this.setState({pollingWaring:<Modal title={<TitleSpan>查验提示</TitleSpan>}
                                        visible
                                        footer={null}
                                        onCancel={this.handleWaringCancel}
                                      >
                                    {this.state.pollingFont}  
                                  </Modal>
                                  })
		this.props.pollingFnc(param,(res)=>{  
			if(res.code===0){
        this.setState({
          pollingFont:<div style={{overflow:'hidden',margin:'0 auto',textAlign:'center',fontSize:13,lineHeight:2}}>
                        <p>本次轮询查验发票共计{this.state.selectedRowKeys.length}张 ，仅对未作废的发票进行轮询</p>
                        <p>可稍后查看历史记录，<span style={{color:'#108ee9',cursor:'pointer'}} onClick={()=>{
                          this.props.gotopolling()
                          this.handleWaringCancel()
                        }}>查看详情</span></p>
                        <Button style={{marginTop:20}} onClick={()=>{
                          this.refreshData()
                          this.handleWaringCancel()
                        }}>收起</Button>
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
																		 <p>本次轮询查验发票共计{this.props.invoiceList.count}张</p>
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
  clearSorter = () => {
    this.selectAmountArr = [];
    this.setState({showAll:false,selectedRowKeys:[],selectAll:[],length:0,showAll:false,selectArr:[],selectAmount:'',selectJshj:0,selectJeTotal:'',selectSeTotal:'',showJeCount:0,showSeCount:0,sortedInfo:{columnKey: "sub_time", field: "sub_time", order: "descend"}},()=>{
      let arr;
      if(this.props.navList.role===1){
        arr = CookieJs.getCookie("show2");
      }else{
        arr = CookieJs.getCookie("show");
      }
      this.refreshCustom(arr);
    });
  };
  clearRadiuo = () => {
    this.selectAmountArr = [];
    this.setState({showAll:false,selectedRowKeys:[],selectAll:[],selectJshj:0,length:0,showJeCount:0,showSeCount:0,sortedInfo:{columnKey: "sub_time", field: "sub_time", order: "descend"}})
  }
  componentWillMount(){
    let coms = [];
    let arr;
    if(this.props.navList.role===1){
      arr = CookieJs.getCookie("show2");
    }else{
      arr = CookieJs.getCookie("show");
    }
    const args = this.refreshTableTitle();
    for(let i in arr){
      for(let j in args){
        if(arr[i].name === args[j].title){
          coms.push(args[j]);
          this.setState({
            commls : coms
          })
        }
      }
    }
  }
  refreshCustom = (arr) => {
    let coms = [];
    const args = this.refreshTableTitle();
    for(let i in arr){
      for(let j in args){
        if(arr[i].name === args[j].title){
          coms.push(args[j]);
          this.setState({
            commls : coms
          })
        }
      }
    }
  };
  checkRadiuo = (res) => {
    this.setState({showAll:true,selectAll:this.props.invoiceList.list,selectedRowKeys:res.invoice_ids,allJe:res.total_je,allSe:res.total_se,allJshj:res.total_jshj})
  }
  ckeckArchives = (e) => {
    if(e.key === "11"){
      if(this.state.selectArr.indexOf(1) >= 0 || this.state.selectArr.indexOf(4) >= 0 || this.state.selectArr.indexOf(2) >= 0|| this.state.selectArr.indexOf(6) >= 0){
        message.error('只有已导出的发票才能归档');return;
      }
      const param={
        invoice_ids:this.state.selectedRowKeys.join(","),
        action:11,
      };
      this.props.invoiceAction(param,()=>{
        this.refreshData();
      });
    }else{
      if(this.state.selectArr.indexOf(1) >= 0 || this.state.selectArr.indexOf(4) >= 0 || this.state.selectArr.indexOf(2) >= 0|| this.state.selectArr.indexOf(3) >= 0){
        message.error('只有已归档的发票才能取消归档');return;
      }
      const param={
        invoice_ids:this.state.selectedRowKeys.join(","),
        action:12,
      };
      this.props.invoiceAction(param,()=>{
        this.refreshData();
      });
    }
  }
  showModal = (type) => {
		this.props.getInvoiceList({inv_ids:this.state.selectedRowKeys.join(',')},(res)=>{
			this.setState({showInvoiceModal:this.getInvLink(res,this.state.selectedRowKeys.join(','),type)})
		})
	}
	getInvLink = (res,inv_ids,type) => {
			return <InvoiceLinkModal getInvoiceList={this.props.getInvoiceList}
															 invoiceList={res}
                               inv_ids={inv_ids}
                               invoiceLink={type}
                               record={this.state.selectAll}
                               title={type=='contract'?'发票关联合同':'发票关联放款'}
                               linkContract={this.props.linkContract}
                               linkDrawdown={this.props.linkDrawdown}
                               getContractList={this.props.getContractList}
                               getDrawdownList={this.props.getDrawdownList}
                               refreshData={this.refreshData}
															 cancel={()=>this.setState({showInvoiceModal:''})}/>
	}
  render(){
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
        let se = 0,je = 0,jshj = 0;
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
        <Menu.Item key="11">归档</Menu.Item>
        <Menu.Item key="12">取消归档</Menu.Item>
      </Menu>
    );
    const columns = this.state.commls;
    const {invoiceList,loading} = this.props;
    const hasSelect = selectedRowKeys.length > 0;
    return(
      <div style={{marginBottom:70}} className='invoice_class'>
        <div id='section-table-print'>
          <Table columns={columns}
                 dataSource={this.state.selectAll}
                 pagination={false}
                 rowKey="infoId"/>
          <div style={{marginTop:30}}>
            {
              this.state.selectedRowKeys.length ? <span style={{color:"#337ab7",marginRight:10}}>已勾选 {this.state.selectedRowKeys.length} 张</span>:''
            }
            {
              this.state.length>0&&this.state.showAll===false  ? <span style={{color:"#337ab7",marginRight:10}}>金额&nbsp;&nbsp;总计：￥{this.state.selectJeTotal}</span>:''
            } 
            {
              this.state.showAll===true && this.state.selectedRowKeys.length!==0 && <span style={{color:"#337ab7",marginRight:10}}>金额&nbsp;&nbsp;总计：￥{Number(this.state.allJe).toFixed(2)}</span>
            }
          </div>
          <div>
          {
            this.state.length>0&&this.state.showAll===false  ? <span style={{color:"#337ab7",marginRight:10}}>税额&nbsp;&nbsp;总计：￥{this.state.selectSeTotal}</span>:''
          }
          {
            this.state.length>0&&this.state.showAll===false  ? <span style={{color:"#337ab7"}}>价税合计&nbsp;&nbsp;总计：￥{this.state.selectAmount}</span>:''
          }
          {
            this.state.showAll===true && this.state.selectedRowKeys.length!==0 && <span style={{color:"#337ab7",marginRight:10}}>税额&nbsp;&nbsp;总计：￥{Number(this.state.allSe).toFixed(2)}</span>
          }
          {
            this.state.showAll===true && this.state.selectedRowKeys.length!==0 && <span style={{color:"#337ab7"}}>价税合计&nbsp;&nbsp;总计：￥{Number(this.state.allJshj).toFixed(2)}</span>
          }
          </div>
        </div>
        <div className="invoice-manage-table">
          {
            this.props.state.showInfo && 
            <Table rowSelection={rowSelection}
                   columns={columns}
                   dataSource={invoiceList.list}
                   loading={loading}
                   scroll={{ y: '65vh' }}
                   onRowClick={(record)=>{
                     this.props.getDetail(record.invoiceId,(res)=>{
                       this.setState({showDetail:this.invoiceDetail(res)})
                     })
                   }}
                   onChange={(pagination, filters, sorter)=>{
                     if(sorter.field){
                       const val = sorter.order === "ascend" ? 1: -1;
                       this.setState({sortedInfo:sorter},()=>{
                         let arr;
                         if(this.props.navList.role===1){
                            arr = CookieJs.getCookie("show2");
                         }else{
                            arr = CookieJs.getCookie("show");
                         }
                         this.refreshCustom(arr);
                         this.props.setOrderFnc(sorter.field,val);
                        });
                     }
                   }}
                   pagination={false}
                   rowKey="invoiceId"
            />
          }
        </div>
        <BottomPage style={{left:this.props.collectionStop?'75px':'210px',height:this.state.selectedRowKeys.length===0?60:70}}>
          <div style={{overflow:'hidden',fontSize:12,marginLeft:10,marginBottom:5}}>
            {
              this.state.selectedRowKeys.length ? <span style={{color:"#337ab7",marginRight:10}}>已勾选 {this.state.selectedRowKeys.length} 张</span>:''
            }
            {
              this.state.selectedRowKeys.length!==0&&this.state.showAll===false  ? <span style={{color:"#337ab7",marginRight:10}}>金额&nbsp;&nbsp;总计：￥{this.state.selectJeTotal}</span>:''
            } 
            {
              this.state.showAll===true && this.state.selectedRowKeys.length!==0 && <span style={{color:"#337ab7",marginRight:10}}>金额&nbsp;&nbsp;总计：￥{Number(this.state.allJe).toFixed(2)}</span>
            }
            {
              this.state.selectedRowKeys.length!==0&&this.state.showAll===false  ? <span style={{color:"#337ab7",marginRight:10}}>税额&nbsp;&nbsp;总计：￥{this.state.selectSeTotal}</span>:''
            }
            {
              this.state.selectedRowKeys.length!==0&&this.state.showAll===false  ? <span style={{color:"#337ab7"}}>价税合计&nbsp;&nbsp;总计：￥{this.state.selectAmount}</span>:''
            }
            {
              this.state.showAll===true && this.state.selectedRowKeys.length!==0 && <span style={{color:"#337ab7",marginRight:10}}>税额&nbsp;&nbsp;总计：￥{Number(this.state.allSe).toFixed(2)}</span>
            }
            {
              this.state.showAll===true && this.state.selectedRowKeys.length!==0 && <span style={{color:"#337ab7"}}>价税合计&nbsp;&nbsp;总计：￥{Number(this.state.allJshj).toFixed(2)}</span>
            }
          </div>
          <div style={{overflow:'hidden'}}>
            <Button type="primary"
                    style={{marginRight:5,float:"left"}}
                    disabled={!hasSelect}
                    onClick={()=>{
                      if(this.state.selectArr.indexOf(1) >= 0 || this.state.selectArr.indexOf(4) >= 0|| this.state.selectArr.indexOf(6) >= 0){
                        message.error('只有已提交、已导出的发票才能导出');return;
                      }
                      if(selectedRowKeys.length>2000){
                        message.error("最多只能导出2000条");return;
                      }
                      const param={
                        invoice_ids:selectedRowKeys.join(","),
                      };
                      this.setState({exportLoading:true})
                      this.props.exportAction(param,(res)=>{
                        this.setState({exportLoading:false})
                        this.refreshData();
                      });
                    }}
                    loading={this.state.exportLoading}
            >导出</Button>
            <Button type="primary"
                    style={{marginRight:5,float:"left"}}
                    disabled={!hasSelect}
                    onClick={()=>{
                      if(this.state.selectArr.indexOf(1) >= 0 || this.state.selectArr.indexOf(4) >= 0|| this.state.selectArr.indexOf(6) >= 0){
                        message.error('只有已提交、已导出的发票才能导出');return;
                      }
                      if(selectedRowKeys.length>2000){
                        message.error("最多只能导出2000条");return;
                      }
                      const param={
                        invoice_ids:selectedRowKeys.join(","),
                        order:JSON.stringify({'order_name':this.props.state.order_name,'order_value':this.props.state.order_value}),
                      };
                      this.setState({exportImagesLoading:true})
                      this.props.exportPdfFnc(param,(res)=>{
                        this.setState({exportImagesLoading:false})
                        if(res !== 0) {
                          return;
                        }
                        this.refreshData();
                      });
                    }}
                    loading={this.state.exportImagesLoading}
            >导出发票文件</Button>
            <Button disabled={!hasSelect}
                    type="primary"
                    style={{marginRight:5,float:"left"}}
                    onClick={()=>{
                      if(this.state.selectArr.indexOf(6) >= 0){
                        message.error("已归档的发票不能执行删除操作");return;
                      }
                      const param={
                        invoice_ids:selectedRowKeys.join(","),
                      };
                      this.props.invDeleteFnc(param,()=>{
                        this.refreshData();
                      });
                    }}
            >删除</Button>
            <Button disabled={!hasSelect}
                    style={{marginRight:5,float:"left"}}
                    type="primary"
                    onClick={()=>{
                      this.setState({memoShow:this.showMemoFnc()})
                    }}
            >设置其他备注</Button>
            {
              this.props.navList && this.props.navList.role.indexOf('drawdown') > -1 &&
              <div style={{float:'left',overflow:'hidden'}}>
                <Button disabled={!hasSelect}
                        type="primary"
                        style={{marginRight:5,float:"left"}}
                        onClick={()=>this.showModal('contract')}
                >关联合同</Button>
                <Button disabled={!hasSelect}
                        type="primary"
                        style={{marginRight:5,float:"left"}}
                        onClick={()=>{
                          this.setState({unLinkModal:this.unLinkConFnc()})
                        }}
                >取消关联合同</Button>
                <Button disabled={!hasSelect}
                        type="primary"
                        style={{marginRight:5,float:"left"}}
                        onClick={()=>this.showModal('drawdown')}
                >关联放款</Button>
                <Button disabled={!hasSelect}
                        type="primary"
                        style={{marginRight:5,float:"left"}}
                        onClick={()=>{
                          this.setState({unLinkModal:this.unLinkDraFnc()})
                        }}
                >取消关联放款</Button>
                <Button disabled={!hasSelect}
                        type="primary"
                        style={{marginRight:5,float:"left"}}
                        onClick={()=>{
                          this.props.getCustomerList({},(res)=>{
                            this.customerFnc(res)
                          })
                        }}
                >关联客户</Button>
              </div>
            }
            <Button disabled={!hasSelect}
                    type="primary"
                    style={{marginRight:5,float:"left"}}
                    onClick={()=>{
                      this.showPolling()
                    }}
            >轮询</Button>
            {
              this.props.state.showInfo && 
              <Pagination total={invoiceList.total}
                          style={{float:'right'}}
                          current={this.props.state.page}
                          onChange={(page)=>{
                            this.props.setPageFnc(page);
                          }}/>
            }
          </div>
        </BottomPage>
        {this.state.MackShow}
        {this.state.showDetail}
        {this.state.showPicScale}
        {this.state.memoShow}
        {this.state.deteleModal}
        {this.state.showInvoiceModal}
        {this.state.customerModal}
        {this.state.unLinkModal}
        {this.state.pollingWaring}
      </div>
    )
  }
}
export default InvoiceTable;
