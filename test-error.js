const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const http = require('http');

async function waitForServer(url) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      http.get(url, (res) => {
        if (res.statusCode === 200) {
          clearInterval(interval);
          resolve();
        }
      }).on('error', () => {});
    }, 500);
  });
}

(async () => {
  const server = spawn('npm', ['run', 'dev'], { stdio: 'pipe', shell: true });
  
  await waitForServer('http://localhost:5173');

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  page.on('requestfailed', request => console.log('BROWSER REQUEST FAILED:', request.url(), request.failure().errorText));

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  // Wait a bit to let React render and potentially crash
  await new Promise(r => setTimeout(r, 3000));
  
  await browser.close();
  server.kill();
  process.exit(0);
})();