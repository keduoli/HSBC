import React from 'react';
import PropTypes from 'prop-types';
import { Spin,notification,Modal,Button } from 'antd';
import { Menu,PageTemplate,NavBar,Tab } from 'components';
import { injectGlobal } from 'styled-components';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fromData } from 'store/selectors';
import 'whatwg-fetch';
import { apiUrl } from 'config';
import * as actions from 'store/actions';
const DEBUG = process.env.NODE_ENV !== 'production';
import { browserHistory } from 'react-router';
import { showName } from './util';
injectGlobal`
  body {
    margin: 0;
    font-size:14px;
    color:#333;
  }
  html {
    font-size: 75%;
  }
  @media all and (min-width: 1440px){
    html {
      font-size: 93.8%;
    }
  }
  ul,li{
    list-style:none;
  }
  div,ul,p,h4{
    margin:0;
    padding:0;
  }
  a{
    text-decoration:none!important;
  }
`;
const ChangeMask = styled.div`
  position:fixed;
  top:0;
  bottom:0;
  right:0;
  left:0;
  background:#f7f7f7;
  opacity:0.5;
  z-index:10000;
`;
const MaskSpin = styled(Spin)`
  position:fixed;
  top:50%;
  bottom:0;
  right:0;
  left:0;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:100px;
  color:#fff;
  display:inline-block;
  line-height:100px;
`;
const PageCon = styled.div`
    position:relative;
`;
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      code:"",
      showMask:false,
      showBar:true,
      showMessage:false,
      pages:[],
      navList:'',
      pollingWaring:''
    };
    this.ws = ''
  }
  componentWillMount(){
    if(window.location.href.split("://")[1].split('/').length==1){
      this.props.router.push('home')
    }
    this.props.getNavList((res)=>{
      this.setState({navList:res})
    });
    this.props.getRemind((res)=>{
      if(res>0){
        this.setState({pollingWaring:<Modal title={<TitleSpan>查验提示</TitleSpan>}
                                            visible
                                            footer={null}
                                            style={{textAlign:'center'}}
                                            onCancel={()=>this.setState({pollingWaring:''})}
                                          >
                                          <div style={{lineHeight:2}}>今日发票轮询已完成，点击<span style={{color:'#108ee9',cursor:'pointer'}} onClick={()=>this.gotopolling()}>查看详情</span>，查看轮询结果</div>
                                          <div style={{display:'flex',justifyContent:'space-around',marginTop:20,width:'60%',marginLeft:'20%'}}>
                                            <Button onClick={()=>this.setState({pollingWaring:''})}>返回</Button>
                                            <Button type='primary' onClick={()=>this.gotopolling()}>查看详情</Button>
                                          </div>
                                      </Modal>})
      }
    })
  };
  gotopolling = () => {
    const list = this.props.tabData.list;
    let a = list.find(el=>el.key==='polling');
    if(!a){
        list.push({title:'轮询查验',key:'polling'})
        this.props.tabChange({list:list,activeKey:'polling'})
    }else{
        this.props.tabChange({list:list,activeKey:'polling'})
    }
    this.props.router.push("/polling");
    this.props.changeRoute(true);
    this.setState({pollingWaring:''})
  }
  componentWillReceiveProps(next){
    if(this.props.location.pathname === 'consortium'){
      this.props.changeHideMeun(true);
      if(next.location.pathname !== 'consortium'){
        this.props.changeHideMeun(false);
      }
    }
    if(this.props.location.pathname === 'home'){
      this.state.pages = this.state.pages.filter(el=>el.props.location.pathname!=='home');
      this.setState({})
    }
  }
  removeRoute = (route) => {
    this.state.pages = this.state.pages.filter(el=>el.props.location.pathname!==route);
    if(route == 'contract'){
      this.props.setContract(false)
    }
    if(route === 'invoice'){
      this.props.setInvId(false)
    }
    this.setState({})
    this.menu.deselect(this.props.tabData.activeKey)
  }
  render(){
    let pathname = browserHistory.getCurrentLocation().pathname.substring(1);
    let a = this.state.pages.find(el=>el.props.location.pathname===this.props.children.props.location.pathname);
    if(!a){
        this.state.pages.push(this.props.children);
    }
    return(
      <div>
        {
          this.state.showMask === true && 
          <ChangeMask>
            <MaskSpin style={{opacity:1}} size="large"/>
          </ChangeMask>
        }
        {this.state.showBar && <Menu ref={(ref)=>this.menu = ref} {...this.props} navList={this.state.navList}/>}
        <NavBar showMessage={this.state.showMessage} 
                showBar={this.state.showBar} 
                {...this.props} 
                changeMask={()=>this.setState({showMask:true})}/> 
        {
          this.props.tabData.list.length!==0&&<Tab removeRoute={this.removeRoute} {...this.props}/>
        }
        <PageCon style={{paddingTop:this.props.tabData.list.length>0?90:50}}>
        {
            this.state.pages.map((page)=>{
              return(
                <div key={page.props.location.pathname}
                    style={{display:page.props.location.pathname===pathname?"block":"none"}}
                >
                    <PageTemplate className='react-dom' 
                                  {...this.props}
                                  navList={this.state.navList}
                                  showBar={this.state.showBar}>
                        {page}
                    </PageTemplate>
                </div>
                )
            })
          }
          {this.state.pollingWaring}
        </PageCon>
      </div>
    )
  }
}
App.propTypes = {
  children: PropTypes.any,
};
const mapStateToProps = state => ({
  navList: fromData.getData(state,actions.RQ.NAV_BAR),
  companyId: fromData.getData(state,actions.RQ.COMPANY_ID),
  collectionStop: fromData.getCheckSecond(state,fromData.CAN_COLLECTION_STOP),
  hideMeun: fromData.getCheckSecond(state,fromData.HIDE_MEUN),
  messageList: fromData.getData(state,actions.RQ.MESSAGE_LIST),
  tabData: fromData.getTabData(state,actions.TAB_DATA),
});

