import React, { useState, useEffect } from 'react';
import { Smartphone, Download, Share, PlusSquare, X, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface PwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PwaInstallModal: React.FC<PwaInstallModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [activeTab, setActiveTab] = useState<'ios' | 'android' | 'desktop'>('android');

  useEffect(() => {
    // Detect OS
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      setActiveTab('ios');
    } else if (/android/i.test(userAgent)) {
      setActiveTab('android');
    } else {
      setActiveTab('desktop');
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0C1527] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/30 overflow-hidden">
            <img
              src="./app-icon.jpg"
              alt="Czarnobai App"
              className="w-full h-full object-cover rounded-[14px]"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=400&auto=format&fit=crop';
              }}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
              Czarnobai App
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full">
                Oficial
              </span>
            </h3>
            <p className="text-xs text-slate-400">Aplicativo de Treinos & Consultoria no seu celular</p>
          </div>
        </div>

        {isInstalled ? (
          <div className="my-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-2 text-emerald-400">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-emerald-300">Aplicativo Já Instalado!</h4>
            <p className="text-xs text-slate-300 mt-1">
              Procure pelo ícone <strong>"Czarnobai App"</strong> na tela inicial do seu celular.
            </p>
          </div>
        ) : (
          <>
            {/* Native Install Button if prompt available */}
            {deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="w-full mb-6 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 text-black font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 hover:opacity-95 transition-all"
              >
                <Download className="w-5 h-5" />
                Instalar Agora com 1 Clique
              </button>
            )}

            {/* Platform instructions tab */}
            <div className="flex border-b border-slate-800 mb-4">
              <button
                onClick={() => setActiveTab('android')}
                className={`flex-1 py-2 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === 'android'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Android (Chrome)
              </button>
              <button
                onClick={() => setActiveTab('ios')}
                className={`flex-1 py-2 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === 'ios'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                iPhone (Safari)
              </button>
              <button
                onClick={() => setActiveTab('desktop')}
                className={`flex-1 py-2 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === 'desktop'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Computador
              </button>
            </div>

            {/* Content per platform */}
            {activeTab === 'ios' && (
              <div className="space-y-3 text-xs text-slate-300 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <p className="font-semibold text-white">Como instalar no iPhone / iPad:</p>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-slate-800 rounded-lg text-cyan-400 font-bold shrink-0">1</div>
                  <p>Abra este site no navegador <strong>Safari</strong> do seu iPhone.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-slate-800 rounded-lg text-cyan-400 font-bold shrink-0">2</div>
                  <p className="flex items-center gap-1.5 flex-wrap">
                    Toque no botão de <strong>Compartilhar</strong> <Share className="w-4 h-4 text-cyan-400 inline" /> na barra inferior.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-slate-800 rounded-lg text-cyan-400 font-bold shrink-0">3</div>
                  <p className="flex items-center gap-1.5 flex-wrap">
                    Role para baixo e selecione <strong>"Adicionar à Tela de Início"</strong> <PlusSquare className="w-4 h-4 text-cyan-400 inline" />.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-slate-800 rounded-lg text-cyan-400 font-bold shrink-0">4</div>
                  <p>Pronto! O ícone do app aparecerá junto com seus outros aplicativos no iPhone.</p>
                </div>
              </div>
            )}

            {activeTab === 'android' && (
              <div className="space-y-3 text-xs text-slate-300 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <p className="font-semibold text-white">Como instalar no Android (Chrome):</p>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-slate-800 rounded-lg text-cyan-400 font-bold shrink-0">1</div>
                  <p>Abra o menu de 3 pontos no canto superior direito do seu Chrome.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-slate-800 rounded-lg text-cyan-400 font-bold shrink-0">2</div>
                  <p>Clique em <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-slate-800 rounded-lg text-cyan-400 font-bold shrink-0">3</div>
                  <p>Confirme a instalação para ter acesso direto e rápido sem precisar digitar endereço.</p>
                </div>
              </div>
            )}

            {activeTab === 'desktop' && (
              <div className="space-y-4 text-xs text-slate-300 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <div>
                  <p className="font-bold text-cyan-400 mb-2">Opção 1: Pelo Menu de 3 Pontos (Aberto no seu print)</p>
                  <div className="space-y-2 pl-1">
                    <div className="flex items-start gap-2.5">
                      <div className="p-1 px-2 bg-slate-800 rounded-lg text-cyan-400 font-bold shrink-0">1</div>
                      <p>No menu que você abriu no canto direito, passe o mouse sobre <strong>"Transmitir, salvar e compartilhar"</strong> (ou <strong>"Mais ferramentas"</strong>).</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="p-1 px-2 bg-slate-800 rounded-lg text-cyan-400 font-bold shrink-0">2</div>
                      <p>Clique na opção <strong>"Instalar Czarnobai App..."</strong> ou <strong>"Criar atalho..."</strong>.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <p className="font-bold text-cyan-400 mb-2">Opção 2: Pela Barra de Endereço</p>
                  <div className="flex items-start gap-2.5 pl-1">
                    <div className="p-1 px-2 bg-slate-800 rounded-lg text-cyan-400 font-bold shrink-0">★</div>
                    <p>Na barra onde digita o site (ao lado do endereço), clique no ícone de <strong>computador com seta para baixo</strong> e selecione <strong>Instalar</strong>.</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Seguro, leve e sem consumir memória
          </span>
          <button
            onClick={onClose}
            className="text-cyan-400 font-medium hover:underline flex items-center gap-1"
          >
            Fechar <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
