from flask import Flask, render_template, request, jsonify
from datetime import datetime, timedelta

app = Flask(__name__)
reservations = []

def is_conflict(start, end):
    for res in reservations:
        if (start <= res['end'] and end >= res['start']):
            return True
    return False

@app.route('/')
def index():
    return render_template('index.html', reservations=reservations)

@app.route('/reserve', methods=['POST'])
def reserve():
    start_str = request.form.get('startDate')
    duration = int(request.form.get('duration'))

    if not start_str or duration < 1:
        return render_template('index.html', message="Données invalides", error=True, reservations=reservations)

    start = datetime.strptime(start_str, '%Y-%m-%d')
    end = start + timedelta(days=duration - 1)

    if is_conflict(start, end):
        return render_template('index.html', message="Erreur : période déjà réservée !", error=True, reservations=reservations)

    reservations.append({'start': start, 'end': end})
    success_msg = f"Réservation réussie du {start.date()} au {end.date()}"
    return render_template('index.html', message=success_msg, error=False, reservations=reservations)

if __name__ == '__main__':
    app.run(debug=True)
