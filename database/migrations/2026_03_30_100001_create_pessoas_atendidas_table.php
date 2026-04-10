<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pessoas_atendidas', function (Blueprint $table) {
            $table->id();
            $table->string('nome_completo');
            $table->date('data_nascimento');
            $table->string('cpf', 14)->nullable()->unique();
            $table->string('telefone', 20);
            $table->string('whatsapp', 20)->nullable();
            $table->string('endereco')->nullable();
            $table->string('bairro')->nullable();
            $table->string('cidade')->nullable();
            $table->string('ubs')->nullable();
            $table->string('publico_atendido')->default('mulher');
            $table->string('genero')->nullable();
            $table->string('identidade_genero')->nullable();
            $table->string('orientacao_sexual')->nullable();
            $table->string('cor_raca')->nullable();
            $table->string('escolaridade')->nullable();
            $table->integer('numero_filhos')->nullable();
            $table->string('condicao_trabalho')->nullable();
            $table->string('renda')->nullable();
            $table->string('estado_civil')->nullable();
            $table->boolean('ativo')->default(true);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['nome_completo', 'data_nascimento']);
            $table->index('bairro');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pessoas_atendidas');
    }
};
