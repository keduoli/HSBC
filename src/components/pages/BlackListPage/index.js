import React from 'react'
import {NavTitle,BlackListTable,CompanyBlackListTable} from 'components'
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
class BlackListPage extends React.Component{
  state={
    page:1,
    show:true,
    list_type:1,
    navList:'',
  };
  check_tittle_index = (index) => {
    return index===this.state.list_type ? "log-title active" : "log-title";
  };
  componentWillMount(){
    const param={
      size:10,
      category:1,
    };
    this.props.getData(param);
    this.props.getNavList((res)=>{
      this.setState({navList:res.data})
    })
  }
  setPageFnc = (page) => {
    this.setState({page:page});
  }
  render(){
    const { blackList,addFnc,editFnc,delFnc,getData,navList } = this.props;
    return(
      <div>
        <NavTitle title={this.state.navList!=="" && this.state.navList.company_id === this.state.navList.root_company[0].id?"进项管理":"企业设置"}
                  submeun='黑名单'/>
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
            >货物黑名单</li>
            <li onClick={() => {
              if(this.state.list_type === 2)return;
              this.setState({
                list_type : 2,
              },()=>{this.companyClick()});
            }}
                className={ this.check_tittle_index(2) }
            >企业黑名单</li>
          </ul>
        </SwitchLog>
        {
          this.state.show === true ? 
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
          :
          <CompanyBlackListTable
            state={this.state}
            addFnc={addFnc}
            collectionStop={this.props.collectionStop}
            editFnc={editFnc}
            setCheckBlack={this.props.setCheckBlack}
            delFnc={delFnc}
            getData={getData}
            navList={navList}
            blackList={blackList}
            loading={this.props.loading}
            setPageFnc={(page)=>this.setPageFnc(page)}
          ></CompanyBlackListTable>
        }
        </TableContent>
      </div>
    )
  }
  goodsClick = () => {
    this.setState({
      show:true,
    },() => {
      const param={
        size:10,
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
        category:2,
      };
      this.props.getData(param);
    })
  }
}
export default BlackListPage
