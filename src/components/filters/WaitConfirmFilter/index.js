import React from 'react';
import { Form, Button, Select, Input } from 'antd';
import styled from 'styled-components';

const FormItem = Form.Item;
const {Option} = Select;

const WaitLabel = styled.span`
  line-height:28px;
  margin-right:10px;
  font-size:12px;
`;
const WaitRight = styled.div`
  display:inline-block;
  margin-right:20px;
`;

class WaitConfirmFilterMake extends React.Component{
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.searchWait(values);
    });
  };
  clearSearchFnc = () => {
    this.props.form.resetFields();
    this.props.clearWait();
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <div className="wait-table-filter">
        <Form className="ant-advanced-search-form" style={{paddingTop:'1rem',marginBottom:'-5px'}}>
          <WaitLabel>发票代码</WaitLabel>
          <WaitRight>
            <FormItem>
              {getFieldDecorator(`fpdm`)(
                <Input placeholder="请输入发票代码" style={{width:'15rem'}} />
              )}
            </FormItem>
          </WaitRight>
          <WaitLabel>发票号码</WaitLabel>
          <WaitRight>
            <FormItem>
              {getFieldDecorator(`fphm`)(
                <Input placeholder="请输入发票号码" style={{width:'15rem'}} />
              )}
            </FormItem>
          </WaitRight>
          <WaitLabel>查验状态</WaitLabel>
          <WaitRight>
            <FormItem>
              {getFieldDecorator(`status`)(
                <Select
                  placeholder="请选择"
                  showSearch={false}
                  allowClear = {true}
                  style={{width:'15rem'}}
                  size="default"
                >
                  <Option key='3'>查验失败</Option>
                  <Option key='1'>等待查验</Option>
                  <Option key='2'>无法查验</Option>
                </Select>
              )}
            </FormItem>
          </WaitRight>
          <Button style={{marginRight:'1.5rem'}} onClick={this.clearSearchFnc}>清空</Button>
          <Button style={{marginRight:'1.5rem'}} 
                  type="primary"
                  onClick={()=>{
                  this.props.checkInvoice();
          }}>{this.props.showCheck===true?'勾选全部':'取消勾选'}</Button>
          <Button type="primary" onClick={this.handleSearch}>搜索</Button>
        </Form>
      </div>
    )
  }
}

const WaitConfirmFilter = Form.create()(WaitConfirmFilterMake);
export default WaitConfirmFilter

