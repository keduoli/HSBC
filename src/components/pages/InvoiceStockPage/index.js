import React from 'react'
import {NavTitle,InvoiceStockFilter,InvoiceStockTable} from 'components'

class InvoiceStockPage extends React.Component{
  state = {
    showInfo:false,
    buy_time:'',
    page:1,
    size:10,
    category:'',
  }
  componentWillMount(){
    this.props.showSetting()
    this.props.getData({
      buy_time:'',
      page:1,
      size:10,
      category:'',
    })
  }
  clearFnc = () => {
    this.setState({
      showInfo:false,
      buy_time:'',
      page:1,
      size:10,
      category:'',
    })
  }
  searchFnc = (val) => {
    this.setState({
      showInfo:true,
      buy_time:val['buy_time'],
      category:val['category'],
    })
  }
  render(){
    const { collectionStop,getData,repertroyList,loading,addRepertroy,addQuota,settingList,editRepertroy,delRepertroy,showSetting } = this.props;
    return(
      <div>
        <NavTitle title="销项管理"
                  submeun='发票库存'/>
        <InvoiceStockFilter showInfo={this.state.showInfo}
                            clearAllFnc={this.clearFnc}
                            searchFnc={this.searchFnc}/>
        <InvoiceStockTable collectionStop={collectionStop}
                           state={this.state}
                           settingList={settingList}
                           addQuota={addQuota}
                           editRepertroy={editRepertroy}
                           delRepertroy={delRepertroy}
                           showSetting={showSetting}
                           repertroyList={repertroyList}
                           getData={getData}
                           loading={loading}
                           addRepertroy={addRepertroy}
                           setPageFnc={(page)=>this.setState({page})}
                           />
      </div>
    )
  }
}

export default InvoiceStockPage
