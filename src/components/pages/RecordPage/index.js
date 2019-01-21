import React from 'react'
import {NavTitle,RecordForm} from 'components'
import styled from 'styled-components'

const RecordContent = styled.div`
  min-height:80vh;
  background:#fff;
  text-align:center;
  padding-bottom:30px;
`;
class RecordPage extends React.Component{
  componentWillMount(){
    this.props.getUserList();
  };
  render(){
    const {linkUserList,recordAddFnc,navList} = this.props;
    return(
      <div>
        <NavTitle submeun="其他发票录入"
                  title="发票录入"/>
        <RecordContent style={{borderLeft:'3px solid #2397CA'}}>
          <RecordForm linkUserList={linkUserList}
                      recordAddFnc={recordAddFnc}
                      navList={navList}
          />
        </RecordContent>
      </div>
    )
  }
}

export default RecordPage
