import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cvData, type ExperienceItem, type Language } from "@/data/cvData";

export const dynamicParams = false;
export function generateStaticParams() { return [{ language: "es" }, { language: "en" }]; }

export async function generateMetadata({ params }: { params: Promise<{ language: string }> }): Promise<Metadata> {
  const { language } = await params;
  if (language !== "es" && language !== "en") notFound();
  const profile = cvData[language].profile;
  return { title: `${profile.name} | CV ${language.toUpperCase()}`, description: profile.summary };
}

function ExperienceBlock({ item }: { item: ExperienceItem }) {
  return <section className="resume-experience"><div className="resume-role"><h3>{item.role}</h3><span>{item.period}</span></div>{item.company && <p>{item.company}</p>}<p>{item.summary}</p><ul>{item.achievements.map(text => <li key={text}>{text}</li>)}</ul><p className="resume-tech">{item.technologies.join(" · ")}</p></section>;
}

export default async function ResumePage({ params }: { params: Promise<{ language: string }> }) {
  const { language } = await params;
  if (language !== "es" && language !== "en") notFound();
  const data = cvData[language as Language];
  const spanish = language === "es";
  return <main className="resume-document" lang={language}>
    <article className="resume-page">
      <header className="resume-header"><div className="resume-kicker">SOFTWARE ENGINEERING / BACKEND / FULL STACK</div><h1>{data.profile.name}</h1><h2>{data.profile.title}</h2><p>{data.profile.location} · {data.profile.phone}</p><p><a href={`mailto:${data.profile.email}`}>{data.profile.email}</a></p><p><a href={data.profile.linkedin}>linkedin.com/in/martin-vazquez-islas</a></p></header>
      <section className="resume-summary"><h2>{spanish ? "Resumen profesional" : "Professional summary"}</h2><p>{data.profile.summary}</p></section>
      <h2 className="resume-section-title">{spanish ? "Experiencia profesional" : "Professional experience"}</h2>
      {data.experience.slice(0, 2).map(item => <ExperienceBlock key={item.id} item={item} />)}
      <div className="resume-education"><section><h2>{spanish ? "Formación académica" : "Education"}</h2><p>{data.education}</p></section><section><h2>{spanish ? "Idiomas" : "Languages"}</h2>{data.languages.map(text => <p key={text}>{text}</p>)}</section></div>
      <footer className="resume-footer"><span>{data.profile.name} · {data.profile.title}</span><span>01 / 02</span></footer>
    </article>
    <article className="resume-page">
      <header className="resume-continuation"><strong>{data.profile.name}</strong><span>{data.profile.title}</span></header>
      <h2 className="resume-section-title">{spanish ? "Experiencia profesional · continuación" : "Professional experience · continued"}</h2>
      {data.experience.slice(2).map(item => <ExperienceBlock key={item.id} item={item} />)}
      <h2 className="resume-section-title">{spanish ? "Proyecto personal destacado" : "Featured personal project"}</h2>
      {data.projects.filter(item => item.kind === "personal").map(item => <section className="resume-project" key={item.id}><h3>{item.name}</h3><p>{item.description}</p><p className="resume-tech">{item.technologies.join(" · ")}</p><p className="resume-project-links">{item.demoUrl && <a href={item.demoUrl}>{item.demoUrl}</a>}{item.codeUrl && <> · <a href={item.codeUrl}>{item.codeUrl}</a></>}</p></section>)}
      <h2 className="resume-section-title">{spanish ? "Habilidades técnicas" : "Technical skills"}</h2>
      <div className="resume-skills">{data.skills.map(category => <section key={category.name}><h3>{category.name}:</h3><p>{category.items.join(" · ")}</p></section>)}</div>
      <p className="resume-learning">{data.learning}</p>
      <footer className="resume-footer"><span>{data.profile.email}</span><span>02 / 02</span></footer>
    </article>
  </main>;
}