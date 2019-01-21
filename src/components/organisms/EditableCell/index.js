import { Table, Input, Icon, Button } from 'antd';
import React from 'react';

export default class EditableCell extends React.Component {
  state = {
    value: this.props.value,
		editable: false,
		showError:'',
	}
	
  handleChange = (e) => {
    const value = e.target.value;
		this.setState({ value });
		var reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
		if(value === ""){
			this.setState({
				showError:" * IP地址输入不能为空"
			})
		}else{
			if(reg.test(value)){
				this.setState({
					showError:""
				})
			}else{
				this.setState({
					showError:" * 地址输入格式不正确"
				})
			}
		}
	}
	
  check = () => {
		if(this.state.value === undefined){
			this.setState({
				showError:" * IP地址输入不能为空"
			})
		}else{
			if(this.state.showError === ''){
				this.setState({ editable: false });
				this.props.addFnc({ip:this.state.value},() => {
					this.props.getData()
					this.props.changeShow(true)
				})
			}	
		}
	}
	
  edit = () => {
		this.setState({ editable: true });
	}

	editCheck = () => {
		if(this.state.showError === ''){
			this.setState({ editable: false });
			if (this.props.onChange) {
				this.props.onChange(this.state.value);
			}
		}	
	}

  render() {
    const { value, editable } = this.state;
    return (
      <div style={{position:'relative'}}>
        {
          editable ?
            <div>
              <Input
                style={{width:300}}
                value={value}
                onChange={this.handleChange}
							/>
							<Icon
                type="save"
								onClick={this.editCheck}
								style={{cursor:'pointer',fontSize:20,position:'absolute',left:"111%",top:3}}
              />
							<span style={{color:'red'}}>{this.state.showError}</span>
            </div>
            :
            <div style={{position:'relative'}}>
							{this.props.value || 
								<div style={{float:'left'}}>
									<Input
											autoFocus
											style={{width:300}}
											value={value}
											onChange={this.handleChange}
									/>
									<span style={{color:'red'}}>{this.state.showError}</span>
								</div>
							}
              {
								this.props.value ? 
									<Icon
										type="edit"
										onClick={this.edit}
										style={{cursor:'pointer',marginTop:-2,fontSize:20,marginLeft:10,position:'absolute',left:"110%"}}
									/> 
									:
									<Icon
										type="save"
										onClick={this.check}
										style={{float:'left',marginTop:-2,lineHeight:'28px',cursor:'pointer',fontSize:20,marginLeft:10,position:'absolute',left:"110%"}}
									/>
							}
            </div>
        }
      </div>
    );
  }
}