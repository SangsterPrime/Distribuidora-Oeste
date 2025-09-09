# Changelog de Distribuidora Oeste

Todos los cambios notables de este proyecto se documentan aquí. Formato basado en
[Keep a Changelog](https://keepachangelog.com/es-ES/) y [SemVer](https://semver.org/lang/es/).

## [Unreleased]
### Añadido
- (pendiente)

### Cambiado
- Botón “Pedir por WhatsApp”: color más visible y armónico, con mejor foco accesible.
 - Preview del hero: carrusel estático y simple, 1 imagen por vista con scroll-snap centrado; sin controles en móvil y con flechas de navegación en escritorio.
 	Solo se mueven las imágenes (formato 1:1 con object-fit: cover), scrollbars ocultos.
- Compatibilidad iPhone/Android: safe areas en header/footer y mejoras táctiles (touch-action: pan-x pinch-zoom,
	desactivar selección/callout en la imagen) para swipe más fluido.

### Corregido
- Promo #1 en la preview: reencuadre de imagen (object-position) para que se aprecie mejor el contenido
	dentro del formato cuadrado, manteniendo “object-fit: cover” (sin bandas negras).
- Evitar aperturas accidentales de WhatsApp al deslizar el carrusel (guard de swipe antes del click).
 - Carga de imágenes en iPhone 14 dentro del slider: prioridad de carga en las 3 promos (loading=eager, fetchPriority=high)
 	y hints de render (backface-visibility, translateZ) para un scroll más fluido en iOS.
 - Imagen de Promo #2 actualizada a un asset existente (evita 404 intermitentes en Safari móvil).

### Eliminado
 - Puntos de paginación del carrusel en la preview del hero (la navegación es por swipe y, en escritorio, con flechas).

## [1.2.0] - 2025-09-08
### Añadido
- Vista previa de “Promociones destacadas” también en la portada (index), colocada dentro del hero entre el texto y el botón “Ver promociones”.
- Promoción #4: “Carbón al mayor 2x5” con imagen, precio mostrado “2 x $5.000” y CTA a WhatsApp.
- Nueva categoría/filtro “Carbón” en el catálogo y nuevo producto “Carbón 1 unidad” a $3.000 con opción de agregar al carrito y pedir por WhatsApp.
- Panel del carrito agregado a la página `html/promociones.html` (idéntico al de la portada), con formulario de Nombre/Dirección/Notas.

### Cambiado
- Presentación de imágenes en Promociones: relación de aspecto unificada (3/5) y “object-fit: cover” para evitar bandas negras; las promos #1, #2 y #3 quedan con el mismo “port”.
- Reubicada la sección de promociones del inicio: ahora la preview vive dentro del hero para mayor visibilidad.

### Corregido
- Las promos podían no mostrar imagen por un error de JS al no existir el panel de carrito en la página; se añadieron comprobaciones en `renderCarrito`, `abrirCarrito` y `cerrarCarrito` para tolerar páginas sin carrito y evitar el crash, permitiendo que el loader quite el skeleton.
- Comportamiento consistente de clic en tarjetas de promociones: además del botón, tocar la tarjeta abre WhatsApp (si no se pulsa otro control).

## [1.1.1] - 2025-09-05
### Cambiado
- Licencia S4ngster 2025: se aclara el alcance (permite despliegue público sin distribuir código), entornos/copias (dev/staging/prod y backups), privacidad/datos personales (uso de WhatsApp), duración/terminación, cesión por reorganización y disposiciones legales (acuerdo íntegro, divisibilidad, idioma).
- NOTICE: corrección de tipografía (“Distibuidora” → “Distribuidora”), se añade contacto y se precisa el tratamiento de terceros/atribuciones.
- Encabezados legales añadidos/actualizados en `index.html`, `estilo.css` y `controles.js`.

## [1.1.0] - 2025-09-05
### Añadido
- Frases naturales en el pedido de WhatsApp por ítem del carrito: p. ej., “Huevo(s) Extra x30” → “quiero 30 huevos extra”.
- Datos del cliente (Nombre, Dirección, Notas) incluidos en el mensaje a WhatsApp.
- Detección móvil/escritorio para abrir la app de WhatsApp o WhatsApp Web.
- Constante `WHATSAPP_NUMBER` para configurar el número en un solo lugar.

### Cambiado
- Flujo de WhatsApp: uso de `wa.me`/`web.whatsapp.com` según dispositivo y navegación en la misma pestaña para mejorar el prellenado del borrador.
- Al pedir por WhatsApp, el carrito se vacía (estado, `localStorage` y UI) antes de abrir el chat.
- Reasignación de categorías del catálogo:
	- “Pack para bidones” movido a Organizadores.
	- “Bomba eléctrica USB” y “Bomba USB Premium” movidas a Accesorios.
	- “Dispensador pedestal” movido a Dispensadores eléctricos.
- Actualización de precio: “Pack para bidones” ahora cuesta $55.000.
- README reescrito con instrucciones más claras (IVA incluido, WhatsApp, personalización y solución de problemas).
- Reinicio de animación del contador del carrito usando `getBoundingClientRect()` (evita el uso de `void`).

### Corregido
- Evitada la apertura de enlaces profundos de productos del catálogo de WhatsApp; ahora se fuerza chat directo con el número configurado.
- Mayor fiabilidad en el prellenado del mensaje en algunos navegadores.

### Eliminado
- Ítems de “Organizadores” que no aplicaban: “Organizador de cocina” y “Organizador de baño”.

## [1.0.0] - 2025-09-04
### Añadido
- Catálogo de productos estático (HTML/CSS/JS) con filtros por categoría.
- Carrito de compras con persistencia en `localStorage`, control de cantidades y eliminación.
- Toasts al agregar al carrito y contador animado.
- Imágenes con skeleton de carga y `object-fit: contain` (mejor presentación en móvil).
- Checkout por WhatsApp básico (abrir chat con resumen del pedido).
- Avisos de copyright/licencia en HTML, CSS y JS.
- Archivos de licencia/notificación (`LICENCE`, `NOTICE`).

### Cambiado
- Estilos responsivos y mejoras de accesibilidad en la estructura HTML y CSS.
- Precios mostrados con IVA incluido (sin desglose de IVA).

### Corregido
- Problemas visuales en móviles (barras negras en imágenes) y z-index del carrito/overlay.
