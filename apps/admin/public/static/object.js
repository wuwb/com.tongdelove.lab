/**
 * 将对象中的 key 值转成小写
 * @param  {Object} obj
 * @return {Object}
 */
Object.prototype.lower_keys = function (obj) {
  for (var key in obj) {
    var val = obj[key];
    delete obj[key];
    obj[key.toLowerCase()] = val;
  }
  return obj;
};

/**
 * 判断对象类型是不是 String
 * @param  {Object}  obj
 * @return {Boolean}
 */
Object.prototype.isString = function (obj) {
  return (
    typeof obj == 'string' ||
    obj instanceof String ||
    Object.prototype.toString.call(obj) == '[object String]'
  );
};
