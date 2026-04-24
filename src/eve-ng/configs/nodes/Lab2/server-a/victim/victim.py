import time
from playwright.sync_api import sync_playwright

BASE = "http://nginx"
USER = "guest"
PASS = "guest123"

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        while True:
            try:
                page.goto(f"{BASE}/login", wait_until="networkidle")
                page.fill('input[name="username"]', USER)
                page.fill('input[name="password"]', PASS)
                page.click('button[type="submit"]')
                page.goto(f"{BASE}/comments", wait_until="networkidle")
                page.wait_for_timeout(8000)
            except Exception as e:
                print("victim error:", e)

            time.sleep(20)

if __name__ == "__main__":
    run()
