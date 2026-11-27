import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projects } from '../data/portfolio';
import type { Project } from '../data/portfolio';
import { Roll } from './UI';

function ProjectRule({ bottom = false, visible }: { bottom?: boolean; visible: boolean }) {
    const reduced = useReducedMotion();
    return <motion.span aria-hidden="true" className={`editorial-animated-rule${bottom ? ' is-bottom' : ''}`} initial={false} animate={{ scaleX: reduced || visible ? 1 : 0 }} transition={{ duration: reduced ? 0 : .8, ease: [.16, 1, .3, 1] }}/>;
}

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
    const visible = useInView(ref, { amount: 'some', margin: '0px 0px -5% 0px' });
    const [stickyTop, setStickyTop] = useState(0);
    const coveredProgress = useMotionValue(0);
    const [covered, setCovered] = useState(false);
    useMotionValueEvent(coveredProgress, 'change', value => setCovered(value >= .98));
    const contentScale = useTransform(coveredProgress, [0, 1], [1, .94]);
    const contentBlur = useTransform(coveredProgress, [0, 1], ['blur(0px)', 'blur(6px)']);
    useEffect(() => {
        if (reduced || index === projects.length - 1) return;
        let frame = 0;
        const update = () => {
            frame = 0;
            const next = ref.current?.nextElementSibling;
            if (!next?.classList.contains('editorial-project')) return;
            const top = next.getBoundingClientRect().top;
            coveredProgress.set(Math.max(0, Math.min(1, (window.innerHeight - top) / (window.innerHeight * .8))));
        };
        const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        update();
        return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
    }, [coveredProgress, index, reduced]);
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
    const showTitle = reduced || (visible && !covered);
    return <motion.article ref={ref} className="editorial-project" style={reduced ? undefined : { position: 'sticky', top: stickyTop, zIndex: index + 1, y, opacity }}>
        <motion.div className="section-shell" style={reduced ? undefined : { scale: contentScale, filter: contentBlur }}>
            <header className="editorial-project-header">
                <span className="editorial-project-title-mask">
                    <motion.h3
                        initial={false}
                        animate={{ y: showTitle ? 0 : 14, opacity: showTitle ? 1 : 0 }}
                        transition={showTitle && !reduced ? { duration: .45, ease: [.16, 1, .3, 1] } : { duration: 0 }}
                    >
                        {project.name}
                    </motion.h3>
                </span>
            </header>
            <motion.div className="editorial-project-rule" initial={false} animate={{ scaleX: reduced || visible ? 1 : 0 }} transition={{ duration: reduced ? 0 : .7, ease: [.16, 1, .3, 1] }} />
            <div className="editorial-project-main">
                <div><ul className="editorial-project-details">{project.details.map((detail, detailIndex) => <motion.li key={detail.title} initial={false} animate={{ opacity: reduced || visible ? 1 : 0, y: reduced || visible ? 0 : 16 }} transition={reduced || !visible ? { duration: 0 } : { duration: .55, delay: .12 + detailIndex * .1, ease: [.16, 1, .3, 1] }}><p>{detail.copy}</p></motion.li>)}</ul></div>
                <dl className="editorial-project-meta">
                    <div className="editorial-project-tech">
                        <dt>TECHNOLOGIES</dt>
                        <dd><ul className="editorial-tech-list">{project.stack.map(tech => <li key={tech}>{tech}</li>)}</ul></dd>
                    </div>
                    <div><ProjectRule visible={visible}/><dt>ROLE</dt><dd>{project.role}</dd></div>
                    <div><ProjectRule visible={visible}/><dt>PERIOD</dt><dd>{project.period}</dd></div>
                </dl>
            </div>
            <div className="editorial-project-bottom"><ProjectRule visible={visible}/><div className="editorial-project-metrics" aria-label="Project highlights">{project.metrics.map(metric => <strong key={metric}>{metric}</strong>)}</div><div className="editorial-project-links">{project.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"><Roll>{link.label}</Roll><ExternalLink size={16}/></a>)}</div><ProjectRule bottom visible={visible}/></div>
        </motion.div>
    </motion.article>;
}

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const reduced = useReducedMotion();
    return <section ref={sectionRef} id="work" className="editorial-work" aria-labelledby="projects-heading">
        {reduced ? <div className="editorial-work-static section-shell"><h2 id="projects-heading">PROJECTS</h2><p>Selected projects. Built end to end.</p></div> : <><h2 id="projects-heading" className="sr-only">PROJECTS</h2><ProjectIntro sectionRef={sectionRef}/><div className="project-intro-pause" aria-hidden="true"/></>}
        {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index}/>)}
    </section>;
}
