<?php

namespace Database\Seeders;

use App\Models\TipoViolencia;
use Illuminate\Database\Seeder;

class TipoViolenciaSeeder extends Seeder
{
    public function run(): void
    {
        $tipos = [
            ['nome' => 'Violência Física', 'slug' => 'fisica', 'ordem' => 1],
            ['nome' => 'Violência Psicológica', 'slug' => 'psicologica', 'ordem' => 2],
            ['nome' => 'Violência Moral', 'slug' => 'moral', 'ordem' => 3],
            ['nome' => 'Violência Sexual', 'slug' => 'sexual', 'ordem' => 4],
            ['nome' => 'Violência Patrimonial', 'slug' => 'patrimonial', 'ordem' => 5],
            ['nome' => 'Não se Aplica', 'slug' => 'nao_se_aplica', 'ordem' => 6],
            ['nome' => 'Não foi Violência Doméstica', 'slug' => 'nao_foi_violencia_domestica', 'ordem' => 7],
        ];

        foreach ($tipos as $tipo) {
            TipoViolencia::updateOrCreate(
                ['slug' => $tipo['slug']],
                $tipo
            );
        }
    }
}
