import json
from flask import Blueprint, render_template, redirect, url_for, jsonify
from flask_login import current_user, logout_user, login_user, login_required
from flask_cors import cross_origin
from ..forms import SignupForm
from ..models import db, User, Exercise

bp = Blueprint('exercises', __name__, url_prefix='/api/exercises')


@bp.route('/', methods=['GET'])
@cross_origin()
def listExercises():
    exercises = Exercise.query.all()

    allExercises = []

    for exercise in exercises:
        d = exercise.__dict__
        d['muscles'] = exercise.muscles[0].name
        # d['equipment'] = exercise.equipment.name
        d.pop('_sa_instance_state')

        allExercises.append(d)

    return jsonify(allExercises)


@bp.route('/exercise/<int:id>', methods=['GET'])
def listExerciseDetail(id):
    exercise = Exercise.query.get(id)
    d = exercise.__dict__
    d.pop('_sa_instance_state')
    print(d)

    return jsonify(d)
