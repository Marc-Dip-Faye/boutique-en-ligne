# Plan de Développement - E-Commerce Laravel

## Vue d'ensemble

Ce document découpe le développement en incréments petits, testables et déployables indépendamment.

---

## Increment 1 : Socle Laravel ✅

**Objectif** : Mettre en place l'environnement de base

**Fichiers concernés** :
- Tout le projet Laravel fraîchement installé
- `docs/ARCHITECTURE.md`
- `docs/adr/*.md`

**Tâches** :
- [x] Installation Laravel 12
- [x] Configuration PHP 8.2+
- [x] Structure des dossiers personnalisée
- [x] Documentation architecturale
- [ ] Configuration PostgreSQL (`.env`)
- [ ] Docker Compose (optionnel mais recommandé)

**Critères de validation** :
- `php artisan serve` fonctionne
- Structure des dossiers conforme à ARCHITECTURE.md
- Documentation lue et comprise par l'équipe

---

## Increment 2 : Authentification et Utilisateurs

**Objectif** : Système d'authentification complet avec rôles

**Migrations** :
- `users` (avec rôle : admin/customer)
- `password_reset_tokens`
- `sessions`

**Modèles** :
- `User` (avec relation `addresses`)

**Services/Actions** :
- `RegisterUser`
- `LoginUser`
- `LogoutUser`

**Routes** :
- `/login`, `/register`, `/logout`
- `/account/*` (profil client)

**Vues** :
- `shop.auth.login`
- `shop.auth.register`
- `shop.account.profile`

**Tests** :
- Feature : Inscription, connexion, déconnexion
- Feature : Accès protégé vs public
- Unit : Validation des données utilisateur

**Critères de validation** :
- Un utilisateur peut s'inscrire
- Un utilisateur peut se connecter
- Les routes protégées refusent les non-authentifiés
- Le rôle `admin` existe

---

## Increment 3 : Catégories

**Objectif** : Gestion hiérarchique des catégories

**Migrations** :
- `categories` (id, name, slug, parent_id, description, image, is_active, timestamps)

**Modèles** :
- `Category` (relation récursive `parent`/`children`)

**Controllers** :
- `Admin\CategoryController` (CRUD complet)
- `Shop\CatalogController` (liste publique)

**FormRequests** :
- `Admin\StoreCategoryRequest`
- `Admin\UpdateCategoryRequest`

**Routes** :
- Admin : `GET/POST /admin/categories`, `PUT/DELETE /admin/categories/{id}`
- Shop : `GET /catalog/{categorySlug}`

**Vues** :
- `admin.categories.index`, `create`, `edit`
- `shop.catalog.index`

**Tests** :
- Feature : CRUD admin
- Feature : Affichage public avec filtres
- Unit : Arborescence des catégories

**Critères de validation** :
- Création/modification/suppression de catégories
- Catégories imbriquées fonctionnent
- Slug unique généré automatiquement
- Affichage public filtre par catégorie

---

## Increment 4 : Produits

**Objectif** : Gestion complète des produits

**Migrations** :
- `products` (id, name, slug, description, price, compare_price, sku, stock_quantity, min_stock_level, is_active, is_featured, category_id, images (JSON), timestamps, soft deletes)

**Modèles** :
- `Product` (relations : `category`, `images`, `orderItems`)

**Controllers** :
- `Admin\ProductController` (CRUD)
- `Shop\ProductController` (détail produit)

**FormRequests** :
- `Admin\StoreProductRequest`
- `Admin\UpdateProductRequest`

**Services** :
- `ProductService` (gestion des images, calculs de prix)

**Routes** :
- Admin : CRUD complet
- Shop : `/products/{slug}`, `/catalog` avec filtres

**Vues** :
- `admin.products.*` (index, create, edit, show)
- `shop.products.show`
- `shop.catalog.index` (avec filtres)

**Tests** :
- Feature : CRUD produits
- Feature : Recherche et filtres
- Unit : Génération de slug, validation SKU unique

**Critères de validation** :
- Produit créé avec toutes les informations
- Images uploadées et validées
- Stock initialisé correctement
- Produit visible/invisible selon `is_active`
- Soft delete fonctionne (historique commandes préservé)

---

## Increment 5 : Stock et Mouvements

**Objectif** : Tracking précis du stock

**Migrations** :
- `stock_movements` (id, product_id, user_id, quantity_before, quantity_after, quantity_delta, reason (sale, restock, adjustment, return), reference_type, reference_id, notes, created_at)

**Modèles** :
- `StockMovement` (relation : `product`, `user`)

**Actions** :
- `UpdateStock` (avec transaction et verrouillage)
- `RecordStockMovement`

