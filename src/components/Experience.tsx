import { motion, useReducedMotion } from 'framer-motion';
import { experiences } from '../data/portfolio';
import { Divider } from './UI';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Experience() {
    const reduced = useReducedMotion();
    return <section id="experience" className="section-shell chapter-section experience-section">
        <Divider />
        <div className="editorial-layout">
            <aside className="sticky-heading">
                <motion.div className="chapter-heading experience-heading" initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: .4 }}>
                    <motion.span className="chapter-number" variants={{ hidden: { opacity: 0 }, visible: { opacity: .55, transition: { duration: .35 } } }}>01</motion.span>
                    <span className="experience-heading-mask"><motion.span className="eyebrow experience-heading-text" variants={{ hidden: { y: '110%' }, visible: { y: 0, transition: { duration: .9, ease } } }}>EXPERIENCE</motion.span></span>
                </motion.div>
            </aside>
            <div className="experience-list">{experiences.map((exp, i) => <motion.article className="experience-item" key={exp.company} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: .2 }}>
                <motion.div className="experience-rule" variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: .8, ease } } }}/>
                <motion.div className="experience-meta mono" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: .5, delay: .1 } } }}><span>{exp.period}</span><span>{exp.location}</span></motion.div>
                <div className="experience-title"><div className="experience-name-mask"><motion.h3 variants={{ hidden: { y: '110%' }, visible: { y: 0, transition: { duration: .85, delay: .15, ease } } }}>{exp.company}</motion.h3></div><motion.span className="mono experience-index" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: .35, y: 0, transition: { delay: .35, duration: .5 } } }}>0{i + 1}</motion.span></div>
                <motion.div variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: .65, delay: .3, ease } } }}>
                    <p className="experience-role">{exp.role}</p>
                    <ul>{exp.points.map(point => <li key={point}>{point}</li>)}</ul>
                    <div className="tags">{exp.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                </motion.div>
            </motion.article>)}</div>
        </div>
    </section>;
}
