<?php

namespace App\Enums;

enum CondicaoTrabalho: string
{
    case EMPREGADA = 'empregada';
    case DESEMPREGADA = 'desempregada';
    case AUTONOMA = 'autonoma';
    case APOSENTADA = 'aposentada';
    case PENSIONISTA = 'pensionista';
    case DO_LAR = 'do_lar';
    case ESTUDANTE = 'estudante';
    case INFORMAL = 'informal';
    case NAO_INFORMADA = 'nao_informada';

    public function label(): string
    {
        return match ($this) {
            self::EMPREGADA => 'Empregada',
            self::DESEMPREGADA => 'Desempregada',
            self::AUTONOMA => 'Autônoma',
            self::APOSENTADA => 'Aposentada',
            self::PENSIONISTA => 'Pensionista',
            self::DO_LAR => 'Do Lar',
            self::ESTUDANTE => 'Estudante',
            self::INFORMAL => 'Informal',
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
