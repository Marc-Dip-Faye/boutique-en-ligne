<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    /**
     * Page d'accueil de la boutique
     */
    public function index()
    {
        return view('shop.home');
    }

    /**
     * Catalogue des produits
     */
    public function catalog()
    {
        // TODO: Implémenter avec les données de la BDD
        return view('shop.catalog');
    }

    /**
     * Détail d'un produit
     */
    public function showProduct(string $slug)
    {
        // TODO: Implémenter avec les données de la BDD
        return view('shop.product-detail', compact('slug'));
    }

    /**
     * Panier
     */
    public function cart()
    {
        // TODO: Implémenter avec le service panier
        return view('shop.cart');
    }

    /**
     * Checkout
     */
    public function checkout()
    {
        // TODO: Implémenter le processus de commande
        return view('shop.checkout');
    }
}
