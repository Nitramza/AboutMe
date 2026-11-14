export type Language = "es" | "en";
export interface Profile {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  pdf: string;
  downloadName: string;
}
export interface ExperienceItem {
  id: string;
  role: string;
  company?: string;
  period: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}
export interface ProjectItem {
  id: string;
  kind: "personal" | "professional";
  name: string;
  description: string;
  technologies: string[];
  image?: string;
  codeUrl?: string;
  demoUrl?: string;
}
export interface SkillCategory {
  name: string;
  items: string[];
}
export interface CVData {
  profile: Profile;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  education: string;
  languages: string[];
  learning: string;
}

const contact = {
  name: "Martin Vazquez Islas",
  email: "martin.vazquez.islas@hotmail.com",
  phone: "+52 222 143 6219",
  linkedin: "https://www.linkedin.com/in/martin-vazquez-islas/",
};

export const cvData: Record<Language, CVData> = {
  es: {
    profile: {
      ...contact,
      title: "Ingeniero de Software | Backend y Desarrollo Full Stack",
      location: "CDMX, México",
      summary: "Ingeniero de software con experiencia en soluciones backend empresariales, desarrollo full stack e integración de servicios. Especializado en Java, Spring Boot, APIs REST y Apache Kafka; aplico arquitectura hexagonal, seguridad, pruebas automatizadas y workflows de desarrollo asistido por IA. Colaboro y lidero equipos, comparto conocimiento y promuevo código mantenible y buenas prácticas.",
      pdf: "/cv.pdf",
      downloadName: "ES_Martin_Vazquez_Islas_CV.pdf",
    },
    experience: [
      {
        id: "current",
        role: "Desarrollador Especializado (Backend)",
        period: "Actual",
        summary: "Desarrollo de soluciones empresariales con Java y Spring Boot, aplicando arquitectura hexagonal en monolitos modulares.",
        achievements: [
          "Diseño de APIs REST y separación de lógica de negocio mediante puertos y adaptadores.",
          "Implementación de productores y consumidores Apache Kafka para integrar flujos de negocio asíncronos.",
          "Integración de Okta Verify para la gestión de identidades y cifrado de información sensible.",
          "Aplicación de controles de seguridad frente a vulnerabilidades XSS y SSRF.",
          "Desarrollo de pruebas unitarias con JUnit y Mockito y validación de calidad y seguridad con SonarQube y Checkmarx.",
          "Diseño de workflows de desarrollo asistido por IA con Kiro, agentes y Agent Skills, steering, hooks y servidores MCP, integrados con Git y GitHub Actions.",
          "Uso de herramientas de IA para estructurar bases de código y acelerar la implementación de soluciones backend.",
        ],
        technologies: ["Java", "Spring Boot", "Apache Kafka", "SQL Server", "Okta Verify", "JUnit", "Mockito", "SonarQube", "Checkmarx", "Kiro", "MCP", "GitHub Actions"],
      },
      {
        id: "modernization",
        role: "Desarrollador Full Stack",
        period: "Nov 2024 — Abr 2025",
        summary: "Modernización de aplicaciones e integración de servicios backend con plataformas empresariales y sistemas externos.",
        achievements: [
          "Migración de funcionalidades de negocio de C# a Java en iniciativas de modernización tecnológica.",
          "Integración con APIs REST y SAP mediante aplicaciones Spring Boot y acceso a datos con JDBC.",
          "Implementación de autenticación y autorización con Spring Security y JWT, contratos YAML y cifrado de datos.",
          "Desarrollo de pruebas automatizadas y análisis estático de calidad y seguridad con SonarQube y Checkmarx.",
        ],
        technologies: ["Java", "Spring Boot", "Spring Security", "JWT", "SAP", "JDBC"],
      },
      {
        id: "microservices",
        role: "Desarrollador Backend",
        period: "May 2023 — Ago 2024",
        summary: "Desarrollo y mantenimiento de microservicios REST con Java, Spring Boot y Oracle Database.",
        achievements: [
          "Implementación de APIs REST, operaciones CRUD y lógica de negocio para aplicaciones empresariales.",
          "Construcción de capas de acceso a datos con Oracle SQL, validaciones y manejo de excepciones.",
          "Participación en el análisis, diseño y mantenimiento de servicios backend.",
        ],
        technologies: ["Java", "Spring Boot", "Oracle SQL", "REST APIs"],
      },
      {
        id: "software",
        role: "Desarrollador de Software",
        period: "Ago 2022 — Feb 2023",
        summary: "Soporte técnico, optimización de bases de datos y mantenimiento de aplicaciones críticas para el negocio.",
        achievements: [
          "Análisis de requerimientos y propuesta de soluciones en colaboración con equipos técnicos y funcionales.",
          "Optimización de consultas SQL y procesos sobre Oracle Database y PL/SQL.",
          "Investigación y resolución de incidencias en producción para mantener la continuidad de aplicaciones críticas.",
        ],
        technologies: ["Oracle Database", "SQL", "PL/SQL"],
      },
    ],
    projects: [
      { id: "portfolio", kind: "personal", name: "CV web y portafolio profesional", description: "Diseño y desarrollo de un portafolio bilingüe para presentar experiencia, proyectos técnicos y CV descargables. Incluye generación automatizada de PDF, diseño adaptable y exportación estática.", technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Playwright", "GitHub Pages"], image: "/cv-preview-en.png", codeUrl: "https://github.com/Nitramza/AboutMe", demoUrl: "https://nitramza.github.io/AboutMe/" },
      { id: "events", kind: "professional", name: "Integración orientada a eventos", description: "Integración de flujos empresariales asíncronos mediante productores y consumidores Apache Kafka, dentro de aplicaciones Java y Spring Boot.", technologies: ["Apache Kafka", "Java", "Spring Boot"] },
      { id: "security", kind: "professional", name: "Seguridad de APIs e identidad", description: "Autenticación y autorización de APIs REST, integración de Okta Verify y mecanismos de cifrado para proteger información sensible.", technologies: ["Spring Security", "JWT", "Okta Verify"] },
      { id: "migration", kind: "professional", name: "Modernización de aplicaciones", description: "Migración de funcionalidades de negocio de C# a Java e integración con SAP y servicios REST externos.", technologies: ["Java", "SAP", "REST APIs"] },
      { id: "ai-workflows", kind: "professional", name: "Workflows de ingeniería asistida por IA", description: "Configuración de agentes y Agent Skills en Kiro, steering, hooks y servidores MCP como parte de workflows de desarrollo versionados con Git y GitHub Actions.", technologies: ["Kiro", "AI agents", "Agent Skills", "MCP", "Steering", "Hooks", "Git", "GitHub Actions"] },
    ],
    skills: [
      { name: "Backend", items: ["Java", "Spring Boot", "Spring Security", "JDBC", "Maven"] },
      { name: "Full stack y web", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML", "CSS", "AJAX", "JSON"] },
      { name: "Arquitectura", items: ["Microservicios", "Arquitectura hexagonal (puertos y adaptadores)", "Arquitectura orientada a eventos", "Monolitos modulares"] },
      { name: "Integración", items: ["APIs REST", "Apache Kafka", "SAP", "JSON", "AJAX"] },
      { name: "Bases de datos", items: ["SQL Server", "Oracle Database", "PostgreSQL", "SQL", "PL/SQL", "Procedimientos almacenados"] },
      { name: "Seguridad", items: ["JWT", "Okta Verify", "Cifrado de datos", "Prevención de XSS y SSRF"] },
      { name: "IA y automatización", items: ["Desarrollo asistido por IA", "Kiro", "AI agents y Agent Skills", "Model Context Protocol (MCP)", "Steering y hooks", "Git", "GitHub Actions"] },
      { name: "Calidad y herramientas", items: ["Pruebas unitarias", "JUnit", "Mockito", "SonarQube", "Checkmarx", "Clean code", "Buenas prácticas", "Postman", "GitLab"] },
      { name: "Liderazgo y colaboración", items: ["Liderazgo de equipos de desarrollo", "Capacitación técnica", "Colaboración interdisciplinaria", "Comunicación y transferencia de conocimiento", "Adaptabilidad"] },
    ],
    education: "Ingeniería en Sistemas Computacionales",
    languages: ["Español · Nativo", "Inglés · Intermedio (B1)"],
    learning: "En desarrollo: Go, Docker (básico), plataformas cloud y sistemas distribuidos.",
  },
  en: {
    profile: {
      ...contact,
      title: "Software Engineer | Backend & Full-Stack Development",
      location: "Mexico City, Mexico",
      summary: "Software engineer with experience delivering enterprise backend solutions, full-stack applications, and system integrations. Specializes in Java, Spring Boot, REST APIs, and Apache Kafka, applying hexagonal architecture, application security, automated testing, and AI-assisted development workflows. Collaborative technical lead focused on knowledge sharing, maintainable code, and sound engineering practices.",
      pdf: "/cv-en.pdf",
      downloadName: "EN_Martin_Vazquez_Islas_CV.pdf",
    },
    experience: [
      {
        id: "current",
        role: "Backend Software Engineer",
        period: "Current",
        summary: "Develop enterprise solutions with Java and Spring Boot, applying hexagonal architecture within modular monoliths.",
        achievements: [
          "Design REST APIs and separate business logic from infrastructure through ports and adapters.",
          "Implement Apache Kafka producers and consumers to integrate asynchronous business workflows.",
          "Integrate Okta Verify for identity management and implement encryption for sensitive information.",
          "Apply application security controls to address XSS and SSRF vulnerabilities.",
          "Develop unit tests with JUnit and Mockito and validate code quality and security with SonarQube and Checkmarx.",
          "Design AI-assisted engineering workflows with Kiro agents and Agent Skills, steering, hooks, and MCP servers, integrated with Git and GitHub Actions.",
          "Use AI tools to scaffold codebases and accelerate backend implementation.",
        ],
        technologies: ["Java", "Spring Boot", "Apache Kafka", "SQL Server", "Okta Verify", "JUnit", "Mockito", "SonarQube", "Checkmarx", "Kiro", "MCP", "GitHub Actions"],
      },
      {
        id: "modernization",
        role: "Full-Stack Developer",
        period: "Nov 2024 — Apr 2025",
        summary: "Modernized applications and integrated backend services with enterprise platforms and external systems.",
        achievements: [
          "Migrated business functionality from C# to Java as part of application modernization initiatives.",
          "Integrated REST APIs and SAP systems through Spring Boot applications and JDBC data access.",
          "Implemented Spring Security and JWT authentication and authorization, YAML contracts, and data encryption.",
          "Developed automated tests and performed static code quality and security analysis with SonarQube and Checkmarx.",
        ],
        technologies: ["Java", "Spring Boot", "Spring Security", "JWT", "SAP", "JDBC"],
      },
      {
        id: "microservices",
        role: "Backend Developer",
        period: "May 2023 — Aug 2024",
        summary: "Developed and maintained RESTful microservices with Java, Spring Boot, and Oracle Database.",
        achievements: [
          "Implemented REST APIs, CRUD operations, and business logic for enterprise applications.",
          "Developed data access layers with Oracle SQL and implemented business validation and exception handling.",
          "Contributed to the analysis, design, and maintenance of backend services.",
        ],
        technologies: ["Java", "Spring Boot", "Oracle SQL", "REST APIs"],
      },
      {
        id: "software",
        role: "Software Developer",
        period: "Aug 2022 — Feb 2023",
        summary: "Supported business-critical applications through technical troubleshooting, database optimization, and ongoing maintenance.",
        achievements: [
          "Analyzed requirements and proposed solutions in collaboration with technical and business teams.",
          "Optimized Oracle Database queries and processes using SQL and PL/SQL.",
          "Investigated and resolved production incidents to support continuity of business-critical applications.",
        ],
        technologies: ["Oracle Database", "SQL", "PL/SQL"],
      },
    ],
    projects: [
      { id: "portfolio", kind: "personal", name: "Web CV and professional portfolio", description: "Designed and built a bilingual portfolio showcasing experience, technical projects, and downloadable resumes. Includes automated PDF generation, responsive layouts, and static export.", technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Playwright", "GitHub Pages"], image: "/cv-preview-en.png", codeUrl: "https://github.com/Nitramza/AboutMe", demoUrl: "https://nitramza.github.io/AboutMe/" },
      { id: "events", kind: "professional", name: "Event-driven integration", description: "Asynchronous enterprise workflow integration through Apache Kafka producers and consumers in Java and Spring Boot applications.", technologies: ["Apache Kafka", "Java", "Spring Boot"] },
      { id: "security", kind: "professional", name: "API security and identity", description: "REST API authentication and authorization, Okta Verify integration, and encryption mechanisms for sensitive information.", technologies: ["Spring Security", "JWT", "Okta Verify"] },
      { id: "migration", kind: "professional", name: "Application modernization", description: "Migration of C# business functionality to Java and integration with SAP platforms and external REST services.", technologies: ["Java", "SAP", "REST APIs"] },
      { id: "ai-workflows", kind: "professional", name: "AI-assisted engineering workflows", description: "Kiro agents and Agent Skills, steering, hooks, and MCP servers configured as part of Git- and GitHub Actions-based development workflows.", technologies: ["Kiro", "AI agents", "Agent Skills", "MCP", "Steering", "Hooks", "Git", "GitHub Actions"] },
    ],
    skills: [
      { name: "Backend", items: ["Java", "Spring Boot", "Spring Security", "JDBC", "Maven"] },
      { name: "Full-stack and web", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML", "CSS", "AJAX", "JSON"] },
      { name: "Architecture", items: ["Microservices", "Hexagonal architecture (ports and adapters)", "Event-driven architecture", "Modular monoliths"] },
      { name: "Integration", items: ["REST APIs", "Apache Kafka", "SAP", "JSON", "AJAX"] },
      { name: "Databases", items: ["SQL Server", "Oracle Database", "PostgreSQL", "SQL", "PL/SQL", "Stored procedures"] },
      { name: "Security", items: ["JWT", "Okta Verify", "Data encryption", "XSS and SSRF prevention"] },
      { name: "AI and automation", items: ["AI-assisted development", "Kiro", "AI agents and Agent Skills", "Model Context Protocol (MCP)", "Steering and hooks", "Git", "GitHub Actions"] },
      { name: "Quality and tools", items: ["Unit testing", "JUnit", "Mockito", "SonarQube", "Checkmarx", "Clean code", "Engineering best practices", "Postman", "GitLab"] },
      { name: "Leadership and collaboration", items: ["Development team leadership", "Technical training", "Cross-functional collaboration", "Communication and knowledge sharing", "Adaptability"] },
    ],
    education: "Bachelor’s Degree in Computer Systems Engineering",
    languages: ["Spanish · Native", "English · Intermediate (B1)"],
    learning: "Developing skills in Go, Docker (basic), cloud platforms, and distributed systems.",
  },
};