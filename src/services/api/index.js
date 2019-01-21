import 'whatwg-fetch'
import { stringify } from 'query-string'
import { apiUrl } from 'config'

export const checkStatus = (response) => {
  if (response.ok) {
    return response
  }
  // const error = new Error(`${response.status} ${response.statusText}`);
  // error.response = response;
  throw error
};
export const parseJSON = response => response.json();
export const getCookie = (name) => {
  let r = document.cookie.match("\\b" + name + "=([^;]*)\\b");     
  return r ? r[1] : undefined;
};
const api = {};

//params,method
api.request = (endpoint, {params, ...settings}) => {
  endpoint = endpoint.indexOf('http') === 0 ? endpoint : apiUrl + endpoint;

  let query = { timeStamp:(new Date()).valueOf() };
  endpoint += `?${stringify(query)}`;

  //默认值
  settings = {...{
    method:'get',
    credentials:'include',
    headers:{
      // 'Authorization': getCookie('_code'),
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept-Language': settings.locale?settings.locale:"zh"
    }
  },...settings};

  if(settings.method === "post"){
    params = {
      ...params,
    };
    if(settings.formData){
      delete settings.headers['Accept'];
      delete settings.headers['Content-Type'];
    }
    settings = {...settings,...{
      body:settings.formData?settings.formData:stringify(params)
    }}

  }else{
    endpoint += `&${stringify(params)}`
  }
  return fetch(endpoint, settings)
    .then(checkStatus)
    .then(parseJSON)
};


export default api
