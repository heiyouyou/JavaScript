function $(param,obj){//jQuery中的传入id和className形式：$("#id"),$(".className")
	var typeP = typeof param;//将传入的param进行类型判断
	if(typeP == "function"){//判断传入的param是函数还是字符串
		window.onload = param;
	}else if(typeP.toUpperCase() == "STRING"){//调用toUpperCase()是为了解决不同浏览器因为对字符串string的大小写判断不一
		var fParam = param.charAt();//charAt()不传入任何参数，默认是返回下标为0的字符,这里的意思是用来判断传入id还是className
		if(fParam == "#"){
			param = param.substring(1,param.length);//从param下标1截取后面部分
			return document.getElementById(param);//返回传入的id给函数$()
		}else if(fParam == "."){
			param = param.substring(1,param.length);
			obj = obj||document;
			//这个方法支持ie9+和其他浏览器
			if(document.getElementsByClassName){//只有浏览器支持才会执行if语句里的东西
				return obj.getElementsByClassName(param);//获取obj对象下类名为传入的param的元素而组成的数组，然后返回数组给函数$
			}
			var all = obj.getElementsByTagName("*");
			var arrClass = [];//用一个空数组来接收具有类样式box的元素
			for(var i=0;i<all.length;i++){
				var arr = all[i].className.split(" ");//通过split()以空格号来划分具有多个类样式的元素的className切割成数组用arr来存，注意className都是字符串！！！
				for(var j=0;j<arr.length;j++){//循环嵌套循环，每个循环的边界变量最好不要相同，易引起混乱
					if(arr[j] == param){
						arrClass.push(all[i]);//将具有box样式的元素存入原来的空数组arrClass
					}
				}
			}
			return arrClass;//返回一个传入类样式(类名)为param的数组
		}
	}
}

//获取对象的样式属性
function getStyle(obj,attr){
	//attr = attr.trim();
	attr = attr.split(" ");
	attr = attr.join("");
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj)[attr];
	}
}