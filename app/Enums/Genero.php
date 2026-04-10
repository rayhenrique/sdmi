<?php

namespace App\Enums;

enum Genero: string
{
    case FEMININO = 'feminino';
    case MASCULINO = 'masculino';
    case OUTRO = 'outro';
    case NAO_INFORMADO = 'nao_informado';

    public function label(): string
    {
        return match ($this) {
            self::FEMININO => 'Feminino',
            self::MASCULINO => 'Masculino',
            self::OUTRO => 'Outro',
            self::NAO_INFORMADO => 'Não Informado',
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
