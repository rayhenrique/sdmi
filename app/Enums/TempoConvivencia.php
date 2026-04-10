<?php

namespace App\Enums;

enum TempoConvivencia: string
{
    case MENOS_1_ANO = 'menos_1_ano';
    case DE_1_A_5_ANOS = '1_a_5_anos';
    case DE_5_A_10_ANOS = '5_a_10_anos';
    case DE_10_A_20_ANOS = '10_a_20_anos';
    case MAIS_20_ANOS = 'mais_20_anos';
    case NAO_CONVIVIAM = 'nao_conviviam';
    case NAO_INFORMADO = 'nao_informado';

    public function label(): string
    {
        return match ($this) {
            self::MENOS_1_ANO => 'Menos de 1 ano',
            self::DE_1_A_5_ANOS => 'De 1 a 5 anos',
            self::DE_5_A_10_ANOS => 'De 5 a 10 anos',
            self::DE_10_A_20_ANOS => 'De 10 a 20 anos',
            self::MAIS_20_ANOS => 'Mais de 20 anos',
            self::NAO_CONVIVIAM => 'Não conviviam',
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
