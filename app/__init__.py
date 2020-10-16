from flask import Flask, Migrate
from .config import Config
from .routes import index
from .models import db

app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(index.bp)
db.init_app(app)
migrate = Migrate(app, db)
