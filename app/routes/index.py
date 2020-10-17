from flask import Blueprint, render_template, redirect, url_for
from flask_login import current_user, logout_user, login_user, login_required
from ..forms import SignupForm
from ..models import db, User

bp = Blueprint('index', __name__, url_prefix='')


@bp.route('/')
def index():
    return render_template('home.html')


@bp.route('/register', methods=['GET', 'POST'])
def signup():
    form = SignupForm()

    if form.validate_on_submit():
        try:
            db.session.add(User(
                firstName=form.firstName.data,
                lastName=form.lastName.data,
                username=form.username.data,
                email=form.email.data,
                password=form.password.data
            ))
            db.session.commit()
            user = User.query.filter_by(username=form.username.data).first()
            login_user(user)
            return redirect(url_for('index.index'))

        # TODO: Display error

        except Exception as error:
            print(error)
            return redirect(url_for('.signup'))

    return render_template('signup.html', form=form)
