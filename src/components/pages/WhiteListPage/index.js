import React from 'react'
import {NavTitle,WhiteListTable} from 'components'
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
class WhiteListPage extends React.Component{
  state={
    page:1,
    show:true,
    list_type:1,
    navList:''
  }
  componentWillMount(){
    const param={
      size:10,
      category:-1,
    };
    this.props.getData(param);
  }
  setPageFnc = (page) => {
    this.setState({page:page});
  }
  render(){
    const { whiteList,addFnc,editFnc,delFnc,getData} = this.props;
    return(
      <div>
        <NavTitle title="企业设置"
                  submeun='白名单'/>
        <TableContent>
          {/*<SwitchLog>
            <ul>
              <li className="log-title active">货物白名单</li>
            </ul>
          </SwitchLog>*/}
          <WhiteListTable
              state={this.state}
              addFnc={addFnc}
              editFnc={editFnc}
              delFnc={delFnc}
              getData={getData}
              whiteList={whiteList}
              collectionStop={this.props.collectionStop}
              loading={this.props.loading}
              setPageFnc={(page)=>this.setPageFnc(page)}/>
        </TableContent>
      </div>
    )
  }
}
export default WhiteListPage
