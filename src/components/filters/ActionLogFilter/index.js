import React from 'react';
import { Form, Button, Select, Input, DatePicker } from 'antd';
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

class ActionLogFilterMake extends React.Component{
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
      this.props.searchLog(values);
    });
  };
  clearSearchFnc = () => {
    this.props.form.resetFields();
    this.props.clearLog();
  };
  disabledDate = (current) => {
    return current.valueOf() > Date.now();
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    const { actionUserList } = this.props;
    return(
      <div className="wait-table-filter" style={{marginBottom:15}}>
        <Form className="ant-advanced-search-form" style={{paddingTop:'1rem',marginBottom:'-5px'}}>
          <WaitLabel>操作时间</WaitLabel>
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
          <WaitLabel>操作人</WaitLabel>
          <WaitRight>
            <FormItem>
              {getFieldDecorator(`action_user`)(
                <Select
                  placeholder="选择操作人"
                  showSearch={true}
                  allowClear = {true}
                  style={{width:'15rem'}}
                  size="default"
                  optionFilterProp='children'
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {
                    actionUserList.map((el,index)=>{
                      return <Option key={`${el.id}`}>{el.realName+'('+el.userName+')'}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </WaitRight>
          <WaitLabel>关键字</WaitLabel>
          <WaitRight>
            <FormItem>
              {getFieldDecorator(`keyword`)(
                <Input
                  placeholder="搜索发票代码、发票号码、关键词"
                  style={{width:'15rem'}}
                  onPressEnter={this.handleSearch}
                />
              )}
            </FormItem>
          </WaitRight>
          <Button type="primary" onClick={this.handleSearch}>搜索</Button>
          {
            this.props.showInfo && <Button style={{marginLeft:'1.5rem'}} onClick={this.clearSearchFnc}>清空</Button>
          }
        </Form>
      </div>
    )
  }
}

const ActionLogFilter = Form.create()(ActionLogFilterMake);
export default ActionLogFilter


