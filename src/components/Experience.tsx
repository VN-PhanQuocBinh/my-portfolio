import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { experiences } from '../data/portfolio';
import './experience.css';

const revealEase = [.16, 1, .3, 1] as const;
const rise: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: .45, delay, ease: revealEase },
    }),
};
const divider: Variants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: .55, ease: revealEase } },
};
const node: Variants = {
    hidden: { scale: .65, opacity: .35 },
    visible: { scale: 1, opacity: 1, transition: { duration: .28, ease: revealEase } },
};

export default function Experience() {
    const section = useRef<HTMLElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const reduced = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: section, offset: ['start 75%', 'end 65%'] });
    const railProgress = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });

    return (
        <section ref={section} id="experience" className="section-shell experience" aria-labelledby="experience-heading">
            <div className="experience-layout">
                <header className="experience-section-heading">
                    <h2 id="experience-heading">EXPERIENCE</h2>
                    <p>2025 — 2026 · INDUSTRY EXPERIENCE</p>
                </header>

                <div className="experience-records" onPointerLeave={() => setHoveredIndex(null)}>
                    <div className="experience-rail" aria-hidden="true">
                        <motion.span style={{ scaleY: reduced ? 1 : railProgress }} />
                    </div>
                    {experiences.map((exp, index) => (
                        <motion.article
                            key={exp.company}
                            className="experience-entry"
                            data-dimmed={hoveredIndex !== null && hoveredIndex !== index}
                            onPointerEnter={event => setHoveredIndex(event.pointerType === 'mouse' ? index : null)}
                            initial={reduced ? false : 'hidden'}
                            whileInView="visible"
                            viewport={{ once: true, amount: .25 }}
                        >
                            <motion.span className="experience-entry-rule" variants={reduced ? undefined : divider} aria-hidden="true" />
                            <p className="experience-entry-meta">{exp.period} · {exp.location}</p>
                            <header className="experience-company-heading">
                                <motion.span className="experience-node" variants={reduced ? undefined : node} aria-hidden="true" />
                                <motion.div variants={reduced ? undefined : rise} custom={0}>
                                    <h3>{exp.company}</h3>
                                    <p className="experience-role-label">{exp.role}</p>
                                </motion.div>
                            </header>
                            <ul className="experience-points" role="list">
                                {exp.points.map((point, pointIndex) => (
                                    <motion.li key={point} variants={reduced ? undefined : rise} custom={.08 + pointIndex * .055}>
                                        {point}
                                    </motion.li>
                                ))}
                            </ul>
                            <footer className="experience-notes">
                                <p>{exp.tags.join(' / ')}</p>
                                {index === 1 && (
                                    <div className="experience-links">
                                        <a href="https://vn168.vn" target="_blank" rel="noopener noreferrer">vn168.vn <ExternalLink size={15} aria-hidden="true" /></a>
                                        <a href="https://giratech.vn" target="_blank" rel="noopener noreferrer">giratech.vn <ExternalLink size={15} aria-hidden="true" /></a>
                                    </div>
                                )}
                            </footer>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
