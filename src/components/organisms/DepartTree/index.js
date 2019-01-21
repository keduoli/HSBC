import React from 'react';
import { Tree,Icon,Tooltip,Modal,Input,message,Button} from 'antd';
import styled from 'styled-components'
const TreeNode = Tree.TreeNode;
const RightMenu = styled.div`
  padding:2px 8px;
  border-radius: 4px;
  background:#f5f5f5;
  position:fixed;
  text-align:center;
  line-height:30px;
`;
const MenuAction = styled.span`
  display:inline-block;
  margin:0 6px;
  cursor:pointer;
  &:hover{
    color:#BE90EC;
  }
`;
const ShowDelBtn = styled.button`
  cursor:pointer;
  width:100px;
  height:26px;
  line-height:26px;
  text-align:center;
  position:absolute;
  font-size:12px;
  left:50%;
  bottom:5px;
  margin-left:-50px;
  border:1px solid #a0a0a0;
  color:#a0a0a0;
  outline:none;
  background:#fff;
  border-radius:5px;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
class DepartTree extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      key:'',
      rightMenu:'',
      showAdd:'',
      showEdit:'',
      showDel:'显示'
    }
  }
  onSelect = (selectedKeys, info) => {
    if(info.selected){
      this.setState({key:selectedKeys});
      this.props.updateFnc(selectedKeys[0]);
    }
  };
  eachTreeNode = (data) => {
    return data.map((item) => {
      if (item.children && item.children.length > 0) {
        return <TreeNode title={<span title={`${item.name}(${item.user_count})`}>{item.name}<span style={{color:'#999',marginLeft:5}}>({item.user_count}人)</span></span>} key={item.id}>{this.eachTreeNode(item.children)}</TreeNode>;
      }
      return <TreeNode title={<span title={`${item.name}(${item.user_count})`}>{item.name}<span style={{color:'#999',marginLeft:5}}>({item.user_count}人)</span></span>} key={item.id}/>;
    });
  };
  rightClick = (e) => {
    e.event.stopPropagation();
    const name = e.node.props.title.props.children[0];
    const ids = e.node.props.eventKey;
    const pos = e.node.props.pos;
    this.setState({rightMenu:
      <RightMenu style={{left:e.event.clientX+10,top:e.event.clientY-10}}>
        <Tooltip title="增加子部门">
          <MenuAction>
            <Icon type="file-add" onClick={()=>{this.setState({showAdd:this.addFnc(ids)})}}/>
          </MenuAction>
        </Tooltip>
        {
          pos !== '0-0' &&
          <Tooltip title="编辑">
            <MenuAction>
              <Icon type="edit" onClick={()=>{this.setState({showEdit:this.editFnc(name,ids)})}}/>
            </MenuAction>
          </Tooltip>
        }
        {
          pos !== '0-0' &&
          <Tooltip title="删除">
            <MenuAction>
              <Icon type="delete" onClick={()=>{
                this.props.deleteDepart(ids,()=>{
                  this.setState({rightMenu:''});
                  this.props.getList();
                });
              }}/>
            </MenuAction>
          </Tooltip>
        }
      </RightMenu>
    })
  };
  addFnc = (ids) => {
    return <Modal
      title={<TitleSpan>增加子部门</TitleSpan>}
      onCancel = {()=>{this.setState({showAdd:''})}}
      style = {{textAlign:'center',top:200}}
      visible
      width={400}
      maskClosable={false}
      footer={null}
    >
      <div style={{padding:'10px 20px'}}>
        <Input style={{width:'70%',display:"block",margin:"0 auto"}} placeholder="请输入部门名称" ref={ref=>this.addName = ref}/>
        <Button style={{marginRight:'20px',marginTop:20}}>
          <a href="javascript:;" onClick={()=>{
            this.setState({showAdd:''})
          }}>
            取消
          </a>
        </Button>
        <Button type="primary" style={{marginTop:20}}>
          <a href="javascript:;" onClick={()=>{
            const name = this.addName.refs.input.value;
            if(!name){
              message.warning('请输入部门名称');return;
            };
            const param = {
              name:name,
              parent_id:ids,
            };
            this.props.addDepart(param,()=>{
              this.setState({showAdd:'',rightMenu:''});
              this.props.getList();
            });
          }}>
            确定
            </a>
          </Button>
      </div>
    </Modal>
  };
  editFnc = (name,ids) => {
    return <Modal
      title={<TitleSpan>编辑部门</TitleSpan>}
      onCancel = {()=>{this.setState({showEdit:''})}}
      style = {{textAlign:'center',top:200}}
      visible
      width={400}
      maskClosable={false}
      footer={null}
    >
      <div style={{padding:'10px 20px'}}>
        <Input style={{width:'70%',display:"block",margin:"0 auto"}} placeholder="请输入部门名称" defaultValue={name} ref={ref=>this.editName = ref}/>
        <Button style={{marginRight:'20px',marginTop:20}}>
          <a href="javascript:;" onClick={()=>{
            this.setState({showEdit:''})
          }}>
            取消
          </a>
        </Button>
        <Button type="primary" style={{marginTop:20}}>
          <a href="javascript:;" onClick={()=>{
            const newName = this.editName.refs.input.value;
            if(!newName){
              message.warning('请输入部门名称');return;
            }
            if(name === newName){
              this.setState({showEdit:'',rightMenu:''});return;
            }
            const param = {
              name:newName,
              id:ids,
            };
            this.props.editDepart(param,()=>{
              this.setState({showEdit:'',rightMenu:''});
              this.props.getList(this.props.listType);
              this.props.departSelect();
            });
          }}>
            确定
          </a>
        </Button>
      </div>
    </Modal>
  };
  refresh = () => {
    this.eachTreeNode(this.props.navList.plugin.consortium===true?this.props.departData[0].children:this.props.departData)
  }
  render() {
    const {departData} = this.props;
    return (
      <div>
        <div style={{minHeight:700,width:'100%',position:'relative',overflow:'hidden',paddingRight:'20px'}} onClick={()=>{
          if(this.state.rightMenu){
            this.setState({rightMenu:''})
          }
        }}>
          <Tree
            selectedKeys={[`${this.state.key}`]}
            defaultExpandAll={true}
            onSelect={this.onSelect}
            onRightClick={this.rightClick}
          >
            {this.eachTreeNode(departData)}
          </Tree>
          <ShowDelBtn onClick={()=>{
                        if(this.state.showDel === '显示'){
                          this.setState({showDel:'隐藏'});
                          this.props.setTypeFnc(0);
                          this.props.getList(0);
                        }else{
                          this.setState({showDel:'显示'});
                          this.props.setTypeFnc(1);
                          this.props.getList(1);
                        }
                      }}
          >{this.state.showDel}已删除部门</ShowDelBtn>
        </div>
        {this.state.rightMenu}
        {this.state.showAdd}
        {this.state.showEdit}
      </div>
    );
  }
}

export default DepartTree;



