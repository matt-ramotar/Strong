from flask import Blueprint, jsonify

from ..models import db, User

bp = Blueprint('users', __name__, url_prefix='/api/users')


@bp.route('/', methods=['POST'])
def create_user():
    incoming = request.get_json()
    user = User(
        email=incoming['email']
        password=incoming['password']
    )
    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="User with that email already exists"), 409

    new_user = User.query.filter_by(email=incoming["email"]).first()

    return jsonify(
        id=user.id,
        token=generate_token(new_user)
    )
