import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useState, useEffect } from 'react';
import { User, PerfilUsuario } from '@/types';

// SVG Icons (Premium)
const IconDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>;
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconFolder = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>;
const IconChart = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>;
const IconSettings = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconMenu = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const IconLogOut = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>;

const getMenuIcon = (label: string) => {
    switch (label) {
        case 'Painel': return <IconDashboard />;
        case 'Pessoas Atendidas': return <IconUsers />;
        case 'Casos': return <IconFolder />;
        case 'Relatórios': return <IconChart />;
        case 'Usuários': return <IconSettings />;
        default: return <IconFolder />;
    }
};

const menuItems = [
    { label: 'Painel', href: '/dashboard', roles: ['admin', 'recepcao', 'psicologo', 'advogado', 'assistente_social'] as PerfilUsuario[] },
    { label: 'Pessoas Atendidas', href: '/pessoas', roles: ['admin', 'recepcao', 'psicologo', 'advogado', 'assistente_social'] as PerfilUsuario[] },
    { label: 'Casos', href: '/casos', roles: ['admin', 'recepcao', 'psicologo', 'advogado', 'assistente_social'] as PerfilUsuario[] },
    { label: 'Relatórios', href: '/relatorios', roles: ['admin', 'psicologo', 'advogado', 'assistente_social'] as PerfilUsuario[] },
    { label: 'Usuários', href: '/usuarios', roles: ['admin'] as PerfilUsuario[] },
];

const perfilLabels: Record<string, string> = {
    admin: 'Administrador',
    recepcao: 'Recepção',
    psicologo: 'Psicólogo(a)',
    advogado: 'Advogado(a)',
    assistente_social: 'Assistente Social',
};

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
    const { auth } = usePage<{ auth: { user: User } }>().props;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    // Fechar dropdowns ao clicar fora e lidar com resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setSidebarOpen(true);
            else setSidebarOpen(false);
        };
        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const visibleItems = menuItems.filter(item => item.roles.includes(user.perfil));

    return (
        <div className="min-h-screen bg-gray-50 flex overflow-hidden font-sans text-gray-800 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-50 via-gray-50 to-white relative">
            
            {/* Abstract Background Elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-purple-200/40 rounded-full mix-blend-multiply blur-3xl animate-blob"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-pink-200/40 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-2000"></div>
            </div>

            {/* Backdrop Mobile for Sidebar */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed top-0 left-0 h-full z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-purple-100 flex flex-col transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                <div className="flex items-center justify-center h-20 px-6 border-b border-purple-50/50 relative">
                    <Link href="/dashboard" className="flex items-center justify-center group">
                        <img 
                            src="/logo-sdmi.png" 
                            alt="Secretaria da Mulher e do Idoso" 
                            className="h-10 w-auto group-hover:scale-105 transition-transform"
                        />
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden absolute right-4 text-gray-500 hover:text-purple-600">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 scrollbar-hide">
                    <p className="px-3 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-4">Navegação Principal</p>
                    {visibleItems.map((item) => {
                        const isActive = currentPath.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                                    isActive 
                                    ? 'bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5' 
                                    : 'text-gray-600 hover:bg-purple-100 hover:text-purple-900 hover:shadow-sm'
                                }`}
                            >
                                <span className={isActive ? 'text-purple-100' : 'text-purple-500'}>
                                    {getMenuIcon(item.label)}
                                </span>
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-purple-100/50 bg-white/50 backdrop-blur-md">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 border border-purple-100">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-400 text-white flex items-center justify-center font-bold shadow-inner">
                            {user.nome.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{user.nome}</p>
                            <p className="text-xs text-purple-600 truncate">{perfilLabels[user.perfil] || user.perfil}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 z-10">
                {/* Topbar */}
                <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-purple-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm relative z-20">
                    <div className="flex items-center">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-purple-100 hover:text-purple-600 transition-colors mr-4"
                        >
                            <IconMenu />
                        </button>
                        
                        {/* Pão de migalhas / Título Dinâmico (simulado com greeting) */}
                        <div className="hidden sm:block">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Olá, <span className="text-purple-700">{user.nome.split(' ')[0]}</span> 👋
                            </h2>
                            <p className="text-xs text-gray-500">Tenha um excelente dia de trabalho.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2 hover:bg-purple-50 py-1.5 px-3 rounded-full transition-colors border border-transparent hover:border-purple-200"
                            >
                                <div className="hidden sm:block text-right mr-1">
                                    <div className="text-sm font-medium text-gray-800">{user.nome.split(' ')[0]}</div>
                                </div>
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-200 to-fuchsia-200 text-purple-800 flex items-center justify-center font-bold ring-2 ring-white">
                                    {user.nome.charAt(0).toUpperCase()}
                                </div>
                            </button>

                            {/* Dropdown */}
                            {userMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)}></div>
                                    <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-purple-100 py-2 z-20 overflow-hidden text-sm animate-fade-in-up origin-top-right">
                                        <div className="px-4 py-2 border-b border-gray-100 sm:hidden">
                                            <p className="font-semibold text-gray-900 truncate">{user.nome}</p>
                                        </div>
                                        <Link 
                                            href="/profile" 
                                            className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <IconSettings /> Meu Perfil
                                        </Link>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="w-full flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors text-left"
                                        >
                                            <IconLogOut /> Sair do Sistema
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content View */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {/* Animate Content Entry */}
                    <div className="animate-fade-in-up">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
