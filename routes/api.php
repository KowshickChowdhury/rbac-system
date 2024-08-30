<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ManagerController;
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

    // Admin routes
    Route::group(['middleware' => 'role:Admin'], function() {
        Route::get('/users', [UserController::class, 'allUsers']);
        Route::post('/create-user', [AdminController::class, 'createUser']);
        Route::put('/update-user/{id}', [AdminController::class, 'updateUser']);
        Route::delete('/delete-user/{id}', [AdminController::class, 'deleteUser']);
        Route::post('/assign-role/{userId}', [AdminController::class, 'assignRole']);
    });

    // Manager routes
    Route::group(['middleware' => 'role:Manager'], function() {
        Route::put('/update-user/{id}', [ManagerController::class, 'updateUser']);
        Route::get('/view-users', [ManagerController::class, 'viewUsers']);
    });

    // User routes
    // Route::group(['middleware' => 'role:User'], function() {
    //     Route::get('/profile', [UserController::class, 'profile']);
    // });

});