import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, MessageSquare, Play, Pause, CheckCheck, ShieldCheck, Heart, Volume2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const toggleAudio = (id: string) => {
    if (playingAudioId === id) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(id);
    }
  };

  return (
    <section id="depoimentos" className="py-20 bg-[#070D18] relative overflow-hidden border-t border-cyan-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest max-w-full">
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span className="break-words">Depoimentos & Feedback dos Alunos</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight break-words">
            Quem Treina com o <span className="text-cyan-400">Mário Aprova!</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-lg">
            Veja prints e áudios de alunos reais que transformaram o corpo através do acompanhamento personalizado.
          </p>
        </div>

        {/* Rating Stats Banner */}
        <div className="p-6 rounded-2xl bg-card-gradient border border-cyan-900/50 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-2xl font-black text-cyan-400 font-display">
              4.9
            </div>
            <div>
              <div className="flex text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <div className="text-sm font-bold text-white">Avaliação Média Excelente</div>
              <div className="text-xs text-slate-400">Baseado em mais de 350 alunos ativos no Brasil e Exterior</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#08101C] border border-cyan-800 text-xs text-cyan-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Alunos 100% Verificados no WhatsApp</span>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((item) => {
            const isPlaying = playingAudioId === item.id;

            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#0C1729] to-[#08101E] border border-cyan-900/40 hover:border-cyan-500/40 transition-all shadow-xl space-y-4 flex flex-col justify-between"
              >
                {/* User Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/50"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="text-base font-extrabold text-white flex items-center gap-1.5">
                        {item.name}
                        <ShieldCheck className="w-4 h-4 text-cyan-400 inline" />
                      </h3>
                      <div className="text-xs text-slate-400">{item.city} • {item.age} anos</div>
                    </div>
                  </div>

                  <span className="text-[10px] uppercase font-bold bg-cyan-950 text-cyan-300 px-2.5 py-1 rounded-md border border-cyan-800">
                    {item.goal}
                  </span>
                </div>

                {/* Simulated WhatsApp Chat Message Box */}
                <div className="p-4 rounded-2xl bg-[#081322] border border-slate-800 space-y-3 relative">
                  
                  {/* WhatsApp-style audio player if hasAudio */}
                  {item.hasAudio && (
                    <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-800 flex items-center gap-3">
                      <button
                        onClick={() => toggleAudio(item.id)}
                        className="w-10 h-10 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black flex items-center justify-center shrink-0 transition-transform"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                      </button>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-cyan-300 font-bold">Áudio de Depoimento</span>
                          <span className="text-slate-400">{item.audioDuration}</span>
                        </div>
                        {/* Audio waveform bar animation */}
                        <div className="flex items-center gap-1 h-4">
                          {[40, 70, 30, 90, 50, 80, 100, 60, 40, 80, 30, 90, 50, 70, 40].map((h, i) => (
                            <span
                              key={i}
                              className={`w-1 rounded-full transition-all ${
                                isPlaying ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'
                              }`}
                              style={{ height: isPlaying ? `${Math.max(20, Math.round(h * Math.random()))}%` : `${h}%` }}
                            ></span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Message Body */}
                  <p className="text-sm text-slate-200 leading-relaxed font-normal">
                    "{item.text}"
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                    <span>{item.date}</span>
                    <div className="flex items-center gap-1 text-cyan-400 font-semibold">
                      <CheckCheck className="w-4 h-4 text-cyan-400" />
                      <span>Mensagem do WhatsApp</span>
                    </div>
                  </div>
                </div>

                {/* Rating stars */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Resultado Garantido</span>
                </div>

              </div>
            );
          })}
        </div>

        {/* CTA banner under testimonials */}
        <div className="mt-12 text-center p-4 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-blue-950/80 border border-cyan-500/30 max-w-full overflow-hidden">
          <h3 className="text-lg sm:text-2xl font-display font-black text-white uppercase break-words leading-tight">
            Sua Transformação É o Próximo Depoimento!
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            Não espere mais um mês para começar a cuidar do seu corpo. Converse com o Mário hoje e receba seu plano exclusivo.
          </p>
          <a
            href="https://wa.me/5574999041988?text=Ol%C3%A1%20M%C3%A1rio!%20Li%20os%20depoimentos%20no%20site%20e%20quero%20come%C3%A7ar%20meu%20treino."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 mt-6 px-5 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:opacity-95 max-w-full"
          >
            Quero Minha Evolução Agora
          </a>
        </div>

      </div>
    </section>
  );
};
