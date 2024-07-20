import styles from './Features.module.css'

export const Features = () => {
  return (
    <div className={styles.features}>
      <div className={styles.feature}>
        <div
          className={styles.featureImg}
          style={{
            // minWidth: '90px',
            // height: '90px',
            backgroundSize: '70%',
            backgroundImage: 'url("/img/content.svg")',
          }}
        ></div>
        <div>
          <p className={styles.featureTitle}>
            Online store and blogging platform.
          </p>
          <p>Manage your products, posts and other content with ease.</p>
        </div>
      </div>
      <div className={styles.feature}>
        <div
          className={styles.featureImg}
          style={{
            backgroundImage: 'url("/img/puzzle.svg")',
            backgroundSize: '68%',
            // minWidth: '90px',
            // height: '90px',
          }}
        ></div>
        <div>
          <p className={styles.featureTitle}>
            Powerful admin panel with themes and plugins.
          </p>
          <p>
            Customize your theme, install plugins. WordPress-like user
            experience.
          </p>
        </div>
      </div>
      <div className={styles.feature}>
        <div
          className={styles.featureImg}
          style={{
            // minWidth: '120px',
            // height: '120px',
            // marginLeft: '-50px',
            backgroundSize: '97%',
            backgroundImage: 'url("/img/seo.svg")',
          }}
        ></div>
        <div>
          <p className={styles.featureTitle}>SEO optimized.</p>
          <p>
            Modifiable meta tags for all content and custom pages.
            Auto-generated Sitemap.
          </p>
        </div>
      </div>
      <div className={styles.feature}>
        <div
          className={styles.featureImg}
          style={{
            backgroundImage: 'url("/img/magic-wand.svg")',
          }}
        ></div>
        <div>
          <p className={styles.featureTitle}>Theme editor</p>
          <p>
            Fully customize your Theme layout in drag-and-drop Theme editor.
          </p>
        </div>
      </div>
      <div className={styles.feature}>
        <div
          className={styles.featureImg}
          style={{
            backgroundSize: '73%',
            backgroundImage: 'url("/img/rocket.svg")',
          }}
        ></div>
        <div>
          <p className={styles.featureTitle}>Node.js.</p>
          <p>
            Designed to be a better version of PHP web servers, it greatly
            outperforms backend of well known CMS.
          </p>
        </div>
      </div>
      <div className={styles.feature}>
        <div
          className={styles.featureImg}
          style={{
            backgroundImage: 'url("/img/open-source.svg")',
          }}
        ></div>
        <div>
          <p className={styles.featureTitle}>Free and open source</p>
          <p>
            Cromwell CMS with default themes and plugins will stay forever free
            of charge and open source.
          </p>
        </div>
      </div>
    </div>
  )
}
