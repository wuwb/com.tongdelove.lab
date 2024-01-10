import Box from '@mui/material/Box';
import styles from './PanelItemWrap.module.css';

interface PanelItemProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const PanelItemWrap = (props: PanelItemProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            className={styles.panelItem}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                children
            )}
        </div>
    );
}

export default PanelItemWrap;
