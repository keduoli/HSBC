import React from 'react'
import styled from 'styled-components'
import { NavTitle,UploadHistoryTable,CheckErrorModal } from 'components'
import { Button,Modal,Upload,Badge,Icon,message,Spin,Checkbox,Input,Select } from 'antd'
import { Link } from 'react-router'
import {apiUrl} from 'config'
const { Option } = Select;
const ImportCon = styled.div`
  padding:30px;
`;
const MeBtn = styled(Button)`
  width:150px;
  margin-bottom:30px;
`;
const AttachGrop = styled.div`
  margin-bottom:15px;
  text-align:left;
  margin-left:5px;
  overflow:hidden;
`;
const AttachCell = styled.div`
  margin-bottom:10px;
`;
const WaitSpan = styled.a`
  color:#fff;
  &:hover{
    color:#f5f5f5;
  }
`;
const WaitBtn = styled.span`
  float:right;
  height:40px;
  line-height:40px;
  padding:0 10px;
  background:#2397CA;
  margin-right:2.5rem;
  cursor:pointer;
  font-size:12px;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const AddIcon = styled.div`
  width:60px;
  height:60px;
  margin:0 auto 10px;
  background:url(./images/add-attachment.png) no-repeat;
  background-size:100% 100%;
`;
const CheckBtn = styled(Button)`
  width:10%;
  margin-top:30px;
  margin-left:45%; 
`;
const CheckCon = styled.div`
  background:#fff;
  overflow:hidden;
  margin-top:15px;
  height:76vh;
  width:100%;
  position:relative;
`;
const UploadCon = styled.div`
  width:95%;
  margin:0 auto;
  height:160px;
  margin-top:87px;
`;
const CloseIcon = styled(Icon)`
  float:right;
  margin-right:15px;
  margin-top:25px;
  font-size:20px;
  cursor:pointer;
  display:inline-block;
`;
const CheckWaringCon = styled.div`
  overflow:hidden;
  margin:0 auto;
  text-align:center;
  font-size:13px;
  line-height:2em;
