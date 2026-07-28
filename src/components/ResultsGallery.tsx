import React, { useState } from 'react';
import { TRANSFORMATIONS } from '../data/mockData';
import { Transformation } from '../types';
import { Sparkles, Trophy, ArrowRight, Eye, X, Filter, CheckCircle2, TrendingUp, Calendar, MapPin } from 'lucide-react';

export const ResultsGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeModalStudent, setActiveModalStudent] = useState<Transformation | null>(null);
  
  // Interactive slider position per card (0 to 100%)
  const [sliderPositions, setSliderPositions] = useState<{ [id: string]: number }>({
    '1': 50,
    '2': 50,
    '3': 50,
    '4': 50,
  });

  const filteredTransformations = selectedCategory === 'todos'
    ? TRANSFORMATIONS
    : TRANSFORMATIONS.filter(t => t.category === selectedCategory);

  const handleSliderMove = (id: string, e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const positionPercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPositions(prev => ({ ...prev, [id]: positionPercentage }));
  };

  return (
    <section id="resultados" className="py-20 bg-[#070D18] relative overflow-hidden border-t border-cyan-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            <Trophy className="w-4 h-4 text-amber-400" />
            Galeria de Transformações Reais
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
            Resultados que <span className="text-cyan-400">Falam por Si</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Arraste o divisor na imagem para comparar o Antes & Depois dos alunos da consultoria do Mário Czarnobai.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'todos', label: 'Todos os Resultados' },
            { id: 'emagrecimento', label: 'Emagrecimento' },
            { id: 'definicao', label: 'Definição Muscular' },
            { id: 'hipertrofia', label: 'Hipertrofia / Massa Magra' },
            { id: 'reabilitacao', label: 'Reabilitação & Postura' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-[#0F1C30] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Transformations Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredTransformations.map((item) => {
            const sliderPos = sliderPositions[item.id] ?? 50;

            return (
              <div
                key={item.id}
                className="rounded-3xl bg-card-gradient border border-cyan-900/50 hover:border-cyan-500/40 transition-all overflow-hidden shadow-2xl flex flex-col justify-between group"
              >
                {/* Header info */}
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                      {item.studentName}
                      <span className="text-xs font-normal text-slate-400">({item.age} anos)</span>
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 font-extrabold text-xs border border-cyan-800">
                      {item.timeframe}
                    </span>
                    {item.weightLoss && (
                      <div className="text-xs font-black text-emerald-400 mt-1">
                        {item.weightLoss}
                      </div>
                    )}
                    {item.muscleGain && (
                      <div className="text-xs font-black text-cyan-400 mt-1">
                        {item.muscleGain}
                      </div>
                    )}
                  </div>
                </div>

                {/* Interactive Before/After Image Comparison Slider */}
                <div
                  className="relative h-80 sm:h-96 w-full select-none cursor-ew-resize overflow-hidden bg-slate-950"
                  onMouseMove={(e) => handleSliderMove(item.id, e)}
                  onTouchMove={(e) => handleSliderMove(item.id, e)}
                >
                  {/* AFTER Image (Base background) */}
                  <img
                    src={item.afterImage}
                    alt={`Depois - ${item.studentName}`}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-emerald-600/90 text-white font-black text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow backdrop-blur-sm z-10">
                    DEPOIS
                  </div>

                  {/* BEFORE Image (Clipped overlay) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <img
                      src={item.beforeImage}
                      alt={`Antes - ${item.studentName}`}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      style={{ width: '100%', maxWidth: 'none' }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/90 text-slate-300 font-black text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow backdrop-blur-sm z-10 border border-slate-700">
                      ANTES
                    </div>
                  </div>

                  {/* Vertical Divider Handle Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_15px_rgba(0,180,255,1)] z-20"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-cyan-500 text-black font-extrabold text-xs flex items-center justify-center shadow-2xl border-2 border-white">
                      ↔
                    </div>
                  </div>

                  {/* Instruction Overlay */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-slate-300 font-medium z-10 border border-slate-800">
                    Arraste para comparar Antes / Depois
                  </div>
                </div>

                {/* Card Footer Quote & Action */}
                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-300 italic border-l-2 border-cyan-500 pl-3">
                    "{item.quote}"
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setActiveModalStudent(item)}
                      className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ver História Completa</span>
                    </button>

                    <a
                      href={`https://wa.me/5574999041988?text=Ol%C3%A1%20M%C3%A1rio!%20Vi%20o%20resultado%20do%20alumno%20${encodeURIComponent(item.studentName)}%20e%20quero%20um%20resultado%20parecido.`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all"
                    >
                      Quero esse resultado
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fullscreen Story Modal */}
        {activeModalStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-2xl rounded-3xl bg-[#0B1322] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
              
              <button
                onClick={() => setActiveModalStudent(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Relato de Aluno</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-black uppercase mt-1">
                    {activeModalStudent.studentName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
                    <span>{activeModalStudent.age} anos</span>
                    <span>•</span>
                    <span>{activeModalStudent.location}</span>
                    <span>•</span>
                    <span className="text-cyan-400 font-bold">{activeModalStudent.timeframe} de Consultoria</span>
                  </div>
                </div>

                {/* Before/After side-by-side images */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 h-48 sm:h-56">
                    <img
                      src={activeModalStudent.beforeImage}
                      alt="Antes"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-2 left-2 bg-slate-900/90 text-slate-300 px-2 py-0.5 rounded text-[10px] font-bold">
                      ANTES: {activeModalStudent.metrics.weightBefore}
                    </span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden border border-cyan-500/50 h-48 sm:h-56">
                    <img
                      src={activeModalStudent.afterImage}
                      alt="Depois"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-2 left-2 bg-emerald-600/90 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                      DEPOIS: {activeModalStudent.metrics.weightAfter}
                    </span>
                  </div>
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-[#08101C] border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Peso Inicial</div>
                    <div className="text-base font-extrabold text-white">{activeModalStudent.metrics.weightBefore}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#08101C] border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Peso Atual</div>
                    <div className="text-base font-extrabold text-cyan-400">{activeModalStudent.metrics.weightAfter}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#08101C] border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">% Gordura Antes</div>
                    <div className="text-base font-extrabold text-slate-300">{activeModalStudent.metrics.bodyFatBefore}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#08101C] border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">% Gordura Atual</div>
                    <div className="text-base font-extrabold text-emerald-400">{activeModalStudent.metrics.bodyFatAfter}</div>
                  </div>
                </div>

                {/* Story description */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Histórico & Estratégia Utilizada</h4>
                  <p className="text-sm text-slate-300 leading-relaxed bg-[#08101C] p-4 rounded-2xl border border-slate-800">
                    {activeModalStudent.story}
                  </p>
                </div>

                <a
                  href={`https://wa.me/5574999041988?text=Ol%C3%A1%20M%C3%A1rio!%20Li%20a%20hist%C3%B3ria%20do%20${encodeURIComponent(activeModalStudent.studentName)}%20e%20quero%20iniciar%20minha%20consultoria.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-white font-extrabold text-sm text-center block uppercase tracking-wider shadow-lg"
                >
                  Falar no WhatsApp para Mudar Meu Corpo
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
