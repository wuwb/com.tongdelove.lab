import Link from 'next/link'
import s from './GlobalNav.module.css'

export const GlobalNav = () => {
  const isServer = typeof window === 'undefined'

  return (
    <div>
      <div className={s.globalNav}>
        <div>
          <div className={s.globalNavItems}>
            {/* 
            <ul>
              <li>
                  <a>{this.props.isServer ? "server" : "client"}</a>
              </li> 
              <li>
                  <a href="/forum">论坛</a>
              </li>
              <li>
                  <a href="/chat">在线聊天室</a>
              </li>
              <li>
                  <a href="/work">工作室</a>
              </li> 
            </ul>
            */}
          </div>
        </div>
      </div>
    </div>
  )
}
