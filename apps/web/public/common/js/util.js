/**
    小店商家后台工具函数集合

    Lists:
    - [获取连接参数值] getQueryString
    - [时间戳格式化] formatDate
    - [根据url返回相应的id] urltoid
    - [根据id返回相应的url] idtourl
    - [...] base_convert

 */

;(function(win){

    var XD = win.XD || {};

    var Util = {
        /**
         * @desc 获取链接参数的值
         * @param  {string} name 参数名字
         * @param  {string} [url] 链接url，为空的时候取location.href
         * @return {string} 参数
         */
        getQueryString: function (name, url) {
            url = (url == null) ? window.location.href : url;
            url = url.split('#')[0];

            var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
            return reg.test(url) ? RegExp.$2.replace(/\+/g, " ") : '';
        },

        formatMoney: function (amount) {
            if (amount === undefined || amount === null || isNaN(+amount)) {
                return '-';
            }
            else {
                return (amount / 100).toFixed(2);
            }
        },

        formatDate: function(format, timestamp) {
            /**
             * example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
             * returns 1: '09:09:40 m is month'
             * example 2: date('F j, Y, g:i a', 1062462400);
             * returns 2: 'September 2, 2003, 2:26 am'
             * example 3: date('Y W o', 1062462400);
             * returns 3: '2003 36 2003'
             * example 4: x = date('Y m d', (new Date()).getTime()/1000);
             * example 4: (x+'').length == 10 // 2009 01 09
             * returns 4: true
             * example 5: date('W', 1104534000);
             * returns 5: '53'
             * example 6: date('B t', 1104534000);
             * returns 6: '999 31'
             * example 7: date('W U', 1293750000.82); // 2010-12-31
             * returns 7: '52 1293750000'
             * example 8: date('W', 1293836400); // 2011-01-01
             * returns 8: '52'
             * example 9: date('W Y-m-d', 1293974054); // 2011-01-02
             * returns 9: '52 2011-01-02'
             **/

            var that = this;
            var jsdate, f;
            // Keep this here (works, but for code commented-out below for file size reasons)
            // var tal= [];
            var txt_words = [
                'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            // trailing backslash -> (dropped)
            // a backslash followed by any character (including backslash) -> the character
            // empty string -> empty string
            var formatChr = /\\?(.?)/gi;
            var formatChrCb = function(t, s) {
                return f[t] ? f[t]() : s;
            };
            var _pad = function(n, c) {
                n = String(n);
                while (n.length < c) {
                    n = '0' + n;
                }
                return n;
            };
            f = {
                // Day
                d: function() {
                    // Day of month w/leading 0; 01..31
                    return _pad(f.j(), 2);
                },
                D: function() {
                    // Shorthand day name; Mon...Sun
                    return f.l()
                        .slice(0, 3);
                },
                j: function() {
                    // Day of month; 1..31
                    return jsdate.getDate();
                },
                l: function() {
                    // Full day name; Monday...Sunday
                    return txt_words[f.w()] + 'day';
                },
                N: function() {
                    // ISO-8601 day of week; 1[Mon]..7[Sun]
                    return f.w() || 7;
                },
                S: function() {
                    // Ordinal suffix for day of month; st, nd, rd, th
                    var j = f.j();
                    var i = j % 10;
                    if (i <= 3 && parseInt((j % 100) / 10, 10) == 1) {
                        i = 0;
                    }
                    return ['st', 'nd', 'rd'][i - 1] || 'th';
                },
                w: function() {
                    // Day of week; 0[Sun]..6[Sat]
                    return jsdate.getDay();
                },
                z: function() {
                    // Day of year; 0..365
                    var a = new Date(f.Y(), f.n() - 1, f.j());
                    var b = new Date(f.Y(), 0, 1);
                    return Math.round((a - b) / 864e5);
                },

                // Week
                W: function() {
                    // ISO-8601 week number
                    var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
                    var b = new Date(a.getFullYear(), 0, 4);
                    return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
                },

                // Month
                F: function() {
                    // Full month name; January...December
                    return txt_words[6 + f.n()];
                },
                m: function() {
                    // Month w/leading 0; 01...12
                    return _pad(f.n(), 2);
                },
                M: function() {
                    // Shorthand month name; Jan...Dec
                    return f.F()
                        .slice(0, 3);
                },
                n: function() {
                    // Month; 1...12
                    return jsdate.getMonth() + 1;
                },
                t: function() {
                    // Days in month; 28...31
                    return (new Date(f.Y(), f.n(), 0))
                        .getDate();
                },

                // Year
                L: function() {
                    // Is leap year?; 0 or 1
                    var j = f.Y();
                    return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
                },
                o: function() {
                    // ISO-8601 year
                    var n = f.n();
                    var W = f.W();
                    var Y = f.Y();
                    return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
                },
                Y: function() {
                    // Full year; e.g. 1980...2010
                    return jsdate.getFullYear();
                },
                y: function() {
                    // Last two digits of year; 00...99
                    return f.Y()
                        .toString()
                        .slice(-2);
                },

                // Time
                a: function() {
                    // am or pm
                    return jsdate.getHours() > 11 ? 'pm' : 'am';
                },
                A: function() {
                    // AM or PM
                    return f.a()
                        .toUpperCase();
                },
                B: function() {
                    // Swatch Internet time; 000..999
                    var H = jsdate.getUTCHours() * 36e2;
                    // Hours
                    var i = jsdate.getUTCMinutes() * 60;
                    // Minutes
                    // Seconds
                    var s = jsdate.getUTCSeconds();
                    return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
                },
                g: function() {
                    // 12-Hours; 1..12
                    return f.G() % 12 || 12;
                },
                G: function() {
                    // 24-Hours; 0..23
                    return jsdate.getHours();
                },
                h: function() {
                    // 12-Hours w/leading 0; 01..12
                    return _pad(f.g(), 2);
                },
                H: function() {
                    // 24-Hours w/leading 0; 00..23
                    return _pad(f.G(), 2);
                },
                i: function() {
                    // Minutes w/leading 0; 00..59
                    return _pad(jsdate.getMinutes(), 2);
                },
                s: function() {
                    // Seconds w/leading 0; 00..59
                    return _pad(jsdate.getSeconds(), 2);
                },
                u: function() {
                    // Microseconds; 000000-999000
                    return _pad(jsdate.getMilliseconds() * 1000, 6);
                },

                // Timezone
                e: function() {
                    // Timezone identifier; e.g. Atlantic/Azores, ...
                    // The following works, but requires inclusion of the very large
                    // timezone_abbreviations_list() function.
                    /*              return that.date_default_timezone_get();
                     */
                    throw 'Not supported (see source code of date() for timezone on how to add support)';
                },
                I: function() {
                    // DST observed?; 0 or 1
                    // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
                    // If they are not equal, then DST is observed.
                    var a = new Date(f.Y(), 0);
                    // Jan 1
                    var c = Date.UTC(f.Y(), 0);
                    // Jan 1 UTC
                    var b = new Date(f.Y(), 6);
                    // Jul 1
                    // Jul 1 UTC
                    var d = Date.UTC(f.Y(), 6);
                    return ((a - c) !== (b - d)) ? 1 : 0;
                },
                O: function() {
                    // Difference to GMT in hour format; e.g. +0200
                    var tzo = jsdate.getTimezoneOffset();
                    var a = Math.abs(tzo);
                    return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
                },
                P: function() {
                    // Difference to GMT w/colon; e.g. +02:00
                    var O = f.O();
                    return (O.substr(0, 3) + ':' + O.substr(3, 2));
                },
                T: function() {
                    // Timezone abbreviation; e.g. EST, MDT, ...
                    // The following works, but requires inclusion of the very
                    // large timezone_abbreviations_list() function.
                    /*              var abbr, i, os, _default;
                    if (!tal.length) {
                      tal = that.timezone_abbreviations_list();
                    }
                    if (that.php_js && that.php_js.default_timezone) {
                      _default = that.php_js.default_timezone;
                      for (abbr in tal) {
                        for (i = 0; i < tal[abbr].length; i++) {
                          if (tal[abbr][i].timezone_id === _default) {
                            return abbr.toUpperCase();
                          }
                        }
                      }
                    }
                    for (abbr in tal) {
                      for (i = 0; i < tal[abbr].length; i++) {
                        os = -jsdate.getTimezoneOffset() * 60;
                        if (tal[abbr][i].offset === os) {
                          return abbr.toUpperCase();
                        }
                      }
                    }
                    */
                    return 'UTC';
                },
                Z: function() {
                    // Timezone offset in seconds (-43200...50400)
                    return -jsdate.getTimezoneOffset() * 60;
                },

                // Full Date/Time
                c: function() {
                    // ISO-8601 date.
                    return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
                },
                r: function() {
                    // RFC 2822
                    return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
                },
                U: function() {
                    // Seconds since UNIX epoch
                    return jsdate / 1000 | 0;
                }
            };
            this.date = function(format, timestamp) {
                that = this;
                jsdate = (timestamp === undefined ? new Date() : // Not provided
                    (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
                    new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
                );
                return format.replace(formatChr, formatChrCb);
            };
            return this.date(format, timestamp);
        },


        /**
         * @author beile
         * @desc 根据字母id返回相应的数字 id
         * @param url
         * @param [check]
         * @return {number}
         */
        urltoid: function(url, check) { //[urltoid]
            check = check || false;
            if(url.length == 24 && url.match('/^[0-9a-f]+$/') ) return url;  //兼容MongoId

            var version = parseInt(url.substr(0, 1), 10);
            var id = 0;
            switch(version) {
                case 1:
                    id =  (parseInt(Util.base_convert(url.substring(1), 36, 10), 10) - 56)/2;
                    break;
                case 2:  //防止扫用户;
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    id = 0;
                    break;
                default:
                    id = url;
                    break;
            }
            return 0 < id ? id : 0;
        },


        /**
         * @author: beile
         * @desc: id 转为 url
         * @param id
         * @param [version]
         */
        idtourl: function(id, version) { //[idtourl]
            var v = version || 1;
            var url = '';
            id = '' + id;
            if( id.length == 24) {
                return id;
            }

            switch(v) {
                case 1:
                    url = v + Util.base_convert(id * 2 + 56, 10,36);
                    break;

                default:
                    url = false;
                    break;
            }
            return url;
        },

        /**
         * base_conver for js
         * @param number
         * @param frombase
         * @param tobase
         * @return {String}
         */
        base_convert: function(number, frombase, tobase) {
            // http://kevin.vanzonneveld.net
            // +   original by: Philippe Baumann
            // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
            // *     example 1: base_convert('A37334', 16, 2);
            // *     returns 1: '101000110111001100110100'
            return parseInt(number + '', frombase | 0).toString(tobase | 0);
        },

        /**
         * 返回图片的相对路径
         * @param {String} path 图片路径 如 http://s7.mogujie.com/b7/pic/130916/2r6z_kqyxeuc2kfbhgs2ugfjeg5sckzsew_225x389.jpg
         * @return {String} 相对路径： /b7/pic/130916/2r6z_kqyxeuc2kfbhgs2ugfjeg5sckzsew_225x389.jpg
         */
        filterOriPath: function(path) {
            var reg = /http:\/\/[^\/]+/; // 过滤绝对路径 如: http://
            return path.replace(reg, '');
        },

        /**
         * 根据图片地址拆分尺寸
         * @param  {String} path
         * @return {Array}
         */
        getSizeByPath: function(path) {
            var size = path.match(/(http:\/\/)?[\w\.]+\/[\w\/]+_([\d]+)x([\d]+)\.[a-zA-Z]+/);
            return size ? [size[2], size[3]] : [];
        },

        /**
         * 获取等比例缩放后的图片大小
         * @param  {Number} imgWidth        图片宽度
         * @param  {Number} imgHeight       图片高度
         * @param  {Number} containerWidth  容器宽度
         * @param  {Number} containerHeight 容器高度
         * @return {Object}                 缩放后的图片宽度，高度，比例
         */
        getZoomImage: function(imgWidth, imgHeight, containerWidth, containerHeight){
            
            var width, height, ratio;
            if(imgWidth > 0 && imgHeight > 0){

                // 如果图片的宽高比大于等于容器的宽高比
                if(imgWidth / imgHeight >= containerWidth / containerHeight){
                    if(imgWidth > containerWidth){  
                        width = containerWidth;
                        height = (imgHeight * containerWidth) / imgWidth;
                        ratio = imgWidth / containerWidth;
                    }else{
                        width = imgWidth;  
                        height = imgHeight;
                    }
                }else{
                    if(imgHeight > containerHeight){  
                        height = containerHeight;
                        width = (imgWidth * containerHeight) / imgHeight;
                        ratio = imgHeight / containerHeight;
                    }else{
                        width = imgWidth;  
                        height = imgHeight;
                    }
                }
            }

            return {
                zoomWidth: Math.round(width),
                zoomHeight: Math.round(height),
                ratio: ratio
            }
        },

        /**
         * url 参数转 object 对象
         * @param  {String} params 如果不传，则取当前 url 的参数
         * @return {Object} 
         * 例如： urlParamToJson('name=heyhey&page=2') 
         *     返回： {name: 'heyhey', page: '2'}
         * 
         * 如果是要 json 转 url 参数，请使用 $.param() 方法
         */
        urlParamToJson: function(params) {
            var search = params || window.location.search.substring(1) || window.location.hash.substring(1).split('?')[1];
            return search?JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}',
                 function(key, value) { return key===""?value:decodeURIComponent(value) }):{}
        },

        // Support: Android<4.1, IE<9
        trim: function( text ) {
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            return text == null ?
                "" :
                ( text + "" ).replace( rtrim, "" );
        }
    };

    XD.Util = Util;

    win.XD = XD;

})(window);

