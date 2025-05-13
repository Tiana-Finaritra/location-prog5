import './App.css';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import { useReservation } from './hooks/useReservation';

function App() {
  const { reservations, message, addReservation, setMessage } = useReservation();

  return (
    <main>
      <h1>Réserver une Sonorisation</h1>

      <ReservationForm
        onAddReservation={addReservation}
        onClearMessage={() => setMessage(null)}
      />

      {message && (
        <div id="message" className={message.type}>
          <p>{message.text}</p>
        </div>
      )}

      <h2>Réservations existantes :</h2>
      <ReservationList reservations={reservations} />
    </main>
  );
}

export default App;
