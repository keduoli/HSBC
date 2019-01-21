import React from 'react'
import {Button,Modal,Upload,message} from 'antd'
import styled from 'styled-components'
import {apiUrl} from 'config'

const ImportCon = styled.div`
  padding:30px;
`;
const MeBtn = styled(Button)`
  width:150px;
  margin-bottom:30px;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
class ImportInvoiceModal extends React.Component{
  render(){
    const {cancelModal,loadData,errorModalFnc,importSucc} = this.props;
    const uploadProps = {
      name: 'files',
      action: apiUrl + '/ajax/income/detail/list',
      showUploadList:false,
      onChange(info) {
        const status = info.file.status;
        if (status === 'done') {
          const res = info.file.response;
          if(res){
            if (res.code === 0){
              message.success(res.msg);
              importSucc(res.data)
              cancelModal();
            }else{
              message.error('上传文件出错');
              cancelModal();
            }
          }
        }else if (status === 'error'){
          message.error('上传出错');
          cancelModal();
        }
      },
    };
    return(
      <div>
        <Modal title={<TitleSpan>导入发票明细</TitleSpan>}
               style={{textAlign:'center',top:100}}
               closable={false}
               visible
               width={400}
               maskClosable={false}
               footer={null}
        >
          <ImportCon>
            <p style={{marginBottom:10}}>请按规定格式导入发票明细</p>
            <MeBtn onClick={()=>{
              window.location.href="/static/发票明细导入模版.xlsx";
            }}>点击下载模版</MeBtn>
            <p style={{marginBottom:10}}>选择上传文件</p>
            <Upload {...uploadProps}>
              <MeBtn type="primary">上传文件</MeBtn>
            </Upload>
          </ImportCon>
          <MeBtn onClick={cancelModal}>取消</MeBtn>
          <div style={{textAlign:'center',margin:'8px 0',width:'100%'}}>注意：当您导入的明细行数超过8行系统将自动为您转为清单开票模式</div>
        </Modal>
      </div>
    )
  }
}
export default ImportInvoiceModal;


