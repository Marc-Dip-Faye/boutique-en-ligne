// SECTION 3 & 4: CATEGORIES & INVENTORY (STOCK) MANAGEMENT VIEWS

// SECTION 3: CATEGORIES
function renderCategoriesView() {
  const container = document.getElementById('sec-categories');
  if (!container) return;

  container.innerHTML = `
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <i data-lucide="folder-tree" class="w-6 h-6 text-indigo-400"></i>
          <span>Catégories du Catalogue</span>
        </h2>
        <p class="text-xs text-slate-400 mt-0.5">Organisez vos articles par catégories pour faciliter la navigation sur la boutique.</p>
      </div>
      <button onclick="openCategoryModal()" class="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all self-start sm:self-auto">
        <i data-lucide="folder-plus" class="w-4 h-4"></i>
        <span>Nouvelle Catégorie</span>
      </button>
    </div>

    <!-- Category Grid Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${appState.categories.map(cat => {
        const catProds = appState.products.filter(p => p.category === cat.name);
        return `
          <div class="glass-card overflow-hidden flex flex-col justify-between group">
            <div class="relative h-36 overflow-hidden">
              <img src="${cat.image}" alt="${cat.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              <div class="absolute top-3 right-3">
                <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusBadgeClass(cat.status)}">${cat.status}</span>
              </div>
              <div class="absolute bottom-3 left-4 right-4">
                <h3 class="text-lg font-bold text-white leading-tight">${cat.name}</h3>
                <p class="text-[11px] text-indigo-300 font-semibold mt-0.5">${catProds.length} produit(s) associé(s)</p>
              </div>
            </div>

            <div class="p-4 space-y-4 flex-1 flex flex-col justify-between">
              <p class="text-xs text-slate-300 line-clamp-2">${cat.description || 'Aucune description spécifiée.'}</p>

              <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button onclick="toggleCategoryStatus('${cat.id}')" class="text-xs font-semibold ${cat.status === 'Active' ? 'text-amber-400 hover:text-amber-300' : 'text-emerald-400 hover:text-emerald-300'} flex items-center gap-1.5">
                  <i data-lucide="${cat.status === 'Active' ? 'power-off' : 'power'}" class="w-3.5 h-3.5"></i>
                  <span>${cat.status === 'Active' ? 'Désactiver' : 'Activer'}</span>
                </button>

                <div class="flex items-center space-x-1">
                  <button onclick="editCategory('${cat.id}')" title="Modifier" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors">
                    <i data-lucide="edit-3" class="w-4 h-4"></i>
                  </button>
                  <button onclick="promptDeleteCategory('${cat.id}')" title="Supprimer" class="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300 transition-colors">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// Category Modal Handlers
window.openCategoryModal = function() {
  document.getElementById('modal-cat-title').textContent = 'Ajouter une nouvelle catégorie';
  document.getElementById('form-category').reset();
  document.getElementById('cat-id').value = '';
  openModal('modal-category');
};

window.editCategory = function(id) {
  const cat = appState.categories.find(c => c.id === id);
  if (!cat) return;

  document.getElementById('modal-cat-title').textContent = `Modifier : ${cat.name}`;
  document.getElementById('cat-id').value = cat.id;
  document.getElementById('cat-name').value = cat.name;
  document.getElementById('cat-desc').value = cat.description || '';
  document.getElementById('cat-image').value = cat.image || '';
  document.getElementById('cat-status').value = cat.status;

  openModal('modal-category');
};

document.getElementById('form-category')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = document.getElementById('cat-id').value;
  const name = document.getElementById('cat-name').value;
  const description = document.getElementById('cat-desc').value;
  const image = document.getElementById('cat-image').value || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=500';
  const status = document.getElementById('cat-status').value;

  if (id) {
    const idx = appState.categories.findIndex(c => c.id === id);
    if (idx !== -1) {
      appState.categories[idx] = { ...appState.categories[idx], name, description, image, status };
      showToast(`Catégorie "${name}" mise à jour.`, 'success');
    }
  } else {
    const newCat = {
      id: 'cat-' + Date.now(),
      name, slug: name.toLowerCase().replace(/\s+/g, '-'),
      description, image, productCount: 0, status
    };
    appState.categories.push(newCat);
    showToast(`Catégorie "${name}" créée avec succès.`, 'success');
  }

  closeModal('modal-category');
  renderCategoriesView();
});

