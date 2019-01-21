import React from 'react'
import styled from 'styled-components'
import {Button,Input,Select,message} from 'antd'
const AttachCon = styled.div`
  width:100%;
  padding:0 0 15px 15px;
  overflow:hidden;
`;
const AttachGrop = styled.div`
  margin-bottom:15px;
  text-align:left;
  margin-left:5px;
  color:#242424;
  overflow:hidden;
`;
const AttLabel = styled.span`
  width:40px;
  margin-bottom:8px;
  display:inline-block;
`;
const AttContent = styled.div`
  overflow:hidden;
`;
const RecordContent = styled.div`
  max-height:100px;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 5px;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #a0a0a0;
    border-left: 2px solid transparent;
  }
`;
const MackBtn = styled.span`
  display:inline-block;
  padding:2px 5px;
  background:#108ee9;
  color:#fff;
  margin:0 10px 10px 0;
  border-radius:3px;
`;
const LogSpan = styled.span`
  margin-right:15px;
`;
const AttachDiv = styled.div`
  width:50px;
  height:50px;
  float:left;
  text-align:center;
  line-height:50px;
  background:#66abe3;
  color:#fff;
  margin:0 8px 10px 0;
`;
const ItemErrSpan = styled.span`
  display:inline-block;
  width: 5px;
  height: 5px;
  margin-right:5px;
  background:#FF7E7E;
  border-radius:50%;
  margin-bottom: 2px;
`;
const ItemSpan = styled.span`
  display:block;
  margin-bottom: 10px;
  font-size:12px;
  color:#FF7E7E;
  text-align:center;
`;
const AttachCell = styled.div`
  margin-bottom:10px;
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
  margin: 30px 0 44px -15px;
`;
const { TextArea } = Input;
// 额外展开发票的附加列
class ExpandAttach extends React.Component{
  constructor(props){
    super(props);
    this.state={
      showSave:false,
      memoValue:props.detailList.memo,
      detailList:this.props.detailList
    };
    this.attachments = []
  }
  componentWillMount(){
    if(this.props.detailList.attachments && this.props.detailList.attachments.length > 0 ){
      for(let i in this.props.detailList.attachments){
        if(this.props.detailList.attachments[i].thumb_path !== ""){
          this.attachments.push(this.props.detailList.attachments[i])
        }
      }
    }
  }
  render(){
    const {detailList} = this.state;
    const { showScaleFnc,invMemoFnc,memoEdit,noMemo,navList} = this.props;
    return(
      <AttachCon>
        <div>
          {
            detailList.forbidens&&detailList.forbidens.map((item)=>{
              return(
                <ItemSpan key={item.id}><ItemErrSpan/>{item.msg}</ItemSpan>
              )
            })
          }
        </div>
        <InvoiceStatus>
          &nbsp;&nbsp;&nbsp;发票属性
        </InvoiceStatus>
        {
          detailList.is_repeat && detailList.is_repeat == 1 &&
          <AttachGrop>
            <span style={{color:'#a9a9a9'}}>发票序号：</span>
            <span>{detailList.number}</span>
          </AttachGrop>
        }
        {
          !memoEdit && detailList.memo &&
          <AttachGrop>
            <span style={{color:'#a9a9a9'}}>其他备注：</span>
            <span>{detailList.memo}</span>
          </AttachGrop>
        }
        {
          !memoEdit && detailList.state === '已保存' &&
          <div>
            <AttachGrop>
              <span style={{color:'#a9a9a9'}}>状态：</span>
              <span>{detailList.state}</span>
            </AttachGrop>
          </div>
        }
        {
          memoEdit &&
          <AttachGrop style={{marginBottom:5,overflow:'hidden'}}>
            <p style={{color:'#a9a9a9',marginBottom:6}}>其他备注：</p>
            {
              noMemo !== 6 &&
              <TextArea rows={3}
                        style={{width:210}}
                        value={this.state.memoValue}
                        onChange={(e)=>{
                          this.setState({showSave:true,memoValue:e.target.value});
                        }}
              />
            }
          </AttachGrop>
        }
        {
          memoEdit &&
          <AttachGrop style={{overflow:'hidden',height:22}}>
            {
              this.state.showSave &&
              <div>
                <Button size="small"
                        style={{marginRight: 15}}
                        onClick={()=>{
                          this.setState({showSave:false,memoValue:detailList.memo});
                        }}>取消</Button>
                <Button type="primary" size="small"
                        onClick={()=>{
                          let val = this.state.memoValue.replace(/\s*/g,"");
                          val=val.replace(/\n/g,"")
                          val=val.replace(/\r/g,"")
                          const str = val.split('');
                          for(let i in str){
                            if(str[i] == '|' || str[i] == '&' || str[i] == ';' || str[i] == '$' || str[i] == '%' || str[i] == '<' || str[i] == '>' ||
                              str[i] == '(' || str[i] == ')' || str[i] == '+' || str[i] == '/r' || str[i] == '/n' || str[i] == '\\'){
                                message.error("其他备注不能包含非法字符");return;
                              }
                          }
                          const param = {
                            invoice_ids:detailList.invoiceId,
                            memo:val,
                          };
                          invMemoFnc(param,()=>{
                            detailList.memo = this.state.memoValue;
                            this.setState({detailList});
                            this.setState({showSave:false});
                            this.props.refreshData?this.props.refreshData():'';
                          })
                        }}
                >保存</Button>    
              </div>
            }
          </AttachGrop>
        }
        <AttachGrop style={{marginBottom:8}}>
          <p style={{marginBottom:10,color:'#a9a9a9',float:'left'}}>关联客户编号：</p>
          <AttContent style={{float:'left'}}>
            {
              detailList.cusNum?detailList.cusNum:''
            }
          </AttContent>
        </AttachGrop>
        <AttachGrop style={{marginBottom:8}}>
          <p style={{marginBottom:10,color:'#a9a9a9',float:'left'}}>关联合同编号：</p>
          <AttContent style={{float:'left'}}>
            {
              detailList.contracts&&detailList.contracts.length>0&&detailList.contracts.map((item,index)=>{
                return <div style={{fontSize:12,lineHeight:1.5}} key={index}>{item}</div>
              })
            }
          </AttContent>
        </AttachGrop>
        <AttachGrop style={{marginBottom:8}}>
          <p style={{marginBottom:10,color:'#a9a9a9',float:'left'}}>关联放款流水号：</p>
          <AttContent style={{float:'left'}}>
            {
              detailList.drawdowns&&detailList.drawdowns.length>0&&detailList.drawdowns.map((item,index)=>{
                return <div style={{fontSize:12,lineHeight:1.5}} key={index}>{item}</div>
              })
            }
          </AttContent>
        </AttachGrop>
        {
          this.props.showRepeat === true && 
          <div>
            <AttachGrop>
              <AttLabel style={{color:'#a9a9a9'}}>附&nbsp;&nbsp;&nbsp;&nbsp;件：</AttLabel>
              <AttContent>
                {
                  detailList.attachments.length > 0 && detailList.attachments.map((item,index)=>{
                    if(item.thumb_path === ""){
                      return <a href={item.path} target="_blank" key={index}>
                        <AttachDiv>PDF</AttachDiv>
                      </a>
                    }
                  })
                }
                {
                  this.attachments.length > 0 && this.attachments.map((item,index)=>{
                    if(item.thumb_path !== ""){
                      return <img src={'/ajax/invoice/attachment/'+item.type+'/'+item.id}
                                  key={index}
                                  style={{width:'50px',height:'50px',margin:'0 8px 10px 0',cursor:'pointer',float:'left'}}
                                  onClick={()=>{showScaleFnc(this.attachments,index)}}
                      />}
                  })
                }
              </AttContent>
            </AttachGrop>
            <AttachGrop style={{marginBottom:8}}>
              <p style={{marginBottom:10,color:'#a9a9a9'}}>操作记录：</p>
              <RecordContent>
                {
                  detailList.logs&&detailList.logs.length> 0 && detailList.logs.map((item,index)=>{
                    return(
                      <p key={index}>
                        <LogSpan>{item.create_time}</LogSpan>
                        <LogSpan>{item.realname}</LogSpan>
                        <LogSpan>{item.source}</LogSpan>
                        <span>{item.action}</span>
                      </p>
                    )
                  })
                }
              </RecordContent>
            </AttachGrop>
        </div>
      }
      {
        this.props.scanAgain &&
        <AttachGrop><Button onClick={this.props.showScan} style={{margin:'80px 20px 0 0',float:'right'}}>返回</Button></AttachGrop>
      }
      </AttachCon>
    )
  }
}

export default ExpandAttach;