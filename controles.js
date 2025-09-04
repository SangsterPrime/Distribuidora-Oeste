// Utilidades
const formato = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

// Estado
const estado = {
	carrito: /** @type {Record<string,{id:string,nombre:string,precio:number,cantidad:number}>} */ ({}),
};

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
	cont.innerHTML = '';
	let subtotal = 0;
	Object.values(estado.carrito).forEach(item => {
		subtotal += item.precio * item.cantidad;
		const el = document.createElement('div');
		el.className = 'item';
		el.innerHTML = `
			<div>
				<h4 class="item__titulo">${item.nombre}</h4>
				<div class="precio">${formato.format(item.precio)}</div>
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

	const impuestos = Math.round(subtotal * 0.19);
	const total = subtotal + impuestos;
	$('#carritoSubtotal').textContent = formato.format(subtotal);
	$('#carritoImpuestos').textContent = formato.format(impuestos);
	$('#carritoTotal').textContent = formato.format(total);
	$('#contadorCarrito').textContent = String(Object.values(estado.carrito).reduce((a,c)=>a+c.cantidad,0));
	guardarCarrito();
}

// Carrito: abrir/cerrar
function abrirCarrito(){
	$('#panelCarrito').classList.add('abierto');
	$('#overlay').hidden = false;
	$('#panelCarrito').setAttribute('aria-hidden','false');
}
function cerrarCarrito(){
	$('#panelCarrito').classList.remove('abierto');
	$('#overlay').hidden = true;
	$('#panelCarrito').setAttribute('aria-hidden','true');
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

	// Clicks globales
	document.body.addEventListener('click', (ev)=>{
		const t = ev.target;
		if(!(t instanceof HTMLElement)) return;

		if(t.matches('#abrirCarrito')){ abrirCarrito(); }
		else if(t.matches('#cerrarCarrito, #overlay')){ cerrarCarrito(); }

		else if(t.matches('.add-to-cart')){
			const card = t.closest('.producto');
			if(card) agregarAlCarrito(card);
		}

		else if(t.matches('.chip')){
			aplicarFiltro(t.dataset.filtro || 'todos');
		}

		else if(t.matches('[data-accion]')){
			const id = t.getAttribute('data-id');
			const acc = t.getAttribute('data-accion');
			if(!id || !acc) return;
			if(acc==='mas') cambiarCantidad(id, +1);
			else if(acc==='menos') cambiarCantidad(id, -1);
			else if(acc==='eliminar') eliminarItem(id);
		}
	});

	// Teclas: Esc para cerrar carrito
	document.addEventListener('keydown', (e)=>{
		if(e.key==='Escape') cerrarCarrito();
	});

	// Botón pagar
	$('#btnPagar')?.addEventListener('click', ()=>{
		const total = $('#carritoTotal')?.textContent || '';
		if(Object.keys(estado.carrito).length===0){
			alert('Tu carrito está vacío. Agrega productos para continuar.');
			return;
		}
		const resumen = Object.values(estado.carrito)
			.map(i=>`${i.cantidad} x ${i.nombre}`)
			.join(', ');
		alert(`Gracias por tu pedido: ${resumen}.\nTotal: ${total}`);
		estado.carrito = {};
		renderCarrito();
		cerrarCarrito();
	});

	// Formatear etiquetas de precio iniciales basadas en data-precio si existen
	$$('[data-precio-texto]').forEach(el=>{
		const card = el.closest('.producto');
		const precio = Number(card?.getAttribute('data-precio')) || 0;
		if(precio>0) el.textContent = formato.format(precio);
	});

	// Filtro inicial: todos
	aplicarFiltro('todos');
});

