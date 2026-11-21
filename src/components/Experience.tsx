import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus, Minus, ExternalLink } from 'lucide-react';
import { experiences } from '../data/portfolio';

export default function Experience() {
    const [open, setOpen] = useState<number | null>(0);
    const reduced = useReducedMotion();
    return <section id="experience" className="section-shell chapter-section experience-editorial" aria-labelledby="experience-heading">
        <div className="experience-editorial-heading"><h2 id="experience-heading">EXPERIENCE</h2></div>
        <div className="experience-editorial-list">{experiences.map((exp, index) => <article className="experience-editorial-row" key={exp.company}>
            <motion.div className="experience-editorial-divider" aria-hidden="true" initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .8, ease: [.16, 1, .3, 1] }}/>
            <button className="experience-editorial-trigger" aria-expanded={open === index} aria-controls={`experience-content-${index}`} onClick={() => setOpen(open === index ? null : index)}>
                <span className="experience-editorial-name-mask"><span className="experience-editorial-name">{exp.company}</span></span>
                <span className="experience-editorial-role">{exp.role}</span><span className="experience-editorial-place">{exp.location}</span><span className="experience-editorial-period">{exp.period}</span><span className="experience-editorial-toggle" aria-hidden="true">{open === index ? <Minus size={22}/> : <Plus size={22}/>}</span>
            </button>
            <AnimatePresence initial={false}>{open === index && <motion.div id={`experience-content-${index}`} className="experience-editorial-expand" initial={reduced ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : .35, ease: [.16, 1, .3, 1] }}><div className="experience-editorial-details"><ul>{exp.points.map(point => <li key={point}>{point}</li>)}</ul><p className="experience-editorial-stack">{exp.tags.join(' / ')}</p>{index === 1 && <div className="experience-editorial-links"><a href="https://vn168.vn" target="_blank" rel="noopener noreferrer">vn168.vn <ExternalLink size={15}/></a><a href="https://giratech.vn" target="_blank" rel="noopener noreferrer">giratech.vn <ExternalLink size={15}/></a></div>}</div></motion.div>}</AnimatePresence>
        </article>)}<motion.div className="experience-editorial-divider" aria-hidden="true" initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: .8 }}/></div>
    </section>;
}
