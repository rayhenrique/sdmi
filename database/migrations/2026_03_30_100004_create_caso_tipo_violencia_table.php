<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('caso_tipo_violencia', function (Blueprint $table) {
            $table->id();
            $table->foreignId('caso_id')->constrained('casos')->cascadeOnDelete();
            $table->foreignId('tipo_violencia_id')->constrained('tipos_violencia')->cascadeOnDelete();

            $table->unique(['caso_id', 'tipo_violencia_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('caso_tipo_violencia');
    }
};
