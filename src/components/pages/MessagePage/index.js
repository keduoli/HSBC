import React from 'react'
import {NavTitle,MessageTable} from 'components'
import styled from 'styled-components'
class MessagePage extends React.Component{
  state={
    page:1,
    size:10,
    is_read:''
  }
  render(){
    const { getMessage,messageList,messageAction,loading } = this.props;
    return(
      <div>
        <MessageTable state={this.state}
                      getMessage={getMessage}
                      messageList={messageList}
                      loading={loading}
                      messageAction={messageAction}
                      setPageFnc={(page)=>this.setState({page})}
                      setReadFnc={(is_read)=>this.setState({is_read})}/>
      </div>
    )
  }
}
export default MessagePage