<?php

namespace App\Enums;

enum Renda: string
{
    case SEM_RENDA = 'sem_renda';
    case ATE_1_SM = 'ate_1_sm';
    case DE_1_A_2_SM = '1_a_2_sm';
    case DE_2_A_3_SM = '2_a_3_sm';
    case ACIMA_3_SM = 'acima_3_sm';
    case NAO_INFORMADA = 'nao_informada';

    public function label(): string
    {
        return match ($this) {
            self::SEM_RENDA => 'Sem Renda',
            self::ATE_1_SM => 'Até 1 Salário Mínimo',
            self::DE_1_A_2_SM => 'De 1 a 2 Salários Mínimos',
            self::DE_2_A_3_SM => 'De 2 a 3 Salários Mínimos',
            self::ACIMA_3_SM => 'Acima de 3 Salários Mínimos',
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
