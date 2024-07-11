/**
* @description 表单验证相关
* @author buji 2014-11-03
*/
'use strict';

module.exports = {

    /**
     * @description 验证银行卡位数
     * @param  {string} 银行卡号
     * @return {bool} 是否有效
     */
    validBankCardNum: function(cardno) {
        if (cardno.length <= 19 && cardno.length >= 15) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * @description 验证短信验证码格式
     * @param  {string} 短信验证码
     * @return {bool} 是否有效
     */
    validSmsCode: function(val) {
        if (!(/^[0-9]{4,6}$/i.test(val))) {
            return false;
        } else {
            return true;
        }
    },
    /**
     * @description 验证手机格式
     * @param  {string} 手机号码
     * @return {bool} 是否有效
     */
    validMobile: function(val) {
        if (!(/^0?[1][34578][0-9]{9}$/i.test(val))) {
            return false;
        }
        return true;
    },

    /**
     * @description QQ号码格式
     * @param  {string} QQ号码
     * @return {bool} 是否有效
     */
    validQQ: function(val) {
        if (!(/^[0-9]{5,10}$/i.test(val))) {
            return false;
        }
        return true;
    },

    /**
     * @description 验证真实姓名格式
     * @param  {string} 真实姓名
     * @return {bool} 是否有效
     */
    validName: function(val) {
        if (!(/^[\u4E00-\u9FA5\uf900-\ufa2d\·]{2,30}$/i.test(val))) {
            return false;
        }
        if (val.indexOf("·") !== -1) {
            if (this._equalStr(val)) {
                return false;
            }
        }
        return true;
    },

    /**
     * @description 验证身份证格式
     * @param  {string} 身份证
     * @return {bool} 是否有效
     */
    validIDCard: function(val) {
        if (!(/^\d{17}(\d|x)$/i.test(val) || /^\d{15}$/i.test(val))) {
            return false;
        }
        var provinceCode = parseInt(val.substr(0, 2));
        if ((provinceCode < 11) || (provinceCode > 91)) {
            return false;
        }
        var forTestDate = val.length == 18 ? val : val.substr(0, 6) + "19" + val.substr(6, 15);
        var birthday = forTestDate.substr(6, 8);
        if (!this._isDate(birthday, 'yyyyMMdd')) {
            return false;
        }
        if (val.length == 18) {
            var val = val.replace(/x$/i, "a");
            var verifyCode = 0;
            for (var i = 17; i >= 0; i--) {
                verifyCode += (Math.pow(2, i) % 11) * parseInt(val.charAt(17 - i), 11);
            }
            if (verifyCode % 11 != 1) {
                return false;
            }
        }
        return true;
    },

    _isDate: function (v, dateFormat) {
        var MONTH = "MM";
        var DAY = "dd";
        var YEAR = "yyyy";
        var regex = '^' + dateFormat.replace(YEAR, '\\d{4}').replace(MONTH, '\\d{2}').replace(DAY, '\\d{2}') + '$';
        if (!new RegExp(regex).test(v)) return false;

        var year = v.substr(dateFormat.indexOf(YEAR), 4);
        var month = v.substr(dateFormat.indexOf(MONTH), 2);
        var day = v.substr(dateFormat.indexOf(DAY), 2);

        var d = new Date(this._format('%s/%s/%s', [year, month, day]));
        return ( parseInt(month, 10) == (1 + d.getMonth()) ) &&
            (parseInt(day, 10) == d.getDate()) &&
            (parseInt(year, 10) == d.getFullYear() );
    },

    _format: function (str, args) {
        args = args || [];

        var result = str;
        for (var i = 0; i < args.length; i++) {
            result = result.replace(/%s/, args[i]);
        }
        return result;
    },

    _equalStr: function(numOrStr) {
        var flag = true;
        var str = numOrStr.charAt(0);
        for (var i = 0; i < numOrStr.length; i++) {
            if (str !== numOrStr.charAt(i)) {
                flag = false;
                break;
            }
        }
        return flag;
    }
};