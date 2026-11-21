import { useEffect, useState } from "react";
import { Roll } from "./UI";
import { useTheme } from "../hooks/useTheme";
import type { Theme } from "../hooks/useTheme";
const themes: { key: Theme; label: string }[] = [{ key: "cobalt", label: "Electric Cobalt" }, { key: "prussian", label: "Prussian Blue" }, { key: "azure", label: "Tech Azure" }];
const links = [
  { label: "EXP", id: "experience" },
  { label: "WORK", id: "work" },
  { label: "CONTACT", id: "contact" },
];
export default function Navbar() {
  const [active, setActive] = useState("");
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    links.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <>
    <a className="open-to-work" href="#contact">
      <span className="open-to-work-dot" aria-hidden="true" />
      <span>Open to work</span>
    </a>
    <nav className="micro-nav" aria-label="Main navigation">
      {links.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          aria-current={active === link.id ? "location" : undefined}
        >
          <Roll>{link.label}</Roll>
        </a>
      ))}
      <div className="theme-switcher" role="group" aria-label="Color theme">
        {themes.map(option => <button key={option.key} type="button" className={`theme-swatch theme-swatch-${option.key}`} aria-label={`Theme: ${option.label}`} title={`Theme: ${option.label}`} aria-pressed={theme === option.key} onClick={() => setTheme(option.key)}/>)}
      </div>
    </nav>
    </>
  );
}
