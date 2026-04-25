from flask import Flask, request, render_template, redirect, url_for, make_response, send_from_directory
import os, hashlib, yaml
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = 'datavault_secret_k3y_2024'

UPLOAD_FOLDER = '/app/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

USERS = {
    'operator': hashlib.md5(b'D4t4V4ult#2024').hexdigest()
}

def get_session():
    s = request.cookies.get('dv_session', '')
    if ':' in s:
        p = s.split(':', 1)
        return p[0], p[1]
    return None, None

@app.route('/')
def index():
    username, _ = get_session()
    if not username:
        return redirect(url_for('login'))
    files = sorted(os.listdir(UPLOAD_FOLDER))
    return render_template('index.html', username=username, files=files)

@app.route('/login', methods=['GET','POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form.get('username', '')
        password = request.form.get('password', '')
        pw_hash = hashlib.md5(password.encode()).hexdigest()
        if username in USERS and USERS[username] == pw_hash:
            resp = make_response(redirect(url_for('index')))
            resp.set_cookie('dv_session', f'{username}:authenticated')
            return resp
        error = 'Invalid credentials'
    return render_template('login.html', error=error)

@app.route('/logout')
def logout():
    resp = make_response(redirect(url_for('login')))
    resp.delete_cookie('dv_session')
    return resp

@app.route('/upload', methods=['POST'])
def upload():
    username, _ = get_session()
    if not username:
        return redirect(url_for('login'))
    if 'file' not in request.files:
        return redirect(url_for('index'))
    f = request.files['file']
    if not f.filename:
        return redirect(url_for('index'))
    filename = secure_filename(f.filename)
    f.save(os.path.join(UPLOAD_FOLDER, filename))
    return redirect(url_for('preview', filename=filename))

@app.route('/preview/<path:filename>')
def preview(filename):
    username, _ = get_session()
    if not username:
        return redirect(url_for('login'))
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    if not os.path.exists(filepath):
        return 'File not found', 404
    content = None
    parsed = None
    error = None
    ext = filename.rsplit('.', 1)[-1].lower() if '.' in filename else ''
    if ext in ('yml', 'yaml'):
        try:
            with open(filepath, 'r') as fh:
                raw = fh.read()
            content = raw
            # VULN: uses UnsafeLoader — allows arbitrary Python object instantiation
            parsed = str(yaml.load(raw, Loader=yaml.UnsafeLoader))
        except Exception as e:
            error = str(e)
    else:
        try:
            with open(filepath, 'rb') as fh:
                content = fh.read(4096).decode('utf-8', errors='replace')
        except Exception as e:
            error = str(e)
    return render_template('preview.html', username=username, filename=filename,
                           content=content, parsed=parsed, error=error)

@app.route('/download/<path:filename>')
def download(filename):
    username, _ = get_session()
    if not username:
        return redirect(url_for('login'))
    return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
