import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';

// SVG Icon Helper
const IconShield = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword?: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50 text-gray-800 font-sans selection:bg-purple-200">
            <Head title="Acesso ao Sistema — Secretaria da Mulher" />

            {/* Background elements to match Landing Page */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100 via-white to-purple-50"></div>
            
            {/* Abstract Decorative Shapes */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] opacity-30 pointer-events-none z-0">
                <div className="absolute top-[-100px] left-[-200px] w-96 h-96 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-[-100px] right-[-200px] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="w-full max-w-md z-10">
                {/* Cabeçalho do Card */}
                <div className="text-center mb-8">
                    <img 
                        src="/logo-sdmi2.png" 
                        alt="Secretaria da Mulher e do Idoso" 
                        className="mx-auto w-20 h-20 mb-4 transform hover:scale-105 transition-transform duration-300"
                    />
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Acesso ao Sistema
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Secretaria Municipal da Mulher e do Idoso
                    </p>
                </div>

                {/* Card Neumórfico/Glassmorphic */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-100 p-8">
                    
                    {status && (
                        <div className="mb-4 bg-green-50 text-green-700 p-4 rounded-xl text-sm font-medium border border-green-200">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        {/* E-mail */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                E-mail Institucional
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors bg-white/50 backdrop-blur-sm"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="seu@email.com"
                                autoComplete="email"
                                autoFocus
                            />
                            {errors.email && <div className="mt-2 text-sm text-red-600">{errors.email}</div>}
                        </div>

                        {/* Senha */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                                Senha de Acesso
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors bg-white/50 backdrop-blur-sm"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                autoComplete="current-password"
                            />
                            {errors.password && <div className="mt-2 text-sm text-red-600">{errors.password}</div>}
                        </div>

                        {/* Lembrar e Esqueci a Senha */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded cursor-pointer"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                                    Lembrar meu acesso
                                </label>
                            </div>

                            {canResetPassword && (
                                <Link 
                                    href={route('password.request')} 
                                    className="text-sm font-medium text-purple-600 hover:text-purple-500 transition-colors"
                                >
                                    Esqueceu a senha?
                                </Link>
                            )}
                        </div>

                        {/* Botão de Enviar */}
                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 ${processing ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'}`}
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Entrando...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <IconShield /> Acessar Sistema
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Link de Voltar */}
                <div className="text-center mt-8">
                    <Link 
                        href="/" 
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors inline-flex items-center gap-1 group"
                    >
                        <svg className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Voltar ao portal institucional
                    </Link>
                </div>
            </div>
        </div>
    );
}
