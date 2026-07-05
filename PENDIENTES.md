# PENDIENTES — datos y fotos que debes aportar

Lista de todos los marcadores `[PENDIENTE]` que hemos dejado en el código, agrupados por página. Cuando tengas cada dato, busca el marcador correspondiente en el archivo indicado y sustitúyelo. **No hemos inventado nada**: ni reseñas, ni certificaciones, ni precios, ni años.

> Consejo: para localizar un marcador, busca en el proyecto el texto entre corchetes (por ejemplo `[PENDIENTE: rangos de precio]`).

---

## 0. Datos globales (aparecen en el pie de página de TODAS las páginas y en las legales)

Estos son los más importantes porque se repiten en todo el sitio y en el aviso legal / privacidad:

- **`[DIRECCIÓN - PENDIENTE]` / `[CÓDIGO POSTAL]`** — dirección postal completa de Altium. Aparece en: el `address` del JSON-LD de cada página, el pie (`.foot-nap`) de todas y en `aviso-legal.html` y `politica-privacidad.html`.
- **`[RAZÓN SOCIAL - PENDIENTE]`** — nombre fiscal de la empresa. En `aviso-legal.html` y `politica-privacidad.html`.
- **`[NIF/CIF - PENDIENTE]`** — En `aviso-legal.html` y `politica-privacidad.html`.
- **Certificaciones y seguro de RC** — marcador `Certificaciones y seguro de RC: [PENDIENTE]` en el pie de cada página. Indica qué certificaciones reales tenéis (p. ej. formación en trabajos verticales, IRATA/similares si aplica) y la compañía/póliza del seguro de responsabilidad civil.

## 1. Home (`index.html`)

- **Sellos de confianza** (sección "Por qué Altium"):
  - `[PENDIENTE]` **número de obras realizadas** (una cifra real, aprox.).
  - `[PENDIENTE]` **valoración media en Google** (cuando exista el perfil con reseñas).
  - Certificaciones y seguro de RC (línea bajo los sellos).
- **Galería "Antes y después"** — 3 pares preparados (ampliables). Por cada uno:
  - `[PENDIENTE: foto antes]` y `[PENDIENTE: foto después]` — fotos reales de la misma obra.
  - `[PENDIENTE: barrio/zona]` — dónde se hizo (ej. "Eixample", "Gràcia").
  - Los `alt` ya están redactados; sustituye el `<div class="ph-photo">` por tu `<img>` real.
- **Reseñas** — no hay testimonios inventados. Cuando tengas el perfil de Google con reseñas reales, sigue las instrucciones del comentario HTML de esa sección (incrustar reseñas o activar el botón con el Place ID).

## 2. Páginas de servicio (`servicios/<servicio>/index.html`) — las 7

En **cada** página de servicio:

- **`[PENDIENTE: rangos de precio]`** — en el bloque "Precio y presupuesto". Un rango orientativo real (o déjalo si prefieres no publicar precios).
- **`[PENDIENTE: compromiso de respuesta...]`** — junto al formulario. Sustituye por tu compromiso real (p. ej. "Respuesta en menos de 24 h") o elimínalo si no quieres comprometerte a un plazo.
- **Sellos** junto al formulario: `[PENDIENTE]` obras realizadas y `[PENDIENTE]` valoración en Google (los mismos datos que en la home).
- En la **FAQ**: `[PENDIENTE: seguro de responsabilidad civil]` / `[PENDIENTE: seguro de responsabilidad civil y garantías]` — coberturas y garantías reales.

Específicos:

- **`servicios/impermeabilizacion/`** — `[PENDIENTE: garantía en años]` de la impermeabilización.
- **`servicios/rehabilitacion-de-fachadas/`** — `[PENDIENTE: seguro de responsabilidad civil y garantías]`.

## 3. Empresa (`nosotros.html`) y Contacto (`contacto.html`)

- Estas dos páginas se reescribirán a fondo en la Fase 4 (como `/empresa/` y `/contacto/`). De momento conservan su contenido anterior y el pie con los datos globales `[DIRECCIÓN...]`.
- **Web3Forms**: el formulario de contacto ya lleva tu clave `a042f8c2-...`. Verifica que te llegan los correos de prueba.

## 4. Legales (`aviso-legal.html`, `politica-privacidad.html`, `politica-cookies.html`)

- `[RAZÓN SOCIAL - PENDIENTE]`, `[NIF/CIF - PENDIENTE]`, `[DIRECCIÓN...]` — completar los datos del titular.

---

## Fotos reales que vendrían muy bien (para sustituir, no urgente)

- Hero de cada página de servicio: ahora usa una de tus fotos reales existentes; puedes cambiarla por la más representativa de ese servicio.
- Galería "antes y después" de la home (lo más potente para convertir): 3 a 6 pares reales.

Cuando envíes las fotos, dinos a qué servicio/sección va cada una y redactamos el `alt` optimizado (o usa el que ya está puesto).
