// ApexStore Back-Office Application Logic & Dynamic UI Engine
// Handles Navigation, Chart renders, Search, Forms & Interactivity

document.addEventListener('DOMContentLoaded', () => {
  // Global State Reference
  window.appState = {
    currentSection: 'dashboard',
    selectedPeriod: '7days',
    products: [...STORE_DATA.products],
    categories: [...STORE_DATA.categories],
    orders: [...STORE_DATA.orders],
    customers: [...STORE_DATA.customers],
    promotions: [...STORE_DATA.promotions],
    stockHistory: [...STORE_DATA.stockHistory],
    storeContent: { ...STORE_DATA.storeContent },
    storeInfo: { ...STORE_DATA.storeInfo },
    activeCharts: {},
    deleteCallback: null
  };

  // Helper Functions
  window.formatFCFA = function(amount) {
    if (amount === null || amount === undefined) return '-';
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  window.showToast = function(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const bgColors = {
      success: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200',
      error: 'bg-rose-950/90 border-rose-500/50 text-rose-200',
      warning: 'bg-amber-950/90 border-amber-500/50 text-amber-200',
      info: 'bg-indigo-950/90 border-indigo-500/50 text-indigo-200'
    };
    const iconNames = {
      success: 'check-circle-2',
      error: 'alert-circle',
      warning: 'alert-triangle',
      info: 'info'
    };

    toast.className = `toast flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md transition-all text-xs font-semibold ${bgColors[type] || bgColors.info}`;
    toast.innerHTML = `
      <i data-lucide="${iconNames[type]}" class="w-4 h-4 shrink-0"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  window.openModal = function(id) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    }
  };

  window.closeModal = function(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  };

  window.confirmDelete = function(title, description, onConfirm) {
    document.getElementById('delete-modal-title').textContent = title;
    document.getElementById('delete-modal-desc').textContent = description;
    appState.deleteCallback = onConfirm;
    openModal('modal-delete-confirm');
  };

  document.getElementById('confirm-delete-btn')?.addEventListener('click', () => {
    if (appState.deleteCallback) {
      appState.deleteCallback();
      appState.deleteCallback = null;
    }
    closeModal('modal-delete-confirm');
  });

  // Sidebar Drawer Handlers (Mobile)
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const openSidebarBtn = document.getElementById('open-sidebar-btn');
  const closeSidebarBtn = document.getElementById('close-sidebar-btn');

  function toggleSidebar(show) {
    if (show) {
      sidebar?.classList.remove('-translate-x-full');
      backdrop?.classList.remove('hidden');
    } else {
      sidebar?.classList.add('-translate-x-full');
      backdrop?.classList.add('hidden');
    }
  }

  openSidebarBtn?.addEventListener('click', () => toggleSidebar(true));
  closeSidebarBtn?.addEventListener('click', () => toggleSidebar(false));
  backdrop?.addEventListener('click', () => toggleSidebar(false));

  // SPA Navigation Router
  const navItems = document.querySelectorAll('.nav-item');
  const viewSections = document.querySelectorAll('.view-section');

  function navigateTo(sectionId) {
    appState.currentSection = sectionId;

    // Highlight menu
    navItems.forEach(item => {
      if (item.getAttribute('data-section') === sectionId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Show panel
    viewSections.forEach(sec => {
      if (sec.id === `sec-${sectionId}`) {
        sec.classList.remove('hidden');
      } else {
        sec.classList.add('hidden');
      }
    });

    // Close mobile menu
    toggleSidebar(false);

    // Render Section Content
    renderSection(sectionId);

    // Refresh Lucide Icons
    if (window.lucide) lucide.createIcons();
  }

  // Bind nav item click events
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sec = item.getAttribute('data-section');
      if (sec) {
        window.location.hash = sec;
        navigateTo(sec);
      }
    });
  });

  // Handle Hash URL Router
  function handleHashChange() {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(`sec-${hash}`)) {
      navigateTo(hash);
    } else {
      navigateTo('dashboard');
    }
  }

  window.addEventListener('hashchange', handleHashChange);

  // Update Global Counter Badges in Sidebar
  function updateSidebarBadges() {
    const prodBadge = document.getElementById('badge-products-count');
    if (prodBadge) prodBadge.textContent = appState.products.length;

    const lowStockCount = appState.products.filter(p => p.stock <= p.minStock).length;
    const stockBadge = document.getElementById('badge-low-stock');
    if (stockBadge) {
      stockBadge.textContent = `${lowStockCount} alerte${lowStockCount > 1 ? 's' : ''}`;
      if (lowStockCount === 0) {
        stockBadge.className = 'text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-semibold';
      }
    }

    const pendingOrdersCount = appState.orders.filter(o => o.status === 'En attente' || o.status === 'En préparation').length;
    const orderBadge = document.getElementById('badge-orders-pending');
    if (orderBadge) orderBadge.textContent = pendingOrdersCount;
  }

  // Global Section Render Switcher
  window.renderSection = function(sectionId) {
    updateSidebarBadges();

    switch (sectionId) {
      case 'dashboard':
        renderDashboardView();
        break;
      case 'products':
        renderProductsView();
        break;
      case 'categories':
        renderCategoriesView();
        break;
      case 'stock':
        renderStockView();
        break;
      case 'orders':
        renderOrdersView();
        break;
      case 'customers':
        renderCustomersView();
        break;
      case 'promotions':
        renderPromotionsView();
        break;
      case 'content':
        renderContentView();
        break;
      case 'analytics':
        renderAnalyticsView();
        break;
      case 'settings':
        renderSettingsView();
        break;
    }
  };

  // Initialize App
  handleHashChange();
  setupGlobalSearch();
  setupNotifications();
});
