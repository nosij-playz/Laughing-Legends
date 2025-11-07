#!/usr/bin/env python3
"""Upload js/data.json into Firestore collection 'leaderboard'.

Usage:
  python scripts/upload_leaderboard.py --project my-gcp-project --creds /path/to/service-account.json

If --creds not provided, the script will use the environment variable
GOOGLE_APPLICATION_CREDENTIALS or default ADC chain.

Each team will become a document whose ID is a slugified team name.
Existing documents with the same ID will be overwritten.
"""
import argparse
import json
import os
import re
from google.cloud import firestore


def slugify(name: str) -> str:
    s = name.strip().lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-+", "-", s)
    s = s.strip("-")
    return s or "team"


def load_json(path: str):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def normalize_team(t: dict):
    return {
        "name": t.get("name") or t.get("teamName") or "",
        "gamesPlayed": int(t.get("gamesPlayed") or t.get("games") or t.get("gp") or 0),
        "wins": int(t.get("wins") or t.get("w") or 0),
        "totalPoints": int(t.get("totalPoints") or t.get("points") or t.get("pts") or 0),
        "status": (t.get("status") or t.get("state") or "offline").lower(),
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--project", help="GCP project id (optional if creds and ADC configured)")
    parser.add_argument("--creds", help="Path to service account JSON (optional). Can also set GOOGLE_APPLICATION_CREDENTIALS env var")
    parser.add_argument("--dry-run", action="store_true", help="Don't write to Firestore; just print what would be written")
    parser.add_argument("--file", default="js/data.json", help="Path to JSON file (default: js/data.json)")
    parser.add_argument("--collection", default="leaderboard", help="Firestore collection name (default: leaderboard)")
    args = parser.parse_args()

    # If explicit creds provided, use them. Otherwise try environment or bundled service key
    if args.creds:
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = args.creds
        print(f"Using credentials from --creds: {args.creds}")
    else:
        # If GOOGLE_APPLICATION_CREDENTIALS is already set, keep it
        if os.environ.get("GOOGLE_APPLICATION_CREDENTIALS"):
            print(f"Using credentials from GOOGLE_APPLICATION_CREDENTIALS: {os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')}")
        else:
            # Check for the known service key file in the project root
            project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
            candidate = os.path.join(project_root, "laughinglegends-4b740-firebase-adminsdk-fbsvc-813f00d3ba.json")
            if os.path.isfile(candidate):
                os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = candidate
                print(f"Auto-detected service account key and set GOOGLE_APPLICATION_CREDENTIALS={candidate}")
            else:
                print("No explicit credentials provided and no default service key found. Relying on ADC.")

    try:
        data = load_json(args.file)
    except Exception as e:
        raise SystemExit(f"Failed to read JSON file '{args.file}': {e}")
    # get array
    if isinstance(data, dict) and isinstance(data.get("todayLeaderboard"), list):
        teams = data["todayLeaderboard"]
    elif isinstance(data, list):
        teams = data
    else:
        raise SystemExit("Unexpected JSON shape. Expected array or {todayLeaderboard: [...]}.")

    # init firestore
    client_kwargs = {}
    if args.project:
        client_kwargs["project"] = args.project

    if args.dry_run:
        print("Dry-run mode: the following documents would be written to collection '" + args.collection + "':")
    else:
        db = firestore.Client(**client_kwargs)

    for t in teams:
        team = normalize_team(t)
        doc_id = slugify(team["name"]) or None
        if not doc_id:
            print(f"Skipping team with empty name: {t}")
            continue
        if args.dry_run:
            print(f"[DRY] {args.collection}/{doc_id}: {team}")
        else:
            doc_ref = db.collection(args.collection).document(doc_id)
            print(f"Writing document {args.collection}/{doc_id}: {team}")
            doc_ref.set(team)

    print("Upload complete.")


if __name__ == "__main__":
    main()
