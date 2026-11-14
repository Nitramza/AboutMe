import { GraduationCap, Languages } from "lucide-react";
import type { CVData, Language } from "@/data/cvData";

export function Skills({ data, language }: { data: CVData; language: Language }) {
  return (
    <section id="skills" className="content-section" aria-labelledby="skills-title">
      <div className="section-heading"><span className="section-number">03 /</span><h2 id="skills-title">{language === "es" ? "Tecnología, prácticas y liderazgo" : "Technology, practices, and leadership"}</h2></div>
      <div className="skills-grid">{data.skills.map(category => <div className="skill-category" key={category.name}><h3>{category.name}</h3><ul className="tags">{category.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div>
      <p className="learning">{data.learning}</p>
      <div className="education-grid">
        <div><GraduationCap size={21} aria-hidden="true" /><h3>{language === "es" ? "Formación" : "Education"}</h3><p>{data.education}</p></div>
        <div><Languages size={21} aria-hidden="true" /><h3>{language === "es" ? "Idiomas" : "Languages"}</h3>{data.languages.map(item => <p key={item}>{item}</p>)}</div>
      </div>
    </section>
  );
}