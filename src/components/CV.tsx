"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Download, Mail, Menu, Moon, Sun, X } from "lucide-react";
import type { CVData, Language } from "@/data/cvData";
import { Hero } from "./Hero";
import { Experience } from "./Experience";
import { Projects } from "./Projects";
import { Skills } from "./Skills";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export function CV({ data }: { data: Record<Language, CVData> }) {
  const [language, setLanguage] = useState<Language>("es");
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const spanish = language === "es";
  const current = data[language];
  const nav = [{ id: "experience", text: spanish ? "Experiencia" : "Experience" }, { id: "projects", text: spanish ? "Trabajo" : "Work" }, { id: "skills", text: spanish ? "Habilidades" : "Skills" }];

  useEffect(() => { document.documentElement.lang = language; }, [language]);
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    let saved: string | null = null;
    try { saved = window.localStorage.getItem("cv-theme"); } catch {}
    const selected = theme ?? (saved === "light" || saved === "dark" ? saved : null);
    const apply = () => { document.documentElement.dataset.theme = selected ?? (query.matches ? "dark" : "light"); };
    apply();
    if (theme) { try { window.localStorage.setItem("cv-theme", theme); } catch {} }
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, [theme]);

  return (
    <>
      <a className="skip-link" href="#main">{spanish ? "Ir al contenido" : "Skip to content"}</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#main" aria-label={current.profile.name}><span className="monogram" aria-hidden="true">MV<span>.</span></span><span className="brand-name">{current.profile.name}<span>{current.profile.title}</span></span></a>
          <nav className="desktop-nav" aria-label={spanish ? "Navegación principal" : "Main navigation"}>{nav.map(item => <a key={item.id} href={`#${item.id}`}>{item.text}</a>)}</nav>
          <div className="header-controls">
            <div className="language-switch" role="group" aria-label={spanish ? "Idioma" : "Language"}>{(["es", "en"] as const).map(item => <button key={item} type="button" aria-pressed={language === item} lang={item} onClick={() => setLanguage(item)}>{item.toUpperCase()}</button>)}</div>
            <button className="icon-button" type="button" title={spanish ? "Cambiar tema" : "Toggle theme"} aria-label={spanish ? "Cambiar tema" : "Toggle theme"} onClick={() => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark")}><Sun className="sun-icon" size={19} aria-hidden="true" /><Moon className="moon-icon" size={19} aria-hidden="true" /></button>
            <button className="icon-button menu-toggle" type="button" aria-label={spanish ? "Menú" : "Menu"} aria-expanded={menuOpen} aria-controls="mobile-nav" title={spanish ? "Menú" : "Menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
        {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label={spanish ? "Navegación móvil" : "Mobile navigation"} onKeyDown={event => { if (event.key === "Escape") setMenuOpen(false); }}>{nav.map(item => <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>{item.text}<ArrowUpRight size={16} aria-hidden="true" /></a>)}</nav>}
      </header>
      <main id="main" className="site-main max-w-3xl mx-auto px-6 py-16">
        <Hero profile={current.profile} language={language} asset={asset} />
        <Experience items={current.experience} language={language} />
        <Projects items={current.projects} language={language} />
        <Skills data={current} language={language} />
        <section id="documents" className="content-section" aria-labelledby="documents-title">
          <div className="section-heading"><span className="section-number">04 /</span><h2 id="documents-title">{spanish ? "Currículum" : "Resume"}</h2></div>
          <div className="documents-grid">{(["es", "en"] as const).map(item => <a key={item} className="document-link" href={asset(data[item].profile.pdf)} download={data[item].profile.downloadName}>
            <div className="document-preview"><Image src={asset(`/cv-preview-${item}.png`)} alt={spanish ? `Vista previa del CV en ${item === "es" ? "español" : "inglés"}` : `${item === "es" ? "Spanish" : "English"} resume preview`} width={794} height={1123} unoptimized /></div>
            <div className="document-caption"><span><strong>{item === "es" ? "Español" : "English"}</strong><small>PDF · 2 {spanish ? "páginas" : "pages"}</small></span><Download size={20} aria-hidden="true" /></div>
          </a>)}</div>
        </section>
        <section className="contact-section" aria-labelledby="contact-title">
          <span className="mono-label">{spanish ? "CONTACTO" : "CONTACT"}</span>
          <h2 id="contact-title">{spanish ? "Conectemos" : "Let’s connect"}<span className="accent-dot">.</span></h2>
          <a className="contact-email" href={`mailto:${current.profile.email}`}>{current.profile.email}<ArrowUpRight size={22} aria-hidden="true" /></a>
          <div className="contact-links"><a className="text-link" href={current.profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={15} aria-hidden="true" /></a><a className="text-link" href={`tel:${current.profile.phone.replace(/\s/g, "")}`}>{current.profile.phone}</a><a className="icon-button" href={`mailto:${current.profile.email}`} title={spanish ? "Enviar correo" : "Send email"} aria-label={spanish ? "Enviar correo" : "Send email"}><Mail size={18} /></a></div>
        </section>
      </main>
      <footer className="site-footer"><span>{current.profile.name}</span><span>{current.profile.location}</span></footer>
    </>
  );
}