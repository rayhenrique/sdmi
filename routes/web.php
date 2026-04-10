<?php

use App\Http\Controllers\AtendimentoController;
use App\Http\Controllers\CasoController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\PessoaAtendidaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RelatorioController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

// ── Área Pública ─────────────────────────────────────
Route::get('/', [LandingController::class, 'index'])->name('landing');

// ── Área Restrita ────────────────────────────────────
Route::middleware(['auth', 'perfil'])->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Perfil do usuário logado
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Pessoas Atendidas
    Route::resource('pessoas', PessoaAtendidaController::class)->parameters([
        'pessoas' => 'pessoa',
    ]);

    // Casos
    Route::resource('casos', CasoController::class);

    // Atendimentos
    Route::post('/casos/{caso}/atendimentos', [AtendimentoController::class, 'store'])->name('atendimentos.store');

    // Gestão de Usuários (admin only)
    Route::middleware('perfil:admin')->group(function () {
        Route::resource('usuarios', UsuarioController::class)->except(['show']);
        Route::patch('/usuarios/{usuario}/toggle', [UsuarioController::class, 'toggle'])->name('usuarios.toggle');
    });

    // Relatórios
    Route::prefix('relatorios')->name('relatorios.')->group(function () {
        Route::get('/', [RelatorioController::class, 'index'])->name('index');
        Route::get('/exportar', [RelatorioController::class, 'exportar'])->name('exportar');
    });
});

require __DIR__.'/auth.php';