**Events** :
- `ProductStockUpdated`

**Listeners** :
- `CheckLowStockAlert` (notification admin si stock bas)

**Tests** :
- Unit : Incrément/décrément de stock
- Feature : Historique des mouvements
- Feature : Verrouillage concurrent (2 commandes simultanées)

**Critères de validation** :
- Stock mis à jour atomiquement
- Chaque mouvement est enregistré
- Alerte envoyée si stock < seuil minimum
- Concurrence gérée (pas de stock négatif)

---

## Increment 6 : Panier

**Objectif** : Gestion hybride session/BDD (voir ADR-002)

**Migrations** :
- `carts` (id, user_id nullable, session_id nullable, status, created_at, updated_at)
- `cart_items` (id, cart_id, product_id, quantity, price_unit, created_at, updated_at)

**Modèles** :
- `Cart` (relations : `user`, `items`, `product`)
- `CartItem` (relations : `cart`, `product`)

**Services** :
- `CartService` (addToCart, removeFromCart, updateQuantity, getCart, mergeCarts)

**Actions** :
- `AddItemToCart`
- `RemoveItemFromCart`
- `MergeCartOnLogin`

**Middleware** :
- `MergeCart` (exécuté après login)

**Controllers** :
- `Shop\CartController` (view, add, remove, update)

**Routes** :
- `GET/POST /cart`
- `POST /cart/add`
- `POST /cart/update`
- `POST /cart/remove`

**Vues** :
- `shop.cart.index` (avec Alpine.js pour updates sans reload)
- Component : `cart-dropdown` (mini-panier header)

**Tests** :
- Feature : Ajout sans compte → session
- Feature : Connexion → fusion paniers
- Feature : Mise à jour quantités
- Unit : Calcul du total

**Critères de validation** :
- Panier persiste sans compte
- Fusion automatique à la connexion
- Prix snapshotés (ne changent pas si produit modifié)
- Quantité max vérifiée

---

## Increment 7 : Commandes

**Objectif** : Création et gestion des commandes

**Migrations** :
- `orders` (id, user_id, order_number (unique), status, subtotal, shipping_cost, tax_total, discount_total, total, shipping_address (JSON), billing_address (JSON), notes, created_at, updated_at, soft deletes)
- `order_items` (id, order_id, product_id, product_name (snapshot), product_sku (snapshot), quantity, price_unit, tax_rate, tax_amount, subtotal, created_at)

**Modèles** :
- `Order` (relations : `user`, `items`, `payments`)
- `OrderItem` (relations : `order`, `product`)

**Actions** :
- `CreateOrder` (transaction : commande + items + décrément stock)
- `UpdateOrderStatus`
- `CancelOrder`

**Services** :
- `OrderService` (calculs, statuts)

**Events** :
- `OrderCreated`
- `OrderStatusChanged`

**Listeners** :
- `SendOrderConfirmationEmail`
- `NotifyAdminNewOrder`

**Controllers** :
- `Shop\CheckoutController` (processus de commande)
- `Admin\OrderController` (gestion admin)

**FormRequests** :
- `Shop\CheckoutRequest` (validation adresse, paiement)

**Routes** :
- Shop : `/checkout`, `/checkout/success`, `/account/orders`
- Admin : `/admin/orders`, `/admin/orders/{id}`

**Vues** :
- `shop.checkout.index` (formulaire + récapitulatif)
- `shop.checkout.success`
- `shop.account.orders.index`, `show`
- `admin.orders.*`

**Tests** :
- Feature : Flux complet checkout
- Feature : Transaction atomique (rollback si échec)
- Unit : Calcul des totaux (taxes, discounts)
- Feature : Concurrence (dernier produit)

**Critères de validation** :
- Commande créée avec statut correct
- Stock décrémenté dans la même transaction
- Email de confirmation envoyé (Job queue)
- Numéro de commande unique
- Adresses snapshotées (indépendantes des modifications futures)

---

## Increment 8 : Paiements

**Objectif** : Intégration multi-gateways (voir ADR-003)

**Migrations** :
- `payments` (id, order_id, user_id, gateway, transaction_id, amount, currency, status, method, metadata (JSONB), attempted_at, completed_at, failed_at, created_at, updated_at)

**Modèles** :
- `Payment` (relations : `order`, `user`)

**Services** :
- `PaymentService` (interface unifiée)
- Gateways : `StripeGateway`, `WaveGateway`, `OrangeMoneyGateway`

**Controllers** :
- `Shop\PaymentController` (initiation, callback)
- `Admin\PaymentController` (remboursements)

