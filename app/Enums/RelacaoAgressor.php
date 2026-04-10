<?php

namespace App\Enums;

enum RelacaoAgressor: string
{
    case COMPANHEIRO = 'companheiro';
    case EX_COMPANHEIRO = 'ex_companheiro';
    case ESPOSO = 'esposo';
    case EX_ESPOSO = 'ex_esposo';
    case NAMORADO = 'namorado';
    case EX_NAMORADO = 'ex_namorado';
    case FILHO = 'filho';
    case FILHA = 'filha';
    case PAI = 'pai';
    case MAE = 'mae';
    case IRMAO = 'irmao';
    case VIZINHO = 'vizinho';
    case DESCONHECIDO = 'desconhecido';
    case OUTRO = 'outro';
    case NAO_SE_APLICA = 'nao_se_aplica';

    public function label(): string
    {
        return match ($this) {
            self::COMPANHEIRO => 'Companheiro',
            self::EX_COMPANHEIRO => 'Ex-Companheiro',
            self::ESPOSO => 'Esposo',
            self::EX_ESPOSO => 'Ex-Esposo',
            self::NAMORADO => 'Namorado',
            self::EX_NAMORADO => 'Ex-Namorado',
            self::FILHO => 'Filho(a)',
            self::FILHA => 'Filha',
            self::PAI => 'Pai',
            self::MAE => 'Mãe',
            self::IRMAO => 'Irmão/Irmã',
            self::VIZINHO => 'Vizinho(a)',
            self::DESCONHECIDO => 'Desconhecido',
            self::OUTRO => 'Outro',
            self::NAO_SE_APLICA => 'Não se Aplica',
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
