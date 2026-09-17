// SECTION 10: SETTINGS VIEW

function renderSettingsView() {
  const container = document.getElementById('sec-settings');
  if (!container) return;

  const info = appState.storeInfo;

  container.innerHTML = `
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <i data-lucide="settings" class="w-6 h-6 text-indigo-400"></i>
          <span>Paramètres de la Boutique</span>
        </h2>
        <p class="text-xs text-slate-400 mt-0.5">Configuration générale, coordonnées, passerelles de paiement mobile et profil administrateur.</p>
      </div>
      <button onclick="saveStoreSettings()" class="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all self-start sm:self-auto">
        <i data-lucide="save" class="w-4 h-4"></i>
        <span>Enregistrer les Paramètres</span>
      </button>
    </div>

    <!-- Settings Tabs / Panels Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- General Store Identity -->
      <div class="glass-card p-5 space-y-4">
        <h3 class="font-bold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <i data-lucide="store" class="w-5 h-5 text-indigo-400"></i> Identité de la Boutique
        </h3>

        <div class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-slate-300 mb-1">Nom de la Boutique *</label>
            <input type="text" id="set-store-name" value="${info.name}" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500">
          </div>

          <div>
            <label class="block font-semibold text-slate-300 mb-1">Raison Sociale Légal</label>
            <input type="text" id="set-legal-name" value="${info.legalName}" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500">
          </div>

          <div>
            <label class="block font-semibold text-slate-300 mb-1">Devise Principale</label>
            <input type="text" value="FCFA (Franc CFA)" disabled class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 font-mono font-bold cursor-not-allowed">
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-slate-300 mb-1">E-mail de contact *</label>
              <input type="email" id="set-email" value="${info.email}" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500">
            </div>
            <div>
              <label class="block font-semibold text-slate-300 mb-1">Téléphone de contact *</label>
              <input type="text" id="set-phone" value="${info.phone}" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500">
            </div>
          </div>

          <div>
            <label class="block font-semibold text-slate-300 mb-1">Adresse Géographique</label>
            <textarea id="set-address" rows="2" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500">${info.address}</textarea>
          </div>
        </div>
      </div>

      <!-- Payment Gateways & Shipping Methods -->
      <div class="glass-card p-5 space-y-4">
        <h3 class="font-bold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <i data-lucide="credit-card" class="w-5 h-5 text-emerald-400"></i> Méthodes de Paiement Actives
        </h3>

        <div class="space-y-3 text-xs">
          
          <!-- Wave -->
          <div class="p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
                🌊
              </div>
              <div>
                <p class="font-bold text-white">Wave Mobile Money</p>
                <p class="text-[10px] text-slate-400">Paiement QR & API direct sans frais</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Activé</span>
          </div>

          <!-- Orange Money -->
          <div class="p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                🍊
              </div>
              <div>
                <p class="font-bold text-white">Orange Money Web Payment</p>
                <p class="text-[10px] text-slate-400">Passerelle sécurisée USSD & App</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Activé</span>
          </div>

          <!-- Carte Bancaire Visa -->
          <div class="p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold">
                💳
              </div>
              <div>
                <p class="font-bold text-white">Carte Bancaire (Visa / Mastercard)</p>
                <p class="text-[10px] text-slate-400">Sécurité 3D-Secure universelle</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Activé</span>
          </div>

          <!-- Paiement Livraison -->
          <div class="p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center font-bold">
                💵
              </div>
              <div>
                <p class="font-bold text-white">Paiement Cash à la Livraison</p>
                <p class="text-[10px] text-slate-400">Règlement en espèce lors de la réception</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Activé</span>
          </div>

        </div>
      </div>

    </div>

    <!-- Admin Account Profile Box -->
    <div class="glass-card p-5 space-y-4">
      <h3 class="font-bold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
        <i data-lucide="user-check" class="w-5 h-5 text-indigo-400"></i> Compte Administrateur Connecté
      </h3>

      <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <img class="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" alt="Admin Avatar">
        <div class="text-center sm:text-left space-y-1">
          <h4 class="font-bold text-sm text-white">Aminata Diallo</h4>
          <p class="text-xs text-slate-400">Administrateur Principal • <span class="text-indigo-400">aminata.admin@apexstore.sn</span></p>
          <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Accès Total Administrateur</span>
        </div>
      </div>
    </div>
  `;
}

window.saveStoreSettings = function() {
  const name = document.getElementById('set-store-name')?.value;
  const legalName = document.getElementById('set-legal-name')?.value;
  const email = document.getElementById('set-email')?.value;
  const phone = document.getElementById('set-phone')?.value;
  const address = document.getElementById('set-address')?.value;

  appState.storeInfo = {
    ...appState.storeInfo,
    name, legalName, email, phone, address
  };

  showToast(`Paramètres de la boutique sauvegardés avec succès.`, 'success');
  renderSettingsView();
};
