import { featured } from '../data/projects'
import styles from './Featured.module.css'

export function Featured() {
  return (
    <section id="work" className={styles.section}>
      <p className={styles.eyebrow}>Featured</p>
      <h2 className={styles.title}>{featured.name}</h2>
      <p className={styles.body}>{featured.description}</p>
      <ul className={styles.tags}>
        {featured.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <a
        className={styles.link}
        href={featured.href}
        target="_blank"
        rel="noreferrer"
      >
        Visit openember.host
        <span aria-hidden="true"> →</span>
      </a>
    </section>
  )
}
