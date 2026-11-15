"use client";

import { useEffect, useState, type TouchEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Blocks,
  Code2,
  Download,
  GitBranch,
  Layers3,
  Mail,
  Moon,
  Phone,
  ShieldCheck,
  Sun,
  UserRound,
} from "lucide-react";
import type { CVData, Language, ProjectItem } from "@/data/cvData";

type SlideIndex = 0 | 1 | 2 | 3;

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const projectIcons = [GitBranch, ShieldCheck, Blocks];

const copy = {
  es: {
    kicker: "INGENIERÍA DE SOFTWARE / BACKEND / FULL STACK",
    projects: "Proyectos & casos técnicos",
    experience: "Experiencia profesional",
    experienceNav: "Experiencia",
    projectsNav: "Proyectos",
    slideHome: "01 / INICIO",
    slideExperience: "02 / EXPERIENCIA",
    slideProjects: "03 / PROYECTOS",
    slideServices: "04 / SERVICIOS",
    services: "Servicios & colaboración",
    download: "Descargar PDF",
    printable: "Vista imprimible",
    personal: "PROYECTO PERSONAL",
    professional: "CASO PROFESIONAL",
    projectInDevelopment: "En Desarrollo / Arquitectura",
    serviceCta: "Hablemos / Contactar vía LinkedIn",
    theme: "Cambiar tema",
    goHome: "Perfil",
    goExperience: "Experiencia",
    goProjects: "Proyectos",
    goServices: "Servicios",
  },
  en: {
    kicker: "SOFTWARE ENGINEERING / BACKEND / FULL STACK",
    projects: "Projects & technical cases",
    experience: "Professional experience",
    experienceNav: "Experience",
    projectsNav: "Projects",
    slideHome: "01 / HOME",
    slideExperience: "02 / EXPERIENCE",
    slideProjects: "03 / PROJECTS",
    slideServices: "04 / SERVICES",
    services: "Services & collaboration",
    servicesDescription: "Software solutions for products, operations, and teams.",
    download: "Download PDF",
    printable: "Printable view",
    personal: "PERSONAL PROJECT",
    professional: "PROFESSIONAL CASE",
    projectInDevelopment: "In Development / Architecture",
    serviceCta: "Let’s talk / Contact me on LinkedIn",
    theme: "Toggle theme",
    goHome: "Profile",
    goExperience: "Experience",
    goProjects: "Projects",
    goServices: "Services",
  },
} satisfies Record<Language, Record<string, string>>;

function ProjectCard({ item, language, index, reduceMotion }: { item: ProjectItem; language: Language; index: number; reduceMotion: boolean }) {
  const text = copy[language];
  const status = item.status ?? (item.kind === "personal" ? text.personal : text.professional);
  const Icon = projectIcons[index % projectIcons.length];
  return (
    <motion.article
      className={`compact-project-card${item.id === "liquidity-saas" ? " compact-project-featured" : ""}`}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.24, delay: reduceMotion ? 0 : index * 0.035 }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
    >
      <div className="compact-card-top">
        <span className="compact-card-icon"><Icon size={17} aria-hidden="true" /></span>
        <span className={`compact-status${item.status ? " compact-status-active" : ""}`}>{status}</span>
      </div>
      {item.image && item.id !== "portfolio" && <Image className="compact-project-image" src={asset(item.image)} alt={language === "es" ? `Vista previa de ${item.name}` : `Preview of ${item.name}`} width={720} height={180} unoptimized />}
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <ul className="compact-tags" aria-label={language === "es" ? "Tecnologías" : "Technologies"}>
        {item.technologies.map(technology => <li key={technology}>{technology}</li>)}
      </ul>
      {(item.codeUrl || item.demoUrl) && <div className="compact-project-links">
        {item.codeUrl && <a href={item.codeUrl} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={13} aria-hidden="true" /></a>}
        {item.demoUrl && <a href={item.demoUrl} target="_blank" rel="noopener noreferrer">{language === "es" ? "Demo" : "Live demo"}<ArrowUpRight size={13} aria-hidden="true" /></a>}
      </div>}
    </motion.article>
  );
}

