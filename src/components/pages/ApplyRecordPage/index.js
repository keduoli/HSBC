import React from 'react'
import { NavTitle,ApplyRecordFilter,ApplyRecordTable } from 'components'

class ApplyRecordPage extends React.Component{
  state = {
    size:10,
    page:1,
    showInfo:false,
    gfmc:'',
    status:'',
    gfsbh:'',
    time_area:'',
  }
  clearFnc = () => {
    this.setState({
      size:10,
      page:1,
      showInfo:false,
      gfmc:'',
      status:'',
      gfsbh:'',
      time_area:'',
    })
  }
  searchFnc = (values) => {
    this.setState({
      showInfo:true,
      status:values['status'],
      gfmc:values['gfmc'],
      gfsbh:values['gfsbh'],
      time_area:values['time_area'],
    })
  }
  componentWillMount(){
    this.props.getData()
  }
  render(){
    const { collectionStop,getData,outInvoiceList,loading,getApplyDetail,applyAction,copyOpening,companyList,getCompanyList,getGoodList,
            searchFnc,getTypeFnc,getCodingList } = this.props;
    return(
      <div>
        <NavTitle title="发票开具"
                  submeun='待开发票'/>
        <ApplyRecordFilter showInfo={this.state.showInfo}
                        setSearch={(values)=>this.searchFnc(values)}
                        clearState={this.clearFnc}/>
        <ApplyRecordTable getData={getData}
                       ref={(ref)=>this.waitTable=ref}
                       outInvoiceList={outInvoiceList}
                       getApplyDetail={getApplyDetail}
                       copyOpening={copyOpening}
                       companyList={companyList}
                       getCompanyList={getCompanyList}
                       getGoodList={getGoodList}
                       searchFnc={searchFnc}
                       getTypeFnc={getTypeFnc}
                       getCodingList={getCodingList}
                       applyAction={applyAction}
                       loading={loading}
                       state={this.state}
                       setPage={(page)=>this.setState({page})}/>
      </div>
    )
  }
}

export default ApplyRecordPage
