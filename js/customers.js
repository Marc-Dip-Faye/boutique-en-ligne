// SECTION 6: CUSTOMERS CRM VIEW & PROFILE MODAL

function renderCustomersView() {
  const container = document.getElementById('sec-customers');
  if (!container) return;

  container.innerHTML = `
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <i data-lucide="users" class="w-6 h-6 text-indigo-400"></i>
          <span>Gestion de la Clientèle (CRM)</span>
        </h2>
        <p class="text-xs text-slate-400 mt-0.5">Consultez l'historique d'achat, le niveau de fidélité et la valeur totale de vos clients.</p>
      </div>
    </div>

    <!-- Customers Search & Filters -->
    <div class="glass-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="relative w-full sm:w-80">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <i data-lucide="search" class="w-4 h-4"></i>
        </div>
        <input type="text" id="cust-search-input" onkeyup="filterCustomers()" placeholder="Rechercher un client par nom, email, ville..." class="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500">
      </div>

      <div class="flex items-center space-x-2">
        <select id="cust-status-filter" onchange="filterCustomers()" class="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500">
          <option value="ALL">Tous les statuts fidélité</option>
          <option value="VIP">VIP</option>
          <option value="Fidèle">Fidèle</option>
          <option value="Régulier">Régulier</option>
          <option value="Nouveau">Nouveau</option>
        </select>
      </div>
    </div>

    <!-- Customers Table -->
    <div class="glass-card overflow-hidden">
      <div class="table-container">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-800 bg-slate-900/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th class="p-4">Client</th>
              <th class="p-4">Téléphone & Ville</th>
              <th class="p-4 text-center">Nombre Commandes</th>
              <th class="p-4 text-right">Dépenses Totales</th>
              <th class="p-4">Dernière Commande</th>
              <th class="p-4 text-center">Fidélité</th>
              <th class="p-4 text-right">Profil</th>
            </tr>
          </thead>
          <tbody id="customers-table-body" class="divide-y divide-slate-800/60 text-xs">
            <!-- Dynamic rows -->
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div id="customers-empty-state" class="hidden p-12 text-center space-y-3">
        <div class="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-400 mx-auto flex items-center justify-center">
          <i data-lucide="user-x" class="w-6 h-6"></i>
        </div>
        <h3 class="font-bold text-sm text-white">Aucun client trouvé</h3>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">Aucun profil client ne correspond à votre recherche.</p>
      </div>
    </div>
  `;

  renderCustomerRows(appState.customers);
}

