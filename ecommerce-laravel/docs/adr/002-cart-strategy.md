# ADR-002 : Stratégie de Gestion du Panier

## Contexte

Le panier e-commerce doit :
- Persister entre les sessions utilisateur
- Fonctionner pour clients connectés ET non-connectés
- Être performant même avec beaucoup d'articles
- Synchroniser automatiquement lors de la connexion

## Décision

Nous utilisons une **approche hybride** :

1. **Clients connectés** : Panier stocké en base de données (`carts` + `cart_items`)
2. **Clients non-connectés** : Panier stocké en session Laravel
3. **Fusion automatique** : Lors de la connexion, fusion des paniers session + BDD

## Justification

### Pourquoi pas 100% session ?
- ❌ Perte du panier si changement d'appareil
- ❌ Perte du panier si expiration session longue
- ❌ Impossible de faire du remarketing/abandon de panier
- ❌ Limité par la taille de la session

### Pourquoi pas 100% base de données ?
- ❌ Création d'un compte obligatoire (friction à l'achat)
- ❌ Plus lent que la session
- ❌ Nettoyage nécessaire des paniers abandonnés

### Avantages de l'approche hybride

✅ **Expérience utilisateur optimale**
- Ajout au panier sans compte
- Conservation du panier sur plusieurs jours
- Synchronisation multi-appareils après connexion

✅ **Performance**
- Session = rapide (Redis/file)
- BDD = seulement quand nécessaire

✅ **Fonctionnalités business**
- Tracking des abandons de panier
- Relances email possibles
- Analytics précis

## Implémentation

### Tables nécessaires

```sql
carts
- id
- user_id (nullable)
- session_id (nullable)
- status (active, converted, abandoned)
- created_at, updated_at

cart_items
- id
- cart_id
- product_id
- quantity
- price_unit (snapshot du prix)
- created_at, updated_at
```

### Flux de fusion

```
Utilisateur ajoute au panier (non-connecté)
    → Stocké en session

Utilisateur se connecte
    → Vérifier s'il a un panier en session
    → Vérifier s'il a un panier en BDD
    → Fusionner les deux paniers
    → Sauvegarder en BDD
    → Vider la session
```

### Règles de fusion

1. **Même produit** : Additionner les quantités
2. **Prix différent** : Utiliser le prix actuel (le plus récent)
3. **Conflit** : Toujours privilégier le panier BDD (plus complet)

## Alternatives considérées

### Option 1 : Cookie uniquement
- ❌ Taille limitée (4KB)
- ❌ Non sécurisé
- ❌ Effacé facilement

### Option 2 : LocalStorage + API
- ❌ Complexe à synchroniser
- ❌ Problèmes de concurrence
- ❌ Nécessite du JavaScript

### Option 3 : Redis pur
- ⚠️ Possible mais persistence compliquée
- ⚠️ Coût infrastructure supplémentaire
- ✅ Très performant

## Conséquences

### Code à implémenter

1. **CartService** avec méthodes :
   - `addToCart($productId, $quantity)`
   - `getCart()`
   - `mergeCarts($sessionCart, $userCart)`
   - `convertToOrder($cart)`

2. **Middleware** :
   - Fusion automatique lors de `auth.login`

3. **Job périodique** :
   - Nettoyage des paniers abandonnés (> 30 jours)

### Tests requis

- ✅ Ajout au panier sans compte
- ✅ Connexion avec panier session → fusion
- ✅ Déconnexion → panier conservé en session
- ✅ Quantité maximale dépassée
- ✅ Produit supprimé pendant qu'il est dans le panier

## Statut

✅ **ACCEPTÉ** - À implémenter dans Increment 6

---

*Références :*
- https://laravel.com/docs/session
- https://laravel.com/docs/eloquent-relationships
