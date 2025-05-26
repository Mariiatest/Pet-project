import { test, expect } from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { BaseActions } from '../models/baseActions'

let homepage
let baseActions
test.beforeEach(async ({ page }) => {
 homepage = new Homepage(page)
 baseActions = new BaseActions(page)
 await page.goto('https://rozetka.com.ua/')
})

test.only('User is able to go to confirming modal', async ({ page }) => {
 await baseActions.clickOnElement(homepage.loginIcon)
 const iframeContainer = page.frameLocator(
  'iframe[name="22e259f8-0f45-4885-a6eb-682d0e746513"]'
 )
 const phoneInput = await iframeContainer.locator(homepage.phoneInput)
 await page.waitForTimeout(10000)

 await baseActions.fillInput(phoneInput, '987719789')
 await baseActions.clickOnElement(submitPhone)
 await expect(page).toHaveTitle('Вхід')
})
test('User is able to search', async ({ page }) => {
 await visit.click(searchForm)
 await page.getByPlaceholder('Я шукаю...').fill(iphone).click(searchFormSubmit)
 await expect(page).toHaveURL(
  '/**/mobile-phones/c80003/producer=apple/#search_text=iphone'
 )
 test('User')
})
