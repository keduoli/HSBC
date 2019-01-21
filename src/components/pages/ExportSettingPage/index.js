import React from 'react'
import {NavTitle ,ExportSettingCon,BlackListTable,CompanyBlackListTable,WhiteListTable} from 'components'
import styled from 'styled-components'
const TableContent = styled.div`
  background:#fff;
  padding:10px;
  min-height:80vh;
  background:#F7FBFF;
`;
const SwitchLog = styled.div`
  background:#fff;
  padding:5px 0 0 5px;
  overflow:hidden;
  width: 100%;
  margin-bottom:10px;
`;

class ExportSettingPage extends React.Component{
  state={
    page:1,
    show:true,
    list_type:1,
    navList:'',
  };
  check_tittle_index = (index) => {
    return index===this.state.list_type ? "log-title active" : "log-title";
  };
  goodsClick = () => {
    this.setState({
      show:true,
    },() => {
      const param={
        size:10,
        page:1,
        category:1,
      };
      this.props.getData(param);
    })  
  }
  companyClick = () => {
    this.setState({
      show: false,
    },() => {
      const param={
        size:10,
        page:1,
        category:2,
      };
      this.props.getData(param);
    })
  }
  whiteClick = () => {
    const param={
      size:10,
      page:1,
      category:-1,
    };
    this.props.getData(param);
  }
  setPageFnc = (page) => {
    this.setState({page:page});
  }
  render(){
    const { blackList,addFnc,editFnc,delFnc,getData,navList,setCheckBlack } = this.props;
    return(
      <div>
        <NavTitle title="发票管理"
                  submeun='发票设置'/>
        <TableContent>
        <SwitchLog>
          <ul>
            <li onClick={() => {
              if(this.state.list_type === 1)return;
              this.setState({
                list_type : 1,
              },()=>{this.goodsClick()});
            }}
                className={ this.check_tittle_index(1) }
            >发票设置</li>
            <li onClick={() => {
              if(this.state.list_type === 2)return;
              this.setState({
                list_type : 2,
              },()=>{this.goodsClick()});
            }}
                className={ this.check_tittle_index(2) }
            >货物黑名单</li>
            <li onClick={() => {
              if(this.state.list_type === 3)return;
              this.setState({
                list_type : 3,
              },()=>{this.companyClick()});
            }}
                className={ this.check_tittle_index(3) }
            >企业黑名单</li>
            <li onClick={() => {
              if(this.state.list_type === 4)return;
              this.setState({
                list_type : 4,
              },()=>{this.whiteClick()});
            }}
                className={ this.check_tittle_index(4) }
            >白名单</li>
          </ul>
        </SwitchLog>
        {
          this.state.list_type === 1 && <ExportSettingCon {...this.props}/>
        }
        {
          this.state.list_type === 2 &&  
          <BlackListTable
            state={this.state}
            addFnc={addFnc}
            editFnc={editFnc}
            delFnc={delFnc}
            getData={getData}
            navList={navList}
            blackList={blackList}
            collectionStop={this.props.collectionStop}
            loading={this.props.loading}
            setPageFnc={(page)=>this.setPageFnc(page)}
          ></BlackListTable>
        }
        {
          this.state.list_type === 3 && 
          <CompanyBlackListTable
            state={this.state}
            addFnc={addFnc}
            collectionStop={this.props.collectionStop}
            editFnc={editFnc}
            setCheckBlack={setCheckBlack}
            delFnc={delFnc}
            getData={getData}
            navList={navList}
            blackList={blackList}
            loading={this.props.loading}
            setPageFnc={(page)=>this.setPageFnc(page)}
          ></CompanyBlackListTable>
        }
        {
          this.state.list_type === 4 &&
          <WhiteListTable
              state={this.state}
              addFnc={addFnc}
              editFnc={editFnc}
              delFnc={delFnc}
              getData={getData}
              whiteList={blackList}
              collectionStop={this.props.collectionStop}
              loading={this.props.loading}
              setPageFnc={(page)=>this.setPageFnc(page)}/>
        }
        </TableContent>
      </div>
    )
  }
}

export default ExportSettingPage
