<?php

namespace App\Enums;

enum OrigemEncaminhamento: string
{
    case UBS = 'ubs';
    case HOSPITAL = 'hospital';
    case CRAS = 'cras';
    case CREAS = 'creas';
    case DELEGACIA = 'delegacia';
    case PROCURA_ESPONTANEA = 'procura_espontanea';
    case CONSELHO_TUTELAR = 'conselho_tutelar';
    case MINISTERIO_PUBLICO = 'ministerio_publico';
    case DEFENSORIA = 'defensoria';
    case OUTRO = 'outro';

    public function label(): string
    {
        return match ($this) {
            self::UBS => 'UBS',
            self::HOSPITAL => 'Hospital',
            self::CRAS => 'CRAS',
            self::CREAS => 'CREAS',
            self::DELEGACIA => 'Delegacia',
            self::PROCURA_ESPONTANEA => 'Procura Espontânea',
            self::CONSELHO_TUTELAR => 'Conselho Tutelar',
            self::MINISTERIO_PUBLICO => 'Ministério Público',
            self::DEFENSORIA => 'Defensoria Pública',
            self::OUTRO => 'Outro',
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
