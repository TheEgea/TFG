from flask import Flask, request, render_template, redirect, url_for, make_response
import sqlite3, hashlib

app = Flask(__name__)
DB = '/opt/synapse/synapse.db'

def get_db():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn

def get_session():
    session = request.cookies.get('session', '')
    if not session or ':' not in session:
        return None, None, None
    parts = session.split(':')
    return parts[0] if len(parts)>0 else None, parts[1] if len(parts)>1 else 'guest', parts[2] if len(parts)>2 else 'unknown'

@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET','POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        pw_hash = hashlib.md5(password.encode()).hexdigest()
        db = get_db()
        user = db.execute("SELECT * FROM users WHERE username=? AND password=?",
                          (username, pw_hash)).fetchone()
        db.close()
        if user:
            resp = make_response(redirect(url_for('portal')))
            resp.set_cookie('session', f"{user['id']}:{user['role']}:{user['username']}",
                            httponly=False)
            return resp
        error = 'Invalid credentials'
    return render_template('login.html', error=error)

@app.route('/portal')
def portal():
    uid, role, username = get_session()
    if not uid:
        return redirect(url_for('login'))
    db = get_db()
    reports = db.execute("SELECT * FROM reports ORDER BY id DESC LIMIT 5").fetchall()
    db.close()
    return render_template('portal.html', username=username, role=role, reports=reports)

@app.route('/admin')
def admin():
    uid, role, username = get_session()
    if not uid:
        return redirect(url_for('login'))
    if role != 'admin':
        return render_template('forbidden.html'), 403
    db = get_db()
    intel = db.execute("SELECT * FROM classified_intel ORDER BY id DESC").fetchall()
    db.close()
    return render_template('admin.html', username=username, role=role, intel=intel)

@app.route('/comments', methods=['GET','POST'])
def comments():
    session = request.cookies.get('session', '')
    db = get_db()
    if request.method == 'POST':
        body = request.form.get('body', '')
        author = session.split(':')[2] if session and len(session.split(':'))>2 else 'anonymous'
        db.execute("INSERT INTO comments (body, author) VALUES (?, ?)", (body, author))
        db.commit()
    comments = db.execute("SELECT * FROM comments ORDER BY id DESC").fetchall()
    db.close()
    return render_template('comments.html', comments=comments)

@app.route('/search')
def search():
    uid, role, username = get_session()
    if not uid:
        return redirect(url_for('login'))
    q = request.args.get('q', '')
    results = []
    error = None
    if q:
        db = get_db()
        try:
            query = "SELECT * FROM reports WHERE title LIKE '%" + q + "%'"
            results = db.execute(query).fetchall()
        except Exception as e:
            error = str(e)
        finally:
            db.close()
    return render_template('search.html', results=results, q=q, error=error)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)