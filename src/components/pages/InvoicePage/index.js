import React from 'react'
import {NavTitle,InvoiceFilter,InvoiceTable,CustomList} from 'components'
import { Input,Icon,Select,Checkbox,message,Button,Radio } from 'antd'
const dateFormat = 'YYYY-MM-DD';
import { withRouter } from 'react-router';
import styled from 'styled-components'
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

const TableContent = styled.div`
  background:#fff;
  padding:10px;
  min-height:70vh;
  position:relative;
`;
const RefreshBtn = styled.div`
  display:inline-block;
  margin-left:20px;
`;
const RefreshIcon = styled(Icon)`
  cursor:pointer;
  &:hover{
    color:#2476f8;
  }
  &:active{
    color:rgb(211,211,211);
  }
`;
const SelectCheck = styled.div`
  width:300px;
  height:30px;
  float:left;
  margin:28px 0 0 15px;
  line-height:30px;
  font-size:12px;
  border:1px solid #d9d9d9;
  border-radius:5px;
  cursor:pointer;
  margin-bottom:10px;
  background:#fff;
  box-sizing:border-box;
`;
const SelectCon = styled.div`
  width:300px;
  position:absolute;
  background:#fff;
  z-index:60;
  border:1px solid #d9d9d9;
  border-radius:5px;
  box-sizing:border-box;
`;
const SelectBtn = styled.div`
  overflow:hidden;
  margin-top:15px;
  border-top:1px solid #d9d9d9;
  text-align:center;
  padding:10px 0 10px 0;
`;
const Search = Input.Search;
class InvoicePage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      showInfo:false,
      page:1,
      state:'2',
      time_area:'',
      keyword:'',
      fpzl:'',
      is_success:'',
      jshj_min:'',
      jshj_max:'',
      searchVal:'',
      entry_id:'',
      sub_time:'',
      order_name:'',
      order_value:'',
      create_time:'',
      fplc:'',
      xfmc:'',
      zfbz:'',
      goRefresh:false,
      isDown:false,
      showTable:true,
      res:"",
      companyList:[],
      indeterminate:true,
      checkAll:false,
      checkedList:[],
      companyList2:[],
      department_ids:'',
      showCheck:true,
      checked:false,
      showFilter:true,
      es_search:'',
      key:'7',
      date:'',
      refresh:true,
      dd_id:"",
      cus_num:'',
      fpdm:'',
      fphm:'',
      fkzt:'',
      gfmc:'',
      con_id:'',
      dd_id:'',
    };
    this.department_ids = '';
  }
  componentWillMount(){
    this.props.getXfmcList()
    this.props.getUserList()
    this.props.getCustomerList()
  };
  showVagueSearch = () => {
    return <div style={{float:'right'}}>
              <Checkbox checked={this.state.checked} onChange={this.vagueChange}>对发票详情查询</Checkbox>
          </div>
  }
  showSearch = () => {
    return <Search placeholder={this.state.checked === true?'请输入发票备注、货劳信息或规格型号':this.props.navList.role===1?"请输入发票序号/发票信息/其他备注进行搜索":"请输入发票序号/发票信息/其他备注进行搜索"}
                   style={{ width:400,marginRight:20,float:'right' }}
                   value={this.state.searchVal}
                   onChange={(e)=>{
                     this.setState({searchVal:e.target.value});
                   }}
                   onSearch={value => {
                      this.setState({
                        keyword:value,
                        showInfo:true,
                        page:1,
                        isDown:true,
                        showCheck:true,
                        es_search:this.state.checked === true ? 1 : 0,
                      },()=>{
                        this.invoiceTable.clearSorter();
                      });
                   }} />
  };
  vagueChange = (e) => {
    this.setState({checked:e.target.checked},()=>{
      if(this.state.checked === false){
        this.setState({showFilter:true},()=>{
          this.clearAllFnc()
        })
      }else{
        this.setState({showFilter:false},()=>{
          this.clearAllFnc()
        })
      }
    })
  }
  showRefreshBtn = () => {
    return(
        <RefreshBtn>
          <RefreshIcon type="sync" onClick={()=>{
            this.clearAllFnc()
            this.getInvoiceData()
            this.filter.resetFields();
            this.invoiceTable.clearSorter();
          }}/>
        </RefreshBtn>
      )
  };
  clearAllFnc = () => {
    this.setState({
      showInfo:false,
      searchVal:'',
      keyword:'',
      checkAll:true,
      page:1,
      state:'2',
      time_area:'',
      fpzl:'',
      is_success:'',
      entry_id:'',
      sub_time:'',
      order_name:'',
      create_time:'',
      order_value:'',
      fplc:'',
      xfmc:'',
      zfbz:'',
      jshj_min:'',
      jshj_max:'',
      es_search:this.state.checked === true ? 1 : 0,
      key:'7',
      dd_id:"",
      date:'',
      cus_num:'',
      fpdm:'',
      fphm:'',
      fkzt:'',
      gfmc:'',
      con_id:'',
      dd_id:'',
    })
    this.filter.resetFields();
    this.props.setInvId(false)
    this.invoiceTable.clearSorter();
  };
  changeIsDown = (val) => {
    this.setState({isDown:val})
  }
  searchAllFnc = (val) => {
    this.props.setInvId(false)
    this.setState({
      keyword:this.state.searchVal,
      showInfo:true,
      state:val.state,
      time_area:val.time_area,
      fpzl:val.fpzl,
      is_success:val.is_success,
      page:1,
      entry_id:this.state.res.role === 1 ? this.state.entry_id : val.entry_id,
      sub_time:val.sub_time,
      fplc:val.fplc,
      xfmc:val.xfmc,
      zfbz:val.zfbz,
      jshj_min:val.jshj_min,
      jshj_max:val.jshj_max,
      create_time:val.create_time,
      cus_num:val.cus_num,
      fpdm:val.fpdm,
      fphm:val.fphm,
      fkzt:val.fkzt,
      gfmc:val.gfmc,
      es_search:this.state.checked === true ? 1 : 0,
      department_ids:this.state.department_ids,
      showCheck:true,
      order:JSON.stringify({'order_name':this.state.order_name,'order_value':this.state.order_value}),
    },()=>{
      this.invoiceTable.clearRadiuo()
      this.invoiceTable.clearSorter();
    })
  };
  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < this.state.companyList.length),
      checkAll: checkedList.length === this.state.companyList.length
    });
    this.department_ids = checkedList+""
  }
  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? this.state.companyList2 : [],
      indeterminate: false,
      checkAll: e.target.checked,
    },()=>{
      this.department_ids = (this.state.checkAll === false ? '' : this.state.companyList2+"");
    });
  }
  checkChange = () => {
    this.setState({department_ids:this.department_ids})
    const param = {
      department_id:this.department_ids,
      is_link:1,
    }
    this.props.getUserList()
    this.props.getXfmcList({department_ids:this.department_ids})
  }
  showCheckbox = () => {
    const { res,companyList } = this.state;
    return (
      <SelectCheck className="check_hover">
        <span style={{marginLeft:10}}>{res.root_company[0].name}</span>
        <SelectCon  className="check_hover_con">
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
            style={{marginLeft:10}}
          >
            {res.root_company[0].name}
          </Checkbox>
          <div style={{height:1,width:'100%',background:"#d9d9d9"}}></div>
          <div style={{marginLeft:10,overflow:'auto',maxHeight:'60vh'}}>
            <CheckboxGroup style={{paddingLeft:10}} options={this.state.companyList} value={this.state.checkedList} onChange={this.onChange} />
          </div>  
          <SelectBtn>
            {/*<Button type='primary' style={{marginRight:15}} onClick={this.onCheckAllChange2}>反选</Button>*/}
            <Button type='primary' disabled={this.state.checkedList.length===0} onClick={this.checkChange}>确定</Button>
          </SelectBtn>    
        </SelectCon>
      </SelectCheck>
    )
  }
  checkInvoice = () => {
    const param = {
      size:10,
      page:this.state.page,
      state:this.state.state,
      time_area:this.state.time_area,
      keyword:this.state.keyword,
      fpzl:this.state.fpzl,
      is_success:this.state.is_success,
      entry_id:this.state.entry_id,
      sub_time:this.state.sub_time,
      fplc:this.state.fplc,
      xfmc:this.state.xfmc,
      zfbz:this.state.zfbz,
      create_time:this.state.create_time,
      order:JSON.stringify({'order_name':this.state.order_name,'order_value':this.state.order_value}),
      select_all:1,
      jshj_min:this.state.jshj_min,
      jshj_max:this.state.jshj_max,
      department_ids:this.state.department_ids,
      es_search:this.state.es_search,
      cus_num:this.state.cus_num,
      fpdm:this.state.fpdm,
      fphm:this.state.fphm,
      fkzt:this.state.fkzt,
      gfmc:this.state.gfmc,
      con_id:this.state.con_id,
      dd_id:this.state.dd_id,
    }
    if(this.state.showCheck === true){
      this.props.getData(param,(res)=>{
        this.invoiceTable.checkRadiuo(res)
        this.setState({showCheck:false})
      })
    }else{
      this.invoiceTable.clearRadiuo()
      this.setState({showCheck:true})
    }
  }
  componentWillReceiveProps(next){
    if(next.invDdid!==false){
      const arr = (next.invDdid+'').split(',');
      this.filter.resetFields();
      this.setState({
        showInfo:true,
        searchVal:'',
        keyword:'',
        checkAll:true,
        page:1,
        state:'2,5,6',
        time_area:'',
        fpzl:'',
        is_success:'',
        entry_id:'',
        sub_time:'',
        order_name:'',
        create_time:'',
        order_value:'',
        fplc:'',
        xfmc:'',
        zfbz:'',
        jshj_min:'',
        jshj_max:'',
        es_search:this.state.checked === true ? 1 : 0,
        key:'7',
        dd_id:arr[0]!=null?arr[0]:'',
        con_id:arr.length>1?(arr[1]?arr[1]:''):'',
        date:'',
        cus_num:'',
        fpdm:'',
        fphm:'',
        fkzt:'',
        gfmc:'',
      })
      const param = {
        page:1,
        state:'2,5,6',
        time_area:'',
        fpzl:'',
        is_success:'',
        entry_id:'',
        sub_time:'',
        create_time:'',
        fplc:'',
        xfmc:'',
        zfbz:'',
        jshj_min:'',
        jshj_max:'',
        key:'7',
        dd_id:arr[0]!=null?arr[0]:'',
        con_id:arr.length>1?(arr[1]?arr[1]:''):'',
        date:'',
        cus_num:'',
        fpdm:'',
        fphm:'',
        fkzt:'',
        gfmc:'',
      }
      this.props.getData(param,()=>{
        this.props.setInvId(false)
      })
    }
  }
  gotopolling = () => {
    const list = this.props.tabData.list;
    let a = list.find(el=>el.key==='polling');
    if(!a){
        list.push({title:'轮询查验',key:'polling'})
        this.props.tabChange({list:list,activeKey:'polling'})
    }else{
        this.props.tabChange({list:list,activeKey:'polling'})
    }
    this.props.router.push("/polling");
    this.props.changeRoute(true);
  }
  render(){
    const { entryUserList,changeRoute,tabChange,tabData,exportPdfFnc,invDeleteFnc,invMemoFnc,customerList,pollingFnc,navList,unLinkContract,unLinkDrawdown,linkCustomer,getDrawdownList,getCustomerList,linkDrawdown,getContractList,linkContract,invoiceAction,invoiceList,exportAction,getInvoiceList } = this.props;
    const { res,companyList } = this.state;
    return(
      <div>
        <NavTitle
          title={(res!=="" && res.admin_level === 0 && res.plugin.consortium === true && res.company_id === res.root_company[0].id)?'进项管理':"发票管理"}
          submeun='发票查询'
          search={this.showSearch}
          refreshBtn={this.showRefreshBtn}
          vagueSearch={res!=="" && res.plugin.es === true ? this.showVagueSearch : ''}
          showCheckbox={(res!=="" && res.admin_level === 0 && res.plugin.consortium === true && res.company_id === res.root_company[0].id)?this.showCheckbox:''}
        />
        <InvoiceFilter ref={ref=>this.filter = ref}
                       showInfo={this.state.showInfo}
                       navList={navList}
                       changeCheck={()=>{
                         this.setState({showCheck:true})
                       }}
                       customerList={customerList}
                       dateChange={this.dateChange}
                       entryUserList={entryUserList}
                       clearChecked={this.clearChecked}
                       exportAction={this.props.exportAction}
                       getExportUrl={this.props.getExportUrl}
                       state={this.state}
                       {...this.props}
                       showCheck={this.state.showCheck}
                       checkInvoice={this.checkInvoice}
                       searchFnc={this.searchAllFnc}
                       clearFnc={this.clearAllFnc}
                       invoiceAction={invoiceAction}
                       changeIsDown={this.changeIsDown}
                       invoiceList={invoiceList}
        />
        <TableContent style={{marginTop:15}}>
          <CustomList getData={this.props.getData}
                      navList={navList}
                      refreshCustomData={this.invoiceTable?this.invoiceTable.refreshCustom:""}
                      refreshLoading={this.invoiceTable?this.invoiceTable.refreshData:""}
                      />
          <InvoiceTable invoiceList={invoiceList}
                        exportAction={exportAction}
                        invDeleteFnc={invDeleteFnc}
                        gotopolling={this.gotopolling}
                        invMemoFnc={invMemoFnc}
                        tabData={tabData}
                        tabChange={tabChange}
                        changeRoute={changeRoute}
                        exportPdfFnc={exportPdfFnc}
                        unLinkContract={unLinkContract}
                        pollingFnc={pollingFnc}
                        navList={navList}
                        unLinkDrawdown={unLinkDrawdown}
                        getInvoiceList={getInvoiceList}
                        getContractList={getContractList}
                        getDrawdownList={getDrawdownList}
                        getCustomerList={getCustomerList}
                        linkCustomer={linkCustomer}
                        loading={this.props.loading}
                        saveScan={this.props.saveScan}
                        linkDrawdown={linkDrawdown}
                        linkContract={linkContract}
                        collectionStop={this.props.collectionStop}
                        getDetail={this.props.getDetail}
                        state={this.state}
                        res={this.state.res}
                        changeCheck={()=>{
                          this.setState({showCheck:true})
                        }}
                        ref={ref=>this.invoiceTable = ref}
                        getData={this.props.getData}
                        invoiceAction={invoiceAction}
                        setRefresh={()=>{
                          this.setState({goRefresh:false})
                        }}
                        setPageFnc={(page)=>{
                          this.setState({page:page})
                        }}
                        setOrderFnc={(name,val)=>{
                          this.setState({order_name:name,order_value:val})
                        }}
          />
        </TableContent>
      </div>
    )
  }
}

export default withRouter(InvoicePage);
