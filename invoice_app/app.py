from flask import Flask, request, jsonify, session, redirect, url_for, render_template
from flask_session import Session
from flask_cors import CORS  # Import CORS
from flask_sqlalchemy import SQLAlchemy
import sqlite3

app = Flask(__name__)
app.config['SECRET_KEY'] = 'bwiohgoiwhbgoiwhjoigbwoi'
app.config['SESSION_TYPE'] = 'filesystem'
db = SQLAlchemy(app)
Session(app)

# Initialize CORS with default settings
CORS(app)

# Dummy user for demonstration
users = {'user': '123'}

def get_db_connection():
    conn = sqlite3.connect('invoice_db.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        username = data.get('username')
        password = data.get('password')
        if username in users and users[username] == password:
            session['user'] = username
            print('1', session)
            return jsonify({'message': 'Login successful', 'match': True})
        else:
            return jsonify({'message': 'Invalid credentials', 'match': False})



@app.route('/')
def index():
    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM posts').fetchall()
    conn.close()
    return render_template('index.html', posts=posts)

@app.route('/logout')
def logout():
    # Clear the user's session
    print('shubham')
    session.clear()
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)

    