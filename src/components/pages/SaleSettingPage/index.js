import React from 'react'
import {NavTitle,SaleSetForm,SaleSetTable} from 'components'
import styled from 'styled-components';

const SaleLeftCon = styled.div`
  float:left;
  width:40%;
  overflow:hidden;
`;
const SaleRightCon = styled.div`
  float:right;
  width:60%;
  overflow:hidden;..
`;
class SaleSettingPage extends React.Component{
  componentWillMount(){
    this.props.getList({user_type:1})
    // this.props.getApplicantList({
    //   page:1,
    //   size:10,
    //   keyword:''
    // })
  }
  render(){
    const { showSetting,setSetting,settingList,getNavList,navList,departUserList,loading,getApplicantList,applicantList,addApplicant } = this.props;
    return(
      <div>
        <NavTitle title="销项管理"
                  submeun='销项设置'/>
        <div style={{overflow:'hidden',width:'100%',background:'#fff'}}>
          <SaleLeftCon>
            <SaleSetForm showSetting={showSetting}
                         setSetting={setSetting}
                         getNavList={getNavList}
                         navList={navList}
                         departUserList={departUserList}
                         settingList={settingList}/>
          </SaleLeftCon>
          <SaleRightCon>
            <SaleSetTable applicantList={applicantList}
                          loading={loading}
                          addApplicant={addApplicant}
                          getApplicantList={getApplicantList}
                          />
          </SaleRightCon>
        </div>
      </div>
    )
  }
}

export default SaleSettingPage;
