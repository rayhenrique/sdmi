import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User, SelectOption } from '@/types';
import { FormEvent } from 'react';

interface Props {
    usuario?: User;
    perfis: SelectOption[];
    flash?: {
        error?: string;
    };
}

export default function Form({ usuario, perfis, flash }: Props) {
    const isEdit = !!usuario;
    
    const { data, setData, post, put, processing, errors } = useForm({
        nome: usuario?.nome || '',
        email: usuario?.email || '',
        perfil: usuario?.perfil || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(`/usuarios/${usuario.id}`);
        } else {
            post('/usuarios');
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={isEdit ? 'Editar Usuário' : 'Novo Usuário'} />

            <div className="page-header" style={{ marginBottom: '24px' }}>
                <div>
                    <Link href="/usuarios" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px', marginBottom: '8px', display: 'inline-block' }}>
                        &larr; Voltar para Usuários
                    </Link>
                    <h1 className="page-title">{isEdit ? 'Editar Dados do Usuário' : 'Novo Usuário do Sistema'}</h1>
                    <p className="page-subtitle">Apenas administradores podem gerenciar acessos.</p>
                </div>
            </div>

            {flash?.error && <div className="toast toast--error">{flash.error}</div>}

            <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <form onSubmit={submit}>
                    
                    <div className="form-group">
                        <label className="form-label" htmlFor="nome">Nome Completo *</label>
                        <input
                            id="nome"
                            type="text"
                            className="form-input"
                            value={data.nome}
                            onChange={(e) => setData('nome', e.target.value)}
                            required
                        />
                        {errors.nome && <div className="form-error">{errors.nome}</div>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">E-mail *</label>
                        <input
                            id="email"
                            type="email"
                            className="form-input"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && <div className="form-error">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="perfil">Perfil de Acesso *</label>
                        <select
                            id="perfil"
                            className="form-select"
                            value={data.perfil}
                            onChange={(e) => setData('perfil', e.target.value)}
                            required
                        >
                            <option value="">Selecione o papel do usuário...</option>
                            {perfis.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        {errors.perfil && <div className="form-error">{errors.perfil}</div>}
                        <div style={{ fontSize: '0.75rem', marginTop: '4px', color: 'var(--text-secondary)' }}>
                            O perfil define quais páginas e ações este usuário poderá acessar.
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', margin: '24px 0', paddingTop: '24px' }}>
                        <h3 className="form-section__title" style={{ marginBottom: '16px' }}>
                            {isEdit ? 'Alterar Senha (Opcional)' : 'Senha de Acesso'}
                        </h3>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="password">Senha {!isEdit && '*'}</label>
                                <input
                                    id="password"
                                    type="password"
                                    className="form-input"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required={!isEdit}
                                />
                                {errors.password && <div className="form-error">{errors.password}</div>}
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="password_confirmation">Confirmar Senha {!isEdit && '*'}</label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    className="form-input"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required={!isEdit}
                                />
                                {errors.password_confirmation && <div className="form-error">{errors.password_confirmation}</div>}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '32px' }}>
                        <Link href="/usuarios" className="btn btn--secondary">
                            Cancelar
                        </Link>
                        <button type="submit" className="btn btn--primary" disabled={processing}>
                            {processing ? 'Salvando...' : (isEdit ? 'Salvar Alterações' : 'Criar Usuário')}
                        </button>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
