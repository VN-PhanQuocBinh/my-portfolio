import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { experiences } from '../data/portfolio';
import { Divider } from './UI';

const terms = /(AI tools|Java features|unit tests|Agile Scrum|Git Flow|React and Next\.js|REST APIs|CMS components)/gi;
function Highlight({ text }: { text: string }) {
    return <>{text.split(terms).map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}
function ExperienceCard({ exp, index, active, onActive }: { exp: typeof experiences[number]; index: number; active: boolean; onActive: (index: number) => void }) {
    const ref = useRef<HTMLElement>(null);
    const visible = useInView(ref, { margin: '-25% 0px -45% 0px' });
    const reduced = useReducedMotion();
    useEffect(() => { if (visible) onActive(index); }, [visible, index, onActive]);
    return <article ref={ref} className="dossier-entry"><span className={`timeline-node ${active ? 'active' : ''}`} aria-hidden="true"/>
        <motion.div className="dossier-card" initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .65, ease: [.16, 1, .3, 1] }}>
            <div className="dossier-meta"><span>{exp.period}</span><span>{exp.location.toUpperCase()}</span><span>[ {String(index + 1).padStart(2, '0')} ]</span></div>
            <div className="dossier-body"><div className="dossier-header"><h3>{exp.company}</h3><span className="dossier-role">{exp.role}</span></div>
                <ol className="dossier-points">{exp.points.map((point, i) => <li key={point}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}.</span><p><Highlight text={point}/></p></li>)}</ol>
                <div className="dossier-tags">{exp.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                {index === 1 && <div className="dossier-links"><a href="https://vn168.vn" target="_blank" rel="noopener noreferrer">[ vn168.vn <ExternalLink size={13}/> ]</a><a href="https://giratech.vn" target="_blank" rel="noopener noreferrer">[ giratech.vn <ExternalLink size={13}/> ]</a></div>}
            </div>
        </motion.div>
    </article>;
}
export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const reduced = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const { scrollYProgress: railProgress } = useScroll({ target: listRef, offset: ['start center', 'end center'] });
    const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
    return <section ref={sectionRef} id="experience" className="section-shell chapter-section experience-section"><Divider/>
        <div className="editorial-layout dossier-layout"><aside className="sticky-heading dossier-anchor"><div className="chapter-heading"><span className="chapter-number">01</span><div><p className="eyebrow">EXPERIENCE</p></div></div>
            <div className="dossier-counter" aria-hidden="true"><AnimatePresence mode="wait" initial={false}><motion.span key={active} initial={reduced ? false : { y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduced ? undefined : { y: '-100%', opacity: 0 }} transition={{ duration: .25 }}>{String(active + 1).padStart(2, '0')}</motion.span></AnimatePresence></div>
            <p className="dossier-status">ACTIVE_LOG // {String(active + 1).padStart(2, '0')} OF {String(experiences.length).padStart(2, '0')}</p><div className="dossier-progress"><motion.span style={{ scaleX: reduced ? 1 : progress }}/></div>
        </aside><div className="experience-list dossier-list" ref={listRef}><div className="timeline-rail" aria-hidden="true"><motion.span style={{ scaleY: reduced ? 1 : railProgress }}/></div>{experiences.map((exp, index) => <ExperienceCard key={exp.company} exp={exp} index={index} active={active === index} onActive={setActive}/>)}</div></div>
    </section>;
}
