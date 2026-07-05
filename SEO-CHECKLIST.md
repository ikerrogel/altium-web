# SEO-CHECKLIST — lo que depende de ti (fuera del código)

El código ya está optimizado (estructura, contenido, metadatos, JSON-LD, rendimiento). Estas tareas son las que **no** se pueden hacer desde el código y que marcan la diferencia para posicionar en Google.

---

## 0. Antes de nada: activar la indexación

La web está construida **lista para posicionar**, pero con `noindex` temporal en todas las páginas para no indexar la URL de GitHub (`ikerrogel.github.io`) antes de tener dominio propio. Google **no** la indexará mientras siga así.

- [ ] Comprar el dominio propio y migrar (ver `MIGRACION.md`).
- [ ] Quitar el `noindex` (buscar `<meta name="robots" content="noindex, follow">` con el comentario `QUITAR AL LANZAR CON DOMINIO PROPIO`).
- [ ] Sin dominio propio + indexación, el resto de este checklist no sirve para posicionar.

## 1. Google Business Profile (lo que MÁS mueve el ranking local)

- [ ] Crear/reclamar el perfil en [Google Business Profile](https://www.google.com/business/).
- [ ] Categoría principal: "Servicio de trabajos verticales" o "Empresa de mantenimiento de edificios"; secundarias: rehabilitación de fachadas, impermeabilización, empresa de reformas.
- [ ] NAP (nombre, dirección, teléfono) **idéntico** al de la web (`631 282 290`, dirección real cuando la tengas).
- [ ] Zona de servicio: Barcelona + L'Hospitalet, Badalona, Sant Cugat, Cornellà.
- [ ] Subir fotos reales de obras (antes/después, equipo, fachadas terminadas).
- [ ] Copiar el **Place ID** y activarlo en la web (botón de reseñas de la home / servicios).

## 2. Reseñas reales de Google

- [ ] Pedir reseña a cada cliente satisfecho (comunidades, administradores de fincas). Es el activo de confianza más difícil de copiar por la competencia.
- [ ] Cuando haya varias reseñas reales, incrustarlas en la home (sección de reseñas, ya preparada) y rellenar `[PENDIENTE: valoración en Google]`.
- [ ] Solo entonces se puede añadir `aggregateRating` al JSON-LD (inventarlo es penalizable).

## 3. Directorios y enlaces locales

- [ ] Alta en portales de servicios: **Habitissimo**, **Cronoshare**, **Houzz**, etc.
- [ ] Directorios de **administradores de fincas** de Barcelona y colegios profesionales.
- [ ] Directorios locales y de gremios de la construcción.
- [ ] Mantener el NAP idéntico en todos (nombre, dirección y teléfono exactos).

## 4. Google Search Console

- [ ] Dar de alta la propiedad del **dominio propio** (no la de github.io).
- [ ] Verificar la propiedad (DNS TXT).
- [ ] Enviar el sitemap: `https://TU-DOMINIO/sitemap.xml`.
- [ ] Inspeccionar la home y solicitar indexación.
- [ ] Revisar cobertura y consultas cada pocas semanas.

## 5. Verificaciones técnicas (rápidas, cuando esté en producción)

- [ ] Validar los JSON-LD en la [Prueba de resultados enriquecidos](https://search.google.com/test/rich-results) (LocalBusiness, Service, FAQPage, BreadcrumbList).
- [ ] Pasar [PageSpeed Insights](https://pagespeed.web.dev/) en móvil (objetivo 90+).
- [ ] Comprobar que no hay enlaces rotos ni marcadores `[PENDIENTE]` visibles al público.

## 6. Contenido continuo (Fases siguientes de la web)

- Fase 2: páginas de zona (Barcelona, L'Hospitalet, Badalona, Sant Cugat, Cornellà).
- Fase 3: blog / casos reales (ya planificados 3 artículos).
- Fase 4: Empresa y Contacto definitivos + legales.
- Publicar novedades/casos con cierta regularidad ayuda a mantener el posicionamiento.

> Nota de marca: "Altium" compite en Google con el software de PCB del mismo nombre. Orienta SIEMPRE la comunicación a **"Altium trabajos verticales Barcelona"** + Google Business, nunca a la marca sola. (Detalle en `ROADMAP-SEO.md`.)
