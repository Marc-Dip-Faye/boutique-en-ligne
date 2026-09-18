@extends('layouts.app')

@section('title', 'Accueil - MonShop')

@section('content')
<!-- Hero Section -->
<div class="bg-indigo-700 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                Bienvenue sur MonShop
            </h1>
            <p class="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
                Découvrez nos produits de qualité à des prix imbattables. 
                Livraison rapide et service client exceptionnel.
            </p>
            <div class="flex justify-center gap-4">
                <a href="#" class="bg-white text-indigo-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition shadow-lg">
                    Voir la boutique
                </a>
                <a href="#" class="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-indigo-700 transition">
                    En savoir plus
                </a>
            </div>
        </div>
    </div>
</div>

<!-- Catégories en Vedette -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Nos Catégories</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8" x-data="{ categories: [
        { name: 'Électronique', icon: '💻', count: 120 },
        { name: 'Vêtements', icon: '👕', count: 85 },
        { name: 'Maison', icon: '🏠', count: 64 }
    ]}">
        <template x-for="category in categories" :key="category.name">
            <div class="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden border border-gray-200">
                <div class="p-8 text-center">
                    <div class="text-6xl mb-4" x-text="category.icon"></div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2" x-text="category.name"></h3>
                    <p class="text-gray-500 mb-4" x-text="category.count + ' produits'"></p>
                    <a href="#" class="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center">
                        Voir les produits
                        <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </a>
                </div>
                <div class="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-5 transition"></div>
            </div>
        </template>
    </div>
</div>

<!-- Produits Populaires (Simulation) -->
<div class="bg-gray-100 py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Produits Populaires</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" 
             x-data="{ 
                 products: [
                     { id: 1, name: 'Smartphone X Pro', price: 699, image: '📱', category: 'Électronique' },
                     { id: 2, name: 'Casque Audio Premium', price: 199, image: '🎧', category: 'Électronique' },
                     { id: 3, name: 'Montre Connectée', price: 249, image: '⌚', category: 'Électronique' },
                     { id: 4, name: 'Sac à Dos Urbain', price: 79, image: '🎒', category: 'Accessoires' }
                 ],
                 addToCart(product) {
                     alert('Produit ajouté au panier: ' + product.name);
                 }
             }">
            
            <template x-for="product in products" :key="product.id">
                <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition group">
                    <!-- Image Produit -->
                    <div class="aspect-square bg-gray-200 flex items-center justify-center text-6xl">
                        <span x-text="product.image"></span>
                    </div>
                    
                    <!-- Infos Produit -->
                    <div class="p-4">
                        <p class="text-sm text-indigo-600 font-medium mb-1" x-text="product.category"></p>
                        <h3 class="font-semibold text-gray-900 mb-2 truncate" x-text="product.name"></h3>
                        <div class="flex items-center justify-between">
                            <span class="text-lg font-bold text-gray-900" x-text="'€' + product.price"></span>
                            <button @click="addToCart(product)" 
                                    class="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        
        <div class="text-center mt-12">
            <a href="#" class="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-indigo-700 transition">
                Voir tous les produits
            </a>
        </div>
    </div>
</div>

<!-- Avantages -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
            <div class="text-4xl mb-4">🚚</div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Livraison Rapide</h3>
            <p class="text-gray-600">Expédition sous 24h et livraison en 2-3 jours ouvrés.</p>
        </div>
        <div>
            <div class="text-4xl mb-4">🔒</div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Paiement Sécurisé</h3>
            <p class="text-gray-600">Transactions cryptées et protection des données.</p>
        </div>
        <div>
            <div class="text-4xl mb-4">💬</div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Support 24/7</h3>
            <p class="text-gray-600">Notre équipe est là pour vous aider à tout moment.</p>
        </div>
    </div>
</div>
@endsection
