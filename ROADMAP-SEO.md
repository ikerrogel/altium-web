# Roadmap SEO — Altium (post-lanzamiento)

Plan de posicionamiento local una vez la web esté en su dominio propio (ver `MIGRACION.md`). Ordenado por impacto.

---

## 0. Nota estratégica de marca (IMPORTANTE)

La palabra **"Altium" a secas** compite en Google con **Altium**, el software de diseño de PCB (una empresa con enorme autoridad de dominio). Es prácticamente imposible posicionar por la marca sola, y además atraería visitas irrelevantes.

**Conclusión:** toda la estrategia debe orientarse a la **intención local + servicio**, no a la marca:

- Palabras clave objetivo: *"trabajos verticales Barcelona"*, *"rehabilitación de fachadas Barcelona"*, *"impermebilización cubiertas Barcelona"*, *"trabajos verticales L'Hospitalet"*, etc.
- El activo más importante para competir es el **perfil de Google Business Profile** (mapa/local pack), no la web sola.
- En títulos y textos, acompañar siempre "Altium" de "trabajos verticales" y de la ciudad.

---

## 1. Google Business Profile (máxima prioridad)

Es lo que más rápido trae clientes en servicios locales.

- [ ] Dar de alta el negocio en [Google Business Profile](https://www.google.com/business/).
- [ ] Categoría principal: **"Servicio de trabajos verticales"** o **"Contratista"** / **"Empresa de reformas"**; añadir categorías secundarias (impermeabilización, rehabilitación de edificios).
- [ ] Rellenar NAP (nombre, dirección, teléfono) **idéntico** al de la web y el schema.
- [ ] Zona de servicio: Barcelona y municipios del área metropolitana.
- [ ] Subir **fotos reales** de trabajos (antes/después, equipo, fachadas terminadas).
- [ ] Teléfono 631 282 290 y enlace a la web.
- [ ] Conseguir las primeras **reseñas reales** de clientes.
- [ ] Una vez creado, copiar el **Place ID** y:
  - Reactivar el botón "Ver reseñas en Google" (ahora comentado con `<!-- TODO: activar cuando exista perfil de Google Business con su Place ID -->` en `index.html`, `nosotros.html` y `landing.html`), sustituyendo `PON-AQUI-TU-PLACE-ID`.
  - Añadir el bloque de reseñas reales.
- [ ] Cuando haya reseñas verificables, valorar añadir `aggregateRating` al JSON-LD (NO antes: inventarlo es penalizable).

---

## 2. Páginas servicio + ciudad (contenido único)

Crear una página por combinación de servicio y municipio, con **contenido único** (no copiar-pegar cambiando el nombre de la ciudad: Google penaliza el contenido duplicado).

Plantilla de URLs sugerida:

- `/trabajos-verticales-hospitalet.html`
- `/trabajos-verticales-badalona.html`
- `/rehabilitacion-fachadas-sant-cugat.html`
- `/impermeabilizacion-cornella.html`

Cada página debe tener:

- Título y meta description propios con servicio + ciudad.
- Texto original: barrios/zonas concretas, tipo de edificios de esa localidad, un caso o ejemplo local.
- Su propio `canonical`, `og:url` y JSON-LD (`HomeAndConstructionBusiness` con `areaServed` de esa ciudad + `BreadcrumbList`).
- Enlaces internos desde y hacia la home y la página de servicio general.

Municipios prioritarios (coherentes con el `areaServed` actual): **L'Hospitalet de Llobregat, Badalona, Sant Cugat del Vallès, Cornellà de Llobregat**.

---

## 3. Casos de éxito (antes / después)

- [ ] Crear una sección o página de **proyectos reales** con fotos antes/después.
- [ ] Para cada caso: tipo de trabajo, problema, solución, ubicación (barrio/ciudad) y duración.
- [ ] Marcar cada caso con imágenes reales optimizadas (WebP + `width`/`height`).
- [ ] Es contenido único muy potente para posicionar y para convertir visitas en presupuestos.

---

## 4. Versión en catalán (hreflang)

Barcelona es bilingüe; una versión en catalán amplía el alcance.

- [ ] Duplicar las páginas principales en catalán (`/ca/` o sufijo `-ca`).
- [ ] Añadir etiquetas `hreflang` recíprocas en el `<head>`:
  ```html
  <link rel="alternate" hreflang="es" href="https://TU-DOMINIO.es/trabajos-verticales.html">
  <link rel="alternate" hreflang="ca" href="https://TU-DOMINIO.es/ca/treballs-verticals.html">
  <link rel="alternate" hreflang="x-default" href="https://TU-DOMINIO.es/trabajos-verticales.html">
  ```
- [ ] Traducción real (no automática sin revisar) y `lang="ca"` en esas páginas.

---

## 5. Mantenimiento continuo

- [ ] Publicar novedades/proyectos cada cierto tiempo (contenido fresco).
- [ ] Revisar Search Console: consultas, CTR, errores de cobertura.
- [ ] Conseguir enlaces locales (directorios de gremios, asociaciones, administradores de fincas).
- [ ] Pedir reseñas a cada cliente satisfecho.
- [ ] Revisar cada trimestre el `CHECKLIST-VERIFICACION.md`.
