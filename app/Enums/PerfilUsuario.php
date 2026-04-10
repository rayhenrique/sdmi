<?php

namespace App\Enums;

enum PerfilUsuario: string
{
    case ADMIN = 'admin';
    case RECEPCAO = 'recepcao';
    case PSICOLOGO = 'psicologo';
    case ADVOGADO = 'advogado';
    case ASSISTENTE_SOCIAL = 'assistente_social';

    public function label(): string
    {
        return match ($this) {
            self::ADMIN => 'Administrador',
            self::RECEPCAO => 'Recepção',
            self::PSICOLOGO => 'Psicólogo(a)',
            self::ADVOGADO => 'Advogado(a)',
            self::ASSISTENTE_SOCIAL => 'Assistente Social',
        };
    }

    public static function options(): array
    {
        return array_map(fn($case) => [
            'value' => $case->value,
            'label' => $case->label(),
        ], self::cases());
    }
}
