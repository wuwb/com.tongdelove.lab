const styles = {
  boardTit: {
    textAlign: 'center',
    lineHeight: 2,
    fontWeight: 'bold',
  },
  keyRow: {
    margin: '10px',
    display: 'flex',
  },
  key: {
    marginRight: '30px',
  },
  keyCode: {
    display: 'inline-block',
    border: '1px solid #f0f0f0',
    borderRadius: '2px',
    padding: '0 3px',
    color: 'rgba(94, 41, 41, 0.6)',
    fontSize: '12px',
    marginRight: '3px',
  },
  text: {
    marginLeft: 'auto',
    color: '#888',
  }
}

export const FastMenu = () => (
  <div>
    <div className="boardTit" style={styles.boardTit}>快捷键</div>
    <div className="keyRow" style={styles.keyRow}>
      <span className="key">
        <code style={styles.keyCode}>command + c</code>
        <code style={styles.keyCode}>ctrl + c</code>
      </span>
      <span className="text" style={styles.text}>复制组件</span>
    </div>
    <div className="keyRow" style={styles.keyRow}>
      <span className="key" style={styles.key}>
        <code style={styles.keyCode}>delete</code>
        <code style={styles.keyCode}>backspace</code>
      </span>
      <span className="text" style={styles.text}>删除组件</span>
    </div>
    <div className="keyRow" style={styles.keyRow}>
      <span className="key" style={styles.key}>
        <code style={styles.keyCode}>command + h</code>
        <code style={styles.keyCode}>ctrl +h</code>
      </span>
      <span className="text" style={styles.text}>显示/隐藏网格线</span>
    </div>
    <div className="keyRow" style={styles.keyRow}>
      <span className="key" style={styles.key}>
        <code style={styles.keyCode}>鼠标右键菜单</code>
        <code style={styles.keyCode}>快捷键盘(删除/复制)</code>
      </span>
      <span className="text" style={styles.text}>显示/隐藏网格线</span>
    </div>
  </div>
)

