import sqlite3, hashlib

DB = '/opt/synapse/synapse.db'
conn = sqlite3.connect(DB)
c = conn.cursor()

c.executescript('''
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS admin_users;
DROP TABLE IF EXISTS classified_intel;

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT,
    role TEXT
);
CREATE TABLE reports (
    id INTEGER PRIMARY KEY,
    title TEXT,
    body TEXT,
    author TEXT,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE comments (
    id INTEGER PRIMARY KEY,
    body TEXT,
    author TEXT,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE admin_users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT,
    flag TEXT
);
CREATE TABLE classified_intel (
    id INTEGER PRIMARY KEY,
    title TEXT,
    content TEXT,
    classification TEXT,
    author TEXT,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP
);
''')

c.execute("INSERT INTO users VALUES (1,'admin',?,'admin')",
          (hashlib.md5(b'Admin@Synapse2024').hexdigest(),))
c.execute("INSERT INTO users VALUES (2,'guest',?,'guest')",
          (hashlib.md5(b'guest123').hexdigest(),))

for i in range(1, 6):
    c.execute("INSERT INTO reports (title, body, author) VALUES (?,?,?)",
              (f"Incident Report #{i:03d}",
               f"Analysis of anomalous activity detected in sector {i}. Severity: {'HIGH' if i%2==0 else 'MEDIUM'}.",
               "admin"))

c.execute("INSERT INTO admin_users VALUES (1,'monitor','M0nit0r2024','FLAG{synapse_sqli_creds_dumped}')")

c.execute('''INSERT INTO classified_intel VALUES (
    1,
    "OPERATION NEXUS -- ACTIVE",
    "Internal analytics node is operational at http://192.168.30.20 (SYNAPSE DataVault).\nAccess credentials: operator / D4t4V4ult#2024\n\nClassified flag: FLAG{synapse_admin_classified_accessed}\n\nWARNING: This system contains sensitive corporate data. Unauthorized access is monitored.",
    "TOP SECRET",
    "admin",
    CURRENT_TIMESTAMP
)''')

conn.commit()
conn.close()
print("[+] Database initialized OK")