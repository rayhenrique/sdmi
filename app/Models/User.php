<?php

namespace App\Models;

use App\Enums\PerfilUsuario;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'nome',
        'email',
        'password',
        'perfil',
        'ativo',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'perfil' => PerfilUsuario::class,
            'ativo' => 'boolean',
        ];
    }

    // ── Relationships ──────────────────────────────

    public function atendimentos(): HasMany
    {
        return $this->hasMany(Atendimento::class, 'profissional_id');
    }

    public function pessoasCriadas(): HasMany
    {
        return $this->hasMany(PessoaAtendida::class, 'created_by');
    }

    // ── Helpers ────────────────────────────────────

    public function isAdmin(): bool
    {
        return $this->perfil === PerfilUsuario::ADMIN;
    }

    public function isRecepcao(): bool
    {
        return $this->perfil === PerfilUsuario::RECEPCAO;
    }

    public function isProfissionalTecnico(): bool
    {
        return in_array($this->perfil, [
            PerfilUsuario::PSICOLOGO,
            PerfilUsuario::ADVOGADO,
            PerfilUsuario::ASSISTENTE_SOCIAL,
        ]);
    }

    public function getTipoAtendimentoAttribute(): ?string
    {
        return match ($this->perfil) {
            PerfilUsuario::PSICOLOGO => 'psicologico',
            PerfilUsuario::ADVOGADO => 'juridico',
            PerfilUsuario::ASSISTENTE_SOCIAL => 'social',
            default => null,
        };
    }
}
