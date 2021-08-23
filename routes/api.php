<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiArticlesController;
use App\Http\Controllers\ApiSearchController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('articles', [ApiArticlesController::class, 'index']);
Route::post('articles', [ApiArticlesController::class, 'store']);
Route::get('search', [ApiSearchController::class, 'index']);
Route::get('search/{id}', [ApiSearchController::class, 'searchByID']);
