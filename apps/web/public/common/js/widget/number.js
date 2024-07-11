// number
function NumberScreen($wrap, options) {
  options = options || {};

  this.$wrap = $wrap;

  this.T_unit = options.T_unit || [
    '<div class="unit J_unit">',
      '<ul class="unit-list J_ulist">',
        '<li class="unit-blk">0</li>',
        '<li class="unit-blk">1</li>',
        '<li class="unit-blk">2</li>',
        '<li class="unit-blk">3</li>',
        '<li class="unit-blk">4</li>',
        '<li class="unit-blk">5</li>',
        '<li class="unit-blk">6</li>',
        '<li class="unit-blk">7</li>',
        '<li class="unit-blk">8</li>',
        '<li class="unit-blk">9</li>',
        '<li class="unit-blk">.</li>',
        '<li class="unit-blk">,</li>',
      '</ul>',
    '</div>'
  ].join('');
}

NumberScreen.prototype.refreshPayNum = function(num) {
  num += '';

  var len = num.length,
    display_len = this.$wrap.find('.J_unit').length;

  if (len > display_len) { // 补位
    for (var i = 0, l = len - display_len; i < l; i++) {
      this.$wrap.prepend(this.T_unit);
    }
  }

  var $nums = this.$wrap.find('.J_unit');
  for (var l = $nums.length, i = l - 1, dl = len, di = dl - 1; i >= 0; i--, di--) {
    if (di >= 0) {
      var num_cur = num[di];

      if (num_cur === '.') {
        num_cur = '10';
      }

      if (num_cur === ',') {
        num_cur = '11';
      }

      $nums.eq(i).show().find('.J_ulist').css({
        'transform': 'translate(0, ' + ((+num_cur) * -100 / 12) + '%)',
        '-webkit-transform': 'translate(0, ' + ((+num_cur) * - 100 / 12) + '%)'
      });
    } else {
      $nums.eq(i).hide();
    }
  }
};

module.exports = NumberScreen;
