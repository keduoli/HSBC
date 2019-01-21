import React from 'react'
import {NavTitle,ResultTable,ResultFilter,AddCallModal} from 'components'

class ResultPage extends React.Component{
  state={
    fpdm:"",
    fphm:'',
    kprq_area:'',
    dedu_area:'',
    xfmc:'',
    result:'',
    status:'',
    income_month:'',
    page:'',
    size:'',
    order_name:'kprq',
    order_value:'-1',
    page:1,
    size:50,
    exportUrl:"",
    code:"",
    showModal:<AddCallModal cancelModal={()=>{
                                  this.setState({showModal:''})
                                }}
                            getBunding={this.props.getBunding}
                            getPhoneSend={this.props.getPhoneSend}
                            title="绑定手机号"
                            succModal={()=>{
                                  this.setState({showModal:''})
                                  this.props.getData(this.state)}}
                                />
  }
  clearState = () => {
    this.setState({
      fpdm:"",
      fphm:'',
      kprq_area:'',
      dedu_area:'',
      xfmc:'',
      result:'',
      status:'',
      income_month:'',
      page:'',
      size:'',
      order_name:'kprq',
      order_value:'-1',
      page:1,
      size:this.state.size,
    })
    this.ResultTable.clearSorter();
    this.resultFilter.resetFields();
  }
  componentWillMount(){
    this.props.getData(this.state,(res)=>{
      this.setState({code:res.code})
      this.props.settingsGet()
    })
  }
  render(){
    const { deductionReceive,settingsGet,settingsFnc,resultList,getData,exportResult,resultLoad,getDetail,detailList,settingsList,deductionConfirm,confirmList } = this.props;
    return(
      <div>
        <NavTitle title="认证抵扣"
                  submeun='认证结果查询'/>
        {
          this.state.code !== 20008 ?
          <div>
          <ResultFilter
                      getData={getData}
                      ref={ref=>this.resultFilter = ref}
                      state={this.state}
                      exportResult={exportResult}
                      clearState={this.clearState}
                      resultList={resultList}
                      settingsList={settingsList}
                      setSearch={(values)=>{
                      this.ResultTable.clearSorter();
                      this.setState({ fpdm:values['fpdm'],
                                      fphm:values['fphm'],
                                      kprq_area:values['kprq_area'],
                                      xfmc:values['xfmc'],
                                      result:values['result'],
                                      status:values['status'],
                                      dedu_area:values['dedu_area'],
                                      income_month:values['income_month']})
            }}
            />
            <ResultTable
              state={this.state}
              resultList={resultList}
              getData={getData}
              transferFnc={this.props.transferFnc}
              deductionReceive={deductionReceive}
              deductionConfirm={deductionConfirm}
              confirmList={confirmList}
              clearState={this.clearState}
              deductionFnc={this.props.deductionFnc}
              ref={ref=>this.ResultTable = ref}
              resultList={resultList}
              settingsFnc={settingsFnc}
              settingsGet={settingsGet}
              settingsList={settingsList}
              collectionStop={this.props.collectionStop}
              getBunding={this.props.getBunding}
              getPhoneSend={this.props.getPhoneSend}
              resultLoad={resultLoad}
              getDetail={getDetail}
              exportResult={exportResult}
              changePage={(param)=>{
                this.setState({page:param.page})
              }}
              setOrderFnc={(name,val)=>{
                this.setState({order_name:name,order_value:val})
              }}
            />
          </div>
          :
          <div>
            {this.state.showModal}
          </div>
        }
      </div>
    )
  }
}

export default ResultPage
