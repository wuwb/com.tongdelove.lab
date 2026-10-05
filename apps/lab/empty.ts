/**
 * 空模块，供 next.config.ts 的 turbopack.resolveAlias 使用。
 *
 * 配置里把 `fs` 指向本文件：
 * `fs: { browser: './empty.ts' }`
 * 目的是在浏览器端替换掉 Node 的 fs（App Router 下部分依赖会误引用）。
 */
export default {}
