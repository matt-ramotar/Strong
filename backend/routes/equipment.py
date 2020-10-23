from flask import Blueprint

from flask_cors import cross_origin
from ..models import db, Equipment
bp = Blueprint('equipment', __name__, url_prefix='/api/equipment')


@bp.route('/', methods=['GET'])
@cross_origin()
def equipment():
    allEquipment = Equipment.query.all()
    data = [equipment.to_dict() for equipment in allEquipment]
    return {'data': data}
