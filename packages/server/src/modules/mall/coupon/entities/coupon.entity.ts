import { BaseEntity } from "@/shared/entities/base.entity";
import { Column } from "typeorm";

export class Coupon extends BaseEntity {

    @Column({
        comment: '名称',
    })
    title: string;

    @Column({
        comment: '描述',
    })
    description: string;

    @Column({
        comment: '编码',
    })
    code: string;

    @Column({
        comment: '过期时间',
    })
    expiration: Date;

    @Column({
        name: 'max_receive_count',
        comment: '最大领取数量',
    })
    maxReceiveCount: number;

    @Column({
        comment: '总数量',
    })
    count: number;

    @Column({
        name: 'used_count',
        comment: '使用次数',
    })
    usedCount: number;

    @Column({
        comment: '优惠劵的类型，1代表按照百分比对产品打折，2代表在总额上减少多少',
    })
    type: number;

    @Column({
        comment: '优惠劵使用的条件，如果类型为1，则没有条件，如果类型是2，则购物车中产品总额满足多少的时候进行打折。这里填写的是美元金额'
    })
    condition: number;

    @Column({
        comment: '优惠劵的折扣，如果类型为1，这里填写的是百分比，如果类型是2，这里代表的是在总额上减少的金额，货币为美金',
    })
    discount: number;
}
