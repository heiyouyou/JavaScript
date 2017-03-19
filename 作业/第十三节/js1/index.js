window.onload = function(){
	/*header start*/
	var timer = null;
	var searchDom = $1("search-box");
	var nDom = $1("new");
	var tagDom = $1("taglist");
	searchDom.onclick = function(ev){
		var e = ev||event
		nDom.style.display = "none";
		Run(tagDom,{width:250,marginTop:0,opacity:100},40);
		e.cancelBubble = "true";
	};
	tagDom.onclick = function(ev){
		var e = ev||event
		e.cancelBubble = "true";
	};
	document.onclick = clear;
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
	function autoPlay(){
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
	autoPlay();
	//当位于banner图上时清除定时器
	bannerDom.onmouseover = function(){
		clearInterval(timer1);
	};
	//当离开banner图时重启定时器
	bannerDom.onmouseout = function(){
		autoPlay();
	};
	/*end banner-box*/
	/*reminder start*/
	var reminderDom = $1("reminder");
	//获取移动的极限距离，加2是为了刚好达到整数750，这样才能达到目标值
	var distance = $1("main").offsetWidth-reminderDom.offsetWidth+2;
	function ap(){
		run1(reminderDom,"right",distance,10,function(){
			run1(this,"left",distance,10);
		});
	}
	ap();
	//封装匀速移动的方法
	function run1(obj,attr,target,speed,callback){
		clearInterval(obj.timer2);
		obj.timer2 = setInterval(function(){
			//防止对象元素没有传入的attr样式所以取或后面的0
			var pos = parseInt(getStyle(obj,attr))||0;
			console.log(pos);
			if(pos==target){
				clearInterval(obj.timer2);
				if(callback)callback.call(obj);
			}else{
				obj.style[attr] = pos+speed+"px";
				console.log(pos+speed+"px");
			}
			/*停在对象上时停止移动*/
			obj.onmouseover = function(){
				clearInterval(this.timer2);
			};
			/*离开对象时出发移动*/
			obj.onmouseout = function(){
				run1(obj,attr,target,speed,callback);
			};
		},200);
	};
	/*end reminder*/
};