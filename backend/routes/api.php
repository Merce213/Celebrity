<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CelebrityController;

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

/* Celebrity */
Route::get('/celebrities', [CelebrityController::class, 'index']);
Route::post('/celebrities', [CelebrityController::class, 'store']);
Route::get('/celebrities/{id}', [CelebrityController::class, 'show']);
Route::post('/celebrities/{id}', [CelebrityController::class, 'update']);
Route::delete('/celebrities/{id}', [CelebrityController::class, 'destroy']);