/**
 * PHPBridge 用于传递PHP端的数据
 */
(function (win) {
    var XD = win.XD || {};

    var _data = {};

    XD.PHPBridge = {
        getItem: function (key) {
            var val = _data[key];

            return val ? val : null;
        },

        setItem: function (key, value) {
            _data[key] = value;
        },

        setData: function (data) {
            if (data) {
                _data = data;
            }
        }
    }
})(window);

/**
 * Hash 用于操作页面hash
 */

(function(win){
    var XD = win.XD || {};
    var Util = XD.Util || {};

    Util.hash = function(settings){
        if(typeof settings == 'string') {
            settings = {
                hash: settings
            }
        }
        var options = settings || {};
        options.hash = options.hash || win.location.hash;

        return new HashMaker(options)._parse();
    };

    function HashMaker(options){
        this.options = options;
    }

    HashMaker.prototype = {
        constructor: HashMaker,

        /**
         * 设置Hash
         * @param {String/Object} key  hash键或者hash键值对
         * @param {String}        val  hash值或hash类型
         */
        set: function(key, val){
            var that = this,
                arr = {};

            if(val) {
                arr[key] = val;
            } else {
                arr = key;
            }

            that._result = _.extend(that._result, arr);
            return that;
        },

        /**
         * 获取Hash
         * @param  {String/Array} key 单个键或多个键数组
         * @return {String/Object}    单个值或键值对
         */
        get: function(key){
            var that = this,
                isMulitiple = key instanceof Array,
                keys = isMulitiple ? key : [key],
                ret = {};
            _.each(keys, function(item, i){
                ret[item] = that._result[item];
            });

            return isMulitiple ? ret : ret[key];
        },

        /**
         * 移除Hash
         * @param  {String/Array} key 单个键或多个键数组
         */
        remove: function(key){
            var that = this;

            if (key === undefined) {
                that._result = {};
                return that;
            }

            var isMulitiple = key instanceof Array,
                keys = isMulitiple ? key : [key];

            _.each(keys, function(item){
                delete(that._result[item]);
            });

            return that;
        },

        location: function(){
            location.hash = this.stringify();
        },

        stringify: function(){
            var that = this,
                arr = [],
                _result = that._result;

            for(var key in _result) {
                var item = _result[key],
                    val = encodeURIComponent(item);

                arr.push(key + '=' +val);
            }
            that._hash = arr.join('&');
            return '#!'+that._hash;
        },

        _parse: function(){
            var that = this,
                options = that.options,
                hash = options.hash,
                obj = {},
                arr;
            hash = hash.replace(/^[^#!]*/, '');
            that._hash = hash.replace(/^[#!\/]+/, '');
            arr = that._hash.split('&');
            for(var i = 0; i < arr.length; i++) {
                var item = arr[i],
                    pos = item.indexOf('='),
                    key = item.slice(0, pos),
                    val = decodeURIComponent(item.slice(pos+1));
                if(key) obj[key] = val || '';
            }
            that._result = obj;
            return that;
        }
    };
})(window);