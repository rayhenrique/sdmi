// ── Enums ─────────────────────────────────────────

export type PerfilUsuario = 'admin' | 'recepcao' | 'psicologo' | 'advogado' | 'assistente_social';
export type PublicoAtendido = 'mulher' | 'idoso' | 'ambos';
export type StatusCaso = 'novo' | 'em_acompanhamento' | 'encaminhado' | 'aguardando_retorno' | 'encerrado' | 'arquivado';
export type TipoAtendimento = 'psicologico' | 'juridico' | 'social';

// ── Models ────────────────────────────────────────

export interface User {
    id: number;
    nome: string;
    email: string;
    perfil: PerfilUsuario;
    ativo: boolean;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
}

export interface PessoaAtendida {
    id: number;
    nome_completo: string;
    data_nascimento: string;
    cpf?: string;
    telefone: string;
    whatsapp?: string;
    endereco?: string;
    bairro?: string;
    cidade?: string;
    ubs?: string;
    publico_atendido: PublicoAtendido;
    genero?: string;
    identidade_genero?: string;
    orientacao_sexual?: string;
    cor_raca?: string;
    escolaridade?: string;
    numero_filhos?: number;
    condicao_trabalho?: string;
    renda?: string;
    estado_civil?: string;
    ativo: boolean;
    idade?: number;
    faixa_etaria?: string;
    casos?: Caso[];
    casos_count?: number;
    created_at: string;
    updated_at: string;
    // Appends
    data_registro_br?: string;
    data_nascimento_br?: string;
    genero_label?: string;
    cor_raca_label?: string;
    escolaridade_label?: string;
    estado_civil_label?: string;
    condicao_trabalho_label?: string;
    renda_label?: string;
}

export interface TipoViolencia {
    id: number;
    nome: string;
    slug: string;
    ativo: boolean;
}

export interface Caso {
    id: number;
    pessoa_id: number;
    data_abertura: string;
    status: StatusCaso;
    origem_encaminhamento?: string;
    medida_protetiva?: boolean;
    iml?: boolean;
    tempo_convivencia?: string;
    relacao_agressor?: string;
    interesse_curso?: boolean;
    area_interesse_curso?: string;
    observacoes_iniciais?: string;
    ativo: boolean;
    pessoa?: PessoaAtendida;
    tipos_violencia?: TipoViolencia[];
    atendimentos?: Atendimento[];
    atendimentos_count?: number;
    created_at: string;
    updated_at: string;
    status_label?: string;
    origem_encaminhamento_label?: string;
    data_abertura_br?: string;
}

export interface Atendimento {
    id: number;
    caso_id: number;
    profissional_id: number;
    tipo_atendimento: TipoAtendimento;
    data_atendimento: string;
    relato: string;
    evolucao?: string;
    encaminhamento_realizado?: string;
    observacoes?: string;
    status_pos_atendimento?: string;
    caso?: Caso;
    profissional?: User;
    created_at: string;
    updated_at: string;
    data_atendimento_br?: string;
}

// ── Option Types (for selects) ────────────────────

export interface SelectOption {
    value: string;
    label: string;
    color?: string;
}

// ── Page Props ────────────────────────────────────

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash?: {
        success?: string;
        error?: string;
    };
};
