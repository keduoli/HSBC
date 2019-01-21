
const setCookie = (_name, _value, _date) => {
	let obj = {
		tmp : _value
	};
	let str = JSON.stringify(obj);
	str = encodeURIComponent(str);
	if( _date ){
		let d = new Date();
		d.setDate( d.getDate()+_date );
		document.cookie = _name+"="+str+"; path=/; expires="+d.toGMTString();
	}else{
		document.cookie = _name+"="+str+"; path=/";		
	}
}

const getCookie = (_name) => {
	let str = document.cookie;
	let arr = str.split("; ");
	for( let i=0,l=arr.length; i<l; i++){
		let col = arr[i].split("=");
		if( col[0] == _name ){
			let str = decodeURIComponent(col[1]);
			let obj = JSON.parse(str);
			return obj.tmp;
		}
	}
	return "";
}

export default { setCookie, getCookie }






