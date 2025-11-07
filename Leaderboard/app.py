import os
import json
from flask import Flask, send_from_directory, abort, jsonify, make_response
from google.cloud import firestore as gcfirestore
from google.oauth2 import service_account

ROOT = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)

# Try to load Firebase credentials from environment variable
firebase_env = os.environ.get("FIREBASE_CREDENTIALS_JSON")

if firebase_env:
    try:
        creds_dict = json.loads(firebase_env)
        creds = service_account.Credentials.from_service_account_info(creds_dict)
        client = gcfirestore.Client(credentials=creds, project=creds.project_id)
        print("✅ Firebase credentials loaded from environment variable.")
    except Exception as e:
        print(f"⚠️ Failed to parse Firebase credentials from environment variable: {e}")
        client = None
else:
    # Fallback: Use Application Default Credentials (if available)
    try:
        client = gcfirestore.Client()
        print("✅ Using default Firestore credentials (ADC).")
    except Exception as e:
        print(f"⚠️ No Firebase credentials found or invalid: {e}")
        client = None


@app.route('/')
def index():
    return send_from_directory(ROOT, 'index.html')


@app.route('/leaderboard')
def leaderboard():
    return send_from_directory(ROOT, 'leaderboard.html')


@app.route('/data.json')
def data_json():
    """Return leaderboard data from Firestore."""
    if client is None:
        return make_response(jsonify({"error": "Firestore client not available."}), 500)

    try:
        coll = client.collection('leaderboard')
        try:
            docs = coll.order_by('totalPoints', direction=gcfirestore.Query.DESCENDING).stream()
        except Exception:
            docs = coll.stream()

        teams = []
        for d in docs:
            item = d.to_dict() or {}
            team = {
                'name': item.get('name') or item.get('teamName') or '',
                'gamesPlayed': int(item.get('gamesPlayed') or item.get('games') or item.get('gp') or 0),
                'wins': int(item.get('wins') or item.get('w') or 0),
                'totalPoints': int(item.get('totalPoints') or item.get('points') or item.get('pts') or 0),
                'status': (item.get('status') or item.get('state') or 'offline')
            }
            teams.append(team)

        teams.sort(key=lambda t: t.get('totalPoints', 0), reverse=True)
        return jsonify({"todayLeaderboard": teams})
    except Exception as e:
        print('Error querying Firestore:', e)
        return make_response(jsonify({"error": "Failed to fetch leaderboard."}), 500)


@app.route('/<path:filename>')
def serve_files(filename):
    filepath = os.path.join(ROOT, filename)
    try:
        common = os.path.commonpath([ROOT, os.path.abspath(filepath)])
    except Exception:
        abort(404)
    if common != ROOT:
        abort(404)
    if os.path.isfile(filepath):
        return send_from_directory(ROOT, filename)
    abort(404)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5500, debug=True)
