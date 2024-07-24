<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\PostController;
use App\Http\Middleware\Authenticated;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\SessionTab;
use Illuminate\Support\Facades\Route;


Route::get('/login', [LoginController::class,'index'])->middleware([HandleInertiaRequests::class]);
Route::post('/login', [LoginController::class,'store']);
Route::get('/register', [RegisterController::class,'index'])->middleware([HandleInertiaRequests::class]);
Route::post('/register', [RegisterController::class,'store']);
Route::get('/logout',[LoginController::class,'destroy']);


Route::get('/', [PostController::class, 'index']);
Route::get('/posts/{id}',[PostController::class, 'show']);
Route::get('/author/{author}',[PostController::class,'listByAuthor']);
Route::get('/category/{category}',[PostController::class,'category']);
Route::middleware([HandleInertiaRequests::class,Authenticated::class,SessionTab::class])->group(function(){
    Route::get('/dashboard',[PostController::class,'dashboard'])->name('dashboard');
    Route::delete('/{id}', [PostController::class, 'destroy']);
    Route::resource('/',PostController::class)->except(['index']);
});