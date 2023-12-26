import cx from 'clsx';
import DaohangCard from './DaohangCard';
import navs from './nav';
import { LinksNav } from './LinksNav';
import styles from './Daohang.module.scss';

function renderSidebar() {
  const scrollToLinkSection = (item: string) => {
    const section = document.querySelector(`#${item}`);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      {navs.map(list => {
        return (
          <div key={list.name}>
            <div
              className={cx(styles.sidebarcateTitle)}
              onClick={() => {
                scrollToLinkSection(list.name);
              }}
            >
              {list.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function renderNav() {
  return navs.map(list => {
    return (
      <div id={list.name} key={list.name}>
        <h3 className={cx(styles.cateTitle)}>{list.name}</h3>
        <div className="grid grid-cols-6 gap-4">
          {list.children.map(item => {
            return <DaohangCard key={item.name} item={item} />;
          })}
        </div>
      </div>
    );
  });
}

export default function Daohang() {
  return (
    <div>
      <LinksNav />
      <div className={cx('container mx-auto mt-10', styles.container)}>
        <div className={cx('basis-1/12', styles.sidebar)}>{renderSidebar()}</div>
        <div className={cx('basis-11/12', styles.content)}>{renderNav()}</div>
      </div>
      <div>
        <p>如需添加站点，请发邮件联系：541330190@qq.com</p>
      </div>
    </div>
  );
}
