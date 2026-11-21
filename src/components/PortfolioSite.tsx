"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CVData, Language } from "@/data/cvData";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

function GithubIcon({ size = 16 }: { size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" /></svg>;
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V8.99h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.59 0 4.25 2.36 4.25 5.43v6.32ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.56V8.99H3.56v11.46Z" /></svg>;
}

const labels = {
  es: { about: "Sobre mí", skills: "Habilidades", experience: "Experiencia", projects: "Proyectos", contact: "Contacto", download: "Descargar CV", menu: "Abrir navegación", close: "Cerrar navegación", focus: "ENFOQUE", current: "ACTUAL", aboutHeading: "Construyo software que conecta sistemas y personas.", skillsHeading: "Una caja de herramientas práctica.", experienceHeading: "Experiencia con impacto.", projectsHeading: "Trabajo que merece contexto.", contactHeading: "Hagamos algo útil.", education: "FORMACIÓN", languages: "IDIOMAS", learning: "APRENDIENDO", personalProject: "PROYECTO PERSONAL", professionalCase: "CASO PROFESIONAL" },
  en: { about: "About", skills: "Skills", experience: "Experience", projects: "Projects", contact: "Contact", download: "Download CV", menu: "Open navigation", close: "Close navigation", focus: "FOCUS", current: "CURRENT", aboutHeading: "I build software that connects systems and people.", skillsHeading: "A practical toolkit.", experienceHeading: "Experience with impact.", projectsHeading: "Work that deserves context.", contactHeading: "Let's build something useful.", education: "EDUCATION", languages: "LANGUAGES", learning: "NOW LEARNING", personalProject: "PERSONAL PROJECT", professionalCase: "PROFESSIONAL CASE" },
} satisfies Record<Language, Record<string, string>>;

export function PortfolioSite({ data }: { data: Record<Language, CVData> }) {
  const [language, setLanguage] = useState<Language>("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const navigationTarget = useRef<string | null>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const current = data[language];
  const profile = current.profile;
  const text = labels[language];
  const navItems = [["top", language === "es" ? "Inicio" : "Home"], ["about", text.about], ["skills", text.skills], ["experience", text.experience], ["projects", text.projects], ["contact", text.contact]] as const;

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = "dark";
  }, [language]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".portfolio-main section[id]"));
    const observer = new IntersectionObserver(entries => {
      if (navigationTarget.current) return;
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-20% 0px -60%", threshold: [0, .25, .5, .75] });
    sections.forEach(section => observer.observe(section));
    const handleScroll = () => {
      if (navigationTarget.current) {
        const target = document.getElementById(navigationTarget.current);
        if (target && Math.abs(target.getBoundingClientRect().top) <= 4) navigationTarget.current = null;
        else return;
      }
      if (window.scrollY < 120) setActiveSection("top");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  function navigateToSection(id: string) {
    navigationTarget.current = id;
    setActiveSection(id);
    closeMenu();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="portfolio-shell" id="top">
      <a className="skip-link" href="#content">{language === "es" ? "Ir al contenido" : "Skip to content"}</a>
      <AnimatePresence>{menuOpen && <motion.button className="portfolio-backdrop" aria-label={text.close} onClick={closeMenu} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}</AnimatePresence>
      <button className="portfolio-menu-button" type="button" aria-label={menuOpen ? text.close : text.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      <aside className={`portfolio-sidebar${menuOpen ? " portfolio-sidebar-open" : ""}`} aria-label={language === "es" ? "Navegación principal" : "Main navigation"}>
        <div className="portfolio-side-top"><a className="portfolio-mark" href="#top" onClick={closeMenu}><Image src={asset("/brand-mark.png")} alt="MV" width={100} height={100} priority /></a></div>
        <nav className="portfolio-side-nav">{navItems.map(([id, label]) => <a className={activeSection === id ? "portfolio-side-nav-active" : undefined} aria-current={activeSection === id ? "page" : undefined} href={`#${id}`} key={id} onClick={event => { event.preventDefault(); navigateToSection(id); }}><span aria-hidden="true" />{label}</a>)}</nav>
        <div className="portfolio-side-bottom"><div className="portfolio-side-controls"><div className="portfolio-language" role="group" aria-label={language === "es" ? "Idioma" : "Language"}>{(["es", "en"] as const).map(item => <button key={item} type="button" aria-pressed={language === item} onClick={() => setLanguage(item)}>{item.toUpperCase()}</button>)}</div><a className="portfolio-download-link" href={asset(profile.pdf)} download={profile.downloadName} aria-label={text.download}><Download size={15} />{text.download}</a></div><div className="portfolio-socials"><a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon size={16} /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon size={16} /></a><a href={`mailto:${profile.email}`} aria-label={language === "es" ? "Correo" : "Email"}><Mail size={16} /></a></div></div>
      </aside>

      <main className="portfolio-main" id="content">
        <section className="portfolio-hero" aria-labelledby="hero-title"><div className="portfolio-hero-copy"><p className="portfolio-kicker portfolio-kicker-name"><span />Martin <em>Vazquez</em> Islas</p><p className="portfolio-hero-index">01 <span>/ 06</span></p><h1 id="hero-title">Full-Stack<br /><em>Software</em><br />Engineer<span>.</span></h1><div className="portfolio-hero-links"><a className="portfolio-primary-link" href="#contact">{language === "es" ? "Hablemos" : "Let's talk"}<ArrowUpRight size={16} /></a></div></div><div className="portfolio-hero-visual"><div className="portfolio-hero-photo"><Image src={asset("/hero-portrait.png")} alt="" fill sizes="(max-width: 760px) 100vw, 82vw" priority /></div><div className="portfolio-hero-line" /></div></section>
        <section className="portfolio-section portfolio-about" id="about" aria-labelledby="about-title"><div className="portfolio-section-meta">{text.about.toUpperCase()}</div><div><h2 id="about-title">{language === "es" ? <>Construyo software que <em>conecta</em> sistemas y personas.</> : <>I build software that <em>connects</em> systems and people.</>}</h2><p>{profile.summary}</p><div className="portfolio-facts"><div><span>{text.education}</span><strong>{current.education}</strong></div><div><span>{text.languages}</span><strong>{current.languages.join(" · ")}</strong></div><div><span>{text.learning}</span><strong>{current.learning}</strong></div></div></div></section>
        <section className="portfolio-section" id="skills" aria-labelledby="skills-title"><div className="portfolio-section-meta">{text.skills.toUpperCase()}</div><div><h2 id="skills-title">{language === "es" ? <>Herramientas para construir <em>software.</em></> : <>Tools for building <em>software.</em></>}</h2><div className="portfolio-skills-grid">{current.skills.map((skill, index) => <motion.article className={`portfolio-skill-card portfolio-skill-card-${index % 4}`} key={skill.name} initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: reduceMotion ? 0 : .3, delay: reduceMotion ? 0 : index * .035 }}><span>0{index + 1}</span><h3>{skill.name}</h3><p>{skill.items.join(" · ")}</p></motion.article>)}</div></div></section>
        <section className="portfolio-section" id="experience" aria-labelledby="experience-title"><div className="portfolio-section-meta">{text.experience.toUpperCase()}</div><div><h2 id="experience-title">{language === "es" ? <>Experiencia con <em>impacto.</em></> : <>Experience with <em>impact.</em></>}</h2><div className="portfolio-timeline">{current.experience.map((item, index) => <motion.article className="portfolio-experience" key={item.id} initial={reduceMotion ? false : { opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: reduceMotion ? 0 : .3 }}><div className="portfolio-experience-number">0{index + 1}</div><div><p className="portfolio-period">{item.period}{index === 0 && <span>{text.current}</span>}</p><h3>{item.role}</h3>{item.company && <p className="portfolio-company">{item.company}</p>}<p className="portfolio-experience-summary">{item.summary}</p><ul>{item.achievements.slice(0, 3).map(achievement => <li key={achievement}>{achievement}</li>)}</ul><div className="portfolio-tags">{item.technologies.slice(0, 6).map(technology => <span key={technology}>{technology}</span>)}</div></div></motion.article>)}</div></div></section>
        <section className="portfolio-section" id="projects" aria-labelledby="projects-title"><div className="portfolio-section-meta">{text.projects.toUpperCase()}</div><div><h2 id="projects-title">{language === "es" ? <>Trabajo que merece <em>contexto.</em></> : <>Work that deserves <em>context.</em></>}</h2><div className="portfolio-project-grid">{current.projects.map((project, index) => <motion.article className={`portfolio-project-card${index === 0 ? " portfolio-project-featured" : ""}`} key={project.id} initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: reduceMotion ? 0 : .3, delay: reduceMotion ? 0 : index * .04 }}>{project.image && <Image src={asset(project.image)} alt="" width={720} height={180} />}<span className="portfolio-project-kind">{project.kind === "personal" ? text.personalProject : text.professionalCase}</span><h3>{project.name}</h3><p>{project.description}</p><div className="portfolio-tags">{project.technologies.map(technology => <span key={technology}>{technology}</span>)}</div>{(project.codeUrl || project.demoUrl) && <div className="portfolio-project-links">{project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14} /></a>}{project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">Demo <ArrowUpRight size={14} /></a>}</div>}</motion.article>)}</div></div></section>
        <section className="portfolio-contact" id="contact" aria-labelledby="contact-title"><div className="portfolio-section-meta">{text.contact.toUpperCase()}</div><div><h2 id="contact-title">{language === "es" ? <>Hagamos algo <em>útil.</em></> : <>Let's build something <em>useful.</em></>}</h2><p>{language === "es" ? "Disponible para conversar sobre productos, sistemas y problemas difíciles de software." : "Available to talk about products, systems, and difficult software problems."}</p><div className="portfolio-contact-links"><a href={`mailto:${profile.email}`}><Mail size={17} />{profile.email}</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinIcon size={17} />LinkedIn</a><a href={profile.github} target="_blank" rel="noopener noreferrer"><GithubIcon size={17} />GitHub</a><a href={`tel:${profile.phone.replace(/\s/g, "")}`}><Phone size={17} />{profile.phone}</a></div></div></section>
      </main>
    </div>
  );
}