import { useEffect, useState } from "react";
import { Roll } from "./UI";
const links = [
  { label: "01. EXP", id: "experience" },
  { label: "02. WORK", id: "work" },
  { label: "03. CONTACT", id: "contact" },
];
export default function Navbar() {
  const [active, setActive] = useState("");
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
      <span className="nav-available">
        <span className="status-dot" />
        AVAILABLE
      </span>
    </nav>
  );
}
