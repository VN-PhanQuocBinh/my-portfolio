import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Copy, Check, ExternalLink, ArrowUp, Mail } from 'lucide-react';
import Skills from './Skills';
import { profile } from '../data/portfolio';
import { Divider, Reveal } from './UI';
function ContactText({ children }: { children: string }) {
    const reduced = useReducedMotion();
    return (
        <motion.span
            className="contact-reveal-text"
            initial={reduced ? false : { y: 8, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ amount: .3 }}
            transition={{ duration: reduced ? 0 : .35, ease: [.16, 1, .3, 1] }}
        >
            {children}
        </motion.span>
    );
}

function ContactTitle() {
    const ref = useRef<HTMLHeadingElement>(null);
    const inView = useInView(ref, { amount: .4 });
    const reduced = useReducedMotion();
    return <div className="contact-intro"><h2 ref={ref} aria-label="Contact"><span className="contact-wordmark" aria-hidden="true">{Array.from('Contact').map((letter, index) => <span className="contact-letter-mask" key={index}><motion.span
        initial={reduced ? false : { y: '150%', opacity: 0 }}
        animate={{ y: reduced || inView ? '0%' : '150%', opacity: reduced || inView ? 1 : 0 }}
        transition={reduced || !inView ? { duration: 0 } : { duration: .6, delay: .1 + index * .04, ease: [.85, 0, .2, 1] }}
    >{letter}</motion.span></span>)}</span></h2></div>;
}

export default function Contact() {
    const reducedMotion = useReducedMotion();
    const detailReveal = (delay = 0) => ({
        initial: reducedMotion ? false as const : { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: false, amount: .2 },
        transition: { duration: .4, delay: reducedMotion ? 0 : delay, ease: [.16, 1, .3, 1] as [number, number, number, number] },
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
    const copied = toast === 'copied';
    const copyIcon = (
        <motion.span
            key={copied ? 'copied' : 'copy'}
            className="contact-copy-icon"
            aria-hidden="true"
            initial={copied && !reducedMotion ? { scale: .7, opacity: .4 } : false}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : .25, ease: [.16, 1, .3, 1] }}
        >
            {copied ? <Check size={24} /> : <Copy size={24} />}
        </motion.span>
    );
    return <><Skills/><footer id="contact" className="contact-section"><div className="section-shell contact-bottom"><ContactTitle/><Reveal repeat><div className="contact-actions"><motion.div {...detailReveal()} className="contact-email"><span className="contact-label">EMAIL</span><button className="email-button" onClick={copy} aria-label={`Copy email ${profile.email}`}><ContactText>{profile.email}</ContactText>{copyIcon}</button><a className="contact-mail-link" href={`mailto:${profile.email}`}><ContactText>Send email</ContactText><Mail size={18}/></a></motion.div><div className="contact-details"><motion.div {...detailReveal(.12)} className="contact-detail"><span className="contact-label">SOCIAL</span><div className="contact-social"><a href={profile.github} target="_blank" rel="noopener noreferrer"><ContactText>GitHub</ContactText><ExternalLink size={18}/></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><ContactText>LinkedIn</ContactText><ExternalLink size={18}/></a></div></motion.div><motion.div {...detailReveal(.19)} className="contact-detail"><span className="contact-label">LOCATION</span><ContactText>Can Tho, Vietnam</ContactText></motion.div></div></div></Reveal><div className="footer-bottom"><Divider light repeat/><motion.span {...detailReveal(.05)} className="mono"><ContactText>{`© ${new Date().getFullYear()}`}</ContactText></motion.span><motion.a {...detailReveal(.12)} href="#top"><ContactText>BACK TO TOP</ContactText><ArrowUp size={15}/></motion.a></div></div><div className="footer-wordmark" aria-hidden="true">PhanQuocBinh</div><AnimatePresence>{toast && <motion.div role="status" className={`toast ${toast === 'error' ? 'toast-error' : ''}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>{toast === 'copied' ? <Check size={18}/> : <Mail size={18}/>}<span>{toast === 'copied' ? '[ COPIED TO CLIPBOARD ]' : 'Unable to copy. Please use Send email.'}</span></motion.div>}</AnimatePresence></footer></>;
}
