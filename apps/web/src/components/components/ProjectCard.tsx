import React from 'react'
import Link from 'next/link'
import { Button, Card, Tag } from 'antd'
import clsx from 'clsx'
import s from './ProjectCard.module.css'

interface Props {
  projectId: string
  created: string
  repo: string
}

export const ProjectCard = ({ projectId, created, repo }: Props) => {
  return (
    <Card
      className={clsx(s.card, 'p-0')}
      actions={[
        <Link key="rope" href={`https://github.com/${repo}`}>
          <a href="" className={s.footer}>
            <p className="mr-3 text-base font-medium">{repo}</p>
          </a>
        </Link>,
      ]}
    >
      <div className={s.title}>
        <h3>{projectId}</h3>
        <Button className={s.visitButton} size="small">
          Visit
        </Button>
      </div>
      <div className={s.content}>
        <div className={s.dot}>
          <Link href={`https://${projectId}.now.sh`}>{projectId}.now.sh</Link>
          <Tag className={s.tag} color="green">
            Production
          </Tag>
          <span className={s.created}>{created}</span>
        </div>
        <div className={s.dot}>
          <Link href={`https://${projectId}.now.sh`}>
            <a rel="noopener">{projectId}-oa71gi2.now.sh</a>
          </Link>
          <Tag className={s.tag} color="blue">
            Latest
          </Tag>
          <span className={s.created}>{created}</span>
        </div>
      </div>
    </Card>
  )
}
