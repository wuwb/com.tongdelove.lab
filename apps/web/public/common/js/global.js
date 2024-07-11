var Router = require('./router'),
  attachFastClick = require('./widget/fastclick');

var win = window,
  doc = document;

new attachFastClick(document.body);

function a() {
  // doc.documentElement.style.fontSize = doc.documentElement.clientWidth / 32 + "px" // note 15:9好难看
  doc.documentElement.style.fontSize = "10px";
}
var b = null;
win.addEventListener("resize", function() {
    clearTimeout(b),
    b = setTimeout(a, 300)
}, !1), a();

$(doc)
  // 啊标签走navigate
  .on('click', 'a', function(e) {
    var
      $this = $(this),
      url = $this.attr('href'),
      nonav = $this.attr('data-nonav');

    if (!url || url.indexOf('javascript') === 0) {
      return;
    }

    if (url.indexOf('/') === 0 && nonav !== 'true') {
      e.preventDefault();


      if ($this.attr('data-animatehover') === 'no') {
          window.__animatehover = "no";
      } else if ($this.attr('data-animatehover') === 'true') {
          window.__animatehover = true;
      }
      Router.navigate(url);
    }else {

      location.href = url;
    }
    return false;
  })

  // 阻止默认表单提交
  .on('submit', 'form', function(e) {
      if($(this).attr('data-nonav') === 'true') {
        return true;
      }
      e.preventDefault();
  });

// 重载toLocaleString方法
Number.prototype.toLocaleString = function(fixedNum) {
  var num = this.valueOf(),
    re = /(-?\d+)(\d{3})/;

  if (!isNaN(fixedNum) && fixedNum >= 0) {
    num = num.toFixed(fixedNum);
  }

  num = (num + '').split('.');

  for (var i = 0, len = num.length; i < len; i++) {
    while(re.test(num[i])) {
      num[i] = num[i].replace(re, "$1,$2");
    }
  }

  return num.join('.');
};

var _hisback = win.history.back;
win.history.back = function() {
  win.__animatehover = true;
  _hisback.apply(this, arguments);
};
