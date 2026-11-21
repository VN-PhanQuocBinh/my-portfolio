import { useEffect, useRef, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import type { CSSProperties } from 'react';
import { navigationTop } from '../utils/navigation';
import type { Theme } from '../hooks/useTheme';

const themes: { key: Theme; label: string }[] = [
  { key: 'cobalt', label: 'Electric Cobalt' },
  { key: 'prussian', label: 'Prussian Blue' },
  { key: 'graphite', label: 'Graphite' },
  { key: 'stone', label: 'Warm Stone' },
];
const links = [
  { label: 'Home', id: 'top' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'work' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('top');
  const [hovered, setHovered] = useState<string | null>(null);
  const visualActive = hovered ?? active;
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLElement>(null);
  const burger = useRef<HTMLButtonElement>(null);
  const { theme, setTheme, mode, toggleMode } = useTheme();
  const currentTheme = themes.findIndex(option => option.key === theme);
  const currentThemeLabel = themes[currentTheme].label;
  const nextTheme = themes[(currentTheme + 1) % themes.length];
  const modeLabel = mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = links[0].id;
      for (const link of links) {
        const element = document.getElementById(link.id);
        if (element && window.scrollY + 8 >= navigationTop(element)) current = link.id;
      }
      const footer = document.getElementById('contact');
      if (footer) {
        const bounds = footer.getBoundingClientRect();
        const visible = Math.max(0, Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 0));
        if (visible >= window.innerHeight * .5 || window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = 'contact';
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); burger.current?.focus(); }
      if (event.key === 'Tab') {
        const items = panel.current?.querySelectorAll<HTMLAnchorElement>('a');
        if (!items?.length) return;
        if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items[items.length - 1].focus(); }
        else if (!event.shiftKey && document.activeElement === items[items.length - 1]) { event.preventDefault(); items[0].focus(); }
      }
    };
    const media = window.matchMedia('(min-width: 761px)');
    const closeOnDesktop = () => { if (media.matches) setOpen(false); };
    document.addEventListener('keydown', onKey);
    media.addEventListener('change', closeOnDesktop);
    return () => { document.removeEventListener('keydown', onKey); media.removeEventListener('change', closeOnDesktop); };
  }, [open]);
  return <>
    <a className="open-to-work" href="#contact"><span className="open-to-work-dot" aria-hidden="true"/><span>Open to work</span></a>
    <div className="navigation-controls">
      <button className="theme-cycle" type="button" onClick={() => setTheme(nextTheme.key)}
        aria-label={`Current theme: ${currentThemeLabel}. Switch to ${nextTheme.label}`}
        title={`Theme: ${currentThemeLabel} — switch to ${nextTheme.label}`}>
        <span className="theme-current-swatch" aria-hidden="true" />
      </button>
      <button className="mode-toggle" type="button" onClick={toggleMode} aria-label={modeLabel} title={modeLabel}>
        {mode === 'dark' ? <Sun size={14} aria-hidden="true" /> : <Moon size={14} aria-hidden="true" />}
      </button>
      <button className="navigation-burger" type="button" ref={burger} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="side-navigation" onClick={() => setOpen(!open)}>{open ? <X size={21}/> : <Menu size={21}/>}</button>
    </div>
    {open && <div className="navigation-backdrop" onClick={() => { setOpen(false); burger.current?.focus(); }} aria-hidden="true"/>}
    <nav id="side-navigation" ref={panel} className={`side-nav${open ? ' is-open' : ''}`} aria-label="Main navigation">
      {links.map((link, index) => <a style={{ '--nav-line-delay': `${60 + Math.abs(index - links.findIndex(item => item.id === visualActive)) * 35}ms`, '--nav-line-width': `${(Math.abs(index - links.findIndex(item => item.id === visualActive)) === 0 ? 52 : Math.abs(index - links.findIndex(item => item.id === visualActive)) === 1 ? 30 : 20)}px` } as CSSProperties} data-highlight={visualActive === link.id} onMouseEnter={() => setHovered(link.id)} onMouseLeave={() => setHovered(null)} onFocus={event => { if (event.currentTarget.matches(':focus-visible')) setHovered(link.id); }} onBlur={() => setHovered(null)} key={link.id} href={`#${link.id}`} aria-label={link.label} aria-current={active === link.id ? 'location' : undefined} onClick={() => { setOpen(false); setHovered(null); }}><span className="side-nav-line" aria-hidden="true"/><span className="side-nav-label">{link.label}</span></a>)}
    </nav>
  </>;
}
