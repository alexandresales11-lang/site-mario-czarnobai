import React, { useState } from 'react';
import {
  Users, Dumbbell, Utensils, DollarSign, AlertTriangle, CheckCircle2,
  Plus, Trash2, Edit3, Send, MessageSquare, Flame, Droplets, ShieldCheck,
  Search, ArrowLeft, LogOut, Calendar, Sparkles, Clock, Save, Filter,
  Check, ExternalLink, FileText, ChevronRight, User, Phone, Mail, Award, AlertCircle
} from 'lucide-react';

export interface Exercise {
  id: string;
  name: string;
  muscle: string;
  sets: string;
  reps: string;
  weight: number;
  restSeconds: number;
  completed: boolean;
  notes?: string;
  image?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'mario';
  text: string;
  time: string;
}

export interface MealItem {
  id: string;
  time: string;
  title: string;
  description: string;
}

export interface DietPlan {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  meals: MealItem[];
  supplementation: string;
}

export interface UserAccount {
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

interface AdminPanelProps {
  accountsDb: Record<string, UserAccount>;
  onUpdateAccounts: (updatedDb: Record<string, UserAccount>) => void;
  onLogoutAdmin: () => void;
  onSwitchToStudentView: (email: string) => void;
  onCloseApp?: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  accountsDb,
  onUpdateAccounts,
  onLogoutAdmin,
  onSwitchToStudentView,
  onCloseApp
}) => {
  // Filter & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'alert' | 'pending_payment' | 'focused'>('all');

  // Currently Selected Student for Detailed Editing
  const [selectedStudentEmail, setSelectedStudentEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'treinos' | 'dieta' | 'financeiro' | 'chat'>('treinos');

  // Workout Editing State
  const [editingWorkoutKey, setEditingWorkoutKey] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);
  const [newExName, setNewExName] = useState('');
  const [newExMuscle, setNewExMuscle] = useState('');
  const [newExSets, setNewExSets] = useState('4 séries');
  const [newExReps, setNewExReps] = useState('10 - 12 reps');
  const [newExWeight, setNewExWeight] = useState(20);
  const [newExRest, setNewExRest] = useState(60);
  const [newExNotes, setNewExNotes] = useState('');

  // Add New Student Modal State
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentPhone, setNewStudentPhone] = useState('');
  const [newStudentGoal, setNewStudentGoal] = useState('Hipertrofia & Definição');
  const [newStudentPlan, setNewStudentPlan] = useState('Consultoria V.I.P. Trimestral');

  // Message input state inside admin chat
  const [adminChatMsg, setAdminChatMsg] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Get list of non-admin student accounts
  const studentList = Object.values(accountsDb).filter((acc) => !acc.isAdmin);

  // Stats Counters
  const totalStudents = studentList.length;
  const paidStudents = studentList.filter((s) => s.paymentStatus !== 'pendente').length;
  const alertStudents = studentList.filter(
    (s) => s.statusBadge === 'inconstante' || s.statusBadge === 'atencao' || s.streak === 0
  ).length;

  // Filtered Student List
  const filteredStudents = studentList.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.goal.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'alert') {
      return student.statusBadge === 'inconstante' || student.statusBadge === 'atencao' || student.streak === 0;
    }
    if (filterType === 'pending_payment') {
      return student.paymentStatus === 'pendente';
    }
    if (filterType === 'focused') {
      return student.statusBadge === 'focado' || student.streak > 3;
    }

    return true;
  });

  const selectedStudent = selectedStudentEmail ? accountsDb[selectedStudentEmail.toLowerCase()] : null;

  // Helper to trigger save notification banner
  const notifySaved = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Helper to save account changes to DB
  const saveStudentChanges = (updatedAccount: UserAccount) => {
    const key = updatedAccount.email.toLowerCase();
    const newDb = { ...accountsDb, [key]: updatedAccount };
    onUpdateAccounts(newDb);
  };

  // Handler: Add New Exercise to Selected Student
  const handleAddExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !newExName.trim()) return;

    const newEx: Exercise = {
      id: 'ex_' + Date.now(),
      name: newExName.trim(),
      muscle: newExMuscle.trim() || 'Geral',
      sets: newExSets,
      reps: newExReps,
      weight: Number(newExWeight) || 0,
      restSeconds: Number(newExRest) || 60,
      completed: false,
      notes: newExNotes.trim() || undefined,
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=400'
    };

    const currentExercises = selectedStudent.exercises || {};
    const workoutList = currentExercises[editingWorkoutKey] || [];
    const updatedWorkoutList = [...workoutList, newEx];

    const updatedAcc: UserAccount = {
      ...selectedStudent,
      exercises: {
        ...currentExercises,
        [editingWorkoutKey]: updatedWorkoutList
      }
    };

    saveStudentChanges(updatedAcc);
    setShowAddExerciseModal(false);
    setNewExName('');
    setNewExMuscle('');
    setNewExNotes('');
    notifySaved(`Exercício "${newEx.name}" adicionado ao Treino ${editingWorkoutKey} de ${selectedStudent.name}!`);
  };

  // Handler: Delete Exercise
  const handleDeleteExercise = (workoutKey: string, exId: string) => {
    if (!selectedStudent) return;
    const currentExercises = selectedStudent.exercises || {};
    const workoutList = currentExercises[workoutKey] || [];
    const updatedList = workoutList.filter((e) => e.id !== exId);

    const updatedAcc: UserAccount = {
      ...selectedStudent,
      exercises: {
        ...currentExercises,
        [workoutKey]: updatedList
      }
    };

    saveStudentChanges(updatedAcc);
    notifySaved(`Exercício removido do Treino ${workoutKey}!`);
  };

  // Handler: Update Exercise Weight/Notes
  const handleUpdateExercise = (workoutKey: string, exId: string, field: string, value: any) => {
    if (!selectedStudent) return;
    const currentExercises = selectedStudent.exercises || {};
    const workoutList = currentExercises[workoutKey] || [];
    const updatedList = workoutList.map((ex) => (ex.id === exId ? { ...ex, [field]: value } : ex));

    const updatedAcc: UserAccount = {
      ...selectedStudent,
      exercises: {
        ...currentExercises,
        [workoutKey]: updatedList
      }
    };

    saveStudentChanges(updatedAcc);
  };

  // Handler: Add New Meal to Student's Diet
  const handleAddMeal = (title: string, time: string, description: string) => {
    if (!selectedStudent) return;

    const currentDiet = selectedStudent.dietPlan || {
      calories: 2400,
      proteinGrams: 180,
      carbsGrams: 220,
      fatGrams: 60,
      meals: [],
      supplementation: 'Creatina 5g diárias + Whey Protein 30g pós-treino'
    };

    const newMeal: MealItem = {
      id: 'meal_' + Date.now(),
      title,
      time,
      description
    };

    const updatedDiet: DietPlan = {
      ...currentDiet,
      meals: [...currentDiet.meals, newMeal]
    };

    saveStudentChanges({
      ...selectedStudent,
      dietPlan: updatedDiet
    });

    notifySaved(`Refeição "${title}" adicionada para ${selectedStudent.name}!`);
  };

  // Handler: Remove Meal
  const handleRemoveMeal = (mealId: string) => {
    if (!selectedStudent || !selectedStudent.dietPlan) return;
    const updatedMeals = selectedStudent.dietPlan.meals.filter((m) => m.id !== mealId);
    saveStudentChanges({
      ...selectedStudent,
      dietPlan: {
        ...selectedStudent.dietPlan,
        meals: updatedMeals
      }
    });
    notifySaved('Refeição removida.');
  };

  // Handler: Save Diet Macros
  const handleSaveDietMacros = (
    calories: number,
    proteinGrams: number,
    carbsGrams: number,
    fatGrams: number,
    supplementation: string
  ) => {
    if (!selectedStudent) return;
    const currentDiet = selectedStudent.dietPlan || {
      calories: 2400,
      proteinGrams: 180,
      carbsGrams: 220,
      fatGrams: 60,
      meals: [],
      supplementation: ''
    };

    const updatedDiet: DietPlan = {
      ...currentDiet,
      calories,
      proteinGrams,
      carbsGrams,
      fatGrams,
      supplementation
    };

    saveStudentChanges({
      ...selectedStudent,
      dietPlan: updatedDiet
    });

    notifySaved(`Plano Alimentar e Macronutrientes salvos para ${selectedStudent.name}!`);
  };

  // Handler: Send Message from Mário to Student
  const handleSendAdminMessage = (textToSend?: string) => {
    const text = textToSend || adminChatMsg;
    if (!selectedStudent || !text.trim()) return;

    const newMsg: ChatMessage = {
      id: 'm_' + Date.now(),
      sender: 'mario',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentMsgs = selectedStudent.messages || [];
    const updatedMsgs = [...currentMsgs, newMsg];

    saveStudentChanges({
      ...selectedStudent,
      messages: updatedMsgs
    });

    if (!textToSend) setAdminChatMsg('');
    notifySaved(`Mensagem enviada para o app de ${selectedStudent.name}!`);
  };

  // Handler: Quick Create New Student Account by Mário
  const handleCreateStudentByAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentEmail.trim()) return;

    const emailKey = newStudentEmail.trim().toLowerCase();
    if (accountsDb[emailKey]) {
      alert('Este e-mail já está cadastrado no sistema.');
      return;
    }

    const defaultDiet: DietPlan = {
      calories: 2500,
      proteinGrams: 180,
      carbsGrams: 240,
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
          description: '180g de Peito de Frango + 150g de Arroz integral + Salada à vontade'
        },
        {
          id: 'm3',
          time: '16:30',
          title: 'Refeição 3 (Pré-Treino)',
          description: '1 Maçã + 30g de Whey Protein ou 2 Ovos cozidos'
        },
        {
          id: 'm4',
          time: '20:30',
          title: 'Refeição 4 (Jantar)',
          description: '180g de Carne magra ou Peixe + Batata doce 150g + Salada'
        }
      ],
      supplementation: 'Creatina 5g pós-treino + Multivitamínico pela manhã'
    };

    const newAccount: UserAccount = {
      name: newStudentName.trim(),
      email: emailKey,
      password: '123',
      phone: newStudentPhone.trim(),
      goal: newStudentGoal,
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      streak: 0,
      waterGlasses: 0,
      planName: newStudentPlan,
      paymentStatus: 'pago',
      paymentDueDate: '30 Dias',
      statusBadge: 'focado',
      marioNotes: `Novo aluno cadastrado por Mário Czarnobai em ${new Date().toLocaleDateString('pt-BR')}.`,
      dietPlan: defaultDiet,
      exercises: {
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
            notes: 'Foco na cadência controlada e amplitude total',
            image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=400'
          },
          {
            id: 'e2',
            name: 'Desenvolvimento c/ Halteres',
            muscle: 'Ombros',
            sets: '4 séries',
            reps: '10 - 12 reps',
            weight: 14,
            restSeconds: 60,
            completed: false,
            notes: 'Manter a postura firme e abdômen contraído',
            image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=400'
          }
        ],
        B: [
          {
            id: 'eb1',
            name: 'Puxada Frontal Pegada Aberta',
            muscle: 'Dorsais',
            sets: '4 séries',
            reps: '10 - 12 reps',
            weight: 45,
            restSeconds: 60,
            completed: false,
            image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&q=80&w=400'
          }
        ],
        C: [
          {
            id: 'ec1',
            name: 'Agachamento Livre / Leg Press',
            muscle: 'Quadríceps',
            sets: '4 séries',
            reps: '10 - 12 reps',
            weight: 60,
            restSeconds: 90,
            completed: false,
            image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=400'
          }
        ],
        D: [
          {
            id: 'ed1',
            name: 'Abdominal Supra & Prancha',
            muscle: 'Core',
            sets: '4 séries',
            reps: '15 reps',
            weight: 0,
            restSeconds: 45,
            completed: false,
            image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400'
          }
        ]
      },
      messages: [
        {
          id: 'm0',
          sender: 'mario',
          text: `Seja muito bem-vindo(a) à minha consultoria exclusiva, ${newStudentName}! Configurei sua ficha de treino e plano alimentar inicial no app. Vamos juntos alcançar o seu objetivo!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    onUpdateAccounts({ ...accountsDb, [emailKey]: newAccount });
    setShowAddStudentModal(false);
    setSelectedStudentEmail(emailKey);
    setNewStudentName('');
    setNewStudentEmail('');
    setNewStudentPhone('');
    notifySaved(`Novo aluno ${newAccount.name} cadastrado e liberado no app!`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-[#070C16] border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden font-sans text-slate-100 min-h-[800px] flex flex-col relative animate-fadeIn">
      {/* Save Toast Notification Banner */}
      {saveSuccessMsg && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-black px-5 py-3 rounded-2xl font-bold text-xs shadow-2xl flex items-center gap-2 border border-emerald-300 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 stroke-[2.5]" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Top Professional Header Bar */}
      <div className="bg-gradient-to-r from-[#0C172B] via-[#091122] to-[#0C172B] border-b border-cyan-500/30 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {onCloseApp && (
            <button
              onClick={onCloseApp}
              className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-800"
              title="Voltar ao Site"
            >
              <ArrowLeft className="w-5 h-5 text-cyan-400" />
            </button>
          )}

          {/* Coach Avatar */}
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-cyan-300 p-0.5 shadow-xl shadow-cyan-500/30 overflow-hidden">
              <img
                src="https://i.imgur.com/FVHkZ7T.png"
                alt="Personal Mário Czarnobai"
                className="w-full h-full object-cover object-top rounded-[14px]"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-cyan-400 text-black p-1 rounded-full shadow-md">
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-white text-lg tracking-wide uppercase font-display">
                Mário Czarnobai
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 text-black uppercase tracking-wider shadow-sm">
                PAINEL DO PERSONAL
              </span>
            </div>
            <p className="text-xs text-cyan-400 font-medium mt-0.5 flex items-center gap-2">
              <span>CREF 049281-G/PR</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">Gestão Exclusiva de Alunos</span>
            </p>
          </div>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowAddStudentModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Novo Aluno</span>
          </button>

          <button
            onClick={onLogoutAdmin}
            className="p-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition-colors flex items-center gap-1.5 text-xs font-bold"
            title="Sair da Conta Admin"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span className="hidden sm:inline">Sair Admin</span>
          </button>
        </div>
      </div>

      {/* KPI Dashboard Overview Widgets */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6 bg-[#08101E] border-b border-slate-800">
        <div className="p-4 rounded-2xl bg-[#0C172B] border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Alunos Ativos</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-black text-white">{totalStudents}</p>
          <span className="text-[10px] text-cyan-400 font-semibold">Inscritos no App</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0C172B] border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Mensalidades em Dia</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400">{paidStudents}</p>
          <span className="text-[10px] text-emerald-500 font-semibold">
            {totalStudents > 0 ? Math.round((paidStudents / totalStudents) * 100) : 0}% Adimplência
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0C172B] border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Em Inconstância</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-amber-400">{alertStudents}</p>
          <span className="text-[10px] text-amber-500 font-semibold">Requerem Cobrança</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0C172B] border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Atendimento Rápido</span>
            <MessageSquare className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-black text-blue-400">Canal Direto</p>
          <span className="text-[10px] text-slate-400">WhatsApp & Chat</span>
        </div>
      </div>

      {/* Main Content Split: Student List OR Selected Student Workspace */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col gap-6">
        {selectedStudent ? (
          /* ================= WORKSPACE DO ALUNO SELECIONADO ================= */
          <div className="space-y-6 animate-fadeIn">
            {/* Top Student Header Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0C172B] via-[#091224] to-[#0C172B] border border-cyan-500/40 flex flex-wrap items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedStudentEmail(null)}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors"
                  title="Voltar à Lista de Alunos"
                >
                  <ArrowLeft className="w-5 h-5 text-cyan-400" />
                </button>

                <div className="w-14 h-14 rounded-2xl bg-slate-800 border-2 border-cyan-500/40 overflow-hidden flex items-center justify-center">
                  {selectedStudent.photo ? (
                    <img src={selectedStudent.photo} alt={selectedStudent.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-cyan-400" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-white">{selectedStudent.name}</h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        selectedStudent.statusBadge === 'inconstante' || selectedStudent.streak === 0
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}
                    >
                      {selectedStudent.statusBadge === 'inconstante' || selectedStudent.streak === 0
                        ? '⚠️ Em Inconstância'
                        : '🔥 Focado & Ativo'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-1 flex flex-wrap items-center gap-3">
                    <span className="text-cyan-400 font-medium">Objetivo: {selectedStudent.goal}</span>
                    <span className="text-slate-600">•</span>
                    <span>Plano: {selectedStudent.planName || 'Consultoria V.I.P.'}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-amber-400" />
                      {selectedStudent.streak} dias de ofensiva
                    </span>
                  </p>
                </div>
              </div>

              {/* Quick Actions for Selected Student */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onSwitchToStudentView(selectedStudent.email)}
                  className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Ver Como Aluno</span>
                </button>

                {selectedStudent.phone && (
                  <a
                    href={`https://wa.me/55${selectedStudent.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>

            {/* Sub-Navigation Tabs inside Selected Student Workspace */}
            <div className="flex border-b border-cyan-900/30 bg-[#091222] p-1.5 rounded-2xl gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('treinos')}
                className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'treinos'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-lg shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Dumbbell className="w-4 h-4" />
                <span>1. Ficha de Treinos</span>
              </button>

              <button
                onClick={() => setActiveTab('dieta')}
                className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'dieta'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-lg shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>2. Plano Alimentar</span>
              </button>

              <button
                onClick={() => setActiveTab('financeiro')}
                className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'financeiro'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-lg shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>3. Plano & Notas</span>
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'chat'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-lg shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>4. Mensagens</span>
              </button>
            </div>

            {/* TAB 1: EDIT WORKOUT SHEETS (A, B, C, D) */}
            {activeTab === 'treinos' && (
              <div className="space-y-6">
                {/* Select Workout Sheet Key */}
                <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                  <div className="flex gap-2">
                    {(['A', 'B', 'C', 'D'] as const).map((key) => {
                      const list = selectedStudent.exercises?.[key] || [];
                      return (
                        <button
                          key={key}
                          onClick={() => setEditingWorkoutKey(key)}
                          className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                            editingWorkoutKey === key
                              ? 'bg-cyan-500 text-black font-extrabold shadow-md'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          <span>Treino {key}</span>
                          <span className="px-1.5 py-0.2 text-[10px] rounded bg-black/20 text-current">
                            {list.length} ex
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setShowAddExerciseModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs border border-cyan-500/40 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar Exercício ao Treino {editingWorkoutKey}</span>
                  </button>
                </div>

                {/* Exercises List for current workout sheet */}
                {(!selectedStudent.exercises?.[editingWorkoutKey] ||
                  selectedStudent.exercises[editingWorkoutKey].length === 0) ? (
                  <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-dashed border-slate-800">
                    <Dumbbell className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-300">Nenhum exercício cadastrado no Treino {editingWorkoutKey}</p>
                    <p className="text-xs text-slate-500 mb-4">Monte a sequência de exercícios personalizada para o aluno.</p>
                    <button
                      onClick={() => setShowAddExerciseModal(true)}
                      className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs inline-flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Montar Treino {editingWorkoutKey} Agora</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedStudent.exercises[editingWorkoutKey].map((ex, index) => (
                      <div
                        key={ex.id}
                        className="p-4 rounded-2xl bg-[#0B1324] border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-wrap items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-[240px]">
                          <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 font-extrabold text-xs flex items-center justify-center shrink-0">
                            {index + 1}
                          </span>
                          <div>
                            <h4 className="font-bold text-sm text-white">{ex.name}</h4>
                            <p className="text-xs text-cyan-400 font-medium">{ex.muscle}</p>
                          </div>
                        </div>

                        {/* Editable Parameters */}
                        <div className="flex flex-wrap items-center gap-3">
                          <div>
                            <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Séries / Reps</label>
                            <input
                              type="text"
                              value={ex.sets}
                              onChange={(e) => handleUpdateExercise(editingWorkoutKey, ex.id, 'sets', e.target.value)}
                              className="w-24 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Carga (kg)</label>
                            <input
                              type="number"
                              value={ex.weight}
                              onChange={(e) =>
                                handleUpdateExercise(editingWorkoutKey, ex.id, 'weight', Number(e.target.value))
                              }
                              className="w-20 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-amber-400 font-bold focus:outline-none focus:border-cyan-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Descanso (s)</label>
                            <input
                              type="number"
                              value={ex.restSeconds}
                              onChange={(e) =>
                                handleUpdateExercise(editingWorkoutKey, ex.id, 'restSeconds', Number(e.target.value))
                              }
                              className="w-20 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500"
                            />
                          </div>

                          <button
                            onClick={() => handleDeleteExercise(editingWorkoutKey, ex.id)}
                            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors mt-3"
                            title="Remover exercício"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Tip / Note from Mário */}
                        <div className="w-full pt-2 border-t border-slate-800/80">
                          <label className="block text-[10px] text-cyan-400 font-semibold mb-1">
                            Dica de Execução do Mário para o Aluno:
                          </label>
                          <input
                            type="text"
                            value={ex.notes || ''}
                            onChange={(e) => handleUpdateExercise(editingWorkoutKey, ex.id, 'notes', e.target.value)}
                            placeholder="Ex: Manter escápulas fechadas e cotovelos a 45º..."
                            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: EDIT DIET & MEAL PLAN */}
            {activeTab === 'dieta' && (
              <div className="space-y-6">
                {/* Daily Caloric Target & Macros Form */}
                <div className="p-5 rounded-2xl bg-[#0B1324] border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-cyan-400" />
                    Meta Diária de Macronutrientes (Prescrito pelo Mário)
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Calorias Totais (kcal)</label>
                      <input
                        type="number"
                        id="diet_calories"
                        defaultValue={selectedStudent.dietPlan?.calories || 2400}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-cyan-400 font-black focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Proteínas (g)</label>
                      <input
                        type="number"
                        id="diet_protein"
                        defaultValue={selectedStudent.dietPlan?.proteinGrams || 180}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Carboidratos (g)</label>
                      <input
                        type="number"
                        id="diet_carbs"
                        defaultValue={selectedStudent.dietPlan?.carbsGrams || 220}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-400 font-bold focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Gorduras (g)</label>
                      <input
                        type="number"
                        id="diet_fats"
                        defaultValue={selectedStudent.dietPlan?.fatGrams || 60}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-400 font-bold focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Suplementação Orientada</label>
                    <input
                      type="text"
                      id="diet_supps"
                      defaultValue={
                        selectedStudent.dietPlan?.supplementation ||
                        'Creatina 5g pós-treino + Whey Protein 30g + Multivitamínico'
                      }
                      placeholder="Ex: Creatina 5g pós-treino..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const cal = Number((document.getElementById('diet_calories') as HTMLInputElement)?.value) || 2400;
                      const prot = Number((document.getElementById('diet_protein') as HTMLInputElement)?.value) || 180;
                      const carbs = Number((document.getElementById('diet_carbs') as HTMLInputElement)?.value) || 220;
                      const fats = Number((document.getElementById('diet_fats') as HTMLInputElement)?.value) || 60;
                      const supps = (document.getElementById('diet_supps') as HTMLInputElement)?.value || '';
                      handleSaveDietMacros(cal, prot, carbs, fats, supps);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-cyan-500 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar Macronutrientes</span>
                  </button>
                </div>

                {/* Meals List & Add Meal Form */}
                <div className="p-5 rounded-2xl bg-[#0B1324] border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-white">Refeições do Cardápio ({selectedStudent.name})</h4>
                  </div>

                  <div className="space-y-3">
                    {selectedStudent.dietPlan?.meals && selectedStudent.dietPlan.meals.length > 0 ? (
                      selectedStudent.dietPlan.meals.map((meal) => (
                        <div
                          key={meal.id}
                          className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-cyan-400">{meal.title}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                                {meal.time}
                              </span>
                            </div>
                            <p className="text-xs text-slate-200 mt-1">{meal.description}</p>
                          </div>

                          <button
                            onClick={() => handleRemoveMeal(meal.id)}
                            className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                            title="Remover refeição"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 italic">Nenhuma refeição cadastrada ainda.</p>
                    )}
                  </div>

                  {/* Add New Meal inline form */}
                  <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      id="new_meal_title"
                      placeholder="Título Ex: Refeição 1 (Café)"
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                    <input
                      type="text"
                      id="new_meal_time"
                      placeholder="Horário Ex: 08:00"
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                    <input
                      type="text"
                      id="new_meal_desc"
                      placeholder="Alimentos Ex: 3 Ovos + 60g Aveia + 1 Banana"
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const t = (document.getElementById('new_meal_title') as HTMLInputElement)?.value;
                      const tm = (document.getElementById('new_meal_time') as HTMLInputElement)?.value;
                      const d = (document.getElementById('new_meal_desc') as HTMLInputElement)?.value;
                      if (t && d) {
                        handleAddMeal(t, tm || '08:00', d);
                        (document.getElementById('new_meal_title') as HTMLInputElement).value = '';
                        (document.getElementById('new_meal_desc') as HTMLInputElement).value = '';
                      }
                    }}
                    className="w-full py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs border border-cyan-500/40 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar Refeição ao Plano</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: CONTRACT, PAYMENT STATUS & COACH NOTES */}
            {activeTab === 'financeiro' && (
              <div className="p-6 rounded-2xl bg-[#0B1324] border border-slate-800 space-y-5">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  Status Financeiro, Plano & Observações do Coach Mário
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Plano do Aluno</label>
                    <select
                      value={selectedStudent.planName || 'Consultoria V.I.P. Trimestral'}
                      onChange={(e) =>
                        saveStudentChanges({
                          ...selectedStudent,
                          planName: e.target.value
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Consultoria V.I.P. Trimestral">Consultoria V.I.P. Trimestral</option>
                      <option value="Consultoria V.I.P. Semestral">Consultoria V.I.P. Semestral</option>
                      <option value="Plano Anual Elite">Plano Anual Elite</option>
                      <option value="Acompanhamento Mensal">Acompanhamento Mensal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Status de Pagamento</label>
                    <select
                      value={selectedStudent.paymentStatus || 'pago'}
                      onChange={(e) =>
                        saveStudentChanges({
                          ...selectedStudent,
                          paymentStatus: e.target.value as any
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="pago">🟢 Pago & Ativo (Em Dia)</option>
                      <option value="pendente">🔴 Pendente (Enviar Cobrança)</option>
                      <option value="vencendo">🟡 Próximo Vencimento</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status de Foco do Aluno</label>
                  <select
                    value={selectedStudent.statusBadge || 'focado'}
                    onChange={(e) =>
                      saveStudentChanges({
                        ...selectedStudent,
                        statusBadge: e.target.value as any
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="focado">🔥 Focado & Cumprindo Treinos</option>
                    <option value="inconstante">⚠️ Em Inconstância (Falta nos treinos)</option>
                    <option value="atencao">🚨 Atenção Crítica (Entrar em contato)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Anotações Privadas do Personal Mário</label>
                  <textarea
                    rows={4}
                    value={selectedStudent.marioNotes || ''}
                    onChange={(e) =>
                      saveStudentChanges({
                        ...selectedStudent,
                        marioNotes: e.target.value
                      })
                    }
                    placeholder="Escreva anotações internas sobre a evolução do aluno, limitações articulares, cargas e prazos..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => notifySaved('Dados de plano e anotações do aluno atualizados com sucesso!')}
                    className="px-5 py-3 rounded-xl bg-cyan-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition-colors flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Salvar Alterações do Aluno</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: DIRECT CHAT & FAST NUDGE BUTTONS */}
            {activeTab === 'chat' && (
              <div className="p-5 rounded-2xl bg-[#0B1324] border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  Envio de Mensagens no App do Aluno ({selectedStudent.name})
                </h4>

                {/* 1-Click Nudge Encouragement Buttons */}
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-slate-400 block">Cobranças / Mensagens Rápidas com 1-Clique:</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleSendAdminMessage('🔥 Fala! Passei pra saber se já fez o treino de hoje. Não deixa pra depois, bora pra cima!')}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold"
                    >
                      🔥 Cobrar Treino de Hoje
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendAdminMessage('💧 Lembrete de hidratação: garanta os 3 Litros de água hoje para acelerar a recuperação muscular!')}
                      className="px-3 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold"
                    >
                      💧 Lembrete de Água
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendAdminMessage('💪 Atualizei suas cargas e dicas de execução na sua ficha de treino! Dá uma olhada no aplicativo.')}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-semibold"
                    >
                      💪 Treino Atualizado
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendAdminMessage('👏 Parabéns pela constância espetacular essa semana! Continue assim que o resultado vem rápido!')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold"
                    >
                      👏 Elogio & Incentivo
                    </button>
                  </div>
                </div>

                {/* Chat Message Timeline */}
                <div className="h-64 overflow-y-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
                  {selectedStudent.messages && selectedStudent.messages.length > 0 ? (
                    selectedStudent.messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex flex-col ${m.sender === 'mario' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                            m.sender === 'mario'
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold rounded-tr-none'
                              : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700'
                          }`}
                        >
                          <span className="block text-[10px] opacity-75 mb-0.5 font-bold">
                            {m.sender === 'mario' ? 'Você (Mário)' : selectedStudent.name}
                          </span>
                          <p>{m.text}</p>
                          <span className="block text-[9px] opacity-60 text-right mt-1">{m.time}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 text-center py-10">Nenhuma mensagem trocada ainda.</p>
                  )}
                </div>

                {/* Type Custom Admin Message */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={adminChatMsg}
                    onChange={(e) => setAdminChatMsg(e.target.value)}
                    placeholder="Escreva uma mensagem para o aluno..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSendAdminMessage()}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleSendAdminMessage()}
                    className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:opacity-95 flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ================= LISTA E DIRETÓRIO DE ALUNOS ================= */
          <div className="space-y-6">
            {/* Search & Filter Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0B1324] p-4 rounded-2xl border border-slate-800">
              {/* Search input */}
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar aluno por nome, e-mail ou objetivo..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    filterType === 'all'
                      ? 'bg-cyan-500 text-black shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  Todos ({totalStudents})
                </button>

                <button
                  onClick={() => setFilterType('alert')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    filterType === 'alert'
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'bg-slate-900 text-amber-400 hover:text-white'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Inconstantes ({alertStudents})</span>
                </button>

                <button
                  onClick={() => setFilterType('pending_payment')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    filterType === 'pending_payment'
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'bg-slate-900 text-rose-400 hover:text-white'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Pendentes</span>
                </button>

                <button
                  onClick={() => setFilterType('focused')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    filterType === 'focused'
                      ? 'bg-emerald-500 text-black shadow-md'
                      : 'bg-slate-900 text-emerald-400 hover:text-white'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Focados</span>
                </button>
              </div>
            </div>

            {/* Students Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const isAlert = student.statusBadge === 'inconstante' || student.streak === 0;
                  return (
                    <div
                      key={student.email}
                      className={`p-5 rounded-2xl bg-[#0B1324] border transition-all hover:scale-[1.01] flex flex-col justify-between gap-4 ${
                        isAlert
                          ? 'border-amber-500/40 shadow-lg shadow-amber-500/5'
                          : 'border-slate-800 hover:border-cyan-500/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                            {student.photo ? (
                              <img src={student.photo} alt={student.name} className="w-full h-full object-cover" />
                            ) : (
                              <User className="w-6 h-6 text-cyan-400" />
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-white text-base">{student.name}</h4>
                            </div>
                            <p className="text-xs text-slate-400">{student.email}</p>
                            <span className="inline-block mt-1 text-[11px] font-bold text-cyan-400">
                              Goal: {student.goal}
                            </span>
                          </div>
                        </div>

                        {/* Status Badges */}
                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              student.paymentStatus === 'pendente'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            }`}
                          >
                            {student.paymentStatus === 'pendente' ? '🔴 Pendente' : '🟢 Pago / Em dia'}
                          </span>

                          <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                            <Flame className="w-3 h-3 fill-amber-400" />
                            {student.streak} dias streak
                          </span>
                        </div>
                      </div>

                      {/* Observations / Coach Note Preview */}
                      {student.marioNotes && (
                        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-[11px] text-slate-300">
                          <span className="text-cyan-400 font-bold block mb-0.5">Nota do Mário:</span>
                          <p className="line-clamp-2">{student.marioNotes}</p>
                        </div>
                      )}

                      {/* Card Action Controls */}
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                        <button
                          onClick={() => {
                            setSelectedStudentEmail(student.email);
                            setActiveTab('treinos');
                          }}
                          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span>Gerenciar Treino & Dieta</span>
                        </button>

                        <button
                          onClick={() => onSwitchToStudentView(student.email)}
                          className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                          title="Acessar aplicativo exatamente como este aluno vê"
                        >
                          <Sparkles className="w-4 h-4 text-cyan-400" />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-12 text-center text-slate-400">
                  <Users className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-bold">Nenhum aluno encontrado para este filtro.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ADD EXERCISE MODAL */}
      {showAddExerciseModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0C172B] border border-cyan-500/40 rounded-3xl max-w-md w-full p-6 text-slate-100 shadow-2xl relative">
            <button
              onClick={() => setShowAddExerciseModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-lg font-extrabold text-white mb-1">
              Adicionar Exercício ao Treino {editingWorkoutKey}
            </h3>
            <p className="text-xs text-cyan-400 mb-4">Para: {selectedStudent?.name}</p>

            <form onSubmit={handleAddExercise} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome do Exercício</label>
                <input
                  type="text"
                  required
                  value={newExName}
                  onChange={(e) => setNewExName(e.target.value)}
                  placeholder="Ex: Agachamento Búlgaro c/ Halteres"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Grupo Muscular Alvo</label>
                <input
                  type="text"
                  value={newExMuscle}
                  onChange={(e) => setNewExMuscle(e.target.value)}
                  placeholder="Ex: Quadríceps & Glúteos"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Séries</label>
                  <input
                    type="text"
                    value={newExSets}
                    onChange={(e) => setNewExSets(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Repetições</label>
                  <input
                    type="text"
                    value={newExReps}
                    onChange={(e) => setNewExReps(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Carga Inicial (kg)</label>
                  <input
                    type="number"
                    value={newExWeight}
                    onChange={(e) => setNewExWeight(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-400 font-bold focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Descanso (segundos)</label>
                  <input
                    type="number"
                    value={newExRest}
                    onChange={(e) => setNewExRest(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Dica de Execução do Mário</label>
                <textarea
                  rows={2}
                  value={newExNotes}
                  onChange={(e) => setNewExNotes(e.target.value)}
                  placeholder="Ex: Focar no joelho da frente e manter tronco ereto..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 mt-2"
              >
                Adicionar e Salvar na Ficha do Aluno
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD STUDENT MODAL */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0C172B] border border-cyan-500/40 rounded-3xl max-w-md w-full p-6 text-slate-100 shadow-2xl relative">
            <button
              onClick={() => setShowAddStudentModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-lg font-extrabold text-white mb-1">Cadastrar Novo Aluno (Mário Czarnobai)</h3>
            <p className="text-xs text-slate-400 mb-4">Insira os dados do novo aluno para liberar o app imediatamente.</p>

            <form onSubmit={handleCreateStudentByAdmin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Ex: Carlos Eduardo"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail do Aluno</label>
                <input
                  type="email"
                  required
                  value={newStudentEmail}
                  onChange={(e) => setNewStudentEmail(e.target.value)}
                  placeholder="carlos@email.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp / Celular</label>
                <input
                  type="tel"
                  value={newStudentPhone}
                  onChange={(e) => setNewStudentPhone(e.target.value)}
                  placeholder="(74) 99999-8888"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Objetivo do Aluno</label>
                <select
                  value={newStudentGoal}
                  onChange={(e) => setNewStudentGoal(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Hipertrofia & Definição">Hipertrofia & Definição</option>
                  <option value="Emagrecimento & Queima de Gordura">Emagrecimento & Queima de Gordura</option>
                  <option value="Ganho de Massa Muscular Bruta">Ganho de Massa Muscular Bruta</option>
                  <option value="Condicionamento & Saúde">Condicionamento & Saúde</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Plano Adquirido</label>
                <select
                  value={newStudentPlan}
                  onChange={(e) => setNewStudentPlan(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Consultoria V.I.P. Trimestral">Consultoria V.I.P. Trimestral</option>
                  <option value="Consultoria V.I.P. Semestral">Consultoria V.I.P. Semestral</option>
                  <option value="Plano Anual Elite">Plano Anual Elite</option>
                  <option value="Acompanhamento Mensal">Acompanhamento Mensal</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 mt-2"
              >
                Cadastrar Aluno & Gerar Ficha Inicial
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
