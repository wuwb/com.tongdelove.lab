import MyBreadcrumbs from './MyBreadcrumbs'
import MyRelate from './MyRelate'
import MyTips from './MyTips'
import ArticleContent from './ArticleContent'

function Article(props) {
  return (
    <div>
      {/* <PostHeader /> */}
      <MyBreadcrumbs />
      <ArticleContent content={props.content} />
      <MyRelate />
      <MyTips />
    </div>
  )
}

export default Article
