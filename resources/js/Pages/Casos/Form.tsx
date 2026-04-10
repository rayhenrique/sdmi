import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Caso, SelectOption, PessoaAtendida, TipoViolencia } from '@/types';
import { FormEvent } from 'react';
import SearchableSelect from '@/Components/SearchableSelect';

interface Props {
    caso?: Caso;
    pessoa?: PessoaAtendida;
    pessoas: Pick<PessoaAtendida, 'id' | 'nome_completo' | 'cpf'>[];
    tiposViolencia: TipoViolencia[];
    enums: {
        status: SelectOption[];
        origem_encaminhamento: SelectOption[];
        tempo_convivencia: SelectOption[];
        relacao_agressor: SelectOption[];
    };
    flash?: {
        error?: string;
    };
}

export default function Form({ caso, pessoa, pessoas, tiposViolencia, enums, flash }: Props) {
    const isEdit = !!caso;

    const { data, setData, post, put, processing, errors } = useForm({
        pessoa_id: caso?.pessoa_id || pessoa?.id || '',
        data_abertura: caso?.data_abertura ? caso.data_abertura.split('T')[0] : new Date().toISOString().split('T')[0],
        status: caso?.status || 'novo',
        origem_encaminhamento: caso?.origem_encaminhamento || '',
        medida_protetiva: caso?.medida_protetiva ?? false,
        iml: caso?.iml ?? false,
        tempo_convivencia: caso?.tempo_convivencia || '',
        relacao_agressor: caso?.relacao_agressor || '',
        interesse_curso: caso?.interesse_curso ?? false,
        area_interesse_curso: caso?.area_interesse_curso || '',
        observacoes_iniciais: caso?.observacoes_iniciais || '',
        tipos_violencia: caso?.tipos_violencia?.map(tv => tv.id) || [],
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(`/casos/${caso.id}`);
        } else {
            post('/casos');
        }
    };

    const handleViolenciaToggle = (id: number) => {
        const current = data.tipos_violencia;
        if (current.includes(id)) {
            setData('tipos_violencia', current.filter(vid => vid !== id));
        } else {
            setData('tipos_violencia', [...current, id]);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={isEdit ? 'Editar Caso' : 'Abrir Caso'} />

            <div className="page-header" style={{ marginBottom: '24px' }}>
                <div>
                    <Link href="/casos" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px', marginBottom: '8px', display: 'inline-block' }}>
                        &larr; Voltar para Casos
                    </Link>
                    <h1 className="page-title">{isEdit ? `Editar Caso #${caso?.id}` : 'Abertura de Novo Caso'}</h1>
                    <p className="page-subtitle">Preencha as informações iniciais do atendimento e as motivações da busca.</p>
                </div>
            </div>

            {flash?.error && <div className="toast toast--error">{flash.error}</div>}

            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <form onSubmit={submit}>
                    
                    <h3 className="form-section__title">1. Vinculação e Status</h3>
                    <div className="form-row">
                        <div className="form-group" style={{ flex: 2 }}>
                            <label className="form-label" htmlFor="pessoa_id">Pessoa Atendida *</label>
                            <SearchableSelect 
                                options={pessoas.map((p) => ({ 
                                    value: String(p.id), 
                                    label: `${p.nome_completo} ${p.cpf ? `(CPF: ${p.cpf})` : ''}` 
                                }))}
                                value={String(data.pessoa_id)}
                                onChange={(val) => setData('pessoa_id', String(val))}
                                placeholder="Selecione quem está sendo atendido(a)..."
                                disabled={!!pessoa}
                            />
                            {errors.pessoa_id && <div className="form-error">{errors.pessoa_id}</div>}
                            {pessoa && (
                                <div style={{ fontSize: '0.75rem', marginTop: '4px', color: 'var(--text-secondary)' }}>
                                    Vinculado automaticamente ao perfil de {pessoa.nome_completo}.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="data_abertura">Data de Abertura *</label>
                            <input
                                id="data_abertura"
                                type="date"
                                className="form-input"
                                value={data.data_abertura}
                                onChange={(e) => setData('data_abertura', e.target.value)}
                                required
                            />
                            {errors.data_abertura && <div className="form-error">{errors.data_abertura}</div>}
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="status">Status do Caso *</label>
                            <select
                                id="status"
                                className="form-select"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value as any)}
                                required
                            >
                                {enums.status.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            {errors.status && <div className="form-error">{errors.status}</div>}
                        </div>
                    </div>

                    <h3 className="form-section__title" style={{ marginTop: '24px' }}>2. Contexto da Busca</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="origem_encaminhamento">Origem / Encaminhamento</label>
                            <select
                                id="origem_encaminhamento"
                                className="form-select"
                                value={data.origem_encaminhamento}
                                onChange={(e) => setData('origem_encaminhamento', e.target.value)}
                            >
                                <option value="">Selecione...</option>
                                {enums.origem_encaminhamento.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            {errors.origem_encaminhamento && <div className="form-error">{errors.origem_encaminhamento}</div>}
                        </div>
                    </div>

                    <h3 className="form-section__title" style={{ marginTop: '24px' }}>3. Circunstâncias da Violência (se aplicável)</h3>
                    <div className="form-group">
                        <label className="form-label">Tipos de Violência Relatadas</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)' }}>
                            {tiposViolencia.map(tv => (
                                <label key={tv.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem' }}>
                                    <input
                                        type="checkbox"
                                        checked={data.tipos_violencia.includes(tv.id)}
                                        onChange={() => handleViolenciaToggle(tv.id)}
                                    />
                                    {tv.nome}
                                </label>
                            ))}
                        </div>
                        {errors.tipos_violencia && <div className="form-error">{errors.tipos_violencia}</div>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="relacao_agressor">Relação com o Agressor</label>
                            <select
                                id="relacao_agressor"
                                className="form-select"
                                value={data.relacao_agressor}
                                onChange={(e) => setData('relacao_agressor', e.target.value)}
                            >
                                <option value="">Selecione...</option>
                                {enums.relacao_agressor.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            {errors.relacao_agressor && <div className="form-error">{errors.relacao_agressor}</div>}
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="tempo_convivencia">Tempo de Convivência</label>
                            <select
                                id="tempo_convivencia"
                                className="form-select"
                                value={data.tempo_convivencia}
                                onChange={(e) => setData('tempo_convivencia', e.target.value)}
                            >
                                <option value="">Selecione...</option>
                                {enums.tempo_convivencia.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            {errors.tempo_convivencia && <div className="form-error">{errors.tempo_convivencia}</div>}
                        </div>
                    </div>

                    <div className="form-row" style={{ marginTop: '16px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '24px' }}>
                            <input 
                                type="checkbox" 
                                checked={data.medida_protetiva}
                                onChange={e => setData('medida_protetiva', e.target.checked)}
                            />
                            Possui Medida Protetiva?
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input 
                                type="checkbox" 
                                checked={data.iml}
                                onChange={e => setData('iml', e.target.checked)}
                            />
                            Passou por exames no IML?
                        </label>
                    </div>

                    <h3 className="form-section__title" style={{ marginTop: '32px' }}>4. Autonomia e Cursos</h3>
                    <div className="form-row">
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                                <input 
                                    type="checkbox" 
                                    checked={data.interesse_curso}
                                    onChange={e => setData('interesse_curso', e.target.checked)}
                                />
                                Interesse em Cursos de Qualificação?
                            </label>
                        </div>
                        {data.interesse_curso && (
                            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                                <label className="form-label" htmlFor="area_interesse_curso">Área de Interesse</label>
                                <input
                                    id="area_interesse_curso"
                                    type="text"
                                    className="form-input"
                                    placeholder="Ex: Informática, Estética, Corte e Costura..."
                                    value={data.area_interesse_curso}
                                    onChange={(e) => setData('area_interesse_curso', e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    <h3 className="form-section__title" style={{ marginTop: '24px' }}>5. Observações Iniciais</h3>
                    <div className="form-group">
                        <textarea
                            className="form-input"
                            rows={4}
                            placeholder="Descreva brevemente o relato inicial de chegada da pessoa. O atendimento detalhado será feito no Prontuário."
                            value={data.observacoes_iniciais}
                            onChange={(e) => setData('observacoes_iniciais', e.target.value)}
                        />
                        {errors.observacoes_iniciais && <div className="form-error">{errors.observacoes_iniciais}</div>}
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '32px', paddingTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                        <Link href={pessoa ? `/pessoas/${pessoa.id}` : "/casos"} className="btn btn--secondary">
                            Cancelar
                        </Link>
                        <button type="submit" className="btn btn--primary" disabled={processing}>
                            {processing ? 'Salvando...' : (isEdit ? 'Salvar Alterações' : 'Abrir Caso')}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
