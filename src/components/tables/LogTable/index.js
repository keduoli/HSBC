import React from 'react';
import { Table,Pagination } from 'antd';
import styled from 'styled-components';
import { render } from 'react-dom';

const BottomPage = styled.div`
  background:#f7f7f7;
  position:fixed;
  bottom:0px;
  right:0px;
  padding:16px 18px;
	overflow:hidden;
  -webkit-transition: all .2 ease;
  transition: all .2s ease;
`;
class LogTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    };
    this.columns = [{
      title: '操作时间',
      dataIndex: 'time',
      key:'time',
    },{
      title: '操作动作',
      dataIndex: 'msg',
      key:'msg',
      width:'55%',
      render: (text) => {
        const font = text.replace(/null/g,'---');
        const fonts = font.replace(/last/g,'月末');
        return <div>{fonts}</div>;
      }
    },{
      title: '操作结果',
      dataIndex: 'state',
      key:'state',
      render: (text)=>{
        return(
          <div style={{width:"50px",background:'#00A9B3',color:"#fff",textAlign:'center',borderRadius:2}}>{text}</div>
        )
      }
    },{
      title: '操作人',
      dataIndex: 'realname',
      key:'realname',
    },{
      title: '操作ip',
      dataIndex: 'ip',
      key:'ip',
    }];
  };
  componentWillReceiveProps(nextProps){
    const { time_area, keyword, action_user, page} = this.props.state;
    const next = nextProps.state;
    if( next.time_area !== time_area || next.keyword !== keyword || next.action_user !== action_user || next.page !== page){
      const param={
        size:10,
        time_area:next.time_area,
        keyword:next.keyword,
        action_user:next.action_user,
        page:next.page,
      };
      this.props.getLogList(param);
    }
  };
  render(){
    const columns = this.columns;
    const {loading,logList} = this.props;
    return(
      <div style={{marginBottom:60}}>
        <div>
          <Table columns={columns}
                 dataSource={logList.list}
                 loading={loading}
                 pagination={false}
                 rowKey="ROW_ID"
          />
        </div>
        <BottomPage style={{left:this.props.collectionStop?'75px':'210px'}}>
          <Pagination
            total={logList.total}
            style={{float:'right',marginRight:30}}
            current={this.props.state.page}
            onChange={(page, pageSize)=>{
              this.props.setPage(page);
            }}
          />
        </BottomPage>
      </div>
    )
  }
}
export default LogTable;

