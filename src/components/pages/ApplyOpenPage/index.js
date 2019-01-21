import React from 'react'
import { NavTitle,AllInvoiceCon } from 'components'
import styled from 'styled-components'
import { Button } from 'antd';

const OpenCon = styled.div`
  overflow:hidden;
  display:flex;
  justify-content:space-around;
  margin-top:90px;
`;
const OpenTitle = styled.div`
  font-size:20px;
  line-height:50px;
  font-weight:600;
  height:50px;
  margin-left:10px;
`;
const OpenBtn = styled(Button)`
  width:300px;
  height:150px;
  line-height:150px;
  font-size:20px;
`;
class ApplyOpenPage extends React.Component{
  state = {
    inv_type:'',
  }
  render(){
    const { companyList,rpaOpen,searchFnc,getCompanyList,settingList,saveApply,getCodingList,getFjhList,showSetting,getDetail,copyData,copyOpening,goodsList,loading,getData } = this.props;
    return(
      <div>
        <NavTitle title="发票开具"
                  submeun='申请开票'/>
          {
            this.state.inv_type !== '' ?
            <AllInvoiceCon companyList={companyList}
                           saveApply={saveApply}
                           stcok={this.state.stcok}
                           getDetail={getDetail}
                           rpaOpen={rpaOpen}
                           inv_type={this.state.inv_type}
                           settingList={settingList}
                           copyData={copyData}
                           clearFnc={()=>this.setState({inv_type:''})}
                           copyOpening={copyOpening}
                           goodsList={goodsList}
                           searchFnc={searchFnc}
                           loading={loading}
                           getData={getData}
                           getCodingList={getCodingList}
                           getCompanyList={getCompanyList}/>
            :
            <div style={{background:'#fff',overflow:'hidden',height:'68vh'}}>
              <OpenTitle>选择开具类型</OpenTitle>
              <OpenCon>
                <OpenBtn onClick={()=>this.setState({inv_type:'04'})}>增值税普通发票</OpenBtn>
                <OpenBtn onClick={()=>this.setState({inv_type:'01'})}>增值税专用发票</OpenBtn>
                <OpenBtn onClick={()=>this.setState({inv_type:'10'})}>增值税电子普通发票</OpenBtn>
              </OpenCon>
            </div>
          }
      </div>
    )
  }
}

export default ApplyOpenPage
