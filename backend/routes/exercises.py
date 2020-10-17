from flask import Blueprint, render_template, redirect, url_for
from flask_login import current_user, logout_user, login_user, login_required
from ..forms import SignupForm
from ..models import db, User, Exercise

bp = Blueprint('exercises', __name__, url_prefix='/exercises')


@bp.route('/', methods=['GET'])
def listExercises():
    exercises = Exercise.query.all()
    for exercise in exercises:
        temp = vars(exercise)

    return render_template('exercises.html', exercises=exercises)


@bp.route('/<int:id>', methods=['GET'])
def listExerciseDetail(id):
    exercise = Exercise.query.get(id)
    print(exercise)

    return render_template('exercise.html', exercise=exercise)
