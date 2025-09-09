# Distribuidora Oeste - VitalCO

Catálogo estático con carrito y pedido por WhatsApp. Pensado para vender recargas de agua, huevos, accesorios, dispensadores eléctricos y organizadores sin usar frameworks ni servidor.

## Qué incluye
- Catálogo por categorías: Recargas de agua, Huevos, Huevos Súper, Carbón, Accesorios, Dispensadores eléctricos, Organizadores.
- Promociones: página dedicada con combos y CTA a WhatsApp, y vista previa en la portada (debajo del título del hero y encima del botón “Ver promociones”).
- Carrito moderno: miniaturas, subtotales por ítem, contador animado y persistencia en `localStorage`.
- Imágenes con skeleton.
	- Catálogo: ajuste “contain” (se ven completas) y en móvil evita bandas negras.
	- Promociones: relación 3/5 y `object-fit: cover` para que todas luzcan iguales sin bandas negras.
- Toasts al agregar (con botón “Ver carrito”).
- Formato de moneda COP (Intl.NumberFormat) y precios con IVA incluido (no se muestra línea de IVA).
- Checkout por WhatsApp con texto inteligente:
	- Frases naturales por ítem: p. ej., “Huevo(s) Extra x30” → “quiero 30 huevos extra”. “Recarga x3 botellón 20L” → “quiero 3 recargas de 20 litros”.
	- Incluye total + datos del cliente (Nombre, Dirección, Notas).
	- Detecta móvil/escritorio y abre la app o WhatsApp Web.
	- Vacía el carrito automáticamente después de solicitar el pedido.

## Cómo usar
1) Abre `index.html` en tu navegador.
2) Filtra por categoría y agrega productos con “Agregar”.
3) Abre el carrito (🛒), ajusta cantidades y completa tus datos.
4) Pulsa “Pedir por WhatsApp” para abrir el chat con el mensaje listo para enviar.

## Personalización rápida
- Cambiar productos (nombres, precios, categorías, imágenes): en `index.html`, edita los atributos `data-*` de cada `<article class="producto">`.
- Cambiar promociones (texto, imágenes, precios mostrados): en `html/promociones.html` edita las tarjetas dentro de `#listaPromos`.
- Número de WhatsApp: en `controles.js` cambia la constante `WHATSAPP_NUMBER`.
- Moneda: en `controles.js`, arriba, ajusta `Intl.NumberFormat('es-CO', { currency: 'COP' })`.
- Colores/tema: en `estilo.css`, variables dentro de `:root`.
- Frases naturales: en `controles.js`, función `construirFraseNatural(item)`. Reconoce “Huevo(s) Extra xN” y “Recarga xN botellón 20L”; para otros ítems usa un texto genérico. Puedes extender reglas ahí.

## Archivos
- `index.html`: estructura del sitio, hero con vista previa de promociones, tarjetas de productos y carrito.
- `html/promociones.html`: página de Promociones con tarjetas clicables a WhatsApp.
- `estilo.css`: tema oscuro, grillas, carrito, toasts, formulario y responsive.
- `controles.js`: lógica de filtros, carrito, persistencia, WhatsApp y formateo.

## Notas y solución de problemas
- IVA: los precios se entienden finales (IVA incluido). No hay desglose de IVA en el carrito.
- WhatsApp en escritorio: inicia sesión en https://web.whatsapp.com antes de pedir para que el borrador se prellene correctamente.
- Si tu navegador bloquea redirecciones/ventanas, desactiva el bloqueo para esta página.
- El carrito se guarda solo en el navegador del usuario (no hay servidor ni base de datos).
- Imágenes: coloca los archivos en `assets/img` respetando mayúsculas/minúsculas (ej.: `Promo1.jpg`, `promo3.jpg`). Si una promo no muestra imagen, verifica el nombre del archivo y la ruta.

## Licencia

Distribuido bajo **Licencia S4ngster 2025 (uso restringido)** — ver archivo LICENCE para detalles.
