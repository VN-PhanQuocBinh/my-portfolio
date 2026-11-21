import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { RefObject } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projects } from '../data/portfolio';
import type { Project } from '../data/portfolio';
import { Roll } from './UI';

const compactQuery = '(max-width: 760px), (max-height: 600px)';
function subscribeCompact(callback: () => void) {
    const media = window.matchMedia(compactQuery);
    media.addEventListener('change', callback);
    return () => media.removeEventListener('change', callback);
}
const getCompact = () => window.matchMedia(compactQuery).matches;
const getServerCompact = () => true;

function ProjectIntro({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'start -1'] });
    const { scrollYProgress: entryProgress } = useScroll({ target: sectionRef, offset: ['start end', 'start start'] });
    const entryY = useTransform(entryProgress, [.1, .95], ['110%', '0%']);
    const entryOpacity = useTransform(entryProgress, [.08, .35], [0, 1]);
    const topY = useTransform(scrollYProgress, [.08, .5], ['0%', '-62%']);
    const bottomY = useTransform(scrollYProgress, [.08, .5], ['0%', '62%']);
    const introOpacity = useTransform(scrollYProgress, [.48, 1], [1, .6]);
    const introScale = useTransform(scrollYProgress, [.48, 1], [1, .94]);
    const filter = useTransform(scrollYProgress, [.48, 1], ['blur(0px)', 'blur(5px)']);
    const sentenceOpacity = useTransform(scrollYProgress, [.2, .45], [0, 1]);
    const sentenceY = useTransform(scrollYProgress, [.2, .45], [16, 0]);
    return <div className="project-intro-scroll" aria-hidden="true"><div className="projects-stage">
        <motion.div className="projects-intro-entry" style={{ y: entryY, opacity: entryOpacity }}><motion.div className="projects-intro" style={{ opacity: introOpacity, scale: introScale, filter }}>
            <div className="projects-split-title">
                <motion.span className="projects-title-half projects-title-top" style={{ y: topY }}>PROJECTS</motion.span>
                <motion.span className="projects-title-half projects-title-bottom" style={{ y: bottomY }}>PROJECTS</motion.span>
                <motion.p className="projects-intro-sentence" style={{ opacity: sentenceOpacity, y: sentenceY }}>Selected projects.<br/>Built end to end.</motion.p>
            </div>
        </motion.div></motion.div>
    </div></div>;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const reduced = useReducedMotion();
    const ref = useRef<HTMLElement>(null);
    const [stickyTop, setStickyTop] = useState(0);
    useEffect(() => {
        const element = ref.current;
        if (!element || reduced) return;
        const update = () => setStickyTop(Math.min(80, window.innerHeight - element.offsetHeight - 20));
        const observer = new ResizeObserver(update);
        observer.observe(element);
        window.addEventListener('resize', update);
        update();
        return () => { observer.disconnect(); window.removeEventListener('resize', update); };
    }, [reduced]);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.55'] });
    const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
    const opacity = useTransform(scrollYProgress, [0, .75], [.2, 1]);
    return <motion.article ref={ref} className="editorial-project" style={reduced ? undefined : { position: 'sticky', top: stickyTop, zIndex: index + 1, y, opacity }}>
        <div className="section-shell">
            <header className="editorial-project-header"><h3>{project.name}</h3><span className="editorial-project-category">{project.category}</span></header>
            <motion.div className="editorial-project-rule" initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false, amount: .5 }} transition={{ duration: .7, ease: [.16, 1, .3, 1] }} />
            <div className="editorial-project-main">
                <div><p className="editorial-project-lead">{project.lead}</p><ul className="editorial-project-details">{project.details.map(detail => <li key={detail.title}><p><strong>{detail.title}</strong> {detail.copy}</p></li>)}</ul></div>
                <dl className="editorial-project-meta"><div><dt>ROLE</dt><dd>{project.role}</dd></div><div><dt>PERIOD</dt><dd>{project.period}</dd></div><div><dt>TECHNOLOGIES</dt><dd><ul className="editorial-tech-list">{project.stack.map(tech => <li key={tech}>{tech}</li>)}</ul></dd></div></dl>
            </div>
            <div className="editorial-project-bottom"><div className="editorial-project-metrics" aria-label="Project highlights">{project.metrics.map(metric => <strong key={metric}>{metric}</strong>)}</div><div className="editorial-project-links">{project.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"><Roll>{link.label}</Roll><ExternalLink size={16}/></a>)}</div></div>
        </div>
    </motion.article>;
}

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const reduced = useReducedMotion();
    const compact = useSyncExternalStore(subscribeCompact, getCompact, getServerCompact);
    return <section ref={sectionRef} id="work" className="editorial-work" aria-labelledby="projects-heading">
        {reduced || compact ? <div className="editorial-work-static section-shell"><h2 id="projects-heading">PROJECTS</h2><p>Selected projects. Built end to end.</p></div> : <><h2 id="projects-heading" className="sr-only">PROJECTS</h2><ProjectIntro sectionRef={sectionRef}/><div className="project-intro-pause" aria-hidden="true"/></>}
        {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index}/>)}
    </section>;
}
