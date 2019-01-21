import React from 'react'
import {NavTitle,CollectionFilter,CollectionTable} from 'components'

class CollectionPage extends React.Component{
  state = {
    size:10,
    page:1,
    name:'',
    tax_number:'',
    showInfo:false,
    source:'',
    state:'',
  }
  componentWillMount(){
    this.props.getData({...this.state})
  }
  clearFnc = () => {
    this.setState({
      size:10,
      page:1,
      name:'',
      tax_number:'',
      showInfo:false,
      source:'',
      state:'',
    })
    this.filter.resetFields();
  }
  searchFnc = (values) => {
    this.setState({
      name:values['name'],
      tax_number:values['tax_number'],
      source:values['source'],
      state:values['state'],
      showInfo:true,
    })
  }
  render(){
    const { getData,monitorList,loading,addMonitor,delMonitor,getContactList,contactList,navList,editFnc } = this.props;
    return(
      <div>
        <NavTitle title="销项管理"
                  submeun='销项设置'/>
        <CollectionFilter clearFnc={this.clearFnc}
                          ref={ref=>this.filter = ref}
                          showInfo={this.state.showInfo}
                          searchFnc={this.searchFnc}/>
        <CollectionTable getContactList={getContactList}
                         getData={getData}
                         loading={loading}
                         navList={navList}
                         addMonitor={addMonitor}
                         companyList={navList.son_company}
                         delMonitor={delMonitor}
                         state={this.state}
                         editFnc={editFnc}
                         monitorList={monitorList}
                         contactList={contactList}
                         setPageFnc={(page)=>this.setState({page})}/>
      </div>
    )
  }
}

export default CollectionPage
