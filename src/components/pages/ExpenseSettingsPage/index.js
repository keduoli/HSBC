import React from 'react'
import {NavTitle,IncomeContent,AddCallModal} from 'components'

class ExpenseSettingsPage extends React.Component{
  state={
    code:"",
    settingsList:"",
    showModal:<AddCallModal cancelModal={()=>{
                                  this.setState({showModal:''})
                                }}
                            getBunding={this.props.getBunding}
                            getPhoneSend={this.props.getPhoneSend}
                            title="绑定手机号"
                            succModal={()=>{
                                  this.setState({showModal:''})
                                  this.props.settingsGet((res)=>{
                                    this.setState({code:res.code})
                                  })}}
                                />
  }
  componentWillMount(){
    this.props.settingsGet((res)=>{
      this.setState({code:res.code,settingsList:res.data})
    })
  }
  render(){
    return(
      <div>
        <NavTitle title="认证抵扣"
                  submeun='认证抵扣设置'/>
        {
          this.state.code === 20008 ?
          <div>
            {this.state.showModal}
          </div>
          :
          <div>
            {
              this.state.settingsList!=='' &&
              <IncomeContent settingsFnc={this.props.settingsFnc}
                          settingsList={this.state.settingsList}
                          settingsList2={this.props.settingsList}
                          settingsGet={this.props.settingsGet}
                        />
            }
          </div>
        }
      </div>
    )
  }
}

export default ExpenseSettingsPage
