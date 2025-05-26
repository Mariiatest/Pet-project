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
 const iframeContainer = page.frameLocator('#evoAuthElement iframe')

 await baseActions.clickOnElement(homepage.loginIcon)
 await page.waitForTimeout(10000)
 await iframeContainer.locator(homepage.phoneInput).fill('987719789')
 await iframeContainer.locator(homepage.submitPhone).click()
 
})

test('User is able to search', async ({ page }) => {
 await visit.click(searchForm)
 await page.getByPlaceholder('Я шукаю...').fill(iphone).click(searchFormSubmit)
 await expect(page).toHaveURL(
  '/**/mobile-phones/c80003/producer=apple/#search_text=iphone'
 )
 test('User')
})
