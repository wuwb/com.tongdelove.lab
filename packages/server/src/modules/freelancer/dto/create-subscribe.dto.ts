import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, IsUrl, MaxLength, ValidateIf, ValidateNested } from 'class-validator';

type source = 'codemart';

class Wehbook {
    @IsUrl({}, {
        message: 'webhook 需要是 https url 链接。'
    })
    @ValidateIf(e => e.webhook !== '')
    webhook: string;

    @IsString()
    @IsOptional()
    secret?: string;
}

export class CreateSubscribeDto {
    @MaxLength(20, {
        each: true,
    })
    source: string[];

    @Type(() => Wehbook)
    @ValidateNested()
    dingdingWebhook: Wehbook;

    @Type(() => Wehbook)
    @ValidateNested()
    feishuWebhook: Wehbook;

    @Type(() => Wehbook)
    @ValidateNested()
    wechatWebhook: Wehbook;
}
