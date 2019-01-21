import React from 'react'
import styled from 'styled-components'
import { Input,Select,Radio,Icon,Checkbox,message,Button,Form,Modal } from 'antd'
import { num_format,DX } from './../../util'
import { SaleModal,CodingModal,OpenSuccess,PreviewMoal,ImportInvoiceModal,DetailedModal } from 'components'
import { Link } from 'react-router'
const Search = Input.Search;
const Option = Select.Option;
const RadioGroup = Radio.Group;
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
const FormItem = Form.Item;
class PapInvoiceConMack extends React.Component{
  constructor(props){
    super(props);
    this.startState={
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
      bz:'',
      skr:'',
      fhr:'',
      open:false,
      tel:'',
      gfdz:'',
      gfdh:'',
      gfyh:'',
      gfzh:'',
      gfsbh:'',
      gfmc:'',
    }
    this.state={
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
      gfmcFont:'',
      sbhFont:'',
      headertype:'company',
      djtype:"1",
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
      invoiceType:'102',
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
  componentWillReceiveProps(nextPorps){
    if(nextPorps.stcok !== this.props.stcok){
      if(nextPorps.stcok!==''){
        this.setState({invoiceType:nextPorps.stcok[0].category === '01'?'100':'102'})
      }
    }
  }
  importSucc = (data) => {
    this.lineNum+=6;
    for(let i in data){
      let rate;
      let rateNum;
      let slv = data[i].slv*100+'';
      if(this.state.line.length === 1 && this.state.line[0].hwmc ==='' && this.state.line[0].ggxh ==='' &&this.state.line[0].dw ==='' &&this.state.line[0].sl ==='' &&this.state.line[0].je ===''){
        this.state.line.length = 0;
      }
      if(slv === '1'){
        rate = '3'
        rateNum = 0.03;
      }else if(slv === '5'){
        rate = '4'
        rateNum = 0.04;
      }else if(slv === '6'){
        rate = '5'
        rateNum = 0.05;
      }else if(slv === '7'){
        rate = '6'
        rateNum = 0.06;
      }else if(slv === '8'){
        rate = '10'
        rateNum = 0.1;
      }else if(slv === '9'){
        rate = '11'
        rateNum = 0.11;
      }else if(slv === '0'){
        rate = '16'
        rateNum = 0.16;
      }else if(slv === '$'){
        rate = '17'
        rateNum = 0.17;
      }else if(slv === '2'){
        rate = '0'
        rateNum = 0.00;
      }else if(slv === '3'){
        rate = '1'
        rateNum = 0.00;
      }else if(slv === '4'){
        rate = '2'
        rateNum = 0.00;
      }
      this.state.line.push({
        hwmc:data[i].hwmc,
        ggxh:data[i].ggxh,
        dw:data[i].dw,
        sl:data[i].sl,
        dj:data[i].dj,
        je:this.state.djtype === '2' ? Number(data[i].je).toFixed(2) : Number(data[i].je/(1+rateNum)).toFixed(2),
        se:this.state.djtype === '2' ? Number(data[i].je*data[i].slv).toFixed(2) : Number(data[i].je/(1+rateNum)*rateNum).toFixed(2),
        slv:rate,
        id:this.lineNum,
        zkje:this.state.djtype === '2' ?-Number(data[i].je*data[i].zklv*data[i].slv).toFixed(2):-Number((data[i].je*data[i].zklv*data[i].slv)/(1+rateNum)).toFixed(2),
        zkse:this.state.djtype === '2' ?-Number(data[i].je*data[i].zklv).toFixed(2):-Number((data[i].je*data[i].zklv*data[i].slv)/(1+rateNum)*rateNum).toFixed(2),
        shbm:data[i].ssflbm,
        checked:false,
        is_special:data[i].fpzl=='04'?'102':'100',
        sale:data[i].zklv!==''?{
          zkje:this.state.djtype === '2' ?-Number(data[i].je*data[i].zklv*data[i].slv).toFixed(2):-Number((data[i].je*data[i].zklv*data[i].slv)/(1+rateNum)).toFixed(2),
          zkse:this.state.djtype === '2' ?-Number(data[i].je*data[i].zklv).toFixed(2):-Number((data[i].je*data[i].zklv*data[i].slv)/(1+rateNum)*rateNum).toFixed(2),
          checked:false,
          yspsl:data[i].zklv*100+'%'
        }:'0',
      })
      this.state.nohj.push({
        je:this.state.djtype === '2' ? Number(data[i].je).toFixed(3).substring(0,Number(data[i].je).toFixed(3).toString().length - 1) :  Number(data[i].je/(1+rateNum)).toFixed(3).substring(0,Number(data[i].je/(1+rateNum)).toFixed(3).toString().length - 1),
        id:this.lineNum,
        se:this.state.djtype === '2' ? Number(data[i].je*data[i].slv).toFixed(3).substring(0,Number(data[i].je*data[i].slv).toFixed(3).toString().length - 1) : Number(data[i].je/(1+rateNum)*rateNum).toFixed(3).substring(0,Number(data[i].je/(1+rateNum)*rateNum).toFixed(3).toString().length - 1),
      })
    }
    this.setJehj()
  }
  copyOpen = () => {
    if(this.props.copyData !== false){
      const res = this.props.copyData;
      this.setState({
        jehj:res.je,
        sehj:res.se,
        jshj:res.jshj,
        skr:res.skrmc?res.skrmc:'',
        fhr:res.fhrmc?res.fhrmc:'',
        bz:res.bz?res.bz:'',
        invoice_id:res.title_id?res.title_id:'',
        gfdz:(res.gfdzdh&&res.gfdzdh.split(' ')[0])?res.gfdzdh.split(' ')[0]:'',
        gfdh:(res.gfdzdh&&res.gfdzdh.split(' ')[1])?res.gfdzdh.split(' ')[1]:'',
        gfyh:(res.gfyhzh&&res.gfyhzh.split(' ')[0])?res.gfyhzh.split(' ')[0]:'',
        gfzh:(res.gfyhzh&&res.gfyhzh.split(' ')[1])?res.gfyhzh.split(' ')[1]:'',
        gfsbh:res.gfsbh?res.gfsbh:'',
        gfmc:res.gfmc&&res.gfmc,
        headertype:res.buyertype&&res.buyertype,
        djtype:'2',
      })
      if(res.invoice_details){
        const details = res.invoice_details;
        this.state.line.length = 0;
        for(let i in details){
          let rate;
          if(details[i].slv === '17'){
            rate = '$'
          }else if(details[i].slv === '3'){
            rate = '1'
          }else if(details[i].slv === '0'){
            rate = '2'
          }else if(details[i].slv === '1'){
            rate = '3'
          }else if(details[i].slv === '2'){
            rate = '4'
          }else if(details[i].slv === '4'){
            rate = '5'
          }else if(details[i].slv === '5'){
            rate = '6'
          }else if(details[i].slv === '6'){
            rate = '7'
          }else if(details[i].slv === '10'){
            rate = '8'
          }else if(details[i].slv === '11'){
            rate = '9'
          }else if(details[i].slv === '16'){
            rate = '0'
          }
          this.state.line.push({
            hwmc:details[i].hwmc,
            ggxh:details[i].ggxh,
            dw:details[i].dw,
            sl:details[i].sl,
            dj:details[i].dj,
            je:details[i].je,
            se:details[i].se,
            slv:rate,
            id:this.lineNum,
            zkse:details[i].zkse,
            zkje:details[i].zkje,
            shbm:details[i].ssflbm,
            checked:false,
            is_special:details[i].fpzl=='04'?'102':'100',
            sale:details[i].zkje!==''?{
              zkse:details[i].zkse,
              zkje:details[i].zkje,
              checked:false,
            }:'0',
          })
          this.lineNum++;
        }
      }
      this.setState({})
    }
  }
  addLine = () => {
    if(this.state.line.length === 8){
      message.warning("商品行数已达到最大数量，无法继续添加");return;
    }
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
  fjhChange = (val) => {
    this.props.getElectronic({fjh:val})
  }
  componentWillMount(){
    this.copyOpen()
    this.props.getCompanyList((res)=>{
      this.setState({companyList:res})
    })
    this.props.showSetting((res)=>{
      if(res === 21032){
        Modal.error({
          title: '提示',
          content: (
            <div>
              <p>您的企业没有进行销项开票设置</p>
              <p>请在销项管理-销项发票设置页面进行设置</p>
            </div>
          ),
          okText:'去设置',
          onOk() {
            document.getElementById('gotoset').click()
          }})
      }else{
        const arr = res.tax_rate.split(",")
        for(let i in arr){
          this.state.rateType.push(arr[i].split("")[0])
          this.state.rateList.push(arr[i].split("")[1])
          this.state.line[0].slv=this.state.rateList[0]
        }
        this.setState({})
      }
    })
  }
  setJehj = () => {
    let jehj = this.jehj;
    for(let i in this.state.line){
      jehj+=Number(this.state.line[i].je)
      if(this.state.line[i].sale!=='0'){
        jehj+=Number(this.state.line[i].sale.zkje)
      }
    }
    this.setState({jehj:Number(jehj).toFixed(2)})

    
    let sehj = this.sehj;
    for(let i in this.state.line){
      sehj+=Number(this.state.line[i].se)
      if(this.state.line[i].sale!=='0'){
        sehj+=Number(this.state.line[i].sale.zkse)
      }
    }
    this.setState({sehj:Number(sehj).toFixed(2)})

    let nosehj = this.nosehj;
    for(let i in this.state.nohj){
      nosehj+=Number(this.state.nohj[i].se)
    }
  
    if(this.state.djtype === '1'){
      this.setState({jshj:(jehj).toFixed(2)})
    }else{
      this.setState({jshj:(jehj+sehj).toFixed(2)})
    }
    if(nosehj-sehj > 0.06){
      this.setState({open:true})
    }else{
      this.setState({open:false})
    }
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
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if(!err){
        if(this.props.stcok === ''){
          this.props.getRepertroyList();return;
        }
        if(this.state.open == true){
          return;
        }
        this.setJehj()
        let line = this.state.line;
        for(let i in line){
          if(line[i].sale === '0'){
            line[i].zkse = '';
            line[i].zkje = '';
          }else{
            line[i].zkse = Math.abs(line[i].sale.zkse);
            line[i].zkje = Math.abs(line[i].sale.zkje);
          }
        }
        let detail = [];
        let nose_jehj = 0;
        let nose_sehj = 0;
        let invoice_details = [];
        for(let i in line){
          let rate;
          let rateNum;
          if(line[i].slv === '1'){
            rate = '3'
            rateNum = 0.03;
          }else if(line[i].slv === '5'){
            rate = '4'
            rateNum = 0.04;
          }else if(line[i].slv === '6'){
            rate = '5'
            rateNum = 0.05;
          }else if(line[i].slv === '7'){
            rate = '6'
            rateNum = 0.06;
          }else if(line[i].slv === '8'){
            rate = '10'
            rateNum = 0.1;
          }else if(line[i].slv === '9'){
            rate = '11'
            rateNum = 0.11;
          }else if(line[i].slv === '0'){
            rate = '16'
            rateNum = 0.16;
          }else if(line[i].slv === '$'){
            rate = '17'
            rateNum = 0.17;
          }else if(line[i].slv === '2'){
            rate = '0'
            rateNum = 0.00;
          }else if(line[i].slv === '3'){
            rate = '1'
            rateNum = 0.00;
          }else if(line[i].slv === '4'){
            rate = '2'
            rateNum = 0.00;
          }
          invoice_details.push({
            hwmc: line[i].hwmc,
            ggxh: line[i].ggxh,
            dw: line[i].dw,
            sl: line[i].sl+'',
            dj: this.state.djtype === '2' ? line[i].dj+'' : num_format(line[i].je/(1+rateNum)/line[i].sl)+'',
            je: this.state.djtype === '2' ? line[i].je+'' : Number(line[i].je/(1+rateNum)).toFixed(2)+'',
            slv: rate,
            se: this.state.djtype === '2' ? line[i].se : Number(line[i].je/(1+rateNum)*rateNum).toFixed(2)+'',
            ssflbm: line[i].shbm+'',
            zkje: this.state.djtype === '2' ? line[i].zkje+'': line[i].zkje!==''? Number(line[i].zkje/(1+rateNum)).toFixed(2)+'': '',
            zkse: this.state.djtype === '2' ? line[i].zkse+'' : line[i].zkse!==''? Number(line[i].zkje/(1+rateNum)*rateNum).toFixed(2)+'': '',
            zklv: line[i].sale.zklv,
          })
          if(this.state.djtype !== '2'){
            nose_jehj = nose_jehj+Number(Number(line[i].je/(1+rateNum)).toFixed(2));
            nose_sehj = nose_sehj+Number(Number(line[i].je/(1+rateNum)*rateNum).toFixed(2));
          }
        }
        const { companyList } = this.props;
        const param = {
          is_special: this.state.invoiceType==='102'?'0':'1',
          issue_type: this.props.settingList[0].tax_control_type === 1?'4':'3',
          buyertype: this.state.headertype,
          repertoryid: this.props.stcok[0].id,
          issue_data:{
            gfmc: values['gfmc'],
            xfmc: companyList.name,
            xfsbh: companyList.tax_number,
            xfdz: companyList.address,
            xfdh: companyList.telephone,
            xfyh: companyList.account_bank,
            xfzh: companyList.account_number,
            kprmc: companyList.realname,
            jshj: this.state.jshj,
            je: this.state.djtype === '2' ? this.state.jehj : nose_jehj+'',
            se: this.state.djtype === '2' ? this.state.sehj : nose_sehj+'',
            hsbs: '0',
          }
        }
        if(values['gfdz']!==''){
          param.issue_data['gfdz'] = values['gfdz']
        }
        if(this.state.invoice_id !== '') {
          param['invoice_id'] = this.state.invoice_id;
        }
        if(values['gfdh']!==''){
          param.issue_data['gfdh'] = values['gfdh']
        }
        if(values['gfsbh']!==''){
          param.issue_data['gfsbh'] = values['gfsbh']
        }
        if(values['gfyh']!==''){
          param.issue_data['gfyh'] = values['gfyh']
        }
        if(values['gfzh']!==''){
          param.issue_data['gfzh'] = values['gfzh']
        }
        if(this.state.skr!==''){
          param.issue_data['skrmc'] = this.state.skr
        }
        if(this.state.fhr!==''){
          param.issue_data['fhrmc'] = this.state.fhr
        }
        if(this.state.bz!==''){
          param.issue_data['bz'] = this.state.bz
        }
        for(let i in invoice_details){
          if(invoice_details[i].ggxh === '' || invoice_details[i].ggxh === null){
            delete invoice_details[i].ggxh;
          }
          if(invoice_details[i].dw === '' || invoice_details[i].dw === null){
            delete invoice_details[i].dw;
          }
          if(invoice_details[i].zkje === '' || invoice_details[i].zkje === null){
            delete invoice_details[i].zkje;
          }
          if(invoice_details[i].zkse === '' || invoice_details[i].zkse === null){
            delete invoice_details[i].zkse;
          }
          if(invoice_details[i].zklv === '' || invoice_details[i].zklv === null){
            delete invoice_details[i].zklv;
          }
        }
        param.issue_data['invoice_detail'] = invoice_details;
        param.issue_data = JSON.stringify(param.issue_data)
        this.setState({previewMoal:<PreviewMoal clearInvoice={this.clearInvoice} 
                                                rpaOpen={this.props.rpaOpen} 
                                                pap={true}
                                                tax_control_type={this.props.settingList[0].tax_control_type}
                                                companyList={this.props.companyList} 
                                                param={param} 
                                                open={this.state.open}
                                                cancelFnc={()=>this.setState({previewMoal:''})}/>})
      }
    })
  }
  // handleSubmit = () => {
  //   this.props.form.validateFields((err, values) => {
  //     if(!err){
  //       this.setJehj()
  //       let line = this.state.line;
  //       for(let i in line){
  //         if(line[i].sale === '0'){
  //           line[i].zkse = '';
  //           line[i].zkje = '';
  //         }else{
  //           line[i].zkse = Math.abs(line[i].sale.zkse);
  //           line[i].zkje = Math.abs(line[i].sale.zkje);
  //         }
  //       }
  //       let detail = [];
  //       let invoice_details = [];
  //       for(let i in line){
  //         let rate;
  //         let rateNum;
  //         if(line[i].slv === '1'){
  //           rate = '3'
  //           rateNum = 0.03;
  //         }else if(line[i].slv === '5'){
  //           rate = '4'
  //           rateNum = 0.04;
  //         }else if(line[i].slv === '6'){
  //           rate = '5'
  //           rateNum = 0.05;
  //         }else if(line[i].slv === '7'){
  //           rate = '6'
  //           rateNum = 0.06;
  //         }else if(line[i].slv === '8'){
  //           rate = '10'
  //           rateNum = 0.1;
  //         }else if(line[i].slv === '9'){
  //           rate = '11'
  //           rateNum = 0.11;
  //         }else if(line[i].slv === '0'){
  //           rate = '16'
  //           rateNum = 0.16;
  //         }else if(line[i].slv === '$'){
  //           rate = '17'
  //           rateNum = 0.17;
  //         }else if(line[i].slv === '2'){
  //           rate = '0'
  //           rateNum = 0.00;
  //         }else if(line[i].slv === '3'){
  //           rate = '1'
  //           rateNum = 0.00;
  //         }else if(line[i].slv === '4'){
  //           rate = '2'
  //           rateNum = 0.00;
  //         }
  //         invoice_details.push({
  //           hwmc: line[i].hwmc,
  //           ggxh: line[i].ggxh,
  //           dw: line[i].dw,
  //           sl: line[i].sl+'',
  //           dj: this.state.djtype === '2' ? line[i].dj+'' : num_format(line[i].je/(1+rateNum)/line[i].sl)+'',
  //           je: this.state.djtype === '2' ? line[i].je+'' : Number(line[i].je/(1+rateNum)).toFixed(2)+'',
  //           slv: rate,
  //           se: this.state.djtype === '2' ? line[i].se : Number(line[i].je/(1+rateNum)*rateNum).toFixed(2)+'',
  //           ssflbm: line[i].shbm+'',
  //           zkje: this.state.djtype === '2' ? line[i].zkje+'': line[i].zkje!==''? Number(line[i].zkje/(1+rateNum)).toFixed(2)+'': '',
  //           zkse: this.state.djtype === '2' ? line[i].zkse+'' : line[i].zkse!==''? Number(line[i].zkje/(1+rateNum)*rateNum).toFixed(2)+'': '',
  //           zkl: line[i].sale.zkl,
  //         })
  //         let j = Number(i)+1;
  //         let ZeroTax;
  //         if(line[i].slv === '2'){
  //           ZeroTax = '3'
  //         }else if(line[i].slv === '3'){
  //           ZeroTax = '1'
  //         }else if(line[i].slv === '4'){
  //           ZeroTax = '2'
  //         }else{
  //           ZeroTax = ''
  //         }
  //         detail.push({
  //           'ListGoodsName' : line[i].hwmc,
  //           'ListTaxItem' : '1',
  //           'ListTaxRate' : rate,
  //           'ListStandard' : line[i].ggxh,
  //           'ListUnit' : line[i].dw,
  //           'ListNumber' : line[i].sl,
  //           'ListPrice' : line[i].dj,
  //           'ListAmount' : line[i].je,
  //           'ListTaxAmount' : line[i].se,
  //           "ListPriceKind": this.state.djtype === '2' ? '0' : '1',
  //           'GoodsNoVer' : '10.0',
  //           'GoodsTaxNo' : line[i].shbm,
  //           'TaxPre' : '0',
  //           "ZeroTax": ZeroTax,
  //           'CropGoodsNo' : '1111'
  //         })
  //         if(line[i].sale !== '0' ){
  //           detail.push({
  //             'ListGoodsName' : '折扣行数1('+line[i].sale.zkl+'%)',
  //             //商品税率
  //             "ListTaxRate": line[i].slv,
  //             //金额
  //             "ListAmount": line[i].sale.zkje,
  //             //税额
  //             "ListTaxAmount": -line[i].zkse,
  //             //含税价标志
  //             "ListPriceKind": this.state.djtype === '2' ? '0' : '1',
  //           })
  //         }
  //       }
  //       let papDetail = {};
  //       for(let n in detail){
  //         let m = Number(n)+1;
  //         papDetail["Item$i_"+m] = detail[n]; 
  //       }
  //       const { companyList } = this.props;
  //       const param = {
  //         is_special: this.state.invoiceType==='102'?'0':'1',
  //         buyertype: this.state.headertype,
  //         issue_data:{
  //           gfmc: values['gfmc'],
  //           xfmc: companyList.name,
  //           xfsbh: companyList.tax_number,
  //           xfdz: companyList.address,
  //           xfdh: companyList.telephone,
  //           xfyh: companyList.account_bank,
  //           xfzh: companyList.account_number,
  //           kprmc: companyList.realname,
  //           jshj: this.state.jshj,
  //           je: this.state.djtype === '2' ? this.state.jehj : this.state.jehj-this.state.sehj+'',
  //           se: this.state.sehj,
  //           hsbs: this.state.djtype,
  //         }
  //       }
  //       if(values['gfdz']!==''){
  //         param.issue_data['gfdz'] = values['gfdz']
  //       }
  //       if(this.state.invoice_id !== '') {
  //         param['invoice_id'] = this.state.invoice_id;
  //       }
  //       if(values['gfdh']!==''){
  //         param.issue_data['gfdh'] = values['gfdh']
  //       }
  //       if(values['gfsbh']!==''){
  //         param.issue_data['gfsbh'] = values['gfsbh']
  //       }
  //       if(values['gfyh']!==''){
  //         param.issue_data['gfyh'] = values['gfyh']
  //       }
  //       if(values['gfzh']!==''){
  //         param.issue_data['gfzh'] = values['gfzh']
  //       }
  //       if(this.state.skr!==''){
  //         param.issue_data['skrmc'] = this.state.skr
  //       }
  //       if(this.state.fhr!==''){
  //         param.issue_data['fhrmc'] = this.state.fhr
  //       }
  //       if(this.state.bz!==''){
  //         param.issue_data['bz'] = this.state.bz
  //       }
  //       for(let i in invoice_details){
  //         if(invoice_details[i].ggxh === '' || invoice_details[i].ggxh === null){
  //           delete invoice_details[i].ggxh;
  //         }
  //         if(invoice_details[i].dw === '' || invoice_details[i].dw === null){
  //           delete invoice_details[i].dw;
  //         }
  //         if(invoice_details[i].zkje === '' || invoice_details[i].zkje === null){
  //           delete invoice_details[i].zkje;
  //         }
  //         if(invoice_details[i].zkse === '' || invoice_details[i].zkse === null){
  //           delete invoice_details[i].zkse;
  //         }
  //       }
  //       param.issue_data['invoice_detail'] = invoice_details;
  //       window.invoiceSdk.invoice(
  //         'localhost:15678',
  //         companyList.tax_number,
  //         this.props.settingList[0].tax_control_type === 1? 'BW_dGVzdHRlc3Q':'dGVzdHRlc3Q',
  //         {
  //           "data": {
  //             'main' : {
  //               "IndentNo": "11111",
  //               "InfoKind": this.state.invoiceType,
  //               "InfoClientTaxCode": values['gfsbh'],
  //               "InfoClientName": values['gfmc'],
  //               "InfoClientBankAccount": values['gfyh']+' '+values['gfzh'],
  //               "InfoClientAddressPhone": values['gfdz']+' '+values['gfdh'],
  //               "InfoTaxRate": detail[0].ListTaxRate,
  //               "InfoNotes": this.state.bz,
  //               "InfoInvoicer": companyList.realname,
  //               "InfoChecker": this.state.fhr,
  //               "InfoCashier": this.state.skr,
  //               "InfoSellerBankAccount": companyList.account_bank+' '+companyList.account_number,
  //               "InfoSellerAddressPhone": companyList.address+' '+companyList.telephone,
  //               "IsList": "0",
  //               "InfoMobileNo": "",
  //               "IsImmPrint": this.props.settingList[0].tax_control_type === 1?'1':'0',
  //               "IsAutoPrint": '1',
  //             },
  //             "detail": papDetail
  //           }
  //         }
  //       )
  //       .then((res)=>{
  //         if(res.body.data.Ret === '0'){
  //           param.issue_data['fpdm'] = res.body.data.InvoiceCode;
  //           param.issue_data['fphm'] = res.body.data.InvoiceNo;
  //           if(res.body.data.JYM!==''){
  //             param.issue_data['jym'] = res.body.data.JYM
  //           }
  //           param.issue_data = JSON.stringify(param.issue_data)
  //           this.props.savePapr(param,(res)=>{
  //             this.props.getDetail(res.data.outinovice_id,(detail)=>{
  //               this.setState({showInvoice:false},()=>{
  //                 this.setState({showSuccess:<OpenSuccess scanData={detail} 
  //                                                         cancel={this.clearInvoice}
  //                                                         settingList={this.props.settingList[0]}
  //                                                         companyList={companyList}/>
  //                                                        })
  //               })
  //             })
  //           })
  //         }else{
  //           Modal.error({
  //             title: '开具失败',
  //             content: res.body.data.Msg,
  //           }); 
  //         }
  //       })
  //       .catch((res)=>{

  //       })
  //     }
  //   })
  // }
  routerWillLeave= () => {
    const state = {
      line:this.state.line,
      bz:this.state.bz,
      skr:this.state.skr,
      fhr:this.state.fhr,
      tel:this.state.tel,
      gfdz:this.state.gfdz,
      gfdh:this.state.gfdh,
      gfyh:this.state.gfyh,
      gfzh:this.state.gfzh,
      gfsbh:this.state.gfsbh,
      gfmc:this.state.gfmc,
    };
    const startState = this.startState;
    if(state.bz !== startState.bz || state.skr !== startState.skr || state.fhr !== startState.fhr || state.tel !== startState.tel || 
      state.gfdz !== startState.gfdz || state.gfdh !== startState.gfdh || state.gfyh !== startState.gfyh || state.gfzh !== startState.gfzh ||
      state.gfsbh !== startState.gfsbh || state.gfmc !== startState.gfmc){
        return '您还没有保存发票信息，是否继续离开？'
    }else{
      for(let i in state.line){
        for(let j in startState.line){
          if(state.line[i].hwmc !== startState.line[j].hwmc || state.line[i].ggxh !== startState.line[j].ggxh || state.line[i].dw !== startState.line[j].dw
            || state.line[i].sl !== startState.line[j].sl || state.line[i].dj !== startState.line[j].dj || state.line[i].je !== startState.line[j].je
            || state.line[i].se !== startState.line[j].se
          ){
            return '您还没有保存发票信息，是否继续离开？'
          }
        }
      }
    }
  }
  seeDetailFnc = () => {
    const line = this.state.line;
    const nohj = this.state.nohj;
    this.setState({seeDetailed:<DetailedModal cancelModal={()=>this.setState({seeDetailed:''})}
                                              state={this.state}
                                              getCodingList={this.props.getCodingList}
                                              goodsList={this.props.goodsList}
                                              lineNum={this.lineNum}
                                              line={line}
                                              nohj={nohj}
                                              loading={this.props.loading}
                                              getData={this.props.getData}
                                              settingList={this.props.settingList}
                                              setStateFnc={(state)=>this.setState({...state,seeDetailed:''})}
                                              />})
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
        }],
        saleModal:'',
        invoice_id:'',
        gfmcFont:'',
        sbhFont:'',
        headertype:'company',
        showSuccess:'',
        djtype:"1",
        jehj:(0).toFixed(2),
        sehj:(0).toFixed(2),
        jshj:(0).toFixed(2),
        showInvoice:true,
        bz:'',
        open:false,
        skr:'',
        fhr:'',
        tel:'',
        invoiceType:'102',
        gfdz:'',
        gfdh:'',
        options:[],
        gfyh:'',
        gfzh:'',
        gfsbh:'',
        gfmc:'',
        codingModal:'',
        previewMoal:'',
        djtype:"1",
        importModal:'',
        seeDetailed:'',
      })
      this.deleList = [];
      this.lineNum = 0;
      this.jehj = 0.00;
      this.sehj = 0.00;
      this.nojehj = 0.00;
      this.nosehj = 0.00;
    })
  }
  handleSearch = (value) => {
    this.props.searchFnc({keyword:value},(res)=>{
      if(res.length!==0){
        this.setState({options:res.map((d) => <Option id={d} key={`${d.tax_number}`}>{d.name}</Option>),companyList:res})
      }
    })
  }
  handleChange = (value) => {
    const companyList = this.state.companyList;
    for(let i in companyList){
      if(companyList[i].tax_number === value){
        this.setState({
          gfsbh:value,
          gfdz:companyList[i].address,
          gfdh:companyList[i].telephone,
          gfyh:companyList[i].bank,
          gfzh:companyList[i].account
        })
        this.props.form.setFieldsValue({
          gfsbh:companyList[i].tax_number,
          gfdz:companyList[i].address,
          gfdh:companyList[i].telephone,
          gfyh:companyList[i].bank,
          gfzh:companyList[i].account
        })
      }
    }
  }
  render(){
    const { companyList } = this.state;
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
      {
        this.state.showInvoice === true && 
        <InvoiceCon onClick={this.setJehj} className='ele-invoice'>
        <InvoiceHeader>
          <HeaderLeft>
            发票类型：
            <Select style={{width:150}} 
                    value={this.state.invoiceType}
                    onChange={(val)=>this.setState({invoiceType:val},()=>{
                        this.props.getRepertroyList()
                        if(this.state.invoiceType === '100'){
                          this.setState({headertype:'company'})
                        }
                        if(this.state.gfsbh === ''){
                          this.props.form.resetFields(['gfsbh'])
                        }
                        if(this.state.gfdz === ''){
                          this.props.form.resetFields(['gfdz'])
                        }
                        if(this.state.gfdh === ''){
                          this.props.form.resetFields(['gfdh'])
                        }
                        if(this.state.gfyh === ''){
                          this.props.form.resetFields(['gfyh'])
                        }
                        if(this.state.gfzh === ''){
                          this.props.form.resetFields(['gfzh'])
                        }
            })}>
              <Option key='102'>增值税普通发票</Option>
              {this.state.rateType[0] === '2' && <Option key='100'>增值税专用发票</Option>}
            </Select>
          </HeaderLeft>
          {
            this.props.stcok !== '' &&
            <HeaderRight>
              <div>发票代码：<HmSpan>{this.props.stcok[0].code}</HmSpan></div>
              <div>发票号码：<HmSpan>{this.props.stcok[0].num_begin}</HmSpan></div>
            </HeaderRight>
          }
          <HeaderTitle>
            <TitleFont1>{this.state.invoiceType === '102'?'增值税普通发票':'增值税专用发票'}</TitleFont1>
            <TitleFont2>此联不作报销、扣税凭证使用</TitleFont2>
          </HeaderTitle>
        </InvoiceHeader>
        <InvoiceSection>
          <div style={{overflow:'hidden',display:'flex',borderBottom:'1px solid #EBEBEB'}}>
            <LeftBody2>
              <LeftAspect>
                <div style={{height:1}}></div><br />购<div style={{height:1}}></div><br />买<div style={{height:1}}></div><br />方
              </LeftAspect>
              <RightAspect>
                <div style={{overflow:'hidden'}}>
                  <InvoiceTitSpan><HaveToSpan> * </HaveToSpan>抬头类型：</InvoiceTitSpan>
                    <ConRadio value='company' value={this.state.headertype} onChange={(e)=>{
                      this.setState({headertype:e.target.value},()=>{
                          if(this.state.gfsbh === ''){
                            this.props.form.resetFields(['gfsbh'])
                          }
                          if(this.state.gfdz === ''){
                            this.props.form.resetFields(['gfdz'])
                          }
                          if(this.state.gfdh === ''){
                            this.props.form.resetFields(['gfdh'])
                          }
                          if(this.state.gfyh === ''){
                            this.props.form.resetFields(['gfyh'])
                          }
                          if(this.state.gfzh === ''){
                            this.props.form.resetFields(['gfzh'])
                          }
                      })
                    }}>
                      <Radio value='company'>企业</Radio>
                      {this.state.invoiceType === '102' && <Radio value='person'>个人/事业单位</Radio>}
                    </ConRadio>
                </div>
                <div style={{overflow:'hidden'}}>
                  <InvoiceTitSpan><HaveToSpan> * </HaveToSpan>名称：</InvoiceTitSpan>
                  <FormItem>
                    {getFieldDecorator('gfmc',{
                      initialValue:this.state.gfmc,
                      rules: [{
                        required: true, message: '名称不能为空',
                      },{
                        pattern: /[^<>\"\'&%\\/]{2,100}/, message: '名称不合法'
                      }]
                    })(
                      <Input placeholder="请输入名称" style={{float:'left',width:250,margin:'8px 20px 0 80px'}}/>
                      // <Select
                      //   style={{float:'left',width:250,margin:'8px 20px 0 80px'}}
                      //   showSearch
                      //   placeholder="请输入名称"
                      //   showArrow={false}
                      //   filterOption={false}
                      //   onSearch={this.handleSearch}
                      //   onSelect={this.handleChange}
                      // >
                      //   {this.state.options}
                      // </Select>
                    )}
                    </FormItem>
                </div>
                <div style={{overflow:'hidden'}}>
                  <InvoiceTitSpan>{(this.state.headertype === 'company' || this.state.invoiceType === '100') && <HaveToSpan> * </HaveToSpan>}纳税人识别号：</InvoiceTitSpan>
                  <FormItem>
                    {getFieldDecorator('gfsbh',{
                      initialValue:this.state.gfsbh,
                      rules:[(this.state.headertype === 'company' || this.state.invoiceType === '100')?{
                        required: true, message: '纳税人识别号不能为空',
                      }:'',{
                        pattern: /^[A-Z0-9]{15,20}$/, message: '纳税人识别号不合法'
                      }]
                    })(
                      <ConInput placeholder='请输入纳税人识别号' onChange={(e)=>this.setState({gfsbh:e.target.value})}/>
                    )}
                  </FormItem>
                </div>
                <div style={{overflow:'hidden'}}>
                  <InvoiceTitSpan style={{float:'left'}}>{this.state.invoiceType === '100' && <HaveToSpan> * </HaveToSpan>}地址：</InvoiceTitSpan>
                  <FormItem>
                    {getFieldDecorator('gfdz',{
                      initialValue:this.state.gfdz,
                      rules:[this.state.invoiceType === '100'?{
                        required: true, message: '地址不能为空',
                      }:'',{
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
                  <InvoiceTitSpan style={{float:'left'}}>{this.state.invoiceType === '100' && <HaveToSpan> * </HaveToSpan>}电话：</InvoiceTitSpan>
                  <FormItem>
                    {getFieldDecorator('gfdh',{
                      initialValue:this.state.gfdh,
                      rules:[this.state.invoiceType === '100'?{
                        required: true, message: '电话不能为空',
                      }:'',{
                        pattern: /^[0-9\- ]{1,50}$/, message: '电话不合法'
                      }]
                    })(
                      <ConInput placeholder='请输入电话' onChange={(e)=>this.setState({gfdh:e.target.value})}/>
                    )}
                  </FormItem>
                </div>
                <div style={{overflow:'hidden'}}>
                  <InvoiceTitSpan>{this.state.invoiceType === '100' && <HaveToSpan> * </HaveToSpan>}开户行：</InvoiceTitSpan>
                  <FormItem>
                    {getFieldDecorator('gfyh',{
                      initialValue:this.state.gfyh,
                      rules:[this.state.invoiceType === '100'?{
                        required: true, message: '开户行不能为空',
                      }:'',{
                        validator: (rule, value, callback)=>{
                          if(value!==''){
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
                  <InvoiceTitSpan>{this.state.invoiceType === '100' && <HaveToSpan> * </HaveToSpan>}账户：</InvoiceTitSpan>
                  <FormItem>
                    {getFieldDecorator('gfzh',{
                      initialValue:this.state.gfzh,
                      rules:[this.state.invoiceType === '100'?{
                        required: true, message: '账户不能为空',
                      }:'',{
                        validator: (rule, value, callback)=>{
                          if(value!==''){
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
            <div style={{margin:'0 auto',width:'60%',display:'flex',justifyContent:'space-around'}}>
              <ActionCon onClick={this.addLine}><Icon type="plus" />&nbsp;&nbsp;&nbsp;增加商品行</ActionCon>
              <ActionCon onClick={this.addSaleLine}><Icon type="plus" />&nbsp;&nbsp;&nbsp;增加折扣行</ActionCon>
              <ActionCon onClick={()=>{
                this.setState({importModal:<ImportInvoiceModal cancelModal={()=>this.setState({importModal:''})}
                                                               importSucc={(data)=>this.importSucc(data)}/>})
              }}><Icon type="plus"/>&nbsp;&nbsp;&nbsp;导入明细</ActionCon>
              <ActionCon onClick={this.seeDetailFnc}>查看明细</ActionCon>
              <ActionCon onClick={this.deleLine} style={{color:'#999999'}}><Icon type="delete" />&nbsp;&nbsp;&nbsp;删除行</ActionCon>
            </div>
          </div>
          <div style={{overflow:'hidden'}}>
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
                          this.state.line[index].je = Number(Number(this.state.line[index].je)*(1+rate)).toFixed(2);
                          this.state.line[index].dj = num_format(Number(this.state.line[index].dj * (1+rate)));
                          this.state.line[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(2);
                          this.state.nohj[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(12);
                          if(this.state.line[index].sale !== '0'){
                            this.state.line[index].sale.zkje = (-(-Number(this.state.line[index].sale.zkje) - Number(this.state.line[index].sale.zkse))).toFixed(2)
                          }
                        }else{
                          this.state.line[index].dj = num_format(Number(this.state.line[index].je/(1+Number(rate)) / this.state.line[index].sl));
                          this.state.line[index].je = Number(this.state.line[index].je/(1+rate)).toFixed(2);
                          this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2);
                          this.state.nohj[index].se = Number(this.state.line[index].je*rate).toFixed(12);
                          if(this.state.line[index].sale !== '0'){
                            this.state.line[index].sale.zkje = (-(-Number(this.state.line[index].sale.zkje) + Number(this.state.line[index].sale.zkse))).toFixed(2);
                          }
                        }
                        this.props.form.setFieldsValue({
                          [`${this.state.line[index].id+'dj'}`]:this.state.line[index].dj+'',
                          [`${this.state.line[index].id+'je'}`]:this.state.line[index].je+'',
                        })
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
                this.state.line.length>8 && 
                <div style={{display:'flex'}}>
                  <EachCol style={{width:'25%',color:'#2397CA',cursor:'pointer'}} onClick={this.seeDetailFnc}> (请见销货清单) </EachCol>
                  <EachCol style={{width:'10%'}}></EachCol>
                  <EachCol style={{width:'5%'}}></EachCol>
                  <EachCol style={{width:'12%'}}></EachCol>
                  <EachCol style={{width:'15%'}}></EachCol>
                  <EachCol style={{width:'12%'}}>￥{this.state.jehj}</EachCol>
                  <EachCol style={{width:'10%'}}></EachCol>
                  <EachCol style={{borderRight:'0',flexGrow:1}}>￥{this.state.sehj}</EachCol>
                </div>
              }
              {
                this.state.line.length<=8 && this.state.line.map((item,index)=>{
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
                                                                                      this.state.line[index].old_rate = true;
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
                                            this.state.line[index].je = Number(this.state.line[index].dj*this.state.line[index].sl).toFixed(2)
                                            if(this.state.line[index].slv == '2' || this.state.line[index].slv == '3' || this.state.line[index].slv == '4'){
                                              this.state.line[index].se = '0.00'
                                              this.state.nohj[index].se = '0.00'
                                            }else{
                                              if(this.state.djtype === '1'){
                                                this.state.nohj[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(12)
                                                this.state.line[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(2); 
                                              }else{
                                                this.state.nohj[index].se = Number(this.state.line[index].je*rate).toFixed(12)
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
                                              this.state.nohj[index].se = '0.00'
                                            }else{
                                              if(this.state.djtype === '1'){
                                                this.state.nohj[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(12);
                                                this.state.line[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(2); 
                                              }else{
                                                this.state.nohj[index].se = Number(this.state.line[index].je*rate).toFixed(12)
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
                                          this.state.line[index].je = Number(this.state.line[index].dj*this.state.line[index].sl).toFixed(2)
                                          if(this.state.line[index].slv == '2' || this.state.line[index].slv == '3' || this.state.line[index].slv == '4'){
                                            this.state.line[index].se = '0.00'
                                            this.state.nohj[index].se = '0.00'
                                          }else{
                                              if(this.state.djtype === '1'){
                                                this.state.line[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(2); 
                                                this.state.nohj[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(12); 
                                              }else{
                                                this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2)
                                                this.state.nohj[index].se = Number(this.state.line[index].je*rate).toFixed(12)
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
                                            this.state.nohj[index].se = '0.00'
                                          }else{
                                              if(this.state.djtype === '1'){
                                                this.state.line[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(2);
                                                this.state.nohj[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(2);  
                                              }else{
                                                this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2)
                                                this.state.nohj[index].se = Number(this.state.line[index].je*rate).toFixed(2)
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
                                              this.state.nohj[index].se = '0.00'
                                            }else{
                                              if(this.state.djtype === '1'){
                                                this.state.line[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(2); 
                                                this.state.nohj[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(12); 
                                              }else{
                                                this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2)
                                                this.state.nohj[index].se = Number(this.state.line[index].je*rate).toFixed(12)
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
                                              this.state.nohj[index].se = '0.00'
                                            }else{
                                              if(this.state.djtype === '1'){
                                                this.state.line[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(2);
                                                this.state.nohj[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(12);  
                                              }else{
                                                this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2)
                                                this.state.nohj[index].se = Number(this.state.line[index].je*rate).toFixed(12)
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
                                          if(this.state.line[index].old_rate){
                                            this.props.form.setFieldsValue({
                                              [`${item.id+'slv'}`]:this.state.line[index].slv
                                            })
                                            const _this = this;
                                            Modal.confirm({
                                              title: '提示',
                                              content: '该商品或服务已设置了税率，您确定要更改么?',
                                              okText:'确定',
                                              onOk() {
                                                _this.state.line[index].old_rate = false;
                                                _this.state.line[index].slv = value;
                                                if(_this.state.djtype === '1'){
                                                  _this.state.line[index].se = Number((_this.state.line[index].je-(_this.state.line[index].je*rate))*rate).toFixed(2);
                                                  _this.state.nohj[index].se = Number((_this.state.line[index].je-(_this.state.line[index].je*rate))*rate).toFixed(12);  
                                                }else{
                                                  _this.state.line[index].se = Number(_this.state.line[index].je*rate).toFixed(2)
                                                  _this.state.nohj[index].se = Number(_this.state.line[index].je*rate).toFixed(12)
                                                }
                                                _this.setState({})
                                              },
                                              onCancel() {
                                                _this.props.form.setFieldsValue({
                                                  [`${item.id+'slv'}`]:_this.state.line[index].slv
                                                })
                                              },
                                            });
                                            return;
                                          }else{
                                            this.props.form.setFieldsValue({
                                              [`${item.id+'slv'}`]:value
                                            })
                                            this.state.line[index].slv = value;
                                            if(value == '2' || value == '3' || value == '4'){
                                              this.state.line[index].se = '0.00'
                                              this.state.nohj[index].se = '0.00'
                                            }else{
                                              if(this.state.djtype === '1'){
                                                this.state.line[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(2); 
                                                this.state.nohj[index].se = Number((this.state.line[index].je-(this.state.line[index].je*rate))*rate).toFixed(12); 
                                              }else{
                                                this.state.line[index].se = Number(this.state.line[index].je*rate).toFixed(2)
                                                this.state.nohj[index].se = Number(this.state.line[index].je*rate).toFixed(12)
                                              }
                                            }
                                            this.setState({})
                                          }
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
                <div style={{overflow:'hidden'}}><InvoiceTitSpan>名称：</InvoiceTitSpan><ConSpan2>{companyList&&companyList.name}</ConSpan2></div>
                <div style={{overflow:'hidden'}}><InvoiceTitSpan>纳税人识别号：</InvoiceTitSpan><ConSpan2>{companyList&&companyList.tax_number}</ConSpan2></div>
                <div style={{overflow:'hidden'}}><InvoiceTitSpan style={{float:'left'}}>地址、电话：</InvoiceTitSpan><ConSpan2>{companyList&&companyList.address+' '+companyList.telephone}</ConSpan2></div>
                <div style={{overflow:'hidden'}}><InvoiceTitSpan>开户行及账户：</InvoiceTitSpan><ConSpan2>{companyList&&companyList.account_bank+' '+companyList.account_number}</ConSpan2></div>
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
        <InvoiceFooter>
          <FooterCon>
            <FooterInput>
              收款人：<Input value={this.state.skr} onChange={(e)=>this.setState({skr:e.target.value})} placeholder='请输入收款人' style={{width:150}}/>
            </FooterInput>
            <FooterInput>
              复核人：<Input value={this.state.fhr} onChange={(e)=>this.setState({fhr:e.target.value})} placeholder='请输入复核人' style={{width:150}}/>
            </FooterInput>
            <FooterInput>
              开票人：{companyList&&companyList.realname}
            </FooterInput>
            <FooterInput>
              销售方：(章）
            </FooterInput>
          </FooterCon>
        </InvoiceFooter>
        <BottomCon>
          <BottomBtn style={{marginRight:70}} onClick={this.clearInvoice}>清空</BottomBtn>
          <BottomBtn type='primary' onClick={()=>{
            {/*this.props.form.validateFields((err, values) => {
              if(!err){
                if((/macintosh|mac os x/i).test(navigator.userAgent)){
                  Modal.error({
                    title: '开具提示',
                    content: 'Mac系统暂不支持开具纸票',
                  });return;
                }
                const _this = this;
                if(this.props.settingList[0].tax_control_type === 1){
                  Modal.confirm({
                    title: '开具提示',
                    content: (
                      <div>
                        请核对百望开票软件上的发票代码和发票号码与<br/>
                        即将打印的发票号码是否一致
                      </div>
                    ),
                    okText:'确定打印',
                    cancelText:'取消打印',
                    onOk() {
                      _this.handleSubmit()
                    },
                    onCancel() {
                      return;
                    }
                  })
                }else{
                  this.handleSubmit()
                }
              }
            })*/}
            this.handleSubmit()
          }}>开票预览</BottomBtn>
        </BottomCon>
        {this.state.saleModal}
        {this.state.codingModal}
        {this.state.importModal}
        {this.state.seeDetailed}
        <Link id='gotoset' style={{display:'none'}} to='/salesetting'></Link>
      </InvoiceCon>
      }
      {this.state.showSuccess}
      {this.state.previewMoal}
      </div>
    )
  }
}

const PapInvoiceCon = Form.create()(PapInvoiceConMack);
export default PapInvoiceCon;