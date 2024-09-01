<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RolePermissionController;
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

    Route::group(['middleware' => 'permission:create-users'], function() {
        Route::post('/create-user', [UserController::class, 'store']);
        Route::post('/create-role-permissions', [RolePermissionController::class, 'store']);
        Route::get('/roles', [RoleController::class, 'index']);
        Route::get('/permissions', [PermissionController::class, 'index']);
    });

    Route::group(['middleware' => 'permission:edit-users'], function() {
        Route::get('/edit-user/{id}', [UserController::class, 'edit']);
        Route::post('/update-user/{id}', [UserController::class, 'update']);
        Route::get('/edit-role-permissions/{id}', [RolePermissionController::class, 'edit']);
        Route::post('/update-role-permissions/{id}', [RolePermissionController::class, 'update']);
    });

    Route::group(['middleware' => 'permission:delete-users'], function() {
        Route::delete('/delete-user/{id}', [UserController::class, 'destroy']);
        Route::delete('/delete-role-permissions/{id}', [RolePermissionController::class, 'destroy']);
    });

    Route::group(['middleware' => 'permission:view-users'], function() {
        Route::get('/users', [UserController::class, 'allUsers']);
        Route::get('/role-permissions', [RolePermissionController::class, 'index']);
    });

});