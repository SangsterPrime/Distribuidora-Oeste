# Distribuidora Oeste - VitalCO

Catálogo estático con carrito y pedido por WhatsApp. Pensado para vender recargas de agua, huevos, accesorios, dispensadores eléctricos y organizadores sin usar frameworks ni servidor.

## Qué incluye
- Catálogo por categorías: Recargas de agua, Huevos, Accesorios, Dispensadores eléctricos, Organizadores.
- Carrito moderno: miniaturas, subtotales por ítem, contador animado y persistencia en `localStorage`.
- Imágenes con skeleton y ajuste “contain” (se ven completas). En móvil evita bandas negras.
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
- Número de WhatsApp: en `controles.js` cambia la constante `WHATSAPP_NUMBER`.
- Moneda: en `controles.js`, arriba, ajusta `Intl.NumberFormat('es-CO', { currency: 'COP' })`.
- Colores/tema: en `estilo.css`, variables dentro de `:root`.
- Frases naturales: en `controles.js`, función `construirFraseNatural(item)`. Reconoce “Huevo(s) Extra xN” y “Recarga xN botellón 20L”; para otros ítems usa un texto genérico. Puedes extender reglas ahí.

## Archivos
- `index.html`: estructura del sitio, tarjetas de productos y carrito.
- `estilo.css`: tema oscuro, grillas, carrito, toasts, formulario y responsive.
- `controles.js`: lógica de filtros, carrito, persistencia, WhatsApp y formateo.

## Notas y solución de problemas
- IVA: los precios se entienden finales (IVA incluido). No hay desglose de IVA en el carrito.
- WhatsApp en escritorio: inicia sesión en https://web.whatsapp.com antes de pedir para que el borrador se prellene correctamente.
- Si tu navegador bloquea redirecciones/ventanas, desactiva el bloqueo para esta página.
- El carrito se guarda solo en el navegador del usuario (no hay servidor ni base de datos).

## Licencia
Uso libre para fines personales o comerciales. Agradece con una estrella si te sirvió.
