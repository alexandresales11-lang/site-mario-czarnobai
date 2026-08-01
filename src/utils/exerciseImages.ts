export function getExerciseImage(exercise: { name?: string; image?: string; muscle?: string }): string {
  if (exercise?.image && typeof exercise.image === 'string' && exercise.image.trim() !== '' && exercise.image !== '/app-icon.jpg') {
    return exercise.image;
  }
  const name = (exercise?.name || '').toLowerCase();
  const muscle = (exercise?.muscle || '').toLowerCase();

  if (name.includes('supino') || name.includes('crucifixo') || name.includes('peito') || muscle.includes('peit')) {
    return 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=400';
  }
  if (name.includes('desenvolvimento') || name.includes('elevação') || name.includes('elevacao') || name.includes('ombro') || muscle.includes('ombro') || muscle.includes('deltoid')) {
    return 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=400';
  }
  if (name.includes('puxada') || name.includes('remada') || name.includes('dorsal') || name.includes('costas') || muscle.includes('costa') || muscle.includes('dorsal')) {
    return 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&q=80&w=400';
  }
  if (name.includes('agachamento') || name.includes('leg') || name.includes('extensora') || name.includes('flexora') || name.includes('panturrilha') || name.includes('cadeira') || name.includes('mesa') || muscle.includes('perna') || muscle.includes('quad')) {
    return 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=400';
  }
  if (name.includes('tríceps') || name.includes('triceps') || name.includes('rosca') || name.includes('bíceps') || name.includes('biceps') || muscle.includes('braço') || muscle.includes('braco')) {
    return 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400';
  }

  return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400';
}
