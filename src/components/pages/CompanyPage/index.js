import React from 'react'
import {NavTitle} from 'components'
import {CompanyConnect} from 'containers'



class CompanyPage extends React.Component{
  render(){
    return(
      <div>
        <NavTitle title="企业设置"
                  submeun='企业信息'/>
        <CompanyConnect />
      </div>
    )
  }
}

export default CompanyPage
