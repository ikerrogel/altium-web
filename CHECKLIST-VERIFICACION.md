# Checklist de verificación — Altium

Pruebas a pasar antes de dar por buena la web (y de nuevo tras migrar al dominio propio). Estado a fecha de la última optimización.

---

## 1. Datos estructurados (JSON-LD)

- [ ] Validar **todas** las páginas en el [Validador de Schema.org](https://validator.schema.org/) y en la [Prueba de resultados enriquecidos de Google](https://search.google.com/test/rich-results).
- [x] Sintaxis JSON correcta en los 16 bloques (validado localmente, 0 errores).
- [x] `HomeAndConstructionBusiness` en todas las páginas de contenido.
- [x] `FAQPage` en `trabajos-verticales.html`, `reformas.html` y `contacto.html`, con preguntas y respuestas **idénticas** al texto visible.
- [x] `BreadcrumbList` en `trabajos-verticales`, `reformas`, `nosotros` y `contacto`.
- [x] **Sin** `aggregateRating` (no hay reseñas verificables todavía).
- [ ] Al rellenar dirección/NIF reales, revalidar (`address` completo).

## 2. Rendimiento (PageSpeed Insights)

- [ ] Pasar [PageSpeed Insights](https://pagespeed.web.dev/) en **móvil** con objetivo **90+**.
- [x] Imágenes en **WebP** con `<picture>` y fallback JPG.
- [x] `srcset`/`sizes` con dos tamaños (800/1600) según el layout.
- [x] Primera imagen visible de cada página: `fetchpriority="high"` + `preload`; el resto `loading="lazy"`.
- [x] `width` y `height` en todas las imágenes (anti-CLS).
- [x] Fuentes reducidas a 2 familias / 4 pesos, con `display=swap` y `preconnect`.
- [x] CSS y JS minificados; `<script defer>`.

## 3. Imágenes

- [x] **Cero** imágenes sin `width`/`height` (verificado en las páginas optimizadas).
- [x] **Cero** `alt` vacíos no decorativos: los únicos `alt=""` son fondos decorativos (`.ph-media`) y llevan `aria-hidden="true"`.
- [ ] Sustituir las fotos placeholder de `proceso/` y `proyecto/` por fotos reales cuando estén disponibles (regenerar sus WebP).

## 4. Enlaces y placeholders

- [ ] **Cero** enlaces rotos (revisar con un rastreador, p. ej. la extensión "Check My Links" o [validator.w3.org/checklink](https://validator.w3.org/checklink/)).
- [x] El botón de reseñas con `PON-AQUI-TU-PLACE-ID` está **comentado** (no hay enlace roto visible).
- [ ] Placeholders pendientes de rellenar por el cliente (NO tocar hasta tener los datos):
  - `[DIRECCIÓN - PENDIENTE]`, `[CÓDIGO POSTAL]` (schema, aviso legal, privacidad, footer NAP).
  - `[RAZÓN SOCIAL - PENDIENTE]`, `[NIF/CIF - PENDIENTE]` (aviso legal, privacidad).
  - Clave de Web3Forms en `contacto.html` (ya puesta; verificar que llegan los correos).

## 5. Metadatos

- [x] `title` único por página (< 60 caracteres).
- [x] `meta description` única por página (≤ 155 caracteres).
- [x] `canonical` autorreferente en cada página.
- [x] `og:image` real 1200×630 (< 300 KB) con `og:image:width/height/alt` y `twitter:image`.
- [x] Favicons (`favicon.ico`, `icon-192`, `icon-512`, `apple-touch-icon`) y `site.webmanifest`.

## 6. Indexación (fase github.io)

- [x] `<meta name="robots" content="noindex, follow">` en **todas** las páginas indexables (marcado con `<!-- QUITAR AL LANZAR CON DOMINIO PROPIO -->`).
- [x] `landing.html` en `noindex` (intencionado).
- [x] Marcadores `<!-- BASE_URL -->` en `canonical`/`og:url`/`og:image`/`twitter:image`, `sitemap.xml` y `robots.txt`.
- [ ] **Al migrar:** quitar los `noindex` (ver `MIGRACION.md`) y comprobar en Search Console que se indexa el dominio nuevo.

## 7. Accesibilidad

- [x] Enlace "Saltar al contenido" al inicio del `<body>` de cada página.
- [x] Cero enlaces/botones sin nombre accesible (verificado).
- [x] Contraste AA revisado: textos sobre imágenes con overlay oscuro; gris de etiquetas oscurecido para cumplir AA.
- [ ] Repaso final con Lighthouse (pestaña Accesibilidad) apuntando a 95+.

---

### Leyenda
`[x]` hecho y verificado en esta optimización · `[ ]` pendiente (requiere datos del cliente, el dominio propio o una herramienta externa).
