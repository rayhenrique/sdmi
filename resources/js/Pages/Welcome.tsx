import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

// SVG Icons (Substituindo dependência externa)
const IconPhone = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const IconMapPin = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const IconHeartHandshake = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 9.2a2.71 2.71 0 0 0-1.4 1.3L4.93 16"/><path d="m11 13 1.3 6"/></svg>;
const IconScale = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>;
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconChevronDown = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>;
const IconLogin = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>;
const IconDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>;
const IconShield = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconInfo = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
const IconMenu = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>;

export default function Welcome({ auth }: PageProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    // Efeito para background do header
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper para animação de fade-up (Baseada nas classes utilitárias que injetaremos no CSS ou via tailwind arbritrary params)
    const fadeUpClass = "transition-all duration-700 ease-out transform translate-y-8 opacity-0 hover:-translate-y-2";
    // Observe intersections for animations
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('translate-y-8', 'opacity-0');
                    entry.target.classList.add('translate-y-0', 'opacity-100');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-purple-200">
            <Head title="Secretaria Municipal da Mulher e do Idoso em Teotônio Vilela - AL" />

            {/* HEADER FIXO */}
            <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    
                    {/* Logo SDMI */}
                    <Link href="/" className="flex items-center group">
                        <img 
                            src="/logo-sdmi.png" 
                            alt="Secretaria da Mulher e do Idoso" 
                            className="h-12 w-auto group-hover:scale-105 transition-transform"
                        />
                    </Link>

                    {/* Nav Desktop */}
                    <nav className="hidden md:flex items-center gap-8 font-medium">
                        <a href="#servicos" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                            <IconHeartHandshake /> Serviços
                        </a>
                        <a href="#fluxo" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                            <IconInfo /> Como Funciona
                        </a>
                        <a href="#contato" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                            <IconMapPin /> Contato
                        </a>
                        
                        <div className="w-px h-6 bg-gray-300"></div>

                        {auth.user ? (
                            <Link href={route('dashboard')} className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                <IconDashboard />
                                Painel Interno
                            </Link>
                        ) : (
                            <Link href={route('login')} className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all border border-gray-200">
                                <IconLogin />
                                Acesso Restrito
                            </Link>
                        )}
                    </nav>

                    {/* Hambúrguer Mobile */}
                    <button className="md:hidden p-2 text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <IconMenu />
                    </button>
                </div>
            </header>

            {/* NAV MOBILE (Dropdown) */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed top-[70px] left-0 w-full bg-white shadow-xl z-40 border-t border-gray-100 animate-in slide-in-from-top-4 duration-300">
                    <div className="flex flex-col px-6 py-4 gap-4">
                        <a href="#servicos" className="flex items-center gap-3 py-2 text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>
                            <IconHeartHandshake /> Serviços
                        </a>
                        <a href="#fluxo" className="flex items-center gap-3 py-2 text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>
                            <IconInfo /> Como Funciona
                        </a>
                        <a href="#contato" className="flex items-center gap-3 py-2 text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>
                            <IconMapPin /> Contato
                        </a>
                        <div className="w-full h-px bg-gray-200 my-2"></div>
                        {auth.user ? (
                            <Link href={route('dashboard')} className="flex items-center gap-3 py-2 text-purple-600 font-bold">
                                <IconDashboard /> Painel Interno
                            </Link>
                        ) : (
                            <Link href={route('login')} className="flex items-center gap-3 py-2 text-gray-700 font-medium">
                                <IconLogin /> Acesso Restrito
                            </Link>
                        )}
                    </div>
                </div>
            )}

            <main>
                {/* HERO SECTION */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute top-40 left-0 -ml-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
                            <div className="lg:col-span-6 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-6">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                    </span>
                                    Atendimento Especializado
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-[1.1]">
                                    Acolhendo Mulheres, <br className="hidden sm:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                                        Protegendo Vidas.
                                    </span>
                                </h1>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                                    Nossa secretaria atua para garantir os direitos, a proteção e a dignidade das
                                    mulheres e idosos no município. Se você precisa de ajuda, nossa equipe multiprofissional
                                    está pronta para acolher.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href="#contato" className="flex justify-center items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-200 hover:shadow-xl hover:-translate-y-1">
                                        <IconPhone />
                                        Falar Agora (Ligue 180)
                                    </a>
                                    <a href="#servicos" className="flex justify-center items-center gap-2 px-8 py-4 bg-white text-gray-800 font-bold rounded-xl border-2 border-gray-100 hover:border-purple-200 hover:bg-gray-50 transition-all">
                                        Conhecer as Ações
                                    </a>
                                </div>
                            </div>
                            
                            <div className="lg:col-span-6 mt-16 lg:mt-0 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200 ease-out hidden md:block">
                                <div className="relative rounded-2xl bg-white p-2 shadow-2xl shadow-purple-100 border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                                    <div className="absolute -left-4 -top-4 w-20 h-20 bg-pink-100 rounded-full mix-blend-multiply blur-xl"></div>
                                    <img 
                                        src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                                        alt="Acolhimento humanizado" 
                                        className="rounded-xl object-cover w-full h-[400px] grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                                    />
                                    {/* Card Flutuante */}
                                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-bounce-slow">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                            <IconShield />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-semibold">Atendimento</p>
                                            <p className="text-lg font-bold text-gray-900">Totalmente Sigiloso</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SERVIÇOS OFERECIDOS */}
                <section id="servicos" className="py-24 bg-white relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
                            <h2 className="text-purple-600 font-semibold tracking-wide uppercase text-sm mb-3">Rede de Apoio</h2>
                            <h3 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">Como podemos te ajudar hoje?</h3>
                            <p className="text-gray-500 text-lg">
                                Dispomos de uma equipe de especialistas dedicados a oferecer a orientação correta para cada etapa do seu caminho.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <CardServico 
                                delay="0"
                                icon={<IconHeartHandshake />} 
                                color="text-pink-600" bg="bg-pink-100" hover="hover:shadow-pink-100 hover:border-pink-200"
                                titulo="Apoio Psicológico" 
                                texto="Acolhimento focado no bem-estar emocional, oferecendo escuta ativa e direcionamento profissional gratuito." 
                            />
                            <CardServico 
                                delay="100"
                                icon={<IconScale />} 
                                color="text-amber-600" bg="bg-amber-100" hover="hover:shadow-amber-100 hover:border-amber-200"
                                titulo="Orientação Jurídica" 
                                texto="Orientação estruturada sobre direitos, divórcio, pensão e como proceder judicialmente via MP ou Defensoria." 
                            />
                            <CardServico 
                                delay="200"
                                icon={<IconUsers />} 
                                color="text-emerald-600" bg="bg-emerald-100" hover="hover:shadow-emerald-100 hover:border-emerald-200"
                                titulo="Assistência Social" 
                                texto="Mapeamento de vulnerabilidade econômica, encaminhamento para programas sociais e garantia de benefícios vitais." 
                            />
                        </div>
                    </div>
                </section>

                {/* FLUXO DE ATENDIMENTO */}
                <section id="fluxo" className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                            
                            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Nossa jornada de mãos dadas com você</h2>
                                <p className="text-lg text-gray-600 mb-8">
                                    Não precisa ter medo ou incerteza. Simplificamos o processo para que você saiba exatamente o que esperar ao procurar a Secretaria.
                                </p>

                                <div className="space-y-8">
                                    <EtapaFluxo num="1" title="1. Recepção Incial Sigilosa">Você será atendida por profissionais treinados para ouvir sem julgamentos em local privado.</EtapaFluxo>
                                    <EtapaFluxo num="2" title="2. Mapeamento Multiprofissional">Identificamos o seu risco físico/emocional e acionamos a Assistente Social.</EtapaFluxo>
                                    <EtapaFluxo num="3" title="3. Acolhimento Especializado">Encaminhamento para a psicóloga ou assessoria jurídica, de acordo com a urgência.</EtapaFluxo>
                                    <EtapaFluxo num="4" title="4. Acompanhamento Contínuo">Mesmo após o primeiro contato, monitoramos o seu caso via chamadas ou retornos.</EtapaFluxo>
                                </div>
                            </div>

                            <div className="mt-16 lg:mt-0 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200 ease-out hidden lg:block">
                                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                                    <div className="w-full h-80 bg-purple-50 rounded-2xl flex items-center justify-center p-8">
                                        <svg className="w-full h-full text-purple-200" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                    </div>
                                    <h4 className="font-bold text-center mt-6 text-gray-900 text-lg">Você não está sozinha.</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
                            <h2 className="text-3xl font-extrabold text-gray-900">Perguntas Frequentes</h2>
                            <p className="mt-4 text-gray-500 text-lg">Dúvidas comuns que recebemos sobre o acesso ao nosso espaço.</p>
                        </div>
                        <div className="space-y-4 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 ease-out">
                            <FaqItem index={0} active={activeFaq} setActive={setActiveFaq} pergunta="Quem pode procurar atendimento na Secretaria?">
                                Qualquer mulher que seja vítima de violência física, patrimonial, sexual, moral ou psicológica, assim como idosos em situação de abandono ou vulnerabilidade na região municipal. O serviço é totalmente gratuito.
                            </FaqItem>
                            <FaqItem index={1} active={activeFaq} setActive={setActiveFaq} pergunta="Eu preciso de Boletim de Ocorrência (BO) para ser atendida?">
                                Não. O BO não é obrigatório para ser recebida na secretaria. Nossa equipe avaliará seu cenário e a orientará, inclusive, caso decida ir a uma delegacia posteriormente.
                            </FaqItem>
                            <FaqItem index={2} active={activeFaq} setActive={setActiveFaq} pergunta="Alguém vai ficar sabendo que procurei ajuda?">
                                Não. Todo o fluxo é gerido por um Sistema Interno Computadorizado Criptografado (SecMulher) e o sigilo das informações e relatos é amparado por lei e pelo código de ética dos nossos profissionais.
                            </FaqItem>
                        </div>
                    </div>
                </section>

                {/* CONTATO E CTA FINAL */}
                <section id="contato" className="py-20 bg-purple-900 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-purple-900 to-purple-900"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
                        <div className="flex justify-center"><IconShield /></div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 mt-6">Garantir proteção é o primeiro passo.</h2>
                        <p className="text-purple-200 text-lg mb-10 max-w-2xl mx-auto">
                            O silêncio protege apenas a violência. Estamos de portas e braços abertos para te ajudar a redesenhar seu amanhã com dignidade.
                        </p>
                        
                        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
                            <div className="bg-white/10 backdrop-blur-md px-8 py-6 rounded-2xl w-full max-w-sm border border-white/20 text-center">
                                <div className="flex justify-center"><IconPhone /></div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300 mt-4">Plantão Policial Nacional</h3>
                                <p className="text-4xl font-black mt-2">Ligue 180</p>
                                <p className="text-sm text-purple-200 mt-2">Disponível 24h, anônimo</p>
                            </div>
                            
                            <div className="bg-white/10 backdrop-blur-md px-8 py-6 rounded-2xl w-full max-w-sm border border-white/20 text-center">
                                <div className="flex justify-center"><IconMapPin /></div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300 mt-4">Atendimento Presencial</h3>
                                <p className="text-xl font-bold mt-2 leading-tight">Secretaria Municipal</p>
                                <p className="text-sm text-purple-200 mt-2">Segunda a Sexta, 08h às 17h</p>
                            </div>
                        </div>

                    </div>
                </section>

            </main>

            {/* FOOTER */}
            <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center">
                        <img 
                            src="/logo-sdmi.png" 
                            alt="Secretaria da Mulher e do Idoso" 
                            className="h-12 w-auto"
                        />
                    </div>
                    
                    <div className="text-sm text-center">
                        Desenvolvido por{' '}
                        <a 
                            href="https://kltecnologia.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                        >
                            KL Tecnologia
                        </a>
                        <br />
                        &copy; {new Date().getFullYear()} Todos os direitos reservados.
                    </div>
                    
                    <div>
                        <Link 
                            href={route('login')} 
                            className="px-6 py-2.5 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-500 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2"
                        >
                            <IconLogin />
                            Área Restrita
                        </Link>
                    </div>
                </div>
            </footer>

            {/* CSS Global Inject para Animações e custom utilities */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob { animation: blob 7s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animate-bounce-slow { animation: bounce 3s infinite; }
                
                @keyframes bounce {
                    0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
                    50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
                }
            `}} />
        </div>
    );
}

// Sub-Componentes UI
function CardServico({ icon, color, bg, hover, titulo, texto, delay }: any) {
    return (
        <div className={`p-8 bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100 hover:-translate-y-2 transition-all duration-300 ${hover} animate-on-scroll opacity-0 translate-y-8 ease-out`} style={{ transitionDelay: `${delay}ms`}}>
            <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center mb-6`}>
                {icon}
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">{titulo}</h4>
            <p className="text-gray-600 leading-relaxed">{texto}</p>
        </div>
    );
}

function EtapaFluxo({ num, title, children }: any) {
    return (
        <div className="flex gap-6 group">
            <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    {num}
                </div>
                <div className="w-0.5 h-full bg-gray-200 mt-2 group-hover:bg-purple-200 transition-colors"></div>
            </div>
            <div className="pb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
                <p className="text-gray-600">{children}</p>
            </div>
        </div>
    );
}

function FaqItem({ index, active, setActive, pergunta, children }: any) {
    const isOpen = active === index;
    return (
        <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
            <button 
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                onClick={() => setActive(isOpen ? null : index)}
            >
                <span className="font-bold text-gray-900 text-lg pr-8">{pergunta}</span>
                <span className={`transform transition-transform duration-300 text-purple-600 ${isOpen ? 'rotate-180' : ''}`}>
                    <IconChevronDown />
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6 px-6' : 'max-h-0 opacity-0 px-6'}`}>
                <p className="text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                    {children}
                </p>
            </div>
        </div>
    );
}
