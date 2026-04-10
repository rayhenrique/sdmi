import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Caso, SelectOption } from '@/types';
import { useState } from 'react';

interface Props {
    casos: {
        data: Caso[];
        current_page: number;
        last_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    filtros: {
        busca?: string;
        status?: string;
        origem?: string;
    };
    statusOptions: SelectOption[];
    origemOptions: SelectOption[];
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

export default function Index({ casos, filtros, statusOptions, origemOptions, flash }: Props) {
    const [busca, setBusca] = useState(filtros.busca || '');
    const [status, setStatus] = useState(filtros.status || '');
    const [origem, setOrigem] = useState(filtros.origem || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/casos', { busca, status, origem }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Gestão de Casos" />

            {flash?.success && <div className="toast toast--success">{flash.success}</div>}
            {flash?.error && <div className="toast toast--error">{flash.error}</div>}

            <div className="page-header">
                <div>
                    <h1 className="page-title">Casos Ativos</h1>
                    <p className="page-subtitle">Acompanhamento e prontuário multiprofissional</p>
                </div>
                <div>
                    <Link href="/casos/create" className="btn btn--primary">
                        + Abrir Novo Caso
                    </Link>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '24px' }}>
                <form onSubmit={handleSearch} className="filters-bar" style={{ marginBottom: 0 }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label" htmlFor="busca">Buscar Pessoa Atendida</label>
                        <input
                            id="busca"
                            type="text"
                            className="form-input"
                            placeholder="Nome..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                    <div className="form-group" style={{ width: '200px' }}>
                        <label className="form-label" htmlFor="status">Status</label>
                        <select
                            id="status"
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Todos</option>
                            {statusOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group" style={{ width: '200px' }}>
                        <label className="form-label" htmlFor="origem">Origem Enc.</label>
                        <select
                            id="origem"
                            className="form-select"
                            value={origem}
                            onChange={(e) => setOrigem(e.target.value)}
                        >
                            <option value="">Todos</option>
                            {origemOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn--secondary">
                        Filtrar
                    </button>
                    {(busca || status || origem) && (
                        <Link href="/casos" className="btn btn--ghost">
                            Limpar
                        </Link>
                    )}
                </form>
            </div>

            <div className="card" style={{ padding: 0 }}>
                {casos.data.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state__icon">📋</div>
                        <div className="empty-state__text">Nenhum caso encontrado.</div>
                        <Link href="/casos/create" className="btn btn--primary">
                            Abrir Primeiro Caso
                        </Link>
                    </div>
                ) : (
                    <div className="data-table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Pessoa Atendida</th>
                                    <th>Status</th>
                                    <th>Origem</th>
                                    <th>Data Abertura</th>
                                    <th>Último Atendimento</th>
                                    <th style={{ textAlign: 'right' }}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {casos.data.map((caso) => (
                                    <tr key={caso.id}>
                                        <td style={{ fontWeight: 500 }}>#{caso.id}</td>
                                        <td style={{ fontWeight: 500 }}>{caso.pessoa?.nome_completo || '-'}</td>
                                        <td>
                                            <span className={`badge badge--${statusColors[caso.status] || 'gray'}`}>
                                                {caso.status_label || caso.status}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="badge badge--gray">
                                                {caso.origem_encaminhamento_label || '-'}
                                            </span>
                                        </td>
                                        <td>{caso.data_abertura_br || '-'}</td>
                                        <td>{caso.atendimentos && caso.atendimentos.length > 0 ? (caso.atendimentos[0].data_atendimento_br || '-') : '-'}</td>
                                        <td style={{ textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                <Link href={`/casos/${caso.id}`} className="btn btn--ghost btn--sm">
                                                    Prontuário →
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                
                {casos.last_page > 1 && (
                    <div className="pagination">
                        <div className="pagination__info">
                            Mostrando {(casos.current_page - 1) * 15 + 1} a {Math.min(casos.current_page * 15, casos.total)} de {casos.total} registros
                        </div>
                        <div className="pagination__links">
                            {casos.links.map((link, i) => (
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`pagination__link ${link.active ? 'pagination__link--active' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={i}
                                        className="pagination__link pagination__link--disabled"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
