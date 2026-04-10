<?php

namespace App\Models;

use App\Enums\CondicaoTrabalho;
use App\Enums\CorRaca;
use App\Enums\Escolaridade;
use App\Enums\EstadoCivil;
use App\Enums\Genero;
use App\Enums\IdentidadeGenero;
use App\Enums\OrientacaoSexual;
use App\Enums\PublicoAtendido;
use App\Enums\Renda;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class PessoaAtendida extends Model
{
    use HasFactory;

    protected $table = 'pessoas_atendidas';

    protected $fillable = [
        'nome_completo',
        'data_nascimento',
        'cpf',
        'telefone',
        'whatsapp',
        'endereco',
        'bairro',
        'cidade',
        'ubs',
        'publico_atendido',
        'genero',
        'identidade_genero',
        'orientacao_sexual',
        'cor_raca',
        'escolaridade',
        'numero_filhos',
        'condicao_trabalho',
        'renda',
        'estado_civil',
        'ativo',
        'created_by',
    ];

    protected $appends = [
        'idade',
        'faixa_etaria',
        'data_nascimento_br',
        'genero_label',
        'cor_raca_label',
        'escolaridade_label',
        'estado_civil_label',
        'condicao_trabalho_label',
        'renda_label',
    ];

    protected function casts(): array
    {
        return [
            'data_nascimento' => 'date',
            'publico_atendido' => PublicoAtendido::class,
            'genero' => Genero::class,
            'identidade_genero' => IdentidadeGenero::class,
            'orientacao_sexual' => OrientacaoSexual::class,
            'cor_raca' => CorRaca::class,
            'escolaridade' => Escolaridade::class,
            'condicao_trabalho' => CondicaoTrabalho::class,
            'renda' => Renda::class,
            'estado_civil' => EstadoCivil::class,
            'ativo' => 'boolean',
            'numero_filhos' => 'integer',
        ];
    }

    // ── Relationships ──────────────────────────────

    public function casos(): HasMany
    {
        return $this->hasMany(Caso::class, 'pessoa_id');
    }

    public function atendimentos(): HasManyThrough
    {
        return $this->hasManyThrough(Atendimento::class, Caso::class, 'pessoa_id', 'caso_id');
    }

    public function criadoPor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // ── Accessors ──────────────────────────────────

    public function getDataNascimentoBrAttribute(): ?string
    {
        return $this->data_nascimento?->format('d/m/Y');
    }

    public function getGeneroLabelAttribute(): ?string
    {
        return $this->genero?->label();
    }

    public function getCorRacaLabelAttribute(): ?string
    {
        return $this->cor_raca?->label();
    }

    public function getEscolaridadeLabelAttribute(): ?string
    {
        return $this->escolaridade?->label();
    }

    public function getEstadoCivilLabelAttribute(): ?string
    {
        return $this->estado_civil?->label();
    }

    public function getCondicaoTrabalhoLabelAttribute(): ?string
    {
        return $this->condicao_trabalho?->label();
    }

    public function getRendaLabelAttribute(): ?string
    {
        return $this->renda?->label();
    }

    public function getIdadeAttribute(): ?int
    {
        return $this->data_nascimento?->age;
    }

    public function getFaixaEtariaAttribute(): ?string
    {
        $idade = $this->idade;
        if ($idade === null) return null;

        return match (true) {
            $idade < 18 => 'Menor de 18',
            $idade <= 24 => '18 a 24 anos',
            $idade <= 34 => '25 a 34 anos',
            $idade <= 44 => '35 a 44 anos',
            $idade <= 54 => '45 a 54 anos',
            $idade <= 64 => '55 a 64 anos',
            default => '65 anos ou mais',
        };
    }

    // ── Scopes ──────────────────────────────────────

    public function scopeAtivo($query)
    {
        return $query->where('ativo', true);
    }

    public function scopeBusca($query, ?string $termo)
    {
        if (!$termo) return $query;

        return $query->where(function ($q) use ($termo) {
            $q->where('nome_completo', 'like', "%{$termo}%")
              ->orWhere('cpf', 'like', "%{$termo}%")
              ->orWhere('telefone', 'like', "%{$termo}%");
        });
    }
}
