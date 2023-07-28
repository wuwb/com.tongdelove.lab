import { Link } from '@umijs/max';
import classnames from 'classnames';
import Styles from './Article.less';

const Article = (props) => {
  return (
    <div className={Styles.entry}>
      <div className={Styles.metaWrapper}>
        <div className={Styles.userName}>作者</div>
        <div className={Styles.date}>时间</div>
        <div className={Styles.tagList}>
          <div className={Styles.tag}>标签</div>
          <div className={Styles.tag}>标签</div>
          <div className={Styles.tag}>标签</div>
        </div>
      </div>
      <div className={Styles.contentWrapper}>
        <div className={Styles.contentMain}>
          <div className={Styles.titleRow}>
            <Link to="">文章标题</Link>
          </div>
          <div className={Styles.detailRow}>
            <Link to="">文章内容</Link>
          </div>
          <ul className={Styles.actionList}>
            <li className={classnames(Styles.item, Styles.view)}>
              阅读
              <span>100</span>
            </li>
            <li className={classnames(Styles.item, Styles.like)}>
              点赞
              <span>100</span>
            </li>
            <li className={classnames(Styles.item, Styles.comment)}>
              评论
              <span>100</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Article;
