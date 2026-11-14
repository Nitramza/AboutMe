import { ArrowDown, ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import type { Language, Profile } from "@/data/cvData";

export function Hero({ profile, language, asset }: { profile: Profile; language: Language; asset: (path: string) => string }) {
  const spanish = language === "es";
  return (
    <section className="hero" aria-labelledby="profile-name">
      <div className="eyebrow"><span className="accent-line" />BACKEND / FULL STACK / SOFTWARE ENGINEERING</div>
      <div className="hero-grid">
        <div>
          <h1 id="profile-name">{profile.name}</h1>
          <p className="hero-title">{profile.title}<span className="accent-dot">.</span></p>
          <p className="hero-summary">{profile.summary}</p>
          <p className="location"><MapPin size={15} aria-hidden="true" />{profile.location}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={asset(profile.pdf)} download={profile.downloadName}><Download size={17} aria-hidden="true" />{spanish ? "Descargar CV (PDF)" : "Download resume (PDF)"}</a>
            <a className="text-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={15} aria-hidden="true" /></a>
            <a className="icon-button" href={`mailto:${profile.email}`} title={spanish ? "Enviar correo" : "Send email"} aria-label={spanish ? "Enviar correo" : "Send email"}><Mail size={19} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="specialty" aria-label={spanish ? "Especialidades técnicas" : "Technical focus"}>
          <span className="mono-label">BACKEND / {spanish ? "ENFOQUE" : "FOCUS"}</span>
          <div className="specialty-row"><span>01</span><strong>{spanish ? "Sistemas conectados" : "Connected systems"}</strong><small>REST APIs · Apache Kafka</small></div>
          <div className="specialty-row"><span>02</span><strong>{spanish ? "Arquitectura mantenible" : "Maintainable architecture"}</strong><small>Java · Spring Boot</small></div>
          <div className="specialty-row"><span>03</span><strong>{spanish ? "Seguridad y calidad" : "Security and quality"}</strong><small>JWT · JUnit · SonarQube</small></div>
          <a href="#experience" className="scroll-link"><ArrowDown size={16} aria-hidden="true" />{spanish ? "Explorar experiencia" : "Explore experience"}</a>
        </div>
      </div>
    </section>
  );
}