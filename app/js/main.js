/**
  Author: Kale Chao | FakeCityMan
  Blog: http://kalechao87.github.io/
**/
var bgAud;
var showCover;
var slideTime = 0.6;

// 预加载
var sourceArr = [
    'images/bird-s8cbbc68603.png',
    'images/close-rule.png',
    'images/confirm.png',
    'images/cover-bg.jpg',
    'images/cover-s0676e36cae.png',
    'images/logo.png',
    'images/misc-sa66909f32a.png',
    'images/page2-bg.jpg',
    'images/page2-sf45919eb87.png',
    'images/page3-bg.jpg',
    'images/page3-se41da0fbe1.png',
    'images/page4-bg.jpg',
    'images/page4-s820e9b9f9c.png',
    'images/page5-s82b4583693.png',
    'images/page6-scce0ac0b0d.png',
    'images/page56-bg.jpg',
    'images/password.png',
    'images/rule.png',
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
        $('#bg-music').attr('src', 'media/bgmusic.mp3');
        var hideLoading = new TimelineMax({
            delay: 1,
            onStart: function () {
                TweenMax.set('#cover', {display: 'block', autoAlpha: 1});
                TweenMax.set(['.cover-content', '#cover-line', '#cover-logo'], {autoAlpha: 0});
            },
            onComplete: function () {
                TweenMax.set('#music-control', {display: 'block', autoAlpha: 1});
                bgAud.play();
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

        // music-control--------------
        var musicCtrl = new TimelineMax({repeat: -1, paused:true });
        var musicRotation = new TimelineMax({repeat: -1, paused:true});
        musicCtrl.to($(".music-control-icon"), 2, {rotation: 360, ease: Power0.easeNone});
        musicRotation.to($(".music-control-icon:nth(1)"), 0.5, {x: "-=20",y: "-=20", autoAlpha:0, ease: Power0.easeNone})
                      .to($(".music-control-icon:nth(2)"), 0.5, {x: "+=20", y: "-=20", autoAlpha:0, ease: Power0.easeNone})
                      .to($(".music-control-icon:nth(3)"), 0.5, {x: "-=20", y: "+=20", autoAlpha:0, ease: Power0.easeNone})
                      .to($(".music-control-icon:nth(4)"), 0.5, {x: "+=20", y: "+=20", autoAlpha:0, ease: Power0.easeNone})
        // 音乐初始化
        bgAud = $("#bg-music")[0];

        console.log(bgAud);
        function initAud(){
          if (bgAud.currentTime){
            console.log("背景音乐开始播放");
            musicCtrl.play();
            musicRotation.play();
            bgAud.removeEventListener("timeupdate", initAud, false); //只执行一次，防止控制按钮动画无法暂停
          }
        }

        bgAud.addEventListener("timeupdate", initAud, false);

        function playBM() {
          bgAud.play();
          musicCtrl.play();
          musicRotation.play();
        }

        function pauseBM() {
          bgAud.pause();
          musicCtrl.pause();
          musicRotation.pause();
        }

        // 音乐控制
        $("#music-control").on('touchstart', function(){
          if(bgAud.paused){
            playBM();
          }else{
            pauseBM();
          }
        })
        // music-control End------------------------------

        // 滑动指示箭头动画
        var upGuide = new TimelineMax({yoyo: true, repeat: -1, paused: true});
        upGuide.to($('#arrow-up'), 0.8, {x: '-=30', ease: Power0.easeNone})

        function showArrow() {
            TweenMax.fromTo($('#arrow-up'), 0.5, {autoAlpha: 0}, {autoAlpha: 1, ease: Power1.easeIn, onComplete: function () {
                upGuide.play();
            }});
        } // 显示左滑箭头并播放箭头动画

        function hideArrow() {
            TweenMax.to($('#arrow-up'), 0.5, {autoAlpha: 0, onComplete: function () {
                upGuide.pause(0);
            }});
        } // 隐藏左滑箭头并停止箭头动画

        showCover = function () {
            var coverShow = new TimelineMax({
                onComplete: function () {
                    showArrow();
                    // 左滑
                    touch.on($("#cover"), 'swipeleft', function(ev){
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
            coverSlideUpOut.to('#cover', slideTime, {x: -640, ease: Power2.easeInOut})
            .set('#cover', {display: 'none', autoAlpha: 0})
        }

        function page2SlideIn() {
            var page2SlideUpIn = new TimelineMax({
                onComplete: function () {
                    showArrow();
                    // 左滑
                    touch.on($("#page2"), 'swipeleft', function(ev){
                      console.log(ev.type + ' page2');
                      hideArrow();
                      page2SlideOut();
                    });
                }
            });
            page2SlideUpIn.set('#page2', {display: 'block', autoAlpha: 1})
            .set('#page2-content', {perspective: 500})
            .fromTo('#page2', slideTime, {x: 640}, {x: 0, onComplete: function () {
                TweenMax.fromTo('#common-logo', 0.6, {autoAlpha: 0}, {autoAlpha: 1});
            }, ease: Power2.easeOut})
            .staggerFromTo('.page2-content', 0.8, {z: -50, autoAlpha: 0}, {z: 0, autoAlpha: 1}, 0.12)
            .fromTo('#page2-line', 0.8, {autoAlpha:0}, {autoAlpha: 1}, '-=0.8')
            .set('#bird', {display: 'block', autoAlpha: 1, top: '300px', left: '-175px'})
            .to('#bird', 2.5, {
                bezier:[
                    {left:300, top:440},
                    {left:640, top:480}
                ],
                ease:Power1.easeIn,
                onStart: function () {
                    birdFlap.play(0);
                },
                onComplete: function () {
                    TweenMax.set('#bird', {display: 'none', autoAlpha: 0});
                    birdFlap.pause(0);
                }
            });
        }

        function page2SlideOut() {
            var page2SlideUpOut = new TimelineMax({
                onStart: page3SlideIn
            });
            page2SlideUpOut.to('#page2', slideTime, {x: -640, ease: Power2.easeInOut})
            .set('#page2', {display: 'none', autoAlpha: 0})
        }

        function page3SlideIn() {
            var page3SlideUpIn = new TimelineMax({
                onComplete: function () {
                    showArrow();
                    // 左滑
                    touch.on($("#page3"), 'swipeleft', function(ev){
                      console.log(ev.type + ' page3');
                      hideArrow();
                      page3SlideOut();
                    });
                }
            });
            page3SlideUpIn.set('#page3', {display: 'block', autoAlpha: 1})
            .set('#page3-content', {perspective: 500})
            .fromTo('#page3', slideTime, {x: 640}, {x: 0, ease: Power2.easeOut})
            .staggerFromTo('.page3-content', 0.8, {z: -50, autoAlpha: 0}, {z: 0, autoAlpha: 1}, 0.12)
            .fromTo('#page3-line', 0.8, {autoAlpha:0}, {autoAlpha: 1}, '-=0.8')
            .set('#bird', {display: 'block', autoAlpha: 1, top: '150px', left: '-175px'})
            .to('#bird', 2, {
                bezier:[
                    {left:200, top:440},
                    {left:640, top:480}
                ],
                ease:Power0.easeNone,
                onStart: function () {
                    birdFlap.play(0);
                },
                onComplete: function () {
                    TweenMax.set('#bird', {display: 'none', autoAlpha: 0});
                    birdFlap.pause(0);
                }
            });
        }

        function page3SlideOut() {
            var page3SlideUpOut = new TimelineMax({
                onStart: page4SlideIn
            });
            page3SlideUpOut.to('#page3', slideTime, {x: -640, ease: Power2.easeInOut})
            .set('#page3', {display: 'none', autoAlpha: 0})
        }

        function page4SlideIn() {
            var page4SlideUpIn = new TimelineMax({
                onComplete: function () {
                    showArrow();
                    // 左滑
                    touch.on($("#page4"), 'swipeleft', function(ev){
                      console.log(ev.type + ' page4');
                      hideArrow();
                      page4SlideOut();
                    });
                }
            });
            page4SlideUpIn.set('#page4', {display: 'block', autoAlpha: 1})
            .set('#page4-content', {perspective: 500})
            .fromTo('#page4', slideTime, {x: 640}, {x: 0, ease: Power2.easeOut})
            .staggerFromTo('.page4-content', 0.8, {z: -50, autoAlpha: 0}, {z: 0, autoAlpha: 1}, 0.12)
            .fromTo('#page4-line', 0.8, {autoAlpha:0}, {autoAlpha: 1}, '-=0.8')
            .set('#bird', {display: 'block', autoAlpha: 1, top: '800px', left: '-175px'})
            .to('#bird', 2.5, {
                bezier:[
                    {left:300, top:480},
                    {left:640, top:420}
                ],
                ease:Power1.easeIn,
                onStart: function () {
                    birdFlap.play(0);
                },
                onComplete: function () {
                    TweenMax.set('#bird', {display: 'none', autoAlpha: 0});
                    birdFlap.pause(0);
                }
            });
        }

        function page4SlideOut() {
            var page4SlideUpOut = new TimelineMax({
                onStart: page5SlideIn
            });
            page4SlideUpOut.to('#page4', slideTime, {x: -640, ease: Power2.easeInOut})
            .set('#page4', {display: 'none', autoAlpha: 0})
        }

        function page5SlideIn() {
            var page5SlideUpIn = new TimelineMax({
                onComplete: function () {
                    showArrow();
                    // 左滑
                    touch.on($("#page5"), 'swipeleft', function(ev){
                      console.log(ev.type + ' page5');
                      hideArrow();
                      hidePage5();
                    });
                }
            });
            page5SlideUpIn.set(['#page56', '#page5'], {display: 'block', autoAlpha: 1})
            .set('#page5-content', {perspective: 500})
            .fromTo('#page56', slideTime, {x: 640}, {x: 0, ease: Power2.easeOut})
            .staggerFromTo('.page5-content', 0.8, {z: -50, autoAlpha: 0}, {z: 0, autoAlpha: 1}, 0.12)
            .fromTo('#page5-line', 0.8, {autoAlpha:0}, {autoAlpha: 1}, '-=0.8')
            .set('#bird', {display: 'block', autoAlpha: 1, top: '600px', left: '-175px'})
            .to('#bird', 2.5, {
                bezier:[
                    {left:300, top:480},
                    {left:640, top:420}
                ],
                ease:Power1.easeIn,
                onStart: function () {
                    birdFlap.play(0);
                },
                onComplete: function () {
                    TweenMax.set('#bird', {display: 'none', autoAlpha: 0});
                    birdFlap.pause(0);
                }
            });
        }

        function hidePage5() {
            var page5Hide = new TimelineMax({
                onComplete: showPage6
            });
            page5Hide.to('#page5', 0.6, {autoAlpha: 0})
            .set('#page5', {display: 'none'})
        }

        function showPage6() {
            var page6Show = new TimelineMax();
            page6Show.set('#page6', {display: 'block', autoAlpha: 1})
            .set('#page6-content', {perspective: 500})
            .staggerFromTo('.page6-content', 0.8, {z: -50, autoAlpha: 0}, {z: 0, autoAlpha: 1}, 0.12)
            .fromTo('#page6-line', 0.8, {autoAlpha:0}, {autoAlpha: 1}, '-=0.8')
            .fromTo('#sign-btn', 0.6, {autoAlpha:0, y: -100}, {autoAlpha: 1, y: 0})
            .fromTo('#rule-btn', 0.6, {autoAlpha:0, y: 100}, {autoAlpha: 1, y: 0}, '-=0.6')
        }

        function showRule() {
            var ruleShow = new TimelineMax();
            ruleShow.set('#rule', {display: 'block'})
            .fromTo('#rule', 0.4, {autoAlpha: 0}, {autoAlpha: 1})
            .fromTo('#rule-container', 0.8, {autoAlpha: 0, y: -800}, {autoAlpha: 1, y: 0, ease: Back.easeOut.config(1.6)}, '-=0.1')
        }

        function closeRule() {
            var ruleClose = new TimelineMax();
            ruleClose.to('#rule-container', 0.6, {autoAlpha: 0, y: -800, ease: Back.easeIn.config(1.6)})
            .to('#rule', 0.4, {autoAlpha: 0}, '-=0.2')
            .set('#rule', {display: 'none'})
        }

        function showPassPage() {
            var passPageShow = new TimelineMax();
            passPageShow.set('#password-page', {display: 'block', perspective: 500})
            .fromTo('#password-page', 0.4, {autoAlpha: 0}, {autoAlpha: 1})
            .fromTo('#password-container', 0.6, {autoAlpha: 0, z: -500}, {autoAlpha: 1, z: 0, ease: Back.easeOut.config(1.2)}, '-=0.1')
        }

        function closePassPage() {
            var passPageHide = new TimelineMax();
            passPageHide.to('#password-container', 0.4, {autoAlpha: 0, z: -500, ease: Back.easeIn.config(1.2)})
            .to('#password-page', 0.4, {autoAlpha: 0})
            .set('#password-page', {display: 'none'})
        }

        $('#sign-btn').on('touchstart', showPassPage);
        $('#rule-btn').on('touchstart', showRule);
        $('#close-rule').on('touchstart', closeRule);

        // 报名跳转
        $('#confirm').on('touchstart', function () {
            var passVal = $('#password').val();
            console.log(passVal);
            if (passVal=='') {
                alert('请填写口令');
                return;
            }else if (passVal=='12345') {
                location.href = '../yzw';
            }else {
                alert('口令错误，请填写正确口令');
                return;
            }

        });

        // 小鸟振翅
        var birdFlap = new TimelineMax({
            paused: true,
            repeat: -1,
            repeatDelay: 0.1
        });
        birdFlap.add('flapStart')
        .set('#bird1', {autoAlpha: 1}, 'flapStart')
        .set('#bird2', {autoAlpha: 0}, 'flapStart')
        .set('#bird3', {autoAlpha: 0}, 'flapStart')
        .set('#bird4', {autoAlpha: 0}, 'flapStart')
        .set('#bird5', {autoAlpha: 0}, 'flapStart')
        .set('#bird1', {autoAlpha: 0}, 'flapStart+=0.1')
        .set('#bird2', {autoAlpha: 1}, 'flapStart+=0.1')
        .set('#bird3', {autoAlpha: 0}, 'flapStart+=0.1')
        .set('#bird4', {autoAlpha: 0}, 'flapStart+=0.1')
        .set('#bird5', {autoAlpha: 0}, 'flapStart+=0.1')
        .set('#bird1', {autoAlpha: 0}, 'flapStart+=0.2')
        .set('#bird2', {autoAlpha: 0}, 'flapStart+=0.2')
        .set('#bird3', {autoAlpha: 1}, 'flapStart+=0.2')
        .set('#bird4', {autoAlpha: 0}, 'flapStart+=0.2')
        .set('#bird5', {autoAlpha: 0}, 'flapStart+=0.2')
        .set('#bird1', {autoAlpha: 0}, 'flapStart+=0.3')
        .set('#bird2', {autoAlpha: 0}, 'flapStart+=0.3')
        .set('#bird3', {autoAlpha: 0}, 'flapStart+=0.3')
        .set('#bird4', {autoAlpha: 1}, 'flapStart+=0.3')
        .set('#bird5', {autoAlpha: 0}, 'flapStart+=0.3')
        .set('#bird1', {autoAlpha: 0}, 'flapStart+=0.4')
        .set('#bird2', {autoAlpha: 0}, 'flapStart+=0.4')
        .set('#bird3', {autoAlpha: 0}, 'flapStart+=0.4')
        .set('#bird4', {autoAlpha: 0}, 'flapStart+=0.4')
        .set('#bird5', {autoAlpha: 1}, 'flapStart+=0.4')

    });  //Document ready
})(jQuery);
