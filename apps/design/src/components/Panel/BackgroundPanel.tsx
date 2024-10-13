import { ColorPicker, Divider } from 'antd'
import styles from './index.module.css'
import { SubTitle } from './SubTitle'

interface BackgroundPanelProps {
  handleColorPicker: () => void
  handleTexturePicker: () => void
}

export const BackgroundPanel = (props: BackgroundPanelProps) => {
  return (
    <div>
      <div>
        <SubTitle title="背景颜色" />
        <div className={styles.colorItems}>
          <div className={styles.color}>
            <div className={styles.colorPicker}>
              <ColorPicker defaultValue="#1677ff" showText />
            </div>
            <div className={styles.colorItem}>
              <div
                className=""
                style={{
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  width: '100%',
                  height: '100%',
                  backgroundImage:
                    'url("data:image/png;base64,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")',
                }}
              ></div>
            </div>
          </div>
          <div className={styles.colorItem}>
            <img src="data:image/jpeg;base64,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" />
          </div>
        </div>
        <Divider my="md" />
        <div className={styles.colorItems}>
          <div
            className={styles.colorItem}
            style={{ background: 'rgb(0, 0, 0)' }}
          ></div>
          <div
            className={styles.colorItem}
            style={{ background: 'rgb(68, 68, 68)' }}
          ></div>
          <div
            className={styles.colorItem}
            style={{ background: 'rgb(102, 102, 102)' }}
          ></div>
          <div
            className={styles.colorItem}
            style={{ background: 'rgb(168, 168, 168)' }}
          ></div>
          <div
            className={styles.colorItem}
            style={{ background: 'rgb(217, 217, 217)' }}
          ></div>
          <div
            className={styles.colorItem}
            style={{ background: 'rgb(243, 243, 243)' }}
          ></div>
          <div
            className={styles.colorItem}
            style={{ background: 'rgb(255, 0, 0)' }}
          ></div>
          <div
            className={styles.colorItem}
            style={{ background: 'rgb(255, 91, 92)' }}
          ></div>
          <div
            className={styles.colorItem}
            style={{ background: 'rgb(255, 102, 51)' }}
          ></div>
          <div
            className={styles.colorItem}
            style={{ background: 'rgb(255, 153, 0)' }}
          ></div>
          <div
            className={styles.colorItem}
            style={{ background: 'rgb(255, 204, 51)' }}
          ></div>
          <div
            className={styles.colorItem}
            style={{ background: 'rgb(254, 249, 81)' }}
          ></div>
        </div>
      </div>
      <div>
        <SubTitle title="背景纹理" />
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
