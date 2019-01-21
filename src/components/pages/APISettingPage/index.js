import React from 'react';
import styled from 'styled-components';
import {NavTitle,APISettingTable} from 'components';

const TableContent = styled.div`
  background:#fff;
  padding:10px;
`;
const BottomCon = styled.div`
	background:#fff;
	margin-top:30px;
	height:25vh;
	font-size:12px;
	overflow:hidden;
	position:relative;
	bottom:0px;
	width:100%;
`;
const BottomLeft = styled.div`
	marginRight:15px;
	textAlign:left;
	margin-top:15px;
`;
const BottomRight = styled.div`
	marginLeft:25px;
	textAlign:left;
	margin-top:15px;
`;
const BottomRightA = styled.a`
	marginLeft:25px;
	textAlign:left;
	margin-top:15px;
	display:block;
	color:#2397CA;
`;
const BottomIcon = styled.div`
	height:88px;
	background:red;
	marginTop:20px;
	width:100%;
	background:url(images/ApiIcon.png) no-repeat;
	background-size:cover;
`;
class APISettingPage extends React.Component {
    componentWillMount(){
        this.props.getData()
        this.props.getParameters()
    }
    render(){
        const { ipallowedList, getData, addFnc, delFnc, editFnc, parametersData, loading } = this.props;
        return (
            <div style={{overflow:"hidden"}}>
                <NavTitle title="企业设置"
                          submeun='API设置'
                          childFont='(最多可添加10个IP地址）'/>
                <TableContent style={{borderLeft:'3px solid #2397CA'}}>
                    <APISettingTable
                        parametersData={parametersData}
                        ipallowedList={ipallowedList}
												getData={getData}
												loading={loading}
                        addFnc={addFnc}
                        delFnc={delFnc}
                        editFnc={editFnc}
                    />
                </TableContent>
                <BottomCon>
									<div style={{fontSize:14,fontWeight:600,marginBottom:5,marginLeft:20,marginTop:20}}>常用参数</div>
									<div style={{overflow:"hidden",marginLeft:20}}>
										<div style={{overflow:"hidden",float:'left'}}>
											<BottomLeft>company_key</BottomLeft>
											<BottomLeft>company_secrect</BottomLeft>
											<BottomLeft>开发文档</BottomLeft>
										</div>
										<div style={{overflow:"hidden",float:'left'}}>
											<BottomRight>{parametersData.company_key?parametersData.company_key:"---"}</BottomRight>
											<BottomRight>联系客服 400-9922-752</BottomRight>
											<BottomRightA target="_blank" href="http://developer.feeclouds.com/">http://developer.feeclouds.com/</BottomRightA>
										</div>
									</div>
								</BottomCon>
            </div>
        )
    }
}

export default APISettingPage;