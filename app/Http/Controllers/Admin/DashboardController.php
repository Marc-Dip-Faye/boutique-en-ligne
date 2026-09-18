<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    /**
     * Dashboard principal admin
     */
    public function index()
    {
        // TODO: Charger les vraies statistiques depuis la BDD
        return view('admin.dashboard');
    }

    /**
     * Liste des produits
     */
    public function products()
    {
        // TODO: Charger les produits depuis la BDD
        return view('admin.products.index');
    }

    /**
     * Formulaire de création de produit
     */
    public function createProduct()
    {
        return view('admin.products.create');
    }

    /**
     * Liste des commandes
     */
    public function orders()
    {
        // TODO: Charger les commandes depuis la BDD
        return view('admin.orders.index');
    }

    /**
     * Liste des clients
     */
    public function customers()
    {
        // TODO: Charger les clients depuis la BDD
        return view('admin.customers.index');
    }
}
