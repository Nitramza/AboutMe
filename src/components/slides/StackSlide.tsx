import { GraduationCap, Languages } from "lucide-react";
import type { CVData, Language } from "@/data/cvData";

const groups = [
  { key: "backend", es: "Backend", en: "Backend", categories: ["Backend", "Architecture", "Arquitectura", "Integration", "Integración"] },
  { key: "frontend", es: "Frontend y web", en: "Frontend and web", categories: ["Full stack y web", "Full-stack and web"] },
  { key: "databases", es: "Bases de datos", en: "Databases", categories: ["Databases", "Bases de datos"] },
  { key: "tools", es: "Herramientas y prácticas", en: "Tools and practices", categories: ["Security", "Seguridad", "AI and automation", "IA y automatización", "Quality and tools", "Calidad y herramientas", "Leadership and collaboration", "Liderazgo y colaboración"] },
];

export function StackSlide({ data, language }: { data: CVData; language: Language }) {
  const spanish = language === "es";
  return <div className="slide-content stack-content">
    <div className="slide-heading"><p className="slide-eyebrow"><span />04 / {spanish ? "STACK TÉCNICO" : "TECHNICAL STACK"}</p><h2>{spanish ? "Herramientas para construir" : "Tools for building"}<span className="deck-period">.</span></h2><p>{spanish ? "Tecnologías, prácticas y formas de colaborar." : "Technologies, practices, and ways of working."}</p></div>
    <div className="stack-grid">{groups.map((group, index) => {
      const items = [...new Set(data.skills.filter(category => group.categories.includes(category.name)).flatMap(category => category.items))];
      return <section className={`stack-group stack-group-${index + 1}`} key={group.key}>
        <div className="stack-group-heading"><span>0{index + 1}</span><h3>{spanish ? group.es : group.en}</h3></div>
        <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
      </section>;
    })}</div>
    <div className="stack-footer">
      <div><GraduationCap size={17} aria-hidden="true" /><span>{data.education}</span></div>
      <div><Languages size={17} aria-hidden="true" /><span>{data.languages.join(" · ")}</span></div>
      <p>{data.learning}</p>
    </div>
  </div>;
}