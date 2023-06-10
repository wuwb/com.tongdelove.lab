/**
 * IP utility functions
 */
// import { FastifyRequest } from 'fastify';
import { Request } from 'express';
import { IncomingMessage } from 'http';
import { URL } from 'url';
import axios from 'axios';
import * as iconv from 'iconv-lite';

export const getIp = (request: Request | IncomingMessage) => {
    const req = request as any;

    let ip: string =
        request.headers['x-forwarded-for'] ||
        request.headers['X-Forwarded-For'] ||
        request.headers['X-Real-IP'] ||
        request.headers['x-real-ip'] ||
        req?.ip ||
        req?.raw?.connection?.remoteAddress ||
        req?.raw?.socket?.remoteAddress ||
        // 判断后端的 socket 的 IP
        request.socket.remoteAddress ||
        undefined;
    if (ip && ip.split(',').length > 0) {
        ip = ip.split(',')[0] ?? '';
    }
    return ip;
}

/* 判断IP是不是内网 */
export const IsLAN = (ip: string) => {
    ip.toLowerCase();
    if (ip == 'localhost') return true;
    let a_ip = 0;
    if (ip == '') return false;
    const aNum: any[] = ip.split('.');
    if (aNum.length != 4) return false;
    a_ip += parseInt(aNum[0]) << 24;
    a_ip += parseInt(aNum[1]) << 16;
    a_ip += parseInt(aNum[2]) << 8;
    a_ip += parseInt(aNum[3]) << 0;
    a_ip = (a_ip >> 16) & 0xffff;
    return (
        a_ip >> 8 == 0x7f ||
        a_ip >> 8 == 0xa ||
        a_ip == 0xc0a8 ||
        (a_ip >= 0xac10 && a_ip <= 0xac1f)
    );
}

/* 通过ip获取地理位置 */
export const getLocation = async (ip: string) => {
    if (IsLAN(ip)) {
        return '内网IP';
    }
    try {
        let { data } = await axios.get(
            `http://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`,
            { responseType: 'arraybuffer' },
        );
        data = JSON.parse(iconv.decode(data, 'gbk'));
        return data.pro + ' ' + data.city;
    } catch (error) {
        return '未知';
    }
}

export const parseRelativeUrl = (path: string) => {
    if (!path || !path.startsWith('/')) {
        return new URL('http://a.com');
    }
    return new URL(`http://a.com${path}`);
}
