import type { Reservation } from '../hooks/useReservation';
import { formatDate } from '../utils/formatDate';

type Props = {
  reservations: Reservation[];
};

export default function ReservationList({ reservations }: Props) {
  return (
    <ul>
      {reservations.map((res, index) => (
        <li key={index}>
          Du {formatDate(res.start)} au {formatDate(res.end)}
        </li>
      ))}
    </ul>
  );
}