window.toggleCategoryStatus = function(id) {
  const cat = appState.categories.find(c => c.id === id);
  if (!cat) return;

  cat.status = cat.status === 'Active' ? 'Inactive' : 'Active';
  showToast(`Statut de la catégorie "${cat.name}" passé en : ${cat.status}`, 'info');
  renderCategoriesView();
};

window.promptDeleteCategory = function(id) {
  const cat = appState.categories.find(c => c.id === id);
  if (!cat) return;

  confirmDelete(
    `Supprimer la catégorie ?`,
    `Êtes-vous sûr de vouloir supprimer la catégorie "${cat.name}" ? Les produits associés resteront sans catégorie dédiée.`,
    () => {
      appState.categories = appState.categories.filter(c => c.id !== id);
      showToast(`Catégorie "${cat.name}" supprimée.`, 'error');
      renderCategoriesView();
    }
  );
};


// SECTION 4: STOCK MANAGEMENT
function renderStockView() {
  const container = document.getElementById('sec-stock');
  if (!container) return;

  const lowStockItems = appState.products.filter(p => p.stock > 0 && p.stock <= p.minStock);
  const outOfStockItems = appState.products.filter(p => p.stock <= 0);
  const normalStockItems = appState.products.filter(p => p.stock > p.minStock);

  container.innerHTML = `
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <i data-lucide="boxes" class="w-6 h-6 text-indigo-400"></i>
          <span>Contrôle & Ajustement des Stocks</span>
        </h2>
        <p class="text-xs text-slate-400 mt-0.5">Suivez l'état de l'inventaire en temps réel et simulez des ajustements de stock.</p>
      </div>
    </div>

    <!-- Stock Summary KPI Badges -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="glass-card p-4 flex items-center justify-between border-l-4 border-l-emerald-500">
        <div>
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">En Stock Disponible</p>
          <p class="text-2xl font-black text-white mt-1">${normalStockItems.length} <span class="text-xs font-normal text-slate-400">références</span></p>
        </div>
        <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
          <i data-lucide="check-circle-2" class="w-5 h-5"></i>
        </div>
      </div>

      <div class="glass-card p-4 flex items-center justify-between border-l-4 border-l-amber-500">
        <div>
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stock Faible (Alerte)</p>
          <p class="text-2xl font-black text-amber-400 mt-1">${lowStockItems.length} <span class="text-xs font-normal text-slate-400">références</span></p>
        </div>
        <div class="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
          <i data-lucide="alert-triangle" class="w-5 h-5"></i>
        </div>
      </div>

      <div class="glass-card p-4 flex items-center justify-between border-l-4 border-l-rose-500">
        <div>
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Rupture de Stock</p>
          <p class="text-2xl font-black text-rose-400 mt-1">${outOfStockItems.length} <span class="text-xs font-normal text-slate-400">références</span></p>
        </div>
        <div class="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
          <i data-lucide="x-circle" class="w-5 h-5"></i>
        </div>
      </div>
    </div>

    <!-- Inventory Quick Adjustment Table -->
    <div class="glass-card overflow-hidden space-y-3 p-4">
      <div class="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 class="font-bold text-sm text-white flex items-center gap-2">
          <i data-lucide="sliders" class="w-4 h-4 text-indigo-400"></i>
          <span>Ajustement Rapide des Quantités (+ / -)</span>
        </h3>
        <p class="text-xs text-slate-400">Ajustez les quantités pour simuler une livraison ou un inventaire</p>
      </div>

      <div class="table-container">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-800 bg-slate-900/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th class="p-3">Produit</th>
              <th class="p-3">SKU</th>
              <th class="p-3 text-center">Seuil Alerte</th>
              <th class="p-3 text-center">Stock Actuel</th>
              <th class="p-3 text-center">Ajuster Stock</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 text-xs">
            ${appState.products.map(p => `
              <tr class="hover:bg-slate-900/40 transition-colors">
                <td class="p-3">
                  <div class="flex items-center space-x-3">
                    <img class="w-9 h-9 rounded-lg object-cover border border-slate-800" src="${p.image}" alt="${p.name}">
                    <div>
                      <p class="font-bold text-white line-clamp-1">${p.name}</p>
                      <p class="text-[10px] text-slate-400">${p.category}</p>
                    </div>
                  </div>
                </td>
                <td class="p-3 font-mono text-slate-300">${p.sku}</td>
                <td class="p-3 text-center font-mono text-slate-400">${p.minStock || 5}</td>
                <td class="p-3 text-center">
                  <span id="stock-val-${p.id}" class="font-mono font-bold text-sm ${p.stock <= 0 ? 'text-rose-400' : p.stock <= p.minStock ? 'text-amber-400' : 'text-emerald-400'}">
                    ${p.stock}
                  </span>
                </td>
                <td class="p-3 text-center">
                  <div class="inline-flex items-center space-x-1 bg-slate-950 border border-slate-800 rounded-xl p-1">
                    <button onclick="adjustStock('${p.id}', -5)" title="-5 unités" class="px-2 py-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg font-bold text-xs">-5</button>
                    <button onclick="adjustStock('${p.id}', -1)" title="-1 unité" class="px-2 py-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg font-bold text-xs">-1</button>
                    <span class="px-2 text-slate-600">|</span>
                    <button onclick="adjustStock('${p.id}', +1)" title="+1 unité" class="px-2 py-1 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg font-bold text-xs">+1</button>
                    <button onclick="adjustStock('${p.id}', +10)" title="+10 unités" class="px-2 py-1 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg font-bold text-xs">+10</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Stock Movement Log -->
    <div class="glass-card p-5 space-y-4">
      <div class="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 class="font-bold text-base text-white flex items-center gap-2">
          <i data-lucide="history" class="w-5 h-5 text-indigo-400"></i>
          <span>Historique des Mouvements de Stock</span>
        </h3>
        <span class="text-xs text-slate-400">Traces d'inventaire récents</span>
      </div>

      <div class="table-container">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th class="p-3">Horodatage</th>
              <th class="p-3">Article</th>
              <th class="p-3">Type / Motifs</th>
              <th class="p-3 text-center">Mouvement</th>
              <th class="p-3 text-center">Stock Résultant</th>
              <th class="p-3 text-right">Auteur</th>
            </tr>
          </thead>
          <tbody id="stock-history-tbody" class="divide-y divide-slate-800/60 text-xs">
            ${renderStockHistoryRows()}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Adjust Stock Simulator
window.adjustStock = function(prodId, delta) {
  const p = appState.products.find(item => item.id === prodId);
  if (!p) return;

  const oldStock = p.stock;
  p.stock = Math.max(0, p.stock + delta);
  const newStock = p.stock;

  // Log movement
  const logEntry = {
    id: 'stk-' + Date.now(),
    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    product: p.name,
    change: delta,
    type: delta > 0 ? "Réapprovisionnement Manuel" : "Ajustement / Vente",
    stockAfter: newStock,
    user: "Aminata Diallo"
  };

  appState.stockHistory.unshift(logEntry);

  showToast(`Stock de "${p.name}" mis à jour : ${newStock} unités (${delta > 0 ? '+' + delta : delta})`, delta > 0 ? 'success' : 'warning');
  renderStockView();
};

function renderStockHistoryRows() {
  return appState.stockHistory.slice(0, 8).map(h => `
    <tr class="hover:bg-slate-900/40">
      <td class="p-3 font-mono text-slate-400">${h.date}</td>
      <td class="p-3 font-bold text-white">${h.product}</td>
      <td class="p-3 text-slate-300">${h.type}</td>
      <td class="p-3 text-center font-mono font-bold ${h.change > 0 ? 'text-emerald-400' : 'text-rose-400'}">
        ${h.change > 0 ? '+' + h.change : h.change}
      </td>
      <td class="p-3 text-center font-mono font-semibold text-slate-200">${h.stockAfter}</td>
      <td class="p-3 text-right text-slate-400">${h.user}</td>
    </tr>
  `).join('');
}
