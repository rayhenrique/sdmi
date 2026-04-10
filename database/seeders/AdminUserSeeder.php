<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@secmulher.gov.br'],
            [
                'nome' => 'Administrador',
                'email' => 'admin@secmulher.gov.br',
                'password' => Hash::make('secmulher2026'),
                'perfil' => 'admin',
                'ativo' => true,
                'email_verified_at' => now(),
            ]
        );
    }
}
