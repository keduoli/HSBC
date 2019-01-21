import { put, call, takeEvery } from 'redux-saga/effects';
import { message } from 'antd';
import * as actions from './actions';
import api from '../../services/api';

export function* request(action) {
  try {
    const data = yield call(api.request,action.url,action.params);
    if(data.code===0){
      if(action.params && action.params.success)action.params.success(data);
      if(data.data){
        yield put(actions.success(action.action_name, data.data));
      }else{
        yield put(actions.success(action.action_name, data));
      }
    }else if(data.code === 20203 || data.code === 24000 || data.code === 20004){
      message.error('插件过期，请联系客服');
      setTimeout(()=>{
        window.location.assign("/home");
      },1000);
    }else if(data.code === 23014){
      message.error(data.msg);
    }else if(data.code === 10003){
      message.error('登录已超时,请重新登录');
      setTimeout(()=>{
        window.location.assign("/logout");
      },1000);
    }else if(data.code === 10207){
      message.error('该账号已在其他电脑端登录，请重新登录');
      setTimeout(()=>{
        window.location.assign("/logout");
      },1000);
    }else{
      if(action.params && action.params.error){
        action.params.error(data);
      }else{
        message.error(data.msg);
      }
      yield put(actions.error(action.action_name, data));
    }
  }catch (e){
    yield put(actions.failure(action.action_name, {msg:"网络不给力"}));
  }
}
export default function* () {
  for(const req in actions.RQ){
    let preAction = actions.REQUEST(actions.RQ[req]);
    yield takeEvery(preAction.request, request);
  }
}


// export function* watchLastFetchUser() {
//   yield* takeLatest('USER_REQUESTED', fetchUser)
// }



