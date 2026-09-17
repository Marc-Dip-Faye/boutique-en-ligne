// SECTION 1: DASHBOARD VIEW
function renderDashboardView() {
  const container = document.getElementById('sec-dashboard');
  if (!container) return;

  const currentPeriodKey = appState.selectedPeriod || '7days';
  const periodData = STORE_DATA.analyticsData.periods[currentPeriodKey];

  container.innerHTML = `
    <!-- Header with Period Selector -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <span>Aperçu Général du Commerce</span>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20">En Direct</span>
        </h2>
        <p class="text-xs text-slate-400 mt-0.5">Suivi en temps réel de vos performances de vente et de vos indicateurs clés.</p>
      </div>

      <!-- Period Filter Buttons -->
      <div class="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl space-x-1 self-start sm:self-auto">
        <button onclick="changePeriod('today')" class="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${currentPeriodKey === 'today' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}">Aujourd'hui</button>
        <button onclick="changePeriod('7days')" class="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${currentPeriodKey === '7days' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}">7 derniers jours</button>
        <button onclick="changePeriod('30days')" class="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${currentPeriodKey === '30days' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}">30 jours</button>
        <button onclick="changePeriod('3months')" class="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${currentPeriodKey === '3months' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}">3 mois</button>
        <button onclick="changePeriod('year')" class="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${currentPeriodKey === 'year' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}">Année</button>
      </div>
    </div>

    <!-- Alert Banner Panel if low stock exists -->
    ${renderAlertBannerHtml()}

    <!-- KPI Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- KPI 1: CA / Chiffre d'affaires -->
      <div class="glass-card p-5 relative overflow-hidden group">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Chiffre d'affaires</span>
          <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <i data-lucide="wallet" class="w-5 h-5"></i>
          </div>
        </div>
        <div class="flex items-baseline justify-between">
          <p class="text-xl sm:text-2xl font-black text-white font-mono">${formatFCFA(periodData.ca)}</p>
          <span class="inline-flex items-center text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <i data-lucide="arrow-up-right" class="w-3 h-3 mr-0.5"></i> +14.2%
          </span>
        </div>
        <p class="text-[11px] text-slate-400 mt-2">Période sélectionnée</p>
      </div>

      <!-- KPI 2: Bénéfices Estimés -->
      <div class="glass-card p-5 relative overflow-hidden group">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Bénéfices Estimés</span>
          <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <i data-lucide="piggy-bank" class="w-5 h-5"></i>
          </div>
        </div>
        <div class="flex items-baseline justify-between">
          <p class="text-xl sm:text-2xl font-black text-emerald-400 font-mono">${formatFCFA(periodData.estimatedProfit)}</p>
          <span class="inline-flex items-center text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <i data-lucide="arrow-up-right" class="w-3 h-3 mr-0.5"></i> +18.5%
          </span>
        </div>
        <p class="text-[11px] text-slate-400 mt-2">Marge brute nette estimée</p>
      </div>

      <!-- KPI 3: Commandes totales -->
      <div class="glass-card p-5 relative overflow-hidden group">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Commandes Totales</span>
          <div class="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <i data-lucide="shopping-bag" class="w-5 h-5"></i>
          </div>
        </div>
        <div class="flex items-baseline justify-between">
          <p class="text-xl sm:text-2xl font-black text-white">${periodData.ordersCount}</p>
          <span class="inline-flex items-center text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
            <i data-lucide="arrow-up-right" class="w-3 h-3 mr-0.5"></i> +8.1%
          </span>
        </div>
        <p class="text-[11px] text-slate-400 mt-2">${periodData.productsSold} articles vendus</p>
      </div>

      <!-- KPI 4: Panier Moyen -->
      <div class="glass-card p-5 relative overflow-hidden group">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Panier Moyen</span>
          <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <i data-lucide="receipt" class="w-5 h-5"></i>
          </div>
        </div>
        <div class="flex items-baseline justify-between">
          <p class="text-xl sm:text-2xl font-black text-white font-mono">${formatFCFA(periodData.averageBasket)}</p>
          <span class="inline-flex items-center text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            <i data-lucide="minus" class="w-3 h-3 mr-0.5"></i> Stables
          </span>
        </div>
        <p class="text-[11px] text-slate-400 mt-2">Moyenne par client</p>
      </div>

    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Line Chart: Evolution du Chiffre d'affaires -->
      <div class="lg:col-span-2 glass-card p-5 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-bold text-base text-white flex items-center gap-2">
              <i data-lucide="line-chart" class="w-5 h-5 text-indigo-400"></i> Évolution des Revenus & Commandes
            </h3>
            <p class="text-xs text-slate-400">Performance financière en FCFA au fil du temps</p>
          </div>
          <span class="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">Croissance positive</span>
        </div>
        <div class="h-64 sm:h-72 w-full relative">
          <canvas id="chart-dashboard-sales"></canvas>
        </div>
      </div>

      <!-- Bar Chart: Category Revenue Breakdown -->
      <div class="glass-card p-5 space-y-4 flex flex-col justify-between">
        <div>
          <h3 class="font-bold text-base text-white flex items-center gap-2">
            <i data-lucide="pie-chart" class="w-5 h-5 text-emerald-400"></i> Répartition par Catégorie
          </h3>
          <p class="text-xs text-slate-400">Volume des ventes par secteur</p>
        </div>
        <div class="h-56 sm:h-64 w-full relative my-auto">
          <canvas id="chart-dashboard-categories"></canvas>
        </div>
      </div>

    </div>

    <!-- Bottom Grids: Recent Orders & Top Selling Products -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Recent Orders Widget -->
      <div class="glass-card p-5 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 class="font-bold text-base text-white flex items-center gap-2">
            <i data-lucide="clock" class="w-5 h-5 text-indigo-400"></i> Commandes Récentes
          </h3>
          <a href="#orders" class="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            Voir tout <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
        <div class="divide-y divide-slate-800/60">
          ${appState.orders.slice(0, 4).map(o => `
            <div class="py-3 flex items-center justify-between hover:bg-slate-900/40 px-2 rounded-xl transition-colors">
              <div class="flex items-center space-x-3">
                <div class="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-300 font-bold text-xs">
                  #
                </div>
                <div>
                  <a href="#orders" onclick="openOrderDetailModal('${o.id}')" class="font-bold text-xs text-white hover:text-indigo-400 transition-colors">${o.id}</a>
                  <p class="text-[11px] text-slate-400">${o.customer.name} • ${o.items.length} article(s)</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-mono font-bold text-xs text-white">${formatFCFA(o.totalAmount)}</p>
                <span class="inline-block text-[10px] px-2 py-0.5 rounded-full ${getStatusBadgeClass(o.status)} mt-0.5">${o.status}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Top Selling Products Widget -->
      <div class="glass-card p-5 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 class="font-bold text-base text-white flex items-center gap-2">
            <i data-lucide="flame" class="w-5 h-5 text-amber-400"></i> Produits les Plus Vendus
          </h3>
          <a href="#products" class="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            Catalogue <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
        <div class="divide-y divide-slate-800/60">
          ${[...appState.products].sort((a,b) => b.salesCount - a.salesCount).slice(0, 4).map(p => `
            <div class="py-3 flex items-center justify-between hover:bg-slate-900/40 px-2 rounded-xl transition-colors">
              <div class="flex items-center space-x-3">
                <img class="w-10 h-10 rounded-lg object-cover border border-slate-800" src="${p.image}" alt="${p.name}">
                <div>
                  <h4 class="font-bold text-xs text-white line-clamp-1">${p.name}</h4>
                  <p class="text-[11px] text-slate-400">${p.category} • SKU: <span class="font-mono">${p.sku}</span></p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-xs text-emerald-400">${p.salesCount} ventes</p>
                <p class="font-mono text-[11px] text-slate-400">${formatFCFA(p.price)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;

  // Init Dashboard Charts
  initDashboardCharts(periodData);
}

// Period switcher helper
window.changePeriod = function(periodKey) {
  appState.selectedPeriod = periodKey;
  renderDashboardView();
  showToast(`Période mise à jour: ${getPeriodLabel(periodKey)}`, 'info');
};

function getPeriodLabel(key) {
  const map = {
    'today': "Aujourd'hui",
    '7days': '7 derniers jours',
    '30days': '30 derniers jours',
    '3months': '3 derniers mois',
    'year': 'Année en cours'
  };
  return map[key] || key;
}

// Low Stock Alert Banner Component
function renderAlertBannerHtml() {
  const lowStockProds = appState.products.filter(p => p.stock <= p.minStock);
  const pendingOrders = appState.orders.filter(o => o.status === 'En attente');

  if (lowStockProds.length === 0 && pendingOrders.length === 0) return '';

  return `
    <div class="p-4 rounded-xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/40 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
          <i data-lucide="bell-ring" class="w-5 h-5 animate-bounce"></i>
        </div>
        <div>
          <h4 class="font-bold text-sm text-white">Attention : Actions requises</h4>
          <p class="text-xs text-slate-300">
            ${lowStockProds.length > 0 ? `<span class="text-amber-300 font-semibold">${lowStockProds.length} produit(s)</span> en stock faible ou rupture. ` : ''}
            ${pendingOrders.length > 0 ? `<span class="text-indigo-300 font-semibold">${pendingOrders.length} commande(s)</span> en attente de confirmation.` : ''}
          </p>
        </div>
      </div>
      <div class="flex items-center space-x-2 shrink-0">
        ${lowStockProds.length > 0 ? `<a href="#stock" class="px-3 py-1.5 text-xs font-bold text-amber-300 hover:text-white bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded-xl transition-all">Gérer le stock</a>` : ''}
        ${pendingOrders.length > 0 ? `<a href="#orders" class="px-3 py-1.5 text-xs font-bold text-indigo-300 hover:text-white bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 rounded-xl transition-all">Traiter commandes</a>` : ''}
      </div>
    </div>
  `;
}

// Chart.js Setup for Dashboard
function initDashboardCharts(periodData) {
  // Chart 1: Line Revenue Chart
  const ctxSales = document.getElementById('chart-dashboard-sales')?.getContext('2d');
  if (ctxSales) {
    if (appState.activeCharts['dashSales']) {
      appState.activeCharts['dashSales'].destroy();
    }

    const gradient = ctxSales.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

    appState.activeCharts['dashSales'] = new Chart(ctxSales, {
      type: 'line',
      data: {
        labels: periodData.chartLabels,
        datasets: [{
          label: "Chiffre d'affaires (FCFA)",
          data: periodData.chartRevenue,
          borderColor: '#818cf8',
          borderWidth: 3,
          backgroundColor: gradient,
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#6366f1',
          pointBorderColor: '#ffffff',
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#f8fafc',
            bodyColor: '#38bdf8',
            borderColor: '#334155',
            borderWidth: 1,
            callbacks: {
              label: (ctx) => `Revenus: ${formatFCFA(ctx.raw)}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(51, 65, 85, 0.3)' },
            ticks: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 11 } }
          },
          y: {
            grid: { color: 'rgba(51, 65, 85, 0.3)' },
            ticks: {
              color: '#94a3b8',
              font: { family: 'Plus Jakarta Sans', size: 11 },
              callback: (val) => val >= 1000000 ? (val/1000000) + 'M' : val >= 1000 ? (val/1000) + 'k' : val
            }
          }
        }
      }
    });
  }

  // Chart 2: Category Doughnut Chart
  const ctxCat = document.getElementById('chart-dashboard-categories')?.getContext('2d');
  if (ctxCat) {
    if (appState.activeCharts['dashCat']) {
      appState.activeCharts['dashCat'].destroy();
    }

    const catLabels = appState.categories.map(c => c.name);
    const catCounts = appState.categories.map(c => c.productCount * 125000); // Fictional calculation

    appState.activeCharts['dashCat'] = new Chart(ctxCat, {
      type: 'doughnut',
      data: {
        labels: catLabels,
        datasets: [{
          data: catCounts,
          backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#3b82f6'],
          borderWidth: 2,
          borderColor: '#0f172a'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#cbd5e1', font: { family: 'Plus Jakarta Sans', size: 10 }, boxWidth: 10 }
          }
        },
        cutout: '70%'
      }
    });
  }
}

// Status badge helper
function getStatusBadgeClass(status) {
  switch (status) {
    case 'Livrée':
    case 'Payé':
    case 'Publié':
    case 'Active':
      return 'badge-success';
    case 'En préparation':
    case 'Expédiée':
    case 'Confirmée':
    case 'Régulier':
    case 'Fidèle':
      return 'badge-info';
    case 'En attente':
    case 'Stock Faible':
    case 'Masqué':
      return 'badge-warning';
    case 'Annulée':
    case 'Retournée':
    case 'Rupture':
    case 'Invalide':
      return 'badge-danger';
    default:
      return 'badge-neutral';
  }
}
