<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ include file="/base.jsp"%>
<link href="${ctx}/static/common/CodropsAudio/audio.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="${ctx}/static/common/CodropsAudio/audioplayer.css" />
<div class="ado-box">
	<section class="ado-cover">
		<div class="ado-cover-pic">
			<aside class="ado-cover-wrap">
				<span id="buffer"></span>
				<span class="coures-zhao"></span>
				<c:choose>
					<c:when test="${not empty course.logo}">
						<img class="ado-c-img" src="${staticServer}${course.logo}" alt="">
					</c:when>
					<c:otherwise>
						<img class="ado-c-img" src="/static/common/AudioPlayer/mobile/sprite.gif" alt="">
					</c:otherwise>
				</c:choose>

			</aside>
		</div>
		<div class="ado-cover-name">
			<h6><span id="aName"></span></h6>
		</div>
	</section><!-- /封面图转动区域 -->
	<section class="ado-audio-wrap">
		<audio preload="auto" controls id="mp3audio">
			<source src="${staticServer}${courseKpoint.videoUrl}">
		</audio>
		<script src="${ctx}/static/common/CodropsAudio/audioplayer.js"></script>
		<script>
            $(function(){
                $('audio').audioPlayer();
            });
		</script>

	</section><!-- /H5音频播放器 -->
</div>