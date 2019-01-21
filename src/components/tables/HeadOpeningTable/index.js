import React from 'react';
import { Table, Button, Pagination, message, Modal, Select } from 'antd';
import styled from 'styled-components';
import { apiUrl } from 'config';
import { withRouter } from 'react-router';
import { UsedCarInvoice } from 'components'
const DianSpan = styled.span`
  width:18px;
  height:18px;
  float:left;
  background:url(images/invoice.png) no-repeat 0 0;
`;
const PuSpan = styled.span`
  width:18px;
  height:18px;
  float:left;
  background:url(images/invoice.png) no-repeat -36px 0;
`;
const EditSpan = styled.span`
  color:  #2397CA;
  margin-right: 10px;
  cursor: pointer;
`;
const DeleteSpan = styled.span`
  cursor: pointer;
`;
const TitleSpan = styled.span`
  fontSize:13px;
  height:100px;
  color:#fff;
  display:inline-block;
  line-height:100px;
`;
const ZhiSpan = styled.span`
  width:18px;
  height:18px;
  float:left;
  background:url(images/invoice.png) no-repeat -18px 0;
`;
const ZhuanSpan = styled.span`
  width:18px;
  height:18px;
  float:left;
  background:url(images/invoice.png) no-repeat -54px 0;
`;
const BottomPage = styled.div`
  background:#f7f7f7;
  position:fixed;
  bottom:0px;
  right:0px;
  height:60px;
  z-index:100;
  padding:20px 20px 0 20px;
  box-sizing:border-box;
	overflow:hidden;
  -webkit-transition: all .2 ease;
  transition: all .2s ease;
`;
const BtnCon = styled.div`
  width:100%;
  height:50px;
`;
const PrintImg = styled.img`
  width:120px;
  height:120px;
  margin: 0 auto;
  margin-top:20px;
`;
class HeadOpeningTable extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedRowKeys:[],
      deleteModal:'',
    }
  }
  seeCode = () => {
    this.setState({codeModal:<Modal title={<TitleSpan>抬头二维码</TitleSpan>}
                                    style = {{textAlign:'center',top:55}}
                                    visible
                                    width={400}
                                    onCancel={()=>this.setState({codeModal:''})}
                                    footer={null}>
                                <p style={{textAlign:'center',marginTop:20}}>请您扫码提交发票抬头信息</p>
                                <div id="section-to-print">
                                  <PrintImg id='print-img' src={this.props.state.codeUrl}/>
                                </div>
                                <p style={{textAlign:'center',marginTop:30}}>销售方：{this.props.navList.company}</p>
                                <Button type='primary' style={{marginTop:30}} onClick={this.printFnc}>打印</Button>
                             </Modal>})
  }
  printFnc = () => {
    const printHtml = document.getElementById('section-to-print').innerHTML;
    document.getElementById('print-con').style.display = 'block';
    const newWindow =  document.getElementById('print-con');
    newWindow.innerHTML = printHtml;
    window.print();
    document.getElementById('print-con').style.display = 'none';
  }
  componentWillReceiveProps(nextProps){
    const { page,fpzl,gfmc } = this.props.state;
    const next = nextProps.state;
    if(next.page !== page || next.fpzl !== fpzl || next.gfmc !== gfmc){
      const param = {
        size:10,
        fpzl:next.fpzl,
        gfmc:next.gfmc,
        page:next.page,
      };
      this.props.getData(param)
    }
  }
  refreshData = (del) => {
    const {state} = this.props;
    let page;
    if(del === true){
      page = state.page - 1;
    }else{
      page = state.page
    }
    const param = {
      size:10,
      gfmc:state.gfmc,
      fpzl:state.fpzl,
      page:page,
    };
    this.props.getData(param)
    this.setState({selectedRowKeys:[]});
  }
  render(){
    const columns = [{
      title: '序号',
      key:'xh',
      dataIndex: 'xh',
      render:(text,record,index)=>{
        return <div>{index+1}</div>
      }
    },{
      title: '发票类型',
      key:'fpzl',
      dataIndex: 'fpzl',
      render:(text,record,index)=>{
        return  (
          <div>
            {
             ( text === '10' || text === '14' ) && 
             <div>
              <p style={{overflow:'hidden',float:'left'}}>
                <DianSpan/>
              </p>
             </div> 
            }
            {
             ( text === '04' || text === '11' ) && 
             <div>
              <p style={{overflow:'hidden',float:'left'}}>
                <PuSpan/>
              </p>
             </div> 
            }
            {
             ( text === '01' || text === '02' || text === '03' ) && 
             <div>
              <p style={{overflow:'hidden',float:'left'}}>
                <ZhuanSpan/>
              </p>
             </div> 
            }
          </div>
        )
      }
    },{
      title: '发票序列号',
      key:'number',
      dataIndex: 'number',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '购方名称',
      key:'gfmc',
      dataIndex: 'gfmc',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '购方纳税人识别号',
      key:'gfsbh',
      dataIndex: 'gfsbh',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '地址和电话',
      key:'gfdzdh',
      dataIndex: 'gfdzdh',
      render:(text)=><div>{text&&text!==' '?text:'---'}</div>
    },{
      title: '开户行和账户',
      key:'gfyhzh',
      dataIndex: 'gfyhzh',
      render:(text)=><div>{text&&text!==' '?text:'---'}</div>
    },{
      title: '发票开具状态',
      key:'status',
      dataIndex: 'status',
      render:(text)=><div>{text?text:'---'}</div>
    },{
      title: '操作',
      key:'id',
      dataIndex: 'id',
      render:(text,record)=>{
        return (
              <div style={{overflow:'hidden'}}>
                  <EditSpan onClick={()=>{
                    this.props.copyOpening(record);
                    this.props.router.push("/papopening");
                  }}>开具</EditSpan>
                  <DeleteSpan onClick={()=>{
                    this.setState({
                      deleteModal:<Modal title={<TitleSpan>删除提示</TitleSpan>}
                                         style = {{textAlign:'center',top:200}}
                                         onCancel={()=>this.setState({deleteModal:''})}
                                         visible
                                         width={400}
                                         maskClosable={false}
                                         footer={null}
                                  >
                                    <div style={{margin:'10px 0 40px'}}>
                                      确定要删除么？
                                    </div>
                                    <div>
                                      <Button onClick={()=>{this.setState({deleteModal:''})}} style={{marginRight:20}}>取消</Button>
                                      <Button type="primary" onClick={()=>{
                                        const param = {
                                          id:record.title_id
                                        }
                                        this.props.deleteFnc(param,()=>{
                                          const len = this.props.headerList.data.length;
                                          const page = this.props.state.page;
                                          if(len===1&&page>1){
                                            this.refreshData(true);
                                          }else{
                                            this.refreshData();
                                          }
                                          this.setState({deleteModal:''})
                                        });
                                      }}>确定</Button>
                                    </div>
                                  </Modal>
                    })
                  }}>删除</DeleteSpan>
               </div>
              )
      }
    }]
    const {headerList,loading} = this.props;
    return(
        <div style={{overflow:'hidden'}}>
          <BtnCon>
            <Button type="primary" style={{float:'right',marginTop:15}} onClick={this.refreshData}>刷新</Button>
            <Button type="primary" style={{float:'right',marginTop:15,marginRight:20}} onClick={this.seeCode}>查看抬头二维码</Button>
          </BtnCon>
          <div style={{margin:'0 0 60px 0'}}>
            <Table pagination={false}
                   rowKey='title_id'
                   loading={loading}
                   dataSource={headerList.data}
                   columns={columns}/>
          </div>
          <BottomPage style={{left:this.props.collectionStop?'75px':'210px'}}>
            <Pagination total={headerList.count}
                        style={{float:'right'}}
                        current={this.props.state.page}
                        onChange={(page, pageSize)=>{
                          this.props.setPageFnc(page);
                        }}
              />
          </BottomPage>
          {this.state.codeModal}
          {this.state.deleteModal}
        </div>
    )
  }
}

export default withRouter(HeadOpeningTable);
