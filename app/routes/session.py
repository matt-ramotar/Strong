from flask import Blueprint, render_template, redirect, url_for
from flask_login import current_user, logout_user, login_user, login_required

from ..forms import LoginForm
from ..models import User

bp = Blueprint('session', __name__, url_prefix='/session')


@bp.route('/', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index.index'))

    form = LoginForm()

    from pprint import pprint
    pprint(form.data)
    if form.validate_on_submit():
        username = form.username.data
        user = User.query.filter(User.username == username).first()
        if not user or not user.check_password(form.password.data):
            return redirect(url_for('.login'))
        login_user(user)
        return redirect(url_for('index.index'))
    return render_template('login.html', form=form)
