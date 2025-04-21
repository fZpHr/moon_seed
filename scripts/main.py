import requests
import json
import time
from dotenv import load_dotenv
import os
# Charger les variables d'environnement
load_dotenv()

# Infos Blizzard
CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
REGION = os.getenv('REGION', 'eu')
REALM = os.getenv('REALM', 'confrerie-du-thorium')
LOCALE = os.getenv('LOCALE', 'fr_FR')

# Liste des personnages à fetch
CHARACTERS = [
    "leelou", "aelys", "darkmor", "thanor", "miriel", "valkor", "elrion", "sylora", "kheldan", "naelya",
    "druvia", "thorgrim", "zephira", "morganor", "karnax", "lyssandra", "faelor", "altherion", "nymeria",
    "brakk", "selendis", "grum", "zhalia", "eirena", "maldrak"
]

# Authentification
def get_access_token():
    url = f"https://{REGION}.battle.net/oauth/token"
    data = {'grant_type': 'client_credentials'}
    response = requests.post(url, data=data, auth=(CLIENT_ID, CLIENT_SECRET))
    return response.json().get('access_token')

# Récupération d’un personnage
def get_character_equipment(token, character):
    headers = {'Authorization': f'Bearer {token}'}
    url = f"https://{REGION}.api.blizzard.com/profile/wow/character/{REALM}/{character}/equipment?namespace=profile-{REGION}&locale={LOCALE}"
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print(f"❌ Échec pour {character}: {response.status_code}")
        return None
    return response.json()

# Mapping qualité
def map_quality_to_color(quality_type):
    color_map = {
        'poor': 'bg-gray-500',
        'common': 'bg-white',
        'uncommon': 'bg-green-300',
        'rare': 'bg-blue-300',
        'epic': 'bg-purple-300',
        'legendary': 'bg-orange-400',
        'artifact': 'bg-yellow-300'
    }
    return color_map.get(quality_type, 'bg-gray-200')

# Structuration des items
def build_equipment_data(equipment_json):
    equipment_data = {}
    slot_map = {
        'HEAD': 'tete', 'NECK': 'cou', 'SHOULDER': 'epaules', 'BACK': 'cape', 'CHEST': 'torse',
        'WRIST': 'poignets', 'HANDS': 'mains', 'WAIST': 'ceinture', 'LEGS': 'jambes',
        'FEET': 'pieds', 'FINGER_1': 'anneau1', 'FINGER_2': 'anneau2', 'TRINKET_1': 'bijou1',
        'TRINKET_2': 'bijou2', 'MAIN_HAND': 'arme1', 'OFF_HAND': 'arme2'
    }

    for item in equipment_json.get('equipped_items', []):
        slot_type = item['slot']['type']
        key = slot_map.get(slot_type)
        if not key:
            continue
        item_data = {
            'name': item['name'],
            'color': map_quality_to_color(item['quality']['type'].lower()),
            'itemId': str(item['id']),
            'quality': item['quality']['type'].lower()
        }
        equipment_data[key] = item_data

    return equipment_data

# Boucle principale
def fetch_all_characters():
    token = get_access_token()
    results = []

    for idx, name in enumerate(CHARACTERS):
        print(f"🔍 Récupération de {name} ({idx + 1}/{len(CHARACTERS)})...")
        equipment_json = get_character_equipment(token, name)
        if not equipment_json:
            continue

        data = {
            'id': idx + 1,
            'joueur': name.capitalize(),
            'classe': equipment_json['character']['playable_class']['name'],
            'specialisation': 'Unknown',  # À enrichir avec d'autres appels API
            'role': 'Unknown',
            **build_equipment_data(equipment_json),
            'ilvl': equipment_json.get('equipped_item_level', 0),
            'hasPermission': True
        }
        results.append(data)

        time.sleep(0.3)  # Evite d’être rate-limité

    return results

# Format JS
def print_as_js_array(data):
    print("export const equipmentData = [")
    for entry in data:
        print(json.dumps(entry, indent=2, ensure_ascii=False) + ",")
    print("];")

# ▶️ Lancement
if __name__ == "__main__":
    data = fetch_all_characters()
    print_as_js_array(data)
