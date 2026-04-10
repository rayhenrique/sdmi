import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User, SelectOption } from '@/types';
import { useState } from 'react';

interface Props {
    usuarios: {
        data: User[];
        current_page: number;
        last_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    filtros: {
        busca?: string;
        perfil?: string;
    };
    perfis: SelectOption[];
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function Index({ usuarios, filtros, perfis, flash }: Props) {
    const [busca, setBusca] = useState(filtros.busca || '');
    const [perfil, setPerfil] = useState(filtros.perfil || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/usuarios', { busca, perfil }, { preserveState: true });
    };

    const handleToggle = (usuario: User) => {
        if (confirm(`Deseja ${usuario.ativo ? 'desativar' : 'reativar'} o acesso de ${usuario.nome}?`)) {
            router.patch(`/usuarios/${usuario.id}/toggle`);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Gestão de Usuários" />

            {flash?.success && <div className="toast toast--success">{flash.success}</div>}
            {flash?.error && <div className="toast toast--error">{flash.error}</div>}

            <div className="page-header">
                <div>
                    <h1 className="page-title">Gestão de Usuários</h1>
                    <p className="page-subtitle">Controle de acesso da equipe e profissionais</p>
                </div>
                <div>
                    <Link href="/usuarios/create" className="btn btn--primary">
                        + Novo Usuário
                    </Link>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '24px' }}>
                <form onSubmit={handleSearch} className="filters-bar" style={{ marginBottom: 0 }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label" htmlFor="busca">Buscar</label>
                        <input
                            id="busca"
                            type="text"
                            className="form-input"
                            placeholder="Nome ou e-mail..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                    <div className="form-group" style={{ width: '200px' }}>
                        <label className="form-label" htmlFor="perfil">Perfil de Acesso</label>
                        <select
                            id="perfil"
                            className="form-select"
                            value={perfil}
                            onChange={(e) => setPerfil(e.target.value)}
                        >
                            <option value="">Todos</option>
                            {perfis.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn--secondary">Filtrar</button>
                    {(busca || perfil) && (
                        <Link href="/usuarios" className="btn btn--ghost">Limpar</Link>
                    )}
                </form>
            </div>

            <div className="card" style={{ padding: 0 }}>
                <div className="data-table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Perfil</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right' }}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.data.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td style={{ fontWeight: 500 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div className="topbar__avatar" style={{ width: '24px', height: '24px', fontSize: '10px' }}>
                                                {usuario.nome.charAt(0)}
                                            </div>
                                            {usuario.nome}
                                        </div>
                                    </td>
                                    <td>{usuario.email}</td>
                                    <td><span className="badge badge--gray">{perfis.find(p => p.value === usuario.perfil)?.label || usuario.perfil}</span></td>
                                    <td>
                                        <span className={`badge badge--${usuario.ativo ? 'green' : 'red'}`}>
                                            {usuario.ativo ? 'ATIVO' : 'INATIVO'}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <button onClick={() => handleToggle(usuario)} className="btn btn--ghost btn--sm" title={usuario.ativo ? 'Desativar' : 'Ativar'}>
                                                {usuario.ativo ? '🚫' : '✅'}
                                            </button>
                                            <Link href={`/usuarios/${usuario.id}/edit`} className="btn btn--ghost btn--sm">
                                                ✏️ Editar
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {usuarios.last_page > 1 && (
                    <div className="pagination">
                        <div className="pagination__info">
                            Mostrando {(usuarios.current_page - 1) * 15 + 1} a {Math.min(usuarios.current_page * 15, usuarios.total)}
                        </div>
                        <div className="pagination__links">
                            {usuarios.links.map((link, i) => (
                                link.url ? (
                                    <Link key={i} href={link.url} className={`pagination__link ${link.active ? 'pagination__link--active' : ''}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                                ) : (
                                    <span key={i} className="pagination__link pagination__link--disabled" dangerouslySetInnerHTML={{ __html: link.label }} />
                                )
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
