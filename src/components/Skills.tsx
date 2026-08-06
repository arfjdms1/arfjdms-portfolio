import { site } from '../data/site'
import styles from './Skills.module.css'

export function Skills() {
  return (
    <section className={styles.section} aria-labelledby="skills-heading">
      <h2 id="skills-heading" className={styles.title}>
        Toolkit
      </h2>
      <ul className={styles.list}>
        {site.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  )
}
