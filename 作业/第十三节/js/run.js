//封装通过元素名称获取元素的方法
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
};
//封装获取id的方法
function eleArr(obj,ele){
	return obj.getElementsByTagName(ele);
};
//封装通过类样式获取元素的方法
function classArr(obj,classname){
	return obj.getElementsByClassName(classname);
};
//封装获取样式的方法
function $1(id){
	return document.getElementById(id);
};
//封装siblings方法
function siblings(obj,callback){
	var pDoms = obj.parentNode.children;
	var arr = [].slice.call(pDoms);
	arr.filter(function(others){
		if(others!=obj){
			callback.call(others);
		}
	})
};
//封装具有过渡效果的动画方法
function Run(obj,json,times,callback){
	//清除上一次结束动画
	clearInterval(obj.timer);
	//动态给对象绑定一个定时器
	obj.timer = setInterval(function(){
		//定义一个开着的锁，用来进行判断是否清除定时器
		var mark = true;
		//先将json里的值全拿出来才会跳出循环执行下一次定时器
		for(var attr in json){
			//这里不要放在定时器外面，要每次更新pos的值,并且判断对象元素有没有属性attr，没有就pos赋值0
			if(attr == "opacity"){
				var pos = getStyle(obj,attr)*100;
			}else{
				//获取样式其它属性（具有px的属性，若没有则用0代替）
				var pos = parseInt(getStyle(obj,attr))||0;
			}
			//拿到json对象里的目标值
			var target = json[attr];
			//将速度进行动态减速
			var speed = (target-pos)*0.4;
			/*//当target大于pos时
			if(speed>0){
				speed = Math.ceil(speed);
			}
			//当target小于pos时
			if(speed<0){
				speed = Math.floor(speed);
			}*/
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			//当pos达不到目标位置时继续改变属性值
			if(pos!=target){
				//每次从上次的位置改变
				if(attr == "opacity"){
					obj.style[attr] = (pos+speed)/100;
					console.log(speed+"==="+pos+"==="+(pos+speed));
				}else{
					obj.style[attr] = pos+speed+"px";
				}
				//只要传入的attr没有达到目标值，mark始终为false
				mark = false;
			}					
		}
		//如果为真进行清除定时器
		if(mark){
			clearInterval(obj.timer);
			//当上一次动画执行完回调函数就执行
			if(callback)callback.call(obj);
		}
	},times);
};