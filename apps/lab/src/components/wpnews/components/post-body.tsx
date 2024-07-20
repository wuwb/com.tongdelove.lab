import styles from './post-body.module.css'

export const PostBody = ({ content }) => {
  return (
    <div className="mx-auto max-w-2xl">
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
