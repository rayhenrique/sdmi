<?php

namespace App\Enums;

enum Escolaridade: string
{
    case NAO_ALFABETIZADA = 'nao_alfabetizada';
    case FUNDAMENTAL_INCOMPLETO = 'fundamental_incompleto';
    case FUNDAMENTAL_COMPLETO = 'fundamental_completo';
    case MEDIO_INCOMPLETO = 'medio_incompleto';
    case MEDIO_COMPLETO = 'medio_completo';
    case SUPERIOR_INCOMPLETO = 'superior_incompleto';
    case SUPERIOR_COMPLETO = 'superior_completo';
    case POS_GRADUACAO = 'pos_graduacao';
    case NAO_INFORMADA = 'nao_informada';

    public function label(): string
    {
        return match ($this) {
            self::NAO_ALFABETIZADA => 'Não Alfabetizada',
            self::FUNDAMENTAL_INCOMPLETO => 'Fundamental Incompleto',
            self::FUNDAMENTAL_COMPLETO => 'Fundamental Completo',
            self::MEDIO_INCOMPLETO => 'Médio Incompleto',
            self::MEDIO_COMPLETO => 'Médio Completo',
            self::SUPERIOR_INCOMPLETO => 'Superior Incompleto',
            self::SUPERIOR_COMPLETO => 'Superior Completo',
            self::POS_GRADUACAO => 'Pós-Graduação',
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
