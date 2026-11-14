import { ArrowUpRight } from "lucide-react";
import type { ExperienceItem, Language } from "@/data/cvData";

export function ExperienceSlide({ items, language }: { items: ExperienceItem[]; language: Language }) {
  const spanish = language === "es";
  return <div className="slide-content experience-content">
    <div className="slide-heading"><p className="slide-eyebrow"><span />02 / {spanish ? "TRAYECTORIA" : "CAREER"}</p><h2>{spanish ? "Experiencia" : "Experience"}<span className="deck-period">.</span></h2><p>{spanish ? "Evolución entre backend empresarial, integración y modernización." : "Building enterprise backends, integrations, and modernized applications."}</p></div>
    <ol className="deck-timeline">{items.map((item, index) => <li className="deck-timeline-item" key={item.id}>
      <div className="timeline-date"><span>{item.period}</span><i aria-hidden="true" /></div>
      <article className="timeline-card">
        <div className="timeline-card-heading"><div><h3>{item.role}</h3>{item.company && <p className="timeline-company">{item.company}</p>}</div><span className="timeline-index">0{index + 1}</span></div>
        <p className="timeline-summary">{item.summary}</p>
        <ul className="timeline-highlights">{item.achievements.slice(0, 2).map(achievement => <li key={achievement}>{achievement}</li>)}</ul>
        <div className="timeline-tech">{item.technologies.slice(0, 5).map(technology => <span key={technology}>{technology}</span>)}</div>
      </article>
    </li>)}</ol>
    <p className="slide-footnote">{spanish ? "Detalle completo en el CV imprimible" : "Full details in the printable resume"}<ArrowUpRight size={14} aria-hidden="true" /></p>
  </div>;
}