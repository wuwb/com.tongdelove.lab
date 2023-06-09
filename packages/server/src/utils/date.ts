import moment from 'moment';
/**
 * @param dateNum 时间
 * @param isDue 是否显示时分秒
 * 格式化日期
 */
export const formatDate = (
    dateNum: string | number,
    isDue = false,
): string => {
    if (!dateNum) {
        return '';
    }
    // if (!/^\d+$/.test(dateNum.toString())) {
    //   throw new TypeError(`${dateNum}传递的数据格式化错误`);
    // }
    if (isDue) {
        return moment(dateNum).format('YYYY-MM-DD');
    } else {
        return moment(dateNum).format('YYYY-MM-DD HH:mm:ss');
    }
};

/**
 * 获取年月日时间
 */
export const getDay = (date: Date = new Date()): string => {
    return moment(date).format('YYYYMMDD');
};

/**
 * 获取当前的时间鹾
 */
export const getTime = (): number => {
    return new Date().getTime();
};

/**
 * 根据生日计算年龄
 * @param date
 */
export const birthdayYear = (date: Date): string | null => {
    try {
        return date ? `${moment().diff(date, 'years')}` : null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

/**
 * 获取当前是第几周
 */
export const getCurrentWeek = (start_time = '2000-01-01') => {
    const base = new Date(start_time).getTime();
    const current = new Date().getTime();
    const time = (current - base) / (1000 * 60 * 60 * 24 * 7);
    const currentWeek = Math.ceil(time);
    return currentWeek;
};

/**
 * 传递时间距离现在多少毫秒过期
 */
export const dueDateMillisecond = (date: string): number => {
    // 当前时间
    const currentTime = Number.parseInt(String(new Date().getTime() / 1000));
    // 未来时间
    const futureTime = Number.parseInt(String(new Date(date).getTime() / 1000));
    if (futureTime <= currentTime) {
        return 0;
    } else {
        // 这里把秒数转成毫秒
        return (futureTime - currentTime) * 1000;
    }
};
