import { ConfigService } from '@nestjs/config';
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { v4 as UUIDV4 } from 'uuid';
import { HashPassword, CheckPassword } from 'wordpress-hash-node';
import { isInt } from 'class-validator';

interface ITokenParams {
    id: string;
    username?: string;
    mobile?: string;
    email?: string;
    platform?: number;
    isSuper?: number;
}

@Injectable()
export class HelperService {
    private readonly logger = new Logger(HelperService.name);

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
    }

    /**
     * 简单取交集
     *
     * @param {Array<string | number>} source 源数据
     * @param {Array<string | number>} comparison 对比的数据
     *
     * @returns {Array<string | number>}
     */
    intersection = (source: (string | number)[], comparison: (string | number)[]) => (
        comparison.filter(item => source.includes(item))
    )

    public smallUUID = (): string => UUIDV4().replace(/-/ug, '');

    public get uuidToken(): string {
        return UUIDV4().replace(/-/g, '');
    }

    /**
     * 自身属性中是否具有指定的属性（也就是是否有指定的键）
     */
    hasOwnProperty = (obj: object, property: string) => Object.prototype.hasOwnProperty.call(obj, property);


    isType = <T>(type: string) => (value: any): value is T => (
        value !== null && Object.prototype.toString.call(value) === `[object ${type}]`
    );

    isFn = this.isType<(...args: any[]) => any>('Function');

    // eslint-disable-next-line @typescript-eslint/unbound-method
    isArr = Array.isArray || this.isType<unknown[]>('Array');

    isObj = this.isType<object>('Object');

    isStr = this.isType<string>('String');

    isNum = this.isType<number>('Number');

    isEmpty = (value: any) => value === null || value === undefined

    isEmptyByAllTypes(value: any): boolean {
        return this.isEmpty(value) ||
            value === '' ||
            Number.isNaN(value) ||
            value === 0 ||
            (
                this.isObj(value)
                    ? !Object.keys(value).length
                    : this.isArr(value)
                        ? !value.length
                        : false
            );
    }

    /**
     * 密码加密的方法
     */
    makePassword(password: string): string {
        return HashPassword(password);
    }

    /**
     * 校验密码
     */
    checkPassword(password: string, hash: string): boolean {
        return CheckPassword(password, hash);
    }

    /**
     * 校验分页数据
     */
    public checkPage(limit: number, page: number): void {
        if (!isInt(Number(page)) || !isInt(Number(limit))) {
            throw new HttpException(
                `传递的page:${page},limit:${limit}其中一个不是整数`,
                HttpStatus.OK,
            );
        }
    }
}
