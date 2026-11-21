import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function Cursor() {
    const ref = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    useEffect(() => {
        const cursor = ref.current;
        if (!cursor) return;
        const media = window.matchMedia('(hover: hover) and (pointer: fine)');
        const dot = cursor.querySelector<HTMLElement>('.site-cursor-dot')!;
        const ring = cursor.querySelector<HTMLElement>('.site-cursor-ring')!;
        let frame = 0;
        let x = 0, y = 0, ringX = 0, ringY = 0;
        let visible = false;
        const classify = () => {
            const target = document.elementFromPoint(x, y);
            cursor.dataset.active = String(!!target?.closest('a,button,input,textarea,select,[role="button"],.hero-letter-interactive'));
        };
        const draw = () => {
            ringX += (x - ringX) * (reduced ? 1 : .25);
            ringY += (y - ringY) * (reduced ? 1 : .25);
            ring.style.transform = `translate3d(${ringX}px,${ringY}px,0)`;
            if (Math.abs(x - ringX) + Math.abs(y - ringY) > .1) frame = requestAnimationFrame(draw);
            else frame = 0;
        };
        const move = (event: PointerEvent) => {
            if (!media.matches || event.pointerType !== 'mouse') return;
            x = event.clientX; y = event.clientY;
            if (!visible) { ringX = x; ringY = y; }
            visible = true;
            cursor.dataset.visible = 'true';
            document.documentElement.classList.add('custom-cursor-ready');
            dot.style.transform = `translate3d(${x}px,${y}px,0)`;
            classify();
            if (!frame) draw();
        };
        const hide = () => {
            visible = false;
            cursor.dataset.visible = 'false';
            cursor.dataset.pressed = 'false';
            document.documentElement.classList.remove('custom-cursor-ready');
            cancelAnimationFrame(frame); frame = 0;
        };
        const down = () => { cursor.dataset.pressed = 'true'; };
        const up = () => { cursor.dataset.pressed = 'false'; };
        const scroll = () => { if (visible) classify(); };
        window.addEventListener('pointermove', move, { passive: true });
        document.documentElement.addEventListener('pointerleave', hide);
        window.addEventListener('blur', hide);
        window.addEventListener('pointerdown', down);
        window.addEventListener('pointerup', up);
        window.addEventListener('scroll', scroll, { passive: true });
        media.addEventListener('change', hide);
        return () => {
            hide();
            window.removeEventListener('pointermove', move);
            document.documentElement.removeEventListener('pointerleave', hide);
            window.removeEventListener('blur', hide);
            window.removeEventListener('pointerdown', down);
            window.removeEventListener('pointerup', up);
            window.removeEventListener('scroll', scroll);
            media.removeEventListener('change', hide);
        };
    }, [reduced]);
    return <div className="site-cursor" ref={ref} aria-hidden="true"><span className="site-cursor-dot"/><span className="site-cursor-ring"><i/></span></div>;
}
