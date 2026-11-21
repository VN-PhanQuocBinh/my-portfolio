import { motion, useReducedMotion } from 'framer-motion';
import skills from '../../data/skills.json';
import { Chapter } from './UI';

const order = ['Programming Languages', 'Frontend', 'Backend', 'Databases', 'Testing & Debugging', 'Tools & AI', 'Fundamentals & Architecture'];
const labels = ['Languages', 'Frontend', 'Backend', 'Databases', 'Testing & Debugging', 'Tools & AI', 'Architecture'];
const categories = skills.map(category => ({ ...category, items: category.items.flatMap(item => item === 'HTML / CSS' ? ['HTML', 'CSS'] : [item]) })).sort((a, b) => order.indexOf(a.title) - order.indexOf(b.title));
const cells = categories.map((category, index) => ({ label: labels[index], content: category.items.join(' · ') }));

export default function Skills() {
  const reducedMotion = useReducedMotion();
  return <section className="skills-paper" aria-label="Skills and education">
    <div className="section-shell">
      <div className="section-title-row"><Chapter number="03" title="SKILLS" /></div>
      <div className="skills-specimen">
        {cells.map((cell, index) => <motion.article
          key={cell.label}
          className="skills-specimen-cell"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .15 }}
          transition={{ duration: .55, delay: reducedMotion ? 0 : (index % 4) * .06, ease: [.16, 1, .3, 1] }}
        >
          <div className="skills-specimen-header"><h3>{String(index + 1).padStart(2, '0')} — {cell.label}</h3><span className="skills-specimen-arrow" aria-hidden="true">↗</span></div>
          <p>{cell.content}</p>
        </motion.article>)}
      </div>
      <div className="education-credentials" aria-label="Education and certification">
        <motion.article className="education-credential" initial={reducedMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .6 }}>
          <span className="education-credential-label">Education / 2023 — 2027</span>
          <h3>Can Tho University</h3>
          <p>Software Engineering</p>
          <strong>3.81 <small>/ 4.0 GPA</small></strong>
        </motion.article>
        <motion.article className="education-credential" initial={reducedMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .6, delay: reducedMotion ? 0 : .1 }}>
          <span className="education-credential-label">English / 01.2026</span>
          <h3>TOEIC Certificate</h3>
          <p>Basic English communication</p>
          <strong>675 <small>/ 990</small></strong>
        </motion.article>
      </div>
    </div>
  </section>;
}