`;
class ImportCheckPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showHistory:false,
      changeClassName:false,
      page:1,
      checkingModal:'',
      checkHistory:[],
      noCheckData:'',
      memoValue:'',
      tag_ids:'',
      beforeModal:'',
      loading:false,
      cusId:null,
    }
    const _this = this;
    this.uploadProps = {
      name: 'file',
      action: apiUrl + '/ajax/excel/import',
      showUploadList:false,
      withCredentials:true,
      data:() => ({
        memo:this.state.memoValue,
      }),
      beforeUpload: () => {
        return new Promise((resolve, reject) => {
          this.setState({beforeModal:<Modal title={<TitleSpan>批量设置发票</TitleSpan>}
                                            style = {{textAlign:'center',top:200}}
                                            closable={false}
                                            visible
                                            width={400}
                                            maskClosable={false}
                                            footer={null}
                                        >
                                        <div style={{margin:'10px 0 20px'}}>
                                          <AttachGrop>
                                            <AttachCell style={{float:"left"}}>添加备注：</AttachCell>
                                            <Input.TextArea rows={4}
                                                            style={{width:290,float:'right'}}
                                                            onChange={(e)=>{
                                                              this.setState({memoValue:e.target.value});
                                                            }}
                                            />
                                          </AttachGrop>
                                        </div>
                                        <div>
                                        <Button onClick={()=>{
                                                  this.setState({beforeModal:'',loading:true,memoValue:''},()=>{
                                                    resolve()
                                                    this.showLoad()
                                                  });
                                                }}
                                                style={{marginRight:20}}
                                        >跳过</Button>
                                        <Button type="primary" onClick={()=>{
                                          let val = this.state.memoValue.replace(/\s*/g,"");
                                          val=val.replace(/\n/g,"")
                                          val=val.replace(/\r/g,"")
                                          const str = val.split('');
                                          for(let i in str){
                                            if(str[i] == '|' || str[i] == '&' || str[i] == ';' || str[i] == '$' || str[i] == '%' || str[i] == '<' || str[i] == '>' ||
                                              str[i] == '(' || str[i] == ')' || str[i] == '+' || str[i] == '\\'){
                                                message.error("其他备注不能包含非法字符");return;
                                              }
                                          }
                                          this.setState({beforeModal:'',loading:true},()=>{
                                            resolve()
                                            this.showLoad()
                                          });
                                        }}>确定</Button>
                                        </div>
                                        </Modal>})
        })
      },
      onChange(info) {
        _this.setState({memoValue:''})
        const status = info.file.status;
        if (status === 'done') {
          const res = info.file.response;
          if(res.code === 20513){
            _this.checkErrorModal(res.data)
          }else if(res.code === 0){
            _this.checkSuccess(res.data)
          }else if(res.code === 10002){
            message.error('只能上传excel表格');
            _this.setState({checkingModal:''})
          }else{
            message.error(res.msg);
            _this.setState({checkingModal:''})
          }
        }else if (status === 'error'){
          message.error('上传出错');
          _this.setState({checkingModal:''})
        }
      },
    };
  }
  showLoad = () => {
    this.setState({
      cusId:null,checkingModal:<Modal title={<TitleSpan>查验提示</TitleSpan>}
                                        visible
                                        footer={null}
                                        onCancel={()=>this.setState({checkingModal:''})}>
                                    <CheckWaringCon>
                                      <Spin style={{display:'block'}} />
                                        发票统计中...
                                    </CheckWaringCon>
                                </Modal>})
  }
  componentWillMount(){
    this.getCheckHistoryFun()
    this.props.getCustomerList()
  }
  getCheckHistoryFun = () => {
    if(this.props.navList.role !== 1){
      this.props.getCheckHistory()
    }else{
      this.props.getCheckHistory({entry_id:this.props.navList.user_id})
    }
  }
  checkErrorModal = (data) => {
    this.setState({checkingModal:<CheckErrorModal cancelModal={()=>this.setState({checkingModal:""})}
                                                    data={data}/>})
  }
  checkSuccess = (data) => {
    this.getCheckHistoryFun()
    this.setState({checkingModal:<Modal title={<TitleSpan>查验提示</TitleSpan>}
                                        visible
                                        footer={null}
                                        onCancel={()=>this.setState({checkingModal:''})}>
                                    <CheckWaringCon>
                                      <p>本次查验发票共计{data.totalNum}张，</p>
                                      <p>本次查验成功发票共计{data.successNum}张，<Link to='invoice' onClick={()=>{
                                        this.setState({checkingModal:''})
                                        const list = this.props.tabData.list;
                                        let a = list.find(el=>el.key==='invoice');
                                        if(!a){
                                            list.push({title:'发票查询',key:'invoice'})
                                            this.props.tabChange({list:list,activeKey:'invoice'})
                                        }else{
                                            this.props.tabChange({list:list,activeKey:'invoice'})
                                        }
                                      }}>点击查看</Link></p>
                                      <p>本次查验失败发票共计{data.failedNum}张，<a href={'/ajax/excel/export/'+data.id}>点击下载查验历史</a></p>
                                      <p>可稍后查看历史记录</p>
                                      <Button style={{marginTop:20}} onClick={()=>this.setState({checkingModal:''})}>收起</Button>
                                    </CheckWaringCon>
                                 </Modal>})
  }
  showBack = () => {
		return <CloseIcon type="close"
                      onClick={()=>{
                        this.setState({
                          changeClassName:false,
                        });
                        setTimeout(() => {
                          this.setState({showHistory:false});
                        },500);
                      }}/>
	};
  checkHistory = () => {
    const checkHistory = this.props.checkHistory;
    return (
			<WaitBtn onClick={this.goToHistory}>
        <Badge count={checkHistory.total} style={{top:'-22px'}} overflowCount={10}>
          <WaitSpan href="javascript:;">查验历史记录</WaitSpan>
        </Badge>
      </WaitBtn>
    )
  }
  goToHistory = () => {
    this.props.getCheckHistory({size:10,page:1},(res)=>{
      const checkHistory = res.data;
      if(checkHistory &&  checkHistory.total > 0){
        this.setState({showHistory:true,changeClassName:true});
      }else{
        this.setState({noCheckData:<Modal style = {{textAlign:'center',top:150}}
                                        closable={false}
                                        visible
                                        width={400}
                                        maskClosable={false}
                                        footer={null}
        >
          <p style={{fontSize:14,padding:'20px 0'}}>暂无查验历史记录</p>
          <Button type="primary"
                  onClick={()=>{
                      this.setState({noCheckData:''});
                  }}
          >确定</Button>
        </Modal>})
      }
    })
  }
  render(){
    return(
      <div>
        {
          this.state.showHistory === false ?
          <div>
            <NavTitle submeun="导入查验"
                      title="发票录入"
                      search={this.checkHistory}/>
            <CheckCon>
              <UploadCon>
                <Upload type="drag" {...this.uploadProps} ref={ref=>this.uploadRef = ref}>
                  <div className="ant-upload-drag-icon">
                    <AddIcon/>
                  </div>
                  <p className="ant-upload-text">点击或拖拽导入Excel查验</p>
                </Upload>
              </UploadCon>
              <CheckBtn type='primary' onClick={()=>{
                window.location.href = apiUrl+'/static/导入发票信息模板.xls'
              }}>导入模板下载</CheckBtn>
              <div style={{color:"#FF7E7E",position:'absolute',left:30,bottom:20,fontSize:12,fontWeight:600}}>注：暂不支持二手车发票查验</div>
            </CheckCon>
            {this.state.checkingModal}
            {this.state.noCheckData}
            {this.state.beforeModal}
          </div>
          :
          <div style={{display:'block',position:"relative"}}>
            <NavTitle
              submeun="查验历史记录"
              title="发票录入"
              back={this.showBack}
            />
            <div className={this.state.changeClassName?"wait-table-container":"wait-table-out"}>
              <UploadHistoryTable historyData={this.props.checkHistory}
                                  navList={this.props.navList}
                                  getCheckHistory={this.props.getCheckHistory}
                                  collectionStop={this.props.collectionStop}/>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default ImportCheckPage;
