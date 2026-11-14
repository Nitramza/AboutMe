import { ArrowUpRight, Blocks, GitBranch, ShieldCheck } from "lucide-react";
import type { Language, ProjectItem } from "@/data/cvData";

const caseIcons = [GitBranch, ShieldCheck, Blocks];

export function CasesSlide({ items, language }: { items: ProjectItem[]; language: Language }) {
  const spanish = language === "es";
  return <div className="slide-content cases-content">
    <div className="slide-heading"><p className="slide-eyebrow"><span />03 / {spanish ? "CASOS DOCUMENTADOS" : "DOCUMENTED WORK"}</p><h2>{spanish ? "Ingeniería en práctica" : "Engineering in practice"}<span className="deck-period">.</span></h2><p>{spanish ? "Integraciones, seguridad y modernización a partir del trabajo realizado." : "Integrations, security, and modernization grounded in delivered work."}</p></div>
    <div className="case-grid">{items.map((item, index) => {
      const Icon = caseIcons[index % caseIcons.length];
      return <article className={`case-card case-card-${index + 1}`} key={item.id}>
        <div className="case-card-top"><Icon size={19} aria-hidden="true" /><span>{item.kind === "personal" ? (spanish ? "PROYECTO PERSONAL" : "PERSONAL PROJECT") : (spanish ? "CASO PROFESIONAL" : "PROFESSIONAL CASE")}</span></div>
        <h3>{item.name}</h3><p className="case-description">{item.description}</p>
        <ul className="case-tags">{item.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
        {(item.codeUrl || item.demoUrl) && <div className="case-links">
          {item.codeUrl && <a href={item.codeUrl} target="_blank" rel="noopener noreferrer">{spanish ? "Código" : "Code"}<ArrowUpRight size={14} aria-hidden="true" /></a>}
          {item.demoUrl && <a href={item.demoUrl} target="_blank" rel="noopener noreferrer">{spanish ? "Demo" : "Live demo"}<ArrowUpRight size={14} aria-hidden="true" /></a>}
        </div>}
      </article>;
    })}</div>
  </div>;
}