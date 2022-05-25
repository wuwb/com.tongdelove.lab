import {
    format,
    parseISO,
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
} from 'date-fns';

export const formatDate = (isoDateString: string): string => {
    const date = parseISO(isoDateString);
    const currentDate = Date.now();
    const daysAgo = differenceInDays(currentDate, date);
    const hoursAgo = differenceInHours(currentDate, date);
    const minutesAgo = differenceInMinutes(currentDate, date);
    const secondsAgo = differenceInSeconds(currentDate, date);

    if (secondsAgo <= 2) {
        return `just now`;
    }
    if (minutesAgo < 1) {
        return `${secondsAgo} second${secondsAgo > 1 ? 's' : ''} ago`;
    }
    if (hoursAgo < 1) {
        return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    }
    if (daysAgo < 1) {
        return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    }
    if (daysAgo <= 30) {
        return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    }
    return format(date, 'MMM do, yyyy');
};

export const formateDateForInput = (isoDateString: string): string => {
    if (isoDateString) {
        return format(parseISO(isoDateString), 'yyyy-MM-dd');
    }
    return isoDateString;
};

export const formatYMDHMS = (date, sep1, sep2) => {
    if (typeof date === 'string' || typeof date === 'number') {
        date = new Date(date);
    }
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    month = month < 10 ? '0' + month : month;
    d = d < 10 ? '0' + d : d;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    sep1 = sep1 || '-';
    sep2 = sep2 || ':';
    let str = `${year}${sep1}${month}${sep1}${d} ${h}${sep2}${m}${sep2}${s}`;
    return str;
};

export const formatYMD = (date, sep1) => {
    if (typeof date === 'string' || typeof date === 'number') {
        date = new Date(date);
    }
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let d = date.getDate();
    month = month < 10 ? '0' + month : month;
    d = d < 10 ? '0' + d : d;
    sep1 = sep1 || '-';
    let str = `${year}${sep1}${month}${sep1}${d}`;
    return str;
};
