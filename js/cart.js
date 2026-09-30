/**
 * ====================================================================
 * MODULO DEL CARRITO DE COMPRAS (js/cart.js)
 * Manejo de estado, persistencia en LocalStorage y renderizado del DOM
 * ====================================================================
 */

// Clave para guardar en LocalStorage del navegador
const STORAGE_KEY = 'idt_techstore_cart';

// Tasa de impuesto estimada (10% IVA)
const TAX_RATE = 0.10;

/**
 * Obtiene los productos actuales del carrito desde LocalStorage
 * @returns {Array} Lista de items en el carrito
 */
export function getCart() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error al leer el carrito de localStorage:', error);
    return [];
  }
}

/**
 * Guarda el estado actual del carrito en LocalStorage
 * @param {Array} cart Lista de items actualizada
 */
export function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
  }
}

/**
 * Agrega un producto al carrito o incrementa su cantidad si ya existe
 * @param {Object} product Objeto con id, title, price, image, etc.
 */
export function addToCart(product) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: Number(product.price),
      image: product.image,
      category: product.category,
      quantity: 1
    });
  }

  saveCart(cart);
  updateCartUI();
  showToast(`¡"${product.title.substring(0, 25)}..." agregado al carrito!`, 'success');
}

/**
 * Remueve un producto del carrito según su ID
 * @param {number|string} productId 
 */
export function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== Number(productId));
  saveCart(cart);
  updateCartUI();
  showToast('Producto eliminado del carrito', 'info');
}

/**
 * Modifica la cantidad de un producto (+1 o -1)
 * @param {number|string} productId 
 * @param {number} delta Variación de cantidad (+1 o -1)
 */
export function updateQuantity(productId, delta) {
  const cart = getCart();
  const item = cart.find(item => item.id === Number(productId));

  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart(cart);
  updateCartUI();
}

/**
 * Vacía completamente el carrito
 */
export function clearCart() {
  saveCart([]);
  updateCartUI();
  showToast('El carrito ha sido vaciado', 'info');
}

/**
 * Calcula los totales del carrito (Subtotal, Impuestos, Total, Conteo total de items)
 * @returns {Object} { subtotal, tax, total, totalCount }
 */
export function calculateTotals() {
  const cart = getCart();
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * TAX_RATE;
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.00; // Envío gratis a partir de $50
  const total = subtotal + tax + shipping;

  return {
    totalCount,
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    shipping: shipping.toFixed(2),
    total: total.toFixed(2)
  };
}

/**
 * Actualiza todos los elementos visuales del carrito en el DOM
 */
export function updateCartUI() {
  const cart = getCart();
  const totals = calculateTotals();

  // 1. Actualizar el Badge del navbar
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.textContent = totals.totalCount;
    if (totals.totalCount > 0) {
      badge.classList.remove('hidden');
      badge.classList.add('animate-badge');
      setTimeout(() => badge.classList.remove('animate-badge'), 300);
    } else {
      badge.classList.add('hidden');
    }
  }

  // 2. Actualizar el contador del drawer
  const drawerCount = document.getElementById('cart-drawer-count');
  if (drawerCount) {
    drawerCount.textContent = `(${totals.totalCount} items)`;
  }

  // 3. Renderizar items en el contenedor del carrito
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartEmptyState = document.getElementById('cart-empty-state');
  const cartFooter = document.getElementById('cart-footer');

  if (cartItemsContainer && cartEmptyState && cartFooter) {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '';
      cartEmptyState.classList.remove('hidden');
      cartFooter.classList.add('hidden');
    } else {
      cartEmptyState.classList.add('hidden');
      cartFooter.classList.remove('hidden');

      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0 hover:bg-slate-50 p-2 rounded-lg transition-colors">
          <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-contain bg-white p-1 rounded-md border border-gray-200">
          
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-gray-800 truncate" title="${item.title}">${item.title}</h4>
            <p class="text-xs text-gray-500 capitalize mb-1">${item.category}</p>
            <span class="text-sm font-bold text-blue-600">$${item.price.toFixed(2)}</span>
          </div>

          <div class="flex items-center gap-2">
            <div class="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
              <button 
                class="btn-qty-minus px-2 py-1 text-gray-600 hover:bg-gray-100 active:bg-gray-200 text-sm font-bold transition-colors"
                data-id="${item.id}"
                aria-label="Disminuir cantidad"
              >-</button>
              <span class="px-2 text-xs font-semibold text-gray-800 select-none">${item.quantity}</span>
              <button 
                class="btn-qty-plus px-2 py-1 text-gray-600 hover:bg-gray-100 active:bg-gray-200 text-sm font-bold transition-colors"
                data-id="${item.id}"
                aria-label="Aumentar cantidad"
              >+</button>
            </div>

            <button 
              class="btn-remove-item text-gray-400 hover:text-red-500 p-1 transition-colors"
              data-id="${item.id}"
              aria-label="Eliminar item"
              title="Eliminar producto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      `).join('');

      // Adjuntar event listeners a los botones generados
      attachCartEvents();
    }
  }

  // 4. Actualizar etiquetas de costos en el footer del carrito
  const subtotalEl = document.getElementById('cart-subtotal');
  const taxEl = document.getElementById('cart-tax');
  const shippingEl = document.getElementById('cart-shipping');
  const totalEl = document.getElementById('cart-total');

  if (subtotalEl) subtotalEl.textContent = `$${totals.subtotal}`;
  if (taxEl) taxEl.textContent = `$${totals.tax}`;
  if (shippingEl) shippingEl.textContent = Number(totals.shipping) === 0 ? 'Gratis' : `$${totals.shipping}`;
  if (totalEl) totalEl.textContent = `$${totals.total}`;
}

/**
 * Asigna eventos a los botones dentro de la lista del carrito
 */
function attachCartEvents() {
  document.querySelectorAll('.btn-qty-plus').forEach(btn => {
    btn.onclick = (e) => {
      const id = e.currentTarget.dataset.id;
      updateQuantity(id, 1);
    };
  });

  document.querySelectorAll('.btn-qty-minus').forEach(btn => {
    btn.onclick = (e) => {
      const id = e.currentTarget.dataset.id;
      updateQuantity(id, -1);
    };
  });

  document.querySelectorAll('.btn-remove-item').forEach(btn => {
    btn.onclick = (e) => {
      const id = e.currentTarget.dataset.id;
      removeFromCart(id);
    };
  });
}

/**
 * Muestra una notificación emergente (Toast)
 * @param {string} message Texto del mensaje
 * @param {string} type 'success' | 'info' | 'error'
 */
export function showToast(message, type = 'success') {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  const colors = {
    success: 'bg-emerald-600 text-white',
    info: 'bg-blue-600 text-white',
    error: 'bg-rose-600 text-white'
  };

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-sm font-medium transition-all duration-300 transform translate-y-2 opacity-0 ${colors[type] || colors.info}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Animación de entrada
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  // Animación de salida y remoción
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

/**
 * Simulación de Checkout / Finalizar Compra
 */
export function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast('El carrito está vacío', 'error');
    return;
  }

  const totals = calculateTotals();
  clearCart();
  
  // Cerrar el modal del carrito
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  if (cartDrawer && cartBackdrop) {
    cartDrawer.classList.add('translate-x-full');
    cartBackdrop.classList.add('hidden');
  }

  // Mostrar modal de éxito
  const successModal = document.getElementById('checkout-success-modal');
  const successAmount = document.getElementById('checkout-success-amount');
  if (successModal && successAmount) {
    successAmount.textContent = `$${totals.total}`;
    successModal.classList.remove('hidden');
    successModal.classList.add('flex');
  }
}
