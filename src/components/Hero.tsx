import React from 'react';
import { Phone, Calendar, Target, Smartphone, TrendingUp, Clock, CheckCircle2, ShieldAlert, Award, Star } from 'lucide-react';
import { HERO_IMAGE_PATH } from '../data/mockData';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-8 pb-16 overflow-hidden bg-radial-gradient">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute -bottom-10 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call-to-Actions */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 backdrop-blur-md max-w-full">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0"></span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-cyan-300 break-words leading-tight">
                CONSULTORIA ONLINE PERSONAL TRAINER
              </span>
            </div>

            {/* Main Title & Slogan */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight uppercase leading-[1.1] break-words">
                Estratégia. Treino.{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
                  Resultado.
                </span>
              </h1>
              <div className="text-2xl sm:text-4xl font-script text-cyan-300 transform -rotate-2 origin-left pl-1 sm:pl-2 font-bold break-words">
                De onde você estiver! ✨
              </div>
            </div>

            {/* Subtitle description */}
            <p className="text-slate-300 text-sm sm:text-lg max-w-2xl leading-relaxed font-normal">
              Chega de treinar sem direção e perder tempo com métodos genéricos. Com a <strong className="text-white">Minha Consultoria Online</strong>, você recebe um acompanhamento 100% individualizado, focado nos seus objetivos e na sua evolução constante.
            </p>

            {/* Core Feature Badges (Matching Flyer directly) */}
            <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
              <div className="flex items-start gap-3 p-2.5 sm:p-3 rounded-xl bg-[#0F1A2E]/80 border border-cyan-900/40 hover:border-cyan-500/40 transition-colors">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Treinos Personalizados</h3>
                  <p className="text-xs text-slate-400">Planejamento 100% individual para seu objetivo</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 sm:p-3 rounded-xl bg-[#0F1A2E]/80 border border-cyan-900/40 hover:border-cyan-500/40 transition-colors">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                  <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Acompanhamento Online</h3>
                  <p className="text-xs text-slate-400">Suporte e ajustes constantes no seu app</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 sm:p-3 rounded-xl bg-[#0F1A2E]/80 border border-cyan-900/40 hover:border-cyan-500/40 transition-colors">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Resultados Reais</h3>
                  <p className="text-xs text-slate-400">Mais performance, saúde e confiança total</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 sm:p-3 rounded-xl bg-[#0F1A2E]/80 border border-cyan-900/40 hover:border-cyan-500/40 transition-colors">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Flexibilidade Total</h3>
                  <p className="text-xs text-slate-400">Treine no seu tempo, com orientação pro</p>
                </div>
              </div>
            </div>

            {/* Quote Banner Box matching flyer */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-cyan-950/90 via-slate-900 to-blue-950/90 border border-cyan-500/30 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/10 rounded-full blur-xl pointer-events-none"></div>
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest text-cyan-400 font-bold">Inicie sua Transformação</p>
                  <p className="text-xs sm:text-lg font-black text-white uppercase tracking-wide leading-snug break-words">
                    TRANSFORME SEU CORPO. TRANSFORME SUA VIDA.
                  </p>
                  <p className="text-base sm:text-lg font-script text-cyan-300 font-bold">
                    "Eu posso te guiar!"
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <a
                href="https://wa.me/5574999041988?text=Ol%C3%A1%20M%C3%A1rio!%20Quero%20come%C3%A7ar%20minha%20consultoria%20online%20agora."
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-3 px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base shadow-xl hover:shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5 fill-current shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] uppercase opacity-90 tracking-wider">Fale comigo no WhatsApp</div>
                  <div className="text-xs sm:text-sm font-black">(74) 99904-1988</div>
                </div>
              </a>

              <a
                href="#agendamento"
                className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-cyan-500/25 transition-all text-center uppercase tracking-wider"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Agendar Avaliação</span>
              </a>
            </div>

            {/* Social Proof Stats */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 pt-2 border-t border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-white">4.9/5</span>
                <span>(350+ Alunos)</span>
              </div>
              <div className="flex items-center gap-1 text-slate-300">
                <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>100% Personalizado</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Trainer Photo + App Smartphone Showcase */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Main Trainer Graphic Container */}
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Glowing Background Frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-md opacity-50 group-hover:opacity-100 transition duration-1000"></div>

              {/* Main Card */}
              <div className="relative rounded-3xl bg-[#0B1322] border border-cyan-900/60 p-3 sm:p-4 shadow-2xl overflow-hidden">
                
                {/* Trainer Image */}
                <div className="relative h-[340px] xs:h-[390px] sm:h-[420px] rounded-2xl overflow-hidden border border-slate-800">
                  <img
                    src={HERO_IMAGE_PATH}
                    alt="Mário Czarnobai Personal Trainer"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1322] via-transparent to-transparent opacity-90"></div>

                  {/* Overlaid Floating Badge on Image */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#0A1322]/90 backdrop-blur-md border border-cyan-500/40 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-left">
                    <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold">CREF Ativo</div>
                    <div className="text-[11px] sm:text-xs font-black text-cyan-400">MÁRIO CZARNOBAI</div>
                  </div>

                  {/* Floating Slogan Pill */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-[#08101E]/95 backdrop-blur-md border border-cyan-500/30 p-2.5 sm:p-3 rounded-2xl flex items-center justify-between">
                    <div>
                      <div className="text-[11px] sm:text-xs font-extrabold text-white uppercase tracking-wider">
                        TREINE COM FOCO.
                      </div>
                      <div className="text-[11px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider">
                        EVOLUA SEM LIMITES.
                      </div>
                    </div>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 font-black text-xs sm:text-sm">
                      ⚡
                    </div>
                  </div>
                </div>

                {/* Smartphone App Preview Overlay (Simulating the flyer phone graphic) */}
                <div className="mt-4 p-3 rounded-2xl bg-[#0F1C30] border border-cyan-500/30">
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                      <span className="font-bold text-slate-200">App Mário Czarnobai</span>
                    </div>
                    <span className="text-[10px] bg-cyan-950 text-cyan-400 font-semibold px-2 py-0.5 rounded-full border border-cyan-800">
                      75% Meta Semanal
                    </span>
                  </div>

                  {/* App Stats row */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
                    <div className="bg-[#08101C] p-2 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-slate-400">Treinos</div>
                      <div className="font-extrabold text-cyan-400">12/16</div>
                    </div>
                    <div className="bg-[#08101C] p-2 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-slate-400">Exercícios</div>
                      <div className="font-extrabold text-white">48/64</div>
                    </div>
                    <div className="bg-[#08101C] p-2 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-slate-400">Progresso</div>
                      <div className="font-extrabold text-emerald-400">+14 kg</div>
                    </div>
                  </div>

                  {/* Exercise checklist preview */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#08101C] border border-cyan-900/40">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        <span className="text-slate-200 font-medium">Supino Reto com Barra (4x10)</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">Concluído</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#08101C] border border-cyan-900/40">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        <span className="text-slate-200 font-medium">Desenvolvimento Ombro (4x12)</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">Concluído</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
