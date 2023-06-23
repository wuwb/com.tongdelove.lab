import { Injectable } from '@nestjs/common';
import { createDecipheriv, createCipheriv, randomBytes } from 'crypto';
import { OfficialUtil } from '../utils/official.util';
import { EncoderUtil } from '../utils/encoder.util';
import { XmlUtil } from '../utils/xml.util';
import { OfficialErrorWrapper } from '../decorators/error-wrapper.decorator';

@Injectable()
export class MessageService {
    constructor(
        private readonly officialUtil: OfficialUtil,
        private readonly encoderUtil: EncoderUtil,
        private readonly xmlUtil: XmlUtil,
    ) { }

    /**
     * 生成返回给微信服务器应答信息
     * @param params 返回参数
     * @returns 生成结果
     */
    @OfficialErrorWrapper({ type: FunctionType.Sync })
    generateResponseMessage(params: any): { success: boolean; data: string } {
        return { success: true, data: this.xmlUtil.object2xml(params) };
    }

    /**
     * 生成文本类型返回消息
     * @param toUser 接收人
     * @param fromUser 消息发起人
     * @param content 文本内容
     * @returns 文本类型返回消息
     */
    @OfficialErrorWrapper({ type: FunctionType.Sync })
    generateTXTResponseMessage(toUser: string, fromUser: string, content: string): { success: boolean; data: string } {
        const data = `
      <xml>
        <ToUserName><![CDATA[${fromUser}]]></ToUserName>
        <FromUserName><![CDATA[${toUser}]]></FromUserName>
        <CreateTime>${Math.floor(Date.now() / 1000)}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${content}]]></Content>
      </xml>
    `;
        return { success: true, data };
    }

    /**
     * 解密微信回调信息
     * @param appid 公众号appID
     * @param encryptMessage 加密信息
     * @returns 解密结果
     */
    @OfficialErrorWrapper()
    async decrypt(appid: string, encryptMessage: string): Promise<{ success: boolean; data: any }> {
        const option = await this.officialUtil.getClient(appid);
        const encodingAESKeyBuffer = Buffer.from(option.encodingAESKey + '=', BufferEncodingType.BASE64);

        // 实例 AES 解密对象
        const deCipheriv = createDecipheriv("aes-256-cbc", encodingAESKeyBuffer, encodingAESKeyBuffer.slice(0, 16));

        // 设置自定填充数据为 false
        deCipheriv.setAutoPadding(false);

        // 对密文解密对密文解密 并去除前 16 个随机字符串
        const deEncryptedMsg = Buffer.concat([deCipheriv.update(encryptMessage, BufferEncodingType.BASE64), deCipheriv.final()]).toString('utf8');

        // 获取填充字符串的位置
        const pad = deEncryptedMsg.charCodeAt(deEncryptedMsg.length - 1);

        return { success: true, data: this.xml2object(deEncryptedMsg.slice(20, -pad).replace(/<\/xml>.*/, '</xml>')) };
    }

    /**
     * 加密信息
     * @param appid 公众号appID
     * @param timestamp 时间戳
     * @param nonce 随机字符串
     * @param xml xml信息
     * @returns 加密后的结果
     */
    @OfficialErrorWrapper()
    async encrypt(appid: string, timestamp: string, nonce: string, xml: string): Promise<{ success: boolean; data: string }> {
        // 声明 16位的随机字符串
        const random = randomBytes(8).toString('hex');
        const text = Buffer.from(xml);
        const buf = Buffer.alloc(4);
        buf.writeUInt32BE(text.length, 0);

        // 进行PKCS7补位
        const option = await this.officialUtil.getClient(appid);
        const pack = this.encoderUtil.PKCS7(20 + text.length + option.appid.length);

        //拼接要加密的字符串
        const content = random + buf.toString("binary" /* BufferEncodingType.BINARY */) + text.toString("binary" /* BufferEncodingType.BINARY */) + option.appid + pack;
        //实例 AES 加密对象
        const encodingAESKeyBuffer = Buffer.from(option.encodingAESKey + '=', "base64" /* BufferEncodingType.BASE64 */);
        const cipheriv = createCipheriv("aes-256-cbc" /* EncryptType.ASE256CBC */, encodingAESKeyBuffer, encodingAESKeyBuffer.slice(0, 16));
        //设置自定填充数据为 false
        cipheriv.setAutoPadding(false);
        //对明文加密
        const encryptedMessage = Buffer.concat([cipheriv.update(content, "binary" /* BufferEncodingType.BINARY */), cipheriv.final()]).toString("base64" /* BufferEncodingType.BASE64 */);
        //获取认证签名
        const msgSignature = await this.officialUtil.messageSignature(appid, timestamp, nonce, encryptedMessage);
        return {
            success: true,
            data: this.xmlUtil.object2xml({
                Encrypt: encryptedMessage,
                MsgSignature: msgSignature,
                TimeStamp: timestamp,
                Nonce: nonce
            })
        };
    }

    /**
     * 将 xml 转换为 object
     * @param xml xml信息
     * @returns 转换后的object
     */
    xml2object(xml) {
        if (!xml || typeof xml !== 'string')
            return {};
        const result = {};
        const ms = xml.replace(/^<xml>|<\/xml>$/g, '').match(/<([a-z0-9]+)>([\s\S]*?)<\/\1>/gi);
        if (ms && ms.length > 0)
            ms.forEach(t => {
                const ms = t.match(/<([a-z0-9]+)>([\s\S]*?)<\/\1>/i);
                const tagName = ms[1];
                let cdata = ms[2] || '';
                cdata = cdata.replace(/^\s*<\!\[CDATA\[\s*|\s*\]\]>\s*$/g, '');
                result[tagName] = cdata;
            });
        return result;
    }

}
