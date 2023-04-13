function aNum($wrap, number, options) {
  if (!$wrap || $wrap.length <= 0) return;

  options = options || {};
  this.$wrap = $wrap;
  this.speed = options.speed || 1000; // ms
  this.fps = options.fps || 24;
  this.pointer = options.pointer || null;

  this.number = number;

  this.init();
}

aNum.prototype.init = function () {
  this.times = parseInt((this.speed / 1000) * this.fps, 10);

  if (this.times <= 0) {
    this.times = 1;
  }

  this.i = 0;

  this.$wrap.html(((this.number * this.i) / this.times).toLocaleString(this.pointer));

  (function moving(self, animateFn) {
    self.i++;
    if (self.i <= self.times) {
      animateFn(function () {
        self.$wrap.html(((self.number * self.i) / self.times).toLocaleString(self.pointer));
        moving(self, animateFn);
      }, 1000 / self.fps);
    }
  })(this, window.requestAnimationFrame || window.setTimeout);
};

module.exports = aNum;
