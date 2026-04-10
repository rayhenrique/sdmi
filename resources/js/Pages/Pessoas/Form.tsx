import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PessoaAtendida, SelectOption } from '@/types';
import { FormEvent } from 'react';
interface Props {
    pessoa?: PessoaAtendida;
    enums: {
        publico_atendido: SelectOption[];
        genero: SelectOption[];
        identidade_genero: SelectOption[];
        orientacao_sexual: SelectOption[];
        cor_raca: SelectOption[];
        escolaridade: SelectOption[];
        condicao_trabalho: SelectOption[];
        renda: SelectOption[];
        estado_civil: SelectOption[];
    };
    flash?: {
        error?: string;
    };
}

const maskCPF = (value: string) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
};

const maskPhone = (value: string) => {
    let v = value.replace(/\D/g, '');
    if (v.length <= 10) {
        v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
        v = v.replace(/(\d{4})(\d)/, '$1-$2');
    } else {
        v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
        v = v.replace(/(\d{5})(\d)/, '$1-$2');
    }
    return v.substring(0, 15);
};

export default function Form({ pessoa, enums, flash }: Props) {
    const isEdit = !!pessoa;
    
    const { data, setData, post, put, processing, errors } = useForm({
        nome_completo: pessoa?.nome_completo || '',
        data_nascimento: pessoa?.data_nascimento ? pessoa.data_nascimento.substring(0, 10) : '',
        cpf: pessoa?.cpf ? maskCPF(pessoa.cpf) : '',
        telefone: pessoa?.telefone ? maskPhone(pessoa.telefone) : '',
        whatsapp: pessoa?.whatsapp ? maskPhone(pessoa.whatsapp) : '',
        endereco: pessoa?.endereco || '',
        bairro: pessoa?.bairro || '',
        cidade: pessoa?.cidade || '',
        ubs: pessoa?.ubs || '',
        publico_atendido: pessoa?.publico_atendido || 'mulher',
        genero: pessoa?.genero || '',
        identidade_genero: pessoa?.identidade_genero || '',
        orientacao_sexual: pessoa?.orientacao_sexual || '',
        cor_raca: pessoa?.cor_raca || '',
        escolaridade: pessoa?.escolaridade || '',
        numero_filhos: pessoa?.numero_filhos || '',
        condicao_trabalho: pessoa?.condicao_trabalho || '',
        renda: pessoa?.renda || '',
        estado_civil: pessoa?.estado_civil || '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(`/pessoas/${pessoa.id}`);
        } else {
            post('/pessoas');
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={isEdit ? 'Editar Pessoa' : 'Novo Cadastro'} />

            <div className="page-header" style={{ marginBottom: '24px' }}>
                <div>
                    <Link href="/pessoas" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px', marginBottom: '8px', display: 'inline-block' }}>
                        &larr; Voltar para lista
                    </Link>
                    <h1 className="page-title">{isEdit ? 'Editar Cadastro' : 'Novo Cadastro (Pessoa Atendida)'}</h1>
                    <p className="page-subtitle">Preencha os dados de identificação e informações socioeconômicas.</p>
                </div>
            </div>

            {flash?.error && <div className="toast toast--error">{flash.error}</div>}

            <div className="card">
                <form onSubmit={submit}>
                    
                    <div className="form-section">
                        <h2 className="form-section__title">Identificação Pessoal</h2>
                        <div className="form-row">
                            <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                <label className="form-label" htmlFor="nome_completo">Nome Completo *</label>
                                <input
                                    id="nome_completo"
                                    type="text"
                                    className="form-input"
                                    value={data.nome_completo}
                                    onChange={(e) => setData('nome_completo', e.target.value)}
                                    required
                                />
                                {errors.nome_completo && <div className="form-error">{errors.nome_completo}</div>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="data_nascimento">Data de Nascimento *</label>
                                <input
                                    id="data_nascimento"
                                    type="date"
                                    className="form-input"
                                    value={data.data_nascimento}
                                    onChange={(e) => setData('data_nascimento', e.target.value)}
                                    required
                                />
                                {errors.data_nascimento && <div className="form-error">{errors.data_nascimento}</div>}
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="cpf">CPF (apenas números)</label>
                                <input
                                    id="cpf"
                                    type="text"
                                    className="form-input"
                                    placeholder="000.000.000-00"
                                    value={data.cpf}
                                    onChange={(e) => setData('cpf', maskCPF(e.target.value))}
                                />
                                {errors.cpf && <div className="form-error">{errors.cpf}</div>}
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2 className="form-section__title">Contato e Endereço</h2>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="telefone">Telefone Principal *</label>
                                <input
                                    id="telefone"
                                    type="text"
                                    className="form-input"
                                    placeholder="(00) 00000-0000"
                                    value={data.telefone}
                                    onChange={(e) => setData('telefone', maskPhone(e.target.value))}
                                    required
                                />
                                {errors.telefone && <div className="form-error">{errors.telefone}</div>}
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="whatsapp">WhatsApp / Recado</label>
                                <input
                                    id="whatsapp"
                                    type="text"
                                    className="form-input"
                                    placeholder="(00) 00000-0000"
                                    value={data.whatsapp}
                                    onChange={(e) => setData('whatsapp', maskPhone(e.target.value))}
                                />
                                {errors.whatsapp && <div className="form-error">{errors.whatsapp}</div>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                <label className="form-label" htmlFor="endereco">Endereço Completo</label>
                                <input
                                    id="endereco"
                                    type="text"
                                    className="form-input"
                                    value={data.endereco}
                                    onChange={(e) => setData('endereco', e.target.value)}
                                />
                                {errors.endereco && <div className="form-error">{errors.endereco}</div>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="bairro">Bairro</label>
                                <input
                                    id="bairro"
                                    type="text"
                                    className="form-input"
                                    value={data.bairro}
                                    onChange={(e) => setData('bairro', e.target.value)}
                                />
                                {errors.bairro && <div className="form-error">{errors.bairro}</div>}
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="cidade">Cidade</label>
                                <input
                                    id="cidade"
                                    type="text"
                                    className="form-input"
                                    value={data.cidade}
                                    onChange={(e) => setData('cidade', e.target.value)}
                                />
                                {errors.cidade && <div className="form-error">{errors.cidade}</div>}
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="ubs">UBS de Referência</label>
                                <input
                                    id="ubs"
                                    type="text"
                                    className="form-input"
                                    value={data.ubs}
                                    onChange={(e) => setData('ubs', e.target.value)}
                                />
                                {errors.ubs && <div className="form-error">{errors.ubs}</div>}
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2 className="form-section__title">Perfil Sociodemográfico</h2>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="publico_atendido">Público Atendido *</label>
                                <select
                                    id="publico_atendido"
                                    className="form-select"
                                    value={data.publico_atendido}
                                    onChange={(e) => setData('publico_atendido', e.target.value as any)}
                                    required
                                >
                                    {enums.publico_atendido.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                {errors.publico_atendido && <div className="form-error">{errors.publico_atendido}</div>}
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="cor_raca">Cor/Raça</label>
                                <select
                                    id="cor_raca"
                                    className="form-select"
                                    value={data.cor_raca}
                                    onChange={(e) => setData('cor_raca', e.target.value)}
                                >
                                    <option value="">Selecione...</option>
                                    {enums.cor_raca.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                {errors.cor_raca && <div className="form-error">{errors.cor_raca}</div>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="genero">Gênero</label>
                                <select
                                    id="genero"
                                    className="form-select"
                                    value={data.genero}
                                    onChange={(e) => setData('genero', e.target.value)}
                                >
                                    <option value="">Selecione...</option>
                                    {enums.genero.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                {errors.genero && <div className="form-error">{errors.genero}</div>}
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="identidade_genero">Identidade de Gênero</label>
                                <select
                                    id="identidade_genero"
                                    className="form-select"
                                    value={data.identidade_genero}
                                    onChange={(e) => setData('identidade_genero', e.target.value)}
                                >
                                    <option value="">Selecione...</option>
                                    {enums.identidade_genero.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                {errors.identidade_genero && <div className="form-error">{errors.identidade_genero}</div>}
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="orientacao_sexual">Orientação Sexual</label>
                                <select
                                    id="orientacao_sexual"
                                    className="form-select"
                                    value={data.orientacao_sexual}
                                    onChange={(e) => setData('orientacao_sexual', e.target.value)}
                                >
                                    <option value="">Selecione...</option>
                                    {enums.orientacao_sexual.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                {errors.orientacao_sexual && <div className="form-error">{errors.orientacao_sexual}</div>}
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2 className="form-section__title">Socioeconômico e Familiar</h2>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="escolaridade">Escolaridade</label>
                                <select
                                    id="escolaridade"
                                    className="form-select"
                                    value={data.escolaridade}
                                    onChange={(e) => setData('escolaridade', e.target.value)}
                                >
                                    <option value="">Selecione...</option>
                                    {enums.escolaridade.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                {errors.escolaridade && <div className="form-error">{errors.escolaridade}</div>}
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="estado_civil">Estado Civil</label>
                                <select
                                    id="estado_civil"
                                    className="form-select"
                                    value={data.estado_civil}
                                    onChange={(e) => setData('estado_civil', e.target.value)}
                                >
                                    <option value="">Selecione...</option>
                                    {enums.estado_civil.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                {errors.estado_civil && <div className="form-error">{errors.estado_civil}</div>}
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="numero_filhos">Nº de Filhos</label>
                                <input
                                    id="numero_filhos"
                                    type="number"
                                    className="form-input"
                                    value={data.numero_filhos}
                                    onChange={(e) => setData('numero_filhos', e.target.value)}
                                    min={0}
                                />
                                {errors.numero_filhos && <div className="form-error">{errors.numero_filhos}</div>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="condicao_trabalho">Condição de Trabalho</label>
                                <select
                                    id="condicao_trabalho"
                                    className="form-select"
                                    value={data.condicao_trabalho}
                                    onChange={(e) => setData('condicao_trabalho', e.target.value)}
                                >
                                    <option value="">Selecione...</option>
                                    {enums.condicao_trabalho.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                {errors.condicao_trabalho && <div className="form-error">{errors.condicao_trabalho}</div>}
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="renda">Renda Familiar</label>
                                <select
                                    id="renda"
                                    className="form-select"
                                    value={data.renda}
                                    onChange={(e) => setData('renda', e.target.value)}
                                >
                                    <option value="">Selecione...</option>
                                    {enums.renda.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                {errors.renda && <div className="form-error">{errors.renda}</div>}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '32px' }}>
                        <Link href="/pessoas" className="btn btn--secondary btn--lg">
                            Cancelar
                        </Link>
                        <button type="submit" className="btn btn--primary btn--lg" disabled={processing}>
                            {processing ? 'Salvando...' : 'Salvar Cadastro'}
                        </button>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
