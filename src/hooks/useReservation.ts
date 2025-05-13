import { useState } from 'react';
import { formatDate } from '../utils/formatDate';

export type Reservation = {
  start: Date;
  end: Date;
};

export type Message = {
  type: 'error' | 'success';
  text: string;
};

export function useReservation() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [message, setMessage] = useState<Message | null>(null);

  function isDateConflict(start: Date, end: Date): boolean {
    return reservations.some(res => (
      (start >= res.start && start <= res.end) ||
      (end >= res.start && end <= res.end) ||
      (start <= res.start && end >= res.end)
    ));
  }

  function addReservation(start: Date, duration: number): void {
    const end = new Date(start);
    end.setDate(start.getDate() + duration - 1);

    if (isDateConflict(start, end)) {
      setMessage({ type: 'error', text: 'Erreur : cette période est déjà réservée !' });
      return;
    }

    setReservations(prev => [...prev, { start, end }]);
    setMessage({
      type: 'success',
      text: `Réservation réussie du ${formatDate(start)} au ${formatDate(end)}`
    });
  }

  return { reservations, message, addReservation, setMessage };
}
