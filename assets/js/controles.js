/*
  © 2025 S4ngster — Licencia S4ngster 2025
  Uso interno de Distribuidora Oeste. No redistribuir.
*/


// Utilidades
const formato = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

// Estado
const estado = {
	carrito: /** @type {Record<string,{id:string,nombre:string,precio:number,cantidad:number}>} */ ({}),
};

// Configuración
const WHATSAPP_NUMBER = '56988000961'; // número en formato internacional sin '+'

// Persistencia
const STORAGE_KEY = 'empa_cafe_carrito_v1';
function cargarCarrito(){
	try{
		const raw = localStorage.getItem(STORAGE_KEY);
		if(raw){ estado.carrito = JSON.parse(raw) || {}; }
	}catch{}
}
function guardarCarrito(){
	try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(estado.carrito)); }catch{}
}

// Renderizado carrito
function renderCarrito(){
	const cont = $('#carritoItems');
	let subtotal = 0;
	const items = Object.values(estado.carrito);

	// Render dentro del panel solo si existe en la página actual
	if(cont){
		cont.innerHTML = '';
		if(items.length===0){
			cont.innerHTML = '<div class="vacio">Tu carrito está vacío. <a href="#menu">Ir al catálogo</a>.</div>';
		} else {
			items.forEach(item => {
				subtotal += item.precio * item.cantidad;
				const el = document.createElement('div');
				el.className = 'item';
				// Intentar usar la imagen del producto si existe en la tarjeta
				const card = document.querySelector(`.producto[data-id="${item.id}"] .producto__img img`);
				const thumb = card ? `<img src="${card.getAttribute('src')}" alt="${item.nombre}">` : `<span class="item__thumb item__thumb--emoji">🛒</span>`;
				el.innerHTML = `
					<div class="item__thumb">${thumb}</div>
					<div>
						<h4 class="item__titulo">${item.nombre}</h4>
						<div class="item__meta">${item.cantidad} x ${formato.format(item.precio)} = <span class="precio-linea">${formato.format(item.precio*item.cantidad)}</span></div>
					</div>
					<div class="item__controles">
						<div class="qty" role="group" aria-label="Cantidad">
							<button aria-label="Disminuir" data-accion="menos" data-id="${item.id}">−</button>
							<span aria-live="polite">${item.cantidad}</span>
							<button aria-label="Aumentar" data-accion="mas" data-id="${item.id}">+</button>
						</div>
						<button class="eliminar" title="Eliminar" data-accion="eliminar" data-id="${item.id}">Eliminar</button>
					</div>
				`;
				cont.appendChild(el);
			});
		}

		const total = subtotal; // precios con IVA incluido
		const subEl = $('#carritoSubtotal'); if(subEl) subEl.textContent = formato.format(subtotal);
		const totEl = $('#carritoTotal'); if(totEl) totEl.textContent = formato.format(total);
	}

	// Actualizar badge siempre que exista, aunque no haya panel de carrito
	const totalItems = items.reduce((a,c)=>a+c.cantidad,0);
	const badge = $('#contadorCarrito');
	if(badge){
		badge.textContent = String(totalItems);
		badge.classList.remove('badge--bump');
		// forzar reflow para reiniciar animación (sin usar 'void')
		badge.getBoundingClientRect();
		badge.classList.add('badge--bump');
	}

	guardarCarrito();
}

// Carrito: abrir/cerrar
function abrirCarrito(){
	const panel = $('#panelCarrito');
	const overlay = $('#overlay');
	if(panel){
		panel.classList.add('abierto');
		panel.setAttribute('aria-hidden','false');
	}
	if(overlay) overlay.hidden = false;
}
function cerrarCarrito(){
	const panel = $('#panelCarrito');
	const overlay = $('#overlay');
	if(panel){
		panel.classList.remove('abierto');
		panel.setAttribute('aria-hidden','true');
	}
	if(overlay) overlay.hidden = true;
}

// Lógica de productos
function agregarAlCarrito(desdeNodo){
	const id = desdeNodo.getAttribute('data-id');
	const nombre = desdeNodo.getAttribute('data-nombre');
	const precio = Number(desdeNodo.getAttribute('data-precio')) || 0;
	if(!id) return;
	const existente = estado.carrito[id];
	if(existente){ existente.cantidad += 1; }
	else { estado.carrito[id] = { id, nombre, precio, cantidad: 1 }; }
	renderCarrito();
		mostrarToast(`${nombre} se ha agregado al carrito`, true);
}

function cambiarCantidad(id, delta){
	const item = estado.carrito[id];
	if(!item) return;
	item.cantidad += delta;
	if(item.cantidad <= 0) delete estado.carrito[id];
	renderCarrito();
}

