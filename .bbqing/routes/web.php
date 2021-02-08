<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RoulloteController;
use App\Http\Controllers\ProductBbqController;

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
Auth::routes();

Route::get('/', function () {
    return view('welcome');
});

Route::get('/chat', function(){
    return view('chatroom.chat');
 })->name('chat');

 Route::get('/meeting', function(){
    return view('meeting.booking');
 })->name('meeting');
 
Route::get('/home', [HomeController::class, 'index'])->name('home');
Route::get('/bbq', [ProductBbqController::class, 'index'])->name('bbq');
Route::resource('/roullotes', RoulloteController::class);



