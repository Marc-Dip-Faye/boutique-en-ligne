// SECTION 7: PROMOTIONS & MARKETING VIEW

function renderPromotionsView() {
  const container = document.getElementById('sec-promotions');
  if (!container) return;

  container.innerHTML = `
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <i data-lucide="ticket" class="w-6 h-6 text-indigo-400"></i>
          <span>Promotions & Codes Réduction</span>
        </h2>
        <p class="text-xs text-slate-400 mt-0.5">Créez et contrôlez vos offres promotionnelles pour stimuler les ventes de votre boutique.</p>
      </div>
      <button onclick="openPromoModal()" class="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all self-start sm:self-auto">
        <i data-lucide="plus-circle" class="w-4 h-4"></i>
        <span>Nouveau Code Promo</span>
      </button>
    </div>

    <!-- Active Promotions Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${appState.promotions.map(p => `
        <div class="glass-card p-5 space-y-4 flex flex-col justify-between border-l-4 ${p.status === 'Active' ? 'border-l-indigo-500' : 'border-l-slate-700'}">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-mono font-black text-lg text-white bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-xl tracking-wider">${p.code}</span>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'}">${p.status}</span>
            </div>
            <p class="text-xs text-slate-300 font-medium">${p.description}</p>
          </div>

          <div class="p-3 bg-slate-950/80 rounded-xl space-y-2 text-xs">
            <div class="flex justify-between text-slate-400">
              <span>Valeur Réduction :</span>
              <span class="font-bold text-emerald-400 font-mono">${p.type === 'Pourcentage' ? p.value + '%' : formatFCFA(p.value)}</span>
            </div>
            <div class="flex justify-between text-slate-400">
              <span>Utilisations :</span>
              <span class="font-bold text-white font-mono">${p.usageCount} / ${p.usageLimit}</span>
            </div>
            <div class="flex justify-between text-slate-400 text-[11px]">
              <span>Période :</span>
              <span class="font-mono text-slate-300">${p.startDate} au ${p.endDate}</span>
            </div>
          </div>

          <div class="pt-2 border-t border-slate-800 flex items-center justify-between">
            <button onclick="togglePromoStatus('${p.id}')" class="text-xs font-semibold ${p.status === 'Active' ? 'text-amber-400 hover:text-amber-300' : 'text-emerald-400 hover:text-emerald-300'} flex items-center gap-1">
              <i data-lucide="${p.status === 'Active' ? 'power-off' : 'power'}" class="w-3.5 h-3.5"></i>
              <span>${p.status === 'Active' ? 'Désactiver' : 'Activer'}</span>
            </button>

            <button onclick="deletePromo('${p.id}')" title="Supprimer" class="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300 transition-colors">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

window.openPromoModal = function() {
  document.getElementById('form-promo').reset();
  openModal('modal-promo');
};

document.getElementById('form-promo')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const code = document.getElementById('promo-code').value.toUpperCase().trim();
  const type = document.getElementById('promo-type').value;
  const value = parseFloat(document.getElementById('promo-value').value);
  const startDate = document.getElementById('promo-start').value || new Date().toISOString().substring(0,10);
  const endDate = document.getElementById('promo-end').value || '2026-12-31';

  const newPromo = {
    id: 'promo-' + Date.now(),
    code,
    description: `Code promo de ${type === 'Pourcentage' ? value + '%' : formatFCFA(value)}`,
    type,
    value,
    startDate,
    endDate,
    usageLimit: 100,
    usageCount: 0,
    status: 'Active'
  };

  appState.promotions.unshift(newPromo);
  showToast(`Nouveau code promo "${code}" créé avec succès !`, 'success');
  closeModal('modal-promo');
  renderPromotionsView();
});

window.togglePromoStatus = function(id) {
  const p = appState.promotions.find(item => item.id === id);
  if (!p) return;

  p.status = p.status === 'Active' ? 'Désactivée' : 'Active';
  showToast(`Le code promo "${p.code}" est maintenant : ${p.status}`, 'info');
  renderPromotionsView();
};

window.deletePromo = function(id) {
  const p = appState.promotions.find(item => item.id === id);
  if (!p) return;

  confirmDelete(
    `Supprimer le code promo ?`,
    `Voulez-vous vraiment supprimer le code "${p.code}" ?`,
    () => {
      appState.promotions = appState.promotions.filter(item => item.id !== id);
      showToast(`Le code promo "${p.code}" a été supprimé.`, 'error');
      renderPromotionsView();
    }
  );
};
