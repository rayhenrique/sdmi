<?php

use App\Models\PessoaAtendida;
use App\Models\Caso;
use App\Models\Atendimento;
use App\Models\TipoViolencia;
use App\Models\User;
use App\Enums\CondicaoTrabalho;
use App\Enums\CorRaca;
use App\Enums\Escolaridade;
use App\Enums\EstadoCivil;
use App\Enums\Renda; // CORRIGIDO PARA RENDA
use App\Enums\Genero;
use App\Enums\OrigemEncaminhamento;
use App\Enums\StatusCaso;
use App\Enums\TipoAtendimento;
use Carbon\Carbon;
use Faker\Factory as Faker;

$faker = Faker::create('pt_BR');

$bairros = ['Centro', 'Mutirão', 'Sebastião Vilela', 'Benedito de Lira', 'Guaíra', 'Parque do Futuro', 'João José Pereira'];

$adminId = User::where('perfil', 'admin')->first()->id ?? User::first()->id;

$tiposViolencia = TipoViolencia::all();

echo "Gerando 20 pessoas e casos...\n";

for ($i = 0; $i < 20; $i++) {
    // 1. Pessoa
    $pessoa = PessoaAtendida::create([
        'nome_completo' => $faker->name('female'),
        'data_nascimento' => clone $faker->dateTimeBetween('-60 years', '-18 years'),
        'cpf' => $faker->numerify('###.###.###-##'),
        'telefone' => $faker->numerify('(82) 9####-####'),
        'bairro' => $faker->randomElement($bairros),
        'cidade' => 'Teotônio Vilela',
        'publico_atendido' => 'mulher',
        'genero' => Genero::FEMININO, // FIXED ENUM
        'cor_raca' => $faker->randomElement(CorRaca::cases()),
        'escolaridade' => $faker->randomElement(Escolaridade::cases()),
        'renda' => $faker->randomElement(Renda::cases()), // CORRIGIDO PARA RENDA
        'estado_civil' => $faker->randomElement(EstadoCivil::cases()),
        'created_by' => $adminId,
    ]);

    // 2. Caso
    $dataAbertura = clone $faker->dateTimeBetween('-5 months', 'now');
    $caso = Caso::create([
        'pessoa_id' => $pessoa->id,
        'data_abertura' => $dataAbertura,
        'status' => $faker->randomElement(StatusCaso::cases()),
        'origem_encaminhamento' => $faker->randomElement(OrigemEncaminhamento::cases()),
        'medida_protetiva' => $faker->boolean(40),
        'iml' => $faker->boolean(20),
        'created_by' => $adminId,
    ]);

    // Anexar Violências Aleatórias (de 1 a 3)
    if ($tiposViolencia->count() > 0) {
        $violenciasIds = $tiposViolencia->random(rand(1, 3))->pluck('id')->toArray();
        $caso->tiposViolencia()->attach($violenciasIds);
    }

    // 3. Atendimentos 
    $qtdAtendimentos = rand(1, 4);
    for ($j = 0; $j < $qtdAtendimentos; $j++) {
        Atendimento::create([
            'caso_id' => $caso->id,
            'profissional_id' => $adminId,
            'tipo_atendimento' => $faker->randomElement(TipoAtendimento::cases()),
            'data_atendimento' => Carbon::parse($dataAbertura)->addDays(rand(0, 30)),
            'relato' => $faker->realText(300),
            'evolucao' => $faker->realText(100),
        ]);
    }
}

echo "Pronto! Dados de paciente e casos inseridos com sucesso!";
