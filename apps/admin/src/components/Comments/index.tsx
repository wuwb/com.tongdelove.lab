import API from '@/services/api'
import { notification } from 'antd'
import { useRef, useState } from 'react'
import Style from './index.less'

const Comments = (props) => {
  const textInput = useRef()
  const [replyContent, setReplyContent] = useState('')
  const [showMoreComments, setShowMoreComments] = useState(false)
  const [userInfo, setUserInfo] = useState({
    username: '',
  })
  const state = {
    selfLove: false,
    topicLike: props.topicLike,
  }

  const handelChange = (event) => {
    setReplyContent(event.target.value)
  }

  const __showMoreComments = () => {
    setShowMoreComments(true)
  }

  // 聚焦
  const focus = () => {
    textInput.current.focus()
  }

  // 点赞
  const topicLike = async () => {
    let response = await API.topicLike({
      topicId: props.topicId,
      status: props.topicLike ? 0 : 1,
    })

    // 确定点赞数，status: 1点赞，0取消
    let dotCounts
    if (response.data.status) {
      dotCounts = props.dotCounts + 1
    } else {
      dotCounts = props.dotCounts - 1 >= 0 ? props.dotCounts - 1 : 0
    }
    // 更新点赞状态
    props.topicLikeFn({
      topicLikeCounts: dotCounts,
      topicLike: response.data.status === 1,
      index: props.topicIndex,
    })
  }

  // 添加评论
  const _handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      if (!replyContent) {
        notification['error']({
          message: '请输入评论内容',
        })
        return
      }

      let response = await API.addDiscuss({
        topicId: props.topicId,
        replyContent: replyContent,
      })
      notification['success']({
        message: response.message,
      })

      // 添加评论
      props.addComments({
        replyContent: replyContent,
        replyName: userInfo.username,
        index: props.topicIndex,
      })

      // 清空评论
      setReplyContent('')
    }
  }

  // 评论时间处理
  const _handlerCommentTime = () => {
    if (props.createdAt) {
      // 距离现在过去了多少秒
      let date = (new Date() - new Date(props.createdAt)) / 1000

      // 过去了多少天
      let days = Math.floor(date / (60 * 60 * 24))
      let hours = Math.floor(date / (60 * 60))
      let minutes = Math.floor(date / 60)
      let second = Math.floor(date)

      if (days) return days + '天前'
      if (hours) return hours + '小时前'
      if (minutes) return minutes + '分钟前'
      if (second) return second + '秒前'
    }
    return ''
  }

  const CommentsList = () => {
    return (
      <ul className={`comments-list ${props.dialog && 'fill'}`}>
        {props.dialog && props.discuss.length === 0 ? (
          <li className="content">暂时没有评论哦~</li>
        ) : (
          ''
        )}
        {props.discuss.map((item, index) => {
          // 非弹窗展示三个
          if (props.dialog || index !== 3) {
            return (
              <li
                className={`content ${index > 3 && !props.dialog && 'hidden'} ${
                  showMoreComments && 'no-hidden'
                }`}
                key={index}
              >
                <span className="username  u-f-black">{item.replyName}</span>
                <span className="replay-content u-f-black-blod">
                  {item.replyContent}
                </span>
              </li>
            )
          } else {
            // 显示所有部分内容
            return (
              <div key={index}>
                <li className={`content ${showMoreComments && 'no-hidden'}`}>
                  <span className="username  u-f-black">{item.replyName}</span>
                  <span className="replay-content u-f-black-blod">
                    {item.replyContent}
                  </span>
                </li>
                {props.discuss.length > 4 ? (
                  <li
                    className={`content show-more u-f-lightblack2 ${
                      showMoreComments && 'hidden'
                    }`}
                  >
                    <span onClick={__showMoreComments}>显示所有</span>
                  </li>
                ) : (
                  ''
                )}
              </div>
            )
          }
        })}
      </ul>
    )
  }

  return (
    <div className={Style['comments-section']}>
      {props.dialog ? <CommentsList /> : ''}
      <div className="opetions">
        <div className="fl-left">
          <span
            className={`favorite  ${props.topicLike && 'active'}`}
            onClick={topicLike}
          ></span>
          <span className="comments" onClick={focus}></span>
        </div>
        <span className="fl-right collect"></span>
      </div>
      {props.dotCounts ? (
        <div className="dot-counts u-f-black">{props.dotCounts}次赞</div>
      ) : (
        <div className="dot-counts u-f-black">抢先 点赞</div>
      )}
      {/* 弹窗类型、与列表类型，评论列表位置不同 */}
      {!props.dialog ? <CommentsList /> : ''}
      <div className="release-time u-f-lightblack2">
        {_handlerCommentTime()}
      </div>
      <div className="add-comments">
        <input
          type="text"
          ref={textInput}
          className="u-f-black"
          placeholder="添加评论..."
          onChange={handelChange}
          value={replyContent}
          onKeyPress={_handleKeyPress}
        />
        <span className="more"></span>
      </div>
    </div>
  )
}

export default Comments
