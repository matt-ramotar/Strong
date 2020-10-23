from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, backref
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String, DateTime, Float, Text
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

Base = declarative_base()


class Equipment(db.Model):
    __tablename__ = 'equipment'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)

    # Many to one
    exercises = db.relationship('Exercise', back_populates='equipment')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': '🚲'
        }

    def to_string(self):
        return self.name


class Exercise_Type(db.Model):
    __tablename__ = 'exercise_types'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(100), nullable=False)

    # Many to one
    exercises = db.relationship('Exercise', back_populates='exercise_type')

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type
        }


class Exercise(db.Model):
    __tablename__ = 'exercises'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    bbPageUrl = db.Column(db.String(255), nullable=True)
    typeId = db.Column(db.Integer, db.ForeignKey('exercise_types.id'), nullable=True)
    equipmentId = db.Column(db.Integer, db.ForeignKey('equipment.id'), nullable=True)

    # One to many
    exercise_type = db.relationship('Exercise_Type', back_populates='exercises')
    equipment = db.relationship('Equipment', back_populates='exercises')

    # Many to one
    instructions = db.relationship('Instruction', back_populates='exercise')
    media = db.relationship('Media', back_populates='exercise')

    # Many to many
    muscles = db.relationship('Muscle', back_populates='exercises', secondary='exercises_muscles')
    workouts = db.relationship('Workout', secondary='sets')

    def to_dict(self):
        if self.equipment:
            equipment = self.equipment.to_string()
        else:
            equipment = None

        return {
            'id': self.id,
            'name': self.name,
            'bbPageUrl': self.bbPageUrl,
            'typeId': self.typeId,
            'equipment': equipment,
            'instructions': [instruction.to_string() for instruction in self.instructions],
            'muscles': ','.join([muscle.to_string() for muscle in self.muscles]),
            'workouts': [workout.to_dict() for workout in self.workouts],
            'type': '🏋🏽'
        }


class Instruction(db.Model):
    __tablename__ = 'instructions'
    id = db.Column(db.Integer, primary_key=True)
    instruction = db.Column(db.Text, nullable=False)
    exerciseId = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)

    # One to many
    exercise = db.relationship('Exercise', back_populates='instructions')

    def to_dict(self):
        return {
            'id': self.id,
            'instruction': self.instruction,
            'exerciseId': self.exerciseId
        }

    def to_string(self):
        return self.instruction


class Media_Type(db.Model):
    __tablename__ = 'media_types'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(100), nullable=False)

    # Many to one
    media = db.relationship('Media', back_populates='type')


class Media(db.Model):
    __tablename__ = 'media'
    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.Text, nullable=False)
    typeId = db.Column(db.Integer, db.ForeignKey('media_types.id'), nullable=False)
    exerciseId = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)

    # One to many
    type = db.relationship('Media_Type', back_populates='media')
    exercise = db.relationship('Exercise', back_populates='media')


class Muscle(db.Model):
    __tablename__ = 'muscles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

    # Many to many
    exercises = db.relationship('Exercise', back_populates='muscles', secondary='exercises_muscles')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': '💪🏽'
        }

    def to_string(self):
        return self.name


class Program(db.Model):
    __tablename__ = 'programs'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

    # Many to one
    routines = db.relationship('Routine', back_populates='program')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'routines': [routine.to_dict() for routine in self.routines]
        }


class Routine(db.Model):
    __tablename__ = 'routines'
    id = db.Column(db.Integer, primary_key=True)
    programId = db.Column(db.Integer, db.ForeignKey('programs.id'), nullable=True)

    # One to many
    program = db.relationship('Program', back_populates='routines')

    # Many to one
    workouts = db.relationship('Workout', back_populates='routine')

    def to_dict(self):
        return {
            'id': self.id,
            'programId': self.programId,
            'program': self.program.to_dict(),
            'workouts': [workout.to_dict() for workout in self.workouts]
        }


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(100), nullable=False)
    lastName = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    hashedPassword = db.Column(db.String(100), nullable=False)

    # Many to one
    workouts = db.relationship('Workout', back_populates='user')

    @property
    def password(self):
        return self.hashedPassword

    @password.setter
    def password(self, password):
        self.hashedPassword = generate_password_hash(password)

    def checkPassword(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "username": self.username,
            "email": self.email,
            "hashedPassword": self.hashedPassword,
        }


class Workout(db.Model):
    __tablename__ = 'workouts'
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    routineId = db.Column(db.Integer, db.ForeignKey('routines.id'), nullable=True)
    start = db.Column(db.DateTime, nullable=False)
    end = db.Column(db.DateTime, nullable=True)

    # One to many
    user = db.relationship('User', back_populates='workouts')
    routine = db.relationship('Routine', back_populates='workouts')

    # Many to many
    exercises = db.relationship('Exercise', secondary='sets')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'routineId': self.routineId,
            'start': self.start,
            'end': self.end,
            'user': self.user.to_dict(),
            'routine': self.routine.to_dict(),
            'exercises': [exercise.to_dict() for exercise in self.exercises]
        }


class Set(db.Model):
    __tablename__ = 'sets'
    id = db.Column(db.Integer, primary_key=True)
    reps = db.Column(db.Integer, nullable=True)
    pounds = db.Column(db.Integer, nullable=True)
    workoutId = db.Column(db.Integer, db.ForeignKey('workouts.id'), nullable=False)
    exerciseId = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)

    # One to many
    workout = relationship(Workout, backref=db.backref('sets', cascade='all'))
    exercise = relationship(Exercise, backref=db.backref('sets', cascade='all'))

    def to_dict(self):
        return {
            'id': self.id,
            'reps': self.reps,
            'pounds': self.pounds,
            'workoutId': self.workoutId,
            'exerciseId': self.exerciseId,
            'workout': self.workout.to_dict(),
            'exercise': self.exercise.to_dict(),
        }


class Exercise_Muscle(db.Model):
    __tablename__ = 'exercises_muscles'
    id = db.Column(db.Integer, primary_key=True)
    exerciseId = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)
    muscleId = db.Column(db.Integer, db.ForeignKey('muscles.id'), nullable=False)

    exercise = relationship(Exercise, backref=db.backref('exercises_muscles', cascade='all'))
    muscle = relationship(Muscle, backref=db.backref('exercises_muscles', cascade='all'))
