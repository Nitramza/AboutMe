# CV de Martin Vazquez Islas

CV web bilingüe en Next.js App Router, TypeScript y Tailwind CSS. Incluye modo claro/oscuro, LinkedIn, experiencia, casos técnicos, habilidades y dos PDF generados con Chromium. La aplicación se exporta como archivos estáticos; no necesita backend en producción.

## Requisitos

- Node.js 24 LTS y npm.
- En este equipo también se preparó una instalación portable en `.tools/`, ignorada por Git. No es parte de la aplicación ni se debe publicar.

## Desarrollo

```powershell
npm ci
npm run dev
```

Abre `http://127.0.0.1:3000`. Si Node no está en el PATH de este equipo, puedes usar temporalmente:

```powershell
$env:Path = (Join-Path $PWD '.tools/node-v24.22.3-win-x64') + ';' + $env:Path
npm run dev
```

## Datos y documentos

- Actualiza `src/data/cvData.ts`: es la fuente de datos para la web y las vistas imprimibles en español e inglés.
- Las experiencias no muestran empresas ni fechas de inicio del puesto actual porque esos datos no figuraban en los documentos originales.
- Los casos técnicos se basan en la experiencia documentada. No se incluyen enlaces ficticios a repositorios o demos.
- Se conserva el nivel de inglés B1; la calidad de la redacción en inglés no representa una nueva acreditación del titular.
- Los PDF originales permanecen intactos en la raíz. Los rediseñados son `public/cv.pdf` y `public/cv-en.pdf`.

Con el servidor de desarrollo en marcha, regenera los PDF y sus vistas previas:

```powershell
npx playwright install chromium
npm run pdf
```

El script comprueba que el contenido no se solape con los pies de página. También puedes revisar `/resume/es/` y `/resume/en/` en el navegador. Para un servidor en otro puerto, configura `CV_BASE_URL` antes de ejecutar el script.

## Validación y exportación

```powershell
npm run typecheck
npm run lint
npm test
npm run build
```

Las pruebas de navegador requieren el servidor de desarrollo y los PDF generados. Cubren móvil/escritorio, ambos temas, idiomas, imágenes, descargas, teclado y movimiento reducido. Las capturas se guardan en `test-results/`.

El build genera `out/`, incluidos los PDF, las imágenes y las rutas imprimibles. Regenera los PDF después de cambiar los datos y antes de compilar. El workflow `ci.yml` comprueba tipos, lint y exportación sin publicar el sitio.

## GitHub Pages

Repositorio: `https://github.com/Nitramza/AboutMe`. El workflow `.github/workflows/deploy.yml` compila y publica la exportación estática al hacer push a `master`; `develop` queda para cambios. Configura `NEXT_PUBLIC_BASE_PATH=/AboutMe` durante el build. Next.js incorpora el prefijo en sus recursos y la aplicación lo aplica a las vistas previas y a los enlaces de descarga.

En GitHub, selecciona **Settings > Pages > Build and deployment > Source: GitHub Actions**. La rama `master` es la fuente de publicación del workflow. Los cambios se integran primero en `develop` y se promueven a `master` cuando estén listos.

La URL esperada es `https://nitramza.github.io/AboutMe/`, una vez publicado correctamente el workflow. Esta configuración no confirma que la publicación remota haya ocurrido.