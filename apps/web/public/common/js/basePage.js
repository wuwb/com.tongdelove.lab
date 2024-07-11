var dot = MoGu.ui.getdoT();
var Router = require('./router');
var locker = require('./widget/locker');
var header = require('./widget/header');
var tips = require('./widget/tips');

var $doc = $(document);

var base = {
    // wrap dom
    $el: null,

    // header
    title: appName,
    titleoptions: null,

    // 模版字符串
    template: '',
    // 主题模版集合
    themesTplCollect: null,

    // 布局字符串
    layout: '',

    // 远程数据接口
    urlRoot: '',

    // 远程数据接口请求数据对象,
    originData: null,

    // 渲染数据
    _renderData: null,

    // 预处理数据
    preFormat: null,

    // 渲染结束
    renderDone: null,

    // 事件绑定函数
    listen: null,

    render: function() {
        var $content = null;

        if (this.layout) {
            $content = $('<div class="layout">');
            $content.html(dot.template(this.layout)(this._renderData));
            $content.find('#main').html(dot.template(this.template)(this._renderData));
        } else {
            $content = $(dot.template(this.template)(this._renderData));
        }

        this.$el.html($content);
    },

    init: function () {
        this.initialize();
    },

    initialize: function() {
        $doc.trigger('trace:renderdone:start');

        header.set(this.title, this.titleoptions);
        //app右边上角菜单
        if(window.mgj && window.mgj.navigation){
            mgj.navigation.rightitem.setTitle("");
            $(document).off('rightButton');
        }
        // 切换模版
        var __app = window.__runningapp;
        if (__app &&
            this.themesTplCollect &&
            this.themesTplCollect[__app]) {
            this.template = this.themesTplCollect[__app];
        }

        var self = this,
            $view, $oldPage,
            $fence = null,
            $disable = null,
            isSwip = false;

        // wrap dom
        self.$el = $('<div class="page">');

        $view = $('#view');
        $oldPage = $view.find('.page');

        if ($oldPage.length > 0
            && window.__animatehover !== 'no') { // 存在页面，增加切换动画
            isSwip = true;

            $disable = $('<div class="animate-disable">');

            if (!window.__animatehover) {
                $fence = $('<div class="animate-fence">');
                self.$el.addClass('animate-forward-new');
                $oldPage.addClass('animate-forward-old');
            } else {
                $fence = $('<div class="animate-fence-hover">');
                self.$el.addClass('animate-back-new');
                $oldPage.addClass('animate-back-old');

                window.__animatehover = false;
            }

            $view.append($disable);
            $view.append($fence);
        } else {
            window.__animatehover = false;
        }

        if (isSwip) {
            $view.append(self.$el);

            setTimeout(function() {
                $view.addClass('animate-moving');

                setTimeout(function() {
                    $fence && $fence.remove();
                    $disable && $disable.remove();
                    $oldPage.remove();
                    self.$el.removeClass('animate-forward-new');
                    self.$el.removeClass('animate-back-new');
                    $view.removeClass('animate-moving');
                }, 800);
            }, 0);
        } else {
            $view.html(self.$el);
        }

        if (self.urlRoot) { // 远程数据
            self.fetch({
                data: self.originData,
                isRender: true // 渲染接口错误返回会 histroy.back();
            })
            .done(function(data) {
                // 存渲染数据
                self._renderData = self.preFormat ? self.preFormat(data) : data;
                self.render();
                self.renderDone && self.renderDone();
                $doc.trigger('trace:renderdone:end');
                $doc.trigger('trace:renderdone');
                self.listen && self.listen();
                self.delegateEvents();
            })
        } else {
            self.render();
            self.renderDone && self.renderDone();
            $doc.trigger('trace:renderdone:end');
            $doc.trigger('trace:renderdone');
            self.listen && self.listen();
            self.delegateEvents();
        }

    },
    //接替find
    $: function(selector) {
        return this.$el.find(selector);
    },
    //绑定事件
    delegateEvents: function(events) {
        var _this=this;
        if (!(events || (events = this['events']))) return this;

        for (var key in events) {
            var method = events[key];
            if (typeof this[events[key]] == "function" ){
                method = this[events[key]];
            }else{
                continue;
            }

            var match = key.match(/^(\S+)\s*(.*)$/);
            var eventName = match[1], selector = match[2];

            (function(method,context,eventName,selector){
                if (selector === '') {
                    context.$el.off(eventName).on(eventName, function(){
                        return method.apply(context,arguments);
                    });
                } else {
                    context.$el.off(eventName, selector).on(eventName, selector, function(){
                       return method.apply(context,arguments);
                    });
                }
            }(method,_this,eventName,selector));


        }
        return this;
    },
    navigate: function(fragment, options) {
        Router.navigate(fragment, options);
        return this;
    },
    fetch: function (options) {
        var self = this,
            deferred = $.Deferred && $.Deferred();
        //deferr
        var def = deferred.promise();
        options = options ? options : {};
        if (options.parse === void 0) options.parse = true;
        //默认
        var data = {
            url: options.url || self.urlRoot,
            data: options.data || {},
            type: options.type || 'POST',
            timeout:15000,
            dataType: options.dataType || 'json'
        };
        //url为空就不请求
        if(!data.url){
            deferred.rejectWith(options.context || self, ['请求链接为空', 'fail', deferred]);
            return this;
        }
        locker.lock();
        locker.showLoading();

        $.ajax(data)
            .done(function (data) {
                locker.hideLoading();
                locker.unlock();

                if (options.parse) {
                    self.parse(data, options, deferred);
                } else {
                    deferred.resolveWith(options.context || self, [data, 'success', deferred]);
                }
            }).fail(function () {
                locker.hideLoading();
                locker.unlock();
                deferred.rejectWith(options.context || self, ['未知错误，可能的原因：1.网络问题 2.服务器超时 3.其他原因', 'fail', deferred]);

                if (options.isRender) history.back();
            });

        return def;
    },

    //可以在fetch传{parse:false}来取消单个请求的默认解析
    parse: function (data, options, deferred) {

        if (data && data.success) {
            // TODO 各种状态
            // if (data.status.code === 1001) {
                var renderData = data.data;
                if(typeof renderData === 'string' && renderData.indexOf('{')!=-1){
                  renderData = JSON.parse(renderData);
                }
                deferred.resolveWith(options.context || this, [renderData, 'success', deferred]);

            // } else if (data.status.code === 1022) {
            //     //小店的登录
            //     if(/xiaodian/.test(location.host)){
            //         url = "http://www.xiaodian.com/h5/unlogin?redirect_url=" + encodeURIComponent(location.href);
            //         location.href = url;
            //         return "";
            //     }
            //     var url = "http://m.mogujie.com/x5/login?redirect_url=" + encodeURIComponent(location.href);
            //     switch(window.__runningapp) {
            //         case 'p2p':
            //             url = "/login?redirect=" + encodeURIComponent(location.pathname.split('/p2p').join('') + location.search);
            //             this.navigate(url, {trigger: true, replace: true});
            //             break;
            //         default:
            //             var agent = window.navigator.userAgent;
            //             if (/mogujie/i.test(agent.toLocaleLowerCase())) {
            //                 url = "mgj://login";
            //             }
            //             setTimeout(function() {
            //                 location.href = url;
            //             }, 500);
            //             break;
            //     }
            // } else if (data.status.code === 3002) {
            //     // 未实名
            //     this.redirectRealName();
            // } else if (data.status.code === 67302) {
            //     // 服务端跳转
            //     location.replace(data.result);
            // } else {
            //     var msg = (typeof  data.result =="string"?data.result:null) || data.status.msg || '未知错误，可能的原因：1.网络问题 2.服务器超时 3.其他原因';
            //     deferred.rejectWith(options.context || this, [msg, 'fail', deferred]);
            //     if (!options.hideTip)tips.show(msg);
            //     if (options.isRender) history.back();
            // }
        } else {
            var msg = '未知错误，可能的原因：1.网络问题 2.服务器超时 3.其他原因';
            deferred.rejectWith(options.context || this, [msg, 'fail', deferred]);
            if (!options.hideTip)tips.show(msg);
            if (options.isRender) history.back();
        }
    },

    redirectRealName:function(){
        var url = "/pay/realname/add?_apptype=" + window.__runningapp + "&slap=1&redirect=" + encodeURIComponent(location.href);
        location.replace(url);
    }

};

var BaseView = {};

BaseView.extend = function (obj) {
    var _originFrame = $.extend({}, base, obj);

    return function () {
        for (var k in _originFrame) {
            this[k] = _originFrame[k];
        }
    };
};

module.exports = BaseView;
