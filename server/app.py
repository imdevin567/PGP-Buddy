from flask import Flask, request, jsonify, send_from_directory
from pgpy import PGPKey, PGPMessage, PGPUID
import os

app = Flask(__name__, static_folder="/app/client/build", static_url_path="")
public_keys = {}
private_key, _ = PGPKey.from_file("/keys/private/secret.key")

# Load public keys from directory
def load_public_keys(folder):
    global public_keys
    for filename in os.listdir(folder):
        key, _ = PGPKey.from_file(f"{folder}/{filename}")
        public_keys[filename] = key

@app.route('/api/keys/public', methods=['GET'])
def get_public_keys():
    try:
        # Create a list of public key identifiers
        key_ids = list(public_keys.keys())
        return jsonify({"keys": key_ids})
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)})

@app.route('/api/sign', methods=['POST'])
def sign_message():
    data = request.json
    message = data.get('message')
    pgp_message = PGPMessage.new(message, cleartext=True)

    # Sign the message
    try:
        pgp_message |= private_key.sign(pgp_message)
        return jsonify({"message": str(pgp_message)})
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)})

@app.route('/api/encrypt', methods=['POST'])
def encrypt_message():
    data = request.json
    message = data.get('message')
    key_id = data.get('key')  # The identifier for the public key to use

    # Encrypt the message
    try:
        public_key = public_keys.get(key_id)
        pgp_message = PGPMessage.new(message)
        encrypted_message = public_key.encrypt(pgp_message)
        return jsonify({"message": str(encrypted_message)})
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)})

@app.route('/api/decrypt', methods=['POST'])
def decrypt_message():
    data = request.json
    encrypted_message_str = data.get('message')

    # Decrypt the message
    try:
        encrypted_message = PGPMessage.from_blob(encrypted_message_str)
        decrypted_message = private_key.decrypt(encrypted_message)
        return jsonify({"message": decrypted_message.message})  # Use .message to extract the message content
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)})

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_static(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    # Load public and private keys
    load_public_keys('/keys/public')
    app.run(host='0.0.0.0', port=3000)
