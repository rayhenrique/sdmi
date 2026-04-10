import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from 'react';

export interface SearchableOption {
    value: string | number;
    label: string;
}

interface Props {
    options: SearchableOption[];
    value: string | number;
    onChange: (val: string | number) => void;
    placeholder?: string;
    disabled?: boolean;
}

export default function SearchableSelect({ options, value, onChange, placeholder = 'Selecione ou digite para pesquisar...', disabled = false }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(o => String(o.value) === String(value));

    // Mantém o texto visual no input sincronizado com o valor real se o dropdown fechar
    useEffect(() => {
        if (!isOpen) {
            setSearch(selectedOption ? selectedOption.label : '');
        }
    }, [value, selectedOption, isOpen]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setSearch(selectedOption ? selectedOption.label : ''); // Reverte o texto para a última seleção validada ao clicar fora
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [selectedOption]);

    const filteredOptions = options.filter(o => 
        o.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
            
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    className={`form-input ${disabled ? 'disabled' : ''}`}
                    style={{ 
                        width: '100%',
                        cursor: disabled ? 'not-allowed' : 'text', 
                        opacity: disabled ? 0.7 : 1,
                        paddingRight: '36px',
                        backgroundColor: disabled ? 'var(--bg-secondary)' : 'var(--bg-white)'
                    }}
                    placeholder={placeholder}
                    value={search}
                    disabled={disabled}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => {
                        if (!disabled) {
                            setIsOpen(true);
                            // Opcional: Selecionar o texto ao clicar para facilitar digitar por cima
                            setSearch(''); 
                        }
                    }}
                />
                
                {/* Ícone de seta para baixo */}
                <svg 
                    width="20" height="20" viewBox="0 0 20 20" fill="currentColor" 
                    style={{ 
                        position: 'absolute', right: '12px', top: '50%', 
                        transform: isOpen ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)', 
                        opacity: 0.5, pointerEvents: 'none', transition: 'transform 0.2s' 
                    }}
                >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>

            {/* Menu Dropdown de Resultados (renderizado apenas se aberto e não desabilitado) */}
            {isOpen && !disabled && (
                <div style={{ 
                    position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 50, 
                    background: 'var(--bg-white, #ffffff)', border: '1px solid var(--border-color)', 
                    borderRadius: 'var(--radius)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                    maxHeight: '260px', overflowY: 'auto' 
                }}>
                    <div style={{ padding: '4px 0' }}>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map(opt => {
                                const isSelected = String(opt.value) === String(value);
                                return (
                                    <div
                                        key={opt.value}
                                        style={{
                                            padding: '10px 16px',
                                            cursor: 'pointer',
                                            background: isSelected ? 'var(--primary-color)' : 'transparent',
                                            color: isSelected ? '#ffffff' : 'var(--text-primary)',
                                            fontWeight: isSelected ? 500 : 400,
                                            transition: 'background 0.2s',
                                            fontSize: '14px'
                                        }}
                                        onMouseEnter={(e: ReactMouseEvent<HTMLDivElement>) => { 
                                            if(!isSelected) e.currentTarget.style.background = 'var(--bg-secondary, #f3f4f6)' 
                                        }}
                                        onMouseLeave={(e: ReactMouseEvent<HTMLDivElement>) => { 
                                            if(!isSelected) e.currentTarget.style.background = 'transparent' 
                                        }}
                                        onClick={() => {
                                            onChange(opt.value);
                                            setSearch(opt.label);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {opt.label}
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ padding: '16px', color: 'var(--text-secondary)', textAlign: 'center', fontStyle: 'italic', fontSize: '14px' }}>
                                Nenhuma pessoa encontrada.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
