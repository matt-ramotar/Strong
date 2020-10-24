from flask import Blueprint, request, jsonify, url_for, redirect, g

from ..models import db, User

from ..utils.auth import generate_token, requires_auth, verify_token
from flask_bcrypt import Bcrypt

bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('/user', methods=['GET'])
@requires_auth
def get_user():
    return jsonify(result=g.current_user)


@bp.route('/get_token', methods=['POST'])
def get_token():
    incoming = request.get_json()
    email = incoming['email']
    password = incoming['password']

    user = User.query.filter_by(email=email).first()
    if user and user.checkPassword(password):
        return jsonify(token=generate_token(user))

    return jsonify(error=True), 403


@bp.route('/is_token_valid', methods=['POST'])
def is_token_valid():
    incoming = request.get_json()
    is_valid = verify_token(incoming['token'])

    if is_valid:
        return jsonify(token_is_valid=True)
    else:
        return jsonify(token_is_valid=False), 403
