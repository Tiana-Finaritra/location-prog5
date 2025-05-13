const reservations = [];

function isDateConflict(start, end) {
    for (const res of reservations) {
        if (
            (start >= res.start && start <= res.end) ||
            (end >= res.start && end <= res.end) ||
            (start <= res.start && end >= res.end)
        ) {
            return true;
        }
    }
    return false;
}

function formatDate(date) {
    return date.toISOString().split("T")[0];
}

document.getElementById("reservationForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const startInput = document.getElementById("startDate").value;
    const durationInput = parseInt(document.getElementById("duration").value);
    const messageDiv = document.getElementById("message");

    if (!startInput || durationInput < 1) {
        messageDiv.innerHTML = '<p class="error">Données invalides</p>';
        return;
    }

    const startDate = new Date(startInput);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationInput - 1);

    if (isDateConflict(startDate, endDate)) {
        messageDiv.innerHTML = `<p class="error">Erreur : cette période est déjà réservée !</p>`;
        return;
    }

    reservations.push({ start: startDate, end: endDate });
    messageDiv.innerHTML =
        `<p class="success">Réservation réussie du ${formatDate(startDate)} au ${formatDate(endDate)}</p>`;
    updateReservationsList();
});

function updateReservationsList() {
    const list = document.getElementById("reservationsList");
    list.innerHTML = '';
    reservations.forEach(res => {
        const li = document.createElement("li");
        li.textContent = `Du ${formatDate(res.start)} au ${formatDate(res.end)}`;
        list.appendChild(li);
    });
}
