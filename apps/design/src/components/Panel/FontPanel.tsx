import clsx from 'clsx'
import styles from './index.module.css'
import { SubTitle } from './SubTitle'

interface FontPanelProps {
  handleFontPicker: () => void
}

export const FontPanel = (props: FontPanelProps) => {
  const { handleFontPicker } = props
  return (
    <div className={styles.fontPickerWrap}>
      <SubTitle title="文字" />
      <div className={styles.fontPickers}>
        <div
          className={clsx(styles.fontPicker, styles.fontPickerTitle)}
          onClick={handleFontPicker.bind(this, 'title')}
        >
          点击添加标题
        </div>
        <div
          className={clsx(styles.fontPicker, styles.fontPickerSubtitle)}
          onClick={handleFontPicker.bind(this, 'subtitle')}
        >
          点击添加副标题
        </div>
        <div
          className={clsx(styles.fontPicker, styles.fontPickerText)}
          onClick={handleFontPicker.bind(this, 'text')}
        >
          点击添加正文
        </div>
      </div>
    </div>
  )
}
