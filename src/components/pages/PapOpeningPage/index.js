import React from 'react'
import {NavTitle,PapInvoiceCon,StockModal} from 'components'
import styled from 'styled-components'
import { Link } from 'react-router'
import { Modal } from 'antd'
const confirm = Modal.confirm;
const LineSpan = styled.div`
  width:8px;
  height:8px;
  border-radius:50%;
  float:left;
  margin-right:5px;
  margin-top:6px;
`;
const OnLine = styled.div`
  margin-top:10px;
  font-size:12px;
  overflow:hidden;
  line-height:20px;
`;
class PapOpeningPage extends React.Component{
  state={
    stockModal:'',
    loading:false,
    stcok:''
  }
  componentDidMount() {
    this.props.router.setRouteLeaveHook(
      this.props.route,
      this.routerWillLeave
    )
  };
  routerWillLeave = () => {
    this.props.copyOpening(false)
    return this.papForm&&this.papForm.routerWillLeave()
  }
  componentWillMount(){
    this.props.getTypeFnc();
  }
  componentDidMount(){
    this.getRepertroyList();
  }
  getRepertroyList = () => {
    this.props.showSetting(()=>{
      this.props.getRepertroyList({
        buy_time:'',
        page:1,
        size:10,
        category:'04,01',
      },(res)=>{
        this.setState({stockModal:this.showStockModal(res)})
      })
    });
  }
  showStockModal = (res) => {
    if(res.rows.length===0){
          confirm({
              title: '暂无增值税专用/普通发票库存',
              content: (
                <div>
                  <p>请先添加发票库存</p>
                </div>
              ),
              okText:'新增库存',
              onOk() {
                document.getElementById('gotostock').click()
              }
            })
    }else{
      return <StockModal getData={this.props.getRepertroyList}
                         pap={true}
                         repertroyList={res}
                         settingList={this.props.settingList}
                         cancelModal={()=>this.setState({stockModal:''})}
                         setStock={(stcok)=>this.setState({stcok})}/>
    }
  }
  showOnLine = () => {
    const electronicData = this.props.electronicData;
      return <div style={{float:'right'}}>
              {
                electronicData&&electronicData[0].status === false ?
                <OnLine>
                  <div style={{float:'left',width:96,height:20}}>客户端在线状态：</div>
                  <LineSpan style={{background:'#FF6969'}}/>
                  <div style={{float:'left',height:20}}>离线</div>
                </OnLine>
                :
                <OnLine>
                  <div style={{float:'left',width:96,height:20}}>客户端在线状态：</div>
                  <LineSpan style={{background:'#7ED321'}}/>
                  <div style={{float:'left',height:20}}>在线</div>
                </OnLine>
              }
             </div>
  }
  render(){
    const { companyList,rpaOpen,searchFnc,getCompanyList,settingList,savePapr,getCodingList,getFjhList,showSetting,getDetail,copyData,copyOpening,goodsList,loading,getData } = this.props;
    return(
      <div>
        <NavTitle title="发票开具"
                  onLine={this.showOnLine}
                  submeun='纸票开具'/>
        <PapInvoiceCon companyList={companyList}
                       wrappedComponentRef={(form) => this.papForm = form}
                       savePapr={savePapr}
                       stcok={this.state.stcok}
                       getDetail={getDetail}
                       rpaOpen={rpaOpen}
                       settingList={settingList}
                       copyData={copyData}
                       copyOpening={copyOpening}
                       goodsList={goodsList}
                       searchFnc={searchFnc}
                       getRepertroyList={this.getRepertroyList}
                       loading={loading}
                       getData={getData}
                       getCodingList={getCodingList}
                       getFjhList={getFjhList}
                       showSetting={showSetting}
                       getCompanyList={getCompanyList}/>
        {this.state.stockModal}
        <Link to='/invoicesstock' id='gotostock' style={{display:'none'}}/>
      </div>
    )
  }
}

export default PapOpeningPage
