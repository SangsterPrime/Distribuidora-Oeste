# Distribuidora Oeste - VitalCO

Catálogo estático con carrito de compras: recargas de agua, huevos, accesorios, dispensadores eléctricos y organizadores.

## Cómo usar
- Abre el archivo `index.html` en tu navegador (doble clic).
- Filtra por categoría (Recargas de agua, Huevos, Accesorios, Dispensadores eléctricos, Organizadores, Todos los artículos) con las fichas superiores.
- Agrega productos con el botón “Agregar”.
- Abre el carrito con el botón 🛒; desde allí puedes sumar/restar o eliminar.
- El total incluye un IVA del 19% (editable en `controles.js`).

## Personalización rápida
- Cambiar precios o nombres: edita los atributos `data-*` de cada `<article class="producto">` en `index.html`.
- Moneda: se usa `Intl.NumberFormat('es-CO', { currency: 'COP' })` en `controles.js` (línea superior). Ajusta a tu país si lo deseas.
- Colores/tema: variables en `estilo.css` dentro de `:root`.

## Estructura
- `index.html`: contenido y estructura del catálogo y carrito.
- `estilo.css`: estilos responsive y tema oscuro.
- `controles.js`: lógica de filtros, carrito, totales e IVA (0.19), y persistencia en `localStorage`.

## Notas
- No requiere servidor ni dependencias: es HTML, CSS y JS puros.
- El carrito se guarda localmente en el navegador.
