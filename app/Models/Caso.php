<?php

namespace App\Models;

use App\Enums\OrigemEncaminhamento;
use App\Enums\RelacaoAgressor;
use App\Enums\StatusCaso;
use App\Enums\TempoConvivencia;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Caso extends Model
{
    use HasFactory;

    protected $table = 'casos';

    protected $fillable = [
        'pessoa_id',
        'data_abertura',
        'status',
        'origem_encaminhamento',
        'medida_protetiva',
        'iml',
        'tempo_convivencia',
        'relacao_agressor',
        'interesse_curso',
        'area_interesse_curso',
        'observacoes_iniciais',
        'ativo',
        'created_by',
    ];

    protected $appends = [
        'status_label',
        'origem_encaminhamento_label',
        'data_abertura_br',
    ];

    protected function casts(): array
    {
        return [
            'data_abertura' => 'date',
            'status' => StatusCaso::class,
            'origem_encaminhamento' => OrigemEncaminhamento::class,
            'tempo_convivencia' => TempoConvivencia::class,
            'relacao_agressor' => RelacaoAgressor::class,
            'medida_protetiva' => 'boolean',
            'iml' => 'boolean',
            'interesse_curso' => 'boolean',
            'ativo' => 'boolean',
        ];
    }

    // ── Relationships ──────────────────────────────

    public function pessoa(): BelongsTo
    {
        return $this->belongsTo(PessoaAtendida::class, 'pessoa_id');
    }

    public function tiposViolencia(): BelongsToMany
    {
        return $this->belongsToMany(TipoViolencia::class, 'caso_tipo_violencia');
    }

    public function atendimentos(): HasMany
    {
        return $this->hasMany(Atendimento::class, 'caso_id')->orderBy('data_atendimento', 'desc');
    }

    public function criadoPor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // ── Scopes ──────────────────────────────────────

    public function scopeAtivo($query)
    {
        return $query->where('ativo', true);
    }

    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function period($query, $inicio, $fim)
    {
        return $query->whereBetween('data_abertura', [$inicio, $fim]);
    }

    public function getStatusLabelAttribute()
    {
        return $this->status ? $this->status->label() : null;
    }

    public function getOrigemEncaminhamentoLabelAttribute()
    {
        return $this->origem_encaminhamento ? $this->origem_encaminhamento->label() : null;
    }

    public function getDataAberturaBrAttribute()
    {
        return $this->data_abertura ? $this->data_abertura->format('d/m/Y') : null;
    }
}
