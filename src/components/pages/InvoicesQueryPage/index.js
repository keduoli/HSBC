import React from 'react'
import {NavTitle,InvoicesQueryFilter,InvoicesQueryTable} from 'components'
import { Link } from 'react-router'
import {Modal} from 'antd'

class InvoicesQueryPage extends React.Component{
  state={
    fpdm:'',
    fphm:'',
    time_area:'',
    kp_state:'',
    ch_state:'',
    fpzl:'',
    zfbz:'',
    je:'',
    gfmc:'',
    page:1,
    size:10,
    department_ids:'',
    showInfo:false,
    xfmc:'',
    source:'',
  }
  componentWillMount(){
    if(this.props.navList.plugin.consortium===true && this.props.navList.company_id === this.props.navList.root_company[0].id && this.props.navList.admin_level === 0){
      const arr = [];
      for(let i in this.props.navList.son_company){
        arr.push(this.props.navList.son_company[i].id)
      }
      this.setState({department_ids:arr+''})
      const param = {
        fpdm:'',
        fphm:'',
        time_area:'',
        kp_state:'',
        ch_state:'',
        fpzl:'',
        zfbz:'',
        je:'',
        gfmc:'',
        page:1,
        size:10,
        department_ids:arr+'',
        xfmc:'',
        source:'',
      }
      this.props.getData(param)
      this.props.getGfmcList({department_ids:arr+''})
    }else{
      this.props.getData()
      this.props.showSetting((res)=>{
        if(res === 21032){
          Modal.error({
            title: '提示',
            content: (
              <div>
                <p>您的企业没有进行销项开票设置</p>
                <p>请在销项管理-销项发票设置页面进行设置</p>
              </div>
            ),
            okText:'去设置',
            onOk() {
              document.getElementById('gotoset').click()
            }})
        }
      })
      this.props.getCompanyList()
      this.props.getGfmcList()
      this.props.getFjhList()
    }
  }
  searchAllFnc = (values) => {
    this.setState({
      fpdm:values['fpdm']?values['fpdm']:'',
      fphm:values['fphm']?values['fphm']:'',
      time_area:values['time_area']?values['time_area']:'',
      kp_state:values['kp_state']?values['kp_state']:'',
      ch_state:values['ch_state']?values['ch_state']:'',
      zfbz:values['zfbz']?values['zfbz']:'',
      je:values['je']?values['je']:'',
      gfmc:values['gfmc']?values['gfmc']:'',
      fpzl:values['fpzl']?values['fpzl']:'',
      xfmc:values['xfmc']?values['xfmc']:'',
      source:values['source']?values['source']:'',
      showInfo:true,
    })
  }
  clearAllFnc = () => {
    this.setState({
      fpdm:'',
      fphm:'',
      time_area:'',
      kp_state:'',
      ch_state:'',
      fpzl:'',
      zfbz:'',
      je:'',
      gfmc:'',
      page:1,
      size:10,
      showInfo:false,
      xfmc:'',
      source:'',
    })
  }
  render(){
    const { collectionStop,navList,getData,outInvoiceList,electronicData,loading,getDetail,detailData,settingList,gfmcList,exportAction,paperAction,eleSetred,copyOpening,getCompanyList,companyList } = this.props;
    return(
      <div>
        <NavTitle title="销项管理"
                  submeun='发票查询'/>
        <InvoicesQueryFilter searchFnc={this.searchAllFnc}
                             clearFnc={this.clearAllFnc}
                             exportAction={exportAction}
                             state={this.state}
                             navList={navList}
                             showInfo={this.state.showInfo}
                             gfmcList={gfmcList}/>
        <InvoicesQueryTable collectionStop={collectionStop}
                            outInvoiceList={outInvoiceList}
                            state={this.state}
                            exportAction={exportAction}
                            copyOpening={copyOpening}
                            paperAction={paperAction}
                            getCompanyList={getCompanyList}
                            settingList={settingList}
                            companyList={companyList}
                            eleSetred={eleSetred}
                            electronicData={electronicData}
                            getDetail={getDetail}
                            detailData={detailData}
                            loading={loading}
                            getData={getData}
                            setPageFnc={(page)=>this.setState({page})}
                            navList={navList}/>
        <Link id='gotoset' style={{display:'none'}} to='/salesetting'></Link>
      </div>
    )
  }
}

export default InvoicesQueryPage
