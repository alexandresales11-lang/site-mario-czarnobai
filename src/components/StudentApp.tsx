import React, { useState, useEffect } from 'react';
import {
  Dumbbell, Play, CheckCircle2, Circle, Clock, Flame, Award,
  Droplets, Utensils, MessageSquare, Send, ArrowLeft, Download,
  TrendingDown, Calendar, ChevronRight, RotateCcw, User, Sparkles,
  Smartphone, ShieldCheck, Check, Plus, BarChart2, CheckSquare,
  Lock, Mail, Phone, Eye, EyeOff, LogOut, UserPlus, LogIn, AlertCircle, ArrowRight,
  Camera, Upload, X, Image as ImageIcon, Trash2
} from 'lucide-react';
import { AdminPanel, DietPlan } from './AdminPanel';

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

interface UserAccount {
  name: string;
  email: string;
  password: string;
  phone?: string;
  goal: string;
  photo: string;
  streak: number;
  waterGlasses: number;
  exercises: Record<string, Exercise[]>;
  messages: ChatMessage[];
  planName?: string;
  paymentStatus?: 'pago' | 'pendente' | 'vencendo';
  paymentDueDate?: string;
  dietPlan?: DietPlan;
  marioNotes?: string;
  statusBadge?: 'focado' | 'inconstante' | 'atencao';
  isAdmin?: boolean;
}

