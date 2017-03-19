//封装获取样式的方法
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
};
//封装通过元素名称获取元素的方法
function eleArr(obj,ele){
	return obj.getElementsByTagName(ele);
};
//封装通过类样式获取元素的方法
function classArr(obj,classname){
	return obj.getElementsByClassName(classname);
};
//封装获取id的方法
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
//封装具有过渡与延迟效果的动画方法
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
				//乘以100变成百分比
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
//封装匀速移动的方法
function run1(obj,attr,target,speed,times,callback){
	clearInterval(obj.timer2);
	obj.timer2 = setInterval(function(){
		//防止对象元素没有传入的attr样式所以取或后面的0
		var pos = parseInt(getStyle(obj,attr))||0;
		console.log(pos);
		if(pos==target){
			clearInterval(obj.timer2);
			if(callback){
				callback.call(obj);
			}
		}else{
			obj.style[attr] = pos+speed+"px";
			console.log(pos+speed+"px");
		}
		/*停在对象上时停止移动*/
		/*obj.addEventListener("mouseover",function(ev){
			var e = ev||event;
			clearInterval(this.timer2);
			//判断目标对象是否是span
			var span = e.target.tagName;
			if(span.toLowerCase() == "span"){
				//为obj中span元素添加内容
				this.querySelector(span).innerHTML = "点击即可查看当前系统时间^-^";
			};
		},false)*/
		tg(obj).on("mouseover","span",function(){
			clearInterval(obj.timer2);
			this.innerHTML = "点击即可查看当前系统时间^-^";
		});
		/*离开对象时出发移动*/
		obj.onmouseout = function(){
			run1(obj,attr,target,speed,times,callback);
		};
	},times);
};
//封装当前系统时间的方法
function currentTime(obj){
	setInterval(function(){
		var timers = new Date();
		var years = timers.getFullYear();
		var months = timers.getMonth()+1;
		var date = timers.getDate();
		var day = timers.getDay();
		var hour = timers.getHours();
		var minutes = timers.getMinutes();
		var seconds = timers.getSeconds();
		switch (day){
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
		};
		function two(key){
			key<10?key = "0"+key:key = key;
			return key;
		}
		obj.innerText = years+"年"+months+"月"+date+"日"+day+two(hour)+":"+two(minutes)+":"+two(seconds);
	},1000);
};
//封装事件委托的方法
var tg = function(obj){
	var dom = obj;
	return {
		on:function(eventType,targetElement,callback){
			dom.addEventListener(eventType,function(ev){
				//获取目标对象的标签名称
				var e = ev||event;
				//兼容ie678的写法
				var t = e.target||e.srcElement;
				//如果目标对象的标签名与传递过来的标签名一致
				if(t.tagName.toLowerCase() == targetElement){
					//第一个参数表示改变回调函数this的指针，将其指向传递过来的目标元素，第二个参数表示事件类型
					callback.call(t,e);
				}
			},false);
		}
	}
};