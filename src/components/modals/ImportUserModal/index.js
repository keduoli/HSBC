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
class ImportUserModal extends React.Component{
  render(){
    const {cancelModal,loadData,errorModalFnc} = this.props;
    const uploadProps = {
      name: 'file',
      action: apiUrl + '/ajax/user/import',
      showUploadList:false,
      onChange(info) {
        const status = info.file.status;
        if (status === 'done') {
          const res = info.file.response;
          if(res){
            if (res.code === 0){
              message.success(res.msg);
              loadData();
            }else if(res.code === 20705){
              cancelModal();
              errorModalFnc(res.data);
            }else{
              message.error(res.msg);
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
        <Modal title={<TitleSpan>批量导入员工信息</TitleSpan>}
               style={{textAlign:'center',top:100}}
               closable={false}
               visible
               width={400}
               maskClosable={false}
               footer={null}
        >
          <ImportCon>
            <p style={{marginBottom:10}}>请按规定格式录入员工信息</p>
            <MeBtn onClick={()=>{
              window.location.href="/static/导入员工信息模板.xlsx";
            }}>点击下载模版</MeBtn>
            <p style={{marginBottom:10}}>选择上传文件</p>
            <Upload {...uploadProps}>
              <MeBtn type="primary">上传文件</MeBtn>
            </Upload>
          </ImportCon>
          <MeBtn onClick={cancelModal}>取消</MeBtn>
        </Modal>
      </div>
    )
  }
}
export default ImportUserModal;


