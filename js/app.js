/**
 * ====================================================================
 * APLICACION PRINCIPAL (js/app.js)
 * Carga de productos (API / Fallback), Filtros, Búsqueda y Eventos DOM
 * ====================================================================
 */

import { addToCart, updateCartUI, checkout, clearCart } from './cart.js';

// URL de la API pública recomendada para e-commerce
const API_URL = 'https://fakestoreapi.com/products';

// Estado global de la aplicación
let allProducts = [];
let filteredProducts = [];
let currentCategory = 'all';
let searchQuery = '';
let currentSort = 'default';

// Catálogo de respaldo local por si no hay conexión a internet durante la clase
const FALLBACK_PRODUCTS = [
  {
    id: 101,
    title: "Auriculares Inalámbricos Noise Cancelling Pro",
    price: 149.99,
    description: "Cancelación activa de ruido híbrida, audio de alta fidelidad y hasta 40 horas de batería con carga rápida USB-C.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    rating: { rate: 4.8, count: 245 }
  },
  {
    id: 102,
    title: "Smartwatch Deportivo Ultra GPS & Health",
    price: 199.50,
    description: "Monitoreo continuo de frecuencia cardíaca, oxímetro, GPS integrado, sumergible a 50 metros y pantalla AMOLED.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    rating: { rate: 4.6, count: 180 }
  },
  {
    id: 103,
    title: "Mochila Ergonomica Urbana Impermeable",
    price: 59.99,
    description: "Compartimento acolchado para laptop de hasta 16 pulgadas, puerto de carga USB y tejido impermeable de alta resistencia.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    rating: { rate: 4.5, count: 310 }
  },
  {
    id: 104,
    title: "Teclado Mecánico RGB Switch Brown Inalámbrico",
    price: 89.00,
    description: "Conectividad Bluetooth 5.1 y 2.4Ghz, teclas PBT de doble inyección, retroiluminación RGB configurable.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
    rating: { rate: 4.9, count: 420 }
  },
  {
    id: 105,
    title: "Chaqueta Casual Bomber Térmica Cortaviento",
    price: 74.50,
    description: "Diseño moderno con forro térmico ligero, bolsillos interiores de seguridad y ajuste cómodo para uso diario.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80",
    rating: { rate: 4.3, count: 115 }
  },
  {
    id: 106,
    title: "Collar Colgante Plata 925 Circonita Cúbica",
    price: 68.00,
    description: "Joyería fina en plata de ley con acabado pulido brillante hipoalergénico y cadena ajustable de 45cm.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80",
    rating: { rate: 4.7, count: 98 }
  },
  {
    id: 107,
    title: "Cámara Mirrorless 4K Compacta con Lente 15-45mm",
    price: 549.00,
    description: "Sensor CMOS de 24.1 MP, grabación de video 4K UHD, pantalla táctil abatible y conexión WiFi/Bluetooth para creadores.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80",
    rating: { rate: 4.9, count: 87 }
  },
  {
    id: 108,
    title: "Vestido Casual Elegante de Algodón Orgánico",
    price: 49.99,
    description: "Corte fresco y holgado, confeccionado 100% en algodón orgánico transpirable ideal para temporada cálida.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80",
    rating: { rate: 4.4, count: 164 }
  }
];

// Nombres de categorías legibles en español
const CATEGORY_NAMES = {
  'all': 'Todos los Productos',
  'electronics': 'Tecnología',
  'jewelery': 'Joyería y Accesorios',
  "men's clothing": 'Ropa Hombre',
  "women's clothing": 'Ropa Mujer'
};

/**
 * Inicialización al cargar el DOM (Slide 7: DOMContentLoaded)
 */
document.addEventListener('DOMContentLoaded', async () => {
  console.log(' Inicializando TechStore IDT...');
  setupNavigationEvents();
  setupFilterEvents();
  setupSearchEvents();
  setupSortEvents();
  setupCartDrawerEvents();
  updateCartUI();

  // Carga asíncrona de datos desde la API
  await fetchProducts();
});

/**
 * Petición asíncrona a la API con manejo de timeout y fallback
 */
async function fetchProducts() {
  const gridContainer = document.getElementById('products-grid');
  renderSkeletons(gridContainer, 8);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const response = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      allProducts = data;
      console.log(' Productos cargados con éxito desde FakeStoreAPI');
    } else {
      throw new Error('Formato de datos no válido');
    }
  } catch (error) {
    console.warn(' No se pudo conectar a la API externa. Usando catálogo de respaldo local:', error.message);
    allProducts = FALLBACK_PRODUCTS;
  }

  // Render inicial
  filteredProducts = [...allProducts];
  renderProducts(filteredProducts);
  renderCategoryPills();
}

