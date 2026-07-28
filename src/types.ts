export interface Transformation {
  id: string;
  studentName: string;
  age: number;
  location: string;
  category: 'emagrecimento' | 'hipertrofia' | 'definicao' | 'reabilitacao';
  beforeImage: string;
  afterImage: string;
  weightLoss?: string;
  muscleGain?: string;
  timeframe: string;
  quote: string;
  story: string;
  metrics: {
    weightBefore: string;
    weightAfter: string;
    bodyFatBefore: string;
    bodyFatAfter: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  avatar: string;
  city: string;
  goal: string;
  text: string;
  rating: number;
  date: string;
  hasAudio?: boolean;
  audioDuration?: string;
  whatsappScreenshot?: boolean;
}

export interface ConsultancyPlan {
  id: string;
  title: string;
  duration: string;
  badge?: string;
  originalPrice?: string;
  price: string;
  periodLabel: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export interface AppointmentBooking {
  goal: string;
  trainingLocation: 'academia' | 'casa' | 'hibrido';
  date: string;
  time: string;
  fullName: string;
  phone: string;
  email: string;
  age: string;
  notes?: string;
}
