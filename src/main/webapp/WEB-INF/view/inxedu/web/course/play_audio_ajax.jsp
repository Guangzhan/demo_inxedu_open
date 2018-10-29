<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ include file="/base.jsp"%>
<link rel="stylesheet" href="${ctx}/static/common/AudioPlayer/css/audio-style.css" />
<body>
<div class="yinpin-bg">
	<div class="music-player">
		<div class="info">
			<div class="center">
				<div class="jp-playlist">
					<ul>
						<li></li>
					</ul>
				</div>
			</div>
			<div class="audio-pic-wrap">
				<aside class="audio-pic">
					<img src="" width="227" height="170" class="audio-img">
					<section class="audio-shadow"></section>
				</aside>
				<span class="audio-loading"></span>
			</div>
			<div class="progress jp-seek-bar"> <span class="jp-play-bar" style="width: 0%"></span> </div>
		</div>
		<div class="controls">
			<div class="current jp-current-time">00:00</div>
			<div class="play-controls">
				<%--<a href="javascript:void(0);" onclick="$('#upLast a').click()" class="icon-previous jp-previous" title="上一个"></a>--%>
				<a href="javascript:;" class="icon-play jp-play" title="播放"></a>
				<a href="javascript:;" class="icon-pause jp-pause" title="暂停"></a>
				<%--<a href="javascript:void(0);" onclick="$('#downLast a').click()" class="icon-next jp-next" title="下一个"></a> --%>
			</div>
			<div class="volume-level jp-volume-bar">
				<span class="jp-volume-bar-value" style="width: 0%"></span>
				<a href="javascript:;" class="icon-volume-up jp-volume-max" title="最大音"></a>
				<a href="javascript:;" class="icon-volume-down jp-mute" title="最小音"></a>
			</div>
		</div>
		<div id="jquery_jplayer" class="jp-jplayer"></div>
	</div>
</div>
<script src='${ctx}/static/common/AudioPlayer/js/jquery.jplayer.min.js'></script>
<script src='${ctx}/static/common/AudioPlayer/js/jplayer.playlist.min.js'></script>
<script>
    //视频类型
    videotype="${courseKpoint.videoType}";
    //章节类型全局变量
    fileType="${courseKpoint.fileType}";
    //加载音频地址文件
    var adoSrc = '${staticServer}${courseKpoint.videoUrl}';
    $(document).ready(function(){
        var playlist = [{
            title:"${courseKpoint.name}",
            artist:"${courseKpoint.playTime}",
            mp3:adoSrc
        }];

        var cssSelector = {
            jPlayer: "#jquery_jplayer",
            cssSelectorAncestor: ".music-player"
        };

        var options = {
            swfPath: "/static/common/AudioPlayer/audio/Jplayer.swf",
            supplied: "ogv, m4v, oga, mp3"
        };

        var myPlaylist = new jPlayerPlaylist(cssSelector, playlist, options);
        var audioPic ="${staticServer}${course.logo}";
        function autoplayFun() {
            var uPlayBtn = $(".jp-play"),
                uAudioPic = $(".audio-pic"),
                uLoading = $(".audio-loading");
            setTimeout(function() {
                if(uPlayBtn.length>0) {
                    uLoading.hide();
                    uPlayBtn.click();
                    uAudioPic.fadeIn();
                    uAudioPic.find("img").attr("src",audioPic);
                } else {
                    uLoading.show();
                    clearTimeout(_uTimer);
                }
            }, 1000);
        }
        autoplayFun();
        //计算赋值高度
        $(".yinpin-bg").css("height",$(".playBox").height()-40);
    });
</script>
</body>