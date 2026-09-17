// SECTION 5: ORDERS MANAGEMENT VIEW & ORDER DETAIL MODAL

function renderOrdersView() {
  const container = document.getElementById('sec-orders');
  if (!container) return;

  container.innerHTML = `
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <i data-lucide="shopping-cart" class="w-6 h-6 text-indigo-400"></i>
          <span>Gestion des Commandes Clients</span>
        </h2>
        <p class="text-xs text-slate-400 mt-0.5">Suivez le statut des commandes, la livraison, le paiement et les détails de facturation.</p>
      </div>
    </div>

    <!-- Order Toolbar Filters -->
    <div class="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      
      <!-- Search Order -->
      <div class="relative w-full md:w-80">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <i data-lucide="search" class="w-4 h-4"></i>
        </div>
        <input type="text" id="order-search-input" onkeyup="filterOrders()" placeholder="Rechercher par n° de commande, client, email..." class="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500">
      </div>

      <!-- Status Filters -->
      <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
        <select id="order-status-filter" onchange="filterOrders()" class="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500">
          <option value="ALL">Tous les statuts</option>
          <option value="En attente">En attente</option>
          <option value="Confirmée">Confirmée</option>
          <option value="En préparation">En préparation</option>
          <option value="Expédiée">Expédiée</option>
          <option value="Livrée">Livrée</option>
          <option value="Annulée">Annulée</option>
        </select>
      </div>

    </div>

    <!-- Orders Table Container -->
    <div class="glass-card overflow-hidden">
      <div class="table-container">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-800 bg-slate-900/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th class="p-4">N° Commande</th>
              <th class="p-4">Client</th>
              <th class="p-4">Date & Heure</th>
              <th class="p-4 text-center">Articles</th>
              <th class="p-4 text-right">Montant Total</th>
              <th class="p-4">Moyen de Paiement</th>
              <th class="p-4 text-center">Statut</th>
              <th class="p-4 text-right">Détails</th>
            </tr>
          </thead>
          <tbody id="orders-table-body" class="divide-y divide-slate-800/60 text-xs">
            <!-- Dynamic rows -->
          </tbody>
        </table>
      </div>

      <!-- Empty State Slot -->
      <div id="orders-empty-state" class="hidden p-12 text-center space-y-3">
        <div class="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-400 mx-auto flex items-center justify-center">
          <i data-lucide="shopping-bag" class="w-6 h-6"></i>
        </div>
        <h3 class="font-bold text-sm text-white">Aucune commande trouvée</h3>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">Aucune commande ne correspond au filtre sélectionné.</p>
      </div>
    </div>
  `;

  renderOrderRows(appState.orders);
}

