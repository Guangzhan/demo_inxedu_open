/**
 * 获取弹出框
 * @param title 标题
 * @param context 内容
 * @param index 下标
 * @param callback 回调函数
 * @param height 内容区域高度
 */
function dialog(title,context,index,callback,height) {
	$(".ui-dialog").remove();
	$.ajax({
		url:baselocation+'/common/dialog',
		type:'post',
		dataType:'text',
		data:{'title':title,'context':context,'index':index,'height':height},
		success:function(result){
			$('body').append(result);
			$("#cancelBut,.ui-icon-closethick").click(function(){
				$(".ui-dialog").remove();
			});
			$("#affirmBut").click(function(){
				$(".ui-dialog").remove();
				if(callback){
					callback();
				}
			});
		}
	});
}
//文字横向滚动
function ScrollImgLeft() {
    var speed = 50;
    var scroll_begin = document.getElementById("scroll_begin");
    var scroll_end = document.getElementById("scroll_end");
    var scroll_div = document.getElementById("scroll_div");
    scroll_end.innerHTML = scroll_begin.innerHTML;
    function Marquee(){
        if(scroll_div.scrollLeft-scroll_end.offsetWidth>=0){
            scroll_div.scrollLeft-=scroll_begin.offsetWidth;
        }
        else{
            scroll_div.scrollLeft++;
        }
    }
    var MyMar = setInterval(Marquee, speed)//设置定时器
    scroll_div.onmouseover = function () {
        clearInterval(MyMar)
    }
    scroll_div.onmouseout = function () {
        MyMar = setInterval(Marquee, speed)
    }
    $(".not-close").click(function(){
        $(".Notice").remove();
        $(".s-main").css("padding-top",$("#header").height());
    })
}
