import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

type Props = {
    onAddReservation: (start: Date, duration: number) => void;
    onClearMessage: () => void;
};

export default function ReservationForm({ onAddReservation, onClearMessage }: Props) {
    const [startDate, setStartDate] = useState('');
    const [duration, setDuration] = useState(1);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!startDate || duration < 1) return;
        onAddReservation(new Date(startDate), duration);
    }

    function handleStartChange(e: ChangeEvent<HTMLInputElement>) {
        setStartDate(e.target.value);
        onClearMessage();
    }

    function handleDurationChange(e: ChangeEvent<HTMLInputElement>) {
        setDuration(parseInt(e.target.value, 10));
        onClearMessage();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="startDate">Date de début :</label><br />
            <input type="date" id="startDate" value={startDate} onChange={handleStartChange} required /><br />

            <label htmlFor="duration">Durée (en jours) :</label><br />
            <input type="number" id="duration" min="1" value={duration} onChange={handleDurationChange} required /><br />

            <button type="submit">Réserver</button>
        </form>
    );
}
