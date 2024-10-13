import AreaSelector from '../CanvasControl/AreaSelector'
import styles from './RightButtons.module.css'

interface Props {
  handleToggleInSideAndOutSide: () => void
}

export const RightButtons = (props: Props) => {
  const { handleToggleInSideAndOutSide } = props
  return (
    <div className={styles.rightButtons}>
      <div
        className={styles.btn}
        onClick={handleToggleInSideAndOutSide.bind(this, true)}
      >
        外侧
      </div>
      <div
        className={styles.btn}
        onClick={handleToggleInSideAndOutSide.bind(this, false)}
      >
        内侧
      </div>
      <AreaSelector />
    </div>
  )
}
