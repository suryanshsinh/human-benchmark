from flask import Blueprint, render_template, request, jsonify, make_response, redirect
from db import Database
import asyncio

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET'])
def login_page():
    return render_template('login.html')

@auth_bp.route('/login', methods=['POST'])
async def login_api():
    await asyncio.sleep(1)
    data = request.get_json()
    identifier = data.get('username') or data.get('email')
    password = data.get('password')
    if not identifier or not password:
        return jsonify({'success': False, 'message': 'Missing credentials'}), 400
    db_ = Database()
    result = db_.login(identifier, password)
    if result.get('success'):
        resp = make_response(jsonify(result))
        resp.set_cookie(
            'session',
            result['token'],
            httponly=True,
            secure=False,
            samesite='Lax'
        )
        return resp
    return jsonify(result), 401

@auth_bp.route('/register', methods=['GET'])
def register_page():
    return render_template('register.html')

@auth_bp.route('/register', methods=['POST'])
async def register_api():
    await asyncio.sleep(1)
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    if not username or not email or not password:
        return jsonify({'success': False, 'message': 'Missing registration details'}), 400
    db_ = Database()
    result = db_.register_user(username, email, password)
    if result.get('success'):
        resp = make_response(jsonify(result))
        resp.set_cookie(
            'session',
            result['token'],
            httponly=True,
            secure=False,
            samesite='Lax'
        )
        return resp
    return jsonify(result), 400

@auth_bp.route('/logout')
def logout():
    resp = make_response(redirect('/'))
    resp.set_cookie('session', '', expires=0)
    return resp
