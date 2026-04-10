<?php

namespace App\Enums;

enum IdentidadeGenero: string
{
    case CISGÊNERO = 'cisgenero';
    case TRANSGÊNERO = 'transgenero';
    case NAO_BINARIO = 'nao_binario';
    case TRAVESTI = 'travesti';
    case OUTRO = 'outro';
    case NAO_INFORMADO = 'nao_informado';

    public function label(): string
    {
        return match ($this) {
            self::CISGÊNERO => 'Cisgênero',
            self::TRANSGÊNERO => 'Transgênero',
            self::NAO_BINARIO => 'Não Binário',
            self::TRAVESTI => 'Travesti',
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
