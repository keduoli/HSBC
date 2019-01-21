import React from 'react'
import { NavTitle,HeadOpeningFilter,HeadOpeningTable } from 'components'

class HeadOpeningPage extends React.Component{
  state = {
    size:10,
    page:1,
    showInfo:false,
    codeUrl:'',
    fpzl:'',
    gfmc:'',
  }
  clearFnc = () => {
    this.setState({
      size:10,
      page:1,
      showInfo:false,
      fpzl:'',
      gfmc:'',
    })
  }
  searchFnc = (values) => {
    this.setState({
      showInfo:true,
      fpzl:values['fpzl'],
      gfmc:values['gfmc']
    })
  }
  componentWillMount(){
    this.props.getCode((res)=>{
      this.setState({codeUrl:res})
    })
    this.props.getData()
  }
  render(){
    const { getData,loading,headerList,copyOpening,deleteFnc,collectionStop,navList } = this.props;
    return(
      <div>
        <NavTitle title="发票开具"
                  submeun='抬头开票'/>
        <HeadOpeningFilter showInfo={this.state.showInfo}
                           searchFnc={this.searchFnc}
                           clearAllFnc={this.clearFnc}/>
        <HeadOpeningTable state={this.state}
                          loading={loading}
                          copyOpening={copyOpening}
                          headerList={headerList}
                          getData={getData}
                          navList={navList}
                          collectionStop={collectionStop}
                          deleteFnc={deleteFnc}
                          setPageFnc={(page)=>this.setState({page})}/>
      </div>
    )
  }
}

export default HeadOpeningPage
