from flask import Flask, render_template, request, redirect, g
from tests import tests_bp
from auth import auth_bp
from db import Database

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

app.register_blueprint(tests_bp)
app.register_blueprint(auth_bp)

@app.before_request
def load_current_user():
    token = request.cookies.get('session')
    if token:
        db_ = Database()
        user = db_.get_user_by_token(token)
        g.current_user = user
    else:
        g.current_user = None

@app.context_processor
def inject_user():
    return {'current_user': g.get('current_user', None)}

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/dashboard')
def dashboard():
    if not g.get('current_user'):
        return redirect('/login')
    return render_template('dashboard.html')

from flask import Flask, render_template, request, jsonify, g, redirect
from tests import tests_bp
from auth import auth_bp
from db import Database

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

app.register_blueprint(tests_bp)
app.register_blueprint(auth_bp)

@app.before_request
def load_current_user():
    token = request.cookies.get('session')
    if token:
        db_ = Database()
        user = db_.get_user_by_token(token)
        g.current_user = user
    else:
        g.current_user = None

@app.context_processor
def inject_user():
    return {'current_user': g.get('current_user', None)}

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/dashboard')
def dashboard():
    if not g.get('current_user'):
        return redirect('/login')
    return render_template('dashboard.html')

@app.route('/save-test', methods=['POST'])
def save_test():
    if not g.get('current_user'):
        return jsonify({'success': False, 'message': 'Unauthorized'}), 401
    data = request.get_json()
    test_id = data.get('test_id')
    score = data.get('score')
    if not test_id or score is None:
        return jsonify({'success': False, 'message': 'Missing test_id or score'}), 400
    db_ = Database()
    result = db_.add_activity(g.current_user['id'], test_id, score)
    if result.get('success'):
        return jsonify({'success': True, 'message': 'Activity recorded'})
    return jsonify(result), 400

@app.route('/api/history')
def api_history():
    if not g.current_user:
        return jsonify({'success': False, 'message': 'Unauthorized'}), 401
    db_ = Database()
    data = db_.get_user_activity(g.current_user['id'])
    return jsonify({'success': True, 'history': data})

if __name__ == '__main__':
    app.run(debug=True)
