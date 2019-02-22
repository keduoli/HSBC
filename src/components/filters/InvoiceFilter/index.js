import React from 'react';
import { Form, Row, Col, Button, DatePicker, Select, Modal, Collapse, Icon, message, Input  } from 'antd';
import moment from 'moment';
import { InvoiceExportModal } from 'components';
import { start_time,three_time,oneyear_time,six_time } from './../../util';
import styled from 'styled-components';
const dateFormat = 'YYYY-MM-DD';
const Panel = Collapse.Panel;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const {Option} = Select;
const WarningDiv = styled.div`
  font-size:12px;
  color:red;
`;
class InvoiceFilterMake extends React.Component{
  state={
    showProcessModal:'',
    isSucess:false,
    isShow:false,
    isExport:"",
    isDown:this.props.state.isDown,
    state:[],
    waringPrompt:'',
    maxMoney:'',
    minMoney:'',
    moneyOk:false,
    exportUrl:'',
  }
  componentWillReceiveProps(){
    this.setState({state:this.props.state.state.split(',')})
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        if(this.state.waringPrompt!=='')return;
        const rangeValue = values['time_area'];
        let subTime;
        if(this.props.state.showFilter === false){
          subTime = values['sub_time1'];
        }else{
          subTime = values['sub_time'];
        }
        if(rangeValue){
          if(rangeValue.length > 0){
            values['time_area'] = [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')];
            values['time_area'] = values['time_area'].join(',');
            if(rangeValue[1].valueOf()-rangeValue[0].valueOf()>(365*3*24*3600*1000)){
              message.error("开票日期区间不能超过三年");return;
            }
          }
        }else{
          values['time_area'] = '';
        }
  
        if(subTime){
          if(subTime.length > 0){
            values['sub_time'] = [subTime[0].format('YYYY-MM-DD'), subTime[1].format('YYYY-MM-DD')];
            values['sub_time'] = values['sub_time'].join(',');
            if(subTime[1].valueOf()-subTime[0].valueOf()>(365*3*24*3600*1000)){
              message.error("提交日期区间不能超过三年");return;
            }
            let start = subTime[0].format('YYYYMMDD');
            let end = Number(subTime[1].format('YYYYMMDD'));
            let startNum = Number(start.substring(0,4))+1;
            let startNum2 = start.substring(4,8);
            let startNum3 = Number(startNum+''+startNum2);
          }
        }else{
          values['sub_time'] = '';
        }
        if(values['fpzl']){
          values['fpzl'] = values['fpzl']+'';
        }
        if(values['state']){
          if(values['state'].length > 0){
            values['state'] = values['state'].join(",");
          }else{
            return;
          }
        }else{
          return;
        }
        if(values['zfbz'] === '1'){
          values['zfbz'] = '';
        }
        this.props.changeIsDown(true)
        values['jshj_min'] = this.state.minMoney;
        values['jshj_max'] = this.state.maxMoney;
        this.props.searchFnc(values);
      }
    });
  };
  clearSearchFnc = () => {
    this.setState({
      waringPrompt:'',
      maxMoney:'',
      minMoney:'',
      moneyOk:false,
      exportUrl:'',
    })
    this.props.form.resetFields();
    this.props.clearFnc();
  };
  exportFile = () => {
    const { state } = this.props;
    let arr;
    if(state.state.length>2){
      arr = state.state.split(",");
    }else{
      arr = state.state+""
    }
    const param = {
      size:10,
      page:state.page,
      state:state.state,
      time_area:state.time_area,
      keyword:state.keyword,
      fpzl:state.fpzl,
      is_success:state.is_success,
      entry_id:state.entry_id,
      sub_time:state.sub_time,
      fplc:state.fplc,
      xfmc:state.xfmc,
      zfbz:state.zfbz,
      create_time:state.create_time,
      order:JSON.stringify({'order_name':state.order_name,'order_value':state.order_value}),
      select_all:0,
      jshj_min:state.jshj_min,
      jshj_max:state.jshj_max,
      department_ids:state.department_ids,
      es_search:state.es_search,
      cus_num:state.cus_num,
      fpdm:state.fpdm,
      fphm:state.fphm,
      fkzt:state.fkzt,
      gfmc:state.gfmc,
      con_id:state.con_id,
      dd_id:state.dd_id,
      export:'1',
    }
    if(arr.indexOf("5")>=0 || arr.indexOf("6")>=0){
      message.error("只有已提交的发票才能导出"); return;
    }
    this.setState({isShow:true})
    this.props.exportAllFnc(param,(res)=>{
      this.setState({isSucess:true,exportUrl:res})
    });
  }
  maskShow = () => {
    if(this.props.invoiceList.total >=2000){
      this.errorExport()
    }else{
      this.exportFile();
    }
  }
  errorExport = () => {
    Modal.error({
      title: <div style={{color:'white',marginBottom:30}}>操作提示</div>,
      className: "blue",
      content: (
        <div style={{fontSize:15,lineHeight:2}}>
          <p>单次导出数据上限为2000条</p>
          <p>本次导出数据已经超出上限</p>
          <p>请分批次导出</p>
        </div>
      ),
      onOk() {}
    });
  }
  minChange = (e) => {
    const minMoney = e.target.value;
    const reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
    this.setState({minMoney})
    if(minMoney!==''){
      if(!reg.test(minMoney)){
        this.setState({waringPrompt:'只能输入正数且最多两位小数',moneyOk:false});
      }else if(this.state.maxMoney!=='' && Number(minMoney)>Number(this.state.maxMoney)){
        this.setState({waringPrompt:'最小金额不能大于最大金额',moneyOk:false});
      }else if(this.state.maxMoney!=='' && !reg.test(this.state.maxMoney)){
        this.setState({waringPrompt:'只能输入正数且最多两位小数',moneyOk:false});
      }else if(this.state.maxMoney!=='' && this.state.maxMoney.length>20){
        this.setState({waringPrompt:'价税合计金额不能超过20位',moneyOk:false});
      }else if(minMoney.length>20){
        this.setState({waringPrompt:'价税合计金额不能超过20位',moneyOk:false});
      }else{
        this.setState({waringPrompt:'',moneyOk:true})
      }
    }else{
      if(reg.test(this.state.maxMoney)){
        this.setState({waringPrompt:'',moneyOk:true})
      }else{
        this.setState({waringPrompt:'',moneyOk:false})
      }
    }
  }
  maxChange = (e) => {
    const maxMoney = e.target.value;
    const reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
    this.setState({maxMoney})
    if(maxMoney!==''){
      if(!reg.test(maxMoney)){
        this.setState({waringPrompt:'只能输入正数且最多两位小数',moneyOk:false});
      }else if(this.state.minMoney!=='' && Number(maxMoney)<Number(this.state.minMoney)){
        this.setState({waringPrompt:'最大金额不能小于最小金额',moneyOk:false});
      }else if(this.state.minMoney!=='' && !reg.test(this.state.minMoney)){
        this.setState({waringPrompt:'只能输入正数且最多两位小数',moneyOk:false});
      }else if(this.state.minMoney!=='' && this.state.minMoney.length>20){
        this.setState({waringPrompt:'价税合计金额不能超过20位',moneyOk:false});
      }else if(maxMoney.length>20){
        this.setState({waringPrompt:'价税合计金额不能超过20位',moneyOk:false});
      }else{
        this.setState({waringPrompt:'',moneyOk:true})
      }
    }else{
      if(reg.test(this.state.minMoney)){
        this.setState({waringPrompt:'',moneyOk:true})
      }else{
        this.setState({waringPrompt:'',moneyOk:false})
      }
    }
  }
  render(){
    const icon = <Icon style={{color:"#108ee9"}} type="down" />
    const { getFieldDecorator } = this.props.form;
    const {entryUserList} = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        lg: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        lg: { span: 18 },
      },
    };
    const formItemLayout1 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        lg: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        lg: { span: 16 },
      },
    };
    const date = new Date();
    return(
        <Form className="ant-advanced-search-form invoice_filter" style={{borderLeft:'3px solid #2397CA',background: '#fff',padding:'10px 0 0 5px'}}>
          {
            this.props.state.showFilter === true ?
            <div>
              <Row gutter={5}>
                <Col span={8} key={30}>
                  <FormItem {...formItemLayout} label='客户编号'>
                    {getFieldDecorator(`cus_num`,{
                      rules: [{
                        validator: (rule, value, callback)=>{
                          if(value){
                            if(value.length>20){
                              callback('客户编号不能超过20位');
                            }
                          }
                          callback();
                        },
                      }],
                    })(
                      <Input/>
                    )}
                  </FormItem>
                </Col>
                <Col span={6} key={5}>
                  <FormItem {...formItemLayout} label='状态'>
                    {getFieldDecorator(`state`,{
                      initialValue:this.state.state,
                      rules: [{
                        validator: (rule, value, callback)=>{
                          if(value.length<1){
                            callback("最少选择一项");
                          }
                          callback();
                        },
                      }],
                    })(
                      <Select
                        mode="multiple"
                        placeholder="请选择"
                        showSearch={false}
                        allowClear = {true}
                        size = 'large'
                      >
                        <Option key='2'>已提交</Option>
                        <Option key='5'>已删除</Option>
                        <Option key='6'>已归档</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={4} key={2}>
                  <FormItem {...formItemLayout1} label='发票类型'>
                    {getFieldDecorator(`fpzl`)(
                      <Select
                        mode="multiple"
                        placeholder="请选择"
                        allowClear={true}
                        size='large'
                      >
                        <Option key='04,11,98'>普通发票</Option>
                        <Option key='01,02,99'>专用发票</Option>
                        <Option key='10'>电子发票</Option>
                        <Option key='14'>通行费发票</Option>
                        <Option key='03'>机动车发票</Option>
                        <Option key='15'>二手车发票</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={5} key={33}>
                  <FormItem {...formItemLayout1} label='关联状态'>
                    {getFieldDecorator(`fkzt`)(
                      <Select placeholder="请选择"
                              allowClear = {true}
                              size='large'
                      >
                        <Option key='0'>未关联</Option>
                        <Option key='1'>部分关联</Option>
                        <Option key='-1'>全部关联</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={5}>
                <Col span={8} key={6}>
                  <FormItem {...formItemLayout} label='提交日期'>
                    {getFieldDecorator(`sub_time`)(
                      <RangePicker
                      />
                    )}
                  </FormItem>
                </Col>
                  <Col span={6} key={1}>
                    <FormItem {...formItemLayout} label='开票日期'>
                      {getFieldDecorator(`time_area`)(
                        <RangePicker
                          style={{width:'100%'}}
                          size='large'
                        />
                      )}
                    </FormItem>
                  </Col>
                <Col span={4} key={10}>
                  <FormItem {...formItemLayout1} label='查验结果'>
                    {getFieldDecorator(`is_success`)(
                      <Select
                        placeholder="请选择"
                        onChange={this.handleChange}
                        size = 'large'
                      >
                        <Option key='1'>查验成功</Option>
                        <Option key='0'>查验失败</Option>
                        <Option key='2'>全部</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={5} key={11}>
                  <Button type="primary"  style={{marginLeft:'10%',height:30}} onClick={this.handleSearch}>搜索</Button>
                  {
                    this.props.showInfo &&
                      <Button style={{marginLeft:10}} onClick={this.clearSearchFnc}>清空</Button>
                  }
                </Col>
              </Row>
              <div style={{position:'relative',
                            height:this.props.state.isDown===false?0:120,
                            overflow:'hidden',
                            transition:'all .2s ease'
                          }}>
                <Row gutter={5}>
                      <Col span={8} key={20}>
                        <FormItem {...formItemLayout} label='价税合计区间'>
                          <div style={{overflow:'hidden'}}>
                            <Input placeholder='请输入最低值' style={{float:'left',width:'45%'}} onChange={this.minChange} value={this.state.minMoney}/>
                            <span style={{width:'10%',textAlign:'center',float:'left'}}>~</span>     
                            <Input placeholder='请输入最高值' style={{float:'right',width:'45%'}} value={this.state.maxMoney} onChange={this.maxChange}/>
                          </div>
                          <WarningDiv>{this.state.waringPrompt}</WarningDiv>
                        </FormItem>
                      </Col>
                      <Col span={6} key={13}>
                        <FormItem {...formItemLayout} label='销方名称'>
                          {getFieldDecorator(`xfmc`,{
                            rules: [{
                              validator: (rule, value, callback)=>{
                                if(value){
                                  if(value.length>30){
                                    callback('销方名称不能超过30位');
                                  }
                                }
                                callback();
                              },
                            }],
                          })(
                            <Input/>
                          )}
                        </FormItem> 
                      </Col>
                    <Col span={4} key={14}>
                      <FormItem {...formItemLayout1} label='作废标识'>
                        {getFieldDecorator(`zfbz`)(
                          <Select
                            placeholder="请选择"
                            size='large'
                            allowClear={true}
                          >
                            <Option key='Y'>已作废</Option>
                            <Option key='N'>未作废</Option>
                            <Option key='1'>全部</Option>
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                  {
                    this.props.showInfo &&
                    <Col span={6} key={15}>
                      <div style={{marginLeft:'9%'}}>
                        <span style={{color:'#2476F8',marginRight:6,marginTop:8,fontSize:12,float:'left'}}>共有{this.props.invoiceList.total}条发票信息</span>
                        {
                          this.props.invoiceList.list.length > 0 &&
                          <div>
                            <Button style={{float:'left'}} onClick={()=>{
                              this.maskShow()
                            }}>导出全部</Button>
                            <Button type="primary" onClick={()=>{
                              this.props.checkInvoice();
                            }} style={{marginLeft:3,float:"left"}}>{this.props.showCheck===true?'勾选全部':'取消勾选'}</Button>
                          </div>
                        }
                      </div>
                    </Col>
                  }
              </Row>
                <Row gutter={5}>
                  <Col span={8} key={8}>
                    <FormItem {...formItemLayout} label='录入员工'>
                      {getFieldDecorator(`entry_id`)(
                        <Select placeholder="请选择"
                                allowClear = {true}
                                showSearch={true}
                                optionFilterProp='children'
                                size='large'
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                          {
                            entryUserList && entryUserList.map((item)=>{
                              return <Option key={item.id}>{item.realName+'('+item.userName+')'}</Option>
                            })
                          }
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={6} key={38}>
                    <FormItem {...formItemLayout} label='发票号码'>
                      {getFieldDecorator(`fphm`,{
                        rules: [{
                          validator: (rule, value, callback)=>{
                            if(value){
                              if(value.length>15){
                                callback('发票号码不能超过15位');
                              }
                            }
                            callback();
                          },
                        }],
                      })(
                        <Input/>
                      )}
                    </FormItem>
                  </Col>
                <Col span={4} key={34}>
                  <FormItem {...formItemLayout1} label='购方名称'>
                    {getFieldDecorator(`gfmc`,{
                      rules: [{
                        validator: (rule, value, callback)=>{
                          if(value){
                            if(value.length>30){
                              callback('购方名称不能超过30位');
                            }
                          }
                          callback();
                        },
                      }]
                    })(
                      <Input/>
                    )}
                  </FormItem>
                </Col>
                <Col span={5} key={35}>
                  <FormItem {...formItemLayout1} label='发票代码'>
                    {getFieldDecorator(`fpdm`,{
                      rules: [{
                        validator: (rule, value, callback)=>{
                          if(value){
                            if(value.length>15){
                              callback('发票代码不能超过15位');
                            }
                          }
                          callback();
                        },
                      }],
                    })(
                      <Input/>
                    )}
                  </FormItem>
                </Col>
                </Row>
              </div>
              <Row gutter={5} onClick={() => {
                this.props.changeIsDown(!this.props.state.isDown)
              }} style={{textAlign:'center',cursor:'pointer'}}>
                <Icon type={this.props.state.isDown===true?"up":'down'} style={{
                    transition:'all .2s ease'
                }} />
              </Row>
            </div>
            :
            <div style={{overflow:'hidden'}}>
              <Row gutter={5}>
                <Col span={5} key={1}>
                  <FormItem {...formItemLayout1} label='开票日期'>
                    {getFieldDecorator(`time_area`)(
                      <RangePicker
                        style={{width:'100%'}}
                        size='large'
                      />
                    )}
                  </FormItem>
                </Col>
                  <Col span={8} key={17}>
                    {
                      this.props.state.refresh === true &&
                      <FormItem {...formItemLayout} label='提交日期'>
                        <Select style={{float:'left',width:'30%'}} value={this.props.state.key} onChange={(key)=>this.props.dateChange(key)}>
                          <Option key='7'>最近一个月</Option>
                          <Option key='1'>最近三个月</Option>
                          <Option key='2'>最近六个月</Option>
                          <Option key='3'>最近一年</Option>
                          <Option key='4'>{date.getFullYear()-1}</Option>
                          <Option key='5'>{date.getFullYear()-2}及以前</Option>
                          <Option key='6'>自定义时间</Option>
                        </Select>
                        {getFieldDecorator(`sub_time1`,{
                          initialValue:this.props.state.date
                        })(
                          <RangePicker
                            style={{width:'65%',float:'right'}}
                            size='large'
                          />
                        )}
                      </FormItem>
                    }
                  </Col>
                <Col span={4} key={2}>
                  <FormItem {...formItemLayout1} label='发票类型'>
                    {getFieldDecorator(`fpzl`)(
                      <Select
                        mode="multiple"
                        placeholder="请选择"
                        allowClear={true}
                        size='large'
                      >
                        <Option key='04,11,98'>普通发票</Option>
                        <Option key='01,02,99'>专用发票</Option>
                        <Option key='10'>电子发票</Option>
                        <Option key='14'>通行费发票</Option>
                        <Option key='03'>机动车发票</Option>
                        <Option key='15'>二手车发票</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                  <Col span={5} key={5}>
                    <FormItem {...formItemLayout} label='状态'>
                      {getFieldDecorator(`state`,{
                        initialValue:this.state.state,
                        rules: [{
                          validator: (rule, value, callback)=>{
                            if(value.length<1){
                              callback("最少选择一项");
                            }
                            callback();
                          },
                        }],
                      })(
                        <Select
                          mode="multiple"
                          placeholder="请选择"
                          showSearch={false}
                          allowClear = {true}
                          size = 'large'
                        >
                          <Option key='2'>已提交</Option>
                          <Option key='3'>已导出</Option>
                          <Option key='4'>已删除</Option>
                          <Option key='6'>已归档</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                <Col span={2} key={99}>
                  <Button type="primary"  style={{marginLeft:'10px'}} onClick={this.handleSearch}>搜索</Button>
                </Col>
              </Row>
              <div style={{overflow:'hidden'}}>
                <div style={{margin:'0 auto',overflow:'hidden',width:'35%'}}>
                  {
                    this.props.showInfo && <span style={{color:'#2476F8',marginRight:6,marginTop:8,fontSize:12,float:'left'}}>共有{this.props.invoiceList.total}条发票信息</span>
                  }
                  {
                    this.props.invoiceList.list.length > 0 && this.props.showInfo &&
                    <Button style={{float:'left'}} onClick={()=>{
                      this.maskShow()
                    }}>导出全部</Button>
                  }
                  {
                    this.props.invoiceList.list.length > 0 && this.props.showInfo &&
                    <Button onClick={()=>{
                      this.props.checkInvoice();
                    }} style={{marginLeft:10,float:'left'}}>{this.props.showCheck===true?'勾选全部':'取消勾选'}</Button>
                  }
                  {
                    this.props.showInfo &&
                    <Button style={{marginLeft:10,float:'left'}} onClick={this.clearSearchFnc}>清空</Button>
                  }
                </div>
              </div>
            </div>
          }
          {this.state.isShow&&<InvoiceExportModal state={this.state}
                                                  Allcount={this.props.invoiceList.total}
                                                  exportFile={this.exportFile}
                                                  exportUrl={this.state.exportUrl}
                                                  closeModal={()=>this.setState({isShow:false,isSucess:false})}/>
          }
        </Form>
    )
  }
}

const InvoiceFilter = Form.create()(InvoiceFilterMake);
export default InvoiceFilter
