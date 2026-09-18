# ADR-003 : Intégration des Paiements

## Contexte

Le système de paiement doit :
- Supporter plusieurs moyens de paiement (Carte, Mobile Money)
- Être sécurisé (PCI-DSS compliant)
- Gérer les échecs et remboursements
- S'intégrer avec la gestion des commandes
- Fournir un historique complet

## Décision

Nous utilisons une **architecture en couches** avec :

1. **PaymentService** : Interface unique pour l'application
2. **Payment Gateways** : Implémentations spécifiques (Stripe, Wave, Orange Money)
3. **Payment Model** : Historique complet de toutes les transactions
4. **Webhooks** : Synchronisation asynchrone des statuts

## Justification

### Pourquoi abstraction des gateways ?

✅ **Flexibilité** : Changer de provider sans refondre le code
✅ **Redondance** : Basculer sur un autre gateway en cas de panne
✅ **Tests** : Mock facile pour les tests unitaires
✅ **Multi-paiement** : Offrir plusieurs options aux clients

### Architecture

```
┌─────────────────┐
│  CheckoutController │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  PaymentService   │ ← Interface unique
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌──────┐  ┌──────────┐
│Stripe│  │Wave/OM   │ ← Gateways spécifiques
└──────┘  └──────────┘
```

## Modélisation des données

### Table `payments`

```sql
payments
- id
- order_id (FK)
- user_id (FK)
- gateway (stripe, wave, orange_money)
- transaction_id (ID chez le provider)
- amount
- currency
- status (pending, completed, failed, refunded)
- method (card, mobile_money)
- metadata (JSONB - données spécifiques gateway)
- attempted_at (timestamp)
- completed_at (nullable)
- failed_at (nullable)
- created_at, updated_at
```

### Statuts de paiement

```
pending     → Initialisé, en attente
processing  → En cours de validation
completed   → Payé avec succès
failed      → Échec (insuffisant fonds, erreur technique)
refunded    → Remboursé (total ou partiel)
cancelled   → Annulé par l'utilisateur
```

## Flux de paiement typique

### 1. Initiation

```
POST /checkout
    ↓
Vérifier stock (verrouillage)
    ↓
Créer commande (status: pending_payment)
    ↓
Créer payment record (status: pending)
    ↓
Appeler Gateway → URL de paiement ou token
    ↓
Retourner au client
```

### 2. Callback/Webhook

```
Gateway → Webhook Laravel
    ↓
Vérifier signature (sécurité)
    ↓
Trouver payment par transaction_id
    ↓
Mettre à jour status
    ↓
Si completed :
    - Mettre à jour commande
    - Décrémenter stock définitivement
    - Envoyer email confirmation
    - Générer facture
    ↓
Répondre 200 OK au Gateway
```

### 3. Gestion des échecs

```
Paiement échoué
    ↓
Status payment → failed
    ↓
Libérer verrous stock
    ↓
Commande status → cancelled (après timeout)
    ↓
Notifier utilisateur (email)
    ↓
Proposer nouveau paiement
```

## Sécurité

### Obligatoire

✅ **HTTPS** partout (obligatoire pour PCI-DSS)
✅ **Ne jamais stocker** : Numéros de carte, CVV
✅ **Vérifier les signatures** : Tous les webhooks
✅ **Idempotence** : Gérer les webhooks en double
✅ **Rate limiting** : Sur les routes de paiement

### Recommandé

⚠️ **3D Secure** : Pour réduire la fraude
⚠️ **Vérification adresse** : AVS si disponible
⚠️ **Plafonds** : Limiter les montants par transaction

## Gestion de la concurrence

### Problème

Deux webhooks arrivent simultanément pour le même paiement.

### Solution

```php
DB::transaction(function () use ($paymentId) {
    $payment = Payment::lockForUpdate()->find($paymentId);
    
    // Ignorer si déjà traité
    if ($payment->status !== 'pending') {
        return;
    }
    
    // Traiter le paiement
    $payment->update([...]);
});
```

## Remboursements

### Processus

```
Admin demande remboursement
    ↓
Vérifier éligibilité (délai, statut)
    ↓
Appeler Gateway API refund
    ↓
Si succès :
    - Créer payment record (type: refund)
    - Lier au payment original
    - Mettre à jour statut commande
    - Notifier client
    ↓
Si échec :
    - Logger l'erreur
    - Notifier admin
```

## Tests requis

- ✅ Paiement réussi (chaque gateway)
- ✅ Paiement échoué (carte refusée)
- ✅ Webhook reçu (signature valide)
- ✅ Webhook ignoré (signature invalide)
- ✅ Double webhook (idempotence)
- ✅ Remboursement total/partiel
- ✅ Timeout paiement (stock libéré)
- ✅ Concurrence (2 webhooks simultanés)

## Alternatives considérées

### Option 1 : Un seul provider (ex: Stripe uniquement)
- ❌ Pas de redondance
- ❌ Exclut les clients sans carte bancaire
- ❌ Dépendance totale

### Option 2 : PayPal uniquement
- ❌ Expérience utilisateur (redirection)
- ❌ Frais élevés
- ❌ Moins populaire en Afrique

### Option 3 : Virement manuel uniquement
- ❌ Validation manuelle requise
- ❌ Lent
- ❌ Pas d'automatisation

## Configuration par défaut

Pour le contexte africain, nous recommandons :

1. **Wave** : Mobile Money (Sénégal, Côte d'Ivoire, etc.)
2. **Orange Money** : Large couverture
3. **Stripe** : Cartes internationales (si disponible)

## Statut

✅ **ACCEPTÉ** - À implémenter dans Increment 8

---

*Références :*
- https://stripe.com/docs/webhooks
- https://developer.orange.com/apis/payments-om-afrique
- PCI-DSS v4.0 Requirements
