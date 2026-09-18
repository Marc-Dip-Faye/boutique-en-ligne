# 🛒 MonShop - E-Commerce Laravel

Application e-commerce professionnelle construite avec Laravel 13, PostgreSQL, Blade et Alpine.js.

## 🚀 Fonctionnalités

### Partie Publique (Shop)
- ✅ Page d'accueil avec produits en vedette
- ✅ Catalogue avec filtres et catégories
- ✅ Pages produits détaillées
- ✅ Panier dynamique (Alpine.js)
- ✅ Processus de checkout sécurisé
- ✅ Compte client et historique des commandes

### Back-Office (Admin)
- ✅ Dashboard avec KPIs en temps réel
- ✅ Gestion des produits (CRUD complet)
- ✅ Gestion des commandes et statuts
- ✅ Gestion des clients
- ✅ Gestion des catégories
- ✅ Système de promotions
- ✅ Paramètres de la boutique

## 🛠️ Stack Technique

- **Backend:** Laravel 13 (PHP 8.3+)
- **Base de données:** PostgreSQL 16
- **Frontend:** Blade + Alpine.js + Tailwind CSS
- **Cache:** Redis (optionnel)
- **Queue:** Laravel Queue (Redis/Database)

## 📦 Installation

### Prérequis
- PHP 8.3+
- Composer
- Node.js & NPM
- PostgreSQL 16+
- Docker (optionnel)

### Installation Locale

```bash
# 1. Cloner le projet
git clone <your-repo-url>
cd monshop

# 2. Installer les dépendances PHP
composer install

# 3. Installer les dépendances JS
npm install

# 4. Configurer l'environnement
cp .env.example .env
php artisan key:generate

# 5. Configurer la base de données (.env)
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=monshop
DB_USERNAME=postgres
DB_PASSWORD=secret

# 6. Créer la base de données et lancer les migrations
createdb monshop
php artisan migrate --seed

# 7. Compiler les assets
npm run build

# 8. Lancer le serveur
php artisan serve
```

### Installation avec Docker

```bash
docker-compose up -d
docker-compose exec app composer install
docker-compose exec app php artisan migrate --seed
docker-compose exec app npm run build
```

## 🏗️ Architecture du Projet

```
app/
├── Actions/          # Classes d'action métier (CreateOrder, UpdateStock)
├── Services/         # Services réutilisables (CartService, PaymentService)
├── Models/           # Modèles Eloquent
├── Http/
│   ├── Controllers/  # Contrôleurs minces (Shop/, Admin/)
│   ├── Requests/     # FormRequest pour validation
│   └── Resources/    # API Resources
├── Policies/         # Autorisations
├── Events/           # Events domaine
├── Listeners/        # Event listeners
├── Jobs/             # Jobs pour queue
└── Notifications/    # Notifications email/SMS

resources/views/
├── layouts/          # Templates principaux (app.blade.php, admin.blade.php)
├── shop/             # Vues partie publique
├── admin/            # Vues back-office
├── components/       # Composants Blade réutilisables
└── emails/           # Templates d'emails

tests/
├── Feature/          # Tests fonctionnels
└── Unit/             # Tests unitaires

docs/
├── ARCHITECTURE.md   # Documentation architecturale
├── PLAN_DEVELOPPEMENT.md
└── adr/              # Architecture Decision Records
```

## 🔐 Sécurité

- Authentification Laravel Breeze/Jetstream
- Protection CSRF automatique
- Validation via FormRequest
- Policies pour les autorisations
- Rate limiting sur les routes sensibles
- Hashage des mots de passe (Argon2id)

## 🧪 Tests

```bash
# Lancer tous les tests
php artisan test

# Tests avec coverage
php artisan test --coverage

# Uniquement les tests Feature
php artisan test --testsuite=Feature
```

## 📝 License

Propriétaire - Tous droits réservés.

## 👥 Équipe

Développé avec ❤️ par votre équipe.
