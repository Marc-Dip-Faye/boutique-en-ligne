// SECTION 2: PRODUCTS MANAGEMENT VIEW & MODALS

function renderProductsView() {
  const container = document.getElementById('sec-products');
  if (!container) return;

  container.innerHTML = `
    <!-- Header Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <i data-lucide="package" class="w-6 h-6 text-indigo-400"></i>
          <span>Gestion du Catalogue Produits</span>
        </h2>
        <p class="text-xs text-slate-400 mt-0.5">Gérez la liste de vos articles, prix, stocks et visibilité en ligne.</p>
      </div>
      <button onclick="openProductModal()" class="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/20 transition-all self-start sm:self-auto">
        <i data-lucide="plus-circle" class="w-4 h-4"></i>
        <span>Nouveau Produit</span>
      </button>
    </div>

    <!-- Filters & Search Toolbar -->
    <div class="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      
      <!-- Search Input -->
      <div class="relative w-full md:w-80">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <i data-lucide="search" class="w-4 h-4"></i>
        </div>
        <input type="text" id="prod-search-input" onkeyup="filterProducts()" placeholder="Rechercher par nom, SKU ou marque..." class="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500">
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <select id="prod-cat-filter" onchange="filterProducts()" class="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 flex-1 sm:flex-none">
          <option value="ALL">Toutes les catégories</option>
          ${appState.categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
        </select>

        <select id="prod-status-filter" onchange="filterProducts()" class="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 flex-1 sm:flex-none">
          <option value="ALL">Tous les statuts</option>
          <option value="Publié">Publié</option>
          <option value="Masqué">Masqué</option>
          <option value="Brouillon">Brouillon</option>
        </select>

        <select id="prod-sort-select" onchange="filterProducts()" class="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 flex-1 sm:flex-none">
          <option value="DEFAULT">Trier par : Récent</option>
          <option value="PRICE_ASC">Prix : croissant</option>
          <option value="PRICE_DESC">Prix : décroissant</option>
          <option value="STOCK_ASC">Stock : plus bas</option>
          <option value="SALES_DESC">Plus vendus</option>
        </select>
      </div>

    </div>

    <!-- Products Table Container -->
    <div class="glass-card overflow-hidden">
      <div class="table-container">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-800 bg-slate-900/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th class="p-4">Produit</th>
              <th class="p-4">Référence (SKU)</th>
              <th class="p-4">Catégorie</th>
              <th class="p-4 text-right">Prix de Vente</th>
              <th class="p-4 text-center">Stock</th>
              <th class="p-4 text-center">Statut</th>
              <th class="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="products-table-body" class="divide-y divide-slate-800/60 text-xs">
            <!-- Dynamic Rows -->
          </tbody>
        </table>
      </div>

      <!-- Empty State Slot -->
      <div id="products-empty-state" class="hidden p-12 text-center space-y-3">
        <div class="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-400 mx-auto flex items-center justify-center">
          <i data-lucide="package-search" class="w-6 h-6"></i>
        </div>
        <h3 class="font-bold text-sm text-white">Aucun produit trouvé</h3>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">Aucun article ne correspond à vos filtres ou à votre recherche actuelle. Essayez de réinitialiser les filtres.</p>
        <button onclick="resetProductFilters()" class="px-3 py-1.5 text-xs font-semibold text-indigo-400 hover:text-white bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-xl transition-colors">
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  `;

  renderProductRows(appState.products);
}

