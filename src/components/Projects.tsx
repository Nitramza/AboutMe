import { ArrowUpRight, Blocks, GitBranch, ShieldCheck } from "lucide-react";
import type { Language, ProjectItem } from "@/data/cvData";

const icons = [GitBranch, ShieldCheck, Blocks];

export function Projects({ items, language }: { items: ProjectItem[]; language: Language }) {
  if (!items.length) return null;
  return (
    <section id="projects" className="content-section" aria-labelledby="projects-title">
      <div className="section-heading"><span className="section-number">02 /</span><h2 id="projects-title">{language === "es" ? "Trabajo técnico" : "Technical work"}</h2></div>
      <div className="project-grid">
        {items.map((item, index) => {
          const Icon = icons[index % icons.length];
          return <article className="project" key={item.id}>
            <div className="project-top"><Icon size={24} strokeWidth={1.5} aria-hidden="true" /><span className="mono-label">0{index + 1}</span></div>
            <h3>{item.name}</h3><p>{item.description}</p>
            <ul className="tags">{item.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
            {(item.codeUrl || item.demoUrl) && <div className="project-links">{item.codeUrl && <a className="text-link" href={item.codeUrl} target="_blank" rel="noopener noreferrer">{language === "es" ? "Código (GitHub)" : "Code (GitHub)"}<ArrowUpRight size={15} /></a>}{item.demoUrl && <a className="text-link" href={item.demoUrl} target="_blank" rel="noopener noreferrer">{language === "es" ? "Demo en vivo" : "Live demo"}<ArrowUpRight size={15} /></a>}</div>}
          </article>;
        })}
      </div>
    </section>
  );
}