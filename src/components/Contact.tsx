import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Copy, Check, ExternalLink, ArrowUp, Mail } from 'lucide-react';
import skills from '../../data/skills.json';
import { profile } from '../data/portfolio';
import { Chapter, Divider, Reveal, Roll } from './UI';
export default function Contact() {
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
    return <footer id="contact" className="contact-section"><div className="section-shell"><div className="section-title-row"><Chapter number="03" title="SKILLS & CONTACT"/></div><div className="skills-grid">{skills.map(category => <Reveal key={category.title}><article className="skill-card"><h3>{category.title}</h3><ul>{category.items.map(item => <li key={item}>{item}</li>)}</ul></article></Reveal>)}</div><Reveal><div className="credentials"><div><span className="eyebrow">EDUCATION / 2023 — 2027</span><h3>Can Tho University</h3><p>Software Engineering · Final-year student</p><span className="credential-value mono">3.81 <small>/ 4.0 GPA</small></span></div><div><span className="eyebrow">ENGLISH / 01.2026</span><h3>TOEIC Certificate</h3><p>Basic English communication</p><span className="credential-value mono">675 <small>/ 990</small></span></div></div></Reveal></div><div className="section-shell contact-bottom"><Reveal><div className="contact-intro"><h2>Contact</h2></div></Reveal><Reveal><div className="contact-actions"><div className="contact-email"><span className="contact-label">EMAIL</span><button className="email-button" onClick={copy} aria-label={`Copy email ${profile.email}`}><span>{profile.email}</span>{toast === 'copied' ? <Check size={24}/> : <Copy size={24}/>}</button><a className="contact-mail-link" href={`mailto:${profile.email}`}><Roll>Send email</Roll><Mail size={18}/></a></div><div className="contact-details"><div className="contact-detail"><span className="contact-label">PHONE</span><a href={`tel:+84${profile.phone.slice(1)}`}>{profile.phone}</a></div><div className="contact-detail"><span className="contact-label">SOCIAL</span><div className="contact-social"><a href={profile.github} target="_blank" rel="noopener noreferrer"><Roll>GitHub</Roll><ExternalLink size={18}/></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Roll>LinkedIn</Roll><ExternalLink size={18}/></a></div></div><div className="contact-detail"><span className="contact-label">LOCATION</span><span>Can Tho, Vietnam</span></div></div></div></Reveal><div className="footer-bottom"><Divider light/><span className="mono">© {new Date().getFullYear()}</span><a href="#top"><Roll>BACK TO TOP</Roll><ArrowUp size={15}/></a></div></div><AnimatePresence>{toast && <motion.div role="status" className={`toast ${toast === 'error' ? 'toast-error' : ''}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>{toast === 'copied' ? <Check size={18}/> : <Mail size={18}/>}<span>{toast === 'copied' ? '[ COPIED TO CLIPBOARD ]' : 'Unable to copy. Please use Send email.'}</span></motion.div>}</AnimatePresence></footer>;
}
