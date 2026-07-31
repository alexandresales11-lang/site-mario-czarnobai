/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Methodology } from './components/Methodology';
import { ResultsGallery } from './components/ResultsGallery';
import { AppointmentScheduler } from './components/AppointmentScheduler';
import { Testimonials } from './components/Testimonials';
import { FitnessCalculator } from './components/FitnessCalculator';
import { Plans } from './components/Plans';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { AppShowcaseSection } from './components/AppShowcaseSection';
import { StudentApp } from './components/StudentApp';
import { PwaInstallModal } from './components/PwaInstallModal';
import { Sparkles, ExternalLink } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'app'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === 'site') {
        return 'landing';
      }
    }
    // Default directly to app mode so mobile app opens directly to login
    return 'app';
  });
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070C16] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Navbar is rendered ONLY on the institutional website */}
      {viewMode === 'landing' && (
        <Navbar
          onOpenApp={() => setViewMode('app')}
          onOpenInstallModal={() => setIsInstallModalOpen(true)}
        />
      )}

      {/* Floating Mode Toggle Bar when on Landing Page */}
      {viewMode === 'landing' && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
          <button
            onClick={() => setViewMode('app')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-2xl shadow-cyan-500/40 hover:scale-105 transition-all border border-cyan-300"
          >
            <Sparkles className="w-4 h-4 fill-black" />
            <span>Abrir Área do Aluno (App)</span>
          </button>
        </div>
      )}

      {/* VIEW MODE: STUDENT APP PORTAL */}
      {viewMode === 'app' ? (
        <div className="min-h-screen py-3 sm:py-6 px-3 sm:px-4 bg-[#050A12] flex flex-col justify-center animate-fadeIn">
          {/* Clean App Header Bar - Switch to site view */}
          <div className="max-w-4xl w-full mx-auto mb-3 sm:mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setViewMode('landing')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white font-semibold text-xs transition-colors shadow-md hover:bg-slate-800"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ir para o Site Institucional</span>
            </button>
          </div>

          <StudentApp
            onCloseApp={() => setViewMode('landing')}
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
          />
        </div>
      ) : (
        /* VIEW MODE: PUBLIC LANDING PAGE */
        <main>
          <Hero />
          <AppShowcaseSection
            onOpenApp={() => setViewMode('app')}
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
          />
          <Methodology />
          <ResultsGallery />
          <AppointmentScheduler />
          <Testimonials />
          <FitnessCalculator />
          <Plans />
          <FAQ />
        </main>
      )}

      {/* Footer is rendered ONLY on the institutional website */}
      {viewMode === 'landing' && <Footer />}

      {/* PWA INSTALL MODAL */}
      <PwaInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />
    </div>
  );
}


