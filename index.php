<?php
function readReservations() {
    if (!file_exists("reservations.json")) return [];
    return json_decode(file_get_contents("reservations.json"), true);
}

function writeReservations($reservations) {
    file_put_contents("reservations.json", json_encode($reservations, JSON_PRETTY_PRINT));
}

function isDateConflict($start, $end, $reservations) {
    foreach ($reservations as $res) {
        if (
            ($start >= $res['start'] && $start <= $res['end']) ||
            ($end >= $res['start'] && $end <= $res['end']) ||
            ($start <= $res['start'] && $end >= $res['end'])
        ) {
            return true;
        }
    }
    return false;
}

$message = "";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $start = $_POST['startDate'] ?? '';
    $duration = (int)($_POST['duration'] ?? 0);

    if (!$start || $duration < 1) {
        $message = '<p class="error">Données invalides.</p>';
    } else {
        $startDate = new DateTime($start);
        $endDate = clone $startDate;
        $endDate->modify("+".($duration - 1)." days");

        $reservations = readReservations();
        if (isDateConflict($startDate->format('Y-m-d'), $endDate->format('Y-m-d'), $reservations)) {
            $message = '<p class="error">Erreur : période déjà réservée.</p>';
        } else {
            $reservations[] = [
                'start' => $startDate->format('Y-m-d'),
                'end' => $endDate->format('Y-m-d')
            ];
            writeReservations($reservations);
            $message = "<p class='success'>Réservé du {$startDate->format('Y-m-d')} au {$endDate->format('Y-m-d')}.</p>";
        }
    }
}

$reservations = readReservations();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Réservation PHP</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<main>
    <h1>Réserver une Sonorisation</h1>
    <form method="post">
        <label for="startDate">Date de début :</label><br>
        <input type="date" name="startDate" id="startDate" required><br>

        <label for="duration">Durée (en jours) :</label><br>
        <input type="number" name="duration" id="duration" min="1" required><br>

        <button type="submit">Réserver</button>
    </form>

    <div id="message"><?= $message ?></div>

    <h2>Réservations existantes :</h2>
    <ul>
        <?php foreach ($reservations as $r): ?>
            <li>Du <?= $r['start'] ?> au <?= $r['end'] ?></li>
        <?php endforeach; ?>
    </ul>
</main>
</body>
</html>
