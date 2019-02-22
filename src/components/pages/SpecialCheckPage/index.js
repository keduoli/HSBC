import React from 'react'
import {NavTitle,SpecialCheckCon} from 'components'

class SpecialCheckPage extends React.Component{
  state = {

  }
  componentDidMount(){
    if(this.props.navList && this.props.navList.role.indexOf('drawdown') > -1){
      this.props.getCustomerList()
    }
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
