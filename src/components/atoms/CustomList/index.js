import React from 'react';
import styled from 'styled-components';
import { Button,Icon } from 'antd';
import { CookieJs } from 'components';
import { Dragact } from 'dragact'

const CustomButton = styled(Icon)`
    position:absolute;
	right:1%;
	top:3%;
	z-index:10;
	transform:rotate(90deg);
	font-size:30px;
	color:#2397CA;
	cursor:pointer;
	&:hover{
    color:#2397FD;
  }
`;
const ShowModal = styled.div`
    position:absolute;
		right:36px;
    top:45px;
    z-index:667;
    background:white;
    border-shadow:0 0 8px #000;
`;
const ShowMack = styled.div`
    position:fixed;
    top:0;
    left:0px;
    right:0;
    bottom:0;
    background:rgba(31,42,66,.3);
    z-index:666;
`;
const Title = styled.div`
    color:#333;
    font-size:13px;
    font-weight:700;
    margin-top:15px;
    margin-left:20px;
`;
const TitleSpan = styled.span`
    color:#999;
    font-size:12px;
    margin-left:20px;
    margin-top:5px;
`;
const ShowBtn = styled(Button)`
    margin-left:15px;
    float:left;
    margin-top:10px;
`;
class CustomList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            show:false,
            showList:CookieJs.getCookie("show"),
            hideList:CookieJs.getCookie("hide")
        }
		}
		recoveryFnc = () => {
			let arr,sor,arr2,sor2;
			arr = [
				{"id":9,"name":"关联客户编号",GridX:0,GridY:10,w:5},
				{"id":1,"name":"发票序号",GridX:0,GridY:10,w:5},
				{"id":2,"name":"提交日期",GridX:0,GridY:10,w:5},
				{"id":4,"name":"录入员工及部门",GridX:0,GridY:10,w:5},
				{"id":5,"name":"发票类型",GridX:0,GridY:10,w:5},
				{"id":6,"name":"销售方名称",GridX:0,GridY:10,w:5},
				{"id":7,"name":"价税合计",GridX:0,GridY:10,w:5},
				{"id":8,"name":"其他备注",GridX:0,GridY:10,w:5},
				{"id":10,"name":"状态",GridX:0,GridY:10,w:5},
				{"id":3,"name":"关联状态",GridX:0,GridY:10,w:5},
			];
			sor = [
					{"id":11,"name":"发票代码",GridX:0,GridY:10,w:5},
					{"id":12,"name":"发票号码",GridX:0,GridY:10,w:5},
					{"id":13,"name":"开票日期",GridX:0,GridY:10,w:5},
					{"id":14,"name":"机器编号",GridX:0,GridY:10,w:5},
					{"id":15,"name":"销售方税号",GridX:0,GridY:10,w:5},
					{"id":16,"name":"销售方地址/电话",GridX:0,GridY:10,w:5.5},
					{"id":17,"name":"销售方开户行/账户",GridX:0,GridY:10,w:5},
					{"id":18,"name":"金额",GridX:0,GridY:10,w:5},
					{"id":19,"name":"税额",GridX:0,GridY:10,w:5},
					{"id":20,"name":"购买方名称",GridX:0,GridY:10,w:5},
					{"id":21,"name":"购买方税号",GridX:0,GridY:10,w:5},
					{"id":22,"name":"购买方地址/电话",GridX:0,GridY:10,w:5},
					{"id":23,"name":"购买方开户行及账户",GridX:0,GridY:10,w:5.5},
					{"id":24,"name":"联次",GridX:0,GridY:10,w:5},
					{"id":25,"name":"备注",GridX:0,GridY:10,w:5},
					{"id":26,"name":"作废标识",GridX:0,GridY:10,w:5},
					{"id":27,"name":"关联借据编号",GridX:0,GridY:10,w:5},
					{"id":28,"name":"关联合同编号",GridX:0,GridY:10,w:5},
			];
		if(!CookieJs.getCookie("show").length && this.props.navList.role !== 1){
				CookieJs.setCookie("show",arr,999);
				this.setState({
					showList: CookieJs.getCookie("show")
				})
		}

		if(CookieJs.getCookie("hide").length === 0 && this.props.navList.role !== 1){
				CookieJs.setCookie("hide",sor,999)
				this.setState({
						hideList: CookieJs.getCookie("hide")
				})
			}
		}
    componentWillMount(){
			this.recoveryFnc()
    }
    handleClick = () => {
        this.setState({
            show:!this.state.show
        })
    }
    modalHide = () => {
			this.setState({
				showList: CookieJs.getCookie("show"),
				hideList: CookieJs.getCookie("hide"),
				show:false
			})
			document.oncontextmenu = function(){
				event.returnValue = true;
			};
    }
    handleReast = () => {
			document.oncontextmenu = function(){
				event.returnValue = true;
			};
			var arr,sor,arr2,sor2;
					arr = [
						{"id":9,"name":"关联客户编号",GridX:0,GridY:10,w:5},
						{"id":1,"name":"发票序号",GridX:0,GridY:10,w:5},
						{"id":2,"name":"提交日期",GridX:0,GridY:10,w:5},
						{"id":4,"name":"录入员工及部门",GridX:0,GridY:10,w:5},
						{"id":5,"name":"发票类型",GridX:0,GridY:10,w:5},
						{"id":6,"name":"销售方名称",GridX:0,GridY:10,w:5},
						{"id":7,"name":"价税合计",GridX:0,GridY:10,w:5},
						{"id":8,"name":"其他备注",GridX:0,GridY:10,w:5},
						{"id":10,"name":"状态",GridX:0,GridY:10,w:5},
						{"id":3,"name":"关联状态",GridX:0,GridY:10,w:5},
					];
					sor = [
							{"id":11,"name":"发票代码",GridX:0,GridY:10,w:5},
							{"id":12,"name":"发票号码",GridX:0,GridY:10,w:5},
							{"id":13,"name":"开票日期",GridX:0,GridY:10,w:5},
							{"id":14,"name":"机器编号",GridX:0,GridY:10,w:5},
							{"id":15,"name":"销售方税号",GridX:0,GridY:10,w:5},
							{"id":16,"name":"销售方地址/电话",GridX:0,GridY:10,w:5},
							{"id":17,"name":"销售方开户行/账户",GridX:0,GridY:10,w:5},
							{"id":18,"name":"金额",GridX:0,GridY:10,w:5},
							{"id":19,"name":"税额",GridX:0,GridY:10,w:5},
							{"id":20,"name":"购买方名称",GridX:0,GridY:10,w:5},
							{"id":21,"name":"购买方税号",GridX:0,GridY:10,w:5},
							{"id":22,"name":"购买方地址/电话",GridX:0,GridY:10,w:5},
							{"id":23,"name":"购买方开户行及账户",GridX:0,GridY:10,w:5},
							{"id":24,"name":"联次",GridX:0,GridY:10,w:5},
							{"id":25,"name":"备注",GridX:0,GridY:10,w:5},
							{"id":26,"name":"作废标识",GridX:0,GridY:10,w:5},
							{"id":27,"name":"关联借据编号",GridX:0,GridY:10,w:5},
							{"id":28,"name":"关联合同编号",GridX:0,GridY:10,w:5},
					];
					CookieJs.setCookie("show",arr,999);
					CookieJs.setCookie("hide",sor,999);
					this.setState({
							show:false,
							showList: arr,
							hideList: sor
					})
        if(this.props.refreshCustomData){
            this.props.refreshCustomData(arr);
            this.props.refreshLoading();
        }
        
    }
    setCookieFnc = () => {
				let arr=[];
				if(!((!!window.ActiveXObject || "ActiveXObject" in window) || !window.WebSocket)){
					let dargList = this.dragact.getLayout();
					for(let i in dargList){
						for(let j in this.state.showList){
							if(dargList[i].key == this.state.showList[j].id){
								this.state.showList[j].GridX = dargList[i].GridX;
								this.state.showList[j].GridY = dargList[i].GridY;
								arr.push(this.state.showList[j])
							}
						}
					}
				}else{
					arr = this.state.showList;
				}
				var sor = this.state.hideList;
				CookieJs.setCookie("show",arr,999);
				CookieJs.setCookie("hide",sor,999);
        this.setState({
            show:false
        })
        if(this.props.refreshCustomData){
            this.props.refreshCustomData(arr);
            this.props.refreshLoading();
        }
    }
    handleHide = (e) => {
        for(var i in this.state.showList){
            if(this.state.showList[i].id == e.target.id && this.state.showList.length>=2){
                var sor = this.state.hideList;
                sor.push(this.state.showList[i]);
                var arr = this.state.showList;
                arr.splice(i,1);
                this.setState({
                    showList : arr,
                    hideList : sor
                })
            }
        }
    }
    handleShow = (e) => {
			for(var i in this.state.hideList){
				if(this.state.hideList[i].id == e.target.id && this.state.showList.length<=9){
					var arr = this.state.showList;
					arr.push(this.state.hideList[i]);
					var sor = this.state.hideList;
					sor.splice(i,1);
					this.setState({
						showList : arr,
						hideList : sor
					})
				}
			}
    }
		myPreventDefault = (eOBJ) => {
			if(eOBJ.preventDefault){
				eOBJ.preventDefault();
			}
			else{
				eOBJ.retrunValue = false;
			}
		};
    render(){
		const showList = this.state.showList;
		let fakeData = [];
		for(let i in showList){
			fakeData.push({ GridX: showList[i].GridX, GridY: showList[i].GridY, w: showList[i].w, h: 1, key: showList[i].id,name: showList[i].name })
		}
			return(
					<div>
							<CustomButton onClick={this.handleClick} type="ellipsis"/>
									<div>
										<ShowModal style={{borderRadius:5,overflow:"hidden",height:this.state.show===true?'480px':0,width:this.state.show===true?450:0,transition:'all .2s ease'}}>
												<div className='custom-list' style={{overflow:"auto",height:'420px',paddingBottom:10}}>
												<div style={{overflow:"hidden",width:'40%',float:'left'}}>
														<Title>列表展示项目</Title>
														<TitleSpan>(双击鼠标直接取消选择)</TitleSpan>
														<div style={{margin:'0 20px',position:'relative'}}>
															{
																((!!window.ActiveXObject || "ActiveXObject" in window) || !window.WebSocket) ?
																<div style={{overflow:'hidden'}}>
																	{
																		this.state.showList.length>0 && this.state.showList.map((value) => {
																				return <ShowBtn key={value.id} id={value.id} onDoubleClick={(e)=>{
																																												this.handleHide(e)
																																											}} type="primary">
																									{value.name}
																								</ShowBtn>
																		})
																	}
																</div>
																:
																<Dragact
																		layout={fakeData}//必填项
																		col={5}//必填项
																		ref={ref=>this.dragact = ref}
																		width={80}//必填项
																		rowHeight={30}//必填项
																		margin={[3,10]}//必填项
																		className='plant-layout'//必填项
																		style={{ background: '#fff' }}//非必填项
																>
																{(item, provided) => {
																	return (
																			<div
																					{...provided.props}
																					{...provided.dragHandle}
																					className='drag-div'
																					id={item.key}
																					onDoubleClick={(e)=>{
																						this.handleHide(e)
																					}}
																					style={{
																							...provided.props.style,
																					}}
																			>
																			{item.name}
																			</div>
																	)
																}}
																</Dragact>
															}
														</div>
												</div>
												<div style={{overflow:"hidden",width:'60%',float:'left'}}>
														<Title>所有可展示的列表展示项目</Title>
														<TitleSpan>(最多可选择十项)</TitleSpan>
														<div>
														{
																this.state.hideList.length>0 && this.state.hideList.map((value) => {
																		return <ShowBtn key={value.id} id={value.id} onClick={this.handleShow} type="dashed">
																						{value.name}
																						</ShowBtn>
																})
														}
														</div>
												</div>
												</div>
												<div style={{overflow:'hidden',height:'50px',padding:'20px 10px 10px 0',float:'right'}}>
														<Button onClick={this.handleReast} style={{marginRight:20}} type="danger">重置</Button>
														<Button onClick={this.modalHide} type="dashed">取消</Button>
														<Button onClick={this.setCookieFnc} style={{marginLeft:20}} type="primary">确定</Button>
												</div>
										</ShowModal>
										{
											this.state.show===true&&
											<ShowMack onClick={this.modalHide}>
											</ShowMack>
										}
								</div>
					</div>
			)
    }
}

export default CustomList;