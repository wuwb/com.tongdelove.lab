// 内存占用太大（~100+M）暂时移除了
// import * as geoip from 'geoip-lite';
import shell from 'shelljs';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { getMessageFromAxiosError } from '@/common/transformers/error.transformer';
import { ConfigService } from '@nestjs/config';

export type IP = string;
export interface IIPDetail {
    city: string;
    country: string;
}

@Injectable()
export class IPService {
    private readonly logger = new Logger(IPService.name);

    constructor(
        private readonly configService: ConfigService,

        private readonly httpService: HttpService
    ) { }

    // 通过 GEO 库查询
    // private queryIPByGeo(ip: IP): IIPDetail {
    //   return geoip.lookup(ip);
    // }

    async getAddress(ip: string) {
        const { data } = await this.httpService.axiosRef.get(
            `https://api.kuizuo.cn/api/ip-location?ip=${ip}&type=json`,
        );
        return data.addr;
    }

    /**
     * 通过阿里云服务查询 
     * @param ip 
     */
    private queryIPByAliyun(ip: IP): Promise<IIPDetail> {
        return this.httpService.axiosRef
            .request({
                headers: {
                    Authorization: `APPCODE ${this.configService.get('COMMON_SERVICE.aliyunIPAuth')}`,
                },
                url: `https://api01.aliyun.venuscn.com/ip?ip=${ip}`,
            })
            .then((response: any) => {
                this.logger.debug(`response: ${response}`)
                if (response.data.ret === 200) {
                    return Promise.resolve(response.data.data);
                } else {
                    return Promise.reject(response.data);
                }
            })
            .catch(error => {
                const message = getMessageFromAxiosError(error);
                console.warn('Aliyun 查询 IP 信息失败！', message);
                return Promise.reject(message);
            });
    }

    // 优先通过 https://dashboard.juhe.cn/data/index/my 查询
    private queryIPByJUHE(ip: IP): Promise<any> {
        return this.httpService.axiosRef
            .get<any>(`http://apis.juhe.cn/ip/ipNew?ip=${ip}&key=${this.configService.get('COMMON_SERVICE.juheIPAuth')}`)
            .then((response) => {
                if (response?.data?.resultcode === '200') {
                    return Promise.resolve(response.data.result)
                } else {
                    return Promise.reject(response.data)
                }
            })
            .catch((error) => {
                const message = getMessageFromAxiosError(error)
                // logger.warn('[IP Query]', 'juhe.cn 查询 IP 信息失败！', message);
                return Promise.reject(message)
            })
    }

    // 通过 ip.cn 查询
    private queryIPByIPCN(ip: IP): Promise<IIPDetail> {
        return new Promise((resolve, reject) => {
            shell.exec(`curl https://ip.cn/index.php?ip=${ip}`, (code, out, outError) => {
                try {
                    resolve(JSON.parse(out));
                } catch (error) {
                    console.warn('IPCN 查询 IP 信息失败！', code, outError, error);
                    reject(error);
                }
            });
        });
    }

    // 查询 IP 地址
    public query(ip: IP): Promise<IIPDetail | null> {
        return this.queryIPByJUHE(ip)
            .then(({ city, country }): IIPDetail => ({ city, country }))
            .catch(() => this.queryIPByAliyun(ip))
            .then(({ city, country }): IIPDetail => ({ city, country }))
            .catch(() => this.queryIPByIPCN(ip))
            .then(({ city, country }): IIPDetail => ({ city, country }))
            .catch(() => null);
    }
}
