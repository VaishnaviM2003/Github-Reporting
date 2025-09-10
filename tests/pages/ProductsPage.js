class ProductsPage {
  constructor(page) {
    this.page = page;
    this.searchInput = '#search_product';
    this.searchButton = '#submit_search';
    this.productItem = '.productinfo';
    this.addToCartButton = '.add-to-cart';
    this.cartButton = 'a[href="/view_cart"]';
  }

  async navigate() {
    await this.page.goto('https://automationexercise.com/products', {
      waitUntil: 'domcontentloaded',
      timeout: 90_000,
    });
  }

  async searchProduct(productName) {
    await this.page.fill(this.searchInput, productName);
    try {
      await this.page.click(this.searchButton, { timeout: 5000 });
    } catch {
      await this.page.press(this.searchInput, 'Enter');
    }
  }

  async getProductCount() {
    return await this.page.locator(this.productItem).count();
  }

  async addFirstProductToCart() {
    await this.page.hover(this.productItem);
    await this.page.click(this.addToCartButton, { force: true });

    const modalVisible = await this.page.locator('#cartModal').isVisible({ timeout: 5000 }).catch(() => false);
    if (modalVisible) {
      await this.page.waitForSelector('#cartModal', { state: 'visible', timeout: 5000 });
    }
  }

  async goToCart() {
    if (await this.page.locator('#cartModal').isVisible().catch(() => false)) {
      await this.page.click('#cartModal .btn-success', { force: true }).catch(() => {});
      await this.page.waitForSelector('#cartModal', { state: 'hidden', timeout: 5000 }).catch(() => {});
    }
    await this.page.click(this.cartButton, { force: true });
  }
}

module.exports = ProductsPage;
