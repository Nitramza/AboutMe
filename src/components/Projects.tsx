import { ArrowUpRight, Blocks, GitBranch, ShieldCheck } from "lucide-react";
import Image from "next/image";
import type { Language, ProjectItem } from "@/data/cvData";

const icons = [GitBranch, ShieldCheck, Blocks];

export function Projects({ items, language }: { items: ProjectItem[]; language: Language }) {
  if (!items.length) return null;
  const personal = items.filter(item => item.kind === "personal");
  const professional = items.filter(item => item.kind === "professional");
  const spanish = language === "es";

  const projectCard = (item: ProjectItem, index: number) => {
    const Icon = icons[index % icons.length];
    return <article className={`project${item.kind === "personal" ? " project-personal" : ""}`} key={item.id}>
      {item.image && <Image className="project-image" src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${item.image}`} alt={spanish ? `Vista previa de ${item.name}` : `Preview of ${item.name}`} width={794} height={1123} unoptimized />}
      <div className="project-top"><Icon size={24} strokeWidth={1.5} aria-hidden="true" /><span className="mono-label">0{index + 1}</span></div>
      <span className="project-kind">{item.kind === "personal" ? (spanish ? "PROYECTO PERSONAL" : "PERSONAL PROJECT") : (spanish ? "CASO PROFESIONAL" : "PROFESSIONAL CASE STUDY")}</span>
      <h3>{item.name}</h3><p>{item.description}</p>
      <ul className="tags">{item.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
      {(item.codeUrl || item.demoUrl) && <div className="project-links">{item.codeUrl && <a className="text-link" href={item.codeUrl} target="_blank" rel="noopener noreferrer">{language === "es" ? "Código (GitHub)" : "Code (GitHub)"}<ArrowUpRight size={15} /></a>}{item.demoUrl && <a className="text-link" href={item.demoUrl} target="_blank" rel="noopener noreferrer">{language === "es" ? "Demo en vivo" : "Live demo"}<ArrowUpRight size={15} /></a>}</div>}
    </article>;
  };

  return (
    <section id="projects" className="content-section" aria-labelledby="projects-title">
      <div className="section-heading"><span className="section-number">02 /</span><h2 id="projects-title">{spanish ? "Proyectos y trabajo" : "Projects and selected work"}</h2></div>
      {personal.length > 0 && <div className="project-group"><div className="project-group-heading"><span className="mono-label">{spanish ? "PROYECTOS PERSONALES" : "PERSONAL PROJECTS"}</span><p>{spanish ? "Productos propios, desde el planteamiento hasta la implementación." : "Independent products, from planning through implementation."}</p></div><div className="project-grid project-grid-personal">{personal.map((item, index) => projectCard(item, index))}</div></div>}
      {professional.length > 0 && <div className="project-group"><div className="project-group-heading"><span className="mono-label">{spanish ? "TRABAJO PROFESIONAL" : "PROFESSIONAL WORK"}</span><p>{spanish ? "Experiencia técnica descrita a partir del trabajo realizado en equipos empresariales." : "Technical experience drawn from work delivered within enterprise teams."}</p></div><div className="project-grid">{professional.map((item, index) => projectCard(item, index))}</div></div>}
    </section>
  );
}