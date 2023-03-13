import { Injectable, HttpException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable, of } from 'rxjs';
import { makeSalt, encryptPassword } from '@/utils/cryptogram';
import { User, Prisma, TaobaoOrderRaw } from '@prisma/client';
import { PrismaService } from '@/processors/prisma/prisma.service';

@Injectable()
export class CustomerService {

    // 创建客户
    async create() {

    }

    // 更新
    async update() {

    }

    // 删除
    // 查询列表

    // 查询

    // 查询客户选项

    // 导出 Excel 文件
    async export(uid) {

    }

    async exist(name, item): Promise<boolean> {
        return true;
    }

    async save(data) {

    }
}
