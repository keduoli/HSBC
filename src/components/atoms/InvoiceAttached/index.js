import React from 'react'
import styled from 'styled-components'
import {Select,Input,Button,Checkbox,Upload,message} from 'antd'
import { apiUrl } from 'config'

const Option = Select.Option;
const AttachCon = styled.div`
  width:100%;
  padding:15px 0 15px 10px;
  height:100%;
  background:#fff;
`;
const AttachGrop = styled.div`
  margin-bottom:15px;
  text-align:left;
  margin-left:5px;
  overflow:hidden;
`;
const AttachGropButtons = styled.div`
  margin:25px 0 15px 0;
  text-align:right;
`;
const AttachCell = styled.div`
  margin-bottom:10px;
  float:left;
  overflow:hidden;
`;
const ItemErrSpan = styled.span`
  float: left;
  width: 13px;
  height: 13px;
  margin-right: 5px;
  margin-top: 2px;
  background: url('images/error-icon.png') no-repeat;
`;
const ItemSpan = styled.span`
  display:block;
  margin-bottom: 10px;
`;
const GroupSelect = styled(Select)`
	margin-bottom: 30px;
`;
const InvoiceStatus = styled.div`
  height:30px;
  width:100%;
  border-left:3px solid #2397CA;
  line-height:30px;
  font-size: 12px;
  color: #2397CA;
  margin: 0px 0 44px -15px;
`
// 扫描完发票附加的操作
class InvoiceAttached extends React.Component{
  state={
    fileList:[],
    owner_id:'',
    tag_ids:this.props.checkList?this.props.checkList.join(','):'',
    loading:false,
    secondLoading:false,
    target_id:'',
    consortiumResult:false,
    memo:this.props.memo?this.props.memo:'',
    cusId:this.props.state&&this.props.state.cusId?this.props.state.cusId:undefined,
    conId:this.props.state&&this.props.state.conId?this.props.state.conId:undefined,
    ddId:this.props.state&&this.props.state.ddId?this.props.state.ddId:undefined,
  };
  handleUpload = () => {
    let memo = this.state.memo;
    memo=memo.replace(/\n/g,"")
    memo=memo.replace(/\r/g,"")
    const str = memo.split('');
    for(let i in str){
      if(str[i] == '|' || str[i] == '&' || str[i] == ';' || str[i] == '$' || str[i] == '%' || str[i] == '<' || str[i] == '>' ||
        str[i] == '(' || str[i] == ')' || str[i] == '+' || str[i] == '\\'){
          message.error("其他备注不能包含非法字符");return;
        }
    }
    this.setState({loading:true});
    const { fileList } = this.state;
    const formData = new FormData();
    formData.append('id',this.props.id);
    formData.append('memo',memo);
    if(this.state.ddId)formData.append('ddId',this.state.ddId);
    if(this.state.cusId)formData.append('cusId',this.state.cusId);
    if(this.state.conId)formData.append('conId',this.state.conId);
    if(this.props.waitConfirm){
      formData.append('image_id',this.props.imageId);
    }
    if(fileList.length > 0){
      fileList.forEach((file) => {
        formData.append('file', file);
      });
    }
    this.props.formSaveScan(formData,()=>{
      this.setState({loading:false});
      this.props.changeSucState ? this.props.changeSucState() : '';
      this.props.showScan?this.props.showScan():'';
    },()=>{
      this.setState({loading:false}); 
    });
  };
  componentDidMount(){
    this.memoInput.focus();
    const value = this.memoInput.refs.input.value;
    const obj = this.memoInput.refs.input;
    if(value){
      const len = value.length;
      if(document.selection){
        const sel = obj.createTextRange();
        sel.moveStart('character', len);
        sel.collapse();
        sel.select();
      }else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
        obj.selectionStart = obj.selectionEnd = len;
      }
    }
  };
  checkSecondFun = () => {
    const {showLoading,showScanSuccess,scanAgainFnc,showScanError,showTips,invoiceCheck,param,ocrCheckSecond} = this.props;
    if(ocrCheckSecond){
      this.setState({secondLoading:true});
      ocrCheckSecond(param,(res)=>{
        this.setState({secondLoading:false});
        showScanSuccess(res);
      },(res)=>{
        this.setState({secondLoading:false});
        showScanError(res);
      },(res)=>{
        this.setState({secondLoading:false});
        showScanSuccess(res,1);
      })
    }else{
      showLoading();
      invoiceCheck(param,(res)=>{
        showScanSuccess(res);
      },(res,msg)=>{
        showScanError(res,msg);
      },(res)=>{
        showTips(res);
      },(res,msg)=>{
        scanAgainFnc(res,msg);
      })
    }
  };
  render(){
    const {showScan,navList,departUserList,waitConfirm,deleteWaitInvoice,containuation,scanData,customerList,drawdownList,contractList,getDrawdownList,getContractList} = this.props;
    const upload = {
      action: apiUrl+'/ajax/invoice/save',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        const t = file.type;
        if(t === "image/jpeg" || t === "image/png" || t === "image/gif" || t === "application/pdf" || t === "image/jpg" || t === "image/bmp" || t === "image/webp"){
          this.setState(({ fileList }) => ({
            fileList: [...fileList, file],
          }));
          return false;
        }else{
          message.warning('只能上传图片或PDF文件');   
          return false;
        }
      },
      fileList: this.state.fileList,
    };
    return(
      <AttachCon>
        {scanData.is_whitelist === true &&<div style={{fontSize:14,color:'rgb(255, 126, 126)',textAlign:'center',margin:'-20px 0 10px 0'}}>发票货物为白名单货物</div>}
        {scanData.company_fake === 1 &&<div style={{fontSize:14,color:'rgb(255, 126, 126)',textAlign:'center',margin:'-20px 0 10px 0'}}>销方单位已列入国家经营异常名录，请核查。</div>}
        {scanData.company_fake === 2 &&<div style={{fontSize:14,color:'rgb(255, 126, 126)',textAlign:'center',margin:'-20px 0 10px 0'}}>销方企业已列入严重违法失信企业名单，请核查。</div>}
        <InvoiceStatus>&nbsp;&nbsp;&nbsp;设置发票属性</InvoiceStatus>
        <div>
        {
          navList && navList.role.indexOf('drawdown') > -1 && 
          <AttachGrop>
            <AttachCell>关联客户：</AttachCell>
            <AttachCell>
              <Select style={{width:225}}
                      allowClear
                      showSearch
                      optionFilterProp="children"
                      placeholder='请选择关联客户'
                      onChange={(e)=>{
                        if(!!e){
                          this.setState({cusId:e},()=>{
                            const cus_num = customerList.list.filter((el)=>el.id==e)[0].cus_num;
                            getDrawdownList({cus_num:cus_num,state:'0,1'})
                            getContractList({cus_num:cus_num,state:'0'})
                          })
                        }else{
                          this.setState({cusId:null,conId:null,ddId:null})
                        }
                      }}>
                {
                  customerList.list.map((item)=>{
                    return <Option key={item.id}>{item.cus_num}</Option>
                  })
                }
              </Select>
            </AttachCell>
          </AttachGrop>
          }
          {
            navList && navList.role.indexOf('drawdown') > -1 && 
            <AttachGrop>
              <AttachCell>关联合同：</AttachCell>
              <AttachCell>
                <Select style={{width:225}}
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        disabled={!this.state.cusId || !!this.state.ddId}
                        placeholder='请选择关联合同'
                        value={this.state.conId}
                        onChange={(e)=>{
                          this.setState({conId:e})
                        }}>
                  {
                    contractList.list.map((item)=>{
                      return <Option key={item.id}>{item.con_num}</Option>
                    })
                  }
                </Select>
              </AttachCell>
            </AttachGrop>
          }
          {
            navList && navList.role.indexOf('drawdown') > -1 && 
            <AttachGrop>
              <AttachCell>关联放款：</AttachCell>
              <AttachCell>
              <Select style={{width:225}}
                      allowClear
                      showSearch
                      optionFilterProp="children"
                      disabled={!this.state.cusId || !!this.state.conId}
                      placeholder='请输入放款流水号'
                      value={this.state.ddId}
                      onChange={(e)=>{
                        this.setState({ddId:e})
                      }}>
                {
                  drawdownList.list.map((item)=>{
                    return <Option key={item.id}>{item.sys_num}</Option>
                  })
                }
              </Select>
              </AttachCell>
            </AttachGrop>
          }
          <AttachGrop>
            <AttachCell>其他备注：</AttachCell>
            <AttachCell>
              <Input defaultValue={this.props.memo&&this.props.memo} onChange={(e)=>this.setState({memo:e.target.value})} ref={ref=>this.memoInput = ref} style={{width:225}} onPressEnter={this.handleUpload}/>
            </AttachCell>
          </AttachGrop>
          <AttachGrop>
            <span>附件：</span>
            <Upload {...upload}>
              <Button disabled={this.state.fileList.length > 8}>点击上传</Button>
            </Upload>
          </AttachGrop>
          <AttachGrop>
            <p style={{color:'#bcbcbc',fontSize:'12px'}}>文件要求：图片或PDF文件，不超过9张</p>
          </AttachGrop>
        </div>
        {
          waitConfirm &&
          <AttachGrop>
            <Button style={{margin:'0 3px 3px 0'}} onClick={deleteWaitInvoice}>删除</Button>
            {
              this.props.scanError && !containuation &&
              <Button type="primary" style={{margin:'0 3px 3px 0'}} onClick={this.backModal}>返回修改</Button>
            }
            <Button type="primary" disabled={this.props.scanError} onClick={this.handleUpload} loading={this.state.loading}>提交</Button>
          </AttachGrop>
        }
        {
          !waitConfirm &&
          <AttachGropButtons>
            <Button style={{margin:'0 3px 3px 0'}} onClick={showScan}>返回</Button>
            {
              this.props.scanError && !containuation &&
              <Button type="primary" style={{margin:'0 3px 3px 0'}} onClick={this.checkSecondFun}>再次查验</Button>
            }
            <Button type="primary" disabled={this.props.scanError} onClick={this.handleUpload} loading={this.state.loading}>提交</Button>
          </AttachGropButtons>
        }
      </AttachCon>
    )
  }
}

export default InvoiceAttached;