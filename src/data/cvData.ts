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
  name: string;
  description: string;
  technologies: string[];
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
      title: "Ingeniero de Software Backend",
      location: "CDMX, México",
      summary: "Ingeniero de software backend especializado en Java, Spring Boot y desarrollo de APIs REST. Experiencia en integraciones asíncronas con Apache Kafka, arquitectura hexagonal, seguridad de aplicaciones y modernización de sistemas empresariales. Enfoque en software mantenible, pruebas automatizadas y bases de datos relacionales.",
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
          "Desarrollo de pruebas unitarias con JUnit y Mockito, con análisis de calidad mediante SonarQube.",
        ],
        technologies: ["Java", "Spring Boot", "Apache Kafka", "SQL Server", "Okta Verify", "JUnit", "Mockito", "SonarQube"],
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
      { id: "events", name: "Integración orientada a eventos", description: "Integración de flujos empresariales asíncronos mediante productores y consumidores Apache Kafka, dentro de aplicaciones Java y Spring Boot.", technologies: ["Apache Kafka", "Java", "Spring Boot"] },
      { id: "security", name: "Seguridad de APIs e identidad", description: "Autenticación y autorización de APIs REST, integración de Okta Verify y mecanismos de cifrado para proteger información sensible.", technologies: ["Spring Security", "JWT", "Okta Verify"] },
      { id: "migration", name: "Modernización de aplicaciones", description: "Migración de funcionalidades de negocio de C# a Java e integración con SAP y servicios REST externos.", technologies: ["Java", "SAP", "REST APIs"] },
    ],
    skills: [
      { name: "Backend", items: ["Java", "Spring Boot", "Spring Security", "JDBC", "Maven"] },
      { name: "Arquitectura", items: ["Microservicios", "Arquitectura hexagonal (puertos y adaptadores)", "Arquitectura orientada a eventos", "Monolitos modulares"] },
      { name: "Integración", items: ["APIs REST", "Apache Kafka", "SAP", "JSON", "AJAX"] },
      { name: "Bases de datos", items: ["SQL Server", "Oracle Database", "PostgreSQL", "SQL", "PL/SQL", "Procedimientos almacenados"] },
      { name: "Seguridad", items: ["JWT", "Okta Verify", "Cifrado de datos", "Prevención de XSS y SSRF"] },
      { name: "Calidad y herramientas", items: ["Pruebas unitarias", "JUnit", "Mockito", "SonarQube", "Checkmarx", "Postman", "Git", "GitLab"] },
    ],
    education: "Ingeniería en Sistemas Computacionales",
    languages: ["Español · Nativo", "Inglés · Intermedio (B1)"],
    learning: "En desarrollo: Go, Docker (básico), plataformas cloud y sistemas distribuidos.",
  },
  en: {
    profile: {
      ...contact,
      title: "Backend Software Engineer",
      location: "Mexico City, Mexico",
      summary: "Backend software engineer specializing in Java, Spring Boot, and REST API development. Experienced in asynchronous integration with Apache Kafka, hexagonal architecture, application security, and enterprise application modernization. Focused on maintainable software, automated testing, and relational databases.",
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
          "Develop unit tests with JUnit and Mockito and assess code quality with SonarQube.",
        ],
        technologies: ["Java", "Spring Boot", "Apache Kafka", "SQL Server", "Okta Verify", "JUnit", "Mockito", "SonarQube"],
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
      { id: "events", name: "Event-driven integration", description: "Asynchronous enterprise workflow integration through Apache Kafka producers and consumers in Java and Spring Boot applications.", technologies: ["Apache Kafka", "Java", "Spring Boot"] },
      { id: "security", name: "API security and identity", description: "REST API authentication and authorization, Okta Verify integration, and encryption mechanisms for sensitive information.", technologies: ["Spring Security", "JWT", "Okta Verify"] },
      { id: "migration", name: "Application modernization", description: "Migration of C# business functionality to Java and integration with SAP platforms and external REST services.", technologies: ["Java", "SAP", "REST APIs"] },
    ],
    skills: [
      { name: "Backend", items: ["Java", "Spring Boot", "Spring Security", "JDBC", "Maven"] },
      { name: "Architecture", items: ["Microservices", "Hexagonal architecture (ports and adapters)", "Event-driven architecture", "Modular monoliths"] },
      { name: "Integration", items: ["REST APIs", "Apache Kafka", "SAP", "JSON", "AJAX"] },
      { name: "Databases", items: ["SQL Server", "Oracle Database", "PostgreSQL", "SQL", "PL/SQL", "Stored procedures"] },
      { name: "Security", items: ["JWT", "Okta Verify", "Data encryption", "XSS and SSRF prevention"] },
      { name: "Quality and tools", items: ["Unit testing", "JUnit", "Mockito", "SonarQube", "Checkmarx", "Postman", "Git", "GitLab"] },
    ],
    education: "Bachelor’s Degree in Computer Systems Engineering",
    languages: ["Spanish · Native", "English · Intermediate (B1)"],
    learning: "Developing skills in Go, Docker (basic), cloud platforms, and distributed systems.",
  },
};