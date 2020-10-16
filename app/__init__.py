from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from .models import db
from .config import Config
from .routes import index

app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(index.bp)
db.init_app(app)
migrate = Migrate(app, db)
