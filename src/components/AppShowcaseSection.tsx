import React from 'react';
import { Smartphone, Download, CheckCircle2, ShieldCheck, Dumbbell, Sparkles, Flame, MessageSquare, BarChart2 } from 'lucide-react';

interface AppShowcaseSectionProps {
  onOpenApp: () => void;
  onOpenInstallModal: () => void;
}

export const AppShowcaseSection: React.FC<AppShowcaseSectionProps> = ({ onOpenApp, onOpenInstallModal }) => {
  return (
    <section id="aplicativo" className="py-20 relative overflow-hidden bg-gradient-to-b from-[#070C16] via-[#091222] to-[#070C16]">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xs uppercase tracking-wider">
            <Smartphone className="w-4 h-4" />
            <span>Exclusivo para Alunos</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Seu Treino e Evolução na <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300">Palma da Sua Mão</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Ao entrar para a Consultoria do Mário Czarnobai, você ganha acesso exclusivo ao aplicativo móvel completo. Sem fichas em papel ou planilhas confusas.
          </p>
        </div>

        {/* Grid showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Feature Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-5 rounded-2xl bg-[#0C1629]/80 border border-slate-800 hover:border-cyan-500/40 transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Ficha de Treino Interativa</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Séries, repetições, temporizador de descanso entre séries e instruções em vídeo para cada exercício.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0C1629]/80 border border-slate-800 hover:border-cyan-500/40 transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Registro de Cargas e Evolução</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Guarde o peso de cada treino, acompanhe seu gráfico de perda de gordura e ganho de massa magra.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0C1629]/80 border border-slate-800 hover:border-cyan-500/40 transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Chat V.I.P. Direto com o Mário</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Dúvidas na hora do treino? Envie mensagem direto pelo app para ajustes imediatos.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenApp}
                className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 hover:opacity-95 transition-all"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                Testar Aplicativo do Aluno
              </button>

              <button
                onClick={onOpenInstallModal}
                className="py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" />
                Instalar no Celular
              </button>
            </div>
          </div>

          {/* Right Smartphone Frame Visual Preview */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-md bg-[#0A1222] border-4 border-slate-800 rounded-[40px] p-4 shadow-2xl shadow-cyan-950/60 overflow-hidden group">
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-slate-900 rounded-b-2xl z-20 flex items-center justify-center">
                <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
              </div>

              {/* App Screen Mockup Header */}
              <div className="pt-6 pb-4 px-4 bg-[#080F1D] rounded-t-[30px] border-b border-cyan-900/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-xs">
                    MC
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">Czarnobai App</h4>
                    <span className="text-[10px] text-emerald-400">● Conectado como Lucas</span>
                  </div>
                </div>

                <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px] flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-amber-400" /> 14 dias
                </span>
              </div>

              {/* App Screen Content Preview */}
              <div className="p-4 bg-[#060B15] space-y-3.5 text-xs">
                {/* Active Workout Card */}
                <div className="p-3.5 rounded-2xl bg-[#0E1A2E] border border-cyan-500/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-cyan-400 text-xs">Treino A • Peito & Tríceps</span>
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold">Hoje</span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2 rounded-xl bg-slate-900/90 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <p className="font-semibold text-white">Supino Inclinado c/ Halteres</p>
                          <p className="text-[10px] text-slate-400">4x 10-12 reps • 28kg</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold">Concluído</span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900/90 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border border-cyan-400/60 shrink-0"></div>
                        <div>
                          <p className="font-semibold text-white">Desenvolvimento c/ Halteres</p>
                          <p className="text-[10px] text-slate-400">4x 10 reps • 20kg</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-cyan-400 font-bold">Próximo</span>
                    </div>
                  </div>
                </div>

                {/* Progress Mini Widget */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-[#0E1A2E] border border-slate-800">
                    <span className="text-[10px] text-slate-400">Água Hoje</span>
                    <p className="font-bold text-blue-400 text-sm mt-0.5">2.000 / 3.000ml</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0E1A2E] border border-slate-800">
                    <span className="text-[10px] text-slate-400">Evolução Peso</span>
                    <p className="font-bold text-emerald-400 text-sm mt-0.5">-8.8 kg eliminados</p>
                  </div>
                </div>

                {/* CTA overlay button */}
                <button
                  onClick={onOpenApp}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-4 h-4 fill-black" />
                  Clique Aqui Para Abrir a Área do Aluno Completa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
