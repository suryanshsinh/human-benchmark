import sqlite3
import random
import string
import hashlib

class Database:
    def __init__(self, url='db.sqlite3'):
        self.url = url
        self.create_tables()

    def create_tables(self):
        with sqlite3.connect(self.url) as conn:
            c = conn.cursor()
            c.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL UNIQUE,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL,
                    auth_token TEXT
                )
            ''')
            c.execute('''
                CREATE TABLE IF NOT EXISTS tests (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL
                )
            ''')
            c.execute('''
                CREATE TABLE IF NOT EXISTS activity (
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    user_id INTEGER NOT NULL,
                    test_id TEXT NOT NULL,
                    score REAL,
                    FOREIGN KEY(user_id) REFERENCES users(id),
                    FOREIGN KEY(test_id) REFERENCES tests(id)
                )
            ''')
            conn.commit()

    def register_user(self, username, email, password):
        try:
            auth_token = ''.join(random.choices(string.ascii_letters + string.digits, k=32))
            hashed = hashlib.sha256(password.encode()).hexdigest()
            with sqlite3.connect(self.url) as conn:
                c = conn.cursor()
                c.execute('''
                    INSERT INTO users (username, email, password, auth_token)
                    VALUES (?, ?, ?, ?)
                ''', (username, email, hashed, auth_token))
                conn.commit()
            return {'success': True, 'token': auth_token}
        except Exception as e:
            err_str = str(e)
            if 'UNIQUE constraint failed: users.username' in err_str:
                return {'success': False, 'message': 'Username is already taken'}
            elif 'UNIQUE constraint failed: users.email' in err_str:
                return {'success': False, 'message': 'Email is already registered'}
            return {'success': False, 'message': 'Registration failed'}

    def login(self, identifier, password):
        try:
            hashed = hashlib.sha256(password.encode()).hexdigest()
            with sqlite3.connect(self.url) as conn:
                c = conn.cursor()
                c.execute('''
                    SELECT auth_token FROM users
                    WHERE (username = ? OR email = ?) AND password = ?
                ''', (identifier, identifier, hashed))
                row = c.fetchone()
            if row:
                return {'success': True, 'token': row[0]}
            return {'success': False, 'message': 'Invalid credentials'}
        except Exception as e:
            return {'success': False, 'message': str(e)}

    def get_user_by_token(self, token):
        with sqlite3.connect(self.url) as conn:
            c = conn.cursor()
            c.execute('SELECT id, username, email FROM users WHERE auth_token = ?', (token,))
            row = c.fetchone()
            if row:
                return {'id': row[0], 'username': row[1], 'email': row[2]}
        return None

    def add_test(self, test_id, name):
        try:
            with sqlite3.connect(self.url) as conn:
                c = conn.cursor()
                c.execute('''
                    INSERT OR IGNORE INTO tests (id, name)
                    VALUES (?, ?)
                ''', (test_id, name))
                conn.commit()
            return {'success': True}
        except Exception as e:
            return {'success': False, 'message': str(e)}

    def add_activity(self, user_id, test_id, score):
        try:
            with sqlite3.connect(self.url) as conn:
                c = conn.cursor()
                c.execute('''
                    INSERT INTO activity (user_id, test_id, score)
                    VALUES (?, ?, ?)
                ''', (user_id, test_id, score))
                conn.commit()
            return {'success': True}
        except Exception as e:
            return {'success': False, 'message': str(e)}
    
    def get_user_activity(self, user_id):
        with sqlite3.connect(self.url) as conn:
            c = conn.cursor()
            c.execute('''
                SELECT activity.created_at, activity.score, tests.name
                FROM activity
                JOIN tests ON tests.id = activity.test_id
                WHERE activity.user_id = ?
                ORDER BY activity.created_at DESC
            ''', (user_id,))
            rows = c.fetchall()
        history = []
        for row in rows:
            history.append({
                'created_at': row[0],
                'score': row[1],
                'test_name': row[2]
            })
        return history


if __name__ == '__main__':
    db = Database()
    db.add_test('memory', 'Memory Test')
    db.add_test('reaction', 'Reaction Test')
    db.add_test('clicking', 'Click Speed Test')
    db.add_test('typing', 'Typing Speed Test')