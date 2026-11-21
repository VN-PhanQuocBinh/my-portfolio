import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import skills from '../../data/skills.json';
import { Chapter } from './UI';

const order = ['Programming Languages', 'Frontend', 'Backend', 'Databases', 'Testing & Debugging', 'Tools & AI', 'Fundamentals & Architecture'];
const labels = ['Languages', 'Frontend', 'Backend', 'Databases', 'Testing & Debugging', 'Tools & AI', 'Architecture'];
const categories = skills.map(category => ({ ...category, items: category.items.flatMap(item => item === 'HTML / CSS' ? ['HTML', 'CSS'] : [item]) })).sort((a, b) => order.indexOf(a.title) - order.indexOf(b.title));
const cells = categories.map((category, index) => ({ label: labels[index], items: category.items }));

function randomRevealOrder() {
  const ranks = cells.map((_, index) => index);
  for (let i = ranks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ranks[i], ranks[j]] = [ranks[j], ranks[i]];
  }
  return ranks;
}

export default function Skills() {
  const reducedMotion = useReducedMotion();
  const [revealOrder, setRevealOrder] = useState(randomRevealOrder);
  return <section id="skills" className="skills-paper" aria-label="Skills and education">
    <div className="section-shell">
      <div className="section-title-row"><Chapter number="03" title="SKILLS" repeat /></div>
      <motion.div className="skills-specimen" onViewportLeave={() => setRevealOrder(randomRevealOrder())} viewport={{ amount: 'some' }}>
        {cells.map((cell, index) => <motion.article
          key={cell.label}
          className="skills-specimen-cell"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: .15 }}
          transition={{ duration: reducedMotion ? 0 : .55, delay: reducedMotion ? 0 : revealOrder[index] * .15, ease: [.16, 1, .3, 1] }}
        >
          <div className="skills-specimen-header"><h3>{cell.label}</h3><span className="skills-specimen-arrow" aria-hidden="true">↗</span></div>
          <ul className="skills-specimen-items">{cell.items.map(item => <li key={item}>{item}</li>)}</ul>
        </motion.article>)}
      </motion.div>
      <div className="education-credentials" aria-label="Education and certification">
        <motion.article className="education-credential" initial={reducedMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .2 }} transition={{ duration: .6 }}>
          <span className="education-credential-label">Education / 2023 — 2027</span>
          <h3>Can Tho University</h3>
          <p>Software Engineering</p>
          <strong>3.81 <small>/ 4.0 GPA</small></strong>
        </motion.article>
        <motion.article className="education-credential" initial={reducedMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .2 }} transition={{ duration: .6, delay: reducedMotion ? 0 : .1 }}>
          <span className="education-credential-label">English / 01.2026</span>
          <h3>TOEIC Certificate</h3>
          <p>Basic English communication</p>
          <strong>675 <small>/ 990</small></strong>
        </motion.article>
      </div>
    </div>
  </section>;
}
