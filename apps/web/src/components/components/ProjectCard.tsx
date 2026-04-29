import React from 'react'
import Link from 'next/link'
import { Tag } from '@/components/ui/tag'
import { Card, CardHeader, CardContent } from '@tongdelove/ui/components/card'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import s from './ProjectCard.module.css'

interface ProjectCardProps {
  projectId: string
  created: string
  repo: string
}

export const ProjectCard = ({ projectId, created, repo }: ProjectCardProps) => {
  return (
    <Card className={clsx(s.card, 'p-0')}>
      <CardHeader>
        <Link
          key="rope"
          href={`https://github.com/${repo}`}
          className={s.footer}
        >
          <p className="mr-3 text-base font-medium">{repo}</p>
        </Link>
      </CardHeader>
      <CardContent>
        <div className={s.title}>
          <h3>{projectId}</h3>
          <Button className={s.visitButton} size="default">
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
            <Link href={`https://${projectId}.now.sh`} rel="noopener">
              {projectId}
            </Link>
            <Tag className={s.tag} color="blue">
              Latest
            </Tag>
            <span className={s.created}>{created}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
