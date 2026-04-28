## Expected Student Workflow

| **Step** | **Action** | **Tool** |
| --- | --- | --- |
| 1 | Navigate to `http://lab1` in Parrot browser | Firefox |
| 2 | Inspect page source; find HTML comment: `<! -\!- sometimes simplify and search -\!->` | Browser devtools |
| 3 | Access `http://lab1/pebcak.html`; read SSH credentials | Browser |
| 4 | `ssh blackmesa@lab1` (pfSense DNAT forwards TCP 22) | SSH |
| 5 | `cat  /flag.txt` — retrieves Flag 1 and pfSense credentials | Terminal |
| 6 | SSH to pfSense from Server: `ssh admin@172.16.x.x` | SSH (optional) |