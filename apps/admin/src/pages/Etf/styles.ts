import { createStyles, keyframes } from 'antd-style'

// 导出表格过程中的 loading 动画
const load1 = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
`

/**
 * ETF 网格交易策略页面的样式。
 *
 * 迁移自 apps/admin/ETF 仓库（原基于 styled-components），
 * 这里统一改用项目已在使用的 antd-style，避免引入额外依赖，
 * 同时所有样式都收敛在页面作用域内，不影响管理后台其它页面。
 */
export const useStyles = createStyles(({ css }) => ({
  wrapper: css`
    max-width: 1024px;
    margin: 0 auto;

    & *,
    & *::before,
    & *::after {
      box-sizing: border-box;
    }

    ol,
    ul,
    p {
      margin: 0;
      padding: 0;
    }
  `,

  // ---------------- 表单 ----------------
  fieldset: css`
    border: 0;
    padding: 0;
    margin-bottom: 1.5em;
  `,
  fieldsetLast: css`
    margin-bottom: 3em;
  `,
  legend: css`
    display: block;
    width: 100%;
    padding: 0.3em 0;
    margin-bottom: 0.3em;
    border-bottom: 1px solid #333;
    font-size: 1.5em;
  `,
  row: css`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 1em;
  `,
  rowLast: css`
    margin-bottom: 0;
  `,
  label: css`
    width: 4em;
    margin-right: 1em;
    display: inline-flex;
    white-space: nowrap;
  `,
  hint: css`
    flex: 1;
    color: #999;
    font-size: 12px;
  `,

  // ---------------- 输入容器 ----------------
  inputContainer: css`
    display: inline-flex;
    color: rgba(0, 0, 0, 0.87);
    flex: 1;

    input[type='text'] {
      -webkit-appearance: none;
      max-width: 100%;
      text-align: left;
      color: rgba(0, 0, 0, 0.87);
      padding: 0.5em 1em;
      background: rgb(255, 255, 255);
      border-width: 1px;
      border-style: solid;
      border-color: rgba(34, 36, 38, 0.15);
      border-radius: 5px;
      transition:
        box-shadow 0.1s ease 0s,
        border-color 0.1s ease 0s;
      flex: 1;
    }

    input:read-only {
      background: #eee;
      cursor: default;
    }
  `,
  unitInputContainer: css`
    input[type='text'] {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right-color: transparent;
    }

    div {
      font-weight: 700;
      border-radius: 5px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      color: rgba(0, 0, 0, 0.87);
      background: none rgb(255, 255, 255);
      border-width: 1px;
      border-style: solid;
      border-color: rgba(34, 36, 38, 0.15);
      height: 30px;
      width: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  `,
  flexEndInputContainer: css`
    justify-content: flex-end;

    input[type='checkbox'] {
      margin-right: 14px;
    }
  `,
  suggestionContainer: css`
    display: block;
    position: relative;

    input {
      flex: none;
      width: 100%;
      box-sizing: border-box;
    }
  `,
  suggestionList: css`
    position: absolute;
    left: 0;
    right: 0;
    z-index: 10;
    background: #fff;
    border: 1px solid #eee;
    margin-top: -2px;
    box-shadow: 0 5px 8px #ddd;

    ul {
      list-style: none;
      text-align: left;
    }

    li {
      height: 36px;
      line-height: 36px;
      border-bottom: 1px solid #eee;
      padding: 0 1em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }

    li:hover {
      background-color: #eee;
    }

    p {
      font-size: 12px;
      color: #888;
      padding: 0.6em 1em;
    }
  `,
  radioLabel: css`
    display: inline-flex;
    align-items: center;
    margin-left: 1em;
    cursor: pointer;

    &:first-of-type {
      margin-left: 0;
    }

    input[type='radio'] {
      margin: 0 4px 0 0;
    }
  `,
  plainButton: css`
    -webkit-appearance: none;
    border: 0;
    color: #06c;
    background: none;
    font-size: 16px;
    outline: none;
    cursor: pointer;
  `,

  // ---------------- 网格表格 ----------------
  tableContainer: css`
    width: 100%;
  `,
  title: css`
    margin-bottom: 1em;
    display: flex;
    justify-content: space-between;
    font-size: 1.2em;
  `,
  content: css`
    max-width: 100%;
    overflow-x: scroll;
  `,
  table: css`
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    border: 1px solid #333;
    border-width: 1px 0 1px 0;
  `,
  tr: css`
    border-bottom: 1px dashed #333;
  `,
  trLast: css`
    border-bottom-style: solid;
  `,
  smallGrid: css`
    background-color: #ffffff;
  `,
  middleGrid: css`
    background-color: #3da4ab;
  `,
  bigGrid: css`
    background-color: #fe8a71;
  `,
  theadCell: css`
    border-bottom: 1px solid #333;
    padding: 0.5em 0;
    background: #fff;
    position: sticky;
    z-index: 1;
    top: 0;
  `,
  tbodyCell: css`
    border-bottom: 1px dashed #333;
    padding: 1em;
    text-align: center;
  `,
  tfootCell: css`
    padding: 1em 0;
    text-align: center;
  `,
  tip: css`
    padding: 1em 0;
    font-size: 12px;

    p {
      margin-bottom: 6px;
    }

    ol {
      line-height: 26px;
      list-style: none;
    }
  `,

  // ---------------- 导出遮罩 ----------------
  spinner: css`
    &,
    &:before,
    &:after {
      background: rgb(54, 215, 183);
      animation: ${load1} 1s infinite ease-in-out;
      width: 1em;
      height: 4em;
    }

    & {
      color: rgb(54, 215, 183);
      text-indent: -9999em;
      position: relative;
      font-size: 11px;
      transform: translateZ(0);
      animation-delay: -0.16s;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 10001;
    }

    &:before,
    &:after {
      position: absolute;
      top: 0;
      content: '';
    }

    &:before {
      left: -1.5em;
      animation-delay: -0.32s;
    }

    &:after {
      left: 1.5em;
    }
  `,
  background: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 10000;
  `,
}))
