# Architecture du Projet E-Commerce Laravel

## Vue d'ensemble

Ce projet est un monolithe Laravel modulaire conçu pour être maintenable, performant et évolutif. Il suit les principes SOLID et les conventions Laravel.

## Stack Technique

- **Backend** : PHP 8.2+ / Laravel 12
- **Base de données** : PostgreSQL
- **Frontend** : Blade + Alpine.js + Tailwind CSS
- **Cache/Queue** : Redis (optionnel)
- **Tests** : PHPUnit (Feature & Unit tests)

## Structure du Projet

```
app/
├── Actions/          # Classes d'action métier (une responsabilité unique)
│   ├── Cart/         # Actions liées au panier
│   ├── Order/        # Actions liées aux commandes
│   ├── Product/      # Actions liées aux produits
│   └── Customer/     # Actions liées aux clients
├── Services/         # Services métier (logique complexe réutilisable)
├── Models/           # Modèles Eloquent
├── Http/
│   ├── Controllers/
│   │   ├── Admin/    # Controllers back-office
│   │   └── Shop/     # Controllers boutique publique
│   ├── Requests/     # FormRequest pour validation
│   └── Resources/    # API Resources (si besoin)
├── Policies/         # Autorisations (qui peut faire quoi)
├── Events/           # Événements métier
├── Listeners/        # Écouteurs d'événements
├── Jobs/             # Jobs pour files d'attente
└── Notifications/    # Notifications (email, database)
```

## Principes Architecturaux

### 1. Controllers Minces

Les controllers ne font QUE :
- Recevoir la requête HTTP
- Valider via FormRequest
- Appeler une Action ou Service
- Retourner une vue ou réponse JSON

**Jamais de logique métier dans les controllers.**

### 2. Actions vs Services

**Actions** :
- Une seule responsabilité
- Méthode principale `execute()` ou `__invoke()`
- Utilisées pour des opérations précises (ex: `CreateOrder`)
- Peuvent être composées entre elles

**Services** :
- Regroupent plusieurs méthodes liées à un domaine
- Logique métier réutilisable
- Ex: `CartService`, `PaymentService`

### 3. Validation

Toute validation HTTP passe par des **FormRequest** :
- Séparation claire des règles de validation
- Réutilisables dans les tests
- Messages d'erreur centralisés

### 4. Gestion des Données

**Eloquent** :
- Utilisation systématique d'eager loading pour éviter N+1
- Relations bien définies avec contraintes
- SoftDeletes uniquement quand pertinent (produits, commandes)

**Transactions** :
Utilisées pour toute opération atomique critique :
- Création de commande + décrémentation stock
- Paiement + changement statut commande
- Remboursements

### 5. Concurrence

Problèmes gérés au niveau base de données :
- Verrous optimistes (`lockForUpdate()`) sur le stock
- Contraintes d'unicité PostgreSQL
- Transactions pour cohérence

### 6. Cache

Stratégie de cache :
- **Catégories** : cache long (24h+) car rarement modifiées
- **Produits populaires** : cache moyen (1h)
- **Paramètres boutique** : cache jusqu'à modification
- **Panier utilisateur** : pas de cache (données session)

Invalidation du cache via Events/Listeners lors des modifications.

### 7. Files d'Attente (Queues)

Opérations asynchrones :
- Envoi d'emails (confirmation commande, newsletter)
- Génération de factures PDF
- Synchronisations externes (paiement, analytics)
- Nettoyages périodiques

### 8. Sécurité

- **Authentification** : Laravel Breeze/Jetstream
- **Autorisation** : Policies pour chaque modèle
- **CSRF** : Activé nativement
- **Rate Limiting** : Sur routes sensibles (login, paiement)
- **Mass Assignment** : `$fillable` strict sur tous les modèles
- **Fichiers uploadés** : Validation type/taille, stockage sécurisé

## Flux d'une Requête Typique

```
Requête HTTP
    ↓
Route (routes/web.php)
    ↓
Middleware (auth, admin, etc.)
    ↓
Controller (réception + délégation)
    ↓
FormRequest (validation automatique)
    ↓
Action/Service (logique métier + transaction DB)
    ↓
Event dispatché (si nécessaire)
    ↓
Listener (email, notification, log)
    ↓
Retour Controller → Vue Blade
```

## Décisions Importantes

### Pourquoi pas de SPA ?
- **SEO** : Rendu serveur Blade indispensable pour l'indexation
- **Simplicité** : Alpine.js suffit pour 95% des interactions
- **Performance** : Moins de JavaScript à charger/exécuter

### Pourquoi PostgreSQL ?
- Contraintes référentielles fortes
- Types de données avancés (JSONB si besoin)
- Meilleures performances en écriture concurrente
- Verrous plus granulaires

### SoftDeletes : Quand l'utiliser ?

**OUI** :
- `products` : historique commandes, SEO URLs
- `orders` : obligation légale de conservation
- `users` : données clients, historique

**NON** :
- `categories` : suppression cascade ou réaffectation
- `order_items` : lié aux commandes (cascade)
- `payments` : données financières (jamais supprimé)

## Tests

Chaque fonctionnalité critique a ses tests :

**Feature Tests** :
- Flux complets (ajout panier → commande → paiement)
- Autorisations (Policies)
- Routes HTTP + validation

**Unit Tests** :
- Actions métier isolées
- Services complexes
- Règles de calcul (promotions, taxes)

## Prochaines Étapes

Voir `docs/adr/` pour les décisions architecturales détaillées.

---

*Document maintenu à jour avec l'évolution du projet.*
