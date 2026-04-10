<?php

namespace App\Enums;

enum StatusCaso: string
{
    case NOVO = 'novo';
    case EM_ACOMPANHAMENTO = 'em_acompanhamento';
    case ENCAMINHADO = 'encaminhado';
    case AGUARDANDO_RETORNO = 'aguardando_retorno';
    case ENCERRADO = 'encerrado';
    case ARQUIVADO = 'arquivado';

    public function label(): string
    {
        return match ($this) {
            self::NOVO => 'Novo',
            self::EM_ACOMPANHAMENTO => 'Em Acompanhamento',
            self::ENCAMINHADO => 'Encaminhado',
            self::AGUARDANDO_RETORNO => 'Aguardando Retorno',
            self::ENCERRADO => 'Encerrado',
            self::ARQUIVADO => 'Arquivado',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::NOVO => 'blue',
            self::EM_ACOMPANHAMENTO => 'yellow',
            self::ENCAMINHADO => 'purple',
            self::AGUARDANDO_RETORNO => 'orange',
            self::ENCERRADO => 'green',
            self::ARQUIVADO => 'gray',
        };
    }

    public static function options(): array
    {
        return array_map(fn($case) => [
            'value' => $case->value,
            'label' => $case->label(),
            'color' => $case->color(),
        ], self::cases());
    }
}
