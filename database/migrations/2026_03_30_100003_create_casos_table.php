<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('casos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pessoa_id')->constrained('pessoas_atendidas')->cascadeOnDelete();
            $table->date('data_abertura');
            $table->string('status')->default('novo');
            $table->string('origem_encaminhamento')->nullable();
            $table->boolean('medida_protetiva')->nullable();
            $table->boolean('iml')->nullable();
            $table->string('tempo_convivencia')->nullable();
            $table->string('relacao_agressor')->nullable();
            $table->boolean('interesse_curso')->nullable();
            $table->string('area_interesse_curso')->nullable();
            $table->text('observacoes_iniciais')->nullable();
            $table->boolean('ativo')->default(true);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index('status');
            $table->index('data_abertura');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('casos');
    }
};
