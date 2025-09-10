import { test, expect } from '@playwright/test';

test.describe('Troubleshooting examples on example.com', () => {

  // 1) Element Not Found — inject a button after a short delay,
  // waitForSelector before clicking it.
  test('Element Not Found — wait before interaction', async ({ page }) => {
    await page.goto('https://example.com');

    // Inject a button after 500ms (simulates a dynamic element)
    await page.evaluate(() => {
      setTimeout(() => {
        const btn = document.createElement('button');
        btn.id = 'elementId';
        btn.textContent = 'Click me';
        // clicking marks it with a data attribute so the test can verify
        btn.addEventListener('click', () => {
          btn.setAttribute('data-clicked', 'true');
          btn.textContent = 'Clicked';
        });
        document.body.appendChild(btn);
      }, 500);
    });

    // Wait for the element, then click it (robust vs. immediate click)
    await page.waitForSelector('#elementId', { state: 'visible', timeout: 5000 });
    await page.click('#elementId');

    // Verify the click had effect
    await expect(page.locator('#elementId')).toHaveAttribute('data-clicked', 'true');
  });


  // 2) Timing Issues — create a delayed "results" element, wait for it instead of fixed timeout
  test('Timing Issues — wait for result instead of fixed timeout', async ({ page }) => {
    await page.goto('https://example.com');

    // Inject a "results" div after ~1.2s to simulate slow loading
    await page.evaluate(() => {
      setTimeout(() => {
        const div = document.createElement('div');
        div.id = 'results';
        div.textContent = 'Results loaded';
        document.body.appendChild(div);
      }, 1200);
    });

    // Wait for the results element to become visible (no fixed sleep)
    await page.waitForSelector('#results', { state: 'visible', timeout: 5000 });
    await expect(page.locator('#results')).toHaveText('Results loaded');
  });


  // 3) Iframe Handling — inject an iframe via srcdoc and interact with it
  test('Iframe Handling — interact with injected iframe', async ({ page }) => {
    await page.goto('https://example.com');

    // Inject an iframe with a small inner page (srcdoc) that contains a button + result div
    await page.evaluate(() => {
      const iframeHTML = `
        <html>
          <body>
            <button id="iframe-button">Click iframe</button>
            <div id="iframe-result" style="display:none">Done</div>
            <script>
              document.getElementById('iframe-button').addEventListener('click', () => {
                document.getElementById('iframe-result').style.display = 'block';
              });
            </script>
          </body>
        </html>
      `;
      const iframe = document.createElement('iframe');
      iframe.id = 'demo-iframe';
      iframe.srcdoc = iframeHTML;
      iframe.style.width = '600px';
      iframe.style.height = '160px';
      document.body.appendChild(iframe);
    });

    // Use frameLocator to reach inside the iframe and click the button
    const frame = page.frameLocator('#demo-iframe');
    await frame.locator('#iframe-button').click();

    // Assert the result inside the iframe is visible
    await expect(frame.locator('#iframe-result')).toBeVisible();
  });

});
