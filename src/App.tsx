import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import { navigationTop } from './utils/navigation';
export default function App() {
    const reducedMotion = useReducedMotion();
    const lenisRef = useRef<Lenis | null>(null);
    useEffect(() => {
        if (reducedMotion)
            return;
        const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: false });
        lenisRef.current = lenis;
        let frame = 0;
        const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
        frame = requestAnimationFrame(raf);
        return () => { cancelAnimationFrame(frame); lenisRef.current = null; lenis.destroy(); };
    }, [reducedMotion]);
    useEffect(() => {
        const navigate = (event: Event) => {
            const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
            if (!anchor || !(event instanceof MouseEvent) || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const id = anchor.hash.slice(1);
            const target = document.getElementById(id);
            if (!target) return;
            event.preventDefault();
            const work = document.getElementById('work');
            const current = window.scrollY;
            const destination = Math.max(0, navigationTop(target));
            const workTop = work ? work.getBoundingClientRect().top + current : 0;
            const workBottom = workTop + (work?.offsetHeight ?? 0);
            const crossesWork = id !== 'work' && !!work && Math.min(current, destination) < workBottom - 82 && Math.max(current, destination) > workTop;
            if (window.location.hash !== anchor.hash) history.pushState(null, '', anchor.hash);
            if (lenisRef.current) lenisRef.current.scrollTo(destination, { immediate: crossesWork });
            else window.scrollTo({ top: destination, behavior: reducedMotion || crossesWork ? 'instant' : 'smooth' });
        };
        document.addEventListener('click', navigate, true);
        return () => document.removeEventListener('click', navigate, true);
    }, [reducedMotion]);
    return <MotionConfig reducedMotion="user"><Cursor/><a href="#main" className="skip-link">Skip to content</a><Navbar /><main id="main"><Hero /><Experience /><Projects /></main><Contact /></MotionConfig>;
}
