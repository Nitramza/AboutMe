import { ArrowUpRight, Download, FileText, Mail, Phone } from "lucide-react";
import type { CVData, Language } from "@/data/cvData";

export function ContactSlide({ data, language, asset }: { data: Record<Language, CVData>; language: Language; asset: (path: string) => string }) {
  const profile = data[language].profile;
  const spanish = language === "es";
  return <div className="slide-content contact-content">
    <div className="contact-copy">
      <p className="slide-eyebrow"><span />05 / {spanish ? "CONTACTO" : "CONTACT"}</p>
      <h2>{spanish ? "Hablemos de" : "Let’s talk about"}<br />{spanish ? "lo que sigue" : "what’s next"}<span className="deck-period">.</span></h2>
      <p className="contact-summary">{spanish ? "Conecta conmigo para conversar sobre ingeniería de software, backend e integración." : "Get in touch to discuss software engineering, backend development, and integrations."}</p>
      <a className="contact-linkedin" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={15} aria-hidden="true" /></a>
      <a className="contact-email" href={`mailto:${profile.email}`}><Mail size={18} aria-hidden="true" />{profile.email}</a>
      <a className="contact-phone" href={`tel:${profile.phone.replace(/\s/g, "")}`}><Phone size={17} aria-hidden="true" />{profile.phone}</a>
    </div>
    <aside className="contact-documents">
      <span className="mono-label">{spanish ? "CV IMPRIMIBLE" : "PRINTABLE RESUME"}</span>
      <h3>{spanish ? "Una versión lista para compartir." : "A version ready to share."}</h3>
      {(["es", "en"] as const).map(item => <a className="printable-link" key={item} href={asset(`/resume/${item}/`)}>
        <span className="printable-icon"><FileText size={18} aria-hidden="true" /></span>
        <span><strong>{item === "es" ? "Español" : "English"}</strong><small>{item === "es" ? "Vista imprimible" : "Printable view"}</small></span>
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>)}
      <div className="contact-downloads">{(["es", "en"] as const).map(item => <a key={item} href={asset(data[item].profile.pdf)} download={data[item].profile.downloadName}><Download size={15} aria-hidden="true" />{item.toUpperCase()} PDF</a>)}</div>
    </aside>
  </div>;
}