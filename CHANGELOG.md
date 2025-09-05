# Changelog de Distribuidora Oeste

Todos los cambios notables de este proyecto se documentan aquí. Formato basado en
[Keep a Changelog](https://keepachangelog.com/es-ES/) y [SemVer](https://semver.org/lang/es/).

## [Unreleased]
### Añadido
- (pendiente)

### Cambiado
- (pendiente)

### Corregido
- (pendiente)

### Eliminado
- (pendiente)

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
