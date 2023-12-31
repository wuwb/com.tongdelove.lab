import { InternalServerErrorException } from '@nestjs/common'

export class IllegalArgumentException extends InternalServerErrorException {
    constructor(msg: string) {
        super(msg || '系统异常，站点主人信息已丢失')
    }
}
