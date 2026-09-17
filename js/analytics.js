// SECTION 9: ADVANCED ANALYTICS & REPORTING VIEW

function renderAnalyticsView() {
  const container = document.getElementById('sec-analytics');
  if (!container) return;

  const yearData = STORE_DATA.analyticsData.periods['year'];

  container.innerHTML = `
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <i data-lucide="trending-up" class="w-6 h-6 text-indigo-400"></i>
          <span>Statistiques & Analyses Approfondies</span>
        </h2>
        <p class="text-xs text-slate-400 mt-0.5">Outil de pilotage financier, analyse des marges, rétention client et rentabilité des produits.</p>
      </div>
      <button onclick="window.print()" class="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-all self-start sm:self-auto">
        <i data-lucide="download" class="w-4 h-4"></i>
        <span>Exporter le Rapport PDF</span>
      </button>
    </div>

    <!-- Analytics Key Executive Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="glass-card p-5 space-y-1">
        <p class="text-xs font-semibold uppercase text-slate-400">Taux de Conversion Global</p>
        <p class="text-2xl font-black text-emerald-400 font-mono">3.82%</p>
        <p class="text-[11px] text-slate-400">+0.6% vs trimestre précédent</p>
      </div>
      <div class="glass-card p-5 space-y-1">
        <p class="text-xs font-semibold uppercase text-slate-400">Marge Brute Moyenne</p>
        <p class="text-2xl font-black text-indigo-400 font-mono">25.4%</p>
        <p class="text-[11px] text-slate-400">Excellente rentabilité nette</p>
      </div>
      <div class="glass-card p-5 space-y-1">
        <p class="text-xs font-semibold uppercase text-slate-400">Rétention Client (Réachat)</p>
        <p class="text-2xl font-black text-white font-mono">42.1%</p>
        <p class="text-[11px] text-slate-400">Clients fidèles réguliers</p>
      </div>
      <div class="glass-card p-5 space-y-1">
        <p class="text-xs font-semibold uppercase text-slate-400">Taux de Retour Produit</p>
        <p class="text-2xl font-black text-amber-400 font-mono">1.2%</p>
        <p class="text-[11px] text-slate-400">Très faible taux de réclamation</p>
      </div>
    </div>

    <!-- Advanced Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Chart 1: Monthly CA vs Margins Bar Chart -->
      <div class="glass-card p-5 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-bold text-base text-white flex items-center gap-2">
              <i data-lucide="bar-chart-3" class="w-5 h-5 text-indigo-400"></i> Revenus & Bénéfices par Mois
            </h3>
            <p class="text-xs text-slate-400">Comparatif Chiffre d'affaires vs Bénéfices (en FCFA)</p>
          </div>
        </div>
        <div class="h-64 w-full relative">
          <canvas id="chart-analytics-revenue"></canvas>
        </div>
      </div>

      <!-- Chart 2: Customer Acquisition & Retention Line Chart -->
      <div class="glass-card p-5 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-bold text-base text-white flex items-center gap-2">
              <i data-lucide="users" class="w-5 h-5 text-emerald-400"></i> Acquisition & Croissance Clients
            </h3>
            <p class="text-xs text-slate-400">Évolution du volume de commandes mensuelles</p>
          </div>
        </div>
        <div class="h-64 w-full relative">
          <canvas id="chart-analytics-orders"></canvas>
        </div>
      </div>

    </div>

    <!-- Top Profitable Products Table -->
    <div class="glass-card p-5 space-y-4">
      <h3 class="font-bold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
        <i data-lucide="trophy" class="w-5 h-5 text-amber-400"></i> Top 5 des Produits les Plus Rentables (Bénéfices Bruts)
      </h3>

      <div class="table-container">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th class="p-3">Produit</th>
              <th class="p-3">Prix de Vente</th>
              <th class="p-3">Coût d'Achat</th>
              <th class="p-3 text-center">Marge Unitaire</th>
              <th class="p-3 text-center">Ventes Cumulées</th>
              <th class="p-3 text-right">Bénéfice Total Estimé</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60">
            ${appState.products.slice(0, 5).map(p => {
              const cost = p.costPrice || Math.round(p.price * 0.7);
              const marginUnit = (p.promoPrice || p.price) - cost;
              const totalProfit = marginUnit * p.salesCount;
              return `
                <tr class="hover:bg-slate-900/40">
                  <td class="p-3 font-bold text-white flex items-center space-x-3">
                    <img class="w-8 h-8 rounded-lg object-cover border border-slate-800" src="${p.image}" alt="${p.name}">
                    <span class="line-clamp-1">${p.name}</span>
                  </td>
                  <td class="p-3 font-mono text-slate-300">${formatFCFA(p.promoPrice || p.price)}</td>
                  <td class="p-3 font-mono text-slate-400">${formatFCFA(cost)}</td>
                  <td class="p-3 text-center font-mono font-bold text-emerald-400">+${formatFCFA(marginUnit)}</td>
                  <td class="p-3 text-center font-bold text-white">${p.salesCount}</td>
                  <td class="p-3 text-right font-mono font-black text-emerald-400 text-sm">${formatFCFA(totalProfit)}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  initAnalyticsCharts(yearData);
}

function initAnalyticsCharts(yearData) {
  // Chart 1: Revenue & Profit
  const ctxRev = document.getElementById('chart-analytics-revenue')?.getContext('2d');
  if (ctxRev) {
    if (appState.activeCharts['analyticsRev']) appState.activeCharts['analyticsRev'].destroy();

    appState.activeCharts['analyticsRev'] = new Chart(ctxRev, {
      type: 'bar',
      data: {
        labels: yearData.chartLabels,
        datasets: [
          {
            label: "Chiffre d'affaires",
            data: yearData.chartRevenue,
            backgroundColor: '#6366f1',
            borderRadius: 6
          },
          {
            label: 'Bénéfice Estimé',
            data: yearData.chartRevenue.map(v => Math.round(v * 0.25)),
            backgroundColor: '#10b981',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { color: '#cbd5e1', font: { family: 'Plus Jakarta Sans', size: 11 } } },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label} : ${formatFCFA(ctx.raw)}`
            }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
          y: {
            grid: { color: 'rgba(51, 65, 85, 0.3)' },
            ticks: {
              color: '#94a3b8',
              callback: (v) => v >= 1000000 ? (v/1000000) + 'M' : v
            }
          }
        }
      }
    });
  }

  // Chart 2: Order Volume Line
  const ctxOrd = document.getElementById('chart-analytics-orders')?.getContext('2d');
  if (ctxOrd) {
    if (appState.activeCharts['analyticsOrd']) appState.activeCharts['analyticsOrd'].destroy();

    appState.activeCharts['analyticsOrd'] = new Chart(ctxOrd, {
      type: 'line',
      data: {
        labels: yearData.chartLabels,
        datasets: [{
          label: 'Commandes Mensuelles',
          data: yearData.chartOrders,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.3,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { grid: { color: 'rgba(51, 65, 85, 0.3)' }, ticks: { color: '#94a3b8' } },
          y: { grid: { color: 'rgba(51, 65, 85, 0.3)' }, ticks: { color: '#94a3b8' } }
        }
      }
    });
  }
}
