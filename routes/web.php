<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Shop\HomeController;
use App\Http\Controllers\Admin\DashboardController;

/*
|--------------------------------------------------------------------------
| Web Routes - Partie Publique (Shop)
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/catalog', [HomeController::class, 'catalog'])->name('catalog');
Route::get('/product/{slug}', [HomeController::class, 'showProduct'])->name('product.show');
Route::get('/cart', [HomeController::class, 'cart'])->name('cart');
Route::get('/checkout', [HomeController::class, 'checkout'])->name('checkout');

/*
|--------------------------------------------------------------------------
| Admin Routes - Back Office
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    
    // Produits
    Route::get('/products', [DashboardController::class, 'products'])->name('products.index');
    Route::get('/products/create', [DashboardController::class, 'createProduct'])->name('products.create');
    
    // Commandes
    Route::get('/orders', [DashboardController::class, 'orders'])->name('orders.index');
    
    // Clients
    Route::get('/customers', [DashboardController::class, 'customers'])->name('customers.index');
});
