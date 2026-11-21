import { useEffect, useId, useSyncExternalStore } from 'react';
import type { RefObject } from 'react';
import { AnimatePresence, motion, useSpring, useTransform, useVelocity } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import './hero-backgrounds.css';
import { heroBackgroundConfig } from '../heroBackground.config';

type PointerProps = { heroRef: RefObject<HTMLElement | null>; tracking: boolean };
const mobileQuery = '(max-width: 767px)';
function subscribeViewport(callback: () => void) {
    const media = window.matchMedia(mobileQuery);
    media.addEventListener('change', callback);
    return () => media.removeEventListener('change', callback);
}
const isMobile = () => window.matchMedia(mobileQuery).matches;
const serverIsMobile = () => false;

function useHeroPointer({ heroRef, tracking }: PointerProps, update: (x: number, y: number, bounds: DOMRect) => void, reset: () => void) {
    useEffect(() => {
        const hero = heroRef.current;
        if (!tracking || !hero) return;
        const mouse = matchMedia('(hover: hover) and (pointer: fine)');
        let frame = 0;
        let x = 0;
        let y = 0;
        const move = (event: PointerEvent) => {
            if (!mouse.matches || event.pointerType !== 'mouse') return;
            x = event.clientX;
            y = event.clientY;
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                update(x, y, hero.getBoundingClientRect());
            });
        };
        const clear = () => {
            cancelAnimationFrame(frame);
            frame = 0;
            reset();
        };
        hero.addEventListener('pointermove', move, { passive: true });
        hero.addEventListener('pointerleave', clear);
        mouse.addEventListener('change', clear);
        return () => {
            hero.removeEventListener('pointermove', move);
            hero.removeEventListener('pointerleave', clear);
            mouse.removeEventListener('change', clear);
            clear();
        };
    }, [heroRef, tracking, update, reset]);
}

const contourPaths = [
    'M-180 880 C 280 1040 305 210 1180 80',
    'M-180 955 C 330 1060 340 290 1180 155',
    'M-180 1030 C 370 1100 390 375 1180 230',
    'M-180 1105 C 420 1140 440 460 1180 305',
    'M-180 1180 C 465 1180 490 550 1180 380',
];

export function Silk(props: PointerProps) {
    const x = useSpring(0, { stiffness: 45, damping: 18 });
    const y = useSpring(0, { stiffness: 45, damping: 18 });
    useHeroPointer(props, (px, py, bounds) => {
        x.set((px - bounds.left) / bounds.width * 36 - 18);
        y.set((py - bounds.top) / bounds.height * 28 - 14);
    }, () => { x.jump(0); y.jump(0); });
    return <motion.svg className="hero-bg-silk" viewBox="0 0 1000 1000" preserveAspectRatio="none" style={{ x, y }}>
        {contourPaths.map((d, index) => (
            <path key={d} d={d} className={index === 2 ? 'hero-bg-silk-accent' : undefined}
                style={{ animationDelay: `${index * -1.2}s` }} vectorEffect="non-scaling-stroke" />
        ))}
    </motion.svg>;
}

type ScrollProps = { progress: MotionValue<number>; reduced: boolean };

export function Echo({ progress, reduced }: ScrollProps) {
    const y = useTransform(progress, [0, 1], [0, -24]);

    return <div className="hero-bg-echo">
        <motion.div className="hero-bg-echo-reference" style={{ y: reduced ? 0 : y }} />
        <div className="hero-bg-echo-ring" />
        <div className="hero-bg-echo-ring hero-bg-echo-accent" />
        <div className="hero-bg-echo-ring" />
    </div>;
}

export function Meridian({ progress, reduced }: ScrollProps) {
    const y = useTransform(progress, [0, 1], [0, -22]);
    return <div className="hero-bg-meridian">
        {[19, 24, 16, 22, 14].map((duration, index) => (
            <div className="hero-bg-rail" key={duration}>
                <motion.div className="hero-bg-rail-parallax" style={{ y: reduced ? 0 : y }}>
                    <span className="hero-bg-rail-travel" style={{
                        animationDuration: `${duration}s`,
                        animationDelay: `${-2 - index * 3}s`,
                        animationDirection: index % 2 ? 'reverse' : 'normal',
                    }}><span className="hero-bg-rail-marker" /></span>
                </motion.div>
            </div>
        ))}
    </div>;
}

export function Ribbons({ progress, reduced }: ScrollProps) {
    const velocity = useVelocity(progress);
    const displacement = useTransform(velocity, [-2, 2], [-18, 18]);
    const top = useSpring(displacement, { stiffness: 35, damping: 16 });
    const bottom = useTransform(top, value => -value);
    return <div className="hero-bg-ribbons">
        {[top, bottom].map((x, index) => (
            <motion.div key={index} className="hero-bg-ribbon" style={{ x: reduced ? 0 : x }}>
                <div className="hero-bg-ribbon-track">
                    {[0, 1].map(copy => <span key={copy}>FULLSTACK — ARCHITECTURE — INTERFACE —&nbsp;</span>)}
                </div>
            </motion.div>
        ))}
    </div>;
}

export default function HeroBackgrounds({ heroRef, progress, reduced, inView }: PointerPropsWithScroll) {
    const mobile = useSyncExternalStore(subscribeViewport, isMobile, serverIsMobile);
    const selected = mobile ? heroBackgroundConfig.mobile : heroBackgroundConfig.desktop;
    const grainId = useId();
    const pointerProps = { heroRef, tracking: !reduced && inView };
    const scrollProps = { progress, reduced };
    const scenes = {
        silk: <Silk {...pointerProps} />,
        echo: <Echo {...scrollProps} />,
        meridian: <Meridian {...scrollProps} />,
        ribbons: <Ribbons {...scrollProps} />,
    };

    return <>
        <div className="hero-motion-art" aria-hidden="true" data-paused={!inView}>
            <svg className="hero-motion-grain" width="100%" height="100%">
                <filter id={grainId}>
                    <feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter={`url(#${grainId})`} />
            </svg>
            <AnimatePresence initial={false}>
                <motion.div key={selected} className="hero-motion-scene"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : .3 }}>
                    {scenes[selected]}
                </motion.div>
            </AnimatePresence>
        </div>
    </>;
}

type PointerPropsWithScroll = Pick<PointerProps, 'heroRef'> & ScrollProps & { inView: boolean };
