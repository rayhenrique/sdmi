import { Head, Link, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Caso, SelectOption, Atendimento } from '@/types';
import { FormEvent, useState } from 'react';

interface Props {
    caso: Caso;
    statusOptions: SelectOption[];
    enums: {
        tipo_atendimento: SelectOption[];
    };
    flash?: {
        success?: string;
        error?: string;
    };
    auth: {
        user: {
            id: number;
            nome: string;
            perfil: string;
        }
    }
}

const statusColors: Record<string, string> = {
    novo: 'blue',
    em_acompanhamento: 'yellow',
    encaminhado: 'purple',
    aguardando_retorno: 'orange',
    encerrado: 'green',
    arquivado: 'gray',
};

export default function Show({ caso, statusOptions, enums, flash, auth }: Props) {
    const [showForm, setShowForm] = useState(false);
    
    // Status update form
    const { data: statusData, setData: setStatusData, put: putStatus, processing: statusProcessing } = useForm({
        status: caso.status,
    });

    // New Atendimento form
    const { data, setData, post, processing, errors, reset } = useForm({
        tipo_atendimento: '',
        data_atendimento: new Date().toISOString().slice(0, 16),
        relato: '',
        evolucao: '',
        encaminhamento_realizado: '',
        observacoes: '',
        status_pos_atendimento: '',
    });

    const handleStatusUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as any;
        setStatusData('status', newStatus);
        
        if (confirm('Deseja realmente atualizar o status deste caso?')) {
            router.put(`/casos/${caso.id}`, { 
                status: newStatus 
            }, { preserveScroll: true });
        }
    };

    const submitAtendimento = (e: FormEvent) => {
        e.preventDefault();
        post(`/casos/${caso.id}/atendimentos`, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShowForm(false);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Caso #${caso.id} - Prontuário`} />

            {flash?.success && <div className="toast toast--success" style={{ marginBottom: '24px' }}>{flash.success}</div>}
            {flash?.error && <div className="toast toast--error" style={{ marginBottom: '24px' }}>{flash.error}</div>}

            <div className="page-header" style={{ marginBottom: '24px' }}>
                <div>
                    <Link href="/casos" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px', marginBottom: '8px', display: 'inline-block' }}>
                        &larr; Voltar para Casos
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <h1 className="page-title" style={{ marginBottom: 0 }}>Prontuário e Evolução</h1>
                        <span className={`badge badge--${statusColors[caso.status] || 'gray'}`}>
                            {caso.status_label || caso.status}
                        </span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div className="form-group" style={{ marginBottom: 0, width: '200px' }}>
                        <select
                            className="form-select"
                            value={statusData.status}
                            onChange={handleStatusUpdate}
                            disabled={statusProcessing}
                        >
                            {statusOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>Mudar Status: {opt.label}</option>
                            ))}
                        </select>
                    </div>
                    <Link href={`/casos/${caso.id}/edit`} className="btn btn--secondary">
                        ✏️ Editar Caso
                    </Link>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '24px' }}>
                
                {/* Lateral Esquerda - Resumo do Caso e Pessoa */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="card">
                        <h3 className="form-section__title" style={{ marginTop: 0, fontSize: '1rem', borderBottom: 'none' }}>Pessoa Atendida</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div className="topbar__avatar" style={{ width: '48px', height: '48px', fontSize: '18px' }}>
                                {caso.pessoa?.nome_completo.charAt(0)}
                            </div>
                            <div>
                                <Link href={`/pessoas/${caso.pessoa?.id}`} style={{ fontWeight: 600, color: 'var(--primary-color)', textDecoration: 'none' }}>
                                    {caso.pessoa?.nome_completo}
                                </Link>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                    CPF: {caso.pessoa?.cpf || 'Não informado'}
                                </div>
                            </div>
                        </div>
                        
                        <div style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div><strong>Contato:</strong> {caso.pessoa?.telefone}</div>
                            <div><strong>Idade:</strong> {caso.pessoa?.idade ? `${caso.pessoa.idade} anos` : 'N/I'}</div>
                            <div><strong>Bairro:</strong> {caso.pessoa?.bairro || 'N/I'}</div>
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="form-section__title" style={{ marginTop: 0, fontSize: '1rem', borderBottom: 'none' }}>Detalhes do Caso</h3>
                        
                        <div style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div>
                                <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Data de Abertura</strong>
                                {caso.data_abertura_br}
                            </div>
                            
                            {caso.origem_encaminhamento_label && (
                                <div>
                                    <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Origem / Encaminhamento</strong>
                                    {caso.origem_encaminhamento_label}
                                </div>
                            )}

                            <div>
                                <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Tipos de Violência Relatadas</strong>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                    {caso.tipos_violencia && caso.tipos_violencia.length > 0 ? (
                                        caso.tipos_violencia.map(tv => (
                                            <span key={tv.id} className="badge badge--gray">{tv.nome}</span>
                                        ))
                                    ) : (
                                        <span style={{ color: 'var(--text-secondary)' }}>Nenhuma informada</span>
                                    )}
                                </div>
                            </div>

                            <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--radius)' }}>
                                <strong style={{ display: 'block', marginBottom: '8px' }}>Rede de Proteção</strong>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <span style={{ color: caso.medida_protetiva ? 'var(--success-color)' : 'var(--text-secondary)' }}>
                                        {caso.medida_protetiva ? '✅' : '❌'} Medida Protetiva
                                    </span>
                                    <span style={{ color: caso.iml ? 'var(--success-color)' : 'var(--text-secondary)' }}>
                                        {caso.iml ? '✅' : '❌'} Exames IML
                                    </span>
                                </div>
                            </div>

                            {caso.observacoes_iniciais && (
                                <div>
                                    <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Observações Iniciais</strong>
                                    <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>{caso.observacoes_iniciais}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Lateral Direita - Timeline de Atendimentos */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    <div className="card" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Evolução do Caso</h2>
                            <button className="btn btn--primary" onClick={() => setShowForm(!showForm)}>
                                {showForm ? 'Cancelar Registro' : '+ Novo Atendimento'}
                            </button>
                        </div>

                        {showForm && (
                            <form onSubmit={submitAtendimento} style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', marginBottom: '32px' }}>
                                <h3 className="form-section__title" style={{ marginTop: 0 }}>Registro de Atendimento</h3>
                                
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="tipo_atendimento">Tipo de Atendimento *</label>
                                        <select
                                            id="tipo_atendimento"
                                            className="form-select"
                                            value={data.tipo_atendimento}
                                            onChange={e => setData('tipo_atendimento', e.target.value)}
                                            required
                                        >
                                            <option value="">Selecione a área profissional...</option>
                                            {enums.tipo_atendimento.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                        {errors.tipo_atendimento && <div className="form-error">{errors.tipo_atendimento}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="data_atendimento">Data e Hora *</label>
                                        <input
                                            id="data_atendimento"
                                            type="datetime-local"
                                            className="form-input"
                                            value={data.data_atendimento}
                                            onChange={e => setData('data_atendimento', e.target.value)}
                                            required
                                        />
                                        {errors.data_atendimento && <div className="form-error">{errors.data_atendimento}</div>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="relato">Relato do(a) Atendido(a) *</label>
                                    <textarea
                                        id="relato"
                                        className="form-input"
                                        rows={4}
                                        placeholder="O que a pessoa relatou durante o atendimento..."
                                        value={data.relato}
                                        onChange={e => setData('relato', e.target.value)}
                                        required
                                    />
                                    {errors.relato && <div className="form-error">{errors.relato}</div>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="evolucao">Evolução Técnica *</label>
                                    <textarea
                                        id="evolucao"
                                        className="form-input"
                                        rows={4}
                                        placeholder="Sua percepção e encaminhamentos técnicos para este caso..."
                                        value={data.evolucao}
                                        onChange={e => setData('evolucao', e.target.value)}
                                        required
                                    />
                                    {errors.evolucao && <div className="form-error">{errors.evolucao}</div>}
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Este campo ficará visível para a equipe multiprofissional.</div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="encaminhamento_realizado">Encaminhamentos Realizados (Opcional)</label>
                                        <input
                                            id="encaminhamento_realizado"
                                            type="text"
                                            className="form-input"
                                            placeholder="Ex: MP, CRAS, Defensoria..."
                                            value={data.encaminhamento_realizado}
                                            onChange={e => setData('encaminhamento_realizado', e.target.value)}
                                        />
                                        {errors.encaminhamento_realizado && <div className="form-error">{errors.encaminhamento_realizado}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="status_pos_atendimento">Sugerir Mudança de Status do Caso?</label>
                                        <select
                                            id="status_pos_atendimento"
                                            className="form-select"
                                            value={data.status_pos_atendimento}
                                            onChange={e => setData('status_pos_atendimento', e.target.value)}
                                        >
                                            <option value="">Manter status atual</option>
                                            {statusOptions.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px' }}>
                                    <button type="button" onClick={() => setShowForm(false)} className="btn btn--secondary">Cancelar</button>
                                    <button type="submit" disabled={processing} className="btn btn--primary">
                                        {processing ? 'Salvando...' : 'Registrar Atendimento'}
                                    </button>
                                </div>

                            </form>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            {caso.atendimentos && caso.atendimentos.length > 0 ? (
                                caso.atendimentos.map((atendimento: Atendimento) => (
                                    <div key={atendimento.id} style={{ display: 'flex', gap: '16px' }}>
                                        {/* Timeline Dot */}
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '24px' }}>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary-color)', flexShrink: 0, marginTop: '6px' }}></div>
                                            <div style={{ width: '2px', flex: 1, background: 'var(--border-color)', margin: '8px 0' }}></div>
                                        </div>

                                        {/* Content */}
                                        <div style={{ flex: 1, background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)', padding: '16px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                                                <div>
                                                    <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                                                        {atendimento.tipo_atendimento.toUpperCase()}
                                                    </div>
                                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                                        Por {atendimento.profissional?.nome || 'Profissional Desconhecido'} ({atendimento.profissional?.perfil || '-'})
                                                    </div>
                                                </div>
                                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                                                    {atendimento.data_atendimento_br}
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                                <div>
                                                    <strong style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Relato</strong>
                                                    <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{atendimento.relato}</p>
                                                </div>
                                                
                                                {atendimento.evolucao && (
                                                    <div>
                                                        <strong style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Evolução Técnica</strong>
                                                        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{atendimento.evolucao}</p>
                                                    </div>
                                                )}

                                                {atendimento.encaminhamento_realizado && (
                                                    <div style={{ background: '#fff', padding: '12px', borderRadius: '4px', border: '1px dashed var(--border-color)' }}>
                                                        <strong style={{ fontSize: '0.875rem', color: 'var(--primary-color)', display: 'block', marginBottom: '4px' }}>Encaminhamentos</strong>
                                                        <div style={{ fontSize: '0.875rem' }}>{atendimento.encaminhamento_realizado}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-secondary)' }}>
                                    <div style={{ fontSize: '32px', marginBottom: '16px' }}>📝</div>
                                    <p>Nenhum atendimento registrado neste caso ainda.</p>
                                    <button className="btn btn--ghost" onClick={() => setShowForm(true)}>Criar primeiro registro</button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}
