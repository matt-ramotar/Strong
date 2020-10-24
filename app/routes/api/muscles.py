import json

from flask import Blueprint
from flask_cors import cross_origin
from app.models import db, Muscle

bp = Blueprint('muscles', __name__, url_prefix='/api/muscles')


@bp.route('/', methods=['GET'])
@cross_origin()
def muscles():
    muscles = Muscle.query.all()
    print(muscles)
    data = [muscle.to_dict() for muscle in muscles]
    return {'data': data}
