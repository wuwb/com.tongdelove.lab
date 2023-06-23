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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MpCheckSecurityService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const mp_constant_1 = require("../constants/mp.constant");
const form_data_1 = __importDefault(require("form-data"));
const uuid_1 = require("uuid");
const rxjs_1 = require("rxjs");
const mp_util_1 = require("../utils/mp.util");
let MpCheckSecurityService = class MpCheckSecurityService {
    constructor(httpService, mpUtil) {
        this.httpService = httpService;
        this.mpUtil = mpUtil;
    }
    /**
     * 检查图片是否安全合法
     * @param media 图片Buffer信息
     * @returns 图片敏感信息检测结果
     */
    async image(media) {
        const form = new form_data_1.default();
        form.append('type', 'image');
        form.append('media', media, (0, uuid_1.v4)());
        const { data } = await (0, rxjs_1.lastValueFrom)(this.httpService.post(mp_constant_1.IMAGE_SECURITY_CHECK_URL, form, {
            params: { access_token: await this.mpUtil.getAccessToken() },
            headers: Object.assign({ 'Content-Length': form.getLengthSync() }, form.getHeaders())
        }));
        return { success: true, data: !!data.errcode };
    }
    /**
     * 文本内容敏感信息检测
     * @param content 文本内容
     * @returns 文本敏感信息检测结果
     */
    async message(content) {
        const { data } = await (0, rxjs_1.lastValueFrom)(this.httpService.post(mp_constant_1.MESSAGE_SECURITY_CHECK_URL, { content }, {
            params: { access_token: await this.mpUtil.getAccessToken() }
        }));
        return { success: true, data: !!data.errcode };
    }
};
MpCheckSecurityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService, mp_util_1.MpUtil])
], MpCheckSecurityService);
exports.MpCheckSecurityService = MpCheckSecurityService;