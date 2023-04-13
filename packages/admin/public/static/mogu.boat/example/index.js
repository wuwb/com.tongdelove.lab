/*
 *
 * index.js是主模块，对应的样式请写在index.css中，他是组件的默认样式
 * 模块的依赖越少越好，尽量独立能够完成一个功能
 * 如果要产生依赖，那么将依赖项再做成模块，让用户自己去组装
 *
 * */

function max() {
  return Math.max.apply(null, arguments);
}

function min() {
  return Math.min.apply(null, arguments);
}
