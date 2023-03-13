import { FreelancerTaskCreateInput } from "@/generated/prisma-nestjs-graphql/freelancer-task";
import { SourceEnum, Prisma } from '@prisma/client'

export enum SourceType {
    猿急送 = 1, // ok
    开源众包 = 2, // ok
    码市 = 4, // ok
    A5任务 = 5, // ok
    智城外包网 = 6,
    实现 = 7, // ok
    码易 = 8, // ok
    人人开发 = 9,  // ok
}

export enum ISourceType {
    yuanjisong = 1, // ok
    oschina = 2, // ok
    codemart = 4, // ok
    a5 = 5, // ok
    taskcity = 6,
    shixian = 7, // ok
    mayigeek = 8, // ok
    rrkf = 9,  // ok
}

export interface SpiderTask extends FreelancerTaskCreateInput {
    source: SourceEnum;
    sourceId: string;

    title: string;
    desc: string;
    url: string;

    minPrice: Prisma.Decimal;
    maxPrice: Prisma.Decimal;
    fixedPrice: string;
    bargain: boolean;

    cycle: number; // 开发周期
    cycleName: string; // 开发周期单位

    date: Date; // 发布时间

    applyCount: number; // 申请数量
    visitCount: number; // 访问数量

    status: string; // 状态

    auditStatus: number; // 审核状态
    auditReason: string; // 审核原因
    auditAt: Date; // 审核时间

    handleStatus: number; // 处理状态？
    handleAt: Date; // 处理时间？

    userId: string; // 加密，随时间变化
    userName: string;
    userUrl: string;
    type: number; // 类型，软件项目、悬赏任务
    application: number; // 应用类型
    tags: string; // 标签列表

    [key: string]: any;
}
