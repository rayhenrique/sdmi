<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoViolencia extends Model
{
    use HasFactory;

    protected $table = 'tipos_violencia';

    protected $fillable = [
        'nome',
        'slug',
        'ativo',
        'ordem',
    ];

    protected function casts(): array
    {
        return [
            'ativo' => 'boolean',
        ];
    }

    public function casos()
    {
        return $this->belongsToMany(Caso::class, 'caso_tipo_violencia');
    }

    public function scopeAtivo($query)
    {
        return $query->where('ativo', true);
    }
}
