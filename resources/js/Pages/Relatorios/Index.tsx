import { Head, router, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

interface ChartItem {
    name: string;
    total: number;
}

interface QualitativoItem {
    id: number;
    data_atendimento_br: string;
    profissional: string;
    tipo_atendimento: string;
    caso_id: number;
    pessoa_nome: string;
    relato: string;
    evolucao: string;
    encaminhamento: string;
}
interface QualitativoPagination {
    data: QualitativoItem[];
    current_page: number;
    from: number;
    last_page: number;
    links: { url: string | null; label: string; active: boolean }[];
    to: number;
    total: number;
}

interface Props {
    filtros: {
        inicio: string;
        fim: string;
    };
    totais: {
        casos: number;
        atendimentos: number;
        medidas_protetivas: number;
        iml: number;
    };
    charts: {
        status: ChartItem[];
        origem: ChartItem[];
        violencia: ChartItem[];
        bairro: ChartItem[];
        raca: ChartItem[];
        atendimento_tipo: ChartItem[];
        atendimento_profissional: ChartItem[];
    };
    qualitativo: QualitativoPagination;
    flash?: {
        error?: string;
        success?: string;
    };
}

const tipoColors: Record<string, string> = {
    PSICOLÓGICO: 'violet',
    JURÍDICO: 'amber',
    SOCIAL: 'emerald',
};

export default function Index({ filtros, totais, charts, qualitativo, flash }: Props) {
    let initialTab: 'quantitativo' | 'qualitativo' = 'quantitativo';
    if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        initialTab = params.get('tab') === 'qualitativo' ? 'qualitativo' : 'quantitativo';
    }
    
    const [inicio, setInicio] = useState(filtros.inicio);
    const [fim, setFim] = useState(filtros.fim);
    const [activeTab, setActiveTab] = useState<'quantitativo' | 'qualitativo'>(initialTab);

    const applyFilters = () => {
        router.get('/relatorios', { inicio, fim, tab: activeTab }, { preserveState: true });
    };

    const handleExport = (tipo: 'casos' | 'atendimentos') => {
        window.location.href = `/relatorios/exportar?tipo=${tipo}&inicio=${inicio}&fim=${fim}`;
    };

    const renderChart = (data: ChartItem[], colorVar: string = '--primary-color') => {
        if (!data || data.length === 0) return <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Sem dados.</p>;
        
        const max = Math.max(...data.map(d => d.total));
        
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.875rem' }}>
                        <div style={{ width: '120px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={item.name}>
                            {item.name}
                        </div>
                        <div style={{ flex: 1, height: '8px', background: 'var(--slate-100)', borderRadius: '4px' }}>
                            <div style={{
                                width: `${Math.min((item.total / max) * 100, 100)}%`,
                                height: '100%',
                                background: `var(${colorVar})`,
                                borderRadius: '4px',
                            }} />
                        </div>
                        <div style={{ fontWeight: 600, width: '40px', textAlign: 'right' }}>
                            {item.total}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Relatórios Gerenciais" />

            <div className="page-header" style={{ marginBottom: '24px' }}>
                <div>
                    <h1 className="page-title">Relatórios Gerenciais</h1>
                    <p className="page-subtitle">Consolidação de dados quantitativos e qualitativos estruturados.</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
                    <div>
                        <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>Data Início</label>
                        <input type="date" className="form-input" style={{ width: '140px' }} value={inicio} onChange={e => setInicio(e.target.value)} />
                    </div>
                    <div>
                        <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>Data Fim</label>
                        <input type="date" className="form-input" style={{ width: '140px' }} value={fim} onChange={e => setFim(e.target.value)} />
                    </div>
                    <button className="btn btn--primary" onClick={applyFilters}>Filtrar Período</button>
                    
                    {/* Botões de Exportação */}
                    <div style={{ borderLeft: '1px solid var(--border-color)', margin: '0 8px', height: '38px' }}></div>
                    <button className="btn btn--secondary" onClick={() => handleExport('casos')} title="Exportar Casos para CSV">⬇️ Casos</button>
                    <button className="btn btn--secondary" onClick={() => handleExport('atendimentos')} title="Exportar Atendimentos para CSV">⬇️ Prontuários</button>
                </div>
            </div>

            {flash?.error && <div className="toast toast--error" style={{ marginBottom: '24px' }}>{flash.error}</div>}

            {/* Menu Tabs */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid var(--border-color)', marginBottom: '24px' }}>
                <button 
                    onClick={() => setActiveTab('quantitativo')}
                    style={{ 
                        padding: '12px 24px', 
                        background: 'none', 
                        border: 'none', 
                        fontWeight: 600,
                        color: activeTab === 'quantitativo' ? 'var(--primary-color)' : 'var(--text-secondary)',
                        borderBottom: activeTab === 'quantitativo' ? '3px solid var(--primary-color)' : '3px solid transparent',
                        marginBottom: '-2px',
                        cursor: 'pointer'
                    }}
                >
                    📊 Panorama Quantitativo
                </button>
                <button 
                    onClick={() => setActiveTab('qualitativo')}
                    style={{ 
                        padding: '12px 24px', 
                        background: 'none', 
                        border: 'none', 
                        fontWeight: 600,
                        color: activeTab === 'qualitativo' ? 'var(--primary-color)' : 'var(--text-secondary)',
                        borderBottom: activeTab === 'qualitativo' ? '3px solid var(--primary-color)' : '3px solid transparent',
                        marginBottom: '-2px',
                        cursor: 'pointer'
                    }}
                >
                    📝 Relatório Qualitativo (Híbrido)
                </button>
            </div>

            {/* CONTEÚDO: QUANTITATIVO */}
            {activeTab === 'quantitativo' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* Totais Gerais */}
                    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                        <div className="stat-card">
                            <div className="stat-card__label">Total de Casos Abertos</div>
                            <div className="stat-card__value" style={{ color: 'var(--primary-color)' }}>{totais.casos}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card__label">Total de Atendimentos</div>
                            <div className="stat-card__value" style={{ color: 'var(--success-color)' }}>{totais.atendimentos}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card__label">Casos com Medida Protetiva</div>
                            <div className="stat-card__value" style={{ color: 'var(--status-encaminhado)' }}>{totais.medidas_protetivas}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card__label">Encaminhados p/ IML</div>
                            <div className="stat-card__value" style={{ color: 'var(--status-aguardando_retorno)' }}>{totais.iml}</div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                        {/* Produção dos Profissionais */}
                        <div className="card">
                            <h3 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Atendimentos por Profissional</h3>
                            {renderChart(charts.atendimento_profissional, '--status-em_acompanhamento')}
                        </div>

                        {/* Atendimentos por Área */}
                        <div className="card">
                            <h3 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Tipos de Atendimento</h3>
                            {renderChart(charts.atendimento_tipo, '--status-encerrado')}
                        </div>

                        {/* Casos por Status */}
                        <div className="card">
                            <h3 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Casos por Status Atual</h3>
                            {renderChart(charts.status, '--primary-color')}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                        {/* Violências */}
                        <div className="card">
                            <h3 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Tipos de Violência Mapeadas</h3>
                            {renderChart(charts.violencia, '--status-novo')}
                        </div>

                        {/* Origem */}
                        <div className="card">
                            <h3 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Origem do Encaminhamento</h3>
                            {renderChart(charts.origem, '--status-encaminhado')}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                        {/* Bairros */}
                        <div className="card">
                            <h3 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Distribuição por Bairro</h3>
                            {renderChart(charts.bairro, '--status-aguardando_retorno')}
                        </div>

                        {/* Cor e Raça */}
                        <div className="card">
                            <h3 style={{ fontWeight: 600, marginBottom: '16px', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Distribuição por Cor/Raça</h3>
                            {renderChart(charts.raca, '--slate-500')}
                        </div>
                    </div>
                </div>
            )}

            {/* CONTEÚDO: QUALITATIVO (HÍBRIDO) */}
            {activeTab === 'qualitativo' && (
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontWeight: 600, margin: 0, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                            Relatório Narrativo Consolidado ({qualitativo.total} registros)
                        </h3>
                    </div>

                    {qualitativo.data.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state__icon">📄</div>
                            <div className="empty-state__text">Nenhum atendimento registrado no período filtrado.</div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {qualitativo.data.map((item) => (
                                <div key={item.id} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius)', padding: '16px', background: 'var(--bg-secondary)' }}>
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '12px' }}>
                                        <div>
                                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                                Pessoa Atendida: <Link href={`/casos/${item.caso_id}`} style={{ color: 'var(--primary-color)' }}>{item.pessoa_nome}</Link>
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                                Atendimento #{item.id} vinculado ao Caso #{item.caso_id}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                                                <span className={`badge badge--${tipoColors[item.tipo_atendimento] || 'gray'}`}>
                                                    {item.tipo_atendimento}
                                                </span>
                                                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{item.data_atendimento_br}</span>
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                                Por {item.profissional}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                        <div>
                                            <strong style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Relato</strong>
                                            <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.5, whiteSpace: 'pre-wrap', color: 'var(--text-primary)' }}>{item.relato}</p>
                                        </div>
                                        <div>
                                            {item.evolucao && (
                                                <div style={{ marginBottom: '12px' }}>
                                                    <strong style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--status-encerrado)', display: 'block', marginBottom: '4px' }}>Evolução</strong>
                                                    <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.5, whiteSpace: 'pre-wrap', color: 'var(--text-primary)' }}>{item.evolucao}</p>
                                                </div>
                                            )}
                                            {item.encaminhamento && (
                                                <div style={{ background: '#fff', padding: '8px', borderRadius: '4px', border: '1px dashed var(--border-color)' }}>
                                                    <strong style={{ fontSize: '0.75rem', color: 'var(--primary-color)', display: 'block', marginBottom: '4px' }}>Encaminhamentos Relatados</strong>
                                                    <div style={{ fontSize: '0.875rem' }}>{item.encaminhamento}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                </div>
                            ))}

                            <div className="pagination">
                                <div className="pagination__info">
                                    Mostrando {qualitativo.from} a {qualitativo.to} de {qualitativo.total} resultados
                                </div>
                                <div className="pagination__links">
                                    {qualitativo.links.map((link, i) => (
                                        link.url ? (
                                            <Link
                                                key={i}
                                                // Append tab state so clicking page 2 keeps the qualitativo tab open
                                                href={`${link.url}&tab=qualitativo`} 
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
                        </div>
                    )}
                </div>
            )}

        </AuthenticatedLayout>
    );
}
