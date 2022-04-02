import classnames from 'classnames';
import SubTitle from './SubTitle';
import styles from './index.module.css';

interface Props {
    handleFontPicker: Function;
}

const FontPanel = (props: Props) => {
    const { handleFontPicker } = props;
    return (
        <div className={styles.fontPickerWrap}>
            <SubTitle title="文字" />
            <div className={styles.fontPickers}>
                <div className={classnames(styles.fontPicker, styles.fontPickerTitle)} onClick={handleFontPicker.bind(this, 'title')}>点击添加标题</div>
                <div className={classnames(styles.fontPicker, styles.fontPickerSubtitle)} onClick={handleFontPicker.bind(this, 'subtitle')}>点击添加副标题</div>
                <div className={classnames(styles.fontPicker, styles.fontPickerText)} onClick={handleFontPicker.bind(this, 'text')}>点击添加正文</div>
            </div>
        </div>
    );
}

export default FontPanel;
