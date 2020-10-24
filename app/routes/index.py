from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from app.models import db, User

bp = Blueprint('index', __name__, url_prefix='')


@bp.route('/register', methods=['POST'])
def register():
    incoming = request.get_json()

    user = User(
        firstName=incoming['firstName'],
        lastName=incoming['lastName'],
        username=incoming['username'],
        email=incoming['email'],
        password=incoming['password']
    )

    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="User with that email already exists"), 409

    token = create_access_token(identity=user.email)
    return jsonify(user=user.to_dict(), token=token)


@bp.route('/login', methods=['POST'])
def login():
    incoming = request.get_json()
    user = User.query.filter_by(email=incoming['email']).one()
    if user and user.checkPassword(incoming['password']):
        token = create_access_token(identity=user.email)
        return jsonify(user=user.to_dict(), token=token)
    else:
        return {'msg': 'Incorrect email or password'}, 400
