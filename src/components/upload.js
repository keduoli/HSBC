import { apiUrl } from 'config';

let accessid = '';
let accesskey = '';
let host = '';
let policyBase64 = '';
let signature = '';
let filename = '';
let key = '';
let expire = 0;
let g_object_name = '';
// let g_object_name_type = 'random_name';
let suffix = '';

export const uploadObj = {
  send_request : ()=> {
    var xmlhttp = null;
    if (window.XMLHttpRequest)
    {
      xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (xmlhttp!=null)
    {
      const serverUrl = apiUrl + '/ajax/get/oss/token';
      xmlhttp.open( "GET", serverUrl, false );
      xmlhttp.send( null );
      return xmlhttp.responseText
    }
    else
    {
      alert("Your browser does not support XMLHTTP.");
    }
  },
  get_signature: ()=> {
    //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
    const now = Date.parse(new Date()) / 1000;
    if (expire < now + 100){
      // const obj = this.a.send_request();
      const body = this.a.send_request();
      const res = eval ("(" + body + ")");
      if(res){
        let obj = JSON.parse(res.data);
        if(obj){
          host = obj['host'];
          policyBase64 = obj['policy'];
          accessid = obj['accessid'];
          signature = obj['signature'];
          expire = parseInt(obj['expire']);
          // callbackbody = obj['callback'];
          key = obj['dir'];
          return true;
        }
      }
    }{
      return true;
    }
  },
  random_string: (len)=>{
    len = len || 32;
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    const maxPos = chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
  get_suffix: (filename)=>{
    const pos = filename.lastIndexOf('.')
    if (pos !== -1) {
      suffix = filename.substring(pos)
    }
    return suffix;
  },
  calculate_object_name: (filename)=> {
    suffix = this.a.get_suffix(filename);
    g_object_name = key + this.a.random_string(10) + suffix;
  },
  set_upload_param: (filename) => {
    const ret = this.a.get_signature();
    if(ret){
      if (filename !== '') {
        this.a.calculate_object_name(filename);
      }
      return {
        key: g_object_name,
        policy: policyBase64,
        OssId: accessid,
        // successStatus: '200',
        signature: signature,
        url:host,
      };
    }
  }
};
