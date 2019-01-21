import React from 'react'
import {NavTitle,EleInvoiceCon,StockModal} from 'components'
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
class EleOpeningPage extends React.Component{
  state={
    stockModal:'',
    loading:false,
    stcok:'',
  }
  componentWillMount(){
    this.props.getTypeFnc();
    this.getRepertroyList()
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
        title: '暂无增值税电子发票库存',
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
                           ele={true}
                           settingList={this.props.settingList}
                           repertroyList={res}
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
  componentDidMount(){
    this.props.router.setRouteLeaveHook(
      this.props.route,
      this.routerWillLeave
    )
  }
  routerWillLeave = () => {
    this.props.copyOpening(false)
    return this.eleForm&&this.eleForm.routerWillLeave()
  }
  render(){
    const { companyList,rpaOpen,searchFnc,getCompanyList,settingList,getCodingList,getElectronic,getFjhList,showSetting,copyData,copyOpening,goodsList,loading,getData,saveEler,exportAction,getDetail } = this.props;
    return(
      <div>
        <NavTitle title="发票开具"
                  onLine={this.showOnLine}
                  submeun='电票开具'/>
        <EleInvoiceCon companyList={companyList}
                       stcok={this.state.stcok}
                       wrappedComponentRef={(form) => this.eleForm = form}
                       copyData={copyData}
                       copyOpening={copyOpening}
                       getCodingList={getCodingList}
                       goodsList={goodsList}
                       loading={loading}
                       rpaOpen={rpaOpen}
                       getRepertroyList={this.getRepertroyList}
                       electronicData={this.props.electronicData}
                       settingList={settingList}
                       searchFnc={searchFnc}
                       saveEler={saveEler}
                       getDetail={getDetail}
                       exportAction={exportAction}
                       getData={getData}
                       getElectronic={getElectronic}
                       showSetting={showSetting}
                       getFjhList={getFjhList}
                       getCompanyList={getCompanyList}/>
        <Link to='/invoicesstock' id='gotostock' style={{display:'none'}}/>
        {this.state.stockModal}
      </div>
    )
  }
}

export default EleOpeningPage
