import sqlite3, random, string, hashlib

class Database:
    def __init__(self, url='db.sqlite3'):
        self.conn = sqlite3.connect(url)
        self.c = self.conn.cursor()
    
    def create_tables(self):
        try:
            self.c.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL UNIQUE,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL,
                    auth_token TEXT
                )
            ''')
            conn.commit()
            
            self.c.execute('''
                CREATE TABLE IF NOT EXISTS games (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL
                )
            ''')
            conn.commit()
            
            self.c.execute('''
                CREATE TABLE IF NOT EXISTS activity (
                    user_id INTEGER NOT NULL,
                    game_id INTEGER NOT NULL,
                    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY(user_id) REFERENCES users(id),
                    FOREIGN KEY(game_id) REFERENCES games(id)
                )
            ''')
            self.conn.commit()
            return {
                'success': True,
                'message': 'Tables created successfully'
            }
        except Exception as e:
            return {
                'success': False,
                'message': str(e)
            }
    
    def insert_user(self, username, email, password):
        try:
            auth_token = ''.join(random.choices(string.ascii_letters + string.digits, k=32))
            password = hashlib.sha256(password.encode()).hexdigest()
            self.c.execute('''
                INSERT INTO users (username, email, password, auth_token)
                VALUES (?, ?, ?, ?)
            ''', (username, email, password, auth_token))
            self.conn.commit()
            return {
                'success': True,
                'message': self.conn.total_changes
            }
        except Exception as e:
            return {
                'success': False,
                'message': str(e)
            }
    
    def available_username(self, username):
        self.c.execute('SELECT * FROM users WHERE username = ?', (username,))
        return not self.c.fetchone()
    
    def display_users(self):
        self.c.execute('SELECT * FROM users')
        for user in self.c.fetchall():
            print(user)
    
    def login(self, username, password):
        password = hashlib.sha256(password.encode()).hexdigest()
        if '@' in username:
            self.c.execute('SELECT * FROM users WHERE username = ? AND password = ?', (username, password))
        else:
            self.c.execute('SELECT * FROM users WHERE email = ? AND password = ?', (username, password))
        user = self.c.fetchone()
        if user:
            return {
                'success': True,
                'message': 'Login successful',
                'token': user[4]
            }
        return {
            'success': False,
            'message': 'Invalid credentials'
        }
    
    def close(self):
        self.conn.close()

if __name__ == '__main__':
    db = Database()
    db.create_tables()
    db.insert_user('admin', 'admin@admin.admin', 'admin')
    db.display_users()