import React from 'react';
import Link from 'next/link';
import { Avatar, Button } from 'antd';
import s from './Heading.module.css';

const Heading = () => {
  return (
    <div className={s.root}>
      <div className={s.content}>
        <Avatar
          alt="Your Avatar"
          size={100}
          className="mr-10"
          src="https://zeit.co/api/www/avatar/?u=evilrabbit&s=180" />
        <div className={s.name}>
          <div className={s.title}>
            <h2 className={s.username}>
              Evil Rabbit
            </h2>
            <Button className={s.createProjectButton}>
              Create Project
            </Button>
          </div>
          <div>
            <p className={s.integrationsTitle}>Git Integrations</p>
            <Link href="https://github.com/ofekashery">
              <a href="" target="_blank" rel="noopener">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p className={s.integrationsUsername}>ofekashery</p>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
