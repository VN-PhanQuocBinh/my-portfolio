import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
export function Roll({ children }: {
    children: string;
}) {
    return <span className="roll" aria-label={children}><span aria-hidden="true">{Array.from(children).map((char, i) => <span className="roll-char" key={i} style={{ '--i': i } as React.CSSProperties}><span>{char === ' ' ? '\u00a0' : char}</span><span>{char === ' ' ? '\u00a0' : char}</span></span>)}</span></span>;
}
export function Divider({ light = false }: {
    light?: boolean;
}) {
    return <motion.div className={`divider ${light ? 'divider-light' : ''}`} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '0px 0px -20px 0px' }} transition={{ duration: .8, ease: [.16, 1, .3, 1] }}/>;
}
export function Reveal({ children, className = '', delay = 0 }: {
    children: ReactNode;
    className?: string;
    delay?: number;
}) {
    const reduced = useReducedMotion();
    return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .75, delay, ease: [.16, 1, .3, 1] }}>{children}</motion.div>;
}
export function Chapter({ number, title, subtitle }: {
    number: string;
    title: string;
    subtitle?: string;
}) {
    const reduced = useReducedMotion();
    return <motion.div className="chapter-heading" initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .8, ease: [.16, 1, .3, 1] }}><span className="chapter-number">{number}</span><div><p className="eyebrow">{title}</p>{subtitle && <p className="chapter-subtitle">{subtitle}</p>}</div></motion.div>
}
