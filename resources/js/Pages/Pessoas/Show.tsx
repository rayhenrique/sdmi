import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PessoaAtendida, Caso } from '@/types';

interface Props {
    pessoa: PessoaAtendida & {
        casos: Caso[];
    };
    flash?: {
        success?: string;
        error?: string;
    };
}

const statusColors: Record<string, string> = {
    novo: 'blue',
    em_acompanhamento: 'yellow',
    encaminhado: 'purple',
    aguardando_retorno: 'orange',
    encerrado: 'green',
    arquivado: 'gray',
};

export default function Show({ pessoa, flash }: Props) {
    const handleToggleAtivo = () => {
        if (confirm(`Tem certeza que deseja ${pessoa.ativo ? 'desativar' : 'reativar'} o cadastro de ${pessoa.nome_completo}?`)) {
            router.patch(`/pessoas/${pessoa.id}/toggle`);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Detalhes: ${pessoa.nome_completo}`} />

            {flash?.success && <div className="toast toast--success">{flash.success}</div>}
            
            <div className="page-header">
                <div>
                    <Link href="/pessoas" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px', marginBottom: '8px', display: 'inline-block' }}>
                        &larr; Voltar para lista
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <h1 className="page-title">{pessoa.nome_completo}</h1>
                        {!pessoa.ativo && <span className="badge badge--red">INATIVO</span>}
                    </div>
                    <p className="page-subtitle">CPF: {pessoa.cpf || 'Não informado'} • Registrado em: {pessoa.data_registro_br}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={handleToggleAtivo} className={`btn ${pessoa.ativo ? 'btn--secondary' : 'btn--primary'}`}>
                        {pessoa.ativo ? '🚫 Desativar Cadastro' : '✅ Reativar Cadastro'}
                    </button>
                    <Link href={`/pessoas/${pessoa.id}/edit`} className="btn btn--primary">
                        ✏️ Editar Dados
                    </Link>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* Dados Principais */}
                    <div className="card">
                        <h2 className="form-section__title" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
                            Dados Sociodemográficos
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                            <div>
                                <div className="stat-card__label" style={{ marginBottom: '4px' }}>Público</div>
                                <div style={{ fontWeight: 500, textTransform: 'capitalize' }}>{pessoa.publico_atendido}</div>
                            </div>
                            <div>
                                <div className="stat-card__label" style={{ marginBottom: '4px' }}>Idade / Nascimento</div>
                                <div style={{ fontWeight: 500 }}>{pessoa.idade ? `${pessoa.idade} anos` : '-'} ({pessoa.data_nascimento_br})</div>
                            </div>
                            <div>
                                <div className="stat-card__label" style={{ marginBottom: '4px' }}>Gênero</div>
                                <div style={{ fontWeight: 500 }}>{pessoa.genero_label || '-'}</div>
                            </div>
                            <div>
                                <div className="stat-card__label" style={{ marginBottom: '4px' }}>Cor/Raça</div>
                                <div style={{ fontWeight: 500 }}>{pessoa.cor_raca_label || '-'}</div>
                            </div>
                            <div>
                                <div className="stat-card__label" style={{ marginBottom: '4px' }}>Escolaridade</div>
                                <div style={{ fontWeight: 500 }}>{pessoa.escolaridade_label || '-'}</div>
                            </div>
                            <div>
                                <div className="stat-card__label" style={{ marginBottom: '4px' }}>Estado Civil</div>
                                <div style={{ fontWeight: 500 }}>{pessoa.estado_civil_label || '-'}</div>
                            </div>
                            <div>
                                <div className="stat-card__label" style={{ marginBottom: '4px' }}>Condição de Trabalho</div>
                                <div style={{ fontWeight: 500 }}>{pessoa.condicao_trabalho_label || '-'}</div>
                            </div>
                            <div>
                                <div className="stat-card__label" style={{ marginBottom: '4px' }}>Renda Familiar</div>
                                <div style={{ fontWeight: 500 }}>{pessoa.renda_label || '-'}</div>
                            </div>
                            <div>
                                <div className="stat-card__label" style={{ marginBottom: '4px' }}>Nº de Filhos</div>
                                <div style={{ fontWeight: 500 }}>{pessoa.numero_filhos ?? '-'}</div>
                            </div>
                        </div>
                    </div>

                    {/* Histórico de Casos */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                            <h2 className="form-section__title" style={{ margin: 0, padding: 0, borderBottom: 'none' }}>
                                Casos Mapeados
                            </h2>
                            <Link href={`/casos/create?pessoa_id=${pessoa.id}`} className="btn btn--secondary btn--sm">
                                + Abrir Novo Caso
                            </Link>
                        </div>

                        {pessoa.casos.length === 0 ? (
                            <div className="empty-state" style={{ padding: '24px' }}>
                                <div className="empty-state__icon" style={{ fontSize: '2rem' }}>📂</div>
                                <div className="empty-state__text" style={{ fontSize: '0.875rem' }}>Nenhum caso aberto para esta pessoa.</div>
                            </div>
                        ) : (
                            <div className="data-table-wrapper" style={{ border: 'none' }}>
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Status</th>
                                            <th>Origem</th>
                                            <th>Abertura</th>
                                            <th>Violências</th>
                                            <th style={{ textAlign: 'right' }}>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pessoa.casos.map(caso => (
                                            <tr key={caso.id}>
                                                <td style={{ fontWeight: 500 }}>#{caso.id}</td>
                                                <td><span className={`badge badge--${statusColors[caso.status] || 'gray'}`}>{caso.status_label || caso.status}</span></td>
                                                <td>
                                                    <span className="badge badge--gray">
                                                        {caso.origem_encaminhamento_label || '-'}
                                                    </span>
                                                </td>
                                                <td>{caso.data_abertura_br}</td>
                                                <td>{caso.tipos_violencia?.length || 0}</td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <Link href={`/casos/${caso.id}`} className="btn btn--ghost btn--sm">
                                                        Abrir Prontuário →
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar com Contatos */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="card" style={{ background: 'var(--slate-50)' }}>
                        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '16px' }}>Contato</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Telefone Principal</div>
                                <div style={{ fontWeight: 500 }}>{pessoa.telefone || '-'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>WhatsApp / Recado</div>
                                <div style={{ fontWeight: 500 }}>{pessoa.whatsapp || '-'}</div>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ background: 'var(--slate-50)' }}>
                        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '16px' }}>Endereço</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Endereço Completo</div>
                                <div style={{ fontWeight: 500 }}>{pessoa.endereco || '-'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Bairro</div>
                                <div style={{ fontWeight: 500 }}>{pessoa.bairro || '-'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Cidade</div>
                                <div style={{ fontWeight: 500 }}>{pessoa.cidade || '-'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>UBS de Referência</div>
                                <div style={{ fontWeight: 500 }}>{pessoa.ubs || '-'}</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
