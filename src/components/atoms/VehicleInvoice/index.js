import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { zhMoney } from './../../util';

const Border = styled.div`
  width:100%;
  padding:10px;
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
  color:#fc6051;
  text-align:center;
  line-height:3;
`;
const ConSpan = styled.span`
  color:#61aefe;
`;
const OutCon = styled.div`
  display:flex;
  justify-content:space-between;
  padding:10px;
`;
const BottonBtn = styled(Button)`
  margin:0 auto;
  height:30px;
  text-align:center;
`;
class VehicleInvoice extends React.Component{
  print = () => {
    const printHtml = document.getElementById('section-to-print').innerHTML;
    document.getElementById('print-con').style.display = 'block';
    const newWindow =  document.getElementById('print-con');
    document.getElementById('app').style.display = 'none';
    document.getElementsByClassName('ant-modal-content')[0].style.display = 'none';
    newWindow.innerHTML = printHtml;
    window.print();
    document.getElementById('print-con').style.display = 'none';
    document.getElementsByClassName('ant-modal-content')[0].style.display = 'block';
    document.getElementById('app').style.display = 'block';
  }
  render(){
    const {scanData} = this.props;
    return(
      <div id="section-to-print">
      <Border>
        {
          scanData.check_time &&
          <span>查验时间：<span style={{color:'#6a6a6a'}}>{scanData.check_time}</span>{this.props.print &&<Button className='no-print' style={{marginLeft:10}} type='primary' onClick={()=>this.print()}>打印</Button>}</span>
        }
        {
          scanData.title &&
          <InvoiceFont>{scanData.title}</InvoiceFont>
        }
        {
          scanData.zfbz === "Y" &&
          <TabLabel>作&nbsp;&nbsp;废</TabLabel>
        }
        <p style={{marginBottom:8}}>
          <span style={{marginRight:15}}>发票代码：<ConSpan>{scanData.fpdm}</ConSpan></span>
          <span style={{marginRight:15}}>发票号码：<ConSpan>{scanData.fphm}</ConSpan></span>
          <span style={{marginRight:15}}>开票日期：<ConSpan>{scanData.kprq}</ConSpan></span>
        </p>
        <table className="vehicle-invoice-table" cellSpacing="0">
          <tbody>
            <tr>
              <td>
                <p className="invoice-label">机打代码</p>
                <p className="invoice-label">机打号码</p>
                <p className="invoice-label">机器编号</p>
              </td>
              <td colSpan="3">
                <p className="invoice-con">{scanData.fpdm}</p>
                <p className="invoice-con">{scanData.fphm}</p>
                <p className="invoice-con">{scanData.skph}</p>
              </td>
              <td>
                <p className="invoice-label">税<br/>控<br/>码</p>
              </td>
              <td colSpan="5">
                <p className="invoice-con">
                  
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">购买方名称及</p>
                <p className="invoice-label">身份证号码 /</p>
                <p className="invoice-label">组织机构代码</p>
              </td>
              <td colSpan="4">
                <p className="invoice-con">{scanData.ghdw}</p>
                <p className="invoice-con">{scanData.sfzhm}</p>
              </td>
              <td>
                <p className="invoice-label">纳税人识别号</p>
              </td>
              <td colSpan="4">
                <p className="invoice-con">{scanData.gfsbh}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">车辆类型</p>
              </td>
              <td colSpan="2">
                <p className="invoice-con">{scanData.cllx}</p>
              </td>
              <td>
                <p className="invoice-label">厂牌型号</p>
              </td>
              <td colSpan="3">
                <p className="invoice-con">{scanData.cpxh}</p>
              </td>
              <td>
                <p className="invoice-label">产地</p>
              </td>
              <td colSpan="2">
                <p className="invoice-con">{scanData.cd}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">合格证号</p>
              </td>
              <td colSpan="2">
                <p className="invoice-con">{scanData.hgzs}</p>
              </td>
              <td colSpan="2">
                <p className="invoice-label">进口证明书号</p>
              </td>
              <td colSpan="2">
                <p className="invoice-con">{scanData.jkzmsh}</p>
              </td>
              <td>
                <p className="invoice-label">商检单号</p>
              </td>
              <td colSpan="2">
                <p className="invoice-con">{scanData.sjdh}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">发动机号码</p>
              </td>
              <td colSpan="4">
                <p className="invoice-con">{scanData.fdjhm}</p>
              </td>
              <td>
                <p className="invoice-label">车辆识别号代码/车架号码</p>
              </td>
              <td colSpan="4">
                <p className="invoice-con">{scanData.cjhm}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">价税合计</p>
              </td>
              <td colSpan="5" style={{borderRight:0}}>
                <p className="invoice-con">ⓧ{scanData.cn_jshj}</p>
              </td>
              <td colSpan="4">
                <p>小写<span style={{marginLeft:8,color:'#61aefe'}}>{scanData.jshj?`￥${zhMoney(scanData.jshj)}`:''}</span></p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">销货单位名称</p>
              </td>
              <td colSpan="4">
                <p className="invoice-con">{scanData.xhdwmc}</p>
              </td>
              <td>
                <p className="invoice-label">电话</p>
              </td>
              <td colSpan="4">
                <p className="invoice-con">{scanData.dh}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">纳税人识别号</p>
              </td>
              <td colSpan="4">
                <p className="invoice-con">{scanData.nsrsbh}</p>
              </td>
              <td>
                <p className="invoice-label">账号</p>
              </td>
              <td colSpan="4">
                <p className="invoice-con">{scanData.zh}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">地址</p>
              </td>
              <td colSpan="3">
                <p className="invoice-con">{scanData.dz}</p>
              </td>
              <td>
                <p className="invoice-label">开户银行</p>
              </td>
              <td colSpan="5">
                <p className="invoice-con">{scanData.khyh}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">增值税税率</p>
                <p className="invoice-label">或征收率</p>
              </td>
              <td>
                <p className="invoice-con">{scanData.zzssl?`${scanData.zzssl}%`:''}</p>
              </td>
              <td>
                <p className="invoice-label">增值税</p>
                <p className="invoice-label">税额</p>
              </td>
              <td>
                <p className="invoice-con">{scanData.zzsse?`￥${zhMoney(scanData.zzsse)}`:""}</p>
              </td>
              <td>
                <p className="invoice-label">主管税务</p>
                <p className="invoice-label">机关及代码</p>
              </td>
              <td colSpan="5">
                <p className="invoice-con">{scanData.swjg_mc}</p>
                <p className="invoice-con">{scanData.swjg_dm}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">不含税价</p>
              </td>
              <td colSpan="2">
                <p>小写<span style={{marginLeft:8,color:'#61aefe'}}>{scanData.cjfy?`￥${scanData.cjfy}`:''}</span></p>
              </td>
              <td>
                <p className="invoice-label">完税凭证号码</p>
              </td>
              <td colSpan="2">
                <p className="invoice-con">{scanData.wspzhm}</p>
              </td>
              <td>
                <p className="invoice-label">吨位</p>
              </td>
              <td>
                <p className="invoice-con">{scanData.dw}</p>
              </td>
              <td>
                <p className="invoice-label">限乘人数</p>
              </td>
              <td style={{width:60}}>
                <p className="invoice-con">{scanData.xcrs}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </Border>
      </div>
    )
  }
}

export default VehicleInvoice;

