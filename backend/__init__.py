from flask import Flask
from flask_migrate import Migrate
from flask_login import LoginManager

from .models import db, User
from .config import Config
from .routes import index, session, exercises

app = Flask(__name__)
app.config.from_object(Config)

app.register_blueprint(index.bp)
app.register_blueprint(session.bp)
app.register_blueprint(exercises.bp)

db.init_app(app)
migrate = Migrate(app, db)

login = LoginManager(app)
login.login_view = "session.login"


@login.user_loader
def load_user(id):
    return User.query.get(int(id))
