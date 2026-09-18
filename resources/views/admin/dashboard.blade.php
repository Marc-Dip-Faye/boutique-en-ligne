@extends('layouts.admin')

@section('title', 'Dashboard - Admin')

@section('content')
<div class="mb-6">
    <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
    <p class="text-gray-600 mt-1">Vue d'ensemble de votre boutique</p>
</div>

<!-- KPIs Cards -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" 
     x-data="{
         stats: [
             { title: 'Ventes du jour', value: '€1,234', change: '+12%', icon: '💰', color: 'bg-green-500' },
             { title: 'Commandes', value: '23', change: '+5%', icon: '📦', color: 'bg-blue-500' },
             { title: 'Clients', value: '156', change: '+8%', icon: '👥', color: 'bg-purple-500' },
             { title: 'Produits', value: '48', change: '+2', icon: '🛍️', color: 'bg-orange-500' }
         ]
     }">
    
    <template x-for="stat in stats" :key="stat.title">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600" x-text="stat.title"></p>
                    <p class="text-2xl font-bold text-gray-900 mt-1" x-text="stat.value"></p>
                </div>
                <div class="w-12 h-12 rounded-full flex items-center justify-center text-2xl" :class="stat.color + ' bg-opacity-10'">
                    <span x-text="stat.icon"></span>
                </div>
            </div>
            <div class="mt-4 flex items-center text-sm">
                <span class="text-green-600 font-medium" x-text="stat.change"></span>
                <span class="text-gray-500 ml-2">vs semaine dernière</span>
            </div>
        </div>
    </template>
</div>

<!-- Graphiques et Tableaux -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    
    <!-- Ventes Récentes -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Ventes Récentes</h2>
        </div>
        <div class="p-6" x-data="{
            sales: [
                { date: 'Lun', amount: 450 },
                { date: 'Mar', amount: 680 },
                { date: 'Mer', amount: 520 },
                { date: 'Jeu', amount: 890 },
                { date: 'Ven', amount: 1234 },
                { date: 'Sam', amount: 760 },
                { date: 'Dim', amount: 620 }
            ],
            maxAmount: 1234
        }">
            <div class="flex items-end justify-between h-48 space-x-2">
                <template x-for="sale in sales" :key="sale.date">
                    <div class="flex flex-col items-center flex-1">
                        <div class="w-full bg-indigo-100 rounded-t-md relative group" 
                             :style="'height: ' + (sale.amount / maxAmount * 100) + '%'">
                            <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                                 x-text="'€' + sale.amount"></div>
                        </div>
                        <span class="text-xs text-gray-600 mt-2" x-text="sale.date"></span>
                    </div>
                </template>
            </div>
        </div>
    </div>

    <!-- Produits Populaires -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Top Produits</h2>
        </div>
        <div class="p-6">
            <div class="space-y-4" x-data="{
                products: [
                    { name: 'Smartphone X Pro', sales: 45, revenue: 31455, image: '📱' },
                    { name: 'Casque Audio Premium', sales: 38, revenue: 7562, image: '🎧' },
                    { name: 'Montre Connectée', sales: 32, revenue: 7968, image: '⌚' },
                    { name: 'Sac à Dos Urbain', sales: 28, revenue: 2212, image: '🎒' }
                ]
            }">
                <template x-for="(product, index) in products" :key="product.name">
                    <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                            <span x-text="product.image"></span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate" x-text="product.name"></p>
                            <p class="text-xs text-gray-500" x-text="product.sales + ' ventes'"></p>
                        </div>
                        <div class="text-right">
                            <p class="text-sm font-semibold text-gray-900" x-text="'€' + product.revenue.toLocaleString()"></p>
                            <p class="text-xs text-green-600">Top <span x-text="index + 1"></span></p>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</div>

<!-- Dernières Commandes -->
<div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">Dernières Commandes</h2>
        <a href="#" class="text-sm text-indigo-600 hover:text-indigo-800 font-medium">Voir tout →</a>
    </div>
    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200" x-data="{
            orders: [
                { id: '#CMD-001', customer: 'Jean Dupont', date: 'Aujourd\'hui', total: 234.50, status: 'payée', statusColor: 'green' },
                { id: '#CMD-002', customer: 'Marie Martin', date: 'Aujourd\'hui', total: 89.99, status: 'en attente', statusColor: 'yellow' },
                { id: '#CMD-003', customer: 'Pierre Durand', date: 'Hier', total: 456.00, status: 'expédiée', statusColor: 'blue' },
                { id: '#CMD-004', customer: 'Sophie Bernard', date: 'Hier', total: 123.45, status: 'payée', statusColor: 'green' },
                { id: '#CMD-005', customer: 'Luc Petit', date: 'Hier', total: 678.90, status: 'annulée', statusColor: 'red' }
            ]
        }">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commande</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <template x-for="order in orders" :key="order.id">
                    <tr class="hover:bg-gray-50 transition">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600" x-text="order.id"></td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" x-text="order.customer"></td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" x-text="order.date"></td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" x-text="'€' + order.total"></td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                                  :class="'bg-' + order.statusColor + '-100 text-' + order.statusColor + '-800'"
                                  x-text="order.status"></span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" class="text-indigo-600 hover:text-indigo-900">Voir</a>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</div>

<!-- Actions Rapides -->
<div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
    <a href="#" class="flex items-center justify-center p-6 bg-white border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition group">
        <svg class="w-8 h-8 text-gray-400 group-hover:text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        <span class="text-lg font-medium text-gray-600 group-hover:text-indigo-700">Ajouter un produit</span>
    </a>
    <a href="#" class="flex items-center justify-center p-6 bg-white border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition group">
        <svg class="w-8 h-8 text-gray-400 group-hover:text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        <span class="text-lg font-medium text-gray-600 group-hover:text-indigo-700">Créer une promo</span>
    </a>
    <a href="#" class="flex items-center justify-center p-6 bg-white border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition group">
        <svg class="w-8 h-8 text-gray-400 group-hover:text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
        <span class="text-lg font-medium text-gray-600 group-hover:text-indigo-700">Nouveau client</span>
    </a>
</div>
@endsection
