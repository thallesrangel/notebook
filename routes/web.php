<?php

use App\Http\Controllers\NotebookController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [ NotebookController::class, 'index' ])->name('doc.list');

Route::prefix('notebook')->group(function () {
    Route::post('/check-text', [ NotebookController::class, 'checkText' ]);
    Route::post('/store-practice', [ NotebookController::class, 'storePractice' ]);
    Route::get('/list/{id}', [ NotebookController::class, 'listByNotebookId' ]);
});

Route::prefix('practice')->group(function () {
    Route::get('/total/{notebook_id}/pdf', [NotebookController::class, 'generatePdfTotal'])->name('notebook.pdf');
    Route::get('/partial/{notebook_paragraph_id}/pdf', [NotebookController::class, 'generatePdfPartial']);
});

Route::post('/notebooks', [NotebookController::class, 'store']);
Route::put('/notebooks/{id}', [NotebookController::class, 'update']);
Route::delete('/notebooks/{id}', [NotebookController::class, 'destroy']);
Route::get('/notebooks-list', [NotebookController::class, 'list']);
Route::get('/profile', [UserController::class, 'profile'])->name('profile');