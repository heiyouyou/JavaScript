window.onload = function(){
	function $1(id){
		return document.getElementById(id);
	};
	function $2(obj,elements){
		return obj.getElementsByTagName(elements);
	};
	var oWhite = $1("white");
	var oBlack = $1("black");
	var oModel = $1("model");
	var oModelBox = $1("model_box");
	var oHeader = $1("header");
	var oArticle = $1("article");
	var headerEles = $2(oHeader,"*");
	var articleEles = $2(oArticle,"*");
	var pres = $2(oArticle,"pre");
	var ps = $2(oArticle,"p");
	var timer = null;
	oModel.onclick = function(){
		oModelBox.style.display = "block";
		timer = setInterval(function(){//定时消失
			oModelBox.style.display = "none";
			clearInterval(timer);//消失的同时清除定时器
		},5000);
	};
	oBlack.onclick = function(){//夜间模式
		this.style.cssText = "background:#3f3f3f;color:#fff;";
		oWhite.style.cssText ="background:#fff;";
		for(var i=0;i<headerEles.length;i++){
			if(getComputedStyle(headerEles[i]).backgroundColor){//对象元素有颜色值才会执行以下语句
				headerEles[i].style.cssText = "background:#3f3f3f;color:#999;";
				oHeader.style.cssText = "background:#3f3f3f;color:#999;box-shadow:0 1px 1px #111";
			}
		}
		for(var i=0;i<articleEles.length;i++){
			if(getComputedStyle(articleEles[i]).backgroundColor){
				articleEles[i].style.cssText = "background:#3f3f3f;box-shadow:none;";
				oArticle.style.cssText = "background:#3f3f3f;color:#999;";
			}
		}
		for(var i=0;i<pres.length;i++){
			if(getComputedStyle(pres[i]).backgroundColor){
				pres[i].style.cssText = "background:#002b36;color:#839496;";
			}
		}
		for(var i=0;i<ps.length;i++){
			ps[i].style.cssText = "color:#839496;";
		}
	};
	oWhite.onclick = function(){//白天模式
		this.style.cssText = "background:#e9e9e9"; 
		oBlack.style.cssText ="background:#fff;";
		for(var i=0;i<headerEles.length;i++){
			if(getComputedStyle(headerEles[i]).backgroundColor){//对象元素有颜色值才会执行以下语句
				headerEles[i].style.cssText = "background:#fff;color:#555;";
				oHeader.style.cssText = "background:#fff;color:#555;";
			}
		}
		for(var i=0;i<articleEles.length;i++){
			if(getComputedStyle(articleEles[i]).backgroundColor){
				articleEles[i].style.cssText = "background:#fff;";
				oArticle.style.cssText = "background:#fff;";
			}
		}
		for(var i=0;i<pres.length;i++){
			if(getComputedStyle(pres[i]).backgroundColor){
				pres[i].style.cssText = "background:#fdf6e3;color:#839496;";
			}
		}
	};
	function time(){
		var oTimeShow = $1("timeShow");
		var time = new Date();
		var year = time.getFullYear();
		var month = time.getMonth()+1;
		var date = time.getDate();
		var day = time.getDay();
		var hours = time.getHours();
		var min = time.getMinutes();
		var sec = time.getSeconds();
		switch(day){
			case 0:
			day = "星期天";
			break;
			case 1:
			day = "星期一";
			break;
			case 2:
			day = "星期二";
			break;
			case 3:
			day = "星期三";
			break;
			case 4:
			day = "星期四";
			break;		
			case 5:
			day = "星期五";
			break;
			case 6:
			day = "星期六";
			break;
		}
		//将分秒小于10时变成两位数
		function two(n){
			n<10?n="0"+n:n;
			return n;
		};
		oTimeShow.innerHTML = year+"年"+month+"月"+date+"日"+day+two(hours)+":"+two(min)+":"+two(sec);
		oTimeShow.style.cssText = "font-size:14px;text-align:center;"
	};
	time();
	setInterval(time,1000);
};