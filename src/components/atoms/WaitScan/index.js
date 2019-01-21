import React from 'react'
import styled from 'styled-components'
import {message,Input,Modal,Button} from 'antd'

const WaitTitle = styled.p`
  font-size:15px;
  margin-bottom:5px;
  font-weight:600;
`;
const WaitCon = styled.div`
  margin:0 auto;
  padding-top:40px;
  text-align:center;
`;
const ShowScanCon = styled.div`
  text-align:center;
  margin-left:12px;
  width:53%;
  height:77vh;
  float:left;
  border-left:3px solid #2397CA;
  background:url(images/waitscan.png) no-repeat #fff;
  background-position: 50% 102%;
`;
const ShowSuccCon = styled.div`
  text-align:center;
  width:70%;
  height:77vh;
  float:left;
  background:url(images/successive.png) no-repeat #fff;
  background-position: 44% 125%;
`;
const OutInput = styled.div`
  margin:0 auto;
  background:url(images/scan.png) no-repeat;
  margin-top:80px;
  background-size:440px 80px;
  width: 440px;
  height: 80px;
`;
class WaitScan extends React.Component{
	constructor(props){
		super(props)
	}
  state={
    noScan:'',
  };
  noScanFnc=()=>{
    return(
      <Modal style = {{textAlign:'center',top:200}}
             closable={false}
             visible
             width={400}
             maskClosable={false}
             footer={null}
      >
        <p style={{fontSize:18,padding:'30px 0'}}>请将输入法切换成英文状态</p>
        <Button type="primary"
                onClick={()=>{
                  this.scanInput.focus();
                  this.setState({noScan:''});
                }}
        >确定</Button>
      </Modal>
    )
  };
  scanActionFnc = (e) => {
    const {showLoading,invoiceCheck,showScanSuccess,showScanError,showTips,scanAgainFnc,successive,changeContent,changeCanShow} = this.props;
    const val = e.target.value;
    if(!val){
      message.warning('您还没有扫描，请使用扫描枪扫描');return;
    }
    changeCanShow?changeCanShow():'';
    showLoading();
    const now = new Date();
    const year = now.getFullYear();
    let month =(now.getMonth() + 1).toString();
    let day = (now.getDate()).toString();
    if (month.length === 1) {
      month = "0" + month;
    }
    if (day.length === 1) {
      day = "0" + day;
    }
    const dateTime = year + month +  day;
    if(val.indexOf("http") >= 0 || val.indexOf("https") >= 0){
      showTips("发票二维码无法识别或错误");return;
    }
    if(val.length>50 && val.indexOf(",") >= 0){
      const date = val.split(",");
      if(date.length > 5){
        const dates = date[5];
        if(dateTime === dates){
          showTips("今天开具的发票，请次日录入");return;
        }
      }
    }
    const reg = /^[-a-zA-Z0-9,.:\s]+$/;
    if(!reg.test(val)){
      showTips("二维码无法识别或错误");return;
    }
    const param = successive ? ( this.props.showGroup === true ? {content:val,successive:1,is_group:1} : 										{content:val,successive:1} )
    									:
										( this.props.showGroup === true ? {content:val,is_group:1} : {content:val} )
    changeContent?changeContent(param):"";
    invoiceCheck(param,(res)=>{
      showScanSuccess(res);
    },(res,msg)=>{
      showScanError(res,msg);
    },(res)=>{
      showTips(res);
    },(res,msg)=>{
      scanAgainFnc(res,msg);
    })
  };
  render(){
    const {showManual,successive} = this.props;
    return(
      successive?
      <ShowSuccCon>
        <WaitCon>
          <WaitTitle>连续扫描</WaitTitle>
          <p style={{margin:'20px 0 30px',fontSize:12}}>
            <span>
            (请确认扫描设备已经连接到我的电脑）
            </span>
          </p>
          <OutInput>
            <Input  className="ShowInput"
                    ref={ref=>this.scanInput = ref}
                    onPressEnter={this.scanActionFnc}
                    type="text"
                    autoFocus
                    placeholder="请使用扫描设备扫描发票二维码，扫描过程中请保持输入框聚焦状态"
                    onChange={(e)=>{
                      if(e.target.value.indexOf('，') >= 0 || /^[\u4e00-\u9fa5]+$/i.test(e.target.value)){
                        e.target.value = '';
                        this.scanInput.blur();
                        this.setState({noScan:this.noScanFnc()})
                      }
                    }}
              />
          </OutInput>
        </WaitCon>
        {this.state.noScan}
      </ShowSuccCon>
      :
      <ShowScanCon>
        <WaitCon>
          <WaitTitle>扫描录入</WaitTitle>
          <p style={{margin:'20px 0 30px',fontSize:12}}>
            <span>
            (请确认扫描设备已经连接到我的电脑）
            </span>
          </p>
          <OutInput>
            <Input  className="ShowInput"
                    ref={ref=>this.scanInput = ref}
                    onPressEnter={this.scanActionFnc}
                    type="text"
                    autoFocus
                    placeholder="请使用扫描设备扫描发票二维码，扫描过程中请保持输入框聚焦状态"
                    onChange={(e)=>{
                      if(e.target.value.indexOf('，') >= 0 || /^[\u4e00-\u9fa5]+$/i.test(e.target.value)){
                        e.target.value = '';
                        this.scanInput.blur();
                        this.setState({noScan:this.noScanFnc()})
                      }
                    }}
              />
          </OutInput>
        </WaitCon>
        {this.state.noScan}
      </ShowScanCon>
    )
  }
}
export default WaitScan;
