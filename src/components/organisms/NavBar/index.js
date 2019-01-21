import React from 'react'
import styled from 'styled-components'
import {Icon,Menu,Dropdown,Switch,Select,Button,Badge,Modal } from 'antd'
import {Link} from 'react-router'
import { apiUrl } from 'config';

const Option = Select.Option;

const NavWrap = styled.div`
  width:100%;
  height:50px;
  position:fixed; 
  top:0;
  background:#4B587B;
  border-bottom:1px solid #3E465B;
  z-index:500;
  -webkit-transition: left .2 ease;
  transition: left .2s ease;
`;
const NavRight = styled.div`
  float:right;
  padding-right:200px;
`;
const NavLeft = styled.div`
  float:left;
  height:32px;
  overflow:hidden;
  margin:10px 0 0 100px;
`;
const NavLi = styled.a`
  line-height:50px;
  margin-right:30px;
  color:white;
  &:hover{
    color:skyblue;
  }
`;
const GroupModel = styled(Link)`
	color:#000;
	display:block;
	width:100%;
	height:100%;
	line-height:30px;
	padding-left:20px;
`;
const GroupLi = styled(Link)`
	color:#fff;
`;
const GroupButton = styled.div`
  float:left;
  color:#000;
  margin-left:80px;
  margin-top:2px;
  background:#2397CA;
  padding:2px 5px;
  border-radius:5px;
  -webkit-transition: all .5 ease;
  transition: all .5s ease;
  &:hover{
    background:#2383c9;
  }
`;
const GroupSelect = styled(Select)`
	float:left;
	margin-left:20px;
`;
const Links = styled(Link)`
  display:block;
  padding:2px 5px;
`;
const MessageIcon = styled(Icon)`
  font-size:20px;
  color:#fff;
  cursor:pointer;
`;
const MessageBadge = styled(Badge)`
  font-size:20px;
  color:#fff;
  margin:15px 25px 0 0;
  cursor:pointer;
  float:left;
`;
const LogoShow = styled.div`
  background:url(images/logoWhite.png) no-repeat;
  background-size:contain;
  height:50px;
  width:150px;
  float:left;
  margin-left:20px;
  cursor:pointer;
  float:left;
`;
export default class NavBar extends React.Component{
  constructor(props){
    super(props);
    this.state={
      changePSW:'',
      show:'',
      noWaitData:'',
      navList:{
        son_company:[],
        plugin:{
          consortium:''
        }
      }
    }
  }
  selectCompany = (val,opt) =>{
    const params = {company_id:val};
    this.props.changeMask();
    this.props.formCompanyId(params);
  }
  componentWillReceiveProps(next){
    this.setState({navList:next.navList})
  }
  render(){
    const { navList } = this.props;
    return(
      <NavWrap style={{left:this.props.showBar?(this.props.collectionStop===false?200:75):0}}>
        <NavLeft>
        </NavLeft>
        <NavRight style={{paddingRight:this.props.showBar?200:30}}>
          <ul style={{float:'right'}}>
            <NavLi>{navList&&navList.realname}</NavLi>
            <NavLi onClick={()=>{
              document.execCommand("ClearAuthenticationCache");
              window.location.href = window.location.href;
            }}>退出</NavLi>
          </ul>
        </NavRight>
        {this.state.noWaitData}
      </NavWrap>
    )
  }
}