// Render product list rows
function renderProductRows(productsList) {
  const tbody = document.getElementById('products-table-body');
  const emptyState = document.getElementById('products-empty-state');
  if (!tbody || !emptyState) return;

  if (!productsList || productsList.length === 0) {
    tbody.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  tbody.innerHTML = productsList.map(p => `
    <tr class="hover:bg-slate-900/40 transition-colors group">
      <!-- Product Info -->
      <td class="p-4">
        <div class="flex items-center space-x-3">
          <img class="w-11 h-11 rounded-xl object-cover border border-slate-800 shrink-0 group-hover:scale-105 transition-transform" src="${p.image}" alt="${p.name}">
          <div>
            <h4 class="font-bold text-slate-100 line-clamp-1">${p.name}</h4>
            <p class="text-[11px] text-slate-400">${p.brand ? p.brand : 'SANS MARQUE'} • <span class="text-indigo-400 font-semibold">${p.salesCount || 0} ventes</span></p>
          </div>
        </div>
      </td>

      <!-- SKU -->
      <td class="p-4 font-mono text-slate-300 font-semibold">
        ${p.sku}
      </td>

      <!-- Category -->
      <td class="p-4 text-slate-300">
        <span class="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700/60 text-[11px] font-medium">${p.category}</span>
      </td>

      <!-- Price -->
      <td class="p-4 text-right">
        <p class="font-mono font-bold text-white">${formatFCFA(p.promoPrice ? p.promoPrice : p.price)}</p>
        ${p.promoPrice ? `<p class="font-mono text-[10px] text-slate-500 line-through">${formatFCFA(p.price)}</p>` : ''}
      </td>

      <!-- Stock -->
      <td class="p-4 text-center">
        ${p.stock <= 0 ? `
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">Rupture (0)</span>
        ` : p.stock <= p.minStock ? `
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">Faible (${p.stock})</span>
        ` : `
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">${p.stock} unités</span>
        `}
      </td>

      <!-- Status -->
      <td class="p-4 text-center">
        <span class="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusBadgeClass(p.status)}">
          ${p.status}
        </span>
      </td>

      <!-- Actions -->
      <td class="p-4 text-right">
        <div class="flex items-center justify-end space-x-1">
          <button onclick="editProduct('${p.id}')" title="Modifier" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors">
            <i data-lucide="edit-3" class="w-4 h-4"></i>
          </button>
          <button onclick="duplicateProduct('${p.id}')" title="Dupliquer" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors">
            <i data-lucide="copy" class="w-4 h-4"></i>
          </button>
          <button onclick="toggleVisibilityProduct('${p.id}')" title="${p.status === 'Publié' ? 'Masquer' : 'Publier'}" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 ${p.status === 'Publié' ? 'text-amber-400' : 'text-emerald-400'} transition-colors">
            <i data-lucide="${p.status === 'Publié' ? 'eye-off' : 'eye'}" class="w-4 h-4"></i>
          </button>
          <button onclick="promptDeleteProduct('${p.id}')" title="Supprimer" class="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300 transition-colors">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// Product Filtering Controller
window.filterProducts = function() {
  const query = document.getElementById('prod-search-input')?.value.toLowerCase().trim() || '';
  const catFilter = document.getElementById('prod-cat-filter')?.value || 'ALL';
  const statusFilter = document.getElementById('prod-status-filter')?.value || 'ALL';
  const sortOption = document.getElementById('prod-sort-select')?.value || 'DEFAULT';

  let filtered = appState.products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(query) || p.sku.toLowerCase().includes(query) || (p.brand && p.brand.toLowerCase().includes(query));
    const matchesCat = catFilter === 'ALL' || p.category === catFilter;
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesCat && matchesStatus;
  });

  // Sorting
  if (sortOption === 'PRICE_ASC') {
    filtered.sort((a,b) => (a.promoPrice || a.price) - (b.promoPrice || b.price));
  } else if (sortOption === 'PRICE_DESC') {
    filtered.sort((a,b) => (b.promoPrice || b.price) - (a.promoPrice || a.price));
  } else if (sortOption === 'STOCK_ASC') {
    filtered.sort((a,b) => a.stock - b.stock);
  } else if (sortOption === 'SALES_DESC') {
    filtered.sort((a,b) => (b.salesCount || 0) - (a.salesCount || 0));
  }

  renderProductRows(filtered);
};

window.resetProductFilters = function() {
  if (document.getElementById('prod-search-input')) document.getElementById('prod-search-input').value = '';
  if (document.getElementById('prod-cat-filter')) document.getElementById('prod-cat-filter').value = 'ALL';
  if (document.getElementById('prod-status-filter')) document.getElementById('prod-status-filter').value = 'ALL';
  if (document.getElementById('prod-sort-select')) document.getElementById('prod-sort-select').value = 'DEFAULT';
  filterProducts();
};

// Open Product Modal (Add Mode)
window.openProductModal = function() {
  document.getElementById('modal-product-title').innerHTML = `<i data-lucide="package-plus" class="w-5 h-5 text-indigo-400"></i> Ajouter un nouveau produit`;
  document.getElementById('form-product').reset();
  document.getElementById('prod-id').value = '';

  // Populate categories
  const catSelect = document.getElementById('prod-category');
  if (catSelect) {
    catSelect.innerHTML = appState.categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
  }

  openModal('modal-product');
};

// Edit Product Modal Mode
window.editProduct = function(id) {
  const p = appState.products.find(item => item.id === id);
  if (!p) return;

  document.getElementById('modal-product-title').innerHTML = `<i data-lucide="edit-3" class="w-5 h-5 text-indigo-400"></i> Modifier le produit : <span class="font-mono text-indigo-300 ml-1">${p.sku}</span>`;
  
  const catSelect = document.getElementById('prod-category');
  if (catSelect) {
    catSelect.innerHTML = appState.categories.map(c => `<option value="${c.name}" ${c.name === p.category ? 'selected' : ''}>${c.name}</option>`).join('');
  }

  document.getElementById('prod-id').value = p.id;
  document.getElementById('prod-name').value = p.name;
  document.getElementById('prod-sku').value = p.sku;
  document.getElementById('prod-brand').value = p.brand || '';
  document.getElementById('prod-status').value = p.status;
  document.getElementById('prod-desc').value = p.description || '';
  document.getElementById('prod-price').value = p.price;
  document.getElementById('prod-promo').value = p.promoPrice || '';
  document.getElementById('prod-cost').value = p.costPrice || '';
  document.getElementById('prod-stock').value = p.stock;
  document.getElementById('prod-min-stock').value = p.minStock || 5;
  document.getElementById('prod-image-url').value = p.image || '';
  document.getElementById('prod-variants').value = p.variants ? p.variants.join(', ') : '';

  openModal('modal-product');
};

// Handle Product Form Submit
document.getElementById('form-product')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = document.getElementById('prod-id').value;
  const name = document.getElementById('prod-name').value;
  const sku = document.getElementById('prod-sku').value;
  const category = document.getElementById('prod-category').value;
  const brand = document.getElementById('prod-brand').value;
  const status = document.getElementById('prod-status').value;
  const description = document.getElementById('prod-desc').value;
  const price = parseFloat(document.getElementById('prod-price').value);
  const promoPrice = document.getElementById('prod-promo').value ? parseFloat(document.getElementById('prod-promo').value) : null;
  const costPrice = document.getElementById('prod-cost').value ? parseFloat(document.getElementById('prod-cost').value) : null;
  const stock = parseInt(document.getElementById('prod-stock').value, 10);
  const minStock = parseInt(document.getElementById('prod-min-stock').value, 10) || 5;
  const imageUrl = document.getElementById('prod-image-url').value.trim() || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=600';
  const variantsRaw = document.getElementById('prod-variants').value;
  const variants = variantsRaw ? variantsRaw.split(',').map(v => v.trim()) : [];

  if (id) {
    // Edit existing
    const idx = appState.products.findIndex(p => p.id === id);
    if (idx !== -1) {
      appState.products[idx] = {
        ...appState.products[idx],
        name, sku, category, brand, status, description, price, promoPrice, costPrice, stock, minStock, image: imageUrl, variants
      };
      showToast(`Produit "${name}" mis à jour avec succès.`, 'success');
    }
  } else {
    // Add new
    const newProd = {
      id: 'prod-' + Date.now(),
      name, sku, category, brand, status, description, price, promoPrice, costPrice, stock, minStock,
      salesCount: 0, rating: 5.0, visibility: status === 'Publié', image: imageUrl, variants, isFeatured: false
    };
    appState.products.unshift(newProd);
    showToast(`Nouveau produit "${name}" ajouté au catalogue.`, 'success');
  }

  closeModal('modal-product');
  renderProductsView();
});

// Duplicate product simulator
window.duplicateProduct = function(id) {
  const p = appState.products.find(item => item.id === id);
  if (!p) return;

  const copy = {
    ...p,
    id: 'prod-' + Date.now(),
    name: `${p.name} (Copie)`,
    sku: `${p.sku}-COPY`,
    salesCount: 0,
    status: 'Brouillon'
  };

  appState.products.unshift(copy);
  showToast(`Produit dupliqué sous le SKU : ${copy.sku}`, 'info');
  renderProductsView();
};

// Toggle visibility / status
window.toggleVisibilityProduct = function(id) {
  const p = appState.products.find(item => item.id === id);
  if (!p) return;

  p.status = p.status === 'Publié' ? 'Masqué' : 'Publié';
  p.visibility = p.status === 'Publié';

  showToast(`Statut du produit "${p.name}" changé en : ${p.status}`, 'info');
  renderProductsView();
};

// Prompt Delete Product
window.promptDeleteProduct = function(id) {
  const p = appState.products.find(item => item.id === id);
  if (!p) return;

  confirmDelete(
    `Supprimer le produit ?`,
    `Êtes-vous sûr de vouloir supprimer définitivement "${p.name}" (${p.sku}) ? Cette action masquera l'article de la boutique.`,
    () => {
      appState.products = appState.products.filter(item => item.id !== id);
      showToast(`Le produit "${p.name}" a été supprimé.`, 'error');
      renderProductsView();
    }
  );
};
