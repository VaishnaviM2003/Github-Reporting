const { test, expect } = require('@playwright/test');
test('Comprehensive todo app interaction', async ({ page }) => {
// Setup: Navigate to app
await page.goto('https://demo.playwright.dev/todomvc/');
// Phase 1: Add multiple todos
const todos = [
'Learn Playwright basics',
'Practice browser interactions',
'Master navigation techniques',
'Complete all labs'
];
for (const todo of todos) {
await page.fill('.new-todo', todo);
await page.keyboard.press('Enter');
}
// Verify all todos added
await expect(page.locator('.todo-list li')).toHaveCount(4);
// Phase 2: Interact with todos
// Complete first two todos
await page.locator('.todo-list li').nth(0).locator('.toggle').check();
await page.locator('.todo-list li').nth(1).locator('.toggle').check();
// Verify completion
await expect(page.locator('.todo-list li').nth(0)).toHaveClass('completed');
await expect(page.locator('.todo-list li').nth(1)).toHaveClass('completed');
// Phase 3: Navigation between filters
// View active todos
await page.click('a[href="#/active"]');
let visibleTodos = await page.locator('.todo-list li:visible').count();
await expect(visibleTodos).toBe(2);
// View completed todos
await page.click('a[href="#/completed"]');
visibleTodos = await page.locator('.todo-list li:visible').count();
await expect(visibleTodos).toBe(2);
// View all todos
await page.click('a[href="#/"]');
visibleTodos = await page.locator('.todo-list li:visible').count();
await expect(visibleTodos).toBe(4);
// Phase 4: Edit a todo
const todoToEdit = page.locator('.todo-list li').nth(2);
await todoToEdit.dblclick();
await todoToEdit.locator('.edit').fill('Master Playwright navigation techniques');
await todoToEdit.locator('.edit').press('Enter');
// Verify edit
await expect(todoToEdit.locator('label')).toHaveText('Master Playwright navigation techniques');
// Phase 5: Cleanup - clear completed
await page.click('.clear-completed');
await expect(page.locator('.todo-list li')).toHaveCount(2);
// Final verification
await expect(page.locator('.todo-count')).toContainText('2 items left');
});