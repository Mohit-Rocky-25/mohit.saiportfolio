import { spawn } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

mkdirSync('screenshots', { recursive: true });

async function main() {
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,900',
    'about:blank'
  ]);

  try {
    let list = null;
    for (let i = 0; i < 30; i++) {
      try {
        const res = await fetch('http://127.0.0.1:9222/json/list');
        if (res.ok) {
          list = await res.json();
          break;
        }
      } catch (e) {
        await new Promise(r => setTimeout(r, 200));
      }
    }

    if (!list) throw new Error("Could not connect to Edge DevTools");
    const pageTarget = list.find(t => t.type === 'page');
    if (!pageTarget) throw new Error("No page target found");

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let id = 1;
    const callbacks = new Map();
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        callbacks.get(msg.id)(msg);
        callbacks.delete(msg.id);
      }
    };

    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        callbacks.set(msgId, resolve);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');

    // 1. CAPTURE AT 1440x900
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    console.log('Navigating to http://localhost:5174/ ...');
    await send('Page.navigate', { url: 'http://localhost:5174/' });
    await new Promise(r => setTimeout(r, 3500));

    // Hero
    let snap = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('screenshots/hero-1440.png', Buffer.from(snap.result.data, 'base64'));

    // Work Section: RepoPilot
    await send('Runtime.evaluate', { expression: `document.getElementById('work').scrollIntoView({ behavior: 'instant' })` });
    await new Promise(r => setTimeout(r, 1000));
    snap = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('screenshots/work-repopilot-1440.png', Buffer.from(snap.result.data, 'base64'));

    // Work Section: Scroll down to HireFlow and UniLang
    await send('Runtime.evaluate', { expression: `window.scrollBy(0, 750)` });
    await new Promise(r => setTimeout(r, 800));
    snap = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('screenshots/work-hireflow-1440.png', Buffer.from(snap.result.data, 'base64'));

    await send('Runtime.evaluate', { expression: `window.scrollBy(0, 800)` });
    await new Promise(r => setTimeout(r, 800));
    snap = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('screenshots/work-unilang-1440.png', Buffer.from(snap.result.data, 'base64'));

    // About
    await send('Runtime.evaluate', { expression: `document.getElementById('about').scrollIntoView({ behavior: 'instant' })` });
    await new Promise(r => setTimeout(r, 1000));
    snap = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('screenshots/about-1440.png', Buffer.from(snap.result.data, 'base64'));

    // Interests
    await send('Runtime.evaluate', { expression: `document.getElementById('interests').scrollIntoView({ behavior: 'instant' })` });
    await new Promise(r => setTimeout(r, 1000));
    snap = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('screenshots/interests-1440.png', Buffer.from(snap.result.data, 'base64'));

    // Skills
    await send('Runtime.evaluate', { expression: `document.getElementById('skills').scrollIntoView({ behavior: 'instant' })` });
    await new Promise(r => setTimeout(r, 1000));
    snap = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('screenshots/skills-1440.png', Buffer.from(snap.result.data, 'base64'));

    // 2. CAPTURE AT 1366x768 (Verify no clipping)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1366,
      height: 768,
      deviceScaleFactor: 1,
      mobile: false
    });
    await send('Runtime.evaluate', {
      expression: `(() => {
        window.scrollTo(0, 0);
        window.dispatchEvent(new Event('resize'));
        window.ScrollTrigger?.refresh?.();
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));

    snap = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('screenshots/hero-768.png', Buffer.from(snap.result.data, 'base64'));

    await send('Runtime.evaluate', { expression: `document.getElementById('work').scrollIntoView({ behavior: 'instant' })` });
    await new Promise(r => setTimeout(r, 800));
    snap = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('screenshots/work-768.png', Buffer.from(snap.result.data, 'base64'));

    // 3. CAPTURE AT 390x844 (Mobile Viewport)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await send('Runtime.evaluate', {
      expression: `(() => {
        window.scrollTo(0, 0);
        window.dispatchEvent(new Event('resize'));
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));
    snap = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync('screenshots/hero-mobile.png', Buffer.from(snap.result.data, 'base64'));

    ws.close();
    console.log('Successfully captured desktop, 768p, and mobile screenshots!');
  } finally {
    edge.kill();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
