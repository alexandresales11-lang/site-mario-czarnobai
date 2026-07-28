import React, { useState } from 'react';
import { Target, Smartphone, CheckCircle, Flame, Video, MessageCircle, BarChart3, Clock, Play, Dumbbell, ShieldCheck } from 'lucide-react';

export const Methodology: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'treino' | 'videos' | 'evolucao' | 'suporte'>('treino');

  return (
    <section id="metodologia" className="py-20 bg-[#060B14] relative overflow-hidden border-t border-cyan-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            Método Mário Czarnobai
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
            Como Funciona a <span className="text-cyan-400">Consultoria Online</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Um sistema estruturado passo a passo para garantir que você treine com a máxima intensidade e segurança, de qualquer lugar do mundo.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0D182B] to-[#09111F] border border-cyan-900/40 hover:border-cyan-500/50 transition-all relative group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 font-extrabold text-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              01
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">Anamnese Completa</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Análise do seu histórico de treino, dores, lesões, rotina de horários e equipamento disponível (academia ou casa).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0D182B] to-[#09111F] border border-cyan-900/40 hover:border-cyan-500/50 transition-all relative group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 font-extrabold text-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              02
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">Treino no Aplicativo</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Você recebe seu protocolo exclusivo no aplicativo com ordem dos exercícios, séries, repetições e tempo de descanso.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0D182B] to-[#09111F] border border-cyan-900/40 hover:border-cyan-500/50 transition-all relative group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 font-extrabold text-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              03
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">Vídeos Explicativos</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Cada movimento possui vídeo demonstrativo gravado com técnica correta para você não errar a postura ou biomecânica.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0D182B] to-[#09111F] border border-cyan-900/40 hover:border-cyan-500/50 transition-all relative group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 font-extrabold text-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              04
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">Acompanhamento WhatsApp</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Suporte direto com Mário Czarnobai. Envie vídeos executando para correção técnica e tire dúvidas a qualquer momento.
            </p>
          </div>
        </div>

        {/* Interactive App Simulator Section */}
        <div className="p-8 rounded-3xl bg-card-gradient border border-cyan-900/60 shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Description & Tabs */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Experiência do Aluno</span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white uppercase mt-1">
                  Seu Treino na Palma da Mão
                </h3>
                <p className="text-slate-300 text-sm mt-2">
                  Clique nas abas abaixo para simular a interface do aplicativo exclusivo da consultoria:
                </p>
              </div>

              {/* Tab Selector Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveTab('treino')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    activeTab === 'treino'
                      ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-lg'
                      : 'bg-[#08111E] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Dumbbell className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold uppercase">Planilha de Treino</div>
                    <div className="text-[10px] opacity-80">Ordem e repetições</div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('videos')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    activeTab === 'videos'
                      ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-lg'
                      : 'bg-[#08111E] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Video className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold uppercase">Vídeos HD</div>
                    <div className="text-[10px] opacity-80">Postura perfeita</div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('evolucao')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    activeTab === 'evolucao'
                      ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-lg'
                      : 'bg-[#08111E] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold uppercase">Gráfico de Cargas</div>
                    <div className="text-[10px] opacity-80">Evolução constante</div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('suporte')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    activeTab === 'suporte'
                      ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-lg'
                      : 'bg-[#08111E] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <MessageCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold uppercase">Suporte WhatsApp</div>
                    <div className="text-[10px] opacity-80">Contato direto com Mário</div>
                  </div>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#08101C] border border-cyan-900/30 text-xs text-slate-300 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Compatível com iOS (iPhone) e Android. Sem necessidade de instalações complexas.</span>
              </div>
            </div>

            {/* Right Interactive Phone Frame */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-sm rounded-[36px] bg-[#000000] p-3 border-4 border-slate-800 shadow-2xl relative">
                
                {/* Phone Notch */}
                <div className="w-32 h-4 bg-slate-900 rounded-b-xl mx-auto mb-2 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-slate-800"></div>
                </div>

                {/* Phone Screen Display */}
                <div className="bg-[#0A1322] rounded-[28px] p-4 text-white min-h-[380px] flex flex-col justify-between border border-cyan-900/40">
                  
                  {/* Screen Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xs">
                        MC
                      </div>
                      <div>
                        <div className="text-xs font-bold">Olá, Aluno!</div>
                        <div className="text-[10px] text-cyan-400 font-semibold">Mário Czarnobai Personal</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 font-mono">
                      Online
                    </span>
                  </div>

                  {/* Screen Body depending on activeTab */}
                  <div className="py-4 space-y-3 flex-1">
                    {activeTab === 'treino' && (
                      <div className="space-y-2 animate-fadeIn">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-cyan-400">Treino A - Peitoral e Tríceps</span>
                          <span className="text-[10px] text-slate-400">45 min</span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="p-2.5 rounded-xl bg-[#0F1C30] border border-cyan-900/50 flex items-center justify-between">
                            <div>
                              <div className="font-bold text-white">1. Supino Inclinado c/ Halteres</div>
                              <div className="text-[10px] text-slate-400">4 séries x 10-12 rep (30s desc)</div>
                            </div>
                            <span className="p-1 rounded bg-emerald-500/20 text-emerald-400">✓</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-[#0F1C30] border border-cyan-900/50 flex items-center justify-between">
                            <div>
                              <div className="font-bold text-white">2. Crossover Polia Média</div>
                              <div className="text-[10px] text-slate-400">3 séries x 12 rep (Rest-pause)</div>
                            </div>
                            <span className="p-1 rounded bg-emerald-500/20 text-emerald-400">✓</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-[#0F1C30] border border-cyan-900/50 flex items-center justify-between">
                            <div>
                              <div className="font-bold text-white">3. Tríceps Corda no Pulley</div>
                              <div className="text-[10px] text-slate-400">4 séries x 12-15 rep</div>
                            </div>
                            <span className="p-1 rounded bg-slate-800 text-slate-400">Próximo</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'videos' && (
                      <div className="space-y-2 animate-fadeIn">
                        <div className="text-xs font-bold text-cyan-400 mb-1">Vídeo Aula de Técnica</div>
                        <div className="relative h-36 rounded-xl bg-slate-900 border border-cyan-500/40 overflow-hidden flex items-center justify-center group cursor-pointer">
                          <img
                            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop"
                            alt="Demonstração"
                            className="w-full h-full object-cover opacity-60"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute w-10 h-10 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                          <span className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300">
                            0:45 min - Postura Correta
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 bg-[#0F1C30] p-2 rounded-lg border border-slate-800">
                          "Mantenha as escápulas aduzidas e os cotovelos a 45° para proteger a articulação do ombro."
                        </p>
                      </div>
                    )}

                    {activeTab === 'evolucao' && (
                      <div className="space-y-3 animate-fadeIn">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-cyan-400">Progressão de Carga</span>
                          <span className="text-[10px] text-emerald-400 font-bold">+28% em 30 dias</span>
                        </div>
                        <div className="h-28 bg-[#0F1C30] rounded-xl p-3 border border-slate-800 flex items-end justify-between gap-2">
                          <div className="w-full bg-cyan-950 rounded-t h-[30%] relative group">
                            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-slate-400">10kg</span>
                          </div>
                          <div className="w-full bg-cyan-900 rounded-t h-[50%] relative group">
                            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-slate-400">14kg</span>
                          </div>
                          <div className="w-full bg-cyan-600 rounded-t h-[75%] relative group">
                            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-cyan-300 font-bold">18kg</span>
                          </div>
                          <div className="w-full bg-gradient-to-t from-cyan-500 to-emerald-400 rounded-t h-[95%] relative group">
                            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-emerald-300 font-bold">22kg</span>
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-400 text-center">Semana 1 → Semana 4 → Semana 8 → Semana 12</div>
                      </div>
                    )}

                    {activeTab === 'suporte' && (
                      <div className="space-y-2 animate-fadeIn">
                        <div className="text-[11px] font-bold text-cyan-400 flex items-center justify-between">
                          <span>WhatsApp Direto com Mário</span>
                          <span className="text-[9px] text-emerald-400">Online Agora</span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="bg-[#0F1C30] p-2.5 rounded-xl rounded-tl-none border border-slate-800 text-slate-200">
                            Mário, assisti o vídeo do agachamento. Posso afastar um pouco mais os pés?
                          </div>
                          <div className="bg-cyan-950/80 border border-cyan-800/80 p-2.5 rounded-xl rounded-tr-none text-cyan-100 ml-4">
                            Sim, Juliana! Pode abrir na largura dos ombros com os pés levemente apontados para fora. Manda o vídeo que avalio agora! 👍
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Screen Footer Button */}
                  <a
                    href="https://wa.me/5574999041988?text=Ol%C3%A1%20M%C3%A1rio!%20Gostei%20da%20demonstra%C3%A7%C3%A3o%20do%20aplicativo%20e%20quero%20come%C3%A7ar."
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs text-white text-center hover:opacity-95 transition-opacity block uppercase"
                  >
                    Quero Treinar com Esse App
                  </a>

                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