**Routes** :
- `POST /payment/initiate`
- `POST /payment/callback/{gateway}`
- `POST /payment/webhook/{gateway}` (signature vérifiée)
- `POST /admin/payments/refund`

**Jobs** :
- `ProcessWebhook` (traitement asynchrone)

**Tests** :
- Feature : Paiement réussi (mock gateway)
- Feature : Paiement échoué
- Feature : Webhook avec signature valide/invalide
- Unit : Idempotence des webhooks
- Feature : Remboursement

**Critères de validation** :
- Paiement initié correctement
- Statut synchronisé via webhook
- Commande mise à jour après paiement réussi
- Stock libéré si paiement échoué
- Remboursement fonctionne

---

## Increment 9 : Factures

**Objectif** : Génération et stockage des factures

**Migrations** :
- `invoices` (id, order_id, invoice_number (unique), pdf_path, issued_at, created_at)

**Modèles** :
- `Invoice` (relation : `order`)

**Jobs** :
- `GenerateInvoicePdf` (queue)

**Services** :
- `InvoiceService` (génération PDF, numérotation)

**Controllers** :
- `Shop\InvoiceController` (téléchargement)
- `Admin\InvoiceController` (génération manuelle)

**Routes** :
- `GET /account/orders/{id}/invoice`
- `POST /admin/invoices/generate`

**Tests** :
- Feature : Génération PDF
- Feature : Téléchargement sécurisé
- Unit : Numérotation unique

**Critères de validation** :
- PDF généré après paiement complet
- Numéro de facture unique et séquentiel
- Téléchargeable par le client
- Archivé proprement

---

## Increment 10 : Promotions et Codes Promo

**Objectif** : Système de réductions flexible

**Migrations** :
- `promotions` (id, code (unique), description, discount_type (percentage, fixed), discount_value, min_purchase_amount, max_uses, used_count, starts_at, expires_at, is_active, applicable_categories (JSON), applicable_products (JSON), created_at, updated_at)

**Modèles** :
- `Promotion` (scopes : `active`, `valid`, `notExpired`)

**Services** :
- `DiscountService` (validation, application, calcul)

**Actions** :
- `ApplyPromotion`
- `ValidatePromotion`

**Controllers** :
- `Admin\PromotionController` (CRUD)
- `Shop\CartController` (application code promo)

**Tests** :
- Feature : Application code promo valide
- Feature : Rejet code expiré/invalide
- Unit : Calcul réduction (pourcentage vs fixe)
- Feature : Cumul/non-cumul de promotions

**Critères de validation** :
- Code promo appliqué au panier
- Réduction calculée correctement
- Limites respectées (dates, uses, min purchase)
- Historique des utilisations

---

## Increment 11 : Dashboard Admin et Analytics

**Objectif** : Vue d'ensemble pour l'administrateur

**Controllers** :
- `Admin\DashboardController`

**Services** :
- `AnalyticsService` (KPIs, stats)

**Vues** :
- `admin.dashboard.index` (graphiques, tableaux)

**Routes** :
- `GET /admin/dashboard`

**Tests** :
- Feature : Accès réservé aux admins
- Unit : Calcul des KPIs

**Critères de validation** :
- CA du jour/semaine/mois affiché
- Nombre de commandes
- Produits populaires
- Alertes stock bas

---

## Increment 12 : Optimisations et Cache

**Objectif** : Performance en production

**Tâches** :
- Cache des catégories (24h)
- Cache des produits populaires (1h)
- Eager loading optimisé
- Index PostgreSQL ajoutés
- Query logging et analyse N+1

**Listeners** :
- Invalidation cache lors modification produit/catégorie

**Tests** :
- Feature : Cache hit/miss
- Feature : Invalidation après update

**Critères de validation** :
- Temps de chargement < 500ms
- Requêtes SQL optimisées
- Cache invalide après modification

---

## Résumé des Incréments

| # | Sujet | Priorité | Complexité |
|---|-------|----------|------------|
| 1 | Socle Laravel | ✅ Fait | Faible |
| 2 | Auth & Users | Haute | Moyenne |
| 3 | Catégories | Haute | Faible |
| 4 | Produits | Haute | Moyenne |
| 5 | Stock | Haute | Moyenne |
| 6 | Panier | Haute | Moyenne |
| 7 | Commandes | Critique | Élevée |
| 8 | Paiements | Critique | Élevée |
| 9 | Factures | Moyenne | Faible |
| 10 | Promotions | Moyenne | Moyenne |
| 11 | Dashboard | Basse | Faible |
| 12 | Optimisations | Moyenne | Moyenne |

---

*Document vivant - Mis à jour après chaque incrément complété.*
