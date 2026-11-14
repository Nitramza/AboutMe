"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Layers3,
  Mail,
  Moon,
  Sun,
  UserRound,
} from "lucide-react";
import type { CVData, Language } from "@/data/cvData";
import { CasesSlide } from "./slides/CasesSlide";
import { ContactSlide } from "./slides/ContactSlide";
import { ExperienceSlide } from "./slides/ExperienceSlide";
import { HeroSlide } from "./slides/HeroSlide";
import { StackSlide } from "./slides/StackSlide";

const slideLabels = {
  es: ["Inicio", "Experiencia", "Casos", "Stack", "Contacto"],
  en: ["Home", "Experience", "Cases", "Stack", "Contact"],
};

const slideIcons = [UserRound, BriefcaseBusiness, Code2, Layers3, Mail];
const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export function SlideDeck({ data }: { data: Record<Language, CVData> }) {
  const [language, setLanguage] = useState<Language>("es");
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const current = data[language];
  const labels = slideLabels[language];
  const slides = [
    <HeroSlide key="hero" data={data} language={language} asset={asset} onLanguageChange={setLanguage} onThemeToggle={() => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark")} onNavigateNext={() => setActiveSlide(1)} />,
    <ExperienceSlide key="experience" items={current.experience} language={language} />,
    <CasesSlide key="cases" items={current.projects} language={language} />,
    <StackSlide key="stack" data={current} language={language} />,
    <ContactSlide key="contact" data={data} language={language} asset={asset} />,
  ];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.isContentEditable) return;
      if (target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveSlide(slide => Math.min(slide + 1, slides.length - 1));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveSlide(slide => Math.max(slide - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides.length]);

  function handleTouchStart(event: TouchEvent<HTMLElement>) {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start) return;
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    setActiveSlide(slide => Math.max(0, Math.min(slide + (deltaX < 0 ? 1 : -1), slides.length - 1)));
  }

  return (
    <div className="deck-root" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <a className="skip-link" href="#slide-1">{language === "es" ? "Ir al contenido" : "Skip to content"}</a>
      <header className="deck-header">
        <a className="deck-brand" href="#slide-1" aria-label={current.profile.name} onClick={event => { event.preventDefault(); setActiveSlide(0); }}>
          <span className="deck-monogram">MV<span>.</span></span>
          <span className="deck-brand-copy"><strong>{current.profile.name}</strong><small>{language === "es" ? "PORTAFOLIO / INGENIERÍA DE SOFTWARE" : "PORTFOLIO / SOFTWARE ENGINEERING"}</small></span>
        </a>
        <div className="deck-controls">
          <div className="language-switch" role="group" aria-label={language === "es" ? "Idioma" : "Language"}>
            {(["es", "en"] as const).map(item => <button key={item} type="button" aria-pressed={language === item} lang={item} onClick={() => setLanguage(item)}>{item.toUpperCase()}</button>)}
          </div>
          <button className="deck-icon-button" type="button" title={language === "es" ? "Cambiar tema" : "Toggle theme"} aria-label={language === "es" ? "Cambiar tema" : "Toggle theme"} onClick={() => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark")}>
            <Sun className="deck-sun" size={18} aria-hidden="true" /><Moon className="deck-moon" size={18} aria-hidden="true" />
          </button>
        </div>
      </header>

      <main id="main" className="deck-viewport" aria-label={language === "es" ? "Presentación del CV" : "Resume presentation"}>
        {slides.map((slide, index) => <section
          className={`deck-slide${index === 0 ? " deck-slide-hero" : ""}`}
          id={`slide-${index + 1}`}
          role="group"
          key={slide.key}
          aria-hidden={index !== activeSlide}
          aria-roledescription={language === "es" ? "diapositiva" : "slide"}
          aria-label={`${String(index + 1).padStart(2, "0")} / 05 · ${labels[index]}`}
          inert={index !== activeSlide}
          style={{ transform: `translateX(${(index - activeSlide) * 100}%)` }}
        >{slide}</section>)}
      </main>

      <button className="deck-arrow deck-arrow-prev" type="button" aria-label={language === "es" ? "Diapositiva anterior" : "Previous slide"} disabled={activeSlide === 0} onClick={() => setActiveSlide(slide => Math.max(slide - 1, 0))}>
        <ArrowLeft size={19} aria-hidden="true" />
      </button>
      <button className="deck-arrow deck-arrow-next" type="button" aria-label={language === "es" ? "Siguiente diapositiva" : "Next slide"} disabled={activeSlide === slides.length - 1} onClick={() => setActiveSlide(slide => Math.min(slide + 1, slides.length - 1))}>
        <ArrowRight size={19} aria-hidden="true" />
      </button>

      <nav className="slide-dock" aria-label={language === "es" ? "Navegación por diapositivas" : "Slide navigation"}>
        <div className="dock-items">{labels.map((label, index) => {
          const Icon = slideIcons[index];
          return <button key={label} type="button" className="dock-button" aria-label={label} aria-current={index === activeSlide ? "step" : undefined} title={label} onClick={() => setActiveSlide(index)}>
            <Icon size={18} strokeWidth={1.8} aria-hidden="true" /><span className="dock-tooltip" role="tooltip">{label}</span>
          </button>;
        })}</div>
        <span className="dock-progress" aria-live="polite">{String(activeSlide + 1).padStart(2, "0")} <span>/</span> 05</span>
      </nav>
    </div>
  );
}