function ajax(mJson){
	//兼容写法
	var xhr = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	//或者var xhr = new XMLHttpRequest()||new ActiveXObject("Microsoft.XMLHTTP");
	//获取提交的方式类型
	var method = mJson.method || "get";
	//获取请求地址
	var url = mJson.url;
	//获取是异步还是同步如果没有传入默认是取true（异步）
	var asyn = mJson.asyn || true;
	//获取数据
	var data = mJson.data;
	//函数
	var success = mJson.success;
	//判断是否为get提交并且是否有数据传入
	if(method == "get" && data){
		url += "?"+data+"&"+Math.random();
	}
	xhr.open(method,url,asyn);
	//设置请求头
	xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
	//判断是否为post提交并且是否有传入数据
	if(method == "post" && data){
		xhr.send(data);
	}else{
		//获取后台数据
		xhr.send();
	}
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			if(success)success(xhr.responseText);
		};
	};
};	