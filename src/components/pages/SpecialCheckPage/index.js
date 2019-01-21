import React from 'react'
import {NavTitle,SpecialCheckCon} from 'components'

class SpecialCheckPage extends React.Component{
  state = {

  }
  componentWillMount(){
    this.props.getCustomerList()
  }
  render(){
    const { customerList,checkSpecial,navList } = this.props;
    return(
      <div>
        <NavTitle title="发票录入"
									submeun='特别发票录入'/>
        <SpecialCheckCon customerList={customerList}
                         checkSpecial={checkSpecial}
                         navList={navList}/>
      </div>
    )
  }
}

export default SpecialCheckPage;
