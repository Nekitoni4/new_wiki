<?php

namespace App\Http\Controllers;

use App\Models\Articles;

class IndexController extends Controller
{
    public function index() {
        return view('welcome')->with(['articles' => Articles::all()]);
    }
}
