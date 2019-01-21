import React from 'react'
import {Button,Modal,Table } from 'antd'
import styled from 'styled-components'
const TitleSpan = styled.span`
  fontSize:13px;
  height:100px;
  color:#fff;
  display:inline-block;
  line-height:100px;
`;
const columns = [{
  title:'行数',
  dataIndex:'nrow',
  key:'nrow',
}, {
  title: '是否允许登录APP',
  dataIndex: 'is_login',
  key:'is_login',
  render:text=><span>{text === 1?'Y':'N'}</span>
}, {
  title: '部门',
  dataIndex: 'department_name',
  key:'department_name',
}, {
  title: '员工姓名',
  dataIndex: 'realname',
  key:'realname',
}, {
  title: '员工账号',
  dataIndex: 'username',
  key:'username',
}, {
  title: '登录密码',
  dataIndex: 'password',
  key:'password',
}];
class ImportErrorModal extends React.Component{
  render(){
    const {cancelModal,data} = this.props;
    return(
      <Modal title={<TitleSpan>导入失败</TitleSpan>}
             closable={false}
             visible
             className="orangeModal"
             width={900}
             maskClosable={false}
             footer={null}
      >
        <p style={{color:'#a0a0a0',marginBottom:10}}>以下员工信息存在错误，请修改后再次导入</p>
        <Table
          columns={columns}
          pagination={{total:data.count}}
          dataSource={data.rows}
          rowKey="nrow"
        />
        <Button type="primary" style={{marginTop:'25px'}} onClick={cancelModal}>确定</Button>
      </Modal>
    )
  }
}
export default ImportErrorModal;
