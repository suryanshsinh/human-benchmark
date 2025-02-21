from flask import Blueprint, render_template

tests_bp = Blueprint('tests', __name__)

@tests_bp.route('/click-speed-test')
def click_speed_test():
    return render_template('click-speed-test.html')

@tests_bp.route('/reaction-test')
def reaction_test():
    return render_template('reaction-test.html')

@tests_bp.route('/typing-test')
def typing_test():
    return render_template('typing-test.html')

@tests_bp.route('/memory-test')
def memory_test():
    return render_template('memory-test.html')
