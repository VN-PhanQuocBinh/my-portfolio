import { useRef, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
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

function ProjectLinks({ project }: { project: Project }) {
    return <div className="project-links">{project.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"><Roll>{link.label}</Roll><ExternalLink size={16}/></a>)}</div>;
}

function ProjectContent({ project, index }: { project: Project; index: number }) {
    return <>
        <header className="stack-project-header"><h3>{project.name}</h3><span className="stack-project-category">{String(index + 1).padStart(2, '0')} / {project.category}</span></header>
        <div className="project-summary">
            <div className="project-summary-main"><p className="project-summary-subtitle">{project.subtitle}</p><div className="project-summary-descriptions">{project.details.map(detail => <p className="project-summary-description" key={detail.title}>{detail.copy}</p>)}</div><ProjectLinks project={project}/></div>
            <div className="project-summary-meta"><div><span>VAI TRÒ</span><p>{project.role}</p></div><div><span>THỜI GIAN</span><p>{project.period}</p></div><div className="project-tech-group"><span>CÔNG NGHỆ</span><p>{project.stack.join(' · ')}</p></div></div><div className="project-highlights" aria-label="Điểm nổi bật">{project.metrics.map(metric => <div className="project-highlight" key={metric}><span className="project-highlight-mark" aria-hidden="true">✳</span><strong>{metric}</strong></div>)}</div>
        </div>
    </>;
}

function ScrollProjectCard({ project, index, progress }: { project: Project; index: number; progress: MotionValue<number> }) {
    const start = .32 + index * .2;
    const end = start + .14;
    const y = useTransform(progress, [start, end], ['115%', '0%']);
    const [interactive, setInteractive] = useState(false);
    useMotionValueEvent(progress, 'change', value => {
        const nextStart = start + .2;
        setInteractive(value >= end - .02 && (index === projects.length - 1 || value < nextStart + .07));
    });
    return <motion.article className="stack-project-card" style={{ y, zIndex: index + 2 }} inert={!interactive} aria-hidden={!interactive}>
        <ProjectContent project={project} index={index}/>
    </motion.article>;
}

function ScrollProjects() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
    const { scrollYProgress: entryProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
    const entryY = useTransform(entryProgress, [.1, .95], ['110%', '0%']);
    const entryOpacity = useTransform(entryProgress, [.08, .35], [0, 1]);
    const topY = useTransform(scrollYProgress, [.08, .24], ['0%', '-62%']);
    const bottomY = useTransform(scrollYProgress, [.08, .24], ['0%', '62%']);
    const introOpacity = useTransform(scrollYProgress, [0, .32, .48], [1, 1, .12]);
    const introScale = useTransform(scrollYProgress, [.28, .48], [1, .86]);
    const filter = useTransform(scrollYProgress, [.28, .48], ['blur(0px)', 'blur(14px)']);
    const sentenceOpacity = useTransform(scrollYProgress, [.12, .22], [0, 1]);
    const sentenceY = useTransform(scrollYProgress, [.12, .22], [16, 0]);
    return <section id="work" className="projects-scroll" ref={ref} aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="sr-only">PROJECTS</h2>
        <div className="projects-stage">
            <motion.div className="projects-intro-entry" style={{ y: entryY, opacity: entryOpacity }} aria-hidden="true"><motion.div className="projects-intro" style={{ opacity: introOpacity, scale: introScale, filter }}>
                <div className="projects-split-title">
                    <motion.span className="projects-title-half projects-title-top" style={{ y: topY }}>PROJECTS</motion.span>
                    <motion.span className="projects-title-half projects-title-bottom" style={{ y: bottomY }}>PROJECTS</motion.span>
                    <motion.p className="projects-intro-sentence" style={{ opacity: sentenceOpacity, y: sentenceY }}>Selected projects.<br/>Built end to end.</motion.p>
                </div>
            </motion.div></motion.div>
            {projects.map((project, index) => <ScrollProjectCard key={project.id} project={project} index={index} progress={scrollYProgress}/>)}
        </div>
    </section>;
}

export default function Projects() {
    const reduced = useReducedMotion();
    const compact = useSyncExternalStore(subscribeCompact, getCompact, getServerCompact);
    return <>
        {reduced || compact ? <section id="work" className="projects-static section-shell" aria-labelledby="projects-heading"><h2 id="projects-heading">PROJECTS</h2><p className="projects-static-intro">Selected projects. Built end to end.</p>{projects.map((project, index) => <article className="stack-project-card" key={project.id}><ProjectContent project={project} index={index}/></article>)}</section> : <ScrollProjects/>}
    </>;
}
