<?php

namespace App\Enums;

enum PublicoAtendido: string
{
    case MULHER = 'mulher';
    case IDOSO = 'idoso';
    case AMBOS = 'ambos';

    public function label(): string
    {
        return match ($this) {
            self::MULHER => 'Mulher',
            self::IDOSO => 'Idoso(a)',
            self::AMBOS => 'Ambos',
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
