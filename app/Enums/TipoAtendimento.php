<?php

namespace App\Enums;

enum TipoAtendimento: string
{
    case PSICOLOGICO = 'psicologico';
    case JURIDICO = 'juridico';
    case SOCIAL = 'social';

    public function label(): string
    {
        return match ($this) {
            self::PSICOLOGICO => 'Psicológico',
            self::JURIDICO => 'Jurídico',
            self::SOCIAL => 'Social',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::PSICOLOGICO => 'violet',
            self::JURIDICO => 'amber',
            self::SOCIAL => 'emerald',
        };
    }

    public static function options(): array
    {
        return array_map(fn($case) => [
            'value' => $case->value,
            'label' => $case->label(),
            'color' => $case->color(),
        ], self::cases());
    }
}
