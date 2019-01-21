import React from 'react'
import {NavTitle,CodeOpeningFilter,CodeOpeningTable} from 'components'

class CodeOpeningPage extends React.Component{
  state = {
    size:10,
    page:1,
    showInfo:false,
    orderno:'',
    ordertime:'',
    kjzt:'',
  }
  clearFnc = () => {
    this.setState({
      size:10,
      page:1,
      showInfo:false,
      orderno:'',
      ordertime:'',
      kjzt:'',
    })
  }
  searchFnc = (values) => {
    this.setState({
      showInfo:true,
      orderno:values['orderno'],
      ordertime:values['ordertime'],
      kjzt:values['kjzt']
    })
  }
  componentWillMount(){
    this.props.getData()
  }
  render(){
    const { getData,orderList,loading,collectionStop } = this.props;
    return(
      <div>
        <NavTitle title="发票开具"
                  submeun='扫码开票'/>
        <CodeOpeningFilter showInfo={this.state.showInfo}
                           searchFnc={this.searchFnc}
                           clearAllFnc={this.clearFnc}/>
        <CodeOpeningTable state={this.state}
                          getData={getData}
                          orderList={orderList}
                          collectionStop={collectionStop}
                          loading={loading}
                          setPageFnc={(page)=>this.setState({page})}/>
      </div>
    )
  }
}

export default CodeOpeningPage;
