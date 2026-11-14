import type { ExperienceItem, Language } from "@/data/cvData";

export function Experience({ items, language }: { items: ExperienceItem[]; language: Language }) {
  if (!items.length) return null;
  return (
    <section id="experience" className="content-section" aria-labelledby="experience-title">
      <div className="section-heading"><span className="section-number">01 /</span><h2 id="experience-title">{language === "es" ? "Experiencia profesional" : "Professional experience"}</h2></div>
      <ol className="timeline">
        {items.map((item, index) => (
          <li key={item.id} className="experience-item">
            <div className="experience-meta"><span className={index === 0 ? "period current" : "period"}>{item.period}</span><span className="timeline-point" /></div>
            <div className="experience-body">
              <h3>{item.role}</h3>{item.company && <p className="company">{item.company}</p>}
              <p className="experience-summary">{item.summary}</p>
              <ul className="achievements">{item.achievements.map(achievement => <li key={achievement}>{achievement}</li>)}</ul>
              <ul className="tags" aria-label={language === "es" ? "Tecnologías" : "Technologies"}>{item.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}