const mapDispatchToProps = dispatch => ({
  getNavList: (callback) => dispatch(actions.request(actions.RQ.NAV_BAR,"/ajax/user/info",{
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  setContract: (res)=>{
    dispatch(actions.checkSecond(fromData.SET_CONTRACT,res));
  },
  copyOpening: (res)=>{
    dispatch(actions.checkSecond(fromData.COPY_OPENING,res));
  },
  setInvId: (res)=>{
    dispatch(actions.checkSecond(fromData.SET_INVOICEID,res));
  },
  getRemind:(callback) => dispatch(actions.request(actions.RQ.USER_REMIND,"/ajax/user/remind",{
    success:(res)=>{
      callback?callback(res.data):""
    }
  })),
  getMessage: (param,callback) => dispatch(actions.request(actions.RQ.MESSAGE_LIST,"/ajax/export/signfail/list",{
    params:param,
    success:()=>{
      callback?callback():""
    }
  })),
  formCompanyId: (params,callback) => dispatch(actions.request(actions.RQ.COMPANY_ID,"/ajax/company/current/change",{
    params:params,
    method:'post',
    success:()=>{
    	window.location.assign("/home");
    }
  })),
  changeCollectionStop: (res)=>{
    dispatch(actions.checkSecond(fromData.CAN_COLLECTION_STOP,res));
  },
  changeHideMeun: (res)=>{
    dispatch(actions.checkSecond(fromData.HIDE_MEUN,res));
  },
  changeRoute: (res)=>{
    dispatch(actions.checkSecond(fromData.CHANGE_ROUTE,res));
  },
  invoiceAction: (formData,callback) => dispatch(actions.request(actions.RQ.INCOME_ACTION,"/ajax/income/invoice/action",{
    formData:formData,
    method:'post',
  })),
  tabChange:(value) => dispatch(actions.tabChange(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
