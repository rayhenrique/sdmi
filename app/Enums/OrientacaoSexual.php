<?php

namespace App\Enums;

enum OrientacaoSexual: string
{
    case HETEROSSEXUAL = 'heterossexual';
    case HOMOSSEXUAL = 'homossexual';
    case BISSEXUAL = 'bissexual';
    case ASSEXUAL = 'assexual';
    case PANSEXUAL = 'pansexual';
    case OUTRO = 'outro';
    case NAO_INFORMADO = 'nao_informado';

    public function label(): string
    {
        return match ($this) {
            self::HETEROSSEXUAL => 'Heterossexual',
            self::HOMOSSEXUAL => 'Homossexual',
            self::BISSEXUAL => 'Bissexual',
            self::ASSEXUAL => 'Assexual',
            self::PANSEXUAL => 'Pansexual',
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
