import React from 'react'
import {NavTitle,ImportUserModal,ImportErrorModal} from 'components'
import {DepartUser,DepartTree,DepartActionModal} from 'containers'
import { Select,Button,Input,Checkbox} from 'antd';
import styled from 'styled-components'

const Option = Select.Option;
const Search = Input.Search;
const DepartLeft = styled.div`
  width:22%;
  background:#fff;
  min-height:695px;
  margin-right:1%;
`;
const DepartRight = styled.div`
  width:75%;
  margin-left:1%;
  min-height:70vh;
`;
const RightTop = styled.div`
  background:#fff;
  margin-bottom:10px;
  padding:10px;
  overflow:hidden;
`;
const TopLeft = styled.div`
  float:left;
`;
const TopRight = styled.div`
  float:right;
`;
const RightDown = styled.div`
  background:#fff;
  padding:10px;
  min-height:62vh;
  overflow:hidden;
`;
class DepartmentPage extends React.Component{
  state={
    addModal:'',
    importModal:'',
    isLink:'1',
    keyword:'',
    pageNum:1,
    departId:'',
    type:1,
    importErrorModal:'',
    is_all:0
  };
  render(){
    return(
      <div>
        <NavTitle title="企业设置"
                  submeun='部门与员工'/>
        <div style={{fontSize:13,lineHeight:'25px',margin:5,color:'#108ee9'}}>提示：右键新增或编辑子部门。</div>
        <div style={{display:'flex',width: '100%',borderLeft:'3px solid #2397CA'}}>
          <DepartLeft>
            <DepartTree updateFnc={(selectId)=>{
                          this.setState({departId:selectId,pageNum:1,keyword:'',isLink:'1'});
                          const param = {
                            id:selectId,
                            size:10,
                            page:1,
                          };
                          this.userTable.selector.props.getList(param);
                        }}
                        ref={ref=>this.tree = ref}
                        setTypeFnc={(type)=>{this.setState({type:type})}}
                        listType={this.state.type}
            />
          </DepartLeft>
          <DepartRight>
            <RightDown>
              <DepartUser ref={ref=>this.userTable = ref}
                          pageNum={this.state.pageNum}
                          isLink={this.state.isLink}
                          setTypeFnc={(type)=>{this.setState({type:type})}}
                          listType={this.state.type}
                          refresh={()=>{
                            this.tree.selector.props.getList(this.state.type);
                          }}
                          updatePage={(page)=>{
                            this.setState({pageNum:page});
                            const param={
                              id:this.state.departId,
                              size:10,
                              page:page,
                            };
                            this.userTable.selector.props.getList(param);
                          }}
                          updateTable={()=>{
                            const param = {
                              id:this.state.departId,
                              size:10,
                              page:this.state.pageNum,
                            };
                            this.userTable.selector.props.getList(param);
                          }}
              />
            </RightDown>
          </DepartRight>
        </div>
        {this.state.addModal}
        {this.state.importModal}
        {this.state.importErrorModal}
      </div>
    )
  }
}

export default DepartmentPage
