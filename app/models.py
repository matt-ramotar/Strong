from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


exercises_muscles = db.Table('exercises_muscles',
                             db.Column('exerciseId', db.Integer, db.ForeignKey('exercises.id')),
                             db.Column('muscleId', db.Integer, db.ForeignKey('muscles.id')))


class Exercise(db.Model):
    __tablename__ = 'exercises'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    bbPageUrl = db.Column(db.String(255), nullable=True)
    typeId = db.Column(db.Integer, db.ForeignKey('exercise_types.id'), nullable=False)
    equipmentId = db.Column(db.Integer, db.ForeignKey('equipment.id'), nullable=False)

    # One to many
    exercise_type = db.relationship('Exercise_Type', back_populates='exercises')
    equipment = db.relationship('Equipment', back_populates='exercises')

    # Many to one
    instructions = db.relationship('Instruction', back_populates='exercise')
    media = db.relationship('Media', back_populates='exercise')

    # Many to many
    muscles = db.relationship('Muscle', back_populates='exercises', secondary='exercises_muscles')
    workouts = db.relationship('Workout', back_populates='exercises', secondary='sets')


class Equipment(db.Model):
    __tablename__ = 'equipment'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), primary_key=True, nullable=False)

    exercises = db.relationship('Exercise', back_populates='equipment')


class Exercise_Type(db.Model):
    __tablename__ = 'exercise_types'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(100), nullable=False)

    exercises = db.relationship('Exercise', back_populates='exercise_type')


class Instruction(db.Model):
    __tablename__ = 'instructions'
    id = db.Column(db.Integer, primary_key=True)
    instruction = db.Column(db.Text, nullable=False)
    exerciseId = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)

    exercise = db.relationship('Exercise', back_populates='instructions')


class Media(db.Model):
    __tablename__ = 'media'
    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.Text, nullable=False)
    typeId = db.Column(db.Integer, db.ForeignKey('media_types.id'), nullable=False)
    exerciseId = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)

    type = db.relationship('Media_Type', back_populates='media')


class Media_Type(db.Model):
    __tablename__ = 'media_types'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(100), nullable=False)

    media = db.relationship('Media', back_populates='type')


class Muscle(db.Model):
    __tablename__ = 'muscles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

    exercises = db.relationship('Exercise', back_populates='muscles', secondary='exercises_muscles')


class Set(db.Model):
    __tablename__ = 'sets'
    id = db.Column(db.Integer, primary_key=True)
    reps
    pounds
    workoutId
    exerciseId
