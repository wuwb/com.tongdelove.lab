import MyBreadcrumbs from './MyBreadcrumbs'
import MyRelate from './MyRelate'
import MyTips from './MyTips'
import ArticleContent from './ArticleContent'
import PostHeader from '@/pages/wpnews/components/post-header'

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
