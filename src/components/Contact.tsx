import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Copy, Check, ExternalLink, ArrowUp, Mail } from 'lucide-react';
import Skills from './Skills';
import { profile } from '../data/portfolio';
import { Divider, Reveal, Roll } from './UI';
export default function Contact() {
    const reducedMotion = useReducedMotion();
    const detailReveal = (delay = 0) => ({
        initial: reducedMotion ? false as const : { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: false, amount: .2 },
        transition: { duration: .6, delay: reducedMotion ? 0 : delay, ease: [.16, 1, .3, 1] as [number, number, number, number] },
    });
    const [toast, setToast] = useState<'copied' | 'error' | null>(null);
    const timer = useRef<number | undefined>(undefined);
    useEffect(() => () => window.clearTimeout(timer.current), []);
    const copy = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext)
                await navigator.clipboard.writeText(profile.email);
            else {
                const el = document.createElement('textarea');
                el.value = profile.email;
                el.style.position = 'fixed';
                el.style.opacity = '0';
                document.body.appendChild(el);
                el.select();
                const ok = document.execCommand('copy');
                el.remove();
                if (!ok)
                    throw new Error('Clipboard unavailable');
            }
            setToast('copied');
        }
        catch {
            setToast('error');
        }
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setToast(null), 2000);
    };
    return <><Skills/><footer id="contact" className="contact-section"><div className="section-shell contact-bottom"><Reveal repeat><div className="contact-intro"><h2>Contact</h2></div></Reveal><Reveal repeat><div className="contact-actions"><motion.div {...detailReveal()} className="contact-email"><span className="contact-label">EMAIL</span><button className="email-button" onClick={copy} aria-label={`Copy email ${profile.email}`}><span>{profile.email}</span>{toast === 'copied' ? <Check size={24}/> : <Copy size={24}/>}</button><a className="contact-mail-link" href={`mailto:${profile.email}`}><Roll>Send email</Roll><Mail size={18}/></a></motion.div><div className="contact-details"><motion.div {...detailReveal(.05)} className="contact-detail"><span className="contact-label">PHONE</span><a href={`tel:+84${profile.phone.slice(1)}`}>{profile.phone}</a></motion.div><motion.div {...detailReveal(.12)} className="contact-detail"><span className="contact-label">SOCIAL</span><div className="contact-social"><a href={profile.github} target="_blank" rel="noopener noreferrer"><Roll>GitHub</Roll><ExternalLink size={18}/></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Roll>LinkedIn</Roll><ExternalLink size={18}/></a></div></motion.div><motion.div {...detailReveal(.19)} className="contact-detail"><span className="contact-label">LOCATION</span><span>Can Tho, Vietnam</span></motion.div></div></div></Reveal><div className="footer-bottom"><Divider light repeat/><motion.span {...detailReveal(.05)} className="mono">© {new Date().getFullYear()}</motion.span><motion.a {...detailReveal(.12)} href="#top"><Roll>BACK TO TOP</Roll><ArrowUp size={15}/></motion.a></div></div><AnimatePresence>{toast && <motion.div role="status" className={`toast ${toast === 'error' ? 'toast-error' : ''}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>{toast === 'copied' ? <Check size={18}/> : <Mail size={18}/>}<span>{toast === 'copied' ? '[ COPIED TO CLIPBOARD ]' : 'Unable to copy. Please use Send email.'}</span></motion.div>}</AnimatePresence></footer></>;
}
