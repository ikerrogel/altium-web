# Migración a dominio propio

Guía paso a paso para pasar la web de `https://ikerrogel.github.io/altium-web/` a un dominio propio (por ejemplo `https://www.altium-bcn.es/`) sin perder posicionamiento.

> **Estado actual:** la web está en GitHub Pages con `noindex` temporal en todas las páginas para que Google **no** indexe la URL de github.io. Así evitamos tener que hacer una migración SEO (redirecciones 301, pérdida de autoridad) más adelante.

---

## 0. Antes de empezar

- La URL base actual es: `https://ikerrogel.github.io/altium-web/`
- Está marcada en el código con el comentario `<!-- BASE_URL -->` junto a cada `canonical` y `og:url`, y con `<!-- BASE_URL ... -->` en `sitemap.xml` y `robots.txt`.
- La cadena exacta a buscar y reemplazar en TODO el proyecto es:
  ```
  https://ikerrogel.github.io/altium-web/
  ```
  Aparece en: `canonical`, `og:url`, `og:image`, `twitter:image`, los bloques JSON-LD (`url`, `image`, `logo`, BreadcrumbList), `sitemap.xml` y `robots.txt`.

---

## 1. Comprar el dominio

- Registrar el dominio (Namecheap, Google Domains, IONOS, DonDominio…).
- Recomendado: elegir un dominio que refuerce la marca local, p. ej. algo con "altium" + Barcelona/verticales, para no competir con "Altium" (software de PCB). Ver `ROADMAP-SEO.md`.

## 2. Reemplazar la BASE_URL en todos los archivos

Buscar y reemplazar en todo el proyecto:

- Buscar: `https://ikerrogel.github.io/altium-web/`
- Reemplazar por: `https://TU-DOMINIO.es/`  *(con la barra final)*

Archivos afectados: todos los `.html`, `sitemap.xml` y `robots.txt`.

> Nota: si el dominio se sirve desde la raíz (no desde `/altium-web/`), las rutas internas (que son **relativas**: `assets/...`, `trabajos-verticales.html`…) seguirán funcionando sin cambios.

## 3. Quitar el `noindex` temporal

En cada página `.html` (excepto `landing.html`, que debe seguir en `noindex`):

- Buscar: `<meta name="robots" content="noindex, follow"> <!-- QUITAR AL LANZAR CON DOMINIO PROPIO -->`
- Reemplazar por: `<meta name="robots" content="index, follow, max-image-preview:large">`

Revisar que NO queda ningún `noindex` accidental salvo en `landing.html`.

## 4. Configurar el dominio en GitHub Pages

1. Crear un archivo `CNAME` en la raíz del repositorio con una sola línea: el dominio (sin `https://`), p. ej. `www.altium-bcn.es`.
2. En GitHub → repositorio → **Settings → Pages → Custom domain**: escribir el dominio y guardar.
3. Marcar **Enforce HTTPS** (puede tardar unos minutos en habilitarse tras la verificación).

## 5. Configurar el DNS (en el registrador del dominio)

- Para un subdominio `www` → registro **CNAME** apuntando a `ikerrogel.github.io`.
- Para el dominio raíz (apex, sin `www`) → registros **A** a las IPs de GitHub Pages:
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```
  (y opcionalmente registros AAAA para IPv6).
- Recomendado: redirigir el apex al `www` (o viceversa) para tener una única versión canónica.

## 6. Alta y verificación en Google Search Console

1. Entrar en [Google Search Console](https://search.google.com/search-console) y añadir la propiedad del **dominio nuevo**.
2. Verificar la propiedad (registro TXT en el DNS o el método que ofrezca).
3. En **Configuración → Indexación**, comprobar que no hay bloqueos.

## 7. Enviar el sitemap

- En Search Console → **Sitemaps** → enviar: `https://TU-DOMINIO.es/sitemap.xml`.
- Comprobar que se procesa sin errores.

## 8. Comprobaciones finales

- [ ] `https://ikerrogel.github.io/altium-web/` redirige (o deja de servir) hacia el dominio nuevo — al añadir el `CNAME`, GitHub redirige automáticamente github.io al dominio propio.
- [ ] Todas las páginas cargan en `https://TU-DOMINIO.es/` con candado HTTPS.
- [ ] Los `canonical` apuntan al dominio nuevo (ver código fuente de cada página).
- [ ] El `sitemap.xml` y `robots.txt` usan el dominio nuevo.
- [ ] Ya no hay `noindex` salvo en `landing.html`.
- [ ] Validar de nuevo los JSON-LD (ver `CHECKLIST-VERIFICACION.md`).
- [ ] Solicitar indexación de la home en Search Console (Inspección de URLs).

---

## Resumen del find-and-replace

| Buscar | Reemplazar por |
|---|---|
| `https://ikerrogel.github.io/altium-web/` | `https://TU-DOMINIO.es/` |
| `<meta name="robots" content="noindex, follow"> <!-- QUITAR AL LANZAR CON DOMINIO PROPIO -->` | `<meta name="robots" content="index, follow, max-image-preview:large">` (todas menos `landing.html`) |
