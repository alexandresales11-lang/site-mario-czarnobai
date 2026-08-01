import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
app.use(express.json({ limit: "10mb" }));

const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "accounts_db.json");

// Default exercises schema for demo
const DEFAULT_CLEAN_EXERCISES = {
  A: [
    { id: '1', name: 'Supino Inclinado c/ Halteres', sets: 4, reps: '10 a 12', rest: '60s', completed: false, weight: 24, notes: 'Foco na cadência de descer em 3s' },
    { id: '2', name: 'Crucifixo Reto na Polia', sets: 3, reps: '12 a 15', rest: '45s', completed: false, weight: 15, notes: 'Pico de contração de 1s no centro' },
    { id: '3', name: 'Desenvolvimento c/ Halteres', sets: 4, reps: '10', rest: '60s', completed: false, weight: 18, notes: 'Manter cotovelos alinhados' },
    { id: '4', name: 'Elevação Lateral', sets: 4, reps: '15', rest: '45s', completed: false, weight: 10, notes: 'Sem roubar na subida' },
    { id: '5', name: 'Tríceps Corda', sets: 4, reps: '12 a 15', rest: '45s', completed: false, weight: 22, notes: 'Abrir a corda no final do movimento' }
  ],
  B: [
    { id: '6', name: 'Puxada Alta Pronada', sets: 4, reps: '10 a 12', rest: '60s', completed: false, weight: 55, notes: 'Expandir bem a dorsal na subida' },
    { id: '7', name: 'Remada Curvada c/ Barra', sets: 4, reps: '10', rest: '60s', completed: false, weight: 50, notes: 'Tronco firme e abdômen contraído' },
    { id: '8', name: 'Remada Baixa Triângulo', sets: 3, reps: '12', rest: '45s', completed: false, weight: 45, notes: 'Puxar até o umbigo' },
    { id: '9', name: 'Rosca Direta c/ Barra W', sets: 4, reps: '10 a 12', rest: '45s', completed: false, weight: 14, notes: 'Sem balançar o quadril' },
    { id: '10', name: 'Rosca Martelo c/ Halteres', sets: 3, reps: '12', rest: '45s', completed: false, weight: 12, notes: 'Aperta forte no topo' }
  ],
  C: [
    { id: '11', name: 'Agachamento Livre', sets: 4, reps: '8 a 10', rest: '90s', completed: false, weight: 70, notes: 'Base firme, descer até 90 graus' },
    { id: '12', name: 'Leg Press 45º', sets: 4, reps: '10 a 12', rest: '75s', completed: false, weight: 180, notes: 'Pés na largura dos ombros' },
    { id: '13', name: 'Cadeira Extensora', sets: 3, reps: '15', rest: '45s', completed: false, weight: 40, notes: 'Hold de 2s na extensão total' },
    { id: '14', name: 'Mesa Flexora', sets: 4, reps: '12', rest: '45s', completed: false, weight: 35, notes: 'Controlar a volta' },
    { id: '15', name: 'Panturrilha no Leg Press', sets: 5, reps: '15 a 20', rest: '30s', completed: false, weight: 120, notes: 'Alongar bem a fáscia no fundo' }
  ]
};

const DEMO_EXERCISES = JSON.parse(JSON.stringify(DEFAULT_CLEAN_EXERCISES));
DEMO_EXERCISES.A[0].completed = true;
DEMO_EXERCISES.A[0].weight = 28;
DEMO_EXERCISES.A[1].completed = true;
DEMO_EXERCISES.A[1].weight = 25;

function getDefaultInitialAccounts() {
  return {
    "mario@czarnobai.com": {
      name: 'Mário Czarnobai',
      email: 'mario@czarnobai.com',
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
    },
    "alexandre.sales@email.com": {
      name: 'Alexandre Sales',
      email: 'alexandre.sales@email.com',
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
      marioNotes: 'Aluno extremadamente focado. Ótima evolução no supino e agachamento. Manter carga progressiva.',
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
    },
    "lucas.mendes@email.com": {
      name: 'Lucas Mendes',
      email: 'lucas.mendes@email.com',
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
    },
    "ricardo.santos@email.com": {
      name: 'Ricardo Santos',
      email: 'ricardo.santos@email.com',
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
    },
    "juliana.mendes@email.com": {
      name: 'Juliana Mendes',
      email: 'juliana.mendes@email.com',
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
    },
    "mariana.costa@email.com": {
      name: 'Mariana Costa',
      email: 'mariana.costa@email.com',
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
    }
  };
}

