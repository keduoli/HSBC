import React from 'react';
import {NavTitle,OcrManual,ExpandInvoice,OcrImageScale,PictureScaleModal,WaitConfirmFilter,WaitConfirmTable,PdfTable} from 'components';
import {Upload,message,Icon,Progress,Tooltip,Modal,Button,Input,Badge,Popover,Checkbox,Table,Select,} from 'antd';
import styled,{ keyframes } from 'styled-components';
import { uploadObj } from '../../upload';
import { apiUrl } from 'config';
import 'whatwg-fetch';
import moment from 'moment';
import {Link} from 'react-router';
let lockReconnect = false;
const Option = Select.Option;
const DEBUG = process.env.NODE_ENV !== 'production';
const AttachGrop = styled.div`
  margin-bottom:15px;
  text-align:left;
  margin-left:5px;
  overflow:hidden;
`;
const CloseIcon = styled(Icon)`
  float:right;
  margin-right:15px;
  margin-top:25px;
  font-size:20px;
  cursor:pointer;
  display:inline-block;
`;
const AttachCell = styled.div`
  margin-bottom:10px;
`;
const ScanContent = styled.div`
  min-height:84vh;
  padding:10px 0 20px;
`;
const UploadContent = styled.div`
  width:100%;
  margin:auto;
  background:#fff;
  margin-top:20px;
`;
const GressBar = styled.div`
  height:50px;
  line-height:50px;
  font-size:17px;
  padding:0 15px;
  width:67%;
  float:left;
`;
const GressCon = styled.div`
  width:75%;
  display:inline-block;
  height:50px;
  position:relative;
`;
const ListContainer = styled.div`
  padding:10px;
  background:#fff;
  overflow:hidden;
  width:100%;
  &::-webkit-scrollbar{
    width: 5px;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #a0a0a0;
    border-left: 2px solid transparent;
  }
`;
const ListItem = styled.div`
  padding:10px;
  font-size:12px;
  border:1px solid #e2e2e2;
  border-radius:5px;
  background:#fff;
  margin-bottom:8px;
  overflow:hidden;
`;
const ImgCon = styled.div`
  width:15%;
  float:left;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  vertical-align:middle;
`;
const ImgConTip = styled.div`
  width:210px;
  float:left;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
`;
const ImgInfo = styled.div`
  float:right;
  width:24%;
  text-align:left;
`;
const ImgGress = styled.div`
  width:20%;
  float:right;
`;
const LoadInfo = styled.div`
  margin-top:20px;
  overflow:hidden;
`;
const MiddleCon = styled.div`
  width:95%;
  margin:10px auto 0;
  padding:10px 0 20px;
  overflow:hidden;
  background:#f8f8f8;
`;
const MiddleLeft = styled.div`
  width:65%;
  float:left;
  padding:0 10px;
`;
const MiddleRight = styled.div`
  width:35%;
  float:left;
  padding:20px 0 20px 30px;
`;
const slideInRight = keyframes`
  from {
    transform: translate3d(100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
`;
const TipDiv = styled.div`
  width:400px;
  height:60px;
  position:absolute;
  right:0;
  top:-60px;
  animation:${slideInRight} 0.8s;
`;
const TipCon = styled.div`
  width:400px;
  height:40px;
  padding:0 10px;
  border-radius:6px;
  background:#fff;
  box-shadow:0px 0px 10px #ccc;
  float:right;
  line-height:40px;
  font-size:14px;
`;
const ArrowCon = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #fff;
  float: right;
  margin-right: 10px;
`;
const AddIcon = styled.div`
  width:60px;
  height:60px;
  margin:0 auto 10px;
  background:url(./images/add-attachment.png) no-repeat;
  background-size:100% 100%;
`;
const OcrError = styled.span`
  width:100%;
  display:block;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
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
const WaitSpan = styled.a`
  color:#fff;
  &:hover{
    color:#fff;
  }
`;
const RefreshBtn = styled.div`
  display:inline-block;
  margin-left:20px;
`;
const RefreshIcon = styled(Icon)`
  cursor:pointer;
  &:hover{
    color:#2476f8;
  }
  &:active{
    color:rgb(211,211,211);
  }
`;
const ErrTipSpanCon = styled.span`
  width: 30%;
  float: left;
  color: #f04134;
`;
const ItemErrSpan = styled.span`
  float: left;
  width: 13px;
  height: 13px;
  margin-right: 5px;
  margin-top: 2px;
  background: url('images/error-icon.png') no-repeat;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const ItemSpan = styled.span`
  display:block;
`;
const ZhuanSpan = styled.span`
  width:18px;
  height:18px;
  float:left;
  background:url(images/invoice.png) no-repeat -54px 0;
`;
const PuSpan = styled.span`
  width:18px;
  height:18px;
  float:left;
  background:url(images/invoice.png) no-repeat -36px 0;
`;
const ItemPointSpan = styled.span`
  float: left;
  width: 16px;
  height: 16px;
  margin-left: 5px;
  margin-top: 2px;
  background: url('images/point-icon.png') no-repeat;
  cursor: pointer;
`;
const BillCon = styled.span`
  float:left;
  width: 3%;
`;
const FplcSpan = styled.span`
  float: left;
  margin-left: 10px;
`;
const FplcSpanCon = styled.span`
  float: left;
  width: 7%;
  margin-left: 10px;
`;
const BillFplcCon = styled.span`
  float:left;
  width: 20%;
`;
const LoadInfoLeft = styled.div`
  float:left;
  overflow:hidden;
  width:20%;
  background:skyblue;
  margin-right:2%;
  background:#fff;
`;
const LoadInfoRight = styled.div`
  float:left;
  overflow:hidden;
  width:50%;
  height:100%;
  background:#fff;
`;
const LoadInfoTitle = styled.div`
  margin:15px 0 0 15px;
  fontSize:12px;
  font-weight:600;
`;
const LoadInfoCon = styled.div`
  margin:10px 0 15px 15px;
  overflow:hidden;
