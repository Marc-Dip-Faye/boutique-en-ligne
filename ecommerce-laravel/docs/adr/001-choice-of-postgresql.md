# ADR-001 : Choix de PostgreSQL comme Base de Données

## Contexte

Le projet e-commerce nécessite une base de données relationnelle robuste capable de gérer :
- Des transactions financières critiques
- Une concurrence élevée (plusieurs clients achetant simultanément)
- L'intégrité référentielle stricte
- Des performances en lecture et écriture

## Décision

Nous utilisons **PostgreSQL** comme système de gestion de base de données.

## Justification

### Avantages pour notre cas d'usage

1. **Contraintes référentielles fortes**
   - Foreign keys avec actions cascade/restrict bien définies
   - CHECK constraints pour valider les données au niveau BDD
   - Garantit l'intégrité même en cas de bug applicatif

2. **Gestion de la concurrence**
   - Verrous de ligne (`SELECT FOR UPDATE`)
   - Isolation des transactions configurable
   - Meilleures performances en écriture concurrente vs MySQL

3. **Fonctionnalités avancées**
   - Types JSONB si besoin de flexibilité
   - Index partiels pour optimiser certaines requêtes
   - Séquences fiables pour les IDs

4. **Fiabilité**
   - ACID compliant
   - WAL (Write-Ahead Logging) pour la récupération après crash
   - Mature et utilisé en production par de grands e-commerces

### Comparaison rapide

| Critère | PostgreSQL | MySQL |
|---------|-----------|-------|
| Contraintes FK | ✅ Strictes | ⚠️ Parfois ignorées |
| Concurrence écriture | ✅ Excellente | ⚠️ Verrous table (MyISAM) |
| Transactions | ✅ Complètes | ✅ (InnoDB) |
| Types avancés | ✅ JSONB, ARRAY | ⚠️ Limité |
| Performance lecture | ✅ Bonne | ✅ Bonne |
| Performance écriture | ✅ Excellente | ⚠️ Moyenne |

## Conséquences

### Positives
- Intégrité des données garantie
- Meilleure gestion des pics de commande
- Flexibilité pour évolutions futures

### Négatives
- Nécessite un hébergement compatible PostgreSQL
- Courbe d'apprentissage légèrement plus raide pour certains devs

## Configuration Laravel

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=boutique
DB_USERNAME=postgres
DB_PASSWORD=secret
```

## Statut

✅ **ACCEPTÉ** - Implémenté dans la configuration du projet

---

*Références :*
- https://www.postgresql.org/docs/current/
- https://laravel.com/docs/database
