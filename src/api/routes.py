"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/create-user', methods=['POST'])
def get_users():
    request_body = request.get_json()

    email = request_body['email']
    password = request_body['password']

    user = User(email=email, password=password, is_active=False)
    db.session.add(user)
    db.session.commit()

    print(f"Trying to make a new user for {email}")
    return jsonify({"message": "Created new user"}), 200

@api.route('/all_users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    serialized_users = []
    for user in users:
        serialized_users.append(user.serialize())
    
    if len(serialized_users) > 0:
        return jsonify(serialized_users), 200
    
    return jsonify({ 'message': 'No users in db'}), 404

@api.route('/token', methods=['POST'])
def generate_token():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    user = User.query.filter_by(email= email, password=password).first()

    if user:
        access_token = create_access_token(identity=email)
        return jsonify({"TOKEN": access_token, "User": user.serialize()}), 200

    else: 
        return jsonify({"Message": "Wrong email or password"}),404
    

@api.route('/private', methods=['GET'])
@jwt_required()
def get_private_info():
    user_id = get_jwt_identity()
    user = User.query.filter_by(email=user_id).first()    

    return jsonify({ "Email": user.email})
