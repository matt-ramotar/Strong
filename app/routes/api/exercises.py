import json
from flask import Blueprint, render_template, redirect, url_for, jsonify
from flask_login import current_user, logout_user, login_user, login_required
from flask_cors import cross_origin
from app.forms import SignupForm
from app.models import db, User, Exercise

bp = Blueprint('exercises', __name__, url_prefix='/api/exercises')


@bp.route('/', methods=['GET'])
@cross_origin()
def listExercises():
    exercises = Exercise.query.all()
    print(exercises[0].instructions[0])
    data = [exercise.to_dict() for exercise in exercises]
    print(exercises[0].equipment)
    return {'data': data}


@bp.route('/exercise/<int:id>', methods=['GET'])
def listExerciseDetail(id):
    exercise = Exercise.query.get(id)
    d = exercise.__dict__
    d.pop('_sa_instance_state')
    print(d)

    return jsonify(d)
