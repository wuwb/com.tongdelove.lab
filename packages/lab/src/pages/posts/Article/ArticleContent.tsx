import { Breadcrumbs, Container, Grid, Link, Typography } from "@mui/material";
import styles from '../style.module.css';

type Props = {
    content: string
}

const ArticleContent = (props: Props) => {
    return (
        <div className="max-w-2xl mx-auto">
            <div
                className={styles['markdown']}
                dangerouslySetInnerHTML={{ __html: props.content }}
            />
        </div>
    );
}

export default ArticleContent;
