import { useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function Hero() {
    const reduced = useReducedMotion();
    const heroRef = useRef<HTMLElement>(null);
    const inView = useInView(heroRef, { amount: .25 });
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const left = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -24]);
    const right = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 24]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : .55]);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const x = useSpring(mouseX, { stiffness: 140, damping: 25, mass: .5 });
    const y = useSpring(mouseY, { stiffness: 140, damping: 25, mass: .5 });
    const [tracking, setTracking] = useState(false);
    const onPointerMove = (event: PointerEvent<HTMLElement>) => {
        if (event.pointerType !== 'mouse' || reduced) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - bounds.left);
        mouseY.set(event.clientY - bounds.top);
        setTracking(true);
    };
    return <header ref={heroRef} id="top" className="hero section-shell" onPointerMove={onPointerMove} onPointerLeave={() => setTracking(false)}>
        <div className="hero-frame" aria-hidden="true"><i/><i/><i/><i/><span className="hero-ruler hero-ruler-left"/><span className="hero-ruler hero-ruler-bottom"/></div>
        {!reduced && <motion.div className="hero-ruler-indicators" aria-hidden="true" animate={{ opacity: tracking ? 1 : 0 }} transition={{ duration: .2 }}><motion.span className="hero-ruler-indicator-left" style={{ y }}/><motion.span className="hero-ruler-indicator-bottom" style={{ x }}/></motion.div>}
        {!reduced && <motion.div className="hero-crosshair" aria-hidden="true" animate={{ opacity: tracking ? 1 : 0 }} transition={{ duration: .2 }}>
            <motion.span className="hero-crosshair-v" style={{ x }}/><motion.span className="hero-crosshair-h" style={{ y }}/><motion.span className="hero-crosshair-dot" style={{ x, y }}/>
        </motion.div>}
        <div className="hero-layout hero-name-layout"><div className="hero-copy">
            <h1 className="hero-name" aria-label="QUOC BINH"><span className="hero-wordmark" aria-hidden="true">{['QUOC', 'BINH'].map((word, wordIndex) => <motion.span className="hero-word" key={word} style={{ x: wordIndex ? right : left, opacity }}>{Array.from(word).map((letter, i) => <span className="hero-letter-mask" key={i}><motion.span className="hero-letter" initial={false} animate={{ y: reduced || inView ? '0%' : '110%' }} transition={reduced || !inView ? { duration: 0 } : { duration: .8, delay: .1 + (wordIndex * 4 + i) * .055, ease: [.16, 1, .3, 1] }}><motion.span className="hero-letter-interactive" whileHover={reduced ? undefined : { y: -10, rotate: i % 2 ? 3 : -3, color: '#00A3FF', transition: { type: 'spring', stiffness: 500, damping: 24 } }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>{letter}</motion.span></motion.span></span>)}</motion.span>)}</span></h1>
            <div className="hero-role-wrap"><motion.span className="hero-role-rule hero-role-rule-left" aria-hidden="true" initial={reduced ? false : { scaleX: 0 }} animate={{ scaleX: inView || reduced ? 1 : 0 }} transition={{ duration: .65, delay: inView && !reduced ? .65 : 0 }}/><p className="hero-role">FULLSTACK DEVELOPER</p><motion.span className="hero-role-rule hero-role-rule-right" aria-hidden="true" initial={reduced ? false : { scaleX: 0 }} animate={{ scaleX: inView || reduced ? 1 : 0 }} transition={{ duration: .65, delay: inView && !reduced ? .65 : 0 }}/></div>
        </div></div>
        <div className="hero-scroll-indicator" aria-hidden="true"><span/></div>
    </header>;
}
