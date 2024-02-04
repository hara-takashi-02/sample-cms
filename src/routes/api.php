<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['api']], function(){
    //Route::resource('/', 'App\Http\Controllers\WorksController');
    //Route::resource('home', 'App\Http\Controllers\WorksController');
    //Route::resource('task', 'App\Http\Controllers\TaskController');
    //Route::put('task', [TaskController::class, 'save'])->name('task.save');
});