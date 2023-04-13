/**
 * @短信倒计时按钮
 * @param {jQuery dom} $btn 按钮
 * @param {function} clickcb 按钮点击回调
 */
function Smsbtn($btn, clickcb) {
  if ($btn.length <= 0) return;

  var time = $btn.attr('data-time');

  this.$el = $btn;
  this.time = !isNaN(time) && +time > 0 ? time : 0;
  this.timer = 0;

  this.wait = 60; // 60s
  this.enable = false;
  this.clickcb = clickcb;

  this.enableClass = 'btn-sms-enable';
  this.normalHTML = '发送验证码';
  this.retryHTML = '重新发送';
  this.timerHTML = '<span>%s</span>秒后重发';

  this.init();
}

Smsbtn.prototype.init = function () {
  if (this.time > 0) {
    this.run();
    this.clickcb && this.clickcb();
  } else {
    this.reset();
  }

  var self = this;

  this.$el.on('click', function (e) {
    e.preventDefault();

    if (!self.$el.hasClass('btn-sms-enable')) return;

    self.time = self.wait;
    self.run();
    self.clickcb && self.clickcb();
  });
};

Smsbtn.prototype.run = function () {
  this.enable = false;
  this.$el.removeClass(this.enableClass);

  (function go(self) {
    self.$el.html(self.timerHTML.replace(/%s/gim, self.time--));

    if (self.time >= 0) {
      clearTimeout(self.timer);
      self.timer = setTimeout(function () {
        go(self);
      }, 1000);
    } else {
      self.retry();
    }
  })(this);
};

Smsbtn.prototype.reset = function () {
  clearTimeout(this.timer);
  this.enable = true;

  this.$el.addClass(this.enableClass).html(this.normalHTML);
};

Smsbtn.prototype.retry = function () {
  clearTimeout(this.timer);
  this.enable = true;

  this.$el.addClass(this.enableClass).html(this.retryHTML);

  this.time = 0;
};

module.exports = Smsbtn;
