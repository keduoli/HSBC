import React from 'react'
import {NavTitle,GoodsManageFilter,GoodsManageTable} from 'components'
import { Link } from 'react-router'
import {Modal} from 'antd'

class GoodsManagePage extends React.Component{
  state = {
    page:1,
    size:10,
    tax_code:'',
    tax_type:'',
    name:'',
    code:'',
    rate:'',
    spec:'',
    price:'',
    unit:'',
    tax_mark:'',
  }
  clearAllFnc = () => {
    this.setState({
      showInfo:false,
      page:1,
      size:10,
      tax_code:'',
      tax_type:'',
      name:'',
      code:'',
      rate:'',
      spec:'',
      price:'',
      unit:'',
      tax_mark:'',
    })
  }
  searchAllFnc = (values) => {
    this.setState({
      tax_code:values['tax_code']?values['tax_code']:'',
      tax_type:values['tax_name']?values['tax_name']:'',
      name:values['name']?values['name']:'',
      code:values['code']?values['code']:'',
      rate:values['rate']?values['rate']:'',
      spec:values['spec']?values['spec']:'',
      price:values['price']?values['price']+'':'',
      unit:values['units']?values['units']:'',
      tax_mark:values['tax_mark']?values['tax_mark']:'',
      showInfo:true,
    })
  }
  componentWillMount(){
    this.props.getData(this.state)
    this.props.showSetting((res)=>{
      if(res === 21032){
        Modal.error({
          title: '提示',
          content: (
            <div>
              <p>您的企业没有进行销项开票设置</p>
              <p>请在销项管理-销项发票设置页面进行设置</p>
            </div>
          ),
          okText:'去设置',
          onOk() {
            document.getElementById('gotoset').click()
          }})
      }
    })
  }
  render(){
    const { collectionStop,getData,addGoods,editGoods,delGoods,navList,goodsList,codingList,getCodingList,loading,codingLoad,showSetting,settingList } = this.props;
    return(
      <div>
        <NavTitle title="销项管理"
                  submeun='商品管理'/>
        <GoodsManageFilter showInfo={this.state.showInfo}
                           navList={navList}
                           addGoods={addGoods}
                           searchFnc={this.searchAllFnc}
                           codingList={codingList}
                           codingLoad={codingLoad}
                           getCodingList={getCodingList}
                           settingList={settingList}
                           refresh={this.goodsTable&&this.goodsTable.refreshData}
                           clearFnc={this.clearAllFnc}/>
        <GoodsManageTable collectionStop={collectionStop}
                          editGoods={editGoods}
                          goodsList={goodsList}
                          loading={loading}
                          codingLoad={codingLoad}
                          settingList={settingList}
                          codingList={codingList}
                          getCodingList={getCodingList}
                          ref={ref=>this.goodsTable = ref}
                          navList={navList}
                          setPageFnc={(page)=>this.setState({page:page})}
                          state={this.state}
                          delGoods={delGoods}
                          getData={getData}/>
        <Link id='gotoset' style={{display:'none'}} to='/salesetting'></Link>
      </div>
    )
  }
}

export default GoodsManagePage
