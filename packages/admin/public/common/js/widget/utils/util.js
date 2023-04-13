var Router = require('../../router');
var tips = require('../tips');
var locker = require('../locker');

module.exports = {
  /**
   * @desc 获取链接参数的值
   * @param  {string} name参数名字
   * @param  {string} url链接url［可选］，为空的时候取location.href
   * @return {string} 参数
   */
  getQueryString: function (name, url) {
    url = url == null ? window.location.href : url;
    url = url.split('#')[0];

    var reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(\\s|&|$)', 'i');
    return reg.test(url) ? decodeURIComponent(RegExp.$2.replace(/\+/g, ' ')) : '';
  },
  setCache: function (key, val) {
    if (val === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(val));
    }

    return true;
  },
  getCache: function (key) {
    return JSON.parse(localStorage.getItem(key));
  },

  setCookie: function (name, value, options) {
    var arr = [],
      date;
    options = options || {};

    // 配置过期时间
    if (value == null) {
      value = '';
      options.expires = -1;
    }
    if (typeof options.expires === 'number') {
      date = new Date();
      date.setTime(date.getTime() + options.expires * 1000);
    } else if (options.expires instanceof Date) {
      date = options.expires;
    }

    arr.push(name + '=' + encodeURIComponent(value));
    date && arr.push('expires=' + date.toUTCString());
    options.path && arr.push('path=' + options.path);
    options.domain && arr.push('domain=' + options.domain);
    options.secure && arr.push('secure');

    return (document.cookie = arr.join('; '));
  },

  getCookie: function (name) {
    var ret, arr, i, len;

    if (document.cookie) {
      arr = document.cookie.split('; ');
      for (i = 0, len = arr.length; i < len; i++) {
        if (arr[i].indexOf(name + '=') === 0) {
          ret = decodeURIComponent(arr[i].substr(name.length + 1));
          break;
        }
      }
    }
    return ret;
  },

  //setSession:function(key,val){
  //  if (val === null) {
  //    sessionStorage.removeItem(key);
  //  } else {
  //    sessionStorage.setItem(key, JSON.stringify(val));
  //  }
  //
  //  return true;
  //},
  //getSession:function(key){
  //  return JSON.parse(sessionStorage.getItem(key));
  //},
  // 校验数据有效性
  verify: function (data, cb, failcb, fn_notice, context) {
    if (data && data.status) {
      if (data.status.code === 1001) {
        cb && cb(data.result);
      } else if (data.status.code === 1022) {
        locker.unlock();
        locker.hideLoading();

        // 未登录
        var url = 'http://m.mogujie.com/x5/login?redirect_url=' + encodeURIComponent(location.href);

        switch (window.__runningapp) {
          case 'p2p':
            url =
              '/login?redirect=' +
              encodeURIComponent(location.pathname.split('/p2p').join('') + location.search);
            Router.navigate(url, { trigger: true, replace: true });
            break;

          default:
            var agent = window.navigator.userAgent;
            if (/mogujie/i.test(agent.toLocaleLowerCase())) {
              url = 'mgj://login';
            }
            location.href = url;
            break;
        }
      } else if (data.status.code === 3002) {
        locker.unlock();
        locker.hideLoading();

        // 未实名
        var url =
          '/pay/realname/add?_apptype=' +
          window.__runningapp +
          '&slap=1&redirect=' +
          encodeURIComponent(location.href);
        location.href = url;
      } else {
        var msg =
          data.result ||
          data.status.msg ||
          '未知错误，可能的原因：1.网络问题 2.服务器超时 3.其他原因';
        if (typeof fn_notice === 'function') {
          fn_notice.call(context, msg, true);
        } else {
          tips.show(msg);
        }
        locker.unlock();
        failcb && failcb(msg);
      }
    } else {
      var msg = '未知错误，可能的原因：1.网络问题 2.服务器超时 3.其他原因';
      if (typeof fn_notice === 'function') {
        fn_notice.call(context, msg, true);
      } else {
        tips.show(msg);
      }
      locker.unlock();
    }
  },

  // 数据键值对象
  prasekvObj: function (odata) {
    var data = {};
    for (var i = 0, len = odata.length; i < len; i++) {
      if (data[odata[i]['name']]) {
        // 多选
        data[odata[i]['name']] = [data[odata[i]['name']], $.trim(odata[i]['value'])].join(',');
      } else {
        data[odata[i]['name']] = $.trim(odata[i]['value']); // form用，所以加上trim
      }
    }
    return data;
  },

  /**
   * 判断小数点不超过指定位数
   * @param  {int || string} num 待校验数据
   * @param  {int} len 小数点最多位数
   * @return {bool} 是否合法
   */
  verifyDecimal: function (num, len) {
    if (isNaN(num)) {
      return false;
    }

    if (len == null || len < 0) {
      return false;
    }

    num = '' + num;

    var departs = num.split('.');

    if (
      !departs[1] || // 没有小数点
      (departs[1] && departs[1].length <= len) // 有小数点并且小数点在len内
    ) {
      return true;
    }

    return false;
  },

  /**
   * 格式化时间
   * @param {date} dateObj
   * @param {string} format 模版 [YYYY|YY年、mm|m月、dd|d日、HH|H时、ii|i分、ss|s秒]
   * @return {string} 格式化后的字符串
   */
  formatTime: function (dateObj, format) {
    dateObj = dateObj || new Date();
    format = format || 'YYYY-mm-dd HH:ii:ss';

    var year = dateObj.getFullYear(),
      month = dateObj.getMonth() + 1,
      date = dateObj.getDate(),
      hour = dateObj.getHours(),
      minute = dateObj.getMinutes(),
      second = dateObj.getSeconds();

    var formatTime = format;
    var addZero = function (num) {
      if (num < 10) return '0' + num;
      return num;
    };

    return formatTime
      .replace(/YYYY/gim, year)
      .replace(/mm/gim, addZero(month))
      .replace(/dd/gim, addZero(date))
      .replace(/HH/gim, addZero(hour))
      .replace(/ii/gim, addZero(minute))
      .replace(/ss/gim, addZero(second))
      .replace(/YY/gim, ('' + year).substr(2))
      .replace(/m/gim, month)
      .replace(/d/gim, date)
      .replace(/H/gim, hour)
      .replace(/i/gim, minute)
      .replace(/s/gim, second);
  },

  // +
  add: function (arg1, arg2) {
    var r1, r2, m, c;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }

    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }

    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));

    if (c > 0) {
      var cm = Math.pow(10, c);
      if (r1 > r2) {
        arg1 = Number(arg1.toString().replace('.', ''));
        arg2 = Number(arg2.toString().replace('.', '')) * cm;
      } else {
        arg1 = Number(arg1.toString().replace('.', '')) * cm;
        arg2 = Number(arg2.toString().replace('.', ''));
      }
    } else {
      arg1 = Number(arg1.toString().replace('.', ''));
      arg2 = Number(arg2.toString().replace('.', ''));
    }
    return (arg1 + arg2) / m;
  },

  // -
  sub: function (arg1, arg2) {
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }

    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = r1 >= r2 ? r1 : r2;
    return +((arg1 * m - arg2 * m) / m).toFixed(n);
  },

  // *
  mul: function (arg1, arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split('.')[1].length;
    } catch (e) {}

    try {
      m += s2.split('.')[1].length;
    } catch (e) {}
    return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
  },
};
