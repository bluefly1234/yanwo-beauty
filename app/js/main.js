/**
  Author: Kale Chao | FakeCityMan
  Blog: http://kalechao87.github.io/
**/
var bgAud;
var showCover;
var slideTime = 0.6;

// 预加载
var sourceArr = [
    'images/bird-sc38bbd845c.png',
    'images/cover-bg.jpg',
    'images/cover-s0676e36cae.png',
    'images/logo.png',
    'images/misc-sf5831d2011.png',
    'images/page2-bg.jpg',
    'images/page2-sda77c70712.png',
    'images/page3-saf08ae2600.png',
    'images/page4-bg.jpg',
    'images/page4-s4f8615222a.png',
    'images/page5-s2a8f395e7f.png',
    'images/page6-s83db92535b.png',
    'images/page56-bg.jpg',
    'media/bgmusic.mp3'
]; //需要加载的资源列表

new mo.Loader(sourceArr,{
	onLoading : function(count,total){
		console.log('onloading:single loaded:',arguments);
        console.log('加载中...（'+count/total*100+'%）');
        var loadPercent = Math.floor(count/total*100);
        $('#loading-num').html(loadPercent+'%');
	},
	onComplete : function(time){
		console.log('oncomplete:all source loaded:',arguments);
        // $('#bg-music').attr('src', 'media/bgmusic.mp3');
        var hideLoading = new TimelineMax({
            delay: 1,
            onStart: function () {
                TweenMax.set('#cover', {display: 'block', autoAlpha: 1});
                TweenMax.set(['.cover-content', '#cover-line', '#cover-logo'], {autoAlpha: 0});
            },
            onComplete: function () {
                // TweenMax.set('#music-control', {display: 'block', autoAlpha: 1});
                // bgAud.play();
                showCover();

            }
        });
        hideLoading.to('#loading', 0.6, {autoAlpha: 0, ease: Power1.easeIn})
        .set('#loading', {display: 'none'})
	}
});

(function($) {
    $(document).ready(function() {
        console.log('Ready');
        $('body').on('touchmove', function (e) {
            e.preventDefault();
        }); // 禁止页面滚动

        // 滑动指示箭头动画
        var upGuide = new TimelineMax({yoyo: true, repeat: -1, paused: true});
        upGuide.to($('#arrow-up'), 0.8, {y: '-=30', ease: Power0.easeNone})

        function showArrow() {
            TweenMax.fromTo($('#arrow-up'), 0.5, {autoAlpha: 0}, {autoAlpha: 1, ease: Power1.easeIn, onComplete: function () {
                upGuide.play();
            }});
        } // 显示上滑箭头并播放箭头动画

        function hideArrow() {
            TweenMax.to($('#arrow-up'), 0.5, {autoAlpha: 0, onComplete: function () {
                upGuide.pause(0);
            }});
        } // 隐藏上滑箭头并停止箭头动画

        showCover = function () {
            var coverShow = new TimelineMax({
                onComplete: function () {
                    showArrow();
                    // 上滑
                    touch.on($("#cover"), 'swipeup', function(ev){
                      console.log(ev.type + ' intro');
                      hideArrow();
                      coverSlideOut();
                    });
                }
            });
            coverShow.set('#cover', {display: 'block', autoAlpha: 1})
            .set(['.cover-content', '#cover-line'], {autoAlpha: 0})
            .set('#cover-content', {perspective: 500})
            .staggerFromTo('.cover-content', 0.8, {z: -50, autoAlpha: 0}, {z: 0, autoAlpha: 1}, 0.12)
            .fromTo('#cover-line', 0.8, {autoAlpha:0}, {autoAlpha: 1}, '-=0.8')
            .fromTo('#cover-logo', 0.6, {autoAlpha: 0, x: 100}, {autoAlpha: 1, x: 0})
        }

        function coverSlideOut() {
            var coverSlideUpOut = new TimelineMax({
                onStart: page2SlideIn
            });
            coverSlideUpOut.to('#cover', slideTime, {y: -1043})
            .set('#cover', {display: 'none', autoAlpha: 0})
        }

        function page2SlideIn() {
            var page2SlideUpIn = new TimelineMax();
            page2SlideUpIn.set('#page2', {display: 'block', autoAlpha: 1})
            .fromTo('#page2', slideTime, {y: 1043}, {y: 0})
        }

    });  //Document ready
})(jQuery);
