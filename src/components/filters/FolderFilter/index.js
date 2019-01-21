import React from 'react';
import { Form, Button, Select,DatePicker } from 'antd';
import styled from 'styled-components';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const {Option} = Select;

const WaitLabel = styled.span`
  line-height:28px;
  margin-right:1rem;
`;
const WaitRight = styled.div`
  display:inline-block;
  margin-right:2.3rem;
`;

class FolderFilterMake extends React.Component{
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const rangeValue = values['time_area'];
      if(rangeValue){
        if(rangeValue.length > 0){
          values['time_area'] = [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')];
          values['time_area'] = values['time_area'].join(',');
        }
      }else{
        values['time_area'] = '';
      }
      this.props.searchFile(values);
    });
  };
  clearSearchFnc = () => {
    this.props.form.resetFields();
    this.props.clearFile();
  };
  disabledDate = (current) => {
    return current.valueOf() > Date.now();
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <div className="wait-table-filter">
        <Form className="ant-advanced-search-form" style={{paddingTop:'1rem',marginBottom:'-5px'}}>
          <WaitLabel style={{marginLeft:10}}>上传时间</WaitLabel>
          <WaitRight>
            <FormItem>
              {getFieldDecorator(`time_area`)(
                <RangePicker
                  style={{width:'20rem'}}
                  disabledDate={this.disabledDate}
                />
              )}
            </FormItem>
          </WaitRight>
          <WaitLabel>发票状态</WaitLabel>
          <WaitRight>
            <FormItem>
              {getFieldDecorator(`file_state`,{
                initialValue:'-1',
              })(
                <Select
                  placeholder="选择发票状态"
                  showSearch={false}
                  allowClear = {false}
                  style={{width:'15rem'}}
                  size="default"
                >

                  <Option key="0">未查验</Option>
                  <Option key="1">查验中</Option>
                  <Option key="2">人工识别中</Option>
                  <Option key="3">等待查验</Option>
                  <Option key="4">禁止录入</Option>
                  <Option key="8">查验失败</Option>
                  <Option key="9">查验成功</Option>
                  <Option key="11">查验成功(白名单)</Option>
                  <Option key="-1">全部</Option>
                </Select>
              )}
            </FormItem>
          </WaitRight>
          <div style={{float:"right",marginRight:80}}>
            <Button style={{marginRight:'1.5rem'}} onClick={this.clearSearchFnc}>清空</Button>
            <Button type="primary" onClick={this.handleSearch}>搜索</Button>
          </div>
        </Form>
      </div>
    )
  }
}

const FolderFilter = Form.create()(FolderFilterMake);
export default FolderFilter
