import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PessoaAtendida, SelectOption } from '@/types';
import { useState } from 'react';

interface Props {
    pessoas: {
        data: PessoaAtendida[];
        current_page: number;
        last_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    filtros: {
        busca?: string;
        publico?: string;
        ativo?: boolean | string;
    };
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function Index({ pessoas, filtros, flash }: Props) {
    const [busca, setBusca] = useState(filtros.busca || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/pessoas', { busca }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Pessoas Atendidas" />

            {flash?.success && (
                <div className="toast toast--success">
                    {flash.success}
                </div>
            )}
            
            {flash?.error && (
                <div className="toast toast--error">
                    {flash.error}
                </div>
            )}

            <div className="page-header">
                <div>
                    <h1 className="page-title">Pessoas Atendidas</h1>
                    <p className="page-subtitle">Gestão de cadastro único de mulheres e idosos</p>
                </div>
                <div>
                    <Link href="/pessoas/create" className="btn btn--primary">
                        + Novo Cadastro
                    </Link>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '24px' }}>
                <form onSubmit={handleSearch} className="filters-bar" style={{ marginBottom: 0 }}>
                    <div className="form-group" style={{ flex: 1, minWidth: '300px' }}>
                        <label className="form-label" htmlFor="busca">Buscar</label>
                        <input
                            id="busca"
                            type="text"
                            className="form-input"
                            placeholder="Nome, CPF ou Telefone..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn--secondary">
                        Pesquisar
                    </button>
                    {busca && (
                        <Link href="/pessoas" className="btn btn--ghost">
                            Limpar
                        </Link>
                    )}
                </form>
            </div>

            <div className="card" style={{ padding: 0 }}>
                {pessoas.data.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state__icon">👤</div>
                        <div className="empty-state__text">Nenhuma pessoa encontrada.</div>
                        <Link href="/pessoas/create" className="btn btn--primary">
                            Cadastrar Primeira Pessoa
                        </Link>
                    </div>
                ) : (
                    <div className="data-table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Nome Completo</th>
                                    <th>CPF</th>
                                    <th>Público</th>
                                    <th>Telefone</th>
                                    <th>Casos</th>
                                    <th>Idade</th>
                                    <th style={{ textAlign: 'right' }}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pessoas.data.map((pessoa) => (
                                    <tr key={pessoa.id}>
                                        <td style={{ fontWeight: 500 }}>
                                            {!pessoa.ativo && <span title="Cadastro Inativo" style={{ marginRight: '8px', opacity: 0.5 }}>🚫</span>}
                                            {pessoa.nome_completo}
                                        </td>
                                        <td>{pessoa.cpf || '-'}</td>
                                        <td>
                                            <span className={`badge badge--${pessoa.publico_atendido === 'mulher' ? 'purple' : pessoa.publico_atendido === 'idoso' ? 'blue' : 'emerald'}`}>
                                                {pessoa.publico_atendido.charAt(0).toUpperCase() + pessoa.publico_atendido.slice(1)}
                                            </span>
                                        </td>
                                        <td>{pessoa.telefone}</td>
                                        <td>
                                            <span className="badge badge--gray">{pessoa.casos_count || 0}</span>
                                        </td>
                                        <td>{pessoa.idade ? `${pessoa.idade} anos` : '-'}</td>
                                        <td style={{ textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                <Link href={`/pessoas/${pessoa.id}`} className="btn btn--ghost btn--sm">
                                                    Ver Detalhes →
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                
                {pessoas.last_page > 1 && (
                    <div className="pagination">
                        <div className="pagination__info">
                            Mostrando {(pessoas.current_page - 1) * 15 + 1} a {Math.min(pessoas.current_page * 15, pessoas.total)} de {pessoas.total} registros
                        </div>
                        <div className="pagination__links">
                            {pessoas.links.map((link, i) => (
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
