<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WorksController;
use App\Http\Controllers\SkillsController;
use App\Http\Controllers\AllController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [AllController::class, 'showsite']);

Route::get('/home/', [AllController::class, 'showAdmin'], function () {
    return view('admin');
})->where('home', '.*');

Route::get('/home/{any}', [AllController::class, 'showAdmin'], function () {
    return view('admin');
})->where('any', '.*');

//登録画面表示設定(falseで非表示)
Auth::routes(['register' => true]);
