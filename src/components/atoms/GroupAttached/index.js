import React from 'react'
import styled from 'styled-components'
import {Select,Input,Button,Checkbox,Upload,message} from 'antd'
import { apiUrl } from 'config'

const Option = Select.Option;
const AttachCon = styled.div`
  width:100%;
  padding:15px 0 15px 20px;
  margin-left:30px;
`;
const AttachGrop = styled.div`
  margin-bottom:15px;
  text-align:left;
`;
const AttachCell = styled.div`
  margin-bottom:10px;
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
// 扫描完发票附加的操作
class GroupAttached extends React.Component{
	constructor(props){
		super(props)
	}
  state={
    fileList:[],
    owner_id:'',
    tag_ids:'',
    loading:false,
    secondLoading:false,
    consortiumResult:false,
    target_id:'',
    errorShow: '',
    tags:'',
    owners:[],
  };
  componentWillMount(){
    const param = {
      department_id:this.props.scanData.target_id,
      is_link:1
    }
    this.props.getUserList(param,(res)=>{
      this.setState({owners:res.data.rows})
    })
  }
  handleUpload = () => {
    this.setState({loading:true});
    let memo = this.memoInput.refs.input.value;
    memo=memo.replace(/\n/g,"")
    memo=memo.replace(/\r/g,"")
    const str = memo.split('');
    for(let i in str){
      if(str[i] == '|' || str[i] == '&' || str[i] == ';' || str[i] == '$' || str[i] == '%' || str[i] == '<' || str[i] == '>' ||
        str[i] == '(' || str[i] == ')' || str[i] == '+' || str[i] == '\\'){
          message.error("其他备注不能包含非法字符");return;
        }
    }
    const invoice_id = this.props.manual?this.props.manualScanData.invoice_id:this.props.scanData.invoice_id;
    const { fileList } = this.state;
    if(fileList.length > 0){
      const formData = new FormData();
      formData.append('invoice_id',invoice_id);
      formData.append('tag_ids',this.state.tag_ids);
      formData.append('owner_id',this.state.owner_id);
      formData.append('memo',memo);
      if(this.props.waitConfirm){
        formData.append('image_id',this.props.imageId);
      }
      if(this.props.scanData.consortium === true){
      	formData.append('target_id',this.props.scanData.target_id);
      }else{
      	 formData.append('target_id',this.state.target_id);
      }
      fileList.forEach((file) => {
        formData.append('file', file);
      });
      this.props.formSaveScan(formData,()=>{
        this.setState({loading:false});
        this.props.changeSucState ? this.props.changeSucState() : '';
        this.props.showScan?this.props.showScan():'';
      });
    }else{
    	if(this.props.scanData.consortium === true){
    		const param={
	        invoice_id:invoice_id,
	        tag_ids:this.state.tag_ids,
	        owner_id:this.state.owner_id,
	        memo:memo,
	        image_id:this.props.waitConfirm?this.props.imageId:'',
	        target_id:this.props.scanData.target_id,
      	}
    		 this.props.saveScan(param,()=>{
	        this.setState({loading:false});
	        this.props.changeSucState ? this.props.changeSucState() : '';
	        this.props.showScan?this.props.showScan():'';
	      });
    	}else{
    		const param={
	        invoice_id:invoice_id,
	        tag_ids:this.state.tag_ids,
	        owner_id:this.state.owner_id,
	        memo:memo,
	        image_id:this.props.waitConfirm?this.props.imageId:'',
	        target_id:this.state.target_id,
      	}
    		 this.props.saveScan(param,()=>{
	        this.setState({loading:false});
	        this.props.changeSucState ? this.props.changeSucState() : '';
	        this.props.showScan?this.props.showScan():'';
	      });
    	}
    }
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
    const {showScan,navList,departUserList,waitConfirm,deleteWaitInvoice,containuation,scanData} = this.props;
    const is_car = scanData.is_car;
    const { consortium } = scanData;
    const { son_company } = navList;
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
      <AttachCon style={{marginTop:this.props.scanError?"0px":"0px"}}>
        <AttachCell style={{fontWeight:700}}>所属公司</AttachCell>
        <GroupSelect style={{marginBottom:30,width:225}} defaultValue={this.props.scanData.gfmc} disabled>
          <Option style={{width:225}} value={this.props.scanData.gfmc}>{this.props.scanData.gfmc}</Option>
        </GroupSelect>
        		<AttachGrop>
		        </AttachGrop>
		        <AttachGrop>
		          <AttachCell>其他备注：</AttachCell>
		          <AttachCell>
		            <Input  ref={ref=>this.memoInput = ref} style={{width:225}} onPressEnter={this.handleUpload}/>
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
        {
          waitConfirm &&
          <AttachGrop>
            <Button style={{margin:'0 3px 3px 0'}} onClick={deleteWaitInvoice}>取消</Button>
            {
              this.props.scanError && !containuation &&
              <Button type="primary" style={{margin:'0 3px 3px 0'}} loading={this.state.secondLoading} ghost onClick={this.checkSecondFun}>再次查验</Button>
            }
            <Button type="primary" onClick={this.handleUpload} loading={this.state.loading}>提交</Button>
          </AttachGrop>
        }
        {
          !waitConfirm &&
          <AttachGrop>
            <Button  style={{margin:'0 10px 10px 0'}} onClick={showScan}>返回</Button>
            {
              this.props.scanError && !containuation &&
              <Button type="primary" style={{margin:'0 10px 10px 0'}} loading={this.state.secondLoading} ghost onClick={this.checkSecondFun}>再次查验</Button>
            }
            <Button type="primary" onClick={this.handleUpload} loading={this.state.loading}>提交</Button>
          </AttachGrop>
        }
      </AttachCon>
    )
  }
}

export default GroupAttached;
