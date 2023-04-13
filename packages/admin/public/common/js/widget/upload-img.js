'use strict';

var tips = require('./tips');
var locker = require('./locker');
var util = require('./utils/util');

function imgUpload(option) {
  (this.$wrap = option.$wrap || $('body')), (this.$upload = option.$upload); // 上传按钮
  this.callback = option.callback; // 上传完成回调

  this.extraData = option.extraData || null; // 额外上传字段

  this._url = option.action || 'http://upload.mogujie.com/upload/addmpic';

  try {
    this.init();
  } catch (e) {}
}

imgUpload.prototype.init = function () {
  // 创建上传按钮
  var $file = $('<input type="file">').css({
    position: 'absolute',
    top: '0',
    left: '0',
    opacity: '0',
    'font-size': '80px',
  });

  this.$fileMask = $('<div class="__fileuploader">')
    .css({
      position: 'absolute',
      overflow: 'hidden',
    })
    .append($file);

  this.$wrap.append(this.$fileMask);
  this.$inputfile = $file;

  this.resetCover();

  this.event();
};

imgUpload.prototype.show = function () {
  this.$upload.show();
  this.$fileMask.show();
  this.resetCover();
};

imgUpload.prototype.hide = function () {
  this.$upload.hide();
  this.$fileMask.hide();
};

imgUpload.prototype.resetCover = function () {
  this.$fileMask.css({
    top: this.$upload.offset().top - this.$wrap.offset().top,
    left: this.$upload.offset().left - this.$wrap.offset().left,
    width:
      this.$upload.width() +
      parseInt(this.$upload.css('padding-left'), 10) +
      parseInt(this.$upload.css('padding-right'), 10) +
      'px',
    height:
      this.$upload.height() +
      parseInt(this.$upload.css('padding-top'), 10) +
      parseInt(this.$upload.css('padding-right'), 10) +
      'px',
  });
};

imgUpload.prototype.submit = function (file) {
  var _this = this;

  var fd = new FormData();

  fd.append('image', file);

  if (_this.extraData) {
    for (var key in _this.extraData) {
      fd.append(key, _this.extraData[key]);
    }
  } else {
    fd.append('sign', util.getCookie('__ud_'));
  }

  // 创建XMLHttpRequest 提交对象
  var xhr = new XMLHttpRequest();

  var doneCall = function () {
    locker.hideLoading();
    _this.$inputfile.val(''); // reset
  };

  // XHR提交成功后的返回
  xhr.addEventListener(
    'load',
    function (e) {
      doneCall();
      try {
        var data = JSON.parse(e.target.responseText);

        if (data.status.code !== 1001) {
          tips.show(data.result || data.status.msg);
        } else {
          _this.callback && _this.callback(data.result.path, data.result.geo, data.result.imgId);
        }
      } catch (e) {}
    },
    false,
  );

  // 错误信息
  xhr.addEventListener(
    'error',
    function () {
      doneCall();
    },
    false,
  );

  // 取消，此功能没有做
  xhr.addEventListener(
    'abort',
    function () {
      doneCall();
    },
    false,
  );

  locker.showLoading();
  xhr.open('POST', _this._url, true);
  xhr.send(fd);
};

imgUpload.prototype.event = function () {
  var _this = this;

  _this.$inputfile.on('change', function (e) {
    var files = e.target.files;
    if (files.length <= 0) return;

    _this.submit(files[files.length - 1]);
  });
};

module.exports = imgUpload;
