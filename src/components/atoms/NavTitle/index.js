import React from 'react'
import styled from 'styled-components'

const NavTit = styled.div`
  height:86px;
  position:relative; 
  top:0px;
  width:100%;
  display:block;
  margin-bottom:10px;
  background: #F7FBFF;
  right:0;
  padding-left:10px;
  line-height:86px;
  z-index:9;
`;
const HoverTit = styled.span`
  color:#000;
  cursor:pointer;
  font-size: 18px;
  font-weight:600;
  &:hover{
    color:#2476f8;
  }
`;
const Submenu = styled.span`
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #101010;
  margin-left:10px;
  font-weight:0;
`;
const ChildFont = styled.span`
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #101010;
`;
export default class NavBar extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const {gray} = this.props;
    return(
      <NavTit>
        <div style={{width:'100%'}}>
          {
            gray &&   
            <HoverTit>{this.props.title}</HoverTit>
          }
          {
            !gray &&
            <div style={{float:'left'}}>
              <span style={{
                fontSize:18,
                fontWeight:600}}>{this.props.title}</span>
              {
                this.props.submeun && 
                <Submenu style={{fontWeight:10}}>-&nbsp;&nbsp;&nbsp;{this.props.submeun}</Submenu>
              }
              {
                this.props.childFont && 
                <ChildFont style={{fontWeight:10}}>&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;{this.props.childFont}</ChildFont>
              }
            </div>
          }
          {this.props.back?this.props.back() : ""}
          {this.props.refreshBtn?this.props.refreshBtn():""}
          {
            this.props.search?this.props.search() : ""
          }
          {
            this.props.setSearch?this.props.setSearch():""
          }
          {
            this.props.vagueSearch?this.props.vagueSearch():""
          }
          {
            this.props.showCheckbox?this.props.showCheckbox():""
          }
          {
            this.props.onLine?this.props.onLine():''
          }
        </div>
      </NavTit>
    )
  }
}
