import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

interface Stats {
    atendimentos_mes: number;
    casos_novos: number;
    em_acompanhamento: number;
    aguardando_retorno: number;
    encerrados: number;
    total_pessoas: number;
}

interface CasoRecente {
    id: number;
    pessoa: string;
    status: string;
    status_label: string;
    data_abertura: string;
}

interface Props {
    stats: Stats;
    porProfissional: { profissional: string; perfil: string; total: number }[];
    porTipo: { tipo: string; value: string; total: number }[];
    casosRecentes: CasoRecente[];
    filtros: { inicio: string; fim: string };
}

const statusColors: Record<string, string> = {
    novo: 'blue',
    em_acompanhamento: 'yellow',
    encaminhado: 'purple',
    aguardando_retorno: 'orange',
    encerrado: 'green',
    arquivado: 'gray',
};

const tipoColors: Record<string, string> = {
    psicologico: 'violet',
    juridico: 'amber',
    social: 'emerald',
};

export default function Dashboard({ stats, porProfissional, porTipo, casosRecentes, filtros }: Props) {
    const [inicio, setInicio] = useState(filtros.inicio);
    const [fim, setFim] = useState(filtros.fim);

    const applyFilters = () => {
        router.get('/dashboard', { inicio, fim }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Painel" />

            <div className="page-header">
                <div>
                    <h1 className="page-title">Painel</h1>
                    <p className="page-subtitle">Visão geral dos atendimentos e casos</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'end' }}>
                    <div>
                        <label className="form-label">Início</label>
                        <input type="date" className="form-input" value={inicio} onChange={e => setInicio(e.target.value)} />
                    </div>
                    <div>
                        <label className="form-label">Fim</label>
                        <input type="date" className="form-input" value={fim} onChange={e => setFim(e.target.value)} />
                    </div>
                    <button className="btn btn--primary" onClick={applyFilters}>Filtrar</button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-card__label">Atendimentos no Período</div>
                    <div className="stat-card__value">{stats.atendimentos_mes}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card__label">Casos Novos</div>
                    <div className="stat-card__value" style={{ color: 'var(--status-novo)' }}>{stats.casos_novos}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card__label">Em Acompanhamento</div>
                    <div className="stat-card__value" style={{ color: 'var(--status-em_acompanhamento)' }}>{stats.em_acompanhamento}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card__label">Aguardando Retorno</div>
                    <div className="stat-card__value" style={{ color: 'var(--status-aguardando_retorno)' }}>{stats.aguardando_retorno}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card__label">Encerrados</div>
                    <div className="stat-card__value" style={{ color: 'var(--status-encerrado)' }}>{stats.encerrados}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card__label">Total de Pessoas</div>
                    <div className="stat-card__value">{stats.total_pessoas}</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                {/* Atendimentos por Tipo */}
                <div className="card">
                    <h3 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                        Atendimentos por Tipo
                    </h3>
                    {porTipo.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Sem dados no período.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {porTipo.map((item) => (
                                <div key={item.value} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span className={`badge badge--${tipoColors[item.value] || 'gray'}`} style={{ minWidth: '100px', justifyContent: 'center' }}>
                                        {item.tipo}
                                    </span>
                                    <div style={{ flex: 1, height: '8px', background: 'var(--slate-100)', borderRadius: '4px' }}>
                                        <div style={{
                                            width: `${Math.min((item.total / Math.max(...porTipo.map(t => t.total))) * 100, 100)}%`,
                                            height: '100%',
                                            background: `var(--tipo-${item.value})`,
                                            borderRadius: '4px',
                                            transition: 'width 0.3s ease',
                                        }} />
                                    </div>
                                    <span style={{ fontWeight: 700, fontSize: '1.25rem', minWidth: '40px', textAlign: 'right' }}>
                                        {item.total}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Atendimentos por Profissional */}
                <div className="card">
                    <h3 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                        Atendimentos por Profissional
                    </h3>
                    {porProfissional.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Sem dados no período.</p>
                    ) : (
                        <div className="data-table-wrapper" style={{ border: 'none' }}>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Profissional</th>
                                        <th>Perfil</th>
                                        <th style={{ textAlign: 'right' }}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {porProfissional.map((item, i) => (
                                        <tr key={i}>
                                            <td style={{ fontWeight: 500 }}>{item.profissional}</td>
                                            <td><span className="badge badge--gray">{item.perfil}</span></td>
                                            <td style={{ textAlign: 'right', fontWeight: 700 }}>{item.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Casos Recentes */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                        Últimos Casos Abertos
                    </h3>
                    <Link href="/casos" className="btn btn--ghost btn--sm">Ver todos →</Link>
                </div>
                {casosRecentes.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state__icon">📋</div>
                        <div className="empty-state__text">Nenhum caso registrado ainda.</div>
                        <Link href="/casos/create" className="btn btn--primary">Abrir Primeiro Caso</Link>
                    </div>
                ) : (
                    <div className="data-table-wrapper" style={{ border: 'none' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Pessoa</th>
                                    <th>Status</th>
                                    <th>Data Abertura</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {casosRecentes.map((caso) => (
                                    <tr key={caso.id}>
                                        <td style={{ fontWeight: 500 }}>#{caso.id}</td>
                                        <td>{caso.pessoa}</td>
                                        <td>
                                            <span className={`badge badge--${statusColors[caso.status] || 'gray'}`}>
                                                {caso.status_label}
                                            </span>
                                        </td>
                                        <td>{caso.data_abertura}</td>
                                        <td>
                                            <Link href={`/casos/${caso.id}`} className="btn btn--ghost btn--sm">
                                                Ver →
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
