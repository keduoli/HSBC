import React from 'react'
import { NavTitle,WaitOpenFilter,WaitOpenTable } from 'components'

class WaitOpenPage extends React.Component{
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
    const { collectionStop,getData,outInvoiceList,loading } = this.props;
    return(
      <div>
        <NavTitle title="发票开具"
                  submeun='待开发票'/>
        <WaitOpenFilter showInfo={this.state.showInfo}
                        setSearch={(values)=>this.searchFnc(values)}
                        clearState={this.clearFnc}/>
        <WaitOpenTable getData={getData}
                       ref={(ref)=>this.waitTable=ref}
                       outInvoiceList={outInvoiceList}
                       loading={loading}
                       state={this.state}
                       setPage={(page)=>this.setState({page})}/>
      </div>
    )
  }
}

export default WaitOpenPage
