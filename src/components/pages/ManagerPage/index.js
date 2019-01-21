import React from 'react'
import {NavTitle,ManagerTable,ManagerMsg} from 'components'
import styled from 'styled-components'
const ManagerLeft = styled.div`
  float:left;
  width:65%;
  overflow:hidden;
  background:#fff;
  height:80vh;
`;
const ManagerRight = styled.div`
  float:right;
  overflow:hidden;
  background:#fff;
  height:80vh;
  width:33%;
`;
class ManagerPage extends React.Component{
  state={
    show:false,
    record:{
      relateds:[]
    }
  }
  showDetail = (record) => {
    this.setState({
      show:false
    },()=>{
      this.setState({
        show:true,
        record:record
      })
    })
  }
  cancel = () => {
    this.setState({
      show:false,
      record:{
        relateds:[]
      }
    })
  }
  refreshTable = () =>{
    this.ManagerTable.refreshTable()
  }
  render(){
    const {getData, addAdmin, editAdmin, getInfo, adminList, infoList, navList,deteleAdmin} = this.props;
    return(
      <div>
        <NavTitle title="集团设置"
                  submeun='集团管理员'/>
        <ManagerLeft style={{width:this.state.show === false ? '100%':'65%',transition:'all .2s'}}>
          <ManagerTable getData={getData}
                        adminList={adminList}
                        show={this.setState.show}
                        navList={navList}
                        deteleAdmin={deteleAdmin}
                        ref={ref=>this.ManagerTable=ref}
                        addAdmin={addAdmin}
                        getInfo={getInfo}
                        showDetail={this.showDetail}
                      />
        </ManagerLeft>
        {
          this.state.show===true &&
          <ManagerRight style={{width:this.state.show === false ? '0%':'33%',transition:'all .2s'}}>
            <ManagerMsg cancel={this.cancel}
                        editAdmin={editAdmin}
                        navList={navList}
                        showDetail={this.showDetail}
                        refreshTable={this.refreshTable}
                        record={this.state.record}/>
          </ManagerRight>
        }
      </div>
    )
  }
}
export default ManagerPage