import { ArrowDown, ArrowUpRight, Download, MapPin, Moon, Sun } from "lucide-react";
import type { CVData, Language } from "@/data/cvData";

export function HeroSlide({ data, language, asset, onLanguageChange, onThemeToggle, onNavigateNext }: {
  data: Record<Language, CVData>;
  language: Language;
  asset: (path: string) => string;
  onLanguageChange: (language: Language) => void;
  onThemeToggle: () => void;
  onNavigateNext: () => void;
}) {
  const profile = data[language].profile;
  const spanish = language === "es";
  return <div className="slide-content hero-content">
    <div className="hero-copy">
      <p className="slide-eyebrow"><span />{spanish ? "INGENIERÍA DE SOFTWARE · BACKEND · FULL STACK" : "SOFTWARE ENGINEERING · BACKEND · FULL STACK"}</p>
      <h1>{profile.name}<span className="deck-period">.</span></h1>
      <p className="hero-role">{profile.title}</p>
      <p className="hero-description">{profile.summary}</p>
      <p className="hero-location"><MapPin size={16} aria-hidden="true" />{profile.location}</p>
      <div className="hero-actions">
        {(["es", "en"] as const).map(item => <a className={item === language ? "deck-button deck-button-primary" : "deck-button deck-button-secondary"} key={item} href={asset(data[item].profile.pdf)} download={data[item].profile.downloadName}>
          <Download size={17} aria-hidden="true" />{item === "es" ? "CV en español" : "Resume in English"}
        </a>)}
        <button className="deck-button deck-button-quiet hero-language-control" type="button" onClick={() => onLanguageChange(language === "es" ? "en" : "es")}>
          {language === "es" ? "EN" : "ES"}<span>{spanish ? "Idioma" : "Language"}</span>
        </button>
        <button className="deck-button deck-button-quiet hero-theme-control" type="button" onClick={onThemeToggle} aria-label={spanish ? "Cambiar tema" : "Toggle theme"}>
          <Sun className="hero-theme-sun" size={17} aria-hidden="true" /><Moon className="hero-theme-moon" size={17} aria-hidden="true" />{spanish ? "Tema" : "Theme"}
        </button>
      </div>
      <a className="hero-next-link" href="#slide-2" onClick={event => { event.preventDefault(); onNavigateNext(); }}>
        {spanish ? "Explorar trayectoria" : "Explore experience"}<ArrowDown size={16} aria-hidden="true" />
      </a>
    </div>
    <aside className="hero-aside" aria-label={spanish ? "Enfoque profesional" : "Professional focus"}>
      <span className="mono-label">{spanish ? "ENFOQUE" : "FOCUS"} / 03</span>
      <div className="hero-focus-item"><span>01</span><div><strong>{spanish ? "Sistemas conectados" : "Connected systems"}</strong><small>REST APIs · Apache Kafka</small></div></div>
      <div className="hero-focus-item"><span>02</span><div><strong>{spanish ? "Arquitectura mantenible" : "Maintainable architecture"}</strong><small>Java · Spring Boot</small></div></div>
      <div className="hero-focus-item"><span>03</span><div><strong>{spanish ? "Seguridad y calidad" : "Security and quality"}</strong><small>JWT · JUnit · SonarQube</small></div></div>
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hero-social-link">LinkedIn<ArrowUpRight size={15} aria-hidden="true" /></a>
    </aside>
  </div>;
}