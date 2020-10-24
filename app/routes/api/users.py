from flask import Blueprint, jsonify

from ..models import db, User

bp = Blueprint('users', __name__, url_prefix='/api/users')
