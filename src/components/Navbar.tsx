import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Dumbbell, Menu, X, ShieldCheck, Instagram, ChevronRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Metodologia', href: '#metodologia' },
    { name: 'Resultados', href: '#resultados' },
    { name: 'Agendamento', href: '#agendamento' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Planos', href: '#planos' },
    { name: 'Calculadora', href: '#calculadora' },
  ];

  return (
    <>
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 text-slate-300 text-xs py-2 px-4 border-b border-cyan-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>VAGAS ABERTAS PARA A CONSULTORIA ONLINE</span>
            <span className="hidden sm:inline text-cyan-400">| Atendimento Global 🌎</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href="https://wa.me/5574999041988?text=Ol%C3%A1%20M%C3%A1rio!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20Consultoria%20Online."
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(74) 99904-1988</span>
            </a>
            <a
              href="https://instagram.com/marioczarnobai_personal"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span className="hidden md:inline">@marioczarnobai_personal</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070C16]/90 backdrop-blur-md border-b border-cyan-900/50 shadow-2xl py-3'
            : 'bg-[#070C16]/60 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg group-hover:shadow-cyan-500/50 transition-all">
              <div className="w-full h-full bg-[#070C16] rounded-[10px] flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="font-display font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                MÁRIO CZARNOBAI
                <ShieldCheck className="w-4 h-4 text-cyan-400 inline" />
              </div>
              <div className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold">
                PERSONAL TRAINER
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-cyan-950/30 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#agendamento"
              className="relative group overflow-hidden rounded-xl p-px font-semibold text-xs text-white uppercase tracking-wider"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 group-hover:opacity-90 transition-opacity"></span>
              <span className="relative flex items-center gap-2 px-4 py-2.5 rounded-[11px] bg-[#0A1322] group-hover:bg-transparent transition-colors duration-300">
                <Calendar className="w-4 h-4 text-cyan-400 group-hover:text-white" />
                <span>Agendar Consulta</span>
                <ChevronRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A1322] border-b border-cyan-900/50 px-4 pt-3 pb-6 space-y-2 mt-2 animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-cyan-950/40 rounded-lg"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <a
                href="#agendamento"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white shadow-lg text-center text-sm"
              >
                <Calendar className="w-4 h-4" />
                Agendar Avaliação
              </a>
              <a
                href="https://wa.me/5574999041988?text=Ol%C3%A1%20M%C3%A1rio!%20Quero%20falar%20no%20WhatsApp."
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-semibold text-xs text-center"
              >
                <Phone className="w-3.5 h-3.5" />
                WhatsApp: (74) 99904-1988
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
