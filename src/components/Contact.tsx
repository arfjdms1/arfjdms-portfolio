import { githubUrl, site } from '../data/site'
import styles from './Contact.module.css'

export function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <h2 className={styles.title}>Say hello</h2>
      <p className={styles.lead}>
        Open source and hosting work under the {site.brand} alias.
      </p>
      <div className={styles.links}>
        <a href={githubUrl()} target="_blank" rel="noreferrer">
          github.com/{site.githubUser}
        </a>
        <a href={`https://${site.domain}`}>{site.domain}</a>
        <a href="https://openember.host" target="_blank" rel="noreferrer">
          openember.host
        </a>
      </div>
      <footer className={styles.footer}>
        <span className={styles.brand}>{site.brand}</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </section>
  )
}
