// 格式化金额
export const zhMoney = (v) => {
  if(isNaN(v)){
    return v;
  }
  v = (Math.round((v - 0) * 100)) / 100;
  v = (v === Math.floor(v)) ? v + ".00" : ((v * 10 === Math.floor(v * 10)) ? v
    + "0" : v);
  v = String(v);
  let ps = v.split('.');
  let whole = ps[0];
  let sub = ps[1] ? '.' + ps[1] : '.00';
  let r = /(\d+)(\d{3})/;
  while (r.test(whole)) {
    whole = whole.replace(r, '$1' + ',' + '$2');
  }
  v = whole + sub;

  return v;
};
/**
 * 鼠标滚轮兼容方法
 */
export const addEvent = (function(window, undefined) {
  let _eventCompat = function(event) {
    let type = event.type;
    if (type === 'DOMMouseScroll' || type === 'mousewheel') {
      event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
    }
    if (event.srcElement && !event.target) {
      event.target = event.srcElement;
    }
    if (!event.preventDefault && event.returnValue !== undefined) {
      event.preventDefault = function() {
        event.returnValue = false;
      };
    }
    /*
     ......其他一些兼容性处理 */
    return event;
  };
  if (window.addEventListener) {
    return function(el, type, fn, capture) {
      if (type === "mousewheel" && document.mozFullScreen !== undefined) {
        type = "DOMMouseScroll";
      }
      el.addEventListener(type, function(event) {
        fn.call(this, _eventCompat(event));
      }, capture || false);
    }
  } else if (window.attachEvent) {
    return function(el, type, fn, capture) {
      el.attachEvent("on" + type, function(event) {
        event = event || window.event;
        fn.call(el, _eventCompat(event));
      });
    }
  }
  return function() {};
})(window);

export const start_time = () => {
  let date = new Date();
  let seperator1 = "-";
  let seperator2 = ":";
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

export const three_time = () => {
  let resultDate,year,month,date,hms;
  let currDate = new Date();
  year = currDate.getFullYear();
  month = currDate.getMonth()+1;
  date = currDate.getDate();
  switch(month)
  {
    case 1:
    case 2:
    case 3:
      month += 9;
      year--;
      break;
    default:
      month -= 3;
      break;
  }
  month = (month < 10) ? ('0' + month) : month;
  date = (date < 10) ? ('0' + date) : date;
  if(date === 31){
    date = 30
  }
  if(month === '02' && date >= 29){
    resultDate = year + '-'+month+'-'+'28';
  }else{
    resultDate = year + '-'+month+'-'+date;
  }
  return resultDate;
}

export const one_time = () => {
  let date = start_time()
  let arr = date.split('-');  
  let year = arr[0]; //获取当前日期的年份  
  let month = arr[1]; //获取当前日期的月份  
  let day = arr[2]; //获取当前日期的日  
  let days = new Date(year, month, 0);  
  days = days.getDate(); //获取当前日期中月的天数  
  let year2 = year;  
  let month2 = parseInt(month) - 1;  
  if (month2 == 0) {  
      year2 = parseInt(year2) - 1;  
      month2 = 12;  
  }  
  let day2 = day;  
  let days2 = new Date(year2, month2, 0);  
  days2 = days2.getDate();  
  if (day2 > days2) {  
      day2 = days2;  
  }  
  if (month2 < 10) {  
      month2 = '0' + month2;  
  }  
  if(month2 === '02' && day2 >= 29){
    day2=28
  }
  let t2 = year2 + '-' + month2 + '-' + day2;  
  return t2;
}

export const six_time = () => {
  let date = new Date();
  let seperator1 = "-";
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  let year = date.getFullYear();
  if(month === 6){
    month = '12'
    year = year - 1
  }else if(month === 5){
    month = '11'
    year = year - 1
  }else if(month === 4){
    month = '10'
    year = year - 1
  }else if(month === 3){
    month = '09'
    year = year - 1
  }else if(month === 2){
    month = '08'
    year = year - 1
  }else if(month === 7){
    month ='01'
  }else if(month === 8){
    month = '02'
  }else if(month === 9){
    month = '03'
  }else if(month === 10){
    month = '04'
  }else if(month === 11){
    month = '05'
  }else if(month === 12){
    month = '06'
  }else if(month === 1){
    month = '07'
    year = year - 1
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = strDate;
  }
  if(month === '02' && strDate >= 29){
    strDate = '28';
  }
  if(strDate === 31){
    strDate = 30
  }
  let currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

export const oneyear_time = () => {
  let date = new Date();
  let seperator1 = "-";
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  if(month === '02'&& strDate >= 29){
      strDate = '28';
  }
  let currentdate = date.getFullYear()-1 + seperator1 + month + seperator1 + strDate;
  return currentdate;
}
export const num_format = (num) => {
  if(num.toString().indexOf(".") === -1){
    return num.toFixed(2)+''
  }else if(num.toString().split('.')[1].length>9){
    return num.toFixed(8)+''
  }else{
    return num+''
  }
}

export const DX = (n) => {
  let num;
  if((n+'').split("-").length>1){
    num = (n+'').split("-")[1]
    let unit = "千百拾亿千百拾万千百拾元角分", str = "";
      num += "00";
    let p = num.indexOf('.');
    if (p >= 0)
        num = num.substring(0, p) + num.substr(p+1, 2);
        unit = unit.substr(unit.length - num.length);
    for (let i=0; i < num.length; i++)
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(num.charAt(i)) + unit.charAt(i);
    return '负'+str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
  }else{
    num = n+"";
    let unit = "千百拾亿千百拾万千百拾元角分", str = "";
      num += "00";
    let p = num.indexOf('.');
    if (p >= 0)
        num = num.substring(0, p) + num.substr(p+1, 2);
        unit = unit.substr(unit.length - num.length);
    for (let i=0; i < num.length; i++)
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(num.charAt(i)) + unit.charAt(i);
    return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
  }
}