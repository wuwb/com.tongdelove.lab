// header

var header = {
  lbtn_tpl: '<span class="icon-back iconfont"></span>',
  rbtn_tpl: '',

  $el: $('#header'),

  init: function() {
    var _this = this;

    _this.$el = $('#header');
    _this.$el
      .on('click', '.J_lfn', function() {
        _this.lfn && _this.lfn();
        return false;
      })
      .on('click', '.J_rfn', function() {
        _this.rfn && _this.rfn();
        return false;
      });

  },

  set: function(t, option) {

    option = option || {};

    this.rfn = option.rfn || null;
    this.lfn = option.lfn || function() {
      history.back();
    };

    this.none = option.none || false;

    if (this.none) {
      this.$el.hide();
    } else {
      this.$el.show();
    }

    this.$el.find('.J_lfn').html(typeof option.$lfn === 'string' ? option.$lfn : this.lbtn_tpl);
    this.$el.find('.J_rfn').html(typeof option.$rfn === 'string' ? option.$rfn : this.rbtn_tpl);
    this.$el.find('.J_tit').html(t);

    document.title = window.appName;
    if (window.mgj && mgj.navigation && mgj.navigation.setTitle) {
      mgj.navigation.setTitle(t);
    }
  }

};

header.init();

module.exports = header;
