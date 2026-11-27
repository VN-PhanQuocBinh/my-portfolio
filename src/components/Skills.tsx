import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
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

function CredentialScore({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: .5 });
  const reduced = useReducedMotion();
  const progress = useMotionValue(0);
  const display = useTransform(progress, current => current.toFixed(decimals));
  const finalScore = value.toFixed(decimals);

  useEffect(() => {
    if (reduced || !inView) return;
    const controls = animate(progress, value, { duration: 1.15, ease: 'easeOut' });
    return () => controls.stop();
  }, [inView, progress, reduced, value]);

  return (
    <span ref={ref} className="credential-score">
      <span className="sr-only">{finalScore}</span>
      <motion.span aria-hidden="true">{reduced ? finalScore : display}</motion.span>
    </span>
  );
}

export default function Skills() {
  const reducedMotion = useReducedMotion();
  const [mobile, setMobile] = useState(() => !window.matchMedia('(min-width: 768px)').matches);
  const [revealOrder, setRevealOrder] = useState(randomRevealOrder);

  useEffect(() => {
    const desktopViewport = window.matchMedia('(min-width: 768px)');
    const updateViewport = () => setMobile(!desktopViewport.matches);
    desktopViewport.addEventListener('change', updateViewport);
    updateViewport();
    return () => desktopViewport.removeEventListener('change', updateViewport);
  }, []);

  return <section id="skills" className="skills-paper" aria-label="Skills and education">
    <div className="section-shell">
      <div className="section-title-row"><Chapter number="03" title="SKILLS" repeat /></div>
      <motion.div
        className="skills-specimen"
        onViewportLeave={mobile || reducedMotion ? undefined : () => setRevealOrder(randomRevealOrder())}
        viewport={{ amount: 'some' }}
      >
        {cells.map((cell, index) => <motion.article
          key={cell.label}
          className="skills-specimen-cell"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: mobile, amount: .15 }}
          transition={{ duration: reducedMotion ? 0 : mobile ? .38 : .55, delay: mobile || reducedMotion ? 0 : revealOrder[index] * .15, ease: [.16, 1, .3, 1] }}
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
          <strong><CredentialScore value={3.81} decimals={2} /> <small>/ 4.0 GPA</small></strong>
        </motion.article>
        <motion.article className="education-credential" initial={reducedMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .2 }} transition={{ duration: .6, delay: reducedMotion ? 0 : .1 }}>
          <span className="education-credential-label">English / 01.2026</span>
          <h3>TOEIC Certificate</h3>
          <p>Basic English communication</p>
          <strong><CredentialScore value={675} /> <small>/ 990</small></strong>
        </motion.article>
      </div>
    </div>
  </section>;
}
