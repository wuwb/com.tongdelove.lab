/**
 * 图个墙
 */
'use strict';

var util = require('./utils/util');
// var dot = require('dot');
var dot = MoGu.ui.getdoT();
var Router = require('../router');
var _ = require('underscore');
var win = window;

var Wall = function ($wrap, option) {
  this.$wrap = $wrap;
  this.locker = false;
  this.loaded = false;

  this.settings = _.extend(
    {
      stamp: +new Date(),
      start: 0,
      tpl: '',
      api: '',
      $croller: $(win),
      offset: 5,
      // 是否初始化时加载
      emptyBrick: false,
      // 是否显示为空的dom
      showEmptyDom: false,
      data: {}, // ajax的data
      $loadingDom: $('<li class="J_loading wall-loading">加载中...</li>'),
      $emptyDom: $('<li class="wall-empty">暂无</li>'),
    },
    option,
  );

  this.init();
};

Wall.prototype.init = function () {
  var appendLen = this.$wrap.find('.J_brick').length;

  if ((!this.settings.emptyBrick && appendLen <= 0) || appendLen % this.settings.offset !== 0) {
    this.loaded = true;
    return;
  }
  this.listen();
};

Wall.prototype.stop = function () {
  this.loaded = true;
  this.settings.$croller.off('scroll.wall' + this.settings.stamp);

  if (this.settings.showEmptyDom && this.$wrap.find('.J_brick').length <= 0) {
    this.$wrap.append(this.settings.$emptyDom);
  }
};

Wall.prototype.listen = function () {
  var self = this,
    isDomScroll =
      self.settings.$croller &&
      self.settings.$croller.length > 0 &&
      self.settings.$croller[0] !== win
        ? true
        : false,
    globalHeight,
    scrollY,
    clientHeight;

  var load = function () {
    // load
    if (!isDomScroll) {
      globalHeight = self.$wrap.offset().top + self.$wrap.height();
      scrollY = window.scrollY;
      clientHeight = document.body.clientHeight;
    } else {
      globalHeight =
        self.$wrap.offset().top - self.settings.$croller.offset().top + self.$wrap.height();
      scrollY = self.$wrap.scrollTop();
      clientHeight = self.settings.$croller.height();
    }

    if (!self.loaded && !self.locker && globalHeight - scrollY - clientHeight < clientHeight) {
      self.render();
    }
  };

  self.settings.$croller.off('scroll.wall' + self.settings.stamp).on(
    'scroll.wall' + self.settings.stamp,
    _.throttle(function () {
      load();
    }, 100),
  );

  if (self.settings.emptyBrick) {
    load();
  }

  Router.history.on('route', function () {
    self.stop();
  });
};

Wall.prototype.render = function () {
  var len,
    self = this;

  self.locker = true;

  // update len
  len = self.$wrap.find('.J_brick').length;
  self.settings.start = len > 0 ? len : 0;

  self.$wrap.append(self.settings.$loadingDom);
  self.settings.$loadingDom.show();

  $.ajax({
    url: self.settings.api,
    data: $.extend({}, self.settings.data, {
      start: self.settings.start,
      offset: self.settings.offset,
    }),
    type: 'POST',
    dataType: 'json',
  }).done(function (json) {
    self.locker = false;
    self.settings.$loadingDom.hide();

    util.verify(json, function (result) {
      if (typeof self.settings.preFormat == 'function') result = self.settings.preFormat(result);
      var $newItem = $(dot.template(self.settings.tpl)(result));
      var appendLen = $newItem.filter('.J_brick').length;

      self.$wrap.append($newItem);

      if (appendLen <= 0 || appendLen % self.settings.offset !== 0) {
        self.stop();
        return;
      }
    });
  });
};

module.exports = function ($wrap, option) {
  return new Wall($wrap, option);
};
