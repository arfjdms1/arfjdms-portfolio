import { githubUrl, site } from '../data/site'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.embers} aria-hidden="true" />
      <nav className={styles.nav}>
        <a className={styles.navBrand} href="#top">
          {site.brand}
        </a>
        <div className={styles.navLinks}>
          <a href="#work">Work</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
      <div className={styles.stage}>
        <p className={styles.brand}>{site.brand}</p>
        <h1 className={styles.headline}>{site.headline}</h1>
        <p className={styles.tagline}>{site.tagline}</p>
        <div className={styles.ctas}>
          <a className={styles.primary} href="#work">
            See the work
          </a>
          <a
            className={styles.secondary}
            href={githubUrl()}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  )
}
