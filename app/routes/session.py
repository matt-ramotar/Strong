from flask import Blueprint, render_template, redirect, url_for
from flask_login import current_user, logout_user, login_user, login_required
from pprint import pprint

from ..forms import LoginForm, SignupForm
from ..models import db, User

bp = Blueprint('session', __name__, url_prefix='/session')


@bp.route('/', methods=['GET', 'POST'])
def login():
    form = LoginForm()

    if current_user.is_authenticated:
        return redirect(url_for('index.index'))

    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if not user or not user.checkPassword(form.password.data):
            return redirect(url_for('.login'))
        login_user(user)
        return redirect(url_for('index.index'))
    return render_template('login.html', form=form)


@bp.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return redirect(url_for('.login'))
