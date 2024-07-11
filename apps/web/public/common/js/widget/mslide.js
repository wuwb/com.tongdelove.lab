/*
 * 幻灯片
 */
 // 获取浏览器UA
 var ua = navigator.userAgent;
 // 识别 ipad ipod ip
 var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
 var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
 var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
 // 判断是否为ios系统
 var is_ios = ipad || ipod || iphone;
 // 判断是否为android系统
 var is_and = ua.match(/(Android)\s+([\d.]+)/);
 // 判断是否为手机端
 var is_mobile = is_ios || is_and;

 // 图强轮播容器 支持触屏
 var MSliderH5 = function(config) {
     // 鼠标是否悬停在banner上
     this.isMouseOn = false;
     // 是否正切换banner
     this.isTurning = false;
     // 展现的banner序号
     this.showIndex = 0;
     // banner对象
     this.banners = null;
     // banner个数
     this.bannerNum = 0;
     // 参数配置
     this.opts = $.extend({},this.defaults,config);
     // 自动切换计时器
     this.autoTurnTimer = null;
     // 小圆点计时器
     this.dotHoverTimer = null;
     // 初始化轮播
     this.init();
 };

 MSliderH5.prototype = {
     // 默认参数
     defaults : {
         bannerBox : null,    //轮播容器对象
         isLazyImage : false, //图片是否要懒加载
         autoTime : false,    //自动切换事件间隔，时间 > 1000，false代表无自动切换
         isTouchTurn : true,  //是否开启触屏支持，默认支持
         turnMode : "slide", //轮播切换方式 normal--直接切换，fade--渐隐渐现,默认slide--滑动切换
         transDuration : 300, //动画效果的执行时间,默认0.3s
         addTurnBtn : false,  //设置添加上一张，下一张按钮。default--添加默认按钮，false--不添加
         addTurnDot : false,  //设置添加切换小圆点，true--添加默认小圆点，false--不添加
         startIndex : 0,
         sensitiveMode : false, // 设置敏感模式，true是敏感模式，极度容易触发滑动，慎用
         callback : function() {} //回调函数
     },

     // 初始化方法
     init : function() {
         var that = this;
         // 获取banner对象
         that.banners = that.opts.bannerBox.find('.mslide_banner');
         // banner个数
         that.bannerNum = that.banners.length;
         // 无banner直接退出
         if( that.bannerNum < 1 ) return;

         // 预加载第一张banner
         that.loadingImage(0);
         // 开始显示banner位置
         that.showIndex = that.opts.startIndex;

         // 小于两张banner直接退出
         if( that.bannerNum < 2 ) return;
         // 间隔1s渲染第二张banner
         setTimeout(function(){that.loadingImage(1);},1000);

         // 根据自动切换配置给banner加hover监听
         if(that.opts.autoTime) {
             // 自动切换事件不可小于1s
             that.opts.autoTime = that.opts.autoTime > 1000 ? that.opts.autoTime : 1000;
             // 初始化启动计时器
             that.resetAutoTurn();
         }

         // 初始化触控配置
         if(that.opts.isTouchTurn) {
             that.initTouchTurn();
         }

         // 根据配置添加上、下一张按钮
         if(that.opts.addTurnBtn == "default") {
             //添加默认上一张下一张按钮
             that.addDefaultBtn();
         }

         // 根据配置添加小圆点
         if(that.opts.addTurnDot ) {
             //添加默认小圆点
             that.addDefaultDot();
         }

         // 判断是否为移动设备
         if(is_mobile) {
             // 移动设备移除上下一张按钮
             that.opts.bannerBox.find('.msilde_toggle_btn').remove();
         } else {
             // 如果不是手机端初始化切换按钮
             that.initToggleBtn();
         }
     },

     // 到第N张
     goPage : function(index) {
         var that = this;
          // alert(index);
         // 正在展示的banner
         var nowBanner = that.opts.bannerBox.find('.mslide_banner').eq(that.showIndex);
         // 老banner，顺序index
         var oldIndex = nowBanner.index();

         // 方向下一张
         var direct = "next";
         // 判断方向
         if(oldIndex > index) {
             // 方向上一张
             direct = "prev";
         }

         // 溢出序号重置
         if (index >= that.bannerNum ) index = 0;
         if (index < 0 ) index = that.bannerNum - 1;


         // 即将要切换到的banner
         var nextBanner = that.banners.eq(index);

         // 正在切换直接跳出，或本图片为显示状态
         if(that.isTurning || nextBanner.index() == that.showIndex) return;
         that.isTurning = true;

         // 加载本banner的图片
         that.loadingImage(index);

         // 动画间隔时间
         var transDuration = that.opts.transDuration;

         var delatyTime = is_ios ? 10 : 100;

         // 判断切换模式
         if( that.opts.turnMode == "fade" ) {
             // 渐隐渐现模式

             // 显示banner
             nextBanner.attr('style','z-index:2;display:block; -webkit-animation: fadeIn ease-in '+transDuration+'ms;');

             // 动画结束重置isTurning
             setTimeout(function(){

                 // 还原层级
                 nowBanner.css({'z-index':0,'display':'none'});
                 nextBanner.css({'z-index':1});

                 // 重置样式和isTurning
                 nowBanner.removeClass('mslide_banner_show');
                 nextBanner.addClass('mslide_banner_show');
                 that.isTurning = false;

             },transDuration+delatyTime);

         } else if( that.opts.turnMode == "slide" ) {
             // 滑动切换

             // 滑动left宽度
             var left = that.opts.bannerBox.width();
             left = direct == "prev" ? -left : left;

             // 获取banner容器
             var bannerParent = nextBanner.parent();
             that.banners.removeClass('mslide_banner_show');
             nowBanner.addClass('mslide_banner_show');
             nextBanner.addClass('mslide_banner_show');
             // 动画结束重置isTurning
             nowBanner.css({'left': 0 ,'z-index':2});
             bannerParent.attr('style','');
             // 重置下一张位置
             nextBanner.css({'left': left,'z-index':2 });

             // 执行滑动
             setTimeout(function(){bannerParent.attr('style','z-index:2;-webkit-transform: translate3d('+-left+'px,0,0); -webkit-transition: -webkit-transform ease-out '+transDuration+'ms;');},0);
             // 动画结束重置isTurning
             setTimeout(function(){

                 that.isTurning = false;

             },transDuration+delatyTime);

         } else {
             // 普通直切模式
             nowBanner.removeClass('mslide_banner_show');
             nextBanner.addClass('mslide_banner_show');
             that.isTurning = false;
         }

         // 重置轮播图显示序号
         this.showIndex = index;
         // 延迟1s预加载下一张banner图片
         if(that.opts.isLazyImage) {
             setTimeout(function(){that.loadingImage(index+1);},1000);
         }
         // 触发切换结束回调
         that.opts.callback && that.opts.callback(index);

         // 回调，同步默认小圆点
         var dots = that.opts.bannerBox.find('.dot_default');
         if(dots.length > index) {
             dots.removeClass('dot_show');
             dots.eq(index).addClass('dot_show');
         }

         // 如果要自动切换,重置计时器
         if(that.opts.autoTime) {
             that.resetAutoTurn();
         }
     },

     // 切换上一张
     prevPage : function() {
         var that = this;
         that.goPage(that.showIndex-1);
     },

     // 切换下一张
     nextPage : function() {
         var that = this;
         that.goPage(that.showIndex+1);
     },

     // 加载img
     loadingImage : function(index) {
         // alert(index);
         var that = this;
         // 如果不需要懒加载直接退出
         if(!that.opts.isLazyImage) return;
         // 溢出序号重置
         if (index >= that.bannerNum ) index = 0;
         if (index < 0 ) index = that.bannerNum-1;

         var banner = that.banners.eq(index);
         // 如果已经加载过则退出
         if(banner.hasClass('J_img_load')) return;

         // 加图片加载样式
         banner.addClass('J_img_load');
         var img = new Image;

         var style = MoGu.isIos ? '-webkit-animation: fadeIn .2s ease both 0s; animation: fadeIn .2s ease both 0s;':'';

         img.onload = function () {
             // 如果图片再当前展现的banner，则渐隐渐现
             if( banner.hasClass('mslide_banner_show') ) {
                 banner.append('<img class="mslide_banner_img fill_img" style="'+style+'" src="'+img.src+'" alt=""/>');
             } else {
                 banner.append('<img class="mslide_banner_img fill_img" style="display:block;" src="'+img.src+'" alt=""/>');
             }
         };

         var orgUrl = banner.attr("img-url") || banner.attr("img-src");

         // 如果图片异常直接返回
         if(!orgUrl) return;

         img.src = orgUrl;

     },

     // 初始化操作按钮
     initToggleBtn : function() {
         var that = this;
         var bannerBox = that.opts.bannerBox;

         // 下一张 按钮
         if(bannerBox.find('.msilde_next_btn').length > 0) {
             bannerBox.on('click', '.msilde_next_btn', function(event) {
                 event.preventDefault();
                 that.nextPage();
             });
         }

         // 上一张 按钮
         if(bannerBox.find('.msilde_prev_btn').length > 0) {
             bannerBox.on('click', '.msilde_prev_btn', function(event) {
                 event.preventDefault();
                 that.prevPage();
             });
         }
     },

     // 初始化触摸滑动
     initTouchTurn : function() {
         var that = this;

         // x轴位移的绝对值
         var deltaX = 0;
         // y轴位移的绝对值
         var deltaY = 0;
         // 触发多点触控时的第一个触控点
         var firstTouch = null;
         // 触控延迟计时器
         var touchTimeout = null;
         // 触控坐标对象
         var touch={};
         var bannerBox = that.opts.bannerBox;
         // 滑动标识，保证一次滑动触发一次切换
         var touchSlideFst = true;

         bannerBox.on('touchstart', function(e){
             // 获取第一触控点
             firstTouch = e.touches[0];
             // 清空end触发器，防止断点误触发
             touchTimeout && clearTimeout(touchTimeout);
             // 获取开始点坐标
             touch.x1 = firstTouch.clientX;
             touch.y1 = firstTouch.clientY;

             // 每次touchstart开始触发
             touchSlideFst = true;
         });

         bannerBox.on('touchmove', function(e){
             // 获取第一触控点
             firstTouch = e.touches[0];
             // 获取当前触点坐标
             touch.x2 = firstTouch.clientX;
             touch.y2 = firstTouch.clientY;
             // 计算水平和垂直位移
             deltaX = Math.abs(touch.x1 - touch.x2);
             deltaY = Math.abs(touch.y1 - touch.y2);

             // 计算滑动角度小于60度，阻止页面滚动
             if( deltaX && (deltaY/deltaX) < 1.8) {
                 e.preventDefault();
             }

             // 超过一定滑动距离触发滑动
             if ( that.opts.sensitiveMode && touchSlideFst && deltaX && deltaX > 40 && (deltaY/deltaX) < 1.8) {
                 // 判断滚动方向
                 var X = (touch.x1 - touch.x2);
                 // slide模式方向相反
                 if(that.opts.turnMode == "slideFade" || that.opts.turnMode == "slide") {
                     X = -X;
                 }

                 if(X>0){
                     that.prevPage();
                 }else{
                     that.nextPage();
                 }
                 touch = {};

                 touchSlideFst = false;
             }
         });
         bannerBox.on('touchend', function(e){

             if (touchSlideFst && deltaX && deltaX > 30 && (deltaY/deltaX) < 1.8) {
                 // 判断滚动方向
                 var X = (touch.x1 - touch.x2);
                 // slide模式方向相反
                 if(that.opts.turnMode == "slideFade" || that.opts.turnMode == "slide") {
                     X = -X;
                 }

                 if(that.opts.sensitiveMode) {

                     if(X>0){
                         that.prevPage();
                     }else{
                         that.nextPage();
                     }
                     touch = {};

                 } else {

                     // end延时触发器，防止断点误触发
                     touchTimeout = setTimeout(function() {
                         if(X>0){
                             that.prevPage();
                         }else{
                             that.nextPage();
                         }
                         touch = {};
                     }, 0);

                 }

                 touchSlideFst = false;
             }

             deltaX = deltaY = 0;

         });
         bannerBox.on('touchcancel', function(){
             if (touchTimeout) {
                 clearTimeout(touchTimeout);
             }
             touchTimeout = null;
         });
     },

     // 添加默认上一张，下一张按钮
     addDefaultBtn : function() {
         var that = this;
         // 添加按钮Html
         var turnBtnHtml = '<a class="msilde_toggle_btn msilde_prev_btn" href="javascript:;" title="上一张"></a><a class="msilde_toggle_btn msilde_next_btn" href="javascript:;" title="下一张"></a>';
         // 向容器添加切换按钮
         that.opts.bannerBox.append(turnBtnHtml);
     },

     // 添加默认小圆点
     addDefaultDot : function() {
         var that = this;
         // 小圆点html
         var dotHtml = "";
         for( var i = 1 ; i <= that.bannerNum ; i++ ){
             var show = ( (i-1) == that.showIndex) ? 'dot_show':'';
             dotHtml += '<a href="javascript:;" class="dot_default '+show+' fl"></a>';
         }
         // 拼接小圆点模块
         var dotBox = '<div class="msilde_dot_box clearfix" >'+dotHtml+'</div>';

         // 向容器添加小圆点
         that.opts.bannerBox.append(dotBox);
     },

     // 重置自动切换
     resetAutoTurn : function() {
         var that = this;
         // 自动切换间隔时间
         var inTime = that.opts.autoTime;
         // 重置计时器
         clearInterval(that.autoTurnTimer);
         that.autoTurnTimer = setInterval(function(){
             that.goPage(that.showIndex+1);
         },inTime);
     }

 };

 // 赋值到全局变量
 module.exports = MSliderH5;
