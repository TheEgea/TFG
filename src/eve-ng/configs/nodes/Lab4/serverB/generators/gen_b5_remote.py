import random, subprocess, os
from PIL import Image

random.seed(99)
img = Image.new('RGB', (640, 480))
pix = img.load()
for y in range(480):
    for x in range(640):
        base = int(40 + 80*(y/480))
        noise = random.randint(-20, 20)
        v = max(0, min(255, base + noise))
        if 100 < x < 200 and 100 < y < 380:
            v = max(0, min(255, v + 60))
        elif 440 < x < 540 and 100 < y < 380:
            v = max(0, min(255, v + 60))
        pix[x, y] = (v, v, max(0, v-10))

jp = '/srv/public/uploads/B5_camara_seguridad.jpg'
img.save(jp, 'JPEG', quality=85)

with open('/tmp/b5f.txt', 'w') as f:
    f.write('H4U{st3gh1d3_p4ssw0rd_cr4ck}\n')

r = subprocess.run(
    ['steghide', 'embed', '-cf', jp, '-sf', jp, '-p', 'novacorp', '-f', '-q'],
    capture_output=True
)
os.remove('/tmp/b5f.txt')
if r.returncode == 0:
    print('B5 OK -', jp)
else:
    print('ERR:', r.stderr.decode())
