"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MpService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const mp_util_1 = require("../utils/mp.util");
const common_constant_1 = require("../constants/common.constant");
const mp_constant_1 = require("../constants/mp.constant");
const error_wrapper_decorator_1 = require("../decorators/error-wrapper.decorator");
const mp_error_1 = require("../errors/mp.error");
const rxjs_1 = require("rxjs");
let MpService = class MpService {
    constructor(options, httpService, mpUtil) {
        this.options = options;
        this.httpService = httpService;
        this.mpUtil = mpUtil;
    }
    /**
     * 小程序临时码登录
     * @param tempCode 小程序登录临时码
     * @param rawData 原始信息
     * @param signature 签名
     * @param encryptedData 加密信息
     * @param iv 偏移量
     * @param checkSignature 是否校验签名
     * @returns 登录解析用户信息
     */
    async login(tempCode, rawData, signature, encryptedData, iv, checkSignature = true) {
        const { data } = await (0, rxjs_1.lastValueFrom)(this.httpService.get(mp_constant_1.MP_AUTH_URL, {
            params: {
                appid: this.options.appid,
                secret: this.options.appSecret,
                js_code: tempCode,
                grant_type: 'authorization_code'
            }
        }));
        if (!data || data.errcode)
            throw new mp_error_1.MpError(data.errmsg?.toString());
        if (checkSignature && !this.mpUtil.checkSignature(data.session_key, rawData, signature))
            throw new mp_error_1.MpError('签名校验失败');
        const userInfo = this.mpUtil.decryptData(this.options.appid, data.session_key, encryptedData, iv);
        return { success: true, data: Object.assign(userInfo, { openId: data.openid, unionId: data.unionid }) };
    }
    /**
     * 小程序临时码登录(不解析用户加密信息)
     * @param tempCode 小程序登录临时码
     * @returns 登录用户openid与unionid
     */
    async simpleLogin(tempCode) {
        const { data } = await (0, rxjs_1.lastValueFrom)(this.httpService.get(mp_constant_1.MP_AUTH_URL, {
            params: {
                appid: this.options.appid,
                secret: this.options.appSecret,
                js_code: tempCode,
                grant_type: 'authorization_code'
            }
        }));
        if (!data || data.errcode)
            throw new mp_error_1.MpError(data.errmsg?.toString());
        return { success: true, data: { openId: data.openid, unionId: data.unionid } };
    }
    /**
     * 获取用户手机号
     * @param tempCode 小程序登录临时码
     * @returns 登录用户openid与unionid
     */
    async getPhoneNumber(tempCode) {
        const { data } = await (0, rxjs_1.lastValueFrom)(this.httpService.post(mp_constant_1.GET_USER_PHONE_NUMBER_URL, { code: tempCode }, {
            params: { access_token: await this.mpUtil.getAccessToken() }
        }));
        if (!data || data.errcode)
            throw new mp_error_1.MpError(data.errmsg?.toString());
        return { success: true, data: data.phone_info };
    }
};
__decorate([
    (0, error_wrapper_decorator_1.MpErrorWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], MpService.prototype, "login", null);
__decorate([
    (0, error_wrapper_decorator_1.MpErrorWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MpService.prototype, "simpleLogin", null);
__decorate([
    (0, error_wrapper_decorator_1.MpErrorWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MpService.prototype, "getPhoneNumber", null);
MpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_constant_1.OPTIONS_PROVIDER)),
    __metadata("design:paramtypes", [Object, axios_1.HttpService,
        mp_util_1.MpUtil])
], MpService);
exports.MpService = MpService;
