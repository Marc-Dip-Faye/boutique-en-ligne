/* ═══════════════ DONNÉES PRODUITS ═══════════════ */
const PRODUCTS = [
  { id: 1,  name: 'iPhone 15 Pro Max 256GB - Titanium',        brand: 'Apple',             cat: 'electronique', price: 885000,  oldPrice: 920000,  img: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=85', rating: 4.8, sales: 42, stock: 14,  flash: true,  sold: 78 },
  { id: 2,  name: 'Samsung Galaxy S24 Ultra 512GB',            brand: 'Samsung',           cat: 'electronique', price: 860000,  oldPrice: null,     img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=85', rating: 4.7, sales: 38, stock: 3,  flash: false, sold: 0 },
  { id: 3,  name: 'MacBook Pro 16" M3 Max 36GB / 1TB',         brand: 'Apple',             cat: 'electronique', price: 2250000, oldPrice: 2350000, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=85', rating: 4.9, sales: 19, stock: 6,  flash: true,  sold: 64 },
  { id: 4,  name: 'Smart TV LG OLED 65" 4K Cinema',            brand: 'LG',                cat: 'electronique', price: 1150000, oldPrice: 1250000, img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=85', rating: 4.6, sales: 15, stock: 0,  flash: true,  sold: 91 },
  { id: 5,  name: 'Casque Sans Fil Sony WH-1000XM5',           brand: 'Sony',              cat: 'electronique', price: 185000,  oldPrice: 210000,  img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85', rating: 4.7, sales: 33, stock: 11, flash: true,  sold: 55 },
  { id: 6,  name: 'Machine à Café Espresso DeLonghi Magnifica S', brand: 'DeLonghi',       cat: 'maison',       price: 270000,  oldPrice: 295000,  img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=85', rating: 4.8, sales: 56, stock: 18, flash: true,  sold: 70 },
  { id: 7,  name: 'Climatiseur Inverter LG 18000 BTU',         brand: 'LG',                cat: 'maison',       price: 380000,  oldPrice: null,     img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=85', rating: 4.5, sales: 29, stock: 2,  flash: false, sold: 0 },
  { id: 8,  name: 'Montre Connectée Apple Watch Ultra 2',      brand: 'Apple',             cat: 'mode',         price: 510000,  oldPrice: 540000,  img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=85', rating: 4.8, sales: 31, stock: 9,  flash: false, sold: 0 },
  { id: 9,  name: 'Sac à Main Cuir Artisanal Dakar Luxe',      brand: 'Dakar Leather Co.', cat: 'mode',         price: 75000,   oldPrice: 85000,   img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85', rating: 4.9, sales: 64, stock: 22, flash: true,  sold: 82 },
  { id: 10, name: 'Coffret Parfum Prestige Sauvage Elixir 100ml', brand: 'Maison Apex',    cat: 'beaute',       price: 45000,   oldPrice: 52000,   img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=85', rating: 4.6, sales: 27, stock: 12,  flash: false, sold: 0 },
  { id: 11, name: 'Tapis de Course PowerFit Pro 2026',         brand: 'FitTech',           cat: 'sport',        price: 325000,  oldPrice: 360000, img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=85', rating: 4.5, sales: 21, stock: 8,  flash: false, sold: 0 }
];

const FREE_SHIPPING = 100000;

/* ═══════════════ ÉTAT ═══════════════ */
let cart = JSON.parse(localStorage.getItem('apex_cart') || '{}');
let wishlist = new Set(JSON.parse(localStorage.getItem('apex_wish') || '[]'));
let currentCat = 'all';
let currentSearch = '';

/* ═══════════════ HELPERS ═══════════════ */
const $ = (s) => document.querySelector(s);
const formatPrice = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';

function stars(r) {
  let h = '';
  for (let i = 1; i <= 5; i++) {
    if (r >= i) h += '<i class="fa-solid fa-star"></i>';
    else if (r > i - 0.5) h += '<i class="fa-solid fa-star-half-stroke"></i>';
    else h += '<i class="fa-regular fa-star"></i>';
  }
  return h;
}

function toast(msg, type = 'success') {
  const icons = { success: 'fa-circle-check', warning: 'fa-triangle-exclamation', info: 'fa-circle-info' };
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.innerHTML = '<i class="fa-solid ' + icons[type] + '"></i><span>' + msg + '</span>';
  $('#toastContainer').appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 350); }, 3200);
}

/* ═══════════════ RENDU PRODUITS ═══════════════ */
function productCard(p) {
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const out = p.stock === 0;
  return `
  <article class="product-card reveal visible">
    <div class="product-media">
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <div class="badge-top">
        ${discount ? `<span class="chip promo">-${discount}%</span>` : ''}
        ${out ? '<span class="chip out">Rupture</span>' : (p.stock <= 3 ? '<span class="chip low">Stock faible</span>' : '')}
      </div>
      <button class="wish-btn ${wishlist.has(p.id) ? 'active' : ''}" data-wish="${p.id}" aria-label="Favori">
        <i class="fa-${wishlist.has(p.id) ? 'solid' : 'regular'} fa-heart"></i>
      </button>
    </div>
    <div class="product-body">
      <span class="product-brand">${p.brand}</span>
      <h3 class="product-name">${p.name}</h3>
      <div class="product-rating"><span class="stars">${stars(p.rating)}</span> ${p.rating} · ${p.sales} ventes</div>
      <div class="product-prices">
        <span class="product-price">${formatPrice(p.price)}</span>
        ${p.oldPrice ? `<span class="product-old">${formatPrice(p.oldPrice)}</span>` : ''}
      </div>
      <button class="add-btn" data-add="${p.id}" ${out ? 'disabled' : ''}>
        <i class="fa-solid ${out ? 'fa-ban' : 'fa-cart-plus'}"></i> ${out ? 'Indisponible' : 'Ajouter au panier'}
      </button>
    </div>
  </article>`;
}

function flashCard(p) {
  const discount = Math.round((1 - p.price / p.oldPrice) * 100);
  const out = p.stock === 0;
  return `
  <article class="flash-card">
    <div class="media">
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <span class="discount">-${discount}%</span>
    </div>
    <div class="body">
      <h3 class="name">${p.name}</h3>
      <div class="prices"><span class="price">${formatPrice(p.price)}</span><span class="old">${formatPrice(p.oldPrice)}</span></div>
      <div class="stock-bar"><div style="width:${p.sold}%"></div></div>
      <p class="stock-txt">${out ? '😱 Tout est parti !' : `🔥 ${p.sold}% vendus — dépêchez-vous !`}</p>
      <button class="btn-primary add-btn" data-add="${p.id}" ${out ? 'disabled' : ''} style="margin-top:0">
        <i class="fa-solid fa-bolt"></i> ${out ? 'Épuisé' : 'Je fonce !'}
      </button>
    </div>
  </article>`;
}

function renderFlash() {
  $('#flashGrid').innerHTML = PRODUCTS.filter(p => p.flash).slice(0, 5).map(flashCard).join('');
}

function renderProducts() {
  let list = PRODUCTS.filter(p =>
    (currentCat === 'all' || p.cat === currentCat) &&
    p.name.toLowerCase().includes(currentSearch) || p.brand.toLowerCase().includes(currentSearch)
  );
  if (currentCat !== 'all') list = list.filter(p => p.cat === currentCat);
  list.sort((a, b) => b.sales - a.sales);
  $('#productsGrid').innerHTML = list.length
    ? list.map(productCard).join('')
    : '<div class="empty-state"><i class="fa-solid fa-box-open"></i><p>Aucun produit trouvé pour votre recherche.</p></div>';
}

/* ═══════════════ PANIER ═══════════════ */
function saveCart() { localStorage.setItem('apex_cart', JSON.stringify(cart)); }

function cartTotals() {
  let count = 0, total = 0;
  for (const id in cart) { count += cart[id]; total += cart[id] * PRODUCTS.find(p => p.id == id).price; }
  return { count, total };
}

function updateBadges() {
  const { count } = cartTotals();
  $('#cartCount').textContent = count;
  $('#drawerCount').textContent = '(' + count + ')';
  $('#wishlistCount').textContent = wishlist.size;
}

function renderCart() {
  const box = $('#cartItems');
  const ids = Object.keys(cart);
  if (!ids.length) {
    box.innerHTML = '<div class="cart-empty"><i class="fa-solid fa-cart-shopping"></i><p>Votre panier est vide.<br>Faites-vous plaisir ! 😍</p></div>';
  } else {
    box.innerHTML = ids.map(id => {
      const p = PRODUCTS.find(x => x.id == id);
      return `
      <div class="cart-item">
        <img src="${p.img}" alt="${p.name}">
        <div class="ci-info">
          <p class="ci-name">${p.name}</p>
          <p class="ci-price">${formatPrice(p.price)}</p>
          <div class="ci-controls">
            <button data-dec="${id}" aria-label="Moins">−</button>
            <span>${cart[id]}</span>
            <button data-inc="${id}" aria-label="Plus">+</button>
          </div>
        </div>
        <button class="ci-remove" data-remove="${id}" aria-label="Retirer"><i class="fa-solid fa-trash-can"></i></button>
      </div>`;
    }).join('');
  }
  const { count, total } = cartTotals();
  $('#cartTotal').textContent = formatPrice(total);
  $('#freeShipProgress').style.width = Math.min(total / FREE_SHIPPING * 100, 100) + '%';
  $('#freeShipMsg').innerHTML = total >= FREE_SHIPPING
    ? '🎉 <strong>Livraison gratuite</strong> débloquée !'
    : `Plus que <strong>${formatPrice(FREE_SHIPPING - total)}</strong> pour la livraison gratuite`;
  updateBadges();
}

function animateCartFeedback(addButton, product) {
  const cartButton = $('#cartBtn');
  const sourceImage = addButton?.closest('.product-card, .flash-card')?.querySelector('img');

  cartButton.classList.remove('cart-pop');
  $('#cartCount').classList.remove('badge-bump');
  void cartButton.offsetWidth;
  cartButton.classList.add('cart-pop');
  $('#cartCount').classList.add('badge-bump');
  setTimeout(() => {
    cartButton.classList.remove('cart-pop');
    $('#cartCount').classList.remove('badge-bump');
  }, 700);

  if (!sourceImage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const source = sourceImage.getBoundingClientRect();
  const target = cartButton.getBoundingClientRect();
  const flyer = document.createElement('div');
  flyer.className = 'cart-flight';
  flyer.innerHTML = `<img src="${product.img}" alt="">`;
  flyer.style.left = source.left + source.width / 2 - 30 + 'px';
  flyer.style.top = source.top + source.height / 2 - 30 + 'px';
  document.body.appendChild(flyer);

  const deltaX = target.left + target.width / 2 - (source.left + source.width / 2);
  const deltaY = target.top + target.height / 2 - (source.top + source.height / 2);
  flyer.animate([
    { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
    { transform: `translate(${deltaX * .45}px, ${deltaY * .35 - 90}px) scale(.78) rotate(-10deg)`, opacity: 1, offset: .45 },
    { transform: `translate(${deltaX}px, ${deltaY}px) scale(.18) rotate(20deg)`, opacity: .15 }
  ], { duration: 720, easing: 'cubic-bezier(.22, 1, .36, 1)' }).finished
    .then(() => flyer.remove())
    .catch(() => flyer.remove());
}

function addToCart(id, addButton) {
  const p = PRODUCTS.find(x => x.id == id);
  if (!p || p.stock === 0) return;
  cart[id] = (cart[id] || 0) + 1;
  saveCart(); renderCart();
  animateCartFeedback(addButton, p);
  toast('<b>' + p.name + '</b> ajouté au panier !');
}

function openCart()  { $('#cartDrawer').classList.add('open');  $('#cartOverlay').classList.add('open'); }
function closeCart() { $('#cartDrawer').classList.remove('open'); $('#cartOverlay').classList.remove('open'); }

/* ═══════════════ FILTRES ═══════════════ */
function setCategory(cat, scroll = false) {
  currentCat = cat;
  document.querySelectorAll('[data-cat]').forEach(el => {
    if (el.classList.contains('nav-link') || el.classList.contains('filter-tab'))
      el.classList.toggle('active', el.dataset.cat === cat);
  });
  renderProducts();
  if (scroll) $('#boutique').scrollIntoView({ behavior: 'smooth' });
}

/* ═══════════════ COMPTE À REBOURS ═══════════════ */
function tickCountdown() {
  const now = new Date();
  const end = new Date(); end.setHours(23, 59, 59, 999);
  let d = Math.max(0, end - now);
  const h = Math.floor(d / 3600000), m = Math.floor(d / 60000) % 60, s = Math.floor(d / 1000) % 60;
  $('#cdH').textContent = String(h).padStart(2, '0');
  $('#cdM').textContent = String(m).padStart(2, '0');
  $('#cdS').textContent = String(s).padStart(2, '0');
}

/* ═══════════════ ÉVÉNEMENTS ═══════════════ */
document.addEventListener('click', (e) => {
  const add = e.target.closest('[data-add]');
  if (add && !add.disabled) { addToCart(add.dataset.add, add); return; }

  const wish = e.target.closest('[data-wish]');
  if (wish) {
    const id = +wish.dataset.wish;
    wishlist.has(id) ? wishlist.delete(id) : wishlist.add(id);
    localStorage.setItem('apex_wish', JSON.stringify([...wishlist]));
    wish.classList.toggle('active');
    wish.querySelector('i').className = 'fa-' + (wishlist.has(id) ? 'solid' : 'regular') + ' fa-heart';
    updateBadges();
    toast(wishlist.has(id) ? '❤️ Ajouté à vos favoris' : 'Retiré de vos favoris', 'info');
    return;
  }

  const inc = e.target.closest('[data-inc]');
  if (inc) { cart[inc.dataset.inc]++; saveCart(); renderCart(); return; }
  const dec = e.target.closest('[data-dec]');
  if (dec) { const id = dec.dataset.dec; cart[id]--; if (cart[id] <= 0) delete cart[id]; saveCart(); renderCart(); return; }
  const rm = e.target.closest('[data-remove]');
  if (rm) { delete cart[rm.dataset.remove]; saveCart(); renderCart(); toast('Article retiré du panier', 'info'); return; }

  const nav = e.target.closest('.nav-link[data-cat]');
  if (nav) { setCategory(nav.dataset.cat); return; }
  const tab = e.target.closest('.filter-tab');
  if (tab) { setCategory(tab.dataset.cat); return; }
  const catCard = e.target.closest('.category-card');
  if (catCard) { setCategory(catCard.dataset.cat, true); return; }
});

$('#cartBtn').addEventListener('click', openCart);
$('#closeCart').addEventListener('click', closeCart);
$('#cartOverlay').addEventListener('click', closeCart);

$('#checkoutBtn').addEventListener('click', () => {
  if (!Object.keys(cart).length) return toast('Votre panier est vide !', 'warning');
  toast('✅ Redirection vers le paiement sécurisé…');
});

$('#wishlistBtn').addEventListener('click', () => {
  toast(wishlist.size ? '❤️ Vous avez ' + wishlist.size + ' favori(s)' : 'Aucun favori pour le moment', 'info');
});

$('#searchInput').addEventListener('input', (e) => {
  currentSearch = e.target.value.trim().toLowerCase();
  renderProducts();
});

$('#newsletterForm').addEventListener('submit', (e) => {
  e.preventDefault();
  toast('💌 Bienvenue dans le Club Apex ! Vérifiez votre boîte mail.');
  e.target.reset();
});

document.querySelector('[data-promo="summer"]')?.addEventListener('click', () => {
  navigator.clipboard?.writeText('SUMMER2026');
  toast('🎉 Code SUMMER2026 copié !');
});

$('#mobileMenuBtn').addEventListener('click', () => $('#navBar').classList.toggle('open'));

window.addEventListener('scroll', () => {
  $('#header').classList.toggle('scrolled', window.scrollY > 10);
});

/* ═══════════════ ANIMATIONS AU SCROLL ═══════════════ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); observer.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ═══════════════ INIT ═══════════════ */
$('#year').textContent = new Date().getFullYear();
renderFlash();
renderProducts();
renderCart();
tickCountdown();
setInterval(tickCountdown, 1000);