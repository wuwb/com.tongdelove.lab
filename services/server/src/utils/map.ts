type ObjectType = Record<string, number | string | boolean>;

/**
 * 将 map 转换为对象
 */
export const mapToObj = (map: Map<string, any>): ObjectType => {
  const obj: ObjectType = {};
  for (const [k, v] of map) {
    obj[k] = v;
  }
  return obj;
};
