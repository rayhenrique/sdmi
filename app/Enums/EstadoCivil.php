<?php

namespace App\Enums;

enum EstadoCivil: string
{
    case SOLTEIRA = 'solteira';
    case CASADA = 'casada';
    case UNIAO_ESTAVEL = 'uniao_estavel';
    case DIVORCIADA = 'divorciada';
    case SEPARADA = 'separada';
    case VIUVA = 'viuva';
    case NAO_INFORMADO = 'nao_informado';

    public function label(): string
    {
        return match ($this) {
            self::SOLTEIRA => 'Solteira',
            self::CASADA => 'Casada',
            self::UNIAO_ESTAVEL => 'União Estável',
            self::DIVORCIADA => 'Divorciada',
            self::SEPARADA => 'Separada',
            self::VIUVA => 'Viúva',
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
