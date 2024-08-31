<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function(){
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/profile', [UserController::class, 'index']);

    // Route::get('/users', [UserController::class, 'allUsers']);

    // Routes for creating users (Admin-only)
    Route::group(['middleware' => 'permission:create-users'], function() {
        Route::post('/create-user', [UserController::class, 'store']);
        Route::get('/roles', [RoleController::class, 'index']);
    });

    // Routes for editing users (Admin and Manager)
    Route::group(['middleware' => 'permission:edit-users'], function() {
        Route::put('/update-user/{id}', [AdminController::class, 'updateUser']);
    });

    // Routes for deleting users (Admin-only)
    Route::group(['middleware' => 'permission:delete-users'], function() {
        Route::delete('/delete-user/{id}', [AdminController::class, 'deleteUser']);
    });

    // Routes for viewing users (Admin, Manager, and Users)
    Route::group(['middleware' => 'permission:view-users'], function() {
        Route::get('/users', [UserController::class, 'allUsers']);
    });

});