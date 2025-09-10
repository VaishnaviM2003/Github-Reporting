const { expect } = require('@playwright/test');

exports.InventoryPage = class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.locator('.inventory_list');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.getByRole('combobox');
  }

  async addItemToCart(itemName) {
    await this.page.locator('.inventory_item').filter({ hasText: itemName }).getByRole('button').click();
  }

  async getCartCount() {
    return await this.cartBadge.innerText();
  }

  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  async getAllPrices() {
    const prices = await this.page.$$eval('.inventory_item_price', els =>
      els.map(el => parseFloat(el.innerText.replace('$', '')))
    );
    return prices;
  }

  async expectInventoryLoaded() {
    await expect(this.inventoryContainer).toBeVisible();
  }
};
