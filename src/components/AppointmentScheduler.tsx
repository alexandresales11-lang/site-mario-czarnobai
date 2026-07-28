import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, Dumbbell, Target, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';
import { AppointmentBooking } from '../types';

export const AppointmentScheduler: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [booking, setBooking] = useState<AppointmentBooking>({
    goal: 'Emagrecimento e Definição',
    trainingLocation: 'academia',
    date: '',
    time: '09:00',
    fullName: '',
    phone: '',
    email: '',
    age: '',
    notes: '',
  });

  // Next 7 available calendar dates
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const dayName = nextDate.toLocaleDateString('pt-BR', { weekday: 'short' });
      const dayNum = nextDate.getDate();
      const monthName = nextDate.toLocaleDateString('pt-BR', { month: 'short' });
      const fullDateStr = nextDate.toISOString().split('T')[0];
      dates.push({ dayName, dayNum, monthName, fullDateStr });
    }
    return dates;
  };

  const availableDates = generateAvailableDates();
  const timeSlots = ['08:00', '09:30', '11:00', '14:00', '15:30', '17:00', '19:00', '20:30'];

  const handleDateSelect = (fullDateStr: string) => {
    setBooking(prev => ({ ...prev, date: fullDateStr }));
  };

  const handleTimeSelect = (slot: string) => {
    setBooking(prev => ({ ...prev, time: slot }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking.fullName || !booking.phone || !booking.date) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setIsSubmitted(true);
  };

  const formattedWhatsAppUrl = () => {
    const message = `Olá Mário! Gostaria de agendar minha Avaliação Inicial e Consultoria Online.
    
📌 *Dados do Agendamento:*
- *Nome:* ${booking.fullName}
- *Idade:* ${booking.age} anos
- *Objetivo:* ${booking.goal}
- *Local de Treino:* ${booking.trainingLocation === 'academia' ? 'Academia' : booking.trainingLocation === 'casa' ? 'Em Casa' : 'Híbrido'}
- *Data Preferencial:* ${booking.date}
- *Horário Preferencial:* ${booking.time}
- *Observações:* ${booking.notes || 'Nenhuma'}`;

    return `https://wa.me/5574999041988?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="agendamento" className="py-20 bg-[#060B14] relative overflow-hidden border-t border-cyan-950/60">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            <CalendarIcon className="w-4 h-4" />
            Agendamento de Consultas & Diagnóstico
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
            Agende Sua <span className="text-cyan-400">Avaliação Física Inicial</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Selecione seu objetivo, data e horário preferido. O Mário analisará seu perfil antes da conversa.
          </p>
        </div>

        {/* Multi-Step Scheduler Container */}
        <div className="p-6 sm:p-10 rounded-3xl bg-card-gradient border border-cyan-900/60 shadow-2xl relative">
          
          {/* Step Progress Bar */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800">
            <div className={`flex items-center gap-2 font-bold text-xs uppercase ${step >= 1 ? 'text-cyan-400' : 'text-slate-600'}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400'}`}>
                1
              </span>
              <span className="hidden sm:inline">Objetivo & Local</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-800"></div>
            <div className={`flex items-center gap-2 font-bold text-xs uppercase ${step >= 2 ? 'text-cyan-400' : 'text-slate-600'}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400'}`}>
                2
              </span>
              <span className="hidden sm:inline">Data & Horário</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-800"></div>
            <div className={`flex items-center gap-2 font-bold text-xs uppercase ${step >= 3 ? 'text-cyan-400' : 'text-slate-600'}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400'}`}>
                3
              </span>
              <span className="hidden sm:inline">Seus Dados</span>
            </div>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: Objective & Location */}
              {step === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <label className="block text-sm font-bold text-white uppercase tracking-wider mb-3">
                      1. Qual o seu principal objetivo?
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        'Emagrecimento e Definição',
                        'Hipertrofia e Ganho de Massa',
                        'Condicionamento e Saúde',
                        'Reabilitação de Dores / Postura',
                      ].map((obj) => (
                        <button
                          key={obj}
                          type="button"
                          onClick={() => setBooking(prev => ({ ...prev, goal: obj }))}
                          className={`p-4 rounded-xl border text-left font-semibold text-sm transition-all flex items-center justify-between ${
                            booking.goal === obj
                              ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-lg'
                              : 'bg-[#08101C] border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span>{obj}</span>
                          {booking.goal === obj && <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white uppercase tracking-wider mb-3">
                      2. Onde você prefere realizar seus treinos?
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'academia', label: 'Na Academia', icon: Dumbbell },
                        { id: 'casa', label: 'Em Casa', icon: Target },
                        { id: 'hibrido', label: 'Híbrido', icon: Sparkles },
                      ].map((loc) => {
                        const Icon = loc.icon;
                        return (
                          <button
                            key={loc.id}
                            type="button"
                            onClick={() => setBooking(prev => ({ ...prev, trainingLocation: loc.id as any }))}
                            className={`p-4 rounded-xl border text-center flex flex-col items-center gap-2 transition-all ${
                              booking.trainingLocation === loc.id
                                ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-lg'
                                : 'bg-[#08101C] border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <Icon className="w-6 h-6 text-cyan-400" />
                            <span className="text-xs font-bold uppercase">{loc.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:opacity-95"
                    >
                      <span>Avançar para Data</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Date & Time Slot */}
              {step === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <label className="block text-sm font-bold text-white uppercase tracking-wider mb-3">
                      Selecione o dia ideal para a consulta:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {availableDates.map((item) => (
                        <button
                          key={item.fullDateStr}
                          type="button"
                          onClick={() => handleDateSelect(item.fullDateStr)}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            booking.date === item.fullDateStr
                              ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-lg'
                              : 'bg-[#08101C] border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-[10px] text-cyan-400 uppercase font-extrabold">{item.dayName}</div>
                          <div className="text-xl font-black text-white">{item.dayNum}</div>
                          <div className="text-[10px] text-slate-400 uppercase">{item.monthName}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white uppercase tracking-wider mb-3">
                      Selecione o horário disponível:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => handleTimeSelect(slot)}
                          className={`py-2.5 rounded-xl border text-center font-mono text-xs font-bold transition-all ${
                            booking.time === slot
                              ? 'bg-cyan-500 text-black border-cyan-400 shadow-lg'
                              : 'bg-[#08101C] border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-sm uppercase"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Voltar
                    </button>
                    <button
                      type="button"
                      disabled={!booking.date}
                      onClick={() => setStep(3)}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm uppercase tracking-wider shadow-lg disabled:opacity-50"
                    >
                      <span>Avançar para Seus Dados</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Student Details */}
              {step === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Seu Nome Completo *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={booking.fullName}
                          onChange={(e) => setBooking(prev => ({ ...prev, fullName: e.target.value }))}
                          placeholder="Ex: Roberto Silva"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#08101C] border border-slate-800 text-white focus:border-cyan-400 focus:outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        WhatsApp com DDD *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={booking.phone}
                          onChange={(e) => setBooking(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="(74) 99999-9999"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#08101C] border border-slate-800 text-white focus:border-cyan-400 focus:outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Sua Idade
                      </label>
                      <input
                        type="number"
                        value={booking.age}
                        onChange={(e) => setBooking(prev => ({ ...prev, age: e.target.value }))}
                        placeholder="Ex: 32"
                        className="w-full px-4 py-3 rounded-xl bg-[#08101C] border border-slate-800 text-white focus:border-cyan-400 focus:outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        E-mail de Contato
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={booking.email}
                          onChange={(e) => setBooking(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="seuemail@exemplo.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#08101C] border border-slate-800 text-white focus:border-cyan-400 focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Alguma limitação, lesão ou observação relevante?
                    </label>
                    <textarea
                      rows={3}
                      value={booking.notes}
                      onChange={(e) => setBooking(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Ex: Dores na lombar, pouco tempo livre durante a semana..."
                      className="w-full p-3 rounded-xl bg-[#08101C] border border-slate-800 text-white focus:border-cyan-400 focus:outline-none text-sm"
                    ></textarea>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/50 text-xs text-slate-300 space-y-1">
                    <div className="font-bold text-cyan-400 uppercase">Resumo do Agendamento:</div>
                    <div>
                      <strong>Objetivo:</strong> {booking.goal} ({booking.trainingLocation})
                    </div>
                    <div>
                      <strong>Data/Horário:</strong> {booking.date || 'Não selecionado'} às {booking.time}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-sm uppercase"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl hover:opacity-95"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Confirmar & Abrir WhatsApp</span>
                    </button>
                  </div>
                </div>
              )}

            </form>
          ) : (
            /* Submission Confirmation Screen */
            <div className="text-center py-8 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-display font-extrabold text-white uppercase">
                  Agendamento Pré-Registrado com Sucesso!
                </h3>
                <p className="text-slate-300 text-sm mt-2 max-w-lg mx-auto">
                  Sua solicitação foi salva. Para concluir o agendamento diretamente com o Mário Czarnobai, clique no botão verde abaixo para enviar os dados pré-formatados pelo WhatsApp.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#08101C] border border-cyan-900/60 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="text-cyan-400 font-bold uppercase pb-1 border-b border-slate-800">
                  Resumo Enviado para (74) 99904-1988:
                </div>
                <div><strong>Aluno:</strong> {booking.fullName}</div>
                <div><strong>Objetivo:</strong> {booking.goal}</div>
                <div><strong>Data:</strong> {booking.date} às {booking.time}</div>
                <div><strong>WhatsApp:</strong> {booking.phone}</div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href={formattedWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-base shadow-xl flex items-center gap-2 uppercase tracking-wider"
                >
                  <Phone className="w-5 h-5" />
                  <span>Enviar pelo WhatsApp Agora</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setStep(1);
                  }}
                  className="px-6 py-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs uppercase"
                >
                  Novo Agendamento
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
