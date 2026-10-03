import { expect, test } from '@playwright/test'

test('登录页能够加载', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('#app')).toBeVisible()
  await expect(page).toHaveTitle(/PicX/)
})
