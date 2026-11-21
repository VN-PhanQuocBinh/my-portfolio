import { useEffect } from 'react';
import Lenis from 'lenis';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
export default function App() {
    const reducedMotion = useReducedMotion();
    useEffect(() => {
        if (reducedMotion)
            return;
        const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: { offset: -82 } });
        let frame = 0;
        const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
        frame = requestAnimationFrame(raf);
        return () => { cancelAnimationFrame(frame); lenis.destroy(); };
    }, [reducedMotion]);
    return <MotionConfig reducedMotion="user"><a href="#main" className="skip-link">Đi đến nội dung</a><Navbar /><main id="main"><Hero /><Experience /><Projects /></main><Contact /></MotionConfig>;
}
