

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

export const parseSourceType = (id) => {
    let sourceType = 'custom';
    switch (id) {
        case 1:
            sourceType = '猿急送';
            break;
        case 2:
            sourceType = '开源众包';
            break;
        case 4:
            sourceType = '码市';
            break;
        case 5:
            sourceType = 'A5任务';
            break;
        case 7:
            sourceType = '实现';
            break;
        case 8:
            sourceType = '码易';
            break;
        case 9:
            sourceType = '人人开发';
            break;
    }
    return sourceType;
}
