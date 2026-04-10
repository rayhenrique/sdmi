<?php

namespace App\Models;

use App\Enums\TipoAtendimento;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Atendimento extends Model
{
    use HasFactory;

    protected $table = 'atendimentos';

    protected $fillable = [
        'caso_id',
        'profissional_id',
        'tipo_atendimento',
        'data_atendimento',
        'relato',
        'evolucao',
        'encaminhamento_realizado',
        'observacoes',
        'status_pos_atendimento',
    ];

    protected $appends = [
        'data_atendimento_br',
    ];

    protected function casts(): array
    {
        return [
            'data_atendimento' => 'datetime',
            'tipo_atendimento' => TipoAtendimento::class,
        ];
    }

    // ── Relationships ──────────────────────────────

    public function caso(): BelongsTo
    {
        return $this->belongsTo(Caso::class, 'caso_id');
    }

    public function profissional(): BelongsTo
    {
        return $this->belongsTo(User::class, 'profissional_id');
    }

    // ── Scopes ──────────────────────────────────────

    public function scopePeriodo($query, $inicio, $fim)
    {
        return $query->whereBetween('data_atendimento', [$inicio, $fim]);
    }

    public function scopeTipo($query, $tipo)
    {
        return $query->where('tipo_atendimento', $tipo);
    }

    public function scopeProfissional($query, $profissionalId)
    {
        return $query->where('profissional_id', $profissionalId);
    }

    public function getDataAtendimentoBrAttribute()
    {
        return $this->data_atendimento ? $this->data_atendimento->format('d/m/Y H:i') : null;
    }
}