function renderCustomerRows(customersList) {
  const tbody = document.getElementById('customers-table-body');
  const emptyState = document.getElementById('customers-empty-state');
  if (!tbody || !emptyState) return;

  if (!customersList || customersList.length === 0) {
    tbody.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  tbody.innerHTML = customersList.map(c => `
    <tr class="hover:bg-slate-900/40 transition-colors">
      <td class="p-4">
        <div class="flex items-center space-x-3">
          <img class="w-10 h-10 rounded-full object-cover border border-slate-800 shrink-0" src="${c.avatar}" alt="${c.name}">
          <div>
            <h4 class="font-bold text-white">${c.name}</h4>
            <p class="text-[11px] text-slate-400">${c.email}</p>
          </div>
        </div>
      </td>

      <td class="p-4">
        <p class="text-slate-200 font-mono text-[11px]">${c.phone}</p>
        <p class="text-[10px] text-slate-400">${c.city}</p>
      </td>

      <td class="p-4 text-center font-bold text-white">
        ${c.ordersCount}
      </td>

      <td class="p-4 text-right font-mono font-bold text-emerald-400">
        ${formatFCFA(c.totalSpent)}
      </td>

      <td class="p-4 text-slate-300 font-mono text-[11px]">
        ${c.lastOrderDate}
      </td>

      <td class="p-4 text-center">
        <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getLoyaltyBadgeClass(c.status)}">
          ${c.status}
        </span>
      </td>

      <td class="p-4 text-right">
        <button onclick="openCustomerDetailModal('${c.id}')" class="px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-xl transition-all">
          Voir Profil
        </button>
      </td>
    </tr>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

function getLoyaltyBadgeClass(status) {
  switch (status) {
    case 'VIP': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    case 'Fidèle': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    case 'Régulier': return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
    default: return 'bg-slate-800 text-slate-300 border border-slate-700/60';
  }
}

window.filterCustomers = function() {
  const query = document.getElementById('cust-search-input')?.value.toLowerCase().trim() || '';
  const status = document.getElementById('cust-status-filter')?.value || 'ALL';

  const filtered = appState.customers.filter(c => {
    const matchQuery = c.name.toLowerCase().includes(query) || c.email.toLowerCase().includes(query) || c.city.toLowerCase().includes(query);
    const matchStatus = status === 'ALL' || c.status === status;
    return matchQuery && matchStatus;
  });

  renderCustomerRows(filtered);
};

// Customer Detail Profile Modal
window.openCustomerDetailModal = function(id) {
  const c = appState.customers.find(item => item.id === id);
  if (!c) return;

  const header = document.getElementById('customer-detail-header');
  const body = document.getElementById('customer-detail-body');

  header.innerHTML = `
    <div class="flex items-center space-x-3">
      <img class="w-12 h-12 rounded-full object-cover border-2 border-indigo-500" src="${c.avatar}" alt="${c.name}">
      <div>
        <h3 class="font-bold text-lg text-white flex items-center gap-2">
          ${c.name}
          <span class="text-xs px-2 py-0.5 rounded-full ${getLoyaltyBadgeClass(c.status)}">${c.status}</span>
        </h3>
        <p class="text-xs text-slate-400">${c.email} • ${c.phone}</p>
      </div>
    </div>
    <button onclick="closeModal('modal-customer-detail')" class="text-slate-400 hover:text-white p-1"><i data-lucide="x" class="w-5 h-5"></i></button>
  `;

  const custOrders = appState.orders.filter(o => o.customer.email === c.email || o.customer.id === c.id);
  const avgOrder = c.ordersCount > 0 ? Math.round(c.totalSpent / c.ordersCount) : 0;

  body.innerHTML = `
    <!-- Key Customer Metrics -->
    <div class="grid grid-cols-3 gap-3">
      <div class="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
        <p class="text-[10px] text-slate-400 uppercase font-semibold">Commandes Totales</p>
        <p class="text-lg font-black text-white mt-0.5">${c.ordersCount}</p>
      </div>
      <div class="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
        <p class="text-[10px] text-slate-400 uppercase font-semibold">Total Dépensé</p>
        <p class="text-sm font-black text-emerald-400 font-mono mt-1">${formatFCFA(c.totalSpent)}</p>
      </div>
      <div class="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
        <p class="text-[10px] text-slate-400 uppercase font-semibold">Panier Moyen</p>
        <p class="text-xs font-black text-indigo-300 font-mono mt-1">${formatFCFA(avgOrder)}</p>
      </div>
    </div>

    <!-- Contact & Location -->
    <div class="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2 text-xs">
      <h4 class="font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 text-[11px]">
        <i data-lucide="map-pin" class="w-4 h-4 text-indigo-400"></i> Adresse Principale
      </h4>
      <p class="text-slate-200 font-semibold">${c.city}, Sénégal</p>
      <p class="text-slate-400">Dernière activité enregistrée : <span class="font-mono text-slate-200">${c.lastOrderDate}</span></p>
    </div>

    <!-- Customer Order History -->
    <div class="space-y-3">
      <h4 class="font-bold uppercase tracking-wider text-slate-400 text-xs flex items-center gap-2">
        <i data-lucide="shopping-bag" class="w-4 h-4 text-indigo-400"></i> Historique des Commandes (${custOrders.length})
      </h4>
      ${custOrders.length > 0 ? `
        <div class="divide-y divide-slate-800/80 border border-slate-800 rounded-2xl overflow-hidden">
          ${custOrders.map(o => `
            <div class="p-3 bg-slate-950/40 flex items-center justify-between text-xs">
              <div>
                <p class="font-bold font-mono text-indigo-300">${o.id}</p>
                <p class="text-[10px] text-slate-400">${o.date.replace('T', ' ')} • ${o.items.length} article(s)</p>
              </div>
              <div class="text-right">
                <p class="font-mono font-bold text-white">${formatFCFA(o.totalAmount)}</p>
                <span class="inline-block text-[10px] px-2 py-0.5 rounded-full ${getStatusBadgeClass(o.status)} mt-0.5">${o.status}</span>
              </div>
            </div>
          `).join('')}
        </div>
      ` : `
        <p class="text-xs text-slate-500 italic">Aucune commande récente enregistrée dans le système.</p>
      `}
    </div>
  `;

  openModal('modal-customer-detail');
};