`;
const LoadInfoNum = styled.div`
  fontSize:38px;
  font-weight:700;
  float:left;
  font-family: DINCond-Bold;
`;
const LoadInfoP = styled.div`
  float:left;
  font-size:12px;
  margin:10px 0 0 14px;
`;
const PdfContent = styled.div`
  -webkit-transition: all .5 ease;
  transition: all .5s ease;
  position:absolute;
  width:90%;
  bottom:0px;
  background:#fff;
  overflow:auto;
  box-sizing:border-box;
  border-radius:10px 10px 0 0;
  margin-left:5%;
  border-bottom:0!important;
`;
class OcrPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      refresh:true,
      showList:false,
      showLoad:false,
      fileList:[],
      showUpload:false,
      showManual:false,
      uploadState:[],
      completeNum:0,
      currIndex:0,
      showMsg:null,
      waitCheckNum:0,
      showFinal:true,
      showDetail:null,
      cancelCheck:[],
      canNotLeave:false,
      getCheckArea:null,
      completeCheck:0,
      getImgArea:null,
      notSupport:'',
      showMemo:'',
      memo:'',
      memoValue:'',
      showWaitList:false,
      changeClassName:true,
      pageNum:1,
      failInvoiceNum:0,
      fpdm:'',
      fphm:'',
      status:'',
      manualNum:0,
      showHdReturn:true,
      noWaitData:'',
      checkTime:'',
      haveTime:'',
      mouseDown:false,
      select_all:0,
      showCheck:true,
      ev:'',
      tag_ids:'',
      state:[],
      newFileList:[],
      sortedInfo:null,
      filteredInfo:null,
      cusId:null,
      conId:null,
      ddId:null,
      findMore:[],
      pdfList:[],
      visible:true,
      contractList:[],
      drawdownList:[],
    };
    const this_s = this;
    this.heartCheck = {
      timeout: 10000,
      timeoutObj: null,
      serverTimeoutObj: null,
      reset: function(){
        clearTimeout(this.timeoutObj);
　　　　 this.start();
      },
      start: function(){
        let self = this;
        this.timeoutObj = setTimeout(function(){
          if(this_s.ws!==''){
            this_s.ws.onopen = () => {
              this_s.ws.send("HeartBeat");
            }
          }
        }, this.timeout)
      },
    };
    this.ws = '';
    this.canWs = true;
    this.goAgain = false;
    this.showImg = true;
    this.showMessage = true;
    this.invoiceData = [];
    this.onlyOne = true;
    this.uploads = [];
    this.removeIndex = 0;
    this.fileInfo = [];
    this.uploadProps = {
      name: 'file',
      multiple: true,
      // action:this.state.ossPath,
      showUploadList:false,
      onRemove:(file) =>{
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList;
          newFileList.splice(index, 1);
          this.setState({newFileList})
          if(index > -1){
            this.uploads.splice(index - 1 - this.removeIndex,1);
            return {
              fileList: newFileList,
            };
          }
        });
      },
      onChange:(info) => {
        const res = info.file.response;
        if(res){
          if(res.code === 10003){
            message.error('登录已超时,请重新登录');
            setTimeout(()=>{
              window.location.assign("/logout"); 
            },1000);
          }else if(res.code === 10207){
            message.error('该账号已在其他电脑端登录，请重新登录');
            setTimeout(()=>{
              window.location.assign("/logout");
            },1000);
          }
        }
      },
      beforeUpload:(file) => {
        if (!window.WebSocket || !file.uid) {
          this.setState({
            notSupport:<Modal style = {{textAlign:'center',top:150}}
                              closable={false}
                              visible
                              width={400}
                              maskClosable={false}
                              footer={null}
            >
              <p style={{fontSize:14,padding:'20px 0'}}>您的浏览器不支持该功能<br/>建议您使用其他浏览器或升级浏览器</p>
              <Button type="primary"
                      onClick={()=>{
                        this.setState({notSupport:''});
                      }}
              >确定</Button>
            </Modal>
          });
          return false;
        }else{
          if(this.onlyOne){
            this.onlyOne = false;
            this.webSocketFnc();
          }
          const t = file.type;
          if(t === "image/jpeg" || t === "image/png" || t === "image/gif" || t === "image/jpg" || t === "image/bmp" || t === "image/webp" || t === "application/pdf"){
            if(this.canWs){
              this.canWs=false;
              this.goAgain = false;
              this.setState({showHdReturn:false,showLoad:true,canNotLeave:true,showMemo:this.showMemoFnc()});
              window.onbeforeunload=function(){
                this.onlyOne = true;
                return "确定离开此页面吗？";
              }
            }
            this.setState(({ fileList }) => ({
              fileList: [file,...fileList],
              showUpload:true,
            }));
              const func = () => {
                let obj; 
                if(file.size>=113145728){
                  obj = {
                    pic_id:file.uid,
                    state:11,
                  };
                  this.setState({uploadState:[...this.state.uploadState,obj],completeNum:this.state.completeNum + 1,newFileList:this.state.fileList},()=>{
                    let resolve = this.uploads.shift();
                    resolve && resolve();
                    if(!resolve && !this.canWs){
                      this.goAgain = true;
                    }
                  });
                }else{
                  obj = {
                    pic_id:file.uid,
                    state:5,
                  };
                  this.setState({uploadState:[...this.state.uploadState,obj],newFileList:this.state.fileList});
                  const formData = new FormData();
                  formData.append('ocrFiles', file);
                  fetch(apiUrl+'/ajax/ocr/upload',{
                    method: 'POST',
                    body: formData
                  })
                    .then((res) => {
                      if(res.status === 200){
                        const find = this.state.uploadState.find((item)=>item.pic_id === file.uid);
                        find.state = 6;
                        this.setState({uploadState:this.state.uploadState,completeNum:this.state.completeNum + 1});       
                      }else{
                        const find = this.state.uploadState.find((item)=>item.pic_id === file.uid);
                        find.state = 7;
                        this.setState({uploadState:this.state.uploadState,completeNum:this.state.completeNum + 1});
                        this.removeIndex++;
                        let resolve = this.uploads.shift();
                        resolve && resolve();
                        if(!resolve && !this.canWs){
                          this.goAgain = true;
                          this.canWs = true;
                        }
                      }
                      return res.json()
                    }).then((parseJSON) => {
                      if(parseJSON.code == 0){
                        this.fileInfo.push({id:parseJSON.data[0],pic_id:file.uid});
                        this.removeIndex++;
                        if(this.fileInfo.length === 10){
                          const p = {
                            fileInfo:JSON.stringify(this.fileInfo),
                            memo:this.state.memo,
                            cusId:this.state.cusId,
                            conId:this.state.conId,
                            ddId:this.state.ddId
                          };
                          this.ws.send(JSON.stringify(p));
                          this.setState({
                            memo:'',
                            cusId:null,
                            conId:null,
                            ddId:null,
                          })
                          this.fileInfo = [];
                        }
                        let resolve = this.uploads.shift();
                        resolve && resolve();
                        if(!resolve && !this.canWs){
                          this.goAgain = true;
                          this.canWs = true;
                          if(this.fileInfo.length > 0){
                            const p = {
                              fileInfo:JSON.stringify(this.fileInfo),
                              memo:this.state.memo,
                              cusId:this.state.cusId,
                              conId:this.state.conId,
                              ddId:this.state.ddId
                            };
                            this.ws.send(JSON.stringify(p));
                            this.setState({
                              memo:'',
                              cusId:null,
                              conId:null,
                              ddId:null,
                            })
                            this.fileInfo = [];
                          }
                        }
                      }
                  })
                }
              }
              if(this.goAgain){
                this.goAgain = false;
                func();
              }else{
                this.uploads = [...this.uploads, func];
              }
            return false;
          }else{
            message.warning('只能上传图片或PDF');
            return false;
          }
        }
      },
    };
  };
  inTimeOn = () => {
    const {checkTime,haveTime} = this.state;
    let times = '';
    const dateNow = new Date();
    const timers = dateNow.getTime();
    if(checkTime){
      const result = timers - haveTime;
      if(result > 60000){
        times = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        this.setState({checkTime:times,haveTime:timers});
      }else{
        times = checkTime;
        this.setState({checkTime:times,haveTime:timers});
      }
    }else{
      const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      times = date;
      this.setState({checkTime:date,haveTime:timers});
    }
    return times;
  };
  reconnect = () => {
    const that = this;
    if(lockReconnect) return;
    lockReconnect = true;
    setTimeout(function () {
        that.webSocketFnc();
        lockReconnect = false;
    }, 2000);
  }
  webSocketFnc = () =>{
    if(DEBUG){
      this.ws = new WebSocket("ws://"+apiUrl.replace("http://","").replace("https://","")+"/websocket/ocr");
    }else{
      this.ws = new WebSocket("wss://"+apiUrl.replace("http://","").replace("https://","")+"/websocket/ocr");
    }
    this.ws.onopen = () => {
      this.heartCheck.start();
    };
    this.ws.onclose = () => {
      this.reconnect();
    };
    this.ws.onerror = () => {
      this.reconnect();
    };  
    this.ws.onmessage = (ev) => {
      this.heartCheck.reset();
      const d = JSON.parse(ev.data);
      const {waitList} = this.props;
      for(let n in d){
        this.state.findMore.push(d[n])
        this.setState({})
      }
      for(let j in d){
        const find = this.state.uploadState.find((item)=>item.pic_id === d[j].pic_id);
        if(find){
          find.state = d[j].state;
          find.reason = d[j].reason;
          find.invoice_id = d[j].invoiceId;
          find.attachment_id = d[j].attachment_id;
          find.forbiden_reasons=d[j].forbiden_reasons;
          find.pageCount=d[j].pageCount;
          find.fplc_related=d[j].fplc_related;
          find.zfbz=d[j].zfbz;
          find.fpzl=d[j].fpzl;
          find.time=d[j].time;
          find.type=d[j].type;
          find.over=d[j].over;
          this.setState({})
        }else{
          for(let i in this.state.fileList){
            if(d[j].pic_id === this.state.fileList[i].uid){
              const obj = {
                pic_id:d[j].pic_id,
                forbiden_reasons:d[j].forbiden_reasons?d.forbiden_reasons:'',
                state:d[j].state,
                zfbz:d[j].zfbz,
                reason:d[j].reason,
                invoice_id:d[j].invoiceId,
                attachment_id:d[j].attachment_id,
                pageCount:d[j].pageCount,
                fplc_related:d[j].fplc_related,
                fpzl:d[j].fpzl,
                time:d[j].time,
                type:d[j].type,
                over:d[j].over,
              };
              this.setState({uploadState:[...this.state.uploadState,obj]});
            }
          }
        }
        const completeCheck = this.state.uploadState.find((el)=>el.pic_id === d[j].pic_id && el.state == 0);
        const failInvoice = this.state.uploadState.find((el)=>el.pic_id === d[j].pic_id && (el.state == 2 ||el.state == 1 || el.state ==3));
        if(failInvoice){
          this.setState({failInvoiceNum:this.state.failInvoiceNum + 1});
          waitList.count = waitList.count + 1;
          this.setState({waitList});
        }
        if(completeCheck){
          this.setState({completeCheck:this.state.completeCheck + 1});
        }
      }
    };
  };
  showMemoFnc = () => {
    const { customerList,drawdownList,contractList,navList,getContractList,getDrawdownList } = this.props;
    return(
      <Modal title={<TitleSpan>批量设置发票属性</TitleSpan>}
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
					{
						navList && navList.role.indexOf('drawdown') > -1 && 
						<AttachGrop>
							<AttachCell style={{float:"left"}}>客户编号：</AttachCell>
							<Select style={{width:290,float:'right'}}
											allowClear
											showSearch
											optionFilterProp="children"
											placeholder='请选择关联客户'
											onChange={(e)=>{
												if(!!e){
													this.setState({cusId:e},()=>{
														const cus_num = customerList.list.filter((el)=>el.id==e)[0].cus_num;
														getContractList({cus_num:cus_num,state:'0'},(res)=>{
                              this.setState({contractList:res.list})
                              this.setState({showMemo:this.showMemoFnc()})
                            })
														getDrawdownList({cus_num:cus_num,state:'0,1'},(res)=>{
                              this.setState({drawdownList:res.list})
                              this.setState({showMemo:this.showMemoFnc()})
                            })
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
						</AttachGrop>
					}
					{
						navList && navList.role.indexOf('drawdown') > -1 && 
						<AttachGrop>
							<AttachCell style={{float:"left"}}>合同编号：</AttachCell>
							<Select style={{width:290,float:'right'}}
											allowClear
											showSearch
											optionFilterProp="children"
											disabled={!this.state.cusId || !!this.state.ddId}
											placeholder='请选择关联合同'
											onChange={(e)=>{
												this.setState({conId:e},()=>{
                          this.setState({showMemo:this.showMemoFnc()})
                        })
											}}>
								{
                  this.state.contractList.map((item)=>{
											return <Option key={item.id}>{item.con_num}</Option>
										})
								}
							</Select>
						</AttachGrop>
					}
					{
						navList && navList.role.indexOf('drawdown') > -1 && 
						<AttachGrop>
							<AttachCell style={{float:"left"}}>放款流水号：</AttachCell>
							<Select style={{width:290,float:'right'}}
											allowClear
											showSearch
											optionFilterProp="children"
											disabled={!this.state.cusId || !!this.state.conId}
											placeholder='请选择关联放款流水号'
											onChange={(e)=>{
												this.setState({ddId:e},()=>{
                          this.setState({showMemo:this.showMemoFnc()})
                        })
											}}>
								{
									this.state.drawdownList.map((item)=>{
										return <Option key={item.id}>{item.sys_num}</Option>
									})
								}
							</Select>
						</AttachGrop>
					}
        </div>
        <div>
          <Button onClick={()=>{
                    this.setState({memo:'',showMemo:''},()=>{
                      const resolve = this.uploads.shift();
                      resolve && resolve();
                    });
                  }}
                  style={{marginRight:20}}
          >跳过</Button>
          <Button type="primary" onClick={()=>{
            let val = this.state.memoValue.replace(/\s*/g,"");
            val=val.replace(/\n/g,"")
            val=val.replace(/\r/g,"")
            const str = val.split('');
            if(str.length>80){
              message.error("备注不得超过80字节");return;
            }
            for(let i in str){
              if(str[i] == '|' || str[i] == '&' || str[i] == ';' || str[i] == '$' || str[i] == '%' || str[i] == '<' || str[i] == '>' ||
                str[i] == '(' || str[i] == ')' || str[i] == '+' || str[i] == '\\'){
                  message.error("其他备注不能包含非法字符");return;
                }
            }
            this.setState({memo:val,showMemo:''},()=>{
              const resolve = this.uploads.shift();
              resolve && resolve();
            });
          }}>确定</Button>
        </div>
      </Modal>
    )
  };
  getCheckAreaFnc = () => {
    const {goCheck,waitCheckAction,waitList} = this.props;
    return <OcrManual ocrData={this.invoiceData[this.state.currIndex]}
                      key={this.state.currIndex}
                      invoiceCode={this.invoiceData[this.state.currIndex].fpdm}
                      memo={this.state.memo}
                      waitList={waitList}
                      val={false}
                      addIndex={this.addIndexFnc}
                      addWaitInvoice={this.addWaitInvoiceFnc}
                      cancelCheckFnc={this.cancelCheckFnc}
                      showSuccess={this.showSuccessFunct}
                      waitCheckAction={waitCheckAction}
                      goCheck={goCheck}
    />
  };
  addWaitInvoiceFnc = () => {
    this.setState({failInvoiceNum:this.state.failInvoiceNum + 1});
  };
  getImgAreaFnc = () => {
    return <OcrImageScale path={this.invoiceData[this.state.currIndex].file_path} thumbPath={true}/>
  };
  componentWillMount(){
    this.props.getCustomerList()
  }
  componentWillUnmount(){
    this.ws = '';
    this.canWs = false;
    this.removeIndex = 0;
    this.showImg = false;
    this.onlyOne = false;
    this.uploads = [];
    this.onlyOne = true;
    // if(this.ws){
    //   this.ws.close();
    // }
    if(window.onbeforeunload){
      window.onbeforeunload = null;
    }
  };
  showSuccessFnc = (res) => {
    if((res.code >= 20401 && res.code <= 20406) || res.code === 20505){
      return (
        <div ref={ref=>this.showMsgRef = ref}>
          <TipDiv key={res.data.pic_id}>
            <TipCon>
              <Tooltip title={res.data.filename}>
                <ImgConTip>{res.data.filename}</ImgConTip>
              </Tooltip>
              <ImgGress style={{width:'40%'}}>无法查验</ImgGress>
            </TipCon>
            <ArrowCon/>
          </TipDiv>
        </div>
      )
    }else{
      return (
        <div ref={ref=>this.showMsgRef = ref}>
          <TipDiv key={res.data.pic_id} ref={ref=>this.showMsgRef = ref}>
            <TipCon>
              <Tooltip title={res.data.filename}>
                <ImgConTip>{res.data.filename}</ImgConTip>
              </Tooltip>
              {
                res.data.upload_state === 6 &&
                <ImgGress style={{width:'20%'}}>查验失败</ImgGress>
              }
              {
                (res.data.upload_state === 7 || res.data.upload_state === 8) &&
                <ImgGress style={{width:'20%'}}>查验成功</ImgGress>
              }
              <ImgInfo style={{width:'20%'}}><a href="javascript:;" onClick={()=>{
                this.getDetailFnc(res.data.invoice_id,res.data.upload_state);
              }}>查看详情</a></ImgInfo>
            </TipCon>
            <ArrowCon/>
          </TipDiv>
        </div>
      )
    }
  };
  getDetailFnc = (invoiceId,state) => {
    this.props.getDetail(invoiceId,(res)=>{
      this.setState({showDetail:this.invoiceDetail(res,state)})
    });
  };
  invoiceDetail = (res,state) => {
    return (
      <ExpandInvoice detailList={res.data}
                     invoiceAction={this.props.invoiceAction}
                     memoEdit={true}
                     invMemoFnc={this.props.invMemoFnc}
                     navList={this.props.navList}
                     cancelFnc={()=>{this.setState({showDetail:null})}}
                     showScaleFnc={this.picScaleFnc}
                     noMemo={state}
      />
    )
  };
  getDetailFnc2 = (invoiceId,state) => {
    this.props.getDetail(invoiceId,(res)=>{
      this.setState({showDetail:this.invoiceDetail2(res,state)})
    });
  };
  invoiceDetail2 = (res,state) => {
    return (
      <ExpandInvoice detailList={res.data}
                     invoiceAction={this.props.invoiceAction}
                     memoEdit={false}
                     invMemoFnc={this.props.invMemoFnc}
                     navList={this.props.navList}
                     cancelFnc={()=>{this.setState({showDetail:null})}}
                     showScaleFnc={this.picScaleFnc}
                     noMemo={state}
      />
    )
  };
  picScaleFnc = (result,index) => {
    const res = result.filter((obj)=>obj.thumb_path !== "");
    this.setState({
      showPicScale:<PictureScaleModal onCancel={()=>{this.setState({showPicScale:''})}}
                                      items={res}
                                      index={index}
      />})
  };
  componentDidMount() {
    this.getWaitListFnc();
    this.props.router.setRouteLeaveHook(
      this.props.route,
      this.routerWillLeave
    )
  };
  routerWillLeave = (nextLocation) => {
    if(this.ws){
      this.ws.close();
    }
    // 返回 false 会继续停留当前页面，
    // 否则，返回一个字符串，会显示给用户，让其自己决定
  };
  addIndexFnc = () => {
    if(this.state.waitCheckNum === 1){
      this.invoiceData = [];
      this.setState({showManual:false,showFinal:true,waitCheckNum:0,getCheckArea:null,getImgArea:null,canNotLeave:false,currIndex:0});
      this.canWs = true;
      this.showImg = true;
      this.showMessage = true;
      window.onbeforeunload = null;
      setTimeout(()=>{
        this.setState({showMsg:null});
      },2000);
    }else{
      this.setState({currIndex:this.state.currIndex + 1,waitCheckNum:this.state.waitCheckNum - 1})
    }
  };
  cancelCheckFnc = (id) => {
    if(this.state.showMsg){
      this.setState({showMsg:null});
    }
    const cancel = this.state.cancelCheck;
    cancel.push({pic_id:id});
    this.setState({cancelCheck:cancel});
  };
  showSuccessFunct = (res) => {
    if(this.showMsgRef){
      this.showMsgRef.style.display = 'block';
    }
    this.setState({showMsg:()=>this.showSuccessFnc(res)});
  };
  showWait = () => {
    const {waitList} = this.props;
    return (
      <WaitBtn onClick={this.goToWait}>
        <Badge count={waitList.total} style={{top:'-22px'}} overflowCount={10}>
          <WaitSpan href="javascript:;">待确认发票</WaitSpan>
        </Badge>
      </WaitBtn>
    )
  };
  goToWait = () => {
    const {waitList} = this.props;
    if(waitList && waitList.total > 0){
      this.setState({showWaitList:true,changeClassName:true,pageNum:1},()=>{
        this.getWaitListFnc();
      });
    }else{
      this.setState({noWaitData:<Modal style = {{textAlign:'center',top:150}}
                                       closable={false}
                                       visible
                                       width={400}
                                       maskClosable={false}
                                       footer={null}
                                >
                                  <p style={{fontSize:14,padding:'20px 0'}}>暂无待确认发票</p>
                                  <Button type="primary"
                                          onClick={()=>{
                                            this.setState({noWaitData:''});
                                          }}
                                  >确定</Button>
                                </Modal>})
    }
  };
  getWaitListFnc = () => {
    const param = {
      page:this.state.pageNum,
      size:10,
      status:this.state.status,
      fpdm:this.state.fpdm,
      fphm:this.state.fphm,
      select_all:this.state.select_all,
    };
    this.props.getWaitList(param);
  };
  showBack = () =>{
    return <CloseIcon
              type="close"
              onClick={()=>{
                this.setState({
                  pageNum:1,
                  status:'',
                  fphm:'',
                  fpdm:'',
                  changeClassName:false,
                  select_all:0,
                  showCheck:true,
                });
                setTimeout(() => {
                  this.setState({showWaitList:false});
                },500);
              }}/>
  };
  showPdfDetail = (uid) => {
    for(let i in this.state.findMore){
      if(this.state.findMore[i].pic_id == uid){
        if(!this.state.findMore[i].over){
          this.state.pdfList.push(this.state.findMore[i])
        }
      }
    }
    this.setState({visible:false})
  }
  onClose = () => {
    this.setState({
      visible: true,
      pdfList:[],
    });
  };
  showRefreshBtn = () => {
    return(
        <RefreshBtn>
          <RefreshIcon type="sync" onClick={()=>{
            this.setState({
              showList:false,
              showLoad:false,
              fileList:[],
              showUpload:false,
              showManual:false,
              uploadState:[],
              completeNum:0,
              currIndex:0,
              showMsg:null,
              waitCheckNum:0,
              showFinal:true,
              showDetail:null,
              cancelCheck:[],
              canNotLeave:false,
              getCheckArea:null,
              completeCheck:0,
              getImgArea:null,
              notSupport:'',
              showMemo:'',
              memo:'',
              memoValue:'',
              showWaitList:false,
              changeClassName:true,
              pageNum:1,
              failInvoiceNum:0,
              fpdm:'',
              fphm:'',
              state:[],
              status:'',
              manualNum:0,
              showHdReturn:true,
              noWaitData:'',
              checkTime:'',
              haveTime:'',
              mouseDown:false,
              select_all:0,
              showCheck:true,
              ev:'',
              tag_ids:'',
              newFileList:[],
              sortedInfo:null,
              filteredInfo:null,
              cusId:null,
              conId:null,
              ddId:null,
              findMore:[],
              pdfList:[],
              visible:true,
              contractList:[],
              drawdownList:[],
            })
            this.canWs = true;
            this.goAgain = false;
            this.showImg = true;
            this.showMessage = true;
            this.invoiceData = [];
            this.onlyOne = true;
            this.uploads = [];
            this.removeIndex = 0;
            this.fileInfo = [];
            if(this.ws){
              this.onlyOne = false;
              this.ws.close()
            }
          }}/>
        </RefreshBtn>
      )
  };
  searchState = () => {
    const state = this.state.state;
    const fileList = this.state.fileList;
    const uploadState = this.state.uploadState;
    const newFileList = [];
    if(state == '' || state===undefined){
      this.setState({newFileList:this.state.fileList});
      return;
    }
    for(let j in state){
      for(let i in fileList){
        if(uploadState.find((el)=>el.pic_id === fileList[i].uid && el.state == 6) && state[j] == '1'){
          newFileList.push(fileList[i]);
        }else if(uploadState.find((el)=>el.pic_id === fileList[i].uid && ( el.state == 7||el.state == 11)) && state[j] == '2'){
          newFileList.push(fileList[i]);
        }else if(uploadState.find((el)=>el.pic_id === fileList[i].uid && el.state == 0) && state[j] == '3'){
          newFileList.push(fileList[i]);
        }else if(uploadState.find((el)=>el.pic_id === fileList[i].uid && (el.state == 1 || el.state == 2 || el.state==3)) && state[j] == '5'){
          newFileList.push(fileList[i]);
        }else if(( uploadState.find((el)=>el.pic_id === fileList[i].uid && el.state === 4) )&& state[j] == '6'){
          newFileList.push(fileList[i]);
        }
        this.setState({newFileList:newFileList})
      }
    }
  }
  render(){
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [{
      title: '序号',
      key:'xh',
      dataIndex: 'xh',
      width:'5%',
      render:(text,record,index)=>{
        return <div>{index+1}</div>
      }
    },{
      title: '文件状态',
      key:'zt',
      dataIndex: 'zt',
      width:'10%',
      render:(text,record,index)=>{
        return <div>  
                {
                  this.state.uploadState.find((el)=>el.pic_id === record.uid) ?
                    <div>
                      {
                        this.state.uploadState.find((el)=>el.pic_id === record.uid).over == '0'?
                        <div>
                          查验完成
                        </div>
                        :
                        <div>
                          {
                            this.state.uploadState.find((el)=>el.pic_id === record.uid && el.state == 7) &&
                            <span>上传失败</span>
                          }
                          {
                            this.state.uploadState.find((el)=>el.pic_id === record.uid && el.state == 11) &&
                            <span>上传失败（文件大小超过3M）</span>
                          }
                          {
                            this.state.uploadState.find((el)=>el.pic_id === record.uid && el.state == 5) &&
                            <span>上传中...</span>
                          }
                          {
                            this.state.uploadState.find((el)=>el.pic_id === record.uid && el.state == 6) &&
                            <span>上传成功</span>
                          }
                          {
                            this.state.uploadState.find((el)=>el.pic_id === record.uid && el.state == 4) &&
                            <span style={{marginRight:'25%'}}>无法识别</span>
                          }
                          {
                            this.state.uploadState.find((el)=>el.pic_id === record.uid && (el.state == 1 || el.state == 2 || el.state == 3)) &&
                            <span>查验失败</span>
                          }
                          {
                            this.state.uploadState.find((el)=>el.pic_id === record.uid && el.state == 0) &&
                            <span>查验成功</span>
                          }
                        </div>
                      }
                    </div>
                    :
                    <div>等待上传</div>
                }
              </div>
      }
    },{
      title: '文件名',
      key:'name',
      dataIndex: 'name',
      width:'15%',
    },{
      title: '发票类型',
      key:'fpzl',
      dataIndex: 'fpzl',
      width:'10%',
      render:(text,record,index)=>{
        return <div>
                {
                  this.state.uploadState.find((el)=>el.pic_id === record.uid && el.type!=='complex' &&(el.fpzl=='04' || el.fpzl=='11')) ?
                  <PuSpan/>:""
                }
                {
                  this.state.uploadState.find((el)=>el.pic_id === record.uid && el.type!=='complex' &&(el.fpzl=='01' || el.fpzl=='02')) ?
                  <ZhuanSpan/>:""
                }
               </div>
      }
    },{
      title: '查验结果',
      key:'state',
      dataIndex: 'state',
      width:'12%',
      render:(text,record,index)=>{
        return <div>
                {
                  this.state.uploadState.find((el)=>el.pic_id == record.uid) &&
                    <div>
                      {
                        this.state.uploadState.find((el)=>el.pic_id === record.uid && el.state == 5) &&
                        <div><Icon type="sync" spin /> &nbsp;&nbsp;上传中</div>
                      }
                      {
                        this.state.uploadState.find((el)=>el.pic_id === record.uid).over=='0' &&
                        <div>查验完成</div>
                      }
                      {
                        this.state.uploadState.find((el)=>el.pic_id === record.uid && el.state == 6) &&
                        <div><Icon type="sync" spin /> &nbsp;&nbsp;查验中</div>
                      }
                      {
                        this.state.uploadState.find((el)=>el.pic_id === record.uid && (el.state == 1 || el.state == 2)) &&
                          <ItemSpan style={{float:'left'}}><ItemErrSpan/>查验失败</ItemSpan>
                      }
                      {
                        this.state.uploadState.find((el)=>el.pic_id === record.uid && el.state == 0) &&
                        <span>
                          {
                            this.state.uploadState.find((el)=>el.pic_id === record.uid && el.state == 0).reason?
                            <span>
                              <ItemErrSpan/>
                              {this.state.uploadState.find((el)=>el.pic_id === record.uid && el.state == 0).reason}
                            </span>
                            :
                            <span style={{marginRight:8}}>成功录入</span>
                          }
                       </span>
                      }
                      {
                        this.state.uploadState.find((el)=>el.pic_id === record.uid&& el.state == 3) && 
                        <span>
                          <ItemErrSpan/>
                          {this.state.uploadState.find((el)=>el.pic_id === record.uid&& el.state == 3).reason}
                        </span>
                      }
                    </div>
                }
              </div>
      }
    },{
      title: '备注',
      key:'bz',
      dataIndex: 'bz',
      width:'12%',
      render:(text,record,index)=>{
        return <div>
                  {
                    this.state.uploadState.find((el)=>el.pic_id === record.uid && el.zfbz=='Y') &&
                    <div style={{overflow:'hidden',lineHeight:1.2}}><ItemPointSpan/>该发票为已作废状态</div>
                  }
              </div>
      }
    },{
      title: '录入时间',
      key:'create_time',
      dataIndex: 'create_time',
      render:(text,record,index)=>{
        return <div>{this.state.uploadState.find((el)=>el.pic_id === record.uid && el.type!=='complex' && el.time)?this.state.uploadState.find((el)=>el.pic_id === record.uid).time:'---'}</div>
      }
    },{
      title: '操作',
      key:'action',
      dataIndex: 'action',
      width:'8%',
      render:(text,record,index)=>{
        let a = 1;
        return <div>
                  {
                    this.state.uploadState.find((el)=>el.pic_id === record.uid) ?
                      <div>
                        {
                          (this.state.uploadState.find((el)=>el.pic_id === record.uid).type=='complex' || this.state.uploadState.find((el)=>el.pic_id === record.uid).over=='0') ?
                          <span>
                            <a href="javascript:;" onClick={()=>{
                              this.showPdfDetail(record.uid);
                            }}>查看查验结果</a>
                          </span>
                          :
                          <div>
                            {
                              this.state.uploadState.find((el)=>el.pic_id === record.uid && el.state == 0) &&
                              <span>
                              <a href="javascript:;" onClick={()=>{
                                const currData = this.state.uploadState.find((i)=>i.pic_id === record.uid);
                                this.getDetailFnc(currData.invoice_id);
                              }}>查看详情</a>
                            </span>
                            }
                            {
                              this.state.uploadState.find((el)=>el.pic_id === record.uid && (el.state == 1 || el.state == 2 || el.state == 3)) &&
                              <a href="javascript:;" onClick={this.goToWait}>待确认</a>
                            }
                            {
                              this.state.uploadState.find((el)=>el.pic_id === record.uid && (el.state == 5)) &&
                              <a href="javascript:;" onClick={()=>{
                                if(a === 1){
                                  a = 2;
                                  this.uploadProps.onRemove(record);
                                }else{
                                  return;
                                }
                              }}>取消上传</a>
                            }
                          </div>
                        }
                      </div>
                      :
                      <div>
                        <a href="javascript:;" onClick={()=>{
                          if(a === 1){
                            a = 2;
                            this.uploadProps.onRemove(record);
                          }else{
                            return;
                          }
                        }}>取消上传</a>
                      </div>
                  }
                </div>
      }
    }]
    const percent = parseInt(this.state.completeNum / this.state.fileList.length *100);
    return(
      <div>
        <div style={{display:this.state.showWaitList?'none':'block',position:"relative"}}>
          <NavTitle
            title="发票录入"
            submeun='识别录入'
            search={this.showWait}
            refreshBtn={this.showRefreshBtn}
          />
          <div style={{color:"#FF7E7E",fontSize:12}}>注：为保证图像识别质量，请保证图片拍摄或扫描清晰无遮挡，建议图像分辨率300dpi，图像大小不超过2M。</div>
          <ScanContent>
            <div style={{height:200,marginTop:15}}>
              <div style={{background:"#fff",overflow:"hidden",width:"50%",float:'left',height:'100%'}}>
                <div style={{width:"95%",margin:'0 auto',height:'80%',marginTop:20}}>
                  <Upload type="drag" {...this.uploadProps} ref={ref=>this.uploadRef = ref}>
                    <div className="ant-upload-drag-icon">
                      <AddIcon/>
                    </div>
                    <p className="ant-upload-hint">上传、识别、查验过程中，若离开此页面，所有操作将被终止</p>
                    <p className="ant-upload-text" style={{fontWeight:600}}>点击或拖拽批量上传图像</p>
                  </Upload>
                </div>
              </div>
                  <LoadInfoRight>
                    <LoadInfoTitle>本次识别发票数量统计</LoadInfoTitle>
                    <div style={{marginTop:30}}>
                      <LoadInfoCon style={{float:"left",width:"45%"}}>
                        <LoadInfoNum>{this.state.completeCheck}</LoadInfoNum>
                        <LoadInfoP>
                          <div>本次识别已完成的发票累计</div>
                        </LoadInfoP>
                      </LoadInfoCon>
                      <LoadInfoCon style={{float:"left",width:"45%"}}>
                        <LoadInfoNum>{this.state.failInvoiceNum}</LoadInfoNum>
                        <LoadInfoP>
                          <div>本次无法识别的发票累计</div>
                          <div>已加入待确认发票中<div style={{marginTop:5,marginLeft:8,display:"inline-block",cursor:"pointer",color:"#2397CA"}} onClick={this.goToWait}>查看详情</div></div>
                        </LoadInfoP>
                      </LoadInfoCon>
                    </div>
                  </LoadInfoRight>
            </div>
            {
              this.state.showManual && this.invoiceData.length > 0 &&
              <MiddleCon>
                <MiddleLeft>
                  <div style={{lineHeight:2,fontSize:15,margin:'20px 0 20px',textAlign:'center'}}>
                    <span style={{marginLeft:10}}>已查验</span>
                    <span style={{marginLeft:20}}>{this.state.completeCheck}&nbsp;张</span>
                    <span style={{marginLeft:10}}>您还有</span>
                    <span style={{marginLeft:20}}>{this.state.waitCheckNum}&nbsp;张图片识别结果等待查验</span>
                  </div>
                  <div style={{border:'1px solid #ccc',overflow:'hidden',width:'95%',height:350,margin:'0 auto',background:'#616264',position:'relative'}}>
                    {this.state.getImgArea && this.state.getImgArea()}
                  </div>
                </MiddleLeft>
                <MiddleRight>
                  {this.state.getCheckArea && this.state.getCheckArea()}
                </MiddleRight>
              </MiddleCon>
            }
            <UploadContent>
                {this.state.showMsg && this.state.showMsg()}
                <div style={{overflow:'hidden',width:'100%'}}>
                  <GressBar>
                    <div style={{float:'left'}}>
                      <span style={{marginRight:10}}>上传进度</span>
                      <span style={{marginRight:8}}>{this.state.completeNum}/{this.state.fileList.length}</span>
                    </div>
                    <GressCon>
                      <Progress strokeWidth={20} percent={percent?percent:0} format={percent => `${percent}%`} style={{position:'absolute',top:'-1px',left:0}}/>
                    </GressCon>
                  </GressBar>
                  <div style={{float:'left',margin:'10px 0 0 20px'}}>
                    <div style={{float:'left',fontSize:13,marginTop:7}}>过滤：</div>
                    <Select
                      placeholder="请选择"
                      allowClear={true}
                      mode="multiple"
                      value={this.state.state}
                      onChange={(e)=>this.setState({state:e})}
                      style={{width:200,float:'left'}}
                      size='large'
                    >
                      <Option key='1'>上传成功</Option>
                      <Option key='2'>上传失败</Option>
                      <Option key='3'>成功录入</Option>
                      <Option key='4'>禁止录入</Option>
                      <Option key='5'>查验失败</Option>
                      <Option key='6'>无法识别</Option>
                    </Select>
                    <Button style={{float:'left',marginLeft:5}} onClick={this.searchState} type='primary'>搜索</Button>
                    <Button style={{float:'left',marginLeft:5}} onClick={()=>this.setState({state:[]},()=>this.searchState())}>清空</Button>
                  </div>
                </div>
                <div style={{overflow:'hidden'}}>
                  <div>
                    <ListContainer>
                      <Table columns={columns}
                            dataSource={this.state.newFileList}
                            pagination={false}
                            scroll={{ y: 400 }}
                            rowKey={(r,i)=>(i)}/>
                    </ListContainer>
                  </div>
                </div>
                <PdfContent style={{height:this.state.visible?0:500,border:this.state.visible?0:'3px solid #108ee9'}}>
                  <div onClick={this.onClose} style={{width:'100%',cursor:'pointer',lineHeight:2,textAlign:'center',margin:'20px 0'}}><Icon type="caret-down" /></div>
                  <PdfTable data={this.state.pdfList}
                            goToWait={this.goToWait}
                            getDetailFnc={this.getDetailFnc}/>
                </PdfContent>
              </UploadContent>
          </ScanContent>
          {this.state.showDetail}
          {this.state.showPicScale}
          {this.state.notSupport}
          {this.state.showMemo}
          {this.state.noWaitData}
        </div>
        {
          this.state.showWaitList &&
          <div>
            <NavTitle
              submeun="待确认发票"
              title="发票录入"
              back={this.showBack}
            />
            <div className={this.state.changeClassName?"wait-table-container":"wait-table-out"}>
              <WaitConfirmFilter
                searchWait={this.searchWaitFnc}
                clearCheck={()=>{
                  this.setState({showCheck:true})
                }}
                checkInvoice={this.checkInvoice}
                showCheck={this.state.showCheck}
                clearWait={this.clearWaitFnc}
              />
              <WaitConfirmTable
                setPage={this.setPageFnc}
                state={this.state}
                ocrCheckFnc={this.props.ocrCheckFnc}
                clearWaitFnc={this.clearWaitFnc}
                clearCheck={()=>{
                  this.setState({showCheck:true})
                }}
                ref={ref=>this.WaitConfirmTable = ref}
                navList={this.props.navList}
                collectionStop={this.props.collectionStop}
                getWaitListFnc={this.getWaitListFnc}
                {...this.props}
              />
            </div>
          </div>
        }
      </div>
    )
  }
  checkInvoice = () => {
    const param = {
      fpdm: this.state.fpdm,
      fphm: this.state.fphm,
      page: this.state.pageNum,
      size: 10,
      status: this.state.status,
      select_all: 1,
    }
    if(this.state.showCheck === true){
      this.props.getWaitList(param,(res)=>{
        this.WaitConfirmTable.checkRadiuo(res)
        this.setState({showCheck:false})
      })
    }else{
      this.WaitConfirmTable.clearRadiuo()
      this.setState({showCheck:true})
    }
  }
  setPageFnc = (page) => {
    this.setState({pageNum:page})
  };
  searchWaitFnc = (val) => {
    this.setState({
      pageNum:1,
      status:val.status,
      fphm:val.fphm,
      fpdm:val.fpdm,
      select_all:0,
      showCheck:true,
    })
  };
  clearWaitFnc = () => {
    this.setState({
      pageNum:1,
      status:'',
      fphm:'',
      fpdm:'',
      select_all:0,
      showCheck:true,
    });
    this.WaitConfirmTable.clearRadiuo();
  }
}
export default OcrPage;
