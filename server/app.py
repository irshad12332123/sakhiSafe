from flask import Flask, jsonify
from flask_cors import CORS
from twilio.rest import Client
from dotenv import load_dotenv
import os

# loading from env

load_dotenv()


# configuring twillio

account_sid = os.getenv('account_sid')
auth_token = os.getenv('auth_token')
twilio_phone_number = os.getenv('twilio_phone_number')

client = Client(account_sid, auth_token)

# for now the contacts are hardcoded
contacts = ['+917630866433']

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello, World!"})

# handling the event whenever the user clicks the notify button

@app.route('/notify', methods=['POST'])
def notify():
    message = "I need emeregncy please help"
    for contact in contacts:
        client.messages.create(
            body=message,
            from_=twilio_phone_number,
            to=contact
        )
    return jsonify({"status": "success"}), 200

if __name__ == '__main__':
    app.run(debug=True)
