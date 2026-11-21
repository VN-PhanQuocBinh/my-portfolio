import { motion } from 'framer-motion';

export default function Hero() {
    return <header id="top" className="hero section-shell">
        
        <div className="hero-layout hero-name-layout">
            <div className="hero-copy">
                
                <h1 className="hero-name" aria-label="Quoc Binh"><span className="hero-wordmark" aria-hidden="true">{Array.from('QUOC BINH').map((letter, i) => <span className="hero-letter-mask" key={i}><motion.span className="hero-letter" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .9, delay: .12 + i * .055, ease: [.16, 1, .3, 1] }}>{letter === ' ' ? '\u00a0' : letter}</motion.span></span>)}</span></h1>
                <p className="hero-role" aria-label="Fullstack Developer"><span className="hero-role-line" aria-hidden="true">{Array.from('FULLSTACK').map((letter, i) => <span className="hero-letter-mask" key={i}><motion.span className="hero-letter" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .9, delay: .55 + i * .045, ease: [.16, 1, .3, 1] }}>{letter}</motion.span></span>)}</span><span className="hero-role-line" aria-hidden="true">{Array.from('DEVELOPER').map((letter, i) => <span className="hero-letter-mask" key={i}><motion.span className="hero-letter" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .9, delay: .7 + i * .045, ease: [.16, 1, .3, 1] }}>{letter}</motion.span></span>)}</span></p>

            </div>
        </div>
    </header>;
}
