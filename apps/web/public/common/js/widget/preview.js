/**
 * @name preview
 * @desc 图片预览
 * @create 2014-08-27 @buji
 */

'use strict';

var locker = require('./locker');

var $body = $('body'),

    maskStyle = {
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'text-align': 'center',
        'vertical-align': 'middle',
        'height': '100%',
        'width': '100%',
        'display': 'table',
        'z-index': '21',
        'background': 'rgba(0, 0, 0, .3)',
    },

    previewStyle = {
        'display': 'table-cell',
        'vertical-align': 'middle'
    },

    fnsStyle = {
        'position': 'absolute',
        'left': '0',
        'bottom': '.6rem',
        'width': '100%',
        'height': '4rem',
        'color': '#fff',
        'text-align': 'center',
        'font-size': '2.8rem'
    };

var app = {

    /**
     * 事件初始化
     * @param {jQuery Obj} $imgs img 对象
     */
    bindEvent: function($imgs, fns) {
        $imgs
            .off('click')
            .on('click', function(e) {
                e.preventDefault();

                var $this = $(this),
                    $preview, $mask, $fns,
                    dsrc = $this.attr('data-dsrc');

                if (!dsrc) return; // 没有原图

                $preview = $('<span><img src="' + dsrc + '" style="max-width:100%;max-height:80%;"></span>');
                $preview.css(previewStyle);

                $mask = $('<div>');
                $mask.css(maskStyle);
                $mask.append($preview);

                if (typeof fns === 'object' && fns.length) {
                    $fns = $('<div>');
                    $fns.css(fnsStyle);

                    for (var i = 0, len = fns.length; i < len; i++) {
                        (function(i) {
                            $fns.append(fns[i].$dom);
                            $fns.on('click', function() {
                                fns[i].fn && fns[i].fn($this);
                            });
                        }(i));
                    }
                        
                    $mask.append($fns);
                }
                
                locker.showLoading();

                $body.append($mask);

                $mask.on('click', function(e) {
                    e.preventDefault();
                    $mask.remove();
                    locker.hideLoading();
                });
            });
    },
    /**
     * 图片预览初始化
     * @param {jQuery Obj} $imgs img 对象
     * @param {array} fns 功能区
     */
    init: function($imgs, fns) {
        if ($imgs && $imgs.length > 0) {
            this.bindEvent($imgs, fns);
        }
    }
};

module.exports = app;
