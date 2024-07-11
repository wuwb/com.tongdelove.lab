/**
 * @name wg-x6-tips
 * @desc mogu module
 * @create 2014-08-5 @tianming
 */
'use strict';

/**
 * @duration {int} 持续时间
 */
var _default = {
    duration: 1500      //传值0，则不自动消失
}

/**
 * 
 * @class Tips
 * @constructor
 */
var Tips = function(settings){
    var opt = $.extend({}, _default, settings);

    this.duration = opt.duration;

    this.init();
}

Tips.prototype = {
    /*
     * 初始化
     * */
    init : function(){
        this.elem = $('#M_Tips');

        if (!this.elem.get(0)) {
            this.elem = $("<div id='M_Tips' class='ui-tips' style='display:none;'><span class='ui-tips-text'></span></div>");
            this.elem.appendTo('body');
        }

        this.text = this.elem.find('.ui-tips-text');
    },
    
    /*
     * 显示
     * @text {String} 提示文本
     * @duration {int} 持续显示时间
     * @callback {Object} 隐藏后回调函数
     * */
    show : function(text, duration, callback){
        var self = this;

        self.elem.show();

        if (text && typeof text == 'string') {
            self.text.html(text)
                     .removeClass('fadeOut').addClass('fadeIn');
        }

        if (isNaN(duration) && !$.isFunction(callback) && callback !== false){
            callback = duration;
            duration = self.duration;
        }

        //自动消失
        if (duration != 0) {
            self.hide(duration, callback);
        }
    },

    /*
     * 隐藏
     * @duration {int} 持续显示时间
     * @callback {Object} 隐藏后回调函数
     * */
    hide : function(duration, callback){
        var self = this,
            _timer = null;

        _timer = setTimeout(function () {
            self.text.removeClass('fadeIn').addClass('fadeOut');
            
            setTimeout(function (){
                self.elem.hide();
                
                callback && callback();             //执行回调
            }, 1000);

        }, duration || self.duration);
    }

}

//MoGu.fn.set('tip', Tips);

var toolTips = new Tips();          //单例，一个项目只需要实例化一次
module.exports = toolTips;
