<?php

namespace App\Enums;

enum CorRaca: string
{
    case BRANCA = 'branca';
    case PRETA = 'preta';
    case PARDA = 'parda';
    case AMARELA = 'amarela';
    case INDIGENA = 'indigena';
    case NAO_INFORMADA = 'nao_informada';

    public function label(): string
    {
        return match ($this) {
            self::BRANCA => 'Branca',
            self::PRETA => 'Preta',
            self::PARDA => 'Parda',
            self::AMARELA => 'Amarela',
            self::INDIGENA => 'Indígena',
            self::NAO_INFORMADA => 'Não Informada',
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
