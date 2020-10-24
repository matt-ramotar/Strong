from flask import Flask
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, get_raw_jwt
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf, validate_csrf

from .models import db, User
from .config import Config
from .routes import index
from .routes.api import exercises, muscles, equipment
import os
app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)


app.register_blueprint(index.bp)
app.register_blueprint(exercises.bp)
app.register_blueprint(muscles.bp)
app.register_blueprint(equipment.bp)

migrate = Migrate(app, db)


jwt = JWTManager(app)

# TODO: explain
blacklist = set()

# TODO: Explain


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return jti in blacklist


@app.route('/logout', methods=['DELETE'])
@jwt_required
def logout():
    jti = get_raw_jwt()['jti']
    blacklist.add(jti)
    return jsonify({'msg': 'Logged out'}), 200


cors = CORS(app)

# TODO: Explain

# csrf = CSRFProtect(app)
# csrf.init_app(app)


# @app.after_request
# def inject_csrf_token(response):
#     print(response)
#     response.set_cookie('csrf_token',
#                         generate_csrf(),
#                         secure=True if os.environ.get('FLASK_ENV') else False,
#                         samesite='Strict' if os.environ.get('FLASK_ENV') else None,
#                         httponly=True)
#     return True

# # # TODO: Explain


# @app.route('/', defaults={'path': ''})
# @app.route('/<path>')
# def react_root(path):
#     if path == 'favicon.ico':
#         return app.send_static_file('favicon.ico')
#     return app.send_static_file('index.html')
