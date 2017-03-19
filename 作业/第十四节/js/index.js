/*header start*/
var timer = null;
var searchDom = $1("search-box");
var nDom = $1("new");
var tagDom = $1("taglist");
searchDom.onclick = function(ev){
	var e = ev||event;
	nDom.style.display = "none";
	Run(tagDom,{width:250,marginTop:0,opacity:100},40);
	e.stopPropagation();
};
tagDom.onclick = function(ev){
	var e = ev||event
	e.cancelBubble = "true";
};
document.onclick = clear;
//封装清除订阅框的方法
function clear(){
	nDom.style.display = "block";
	Run(tagDom,{width:0,opacity:0},40,function(){
		Run(this,{marginTop:-860},40);
	});
};
/*end header*/
/*nav-box start*/
var listDoms = eleArr($1("list"),"li");
var divDoms = classArr($1("nav-box"),"g-hdview")
for(var i=0;i<listDoms.length;i++){
	listDoms[i].index = i;
	//停在指定位置时出现
	listDoms[i].onmouseover = function(){
		divDoms[this.index].style.height = "90px";
		siblings(divDoms[this.index],function(){
			this.style.height = "0";
		});
	};
	divDoms[i].onmouseover = function(){
		this.style.height = "90px";					
	};
	//离开时消失
	listDoms[i].onmouseout = function(){
		divDoms[this.index].style.height = "0";
	};	
	divDoms[i].onmouseout = function(){
		this.style.height = "0";
	};
}
/*end nav-box*/
/*banner-box start*/
//淡入淡出版
var bannerDom = $1("banner-box");
var imgDom = $1("list-img");
var btnDom = $1("list-btn");
var btns = eleArr(btnDom,"li");
var imgs = eleArr(imgDom,"li");
var c = 0;
var timer1 = null;
for(var i=0;i<btns.length;i++){
	btns[i].index = i;
	btns[i].onmouseover = function(){
		show(this);
		//关联按钮的索引与自动播放同步
		c = this.index;
	};
}
//封装淡入淡出的效果方法
function show(obj){
	obj.className = "fir-btn";
	siblings(obj,function(){
		this.className = "";
	});
	imgs[obj.index].style.cssText = "opacity:1;visibility:visible;";
	siblings(imgs[obj.index],function(){
		this.style.cssText = "opacity:0;visibility:hidden;";
	});
};
//自动播放效果
function autoPlay1(){
	timer1 = setInterval(function(){
		c++;
		console.log(c);
		if(c>btns.length-1){
			c = 0;
			show(btns[c]);
		}else{
			show(btns[c]);
		}
	},3000);
};
autoPlay1();
//当位于banner图上时清除定时器
bannerDom.onmouseover = function(){
	clearInterval(timer1);
};
//当离开banner图时重启定时器
bannerDom.onmouseout = function(){
	autoPlay1();
};
//无缝版
/*var btns = $1("list-btn").children;
var imgs = $1("list-img").children;
var timer1 = null;
//定义一个按钮样式改变的索引变量
var cindex = 0;
//定义一个盒子移动的索引变量
var cindex2 = 0;
//拿到每张图片的宽度
var width = imgs[0].offsetWidth;
for(var i =0;i<btns.length;i++){
	btns[i].index = i;
	btns[i].onmouseover = function(){
		//遍历去除所有样式
		for(var i=0;i<btns.length;i++){
			btns[i].className = "";
			//当点击按钮时剔除每个li的所有内联样式,为了解决临界切换时出现的空白
			imgs[i].removeAttribute("style");
		}
		//点击谁再添加样式
		this.className = "fir-btn";
		//调用动画
		Run($1("list-img"),{left:-width*this.index},15);
		//自动索引与按钮索引同步
		cindex = this.index;
		//移动索引与按钮索引同步
		cindex2 = this.index;
	}
}
timer1 = setInterval(autoPlay,3000);
function autoPlay(){
	//这里为什么不能放在下面的if语句后面，放在后面会在最后一张图片和第一张图片之间出现有空白
	if(cindex == 0){
		//变成静态，第一张图片回到原始的位置
		imgs[0].style.position = "static";
		//让ul的下标为0的第一个空位移到第一张图片的位置
		$1("list-img").style.left = "0px";
		//重新赋值为零从下标为零的位置开始向左移动
		cindex2 = 0;
	}
	//当下标等于最大的下标时
	if(cindex==btns.length-1){
		//这里不能使用绝对定位,它会破坏文档流的,使用相对定位不会破话文档流
		imgs[0].style.position = "relative";
		//相对自己原本的位置移动。让第一张图片移到最后一张图片后面
		imgs[0].style.left = width*btns.length+"px";
		cindex=0;
	}else{
		cindex++;
	}
	cindex2++;
	console.log(cindex2);
	for(var i=0;i<btns.length;i++){
		btns[i].className = "";
	}
	btns[cindex].className = "fir-btn";
	Run($1("list-img"),{left:-width*cindex2},15);
};
//清除定时器
$1("banner-box").onmouseover = function(){
	clearInterval(timer1);
}
//触发定时轮播
$1("banner-box").onmouseout = function(){
	//这里注意得重新给timer赋值
	timer1 = setInterval(autoPlay,3000);
}*/
/*end banner-box*/
/*reminder start*/
var reminderDom = $1("reminder");
//拿到reminder对象元素中的span元素
var spanDom = $1("reminder").querySelector("span");
//获取移动的极限距离，加2是为了刚好达到整数750，这样才能达到目标值
var distance = $1("main").offsetWidth-reminderDom.offsetWidth+2;
//封装来回移动的方法
function ap(obj,attr,target,speed,times){
	run1(obj,attr,target,speed,times,function(){
		run1(this,attr,0,-speed,times);
	});
}
ap(reminderDom,"right",distance,10,200);
//当点击温馨提示时变成时间显示
reminderDom.addEventListener("click",function(){
	currentTime(spanDom);
},false);
/*end reminder*/
//js版的置顶
window.onscroll = function(){
	//获取当前页面的滚动条高度的兼容谷歌写法
	var height = document.documentElement.scrollTop||document.body.scrollTop;
	if(height>200){
		$1("to-top").style.cssText = "opacity:1;transition:opacity 1s ease;";
		//触发订阅框的消失
		clear();
	}else{
		$1("to-top").style.cssText = "opacity:0;transition:opacity .5s ease;";
		
	}
	if(height>600){
		$1("left-aside").style.cssText = "opacity:1;visibility:visible;transition:opacity .5s ease-in;";
	}else{
		$1("left-aside").style.cssText = "opacity:0;visibility:hidden;transition:opacity .3s ease-out;";
	}
	//点击置顶
	$1("to-top").onclick = function(){
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	};
};
