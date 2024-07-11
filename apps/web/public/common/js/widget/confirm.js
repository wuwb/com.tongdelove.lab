/**
* @name wg-x6-confirm
* @desc mogu module
* @create 2014-08-05 @tianming
*/
'use strict';

var _default = {
  wrap: '.ui-confirm',
  type: 'confirm',
  title: '温馨提示',
  showTitle: false,
  tips: '弹窗',
  onConfirm: function () {},
  onCancel: function(){},
  confirmText: '确定',
  cancelText: '取消'
}

/**
 * 
 * @class Confirm
 * @constructor
 */
var Confirm = function(cfg) {
  
    var self = this;

    self.cfg = $.extend({}, _default, cfg);

    self.init();
}

Confirm.prototype = {
    //初始化
    init : function () {

      this.buildDom();

      this.bindEvent();
    },

    // 获得弹窗内部的dom字符串
    getDomStr : function () {
        var self = this , 
            type = self.cfg['type'], 
            tips = self.cfg['tips'] , 
            title = self.cfg['title'] , 
            showTitle = self.cfg['showTitle'] , 
            wrap = self.cfg['wrap'].replace('.' , '');

        var arr = [
          '<div class="ui-confirm ' + (wrap === 'ui-confirm' ? '' : wrap) + '" style="visibility: hidden;">',
            '<div class="mask"></div>',
            '<div class="box">',
              showTitle ? ('<h5 class="tit">' + title + '</h5>') : '',
              '<div class="content">' + tips + '</div>',
              '<div class="action">' + (type === 'confirm' ? ' <span class="btn btn-cancel cancel">' + self.cfg['cancelText'] + '</span>' : '') + '<span class="btn btn-sure confirm">' + self.cfg['confirmText'] + '</span></div>',
            '</div>',
          '</div>'
        ];

        return arr.join('');
    },

    // 构建dom结构
    buildDom : function () {
        var domStr = this.getDomStr();
        var confirmBox = $(domStr);
        
        this.confirmBox = confirmBox;
        $('body').append(confirmBox);
        
        this.maskZoom();
        this.calcPos();

        return this;
    },

    // 确定弹窗的位置（margin值）
    calcPos : function () {
        this.confirmBox.css('visibility' , 'visible');

        return this;
    },

    // 初始化蒙层的边界(高度)
    maskZoom : function () {
        var viewSize = window.innerHeight , 
            bodySize = document.body.scrollTop + viewSize;
        var mask = this.confirmBox.find('.mask');

        /*if (viewSize >= bodySize) {
          mask.css('height' , viewSize + 'px'); 
        } else {
          mask.css('height' , bodySize + 'px'); 
        }*/
        mask.css('height' , bodySize + 'px');

        return this;
    },

    // 代理事件
    bindEvent : function () {
        var self = this;
        var box = this.confirmBox;

        box.on('click' , '.cancel' , function (e) {
            var res1 = self.cfg['onCancel']();
            if ((res1 !== false)) {
                self.destroy();
            }
        }).on('click' , '.confirm' , function (e) {
            var res1 = self.cfg['onConfirm']();
            if ((res1 !== false)) {
                self.destroy();
            }
        }).on('touchstart' , '.btn' , function (e) {
            $(e.currentTarget).addClass('active');
        }).on('touchend' , '.btn' , function (e) {
            $(e.currentTarget).removeClass('active');
        }).on('touchmove', function (e) {
            e.preventDefault();
        });
    },

    // 销毁弹窗
    destroy : function () {
        var self = this,
            _time = null;
        
        self.confirmBox.addClass('fadeOut');

        _time = setTimeout(function(){
            self.confirmBox.remove();
            self = null;
        },400);
    }
}

module.exports = Confirm;
