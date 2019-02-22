import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router';
import {Icon, Menu, Button} from 'antd'
import { CookieJs } from 'components'
import { browserHistory } from 'react-router';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const MenuWrap = styled.div`
  width:200px;
  top:0;
  bottom:0;
  position:fixed;
  left:0;
  background:#373E53;
  z-index:1000;
  -webkit-transition: width .2 ease;
  transition: width .2s ease;
`;
const MaskDiv = styled.div`
  position:fixed;
  top:90px;
  bottom:0;
  height:100%;
  z-index:1001;
  background:#fff;
  opacity:0.1;
  cursor:not-allowed;
`;
const Links = styled(Link)`
  font-size:12px;
  display:block;
  padding-left:24px;
  &:hover{
    color:#333;
    background:#55617f;
  }
`;
const LogoShow = styled.div`
  background:url(images/logoWhite.png) no-repeat;
  background-size:100px;
  height:54px;
  margin: 18px 0 18px 45px;
`;
const LogoShow2 = styled.div`
  background:url(images/logoSmall.png) no-repeat;
  background-size:40px;
  height:54px;
  margin: 18px 0 18px 20px;
`;
const TitleLink = styled(Link)`
  width:100%;
  height:100%;
  float:left;
  color:#fff;
`;
export default class MenuG extends React.Component{
  constructor(props){
    super(props)
    this.state={
      collapsed: false,
      open: [],
      openKeys: [CookieJs.getCookie("openKeys")],
      select:[],
    }
    this.rootSubmenuKeys = ['sub1', 'sub5', 'sub4', 'sub6','sub7','sub8'];
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
    this.props.changeCollectionStop(!this.props.collectionStop)
  }
  deselect = () =>{
    this.setState({select:[]});
  }
  select = (e) => {
      if(e.key == 'home'){
        this.setState({open:[]})
      }
      const list = this.props.tabData.list;
      let a = list.find(el=>el.key===e.key);
      let name = e.item.props.title;
      if(!a){
          list.push({title:name,key:e.key})
          this.props.tabChange({list:list,activeKey:e.key})
      }else{
          this.props.tabChange({list:list,activeKey:e.key})
      }
      this.setState({select:[e.key]});
      CookieJs.setCookie('openKeys',{open:this.state.open,select:[`${e.key}`]});
  }
  onOpenChange = (openKeys) => {
    let key = openKeys[openKeys.length-1],obj;
    const list = this.props.tabData.list;
    if(key!==undefined){
      if(key == 'sub1'){
        obj={title:'扫描录入',key:'scan'}
      }else if(key == 'sub5'){
        obj={title:'发票认证',key:'deduction'}
      }else if(key == 'sub4'){
        if(this.props.navList.role&&this.props.navList.role.indexOf('adminUser') > -1){
          obj={title:'部门与员工',key:'department'}
        }else{
          obj={title:'操作日志',key:'log'}
        }
      }else if(key == 'sub6'){
        if(this.props.navList.tax_type === 2){
          obj={title:'电票开具',key:'eleopening'}
        }else{
          obj={title:'纸票开具',key:'papopening'}
        }
      }else if(key == 'sub7'){
        obj={title:'发票查询',key:'invoicesquery'}
      }else if(key == 'sub8'){
        obj={title:'发票查询',key:'invoice'}
      }
      let a = list.find(el=>el.key===obj.key);
      if(!a){
          list.push(obj)
          this.props.tabChange({list:list,activeKey:obj.key})
      }else{
          this.props.tabChange({list:list,activeKey:obj.key})
      }
    }
    const { open } = this.state;
    const latestOpenKey = openKeys.find(key => !open.includes(key));
    if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        let arr = openKeys;
        if(openKeys.length>2){
            arr = [openKeys[0],latestOpenKey];
        }
        this.setState({ open: arr });
        CookieJs.setCookie("openKeys",{open:arr,select:this.state.select});
    } else {
        this.setState({
        open: latestOpenKey ? [latestOpenKey] : [],
        });
        CookieJs.setCookie("openKeys",{open:[latestOpenKey],select:this.state.select});
    }
  }
  componentWillReceiveProps(next){
    if(next.location.pathname == 'home' || next.location.pathname == 'consortium'){
      this.setState({
        openKeys: [],
      });
      CookieJs.setCookie("openKeys","");
    }
    if(next.tabData.activeKey!==this.props.tabData.activeKey){
      this.setState({select:[]})
    }
  }
  componentWillMount(){
    let openKeys = CookieJs.getCookie("openKeys");
    let pathname = browserHistory.getCurrentLocation().pathname.substring(1);
    let select = openKeys['select'];
    if(select&&select==pathname){
        this.setState({select:[`${select}`]});
        if(openKeys.open){
            this.setState({open:openKeys.open});
        }
    }else{
        if(openKeys.open){
            this.setState({open:openKeys.open});
        }
        this.setState({select:[`${pathname}`]})
    }
  }
  render(){
    const {navList} = this.props;
    const {role} = navList;
    return(
      <MenuWrap style={{width:this.state.collapsed === false?200:75}}>
      <div id='logo-show1'>
        {
          this.state.collapsed === false?
          <LogoShow/>
          :
          <LogoShow2/>
        }
      </div>
      <Icon onClick={this.toggleCollapsed} style={{fontSize:15,
                                                  marginBottom: 16,
                                                  color:'#fff',
                                                  cursor:"pointer",
                                                  position:'fixed',
                                                  left:this.state.collapsed === false?220:90,
                                                  transition: 'left .2s ease',
                                                  zIndex:2200,
                                                  top:17}} type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          <Menu
              style={{borderTop:'1px solid #344C7C',paddingTop:30,width:this.state.collapsed === false?200:75,background:'#373E53',color:'white'}}
              defaultSelectedKeys={['1']}
              mode="inline"
              selectedKeys={this.state.select}
              onSelect={this.select}
              openKeys={this.state.open}
              onOpenChange={this.onOpenChange}
              inlineCollapsed={this.state.collapsed}
          >
            <Menu.Item key="home" style={{background:'#373E53',paddingRight:0}} title="首页">
              <Links style={{width:this.state.collapsed === false?200:75}} to="/home" activeClassName="router-active">
                <Icon type="home"/>
                  <span>首页</span>
              </Links>
            </Menu.Item>
            {
              role && (role.indexOf('User') > -1 || role.indexOf('supervisor') > -1) && role.indexOf('record') > -1 &&
              <SubMenu key="sub1" title={<TitleLink to="/scan"><Icon type="edit" /><span>发票录入</span></TitleLink>}>
                  <Menu.Item key="scan" style={{background:'#4B587B',paddingRight:0,borderLeft:"3px solid #65EBFF"}} title="扫描录入">
                    <Links to="/scan" activeClassName="router-active" style={{paddingLeft:45}}>扫描录入</Links>
                  </Menu.Item>
                  <Menu.Item key="continuousscan" title='连续扫描' style={{background:'#4B587B',paddingRight:0,borderLeft:"3px solid #65EBFF"}}>
                    <Links to="/continuousscan" activeClassName="router-active" style={{paddingLeft:45}}>连续扫描</Links>
                  </Menu.Item>
                  <Menu.Item key="import" title='导入查验' style={{background:'#4B587B',paddingRight:0,borderLeft:"3px solid #65EBFF"}}>
                    <Links to="/import" activeClassName="router-active" style={{paddingLeft:45}}>导入查验</Links>
                  </Menu.Item>
                  <Menu.Item key="ocr" title='识别录入' style={{background:'#4B587B',paddingRight:0,borderLeft:"3px solid #65EBFF"}}>
                    <Links to="/ocr" activeClassName="router-active" style={{paddingLeft:45}}>识别录入</Links>
                  </Menu.Item>
                  <Menu.Item key="recordonly" title='特殊业务发票录入' style={{background:'#4B587B',paddingRight:0,borderLeft:"3px solid #65EBFF"}}>
                    <Links to="/recordonly" activeClassName="router-active" style={{paddingLeft:45}}>特殊业务发票录入</Links>
                  </Menu.Item>
              </SubMenu>
            }
            {
              role && (role.indexOf('User') > -1 || role.indexOf('supervisor') > -1) && role.indexOf('record') > -1 &&
              <SubMenu key="sub8" title={<TitleLink to="/invoice"><Icon type="folder"/><span>发票管理</span></TitleLink>}>
                <Menu.Item key="invoice" title='发票查询' style={{background:'#4B587B',paddingRight:0,borderLeft:"3px solid #65EBFF"}}>
                  <Links to="/invoice" activeClassName="router-active" style={{paddingLeft:45}}>
                    <span>发票查询</span>
                  </Links>
                </Menu.Item>
                <Menu.Item key="polling" title='轮询查验' style={{background:'#4B587B',paddingRight:0,borderLeft:"3px solid #65EBFF"}}>
                  <Links to="/polling" activeClassName="router-active" style={{paddingLeft:45}}>
                    <span>轮询查验</span>
                  </Links>
                </Menu.Item>
              </SubMenu>
            }
            {
              role && (role.indexOf('User') > -1 || role.indexOf('supervisor') > -1) && role.indexOf('drawdown') > -1 &&
              <Menu.Item key="customer" style={{background:'#373E53',paddingRight:0}} title="客户管理">
                <Links style={{width:this.state.collapsed === false?200:75}} to="/customer" activeClassName="router-active">
                  <Icon type="idcard"/>
                  <span>客户管理</span>
                </Links>
              </Menu.Item>
            }
            {
              role && (role.indexOf('User') > -1 || role.indexOf('supervisor') > -1) && role.indexOf('drawdown') > -1 &&
              <Menu.Item key="drawdown" style={{background:'#373E53',paddingRight:0}} title="放款管理">
                <Links style={{width:this.state.collapsed === false?200:75}} to="/drawdown" activeClassName="router-active">
                  <Icon type="pay-circle" />
                  <span>放款管理</span>
                </Links>
              </Menu.Item>
            }
            {
              role && (role.indexOf('User') > -1 || role.indexOf('supervisor') > -1) && role.indexOf('drawdown') > -1 &&
              <Menu.Item key="contract" style={{background:'#373E53',paddingRight:0}} title="合同管理">
                <Links style={{width:this.state.collapsed === false?200:75}} to="/contract" activeClassName="router-active">
                  <Icon type="solution"/>
                  <span>合同管理</span>
                </Links>
              </Menu.Item>
            }
            <SubMenu key="sub4" title={<TitleLink to={(role&&role.indexOf('adminUser') > -1)?"/department":'/log'}><Icon type="setting" /><span>企业设置</span></TitleLink>}>
              {
                role && role.indexOf('adminUser') > -1 &&
                <Menu.Item title='部门与员工' key="department" style={{background:'#4B587B',paddingRight:0,borderLeft:"3px solid #65EBFF"}}>
                  <Links to="/department" activeClassName="router-active" style={{paddingLeft:45}}>部门与员工</Links>
                </Menu.Item>
              }
              {
                role && (role.indexOf('supervisor') > -1 || role.indexOf('User') > -1) && 
                <Menu.Item title='操作日志' key="log" style={{background:'#4B587B',paddingRight:0,borderLeft:"3px solid #65EBFF"}}>
                  <Links to="/log" activeClassName="router-active" style={{paddingLeft:45}}>操作日志</Links>
                </Menu.Item>
              }
              {
                role && role.indexOf('adminUser') > -1 &&
                <Menu.Item title='账单' key="bill" style={{background:'#4B587B',paddingRight:0,borderLeft:"3px solid #65EBFF"}}>
                  <Links to="/bill" activeClassName="router-active" style={{paddingLeft:45}}>账单</Links>
                </Menu.Item>
              }
            </SubMenu>
          </Menu>
      </MenuWrap>
    )
  }
}