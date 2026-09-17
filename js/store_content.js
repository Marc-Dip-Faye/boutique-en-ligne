// SECTION 8: STORE CONTENT MANAGEMENT VIEW

function renderContentView() {
  const container = document.getElementById('sec-content');
  if (!container) return;

  const content = appState.storeContent;
  const featuredProds = appState.products.filter(p => p.isFeatured);

  container.innerHTML = `
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <i data-lucide="layout-template" class="w-6 h-6 text-indigo-400"></i>
          <span>Contenu & Visuel de la Boutique</span>
        </h2>
        <p class="text-xs text-slate-400 mt-0.5">Contrôlez les bannières, annonces en haut de page et sélections de produits mis en avant sur le site public.</p>
      </div>
      <button onclick="saveContentSettings()" class="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all self-start sm:self-auto">
        <i data-lucide="save" class="w-4 h-4"></i>
        <span>Publier les Modifications</span>
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Panel 1: Main Hero Banner Settings -->
      <div class="glass-card p-5 space-y-4">
        <h3 class="font-bold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <i data-lucide="image" class="w-5 h-5 text-indigo-400"></i> Bannière Principale (Hero)
        </h3>

        <div class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-slate-300 mb-1">Titre Principal de la Bannière</label>
            <input type="text" id="content-hero-title" value="${content.heroBannerTitle}" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500">
          </div>

          <div>
            <label class="block font-semibold text-slate-300 mb-1">Sous-titre / Slogan d'Accroche</label>
            <input type="text" id="content-hero-sub" value="${content.heroBannerSubtitle}" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500">
          </div>

          <div>
            <label class="block font-semibold text-slate-300 mb-1">URL de l'Image de Fond</label>
            <input type="text" id="content-hero-img" value="${content.heroBannerImage}" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500">
          </div>

          <!-- Live Preview Box -->
          <div class="pt-2">
            <label class="block font-semibold text-slate-400 mb-1 text-[11px] uppercase tracking-wider">Aperçu Visuel de la Bannière</label>
            <div class="relative h-40 rounded-2xl overflow-hidden border border-slate-800 flex items-center p-6 text-white bg-cover bg-center" style="background-image: url('${content.heroBannerImage}');">
              <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent"></div>
              <div class="relative z-10 max-w-sm space-y-1">
                <span class="px-2 py-0.5 rounded bg-indigo-600 text-[10px] font-bold uppercase tracking-wider">Offre Vedette</span>
                <h4 class="font-bold text-sm leading-tight text-white">${content.heroBannerTitle}</h4>
                <p class="text-[11px] text-slate-300 line-clamp-1">${content.heroBannerSubtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Panel 2: Announcements & Toggles -->
      <div class="glass-card p-5 space-y-4">
        <h3 class="font-bold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <i data-lucide="megaphone" class="w-5 h-5 text-emerald-400"></i> Barre d'Annonce & Livraisons
        </h3>

        <div class="space-y-4 text-xs">
          <!-- Toggle Switch for Top Announcement -->
          <div class="flex items-center justify-between p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <div>
              <p class="font-bold text-white">Afficher la Barre d'Annonce</p>
              <p class="text-[11px] text-slate-400">Active un ruban d'information au sommet du site marchand.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="content-ann-toggle" ${content.showAnnouncement ? 'checked' : ''} class="sr-only switch-checkbox">
              <div class="w-10 h-6 bg-slate-800 rounded-full switch-label transition-colors p-0.5">
                <div class="w-5 h-5 bg-white rounded-full switch-ball transition-transform"></div>
              </div>
            </label>
          </div>

          <div>
            <label class="block font-semibold text-slate-300 mb-1">Texte du Message d'Annonce</label>
            <input type="text" id="content-ann-text" value="${content.topAnnouncementText}" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500">
          </div>

          <!-- Free Shipping Toggle & Threshold -->
          <div class="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-bold text-white">Livraison Gratuite Automatique</p>
                <p class="text-[11px] text-slate-400">Propose la livraison offerte au-dessus d'un certain montant d'achat.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="content-shipping-toggle" ${content.enableFreeShippingBanner ? 'checked' : ''} class="sr-only switch-checkbox">
                <div class="w-10 h-6 bg-slate-800 rounded-full switch-label transition-colors p-0.5">
                  <div class="w-5 h-5 bg-white rounded-full switch-ball transition-transform"></div>
                </div>
              </label>
            </div>

            <div>
              <label class="block font-semibold text-slate-300 mb-1">Seuil Minimum d'Achat pour Livraison Gratuite (FCFA)</label>
              <input type="number" id="content-shipping-threshold" value="${content.freeShippingThreshold}" class="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-none focus:border-indigo-500">
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Featured Products Selector Grid -->
    <div class="glass-card p-5 space-y-4">
      <div class="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 class="font-bold text-base text-white flex items-center gap-2">
            <i data-lucide="sparkles" class="w-5 h-5 text-amber-400"></i> Produits Mis en Avant sur la Page d'Accueil
          </h3>
          <p class="text-xs text-slate-400">Cochez les articles à afficher dans la section "Vedettes" de la boutique.</p>
        </div>
        <span class="text-xs font-bold text-indigo-400 font-mono">${featuredProds.length} séléctionné(s)</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        ${appState.products.map(p => `
          <div onclick="toggleFeaturedProduct('${p.id}')" class="p-3 rounded-xl border cursor-pointer transition-all ${p.isFeatured ? 'bg-indigo-950/40 border-indigo-500/50 shadow-md' : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'} flex items-center space-x-3">
            <img class="w-10 h-10 rounded-lg object-cover border border-slate-800" src="${p.image}" alt="${p.name}">
            <div class="flex-1 min-w-0">
              <h4 class="font-bold text-xs text-white line-clamp-1">${p.name}</h4>
              <p class="text-[10px] text-slate-400 font-mono">${formatFCFA(p.price)}</p>
            </div>
            <div class="w-5 h-5 rounded-full flex items-center justify-center ${p.isFeatured ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-transparent'}">
              ✓
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

window.toggleFeaturedProduct = function(id) {
  const p = appState.products.find(item => item.id === id);
  if (!p) return;

  p.isFeatured = !p.isFeatured;
  renderContentView();
};

window.saveContentSettings = function() {
  const heroTitle = document.getElementById('content-hero-title')?.value;
  const heroSub = document.getElementById('content-hero-sub')?.value;
  const heroImg = document.getElementById('content-hero-img')?.value;
  const annToggle = document.getElementById('content-ann-toggle')?.checked;
  const annText = document.getElementById('content-ann-text')?.value;
  const shippingToggle = document.getElementById('content-shipping-toggle')?.checked;
  const shippingThreshold = parseFloat(document.getElementById('content-shipping-threshold')?.value || '100000');

  appState.storeContent = {
    heroBannerTitle: heroTitle,
    heroBannerSubtitle: heroSub,
    heroBannerImage: heroImg,
    topAnnouncementText: annText,
    showAnnouncement: annToggle,
    enableFreeShippingBanner: shippingToggle,
    freeShippingThreshold: shippingThreshold
  };

  showToast(`Modifications du contenu de la boutique publiées en ligne !`, 'success');
  renderContentView();
};
