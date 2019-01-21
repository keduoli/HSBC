import React from 'react'
import styled from 'styled-components'
import { Deduction,TollInvoice,AddCallModal,DeductionModal,VehicleInvoice,DeclareModal } from 'components'
import {Modal,Icon,Button} from 'antd'

const ExpandCons = styled.div`
  overflow:hidden;
  padding:13px;
  font-size:12px;
`;
const InvoiceLeft = styled.div`
  width:75%;
`;
const InvoiceRight = styled.div`
  width:25%;
  padding-left:15px;
`;
const ExSpan = styled.span`
  width:60px;
  display:inline-block;
  background:#FAC000;
  color:#fff;
  text-align:center;
  border-radius:2px;
`;
const Border = styled.div`
  width:100%;
  padding:10px;
  position:relative;
  height:300px;
  border:1px solid #000;
`;
const InvoiceFont = styled.p`
  font-size:16px;
  color: #FF7E7E;
  text-align:center;
  line-height:3;
`;
class ExpandDeduction extends React.Component{
  state={
    showBunding:"",
    deductionModal:'',
    declareModal:'',
    is_received:this.props.detailList.is_received,
  }
  deductionFnc = () =>{
    this.setState({
      showBunding:<AddCallModal cancelModal={()=>{this.setState({showBunding:''})}}
                                deduction={true}
                                title="验证手机号"
                                deductionSet={()=>this.props.settingsList.is_declaration===null?this.declare():this.deductionSet(null)}
                                deductionList={this.props.resultList}
                                getBunding={this.props.getBunding}
                                getPhoneSend={this.props.getPhoneSend}
                        />
    })
  }
  declare = () => {
    this.setState({
      showBunding:'',
      declareModal:<DeclareModal cancelModal={()=>this.setState({declareModal:''})}
                                 settingsFnc={this.props.settingsFnc}
                                 settingsList={this.props.settingsList}
                                 deduction={(val)=>this.deductionSet(val)}
                                 settingsGet={this.props.settingsGet}
                                 />
    })
  }
  deductionSet = (val) => {
    this.setState({
      showBunding:'',
      declareModal:'',
      deductionModal:<DeductionModal  cancelModal={()=>{this.setState({deductionModal:''})}}
                                      title="认证确认"
                                      confirmList={this.props.confirmList}
                                      deductionConfirm={this.props.deductionConfirm}
                                      settingsList={this.props.settingsList}
                                      val={val!==null?val:this.props.settingsList.is_declaration}
                                      length='1'
                                      invoice_info={JSON.stringify([{fphm:this.props.detailList.fphm,fpdm:this.props.detailList.fpdm}])}
                                      invoice_ids={this.props.record.id}
                                      deductionFnc={this.props.deductionFnc}
                                      clearState={this.props.clearState}
                                      getData={this.props.getData}/>       
    })
  }
  receiveFnc = () => {
    const {detailList,record,refreshData} = this.props;
    const invoice_ids = detailList.id;
    if(record){
      if(this.state.is_received === '1' ){
        this.props.deductionReceive({
          invoice_ids:invoice_ids,
          is_receive:0,
        },()=>{
          refreshData();
          this.props.getDetail({id:record.id},(res)=>{
            this.setState({
              is_received:res.data.is_received
            })
          })
        })
      }else{
        this.props.deductionReceive({
          invoice_ids:invoice_ids,
          is_receive:1,
        },()=>{
          refreshData();
          this.props.getDetail({id:record.id},(res)=>{
            this.setState({
              is_received:res.data.is_received
            })
          })
        })
      }
    }
  }
  render(){
    const {detailList,record,settingsList} = this.props;
    return(
      <div>
        <Modal style = {{top:100}}
              visible
              key="ExpandDeduction"
              onCancel={this.props.cancelFnc}
              width={1200}
              footer={null}
        >
          <ExpandCons>
            <div style={{display:'flex',overflow:'hidden'}}>
              <InvoiceLeft>
                {
                  settingsList.is_collect_all == true && 
                  record.is_collect_all === true   ?
                  <div>
                    {detailList.fplx === "01" && <Deduction scanData={detailList} record={record}/>}
                    {detailList.fplx === '03' && <VehicleInvoice scanData={detailList}/>}
                    {detailList.fplx === "14" && <TollInvoice deduction={true} scanData={detailList} record={record}/>}
                    {
                      detailList.fplx !== '03' && detailList.fplx !== '01' && detailList.fplx !== '14' &&
                      <div style={{overflow:'hidden',textAlign:'center'}}>
                        <InvoiceFont>{detailList.fplx === '14' ? '通行费票' : '增值税专用发票'}</InvoiceFont>
                        <Border>
                          <div style={{marginTop:100}}>
                            <div style={{fontSize:13,lineHeight:2,marginTop:35}}>
                              <p>暂时无法获取此发票全票面信息，请稍后再试。</p>
                            </div>
                          </div>
                        </Border>
                      </div>
                    }
                  </div>
                  :
                  <div style={{overflow:'hidden',textAlign:'center'}}>
                    <InvoiceFont>{detailList.fplx === '14' ? '通行费票' : '增值税专用发票'}</InvoiceFont>
                    <Border>
                      <div style={{marginTop:100}}>{this.props.isCollectAll}</div>
                    </Border>
                  </div>
                }
                {/*{
                  detailList.fplx === "14" && <TollInvoice scanData={detailList} record={record}/>
                }*/}
              </InvoiceLeft>
              <InvoiceRight>
                <div style={{marginTop:40,marginLeft:30,fontSize:13}}>
                  {
                    this.props.result===true?
                    ''
                    :
                    <div>
                      <div style={{color:'#2397CA'}}><Icon type="bars" style={{marginRight:10}} />签收信息</div>
                      <div style={{marginTop:20}}>签收状态
                      {
                        record?
                        <span style={{marginLeft:40}}>
                          {this.state.is_received === '1' && <span>已签收 &nbsp; &nbsp; <Button onClick={this.receiveFnc}>取消签收</Button></span>}
                          {this.state.is_received === '0' && <span>未签收 &nbsp; &nbsp; <Button onClick={this.receiveFnc}>签收</Button></span>}
                        </span>
                        :
                        <span style={{marginLeft:40}}>---</span>
                      }
                      </div>
                      <div style={{marginTop:20}}>签收人
                        <span style={{marginLeft:56,fontSize:12}}>{detailList.rec_user!==null&&this.state.is_received !== '0'?detailList.rec_user:"---"}</span>
                      </div>
                      <div style={{marginTop:20}}>签收时间
                        <span style={{marginLeft:42,fontSize:12}}>{record.rec_time!==null&&this.state.is_received !== '0'?record.rec_time:"---"}</span>
                      </div>
                    </div>
                  }
                  <div style={{color:'#2397CA',marginTop:30}}><Icon type="bars" style={{marginRight:10}} />认证信息</div>
                  <div style={{marginTop:20}}>认证状态<span style={{marginLeft:40}}>{record?record.confirm_status_name:"未认证"}</span></div>
                  <div style={{marginTop:20}}>认证结果
                  {
                    record?
                    <span style={{marginLeft:40,fontSize:12}}>
                      {record.confirm_result===0  && <ExSpan>未认证</ExSpan>}
                      {record.confirm_result===1  && <ExSpan>认证通过</ExSpan>}
                      {record.confirm_result===2  && <ExSpan>不通过</ExSpan>}
                    </span>
                    :
                    <span></span>
                  }
                  </div>
                  <div style={{marginTop:20}}>认证人<span style={{marginLeft:55}}>{detailList.dedu_user!==null?detailList.dedu_user:"---"}</span></div>
                  <div style={{marginTop:20}}>认证日期<span style={{marginLeft:40}}>{record&&record.confirm_date!==null?record.confirm_date:"---"}</span></div>
                  <div style={{marginTop:20}}>认证来源<span style={{marginLeft:40}}>
										{record.is_dedu_dkt == 0 && '国税认证'}
										{record.is_dedu_dkt == 1 && '费耘认证'}
										{record.is_dedu_dkt == null && '--'}
                  </span></div>
                  {
                    record && record.confirm_result===2&&
                    <div>
                      <div style={{marginTop:20}}>失败原因
                        <span style={{marginLeft:40,color:'red'}}>
                          {record.dedu_err_code===2 && '无此票'}
                          {record.dedu_err_code===3 && '异常发票无法认证'}
                          {record.dedu_err_code===4 && '该票已经认证'}
                          {record.dedu_err_code===5 && '该票已经逾期无法认证'}
                          {record.dedu_err_code===6 && '该票已经申请认证'}
                          {record.dedu_err_code===7 && '申请认证月份已过期'}
                          {record.dedu_err_code===8 && '其它异常'}
                          {record.dedu_err_code===9 && '该票未到期'}
                          {record.dedu_err_code===10 && '红票不能抵扣'}
                          {record.dedu_err_code===11 && '认证类型错误'}
                        </span>
                      </div>
                      <div style={{marginTop:40}}>
                        <Button type='primary' style={{marginRight:60,float:'right'}} onClick={this.deductionFnc}>再次认证</Button>
                      </div>
                    </div>
                  }
                </div>
              </InvoiceRight>
            </div>
          </ExpandCons>
        </Modal>
        {this.state.showBunding}
        {this.state.deductionModal}
        {this.state.declareModal}
      </div>
    )
  }
}

export default ExpandDeduction;

