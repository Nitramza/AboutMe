---
name: ui-cv-sections
description: "Usar para crear o actualizar la UI de un CV o portafolio con Next.js App Router, TypeScript estricto y Tailwind CSS: datos cvData.ts, secciones Hero, Experience, Projects y Skills, y composición de page.tsx compatible con GitHub Pages."
argument-hint: "Crear las secciones del CV con datos de ejemplo o actualizar secciones concretas con mis datos."
---

# Generador de UI y estructura de datos para CV

## Resultado

Genera o actualiza una estructura de datos tipada y cuatro secciones de CV, ensambladas en la página principal. Separa el contenido personal de la presentación y conserva la compatibilidad con la exportación estática de Next.js para GitHub Pages.

## Cuándo usar

- Al crear las secciones visuales de un CV o portafolio con Next.js y Tailwind CSS.
- Al personalizar datos, añadir experiencia o proyectos, o actualizar estas secciones.
- No uses este flujo para desplegar el sitio ni para añadir servicios de backend.

## Procedimiento

### 1. Revisar y delimitar

- Lee las instrucciones del proyecto, la configuración de Next.js y TypeScript, los scripts disponibles y los archivos afectados que ya existan.
- Reutiliza la versión de Tailwind, los estilos, los componentes y las utilidades del proyecto. No migres dependencias ni reorganices archivos ajenos a la tarea.
- Si no existe una aplicación Next.js, explica el requisito y solicita autorización para inicializarla mediante el flujo de creación de proyectos antes de continuar. No generes una estructura incompleta como si fuera ejecutable.
- Para una actualización parcial, limita el trabajo a las secciones solicitadas y sus dependencias directas.
- Antes de generar o actualizar las secciones, comprueba si existe `public/cv.pdf`. Si falta, pide al usuario el PDF o su ruta local y espera a que esté disponible antes de continuar. Si debes copiarlo a `public/cv.pdf`, incluye esa operación en el lote que requiere aprobación.
- Antes de crear o modificar varios archivos, presenta sus rutas, componentes y propósito, solicita confirmación y espera la respuesta. Si cambia el alcance aprobado, vuelve a pedir confirmación.

### 2. Preparar los datos

En `src/data/cvData.ts`:

- Define y exporta interfaces `Profile`, `ExperienceItem`, `ProjectItem` y `SkillCategory`; tipa también el objeto raíz mediante una interfaz `CVData` o el patrón equivalente existente.
- `Profile`: nombre, título profesional, resumen de impacto, enlaces a GitHub y LinkedIn y ruta del PDF. Usa `/cv.pdf` como ruta lógica inicial.
- `ExperienceItem`: identificador estable, empresa, puesto, fechas y lista de logros.
- `ProjectItem`: identificador estable, nombre, descripción corta, tecnologías y enlaces opcionales al código y a la demo.
- `SkillCategory`: nombre de categoría y lista de habilidades. Incluye Frontend, Backend, Bases de Datos y Herramientas en los datos de ejemplo.
- Exporta `cvData` con perfil, experiencia, proyectos y categorías. Usa TypeScript estricto, sin `any`, y conserva los datos reales existentes.
- En una creación nueva sin datos personales, usa ejemplos claramente identificados como ficticios y listos para personalizar. Los logros cuantificables de ejemplo no deben presentarse como hechos del usuario. No inventes URLs de perfiles o demos reales; omite enlaces desconocidos.
- Toda la información personal debe venir de este módulo, no quedar duplicada en los componentes. Los textos fijos de interfaz pueden permanecer en la presentación.

### 3. Crear o actualizar las secciones

En `src/components/`, crea o adapta estos componentes con props tipadas que reciban los datos desde la página:

- **`Hero.tsx`:** nombre como único `h1`, título profesional, resumen de impacto, enlaces disponibles a GitHub y LinkedIn y control destacado con el texto "Descargar CV (PDF)". Para una descarga disponible, usa un enlace con atributo `download` y un icono de descarga de la biblioteca existente.
- **`Experience.tsx`:** línea de tiempo vertical limpia con empresa, puesto, fechas y viñetas de logros; usa listas semánticas e identificadores estables como claves.
- **`Projects.tsx`:** grid responsivo de tarjetas con nombre, descripción corta, badges de tecnologías y enlaces "Código (GitHub)" y "Demo en vivo" cuando existan. No muestres enlaces vacíos ni `href="#"` como sustitutos.
- **`Skills.tsx`:** agrupación por categorías con etiquetas minimalistas y listas semánticas.
- Mantén los componentes estáticos como Server Components. Añade `"use client"` únicamente donde la interacción lo requiera.
- Usa iconos de la biblioteca ya instalada; si no hay ninguna, propone Lucide e incluye su instalación en el lote que requiere aprobación. No dibujes SVG manualmente como sustituto de iconos disponibles.
- Si una sección no tiene datos, evita encabezados o contenedores vacíos y conserva una composición legible.

### 4. Ensamblar la página y comprobar recursos

- En `src/app/page.tsx`, importa `cvData` y ensambla `Hero`, `Experience`, `Projects` y `Skills`, en ese orden, dentro de `max-w-3xl mx-auto px-6 py-16`.
- Mantén excelente legibilidad, diseño Mobile-First y soporte para modo claro y oscuro, reutilizando el mecanismo de tema existente. Si hace falta crear uno, inclúyelo en la propuesta antes de editar archivos adicionales.
- Usa jerarquía semántica, foco visible, contraste accesible y enlaces externos seguros. Evita texto desbordado, tarjetas anidadas y animaciones que ignoren `prefers-reduced-motion`.
- Usa el PDF proporcionado y comprueba que esté disponible en `public/cv.pdf` antes de habilitar la descarga. No generes un PDF vacío ni sustituyas el archivo por uno ficticio. Si deja de estar disponible, detén el flujo y pide de nuevo el recurso.
- La ruta lógica `/cv.pdf` debe resolverse con el `basePath` configurado cuando el sitio se publique bajo un repositorio. Reutiliza una utilidad de rutas existente si la hay y comprueba también los demás recursos locales; no antepongas `basePath` a URLs externas.
- Conserva `output: "export"`; no introduzcas SSR dinámico, Server Actions ni endpoints que necesiten servidor. Si usas `next/image`, requiere `images: { unoptimized: true }`.

### 5. Validar y entregar

- Ejecuta las comprobaciones de tipos, lint y build disponibles y pertinentes. No afirmes que una comprobación pasó si no se ejecutó.
- Verifica que el build produzca `out/` y que los datos y componentes sean compatibles con la exportación estática.
- Con las herramientas de navegador disponibles, revisa móvil y escritorio, ambos modos de color, navegación por teclado, ausencia de desbordamientos y enlaces a perfiles, proyectos y PDF. Para el PDF, confirma que devuelve el recurso correcto bajo la ruta de publicación, no una página HTML de error.
- Si faltan datos, enlaces, PDF o herramientas de validación, informa de esas limitaciones sin simular resultados ni ampliar el alcance por tu cuenta.
- Termina con un resumen breve de archivos cambiados, comprobaciones y contenido pendiente de personalizar. No hagas commits ni publiques el sitio sin autorización explícita.

## Criterios de finalización

- Los datos están tipados y centralizados en `src/data/cvData.ts`.
- Las cuatro secciones y la página están implementadas para el alcance aprobado, sin duplicar contenido personal.
- La UI es responsiva, accesible y legible en modo claro y oscuro.
- No hay enlaces ficticios presentados como reales ni descargas activas hacia un PDF inexistente.
- La exportación estática y las comprobaciones disponibles pasan, o sus bloqueos están indicados explícitamente.