// Clean Default Exercises (All 0% Completed initially)
const DEFAULT_CLEAN_EXERCISES: Record<string, Exercise[]> = {
  A: [
    {
      id: 'e1',
      name: 'Supino Inclinado c/ Halteres',
      muscle: 'Peitoral Superior',
      sets: '4 séries',
      reps: '10 - 12 reps',
      weight: 20,
      restSeconds: 60,
      completed: false,
      notes: 'Manter cotovelos a 45º e escápulas fechadas',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'e2',
      name: 'Crossover na Polia Alta',
      muscle: 'Peitoral Inferior / Miolo',
      sets: '4 séries',
      reps: '12 - 15 reps',
      weight: 20,
      restSeconds: 45,
      completed: false,
      notes: 'Pico de contração de 1 seg embaixo',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'e3',
      name: 'Desenvolvimento c/ Halteres',
      muscle: 'Ombros (Deltoide Anterior)',
      sets: '4 séries',
      reps: '10 reps',
      weight: 16,
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
      weight: 10,
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
      weight: 25,
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
      weight: 45,
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
      weight: 50,
      restSeconds: 75,
      completed: false,
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'eb3',
      name: 'Rosca Direta c/ Barra W',
      muscle: 'Bíceps',
      sets: '4 séries',
      reps: '12 reps',
      weight: 20,
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
      weight: 70,
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
      weight: 160,
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
      weight: 35,
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
      weight: 10,
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
};

// Demo User Exercises with sample progress
const DEMO_EXERCISES = JSON.parse(JSON.stringify(DEFAULT_CLEAN_EXERCISES));
DEMO_EXERCISES.A[0].completed = true;
DEMO_EXERCISES.A[0].weight = 28;
DEMO_EXERCISES.A[1].completed = true;
DEMO_EXERCISES.A[1].weight = 25;

const getStoredAccounts = (): Record<string, UserAccount> => {
  const saved = localStorage.getItem('czarnobai_accounts_db_v3');
  let loadedAccounts: Record<string, UserAccount> = {};
  if (saved) {
    try {
      loadedAccounts = JSON.parse(saved);
    } catch (e) {
      // fallback
    }
  }

  // Ensure Admin Personal Mario Czarnobai account always exists
  const marioEmail = 'mario@czarnobai.com';
  if (!loadedAccounts[marioEmail]) {
    loadedAccounts[marioEmail] = {
      name: 'Mário Czarnobai',
      email: marioEmail,
      password: '123456789',
      phone: '(41) 99999-0000',
      goal: 'Personal Trainer & Head Coach',
      photo: 'https://i.imgur.com/FVHkZ7T.png',
      streak: 365,
      waterGlasses: 12,
      exercises: DEFAULT_CLEAN_EXERCISES,
      messages: [],
      isAdmin: true,
      planName: 'Coordenador & Personal'
    };
  } else {
    loadedAccounts[marioEmail].isAdmin = true;
    loadedAccounts[marioEmail].password = '123456789';
  }

  // Ensure Alexandre Sales account exists
  const alexandreEmail = 'alexandre.sales@email.com';
  if (!loadedAccounts[alexandreEmail]) {
    loadedAccounts[alexandreEmail] = {
      name: 'Alexandre Sales',
      email: alexandreEmail,
      password: '123',
      phone: '(74) 99812-3456',
      goal: 'Hipertrofia & Definição',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      streak: 12,
      waterGlasses: 9,
      exercises: DEMO_EXERCISES,
      planName: 'Consultoria V.I.P. Trimestral',
      paymentStatus: 'pago',
      paymentDueDate: '15/09/2026',
      statusBadge: 'focado',
      marioNotes: 'Aluno extremamente focado. Ótima evolução no supino e agachamento. Manter carga progressiva.',
      dietPlan: {
        calories: 2600,
        proteinGrams: 180,
        carbsGrams: 260,
        fatGrams: 65,
        meals: [
          {
            id: 'm1',
            time: '08:00',
            title: 'Refeição 1 (Café da Manhã)',
            description: '3 Ovos inteiros + 60g de Aveia + 1 Banana + Café sem açúcar'
          },
          {
            id: 'm2',
            time: '12:30',
            title: 'Refeição 2 (Almoço)',
            description: '180g de Filé de Frango Grelhado + 150g de Arroz integral + Salada verde à vontade'
          },
          {
            id: 'm3',
            time: '16:30',
            title: 'Refeição 3 (Pré-Treino)',
            description: '200g de Batata Doce + 150g de Frango desfiado ou 30g de Whey'
          },
          {
            id: 'm4',
            time: '20:30',
            title: 'Refeição 4 (Jantar pós-treino)',
            description: '200g de Patinho moído + 150g de Arroz + Salada com azeite de oliva'
          }
        ],
        supplementation: 'Creatina 5g pós-treino + Whey Protein 30g + Multivitamínico'
      },
      messages: [
        {
          id: 'm1',
          sender: 'mario',
          text: 'Fala Alexandre! Atualizei sua ficha com os novos aumentos de carga no Supino Inclinado e Leg Press. Dá uma olhada e me avisa se tiver qualquer dúvida!',
          time: '08:30'
        },
        {
          id: 'm2',
          sender: 'user',
          text: 'Show Mário, vi aqui! Vou mandar ver no treino A hoje a tarde. Tamo junto!',
          time: '09:15'
        }
      ]
    };
  }

  // Ensure Lucas Mendes account exists
  const lucasEmail = 'lucas.mendes@email.com';
  if (!loadedAccounts[lucasEmail]) {
    loadedAccounts[lucasEmail] = {
      name: 'Lucas Mendes',
      email: lucasEmail,
      password: '123',
      phone: '(11) 98765-4321',
      goal: 'Hipertrofia & Definição',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      streak: 14,
      waterGlasses: 8,
      exercises: DEMO_EXERCISES,
      planName: 'Consultoria V.I.P. Mensal',
      paymentStatus: 'pago',
      paymentDueDate: '10/08/2026',
      statusBadge: 'focado',
      messages: [
        {
          id: 'm1',
          sender: 'mario',
          text: 'Fala Lucas! Tudo pronto para o treino de hoje? Qualquer dúvida estou por aqui!',
          time: '08:30'
        }
      ]
    };
  }

  // Ensure Ricardo Santos (Aluno focado) account exists
  const ricardoEmail = 'ricardo.santos@email.com';
  if (!loadedAccounts[ricardoEmail]) {
    loadedAccounts[ricardoEmail] = {
      name: 'Ricardo Santos',
      email: ricardoEmail,
      password: '123',
      phone: '(11) 98111-2233',
      goal: 'Emagrecimento & Definição',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      streak: 18,
      waterGlasses: 10,
      exercises: DEMO_EXERCISES,
      planName: 'Consultoria V.I.P. Trimestral',
      paymentStatus: 'pago',
      paymentDueDate: '20/09/2026',
      statusBadge: 'focado',
      marioNotes: 'Excelente evolução no protocolo de emagrecimento. Manter déficit calórico leve e constância.',
      dietPlan: {
        calories: 2200,
        proteinGrams: 190,
        carbsGrams: 180,
        fatGrams: 55,
        meals: [
          { id: 'm1', time: '08:00', title: 'Refeição 1 (Café)', description: '3 Ovos + 40g Aveia + Café preto' },
          { id: 'm2', time: '12:30', title: 'Refeição 2 (Almoço)', description: '200g Frango + 100g Arroz + Salada' }
        ],
        supplementation: 'Creatina 5g + Cafeína pré-treino'
      },
      messages: [
        { id: 'm1', sender: 'mario', text: 'Parabéns Ricardo! Perdeu 3kg com ótima preservação de massa magra!', time: '10:00' }
      ]
    };
  }

  // Ensure Juliana Mendes (Aluna em inconstância) account exists
  const julianaEmail = 'juliana.mendes@email.com';
  if (!loadedAccounts[julianaEmail]) {
    loadedAccounts[julianaEmail] = {
      name: 'Juliana Mendes',
      email: julianaEmail,
      password: '123',
      phone: '(21) 98222-3344',
      goal: 'Definição & Ganho de Massa',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      streak: 2,
      waterGlasses: 4,
      exercises: DEFAULT_CLEAN_EXERCISES,
      planName: 'Consultoria V.I.P. Semestral',
      paymentStatus: 'pago',
      paymentDueDate: '10/10/2026',
      statusBadge: 'inconstante',
      marioNotes: 'Apresenta algumas faltas na semana. Ajustar horários de treino para o período noturno.',
      dietPlan: {
        calories: 1900,
        proteinGrams: 140,
        carbsGrams: 190,
        fatGrams: 50,
        meals: [
          { id: 'm1', time: '08:00', title: 'Refeição 1', description: '2 Ovos + 1 Tapioca com Queijo Minas' }
        ],
        supplementation: 'Whey Protein 30g'
      },
      messages: [
        { id: 'm1', sender: 'mario', text: 'Oi Juliana, mandei sua nova ficha no app! Tente manter a frequência nesta semana.', time: '14:20' }
      ]
    };
  }

  // Ensure Mariana Costa (Aluno em inconstância) account exists
  const marianaEmail = 'mariana.costa@email.com';
  if (!loadedAccounts[marianaEmail]) {
    loadedAccounts[marianaEmail] = {
      name: 'Mariana Costa',
      email: marianaEmail,
      password: '123',
      phone: '(21) 97123-8899',
      goal: 'Tonificação & Perda de Gordura',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      streak: 0,
      waterGlasses: 2,
      exercises: DEFAULT_CLEAN_EXERCISES,
      planName: 'Acompanhamento Mensal',
      paymentStatus: 'pendente',
      paymentDueDate: '30/07/2026',
      statusBadge: 'inconstante',
      marioNotes: 'Faltou aos treinos nos últimos 3 dias. Necessita de cobrança sobre hidratação e constância.',
      messages: [
        {
          id: 'm1',
          sender: 'mario',
          text: 'Oi Mariana! Notei que não registrou seu treino ontem. Ficou alguma dúvida na ficha? Posso adaptar se precisar!',
          time: '18:00'
        }
      ]
    };
  }

  return loadedAccounts;
};

const saveAccountsToStorage = (accounts: Record<string, UserAccount>) => {
  localStorage.setItem('czarnobai_accounts_db_v3', JSON.stringify(accounts));
};

export const StudentApp: React.FC<StudentAppProps> = ({ onCloseApp, onOpenInstallModal }) => {
  // Database of user accounts
  const [accountsDb, setAccountsDb] = useState<Record<string, UserAccount>>(() => getStoredAccounts());

  // Current active logged in user email
  const [currentUserEmail, setCurrentUserEmail] = useState<string>(() => {
    return localStorage.getItem('czarnobai_current_user_email') || '';
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const savedLogin = localStorage.getItem('czarnobai_logged_in') === 'true';
    const savedEmail = localStorage.getItem('czarnobai_current_user_email');
    return savedLogin && !!savedEmail;
  });

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');

  // Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupGoal, setSignupGoal] = useState('Hipertrofia & Definição');

  // Photo Upload Modal State
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [customPhotoInput, setCustomPhotoInput] = useState('');

  // Active User Account Object
  const currentAcc = (currentUserEmail && accountsDb[currentUserEmail.toLowerCase()]) || {
    name: 'Aluno Mário Czarnobai',
    email: currentUserEmail,
    password: '',
    goal: 'Hipertrofia & Definição',
    photo: '',
    streak: 0,
    waterGlasses: 0,
    exercises: JSON.parse(JSON.stringify(DEFAULT_CLEAN_EXERCISES)),
    messages: []
  };

  // Synchronized active state variables
  const [userProfile, setUserProfile] = useState({
    name: currentAcc.name,
    email: currentAcc.email,
    goal: currentAcc.goal,
    photo: currentAcc.photo
  });
  const [streakDays, setStreakDays] = useState(currentAcc.streak);
  const [waterGlasses, setWaterGlasses] = useState(currentAcc.waterGlasses);
  const [exercises, setExercises] = useState<Record<string, Exercise[]>>(currentAcc.exercises);
  const [messages, setMessages] = useState<ChatMessage[]>(currentAcc.messages);

  // Sync state whenever currentUserEmail or accountsDb changes
  useEffect(() => {
    if (currentUserEmail && accountsDb[currentUserEmail.toLowerCase()]) {
      const acc = accountsDb[currentUserEmail.toLowerCase()];
      setUserProfile({
        name: acc.name,
        email: acc.email,
        goal: acc.goal,
        photo: acc.photo
      });
      setStreakDays(acc.streak);
      setWaterGlasses(acc.waterGlasses);
      setExercises(acc.exercises || JSON.parse(JSON.stringify(DEFAULT_CLEAN_EXERCISES)));
      setMessages(acc.messages || []);
    }
  }, [currentUserEmail, isLoggedIn, accountsDb]);

  // Real-time synchronization across devices via Express API and localStorage fallback
  useEffect(() => {
    let isMounted = true;

    // Fetch latest accounts from central server
    const fetchServerAccounts = async () => {
      try {
        const res = await fetch('/api/accounts');
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data === 'object' && isMounted) {
            setAccountsDb(data);
            saveAccountsToStorage(data);
          }
        }
      } catch (e) {
        // fallback to localStorage if offline
        const latestAccounts = getStoredAccounts();
        if (isMounted) setAccountsDb(latestAccounts);
      }
    };

    fetchServerAccounts();

    // Poll every 1.5s to get instant cross-device updates (PC <-> Mobile)
    const intervalId = setInterval(fetchServerAccounts, 1500);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  // Sync update to server & localStorage
  const syncAccountsWithServer = async (newDb: Record<string, UserAccount>) => {
    saveAccountsToStorage(newDb);
    try {
      await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDb)
      });
    } catch (e) {
      console.error('Failed to sync with server:', e);
    }
  };

  // Persist state updates to user's account in storage and backend server
  const updateCurrentAccountInStorage = (updatedFields: Partial<UserAccount>) => {
    if (!currentUserEmail) return;
    const key = currentUserEmail.toLowerCase();
    setAccountsDb(prev => {
      const acc = prev[key] || { ...currentAcc };
      const newAcc = { ...acc, ...updatedFields };
      const newDb = { ...prev, [key]: newAcc };
      
      saveAccountsToStorage(newDb);

      fetch(`/api/accounts/${encodeURIComponent(key)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAcc)
      }).catch(e => console.error('Error PUTting account update:', e));

      return newDb;
    });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccessMsg('');

    const cleanInput = loginEmail.trim().toLowerCase();
    const cleanPass = loginPassword.trim();

    if (!cleanInput || !cleanPass) {
      setAuthError('Por favor, informe seu e-mail ou usuário e a senha.');
      return;
    }

    // Find account in live accountsDb from server or fallback getStoredAccounts
    const allAccounts = Object.keys(accountsDb).length > 0 ? accountsDb : getStoredAccounts();
    const foundAcc = Object.values(allAccounts).find(
      a =>
        a.email.toLowerCase() === cleanInput ||
        a.name.toLowerCase().includes(cleanInput) ||
        (a.isAdmin && (cleanInput === 'admmario' || cleanInput === 'mario'))
    );

    if (!foundAcc) {
      setAuthError('Conta não encontrada! Verifique o e-mail/usuário ou faça seu cadastro.');
      return;
    }

    const isValidPassword =
      foundAcc.password === cleanPass ||
      (foundAcc.isAdmin && (cleanPass === '123456789' || cleanPass === 'admin'));

    if (!isValidPassword) {
      setAuthError('Senha incorreta! Digite a senha cadastrada para este usuário.');
      return;
    }

    // Login Successful
    const accEmailKey = foundAcc.email.toLowerCase();
    localStorage.setItem('czarnobai_logged_in', 'true');
    localStorage.setItem('czarnobai_current_user_email', accEmailKey);
    setCurrentUserEmail(accEmailKey);
    setAccountsDb(allAccounts);
    setIsLoggedIn(true);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccessMsg('');

    const cleanName = signupName.trim();
    const cleanEmail = signupEmail.trim().toLowerCase();
    const cleanPass = signupPassword.trim();

    if (!cleanName || !cleanEmail || !cleanPass) {
      setAuthError('Preencha seu nome, e-mail e crie uma senha.');
      return;
    }

    if (cleanPass.length < 3) {
      setAuthError('A senha precisa ter pelo menos 3 caracteres.');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setAuthError('As senhas não coincidem. Digite novamente.');
      return;
    }

    const allAccounts = getStoredAccounts();
    if (allAccounts[cleanEmail]) {
      setAuthError('Este e-mail já está cadastrado. Entre com suas credenciais na aba Entrar.');
      return;
    }

    // Create fresh NEW account (starting 0% completed, no photo)
    const newAcc: UserAccount = {
      name: cleanName,
      email: cleanEmail,
      password: cleanPass,
      phone: signupPhone.trim(),
      goal: signupGoal,
      photo: '', // Starts completely EMPTY with no photo!
      streak: 0, // 0 days streak
      waterGlasses: 0,
      exercises: JSON.parse(JSON.stringify(DEFAULT_CLEAN_EXERCISES)), // 0% completed
      messages: [
        {
          id: 'm0',
          sender: 'mario',
          text: `Seja muito bem-vindo(a) à Consultoria, ${cleanName}! Sou o Mário Czarnobai. Sua ficha de treino para ${signupGoal} está pronta abaixo. Bons treinos!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    allAccounts[cleanEmail] = newAcc;
    syncAccountsWithServer(allAccounts);
    setAccountsDb(allAccounts);

    localStorage.setItem('czarnobai_logged_in', 'true');
    localStorage.setItem('czarnobai_current_user_email', cleanEmail);
    setCurrentUserEmail(cleanEmail);

    setAuthSuccessMsg('Conta criada com sucesso! Acessando seu perfil do zero...');
    setTimeout(() => {
      setIsLoggedIn(true);
      setAuthSuccessMsg('');
    }, 600);
  };

  const handleQuickAdminLogin = () => {
    const allAccounts = getStoredAccounts();
    const marioKey = 'mario@czarnobai.com';
    localStorage.setItem('czarnobai_logged_in', 'true');
    localStorage.setItem('czarnobai_current_user_email', marioKey);
    setCurrentUserEmail(marioKey);
    setAccountsDb(allAccounts);
    setIsLoggedIn(true);
  };

  const handleQuickAlexandreLogin = () => {
    const allAccounts = getStoredAccounts();
    const alexandreKey = 'alexandre.sales@email.com';
    localStorage.setItem('czarnobai_logged_in', 'true');
    localStorage.setItem('czarnobai_current_user_email', alexandreKey);
    setCurrentUserEmail(alexandreKey);
    setAccountsDb(allAccounts);
    setIsLoggedIn(true);
  };

  const handleQuickDemoLogin = () => {
    const allAccounts = getStoredAccounts();
    const demoKey = 'lucas.mendes@email.com';
    if (!allAccounts[demoKey]) {
      allAccounts[demoKey] = {
        name: 'Lucas Mendes',
        email: demoKey,
        password: '123',
        goal: 'Hipertrofia & Definição',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        streak: 14,
        waterGlasses: 8,
        exercises: DEMO_EXERCISES,
        messages: [
          { id: 'm1', sender: 'mario', text: 'Fala Lucas! Tudo pronto para o treino?', time: '08:30' }
        ]
      };
      saveAccountsToStorage(allAccounts);
    }

    localStorage.setItem('czarnobai_logged_in', 'true');
    localStorage.setItem('czarnobai_current_user_email', demoKey);
    setCurrentUserEmail(demoKey);
    setAccountsDb(allAccounts);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('czarnobai_logged_in');
    localStorage.removeItem('czarnobai_current_user_email');
    localStorage.removeItem('czarnobai_admin_viewing_student');
    setCurrentUserEmail('');
    setIsLoggedIn(false);
  };

  // Photo Update Functions
  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Foto muito grande! Escolha um arquivo de até 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        saveNewPhoto(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveNewPhoto = (photoUrl: string) => {
    setUserProfile(prev => ({ ...prev, photo: photoUrl }));
    updateCurrentAccountInStorage({ photo: photoUrl });
    setShowPhotoModal(false);
    setCustomPhotoInput('');
  };

  const [activeTab, setActiveTab] = useState<'treinos' | 'evolucao' | 'dieta' | 'chat'>('treinos');
  const [selectedWorkout, setSelectedWorkout] = useState<string>('A');

  // Timer state
  const [activeTimer, setActiveTimer] = useState<{ exerciseId: string; seconds: number; total: number } | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Streak state
  const [workoutCompletedToday, setWorkoutCompletedToday] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

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
      const currentList = prev[selectedWorkout] || [];
      const updated = currentList.map((ex) => (ex.id === id ? { ...ex, completed: !ex.completed } : ex));
      const newExercises = { ...prev, [selectedWorkout]: updated };
      updateCurrentAccountInStorage({ exercises: newExercises });
      return newExercises;
    });
  };

  const handleWeightChange = (id: string, newWeight: number) => {
    setExercises((prev) => {
      const currentList = prev[selectedWorkout] || [];
      const updated = currentList.map((ex) => (ex.id === id ? { ...ex, weight: newWeight } : ex));
      const newExercises = { ...prev, [selectedWorkout]: updated };
      updateCurrentAccountInStorage({ exercises: newExercises });
      return newExercises;
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
    const newStreak = streakDays + 1;
    setStreakDays(newStreak);
    updateCurrentAccountInStorage({ streak: newStreak });
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

    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    updateCurrentAccountInStorage({ messages: newMsgs });
    if (!textToSend) setInputMsg('');

    // Simulate Mário reply after 1.2s
    setTimeout(() => {
      let replyText = 'Excelente pergunta! ';
      if (msgText.toLowerCase().includes('substituir') || msgText.toLowerCase().includes('extensora')) {
        replyText += 'Para substituir a extensão de joelhos sem aparelho, você pode fazer o Agachamento Sissy ou Afundo com halteres focando na amplitude!';
      } else if (msgText.toLowerCase().includes('carga') || msgText.toLowerCase().includes('peso')) {
        replyText += 'Show! Pode registrar no aplicativo a carga que você conseguiu realizar com boa técnica. Se fizer mais de 12 repetições, pode subir 2kg no próximo treino!';
      } else {
        replyText += 'Recebi seu recado! Continue focado na execução dos movimentos e lembre-se da hidratação durante o treino.';
      }

      const marioMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'mario',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => {
        const updated = [...prev, marioMsg];
        updateCurrentAccountInStorage({ messages: updated });
        return updated;
      });
    }, 1200);
  };

  const currentWorkoutList = exercises[selectedWorkout] || [];
  const completedCount = currentWorkoutList.filter((e) => e.completed).length;
  const progressPercent = currentWorkoutList.length > 0
    ? Math.round((completedCount / currentWorkoutList.length) * 100)
    : 0;

  // Render Login / Signup screen if not logged in
  if (!isLoggedIn) {
    return (
      <div className="w-full max-w-md mx-auto bg-[#070C16] border border-cyan-900/50 rounded-3xl shadow-2xl overflow-hidden font-sans text-slate-100 p-6 sm:p-8 my-auto animate-fadeIn">
        {/* Top Header */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-3">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-xl shadow-cyan-500/30 overflow-hidden mx-auto">
              <img
                src="https://i.imgur.com/FVHkZ7T.png"
                alt="Mário Czarnobai"
                className="w-full h-full object-cover object-top rounded-[14px]"
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
                  onClick={() => alert('Para redefinir sua senha, solicite pelo suporte do WhatsApp com Mário Czarnobai.')}
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

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <span>ENTRAR NA MINHA CONTA</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Demo Access Buttons for Real-time Testing */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <span className="block text-[11px] font-bold text-slate-400 text-center uppercase tracking-wider">
                ⚡ Acesso Rápido de Teste
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleQuickAdminLogin}
                  className="px-3 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Entrar p/ Mário (ADM)</span>
                </button>
                <button
                  type="button"
                  onClick={handleQuickAlexandreLogin}
                  className="px-3 py-2 rounded-xl bg-blue-950/80 hover:bg-blue-900 border border-blue-500/40 text-blue-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span>Entrar p/ Alexandre</span>
                </button>
              </div>
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
                  placeholder="(74) 90000-0000"
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
                <option value="Hipertrofia & Definição">Hipertrofia & Definição</option>
                <option value="Emagrecimento & Queima de Gordura">Emagrecimento & Queima de Gordura</option>
                <option value="Ganho de Massa Muscular">Ganho de Massa Muscular</option>
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
              <span>CRIAR CONTA E ACESSAR</span>
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
      </div>
    );
  }

  // Render Admin Panel for Personal Trainer Mário
  if (currentAcc.isAdmin) {
    return (
      <AdminPanel
        accountsDb={accountsDb}
        onUpdateAccounts={(updatedDb) => {
          setAccountsDb(updatedDb);
          syncAccountsWithServer(updatedDb);
        }}
        onDeleteStudent={(email) => {
          const lowerEmail = email.toLowerCase().trim();
          const newDb = { ...accountsDb };
          delete newDb[lowerEmail];
          setAccountsDb(newDb);
          saveAccountsToStorage(newDb);
          fetch(`/api/accounts/${encodeURIComponent(lowerEmail)}`, {
            method: 'DELETE'
          }).catch(e => console.error('Failed to delete student from server:', e));
        }}
        onLogoutAdmin={handleLogout}
        onSwitchToStudentView={(studentEmail) => {
          localStorage.setItem('czarnobai_admin_viewing_student', 'true');
          setCurrentUserEmail(studentEmail.toLowerCase());
        }}
        onCloseApp={onCloseApp}
      />
    );
  }

  const isAdminViewingStudent = localStorage.getItem('czarnobai_admin_viewing_student') === 'true';

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#070C16] border border-cyan-900/50 rounded-3xl shadow-2xl overflow-hidden font-sans text-slate-100 min-h-[750px] flex flex-col relative">
      {/* Admin Mode Quick Switch Banner (Only visible when Admin Mario is inspecting a student) */}
      {isAdminViewingStudent && (
        <div className="bg-gradient-to-r from-cyan-950 via-[#0C172B] to-cyan-950 border-b border-cyan-500/30 px-4 py-2 text-center flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-cyan-300">
          <div className="flex flex-wrap items-center justify-between w-full">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Você está visualizando o app do aluno: <strong className="text-white">{userProfile.name}</strong></span>
              {currentAcc.planName && (
                <span className="hidden sm:inline px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/40">
                  {currentAcc.planName}
                </span>
              )}
            </span>
            <button
              onClick={() => {
                localStorage.removeItem('czarnobai_admin_viewing_student');
                setCurrentUserEmail('mario@czarnobai.com');
              }}
              className="px-3 py-1 rounded-xl bg-cyan-500 text-black font-extrabold text-[10px] uppercase hover:bg-cyan-400 transition-colors shadow-md"
            >
              👑 Voltar ao Painel do Personal
            </button>
          </div>
        </div>
      )}

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

          {/* User Profile Avatar with Edit Photo Modal Trigger */}
          <div
            className="relative group cursor-pointer"
            onClick={() => setShowPhotoModal(true)}
            title="Clique para alterar foto de perfil"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 overflow-hidden flex items-center justify-center bg-slate-900">
              {userProfile.photo ? (
                <img
                  src={userProfile.photo}
                  alt={userProfile.name}
                  className="w-full h-full object-cover rounded-[14px]"
                />
              ) : (
                <div className="w-full h-full rounded-[14px] bg-slate-800 flex items-center justify-center text-cyan-400 font-extrabold text-sm border border-cyan-500/30">
                  {userProfile.name
                    ? userProfile.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
                    : 'AL'}
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-cyan-500 text-black p-1 rounded-full shadow border border-[#070C16] hover:scale-110 transition-transform">
              <Camera className="w-3 h-3 stroke-[2.5]" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base">{userProfile.name}</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 uppercase">
                Aluno V.I.P.
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Objetivo: {userProfile.goal}</span>
              <button
                onClick={() => setShowPhotoModal(true)}
                className="text-[11px] text-cyan-400 font-semibold hover:underline flex items-center gap-1"
              >
                <Camera className="w-3 h-3" />
                <span>Foto</span>
              </button>
            </div>
          </div>
        </div>

        {/* Badges, Logout & Install Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>{streakDays} dias de ofensiva</span>
          </div>

          {/* LOGOUT BUTTON - Explicit "SAIR" Button */}
          <button
            onClick={handleLogout}
            title="Sair da Conta"
            className="px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition-all flex items-center gap-1.5 text-xs font-bold shadow-md shrink-0 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-400 stroke-[2.5]" />
            <span className="text-rose-200 font-bold">Sair</span>
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

      {/* PHOTO UPLOAD / EDIT MODAL */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0C172B] border border-cyan-500/30 rounded-3xl max-w-sm w-full p-6 relative text-slate-100 shadow-2xl">
            <button
              onClick={() => setShowPhotoModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-5">
              <div className="w-20 h-20 rounded-2xl bg-slate-800 border-2 border-cyan-500/50 mx-auto mb-3 overflow-hidden flex items-center justify-center">
                {userProfile.photo ? (
                  <img src={userProfile.photo} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-cyan-400" />
                )}
              </div>
              <h3 className="text-lg font-bold text-white">Alterar Foto de Perfil</h3>
              <p className="text-xs text-slate-400">Escolha uma foto do seu celular ou insira um link</p>
            </div>

            <div className="space-y-4">
              {/* Option 1: Choose File */}
              <div>
                <label className="block text-xs font-semibold text-cyan-400 mb-1">
                  1. Escolher imagem do celular / PC
                </label>
                <label className="flex items-center justify-center gap-2 w-full py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 rounded-xl text-cyan-300 font-bold text-xs cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Selecionar Foto do Dispositivo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Option 2: Image URL */}
              <div>
                <label className="block text-xs font-semibold text-cyan-400 mb-1">
                  2. Ou colar link de imagem (URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customPhotoInput}
                    onChange={(e) => setCustomPhotoInput(e.target.value)}
                    placeholder="https://exemplo.com/minha-foto.jpg"
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => {
                      if (customPhotoInput.trim()) {
                        saveNewPhoto(customPhotoInput.trim());
                      }
                    }}
                    className="px-3 py-2 bg-cyan-500 text-black font-bold text-xs rounded-xl hover:bg-cyan-400"
                  >
                    Salvar
                  </button>
                </div>
              </div>

              {/* Option 3: Remove Photo */}
              {userProfile.photo && (
                <button
                  onClick={() => saveNewPhoto('')}
                  className="w-full py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-rose-500/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remover Foto Atual</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0B1324] p-3.5 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 overflow-x-auto pb-1.5 max-w-full scrollbar-none snap-x">
                {(
                  userProfile.exercises && Object.keys(userProfile.exercises).length > 0
                    ? Object.keys(userProfile.exercises)
                    : ['A', 'B', 'C', 'D']
                ).map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setSelectedWorkout(letter)}
                    className={`px-3.5 py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shrink-0 snap-start cursor-pointer ${
                      selectedWorkout === letter
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold shadow-lg shadow-cyan-500/30'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <span>Treino {letter}</span>
                  </button>
                ))}
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Divisão Atual:</span>
                <p className="text-xs font-bold text-cyan-400">
                  {selectedWorkout === 'A' && 'Peitoral, Ombros e Tríceps'}
                  {selectedWorkout === 'B' && 'Costas, Deltoide Post. e Bíceps'}
                  {selectedWorkout === 'C' && 'Membros Inferiores Completo'}
                  {selectedWorkout === 'D' && 'Core & Fortalecimento de Abdômen'}
                  {!['A', 'B', 'C', 'D'].includes(selectedWorkout) && `Ficha Personalizada (${selectedWorkout})`}
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
                {Array.from({ length: 12 }).map((_, i) => (
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
            {(() => {
              const activeDiet = currentAcc.dietPlan || {
                calories: 2600,
                proteinGrams: 180,
                carbsGrams: 210,
                fatGrams: 55,
                meals: [
                  { id: 'm1', time: '08:00', title: 'Refeição 1 (Café da Manhã)', description: '3 Ovos inteiros + 60g de Aveia + 1 Banana + Café sem açúcar' },
                  { id: 'm2', time: '12:30', title: 'Refeição 2 (Almoço)', description: '180g de Filé de Frango Grelhado + 150g de Arroz + Salada verde à vontade' },
                  { id: 'm3', time: '16:30', title: 'Refeição 3 (Pré-Treino)', description: '30g Whey Protein + 150g Doce de Leite ou Maçã + 3g Creatina' }
                ],
                supplementation: 'Creatina 5g pós-treino + Whey Protein 30g'
              };

              return (
                <div className="p-5 rounded-2xl bg-[#0B1324] border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-cyan-400" />
                      Macronutrientes Prescritos pelo Mário
                    </h4>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {activeDiet.calories} kcal / dia
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <span className="text-xs text-slate-400">Proteína</span>
                      <p className="text-lg font-extrabold text-cyan-400 mt-1">{activeDiet.proteinGrams}g</p>
                      <span className="text-[10px] text-slate-500">Massa Magra</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <span className="text-xs text-slate-400">Carboidratos</span>
                      <p className="text-lg font-extrabold text-amber-400 mt-1">{activeDiet.carbsGrams}g</p>
                      <span className="text-[10px] text-slate-500">Energia</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <span className="text-xs text-slate-400">Gorduras</span>
                      <p className="text-lg font-extrabold text-emerald-400 mt-1">{activeDiet.fatGrams}g</p>
                      <span className="text-[10px] text-slate-500">Hormonal</span>
                    </div>
                  </div>

                  {activeDiet.supplementation && (
                    <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span><strong>Suplementação:</strong> {activeDiet.supplementation}</span>
                    </div>
                  )}

                  {/* Meals schedule */}
                  <div className="space-y-2.5 pt-2">
                    {activeDiet.meals.map((meal) => (
                      <div key={meal.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
                        <div>
                          <span className="text-xs font-bold text-cyan-400">{meal.title} • {meal.time}</span>
                          <p className="text-xs text-slate-200 mt-0.5">{meal.description}</p>
                        </div>
                        <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ================= TAB 4: CHAT COM MÁRIO ================= */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-[480px]">
            {/* Header chat info */}
            <div className="p-3 rounded-t-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5">
                <img
                  src="https://i.imgur.com/FVHkZ7T.png"
                  alt="Mário Czarnobai"
                  className="w-full h-full object-cover object-top rounded-full"
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
