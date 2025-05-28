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

test('User is able to go to confirming modal', async ({ page }) => {
 const iframeContainer = page.frameLocator('#evoAuthElement iframe')

 await baseActions.clickOnElement(homepage.loginIcon)
 await iframeContainer.locator(homepage.iframeName).isVisible()
 await iframeContainer.locator(homepage.phoneInput).fill('987719789')
 await iframeContainer.locator(homepage.submitPhone).click()
 await iframeContainer.locator(homepage.codeStep).isVisible()
})

test('User is able to search', async ({ page }) => {
 await page.getByPlaceholder('Я шукаю...')
 const input = page.getByPlaceholder('Я шукаю...')
 await baseActions.fillInput('input', 'iphone')
 await baseActions.clickOnElement(homepage.searchFormSubmit)
 await expect(page).toHaveURL(
  'https://rozetka.com.ua/ua/mobile-phones/c80003/producer=apple/#search_text=iphone'
 )
})
