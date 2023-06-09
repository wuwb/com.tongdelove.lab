import { InternalServerErrorException } from '@nestjs/common'

export class TokenException extends InternalServerErrorException {
    constructor(msg: string, cause?, enableSupression?: boolean, writableStackTrace?: boolean) {
        super(msg || '系统异常，站点主人信息已丢失')
    }

    getMessage(throwable) { }

    getRootMessage(throwable) { }
}
