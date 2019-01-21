
import {defaultState} from './selectors'
import * as actions from './actions'

export default (state = defaultState,action)=>{
  switch (action.type){
    case actions.REQUEST(action.action_name).request:
      return {
        ...state,
        [actions.REQUEST(action.action_name).loading]:true
      };

    case actions.REQUEST(action.action_name).success:
      return {
        ...state,
        [action.action_name]:action.data,
        [actions.REQUEST(action.action_name).loading]:false
      };
    case actions.REQUEST(action.action_name).failure:
      return {
        ...state,
        [actions.REQUEST(action.action_name).loading]:false
      };
    case actions.TAB_CHANGE:
      return{
      ...state,
      [actions.TAB_DATA]:action.value
    };
    case actions.REQUEST(action.action_name).error:
      return {
        ...state,
        [actions.REQUEST(action.action_name).loading]:false
      };
    case actions.CHECK_SECOND:
      return {
        ...state,
        ...{
          check:{
            ...state.check,
            ...{[action.name]:action.value},
          }
        }
      };
    default:
      return state
  }
}
