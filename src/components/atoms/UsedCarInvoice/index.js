import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { num_format,DX,zhMoney } from './../../util'

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
class UsedCarInvoice extends React.Component{
  print = () => {
    const printHtml = document.getElementById('section-to-print').innerHTML;
    document.getElementById('print-con').style.display = 'block';
    const newWindow =  document.getElementById('print-con');
    newWindow.innerHTML = printHtml;
    window.print();
    document.getElementById('print-con').style.display = 'none';
  }
  render(){
    const { scanData } = this.props;
    return(
      <div id="section-to-print">
      <Border>
        {
          scanData.check_time &&
          <span>查验时间：<span style={{color:'#6a6a6a'}}>{scanData.check_time}</span></span>
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
        <table className="vehicle-invoice-table usedcar-invoice" cellSpacing="0">
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
                <p className="invoice-label">买方单位／个人</p>
              </td>
              <td colSpan="4">
                <p className="invoice-con">{scanData.gfdw}</p>
              </td>
              <td>
                <p className="invoice-label">单位代码／身份证号码</p>
              </td>
              <td colSpan="4">
                <p className="invoice-con">{scanData.gfhm}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">买方单位／</p>
                <p className="invoice-label">个人住址</p>
              </td>
              <td colSpan="5">
                <p className="invoice-con">{scanData.gfdz}</p>
              </td>
              <td>
                <p className="invoice-label">电话</p>
              </td>
              <td colSpan="3">
                <p className="invoice-con">{scanData.gfdh}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">卖方单位／个人</p>
              </td>
              <td colSpan="4">
                <p className="invoice-con">{scanData.xfdw}</p>
              </td>
              <td colSpan="2">
                <p className="invoice-label">单位代码／身份证号码</p>
              </td>
              <td colSpan="4">
                <p className="invoice-con">{scanData.xfhm}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">卖方单位／</p>
                <p className="invoice-label">个人住址</p>
              </td>
              <td colSpan="4">
                <p className="invoice-con">{scanData.xfdz}</p>
              </td>
              <td colSpan="1">

              </td>
              <td>
                <p className="invoice-label">电话</p>
              </td>
              <td colSpan="3">
                <p className="invoice-con">{scanData.xfdh}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">车辆牌照</p>
              </td>
              <td colSpan="2">
                <p className="invoice-con">{scanData.cpzh}</p>
              </td>
              <td>
                <p className="invoice-label">登记证号</p>
              </td>
              <td colSpan="2">
                <p className="invoice-con">{scanData.djzh}</p>
              </td>
              <td>
                <p className="invoice-label">车辆类型</p>
              </td>
              <td colSpan="3">
                <p className="invoice-con">{scanData.cllx}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">车架号／车辆</p>
                <p className="invoice-label">识别代码</p>
              </td>
              <td colSpan="2">
                <p className="invoice-con">{scanData.cjhm}</p>
              </td>
              <td>
                <p className="invoice-label">厂牌型号</p>
              </td>
              <td colSpan="2">
                <p className="invoice-con">{scanData.cpxh}</p>
              </td>
              <td>
                <p className="invoice-label">转入地车辆</p>
                <p className="invoice-label">管理所名称</p>
              </td>
              <td colSpan="3">
                <p className="invoice-con">{scanData.cgsmc}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">车价合计</p>
              </td>
              <td colSpan="5">
                <p className="invoice-con">ⓧ{DX(scanData.cjhj)}</p>
              </td>
              <td colSpan="4">
                <p>小写<span style={{marginLeft:8,color:'#61aefe'}}>{scanData.cjhj?`￥${zhMoney(scanData.cjhj)}`:''}</span></p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">经营、拍卖单位</p>
              </td>
              <td colSpan="9">
                <p className="invoice-con">{scanData.jydw}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">经营、拍卖单位</p>
                <p className="invoice-label">地址</p>
              </td>
              <td colSpan="4">
                <p className="invoice-con">{scanData.jydz}</p>
              </td>
              <td>
                <p className="invoice-label">纳税人识别号</p>
              </td>
              <td colSpan="4">
                <p className="invoice-con">{scanData.jysbh}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">开户银行、账号</p>
              </td>
              <td colSpan="5">
                <p className="invoice-con">{scanData.jyyhzh}</p>
              </td>
              <td>
                <p className="invoice-label">电话</p>
              </td>
              <td colSpan="3">
                <p className="invoice-con">{scanData.jydh}</p>
              </td>
            </tr>
            <tr>
              <td rowSpan='2'>
                <p className="invoice-label">二手车市场</p>
              </td>
              <td colSpan="4" rowSpan='2'>
                <p className="invoice-con">{scanData.scmc}</p>
              </td>
              <td>
                <p className="invoice-label">纳税人识别号</p>
              </td>
              <td colSpan="4">
                <p className="invoice-con">{scanData.scsbh}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">地址</p>
              </td>
              <td colSpan="4">
                <p className="invoice-con">{scanData.scdz}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">开户银行、账号</p>
              </td>
              <td colSpan="5" style={{borderRight:0}}>
                <p className="invoice-con">{scanData.scyhzh}</p>
              </td>
              <td>
                <p className="invoice-label">电话</p>
              </td>
              <td colSpan="3">
                <p className="invoice-con">{scanData.scdh}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="invoice-label">备注</p>
              </td>
              <td colSpan="9">
                <p className="invoice-con">{scanData.bz}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </Border>
      </div>
    )
  }
}

export default UsedCarInvoice;

