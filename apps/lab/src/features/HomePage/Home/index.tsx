import React from 'react'
import { PageWrapper } from '@/components/ui/PageWrapper/PageWrapper'
import TopicList from './TopicList'
import Sidebar from './Sidebar'

export const Home: React.FC<any> = props => {
  return (
    <PageWrapper>
      <div className="clearfix mt-5">
        <div
          className="float-left"
          style={{
            width: 'calc(100% - 340px)',
          }}
        >
          <TopicList />
        </div>
        <div className="float-right w-[320px]">
          <Sidebar />
        </div>
      </div>
    </PageWrapper>
  )
}
