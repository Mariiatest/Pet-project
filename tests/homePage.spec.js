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
 await expect(iframeContainer.locator(homepage.phoneInput)).toBeVisible()
 await iframeContainer.locator(homepage.phoneInput).fill('987719789')
 await iframeContainer.locator(homepage.submitPhone).click()
 await iframeContainer.locator(homepage.codeStep).isVisible()
})

test('User is able to search by input name', async ({ page }) => {
 await baseActions.fillInput(homepage.searchFormInput, 'iphone')
 await baseActions.clickOnElement(homepage.searchFormSubmit)
 await expect(page.url()).toContain('?text=iphone')
})
// // test('Search by Product Code', async ({ page }) => {
// // const input = page.getByPlaceholder('Я шукаю...')
// //  await baseActions.fillInput('input', '123456789')
// //  await baseActions.clickOnElement(homepage.searchFormSubmit)
// //  await expect (page)
// })