function renderOrderRows(ordersList) {
  const tbody = document.getElementById('orders-table-body');
  const emptyState = document.getElementById('orders-empty-state');
  if (!tbody || !emptyState) return;

  if (!ordersList || ordersList.length === 0) {
    tbody.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  tbody.innerHTML = ordersList.map(o => `
    <tr class="hover:bg-slate-900/40 transition-colors">
      <!-- Order ID -->
      <td class="p-4">
        <a href="#" onclick="openOrderDetailModal('${o.id}'); return false;" class="font-bold font-mono text-indigo-400 hover:underline flex items-center gap-1.5">
          <span>${o.id}</span>
        </a>
      </td>

      <!-- Customer -->
      <td class="p-4">
        <p class="font-bold text-white">${o.customer.name}</p>
        <p class="text-[10px] text-slate-400">${o.customer.email}</p>
      </td>

      <!-- Date -->
      <td class="p-4 text-slate-300 font-mono text-[11px]">
        ${o.date.replace('T', ' ')}
      </td>

      <!-- Items Count -->
      <td class="p-4 text-center font-bold text-slate-200">
        ${o.items.reduce((acc, i) => acc + i.quantity, 0)}
      </td>

      <!-- Total Amount -->
      <td class="p-4 text-right font-mono font-bold text-white text-sm">
        ${formatFCFA(o.totalAmount)}
      </td>

      <!-- Payment Mode -->
      <td class="p-4 text-slate-300">
        <span class="inline-flex items-center text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700/60 font-medium">
          <i data-lucide="credit-card" class="w-3.5 h-3.5 mr-1.5 text-emerald-400"></i> ${o.paymentMethod}
        </span>
      </td>

      <!-- Status -->
      <td class="p-4 text-center">
        <span class="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusBadgeClass(o.status)}">
          ${o.status}
        </span>
      </td>

      <!-- Action -->
      <td class="p-4 text-right">
        <button onclick="openOrderDetailModal('${o.id}')" class="px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-xl transition-all">
          Inspecter
        </button>
      </td>
    </tr>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// Filter orders
window.filterOrders = function() {
  const query = document.getElementById('order-search-input')?.value.toLowerCase().trim() || '';
  const status = document.getElementById('order-status-filter')?.value || 'ALL';

  const filtered = appState.orders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(query) || o.customer.name.toLowerCase().includes(query) || o.customer.email.toLowerCase().includes(query);
    const matchStatus = status === 'ALL' || o.status === status;
    return matchSearch && matchStatus;
  });

  renderOrderRows(filtered);
};

// OPEN DETAILED ORDER MODAL
window.openOrderDetailModal = function(orderId) {
  const order = appState.orders.find(o => o.id === orderId);
  if (!order) return;

  const header = document.getElementById('order-detail-header');
  const body = document.getElementById('order-detail-body');

  header.innerHTML = `
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
        <i data-lucide="file-text" class="w-5 h-5"></i>
      </div>
      <div>
        <h3 class="font-bold text-base text-white">Fiche Commande <span class="font-mono text-indigo-300">${order.id}</span></h3>
        <p class="text-xs text-slate-400">Passée le ${order.date.replace('T', ' à ')}</p>
      </div>
    </div>
    <div class="flex items-center space-x-3">
      <select onchange="updateOrderStatus('${order.id}', this.value)" class="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-bold text-indigo-300 focus:outline-none">
        <option value="En attente" ${order.status === 'En attente' ? 'selected' : ''}>En attente</option>
        <option value="Confirmée" ${order.status === 'Confirmée' ? 'selected' : ''}>Confirmée</option>
        <option value="En préparation" ${order.status === 'En préparation' ? 'selected' : ''}>En préparation</option>
        <option value="Expédiée" ${order.status === 'Expédiée' ? 'selected' : ''}>Expédiée</option>
        <option value="Livrée" ${order.status === 'Livrée' ? 'selected' : ''}>Livrée</option>
        <option value="Annulée" ${order.status === 'Annulée' ? 'selected' : ''}>Annulée</option>
      </select>
      <button onclick="closeModal('modal-order-detail')" class="text-slate-400 hover:text-white p-1"><i data-lucide="x" class="w-5 h-5"></i></button>
    </div>
  `;

  // Step Timeline Logic
  const steps = [
    { title: "Commande Passée", statusKey: "En attente", done: true },
    { title: "Paiement Confirmé", statusKey: "Confirmée", done: ["Confirmée", "En préparation", "Expédiée", "Livrée"].includes(order.status) },
    { title: "En Préparation", statusKey: "En préparation", done: ["En préparation", "Expédiée", "Livrée"].includes(order.status) },
    { title: "Expédiée / En Transit", statusKey: "Expédiée", done: ["Expédiée", "Livrée"].includes(order.status) },
    { title: "Livrée au Client", statusKey: "Livrée", done: order.status === "Livrée" }
  ];

  body.innerHTML = `
    <!-- Visual Order Progress Timeline -->
    <div class="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
      <h4 class="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
        <i data-lucide="git-commit" class="w-4 h-4"></i> Suivi de Livraison
      </h4>
      <div class="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
        ${steps.map((st, i) => `
          <div class="flex flex-col items-center text-center p-2 rounded-xl ${st.done ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-300' : 'bg-slate-900 border border-slate-800 text-slate-500'}">
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${st.done ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'} mb-1">
              ${st.done ? '✓' : i+1}
            </div>
            <p class="text-[10px] font-bold leading-tight">${st.title}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Client & Delivery Info Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      <!-- Customer Box -->
      <div class="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <i data-lucide="user" class="w-4 h-4 text-indigo-400"></i> Informations Client
        </h4>
        <p class="font-bold text-sm text-white">${order.customer.name}</p>
        <p class="text-xs text-slate-300">${order.customer.email}</p>
        <p class="text-xs text-slate-300 font-mono">${order.customer.phone}</p>
      </div>

      <!-- Shipping & Payment Box -->
      <div class="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <i data-lucide="map-pin" class="w-4 h-4 text-emerald-400"></i> Adresse & Paiement
        </h4>
        <p class="text-xs text-slate-200"><span class="text-slate-400">Livraison :</span> ${order.customer.address}</p>
        <p class="text-xs text-slate-200"><span class="text-slate-400">Paiement :</span> ${order.paymentMethod} (<span class="text-emerald-400 font-bold">${order.paymentStatus}</span>)</p>
      </div>

    </div>

    <!-- Articles Table -->
    <div class="space-y-3">
      <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
        <i data-lucide="package" class="w-4 h-4 text-indigo-400"></i> Articles Commandés (${order.items.length})
      </h4>
      <div class="border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800">
        ${order.items.map(item => `
          <div class="p-3 bg-slate-950/40 flex items-center justify-between text-xs">
            <div>
              <p class="font-bold text-white">${item.name}</p>
              <p class="text-[11px] text-slate-400">${formatFCFA(item.price)} x ${item.quantity}</p>
            </div>
            <p class="font-mono font-bold text-slate-100">${formatFCFA(item.total)}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Invoice Financial Summary -->
    <div class="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2 text-xs">
      <div class="flex justify-between text-slate-400">
        <span>Sous-total articles :</span>
        <span class="font-mono text-slate-200">${formatFCFA(order.subtotal)}</span>
      </div>
      <div class="flex justify-between text-slate-400">
        <span>Frais de livraison :</span>
        <span class="font-mono text-slate-200">${formatFCFA(order.shippingCost)}</span>
      </div>
      ${order.discount > 0 ? `
        <div class="flex justify-between text-emerald-400">
          <span>Remise promotionnelle :</span>
          <span class="font-mono">-${formatFCFA(order.discount)}</span>
        </div>
      ` : ''}
      <div class="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm text-white">
        <span>Total Général (TTC) :</span>
        <span class="font-mono text-emerald-400 text-base">${formatFCFA(order.totalAmount)}</span>
      </div>
    </div>
  `;

  openModal('modal-order-detail');
};

// Update Order Status Handler
window.updateOrderStatus = function(orderId, newStatus) {
  const order = appState.orders.find(o => o.id === orderId);
  if (!order) return;

  order.status = newStatus;
  if (newStatus === 'Livrée') {
    order.paymentStatus = 'Payé';
    order.shippingStatus = 'Livrée';
  }

  showToast(`Commande ${orderId} mise à jour au statut : ${newStatus}`, 'success');
  openOrderDetailModal(orderId);
  renderOrdersView();
};
