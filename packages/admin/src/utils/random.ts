

/**
 *  生成一个随机浮点数
 */
export const random = () => +(Math.random() * 60).toFixed(2);

/**
 * 生成一个区间之间的随机数(含最大值，含最小值)
 * @param min 最小值
 * @param max 最大值
 */
export const randomIntFrom = (min: number, max: number) => {
    const minc = Math.ceil(min);
    const maxc = Math.floor(max);
    return Math.floor(Math.random() * (maxc - minc + 1)) + minc;
};

/**
 * 从一个数组中随机取一个值
 * @param some 待取值的数组
 */
export const randomArray = (...some: number[]) => some[randomIntFrom(0, some.length - 1)];