function SlideSkeleton({ slide }: { slide: SlideIndex }) {
  const cards = [4, 4, 6, 2][slide];
  return <div className={`compact-skeleton compact-skeleton-${slide + 1}`} aria-hidden="true">
    <div className="compact-skeleton-copy">
      <span className="compact-skeleton-line compact-skeleton-kicker" />
      <span className="compact-skeleton-line compact-skeleton-title" />
      <span className="compact-skeleton-line compact-skeleton-subtitle" />
      <span className="compact-skeleton-line compact-skeleton-paragraph" />
      <span className="compact-skeleton-line compact-skeleton-paragraph compact-skeleton-paragraph-short" />
    </div>
    <div className="compact-skeleton-grid">{Array.from({ length: cards }, (_, index) => <span className="compact-skeleton-card" key={index} style={{ animationDelay: `${index * 70}ms` }} />)}</div>
  </div>;
}

export function CompactPortfolio({ data }: { data: Record<Language, CVData> }) {
  const [language, setLanguage] = useState<Language>("es");
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [activeSlide, setActiveSlide] = useState<SlideIndex>(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [isReady, setIsReady] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;
  const current = data[language];
  const profile = current.profile;
  const text = copy[language];
  const orderedProjects = [...current.projects.filter(item => item.kind === "professional"), ...current.projects.filter(item => item.kind === "personal")];
  const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.07 } } };
  const staggerItem = { hidden: { opacity: 0, y: reduceMotion ? 0 : 8 }, visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.2 } } };
  const highlights = language === "es" ? [
    { name: "Full Stack", details: "Next.js · React · Go · Java" },
    { name: "Arquitectura backend", details: "Java · Spring Boot · Apache Kafka" },
    { name: "Sistemas conectados", details: "REST APIs · Apache Kafka" },
    { name: "Datos empresariales", details: "SQL Server · PostgreSQL · Oracle SQL · PL/SQL" },
    { name: "Ingeniería IA", details: "AI Workflows · BDD · MCP · Agentes y Agent Skills" },
    { name: "Seguridad y calidad", details: "JWT · JUnit · SonarQube · Checkmarx" },
  ] : [
    { name: "Full Stack", details: "Next.js · React · Go · Java" },
    { name: "Backend architecture", details: "Java · Spring Boot · Apache Kafka" },
    { name: "Connected systems", details: "REST APIs · Apache Kafka" },
    { name: "Enterprise data", details: "SQL Server · PostgreSQL · Oracle SQL · PL/SQL" },
    { name: "AI engineering", details: "AI Workflows · BDD · MCP · Agents and Agent Skills" },
    { name: "Security and quality", details: "JWT · JUnit · SonarQube · Checkmarx" },
  ];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey || (event.target instanceof HTMLElement && event.target.closest("input, textarea, select, [contenteditable='true']"))) return;
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const nextSlide = Math.max(0, Math.min(activeSlide + (event.key === "ArrowRight" ? 1 : -1), 3)) as SlideIndex;
      if (nextSlide === activeSlide) return;
      setSlideDirection(nextSlide > activeSlide ? 1 : -1);
      setActiveSlide(nextSlide);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlide]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem("cv-theme");
    } catch {}
    const selected = theme ?? (saved === "light" || saved === "dark" ? saved : null);
    const applyTheme = () => {
      document.documentElement.dataset.theme = selected ?? (query.matches ? "dark" : "light");
    };
    applyTheme();
    if (theme) {
      try {
        window.localStorage.setItem("cv-theme", theme);
      } catch {}
    }
    query.addEventListener("change", applyTheme);
    return () => query.removeEventListener("change", applyTheme);
  }, [theme]);

  function navigateToSlide(slide: SlideIndex) {
    if (slide === activeSlide) return;
    setSlideDirection(slide > activeSlide ? 1 : -1);
    setActiveSlide(slide);
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    setTouchStart(null);
    if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    navigateToSlide(Math.max(0, Math.min(activeSlide + (deltaX < 0 ? 1 : -1), 3)) as SlideIndex);
  }

  const dockTransition = reduceMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 390, damping: 22 };
  const dockHover = reduceMotion ? undefined : { scale: 1.14, y: -5 };
  const slideVariants = {
    enter: (direction: number) => ({ opacity: 0, x: direction * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (direction: number) => ({ opacity: 0, x: direction * -40 }),
  };

  return (
    <div className="compact-site compact-deck" id="top" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <a className="skip-link" href="#deck-slide">{language === "es" ? "Ir al contenido" : "Skip to content"}</a>
      <header className="compact-header">
        <button className="compact-brand" type="button" aria-label={profile.name} onClick={() => navigateToSlide(0)}>
          <span className="compact-monogram">MV<span>.</span></span>
          <span><strong>{profile.name}</strong><small>{language === "es" ? "PORTAFOLIO / SOFTWARE" : "PORTFOLIO / SOFTWARE"}</small></span>
        </button>
        <nav className="compact-top-nav" aria-label={language === "es" ? "Navegación principal" : "Main navigation"}>
          <button type="button" className={activeSlide === 0 ? "compact-top-nav-active" : ""} aria-current={activeSlide === 0 ? "page" : undefined} onClick={() => navigateToSlide(0)}><UserRound size={17} aria-hidden="true" />{text.goHome}</button>
          <button type="button" className={activeSlide === 1 ? "compact-top-nav-active" : ""} aria-current={activeSlide === 1 ? "page" : undefined} onClick={() => navigateToSlide(1)}><BriefcaseBusiness size={17} aria-hidden="true" />{text.experienceNav}</button>
          <button type="button" className={activeSlide === 2 ? "compact-top-nav-active" : ""} aria-current={activeSlide === 2 ? "page" : undefined} onClick={() => navigateToSlide(2)}><Code2 size={17} aria-hidden="true" />{text.projectsNav}</button>
          <button type="button" className={activeSlide === 3 ? "compact-top-nav-active" : ""} aria-current={activeSlide === 3 ? "page" : undefined} onClick={() => navigateToSlide(3)}><Layers3 size={17} aria-hidden="true" />{text.goServices}</button>
        </nav>
        <div className="compact-controls">
          <div className="compact-language" role="group" aria-label={language === "es" ? "Idioma" : "Language"}>
            {(["es", "en"] as const).map(item => <button key={item} type="button" aria-pressed={language === item} lang={item} onClick={() => setLanguage(item)}>{item.toUpperCase()}</button>)}
          </div>
          <button className="compact-icon-button" type="button" title={text.theme} aria-label={text.theme} onClick={() => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark")}>
            <Sun className="compact-sun" size={17} aria-hidden="true" /><Moon className="compact-moon" size={17} aria-hidden="true" />
          </button>
        </div>
      </header>

      <main id="main" className="compact-main compact-deck-main">
        <AnimatePresence mode="wait" initial={false} custom={slideDirection}>
        <motion.section
          id="deck-slide"
          key={isReady ? activeSlide : "loading"}
          className={`compact-slide compact-slide-${activeSlide + 1}`}
          role="group"
          aria-roledescription={language === "es" ? "diapositiva" : "slide"}
          aria-label={[text.slideHome, text.slideExperience, text.slideProjects, text.slideServices][activeSlide]}
          aria-busy={!isReady}
          custom={slideDirection}
          variants={slideVariants}
          initial={reduceMotion ? false : "enter"}
          animate="center"
          exit={reduceMotion ? undefined : "exit"}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 0.75, 0.22, 1] }}
        >
        <div className="compact-slide-content">
        {!isReady ? <SlideSkeleton slide={activeSlide} /> : <>
        {activeSlide === 0 && <>
        <motion.section className="compact-hero" aria-labelledby="profile-name" variants={staggerContainer} initial={reduceMotion ? false : "hidden"} animate="visible">
          <motion.div className="compact-hero-copy" variants={staggerContainer}>
            <motion.p className="compact-eyebrow" variants={staggerItem}><span />{text.kicker}</motion.p>
            <motion.h1 id="profile-name" variants={staggerItem}>{profile.name}<span>.</span></motion.h1>
            <motion.p className="compact-role" variants={staggerItem}>{profile.title}</motion.p>
            <motion.p className="compact-summary" variants={staggerItem}>{profile.summary}</motion.p>
            <motion.div className="compact-contact-row" aria-label={language === "es" ? "Datos de contacto" : "Contact details"} variants={staggerContainer}>
              <motion.a href={`mailto:${profile.email}`} variants={staggerItem}><Mail size={14} aria-hidden="true" />{profile.email}</motion.a>
              <motion.a href={`tel:${profile.phone.replace(/\s/g, "")}`} variants={staggerItem}><Phone size={14} aria-hidden="true" />{profile.phone}</motion.a>
              <motion.span variants={staggerItem}>{profile.location}</motion.span>
            </motion.div>
            <motion.div className="compact-downloads" variants={staggerItem}>
              {(["es", "en"] as const).map(item => <a className={`compact-button${item === language ? " compact-button-primary" : ""}`} href={asset(data[item].profile.pdf)} download={data[item].profile.downloadName} key={item}>
                <Download size={15} aria-hidden="true" />{text.download} · {item.toUpperCase()}
              </a>)}
            </motion.div>
          </motion.div>
          <motion.aside className="compact-highlight-list" aria-label={language === "es" ? "Áreas de especialidad" : "Areas of expertise"} variants={staggerContainer}>
            <motion.p className="compact-highlight-heading" variants={staggerItem}>{language === "es" ? "ENFOQUE" : "FOCUS"}</motion.p>
            {highlights.map((category, index) => <motion.div className="compact-highlight-row" key={category.name} variants={staggerItem}>
              <span className="compact-highlight-index">0{index + 1}</span>
              <div><h2>{category.name}</h2><p>{category.details}</p></div>
            </motion.div>)}
          </motion.aside>
        </motion.section>
        </>}

        {activeSlide === 1 && <section id="experience" className="compact-experience-slide" aria-labelledby="experience-heading">
          <div className="compact-section-heading"><div><p className="compact-eyebrow"><span />{text.slideExperience}</p><h2 id="experience-heading">{text.experience}</h2></div></div>
          <motion.ol className="compact-timeline" variants={staggerContainer} initial={reduceMotion ? false : "hidden"} animate="visible">
            {current.experience.map((item, index) => <motion.li className="compact-experience-entry" key={item.id} variants={staggerItem}>
              <div className="compact-experience-date"><span>{item.period}</span><i aria-hidden="true" /></div>
              <motion.article className="compact-experience-card" whileHover={reduceMotion ? undefined : { y: -3 }} transition={{ type: "spring", stiffness: 340, damping: 25 }}>
                <div className="compact-experience-title"><div><h3>{item.role}</h3>{item.company && <p className="compact-company">{item.company}</p>}</div><span>0{index + 1}</span></div>
                <p className="compact-experience-summary">{item.summary}</p>
                <ul className="compact-achievements">{item.achievements.slice(0, 2).map(achievement => <li key={achievement}>{achievement}</li>)}</ul>
                <ul className="compact-tags">{item.technologies.slice(0, 6).map(technology => <li key={technology}>{technology}</li>)}</ul>
              </motion.article>
            </motion.li>)}
          </motion.ol>
          <motion.section className="compact-profile-skills" aria-labelledby="profile-skills-title" variants={staggerContainer} initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <motion.div className="compact-profile-skills-heading" variants={staggerItem}><h2 id="profile-skills-title">{language === "es" ? "Stack & especialidades" : "Stack & specialties"}</h2></motion.div>
            <motion.div className="compact-profile-skill-list" variants={staggerContainer}>{current.skills.map((category, index) => <motion.div className="compact-profile-skill-row" key={category.name} variants={staggerItem}>
              <span className="compact-highlight-index">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{category.name}</h3><p>{category.items.join(" · ")}</p></div>
            </motion.div>)}</motion.div>
            <motion.div className="compact-profile-details" variants={staggerContainer} initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.2 }}><motion.p variants={staggerItem}><Layers3 size={15} aria-hidden="true" />{current.education}</motion.p><motion.p variants={staggerItem}><Mail size={15} aria-hidden="true" />{current.languages.join(" · ")}</motion.p></motion.div>
          </motion.section>
        </section>}

        {activeSlide === 2 && <section id="projects" className="compact-projects-slide" aria-labelledby="projects-heading">
          <div className="compact-section-heading"><div><p className="compact-eyebrow"><span />{text.slideProjects}</p><h2 id="projects-heading">{text.projects}</h2></div></div>
          <div className="compact-project-grid">{orderedProjects.map((item, index) => <ProjectCard key={item.id} item={item} language={language} index={index} reduceMotion={reduceMotion} />)}</div>
        </section>}

        {activeSlide === 3 && <>
        <section id="services" className="compact-services" aria-labelledby="services-heading">
          <div className="compact-section-heading compact-services-heading"><div><p className="compact-eyebrow"><span />{text.slideServices}</p><h2 id="services-heading">{text.services}</h2></div></div>
          <div className="compact-service-grid">{current.services.map((service, serviceIndex) => <motion.article className="compact-service-card" key={service.id}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={reduceMotion ? undefined : { y: -4 }}
            transition={{ duration: reduceMotion ? 0 : 0.24, delay: reduceMotion ? 0 : serviceIndex * 0.06 }}
          >
            <div className="compact-service-offer">
              <span className="compact-service-index">{String(serviceIndex + 1).padStart(2, "0")}</span><h3>{service.title}</h3><p>{service.description}</p>
              <ul className="compact-tags">{service.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
            </div>
          </motion.article>)}</div>
          <motion.a className="compact-contact-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer" variants={staggerItem} initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.2 }}>{text.serviceCta}<ArrowUpRight size={16} aria-hidden="true" /></motion.a>
          <motion.div className="compact-services-contact" aria-label={language === "es" ? "Datos de contacto" : "Contact details"} variants={staggerContainer} initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <motion.a href={`mailto:${profile.email}`} variants={staggerItem}><Mail size={14} aria-hidden="true" />{profile.email}</motion.a>
            <motion.a href={`tel:${profile.phone.replace(/\s/g, "")}`} variants={staggerItem}><Phone size={14} aria-hidden="true" />{profile.phone}</motion.a>
            <motion.span variants={staggerItem}>{profile.name} · {profile.location}</motion.span>
          </motion.div>
        </section>
        </>}
        </>}
        </div>
        </motion.section>
        </AnimatePresence>
      </main>

      <nav className="compact-dock" aria-label={language === "es" ? "Navegación rápida" : "Quick navigation"}>
        <motion.button type="button" tabIndex={0} className={activeSlide === 0 ? "compact-dock-active" : ""} aria-label={text.goHome} title={text.goHome} aria-current={activeSlide === 0 ? "page" : undefined} onClick={() => navigateToSlide(0)} whileHover={dockHover} whileFocus={dockHover} whileTap={reduceMotion ? undefined : { scale: 1.06 }} transition={dockTransition}>
          <UserRound size={17} aria-hidden="true" /><span className="compact-dock-label">{text.goHome}</span><span className="compact-dock-tooltip" role="tooltip">{text.goHome}</span>
        </motion.button>
        <motion.button type="button" tabIndex={0} className={activeSlide === 1 ? "compact-dock-active" : ""} aria-label={text.goExperience} title={text.goExperience} aria-current={activeSlide === 1 ? "page" : undefined} onClick={() => navigateToSlide(1)} whileHover={dockHover} whileFocus={dockHover} whileTap={reduceMotion ? undefined : { scale: 1.06 }} transition={dockTransition}>
          <BriefcaseBusiness size={17} aria-hidden="true" /><span className="compact-dock-label">{text.goExperience}</span><span className="compact-dock-tooltip" role="tooltip">{text.goExperience}</span>
        </motion.button>
        <motion.button type="button" tabIndex={0} className={activeSlide === 2 ? "compact-dock-active" : ""} aria-label={text.goProjects} title={text.goProjects} aria-current={activeSlide === 2 ? "page" : undefined} onClick={() => navigateToSlide(2)} whileHover={dockHover} whileFocus={dockHover} whileTap={reduceMotion ? undefined : { scale: 1.06 }} transition={dockTransition}>
          <Code2 size={17} aria-hidden="true" /><span className="compact-dock-label">{text.goProjects}</span><span className="compact-dock-tooltip" role="tooltip">{text.goProjects}</span>
        </motion.button>
        <motion.button type="button" tabIndex={0} className={activeSlide === 3 ? "compact-dock-active" : ""} aria-label={text.goServices} title={text.goServices} aria-current={activeSlide === 3 ? "page" : undefined} onClick={() => navigateToSlide(3)} whileHover={dockHover} whileFocus={dockHover} whileTap={reduceMotion ? undefined : { scale: 1.06 }} transition={dockTransition}>
          <Layers3 size={17} aria-hidden="true" /><span className="compact-dock-label">{text.goServices}</span><span className="compact-dock-tooltip" role="tooltip">{text.goServices}</span>
        </motion.button>
      </nav>
    </div>
  );
}