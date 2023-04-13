/**
 * @name pwd弹窗
 * @desc mogu module
 * @create tianwu
 */
'use strict';

var util = require('./utils/util');
var api = window._neo['apis'];
var AES = require('./utils/aes');
var RSA = require('./utils/rsa');
var locker = require('./locker');
var tips = require('./tips');

var _default = {
  status: 0, //1设置, 2验证,、
  desc: '请设置新的支付密码', //弹窗标题
  callBack: function (pwd) {}, //完成后的回调,回调支付密码和 加密后的支付密码
};

/**
 *
 * @class Tips
 * @constructor
 */
var Pwd = function (settings) {
  this.opt = $.extend({}, _default, settings);
  this.init();
};

Pwd.prototype = {
  /*
   * 初始化
   * */
  init: function () {
    var self = this;
    this.pwd = '';
    this.pwdForSet = '';

    //判断支付密码没有设置
    if (self.opt.status) {
      if (self.opt.status == 2) {
        self.opt.desc = '请输入支付密码';
      }
      locker.showLoading();
      setTimeout(function () {
        locker.hideLoading();
        self.render();
      }, 1000);
      return '';
    }
    self._checkPwdSet(function (data) {
      if (data['isSet']) {
        self.opt.status = 2;
        self.opt.desc = '请输入支付密码';
      } else {
        self.opt.status = 1;
      }
      locker.showLoading();
      setTimeout(function () {
        locker.hideLoading();
        self.render();
      }, 1000);
    });
  },

  randomNum: function () {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      random = [],
      len = arr.length;
    for (var i = 0; i < len; i++) {
      var index = Math.floor(Math.random() * (len - i));
      random.push(arr[index]);
      arr.splice(index, 1);
    }
    return random;
  },
  render: function () {
    this.$el = $('#M-pwd');
    if (!this.$el.get(0)) {
      var arr = this.randomNum();
      var $dom = [
        '<div id="M-pwd" class="ui-confirm paypwd-box">',
        '<div class="mask"></div>',
        '<div id="J-payconfirm" class="box">',
        '<label id="J-pwd-lab">' + this.opt.desc + ' </label>',
        '<div class="paypwd-text">',
        '<div class="paypwd-border clearfix"><span></span><span></span><span></span><span></span><span></span><span></span></div>',
        '<div id="J-paypwd-val" class="paypwd-val clearfix"></div>',
        '</div>',
        '<a href="javascript:;" class="paypwd-close J_closebtn">×</a>',
        '</div>',
        '<ul id="J-keyboard" class="keyboard clearfix">',
      ];
      for (var i = 0; i < 9; i++) {
        $dom.push('<li data-num="' + arr[i] + '">' + arr[i] + '</li>');
      }
      $dom.push(
        '<li class="s-noBg"></li>',
        '<li data-num="' + arr[i] + '">' + arr[i] + '</li>',
        '<li data-num="del" class="s-noBg"><i class="iconfont icon-delete"></i></li>',
        '</ul>',
        '</div>',
      );

      this.$el = $($dom.join(''));

      this.$el.appendTo('body');
    }
    this.maskZoom();
    this.$el.show();
    this.$el.find('#J-payconfirm').removeClass('fadeOut').addClass('fadeIn');
    this.initEvent();
    window.scrollTo(0, 0);
  },
  initEvent: function () {
    var self = this,
      $key = self.$el.find('#J-keyboard li');
    var num = '0';

    var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
      touchstart = mobile ? 'touchstart' : 'mousedown',
      touchmove = mobile ? 'touchmove' : 'mousemove',
      touchend = mobile ? 'touchend' : 'mouseup';

    $key.unbind(touchstart).unbind(touchmove).unbind(touchend);
    $key
      .bind(touchstart, function (e) {
        num = $(e.currentTarget).attr('data-num');
        $(this).addClass('s-select');
      })
      .bind(touchmove, function (e) {
        e.preventDefault();
      })
      .bind(touchend, function (e) {
        $(this).removeClass('s-select');
        if (num == $(e.currentTarget).attr('data-num')) {
          self.pwdInput(num);
        }
      });
    self.$el
      .find('.J_closebtn')
      .unbind(touchend)
      .bind(touchend, function () {
        self.destory(null);
      });
  },
  // 初始化蒙层的边界(高度)
  maskZoom: function () {
    var viewSize = document.body.clientHeight,
      bodySize = document.body.scrollTop + viewSize;
    var mask = this.$el.find('.mask');

    mask.css('height', bodySize + 'px');

    return this;
  },
  pwdInput: function (num) {
    if (!num) {
      return '';
    }
    var pwdLength = this.pwd.length;
    if (pwdLength >= 6) {
      if (num == 'del') {
        this.pwd = '';
      }
      return '';
    }

    if (num == 'del') {
      this.pwd = this.pwd.substring(0, this.pwd.length - 1);
    } else {
      this.pwd += num;
    }
    // var string = "••••••••••••••••••••••";
    var holder = [
      '<span></span>',
      '<span></span>',
      '<span></span>',
      '<span></span>',
      '<span></span>',
      '<span></span>',
      '<span></span>',
      '<span></span>',
      '<span></span>',
      '<span></span>',
      '<span></span>',
      '<span></span>',
    ];
    // this.$el.find("#J-paypwd-val").text(string.substring(0, this.pwd.length));
    this.$el.find('#J-paypwd-val').html(holder.splice(0, this.pwd.length).join(''));
    if (this.pwd.length == 6) {
      this.pwdEnd();
    }
  },
  pwdEnd: function () {
    var pwd = this.pwd;
    var self = this;

    switch (this.opt.status) {
      case 1:
        if (!this.pwdForSet) {
          this.inputAgain(pwd);
        } else {
          this.pwdSet(pwd);
        }
        break;
      case 2:
        this.pwdCheck(pwd);
        break;
    }
  },
  inputAgain: function (pwd) {
    //缓存当前次的支付密码
    this.$el.find('#J-paypwd-val').html('');
    this.pwd = '';
    this.pwdForSet = pwd;
    this.$el.find('#J-pwd-lab').text('请确认支付密码');
  },
  pwdSet: function (pwd) {
    var self = this;
    if (self.pwdForSet != pwd) {
      tips.show('两次输入的支付密码不一致,请重试');
      self.$el.find('#J-pwd-lab').text('请设置新的支付密码');
      self.$el.find('#J-paypwd-val').html('');
      self.pwd = '';
      self.pwdForSet = '';
      return false;
    }
    if (locker.islock()) {
      return false;
    }
    locker.lock();
    self._signPwd(pwd, function (fpwd) {
      self._addPwd(fpwd, function () {
        locker.unlock();
        self.destory(function () {
          if (typeof self.opt.callBack == 'function') {
            self.opt.callBack.call(self, pwd);
          }
        });
      });
    });
  },
  pwdCheck: function (pwd) {
    var self = this;
    self.destory(function () {
      if (typeof self.opt.callBack == 'function') {
        self.opt.callBack.call(self, pwd);
      }
    });
  },
  destory: function (callBack) {
    var self = this;
    self.$el.removeClass('fadeIn').addClass('fadeOut');
    setTimeout(function () {
      self.$el.remove();
      if (typeof callBack == 'function') {
        callBack();
      }
      self = null;
    }, 500);
  },
  _signPwd: function (pwd, callBack) {
    try {
      AES.getSrandNum(function (seed) {
        if (typeof pwd == 'object') {
          var aesPwd = AES.encryptData(seed, pwd);
          var finalPwd = RSA.encryptData(aesPwd);
        } else {
          var aesPwd = AES.encrypt(seed, pwd);
          var finalPwd = RSA.encrypt(aesPwd);
        }
        if (typeof callBack == 'function') callBack(finalPwd);
      });
    } catch (err) {
      tips.show('未知错误，可能的原因：1.网络问题 2.服务器超时 3.其他原因', 2000);
      callBack(false);
    }
  },
  _checkPwdSet: function (callback) {
    var self = this;
    $.ajax({
      url: api['pwd/checkPasswordSet'],
      data: null,
      type: 'POST',
      dataType: 'json',
    }).done(function (json) {
      util.verify(json, function (result) {
        if (typeof callback == 'function') callback.call(self, result);
      });
    });
  },
  _addPwd: function (pwd, callback) {
    var self = this;
    $.ajax({
      url: api['pwd/addPassword'],
      data: { pwd: pwd, pwdConfirm: pwd },
      type: 'POST',
      dataType: 'json',
    }).done(
      function (json) {
        util.verify(json, function (result) {
          if (typeof callback == 'function') callback.call(self, result);
        });
      },
      function () {
        self.$el.find('#J-pwd-lab').text('请设置新的支付密码');
        self.$el.find('#J-paypwd-val').html('');
        self.pwdForSet = '';
        self.pwd = '';
      },
    );
  },

  _checkPwd: function (pwd, callback) {
    //判断支付密码是否正确
    var self = this;
    $.ajax({
      url: api['pwd/checkPasswordCorrect'],
      data: { pwd: pwd },
      type: 'POST',
      dataType: 'json',
    }).done(function (json) {
      util.verify(
        json,
        function (result) {
          if (typeof callback == 'function') callback.call(self, result);
        },
        function () {
          self.$el.find('#J-pwd-lab').text('请输入支付密码');
          self.$el.find('#J-paypwd-val').html('');
          self.pwd = '';
        },
      );
    });
  },
};

module.exports = Pwd;
