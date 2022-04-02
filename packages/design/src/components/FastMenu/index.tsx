import styled from "@emotion/styled";

const StyledFastMenu = styled.div`
    .boardTit {
      text-align: center;
      line-height: 2;
      font-weight: bold;
    }
    .keyRow {
      margin: 10px;
      display: flex;
      .key {
        margin-right: 30px;
        code {
          display: inline-block;
          border: 1px solid #f0f0f0;
          border-radius: 2px;
          padding: 0 3px;
          color: rgba(94, 41, 41, 0.6);
          font-size: 12px;
          margin-right: 3px;
        }
      }
      .text {
        margin-left: auto;
        color: #888;
      }
    }
`;

const FastMenu = () => (
  <StyledFastMenu>
    <div className="boardTit">快捷键</div>
    <div className="keyRow">
      <span className="key">
        <code>command + c</code>
        <code>ctrl + c</code>
      </span>
      <span className="text">复制组件</span>
    </div>
    <div className="keyRow">
      <span className="key">
        <code>delete</code>
        <code>backspace</code>
      </span>
      <span className="text">删除组件</span>
    </div>
    <div className="keyRow">
      <span className="key">
        <code>command + h</code>
        <code>ctrl +h</code>
      </span>
      <span className="text">显示/隐藏网格线</span>
    </div>
    <div className="keyRow">
      <span className="key">
        <code>鼠标右键菜单</code>
        <code>快捷键盘(删除/复制)</code>
      </span>
      <span className="text">显示/隐藏网格线</span>
    </div>
  </StyledFastMenu>
);

export default FastMenu;
