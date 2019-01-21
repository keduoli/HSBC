import * as actions from './actions'


export const CHECK_SCAN = "CHECK_SCAN";
export const CHECK_MANUAL = "CHECK_MANUAL";
export const CAN_SHOW_RESULT = "CAN_SHOW_RESULT";
export const CAN_CONTINUATION = "CAN_CONTINUATION";
export const WAIT_CHECK = "WAIT_CHECK";
export const CAN_COLLECTION_STOP = "CAN_COLLECTION_STOP";
export const COPY_OPENING = "COPY_OPENING";
export const HIDE_MEUN = 'HIDE_MEUN';
export const TAB_DATA = 'TAB_DATA';
export const SET_CONTRACT = 'SET_CONTRACT';
export const SET_INVOICEID = 'SET_INVOICEID';
export const CHANGE_ROUTE = 'CHANGE_ROUTE';

let preDefaultState = {
  check:{
    [CHECK_SCAN]:{},
    [CHECK_MANUAL]:{},
    [CAN_SHOW_RESULT]:true,
    [CAN_CONTINUATION]:true,
    [WAIT_CHECK]:{},
    [CAN_COLLECTION_STOP]:false,
    [COPY_OPENING]:false,
    [SET_CONTRACT]:false,
    [HIDE_MEUN]:false,
    [SET_INVOICEID]:false,
    [CHANGE_ROUTE]:false,
  },
  [actions.RQ.NAV_BAR]:{role:[],plugin:{}},
  [actions.RQ.HOME_DATA]:{count:[],time:[]},
  [actions.RQ.COMPANY_LIST]:{},
  [actions.RQ.DEPART_USER]:{list:[]},
  [actions.RQ.DEPART_TREE]:[],
  [actions.RQ.DEPART_SELECT]:[],
  [actions.RQ.INVOICE_LIST]:{list:[],total:0},
  [actions.RQ.INVOICE_POLLING_LIST]:{list:[],tatol:1},
  [actions.RQ.LINK_USER]:[],
  [actions.RQ.WAIT_CONFIRM_LIST]:{total:0,list:[]},
  [actions.RQ.OCR_RETURN]:{},
  [actions.RQ.FOLDER_LIST]:{list:[]},
  [actions.RQ.FOLDER_DETAIL]:{list:[]},
  [actions.RQ.LOG_LIST]:{list:[]},
  [actions.RQ.ACTION_USER]:{list:[]},
  [actions.RQ.BLACKLIST_GET]:{total:0,list:[],status:null},
  [actions.RQ.MONITOR_LIST]:{total:0,list:[]},
  [actions.RQ.APPLICANTLIST_LIST]:{total:0,list:[]},
  [actions.RQ.REPERTROY_LIST]:{total:0,list:[]},
  [actions.RQ.CONTACT_LIST]:{total:0,list:[]},
  [actions.RQ.HEADER_LIST]:{total:0,data:[]},
  [actions.RQ.MESSAGE_LIST]:{total:0,list:[]},
  [actions.RQ.APPLY_LIST]:{total:0,list:[]},
  [actions.RQ.ERROR_MESSAGE]:[],
  [actions.RQ.ORDER_LIST]:{total:0,orders:[]},
  [actions.RQ.LINK_CONSORTIUM]:{forbidens:[]},
  [actions.RQ.EXPORT_ACTION]:{},
  [actions.RQ.XFMC_LIST]:[],
  [actions.RQ.IPALLOWED_LIST]:{total:0,data:[]},
  [actions.RQ.PARAMETERS_GET]:{},
  [actions.RQ.HOMEINVOICE_DATA]:{c_invoice:{},e_invoice:{},s_invoice:{},car_invoice:{},traffic_invoice:{},usedcar_invoice:{}},
  [actions.RQ.HOMECHECK_DATA]:{},
  [actions.RQ.POLLING_HISTORY]:[],
  [actions.RQ.GET_INFO]:{},
  [actions.RQ.ADMIN_LIST]:{},
  [actions.RQ.PRISE_LIST]:{},
  [actions.RQ.TAGS_LIST]:[],
  [actions.RQ.POLLINGTASK_LIST]:[],
  [actions.RQ.CHECK_HISTORY]:{total:1,list:[]},
  [actions.RQ.GOODS_LIST]:{data:[],total:0},
  [actions.RQ.CONTRACT_LIST]:{list:[],total:0},
  [actions.RQ.CUSTOMER_LIST]:{list:[],total:0},
  [actions.RQ.DRAWDOWN_LIST]:{list:[],total:0},
  [actions.RQ.INVOICE_LINK_LIST]:{list:[],total:0},
  [actions.RQ.POLLING_DETAIL_LIST]:{list:[],total:0},
  [actions.RQ.OUTINVOICE_LIST]:{outinvoices:[],total:0},
  [actions.TAB_DATA]:{list:[],activeKey:''}
};
export const defaultState = preDefaultState;
export const getData = (state = defaultState,name) => state[actions.RQ[name]];
export const getLoad = (state = defaultState,name) => state[actions.REQUEST(name).loading];
export const getTabData = (state = defaultState,name) => state[name];
export const getCheckSecond = (state = defaultState,name) => state.check[name];
