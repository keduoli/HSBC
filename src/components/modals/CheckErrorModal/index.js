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
  dataIndex:'row',
  key:'row',
}, {
  title: '原因',
  dataIndex: 'reason',
  key:'reason',
}];
class CheckErrorModal extends React.Component{
  render(){
    const {cancelModal,data} = this.props;
    return(
      <Modal title={<TitleSpan>导入失败</TitleSpan>}
             closable={false}
             visible
             className="orangeModal"
             width={900}
             maskClosable={false}
             style={{overflow:'auto'}}
             footer={null}
      >
        <p style={{color:'#a0a0a0',marginBottom:10}}>以下发票信息存在错误，请修改后再次导入</p>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="row"
          pagination={false}
        />
        <Button type="primary" style={{marginTop:'25px'}} onClick={cancelModal}>确定</Button>
      </Modal>
    )
  }
}
export default CheckErrorModal;