/**
 * Renderiza tarjetas de skeleton loader durante la carga
 */
function renderSkeletons(container, count = 8) {
  if (!container) return;
  container.innerHTML = Array.from({ length: count }).map(() => `
    <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm animate-pulse flex flex-col justify-between h-96">
      <div class="w-full h-48 bg-slate-200 rounded-xl mb-4"></div>
      <div class="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
      <div class="h-5 bg-slate-200 rounded w-5/6 mb-4"></div>
      <div class="flex justify-between items-center mt-auto">
        <div class="h-6 bg-slate-200 rounded w-1/4"></div>
        <div class="h-9 bg-slate-200 rounded-xl w-1/3"></div>
      </div>
    </div>
  `).join('');
}

/**
 * Renderiza el grid de productos en el DOM (Slide 6 & 15: HTML Semántico y accesible)
 */
function renderProducts(products) {
  const gridContainer = document.getElementById('products-grid');
  const countBadge = document.getElementById('products-count');
  const emptyState = document.getElementById('products-empty');

  if (!gridContainer) return;

  if (countBadge) {
    countBadge.textContent = `${products.length} productos`;
  }

  if (products.length === 0) {
    gridContainer.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  gridContainer.innerHTML = products.map(product => {
    const formattedPrice = Number(product.price).toFixed(2);
    const ratingStars = '★'.repeat(Math.round(product.rating?.rate || 4)) + '☆'.repeat(5 - Math.round(product.rating?.rate || 4));

    return `
      <article class="product-card bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-xl flex flex-col justify-between transition-all duration-300 group">
        <!-- Contenedor de Imagen y categoría -->
        <div class="relative overflow-hidden rounded-xl bg-slate-50 p-4 mb-4 flex items-center justify-center h-52 cursor-pointer product-img-preview" data-id="${product.id}">
          <span class="absolute top-2 left-2 bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ${CATEGORY_NAMES[product.category] || product.category}
          </span>
          <img 
            src="${product.image}" 
            alt="${product.title}" 
            loading="lazy" 
            class="max-h-44 object-contain group-hover:scale-105 transition-transform duration-300"
          >
        </div>

        <!-- Información del Producto -->
        <div class="flex-1 flex flex-col">
          <div class="flex items-center gap-1.5 mb-1 text-amber-500 text-xs font-medium">
            <span>${ratingStars}</span>
            <span class="text-slate-400">(${product.rating?.count || 120})</span>
          </div>

          <h3 
            class="text-base font-bold text-slate-800 hover:text-blue-600 cursor-pointer line-clamp-2 mb-2 product-title-preview" 
            data-id="${product.id}"
            title="${product.title}"
          >
            ${product.title}
          </h3>

          <p class="text-xs text-slate-500 line-clamp-2 mb-4">
            ${product.description}
          </p>

          <!-- Precio y Botón de Compra -->
          <div class="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <div>
              <span class="text-xs text-slate-400 block">Precio</span>
              <span class="text-xl font-extrabold text-slate-900">$${formattedPrice}</span>
            </div>

            <button 
              class="btn-add-to-cart inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm px-3.5 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              data-id="${product.id}"
              aria-label="Agregar ${product.title} al carrito"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Agregar</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  attachProductCardEvents();
}

/**
 * Eventos en las tarjetas generadas
 */
function attachProductCardEvents() {
  // Botones de agregar al carrito
  document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
    btn.onclick = (e) => {
      const id = Number(e.currentTarget.dataset.id);
      const product = allProducts.find(p => p.id === id);
      if (product) {
        addToCart(product);
      }
    };
  });

  // Modal de vista rápida al hacer click en la foto o título
  document.querySelectorAll('.product-img-preview, .product-title-preview').forEach(el => {
    el.onclick = (e) => {
      const id = Number(e.currentTarget.dataset.id);
      const product = allProducts.find(p => p.id === id);
      if (product) openProductModal(product);
    };
  });
}

/**
 * Genera dinámicamente las pestañas/pills de categorías
 */
function renderCategoryPills() {
  const container = document.getElementById('category-pills');
  if (!container) return;

  const categories = ['all', ...new Set(allProducts.map(p => p.category))];

  container.innerHTML = categories.map(cat => {
    const isActive = cat === currentCategory;
    const label = CATEGORY_NAMES[cat] || cat;

    return `
      <button 
        class="category-btn px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
          isActive 
            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
        }"
        data-category="${cat}"
      >
        ${label}
      </button>
    `;
  }).join('');

  container.querySelectorAll('.category-btn').forEach(btn => {
    btn.onclick = (e) => {
      currentCategory = e.currentTarget.dataset.category;
      applyFilters();
      renderCategoryPills();
    };
  });
}

/**
 * Aplica filtros de categoría, búsqueda y ordenación de manera combinada
 */
function applyFilters() {
  filteredProducts = allProducts.filter(product => {
    // Filtro por categoría
    const matchesCategory = (currentCategory === 'all' || product.category === currentCategory);
    
    // Filtro por búsqueda de texto
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' || 
      product.title.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query) ||
      (product.category && product.category.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  // Ordenación
  if (currentSort === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    filteredProducts.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
  }

  renderProducts(filteredProducts);
}

/**
 * Configura la barra de búsqueda en tiempo real (evento input)
 */
function setupSearchEvents() {
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle('hidden', searchQuery.length === 0);
      }
      applyFilters();
    });
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.onclick = () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.classList.add('hidden');
      applyFilters();
      searchInput.focus();
    };
  }
}

/**
 * Configura el selector de ordenamiento
 */
function setupSortEvents() {
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applyFilters();
    });
  }
}

/**
 * Configura eventos de apertura y cierre del Drawer del Carrito
 */
function setupCartDrawerEvents() {
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const clearCartBtn = document.getElementById('clear-cart-btn');
  const checkoutBtn = document.getElementById('checkout-btn');

  const toggleCart = (open) => {
    if (open) {
      cartBackdrop.classList.remove('hidden');
      cartDrawer.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
      updateCartUI();
    } else {
      cartDrawer.classList.add('translate-x-full');
      cartBackdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  if (openCartBtn) openCartBtn.onclick = () => toggleCart(true);
  if (closeCartBtn) closeCartBtn.onclick = () => toggleCart(false);
  if (cartBackdrop) cartBackdrop.onclick = () => toggleCart(false);

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleCart(false);
      closeProductModal();
    }
  });

  if (clearCartBtn) clearCartBtn.onclick = () => clearCart();
  if (checkoutBtn) checkoutBtn.onclick = () => checkout();

  // Modal de confirmación de compra
  const closeSuccessModalBtn = document.getElementById('close-success-modal-btn');
  const successModal = document.getElementById('checkout-success-modal');
  if (closeSuccessModalBtn && successModal) {
    closeSuccessModalBtn.onclick = () => {
      successModal.classList.add('hidden');
      successModal.classList.remove('flex');
    };
  }
}

/**
 * Abre el modal con detalle completo de un producto
 */
function openProductModal(product) {
  const modal = document.getElementById('product-detail-modal');
  if (!modal) return;

  const modalImg = document.getElementById('modal-product-img');
  const modalCategory = document.getElementById('modal-product-category');
  const modalTitle = document.getElementById('modal-product-title');
  const modalDesc = document.getElementById('modal-product-desc');
  const modalPrice = document.getElementById('modal-product-price');
  const modalAddBtn = document.getElementById('modal-add-to-cart-btn');

  if (modalImg) modalImg.src = product.image;
  if (modalCategory) modalCategory.textContent = CATEGORY_NAMES[product.category] || product.category;
  if (modalTitle) modalTitle.textContent = product.title;
  if (modalDesc) modalDesc.textContent = product.description;
  if (modalPrice) modalPrice.textContent = `$${Number(product.price).toFixed(2)}`;

  if (modalAddBtn) {
    modalAddBtn.onclick = () => {
      addToCart(product);
      closeProductModal();
    };
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeProductModal() {
  const modal = document.getElementById('product-detail-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

/**
 * Configuración de navegación suave y menú móvil
 */
function setupNavigationEvents() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.onclick = () => {
      mobileMenu.classList.toggle('hidden');
    };
  }

  const closeDetailModalBtn = document.getElementById('close-detail-modal-btn');
  const detailBackdrop = document.getElementById('detail-modal-backdrop');
  if (closeDetailModalBtn) closeDetailModalBtn.onclick = closeProductModal;
  if (detailBackdrop) detailBackdrop.onclick = closeProductModal;
}

function setupFilterEvents() {
  // Inicialización de filtros adicionales si se requiere
}
