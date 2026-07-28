import React, { useState } from 'react';
import { Calculator, Flame, Dumbbell, ArrowRight, Phone, Sparkles, CheckCircle2 } from 'lucide-react';

export const FitnessCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(175);
  const [activity, setActivity] = useState<number>(1.375); // 1.2, 1.375, 1.55, 1.725
  const [goal, setGoal] = useState<'cut' | 'maintain' | 'bulk'>('cut');

  // Calculations
  const calculateBMR = () => {
    if (gender === 'male') {
      return 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    } else {
      return 447.59 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    }
  };

  const bmr = calculateBMR();
  const tdee = bmr * activity;

  const targetCalories = Math.round(
    goal === 'cut' ? tdee - 500 : goal === 'bulk' ? tdee + 400 : tdee
  );

  const proteinGrams = Math.round(weight * (goal === 'bulk' ? 2.2 : 2.0));
  const fatGrams = Math.round((targetCalories * 0.25) / 9);
  const carbGrams = Math.round((targetCalories - (proteinGrams * 4 + fatGrams * 9)) / 4);

  const bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);

  const getBMICategory = (val: number) => {
    if (val < 18.5) return 'Abaixo do Peso';
    if (val < 24.9) return 'Peso Normal / Ideal';
    if (val < 29.9) return 'Sobrepeso';
    return 'Obesidade';
  };

  const whatsappMessage = `Ol%C3%A1%20M%C3%A1rio!%20Fiz%20o%20c%C3%A1lculo%20na%20sua%20Calculadora%20Fitness%20no%20site:%0A%0A- Peso: ${weight}kg%0A- Altura: ${height}cm%0A- Meta: ${goal === 'cut' ? 'Emagrecer' : goal === 'bulk' ? 'Ganhar Massa' : 'Manter Peso'}%0A- Calorias Estimadas: ${targetCalories} kcal%0A%0AGostaria%20de%20montar%20meu%20treino%20personalizado%20para%20essa%20meta!`;

  return (
    <section id="calculadora" className="py-20 bg-[#060B14] relative overflow-hidden border-t border-cyan-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            <Calculator className="w-4 h-4" />
            Ferramenta Interativa Mário Czarnobai
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
            Calculadora de <span className="text-cyan-400">Metas & Calorias</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Descubra a estimativa do seu gasto calórico e receba a recomendação inicial para o seu treino.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Inputs */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-card-gradient border border-cyan-900/60 shadow-xl space-y-6">
            
            {/* Gender Toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Gênero</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-3 rounded-xl border text-sm font-bold uppercase transition-all ${
                    gender === 'male'
                      ? 'bg-cyan-950/90 border-cyan-400 text-white shadow'
                      : 'bg-[#08101C] border-slate-800 text-slate-400'
                  }`}
                >
                  Homem 👨🏻‍💼
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-3 rounded-xl border text-sm font-bold uppercase transition-all ${
                    gender === 'female'
                      ? 'bg-cyan-950/90 border-cyan-400 text-white shadow'
                      : 'bg-[#08101C] border-slate-800 text-slate-400'
                  }`}
                >
                  Mulher 👩🏻‍💼
                </button>
              </div>
            </div>

            {/* Age, Weight, Height Sliders / Inputs */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Idade: <span className="text-cyan-400 font-extrabold">{age} anos</span>
                </label>
                <input
                  type="range"
                  min={16}
                  max={75}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Peso: <span className="text-cyan-400 font-extrabold">{weight} kg</span>
                </label>
                <input
                  type="range"
                  min={40}
                  max={140}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Altura: <span className="text-cyan-400 font-extrabold">{height} cm</span>
                </label>
                <input
                  type="range"
                  min={140}
                  max={210}
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Nível de Atividade Diária
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { value: 1.2, label: 'Sedentário' },
                  { value: 1.375, label: 'Moderado (1-3x)' },
                  { value: 1.55, label: 'Ativo (3-5x)' },
                  { value: 1.725, label: 'Intenso (6-7x)' },
                ].map((act) => (
                  <button
                    key={act.value}
                    type="button"
                    onClick={() => setActivity(act.value)}
                    className={`py-2.5 px-2 rounded-xl border text-[11px] font-bold text-center transition-all ${
                      activity === act.value
                        ? 'bg-cyan-500 text-black border-cyan-400 shadow'
                        : 'bg-[#08101C] border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {act.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Goal Toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Meta Fitness</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'cut', label: 'Emagrecer' },
                  { id: 'maintain', label: 'Manter Peso' },
                  { id: 'bulk', label: 'Ganhar Massa' },
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGoal(g.id as any)}
                    className={`py-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                      goal === g.id
                        ? 'bg-cyan-950/90 border-cyan-400 text-cyan-300 shadow'
                        : 'bg-[#08101C] border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Results Breakdown Display */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0F1E33] to-[#0A1322] border border-cyan-500/40 shadow-2xl space-y-6">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Resultado do Seu Perfil</span>
              <h3 className="text-2xl font-display font-black text-white uppercase mt-1">
                Análise de Calorias
              </h3>
            </div>

            {/* Main Target Calories display */}
            <div className="p-5 rounded-2xl bg-[#08101C] border border-cyan-900/60 text-center relative overflow-hidden">
              <div className="text-xs text-slate-400 uppercase font-bold">Meta Calórica Diária Estimada</div>
              <div className="text-4xl font-display font-black text-cyan-400 mt-1">
                {targetCalories} <span className="text-base text-slate-300 font-normal">kcal/dia</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Gasto Calórico Total (TDEE): {Math.round(tdee)} kcal
              </div>
            </div>

            {/* IMC display */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#08101C] border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 font-bold uppercase">IMC Estimado:</span>
                <span className="text-white font-extrabold ml-2">{bmi} kg/m²</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 font-extrabold text-[10px] border border-cyan-800">
                {getBMICategory(Number(bmi))}
              </span>
            </div>

            {/* Macros Breakdown */}
            <div>
              <div className="text-xs font-bold text-slate-300 uppercase mb-2">Estimativa de Macronutrientes:</div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-[#08101C] border border-slate-800">
                  <div className="text-cyan-400 font-black text-base">{proteinGrams}g</div>
                  <div className="text-[10px] text-slate-400">Proteína</div>
                </div>
                <div className="p-3 rounded-xl bg-[#08101C] border border-slate-800">
                  <div className="text-amber-400 font-black text-base">{carbGrams}g</div>
                  <div className="text-[10px] text-slate-400">Carboidrato</div>
                </div>
                <div className="p-3 rounded-xl bg-[#08101C] border border-slate-800">
                  <div className="text-emerald-400 font-black text-base">{fatGrams}g</div>
                  <div className="text-[10px] text-slate-400">Gorduras</div>
                </div>
              </div>
            </div>

            {/* Direct CTA */}
            <a
              href={`https://wa.me/5574999041988?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl"
            >
              <Phone className="w-4 h-4" />
              <span>Enviar esse cálculo ao Mário no WhatsApp</span>
            </a>

            <p className="text-[10px] text-slate-400 text-center">
              *Valores estimativos calculados via fórmula de Harris-Benedict. O treino definitivo e orientações são ajustados individualmente após anamnese.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
