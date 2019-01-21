import React from 'react'
import {Input,Form,Button,Modal,message,Icon,Table,Tree,Radio,Pagination,Select,Checkbox} from 'antd'
import styled from 'styled-components'
import { num_format,DX } from './../../util'
import { SaleModal,CodingModal,OpenSuccess,PreviewMoal,ImportInvoiceModal } from 'components'
import moment from 'moment';
const RadioGroup = Radio.Group;
const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
const InvoiceCon = styled.div`
  width:100%;
  margin:0 auto;
  overflow:hidden;
  background:#fff;
`;
const InvoiceHeader = styled.div`
  width:96%;
  margin:0 auto;
  overflow:hidden;
  height:110px;
  position:relative;
`;
const HeaderLeft = styled.div`
  float:left;
  font-size:12px;
  margin:40px 30px 0 0;
`;
const HeaderTitle = styled.div`
  position:absolute;
  background:url(images/detail_fc.png) no-repeat center;
  background-size:133px 77px;
  width:230px;
  height:77px;
  left:0;
  right:0;
  margin:0 auto;
  top:16px;
`;
const TitleFont1 = styled.div`
  width:100%;
  height:35px;
  text-align:center;
  line-height:35px;
  font-size: 24px;
  font-weight:600;
  border-bottom:1px solid #979797;
`;
const TitleFont2 = styled.div`
  width:100%;
  height:25px;
  text-align:center;
  line-height:25px;
  font-size: 12px;
  border-top:1px solid #979797;
  margin-top:5px;
`;
const InvoiceSection = styled.div`
  width:96%;
  margin:0 auto;
  overflow:hidden;
  border: 1px solid #EBEBEB;
  font-size:12px;
  color: #4A4A4A;
`;
const LeftAspect = styled.div`
  text-align:center;
  padding:25px 15px 15px;
`;
const RightAspect = styled.div`
  flex-grow:1;
  border-left:1px solid #EBEBEB;
  padding:0 0 15px 15px;
  line-height:1.8;
`;
const RightAspect2 = styled.div`
  flex-grow:1;
  border-left:1px solid #EBEBEB;
  padding:30px 0 15px 45px;
  line-height:2;
`;
const EachCol = styled.div`
  text-align:center;
  line-height:3;
  border-right:1px solid #EBEBEB;
  word-break:break-all;
  position:relative;
`;
const TabLabel = styled.div`
  position:absolute;
  left:50%;
  top:50%;
  margin-top:-77px;
  margin-left:-101px;
  color:rgb(226,159,159);
  font-size:80px;
  transform: scale(1,2)
`;
const InvoiceFont = styled.p`
  font-size:16px;
  color: #FF7E7E;
  text-align:center;
  line-height:3;
`;
const ConSpan = styled.span`
  display: inline-block;
  max-width: 374px;
`;
const LeftBody = styled.div`
  width:60%;
  display:flex;
`;
const RightBody = styled.div`
  width:40%;
  display:flex;
`;
const LeftBody2 = styled.div`
  width:53%;
  display:flex;
`;
const RightBody2 = styled.div`
  width:47%;
  display:flex;
`;
const InvoiceTitSpan = styled.div`
  float:left; 
  width:100px;
  margin-top:12px;
  text-align:right;
`;
const ConSpan2 = styled.div`
  float:right;
  width:350px;
  margin-right:180px;
  margin-top:12px;
`;
const ConInput = styled(Input)`
  float:left;
  width:250px;
  margin:8px 20px 0 80px;
`;
const WarningDiv = styled.div`
  width:230px;
  height:28px;
  float:right;
  margin-top: 8px;
  color:rgb(255, 105, 105);
  line-height:28px;
`;
const ConInput2 = styled(Input)`
  float:right;
  width:190px;
  margin-right:100px;
  margin-top:12px;
`;
const ConRadio = styled(RadioGroup)`
  float:right;
  width:250px;
  margin-right:160px;
  margin-top:8px;
`;
const WaringFont = styled.div`
  color: #999999;
  margin:18px 0 0 8px;
`;
const EachColCon = styled.div`
  border-bottom:1px solid #EBEBEB;
`;
const EachInput = styled(Input)`
  margin:5px;
`;
const ActionCon = styled.div`
  line-height:3;
  color:#2397CA;
  cursor:pointer;
`;
const InvoiceFooter = styled.div`
  width:96%;
  margin:0 auto;
  overflow:hidden;
  font-size:12px;
`;
const FooterCon = styled.div`
  width:100%;
  display:flex;
  justify-content:space-between;
  padding:20px 0;
`;
const FooterInput = styled.div`
  overflow:hidden;
  width:25%;
`;
const BottomCon = styled.div`
  height:80px;
  width:100%;
  background:#F7FBFF;
  display:flex;
  justify-content:center;
`;
const BottomBtn = styled(Button)`
  width:110px;
  height:30px;
  margin-top:25px;
`;
const EachMessage = styled.div`
  padding:7px;
  position:absolute;
  line-height:1;
  color:#fff;
  background: rgb(255, 105, 105);
  z-index:200;
  top:-20px;
`;
const HeaderRight = styled.div`
  float:right;
  margin-right:20px;
  font-size:14px;
  line-height:20px;
  margin-top:15px;
`;
const HmSpan = styled.span`
  color: #2397ca;
`;
const HaveToSpan = styled.span`
  color:#f04134;
  font-weight:600;
  margin-right:5px;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:70px;
  color:#fff;
  display:inline-block;
  line-height:70px;
`;
const SwitchLog = styled.div`
  background:#fff;
  overflow:hidden;
  width: 96%;
  margin: 0 auto;
  margin-top:30px;
  border-bottom: 1px solid #CCCCCC;
`;
const GoodCon = styled.div`
  overflow:hidden;
  width: 96%;
  margin: 0 auto;
`;
const HeaderSearch = styled.div`
  height:62px;
  width:100%;
  padding:0 14px;
`;
const CodingCon = styled.div`
  height:310px;
  width:100%;
  border: 1px solid #CCCCCC;
  display:flex;
`;
const CodingTree = styled.div`
  width:225px;
  height:100%;
  border-right:1px solid #CCCCCC;
  overflow:auto;
  padding:5px 10px;
`;
const CodingRight = styled.div`
  height:100%;
  overflow:auto;
  flex:1;
`;
const CodingTitle = styled.div`
  height:38px;
  line-height:38px;
  border-bottom:1px solid #CCCCCC;
`;
const DetailCon = styled.div`
  margin:0 auto;
  width:100%;
  height:400px;
  overflow:auto;
`;
class DetailedModalMack extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      nohj:[{
        je:'',
        se:'',
        id:0,
      }],
      line:[{
        hwmc:'',
        ggxh:'',
        dw:'',
        sl:'',
        dj:'',
        je:'',
        se:'',
        slv:'0',
        id:0,
        zkse:'',
        zkje:'',
        shbm:'',
        checked:false,
        sale:'0',
      }],
      djtype:this.props.state.djtype,
      rateList:this.props.state.rateList
    };
    this.lineNum = this.props.lineNum;
    this.deleList = [];
  }
  componentWillMount(){
    const nohj = [...this.props.nohj];
    const line = [...this.props.line];
    this.setState({nohj,line})
  }
  addLine = () => {
    this.lineNum++;
    let line = this.state.line;
    let nohj = this.state.nohj;
    line.push({
      hwmc:'',
      ggxh:'',
      dw:'',
      sl:'',
      dj:'',
      je:'',
      se:'',
      slv:this.state.rateList[0],
      zkse:'',
      zkje:'',
      shbm:'',
      id:this.lineNum,
      checked:false,
      sale:'0',
    });
    nohj.push({
      je:'',
      se:'',
      id:this.lineNum,
    })
    this.setState({line,nohj})
  }
  addSaleLine = () => {
    let line = this.state.line;
    let checkArr = [];
    for(let i in line){
      if(line[i].checked === true){
        checkArr.push(line[i]);
      }
    }
    if(checkArr.length == 0){
      message.warning("请先选择需要打折的商品");return;
    }else if(checkArr.length > 1){
      message.warning("每次只能选择一个商品行");return;
    }else{
      const data = checkArr[0];
      if(data.dj == '' || data.hwmc == '' || data.je =='' || data.sl == ''){
        message.warning("请先完善商品信息");return;
      }else if(data.sale!=='0'){
        message.warning("该商品已打折");return;
      }else{
        let saleData;
        this.setState({saleModal:<SaleModal cancel={()=>this.setState({saleModal:''})}
                                            data={data}
                                            setJehj={this.setJehj}
                                            getSale={(val)=>{
                                              for(let i in this.state.line){
                                                if(this.state.line[i].id === data.id){
                                                  this.state.line[i].sale = val;
                                                  this.setState({})
                                                }
                                              }
                                            }}/>})
      }
    }
  }
  deleLine = () => {
    if(this.deleList.length > 0){
      let arr = this.state.line;
      if( arr.length === this.deleList.length ) {
        this.setState({
          line:[{
            hwmc:'',
            ggxh:'',
            dw:'',
            sl:'',
            dj:'',
            je:'',
            se:'',
            slv:this.state.rateList[0],
            id:0,
            zkse:'',
            zkje:'',
            shbm:'',
            checked:false,
            sale:'0',
          }],
          nohj:[{
            je:'',
            se:'',
            id:0,
          }]
        })
        this.props.form.setFieldsValue({
          '0sl':'',
          '0je':'',
          '0dj':'',
          '0hwmc':'',
        })
      }else{
        for(let i in this.deleList){
          if(this.deleList[i].sale!=='0'){
            this.deleList[i].sale = '0';
            this.setState({})
          }else{
            this.removeByValue(arr,this.deleList[i])
          }
        }
        this.setState({line:arr},()=>{
          this.deleList = [];
        })
      }
    }else{
      message.warning('请选择要删除的行');
    }
  }
  removeByValue = (arr, val) => {
    for(let i=0; i<arr.length; i++) {
      if(arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <Modal title={<TitleSpan>明细清单</TitleSpan>}
             style = {{top:100}}
             visible
             className='coding-modal'
             width={900}
             onCancel={()=>this.props.cancelModal()}
             maskClosable={false}
             footer={null}>
        <DetailCon>
          <div style={{overflow:'hidden',borderBottom:'1px solid #EBEBEB'}}>
            <div style={{margin:'0 auto',width:'60%',display:'flex',justifyContent:'space-around'}}>
              <ActionCon onClick={this.addLine}><Icon type="plus" />&nbsp;&nbsp;&nbsp;增加商品行</ActionCon>
              <ActionCon onClick={this.addSaleLine}><Icon type="plus" />&nbsp;&nbsp;&nbsp;增加折扣行</ActionCon>
              <ActionCon onClick={this.deleLine} style={{color:'#999999'}}><Icon type="delete" />&nbsp;&nbsp;&nbsp;删除行</ActionCon>
            </div>
          </div>
          <EachColCon style={{display:'flex'}}>
          <EachCol style={{width:'25%'}}><HaveToSpan> * </HaveToSpan>货物或应税劳务、服务名称</EachCol>
          <EachCol style={{width:'10%'}}>规格型号</EachCol>
          <EachCol style={{width:'5%'}}>单位</EachCol>
          <EachCol style={{width:'12%'}}><HaveToSpan> * </HaveToSpan>数量</EachCol>
          <EachCol style={{width:'15%'}}><HaveToSpan> * </HaveToSpan>单价&nbsp;&nbsp;
            <Select value={this.state.djtype} style={{width:'50%'}} onChange={(val)=>{
              this.setState({djtype:val},()=>{
                for(let index in this.state.line){
                  let rate;
                  if(this.state.line[index].slv === '1'){
                    rate = 0.03
                  }else if(this.state.line[index].slv === '5'){
                    rate = 0.04
                  }else if(this.state.line[index].slv === '6'){
                    rate = 0.05
                  }else if(this.state.line[index].slv === '7'){
                    rate = 0.06
                  }else if(this.state.line[index].slv === '8'){
                    rate = 0.1
                  }else if(this.state.line[index].slv === '9'){
                    rate = 0.11
                  }else if(this.state.line[index].slv === '0'){
                    rate = 0.16
                  }else if(this.state.line[index].slv === '$'){
                    rate = 0.17
                  }else{
                    rate = 0.00
                  }
                  if(this.state.line[index].se!=='' && this.state.line[index].dj!=='' && this.state.line[index].sl!==('' || 0)){
                    if(this.state.djtype === '1'){
                      let noje = Number(Number(this.state.line[index].je) + Number(this.state.line[index].se)).toFixed(3);
                      this.state.nohj[index].je = noje.substring(0,noje.toString().length - 1);
                      this.state.line[index].je = Number(Number(this.state.line[index].je) + Number(this.state.line[index].se)).toFixed(2);
                      this.state.line[index].dj = num_format(Number(this.state.line[index].dj * (1+rate)));
                      this.props.form.setFieldsValue({
                        [`${this.state.line[index].id+'dj'}`]:this.state.line[index].dj+'',
                        [`${this.state.line[index].id+'je'}`]:this.state.line[index].je+'',
                      })
                      if(this.state.line[index].sale !== '0'){
                        this.state.line[index].sale.zkje = (-(-Number(this.state.line[index].sale.zkje) - Number(this.state.line[index].sale.zkse))).toFixed(2)
                      }
                    }else{
                      this.state.line[index].dj = num_format(Number(this.state.line[index].je/(1+Number(rate)) / this.state.line[index].sl));
                      let noje = Number(this.state.line[index].je - this.state.line[index].se).toFixed(3);
                      this.state.nohj[index].je = noje.substring(0,noje.toString().length - 1);
                      this.state.line[index].je = Number(this.state.line[index].je - this.state.line[index].se).toFixed(2);
                      this.props.form.setFieldsValue({
                        [`${this.state.line[index].id+'dj'}`]:this.state.line[index].dj+'',
                        [`${this.state.line[index].id+'je'}`]:this.state.line[index].je+'',
                      })
                      if(this.state.line[index].sale !== '0'){
                        this.state.line[index].sale.zkje = (-(-Number(this.state.line[index].sale.zkje) + Number(this.state.line[index].sale.zkse))).toFixed(2);
                      }
                    }
                  }
                  this.setState({})
                }
              })
            }}>
              <Option key='1'>含税</Option>
              <Option key='2'>不含税</Option>
            </Select>
          </EachCol>
          <EachCol style={{width:'12%'}}><HaveToSpan> * </HaveToSpan>金额{this.state.djtype === '1'?'(含税)':'(不含税)'}</EachCol>
          <EachCol style={{width:'10%'}}><HaveToSpan> * </HaveToSpan>税率</EachCol>
          <EachCol style={{borderRight:'0',flexGrow:1}}><HaveToSpan> * </HaveToSpan>税额</EachCol>
        </EachColCon>
        <div style={{borderBottom:'1px solid #EBEBEB'}}>
          {
            this.state.line.map((item,index)=>{
              return <div key={index}>
                      <div style={{display:'flex'}}>
                        <EachCol style={{width:'25%',padding:5}}>
                          <Checkbox style={{float:'left',width:'10%'}} 
                                    checked={this.state.line[index].checked}
                                    onChange={(e)=>{
                                      this.state.line[index].checked = e.target.checked;
                                      this.setState({});
                                      if(e.target.checked === true){
                                        this.deleList.push(item)
                                      }else{
                                        this.removeByValue(this.deleList,item)
                                      }
                                    }}/>
                          <FormItem>
                          {getFieldDecorator(`${item.id+'hwmc'}`,{
                            initialValue:this.state.line[index].hwmc,
                            rules: [{
                              required: true, message: '请选择商品',
                            }]
                          })(
                            <Search style={{width:'80%'}}
                                    placeholder='请选择商品'
                                    disabled={item.sale!=='0'}
                                    onChange={(e)=>{
                                      e.target.value = ''
                                      this.props.form.setFieldsValue({
                                        [`${item.id+'hwmc'}`]:' '
                                      })
                                    }}
                                    onSearch={()=>{
                                      this.setState({codingModal:<CodingModal cancel={()=>this.setState({codingModal:''})}
                                                                              getCodingList={this.props.getCodingList}
                                                                              goodsList={this.props.goodsList}
                                                                              loading={this.props.loading}
                                                                              getData={this.props.getData}
                                                                              allGood={true}
                                                                              getCoding={(record)=>{
                                                                                if(record.rate){
                                                                                  let rate;
                                                                                  if(record.rate === '17%'){
                                                                                    rate = '$'
                                                                                  }else if(record.rate === '3%'){
                                                                                    rate = '1'
                                                                                  }else if(record.rate === '0%'){
                                                                                    rate = '2'
                                                                                  }else if(record.rate === '免税'){
                                                                                    rate = '3'
                                                                                  }else if(record.rate === '不征税'){
                                                                                    rate = '4'
                                                                                  }else if(record.rate === '4%'){
                                                                                    rate = '5'
                                                                                  }else if(record.rate === '5%'){
                                                                                    rate = '6'
                                                                                  }else if(record.rate === '6%'){
                                                                                    rate = '7'
                                                                                  }else if(record.rate === '10%'){
                                                                                    rate = '8'
                                                                                  }else if(record.rate === '11%'){
                                                                                    rate = '9'
                                                                                  }else if(record.rate === '16%'){
                                                                                    rate = '0'
                                                                                  }
                                                                                  this.state.line[index].shbm = record.code;
                                                                                  this.props.form.setFieldsValue({
                                                                                    [`${item.id+'slv'}`]:rate,
                                                                                    [`${item.id+'dj'}`]:record.price,
                                                                                    [`${item.id+'hwmc'}`]:'*'+record.goods_serv_tittle+'*'+record.name
                                                                                  })
                                                                                  this.state.line[index].hwmc = '*'+record.goods_serv_tittle+'*'+record.name;
                                                                                  this.state.line[index].slv = rate;
                                                                                  this.state.line[index].ggxh = record.spec;
                                                                                  this.state.line[index].dw = record.unit;
                                                                                  this.state.line[index].dj = record.price;
                                                                                }else{
                                                                                  this.props.form.setFieldsValue({
                                                                                    [`${item.id+'hwmc'}`]:'*'+record.goods_serv_tittle+'*'+record.goods_labour_map
                                                                                  })
                                                                                  this.state.line[index].hwmc = '*'+record.goods_serv_tittle+'*'+record.goods_labour_map;
                                                                                }
                                                                                if(this.props.settingList[0].tax_control_type === 1){
                                                                                  this.state.line[index].shbm = record.merge_code;
                                                                                }else{
                                                                                  this.state.line[index].shbm = record.code;
                                                                                }
                                                                                this.setState({})
                                                                              }}/>})
                                    }}
                                    />)}
                          </FormItem>
                          </EachCol>
                        <EachCol style={{width:'10%',padding:5}}>
                          <FormItem>
                            <Input value={this.state.line[index].ggxh}
                                   disabled={item.sale!=='0'}
                                   onChange={(e)=>{
                                    this.state.line[index].ggxh = e.target.value;
                                    this.setState({})
                                   }}/>
                          </FormItem>
                        </EachCol>
                        <EachCol style={{width:'5%',padding:5}}>
                          <FormItem>
                            <Input value={this.state.line[index].dw}
                                   disabled={item.sale!=='0'}
                                   onChange={(e)=>{
                                      this.state.line[index].dw = e.target.value;
                                      this.setState({})
                                    }}/>
                          </FormItem>
                        </EachCol>
                        <EachCol style={{width:'12%',padding:5}}>
                        <FormItem>
                          {getFieldDecorator(`${item.id+'sl'}`,{
                            initialValue:this.state.line[index].sl,
                            rules: [{
                              required: true, message: '数量不能为空',
                            },{
                              pattern: /^(\d*)\.?\d{1,9}$/, message: '只能是数字(9位小数）'
                            }]
                          })(
                          <Input disabled={item.sale!=='0'} onChange={(e)=>{
                                    if(e.target.value!=='' && (/^(\d*)\.?\d{1,9}$/).test(e.target.value)){
                                      let rate;
                                      if(this.state.line[index].slv === '1'){
                                        rate = 0.03
                                      }else if(this.state.line[index].slv === '5'){
                                        rate = 0.04
                                      }else if(this.state.line[index].slv === '6'){
                                        rate = 0.05
                                      }else if(this.state.line[index].slv === '7'){
                                        rate = 0.06
                                      }else if(this.state.line[index].slv === '8'){
                                        rate = 0.1
                                      }else if(this.state.line[index].slv === '9'){
                                        rate = 0.11
                                      }else if(this.state.line[index].slv === '0'){
                                        rate = 0.16
                                      }else if(this.state.line[index].slv === '$'){
                                        rate = 0.17
                                      }
                                      this.state.line[index].sl = e.target.value;
                                      if(this.state.line[index].dj!==''){
                                        this.props.form.setFieldsValue({
                                          [`${item.id+'sl'}`]:e.target.value,
                                          [`${item.id+'je'}`]:Number(this.state.line[index].dj*this.state.line[index].sl).toFixed(2)
                                        })
                                        let noje = Number(this.state.line[index].dj*this.state.line[index].sl).toFixed(3);
                                        this.state.nohj[index].je = noje.substring(0,noje.toString().length - 1);
                                        this.state.line[index].je = Number(this.state.line[index].dj*this.state.line[index].sl).toFixed(2)
                                        if(this.state.line[index].slv == '2' || this.state.line[index].slv == '3' || this.state.line[index].slv == '4'){
                                          this.state.line[index].se = '0.00'
                                        }else{
                                          if(this.state.djtype === '1'){
                                            let nose = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(3);
                                            this.state.nohj[index].se = nose.substring(0,nose.toString().length - 1);
                                            this.state.line[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(2); 
                                          }else{
                                            let nose = Number(this.state.line[index].je*rate).toFixed(3);
                                            this.state.nohj[index].se = nose.substring(0,nose.toString().length - 1);
                                            this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2)
                                          }
                                        }
                                      }else if(this.state.line[index].je!==''){
                                        this.props.form.setFieldsValue({
                                          [`${item.id+'sl'}`]:e.target.value,
                                          [`${item.id+'dj'}`]:num_format(Number(this.state.line[index].je/this.state.line[index].sl))
                                        })
                                        this.state.line[index].dj = num_format(Number(this.state.line[index].je/this.state.line[index].sl))
                                        if(this.state.line[index].slv == '2' || this.state.line[index].slv == '3' || this.state.line[index].slv == '4'){
                                          this.state.line[index].se = '0.00'
                                        }else{
                                          if(this.state.djtype === '1'){
                                            let nose = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(3);
                                            this.state.nohj[index].se = nose.substring(0,nose.toString().length - 1);
                                            this.state.line[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(2); 
                                          }else{
                                            let nose = Number(this.state.line[index].je*rate).toFixed(3);
                                            this.state.nohj[index].se = nose.substring(0,nose.toString().length - 1);
                                            this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2)
                                          }
                                        }
                                      }
                                      this.setState({})
                                    }
                                }}/>)}
                            </FormItem>
                        </EachCol>
                        <EachCol style={{width:'15%',padding:5}}>
                        <FormItem>
                          {getFieldDecorator(`${item.id+'dj'}`,{
                            initialValue:this.state.line[index].dj,
                            rules: [{
                              required: true, message: '单价不能为空',
                            }, {
                              pattern: /^(\d*)\.?\d{1,9}$/, message: '只能是数字(9位小数）'
                            }]
                          })(
                          <Input disabled={item.sale!=='0'} onChange={(e)=>{
                                  if(e.target.value!=='' && (/^(\d*)\.?\d{1,9}$/).test(e.target.value)){
                                    let rate;
                                    if(this.state.line[index].slv === '1'){
                                      rate = 0.03
                                    }else if(this.state.line[index].slv === '5'){
                                      rate = 0.04
                                    }else if(this.state.line[index].slv === '6'){
                                      rate = 0.05
                                    }else if(this.state.line[index].slv === '7'){
                                      rate = 0.06
                                    }else if(this.state.line[index].slv === '8'){
                                      rate = 0.1
                                    }else if(this.state.line[index].slv === '9'){
                                      rate = 0.11
                                    }else if(this.state.line[index].slv === '0'){
                                      rate = 0.16
                                    }else if(this.state.line[index].slv === '$'){
                                      rate = 0.17
                                    }
                                    this.state.line[index].dj = e.target.value;
                                    if(this.state.line[index].sl!==''){
                                      this.props.form.setFieldsValue({
                                        [`${item.id+'dj'}`]:e.target.value,
                                        [`${item.id+'je'}`]:Number(this.state.line[index].dj*this.state.line[index].sl).toFixed(2)
                                      })
                                      let noje = Number(this.state.line[index].dj*this.state.line[index].sl).toFixed(3);
                                      this.state.nohj[index].je = noje.substring(0,noje.toString().length - 1);
                                      this.state.line[index].je = Number(this.state.line[index].dj*this.state.line[index].sl).toFixed(2)
                                      if(this.state.line[index].slv == '2' || this.state.line[index].slv == '3' || this.state.line[index].slv == '4'){
                                        this.state.line[index].se = '0.00'
                                      }else{
                                          if(this.state.djtype === '1'){
                                            let nose = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(3);
                                            this.state.nohj[index].se = nose.substring(0,nose.toString().length - 1);
                                            this.state.line[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(2); 
                                          }else{
                                            let nose = Number(this.state.line[index].je*rate).toFixed(3);
                                            this.state.nohj[index].se = nose.substring(0,nose.toString().length - 1);
                                            this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2)
                                          }
                                      }
                                    }else if(this.state.line[index].je!==''){
                                      this.props.form.setFieldsValue({
                                        [`${item.id+'dj'}`]:e.target.value,
                                        [`${item.id+'sl'}`]:num_format(Number(this.state.line[index].je/this.state.line[index].dj))
                                      })
                                      this.state.line[index].sl = num_format(Number(this.state.line[index].je/this.state.line[index].dj))
                                      if(this.state.line[index].slv == '2' || this.state.line[index].slv == '3' || this.state.line[index].slv == '4'){
                                        this.state.line[index].se = '0.00'
                                      }else{
                                          if(this.state.djtype === '1'){
                                            let nose = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(3);
                                            this.state.nohj[index].se = nose.substring(0,nose.toString().length - 1);
                                            this.state.line[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(2); 
                                          }else{
                                            let nose = Number(this.state.line[index].je*rate).toFixed(3);
                                            this.state.nohj[index].se = nose.substring(0,nose.toString().length - 1);
                                            this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2)
                                          }
                                      }
                                    }
                                  }
                                  this.setState({})
                                }}/>)}
                          </FormItem>
                        </EachCol>
                        <EachCol style={{width:'12%',padding:5}}>
                        <FormItem>
                          {getFieldDecorator(`${item.id+'je'}`,{
                            initialValue:this.state.line[index].je,
                            rules: [{
                              required: true, message: '金额不能为空',
                            }, {
                              pattern: /^(\d*)\.?\d{1,9}$/, message: '只能是数字(9位小数）'
                            }]
                          })(
                          <Input disabled={item.sale!=='0'} onChange={(e)=>{
                                    if(e.target.value!=='' && (/^(\d*)\.?\d{1,9}$/).test(e.target.value)){
                                      let rate;
                                      if(this.state.line[index].slv === '1'){
                                        rate = 0.03
                                      }else if(this.state.line[index].slv === '5'){
                                        rate = 0.04
                                      }else if(this.state.line[index].slv === '6'){
                                        rate = 0.05
                                      }else if(this.state.line[index].slv === '7'){
                                        rate = 0.06
                                      }else if(this.state.line[index].slv === '8'){
                                        rate = 0.1
                                      }else if(this.state.line[index].slv === '9'){
                                        rate = 0.11
                                      }else if(this.state.line[index].slv === '0'){
                                        rate = 0.16
                                      }else if(this.state.line[index].slv === '$'){
                                        rate = 0.17
                                      }
                                      this.state.line[index].je = e.target.value;
                                      if(this.state.line[index].sl!==''){
                                        this.props.form.setFieldsValue({
                                          [`${item.id+'je'}`]:e.target.value,
                                          [`${item.id+'dj'}`]:num_format(Number(this.state.line[index].je/this.state.line[index].sl))
                                        })
                                        this.state.line[index].dj = num_format(Number(this.state.line[index].je/this.state.line[index].sl))
                                        if(this.state.line[index].slv == '2' || this.state.line[index].slv == '3' || this.state.line[index].slv == '4'){
                                          this.state.line[index].se = '0.00'
                                        }else{
                                          if(this.state.djtype === '1'){
                                            let nose = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(3);
                                            this.state.nohj[index].se = nose.substring(0,nose.toString().length - 1);
                                            this.state.line[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(2); 
                                          }else{
                                            let nose = Number(this.state.line[index].je*rate).toFixed(3);
                                            this.state.nohj[index].se = nose.substring(0,nose.toString().length - 1);
                                            this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2)
                                          }
                                          
                                        }
                                      }else if(this.state.line[index].dj!==''){
                                        this.props.form.setFieldsValue({
                                          [`${item.id+'je'}`]:e.target.value,
                                          [`${item.id+'sl'}`]:num_format(Number(this.state.line[index].je/this.state.line[index].dj))
                                        })
                                        this.state.line[index].sl = num_format(Number(this.state.line[index].je/this.state.line[index].dj))
                                        if(this.state.line[index].slv == '2' || this.state.line[index].slv == '3' || this.state.line[index].slv == '4'){
                                          this.state.line[index].se = '0.00'
                                        }else{
                                          if(this.state.djtype === '1'){
                                            let nose = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(3);
                                            this.state.nohj[index].se = nose.substring(0,nose.toString().length - 1);
                                            this.state.line[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(2); 
                                          }else{
                                            let nose = Number(this.state.line[index].je*rate).toFixed(3);
                                            this.state.nohj[index].se = nose.substring(0,nose.toString().length - 1);
                                            this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2)
                                          }
                                          
                                        }
                                      }
                                    }
                                    this.setState({})
                                }}/>)}
                            </FormItem>
                        </EachCol>
                        <EachCol style={{width:'10%',padding:5}}>
                        {
                          this.state.rateList.length>0 &&
                          <FormItem>
                          {getFieldDecorator(`${item.id+'slv'}`,{
                            initialValue:this.state.line[index].slv,
                          })(
                              <Select style={{width:'100%'}}
                                     disabled={item.sale!=='0'}
                                    onChange={(value)=>{
                                      this.props.form.setFieldsValue({
                                        [`${item.id+'slv'}`]:value
                                      })
                                      this.state.line[index].slv = value;
                                      if(value == '2' || value == '3' || value == '4'){
                                        this.state.line[index].se = '0.00'
                                      }else{
                                        let rate;
                                        if(value === '1'){
                                          rate = 0.03
                                        }else if(value === '5'){
                                          rate = 0.04
                                        }else if(value === '6'){
                                          rate = 0.05
                                        }else if(value === '7'){
                                          rate = 0.06
                                        }else if(value === '8'){
                                          rate = 0.1
                                        }else if(value === '9'){
                                          rate = 0.11
                                        }else if(value === '0'){
                                          rate = 0.16
                                        }else if(value === '$'){
                                          rate = 0.17
                                        }
                                        if(this.state.djtype === '1'){
                                          let nose = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(3);
                                          this.state.nohj[index].se = nose.substring(0,nose.toString().length - 1);
                                          this.state.line[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(2); 
                                        }else{
                                          let nose = Number(this.state.line[index].je*rate).toFixed(3);
                                          this.state.nohj[index].se = nose.substring(0,nose.toString().length - 1);
                                          this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2)
                                        }
                                      }
                                      this.setState({})
                                    }}>
                              { this.state.rateList.find((el)=>el === '1') && <Option value='1'>3%</Option> }
                              { this.state.rateList.find((el)=>el === '2') && <Option value='2'>0%</Option> }
                              { this.state.rateList.find((el)=>el === '3') && <Option value='3'>免税</Option> }
                              { this.state.rateList.find((el)=>el === '4') && <Option value='4'>不征税</Option> }
                              { this.state.rateList.find((el)=>el === '5') && <Option value='5'>4%</Option> }
                              { this.state.rateList.find((el)=>el === '6') && <Option value='6'>5%</Option> }
                              { this.state.rateList.find((el)=>el === '7') && <Option value='7'>6%</Option> }
                              { this.state.rateList.find((el)=>el === '8') && <Option value='8'>10%</Option> }
                              { this.state.rateList.find((el)=>el === '9') && <Option value='9'>11%</Option> }
                              { this.state.rateList.find((el)=>el === '0') && <Option value='0'>16%</Option> }
                              { this.state.rateList.find((el)=>el === '$') && <Option value='$'>17%</Option> }
                            </Select>)}
                          </FormItem>
                                  }
                        </EachCol>
                        <EachCol style={{width:'11%',padding:5}}>
                          <FormItem>
                            <Input disabled value={this.state.line[index].se}/>
                          </FormItem>
                        </EachCol>
                      </div>
                      {
                        item.sale !== '0' &&
                        <div style={{display:'flex'}}>
                          <EachCol style={{width:'25%',padding:5,textAlign:'center'}}>
                            <Checkbox style={{float:'left',width:'10%'}} 
                                      checked={this.state.line[index].sale.checked}
                                      onChange={(e)=>{
                                        this.state.line[index].sale.checked = e.target.checked;
                                        this.setState({});
                                        if(e.target.checked === true){
                                          this.deleList.push(item)
                                        }else{
                                          this.removeByValue(this.deleList,item)
                                        }
                                      }}/>
                            <ConSpan style={{float:'left',width:'80%',textAlign:'center'}}>{item.hwmc}</ConSpan>
                          </EachCol>
                          <EachCol style={{width:'10%',padding:5,textAlign:'center'}}><ConSpan></ConSpan></EachCol>
                          <EachCol style={{width:'5%',padding:5,textAlign:'center'}}><ConSpan></ConSpan></EachCol>
                          <EachCol style={{width:'12%',padding:5,textAlign:'center'}}><ConSpan></ConSpan></EachCol>
                          <EachCol style={{width:'15%',padding:5,textAlign:'center'}}><ConSpan></ConSpan></EachCol>
                          <EachCol style={{width:'12%',padding:5,textAlign:'center'}}><ConSpan>{item.sale.zkje}</ConSpan></EachCol>
                          <EachCol style={{width:'10%',padding:5,textAlign:'center'}}><ConSpan>{item.sale.yspsl}</ConSpan></EachCol>
                          <EachCol style={{flexGrow:1,padding:5,textAlign:'center'}}><ConSpan>{item.sale.zkse}</ConSpan></EachCol>
                        </div>
                      }
                    </div>
            })
          }
        </div>
        </DetailCon>
        <div style={{display:'flex',justifyContent:'center',width:'100%',padding:'30px 0'}}>
            <Button style={{marginRight:50,float:'left'}} onClick={()=>{
              this.props.cancelModal()
            }}>取消</Button>
            <Button type='primary' onClick={()=>{
              this.props.form.validateFields((err, values) => {
                if(!err){
                  this.props.setStateFnc(this.state)
                }
              })
            }}>确定</Button>
        </div>
        {this.state.codingModal}
        {this.state.saleModal}
      </Modal>
    )
  }
}

const DetailedModal = Form.create()(DetailedModalMack);
export default DetailedModal;