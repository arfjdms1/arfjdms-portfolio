import { projects } from '../data/projects'
import styles from './Projects.module.css'

export function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <p className={styles.eyebrow}>Projects</p>
      <h2 className={styles.title}>Selected builds</h2>
      <p className={styles.lead}>
        Original work from the bench — skin bridging and native tooling.
      </p>
      <ul className={styles.list}>
        {projects.map((project) => (
          <li key={project.id} className={styles.item}>
            <a
              className={styles.row}
              href={project.href}
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <h3 className={styles.name}>{project.name}</h3>
                <p className={styles.desc}>{project.description}</p>
                <ul className={styles.tags}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
