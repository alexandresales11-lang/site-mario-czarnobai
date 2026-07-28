/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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

export default function App() {
  return (
    <div className="min-h-screen bg-[#070C16] text-slate-100 selection:bg-cyan-500 selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Methodology />
        <ResultsGallery />
        <AppointmentScheduler />
        <Testimonials />
        <FitnessCalculator />
        <Plans />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

