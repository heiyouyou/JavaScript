window.onload = function(){
	var oForm = document.getElementById("form");
	var oWarming = document.getElementById("warming");
	var inps  = oForm.getElementsByClassName("inp");
	var str = [];//定义一个空数组来接受inps中的value值
	for(var i =0;i<inps.length;i++){//通过遍历获取到对象元素value中的值放入str中
		if(inps[i].getAttribute("value")){//只要value不是false类的值就执行以下语句
			str.push(inps[i].getAttribute("value"));
		}
	}
	for(var i=0;i<inps.length;i++){
		inps[i].str1 = str[i];//先将数组str中的每个值动态给inps绑定
		inps[i].onfocus = clearText;//当获得焦点时清除文本
		inps[i].onblur = addText;//当失去焦点时添加文本
		inps[i].onkeyup = addText;//当键盘按键抬起添加文本
		inps[i].onkeydown =clearText;//当键盘按键按下清除文本
		function addText(){//添加文本给输入框
			if(this.value == ""){
				this.value = this.str1;
				this.style.cssText = "color:#ccc;";
			}
		};
		function clearText(){//清除输入框的文本
			if(this.value == this.str1){
				this.value = "";
				this.style.cssText = "color:#555;";
				this.style.borderColor = "#049cdb";
			}
		};
	}
	oForm.onsubmit = function(){//当输入框内容没输入或者空白时，提交时触发函数
		for(var i=0;i<inps.length;i++){
			inps[i].str1 = str[i];
			if(inps[i].value == inps[i].str1||inps[i].value ==""){
				oWarming.style.cssText = "height:50px;opacity:1;"//让提示框出现
				oWarming.innerHTML = "请输入"+inps[i].str1;;//将提示内容拼接上去
				inps[i].focus();
				setTimeout(function(){//定时消除出现的提示框
					oWarming.style.opacity = "0";
					oWarming.style.height = "0";
				},2000);
				return false;
			}
		}
	};
};