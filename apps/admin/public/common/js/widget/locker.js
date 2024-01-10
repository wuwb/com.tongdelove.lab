/**
 * 提交锁 & loading
 */
var __lock = false,
  __timer = 0,
  loadingDom = '<div class="loading-toast" id="J_loading"></div>',
  $loading = null;

var fetchLoading = function () {
  if ($loading === null || $loading.length <= 0) {
    $loading = $('#J_loading');
  }

  if ($loading.length <= 0) {
    $loading = $(loadingDom);
    $('body').append($loading);
  }
};

module.exports = {
  lock: function () {
    __lock = true;
  },

  unlock: function () {
    __lock = false;
  },

  islock: function () {
    return __lock;
  },

  showLoading: function (focus) {
    if (window.mgj && window.mgj.progress) {
      window.mgj.progress.hide();
    }

    fetchLoading();

    if (focus) {
      $loading.show();
    } else {
      clearTimeout(__timer);
      __timer = setTimeout(function () {
        $loading.show();
      }, 500);
    }
  },

  hideLoading: function () {
    fetchLoading();

    clearTimeout(__timer);
    $loading.hide();
  },
};
