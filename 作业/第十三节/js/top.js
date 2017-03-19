/*to-top start*/
$(function(){
	$(window).scroll(function(){
		//获取当前窗口的scrollTop
		var height = $(this).scrollTop();
		//当scrollTop大于200时让回到顶部出现
		if(height>200){
			$("#to-top").stop(true,true).animate({"opacity":1},300);
		}else{
			$("#to-top").stop(true,true).animate({"opacity":0},300);
		}
	})
	//点击到达顶部
	$("#to-top").click(function(){
		$("html,body").stop(true,true).animate({"scrollTop":0},300);
	})
	//刷新时置顶
	$("html,body").load().animate({"scrollTop":0});
});
/*end to-top*/