function eliminarItem(id){
	delete estado.carrito[id];
	renderCarrito();
}

// Filtros
function aplicarFiltro(filtro){
	$$('.chip').forEach(b=>b.classList.toggle('activa', b.dataset.filtro===filtro));
	$$('#listaProductos .producto').forEach(card=>{
		const cat = card.getAttribute('data-categoria');
		const visible = (filtro==='todos') || (cat===filtro);
		card.style.display = visible ? '' : 'none';
	});
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
	cargarCarrito();
	renderCarrito();
	const anio = new Date().getFullYear();
	const elAnio = $('#anio'); if(elAnio) elAnio.textContent = String(anio);

	// Manejo de carga de imágenes (quita skeleton y marca error)
	$$('.producto__img img').forEach(img=>{
		const cont = img.parentElement;
		const listo = ()=>cont?.classList.remove('img-cargando');
		const error = ()=>{ cont?.classList.remove('img-cargando'); cont?.classList.add('img-error'); };
		if(img.complete){
			// Imagen ya cargada o fallida
			if(img.naturalWidth>0) listo(); else error();
		}else{
			img.addEventListener('load', listo, { once:true });
			img.addEventListener('error', error, { once:true });
		}
	});

	// Clicks globales (delegación)
	document.body.addEventListener('click', (ev)=>{
		const tgt = ev.target;
		if(!(tgt instanceof Element)) return;

		// Abrir/Cerrar carrito
		if(tgt.closest('#abrirCarrito')){ abrirCarrito(); return; }
		if(tgt.closest('#cerrarCarrito') || tgt.closest('#overlay')){ cerrarCarrito(); return; }

		// Agregar desde tarjeta
		const add = tgt.closest('.add-to-cart');
		if(add){
			const card = add.closest('.producto');
			if(card){ agregarAlCarrito(card); }
			return;
		}

		// Pedir por WhatsApp (desde tarjeta)
		const pedirWsp = tgt.closest('.pedir-wsp');
		if(pedirWsp){
			const card = pedirWsp.closest('.producto');
			if(card){
				const nombre = card.getAttribute('data-nombre') || '';
				const precio = Number(card.getAttribute('data-precio')) || 0;
				const texto = `Hola, quiero pedir:\n• ${nombre}${precio>0?` (${formato.format(precio)})`:''}\n¿Me confirmas disponibilidad y tiempo de entrega?`;
				openWhatsApp(texto);
			}
			return;
		}

		// Click en tarjeta de promociones: abrir WhatsApp al tocar la tarjeta (si no es botón)
		const promoCard = tgt.closest('#listaPromos .producto');
		if(promoCard && !tgt.closest('button')){
			const nombre = promoCard.getAttribute('data-nombre') || '';
			const precio = Number(promoCard.getAttribute('data-precio')) || 0;
			const texto = `Hola, me interesa la promoción:\n• ${nombre}${precio>0?` (${formato.format(precio)})`:''}\n¿Me confirmas disponibilidad y tiempo de entrega?`;
			openWhatsApp(texto);
			return;
		}

		// Filtros
		const chip = tgt.closest('.chip');
		if(chip){ aplicarFiltro(chip.getAttribute('data-filtro') || 'todos'); return; }

		// Controles del carrito (mas/menos/eliminar)
		const accionBtn = tgt.closest('[data-accion]');
		if(accionBtn){
			const id = accionBtn.getAttribute('data-id');
			const acc = accionBtn.getAttribute('data-accion');
			if(!id || !acc) return;
			if(acc==='mas') cambiarCantidad(id, +1);
			else if(acc==='menos') cambiarCantidad(id, -1);
			else if(acc==='eliminar') eliminarItem(id);
			return;
		}
	});

	// Teclas: Esc para cerrar carrito
	document.addEventListener('keydown', (e)=>{
		if(e.key === 'Escape') cerrarCarrito();
	});

	// Botón pagar por WhatsApp (desde el carrito)
	const btnPagar = $('#btnPagar');
	if(btnPagar){
		btnPagar.addEventListener('click', ()=>{
			const items = Object.values(estado.carrito);
			if(items.length===0){ mostrarToast('Tu carrito está vacío'); return; }
			const subtotal = items.reduce((a,c)=> a + (c.precio*c.cantidad), 0);
			const lineas = items.map(item => `• ${construirFraseNatural(item)}`);
			const nombre = ($('#cliNombre')?.value || '').trim();
			const direccion = ($('#cliDireccion')?.value || '').trim();
			const notas = ($('#cliNotas')?.value || '').trim();
			const texto = [
				'Hola, quiero hacer un pedido en Distribuidora Oeste - VitalCO:',
				'',
				...lineas,
				'',
				`Total: ${formato.format(subtotal)}`,
				'',
				nombre ? `Nombre: ${nombre}` : null,
				direccion ? `Dirección: ${direccion}` : null,
				notas ? `Notas: ${notas}` : null,
				nombre||direccion||notas ? '' : null,
				'¿Me confirmas disponibilidad y tiempo de entrega?'
			].filter(Boolean).join('\n');

			// Vaciar carrito tras solicitar el pedido
			estado.carrito = {};
			guardarCarrito();
			renderCarrito();
			openWhatsApp(texto);
		});
	}

	// Formatear etiquetas de precio iniciales basadas en data-precio si existen
	$$('[data-precio-texto]').forEach(el=>{
		const card = el.closest('.producto');
		const fijo = el.hasAttribute('data-fijo');
		if(fijo) return; // respeta el texto fijo del HTML
		const precio = Number(card?.getAttribute('data-precio')) || 0;
		if(precio>0) el.textContent = formato.format(precio);
	});

	aplicarFiltro('todos');

	// Slider estático y amigable: sin flechas ni puntos; solo swipe/scroll
	const carrusel = $('#listaPromos.scroll-promos');
	if(carrusel){
		// Evitar aperturas accidentales de WhatsApp durante el swipe horizontal
		let startX = 0, startY = 0, moved = false;
		carrusel.addEventListener('pointerdown', (e)=>{ startX = e.clientX; startY = e.clientY; moved = false; }, { passive:true });
		carrusel.addEventListener('pointermove', (e)=>{
			if(Math.abs(e.clientX - startX) > 8 || Math.abs(e.clientY - startY) > 8){ moved = true; }
		}, { passive:true });
		carrusel.addEventListener('click', (e)=>{
			if(moved){ e.stopPropagation(); e.preventDefault(); }
		}, true);
	}

			// Construye una frase natural por ítem, p.ej. "Huevo Extra x30" -> "quiero 30 huevos extra"
				function construirFraseNatural(item){
				try{
					const nombre = (item.nombre || '').trim();
					const lower = nombre.toLowerCase();
					// Huevos Extra xN o Huevos Extra caja xN
						let m = lower.match(/huevos?\s+extra.*x\s*(\d+)/i);
					if(m){
						const pack = parseInt(m[1],10) || 0;
						const total = Math.max(1, pack * (item.cantidad||1));
						return `quiero ${total} huevos extra`;
					}
					// Huevos Súper xN
					m = lower.match(/huevos?\s+s[uú]per.*x\s*(\d+)/i);
					if(m){
						const pack = parseInt(m[1],10) || 0;
						const total = Math.max(1, pack * (item.cantidad||1));
						return `quiero ${total} huevos súper`;
					}
					// Recarga xN botellones 20L
						m = lower.match(/recargas?\s*x\s*(\d+)\s+botell[oó]n(?:es)?\s*20\s*l/i);
					if(m){
						const pack = parseInt(m[1],10) || 0;
						const total = Math.max(1, pack * (item.cantidad||1));
						return `quiero ${total} recargas de 20 litros`;
					}
					// Fallback genérico
					const cant = item.cantidad || 1;
					const etiqueta = nombre;
					return `quiero ${cant} ${etiqueta}`;
				}catch{
					return `quiero ${item.cantidad||1} ${item.nombre||''}`.trim();
				}
			}

			// Abrir WhatsApp con texto prellenado (manejo móvil vs escritorio)
			function openWhatsApp(texto){
				const t = encodeURIComponent(texto);
				const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
				const url = isMobile
					? `https://wa.me/${WHATSAPP_NUMBER}?text=${t}`
					: `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${t}`;
				// Navegar en la misma pestaña mejora la fiabilidad del borrador en algunos navegadores
				location.href = url;
			}


});

	// UI: Toasts
	function mostrarToast(mensaje, ctaVerCarrito=false){
		const cont = $('#toasts');
		if(!cont) return;
		const el = document.createElement('div');
		el.className = 'toast';
		el.innerHTML = `<span class="toast__icon">✅</span><span>${mensaje}</span>`;
		if(ctaVerCarrito){
			const btn = document.createElement('button');
			btn.className = 'btn btn--ghost';
			btn.textContent = 'Ver carrito';
			btn.addEventListener('click', ()=>{
				abrirCarrito();
			}, { once:true });
			el.appendChild(btn);
		}
		cont.appendChild(el);
		setTimeout(()=>{
			el.style.transition = 'opacity .2s ease, transform .2s ease';
			el.style.opacity = '0';
			el.style.transform = 'translate(-50%, -6px)';
			setTimeout(()=>el.remove(), 220);
		}, 1800);
	}

