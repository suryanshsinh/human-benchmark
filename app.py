from flask import *
import time, db, asyncio

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/click-speed-test')
def click_speed_test():
    return render_template('click-speed-test.html')

@app.route('/memory-test')
def memory_test():
    return render_template('memory-test.html')

@app.route('/reaction-test')
def reaction_test():
    return render_template('reaction-test.html')

@app.route('/typing-test')
def typing_test():
    return render_template('typing-test.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/login', methods=['POST'])
async def login_post():
    await asyncio.sleep(2)
    try:
        db_ = db.Database()
        data = request.get_json()
        username = data['username']
        password = data['password']
        res = db_.login(username, password)
        db_.close()
        print(res)
        if res['success']:
            return {
                'success': True,
                'message': res['message'],
                'token': res['token']
            }
        return {
            'success': False,
            'message': res['message']
        }, 400
    except Exception as e:
        print(e)
        return {
            'success': False,
            'message': str(e)
        }, 400

if __name__ == '__main__':
    app.run()