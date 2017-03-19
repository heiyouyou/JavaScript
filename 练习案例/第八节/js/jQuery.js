function $(param,obj){//$("#box") $(".classname")
	var typeP = typeof param;//string
	if(typeP == "function"){
		window.onload = param;
	}else if(typeP.toUpperCase() == "STRING"){
		var fParam = param.charAt(0);
		if(fParam=="#"){
			param = param.substring(1,param.length);
			return document.getElementById(param);
		}else if(fParam=="."){
			param = param.substring(1,param.length);
			obj = obj||document;
			
			//若支持这个方法
			if(document.getElementsByClassName){
				return obj.getElementsByClassName(param);
			}

			var all = obj.getElementsByTagName("*");
			var arrClass = [];
			for(var i=0;i<all.length;i++){
			var arr = all[i].className.split(" ");//["box"]
			for(var j=0;j<arr.length;j++){
				if(arr[j] == param){
					arrClass.push(all[i]);//放入具有box样式的对象
				}
			}
		}
			return arrClass;//返回数组
		}

		
	}
}


//获取对象的样式
function getStyle(obj,attr){
	//attr = attr.trim();
	attr = attr.split(" ");//[,background]"
	attr = attr.join("");//background
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj)[attr];
	}
}


		