let accountsStore: Record<string, any> = {};

function loadAccounts() {
  const defaults = getDefaultInitialAccounts();
  if (fs.existsSync(DB_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
      if (data && typeof data === "object") {
        // Merge defaults with saved data
        accountsStore = { ...defaults, ...data };
      } else {
        accountsStore = defaults;
      }
    } catch (e) {
      console.error("Error loading DB_FILE, resetting to defaults", e);
      accountsStore = defaults;
    }
  } else {
    accountsStore = defaults;
  }

  // Sanitize: ensure core official accounts exist and bad/phantom accounts are cleaned up
  const officialKeys = [
    "mario@czarnobai.com",
    "alexandre.sales@email.com",
    "lucas.mendes@email.com",
    "ricardo.santos@email.com",
    "juliana.mendes@email.com",
    "mariana.costa@email.com"
  ];

  // Make sure defaults exist
  for (const k of officialKeys) {
    if (!accountsStore[k]) {
      accountsStore[k] = defaults[k as keyof typeof defaults];
    }
  }

  // Remove phantom or broken accounts (accounts without a valid name or email)
  Object.keys(accountsStore).forEach(key => {
    const acc = accountsStore[key];
    if (!acc || !acc.name || !acc.email) {
      delete accountsStore[key];
    }
  });

  // Ensure Mario is always admin and has correct photo
  if (accountsStore["mario@czarnobai.com"]) {
    accountsStore["mario@czarnobai.com"].isAdmin = true;
    accountsStore["mario@czarnobai.com"].photo = 'https://i.imgur.com/FVHkZ7T.png';
  }

  saveAccounts();
}

function saveAccounts() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(accountsStore, null, 2));
  } catch (e) {
    console.error("Error saving DB_FILE", e);
  }
}

loadAccounts();

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", studentsCount: Object.keys(accountsStore).length - 1 });
});

app.get("/api/accounts", (_req, res) => {
  res.json(accountsStore);
});

app.post("/api/accounts", (req, res) => {
  if (req.body && typeof req.body === "object") {
    // If client sends entire database map, replace accountsStore cleanly
    // preserving valid account format
    const newStore: Record<string, any> = {};
    for (const k of Object.keys(req.body)) {
      const lowerK = k.toLowerCase().trim();
      const acc = req.body[k];
      if (acc && acc.email && acc.name) {
        newStore[lowerK] = acc;
      }
    }
    // Ensure Mario remains admin
    if (newStore["mario@czarnobai.com"]) {
      newStore["mario@czarnobai.com"].isAdmin = true;
      newStore["mario@czarnobai.com"].photo = 'https://i.imgur.com/FVHkZ7T.png';
    }
    accountsStore = newStore;
    saveAccounts();
    return res.json({ success: true, accounts: accountsStore });
  }
  return res.status(400).json({ error: "Invalid data" });
});

app.put("/api/accounts/:email", (req, res) => {
  const email = req.params.email?.toLowerCase().trim();
  if (email && req.body) {
    accountsStore[email] = {
      ...accountsStore[email],
      ...req.body,
      email // ensure email consistency
    };
    saveAccounts();
    return res.json({ success: true, account: accountsStore[email] });
  }
  return res.status(400).json({ error: "Invalid account data" });
});

app.delete("/api/accounts/:email", (req, res) => {
  const email = req.params.email?.toLowerCase().trim();
  if (email && accountsStore[email]) {
    delete accountsStore[email];
    saveAccounts();
    return res.json({ success: true, accounts: accountsStore });
  }
  return res.status(404).json({ error: "Account not found" });
});

app.post("/api/accounts/reset-default", (_req, res) => {
  accountsStore = getDefaultInitialAccounts();
  saveAccounts();
  res.json({ success: true, accounts: accountsStore });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
