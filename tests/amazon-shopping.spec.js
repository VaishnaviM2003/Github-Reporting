import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.com/');
  await page.getByRole('searchbox', { name: 'Search Amazon' }).click();
  await page.getByRole('searchbox', { name: 'Search Amazon' }).fill('fastrack groove watches');
  await page.getByRole('searchbox', { name: 'Search Amazon' }).press('Enter');
  await page.getByRole('button', { name: 'Submit' }).first().click();
  await page.getByRole('button', { name: 'Go', exact: true }).click();
  await page.getByRole('listitem').filter({ hasText: 'Overall PickAmazon\'s Choice:' }).locator('a').first().click();
  await page.getByRole('radio', { name: 'Rose Gold 3 options from $' }).click();
  await page.goto('https://www.amazon.com/Fitpolo-Touchscreen-Waterproof-Activity-Smartwatch/dp/B0DFM5C66G/ref=sr_1_2?crid=1JU2MAQTH6Q5B&dib=eyJ2IjoiMSJ9.zf38IvV5c03VN3LoHwmRyzjxfWDOO7DtqxdFt1pG6S8pfeG0pz0KpQftqfO8YyxyKnkO7nbvaY2QdiiUNfHPwX5RUtsKPQHyw7KMLOoEnFGI1T2W7hhAkTnYfqU4JZwVPhvr0ui3D1vtvMXzaGYqzQ.yUnuSXG4QmEp2sIe0DGVAT9tRugt0qYQbz24VXyJ390&dib_tag=se&keywords=fastrack%2Bgroove%2Bwatches&qid=1756880283&sprefix=fastrack%2Bgroove%2Bwatches%2Caps%2C376&sr=8-2&th=1');
  await page.getByRole('link', { name: 'See All Buying Options' }).click();
  await page.getByRole('button', { name: 'Add to Cart from seller' }).click();
  await page.locator('#sw-atc-actions-buy-box-sign-in').click();
  await page.getByRole('button', { name: 'Proceed to checkout (1 item)' }).click();
});