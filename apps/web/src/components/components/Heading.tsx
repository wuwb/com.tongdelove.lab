import React from 'react'
import Link from 'next/link'
import { Button } from '@chakra-ui/react'
import s from './Heading.module.css'
import { Avatar } from '@/components/ui/avatar'

export const Heading = () => {
  return (
    <div className={s.root}>
      <div className={s.content}>
        <Avatar
          size="md"
          className="mr-10"
          src="https://zeit.co/api/www/avatar/?u=evilrabbit&s=180"
        />
        <div className={s.name}>
          <div className={s.title}>
            <h2 className={s.username}>Evil Rabbit</h2>
            <Button className={s.createProjectButton}>Create Project</Button>
          </div>
          <div>
            <p className={s.integrationsTitle}>Git Integrations</p>
            <Link
              href="https://github.com/ofekashery"
              target="_blank"
              rel="noopener"
            >
              <div className="flex items-center">
                <p className={s.integrationsUsername}>ofekashery</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
