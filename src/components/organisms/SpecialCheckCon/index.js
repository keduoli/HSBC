import React from 'react'
import styled from 'styled-components'
import { Input,Select,Radio,Icon,Checkbox,message,Button,Form,Modal,DatePicker } from 'antd'
import { num_format,DX } from './../../util'
import { Link } from 'react-router'
const Search = Input.Search;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const InvoiceCon = styled.div`
  width:100%;
  margin:0 auto;
  overflow:hidden;
  background:#fff;
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
const InvoiceHeader = styled.div`
  width:96%;
  margin:0 auto;
  overflow:hidden;
  height:110px;
  position:relative;
  display:flex;
  justify-content:space-around;
`;
const HeaderLeft = styled.div`
  float:left;
  font-size:12px;
  margin-top:40px;
  overflow:hidden;
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
const BottomCon = styled.div`
  height:80px;
  width:50%;
  background:#F7FBFF;
  margin-left:25%;
  display:flex;
  justify-content:space-around;
`;
const BottomBtn = styled(Button)`
  width:110px;
  height:30px;
  margin-top:25px;
`;
const HaveToSpan = styled.span`
  color:#f04134;
  font-weight:600;
  margin-right:5px;
`;
const LableCon = styled.div`
  float:left;
  line-height:29px;
`;
const FormItem = Form.Item;
class SpecialCheckConMack extends React.Component{
  constructor(props){
    super(props);
    this.state={
      line:[{
        hwmc:'',
        ggxh:'',
        dw:'',
        sl:'',
        dj:'',
        je:'',
        se:'',
        slv:'1',
        id:0,
        checked:false,
      }],
      companyList:'',
      open:false,
      previewMoal:'',
      rateList:[],
      gfmcid:'',
      invoice_id:'',
      fjhList:[],
      options:[],
      showSuccess:'',
      saleModal:'',
      email:'',
      tel:'',
      gfmcFont:'',
      sbhFont:'',
      headertype:'company',
      djtype:"2",
      jehj:(0).toFixed(2),
      sehj:(0).toFixed(2),
      jshj:(0).toFixed(2),
      showInvoice:true,
      bz:'',
      skr:'',
      fhr:'',
      tel:'',
      gfdz:'',
      gfdh:'',
      gfyh:'',
      gfzh:'',
      gfsbh:'',
      gfmc:'',
      codingModal:'',
      invoiceType:'04',
      rateType:[],
      companyList:[],
      importModal:'',
      seeDetailed:'',
    }
    this.deleList = [];
    this.lineNum = 0;
    this.jehj = 0.00;
    this.sehj = 0.00;
    this.nojehj = 0.00;
    this.nosehj = 0.00;
  }
  addLine = () => {
    if(this.state.line.length === 8){
      message.warning("商品行数已达到最大数量，无法继续添加");return;
    }
    this.lineNum++;
    let line = this.state.line;
    line.push({
      hwmc:'',
      ggxh:'',
      dw:'',
      sl:'',
      dj:'',
      je:'',
      se:'',
      slv:'1',
      shbm:'',
      id:this.lineNum,
      checked:false,
      sale:'0',
    });
    this.setState({line})
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
            slv:'1',
            id:0,
            checked:false,
            sale:'0',
          }],
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
  componentWillMount(){

  }
  setJehj = () => {
    let jehj = this.jehj;
    for(let i in this.state.line){
      jehj+=Number(this.state.line[i].je)
    }
    this.setState({jehj:Number(jehj).toFixed(2)})

    
    let sehj = this.sehj;
    for(let i in this.state.line){
      sehj+=Number(this.state.line[i].se)
    }
    this.setState({sehj:Number(sehj).toFixed(2)})

    let nosehj = this.nosehj;
    this.setState({jshj:(jehj+sehj).toFixed(2)})
    if(nosehj-sehj > 0.06){
      this.setState({open:true})
    }else{
      this.setState({open:false})
    }
  }
  handleSubmit = (action) => {
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.setJehj()
        let line = this.state.line;
        let invoice_details = [];
        for(let i in line){
          let rate;
          if(line[i].slv === '1'){
            rate = '3'
          }else if(line[i].slv === '5'){
            rate = '4'
          }else if(line[i].slv === '6'){
            rate = '5'
          }else if(line[i].slv === '7'){
            rate = '6'
          }else if(line[i].slv === '8'){
            rate = '10'
          }else if(line[i].slv === '9'){
            rate = '11'
          }else if(line[i].slv === '0'){
            rate = '16'
          }else if(line[i].slv === '$'){
            rate = '17'
          }else if(line[i].slv === '2'){
            rate = '0'
          }else if(line[i].slv === '3'){
            rate = '1'
          }else if(line[i].slv === '4'){
            rate = '2'
          }
          const rangeValue = values['time'];
          if(rangeValue){
            values['kprq'] = rangeValue.format('YYYY-MM-DD');
          }else{
            values['kprq'] = '';
          }
          invoice_details.push({
            hwmc: line[i].hwmc,
            ggxh: line[i].ggxh,
            dw: line[i].dw,
            sl: line[i].sl+'',
            dj: line[i].dj+'',
            je: line[i].je+'',
            slv: rate,
            se: line[i].se,
          })
        }
        const param = {
          fpzl: values['fpzl'],
          cus_id: values['cus_id'],
          jym: values['jym'],
          fphm: values['fphm'],
          fpdm: values['fpdm'],
          kprq: values['kprq'],
          gfmc: values['gfmc'],
          gfsbh: values['gfsbh'],
          gfdz: values['gfdz'],
          gfdh: values['gfdh'],
          gfyh: values['gfyh'],
          gfzh: values['gfzh'],
          xfmc: values['xfmc'],
          xfsbh: values['xfsbh'],
          xfdz: values['xfdz'],
          xfdh: values['xfdh'],
          xfyh: values['xfyh'],
          xfzh: values['xfzh'],
          jshj: this.state.jshj,
          je: this.state.jehj,
          se: this.state.sehj,
          memo: this.state.bz,
          invoice_details:JSON.stringify(invoice_details)
        }
        this.props.checkSpecial(param,()=>{
          this.clearInvoice()
        })
      }
    })
  }
  clearInvoice = () => {
    this.setState({showInvoice:false},()=>{
      this.setState({
        line:[{
          hwmc:'',
          ggxh:'',
          dw:'',
          sl:'',
          dj:'',
          je:'',
          se:'',
          slv:'1',
          id:0,
          checked:false,
          sale:'0',
        }],
        saleModal:'',
        invoice_id:'',
        gfmcFont:'',
        sbhFont:'',
        email:'',
        tel:'',
        headertype:'company',
        showSuccess:'',
        djtype:"2",
        jehj:(0).toFixed(2),
        sehj:(0).toFixed(2),
        jshj:(0).toFixed(2),
        showInvoice:true,
        bz:'',
        open:false,
        skr:'',
        fhr:'',
        tel:'',
        gfdz:'',
        gfdh:'',
        options:[],
        gfyh:'',
        gfzh:'',
        gfsbh:'',
        gfmc:'',
        codingModal:'',
        previewMoal:'',
        djtype:"2",
        importModal:'',
        seeDetailed:'',
      })
      this.deleList = [];
      this.lineNum = 0;
      this.jehj = 0.00;
      this.sehj = 0.00;
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { customerList } = this.props;
    return(
      <div>
      {
        this.state.showInvoice === true && 
        <InvoiceCon onClick={this.setJehj} className='ele-invoice'>
        <InvoiceHeader>
          <HeaderLeft>
            <LableCon><HaveToSpan> * </HaveToSpan>发票类型：</LableCon>
            <FormItem style={{float:'right'}}>
              {getFieldDecorator('fpzl',{
                rules: [{
                  required: true, message: '发票种类不能为空',
                }]
              })(
              <Select style={{width:150}}
                      placeholder='请选择发票类型'>
                <Option key='98'>增值税普通发票</Option>
                <Option key='99'>增值税专用发票</Option>
              </Select>
              )}
            </FormItem>
          </HeaderLeft>
          {
            this.props.navList && this.props.navList.role.indexOf('drawdown') > -1 &&
            <HeaderLeft>
              <LableCon>关联客户：</LableCon>
              <FormItem style={{float:'right'}}>
              {getFieldDecorator('cus_id',{
              })(
                <Select style={{width:150}} 
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        placeholder='请选择关联客户'>
                  {
                    customerList.list.map((item)=>{
                      return <Option key={item.id}>{item.cus_name}</Option>
                    })
                  }
                </Select>
              )}
              </FormItem>
            </HeaderLeft>
          }
          <HeaderLeft>
            <LableCon>发票校验码：</LableCon>
            <FormItem style={{float:'right'}}>
              {getFieldDecorator('jym')(
                <Input style={{width:150}}
                       placeholder='请输入校验码'/>
              )}
              </FormItem>
          </HeaderLeft>
          <HeaderLeft>
            <LableCon><HaveToSpan> * </HaveToSpan>发票号码：</LableCon>
            <FormItem style={{float:'right'}}>
              {getFieldDecorator('fphm',{
                rules: [{
                  required: true, message: '发票号码不能为空',whitespace:true,
                }, {
                  pattern: /^[0-9]{8}$/, message: '发票号码只能是8位的数字',
                }],
              })(
              <Input style={{width:150}}
                     placeholder='请输入发票号码'/>
              )}
            </FormItem>
          </HeaderLeft>
          <HeaderLeft>
            <LableCon><HaveToSpan> * </HaveToSpan>发票代码：</LableCon>
            <FormItem style={{float:'right'}}>
              {getFieldDecorator('fpdm',{
                rules: [{
                  validator: (rule, value, callback)=>{
                    const reg = /^[0-9]*$/;
                    if(!value){
                      callback('发票代码不能为空');
                    }
                    if(!reg.test(value)){
                      callback('发票代码只能是数字');
                    }else{
                      if((value+'').length>12){
                        callback('发票代码不能超过12位');
                      }
                    }
                    callback();
                  },
                }],
              })(
              <Input style={{width:150}}
                     placeholder='请输入发票代码'/>
              )}
          </FormItem>
          </HeaderLeft>
        </InvoiceHeader>
        <InvoiceSection>
          <div style={{overflow:'hidden',display:'flex',borderBottom:'1px solid #EBEBEB'}}>
            <LeftBody2>
              <LeftAspect>
                <div style={{height:1}}></div><br />购<div style={{height:1}}></div><br />买<div style={{height:1}}></div><br />方
              </LeftAspect>
              <RightAspect>
                <div style={{overflow:'hidden'}}>
                  <InvoiceTitSpan><HaveToSpan> * </HaveToSpan>开票日期：</InvoiceTitSpan>
                  <FormItem>
                    {getFieldDecorator('time',{
                      rules: [{
                        required: true, message: '开票日期不能为空',
                      }]
                    })(
                      <DatePicker
                        size='large'
                        style={{float:'left',width:250,margin:'8px 20px 0 80px'}}
                      />
                    )}
                    </FormItem>
                </div>
                <div style={{overflow:'hidden'}}>
                  <InvoiceTitSpan><HaveToSpan> * </HaveToSpan>名称：</InvoiceTitSpan>
                  <FormItem>
                    {getFieldDecorator('gfmc',{
                      rules: [{
                        required: true, message: '名称不能为空',
                      },{
                        pattern: /[^<>\"\'&%\\/]{2,100}/, message: '名称不合法'
                      }]
                    })(
                      <Input placeholder="请输入名称" style={{float:'left',width:250,margin:'8px 20px 0 80px'}}/>
                    )}
                    </FormItem>
                </div>
                <div style={{overflow:'hidden'}}>
                  <InvoiceTitSpan>纳税人识别号：</InvoiceTitSpan>
                  <FormItem>
                    {getFieldDecorator('gfsbh',{
                      rules:[{
                        pattern: /^[A-Z0-9]{15,20}$/, message: '纳税人识别号不合法'
                      }]
                    })(
                      <ConInput placeholder='请输入纳税人识别号' onChange={(e)=>this.setState({gfsbh:e.target.value})}/>
                    )}
                  </FormItem>
                </div>
                <div style={{overflow:'hidden'}}>
                  <InvoiceTitSpan style={{float:'left'}}>地址：</InvoiceTitSpan>
                  <FormItem>
                    {getFieldDecorator('gfdz',{
                      rules:[{
                        pattern: /[^\<\>\"\'&%\\/]{1,50}/, message: '地址不合法'
                      }]
                    })(
                    <ConInput placeholder='请输入地址' onChange={(e)=>this.setState({gfdz:e.target.value})}/>
                    )}
                  </FormItem>
                </div>
              </RightAspect>
            </LeftBody2>
            <RightBody2>
              <RightAspect style={{border:'none'}}>
                <div style={{overflow:'hidden',height:34}}>
                </div>
                <div style={{overflow:'hidden'}}>
                  <InvoiceTitSpan style={{float:'left'}}>电话：</InvoiceTitSpan>
                  <FormItem>
                    {getFieldDecorator('gfdh',{
                      rules:[{
                        pattern: /^[0-9\- ]{1,50}$/, message: '电话不合法'
                      }]
                    })(
                      <ConInput placeholder='请输入电话' onChange={(e)=>this.setState({gfdh:e.target.value})}/>
                    )}
                  </FormItem>
                </div>
                <div style={{overflow:'hidden'}}>
                  <InvoiceTitSpan>开户行：</InvoiceTitSpan>
                  <FormItem>
                    {getFieldDecorator('gfyh',{
                      rules:[{
                        validator: (rule, value, callback)=>{
                          if(value && value!==''){
                            if(value.length<4 || value.length>35){
                              callback("开户行不合法");return
                            }
                          }
                          callback()
                        }
                      }]
                    })(
                      <ConInput placeholder='请输入开户行' onChange={(e)=>this.setState({gfyh:e.target.value})}/>
                    )}
                  </FormItem>
                </div>
                <div style={{overflow:'hidden'}}>
                  <InvoiceTitSpan>账户：</InvoiceTitSpan>
                  <FormItem>
                    {getFieldDecorator('gfzh',{
                      rules:[{
                        validator: (rule, value, callback)=>{
                          if(value && value!==''){
                            if(value.length<8 || value.length>30){
                              callback("账户不合法");return
                            }
                          }
                          callback()
                        }
                      }]
                    })(
                      <ConInput placeholder='请输入账户' onChange={(e)=>this.setState({gfzh:e.target.value})}/>
                    )}
                  </FormItem>
                </div>
              </RightAspect>
            </RightBody2>
          </div>
          <div style={{overflow:'hidden',borderBottom:'1px solid #EBEBEB'}}>
            <div style={{margin:'0 auto',width:'40%',display:'flex',justifyContent:'space-around'}}>
              <ActionCon onClick={this.addLine}><Icon type="plus" />&nbsp;&nbsp;&nbsp;增加商品行</ActionCon>
              <ActionCon onClick={this.deleLine} style={{color:'#999999'}}><Icon type="delete" />&nbsp;&nbsp;&nbsp;删除行</ActionCon>
            </div>
          </div>
          <div style={{overflow:'hidden'}}>
            <EachColCon style={{display:'flex'}}>
              <EachCol style={{width:'25%'}}><HaveToSpan> * </HaveToSpan>货物或应税劳务、服务名称</EachCol>
              <EachCol style={{width:'10%'}}>规格型号</EachCol>
              <EachCol style={{width:'5%'}}>单位</EachCol>
              <EachCol style={{width:'12%'}}><HaveToSpan> * </HaveToSpan>数量</EachCol>
              <EachCol style={{width:'15%'}}><HaveToSpan> * </HaveToSpan>单价</EachCol>
              <EachCol style={{width:'12%'}}><HaveToSpan> * </HaveToSpan>金额</EachCol>
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
                                rules: [{
                                  required: true, message: '请输入商品名称',
                                }]
                              })(
                                <Input style={{width:'80%'}}
                                        onChange={(e)=>{
                                          this.state.line[index].hwmc = e.target.value;
                                          this.setState({})
                                        }}
                                        />)}
                              </FormItem>
                              </EachCol>
                            <EachCol style={{width:'10%',padding:5}}>
                              <FormItem>
                                <Input value={this.state.line[index].ggxh}
                                       onChange={(e)=>{
                                        this.state.line[index].ggxh = e.target.value;
                                        this.setState({})
                                       }}/>
                              </FormItem>
                            </EachCol>
                            <EachCol style={{width:'5%',padding:5}}>
                              <FormItem>
                                <Input value={this.state.line[index].dw}
                                       onChange={(e)=>{
                                          this.state.line[index].dw = e.target.value;
                                          this.setState({})
                                        }}/>
                              </FormItem>
                            </EachCol>
                            <EachCol style={{width:'12%',padding:5}}>
                            <FormItem>
                              {getFieldDecorator(`${item.id+'sl'}`,{
                                rules: [{
                                  required: true, message: '数量不能为空',
                                },{
                                  pattern: /^(\d*)\.?\d{1,9}$/, message: '只能是数字(9位小数）'
                                }]
                              })(
                              <Input onChange={(e)=>{
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
                                            this.state.line[index].je = Number(this.state.line[index].dj*this.state.line[index].sl).toFixed(2)
                                            if(this.state.line[index].slv == '2' || this.state.line[index].slv == '3' || this.state.line[index].slv == '4'){
                                              this.state.line[index].se = '0.00'
                                            }else{
                                                this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2)
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
                                                this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2)
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
                                rules: [{
                                  required: true, message: '单价不能为空',
                                }, {
                                  pattern: /^(\d*)\.?\d{1,9}$/, message: '只能是数字(9位小数）'
                                }]
                              })(
                              <Input onChange={(e)=>{
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
                                          this.state.line[index].je = Number(this.state.line[index].dj*this.state.line[index].sl).toFixed(2)
                                          if(this.state.line[index].slv == '2' || this.state.line[index].slv == '3' || this.state.line[index].slv == '4'){
                                            this.state.line[index].se = '0.00'
                                          }else{
                                                this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2)
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
                                              this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2)
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
                                rules: [{
                                  required: true, message: '金额不能为空',
                                }, {
                                  pattern: /^(\d*)\.?\d{1,9}$/, message: '只能是数字(9位小数）'
                                }]
                              })(
                              <Input onChange={(e)=>{
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
                                              this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2)
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
                                              this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2)
                                            }
                                          }
                                        }
                                        this.setState({})
                                    }}/>)}
                                </FormItem>
                            </EachCol>
                            <EachCol style={{width:'10%',padding:5}}>
                              <FormItem>
                              {getFieldDecorator(`${item.id+'slv'}`,{
                                initialValue:this.state.line[index].slv,
                              })(
                                  <Select style={{width:'100%'}}
                                         onChange={(value)=>{
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
                                          this.props.form.setFieldsValue({
                                            [`${item.id+'slv'}`]:value
                                          })
                                          this.state.line[index].slv = value;
                                          if(value == '2' || value == '3' || value == '4'){
                                            this.state.line[index].se = '0.00'
                                          }else{
                                              this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2)
                                          }
                                          this.setState({})
                                        }}>
                                  <Option value='1'>3%</Option>
                                  <Option value='2'>0%</Option>
                                  <Option value='3'>免税</Option>
                                  <Option value='4'>不征税</Option>
                                  <Option value='5'>4%</Option>
                                  <Option value='6'>5%</Option>
                                  <Option value='7'>6%</Option>
                                  <Option value='8'>10%</Option>
                                  <Option value='9'>11%</Option>
                                  <Option value='0'>16%</Option>
                                  <Option value='$'>17%</Option>
                                </Select>)}
                              </FormItem>
                            </EachCol>
                            <EachCol style={{width:'11%',padding:5}}>
                              <FormItem>
                                <Input disabled value={this.state.line[index].se}/>
                              </FormItem>
                            </EachCol>
                          </div>
                        </div>
                })
              }
            </div>
            <div style={{display:'flex'}}>
              <EachCol style={{width:'25%',borderRight:0}}>合计</EachCol>
              <EachCol style={{width:'10%',borderRight:0}} />
              <EachCol style={{width:'5%',borderRight:0}} />
              <EachCol style={{width:'12%',borderRight:0}} />
              <EachCol style={{width:'15%',borderRight:0}} />
              <EachCol style={{width:'12%',borderRight:0}}><ConSpan>￥{this.state.jehj}</ConSpan></EachCol>
              <EachCol style={{width:'10%',borderRight:0}}/>
              <EachCol style={{borderRight:0,flexGrow:1}}><ConSpan>￥{this.state.sehj}</ConSpan>{this.state.open==true?<ConSpan style={{lineHeight:2,color:'#f04134'}}><ItemPointSpan/>税差超过6分钱，请手动调整</ConSpan>:''}</EachCol>
            </div>
            <div style={{display:'flex',borderTop:'1px solid #EBEBEB'}}>
              <EachCol style={{width:'55%',borderRight:0}}><span style={{marginLeft:'10%',float:'left',display:'inline-block',width:'20%'}}>价税合计(大写）</span><ConSpan style={{marginLeft:15}}>{this.state.jshj!==''&&this.state.jshj!=='0.00'&&DX(this.state.jshj)}</ConSpan></EachCol>
              <EachCol style={{flexGrow:1,borderRight:0,textAlign:'left'}}><ConSpan style={{marginLeft:15}}></ConSpan></EachCol>
              <EachCol style={{borderRight:0,width:'30%',textAlign:'left'}}>(小写）<ConSpan style={{marginLeft:15}}>{this.state.jshj}</ConSpan></EachCol>
            </div>
          </div>
          <div style={{overflow:'hidden',display:'flex',borderTop:'1px solid #EBEBEB'}}>
            <LeftBody>
              <LeftAspect>
                销<br /><div style={{height:5}}></div>售<br /><div style={{height:5}}></div>方
              </LeftAspect>
              <RightAspect style={{borderRight:'1px solid #EBEBEB'}}>
                <div style={{overflow:'hidden'}}>
                  <InvoiceTitSpan>名称：</InvoiceTitSpan>
                  <FormItem>
                    {getFieldDecorator('xfmc',{
                    })(
                      <ConInput placeholder='请输入名称' onChange={(e)=>this.setState({gfdz:e.target.value})}/>
                    )}
                  </FormItem>
                </div>
                <div style={{overflow:'hidden'}}>
                  <InvoiceTitSpan>纳税人识别号：</InvoiceTitSpan>
                  <FormItem>
                    {getFieldDecorator('xfsbh',{
                    })(
                      <ConInput placeholder='请输入纳税人识别号' onChange={(e)=>this.setState({gfdz:e.target.value})}/>
                    )}
                  </FormItem>
                </div>
                <div style={{overflow:'hidden'}}>
                  <InvoiceTitSpan style={{float:'left'}}>地址：</InvoiceTitSpan>
                  <FormItem>
                    {getFieldDecorator('xfdz',{
                    })(
                      <ConInput placeholder='请输入地址' onChange={(e)=>this.setState({gfdz:e.target.value})}/>
                    )}
                  </FormItem>
                </div>
                <div style={{overflow:'hidden'}}>
                  <InvoiceTitSpan style={{float:'left'}}>电话：</InvoiceTitSpan>
                  <FormItem>
                    {getFieldDecorator('xfdh',{
                    })(
                      <ConInput placeholder='请输入电话' onChange={(e)=>this.setState({gfdz:e.target.value})}/>
                    )}
                  </FormItem>
                </div>
                <div style={{overflow:'hidden'}}>
                  <InvoiceTitSpan>开户行：</InvoiceTitSpan>
                  <FormItem>
                  {getFieldDecorator('xfyh',{
                  })(
                    <ConInput placeholder='请输入开户行' onChange={(e)=>this.setState({gfdz:e.target.value})}/>
                  )}
                  </FormItem>
                </div>
                <div style={{overflow:'hidden'}}>
                  <InvoiceTitSpan>账户：</InvoiceTitSpan>
                  <FormItem>
                  {getFieldDecorator('xfzh',{
                  })(
                    <ConInput placeholder='请输入账户' onChange={(e)=>this.setState({gfdz:e.target.value})}/>
                  )}
                  </FormItem>
                </div>
              </RightAspect>
            </LeftBody>
            <RightBody>
              <LeftAspect>
                备<div style={{height:10}}></div><br />注
              </LeftAspect>
              <RightAspect style={{padding:0}}>
                <TextArea value={this.state.bz} onChange={(e)=>this.setState({bz:e.target.value})} placeholder='请输入备注' style={{height:'100%',width:'100%',border:0}}/>
              </RightAspect>
            </RightBody>
          </div>
        </InvoiceSection>
        <BottomCon>
          <BottomBtn type='primary' onClick={()=>{
            this.handleSubmit(1)
          }}>提交</BottomBtn>
        </BottomCon>
        {this.state.saleModal}
        {this.state.codingModal}
        {this.state.importModal}
        {this.state.seeDetailed}
      </InvoiceCon>
      }
      {this.state.showSuccess}
      {this.state.previewMoal}
      </div>
    )
  }
}

const SpecialCheckCon = Form.create()(SpecialCheckConMack);
export default SpecialCheckCon;