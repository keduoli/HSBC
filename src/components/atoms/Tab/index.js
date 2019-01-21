import React from 'react'
import styled from 'styled-components'
import {Tabs} from 'antd'
import {Link} from 'react-router'
const TabPane = Tabs.TabPane;
const TabCon = styled.div`
    position:fixed;
    top:50px;
    padding-top:5px;
    right:10px;
    z-index:500;
    height:48px;
    -webkit-transition: all .2 ease;
    transition: all .2s ease;
    background:#f7f7f7;
    overflow:hidden;
    color:#2397CA;
`;
class Tab extends React.Component{
    state={
        activeKey:"",
    }
    onChange = (activeKey) => {
        const newValue = this.props.tabData;
        newValue['activeKey'] = activeKey;
        // this.setState({activeKey})
        this.props.tabChange(newValue)
        this.props.router.push('/'+activeKey)
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    remove = (targetKey) => {
        this.props.removeRoute(targetKey)
        const {tabData:{list,activeKey}} = this.props;
        let lastIndex = "",key = "";
        list.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = (i - 1)<0?0:(i-1);
            }
        });
        const panes = list.filter(pane => pane.key !== targetKey);
        if(panes.length!==0){
            if (lastIndex >=0) {
            key = panes[lastIndex].key;
            }
        }
        this.props.tabChange({list:panes,activeKey:key})
        if(key){
            this.props.router.push('/'+key)
        }else{
            this.props.router.push('/home')
        }
        
    }
    close = () => {
        this.setState({modal:""});
    }
    render(){
    const {tabData} = this.props;
        return (
            <TabCon style={{left:this.props.collectionStop===false?210:75}}>
            <Tabs
                onChange={this.onChange}
                activeKey={tabData.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
                hideAdd={true}	
                size="large"
            >
            {tabData.list.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}></TabPane>)}
            </Tabs>
            </TabCon>
        )
    }
}
export default Tab