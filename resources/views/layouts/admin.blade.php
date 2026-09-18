<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', 'Admin Dashboard')</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    
    <!-- Alpine.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    
    <style>
        [x-cloak] { display: none !important; }
    </style>
</head>
<body class="font-sans antialiased bg-gray-100 text-gray-900" x-data="{ sidebarOpen: false }">

    <div class="flex h-screen overflow-hidden">
        
        <!-- Sidebar Desktop -->
        <aside class="hidden md:flex md:flex-shrink-0">
            <div class="flex flex-col w-64 bg-gray-900 border-r border-gray-700">
                <div class="flex items-center justify-center h-16 bg-gray-800 border-b border-gray-700">
                    <span class="text-xl font-bold text-white">🛒 AdminShop</span>
                </div>
                
                <nav class="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                    <a href="{{ route('admin.dashboard') }}" 
                       class="flex items-center px-4 py-3 text-sm font-medium rounded-lg {{ request()->routeIs('admin.dashboard') ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white' }}">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                        Dashboard
                    </a>
                    
                    <a href="#" 
                       class="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        Produits
                    </a>
                    
                    <a href="#" 
                       class="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                        Commandes
                    </a>
                    
                    <a href="#" 
                       class="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        Clients
                    </a>
                    
                    <a href="#" 
                       class="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                        Catégories
                    </a>
                    
                    <a href="#" 
                       class="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Promotions
                    </a>
                    
                    <a href="#" 
                       class="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        Paramètres
                    </a>
                </nav>
                
                <div class="p-4 border-t border-gray-700">
                    <a href="{{ route('home') }}" class="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white transition">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Retour au site
                    </a>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <div class="flex flex-col flex-1 overflow-hidden">
            
            <!-- Top Header Mobile -->
            <header class="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
                <button @click="sidebarOpen = true" class="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
                <span class="text-lg font-bold text-gray-900">AdminShop</span>
                <div class="w-6"></div>
            </header>

            <!-- Mobile Sidebar Overlay -->
            <div x-show="sidebarOpen" @click="sidebarOpen = false" x-cloak class="fixed inset-0 z-40 md:hidden">
                <div class="absolute inset-0 bg-gray-600 bg-opacity-75"></div>
                <div class="relative flex flex-col w-64 max-w-xs h-full bg-gray-900 shadow-xl">
                    <div class="flex items-center justify-between p-4 border-b border-gray-700">
                        <span class="text-xl font-bold text-white">Menu</span>
                        <button @click="sidebarOpen = false" class="text-gray-400 hover:text-white">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                    <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
                        <a href="{{ route('admin.dashboard') }}" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-md">Dashboard</a>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-md">Produits</a>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-md">Commandes</a>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-md">Clients</a>
                        <a href="{{ route('home') }}" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-md mt-4">Retour au site</a>
                    </nav>
                </div>
            </div>

            <!-- Contenu Principal Scrollable -->
            <main class="flex-1 overflow-y-auto bg-gray-100 p-6">
                @if(session('success'))
                    <div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong class="font-bold">Succès!</strong>
                        <span class="block sm:inline">{{ session('success') }}</span>
                    </div>
                @endif

                @yield('content')
            </main>
        </div>
    </div>

</body>
</html>
