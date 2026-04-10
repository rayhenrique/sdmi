<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('atendimentos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('caso_id')->constrained('casos')->cascadeOnDelete();
            $table->foreignId('profissional_id')->constrained('users');
            $table->string('tipo_atendimento');
            $table->datetime('data_atendimento');
            $table->text('relato');
            $table->text('evolucao')->nullable();
            $table->text('encaminhamento_realizado')->nullable();
            $table->text('observacoes')->nullable();
            $table->string('status_pos_atendimento')->nullable();
            $table->timestamps();

            $table->index('data_atendimento');
            $table->index('tipo_atendimento');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('atendimentos');
    }
};
