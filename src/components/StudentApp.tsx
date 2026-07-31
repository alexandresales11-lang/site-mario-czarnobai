import React, { useState, useEffect } from 'react';
import {
  Dumbbell, Play, CheckCircle2, Circle, Clock, Flame, Award,
  Droplets, Utensils, MessageSquare, Send, ArrowLeft, Download,
  TrendingDown, Calendar, ChevronRight, RotateCcw, User, Sparkles,
  Smartphone, ShieldCheck, Check, Plus, BarChart2, CheckSquare,
  Lock, Mail, Phone, Eye, EyeOff, LogOut, UserPlus, LogIn, AlertCircle, ArrowRight
} from 'lucide-react';

interface StudentAppProps {
  onCloseApp?: () => void;
  onOpenInstallModal?: () => void;
}

interface Exercise {
  id: string;
  name: string;
  muscle: string;
  sets: string;
  reps: string;
  weight: number;
  restSeconds: number;
  completed: boolean;
  notes?: string;
  image: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'mario';
  text: string;
  time: string;
}

export const StudentApp: React.FC<StudentAppProps> = ({ onCloseApp, onOpenInstallModal }) => {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('czarnobai_logged_in') === 'true';
  });
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup Form State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupGoal, setSignupGoal] = useState('Hipertrofia & Definição');

  // User Profile
  const [userProfile, setUserProfile] = useState<{
    name: string;
    email: string;
    goal: string;
    photo: string;
  }>(() => {
    const saved = localStorage.getItem('czarnobai_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      name: 'Lucas Mendes',
      email: 'lucas.mendes@email.com',
      goal: 'Hipertrofia & Definição',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!loginEmail || !loginPassword) {
      setAuthError('Por favor, informe seu e-mail ou usuário e a senha.');
      return;
    }

    if (loginPassword.length < 4) {
      setAuthError('A senha deve conter pelo menos 4 caracteres.');
      return;
    }

    const profile = {
      name: userProfile.name || 'Aluno Mário Czarnobai',
      email: loginEmail,
      goal: userProfile.goal || 'Hipertrofia & Definição',
      photo: userProfile.photo
    };
    localStorage.setItem('czarnobai_logged_in', 'true');
    localStorage.setItem('czarnobai_user_profile', JSON.stringify(profile));
    setUserProfile(profile);
    setIsLoggedIn(true);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!signupName || !signupEmail || !signupPassword) {
      setAuthError('Preencha seu nome, e-mail e crie uma senha.');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setAuthError('As senhas não coincidem. Verifique e tente novamente.');
      return;
    }

    const newProfile = {
      name: signupName,
      email: signupEmail,
      goal: signupGoal,
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };

    localStorage.setItem('czarnobai_logged_in', 'true');
    localStorage.setItem('czarnobai_user_profile', JSON.stringify(newProfile));
    setUserProfile(newProfile);
    setAuthSuccessMsg('Conta criada com sucesso! Acessando área de membros...');
    setTimeout(() => {
      setIsLoggedIn(true);
      setAuthSuccessMsg('');
    }, 800);
  };

  const handleQuickDemoLogin = () => {
    const demoProfile = {
      name: 'Lucas Mendes',
      email: 'lucas.mendes@email.com',
      goal: 'Hipertrofia & Definição',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };
    localStorage.setItem('czarnobai_logged_in', 'true');
    localStorage.setItem('czarnobai_user_profile', JSON.stringify(demoProfile));
    setUserProfile(demoProfile);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('czarnobai_logged_in');
    setIsLoggedIn(false);
  };

  const [activeTab, setActiveTab] = useState<'treinos' | 'evolucao' | 'dieta' | 'chat'>('treinos');
  const [selectedWorkout, setSelectedWorkout] = useState<'A' | 'B' | 'C' | 'D'>('A');

  // Workout state
  const [exercises, setExercises] = useState<Record<string, Exercise[]>>({
    A: [
      {
        id: 'e1',
        name: 'Supino Inclinado c/ Halteres',
        muscle: 'Peitoral Superior',
        sets: '4 séries',
        reps: '10 - 12 reps',
        weight: 28,
        restSeconds: 60,
        completed: true,
        notes: 'Manter cotovelos a 45º e escápulas fechadas',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'e2',
        name: 'Crossover na Polia Alta',
        muscle: 'Peitoral Inferior / Miolo',
        sets: '4 séries',
        reps: '12 - 15 reps',
        weight: 25,
        restSeconds: 45,
        completed: true,
        notes: 'Pico de contração de 1 seg embaixo',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'e3',
        name: 'Desenvolvimento c/ Halteres',
        muscle: 'Ombros (Deltoide Anterior)',
        sets: '4 séries',
        reps: '10 reps',
        weight: 20,
        restSeconds: 60,
        completed: false,
        notes: 'Sem hiperextender a coluna',
        image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'e4',
        name: 'Elevação Lateral c/ Cabos',
        muscle: 'Ombros (Lateral)',
        sets: '4 séries',
        reps: '15 reps',
        weight: 12,
        restSeconds: 45,
        completed: false,
        notes: 'Movimento controlado sem usar embalo',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'e5',
        name: 'Tríceps Corda na Polia',
        muscle: 'Tríceps',
        sets: '4 séries',
        reps: '12 - 15 reps',
        weight: 35,
        restSeconds: 45,
        completed: false,
        notes: 'Abrir a corda no final do movimento',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=400'
      }
    ],
    B: [
      {
        id: 'eb1',
        name: 'Puxada Frontal Pegada Aberta',
        muscle: 'Dorsais (Lats)',
        sets: '4 séries',
        reps: '10 - 12 reps',
        weight: 55,
        restSeconds: 60,
        completed: false,
        image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'eb2',
        name: 'Remada Curvada com Barra',
        muscle: 'Dorsais / Miolo',
        sets: '4 séries',
        reps: '8 - 10 reps',
        weight: 60,
        restSeconds: 75,
        completed: false,
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'eb3',
        name: 'Rosca Directa c/ Barra W',
        muscle: 'Bíceps',
        sets: '4 séries',
        reps: '12 reps',
        weight: 24,
        restSeconds: 45,
        completed: false,
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=400'
      }
    ],
    C: [
      {
        id: 'ec1',
        name: 'Agachamento Livre',
        muscle: 'Quadríceps & Glúteos',
        sets: '4 séries',
        reps: '8 - 10 reps',
        weight: 90,
        restSeconds: 90,
        completed: false,
        image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'ec2',
        name: 'Leg Press 45º',
        muscle: 'Quadríceps',
        sets: '4 séries',
        reps: '12 - 15 reps',
        weight: 220,
        restSeconds: 75,
        completed: false,
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'ec3',
        name: 'Mesa Flexora',
        muscle: 'Posterior de Coxa',
        sets: '4 séries',
        reps: '12 reps',
        weight: 45,
        restSeconds: 60,
        completed: false,
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=400'
      }
    ],
    D: [
      {
        id: 'ed1',
        name: 'Abdominal Supra c/ Carga',
        muscle: 'Core / Abdômen',
        sets: '4 séries',
        reps: '15 - 20 reps',
        weight: 15,
        restSeconds: 45,
        completed: false,
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'ed2',
        name: 'Prancha Isométrica',
        muscle: 'Estabilizadores do Core',
        sets: '3 séries',
        reps: '60 segundos',
        weight: 0,
        restSeconds: 45,
        completed: false,
        image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=400'
      }
    ]
  });

  // Timer state
  const [activeTimer, setActiveTimer] = useState<{ exerciseId: string; seconds: number; total: number } | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Water tracker
  const [waterGlasses, setWaterGlasses] = useState(8); // out of 12 (3000ml)
  const totalWaterGoal = 12;

  // Streak state
  const [streakDays, setStreakDays] = useState(14);
  const [workoutCompletedToday, setWorkoutCompletedToday] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Chat messages
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'mario',
      text: 'Fala Lucas! Tudo pronto para o treino de hoje? Atualizei sua ficha com o aumento de carga no Supino Inclinado. Qualquer dúvida me manda áudio ou mensagem por aqui!',
      time: '08:30'
    },
    {
      id: 'm2',
      sender: 'user',
      text: 'Opa Mário, valeu! Vou fazer o Treino A hoje no fim da tarde.',
      time: '09:15'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Handle rest timer countdown
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && activeTimer && activeTimer.seconds > 0) {
      interval = setInterval(() => {
        setActiveTimer((prev) => (prev ? { ...prev, seconds: prev.seconds - 1 } : null));
      }, 1000);
    } else if (activeTimer && activeTimer.seconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, activeTimer]);

  const toggleExercise = (id: string) => {
    setExercises((prev) => {
      const currentList = prev[selectedWorkout];
      const updated = currentList.map((ex) => (ex.id === id ? { ...ex, completed: !ex.completed } : ex));
      return { ...prev, [selectedWorkout]: updated };
    });
  };

  const handleWeightChange = (id: string, newWeight: number) => {
    setExercises((prev) => {
      const currentList = prev[selectedWorkout];
      const updated = currentList.map((ex) => (ex.id === id ? { ...ex, weight: newWeight } : ex));
      return { ...prev, [selectedWorkout]: updated };
    });
  };

  const startRestTimer = (exercise: Exercise) => {
    setActiveTimer({
      exerciseId: exercise.id,
      seconds: exercise.restSeconds,
      total: exercise.restSeconds
    });
    setIsTimerRunning(true);
  };

  const handleCompleteWorkout = () => {
    setWorkoutCompletedToday(true);
    setStreakDays((prev) => prev + 1);
    setShowCelebration(true);
  };

  const handleSendMessage = (textToSend?: string) => {
    const msgText = textToSend || inputMsg;
    if (!msgText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: msgText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMsg('');

    // Simulate Mário reply after 1.2s
    setTimeout(() => {
      let replyText = 'Excelente pergunta! ';
      if (msgText.toLowerCase().includes('substituir') || msgText.toLowerCase().includes('extensora')) {
        replyText += 'Para substituir a extensão de joelhos sem aparelho, você pode fazer o Agachamento Sissy ou Afundo com halteres focando na amplitude!';
      } else if (msgText.toLowerCase().includes('carga') || msgText.toLowerCase().includes('peso')) {
        replyText += 'Show! Pode registrar no aplicativo a carga que você conseguiu realizar com boa técnica. Se fizer mais de 12 repetições, pode subir 2kg no próximo treino!';
      } else {
        replyText += 'Acompanhando seu treino aqui no sistema! Mantenha a cadência 2x2 e lembre de registrar sua água hoje. Tamo junto!';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'mario',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  const currentWorkoutList = exercises[selectedWorkout] || [];
  const completedCount = currentWorkoutList.filter((e) => e.completed).length;
  const progressPercent = currentWorkoutList.length
    ? Math.round((completedCount / currentWorkoutList.length) * 100)
    : 0;

  // If user is not logged in, render Login / Signup screen
  if (!isLoggedIn) {
    return (
      <div className="w-full max-w-md mx-auto bg-[#070C16] border border-cyan-900/50 rounded-3xl shadow-2xl overflow-hidden font-sans text-slate-100 p-6 sm:p-8 my-4 animate-fadeIn">
        {/* Top Header */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-3">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-xl shadow-cyan-500/30 overflow-hidden mx-auto">
              <img
                src="https://i.imgur.com/FVHkZ7T.png"
                alt="Mário Czarnobai"
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-cyan-500 p-1 rounded-full text-black shadow-md">
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
          <h2 className="text-xl font-extrabold text-white font-display uppercase tracking-wide">
            Mário Czarnobai
          </h2>
          <p className="text-xs text-cyan-400 font-semibold tracking-wider uppercase mt-0.5">
            Área Exclusiva de Alunos
          </p>
        </div>

        {/* Mode Switch (Entrar vs Cadastrar) */}
        <div className="flex bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setAuthError('');
            }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              authMode === 'login'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4" />
            Entrar
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setAuthError('');
            }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              authMode === 'signup'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            Cadastrar-se
          </button>
        </div>

        {authError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {authSuccessMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{authSuccessMsg}</span>
          </div>
        )}

        {/* FORM: ENTRAR (LOGIN) */}
        {authMode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                E-mail ou Usuário
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Senha
                </label>
                <button
                  type="button"
                  onClick={() => alert('Para redefinir sua senha, entre em contato diretamente pelo WhatsApp com o Mário Czarnobai.')}
                  className="text-[11px] text-cyan-400 hover:underline"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                defaultChecked
                className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-0"
              />
              <label htmlFor="remember" className="text-xs text-slate-400 cursor-pointer">
                Lembrar do meu acesso
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>ENTRAR NA MINHA CONTA</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Demo Access Button */}
            <div className="pt-3 border-t border-slate-800/80 text-center">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 rounded-xl bg-cyan-950/50 border border-cyan-800/60 text-cyan-300 font-semibold text-xs hover:bg-cyan-900/50 transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Entrar como Aluno Demo (Lucas Silva)</span>
              </button>
            </div>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-400">
                Ainda não tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setAuthError('');
                  }}
                  className="text-cyan-400 font-bold hover:underline"
                >
                  Cadastre-se aqui
                </button>
              </p>
            </div>
          </form>
        ) : (
          /* FORM: CADASTRAR-SE (SIGNUP) */
          <form onSubmit={handleSignupSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nome Completo
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="Ex: Alexandre Sales"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                E-mail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                WhatsApp / Celular
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  placeholder="(00) 90000-0000"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Objetivo Principal
              </label>
              <select
                value={signupGoal}
                onChange={(e) => setSignupGoal(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Hipertrofia & Ganho de Massa">Hipertrofia & Ganho de Massa</option>
                <option value="Emagrecimento & Queima de Gordura">Emagrecimento & Queima de Gordura</option>
                <option value="Definição Muscular">Definição Muscular</option>
                <option value="Condicionamento & Saúde">Condicionamento & Saúde</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Criar Senha
                </label>
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-3"
            >
              <span>CRIAR CONTA E ENTRAR</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-400">
                Já possui uma conta?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setAuthError('');
                  }}
                  className="text-cyan-400 font-bold hover:underline"
                >
                  Entre com seu e-mail
                </button>
              </p>
            </div>
          </form>
        )}

        {onCloseApp && (
          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={onCloseApp}
              className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span>Voltar ao Site Institucional</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#070C16] border border-cyan-900/50 rounded-3xl shadow-2xl overflow-hidden font-sans text-slate-100 min-h-[750px] flex flex-col">
      {/* Top App Bar Header */}
      <div className="bg-gradient-to-r from-[#0C172B] via-[#08101E] to-[#0C172B] border-b border-cyan-900/40 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {onCloseApp && (
            <button
              onClick={onCloseApp}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-800"
              title="Voltar ao Site"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 overflow-hidden">
              <img
                src={userProfile.photo}
                alt={userProfile.name}
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-[#070C16]" title="Online"></div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base">{userProfile.name}</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 uppercase">
                Aluno V.I.P.
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <span>Objetivo: {userProfile.goal}</span>
              <span className="text-cyan-500 font-bold">• Mário Czarnobai</span>
            </p>
          </div>
        </div>

        {/* Badges, Logout & Install Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>{streakDays} dias de ofensiva</span>
          </div>

          <button
            onClick={handleLogout}
            title="Sair da Conta"
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sair</span>
          </button>

          {onOpenInstallModal && (
            <button
              onClick={onOpenInstallModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 font-bold text-xs transition-colors shadow-lg"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Baixar na Tela Inicial</span>
              <span className="sm:hidden">Baixar App</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Sub-Tabs inside the App */}
      <div className="flex border-b border-cyan-900/30 bg-[#091222] px-4 pt-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('treinos')}
          className={`flex items-center gap-2 px-4 py-3 font-semibold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'treinos'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/30 rounded-t-xl'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          Ficha de Treino
        </button>
        <button
          onClick={() => setActiveTab('evolucao')}
          className={`flex items-center gap-2 px-4 py-3 font-semibold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'evolucao'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/30 rounded-t-xl'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          Minha Evolução
        </button>
        <button
          onClick={() => setActiveTab('dieta')}
          className={`flex items-center gap-2 px-4 py-3 font-semibold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'dieta'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/30 rounded-t-xl'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Utensils className="w-4 h-4" />
          Plano & Água
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-2 px-4 py-3 font-semibold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-all relative ${
            activeTab === 'chat'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/30 rounded-t-xl'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Chat c/ Personal
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 sm:p-6 bg-[#070C16] overflow-y-auto">
        {/* ================= TAB 1: TREINOS ================= */}
        {activeTab === 'treinos' && (
          <div className="space-y-6">
            {/* Workout selector */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex gap-2">
                {(['A', 'B', 'C', 'D'] as const).map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setSelectedWorkout(letter)}
                    className={`w-11 h-11 rounded-2xl font-bold text-sm flex items-center justify-center transition-all ${
                      selectedWorkout === letter
                        ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    Treino {letter}
                  </button>
                ))}
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400">Divisão Atual:</span>
                <p className="text-sm font-bold text-cyan-400">
                  {selectedWorkout === 'A' && 'Peitoral, Ombros e Tríceps'}
                  {selectedWorkout === 'B' && 'Costas, Deltoide Post. e Bíceps'}
                  {selectedWorkout === 'C' && 'Membros Inferiores Completo'}
                  {selectedWorkout === 'D' && 'Core & Fortalecimento de Abdômen'}
                </p>
              </div>
            </div>

            {/* Progress Bar Header */}
            <div className="p-4 rounded-2xl bg-[#0C1629] border border-cyan-900/40 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-cyan-400" />
                  Progresso do Treino {selectedWorkout}: {completedCount} de {currentWorkoutList.length} concluídos
                </span>
                <span className="font-bold text-cyan-400">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Active Rest Timer floating notification */}
            {activeTimer && (
              <div className="p-4 rounded-2xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-between animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-lg animate-pulse">
                    {activeTimer.seconds}s
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Temporizador de Descanso Ativo</h5>
                    <p className="text-[11px] text-cyan-300">Respire e recupere o ATP para a próxima série!</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 text-black font-bold text-xs"
                >
                  {isTimerRunning ? 'Pausar' : 'Continuar'}
                </button>
              </div>
            )}

            {/* List of Exercises */}
            <div className="space-y-4">
              {currentWorkoutList.map((exercise, index) => (
                <div
                  key={exercise.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    exercise.completed
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-[#0B1324] border-slate-800 hover:border-cyan-900/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* Checkbox button */}
                      <button
                        onClick={() => toggleExercise(exercise.id)}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                          exercise.completed
                            ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                            : 'bg-slate-800 border border-slate-700 text-slate-500 hover:text-cyan-400'
                        }`}
                      >
                        {exercise.completed ? <Check className="w-5 h-5 stroke-[3]" /> : <Circle className="w-5 h-5" />}
                      </button>

                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-slate-800">
                        <img
                          src={exercise.image}
                          alt={exercise.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400">#{index + 1}</span>
                          <h4 className={`font-bold text-sm ${exercise.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                            {exercise.name}
                          </h4>
                        </div>
                        <p className="text-xs text-cyan-400 font-medium">{exercise.muscle}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {exercise.sets} • {exercise.reps}
                        </p>
                      </div>
                    </div>

                    {/* Weight and Timer Controls */}
                    <div className="flex items-center gap-3 justify-end pt-2 sm:pt-0 border-t sm:border-0 border-slate-800">
                      <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                        <span className="text-[11px] text-slate-400">Carga:</span>
                        <input
                          type="number"
                          value={exercise.weight}
                          onChange={(e) => handleWeightChange(exercise.id, Number(e.target.value))}
                          className="w-12 bg-slate-800 text-center font-bold text-xs text-cyan-300 rounded py-0.5 border border-slate-700 focus:outline-none focus:border-cyan-500"
                        />
                        <span className="text-xs text-slate-400 font-bold">kg</span>
                      </div>

                      <button
                        onClick={() => startRestTimer(exercise)}
                        className="flex items-center gap-1 px-3 py-2 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 hover:bg-cyan-900/60 text-xs font-semibold transition-colors"
                        title="Iniciar timer de descanso"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{exercise.restSeconds}s</span>
                      </button>
                    </div>
                  </div>

                  {exercise.notes && (
                    <div className="mt-3 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span><strong>Dica do Mário:</strong> {exercise.notes}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Complete workout button */}
            <div className="pt-2">
              <button
                onClick={handleCompleteWorkout}
                disabled={workoutCompletedToday}
                className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-xl transition-all ${
                  workoutCompletedToday
                    ? 'bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 cursor-default'
                    : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 text-black hover:opacity-95 shadow-cyan-500/25'
                }`}
              >
                {workoutCompletedToday ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    Treino Concluído Hoje! (+1 Dia na Ofensiva)
                  </>
                ) : (
                  <>
                    <Award className="w-5 h-5" />
                    Finalizar e Registrar Treino de Hoje
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 2: EVOLUÇÃO ================= */}
        {activeTab === 'evolucao' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#0B1324] border border-cyan-900/40">
                <span className="text-xs text-slate-400">Peso Corporal</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-extrabold text-white">79.2 kg</span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center">
                    <TrendingDown className="w-3.5 h-3.5 inline" /> -8.8kg
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">Inicial: 88.0 kg em Jan</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#0B1324] border border-cyan-900/40">
                <span className="text-xs text-slate-400">% Gordura (BF)</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-extrabold text-cyan-400">14.2 %</span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center">
                    <TrendingDown className="w-3.5 h-3.5 inline" /> -9.8%
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">Inicial: 24.0 % em Jan</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#0B1324] border border-cyan-900/40">
                <span className="text-xs text-slate-400">Massa Magra</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-extrabold text-white">67.9 kg</span>
                  <span className="text-xs font-bold text-cyan-400">+3.1kg muscular</span>
                </div>
                <span className="text-[11px] text-slate-500">Ganhos limpos sem gordura</span>
              </div>
            </div>

            {/* Visual SVG Progress Chart */}
            <div className="p-5 rounded-2xl bg-[#0B1324] border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-cyan-400" />
                  Evolução do Peso Corporal (Últimos 6 Meses)
                </h4>
                <span className="text-xs text-slate-400">Meta: 78kg com 12% BF</span>
              </div>

              {/* Simplified SVG Line Chart */}
              <div className="h-44 w-full pt-4">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  <line x1="0" y1="20" x2="500" y2="20" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="60" x2="500" y2="60" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#1e293b" strokeDasharray="3 3" />

                  {/* Area fill */}
                  <polygon points="10,20 100,35 200,55 300,75 400,85 490,95 490,120 10,120" fill="url(#chartGrad)" />

                  {/* Line */}
                  <polyline
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    points="10,20 100,35 200,55 300,75 400,85 490,95"
                  />

                  {/* Data points */}
                  <circle cx="10" cy="20" r="5" fill="#06b6d4" />
                  <circle cx="100" cy="35" r="5" fill="#06b6d4" />
                  <circle cx="200" cy="55" r="5" fill="#06b6d4" />
                  <circle cx="300" cy="75" r="5" fill="#06b6d4" />
                  <circle cx="400" cy="85" r="5" fill="#06b6d4" />
                  <circle cx="490" cy="95" r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />

                  {/* Labels */}
                  <text x="10" y="115" fill="#64748b" fontSize="10" textAnchor="middle">Jan (88k)</text>
                  <text x="100" y="115" fill="#64748b" fontSize="10" textAnchor="middle">Fev (86k)</text>
                  <text x="200" y="115" fill="#64748b" fontSize="10" textAnchor="middle">Mar (83k)</text>
                  <text x="300" y="115" fill="#64748b" fontSize="10" textAnchor="middle">Abr (81k)</text>
                  <text x="400" y="115" fill="#64748b" fontSize="10" textAnchor="middle">Mai (80k)</text>
                  <text x="490" y="115" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Atual (79.2k)</text>
                </svg>
              </div>
            </div>

            {/* Photos Before / After */}
            <div className="p-5 rounded-2xl bg-[#0B1324] border border-slate-800 space-y-4">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <User className="w-4 h-4 text-cyan-400" />
                Comparativo de Fotos de Avaliação
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 text-center">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                    <img
                      src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=400"
                      alt="Antes"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-bold text-slate-300">
                      Janeiro (88kg)
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Foto Inicial</span>
                </div>

                <div className="space-y-1.5 text-center">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-cyan-500/50 bg-slate-900 shadow-lg shadow-cyan-500/10">
                    <img
                      src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400"
                      alt="Atual"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-cyan-500 text-[10px] font-bold text-black">
                      Hoje (79.2kg)
                    </span>
                  </div>
                  <span className="text-xs text-cyan-400 font-bold">Foto Atual</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: DIETA & ÁGUA ================= */}
        {activeTab === 'dieta' && (
          <div className="space-y-6">
            {/* Water Tracker */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#0B1324] to-cyan-950/40 border border-blue-500/30 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-400" />
                  <div>
                    <h4 className="font-bold text-sm text-white">Registro de Hidratação Diária</h4>
                    <p className="text-xs text-slate-400">Meta: 3.000ml (3 Litros de água por dia)</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-blue-400">{waterGlasses * 250} ml</span>
                  <span className="text-xs text-slate-400 block">de 3000 ml</span>
                </div>
              </div>

              {/* Water Cups */}
              <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
                {Array.from({ length: totalWaterGoal }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setWaterGlasses(i < waterGlasses ? i : i + 1)}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${
                      i < waterGlasses
                        ? 'bg-blue-500 text-black shadow-md shadow-blue-500/30 scale-105'
                        : 'bg-slate-900 border border-slate-800 text-slate-600 hover:text-blue-400'
                    }`}
                    title={`${(i + 1) * 250}ml`}
                  >
                    <Droplets className="w-4 h-4" />
                    <span className="text-[9px] font-bold mt-0.5">250ml</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Macros summary */}
            <div className="p-5 rounded-2xl bg-[#0B1324] border border-slate-800 space-y-4">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Utensils className="w-4 h-4 text-cyan-400" />
                Macronutrientes Prescritos pelo Mário
              </h4>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-xs text-slate-400">Proteína</span>
                  <p className="text-lg font-extrabold text-cyan-400 mt-1">180g</p>
                  <span className="text-[10px] text-slate-500">2.2g / kg</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-xs text-slate-400">Carboidratos</span>
                  <p className="text-lg font-extrabold text-amber-400 mt-1">210g</p>
                  <span className="text-[10px] text-slate-500">Ciclo de Carbos</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-xs text-slate-400">Gorduras</span>
                  <p className="text-lg font-extrabold text-emerald-400 mt-1">55g</p>
                  <span className="text-[10px] text-slate-500">Gorduras boas</span>
                </div>
              </div>

              {/* Meals schedule */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-cyan-400">Refeição 1 (Café da Manhã) • 08:00</span>
                    <p className="text-xs text-slate-200 mt-0.5">3 Ovos inteiros + 60g de Aveia + 1 Banana + Café sem açúcar</p>
                  </div>
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-cyan-400">Refeição 2 (Almoço) • 12:30</span>
                    <p className="text-xs text-slate-200 mt-0.5">180g de Filé de Frango Grelhado + 150g de Arroz + Salada verde à vontade</p>
                  </div>
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-amber-400">Refeição 3 (Pré-Treino) • 16:30</span>
                    <p className="text-xs text-slate-200 mt-0.5">30g Whey Protein + 150g Doce de Leite ou Maçã + 3g Creatina</p>
                  </div>
                  <Circle className="w-5 h-5 text-slate-600 shrink-0" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: CHAT COM MÁRIO ================= */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-[480px]">
            {/* Header chat info */}
            <div className="p-3 rounded-t-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=200"
                  alt="Mário Czarnobai"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white flex items-center gap-1.5">
                  Mário Czarnobai
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                </h4>
                <p className="text-[10px] text-emerald-400">● Responderá em poucos instantes</p>
              </div>
            </div>

            {/* Message History */}
            <div className="flex-1 p-4 bg-[#091120] border-x border-slate-800 overflow-y-auto space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Quick questions chips */}
            <div className="p-2 bg-slate-900/90 border-x border-slate-800 flex gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => handleSendMessage('Mário, como posso substituir a extensão de joelhos?')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] whitespace-nowrap border border-slate-700"
              >
                ❓ Substituição de Exercício
              </button>
              <button
                onClick={() => handleSendMessage('Mário, posso aumentar a carga no Supino hoje?')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] whitespace-nowrap border border-slate-700"
              >
                💪 Dúvida de Carga
              </button>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-slate-900 border border-slate-800 rounded-b-2xl flex gap-2"
            >
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Escreva sua mensagem para o Mário..."
                className="flex-1 bg-slate-800 text-xs text-white placeholder-slate-400 px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-black font-bold text-xs flex items-center gap-1 hover:opacity-90 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Enviar</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Celebratory Modal when workout is completed */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0C1527] border border-cyan-500/50 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto text-2xl animate-bounce">
              🔥
            </div>
            <h3 className="text-2xl font-extrabold text-white">TREINO CONCLUÍDO!</h3>
            <p className="text-xs text-slate-300">
              Parabéns Lucas! Seu treino foi salvo com sucesso. Você acumulou <strong>{streakDays} dias de consistência</strong> ininterruptos!
            </p>

            <div className="p-3 rounded-2xl bg-cyan-950/50 border border-cyan-800 text-cyan-300 text-xs font-semibold">
              Mário Czarnobai foi notificado e já registrou seu progresso de hoje.
            </div>

            <button
              onClick={() => setShowCelebration(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-sm tracking-wide uppercase shadow-lg"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
