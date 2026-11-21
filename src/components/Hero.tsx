import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
    const reduced = useReducedMotion();
    const heroRef = useRef<HTMLElement>(null);
    const inView = useInView(heroRef, { amount: .25 });
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const left = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -24]);
    const right = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 24]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : .96]);
    return <header ref={heroRef} id="top" className="hero section-shell"><div className="hero-layout hero-name-layout"><div className="hero-copy">
        <motion.h1 className="hero-name" aria-label="QUOC BINH" style={{ scale }}><span className="hero-wordmark" aria-hidden="true">{['QUOC', 'BINH'].map((word, wordIndex) => <motion.span className="hero-word" key={word} style={{ x: wordIndex ? right : left }}>{Array.from(word).map((letter, i) => <span className="hero-letter-mask" key={i}><motion.span className="hero-letter" initial={false} animate={{ y: reduced || inView ? '0%' : '150%', opacity: reduced || inView ? 1 : 0 }} transition={reduced || !inView ? { duration: 0 } : { duration: .8, delay: .1 + (wordIndex * 4 + i) * .055, ease: [.16, 1, .3, 1] }}><motion.span className="hero-letter-interactive" whileHover={reduced ? undefined : { y: -10, rotate: i % 2 ? 3 : -3, color: 'var(--accent-primary)' }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>{letter}</motion.span></motion.span></span>)}</motion.span>)}</span></motion.h1>
        <div className="hero-role-wrap"><p className="hero-role" aria-label="FULLSTACK DEVELOPER">{['FULLSTACK', 'DEVELOPER'].map((word, wordIndex) => <span className="hero-role-word" key={word} aria-hidden="true"><motion.span className="hero-role-letter" initial={false} animate={{ y: reduced || inView ? '0%' : '150%', opacity: reduced || inView ? 1 : 0 }} transition={reduced || !inView ? { duration: 0 } : { duration: .8, delay: .2 + wordIndex * .12, ease: [.16, 1, .3, 1] }}>{word}</motion.span></span>)}</p></div>
    </div></div></header>;
}
