<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeadersController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return view('auth.login');
});

Auth::routes();

//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// Route::group(['middleware' => 'auth'], function () {
Route::post('/masterlist', [LeadersController::class, 'addNewList'])->name('addNewList');
Route::get('/masterlist', [LeadersController::class, 'masterlist'])->name('masterlist');
Route::get('/deleted_record', [LeadersController::class, 'deleted_record'])->name('deleted_record');
Route::post('/upload_file', [LeadersController::class, 'upload_file'])->name('upload_file');
Route::resource('/sorting', LeadersController::class, ['except' => ['create', 'store', 'edit', 'update', 'show', 'destroy']]);
Route::resource('/dashboard', DashboardController::class, ['except' => ['create', 'store', 'edit', 'update', 'show', 'destroy']]);
// });