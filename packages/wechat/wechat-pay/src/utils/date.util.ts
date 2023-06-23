import { Injectable, Inject } from "@nestjs/common";
import dayjs from 'dayjs';

@Injectable()
export class DateUtil {
    /**
     * 将JS时间转换为微信所需的rfc3339标准格式时间
     * @param date JS时间
     * @returns 微信时间格式，遵循rfc3339标准格式
     */
    parseWechatPayDate(date) {
        return dayjs(date).format('YYYY-MM-DDTHH:mm:ssZZ');
    }
};
