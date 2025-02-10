from flask import Flask, jsonify, request
from flask_cors import CORS
from twilio.rest import Client
from dotenv import load_dotenv
import os
import mysql.connector
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta

app = Flask(__name__)
CORS(app)

# loading from env
load_dotenv()

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=0.2) 
jwt = JWTManager(app)

# establishing connection between server and database
connection = mysql.connector.connect(
    user = os.getenv('DB_USER'),
    password = os.getenv('DB_PASSWORD'),
    host =  os.getenv('DB_HOST'),
    database =  os.getenv('DB_NAME')
)

# configuring twillio
account_sid = os.getenv('account_sid')
auth_token = os.getenv('auth_token')
twilio_phone_number = os.getenv('twilio_phone_number')

client = Client(account_sid, auth_token)


@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Welcome to The App"})

# Various endpoints

@app.route('/notify', methods=['POST'])
@jwt_required()
def notify():
    user_id = get_jwt_identity()
    cursor = connection.cursor()
    cursor.execute("SELECT CONTACT_NUMBER FROM USER_CONTACT_LIST WHERE user_id = %s", (user_id,))
    contacts = cursor.fetchall()
    latitude = request.form.get('latitude')
    longitude = request.form.get('longitude')
    label = "Please reach out me at given location i need emergency help"
    # using gmap api to send the map link to the required user
    google_maps_link = f"https://www.google.com/maps/search/?api=1&query={latitude},{longitude}"
    message = f'{label}: {google_maps_link}'
    for contact in contacts:
        client.messages.create(
            body=message,
            from_=twilio_phone_number,
            to=contact
        )
    return jsonify({"msg":"Message sent successfully","response": "success"}), 200

@app.route("/register",methods =['POST'])
def register():
    username = request.form.get('userName')
    password = request.form.get('userPassword')

    if not username or not password:
        return jsonify({"msg": "All fields are required", "response" :"failure"}), 400
    cursor = connection.cursor()

    query = "SELECT 1 FROM USER_RECORDS WHERE user_name = %s LIMIT 1"
    cursor.execute(query, (username,)) 
    user_exists = cursor.fetchone()

    if user_exists :
        return jsonify({"msg":"username already taken", "response" :"failure"}), 400
    try:
        cursor.execute("INSERT INTO user_records (user_name, user_password) VALUES (%s,%s)",(username, password))
        connection.commit()
        return jsonify({"msg": "Registered successfully", "response" :"success"}), 201
    except mysql.connector.Error as err:
        print(err)
        return jsonify({"msg": str(err), "response": "failure"}), 500
    finally:
        cursor.close()


# User Login
@app.route('/login', methods=['POST'])
def login():
    name = request.form.get('userName')
    password = request.form.get('userPassword')
     
    if not name or not password:
        return jsonify({"msg":"Enter details", "response": "failure"})
    cursor = connection.cursor(dictionary=True)


    query = "SELECT user_id FROM user_records WHERE user_name = %s AND user_password = %s  LIMIT 1"
    cursor.execute(query , (name,password))
    user = cursor.fetchone()
     
    cursor.close()
    if user :
        access_token = create_access_token(identity=str(user['user_id']))
        return jsonify({"token": access_token, "user_id": user['user_id'], "user_name": name.capitalize()}), 200
    return jsonify({"msg": "Either username or password is invalid", "response":"failure"}), 401

# Add Contact ()
@app.route('/add-contact', methods=['POST'])
@jwt_required()
def add_contact():
    data = request.json
    contact_number = data.get('contact_number')
    print(contact_number)
    user_id = get_jwt_identity()  

    if not contact_number:
        return jsonify({"msg": "Contact number is required", "response":"failure",}), 400
    if len(contact_number) > 10 :
        return jsonify({"msg": "Not a valid number", "response": "failure"}), 400
    contact_number = '+91' + contact_number
    cursor = connection.cursor()
    query = "SELECT 1 FROM USER_CONTACT_LIST WHERE user_id = %s AND CONTACT_NUMBER = %s LIMIT 1"
    cursor.execute(query, (user_id, contact_number)) 
    contact_exist = cursor.fetchone()

    if contact_exist :
        return jsonify({"msg": "Contact already exist", "response" : "failure"}), 400

    cursor.execute("INSERT INTO USER_CONTACT_LIST (user_id, CONTACT_NUMBER) VALUES (%s, %s)", (user_id, contact_number))
    connection.commit()
    cursor.close()
    return jsonify({"msg": "Contact added successfully", "response":"success"}), 201

if __name__ == '__main__':
    app.run(debug=True)
