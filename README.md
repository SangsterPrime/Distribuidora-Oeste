# Empa & Café

Sitio estático de venta de empanadas, café y postres con carrito de compras.

## Cómo usar
- Abre el archivo `index.html` en tu navegador (doble clic).
- Filtra por categoría (Empanadas, Café, Postres) con las fichas superiores.
- Agrega productos con el botón “Agregar”.
- Abre el carrito con el botón 🛒; desde allí puedes sumar/restar o eliminar.
- El total incluye un IVA del 19% (editable en `controles.js`).

## Personalización rápida
- Cambiar precios o nombres: edita los atributos `data-*` de cada `<article class="producto">` en `index.html`.
- Moneda: se usa `Intl.NumberFormat('es-CO', { currency: 'COP' })` en `controles.js` (línea superior). Ajusta a tu país si lo deseas.
- Colores/tema: variables en `estilo.css` dentro de `:root`.

## Estructura
- `index.html`: contenido y estructura del menú y carrito.
- `estilo.css`: estilos responsive y tema oscuro.
- `controles.js`: lógica de filtros, carrito, totales e IVA, y persistencia en `localStorage`.

## Notas
- No requiere servidor ni dependencias: es HTML, CSS y JS puros.
- El carrito se guarda localmente en el navegador.
